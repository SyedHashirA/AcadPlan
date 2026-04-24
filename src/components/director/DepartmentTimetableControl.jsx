// src/components/director/DepartmentTimetableControl.jsx
import { useState, useEffect } from "react";
import { Card, Title, Badge, Button } from "../common";
import { COURSES } from "../../data/mockData";
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "../../utils/storage";
import { AppState } from "../../AppState";
import { C } from "../../styles/theme";

export function DepartmentTimetableControl({ onRefresh }) {
  const [activeDepartment, setActiveDepartment] = useState(null);
  const [departmentStatus, setDepartmentStatus] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDepartmentStatus();
    
    const handleStorageChange = () => {
      loadDepartmentStatus();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadDepartmentStatus = () => {
    const saved = loadFromStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, {});
    const active = loadFromStorage(STORAGE_KEYS.ACTIVE_DEPARTMENT, null);
    console.log("Loaded active department:", active);
    console.log("Loaded department status:", saved);
    setDepartmentStatus(saved);
    setActiveDepartment(active);
  };

  const saveDepartmentStatus = (dept, status) => {
    console.log("Saving active department:", dept);
    console.log("Saving department status:", status);
    saveToStorage(STORAGE_KEYS.ACTIVE_DEPARTMENT, dept);
    saveToStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, status);
    window.dispatchEvent(new Event('storage'));
  };

  // Check if all prerequisites are met for activation
  const canActivate = (department) => {
    const allFormStatus = loadFromStorage(STORAGE_KEYS.FORM_STATUS, {});
    const formStatus = allFormStatus[department];
    
    // Form must be floated
    if (!formStatus?.isFloated) {
      return { can: false, reason: "Preference form not floated yet" };
    }
    
    // Check if preferences are approved by Dean
    const facultyPreferences = AppState.subjectPreferences || [];
    const departmentFaculty = AppState.faculty.filter(f => f.course === department);
    
    if (departmentFaculty.length === 0) {
      return { can: false, reason: "No faculty assigned to this department" };
    }
    
    const allPreferencesSubmitted = departmentFaculty.every(f => {
      const pref = facultyPreferences.find(p => p.facultyId === f.id);
      return pref?.submitted === true;
    });
    
    if (!allPreferencesSubmitted) {
      const submittedCount = departmentFaculty.filter(f => {
        const pref = facultyPreferences.find(p => p.facultyId === f.id);
        return pref?.submitted === true;
      }).length;
      return { can: false, reason: `${submittedCount}/${departmentFaculty.length} faculty have submitted preferences` };
    }
    
    const allPreferencesApproved = departmentFaculty.every(f => {
      const pref = facultyPreferences.find(p => p.facultyId === f.id);
      return pref?.status === "approved";
    });
    
    if (!allPreferencesApproved) {
      const approvedCount = departmentFaculty.filter(f => {
        const pref = facultyPreferences.find(p => p.facultyId === f.id);
        return pref?.status === "approved";
      }).length;
      return { can: false, reason: `${approvedCount}/${departmentFaculty.length} preferences approved by Dean` };
    }
    
    // Check if course details are approved by Dean
    const courseDetails = AppState.courseDetails || [];
    const departmentCourses = courseDetails.filter(c => c.course === department);
    
    if (departmentCourses.length === 0) {
      return { can: false, reason: "No course details submitted yet" };
    }
    
    const allCoursesApproved = departmentCourses.every(c => c.deanStatus === "approved");
    
    if (!allCoursesApproved) {
      const approvedCount = departmentCourses.filter(c => c.deanStatus === "approved").length;
      return { can: false, reason: `${approvedCount}/${departmentCourses.length} course details approved by Dean` };
    }
    
    return { can: true, reason: null };
  };

  const handleSetActive = (department) => {
    console.log("Attempting to activate department:", department);
    
    const activationCheck = canActivate(department);
    
    if (!activationCheck.can) {
      alert(`Cannot activate ${department}.\n\nReason: ${activationCheck.reason}`);
      return;
    }
    
    // Directly save to localStorage without waiting for state
    if (activeDepartment && activeDepartment !== department) {
      if (confirm(`Switch to ${department}? This will deactivate ${activeDepartment} timetable generation.`)) {
        // Save directly to localStorage
        saveToStorage(STORAGE_KEYS.ACTIVE_DEPARTMENT, department);
        saveToStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, departmentStatus);
        window.dispatchEvent(new Event('storage'));
        // Update state
        setActiveDepartment(department);
        alert(`${department} activated successfully! Dean can now generate the timetable.`);
        if (onRefresh) onRefresh();
      }
    } else if (!activeDepartment) {
      // Save directly to localStorage
      saveToStorage(STORAGE_KEYS.ACTIVE_DEPARTMENT, department);
      saveToStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, departmentStatus);
      window.dispatchEvent(new Event('storage'));
      // Update state
      setActiveDepartment(department);
      alert(`${department} activated successfully! Dean can now generate the timetable.`);
      if (onRefresh) onRefresh();
    } else if (activeDepartment === department) {
      alert(`${department} is already active.`);
    }
  };

  const handleMarkCompleted = (department) => {
    if (confirm(`Mark ${department} timetable as completed? This will lock it from further changes.`)) {
      const updatedStatus = {
        ...departmentStatus,
        [department]: {
          ...departmentStatus[department],
          completed: true,
          completedAt: new Date().toISOString()
        }
      };
      setDepartmentStatus(updatedStatus);
      saveToStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, updatedStatus);
      window.dispatchEvent(new Event('storage'));
      if (onRefresh) onRefresh();
    }
  };

  const handleReset = (department) => {
    if (confirm(`Reset ${department} timetable? This will allow regeneration.`)) {
      const updatedStatus = {
        ...departmentStatus,
        [department]: {
          ...departmentStatus[department],
          completed: false,
          completedAt: null,
          slotsGenerated: null
        }
      };
      setDepartmentStatus(updatedStatus);
      saveToStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, updatedStatus);
      window.dispatchEvent(new Event('storage'));
      if (onRefresh) onRefresh();
    }
  };

  const handleDeactivate = () => {
    if (activeDepartment) {
      if (confirm(`Deactivate ${activeDepartment}? No department will be active for timetable generation.`)) {
        // Save null to localStorage
        saveToStorage(STORAGE_KEYS.ACTIVE_DEPARTMENT, null);
        window.dispatchEvent(new Event('storage'));
        // Update state
        setActiveDepartment(null);
        if (onRefresh) onRefresh();
      }
    }
  };

  const getDepartmentColor = (department) => {
    switch(department) {
      case "BTech": return C.accent.blue;
      case "BSc": return C.accent.green;
      case "BCA": return C.accent.gold;
      default: return C.text.primary;
    }
  };

  const getDepartmentBg = (department) => {
    switch(department) {
      case "BTech": return C.accent.blueBg;
      case "BSc": return C.accent.greenBg;
      case "BCA": return C.accent.goldBg;
      default: return C.cardHover;
    }
  };

  const getDepartmentIcon = (department) => {
    switch(department) {
      case "BTech": return "🔧";
      case "BSc": return "🔬";
      case "BCA": return "💻";
      default: return "📚";
    }
  };

  const getFormStatus = (department) => {
    const allFormStatus = loadFromStorage(STORAGE_KEYS.FORM_STATUS, {});
    return allFormStatus[department] || null;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Title>Department Timetable Control</Title>
      
      <div style={{ marginBottom: 16, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
        <p style={{ color: C.accent.blue, margin: 0, fontWeight: 600 }}>
          📋 <strong>Activation Prerequisites:</strong>
        </p>
        <ul style={{ color: C.text.secondary, fontSize: 13, marginTop: 8, paddingLeft: 20 }}>
          <li>✓ Preference form must be floated</li>
          <li>✓ All faculty must have submitted their preferences</li>
          <li>✓ Dean must have approved all preferences</li>
          <li>✓ All course details must be approved by Dean</li>
          <li>✓ Once activated, Dean can generate the timetable</li>
        </ul>
      </div>

      {/* Current Active Department Display */}
      <div style={{ 
        padding: 16, 
        background: activeDepartment ? getDepartmentBg(activeDepartment) : C.accent.goldBg, 
        borderRadius: 12,
        textAlign: "center",
        marginBottom: 8
      }}>
        <p style={{ margin: 0, fontWeight: 600 }}>
          Currently Active Department: 
          <span style={{ color: activeDepartment ? getDepartmentColor(activeDepartment) : C.accent.gold, marginLeft: 8 }}>
            {activeDepartment || "None"}
          </span>
        </p>
        {activeDepartment && (
          <Button 
            onClick={handleDeactivate} 
            variant="secondary" 
            size="sm"
            style={{ marginTop: 12 }}
          >
            Deactivate {activeDepartment}
          </Button>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        {COURSES.map(department => {
          const isActive = activeDepartment === department;
          const isCompleted = departmentStatus[department]?.completed;
          const completedAt = departmentStatus[department]?.completedAt;
          const slotsGenerated = departmentStatus[department]?.slotsGenerated;
          const formStatus = getFormStatus(department);
          const isFormFloated = formStatus?.isFloated;
          const activationCheck = canActivate(department);
          const isDeadlinePassed = formStatus?.deadline ? new Date() > new Date(formStatus.deadline) : false;
          
          return (
            <Card 
              key={department}
              style={{ 
                background: isActive ? getDepartmentBg(department) : C.surface,
                border: isActive ? `2px solid ${getDepartmentColor(department)}` : `1px solid ${C.border}`,
                opacity: isActive ? 1 : 0.85,
                position: "relative",
                overflow: "hidden"
              }}
            >
              {isActive && (
                <div style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  background: getDepartmentColor(department),
                  color: "white",
                  padding: "4px 12px",
                  fontSize: 11,
                  fontWeight: 600,
                  borderRadius: "0 12px 0 12px"
                }}>
                  ACTIVE
                </div>
              )}
              
              <div style={{ textAlign: "center" }}>
                <div style={{ 
                  width: 60, 
                  height: 60, 
                  borderRadius: "50%", 
                  background: getDepartmentBg(department),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px auto"
                }}>
                  <span style={{ fontSize: 28 }}>{getDepartmentIcon(department)}</span>
                </div>
                <Title level={3}>{department}</Title>
                
                <div style={{ marginTop: 8, display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                  {isActive ? (
                    <Badge variant="success">✓ Active</Badge>
                  ) : isCompleted ? (
                    <Badge variant="primary">✓ Completed</Badge>
                  ) : (
                    <Badge variant="warning">⏳ Not Started</Badge>
                  )}
                  
                  {isFormFloated && (
                    <Badge variant="success">Form Floated</Badge>
                  )}
                </div>

                {isCompleted && slotsGenerated && (
                  <p style={{ fontSize: 11, color: C.text.tertiary, marginTop: 8 }}>
                    {slotsGenerated} slots generated
                  </p>
                )}

                {isFormFloated && formStatus?.deadline && (
                  <p style={{ fontSize: 10, color: isDeadlinePassed ? C.accent.red : C.text.tertiary, marginTop: 4 }}>
                    Deadline: {new Date(formStatus.deadline).toLocaleDateString()}
                    {isDeadlinePassed && " (Passed)"}
                  </p>
                )}

                <div style={{ marginTop: 16, display: "flex", gap: 8, flexDirection: "column" }}>
                  {!isActive && !isCompleted && (
                    <Button 
                      onClick={() => handleSetActive(department)} 
                      variant="primary" 
                      fullWidth
                      size="sm"
                      disabled={!activationCheck.can}
                      title={!activationCheck.can ? activationCheck.reason : ""}
                    >
                      Activate {department}
                    </Button>
                  )}
                  
                  {!isActive && !isCompleted && !activationCheck.can && (
                    <p style={{ fontSize: 11, color: C.accent.red, textAlign: "center", marginTop: 4 }}>
                      ⚠️ {activationCheck.reason}
                    </p>
                  )}
                  
                  {isActive && !isCompleted && (
                    <>
                      <Button 
                        onClick={() => handleMarkCompleted(department)} 
                        variant="success" 
                        fullWidth
                        size="sm"
                      >
                        Mark {department} as Completed
                      </Button>
                    </>
                  )}
                  
                  {isCompleted && (
                    <>
                      <Badge variant="success">Timetable Generated ✓</Badge>
                      {completedAt && (
                        <p style={{ fontSize: 10, color: C.text.tertiary, margin: 0 }}>
                          Completed: {new Date(completedAt).toLocaleString()}
                        </p>
                      )}
                      <Button 
                        onClick={() => handleReset(department)} 
                        variant="warning" 
                        fullWidth
                        size="sm"
                      >
                        Reset {department}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Status Summary Table */}
      <Card>
        <Title level={4}>Activation Prerequisites Status</Title>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Department</th>
                <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Form Floated</th>
                <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Preferences Submitted</th>
                <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Preferences Approved</th>
                <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Course Details Approved</th>
                <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Ready to Activate</th>
              </tr>
            </thead>
            <tbody>
              {COURSES.map(department => {
                const formStatus = getFormStatus(department);
                const isFormFloated = formStatus?.isFloated;
                
                const departmentFaculty = AppState.faculty.filter(f => f.course === department);
                const facultyPreferences = AppState.subjectPreferences || [];
                const allSubmitted = departmentFaculty.every(f => {
                  const pref = facultyPreferences.find(p => p.facultyId === f.id);
                  return pref?.submitted === true;
                });
                const allApproved = departmentFaculty.every(f => {
                  const pref = facultyPreferences.find(p => p.facultyId === f.id);
                  return pref?.status === "approved";
                });
                
                const courseDetails = AppState.courseDetails || [];
                const departmentCourses = courseDetails.filter(c => c.course === department);
                const allCoursesApproved = departmentCourses.length > 0 && departmentCourses.every(c => c.deanStatus === "approved");
                
                const isReady = isFormFloated && allSubmitted && allApproved && allCoursesApproved;
                
                return (
                  <tr key={department} style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td style={{ padding: 12, fontWeight: 600, color: getDepartmentColor(department) }}>
                      {department}
                    </td>
                    <td style={{ padding: 12 }}>
                      {isFormFloated ? <Badge variant="success">✓</Badge> : <Badge variant="danger">✗</Badge>}
                    </td>
                    <td style={{ padding: 12 }}>
                      {allSubmitted ? <Badge variant="success">✓</Badge> : <Badge variant="danger">✗</Badge>}
                    </td>
                    <td style={{ padding: 12 }}>
                      {allApproved ? <Badge variant="success">✓</Badge> : <Badge variant="danger">✗</Badge>}
                    </td>
                    <td style={{ padding: 12 }}>
                      {allCoursesApproved ? <Badge variant="success">✓</Badge> : <Badge variant="danger">✗</Badge>}
                    </td>
                    <td style={{ padding: 12 }}>
                      {isReady ? (
                        <Badge variant="success">Ready</Badge>
                      ) : (
                        <Badge variant="danger">Not Ready</Badge>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Instructions Card */}
      <Card>
        <Title level={4}>Instructions for Department-wise Timetable Generation</Title>
        <ol style={{ color: C.text.secondary, fontSize: 13, paddingLeft: 20, margin: 0 }}>
          <li><strong>Float the preference form</strong> - Set deadline for faculty submissions</li>
          <li><strong>Faculty submit preferences</strong> - Before the deadline</li>
          <li><strong>Dean approves preferences</strong> - Reviews and approves all faculty preferences</li>
          <li><strong>Faculty submit course details</strong> - After preference approval</li>
          <li><strong>Dean approves course details</strong> - Final approval before timetable generation</li>
          <li><strong>Activate the department</strong> - Click "Activate" button (once all prerequisites are met)</li>
          <li><strong>Dean generates timetable</strong> - For the active department only</li>
          <li><strong>Mark as completed</strong> - After successful generation</li>
          <li><strong>Repeat for next department</strong> - Deactivate current, activate next</li>
        </ol>
        
        <div style={{ marginTop: 16, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
          <p style={{ color: C.accent.blue, margin: 0, fontSize: 12 }}>
            💡 <strong>Note:</strong> The activation button works independently of the submission deadline. 
            You can activate a department even after the deadline has passed, as long as all prerequisites are met.
            The deadline only controls when faculty can submit their preferences.
          </p>
        </div>
      </Card>
    </div>
  );
}