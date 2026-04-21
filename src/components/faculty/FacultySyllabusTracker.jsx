// import { useState, useEffect } from "react";
// import { Card, Title, Badge } from "../common";
// import { AppState } from "../../AppState";
// import { C } from "../../styles/theme";

// export function FacultySyllabusTracker({ faculty }) {
//   const [refresh, setRefresh] = useState(0);
  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRefresh(r => r + 1);
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const courseDetails = AppState.getCourseDetailsByFacultyId(faculty.id);
  
//   const toggleModule = (subjectId, moduleIndex) => {
//     AppState.updateSyllabusProgress(faculty.id, subjectId, moduleIndex, 
//       !AppState.syllabusProgress[`${faculty.id}_${subjectId}`]?.modules[moduleIndex]
//     );
//     setRefresh(r => r + 1);
//   };
  
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//       <Title>Syllabus Progress Tracker</Title>
      
//       {courseDetails.filter(c => c.deanStatus === "approved").length === 0 ? (
//         <Card>
//           <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>
//             No approved courses yet. Wait for dean's approval.
//           </p>
//         </Card>
//       ) : (
//         courseDetails.filter(c => c.deanStatus === "approved").map(course => {
//           const progress = AppState.getSyllabusProgress(faculty.id, course.subjectId);
//           const completedModules = progress?.completedModules || 0;
//           const totalModules = course.modules;
//           const completionPercentage = progress?.completionPercentage || 0;
          
//           return (
//             <Card key={course.id}>
//               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
//                 <div>
//                   <h4 style={{ color: C.accent.blue, fontSize: 16, fontWeight: 600 }}>{course.subjectName}</h4>
//                   <p style={{ color: C.text.tertiary, fontSize: 12 }}>Code: {course.subjectCode} | Semester {course.semester}</p>
//                 </div>
//                 <Badge variant={completionPercentage >= 75 ? "success" : completionPercentage >= 50 ? "warning" : "danger"}>
//                   {Math.round(completionPercentage)}% Complete
//                 </Badge>
//               </div>
              
//               <div style={{ marginBottom: 16 }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
//                   <span style={{ color: C.text.secondary, fontSize: 13 }}>Progress: {completedModules}/{totalModules} Modules</span>
//                 </div>
//                 <div style={{ height: 8, background: C.border, borderRadius: 10, overflow: "hidden" }}>
//                   <div style={{ height: "100%", width: `${completionPercentage}%`, background: completionPercentage >= 75 ? C.accent.green : completionPercentage >= 50 ? C.accent.gold : C.accent.red }} />
//                 </div>
//               </div>
              
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 8 }}>
//                 {Array.from({ length: totalModules }).map((_, idx) => {
//                   const isCompleted = progress?.modules[idx] || false;
//                   return (
//                     <button
//                       key={idx}
//                       onClick={() => toggleModule(course.subjectId, idx)}
//                       style={{
//                         padding: "8px",
//                         background: isCompleted ? C.accent.greenBg : "transparent",
//                         border: `1px solid ${isCompleted ? C.accent.green : C.border}`,
//                         borderRadius: 8,
//                         cursor: "pointer",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 8,
//                         color: C.text.primary,
//                       }}
//                     >
//                       <div style={{
//                         width: 16,
//                         height: 16,
//                         borderRadius: 4,
//                         background: isCompleted ? C.accent.green : "transparent",
//                         border: `2px solid ${isCompleted ? C.accent.green : C.text.tertiary}`,
//                       }}>
//                         {isCompleted && <span style={{ color: "#ffffff", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</span>}
//                       </div>
//                       <span style={{ fontSize: 12 }}>Module {idx + 1}</span>
//                     </button>
//                   );
//                 })}
//               </div>
//             </Card>
//           );
//         })
//       )}
//     </div>
//   );
// }

// src/components/faculty/FacultySyllabusTracker.jsx
import { useState, useEffect } from "react";
import { Card, Title, Badge, Button, Input } from "../common";
import { AppState } from "../../AppState";
import { C } from "../../styles/theme";

