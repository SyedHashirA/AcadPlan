// // src/components/admin/DeanSubjectApproval.jsx
// import { useState, useEffect } from "react";
// import { Card, Title, Badge, Button } from "../common";
// import { AppState } from "../../AppState";
// import { saveToStorage, STORAGE_KEYS } from "../../utils/storage";
// import { C } from "../../styles/theme";

// export function DeanSubjectApproval() {
//   const [refresh, setRefresh] = useState(0);
//   const [pendingSubjects, setPendingSubjects] = useState([]);
//   const [approvedSubjects, setApprovedSubjects] = useState([]);
//   const [rejectedSubjects, setRejectedSubjects] = useState([]);
  
//   useEffect(() => {
//     loadSubjects();
    
//     const handleStorageChange = () => {
//       loadSubjects();
//       setRefresh(r => r + 1);
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const loadSubjects = () => {
//     const allSubjects = AppState.subjects;
//     setPendingSubjects(allSubjects.filter(s => s.approvalStatus === "pending"));
//     setApprovedSubjects(allSubjects.filter(s => s.approvalStatus === "approved"));
//     setRejectedSubjects(allSubjects.filter(s => s.approvalStatus === "rejected"));
//   };
  
//   const handleApprove = (subjectId) => {
//     const updatedSubjects = AppState.subjects.map(s => 
//       s.id === subjectId 
//         ? { 
//             ...s, 
//             approvalStatus: "approved", 
//             approvedBy: "dean",
//             approvedDate: new Date().toISOString()
//           } 
//         : s
//     );
    
//     AppState.subjects = updatedSubjects;
//     saveToStorage(STORAGE_KEYS.SUBJECTS, updatedSubjects);
//     window.dispatchEvent(new Event('storage'));
//     loadSubjects();
//     alert("Subject approved successfully!");
//   };
  
//   const handleReject = (subjectId) => {
//     const reason = prompt("Enter rejection reason:");
//     if (reason) {
//       const updatedSubjects = AppState.subjects.map(s => 
//         s.id === subjectId 
//           ? { 
//               ...s, 
//               approvalStatus: "rejected", 
//               rejectionReason: reason,
//               rejectedDate: new Date().toISOString()
//             } 
//           : s
//       );
      
//       AppState.subjects = updatedSubjects;
//       saveToStorage(STORAGE_KEYS.SUBJECTS, updatedSubjects);
//       window.dispatchEvent(new Event('storage'));
//       loadSubjects();
//       alert("Subject rejected!");
//     }
//   };
  
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <Title>Subject Approval (Dean)</Title>
      
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Approval</p>
//           <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingSubjects.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Approved Subjects</p>
//           <p style={{ color: C.accent.green, fontSize: 32, fontWeight: 700 }}>{approvedSubjects.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Rejected Subjects</p>
//           <p style={{ color: C.accent.red, fontSize: 32, fontWeight: 700 }}>{rejectedSubjects.length}</p>
//         </Card>
//       </div>
      
//       {pendingSubjects.length > 0 ? (
//         pendingSubjects.map(subject => {
//           const director = AppState.faculty.find(f => f.role === "director");
          
//           return (
//             <Card key={subject.id}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
//                 <div>
//                   <h4 style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{subject.name}</h4>
//                   <p style={{ color: C.accent.blue, fontSize: 14 }}>Code: {subject.code}</p>
//                 </div>
//                 <Badge variant="warning">Pending Dean Approval</Badge>
//               </div>
              
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//                 <div>
//                   <span style={{ color: C.text.tertiary, fontSize: 11 }}>Course</span>
//                   <br />
//                   <span style={{ color: C.text.primary, fontSize: 16, fontWeight: 600 }}>{subject.course}</span>
//                 </div>
//                 <div>
//                   <span style={{ color: C.text.tertiary, fontSize: 11 }}>Semester</span>
//                   <br />
//                   <span style={{ color: C.text.primary, fontSize: 16, fontWeight: 600 }}>{subject.semester}</span>
//                 </div>
//                 <div>
//                   <span style={{ color: C.text.tertiary, fontSize: 11 }}>Credits</span>
//                   <br />
//                   <span style={{ color: C.text.primary, fontSize: 16, fontWeight: 600 }}>{subject.credits}</span>
//                 </div>
//                 <div>
//                   <span style={{ color: C.text.tertiary, fontSize: 11 }}>Type</span>
//                   <br />
//                   <span style={{ color: C.text.primary, fontSize: 16, fontWeight: 600 }}>{subject.type}</span>
//                 </div>
//                 <div>
//                   <span style={{ color: C.text.tertiary, fontSize: 11 }}>Weekly Hours</span>
//                   <br />
//                   <span style={{ color: C.accent.gold, fontSize: 16, fontWeight: 600 }}>{subject.totalWeeklyClasses}h</span>
//                 </div>
//               </div>
              
//               <div style={{ marginBottom: 16, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
//                 <p style={{ color: C.text.secondary, fontSize: 13 }}>
//                   <strong>Added by Director</strong> - Waiting for your approval before this subject can be used in the system.
//                 </p>
//               </div>
              
//               <div style={{ display: "flex", gap: 12 }}>
//                 <Button onClick={() => handleApprove(subject.id)} variant="success" fullWidth>
//                   ✓ Approve Subject
//                 </Button>
//                 <Button onClick={() => handleReject(subject.id)} variant="danger" fullWidth>
//                   ✗ Reject Subject
//                 </Button>
//               </div>
//             </Card>
//           );
//         })
//       ) : (
//         <Card>
//           <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>
//             {approvedSubjects.length > 0 
//               ? "✓ All subjects have been reviewed and approved!" 
//               : "No subjects pending approval"}
//           </p>
//         </Card>
//       )}
      
//       {approvedSubjects.length > 0 && (
//         <Card>
//           <Title level={4}>Approved Subjects</Title>
//           <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
//             {approvedSubjects.map(subject => (
//               <Badge key={subject.id} variant="success">
//                 {subject.name} ({subject.code})
//               </Badge>
//             ))}
//           </div>
//         </Card>
//       )}
//     </div>
//   );
// }

// src/components/admin/DeanSubjectApproval.jsx
// import { useState, useEffect } from "react";
// import { Card, Title, Badge, Button, Input } from "../common";
// import { AppState } from "../../AppState";
// import { saveToStorage, STORAGE_KEYS } from "../../utils/storage";
// import { EXAM_TYPES, SUBJECT_TYPES } from "../../data/mockData";
// import { C } from "../../styles/theme";

// export function DeanSubjectApproval() {
//   const [refresh, setRefresh] = useState(0);
//   const [pendingSubjects, setPendingSubjects] = useState([]);
//   const [approvedSubjects, setApprovedSubjects] = useState([]);
//   const [rejectedSubjects, setRejectedSubjects] = useState([]);
//   const [rejectReason, setRejectReason] = useState("");
//   const [showRejectModal, setShowRejectModal] = useState(null);
  
//   useEffect(() => {
//     loadSubjects();
    
//     const handleStorageChange = () => {
//       loadSubjects();
//       setRefresh(r => r + 1);
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const loadSubjects = () => {
//     const allSubjects = AppState.subjects || [];
//     setPendingSubjects(allSubjects.filter(s => s.approvalStatus === "pending"));
//     setApprovedSubjects(allSubjects.filter(s => s.approvalStatus === "approved"));
//     setRejectedSubjects(allSubjects.filter(s => s.approvalStatus === "rejected"));
//   };
  
//   const handleApprove = (subjectId) => {
//     const updatedSubjects = AppState.subjects.map(s => 
//       s.id === subjectId 
//         ? { 
//             ...s, 
//             approvalStatus: "approved", 
//             approvedBy: "dean",
//             approvedDate: new Date().toISOString(),
//             rejectionReason: null
//           } 
//         : s
//     );
    
//     AppState.subjects = updatedSubjects;
//     saveToStorage(STORAGE_KEYS.SUBJECTS, updatedSubjects);
//     window.dispatchEvent(new Event('storage'));
//     loadSubjects();
//     alert("Subject approved successfully!");
//   };
  
//   const handleReject = (subjectId) => {
//     if (!rejectReason.trim()) {
//       alert("Please enter a rejection reason");
//       return;
//     }
    
//     const updatedSubjects = AppState.subjects.map(s => 
//       s.id === subjectId 
//         ? { 
//             ...s, 
//             approvalStatus: "rejected", 
//             rejectedBy: "dean",
//             rejectionReason: rejectReason,
//             rejectedDate: new Date().toISOString()
//           } 
//         : s
//     );
    
//     AppState.subjects = updatedSubjects;
//     saveToStorage(STORAGE_KEYS.SUBJECTS, updatedSubjects);
//     window.dispatchEvent(new Event('storage'));
//     loadSubjects();
//     setShowRejectModal(null);
//     setRejectReason("");
//     alert("Subject rejected!");
//   };
  
//   const openRejectModal = (subjectId) => {
//     setShowRejectModal(subjectId);
//     setRejectReason("");
//   };
  
//   const closeRejectModal = () => {
//     setShowRejectModal(null);
//     setRejectReason("");
//   };
  
//   const getExamTypeBadge = (examType) => {
//     switch(examType) {
//       case "SEE":
//         return <Badge variant="primary">SEE</Badge>;
//       case "Practical":
//         return <Badge variant="success">Practical</Badge>;
//       case "Seminar":
//         return <Badge variant="warning">Seminar</Badge>;
//       default:
//         return <Badge variant="primary">{examType}</Badge>;
//     }
//   };

//   const getSubjectTypeBadge = (subjectType) => {
//     switch(subjectType) {
//       case "Core":
//         return <Badge variant="primary">Core</Badge>;
//       case "Major":
//         return <Badge variant="success">Major</Badge>;
//       case "Minor":
//         return <Badge variant="warning">Minor</Badge>;
//       default:
//         return <Badge variant="primary">{subjectType}</Badge>;
//     }
//   };
  
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <Title>Subject Approval (Dean)</Title>
      
//       {/* Statistics Cards */}
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Approval</p>
//           <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingSubjects.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Approved Subjects</p>
//           <p style={{ color: C.accent.green, fontSize: 32, fontWeight: 700 }}>{approvedSubjects.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Rejected Subjects</p>
//           <p style={{ color: C.accent.red, fontSize: 32, fontWeight: 700 }}>{rejectedSubjects.length}</p>
//         </Card>
//       </div>
      
//       {/* Reject Reason Modal */}
//       {showRejectModal && (
//         <div style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background: "rgba(0,0,0,0.5)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           zIndex: 1000
//         }}>
//           <Card padding="24px" style={{ width: 400, maxWidth: "90%" }}>
//             <Title level={4}>Rejection Reason</Title>
//             <p style={{ color: C.text.secondary, marginBottom: 16 }}>
//               Please provide a reason for rejecting this subject:
//             </p>
//             <textarea
//               value={rejectReason}
//               onChange={e => setRejectReason(e.target.value)}
//               placeholder="Enter rejection reason..."
//               rows={4}
//               style={{
//                 width: "100%",
//                 padding: "10px",
//                 borderRadius: 8,
//                 border: `1px solid ${C.border}`,
//                 fontSize: 14,
//                 marginBottom: 16,
//                 resize: "vertical"
//               }}
//             />
//             <div style={{ display: "flex", gap: 12 }}>
//               <Button onClick={() => handleReject(showRejectModal)} variant="danger" fullWidth>
//                 Confirm Rejection
//               </Button>
//               <Button onClick={closeRejectModal} variant="secondary" fullWidth>
//                 Cancel
//               </Button>
//             </div>
//           </Card>
//         </div>
//       )}
      
//       {/* Pending Subjects List */}
//       {pendingSubjects.length > 0 ? (
//         pendingSubjects.map(subject => {
//           return (
//             <Card key={subject.id}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
//                 <div>
//                   <h4 style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{subject.name}</h4>
//                   <p style={{ color: C.accent.blue, fontSize: 14 }}>Code: {subject.code}</p>
//                 </div>
//                 <Badge variant="warning">Pending Dean Approval</Badge>
//               </div>
              
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//                 <div>
//                   <span style={{ color: C.text.tertiary, fontSize: 11 }}>Course</span>
//                   <br />
//                   <span style={{ color: C.text.primary, fontSize: 14, fontWeight: 600 }}>{subject.course}</span>
//                 </div>
//                 <div>
//                   <span style={{ color: C.text.tertiary, fontSize: 11 }}>Semester</span>
//                   <br />
//                   <span style={{ color: C.text.primary, fontSize: 14, fontWeight: 600 }}>{subject.semester}</span>
//                 </div>
//                 <div>
//                   <span style={{ color: C.text.tertiary, fontSize: 11 }}>Credits</span>
//                   <br />
//                   <span style={{ color: C.text.primary, fontSize: 14, fontWeight: 600 }}>{subject.credits}</span>
//                 </div>
//                 <div>
//                   <span style={{ color: C.text.tertiary, fontSize: 11 }}>Type</span>
//                   <br />
//                   <span style={{ color: C.text.primary, fontSize: 14, fontWeight: 600 }}>{subject.type}</span>
//                 </div>
//                 <div>
//                   <span style={{ color: C.text.tertiary, fontSize: 11 }}>Exam Type</span>
//                   <br />
//                   {getExamTypeBadge(subject.examType || "SEE")}
//                 </div>
//                 <div>
//                   <span style={{ color: C.text.tertiary, fontSize: 11 }}>Category</span>
//                   <br />
//                   {getSubjectTypeBadge(subject.subjectType || "Core")}
//                 </div>
//                 <div>
//                   <span style={{ color: C.text.tertiary, fontSize: 11 }}>Weekly Hours</span>
//                   <br />
//                   <span style={{ color: C.accent.gold, fontSize: 14, fontWeight: 600 }}>{subject.totalWeeklyClasses}h</span>
//                 </div>
//                 <div>
//                   <span style={{ color: C.text.tertiary, fontSize: 11 }}>Modules</span>
//                   <br />
//                   <span style={{ color: C.text.primary, fontSize: 14, fontWeight: 600 }}>{subject.modules}</span>
//                 </div>
//               </div>
              
//               <div style={{ marginBottom: 16, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
//                 <p style={{ color: C.text.secondary, fontSize: 13 }}>
//                   <strong>Added by Director</strong> - Waiting for your approval before this subject can be used in the system.
//                 </p>
//               </div>
              
//               <div style={{ display: "flex", gap: 12 }}>
//                 <Button onClick={() => handleApprove(subject.id)} variant="success" fullWidth>
//                   ✓ Approve Subject
//                 </Button>
//                 <Button onClick={() => openRejectModal(subject.id)} variant="danger" fullWidth>
//                   ✗ Reject Subject
//                 </Button>
//               </div>
//             </Card>
//           );
//         })
//       ) : (
//         <Card>
//           <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>
//             {approvedSubjects.length > 0 || rejectedSubjects.length > 0
//               ? "✓ All subjects have been reviewed!" 
//               : "No subjects pending approval"}
//           </p>
//         </Card>
//       )}
      
//       {/* Rejected Subjects Section with Reasons */}
//       {rejectedSubjects.length > 0 && (
//         <Card>
//           <Title level={4}>Rejected Subjects ({rejectedSubjects.length})</Title>
//           <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//             {rejectedSubjects.map(subject => (
//               <div key={subject.id} style={{ 
//                 padding: 16, 
//                 background: C.accent.redBg, 
//                 borderRadius: 12,
//                 border: `1px solid ${C.accent.red}`
//               }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
//                   <div>
//                     <h5 style={{ color: C.text.primary, fontWeight: 600 }}>{subject.name} ({subject.code})</h5>
//                     <p style={{ color: C.text.secondary, fontSize: 12 }}>{subject.course} - Semester {subject.semester}</p>
//                   </div>
//                   <Badge variant="danger">Rejected</Badge>
//                 </div>
                
//                 <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 12 }}>
//                   <div>
//                     <span style={{ color: C.text.tertiary, fontSize: 11 }}>Exam Type</span>
//                     <br />
//                     {getExamTypeBadge(subject.examType || "SEE")}
//                   </div>
//                   <div>
//                     <span style={{ color: C.text.tertiary, fontSize: 11 }}>Category</span>
//                     <br />
//                     {getSubjectTypeBadge(subject.subjectType || "Core")}
//                   </div>
//                   <div>
//                     <span style={{ color: C.text.tertiary, fontSize: 11 }}>Credits</span>
//                     <br />
//                     <span style={{ color: C.text.primary, fontWeight: 600 }}>{subject.credits}</span>
//                   </div>
//                   <div>
//                     <span style={{ color: C.text.tertiary, fontSize: 11 }}>Weekly Hours</span>
//                     <br />
//                     <span style={{ color: C.accent.gold, fontWeight: 600 }}>{subject.totalWeeklyClasses}h</span>
//                   </div>
//                 </div>
                
//                 <div style={{ marginTop: 12, padding: 12, background: C.surface, borderRadius: 8 }}>
//                   <p style={{ color: C.accent.red, fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Rejection Reason:</p>
//                   <p style={{ color: C.text.primary, fontSize: 13 }}>{subject.rejectionReason || "No reason provided"}</p>
//                   {subject.rejectedDate && (
//                     <p style={{ color: C.text.tertiary, fontSize: 11, marginTop: 8 }}>
//                       Rejected on: {new Date(subject.rejectedDate).toLocaleString()}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Card>
//       )}
      
//       {/* Approved Subjects Section */}
//       {approvedSubjects.length > 0 && (
//         <Card>
//           <Title level={4}>Approved Subjects ({approvedSubjects.length})</Title>
//           <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
//             {approvedSubjects.map(subject => (
//               <Badge key={subject.id} variant="success">
//                 {subject.name} ({subject.code})
//               </Badge>
//             ))}
//           </div>
//         </Card>
//       )}
//     </div>
//   );
// }

// src/components/admin/DeanSubjectApproval.jsx
import { useState, useEffect } from "react";
import { Card, Title, Badge, Button, Input } from "../common";
import { AppState } from "../../AppState";
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from "../../utils/storage";
import { C } from "../../styles/theme";

export function DeanSubjectApproval() {
  const [refresh, setRefresh] = useState(0);
  const [pendingSubjects, setPendingSubjects] = useState([]);
  const [approvedSubjects, setApprovedSubjects] = useState([]);
  const [rejectedSubjects, setRejectedSubjects] = useState([]);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(null);
  
  // Also load faculty preference submissions for approval
  const [pendingPreferenceApprovals, setPendingPreferenceApprovals] = useState([]);
  const [approvedPreferences, setApprovedPreferences] = useState([]);
  const [rejectedPreferences, setRejectedPreferences] = useState([]);
  const [selectedTab, setSelectedTab] = useState("subjects");
  
  useEffect(() => {
    loadSubjects();
    loadPreferenceSubmissions();
    
    const handleStorageChange = () => {
      loadSubjects();
      loadPreferenceSubmissions();
      setRefresh(r => r + 1);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  const loadSubjects = () => {
    const allSubjects = AppState.subjects || [];
    setPendingSubjects(allSubjects.filter(s => s.approvalStatus === "pending"));
    setApprovedSubjects(allSubjects.filter(s => s.approvalStatus === "approved"));
    setRejectedSubjects(allSubjects.filter(s => s.approvalStatus === "rejected"));
  };
  
  const loadPreferenceSubmissions = () => {
    // Get all faculty preference submissions that are pending dean approval
    const allSubmissions = loadFromStorage(STORAGE_KEYS.FACULTY_SUBMISSIONS, []);
    const pending = allSubmissions.filter(s => s.deanStatus === "pending" || !s.deanStatus);
    const approved = allSubmissions.filter(s => s.deanStatus === "approved");
    const rejected = allSubmissions.filter(s => s.deanStatus === "rejected");
    
    setPendingPreferenceApprovals(pending);
    setApprovedPreferences(approved);
    setRejectedPreferences(rejected);
  };
  
  const handleApproveSubject = (subjectId) => {
    const updatedSubjects = AppState.subjects.map(s => 
      s.id === subjectId 
        ? { 
            ...s, 
            approvalStatus: "approved", 
            approvedBy: "dean",
            approvedDate: new Date().toISOString(),
            rejectionReason: null
          } 
        : s
    );
    
    AppState.subjects = updatedSubjects;
    saveToStorage(STORAGE_KEYS.SUBJECTS, updatedSubjects);
    window.dispatchEvent(new Event('storage'));
    loadSubjects();
    alert("Subject approved successfully!");
  };
  
  const handleRejectSubject = (subjectId) => {
    if (!rejectReason.trim()) {
      alert("Please enter a rejection reason");
      return;
    }
    
    const updatedSubjects = AppState.subjects.map(s => 
      s.id === subjectId 
        ? { 
            ...s, 
            approvalStatus: "rejected", 
            rejectedBy: "dean",
            rejectionReason: rejectReason,
            rejectedDate: new Date().toISOString()
          } 
        : s
    );
    
    AppState.subjects = updatedSubjects;
    saveToStorage(STORAGE_KEYS.SUBJECTS, updatedSubjects);
    window.dispatchEvent(new Event('storage'));
    loadSubjects();
    setShowRejectModal(null);
    setRejectReason("");
    alert("Subject rejected!");
  };
  
  const handleApprovePreference = (facultyId) => {
    const allSubmissions = loadFromStorage(STORAGE_KEYS.FACULTY_SUBMISSIONS, []);
    const updatedSubmissions = allSubmissions.map(s => 
      s.facultyId === facultyId 
        ? { 
            ...s, 
            deanStatus: "approved",
            deanApprovedBy: "dean",
            deanApprovedDate: new Date().toISOString()
          } 
        : s
    );
    
    saveToStorage(STORAGE_KEYS.FACULTY_SUBMISSIONS, updatedSubmissions);
    
    // Also update the subject preferences status
    const pref = AppState.subjectPreferences.find(p => p.facultyId === facultyId);
    if (pref) {
      pref.deanStatus = "approved";
      pref.deanApprovedDate = new Date().toISOString();
      saveToStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, AppState.subjectPreferences);
    }
    
    window.dispatchEvent(new Event('storage'));
    loadPreferenceSubmissions();
    alert("Preference form approved successfully!");
  };
  
  const handleRejectPreference = (facultyId) => {
    if (!rejectReason.trim()) {
      alert("Please enter a rejection reason");
      return;
    }
    
    const allSubmissions = loadFromStorage(STORAGE_KEYS.FACULTY_SUBMISSIONS, []);
    const updatedSubmissions = allSubmissions.map(s => 
      s.facultyId === facultyId 
        ? { 
            ...s, 
            deanStatus: "rejected",
            deanRejectionReason: rejectReason,
            deanRejectedDate: new Date().toISOString()
          } 
        : s
    );
    
    saveToStorage(STORAGE_KEYS.FACULTY_SUBMISSIONS, updatedSubmissions);
    
    const pref = AppState.subjectPreferences.find(p => p.facultyId === facultyId);
    if (pref) {
      pref.deanStatus = "rejected";
      pref.deanRejectionReason = rejectReason;
      pref.deanRejectedDate = new Date().toISOString();
      saveToStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, AppState.subjectPreferences);
    }
    
    window.dispatchEvent(new Event('storage'));
    loadPreferenceSubmissions();
    setShowRejectModal(null);
    setRejectReason("");
    alert("Preference form rejected!");
  };
  
  const openRejectModal = (id, type) => {
    setShowRejectModal({ id, type });
    setRejectReason("");
  };
  
  const closeRejectModal = () => {
    setShowRejectModal(null);
    setRejectReason("");
  };
  
  const handleConfirmReject = () => {
    if (showRejectModal.type === "subject") {
      handleRejectSubject(showRejectModal.id);
    } else {
      handleRejectPreference(showRejectModal.id);
    }
  };
  
  const getExamTypeBadge = (examType) => {
    switch(examType) {
      case "SEE": return <Badge variant="primary">SEE</Badge>;
      case "Practical": return <Badge variant="success">Practical</Badge>;
      case "Seminar": return <Badge variant="warning">Seminar</Badge>;
      default: return <Badge variant="primary">{examType}</Badge>;
    }
  };

  const getSubjectTypeBadge = (subjectType) => {
    switch(subjectType) {
      case "Core": return <Badge variant="primary">Core</Badge>;
      case "Major": return <Badge variant="success">Major</Badge>;
      case "Minor": return <Badge variant="warning">Minor</Badge>;
      default: return <Badge variant="primary">{subjectType}</Badge>;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Title>Dean's Approval Dashboard</Title>
      
      {/* Tab Navigation */}
      <div style={{ display: "flex", gap: 12, borderBottom: `2px solid ${C.border}`, paddingBottom: 12 }}>
        <button
          onClick={() => setSelectedTab("subjects")}
          style={{
            padding: "8px 20px",
            background: selectedTab === "subjects" ? C.accent.blue : "transparent",
            color: selectedTab === "subjects" ? "white" : C.text.primary,
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 600
          }}
        >
          Subject Approvals ({pendingSubjects.length})
        </button>
        <button
          onClick={() => setSelectedTab("preferences")}
          style={{
            padding: "8px 20px",
            background: selectedTab === "preferences" ? C.accent.blue : "transparent",
            color: selectedTab === "preferences" ? "white" : C.text.primary,
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 600
          }}
        >
          Faculty Preference Approvals ({pendingPreferenceApprovals.length})
        </button>
      </div>
      
      {/* Reject Reason Modal */}
      {showRejectModal && (
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
          <Card padding="24px" style={{ width: 400, maxWidth: "90%" }}>
            <Title level={4}>Rejection Reason</Title>
            <p style={{ color: C.text.secondary, marginBottom: 16 }}>
              Please provide a reason for rejection:
            </p>
            <textarea
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              placeholder="Enter rejection reason..."
              rows={4}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: 8,
                border: `1px solid ${C.border}`,
                fontSize: 14,
                marginBottom: 16,
                resize: "vertical"
              }}
            />
            <div style={{ display: "flex", gap: 12 }}>
              <Button onClick={handleConfirmReject} variant="danger" fullWidth>
                Confirm Rejection
              </Button>
              <Button onClick={closeRejectModal} variant="secondary" fullWidth>
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
      
      {/* Subjects Tab */}
      {selectedTab === "subjects" && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            <Card padding="20px">
              <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Subject Approval</p>
              <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingSubjects.length}</p>
            </Card>
            <Card padding="20px">
              <p style={{ color: C.text.tertiary, fontSize: 12 }}>Approved Subjects</p>
              <p style={{ color: C.accent.green, fontSize: 32, fontWeight: 700 }}>{approvedSubjects.length}</p>
            </Card>
            <Card padding="20px">
              <p style={{ color: C.text.tertiary, fontSize: 12 }}>Rejected Subjects</p>
              <p style={{ color: C.accent.red, fontSize: 32, fontWeight: 700 }}>{rejectedSubjects.length}</p>
            </Card>
          </div>
          
          {pendingSubjects.map(subject => (
            <Card key={subject.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
                <div>
                  <h4 style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{subject.name}</h4>
                  <p style={{ color: C.accent.blue, fontSize: 14 }}>Code: {subject.code}</p>
                </div>
                <Badge variant="warning">Pending Dean Approval</Badge>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
                <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Course</span><br /><span style={{ color: C.text.primary, fontWeight: 600 }}>{subject.course}</span></div>
                <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Semester</span><br /><span style={{ color: C.text.primary, fontWeight: 600 }}>{subject.semester}</span></div>
                <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Credits</span><br /><span style={{ color: C.text.primary, fontWeight: 600 }}>{subject.credits}</span></div>
                <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Exam Type</span><br />{getExamTypeBadge(subject.examType)}</div>
                <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Category</span><br />{getSubjectTypeBadge(subject.subjectType)}</div>
                <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Weekly Hours</span><br /><span style={{ color: C.accent.gold, fontWeight: 600 }}>{subject.totalWeeklyClasses}h</span></div>
              </div>
              
              <div style={{ display: "flex", gap: 12 }}>
                <Button onClick={() => handleApproveSubject(subject.id)} variant="success" fullWidth>
                  ✓ Approve Subject
                </Button>
                <Button onClick={() => openRejectModal(subject.id, "subject")} variant="danger" fullWidth>
                  ✗ Reject Subject
                </Button>
              </div>
            </Card>
          ))}
          
          {pendingSubjects.length === 0 && (
            <Card>
              <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>
                No subjects pending approval
              </p>
            </Card>
          )}
        </>
      )}
      
      {/* Faculty Preference Approvals Tab */}
      {selectedTab === "preferences" && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            <Card padding="20px">
              <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Preference Approval</p>
              <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingPreferenceApprovals.length}</p>
            </Card>
            <Card padding="20px">
              <p style={{ color: C.text.tertiary, fontSize: 12 }}>Approved Preferences</p>
              <p style={{ color: C.accent.green, fontSize: 32, fontWeight: 700 }}>{approvedPreferences.length}</p>
            </Card>
            <Card padding="20px">
              <p style={{ color: C.text.tertiary, fontSize: 12 }}>Rejected Preferences</p>
              <p style={{ color: C.accent.red, fontSize: 32, fontWeight: 700 }}>{rejectedPreferences.length}</p>
            </Card>
          </div>
          
          {pendingPreferenceApprovals.map(submission => {
            const faculty = AppState.faculty.find(f => f.id === submission.facultyId);
            return (
              <Card key={submission.facultyId}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <h4 style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{submission.facultyName}</h4>
                    <p style={{ color: C.accent.blue, fontSize: 14 }}>{faculty?.designation} - {submission.course}</p>
                    <p style={{ color: C.text.tertiary, fontSize: 12 }}>Email: {submission.email} | Contact: {submission.contactNumber}</p>
                  </div>
                  <Badge variant="warning">Pending Dean Approval</Badge>
                </div>
                
                <div style={{ marginBottom: 16 }}>
                  <p style={{ color: C.text.tertiary, fontSize: 12, marginBottom: 8 }}>Selected Preferences:</p>
                  {submission.preferences.map(p => {
                    const subject = AppState.subjects.find(s => s.id === p.subjectId);
                    return (
                      <div key={p.level} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", marginBottom: 4, background: C.cardHover, borderRadius: 8 }}>
                        <div>
                          <span style={{ fontWeight: 600 }}>Preference {p.level}:</span>
                          <span style={{ marginLeft: 8 }}>{p.subjectName}</span>
                          <span style={{ marginLeft: 8, fontSize: 12, color: C.text.tertiary }}>({p.subjectCode})</span>
                          {getSubjectTypeBadge(p.subjectType)}
                        </div>
                        <div style={{ color: C.accent.purple, fontWeight: 600 }}>{p.totalHours} hrs/wk</div>
                      </div>
                    );
                  })}
                </div>
                
                <div style={{ display: "flex", gap: 12 }}>
                  <Button onClick={() => handleApprovePreference(submission.facultyId)} variant="success" fullWidth>
                    ✓ Approve Preferences
                  </Button>
                  <Button onClick={() => openRejectModal(submission.facultyId, "preference")} variant="danger" fullWidth>
                    ✗ Reject Preferences
                  </Button>
                </div>
              </Card>
            );
          })}
          
          {pendingPreferenceApprovals.length === 0 && (
            <Card>
              <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>
                No faculty preference submissions pending approval
              </p>
            </Card>
          )}
        </>
      )}
    </div>
  );
}