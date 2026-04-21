// // src/components/director/LeaveApprovalPanel.jsx
// import { useState, useEffect } from "react";
// import { Card, Title, Badge, Button, Select, Input } from "../common";
// import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "../../utils/storage";
// import { AppState } from "../../AppState";
// import { C } from "../../styles/theme";

// export function LeaveApprovalPanel({ onRefresh }) {
//   const [leaveRequests, setLeaveRequests] = useState([]);
//   const [pendingRequests, setPendingRequests] = useState([]);
//   const [approvedRequests, setApprovedRequests] = useState([]);
//   const [rejectedRequests, setRejectedRequests] = useState([]);
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [feedback, setFeedback] = useState("");
//   const [substituteFaculty, setSubstituteFaculty] = useState("");
//   const [availableSubstitutes, setAvailableSubstitutes] = useState([]);
//   const [refresh, setRefresh] = useState(0);

//   useEffect(() => {
//     loadRequests();
//   }, [refresh]);

//   const loadRequests = () => {
//     const allRequests = loadFromStorage(STORAGE_KEYS.LEAVE_REQUESTS, []);
//     const pending = allRequests.filter(r => r.directorStatus === "pending");
//     const approved = allRequests.filter(r => r.directorStatus === "approved");
//     const rejected = allRequests.filter(r => r.directorStatus === "rejected");
    
//     setLeaveRequests(allRequests);
//     setPendingRequests(pending);
//     setApprovedRequests(approved);
//     setRejectedRequests(rejected);
//   };

//   const findAvailableSubstitutes = (request) => {
//     const faculty = AppState.faculty.find(f => f.id === request.facultyId);
//     if (!faculty) return [];
    
//     // Find faculty from same course who are free during the leave period
//     const sameCourseFaculty = AppState.faculty.filter(f => 
//       f.course === faculty.course && f.id !== faculty.id
//     );
    
//     // Get timetable to check availability
//     const timetable = AppState.timetable || [];
//     const leaveStart = new Date(request.startDate);
//     const leaveEnd = new Date(request.endDate);
    
//     // Calculate availability based on workload
//     const available = sameCourseFaculty.map(f => {
//       const facultySchedule = timetable.filter(t => t.facultyId === f.id);
//       const currentHours = facultySchedule.reduce((sum, slot) => {
//         const subject = AppState.subjects.find(s => s.id === slot.subjectId);
//         return sum + (subject?.totalWeeklyClasses || 0);
//       }, 0);
//       const remainingHours = f.maxHours - currentHours;
      
//       return {
//         ...f,
//         remainingHours,
//         availability: remainingHours > 0 ? "Available" : "Overloaded",
//         availableHours: remainingHours
//       };
//     }).filter(f => f.remainingHours > 0);
    
//     return available;
//   };

//   const handleApprove = (request) => {
//     if (!feedback) {
//       alert("Please provide approval feedback/instructions");
//       return;
//     }
    
//     const allRequests = loadFromStorage(STORAGE_KEYS.LEAVE_REQUESTS, []);
//     const updatedRequests = allRequests.map(r => 
//       r.id === request.id ? {
//         ...r,
//         directorStatus: "approved",
//         directorFeedback: feedback,
//         directorApprovedAt: new Date().toISOString(),
//         substituteAssigned: substituteFaculty || r.substituteSuggestion,
//         status: "approved"
//       } : r
//     );
    
//     saveToStorage(STORAGE_KEYS.LEAVE_REQUESTS, updatedRequests);
//     window.dispatchEvent(new Event('storage'));
//     alert("Leave request approved!");
//     setSelectedRequest(null);
//     setFeedback("");
//     setSubstituteFaculty("");
//     loadRequests();
//     if (onRefresh) onRefresh();
//   };

//   const handleReject = (request) => {
//     if (!feedback) {
//       alert("Please provide rejection reason");
//       return;
//     }
    
