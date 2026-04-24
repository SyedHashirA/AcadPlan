// src/components/admin/FacultyPreferenceDashboard.jsx
import { useState, useEffect } from "react";
import { Card, Title, Badge, Button, Select } from "../common";
import { AppState } from "../../AppState";
import { C } from "../../styles/theme";

export function FacultyPreferenceDashboard({ department, onAssignComplete }) {
  const [facultyPreferences, setFacultyPreferences] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [facultyList, setFacultyList] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [selectedView, setSelectedView] = useState("matrix");
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (department) {
      loadData();
      analyzeAllocations();
    }
  }, [department]);

  const loadData = () => {
    const faculty = (AppState.faculty || []).filter(f => f.course === department);
    const subjectsData = (AppState.subjects || []).filter(s => s.course === department);
    const preferences = (AppState.subjectPreferences || [])
      .filter(p => faculty.some(f => f.id === p.facultyId))
      .map(p => ({
        ...p,
        preferences: p.preferences || []
      }));
    
    const currentAllocations = (AppState.courseDetails || [])
      .filter(c => c.course === department && c.deanStatus === "approved");

    setFacultyList(faculty);
    setSubjects(subjectsData);
    setFacultyPreferences(preferences);
    setAllocations(currentAllocations);
  };

  const getFacultyRemainingHours = (faculty) => {
    if (!faculty) return 0;
    const facultyAllocations = allocations.filter(a => a.facultyId === faculty.id);
    const totalHours = facultyAllocations.reduce((sum, a) => sum + a.totalWeeklyClasses, 0);
    const maxHours = faculty.maxHours || (faculty.designation === "Professor" ? 10 : 
                     faculty.designation === "Associate Professor" ? 12 : 14);
    return maxHours - totalHours;
  };

  const getSubjectAllocationStatus = (subject) => {
    const subjectAllocations = allocations.filter(a => a.subjectId === subject.id);
    const uniqueFaculty = new Set(subjectAllocations.map(a => a.facultyId));
    
    return {
      allocatedSections: subjectAllocations.length,
      uniqueFacultyCount: uniqueFaculty.size,
      isFullyAllocated: subjectAllocations.length >= 3,
      hasConflict: uniqueFaculty.size > 1,
      canBeConsolidated: uniqueFaculty.size > 1,
      facultyList: Array.from(uniqueFaculty).map(fid => {
        const faculty = facultyList.find(f => f.id === fid);
        const facultyAllocations = subjectAllocations.filter(a => a.facultyId === fid);
        return {
          name: faculty?.name,
          sections: facultyAllocations.length
        };
      })
    };
  };

  const analyzeAllocations = () => {
    const recommendationsList = [];
    
    const subjectPopularity = new Map();
    subjects.forEach(subject => {
      subjectPopularity.set(subject.id, {
        subject: subject,
        facultyChoices: [],
        currentAllocations: []
      });
    });

    facultyPreferences.forEach(pref => {
      const faculty = facultyList.find(f => f.id === pref.facultyId);
      pref.preferences.forEach(prefItem => {
        const subjectData = subjectPopularity.get(prefItem.subjectId);
        if (subjectData) {
          subjectData.facultyChoices.push({
            facultyId: pref.facultyId,
            facultyName: faculty?.name || "Unknown",
            priority: prefItem.priority,
            preferenceLevel: prefItem.preferenceLevel,
            remainingHours: getFacultyRemainingHours(faculty)
          });
        }
      });
    });

    allocations.forEach(allocation => {
      const subjectData = subjectPopularity.get(allocation.subjectId);
      if (subjectData) {
        const faculty = facultyList.find(f => f.id === allocation.facultyId);
        subjectData.currentAllocations.push({
          facultyId: allocation.facultyId,
          facultyName: faculty?.name || "Unknown",
          sections: 1,
          hours: allocation.totalWeeklyClasses
        });
      }
    });

    for (const [subjectId, data] of subjectPopularity) {
      const uniqueFacultyChoices = new Set(data.facultyChoices.map(c => c.facultyId));
      const uniqueFacultyAllocated = new Set(data.currentAllocations.map(c => c.facultyId));
      
      if (uniqueFacultyChoices.size > 1) {
        recommendationsList.push({
          type: "multiple_choices",
          severity: "info",
          subject: data.subject.name,
          message: `${uniqueFacultyChoices.size} faculty members want to teach this subject`,
          details: data.facultyChoices.sort((a,b) => a.priority - b.priority),
          action: "Consider assigning to highest priority faculty"
        });
      }

      if (uniqueFacultyAllocated.size > 1) {
        recommendationsList.push({
          type: "conflict",
          severity: "high",
          subject: data.subject.name,
          message: `CONFLICT: ${uniqueFacultyAllocated.size} different faculty are teaching this subject`,
          details: data.currentAllocations,
          action: "Reassign to single faculty for all sections"
        });
      }
    }

    facultyList.forEach(faculty => {
      const facultyAllocations = allocations.filter(a => a.facultyId === faculty.id);
      const totalHours = facultyAllocations.reduce((sum, a) => sum + a.totalWeeklyClasses, 0);
      const maxHours = faculty.maxHours || (faculty.designation === "Professor" ? 10 : 
                       faculty.designation === "Associate Professor" ? 12 : 14);
      const remaining = maxHours - totalHours;
      
      if (remaining < 0) {
        recommendationsList.push({
          type: "overload",
          severity: "high",
          subject: faculty.name,
          message: `OVERLOADED by ${Math.abs(remaining)} hours`,
          action: `Reduce ${Math.abs(remaining)} hours from ${faculty.name}'s workload`
        });
      } else if (remaining < 4) {
        recommendationsList.push({
          type: "warning",
          severity: "medium",
          subject: faculty.name,
          message: `Low remaining capacity: ${remaining} hours left`,
          action: `Consider reducing other commitments for ${faculty.name}`
        });
      }
    });

    setRecommendations(recommendationsList);
  };

  const renderPreferenceMatrix = () => {
    const sortedFaculty = [...facultyList].sort((a, b) => a.name.localeCompare(b.name));
    const sortedSubjects = [...subjects].sort((a, b) => a.name.localeCompare(b.name));

    return (
      <div style={{ overflowX: "auto", borderRadius: 8 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: C.surface, borderBottom: `2px solid ${C.gold.main}` }}>
              <th style={{ padding: 12, textAlign: "left", position: "sticky", left: 0, background: C.surface, color: C.text.primary }}>
                Subject / Faculty
              </th>
              {sortedFaculty.map(faculty => (
                <th key={faculty.id} style={{ padding: 12, textAlign: "center", minWidth: 120, color: C.text.primary }}>
                  <div>{faculty.name}</div>
                  <div style={{ fontSize: 11, color: C.text.secondary }}>{faculty.designation}</div>
                </th>
              ))}
              <th style={{ padding: 12, textAlign: "center", background: C.accent.goldBg, color: C.gold.main }}>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedSubjects.map(subject => {
              const status = getSubjectAllocationStatus(subject);
              return (
                <tr key={subject.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ 
                    padding: 12, 
                    position: "sticky", 
                    left: 0, 
                    background: C.card,
                    fontWeight: 600,
                    color: C.text.primary
                  }}>
                    <div>{subject.name}</div>
                    <div style={{ fontSize: 11, color: C.text.secondary }}>
                      {subject.code} | {subject.totalWeeklyClasses}h | Sem {subject.semester}
                    </div>
                  </td>
                  
                  {sortedFaculty.map(faculty => {
                    const preference = facultyPreferences
                      .find(p => p.facultyId === faculty.id)
                      ?.preferences?.find(p => p.subjectId === subject.id);
                    
                    const isAllocated = allocations.some(a => 
                      a.subjectId === subject.id && a.facultyId === faculty.id
                    );
                    
                    let bgColor = C.card;
                    let textColor = C.text.primary;
                    
                    if (isAllocated) {
                      bgColor = C.accent.greenBg;
                      textColor = C.accent.green;
                    } else if (preference) {
                      bgColor = C.accent.blueBg;
                      textColor = C.accent.blue;
                    }
                    
                    return (
                      <td key={faculty.id} style={{ 
                        padding: 12, 
                        textAlign: "center",
                        background: bgColor,
                        color: textColor,
                        border: `1px solid ${C.border}`
                      }}>
                        {preference ? (
                          <div>
                            <div style={{ fontWeight: 600, color: C.gold.main }}>P{preference.priority}</div>
                            <div style={{ fontSize: 10, color: C.text.secondary }}>{preference.preferenceLevel}</div>
                          </div>
                        ) : isAllocated ? (
                          <div style={{ color: C.accent.green }}>✓ Assigned</div>
                        ) : (
                          <div style={{ color: C.text.disabled }}>-</div>
                        )}
                      </td>
                    );
                  })}
                  
                  <td style={{ padding: 12, textAlign: "center", background: status.hasConflict ? C.accent.redBg : C.accent.greenBg }}>
                    {status.hasConflict ? (
                      <Badge variant="danger">
                        ⚠️ {status.uniqueFacultyCount} Faculty
                      </Badge>
                    ) : status.isFullyAllocated ? (
                      <Badge variant="success">
                        ✓ {status.allocatedSections}/3 Sections
                      </Badge>
                    ) : (
                      <Badge variant="warning">
                        ⚠️ {status.allocatedSections}/3 Sections
                      </Badge>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const renderFacultySummary = () => {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: 16 }}>
        {facultyList.map(faculty => {
          const facultyPref = facultyPreferences.find(p => p.facultyId === faculty.id);
          const chosenSubjects = facultyPref?.preferences || [];
          const allocatedSubjects = allocations.filter(a => a.facultyId === faculty.id);
          const workload = {
            current: allocatedSubjects.reduce((sum, a) => sum + a.totalWeeklyClasses, 0),
            max: faculty.maxHours || (faculty.designation === "Professor" ? 10 : 
                     faculty.designation === "Associate Professor" ? 12 : 14)
          };
          workload.remaining = workload.max - workload.current;
          
          const priorityGroups = { 1: [], 2: [], 3: [], 4: [], 5: [] };
          
          chosenSubjects.forEach(pref => {
            const subject = subjects.find(s => s.id === pref.subjectId);
            if (subject) {
              priorityGroups[pref.priority].push({ ...subject, preferenceLevel: pref.preferenceLevel });
            }
          });
          
          return (
            <Card key={faculty.id} style={{ 
              borderTop: `4px solid ${workload.remaining >= 0 ? C.accent.green : C.accent.red}`,
              padding: 16,
              background: C.card
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
                <div>
                  <h4 style={{ margin: 0, color: C.text.primary }}>{faculty.name}</h4>
                  <p style={{ fontSize: 12, color: C.text.secondary, margin: "4px 0 0" }}>
                    {faculty.designation} | {workload.max}h max
                  </p>
                </div>
                <Badge variant={workload.remaining >= 0 ? "success" : "danger"}>
                  {workload.current}/{workload.max} hours ({workload.remaining}h left)
                </Badge>
              </div>
              
              <div style={{ marginBottom: 12 }}>
                <div style={{ 
                  width: "100%", 
                  height: 8, 
                  background: C.border, 
                  borderRadius: 4,
                  overflow: "hidden"
                }}>
                  <div style={{ 
                    width: `${(workload.current / workload.max) * 100}%`, 
                    height: "100%", 
                    background: workload.remaining >= 0 ? C.accent.green : C.accent.red 
                  }} />
                </div>
              </div>
              
              <div style={{ marginBottom: 12 }}>
                <p style={{ fontWeight: 600, marginBottom: 8, fontSize: 14, color: C.gold.main }}>
                  📚 Chosen Subjects ({chosenSubjects.length})
                </p>
                {[1, 2, 3, 4, 5].map(priority => {
                  if (priorityGroups[priority].length === 0) return null;
                  return (
                    <div key={priority} style={{ marginBottom: 8 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: C.gold.main, marginBottom: 4 }}>
                        Priority {priority}:
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {priorityGroups[priority].map(subject => (
                          <Badge key={subject.id} variant="info" size="sm">
                            {subject.name} ({subject.totalWeeklyClasses}h)
                          </Badge>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div>
                <p style={{ fontWeight: 600, marginBottom: 8, fontSize: 14, color: C.accent.green }}>
                  ✓ Allocated Subjects ({allocatedSubjects.length})
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {allocatedSubjects.length > 0 ? (
                    allocatedSubjects.map(allocation => (
                      <Badge key={allocation.id} variant="success" size="sm">
                        {allocation.subjectName} ({allocation.totalWeeklyClasses}h)
                      </Badge>
                    ))
                  ) : (
                    <span style={{ fontSize: 12, color: C.text.secondary }}>No allocations yet</span>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    );
  };

  const renderSubjectConflictMatrix = () => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {subjects.map(subject => {
          const status = getSubjectAllocationStatus(subject);
          const facultyChoices = [];
          
          facultyPreferences.forEach(pref => {
            const choice = pref.preferences?.find(p => p.subjectId === subject.id);
            if (choice) {
              const faculty = facultyList.find(f => f.id === pref.facultyId);
              facultyChoices.push({
                facultyName: faculty?.name,
                priority: choice.priority,
                preferenceLevel: choice.preferenceLevel,
                remainingHours: getFacultyRemainingHours(faculty)
              });
            }
          });
          
          const sortedChoices = [...facultyChoices].sort((a, b) => a.priority - b.priority);
          
          return (
            <Card key={subject.id} style={{ 
              borderLeft: `4px solid ${status.hasConflict ? C.accent.red : status.isFullyAllocated ? C.accent.green : C.gold.main}`,
              background: C.card
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
                <div>
                  <h4 style={{ margin: 0, color: C.text.primary }}>{subject.name}</h4>
                  <p style={{ fontSize: 12, color: C.text.secondary, margin: "4px 0 0" }}>
                    {subject.code} | {subject.totalWeeklyClasses}h/week | Semester {subject.semester}
                  </p>
                </div>
                <div>
                  {status.hasConflict ? (
                    <Badge variant="danger">⚠️ CONFLICT: {status.uniqueFacultyCount} Faculty</Badge>
                  ) : status.isFullyAllocated ? (
                    <Badge variant="success">✓ Fully Allocated ({status.allocatedSections}/3)</Badge>
                  ) : (
                    <Badge variant="warning">⚠️ Partial ({status.allocatedSections}/3)</Badge>
                  )}
                </div>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ padding: 12, background: C.surface, borderRadius: 8 }}>
                  <p style={{ fontWeight: 600, marginBottom: 8, fontSize: 13, color: C.gold.main }}>
                    🎯 Faculty Preferences ({facultyChoices.length} choices)
                  </p>
                  {sortedChoices.length > 0 ? (
                    <table style={{ width: "100%", fontSize: 13 }}>
                      <thead>
                        <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                          <th style={{ textAlign: "left", padding: "4px 0", color: C.text.secondary }}>Faculty</th>
                          <th style={{ textAlign: "center", padding: "4px", color: C.text.secondary }}>Priority</th>
                          <th style={{ textAlign: "center", padding: "4px", color: C.text.secondary }}>Level</th>
                          <th style={{ textAlign: "right", padding: "4px", color: C.text.secondary }}>Available Hours</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedChoices.map((choice, idx) => (
                          <tr key={idx} style={{ borderBottom: `1px solid ${C.border}` }}>
                            <td style={{ padding: "4px 0", color: C.text.primary }}>{choice.facultyName}</td>
                            <td style={{ textAlign: "center", padding: "4px" }}>
                              <Badge variant="info" size="sm" style={{ background: C.gold.main, color: C.text.inverse }}>P{choice.priority}</Badge>
                            </td>
                            <td style={{ textAlign: "center", padding: "4px", color: C.text.secondary }}>{choice.preferenceLevel}</td>
                            <td style={{ textAlign: "right", padding: "4px", color: C.text.secondary }}>{choice.remainingHours}h left</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p style={{ color: C.text.secondary, fontSize: 13 }}>No faculty preferences for this subject</p>
                  )}
                </div>
                
                <div style={{ padding: 12, background: C.surface, borderRadius: 8 }}>
                  <p style={{ fontWeight: 600, marginBottom: 8, fontSize: 13, color: C.accent.green }}>
                    ✓ Current Allocations ({status.allocatedSections}/3 sections)
                  </p>
                  {status.facultyList.length > 0 ? (
                    <div>
                      {status.facultyList.map((fac, idx) => (
                        <div key={idx} style={{ 
                          display: "flex", 
                          justifyContent: "space-between", 
                          alignItems: "center",
                          padding: "8px 0",
                          borderBottom: idx < status.facultyList.length - 1 ? `1px solid ${C.border}` : "none"
                        }}>
                          <span style={{ color: C.text.primary }}>{fac.name}</span>
                          <Badge variant="info" size="sm">{fac.sections} section(s)</Badge>
                        </div>
                      ))}
                      {status.hasConflict && (
                        <div style={{ marginTop: 12, padding: 8, background: C.accent.redBg, borderRadius: 4 }}>
                          <p style={{ fontSize: 12, margin: 0, color: C.accent.red }}>
                            💡 Recommendation: Assign all 3 sections to a single faculty
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p style={{ color: C.text.secondary, fontSize: 13 }}>No current allocations</p>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    );
  };

  const renderRecommendations = () => {
    const highSeverity = recommendations.filter(r => r.severity === "high");
    const mediumSeverity = recommendations.filter(r => r.severity === "medium");
    const lowSeverity = recommendations.filter(r => r.severity === "low");
    const infoSeverity = recommendations.filter(r => r.severity === "info");
    
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {highSeverity.length > 0 && (
          <Card style={{ background: C.accent.redBg, borderLeft: `4px solid ${C.accent.red}` }}>
            <h4 style={{ color: C.accent.red, marginBottom: 12 }}>🔴 Critical Issues - Must Resolve</h4>
            {highSeverity.map((rec, idx) => (
              <div key={idx} style={{ marginBottom: 12, padding: 8, background: C.card, borderRadius: 4 }}>
                <strong style={{ color: C.text.primary }}>{rec.subject}</strong>
                <p style={{ margin: "4px 0", color: C.text.secondary }}>{rec.message}</p>
                <p style={{ fontSize: 12, color: C.accent.red }}>💡 {rec.action}</p>
              </div>
            ))}
          </Card>
        )}
        
        {mediumSeverity.length > 0 && (
          <Card style={{ background: C.accent.goldBg, borderLeft: `4px solid ${C.gold.main}` }}>
            <h4 style={{ color: C.gold.main, marginBottom: 12 }}>🟡 Warnings - Consider Resolving</h4>
            {mediumSeverity.map((rec, idx) => (
              <div key={idx} style={{ marginBottom: 8 }}>
                <strong style={{ color: C.text.primary }}>{rec.subject}</strong>: <span style={{ color: C.text.secondary }}>{rec.message}</span>
                <span style={{ fontSize: 12, display: "block", color: C.gold.main }}>💡 {rec.action}</span>
              </div>
            ))}
          </Card>
        )}
        
        {lowSeverity.length > 0 && (
          <Card style={{ background: C.accent.blueBg, borderLeft: `4px solid ${C.accent.blue}` }}>
            <h4 style={{ marginBottom: 12, color: C.text.primary }}>🟢 Optimization Opportunities</h4>
            {lowSeverity.map((rec, idx) => (
              <div key={idx} style={{ marginBottom: 8 }}>
                <strong style={{ color: C.text.primary }}>{rec.subject}</strong>: <span style={{ color: C.text.secondary }}>{rec.message}</span>
                <span style={{ fontSize: 12, display: "block", color: C.accent.blue }}>💡 {rec.action}</span>
              </div>
            ))}
          </Card>
        )}
        
        {infoSeverity.length > 0 && (
          <Card style={{ background: C.accent.purpleBg, borderLeft: `4px solid ${C.accent.purple}` }}>
            <h4 style={{ marginBottom: 12, color: C.text.primary }}>ℹ️ Information</h4>
            {infoSeverity.map((rec, idx) => (
              <div key={idx} style={{ marginBottom: 8 }}>
                <strong style={{ color: C.text.primary }}>{rec.subject}</strong>: <span style={{ color: C.text.secondary }}>{rec.message}</span>
                <div style={{ fontSize: 12, marginTop: 4 }}>
                  {rec.details?.slice(0, 3).map((d, i) => (
                    <span key={i} style={{ color: C.text.secondary }}>• {d.facultyName} (P{d.priority}) </span>
                  ))}
                </div>
              </div>
            ))}
          </Card>
        )}
        
        {recommendations.length === 0 && (
          <Card style={{ background: C.accent.greenBg, borderLeft: `4px solid ${C.accent.green}` }}>
            <div style={{ textAlign: "center", padding: 16 }}>
              <span style={{ fontSize: 32 }}>✅</span>
              <h4 style={{ color: C.accent.green, marginTop: 8 }}>Perfect! No Conflicts or Issues</h4>
              <p style={{ color: C.text.secondary }}>All subjects are properly allocated with no conflicts.</p>
            </div>
          </Card>
        )}
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Title style={{ color: C.gold.main }}>📊 Faculty Subject Preference & Allocation Dashboard - {department}</Title>
      
      {/* View Selector */}
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <Button 
          variant={selectedView === "matrix" ? "primary" : "secondary"} 
          onClick={() => setSelectedView("matrix")}
        >
          📋 Preference Matrix
        </Button>
        <Button 
          variant={selectedView === "summary" ? "primary" : "secondary"} 
          onClick={() => setSelectedView("summary")}
        >
          👨‍🏫 Faculty Summary
        </Button>
        <Button 
          variant={selectedView === "conflicts" ? "primary" : "secondary"} 
          onClick={() => setSelectedView("conflicts")}
        >
          ⚠️ Subject Conflicts
        </Button>
        <Button 
          variant={selectedView === "recommendations" ? "primary" : "secondary"} 
          onClick={() => setSelectedView("recommendations")}
        >
          💡 Recommendations
        </Button>
      </div>
      
      {/* Statistics Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
        <Card style={{ textAlign: "center" }}>
          <p style={{ fontSize: 12, color: C.text.secondary }}>Total Faculty</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: C.gold.main }}>{facultyList.length}</p>
        </Card>
        <Card style={{ textAlign: "center" }}>
          <p style={{ fontSize: 12, color: C.text.secondary }}>Total Subjects</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: C.gold.main }}>{subjects.length}</p>
        </Card>
        <Card style={{ textAlign: "center" }}>
          <p style={{ fontSize: 12, color: C.text.secondary }}>Subjects with Conflicts</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: C.accent.red }}>
            {subjects.filter(s => getSubjectAllocationStatus(s).hasConflict).length}
          </p>
        </Card>
        <Card style={{ textAlign: "center" }}>
          <p style={{ fontSize: 12, color: C.text.secondary }}>Fully Allocated</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: C.accent.green }}>
            {subjects.filter(s => getSubjectAllocationStatus(s).isFullyAllocated).length}
          </p>
        </Card>
        <Card style={{ textAlign: "center" }}>
          <p style={{ fontSize: 12, color: C.text.secondary }}>Total Allocations</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: C.gold.main }}>{allocations.length}</p>
        </Card>
      </div>
      
      {/* Selected View Content */}
      {selectedView === "matrix" && renderPreferenceMatrix()}
      {selectedView === "summary" && renderFacultySummary()}
      {selectedView === "conflicts" && renderSubjectConflictMatrix()}
      {selectedView === "recommendations" && renderRecommendations()}
      
      {/* Action Buttons */}
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <Button onClick={onAssignComplete} variant="success" size="lg">
          ✓ Proceed with Current Allocations
        </Button>
      </div>
      
      {/* Legend */}
      <Card style={{ background: C.surface }}>
        <h4 style={{ color: C.gold.main }}>📖 Understanding the Dashboard:</h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginTop: 8 }}>
          <div>
            <p><Badge variant="success" size="sm">✓ Assigned</Badge> <span style={{ color: C.text.secondary }}>- Faculty already teaching this subject</span></p>
            <p><Badge variant="info" size="sm" style={{ background: C.gold.main, color: C.text.inverse }}>P1-P5</Badge> <span style={{ color: C.text.secondary }}>- Faculty preference priority (1=Highest)</span></p>
            <p><Badge variant="danger" size="sm">⚠️ Conflict</Badge> <span style={{ color: C.text.secondary }}>- Multiple faculty teaching same subject</span></p>
          </div>
          <div>
            <p><Badge variant="warning" size="sm">⚠️ Partial</Badge> <span style={{ color: C.text.secondary }}>- Subject needs more sections allocated</span></p>
            <p><Badge variant="success" size="sm">✅ Fully Allocated</Badge> <span style={{ color: C.text.secondary }}>- All 3 sections assigned</span></p>
            <p style={{ color: C.gold.main }}>💡 <strong>Best Practice:</strong> One faculty per subject across all 3 sections</p>
          </div>
        </div>
      </Card>
    </div>
  );
}