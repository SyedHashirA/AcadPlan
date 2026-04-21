// import { useState, useEffect } from "react";
// import { Card, Title, Button } from "../common";
// import { AppState } from "../../AppState";
// import { C } from "../../styles/theme";

// export function AdminFlaggedIssuesPanel() {
//   const [refresh, setRefresh] = useState(0);
  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRefresh(r => r + 1);
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const flaggedIssues = AppState.getFlaggedIssues();
  
//   const handleResolve = (issueId) => {
//     AppState.resolveFlaggedIssue(issueId);
//     setRefresh(r => r + 1);
//   };
  
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//       <Title>Flagged Issues & Discrepancies</Title>
      
//       {flaggedIssues.length === 0 ? (
//         <Card>
//           <p style={{ color: C.accent.green, textAlign: "center", padding: "20px 0" }}>
//             ✓ No flagged issues at this time
//           </p>
//         </Card>
//       ) : (
//         flaggedIssues.map(issue => {
//           const faculty = issue.facultyId ? AppState.getFacultyById(issue.facultyId) : null;
//           const subject = AppState.subjects.find(s => s.id === issue.subjectId);
          
//           return (
//             <Card key={issue.id}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//                 <div>
//                   <h4 style={{ color: C.accent.red, fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
//                     ⚠ {issue.type === "student_faculty_discrepancy" ? "Student-Faculty Progress Discrepancy" : "Syllabus Progress Discrepancy"}
//                   </h4>
//                   <p style={{ color: C.text.primary, marginBottom: 8 }}>
//                     <span style={{ color: C.text.tertiary }}>Subject:</span> {subject?.name}
//                   </p>
//                   {faculty && (
//                     <p style={{ color: C.text.primary, marginBottom: 8 }}>
//                       <span style={{ color: C.text.tertiary }}>Faculty:</span> {faculty.name}
//                     </p>
//                   )}
//                   {issue.type === "student_faculty_discrepancy" ? (
//                     <>
//                       <p style={{ color: C.text.primary, marginBottom: 4 }}>
//                         <span style={{ color: C.text.tertiary }}>Faculty Progress:</span> {issue.facultyProgress} modules
//                       </p>
//                       <p style={{ color: C.text.primary, marginBottom: 8 }}>
//                         <span style={{ color: C.text.tertiary }}>Student Progress:</span> {issue.studentProgress} modules
//                       </p>
//                     </>
//                   ) : (
//                     <>
//                       <p style={{ color: C.text.primary, marginBottom: 4 }}>
//                         <span style={{ color: C.text.tertiary }}>Expected:</span> {issue.expectedPercentage?.toFixed(1)}%
//                       </p>
//                       <p style={{ color: C.text.primary, marginBottom: 8 }}>
//                         <span style={{ color: C.text.tertiary }}>Actual:</span> {issue.actualPercentage?.toFixed(1)}%
//                       </p>
//                     </>
//                   )}
//                   <p style={{ color: C.text.tertiary, fontSize: 12 }}>
//                     {new Date(issue.timestamp).toLocaleString()}
//                   </p>
//                 </div>
//                 <Button onClick={() => handleResolve(issue.id)} variant="success" size="sm">
//                   Mark Resolved
//                 </Button>
//               </div>
//             </Card>
//           );
//         })
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { Card, Title, Button, Badge } from "../common";
import { AppState } from "../../AppState";
import { C } from "../../styles/theme";