//     const allRequests = loadFromStorage(STORAGE_KEYS.LEAVE_REQUESTS, []);
//     const updatedRequests = allRequests.map(r => 
//       r.id === request.id ? {
//         ...r,
//         directorStatus: "rejected",
//         directorFeedback: feedback,
//         status: "rejected"
//       } : r
//     );
    
//     saveToStorage(STORAGE_KEYS.LEAVE_REQUESTS, updatedRequests);
//     window.dispatchEvent(new Event('storage'));
//     alert("Leave request rejected!");
//     setSelectedRequest(null);
//     setFeedback("");
//     loadRequests();
//     if (onRefresh) onRefresh();
//   };

//   const getStatusBadge = (status) => {
//     switch(status) {
//       case "approved": return <Badge variant="success">Approved</Badge>;
//       case "rejected": return <Badge variant="danger">Rejected</Badge>;
//       default: return <Badge variant="warning">Pending</Badge>;
//     }
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <Title>Leave Request Management</Title>
      
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Requests</p>
//           <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingRequests.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Approved</p>
//           <p style={{ color: C.accent.green, fontSize: 32, fontWeight: 700 }}>{approvedRequests.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Rejected</p>
//           <p style={{ color: C.accent.red, fontSize: 32, fontWeight: 700 }}>{rejectedRequests.length}</p>
//         </Card>
//       </div>
      
//       {pendingRequests.map(request => {
//         const faculty = AppState.faculty.find(f => f.id === request.facultyId);
//         const substitutes = findAvailableSubstitutes(request);
        
//         return (
//           <Card key={request.id}>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
//               <div>
//                 <h4 style={{ color: C.text.primary }}>{request.facultyName}</h4>
//                 <p style={{ color: C.text.tertiary, fontSize: 12 }}>
//                   {faculty?.designation} - {faculty?.course}
//                 </p>
//                 <p style={{ color: C.text.tertiary, fontSize: 12 }}>
//                   Email: {request.facultyEmail}
//                 </p>
//               </div>
//               {getStatusBadge(request.directorStatus)}
//             </div>
            
//             <div style={{ marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//               <p><strong>Leave Type:</strong> {request.leaveType}</p>
//               <p><strong>Duration:</strong> {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}</p>
//               <p><strong>Reason:</strong> {request.reason}</p>
//               {request.substituteName && (
//                 <p><strong>Suggested Substitute:</strong> {request.substituteName}</p>
//               )}
//             </div>
            
//             {/* Available Substitutes Suggestions */}
//             <div style={{ marginBottom: 16, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
//               <p style={{ fontWeight: 600, marginBottom: 8 }}>👥 Available Substitutes (Same Department):</p>
//               {substitutes.length === 0 ? (
//                 <p style={{ color: C.accent.red, fontSize: 13 }}>No available substitutes found in the same department.</p>
//               ) : (
//                 <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
//                   {substitutes.map(sub => (
//                     <div key={sub.id} style={{ 
//                       padding: "8px 12px", 
//                       background: C.surface, 
//                       borderRadius: 8,
//                       border: `1px solid ${sub.remainingHours > 0 ? C.accent.green : C.accent.red}`
//                     }}>
//                       <strong>{sub.name}</strong>
//                       <br />
//                       <span style={{ fontSize: 11, color: sub.remainingHours > 0 ? C.accent.green : C.accent.red }}>
//                         {sub.remainingHours} hrs available
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
            
