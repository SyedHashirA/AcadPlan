// src/components/admin/SubjectAssignmentManager.jsx
import { useState, useEffect } from "react";
import { Card, Title, Badge, Button, Select } from "../common";
import { AppState } from "../../AppState";
import { 
  SubjectAssignmentEngine, 
  findMissedSubjects, 
  resolveDuplicateAssignments 
} from "../../utils/subjectAssignmentEngine";
import { saveToStorage, STORAGE_KEYS } from "../../utils/storage";
import { C } from "../../styles/theme";

export function SubjectAssignmentManager({ department, onComplete, onCancel }) {
  const [report, setReport] = useState(null);
  const [missedSubjects, setMissedSubjects] = useState(null);
  const [duplicates, setDuplicates] = useState([]);
  const [assignmentStrategy, setAssignmentStrategy] = useState("priority");
  const [autoAssigning, setAutoAssigning] = useState(false);
  const [showManualAssignModal, setShowManualAssignModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [showPartialAssignModal, setShowPartialAssignModal] = useState(false);
  const [selectedPartialSubject, setSelectedPartialSubject] = useState(null);
  const [facultyList, setFacultyList] = useState([]);
  const [subjectsList, setSubjectsList] = useState([]);

  useEffect(() => {
    if (department) {
      loadData();
      checkStatus();
    }
  }, [department]);

  const loadData = () => {
    const faculty = (AppState.faculty || []).filter(f => f.course === department);
    const subjects = (AppState.subjects || []).filter(s => s.course === department);
    setFacultyList(faculty);
    setSubjectsList(subjects);
  };

  const checkStatus = () => {
    const missed = findMissedSubjects(department);
    // Only flag duplicates where different faculty teach the same subject
    const dupes = findRealDuplicateAssignments(department);
    setMissedSubjects(missed);
    setDuplicates(dupes);
  };

  // This function only flags duplicates where DIFFERENT faculty teach the same subject
  const findRealDuplicateAssignments = (dept) => {
    const courseDetails = (AppState.courseDetails || []).filter(c => c.course === dept);
    const subjectFacultyMap = new Map();
    
    for (const detail of courseDetails) {
      const key = `${detail.subjectId}_${detail.semester}`;
      if (!subjectFacultyMap.has(key)) {
        subjectFacultyMap.set(key, new Map());
      }
      const facultyMap = subjectFacultyMap.get(key);
      const facultyId = detail.facultyId;
      if (!facultyMap.has(facultyId)) {
        facultyMap.set(facultyId, []);
      }
      facultyMap.get(facultyId).push(detail);
    }
    
    const duplicates = [];
    for (const [key, facultyMap] of subjectFacultyMap) {
      // Only flag as duplicate if MORE THAN ONE faculty is assigned
      if (facultyMap.size > 1) {
        const [subjectId, semester] = key.split('_');
        const subject = (AppState.subjects || []).find(s => s.id === subjectId);
        
        const faculties = [];
        for (const [facultyId, assignments] of facultyMap) {
          const faculty = facultyList.find(f => f.id === facultyId);
          faculties.push({
            facultyId: facultyId,
            facultyName: faculty?.name || "Unknown",
            courseDetailIds: assignments.map(a => a.id),
            sectionCount: assignments.length
          });
        }
        
        duplicates.push({
          subjectId: subjectId,
          subjectName: subject?.name || subjectId,
          semester: parseInt(semester),
          faculties: faculties,
          conflictCount: faculties.length
        });
      }
    }
    
    return duplicates;
  };

  const getFacultyWorkloadInfo = (faculty) => {
    const assignments = (AppState.courseDetails || []).filter(
      c => c.course === department && c.facultyId === faculty.id
    );
    const currentHours = assignments.reduce((sum, c) => sum + c.totalWeeklyClasses, 0);
    const maxHours = faculty.maxHours || (faculty.designation === "Professor" ? 10 : 
                     faculty.designation === "Associate Professor" ? 12 : 14);
    const remainingHours = maxHours - currentHours;
    
    return { currentHours, maxHours, remainingHours };
  };

  const getFacultyChoicesForSubject = (subjectId) => {
    const choices = [];
    const preferences = AppState.subjectPreferences || [];
    
    for (const pref of preferences) {
      const subjectPref = pref.preferences?.find(p => p.subjectId === subjectId);
      if (subjectPref) {
        const faculty = facultyList.find(f => f.id === pref.facultyId);
        if (faculty) {
          const { remainingHours } = getFacultyWorkloadInfo(faculty);
          choices.push({
            facultyId: faculty.id,
            facultyName: faculty.name,
            priority: subjectPref.priority,
            preferenceLevel: subjectPref.preferenceLevel,
            remainingHours: remainingHours
          });
        }
      }
    }
    
    return choices.sort((a, b) => a.priority - b.priority);
  };

  const getAvailableFacultyForSubject = (subject) => {
    const existingAssignments = (AppState.courseDetails || []).filter(
      c => c.course === department && c.subjectId === subject?.id
    );
    
    const sectionCount = existingAssignments.length;
    const canAddMoreSections = sectionCount < 3;
    
    if (!canAddMoreSections) {
      return [];
    }
    
    // Faculty can be assigned even if they already teach this subject (for different section)
    return facultyList.filter(faculty => {
      const { remainingHours } = getFacultyWorkloadInfo(faculty);
      return remainingHours >= (subject?.totalWeeklyClasses || 0);
    }).map(faculty => {
      const { currentHours, maxHours, remainingHours } = getFacultyWorkloadInfo(faculty);
      const alreadyTeaches = existingAssignments.some(a => a.facultyId === faculty.id);
      
      return {
        ...faculty,
        currentHours,
        maxHours,
        remainingHours,
        alreadyTeaches
      };
    });
  };

  const runAutoAssignment = async () => {
    setAutoAssigning(true);
    try {
      const engine = new SubjectAssignmentEngine(department);
      const assignmentReport = await engine.runAssignment();
      const savedCount = await engine.saveAssignmentsToCourseDetails();
      
      setReport(assignmentReport);
      alert(`✅ Auto-assignment complete!\n\nAssigned: ${assignmentReport.assignedSubjects} subjects\nUnassigned: ${assignmentReport.unassignedSubjects.length} subjects\nSaved: ${savedCount} course details`);
      
      checkStatus();
      loadData();
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error("Error in auto-assignment:", error);
      alert("Error in auto-assignment: " + error.message);
    } finally {
      setAutoAssigning(false);
    }
  };

  const resolveDuplicates = () => {
    // For duplicates, we need to keep only ONE faculty per subject
    if (duplicates.length === 0) return;
    
    for (const duplicate of duplicates) {
      if (duplicate.faculties.length <= 1) continue;
      
      let keepFaculty = null;
      
      if (assignmentStrategy === "priority") {
        // Keep faculty with highest priority (lowest priority number)
        const preferences = AppState.subjectPreferences || [];
        const scoredFaculties = duplicate.faculties.map(f => {
          const facultyPref = preferences.find(p => p.facultyId === f.facultyId);
          const pref = facultyPref?.preferences?.find(p => p.subjectId === duplicate.subjectId);
          const priority = pref?.priority || 999;
          return { faculty: f, priority };
        });
        scoredFaculties.sort((a, b) => a.priority - b.priority);
        keepFaculty = scoredFaculties[0].faculty;
      } else if (assignmentStrategy === "workload") {
        // Keep faculty with highest remaining workload
        const workloadFaculties = duplicate.faculties.map(f => {
          const faculty = facultyList.find(fac => fac.id === f.facultyId);
          const { remainingHours } = getFacultyWorkloadInfo(faculty);
          return { faculty: f, remainingHours };
        });
        workloadFaculties.sort((a, b) => b.remainingHours - a.remainingHours);
        keepFaculty = workloadFaculties[0].faculty;
      }
      
      // Remove other faculty assignments
      if (keepFaculty) {
        const facultiesToRemove = duplicate.faculties.filter(f => f.facultyId !== keepFaculty.facultyId);
        for (const faculty of facultiesToRemove) {
          for (const courseId of faculty.courseDetailIds) {
            const updatedDetails = (AppState.courseDetails || []).filter(d => d.id !== courseId);
            AppState.courseDetails = updatedDetails;
            saveToStorage(STORAGE_KEYS.COURSE_DETAILS, updatedDetails);
          }
        }
      }
    }
    
    alert(`✅ Duplicates resolved! Kept one faculty per subject.`);
    checkStatus();
    window.dispatchEvent(new Event('storage'));
  };

  const handleManualAssign = () => {
    if (!selectedFaculty || !selectedSubject) {
      alert("Please select both faculty and subject");
      return;
    }

    const faculty = facultyList.find(f => f.id === parseInt(selectedFaculty));
    const subject = subjectsList.find(s => s.id === selectedSubject.id);

    if (!faculty || !subject) {
      alert("Invalid selection");
      return;
    }

    // Check if subject already has 3 assignments (for 3 sections)
    const existingAssignmentsForSubject = (AppState.courseDetails || []).filter(
      c => c.course === department && c.subjectId === subject.id
    );
    
    if (existingAssignmentsForSubject.length >= 3) {
      alert(`⚠️ ${subject.name} already has 3 assignments (one for each section). Cannot add more.`);
      return;
    }

    // Check faculty workload
    const { currentHours, maxHours, remainingHours } = getFacultyWorkloadInfo(faculty);

    if (remainingHours < subject.totalWeeklyClasses) {
      alert(`⚠️ Faculty ${faculty.name} doesn't have enough workload capacity!\nRemaining: ${remainingHours}h, Need: ${subject.totalWeeklyClasses}h, Max: ${maxHours}h`);
      return;
    }

    // Create assignment
    const courseDetails = AppState.courseDetails || [];
    const newId = Math.max(0, ...courseDetails.map(c => c.id), 0) + 1;

    const newAssignment = {
      id: newId,
      course: department,
      semester: subject.semester,
      subjectId: subject.id,
      subjectName: subject.name,
      subjectCode: subject.code,
      facultyId: faculty.id,
      facultyName: faculty.name,
      credits: subject.credits,
      modules: subject.modules || 4,
      theoryClassesPerWeek: subject.theoryClassesPerWeek,
      labPeriodsPerWeek: subject.labPeriodsPerWeek,
      totalWeeklyClasses: subject.totalWeeklyClasses,
      deanStatus: "pending",
      submittedAt: new Date().toISOString(),
      autoAssigned: false,
      manuallyAssigned: true
    };

    courseDetails.push(newAssignment);
    AppState.courseDetails = courseDetails;
    saveToStorage(STORAGE_KEYS.COURSE_DETAILS, courseDetails);

    alert(`✅ Assigned ${subject.name} to ${faculty.name}\nFaculty workload: ${currentHours + subject.totalWeeklyClasses}/${maxHours} hours`);
    setShowManualAssignModal(false);
    setSelectedSubject(null);
    setSelectedFaculty("");
    checkStatus();
    window.dispatchEvent(new Event('storage'));
  };

  const handlePartialAssign = () => {
    if (!selectedFaculty || !selectedPartialSubject) {
      alert("Please select faculty");
      return;
    }

    const faculty = facultyList.find(f => f.id === parseInt(selectedFaculty));
    const subject = selectedPartialSubject.subject;

    if (!faculty || !subject) {
      alert("Invalid selection");
      return;
    }

    // Check if subject already has 3 assignments
    const existingAssignments = (AppState.courseDetails || []).filter(
      c => c.course === department && c.subjectId === subject.id
    );

    if (existingAssignments.length >= 3) {
      alert(`⚠️ ${subject.name} already has 3 assignments (one for each section). Cannot add more.`);
      return;
    }

    // Check faculty workload
    const { currentHours, maxHours, remainingHours } = getFacultyWorkloadInfo(faculty);

    if (remainingHours < subject.totalWeeklyClasses) {
      alert(`⚠️ Faculty ${faculty.name} doesn't have enough workload capacity!\nRemaining: ${remainingHours}h, Need: ${subject.totalWeeklyClasses}h, Max: ${maxHours}h`);
      return;
    }

    // Create assignment for missing section
    const courseDetails = AppState.courseDetails || [];
    const newId = Math.max(0, ...courseDetails.map(c => c.id), 0) + 1;

    const newAssignment = {
      id: newId,
      course: department,
      semester: subject.semester,
      subjectId: subject.id,
      subjectName: subject.name,
      subjectCode: subject.code,
      facultyId: faculty.id,
      facultyName: faculty.name,
      credits: subject.credits,
      modules: subject.modules || 4,
      theoryClassesPerWeek: subject.theoryClassesPerWeek,
      labPeriodsPerWeek: subject.labPeriodsPerWeek,
      totalWeeklyClasses: subject.totalWeeklyClasses,
      deanStatus: "pending",
      submittedAt: new Date().toISOString(),
      autoAssigned: false,
      manuallyAssigned: true
    };

    courseDetails.push(newAssignment);
    AppState.courseDetails = courseDetails;
    saveToStorage(STORAGE_KEYS.COURSE_DETAILS, courseDetails);

    const newTotalHours = currentHours + subject.totalWeeklyClasses;
    alert(`✅ Assigned ${subject.name} to ${faculty.name} for the missing section\nFaculty workload: ${newTotalHours}/${maxHours} hours (${remainingHours - subject.totalWeeklyClasses}h remaining)`);
    
    setShowPartialAssignModal(false);
    setSelectedPartialSubject(null);
    setSelectedFaculty("");
    checkStatus();
    window.dispatchEvent(new Event('storage'));
  };

  const removeAssignment = (courseId, subjectName, facultyName) => {
    if (confirm(`Remove ${subjectName} from ${facultyName}?`)) {
      const updatedDetails = (AppState.courseDetails || []).filter(d => d.id !== courseId);
      AppState.courseDetails = updatedDetails;
      saveToStorage(STORAGE_KEYS.COURSE_DETAILS, updatedDetails);
      checkStatus();
      window.dispatchEvent(new Event('storage'));
      alert(`✅ Removed assignment`);
    }
  };

  // Modal component
  const ModalOverlay = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    
    return (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: "white",
          borderRadius: 8,
          maxWidth: 500,
          width: "90%",
          maxHeight: "80vh",
          overflow: "auto"
        }}>
          <div style={{
            padding: 16,
            borderBottom: "1px solid #e0e0e0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <h3 style={{ margin: 0 }}>{title}</h3>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                fontSize: 24,
                cursor: "pointer",
                color: "#666"
              }}
            >
              ×
            </button>
          </div>
          <div style={{ padding: 20 }}>
            {children}
          </div>
        </div>
      </div>
    );
  };

  if (!department) {
    return (
      <Card>
        <div style={{ textAlign: "center", padding: 20 }}>
          <p>Please select a department first</p>
        </div>
      </Card>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Title>📋 Subject Assignment Manager - {department}</Title>

      {/* Manual Assign Modal */}
      <ModalOverlay
        isOpen={showManualAssignModal}
        onClose={() => setShowManualAssignModal(false)}
        title={`Assign Subject: ${selectedSubject?.name || ""}`}
      >
        <div>
          {selectedSubject && (
            <>
              <p><strong>Subject Details:</strong></p>
              <p>Code: {selectedSubject.code}</p>
              <p>Semester: {selectedSubject.semester}</p>
              <p>Hours/Week: {selectedSubject.totalWeeklyClasses}h</p>
              <p>Credits: {selectedSubject.credits}</p>
              
              <div style={{ marginTop: 16 }}>
                <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>Select Faculty</label>
                <select
                  value={selectedFaculty}
                  onChange={(e) => setSelectedFaculty(e.target.value)}
                  style={{
                    width: "100%",
                    padding: 8,
                    borderRadius: 4,
                    border: "1px solid #ddd"
                  }}
                >
                  <option value="">Choose faculty...</option>
                  {getAvailableFacultyForSubject(selectedSubject).map(f => (
                    <option key={f.id} value={f.id}>
                      {f.name} ({f.designation}) - {f.remainingHours}h available / {f.maxHours}h max
                      {f.alreadyTeaches && " (Already teaches this subject - adding another section)"}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
          
          <div style={{ marginTop: 16, display: "flex", gap: 12, justifyContent: "flex-end" }}>
            <button
              onClick={() => setShowManualAssignModal(false)}
              style={{
                padding: "8px 16px",
                background: "#e0e0e0",
                border: "none",
                borderRadius: 4,
                cursor: "pointer"
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleManualAssign}
              style={{
                padding: "8px 16px",
                background: C.accent.blue,
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: "pointer"
              }}
            >
              Assign Subject
            </button>
          </div>
        </div>
      </ModalOverlay>

      {/* Partial Assign Modal */}
      <ModalOverlay
        isOpen={showPartialAssignModal}
        onClose={() => setShowPartialAssignModal(false)}
        title={`Complete Assignment: ${selectedPartialSubject?.subject?.name || ""}`}
      >
        <div>
          {selectedPartialSubject && (
            <>
              <p><strong>Subject Details:</strong></p>
              <p>Code: {selectedPartialSubject.subject.code}</p>
              <p>Semester: {selectedPartialSubject.subject.semester}</p>
              <p>Hours/Week: {selectedPartialSubject.subject.totalWeeklyClasses}h</p>
              <p>Currently Assigned: {selectedPartialSubject.assignedSections}/3 sections</p>
              <p>Missing: {selectedPartialSubject.missingSections} section(s)</p>
              
              <div style={{ marginTop: 16 }}>
                <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>Select Faculty for Missing Section</label>
                <select
                  value={selectedFaculty}
                  onChange={(e) => setSelectedFaculty(e.target.value)}
                  style={{
                    width: "100%",
                    padding: 8,
                    borderRadius: 4,
                    border: "1px solid #ddd"
                  }}
                >
                  <option value="">Choose faculty...</option>
                  {getAvailableFacultyForSubject(selectedPartialSubject.subject).map(f => (
                    <option key={f.id} value={f.id}>
                      {f.name} ({f.designation}) - {f.remainingHours}h available / {f.maxHours}h max
                      {f.alreadyTeaches && " (Currently teaches this subject - adding another section)"}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
          
          <div style={{ marginTop: 16, display: "flex", gap: 12, justifyContent: "flex-end" }}>
            <button
              onClick={() => setShowPartialAssignModal(false)}
              style={{
                padding: "8px 16px",
                background: "#e0e0e0",
                border: "none",
                borderRadius: 4,
                cursor: "pointer"
              }}
            >
              Cancel
            </button>
            <button
              onClick={handlePartialAssign}
              style={{
                padding: "8px 16px",
                background: C.accent.warning || "#ff9800",
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: "pointer"
              }}
            >
              Assign Missing Section
            </button>
          </div>
        </div>
      </ModalOverlay>

      {/* Status Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <Card>
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Total Subjects</p>
          <p style={{ fontSize: 32, fontWeight: 700, color: C.accent.blue }}>
            {missedSubjects?.totalSubjects || 0}
          </p>
        </Card>
        <Card>
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Assigned Subjects</p>
          <p style={{ fontSize: 32, fontWeight: 700, color: C.accent.green }}>
            {missedSubjects?.assignedSubjects || 0}
          </p>
        </Card>
        <Card>
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Duplicate Conflicts</p>
          <p style={{ fontSize: 32, fontWeight: 700, color: duplicates.length > 0 ? C.accent.red : C.accent.green }}>
            {duplicates.length}
          </p>
        </Card>
        <Card>
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Faculty Available</p>
          <p style={{ fontSize: 32, fontWeight: 700, color: C.accent.gold }}>
            {facultyList.length}
          </p>
        </Card>
      </div>

      {/* Missed Subjects Section */}
      {missedSubjects?.missedSubjects?.length > 0 && (
        <Card style={{ borderLeft: `4px solid ${C.accent.red}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h4>⚠️ Missed Subjects ({missedSubjects.missedSubjects.length})</h4>
          </div>
          <p>These subjects have no faculty assigned:</p>
          <div style={{ marginTop: 12 }}>
            {missedSubjects.missedSubjects.map(subject => (
              <div key={subject.id} style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
                padding: 12,
                marginBottom: 8,
                background: C.cardHover,
                borderRadius: 8,
                borderLeft: `3px solid ${C.accent.red}`
              }}>
                <div>
                  <strong>{subject.name}</strong>
                  <p style={{ fontSize: 12, color: C.text.secondary, marginTop: 4 }}>
                    Code: {subject.code} | Semester: {subject.semester} | Hours: {subject.totalWeeklyClasses}h/week
                  </p>
                </div>
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => {
                    setSelectedSubject(subject);
                    setShowManualAssignModal(true);
                  }}
                >
                  Assign Faculty
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Partial Subjects Section */}
      {missedSubjects?.partialSubjects?.length > 0 && (
        <Card style={{ borderLeft: `4px solid ${C.accent.gold}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h4>⚠️ Partially Assigned Subjects ({missedSubjects.partialSubjects.length})</h4>
          </div>
          <p>These subjects are missing assignments for some sections (need 3 total):</p>
          {missedSubjects.partialSubjects.map(item => {
            const existingAssignments = (AppState.courseDetails || []).filter(
              c => c.course === department && c.subjectId === item.subject.id
            );
            
            return (
              <div key={item.subject.id} style={{ 
                marginTop: 12, 
                padding: 12, 
                background: C.cardHover, 
                borderRadius: 8,
                borderLeft: `3px solid ${C.accent.gold}`
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <strong>{item.subject.name}</strong>
                    <p style={{ fontSize: 12, color: C.text.secondary, marginTop: 4 }}>
                      Code: {item.subject.code} | Semester: {item.subject.semester} | Hours: {item.subject.totalWeeklyClasses}h/week
                    </p>
                  </div>
                  <Badge variant="warning">Missing {item.missingSections} section(s)</Badge>
                </div>
                
                <div style={{ marginTop: 12 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Current Assignments:</p>
                  {existingAssignments.map(assignment => {
                    const faculty = facultyList.find(f => f.id === assignment.facultyId);
                    const { remainingHours } = getFacultyWorkloadInfo(faculty);
                    return (
                      <div key={assignment.id} style={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center",
                        padding: 8,
                        marginBottom: 4,
                        background: C.background,
                        borderRadius: 4
                      }}>
                        <span>👨‍🏫 {faculty?.name || "Unknown"} ({remainingHours}h remaining)</span>
                        <Button 
                          size="sm" 
                          variant="danger"
                          onClick={() => removeAssignment(assignment.id, item.subject.name, faculty?.name)}
                        >
                          Remove
                        </Button>
                      </div>
                    );
                  })}
                </div>
                
                <div style={{ marginTop: 12 }}>
                  <Button 
                    variant="warning" 
                    size="sm"
                    onClick={() => {
                      setSelectedPartialSubject(item);
                      setShowPartialAssignModal(true);
                    }}
                  >
                    + Assign Missing Section
                  </Button>
                </div>
              </div>
            );
          })}
        </Card>
      )}

      {/* Duplicate Conflicts Section - Only shows when DIFFERENT faculty teach same subject */}
      {duplicates.length > 0 && (
        <Card style={{ borderLeft: `4px solid ${C.accent.red}` }}>
          <h4>🔄 Faculty Conflict: Same Subject Taught by Multiple Faculty</h4>
          <p>These subjects are assigned to <strong>different faculty</strong> (each subject should ideally be taught by ONE faculty across all sections):</p>
          {duplicates.map(dup => (
            <div key={dup.subjectId} style={{ marginTop: 12, padding: 12, background: C.cardHover, borderRadius: 8 }}>
              <strong>{dup.subjectName}</strong> (Semester {dup.semester})
              <div style={{ marginTop: 8, marginLeft: 16 }}>
                {dup.faculties.map(f => {
                  const faculty = facultyList.find(fac => fac.id === f.facultyId);
                  const { remainingHours } = getFacultyWorkloadInfo(faculty);
                  return (
                    <div key={f.facultyId} style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                      <span>👨‍🏫 {faculty?.name || f.facultyName} - Teaching {f.sectionCount} section(s) ({remainingHours}h remaining)</span>
                      <Button 
                        size="sm" 
                        variant="danger"
                        onClick={() => {
                          // Remove all assignments for this faculty for this subject
                          if (confirm(`Remove ${faculty?.name} from ${dup.subjectName}?`)) {
                            for (const courseId of f.courseDetailIds) {
                              const updatedDetails = (AppState.courseDetails || []).filter(d => d.id !== courseId);
                              AppState.courseDetails = updatedDetails;
                              saveToStorage(STORAGE_KEYS.COURSE_DETAILS, updatedDetails);
                            }
                            checkStatus();
                            window.dispatchEvent(new Event('storage'));
                            alert(`Removed ${faculty?.name} from ${dup.subjectName}`);
                          }
                        }}
                      >
                        Remove All Sections
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          
          <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
            <Select
              label="Resolution Strategy"
              value={assignmentStrategy}
              onChange={(e) => setAssignmentStrategy(e.target.value)}
              options={[
                { value: "priority", label: "Keep highest priority faculty" },
                { value: "workload", label: "Keep faculty with most available hours" }
              ]}
            />
            <Button onClick={resolveDuplicates} variant="warning">
              Auto-Resolve Conflicts (Keep One Faculty)
            </Button>
          </div>
          <p style={{ marginTop: 8, fontSize: 12, color: C.text.secondary }}>
            💡 Note: The same faculty teaching multiple sections of the same subject is NOT a conflict.
            This warning only appears when DIFFERENT faculty are assigned to the same subject.
          </p>
        </Card>
      )}

      {/* Current Assignments Overview */}
      <Card>
        <h4>📋 Current Assignments Overview</h4>
        <div style={{ marginTop: 12, maxHeight: "400px", overflowY: "auto" }}>
          {facultyList.map(faculty => {
            const assignments = (AppState.courseDetails || []).filter(
              c => c.course === department && c.facultyId === faculty.id
            );
            const { currentHours, maxHours, remainingHours } = getFacultyWorkloadInfo(faculty);
            
            // Group assignments by subject to show section counts
            const groupedAssignments = new Map();
            for (const assignment of assignments) {
              if (!groupedAssignments.has(assignment.subjectId)) {
                groupedAssignments.set(assignment.subjectId, {
                  name: assignment.subjectName,
                  hours: assignment.totalWeeklyClasses,
                  sections: []
                });
              }
              groupedAssignments.get(assignment.subjectId).sections.push(assignment);
            }
            
            return (
              <div key={faculty.id} style={{ 
                marginBottom: 16, 
                padding: 12, 
                background: C.cardHover, 
                borderRadius: 8,
                borderLeft: `4px solid ${remainingHours >= 0 ? C.accent.green : C.accent.red}`
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <strong>{faculty.name} ({faculty.designation})</strong>
                  <Badge variant={remainingHours >= 0 ? "success" : "danger"}>
                    {currentHours}/{maxHours} hours ({remainingHours}h remaining)
                  </Badge>
                </div>
                {assignments.length > 0 ? (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {Array.from(groupedAssignments.entries()).map(([subjectId, data]) => (
                      <Badge key={subjectId} variant="info" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {data.name} ({data.hours}h) - {data.sections.length} section(s)
                        <span 
                          onClick={() => {
                            if (confirm(`Remove all sections of ${data.name} from ${faculty.name}?`)) {
                              for (const assignment of data.sections) {
                                const updatedDetails = (AppState.courseDetails || []).filter(d => d.id !== assignment.id);
                                AppState.courseDetails = updatedDetails;
                                saveToStorage(STORAGE_KEYS.COURSE_DETAILS, updatedDetails);
                              }
                              checkStatus();
                              window.dispatchEvent(new Event('storage'));
                              alert(`Removed ${data.name} from ${faculty.name}`);
                            }
                          }}
                          style={{ cursor: "pointer", color: C.accent.red, marginLeft: 4, fontWeight: "bold" }}
                        >
                          ×
                        </span>
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: 12, color: C.text.secondary, marginTop: 8 }}>No assignments yet</p>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Assignment Report */}
      {report && (
        <Card>
          <Title level={4}>📊 Assignment Report</Title>
          
          <div style={{ marginTop: 16 }}>
            <h5>Faculty Assignments:</h5>
            {report.facultyAssignments.map(assignment => (
              <div key={assignment.facultyId} style={{ 
                marginTop: 12, 
                padding: 12, 
                background: C.cardHover, 
                borderRadius: 8,
                borderLeft: `4px solid ${assignment.hasCapacity ? C.accent.green : C.accent.red}`
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong>{assignment.facultyName}</strong>
                  <Badge variant={assignment.hasCapacity ? "success" : "danger"}>
                    {assignment.totalHours}/{assignment.maxHours} hours ({assignment.utilization.toFixed(0)}%)
                  </Badge>
                </div>
                <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {assignment.subjects.map(subject => (
                    <Badge key={subject.subjectId} variant="info">
                      {subject.subjectName} ({subject.hours}h)
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {report.recommendations.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <h5>Recommendations:</h5>
              {report.recommendations.map((rec, idx) => (
                <div key={idx} style={{ marginTop: 8, padding: 8, background: C.accent.blueBg, borderRadius: 4 }}>
                  <strong>{rec.type}:</strong> {rec.message}
                  {rec.action && <p style={{ fontSize: 12, marginTop: 4 }}>💡 {rec.action}</p>}
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <Button 
          onClick={runAutoAssignment} 
          variant="primary" 
          size="lg"
          disabled={autoAssigning}
        >
          {autoAssigning ? "⏳ Assigning..." : "🎯 Auto-Assign All Subjects"}
        </Button>
        {onCancel && (
          <Button onClick={onCancel} variant="secondary" size="lg">
            Cancel
          </Button>
        )}
        <Button onClick={onComplete} variant="success" size="lg">
          ✓ Done, Proceed to Dean Approval
        </Button>
      </div>

      {/* Instructions */}
      <Card style={{ background: C.accent.blueBg }}>
        <h4>📖 How Subject Assignment Works:</h4>
        <ol style={{ marginTop: 8, paddingLeft: 20 }}>
          <li><strong>Same Faculty, Multiple Sections:</strong> A faculty can teach the same subject for different sections - this is NOT a conflict</li>
          <li><strong>Different Faculty, Same Subject:</strong> This creates a conflict - only one faculty should teach a subject across all sections</li>
          <li><strong>Workload Display:</strong> Shows remaining hours for each faculty when assigning</li>
          <li><strong>Partial Subjects:</strong> Shows which sections are already assigned and how many missing</li>
          <li><strong>Auto-Assign:</strong> Automatically distributes subjects based on faculty preferences and workload</li>
        </ol>
        <p style={{ marginTop: 12, fontSize: 13, color: C.text.secondary }}>
          💡 <strong>Best Practice:</strong> Assign each subject to ONE faculty who will teach all 3 sections 
          (unless workload constraints require splitting across multiple faculty, which will be flagged as a conflict).
        </p>
      </Card>
    </div>
  );
}