export function AdminFlaggedIssuesPanel() {
  const [refresh, setRefresh] = useState(0);
  const [selectedConflict, setSelectedConflict] = useState(null);
  const [deanAction, setDeanAction] = useState("");
  const [deanNotes, setDeanNotes] = useState("");
  const [filter, setFilter] = useState("all"); // all, critical, high, medium
  
  useEffect(() => {
    const handleStorageChange = () => {
      setRefresh(r => r + 1);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  const allConflicts = AppState.getUnresolvedSyllabusConflicts();
  const studentDiscrepancies = AppState.getFlaggedIssues().filter(i => i.type === "student_faculty_discrepancy");
  
  const filteredConflicts = filter === "all" 
    ? allConflicts 
    : allConflicts.filter(c => c.severity === filter);
  
  const handleResolve = (issueId) => {
    AppState.resolveFlaggedIssue(issueId);
    setRefresh(r => r + 1);
  };
  
  const handleDeanResolution = (conflictId) => {
    if (!deanAction) {
      alert("Please select an action");
      return;
    }
    AppState.deanResolveConflict(conflictId, deanAction, deanNotes);
    setSelectedConflict(null);
    setDeanAction("");
    setDeanNotes("");
    setRefresh(r => r + 1);
  };
  
  const getSeverityColor = (severity) => {
    switch(severity) {
      case "critical": return C.accent.red;
      case "high": return C.accent.orange || "#f97316";
      case "medium": return C.accent.gold;
      default: return C.accent.green;
    }
  };
  
  const getSeverityBadge = (severity) => {
    const colors = {
      critical: { bg: C.accent.redBg, color: C.accent.red, label: "🔴 CRITICAL" },
      high: { bg: "#fff3e0", color: "#f97316", label: "🟠 HIGH" },
      medium: { bg: C.accent.goldBg, color: C.accent.gold, label: "🟡 MEDIUM" },
      low: { bg: C.accent.greenBg, color: C.accent.green, label: "🟢 LOW" }
    };
    const style = colors[severity] || colors.medium;
    return <Badge style={{ background: style.bg, color: style.color }}>{style.label}</Badge>;
  };
  
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Title>Flagged Issues & Discrepancies</Title>
      
      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        {["all", "critical", "high", "medium"].map(f => (
          <Button 
            key={f}
            onClick={() => setFilter(f)}
            variant={filter === f ? "primary" : "outline"}
            size="sm"
          >
            {f.toUpperCase()} {f !== "all" && `(${allConflicts.filter(c => c.severity === f).length})`}
          </Button>
        ))}
      </div>
      
      {/* Statistics Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
        <Card padding="16px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Total Conflicts</p>
          <p style={{ color: C.accent.red, fontSize: 28, fontWeight: 700 }}>{allConflicts.length}</p>
        </Card>
        <Card padding="16px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Critical</p>
          <p style={{ color: C.accent.red, fontSize: 28, fontWeight: 700 }}>{allConflicts.filter(c => c.severity === "critical").length}</p>
        </Card>
        <Card padding="16px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>High</p>
          <p style={{ color: "#f97316", fontSize: 28, fontWeight: 700 }}>{allConflicts.filter(c => c.severity === "high").length}</p>
        </Card>
        <Card padding="16px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Student Discrepancies</p>
          <p style={{ color: C.accent.gold, fontSize: 28, fontWeight: 700 }}>{studentDiscrepancies.length}</p>
        </Card>
      </div>
      
      {filteredConflicts.length === 0 && studentDiscrepancies.length === 0 ? (
        <Card>
          <p style={{ color: C.accent.green, textAlign: "center", padding: "20px 0" }}>
            ✓ No flagged issues at this time
          </p>
        </Card>
      ) : (
        <>
          {/* Syllabus Conflicts Section */}
          {filteredConflicts.length > 0 && (
            <Card>
              <Title level={5}>📊 Syllabus Progress Conflicts</Title>
              {filteredConflicts.map(conflict => (
                <div key={conflict.id} style={{ 
                  marginBottom: 20, 
                  padding: 16, 
                  background: C.cardHover, 
                  borderRadius: 8,
                  borderLeft: `4px solid ${getSeverityColor(conflict.severity)}`
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div>
                      <h4 style={{ color: C.text.primary, fontSize: 16, fontWeight: 600 }}>
                        {conflict.subjectName}
                      </h4>
                      <p style={{ color: C.text.tertiary, fontSize: 13 }}>
                        Faculty: {conflict.facultyName}
                      </p>
                    </div>
                    {getSeverityBadge(conflict.severity)}
                  </div>
                  
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ color: C.text.secondary }}>Faculty Progress:</span>
                      <span style={{ color: C.accent.blue, fontWeight: 600 }}>{conflict.facultyProgress}/{conflict.totalModules} modules</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ color: C.text.secondary }}>Student Average:</span>
                      <span style={{ color: C.accent.gold, fontWeight: 600 }}>{conflict.averageStudentProgress.toFixed(1)}/{conflict.totalModules} modules</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ color: C.text.secondary }}>Difference:</span>
                      <span style={{ color: getSeverityColor(conflict.severity), fontWeight: 600 }}>
                        {Math.abs(conflict.facultyProgress - conflict.averageStudentProgress).toFixed(1)} modules ({conflict.severityPercentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div style={{ marginTop: 8, padding: 8, background: C.surface, borderRadius: 6 }}>
                      <span style={{ color: C.text.tertiary, fontSize: 12 }}>Required Action:</span>
                      <p style={{ color: getSeverityColor(conflict.severity), fontSize: 13, marginTop: 4 }}>
                        {conflict.requiredAction}
                      </p>
                    </div>
                  </div>
                  
                  {/* Faculty Response Section */}
                  {conflict.facultyResponse && (
                    <div style={{ marginBottom: 12, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
                      <p style={{ color: C.accent.blue, fontWeight: 600, marginBottom: 8 }}>
                        Faculty Response:
                      </p>
                      <p style={{ color: C.text.primary, fontSize: 13 }}>
                        <strong>Response Type:</strong> {conflict.facultyResponse.response === "explanation" ? "Provided Explanation" : "Requested Meeting"}<br />
                        <strong>Explanation:</strong> {conflict.facultyResponse.explanation}<br />
                        <strong>Responded on:</strong> {new Date(conflict.facultyResponse.respondedAt).toLocaleString()}
                      </p>
                    </div>
                  )}
                  
                  {/* Dean Action Section */}
                  {!conflict.resolved ? (
                    <div style={{ marginTop: 12 }}>
                      <Button 
                        onClick={() => setSelectedConflict(conflict)} 
                        variant="primary" 
                        size="sm"
                      >
                        Take Action
                      </Button>
                    </div>
                  ) : (
                    <div style={{ marginTop: 12, padding: 12, background: C.accent.greenBg, borderRadius: 8 }}>
                      <p style={{ color: C.accent.green, fontWeight: 600 }}>
                        ✓ Resolved - {conflict.resolution}
                      </p>
                      {conflict.deanAction && (
                        <p style={{ color: C.text.secondary, fontSize: 12, marginTop: 4 }}>
                          Dean's Notes: {conflict.deanAction.notes}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </Card>
          )}
          
          {/* Student-Faculty Discrepancies */}
          {studentDiscrepancies.length > 0 && (
            <Card>
              <Title level={5}>👥 Student-Faculty Progress Discrepancies</Title>
              {studentDiscrepancies.map(issue => {
                const faculty = issue.facultyId ? AppState.getFacultyById(issue.facultyId) : null;
                const subject = AppState.subjects.find(s => s.id === issue.subjectId);
                
                return (
                  <div key={issue.id} style={{ 
                    marginBottom: 16, 
                    padding: 16, 
                    background: C.cardHover, 
                    borderRadius: 8 
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <h4 style={{ color: C.accent.red, fontSize: 15, fontWeight: 600, marginBottom: 8 }}>
                          ⚠ Student-Faculty Progress Discrepancy
                        </h4>
                        <p style={{ color: C.text.primary, marginBottom: 4 }}>
                          <span style={{ color: C.text.tertiary }}>Subject:</span> {subject?.name}
                        </p>
                        {faculty && (
                          <p style={{ color: C.text.primary, marginBottom: 4 }}>
                            <span style={{ color: C.text.tertiary }}>Faculty:</span> {faculty.name}
                          </p>
                        )}
                        <p style={{ color: C.text.primary, marginBottom: 4 }}>
                          <span style={{ color: C.text.tertiary }}>Faculty Progress:</span> {issue.facultyProgress} modules
                        </p>
                        <p style={{ color: C.text.primary, marginBottom: 8 }}>
                          <span style={{ color: C.text.tertiary }}>Student Progress:</span> {issue.studentProgress} modules
                        </p>
                        <p style={{ color: C.text.tertiary, fontSize: 11 }}>
                          {new Date(issue.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <Button onClick={() => handleResolve(issue.id)} variant="success" size="sm">
                        Mark Resolved
                      </Button>
                    </div>
                  </div>
                );
              })}
            </Card>
          )}
        </>
      )}
      
      {/* Dean Action Modal */}
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
              <Title level={3}>Dean Action Required</Title>
              <button 
                onClick={() => setSelectedConflict(null)}
                style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: C.text.tertiary }}
              >
                ×
              </button>
            </div>
            
            <div style={{ marginBottom: 16 }}>
              <p><strong>Subject:</strong> {selectedConflict.subjectName}</p>
              <p><strong>Faculty:</strong> {selectedConflict.facultyName}</p>
              <p><strong>Severity:</strong> {selectedConflict.severity.toUpperCase()}</p>
              <p><strong>Difference:</strong> {selectedConflict.severityPercentage.toFixed(1)}%</p>
            </div>
            
            <div style={{ marginBottom: 16 }}>
              <label style={{ color: C.text.secondary, display: "block", marginBottom: 8 }}>Select Action:</label>
              <select 
                value={deanAction}
                onChange={(e) => setDeanAction(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: 8,
                  color: C.text.primary
                }}
              >
                <option value="">-- Select --</option>
                <option value="approved">Approve - No further action</option>
                <option value="warning_issued">Issue Warning to Faculty</option>
                <option value="meeting_scheduled">Schedule Meeting with Faculty</option>
                <option value="investigation">Request Investigation</option>
              </select>
            </div>
            
            <div style={{ marginBottom: 20 }}>
              <label style={{ color: C.text.secondary, display: "block", marginBottom: 8 }}>Dean's Notes / Instructions:</label>
              <textarea
                value={deanNotes}
                onChange={(e) => setDeanNotes(e.target.value)}
                rows={4}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: 8,
                  color: C.text.primary,
                  resize: "vertical"
                }}
                placeholder="Enter your decision notes or instructions for the faculty..."
              />
            </div>
            
            <div style={{ display: "flex", gap: 12 }}>
              <Button onClick={() => handleDeanResolution(selectedConflict.id)} variant="success" fullWidth>
                Submit Decision
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