export function FacultySyllabusTracker({ faculty }) {
  const [refresh, setRefresh] = useState(0);
  const [selectedConflict, setSelectedConflict] = useState(null);
  const [facultyResponse, setFacultyResponse] = useState("");
  const [responseType, setResponseType] = useState("explanation");
  
  useEffect(() => {
    const handleStorageChange = () => {
      setRefresh(r => r + 1);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  // Get course details for this faculty - show both approved and pending
  // But only allow progress update for approved courses
  const allCourseDetails = AppState.getCourseDetailsByFacultyId(faculty.id);
  const approvedCourses = allCourseDetails.filter(c => c.deanStatus === "approved");
  const pendingCourses = allCourseDetails.filter(c => c.deanStatus === "pending");
  
  const conflicts = AppState.getUnresolvedSyllabusConflicts().filter(c => c.facultyId === faculty.id);
  
  const toggleModule = (subjectId, moduleIndex, isApproved) => {
    // Only allow updates for approved courses
    if (!isApproved) {
      alert("You can only update syllabus progress for approved courses. Please wait for dean's approval.");
      return;
    }
    
    const currentProgress = AppState.getSyllabusProgress(faculty.id, subjectId);
    const newCompletedState = !currentProgress?.modules[moduleIndex];
    
    AppState.updateSyllabusProgress(faculty.id, subjectId, moduleIndex, newCompletedState);
    setRefresh(r => r + 1);
  };
  
  const handleConflictResponse = (conflictId) => {
    if (!facultyResponse.trim()) {
      alert("Please provide a response or explanation");
      return;
    }
    AppState.facultyRespondToConflict(conflictId, responseType, facultyResponse);
    setSelectedConflict(null);
    setFacultyResponse("");
    setRefresh(r => r + 1);
    alert("Response sent to Dean");
  };
  
  const getSeverityMessage = (severity) => {
    switch(severity) {
      case "critical":
        return "⚠️ CRITICAL: Immediate action required! Please meet the Dean urgently.";
      case "high":
        return "🔴 HIGH: Dean review required. Please provide explanation or request meeting.";
      case "medium":
        return "🟡 MEDIUM: Please provide explanation for the progress discrepancy.";
      default:
        return "Monitor only - No action required";
    }
  };
  
  const getSeverityColor = (severity) => {
    switch(severity) {
      case "critical": return C.accent.red;
      case "high": return "#f97316";
      case "medium": return C.accent.gold;
      default: return C.accent.green;
    }
  };
  
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Title>Syllabus Progress Tracker</Title>
      
      {/* Info Banner */}
      <Card style={{ background: C.accent.blueBg, borderLeft: `4px solid ${C.accent.blue}` }}>
        <p style={{ color: C.text.primary, margin: 0 }}>
          📚 <strong>How it works:</strong> Mark modules as completed as you teach them. 
          Students will mark their own progress, and the system will alert the Dean if there are significant discrepancies.
        </p>
      </Card>
      
      {/* Conflicts Alert Section */}
      {conflicts.length > 0 && (
        <Card style={{ border: `2px solid ${C.accent.red}`, background: C.accent.redBg }}>
          <Title level={4} style={{ color: C.accent.red, marginBottom: 12 }}>
            ⚠️ Attention Required: Progress Conflicts Detected
          </Title>
          {conflicts.map(conflict => (
            <div key={conflict.id} style={{ marginBottom: 16, padding: 12, background: C.surface, borderRadius: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <strong style={{ color: C.text.primary }}>{conflict.subjectName}</strong>
                <Badge variant={conflict.severity === "critical" ? "danger" : conflict.severity === "high" ? "warning" : "info"}>
                  {conflict.severity.toUpperCase()}
                </Badge>
              </div>
              <p style={{ color: C.text.secondary, fontSize: 13, marginBottom: 8 }}>
                {getSeverityMessage(conflict.severity)}
              </p>
              <div style={{ marginBottom: 8 }}>
                <p><strong>Your Progress:</strong> {conflict.facultyProgress}/{conflict.totalModules} modules</p>
                <p><strong>Student Average:</strong> {conflict.averageStudentProgress.toFixed(1)}/{conflict.totalModules} modules</p>
                <p><strong>Difference:</strong> {conflict.severityPercentage.toFixed(1)}%</p>
              </div>
              
              {!conflict.facultyResponse ? (
                <Button onClick={() => setSelectedConflict(conflict)} variant="warning" size="sm">
                  Respond to Dean
                </Button>
              ) : (
                <div style={{ padding: 8, background: C.accent.greenBg, borderRadius: 6 }}>
                  <p style={{ color: C.accent.green, fontSize: 12 }}>
                    ✓ Response sent to Dean on {new Date(conflict.facultyResponse.respondedAt).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          ))}
        </Card>
      )}
      
      {/* Approved Courses Section - Can update progress */}
      {approvedCourses.length > 0 && (
        <>
          <Title level={4}>Active Courses (Progress Tracking Enabled)</Title>
          {approvedCourses.map(course => {
            const progress = AppState.getSyllabusProgress(faculty.id, course.subjectId);
            const completedModules = progress?.completedModules || 0;
            const totalModules = course.modules;
            const completionPercentage = progress?.completionPercentage || 0;
            
            // Check if this course has a conflict
            const courseConflict = conflicts.find(c => c.subjectId === course.subjectId);
            
            return (
              <Card key={course.id} style={courseConflict ? { border: `2px solid ${getSeverityColor(courseConflict.severity)}` } : {}}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <div>
                    <h4 style={{ color: C.accent.blue, fontSize: 16, fontWeight: 600 }}>{course.subjectName}</h4>
                    <p style={{ color: C.text.tertiary, fontSize: 12 }}>Code: {course.subjectCode} | Semester {course.semester}</p>
                  </div>
                  <Badge variant={completionPercentage >= 75 ? "success" : completionPercentage >= 50 ? "warning" : "danger"}>
                    {Math.round(completionPercentage)}% Complete
                  </Badge>
                </div>
                
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ color: C.text.secondary, fontSize: 13 }}>Progress: {completedModules}/{totalModules} Modules</span>
                  </div>
                  <div style={{ height: 8, background: C.border, borderRadius: 10, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${completionPercentage}%`, background: completionPercentage >= 75 ? C.accent.green : completionPercentage >= 50 ? C.accent.gold : C.accent.red }} />
                  </div>
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 8 }}>
                  {Array.from({ length: totalModules }).map((_, idx) => {
                    const isCompleted = progress?.modules[idx] || false;
                    return (
                      <button
                        key={idx}
                        onClick={() => toggleModule(course.subjectId, idx, true)}
                        style={{
                          padding: "8px",
                          background: isCompleted ? C.accent.greenBg : "transparent",
                          border: `1px solid ${isCompleted ? C.accent.green : C.border}`,
                          borderRadius: 8,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          color: C.text.primary,
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          if (!isCompleted) {
                            e.currentTarget.style.background = C.cardHover;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isCompleted) {
                            e.currentTarget.style.background = "transparent";
                          }
                        }}
                      >
                        <div style={{
                          width: 16,
                          height: 16,
                          borderRadius: 4,
                          background: isCompleted ? C.accent.green : "transparent",
                          border: `2px solid ${isCompleted ? C.accent.green : C.text.tertiary}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                          {isCompleted && <span style={{ color: "#ffffff", fontSize: 10 }}>✓</span>}
                        </div>
                        <span style={{ fontSize: 12 }}>Module {idx + 1}</span>
                      </button>
                    );
                  })}
                </div>
                
                {courseConflict && courseConflict.facultyResponse && (
                  <div style={{ marginTop: 12, padding: 8, background: C.accent.greenBg, borderRadius: 6 }}>
                    <p style={{ color: C.accent.green, fontSize: 12 }}>
                      ✓ Response submitted to Dean on {new Date(courseConflict.facultyResponse.respondedAt).toLocaleString()}
                    </p>
                  </div>
                )}
                
                {courseConflict && !courseConflict.facultyResponse && (
                  <div style={{ marginTop: 12, padding: 8, background: C.accent.goldBg, borderRadius: 6 }}>
                    <p style={{ color: C.accent.gold, fontSize: 12 }}>
                      ⚠️ This course has a progress discrepancy. Please respond to the Dean's alert above.
                    </p>
                  </div>
                )}
              </Card>
            );
          })}
        </>
      )}
      
      {/* Pending Courses Section - Cannot update progress */}
      {pendingCourses.length > 0 && (
        <>
          <Title level={4}>Pending Approval Courses (Progress Tracking Locked)</Title>
          <Card style={{ background: C.accent.goldBg }}>
            <p style={{ color: C.accent.gold, marginBottom: 12 }}>
              ⏳ The following courses are waiting for dean's approval. You cannot update syllabus progress until they are approved.
            </p>
            {pendingCourses.map(course => (
              <div key={course.id} style={{ 
                padding: 12, 
                borderBottom: `1px solid ${C.border}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div>
                  <strong>{course.subjectName}</strong>
                  <p style={{ fontSize: 12, color: C.text.tertiary, margin: 0 }}>{course.subjectCode} | Semester {course.semester}</p>
                </div>
                <Badge variant="warning">Pending Approval</Badge>
              </div>
            ))}
          </Card>
        </>
      )}
      
      {/* No Courses Message */}
      {approvedCourses.length === 0 && pendingCourses.length === 0 && (
        <Card>
          <p style={{ color: C.text.tertiary, textAlign: "center", padding: "40px 0" }}>
            No courses assigned yet. Please wait for subject allocation.
          </p>
        </Card>
      )}
      
      {/* Faculty Response Modal */}
      {selectedConflict && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <Card padding="24px" style={{ width: 500, maxWidth: "90%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <Title level={3}>Respond to Dean</Title>
              <button 
                onClick={() => setSelectedConflict(null)}
                style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: C.text.tertiary }}
              >
                ×
              </button>
            </div>
            
            <div style={{ marginBottom: 16 }}>
              <p><strong>Subject:</strong> {selectedConflict.subjectName}</p>
              <p><strong>Severity:</strong> <span style={{ color: getSeverityColor(selectedConflict.severity) }}>{selectedConflict.severity.toUpperCase()}</span></p>
              <p><strong>Issue:</strong> {selectedConflict.requiredAction}</p>
              <div style={{ marginTop: 12, padding: 12, background: C.surface, borderRadius: 6 }}>
                <p style={{ fontSize: 13, margin: 0 }}>
                  <strong>Your Progress:</strong> {selectedConflict.facultyProgress}/{selectedConflict.totalModules} modules<br />
                  <strong>Student Average:</strong> {selectedConflict.averageStudentProgress.toFixed(1)}/{selectedConflict.totalModules} modules<br />
                  <strong>Difference:</strong> {selectedConflict.severityPercentage.toFixed(1)}%
                </p>
              </div>
            </div>
            
            <div style={{ marginBottom: 16 }}>
              <label style={{ color: C.text.secondary, display: "block", marginBottom: 8 }}>Response Type:</label>
              <select 
                value={responseType}
                onChange={(e) => setResponseType(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: 8,
                  color: C.text.primary
                }}
              >
                <option value="explanation">Provide Explanation</option>
                <option value="meeting_requested">Request Meeting with Dean</option>
              </select>
            </div>
            
            <div style={{ marginBottom: 20 }}>
              <label style={{ color: C.text.secondary, display: "block", marginBottom: 8 }}>
                {responseType === "explanation" ? "Your Explanation:" : "Reason for Meeting Request:"}
              </label>
              <textarea
                value={facultyResponse}
                onChange={(e) => setFacultyResponse(e.target.value)}
                rows={5}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: 8,
                  color: C.text.primary,
                  resize: "vertical"
                }}
                placeholder={responseType === "explanation" 
                  ? "Please explain the reason for progress discrepancy (e.g., slower pace due to student understanding, technical issues, etc.)..." 
                  : "Please explain why you need to meet with the Dean to discuss this discrepancy..."}
              />
            </div>
            
            <div style={{ display: "flex", gap: 12 }}>
              <Button onClick={() => handleConflictResponse(selectedConflict.id)} variant="success" fullWidth>
                Send Response
              </Button>
              <Button onClick={() => setSelectedConflict(null)} variant="secondary" fullWidth>
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}