//             {selectedRequest === request.id ? (
//               <div>
//                 <Select
//                   label="Assign Substitute (Optional)"
//                   value={substituteFaculty}
//                   onChange={e => setSubstituteFaculty(e.target.value)}
//                   options={[
//                     { value: "", label: "-- No substitute --" },
//                     ...substitutes.map(s => ({ 
//                       value: s.id, 
//                       label: `${s.name} (${s.remainingHours} hrs available)` 
//                     }))
//                   ]}
//                 />
//                 <Input
//                   label="Feedback/Instructions"
//                   value={feedback}
//                   onChange={e => setFeedback(e.target.value)}
//                   placeholder="Add approval notes or instructions..."
//                   required
//                 />
//                 <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
//                   <Button onClick={() => handleApprove(request)} variant="success" fullWidth>
//                     Approve Leave
//                   </Button>
//                   <Button onClick={() => handleReject(request)} variant="danger" fullWidth>
//                     Reject Leave
//                   </Button>
//                   <Button onClick={() => {
//                     setSelectedRequest(null);
//                     setFeedback("");
//                     setSubstituteFaculty("");
//                   }} variant="secondary" fullWidth>
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             ) : (
//               <Button onClick={() => setSelectedRequest(request.id)} variant="primary" fullWidth>
//                 Review Request
//               </Button>
//             )}
//           </Card>
//         );
//       })}
      
//       {pendingRequests.length === 0 && (
//         <Card>
//           <p style={{ textAlign: "center", padding: 40, color: C.text.tertiary }}>
//             No pending leave requests
//           </p>
//         </Card>
//       )}
//     </div>
//   );
// }

// src/components/director/LeaveApprovalPanel.jsx
import { useState, useEffect } from "react";
import { Card, Title, Badge, Button, Select, Input } from "../common";
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "../../utils/storage";
import { AppState } from "../../AppState";
import { C } from "../../styles/theme";

export function LeaveApprovalPanel({ onRefresh }) {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [substituteFaculty, setSubstituteFaculty] = useState("");
  const [availableSubstitutes, setAvailableSubstitutes] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadRequests();
  }, [refresh]);

  const loadRequests = () => {
    const allRequests = loadFromStorage(STORAGE_KEYS.LEAVE_REQUESTS, []);
    const pending = allRequests.filter(r => r.directorStatus === "pending");
    const approved = allRequests.filter(r => r.directorStatus === "approved");
    const rejected = allRequests.filter(r => r.directorStatus === "rejected");
    
    setLeaveRequests(allRequests);
    setPendingRequests(pending);
    setApprovedRequests(approved);
    setRejectedRequests(rejected);
  };

  const findAvailableSubstitutes = (request) => {
    const faculty = AppState.faculty.find(f => f.id === request.facultyId);
    if (!faculty) return [];
    
    // Find faculty from same course who are free during the leave period
    const sameCourseFaculty = AppState.faculty.filter(f => 
      f.course === faculty.course && f.id !== faculty.id
    );
    
    // Get timetable to check availability
    const timetable = AppState.timetable || [];
    
    // Calculate availability based on workload
    const available = sameCourseFaculty.map(f => {
      const facultySchedule = timetable.filter(t => t.facultyId === f.id);
      const currentHours = facultySchedule.reduce((sum, slot) => {
        const subject = AppState.subjects.find(s => s.id === slot.subjectId);
        return sum + (subject?.totalWeeklyClasses || 0);
      }, 0);
      const remainingHours = f.maxHours - currentHours;
      
      return {
        ...f,
        remainingHours,
        availability: remainingHours > 0 ? "Available" : "Overloaded",
        availableHours: remainingHours
      };
    }).filter(f => f.remainingHours > 0);
    
    return available;
  };

  const validateApproval = () => {
    const newErrors = {};
    // Feedback is optional now - no validation required
    setErrors(newErrors);
    return true;
  };

  const validateRejection = () => {
    const newErrors = {};
    if (!feedback.trim()) {
      newErrors.feedback = "Rejection reason is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleApprove = (request) => {
    if (!validateApproval()) return;
    
    const allRequests = loadFromStorage(STORAGE_KEYS.LEAVE_REQUESTS, []);
    const updatedRequests = allRequests.map(r => 
      r.id === request.id ? {
        ...r,
        directorStatus: "approved",
        directorFeedback: feedback || "Leave request approved. Please coordinate with the substitute for class coverage.",
        directorApprovedAt: new Date().toISOString(),
        substituteAssigned: substituteFaculty || r.substituteSuggestion || "None",
        status: "approved"
      } : r
    );
    
    saveToStorage(STORAGE_KEYS.LEAVE_REQUESTS, updatedRequests);
    window.dispatchEvent(new Event('storage'));
    alert("Leave request approved successfully!");
    setSelectedRequest(null);
    setFeedback("");
    setSubstituteFaculty("");
    setErrors({});
    loadRequests();
    if (onRefresh) onRefresh();
  };

  const handleReject = (request) => {
    if (!validateRejection()) return;
    
    const allRequests = loadFromStorage(STORAGE_KEYS.LEAVE_REQUESTS, []);
    const updatedRequests = allRequests.map(r => 
      r.id === request.id ? {
        ...r,
        directorStatus: "rejected",
        directorFeedback: feedback,
        status: "rejected"
      } : r
    );
    
    saveToStorage(STORAGE_KEYS.LEAVE_REQUESTS, updatedRequests);
    window.dispatchEvent(new Event('storage'));
    alert("Leave request rejected!");
    setSelectedRequest(null);
    setFeedback("");
    setErrors({});
    loadRequests();
    if (onRefresh) onRefresh();
  };

  const handleCancel = () => {
    setSelectedRequest(null);
    setFeedback("");
    setSubstituteFaculty("");
    setErrors({});
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case "approved": return <Badge variant="success">Approved</Badge>;
      case "rejected": return <Badge variant="danger">Rejected</Badge>;
      default: return <Badge variant="warning">Pending</Badge>;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Title>Leave Request Management</Title>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        <Card padding="20px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Requests</p>
          <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingRequests.length}</p>
        </Card>
        <Card padding="20px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Approved</p>
          <p style={{ color: C.accent.green, fontSize: 32, fontWeight: 700 }}>{approvedRequests.length}</p>
        </Card>
        <Card padding="20px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Rejected</p>
          <p style={{ color: C.accent.red, fontSize: 32, fontWeight: 700 }}>{rejectedRequests.length}</p>
        </Card>
      </div>
      
      {pendingRequests.length === 0 ? (
        <Card>
          <p style={{ textAlign: "center", padding: 40, color: C.text.tertiary }}>
            No pending leave requests
          </p>
        </Card>
      ) : (
        pendingRequests.map(request => {
          const faculty = AppState.faculty.find(f => f.id === request.facultyId);
          const substitutes = findAvailableSubstitutes(request);
          
          return (
            <Card key={request.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div>
                  <h4 style={{ color: C.text.primary }}>{request.facultyName}</h4>
                  <p style={{ color: C.text.tertiary, fontSize: 12 }}>
                    {faculty?.designation} - {faculty?.course}
                  </p>
                  <p style={{ color: C.text.tertiary, fontSize: 12 }}>
                    Email: request.facultyEmail || faculty?.email || "N/A"
                  </p>
                </div>
                {getStatusBadge(request.directorStatus)}
              </div>
              
              <div style={{ marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
                <p><strong>Leave Type:</strong> {request.leaveType || request.type || "Planned"}</p>
                <p><strong>Duration:</strong> {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}</p>
                <p><strong>Reason:</strong> {request.reason}</p>
                {request.substituteName && (
                  <p><strong>Suggested Substitute:</strong> {request.substituteName}</p>
                )}
                {request.substituteSuggestion && (
                  <p><strong>Substitute Suggestion:</strong> {request.substituteSuggestion}</p>
                )}
              </div>
              
              {/* Available Substitutes Suggestions */}
              <div style={{ marginBottom: 16, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
                <p style={{ fontWeight: 600, marginBottom: 8 }}>👥 Available Substitutes (Same Department):</p>
                {substitutes.length === 0 ? (
                  <p style={{ color: C.accent.red, fontSize: 13 }}>No available substitutes found in the same department.</p>
                ) : (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {substitutes.map(sub => (
                      <div key={sub.id} style={{ 
                        padding: "8px 12px", 
                        background: C.surface, 
                        borderRadius: 8,
                        border: `1px solid ${sub.remainingHours > 0 ? C.accent.green : C.accent.red}`
                      }}>
                        <strong>{sub.name}</strong>
                        <br />
                        <span style={{ fontSize: 11, color: sub.remainingHours > 0 ? C.accent.green : C.accent.red }}>
                          {sub.remainingHours} hrs available
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {selectedRequest === request.id ? (
                <div>
                  <Select
                    label="Assign Substitute (Optional)"
                    value={substituteFaculty}
                    onChange={e => setSubstituteFaculty(e.target.value)}
                    options={[
                      { value: "", label: "-- No substitute --" },
                      ...substitutes.map(s => ({ 
                        value: s.id, 
                        label: `${s.name} (${s.remainingHours} hrs available)` 
                      }))
                    ]}
                  />
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ color: C.text.secondary, fontSize: 13, display: "block", marginBottom: 6 }}>
                      Feedback/Instructions <span style={{ color: C.text.tertiary, fontSize: 11 }}>(Optional for approval)</span>
                    </label>
                    <textarea
                      value={feedback}
                      onChange={e => setFeedback(e.target.value)}
                      placeholder="Add any additional notes or instructions..."
                      rows={3}
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: 8,
                        border: `1px solid ${errors.feedback ? C.accent.red : C.border}`,
                        fontSize: 14,
                        resize: "vertical"
                      }}
                    />
                    {errors.feedback && (
                      <p style={{ color: C.accent.red, fontSize: 12, marginTop: 4 }}>{errors.feedback}</p>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                    <Button onClick={() => handleApprove(request)} variant="success" fullWidth>
                      Approve Leave
                    </Button>
                    <Button onClick={() => handleReject(request)} variant="danger" fullWidth>
                      Reject Leave
                    </Button>
                    <Button onClick={handleCancel} variant="secondary" fullWidth>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button onClick={() => setSelectedRequest(request.id)} variant="primary" fullWidth>
                  Review Request
                </Button>
              )}
            </Card>
          );
        })
      )}
      
      {/* Approved Requests Section */}
      {approvedRequests.length > 0 && (
        <Card>
          <Title level={4}>Approved Leave Requests ({approvedRequests.length})</Title>
          <div style={{ maxHeight: 300, overflowY: "auto" }}>
            {approvedRequests.map(request => (
              <div key={request.id} style={{ 
                padding: 12, 
                borderBottom: `1px solid ${C.border}`,
                background: C.accent.greenBg,
                marginBottom: 8,
                borderRadius: 8
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong>{request.facultyName}</strong>
                    <p style={{ fontSize: 12, margin: 4, color: C.text.secondary }}>
                      {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                    </p>
                    {request.directorFeedback && (
                      <p style={{ fontSize: 11, color: C.text.tertiary, marginTop: 4 }}>
                        Feedback: {request.directorFeedback}
                      </p>
                    )}
                  </div>
                  <Badge variant="success">Approved</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
      
      {/* Rejected Requests Section */}
      {rejectedRequests.length > 0 && (
        <Card>
          <Title level={4}>Rejected Leave Requests ({rejectedRequests.length})</Title>
          <div style={{ maxHeight: 300, overflowY: "auto" }}>
            {rejectedRequests.map(request => (
              <div key={request.id} style={{ 
                padding: 12, 
                borderBottom: `1px solid ${C.border}`,
                background: C.accent.redBg,
                marginBottom: 8,
                borderRadius: 8
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong>{request.facultyName}</strong>
                    <p style={{ fontSize: 12, margin: 4, color: C.text.secondary }}>
                      {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                    </p>
                    <p style={{ fontSize: 11, color: C.accent.red, marginTop: 4 }}>
                      Reason: {request.directorFeedback}
                    </p>
                  </div>
                  <Badge variant="danger">Rejected</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}