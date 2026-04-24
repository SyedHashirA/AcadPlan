// src/components/shared/CapacityDashboard.jsx
import { useState, useEffect } from "react";
import { Card, Title, Badge, Button } from "../common";
import { AppState } from "../../AppState";
import { C } from "../../styles/theme";

export function CapacityDashboard({ approvedCourses, department }) {
  const [validation, setValidation] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (approvedCourses && approvedCourses.length > 0) {
      loadValidation();
    } else {
      setValidation(null);
      setLoading(false);
    }
  }, [approvedCourses, department]);
  
  const loadValidation = () => {
    setLoading(true);
    try {
      const TEACHING_SLOTS_PER_WEEK = 40; // 8 slots/day × 5 days
      const SECTIONS = 3;
      
      const totalAvailableSlots = TEACHING_SLOTS_PER_WEEK * SECTIONS;
      let totalRequiredSlots = 0;
      const subjectStatus = [];
      const facultyWorkload = {};
      const errors = [];
      const warnings = [];
      
      const facultyList = AppState.faculty || [];
      const subjectsList = AppState.subjects || [];
      
      // Use a Set to track unique subjects to avoid duplicates
      const processedSubjects = new Set();
      
      for (const course of approvedCourses) {
        const subject = subjectsList.find(s => s.id === course.subjectId);
        const faculty = facultyList.find(f => f.id === course.facultyId);
        
        if (!subject || !faculty) {
          errors.push({
            type: 'missing_data',
            subjectId: course.subjectId,
            facultyId: course.facultyId,
            message: `Missing subject or faculty data for course ${course.subjectName}`
          });
          continue;
        }
        
        // Create a unique key for subject-faculty combination
        const uniqueKey = `${subject.id}_${faculty.id}_${course.semester}`;
        
        // Skip if already processed to avoid duplicates
        if (processedSubjects.has(uniqueKey)) {
          continue;
        }
        processedSubjects.add(uniqueKey);
        
        // Calculate required slots for this subject (all sections)
        const requiredSlots = (subject.totalWeeklyClasses || 0) * SECTIONS;
        totalRequiredSlots += requiredSlots;
        
        // Track faculty load
        facultyWorkload[faculty.id] = facultyWorkload[faculty.id] || {
          id: faculty.id,
          name: faculty.name,
          assigned: 0,
          max: faculty.maxHours || 0
        };
        facultyWorkload[faculty.id].assigned += (subject.totalWeeklyClasses || 0);
        
        // Check individual subject feasibility
        const canSchedule = (faculty.remainingHours || faculty.maxHours) >= (subject.totalWeeklyClasses || 0);
        
        subjectStatus.push({
          uniqueKey,
          subjectId: subject.id,
          subjectName: subject.name,
          subjectCode: subject.code,
          facultyName: faculty.name,
          semester: course.semester,
          weeklyHours: subject.totalWeeklyClasses || 0,
          requiredSlots,
          canSchedule,
          error: canSchedule ? null : `Faculty ${faculty.name} has only ${faculty.remainingHours || faculty.maxHours}h remaining, needs ${subject.totalWeeklyClasses}h`
        });
        
        if (!canSchedule) {
          errors.push({
            type: 'faculty_overload',
            subject: subject.name,
            faculty: faculty.name,
            required: subject.totalWeeklyClasses,
            available: faculty.remainingHours || faculty.maxHours
          });
        }
      }
      
      // Check faculty workload
      for (const [facultyId, load] of Object.entries(facultyWorkload)) {
        const maxHours = load.max;
        if (load.assigned > maxHours) {
          errors.push({
            type: 'faculty_overall_overload',
            faculty: load.name,
            assigned: load.assigned,
            max: maxHours
          });
        }
      }
      
      // Calculate utilization
      const utilization = totalAvailableSlots > 0 ? (totalRequiredSlots / totalAvailableSlots) * 100 : 0;
      
      if (utilization > 100) {
        warnings.push({
          type: 'over_capacity',
          required: totalRequiredSlots,
          available: totalAvailableSlots,
          deficit: totalRequiredSlots - totalAvailableSlots,
          message: `Need ${totalRequiredSlots - totalAvailableSlots} more slots to schedule all subjects`
        });
      } else if (utilization < 70 && totalRequiredSlots > 0) {
        warnings.push({
          type: 'under_capacity',
          required: totalRequiredSlots,
          available: totalAvailableSlots,
          freeSlots: totalAvailableSlots - totalRequiredSlots,
          message: `${totalAvailableSlots - totalRequiredSlots} free slots available - consider adding more subjects`
        });
      }
      
      // Check for faculty overload specifically
      const overloadedFaculty = Object.values(facultyWorkload).filter(f => f.assigned > f.max);
      if (overloadedFaculty.length > 0) {
        errors.push({
          type: 'faculty_overload_summary',
          message: `${overloadedFaculty.length} faculty member(s) are overloaded. Please redistribute subjects.`,
          details: overloadedFaculty.map(f => `${f.name}: ${f.assigned}/${f.max} hours`)
        });
      }
      
      setValidation({
        canSchedule: errors.length === 0 && utilization <= 100,
        errors,
        warnings,
        subjectStatus,
        facultyWorkload: Object.values(facultyWorkload),
        totalRequiredSlots,
        totalAvailableSlots,
        utilization
      });
    } catch (error) {
      console.error("Error in capacity validation:", error);
      setValidation({
        canSchedule: false,
        errors: [{ type: 'validation_error', message: error.message }],
        warnings: [],
        subjectStatus: [],
        facultyWorkload: [],
        totalRequiredSlots: 0,
        totalAvailableSlots: 0,
        utilization: 0
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleResolveOverload = () => {
    alert("To resolve faculty overload:\n\n1. Reassign some subjects to other faculty\n2. Adjust weekly hours for subjects\n3. Add more faculty to the department\n4. Contact the coordinator for subject reallocation");
  };
  
  if (loading) {
    return (
      <Card>
        <div style={{ textAlign: "center", padding: 20 }}>
          <p>Analyzing capacity and workload...</p>
        </div>
      </Card>
    );
  }
  
  if (!validation) {
    return null;
  }
  
  const hasOverload = validation.errors.some(e => e.type === 'faculty_overall_overload' || e.type === 'faculty_overload');
  const hasCapacityIssue = validation.utilization > 100;
  
  return (
    <Card>
      <Title level={4}>📊 Timetable Capacity & Workload Analysis</Title>
      
      {/* Overall Status */}
      <div style={{ 
        padding: 12, 
        background: validation.canSchedule ? C.accent.greenBg : C.accent.redBg,
        borderRadius: 8,
        marginBottom: 16
      }}>
        <p style={{ 
          color: validation.canSchedule ? C.accent.green : C.accent.red,
          fontWeight: 600,
          margin: 0
        }}>
          {validation.canSchedule ? "✅ All subjects can be scheduled!" : "❌ Scheduling issues detected!"}
        </p>
      </div>
      
      {/* Utilization Bar */}
      {validation.totalAvailableSlots > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span>Slot Utilization</span>
            <span style={{ color: hasCapacityIssue ? C.accent.red : validation.utilization > 85 ? C.accent.green : C.accent.gold }}>
              {validation.utilization.toFixed(1)}%
            </span>
          </div>
          <div style={{ height: 8, background: C.border, borderRadius: 4, overflow: "hidden" }}>
            <div style={{
              width: `${Math.min(validation.utilization, 100)}%`,
              height: 8,
              background: hasCapacityIssue ? C.accent.red : 
                        validation.utilization > 85 ? C.accent.green : C.accent.gold,
              borderRadius: 4
            }} />
          </div>
          {hasCapacityIssue && (
            <p style={{ color: C.accent.red, fontSize: 12, marginTop: 8 }}>
              ⚠️ Over capacity! Need {validation.totalRequiredSlots - validation.totalAvailableSlots} more slots.
              Consider reducing weekly hours or adding more subjects to other semesters.
            </p>
          )}
        </div>
      )}
      
      {/* Statistics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 16 }}>
        <div style={{ textAlign: "center", padding: 8, background: C.cardHover, borderRadius: 8 }}>
          <p style={{ fontSize: 11, color: C.text.tertiary }}>Required Slots</p>
          <p style={{ fontSize: 20, fontWeight: 700, color: C.accent.blue }}>{validation.totalRequiredSlots}</p>
        </div>
        <div style={{ textAlign: "center", padding: 8, background: C.cardHover, borderRadius: 8 }}>
          <p style={{ fontSize: 11, color: C.text.tertiary }}>Available Slots</p>
          <p style={{ fontSize: 20, fontWeight: 700, color: C.accent.green }}>{validation.totalAvailableSlots}</p>
        </div>
        <div style={{ textAlign: "center", padding: 8, background: C.cardHover, borderRadius: 8 }}>
          <p style={{ fontSize: 11, color: C.text.tertiary }}>Status</p>
          <Badge variant={hasCapacityIssue ? "danger" : validation.utilization > 85 ? "success" : "warning"}>
            {hasCapacityIssue ? "Over Capacity" : validation.utilization > 85 ? "Optimal" : "Under Capacity"}
          </Badge>
        </div>
      </div>
      
      {/* Faculty Workload */}
      {validation.facultyWorkload && validation.facultyWorkload.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <h5 style={{ marginBottom: 8 }}>👨‍🏫 Faculty Workload</h5>
          <div style={{ maxHeight: 200, overflow: "auto" }}>
            {validation.facultyWorkload.map(faculty => {
              const isOverloaded = faculty.assigned > faculty.max;
              const percentage = (faculty.assigned / faculty.max) * 100;
              return (
                <div key={faculty.id} style={{
                  marginBottom: 8,
                  padding: 8,
                  background: isOverloaded ? C.accent.redBg : C.cardHover,
                  borderRadius: 8,
                  border: isOverloaded ? `1px solid ${C.accent.red}` : "none"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                    <div>
                      <strong>{faculty.name}</strong>
                      <span style={{ fontSize: 11, color: C.text.tertiary, marginLeft: 8 }}>
                        ({faculty.assigned}/{faculty.max} hours)
                      </span>
                    </div>
                    {isOverloaded && (
                      <Badge variant="danger">Overloaded by {faculty.assigned - faculty.max}h</Badge>
                    )}
                  </div>
                  <div style={{ height: 4, background: C.border, borderRadius: 2, marginTop: 4, overflow: "hidden" }}>
                    <div style={{
                      width: `${Math.min(percentage, 100)}%`,
                      height: 4,
                      background: isOverloaded ? C.accent.red : percentage > 80 ? C.accent.gold : C.accent.green,
                      borderRadius: 2
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
          {hasOverload && (
            <Button onClick={handleResolveOverload} variant="warning" size="sm" style={{ marginTop: 8 }}>
              How to Resolve Overload?
            </Button>
          )}
        </div>
      )}
      
      {/* Subject Status List */}
      {validation.subjectStatus && validation.subjectStatus.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <h5 style={{ marginBottom: 8 }}>📚 Subject-wise Status</h5>
          <div style={{ maxHeight: 250, overflow: "auto" }}>
            {validation.subjectStatus.map(subject => (
              <div key={subject.uniqueKey} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 8,
                borderBottom: `1px solid ${C.border}`,
                background: subject.canSchedule ? "transparent" : C.accent.redBg
              }}>
                <div>
                  <strong>{subject.subjectName}</strong>
                  <span style={{ fontSize: 11, color: C.text.tertiary, marginLeft: 8 }}>
                    ({subject.subjectCode}) - Sem {subject.semester}
                  </span>
                  <div style={{ fontSize: 11 }}>
                    Faculty: {subject.facultyName} | {subject.weeklyHours}h/week
                  </div>
                </div>
                {subject.canSchedule ? (
                  <Badge variant="success">Schedulable</Badge>
                ) : (
                  <Badge variant="danger">Cannot Schedule</Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Errors Section */}
      {validation.errors && validation.errors.length > 0 && (
        <div style={{ marginTop: 16, padding: 12, background: C.accent.redBg, borderRadius: 8 }}>
          <p style={{ fontWeight: 600, color: C.accent.red, marginBottom: 8 }}>⚠️ Issues Found:</p>
          {validation.errors.map((error, idx) => (
            <p key={idx} style={{ fontSize: 12, margin: 4 }}>
              • {error.message || `${error.type}: ${error.subject || error.faculty || ''}`}
              {error.details && (
                <ul style={{ marginTop: 4, paddingLeft: 20 }}>
                  {error.details.map((detail, i) => <li key={i}>{detail}</li>)}
                </ul>
              )}
            </p>
          ))}
        </div>
      )}
      
      {/* Warnings */}
      {validation.warnings && validation.warnings.length > 0 && (
        <div style={{ marginTop: 16, padding: 12, background: C.accent.goldBg, borderRadius: 8 }}>
          <p style={{ fontWeight: 600, color: C.accent.gold, marginBottom: 8 }}>⚠️ Recommendations:</p>
          {validation.warnings.map((warning, idx) => (
            <p key={idx} style={{ fontSize: 12, margin: 4 }}>
              • {warning.message || (warning.type === 'over_capacity' 
                ? `Need ${warning.deficit} more slots to schedule all subjects`
                : `${warning.freeSlots} free slots available - consider adding more subjects`)}
            </p>
          ))}
        </div>
      )}
      
      {/* Resolution Guide */}
      {!validation.canSchedule && (
        <div style={{ marginTop: 16, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
          <p style={{ fontWeight: 600, color: C.accent.blue, marginBottom: 8 }}>🔧 How to Resolve:</p>
          <ul style={{ color: C.text.secondary, fontSize: 12, margin: 0, paddingLeft: 20 }}>
            <li><strong>Faculty Overload:</strong> Reassign subjects to faculty with available hours</li>
            <li><strong>Slot Capacity:</strong> Reduce weekly hours for some subjects</li>
            <li><strong>Room Availability:</strong> Add more rooms or optimize room allocation</li>
            <li><strong>Subject Distribution:</strong> Move some subjects to different semesters</li>
            <li><strong>Contact Coordinator:</strong> They can reallocate subjects and adjust preferences</li>
          </ul>
        </div>
      )}
    </Card>
  );
}