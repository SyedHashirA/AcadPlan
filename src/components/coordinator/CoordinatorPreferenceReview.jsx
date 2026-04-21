// import { useState, useEffect } from "react";
// import { Card, Title, Badge, Button } from "../common";
// import { AppState } from "../../AppState";
// import { C } from "../../styles/theme";

// export function CoordinatorPreferenceReview() {
//   const [refresh, setRefresh] = useState(0);
//   const [selectedFaculty, setSelectedFaculty] = useState(null);
//   const [allocatedSubjects, setAllocatedSubjects] = useState([]);
  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRefresh(r => r + 1);
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const pendingPrefs = AppState.subjectPreferences.filter(p => p.submitted && p.status === "pending");
//   const approvedPrefs = AppState.subjectPreferences.filter(p => p.status === "approved");
  
//   const handleApprove = (facultyId, selectedSubjects) => {
//     AppState.updatePreferenceStatus(facultyId, "approved", "", selectedSubjects);
//     setSelectedFaculty(null);
//     setAllocatedSubjects([]);
//     setRefresh(r => r + 1);
//   };
  
//   const handleReject = (facultyId) => {
//     const reason = prompt("Enter rejection reason:");
//     if (reason) {
//       AppState.updatePreferenceStatus(facultyId, "rejected", reason);
//       setRefresh(r => r + 1);
//     }
//   };
  
//   const checkFacultyConflict = (facultyId, subjectId) => {
//     const existingAllocations = AppState.courseDetails.filter(c => 
//       c.facultyId === facultyId && c.subjectId === subjectId
//     );
//     return existingAllocations.length > 0;
//   };
  
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <Title>Subject Preference Review & Conflict Resolution</Title>
      
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Reviews</p>
//           <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingPrefs.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Approved</p>
//           <p style={{ color: C.accent.green, fontSize: 32, fontWeight: 700 }}>{approvedPrefs.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Workload Used</p>
//           <p style={{ color: C.accent.blue, fontSize: 32, fontWeight: 700 }}>
//             {AppState.faculty.reduce((sum, f) => sum + f.assignedHours, 0)}h
//           </p>
//         </Card>
//       </div>
      
//       <div>
//         <h4 style={{ color: C.text.primary, fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Pending Reviews</h4>
//         {pendingPrefs.length === 0 ? (
//           <Card>
//             <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>No pending preference forms</p>
//           </Card>
//         ) : (
//           pendingPrefs.map(pref => {
//             const faculty = AppState.faculty.find(f => f.id === pref.facultyId);
            
//             return (
//               <Card key={pref.id} style={{ marginBottom: 16 }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
//                   <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
//                     <div style={{
//                       width: 48,
//                       height: 48,
//                       borderRadius: "50%",
//                       background: `${faculty.color}20`,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       color: faculty.color,
//                       fontWeight: 700,
//                     }}>
//                       {pref.avatar}
//                     </div>
//                     <div>
//                       <p style={{ color: C.text.primary, fontWeight: 600, fontSize: 16 }}>{pref.facultyName}</p>
//                       <p style={{ color: C.text.secondary, fontSize: 13 }}>{faculty.designation} · {faculty.course}</p>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div style={{ marginBottom: 16 }}>
//                   <p style={{ color: C.text.tertiary, fontSize: 12, marginBottom: 4 }}>Workload:</p>
//                   <p style={{ color: faculty.assignedHours <= faculty.maxHours ? C.accent.green : C.accent.red, fontSize: 14, fontWeight: 600 }}>
//                     Assigned: {faculty.assignedHours}h / {faculty.maxHours}h max | Remaining: {faculty.remainingHours}h
//                   </p>
//                 </div>
                
//                 <div style={{ marginBottom: 16 }}>
//                   <p style={{ color: C.text.tertiary, fontSize: 12, marginBottom: 8 }}>Subject Preferences:</p>
//                   {pref.preferences.map(p => {
//                     const subject = AppState.subjects.find(s => s.id === p.subjectId);
//                     const hasConflict = checkFacultyConflict(faculty.id, p.subjectId);
                    
//                     return (
//                       <div key={p.level} style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         padding: "8px 12px",
//                         marginBottom: 4,
//                         background: C.cardHover,
//                         borderRadius: 8,
//                       }}>
//                         <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                           <span style={{
//                             width: 24,
//                             height: 24,
//                             borderRadius: "50%",
//                             background: p.level === 1 ? C.accent.goldBg : p.level === 2 ? C.accent.blueBg : C.accent.greenBg,
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             color: p.level === 1 ? C.accent.gold : p.level === 2 ? C.accent.blue : C.accent.green,
//                             fontSize: 12,
//                             fontWeight: 700,
//                           }}>
//                             {p.level}
//                           </span>
//                           <span style={{ color: C.text.primary }}>{subject?.name}</span>
//                           {hasConflict && (
//                             <Badge variant="danger">Conflict</Badge>
//                           )}
//                         </div>
//                         <span style={{ color: C.accent.blue, fontSize: 12 }}>{subject?.totalWeeklyClasses}h</span>
//                       </div>
//                     );
//                   })}
//                 </div>
                
//                 {selectedFaculty === pref.facultyId ? (
//                   <div>
//                     <p style={{ color: C.accent.gold, fontSize: 13, marginBottom: 12 }}>Select subjects to allocate (max {faculty.remainingHours}h):</p>
//                     {pref.preferences.map(p => {
//                       const subject = AppState.subjects.find(s => s.id === p.subjectId);
//                       const isSelected = allocatedSubjects.includes(p.subjectId);
//                       const totalHours = allocatedSubjects.reduce((sum, sId) => {
//                         const sub = AppState.subjects.find(subj => subj.id === sId);
//                         return sum + (sub?.totalWeeklyClasses || 0);
//                       }, 0);
//                       const wouldExceed = totalHours + (subject?.totalWeeklyClasses || 0) > faculty.remainingHours;
//                       const hasConflict = checkFacultyConflict(faculty.id, p.subjectId);
                      
//                       return (
//                         <button
//                           key={p.level}
//                           onClick={() => {
//                             if (isSelected) {
//                               setAllocatedSubjects(allocatedSubjects.filter(s => s !== p.subjectId));
//                             } else if (!wouldExceed && !hasConflict) {
//                               setAllocatedSubjects([...allocatedSubjects, p.subjectId]);
//                             }
//                           }}
//                           disabled={(!isSelected && wouldExceed) || hasConflict}
//                           style={{
//                             display: "block",
//                             width: "100%",
//                             padding: "10px 12px",
//                             marginBottom: 6,
//                             background: isSelected ? C.accent.greenBg : "transparent",
//                             border: `1px solid ${isSelected ? C.accent.green : hasConflict ? C.accent.red : C.border}`,
//                             borderRadius: 8,
//                             cursor: (wouldExceed && !isSelected) || hasConflict ? "not-allowed" : "pointer",
//                             textAlign: "left",
//                             color: C.text.primary,
//                             opacity: (wouldExceed && !isSelected) || hasConflict ? 0.5 : 1,
//                           }}
//                         >
//                           <div style={{ display: "flex", justifyContent: "space-between" }}>
//                             <span>
//                               {subject?.name} (Pref {p.level})
//                               {hasConflict && " - Already Assigned"}
//                             </span>
//                             <span style={{ color: C.accent.blue }}>{subject?.totalWeeklyClasses}h</span>
//                           </div>
//                         </button>
//                       );
//                     })}
//                     <div style={{ marginTop: 12, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//                       <p style={{ color: C.text.secondary, fontSize: 13 }}>
//                         Selected: {allocatedSubjects.reduce((sum, sId) => {
//                           const sub = AppState.subjects.find(subj => subj.id === sId);
//                           return sum + (sub?.totalWeeklyClasses || 0);
//                         }, 0)}h / {faculty.remainingHours}h remaining
//                       </p>
//                     </div>
//                     <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
//                       <Button 
//                         onClick={() => handleApprove(pref.facultyId, allocatedSubjects)}
//                         disabled={allocatedSubjects.length === 0}
//                         variant="success"
//                         fullWidth
//                       >
//                         Confirm Allocation
//                       </Button>
//                       <Button 
//                         onClick={() => { setSelectedFaculty(null); setAllocatedSubjects([]); }}
//                         variant="secondary"
//                         fullWidth
//                       >
//                         Cancel
//                       </Button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div style={{ display: "flex", gap: 12 }}>
//                     <Button onClick={() => setSelectedFaculty(pref.facultyId)} variant="primary" fullWidth>
//                       Review & Allocate
//                     </Button>
//                     <Button onClick={() => handleReject(pref.facultyId)} variant="danger" fullWidth>
//                       Reject
//                     </Button>
//                   </div>
//                 )}
//               </Card>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// }

// // src/components/coordinator/CoordinatorPreferenceReview.jsx
// import { useState, useEffect } from "react";
// import { Card, Title, Badge, Button } from "../common";
// import { AppState } from "../../AppState";
// import { saveToStorage, STORAGE_KEYS } from "../../utils/storage";
// import { C } from "../../styles/theme";

// export function CoordinatorPreferenceReview() {
//   const [refresh, setRefresh] = useState(0);
//   const [selectedFaculty, setSelectedFaculty] = useState(null);
//   const [allocatedSubjects, setAllocatedSubjects] = useState([]);
  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRefresh(r => r + 1);
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   // Get all submitted preferences (pending coordinator allocation)
//   const pendingPrefs = AppState.subjectPreferences.filter(p => p.submitted && p.status === "pending");
//   const allocatedPrefs = AppState.subjectPreferences.filter(p => p.status === "allocated");
  
//   const handleAllocate = (facultyId, selectedSubjects) => {
//     // Mark as allocated (not approved) - Dean will approve later
//     AppState.updatePreferenceStatus(facultyId, "allocated", "", selectedSubjects);
//     setSelectedFaculty(null);
//     setAllocatedSubjects([]);
//     setRefresh(r => r + 1);
//     alert("Subjects allocated successfully! Waiting for Dean's approval.");
//   };
  
//   const handleRequestChanges = (facultyId) => {
//     const reason = prompt("Enter reason for requesting changes:");
//     if (reason) {
//       AppState.updatePreferenceStatus(facultyId, "rejected", reason);
//       setRefresh(r => r + 1);
//       alert("Request for changes sent to faculty.");
//     }
//   };
  
//   const checkFacultyConflict = (facultyId, subjectId) => {
//     const existingAllocations = AppState.courseDetails.filter(c => 
//       c.facultyId === facultyId && c.subjectId === subjectId
//     );
//     return existingAllocations.length > 0;
//   };
  
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <Title>Subject Preference Review & Allocation (Coordinator)</Title>
      
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Allocation</p>
//           <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingPrefs.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Allocated (Pending Dean Approval)</p>
//           <p style={{ color: C.accent.blue, fontSize: 32, fontWeight: 700 }}>{allocatedPrefs.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Workload Used</p>
//           <p style={{ color: C.accent.green, fontSize: 32, fontWeight: 700 }}>
//             {AppState.faculty.reduce((sum, f) => sum + f.assignedHours, 0)}h
//           </p>
//         </Card>
//       </div>
      
//       <div>
//         <h4 style={{ color: C.text.primary, fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Pending Allocation</h4>
//         {pendingPrefs.length === 0 ? (
//           <Card>
//             <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>No pending preference forms</p>
//           </Card>
//         ) : (
//           pendingPrefs.map(pref => {
//             const faculty = AppState.faculty.find(f => f.id === pref.facultyId);
            
//             return (
//               <Card key={pref.id} style={{ marginBottom: 16 }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
//                   <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
//                     <div style={{
//                       width: 48,
//                       height: 48,
//                       borderRadius: "50%",
//                       background: `${faculty.color}20`,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       color: faculty.color,
//                       fontWeight: 700,
//                     }}>
//                       {pref.avatar}
//                     </div>
//                     <div>
//                       <p style={{ color: C.text.primary, fontWeight: 600, fontSize: 16 }}>{pref.facultyName}</p>
//                       <p style={{ color: C.text.secondary, fontSize: 13 }}>{faculty.designation} · {faculty.course}</p>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div style={{ marginBottom: 16 }}>
//                   <p style={{ color: C.text.tertiary, fontSize: 12, marginBottom: 4 }}>Workload:</p>
//                   <p style={{ color: faculty.assignedHours <= faculty.maxHours ? C.accent.green : C.accent.red, fontSize: 14, fontWeight: 600 }}>
//                     Assigned: {faculty.assignedHours}h / {faculty.maxHours}h max | Remaining: {faculty.remainingHours}h
//                   </p>
//                 </div>
                
//                 <div style={{ marginBottom: 16 }}>
//                   <p style={{ color: C.text.tertiary, fontSize: 12, marginBottom: 8 }}>Subject Preferences:</p>
//                   {pref.preferences.map(p => {
//                     const subject = AppState.subjects.find(s => s.id === p.subjectId);
//                     const hasConflict = checkFacultyConflict(faculty.id, p.subjectId);
                    
//                     return (
//                       <div key={p.level} style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         padding: "8px 12px",
//                         marginBottom: 4,
//                         background: C.cardHover,
//                         borderRadius: 8,
//                       }}>
//                         <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                           <span style={{
//                             width: 24,
//                             height: 24,
//                             borderRadius: "50%",
//                             background: p.level === 1 ? C.accent.goldBg : p.level === 2 ? C.accent.blueBg : C.accent.greenBg,
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             color: p.level === 1 ? C.accent.gold : p.level === 2 ? C.accent.blue : C.accent.green,
//                             fontSize: 12,
//                             fontWeight: 700,
//                           }}>
//                             {p.level}
//                           </span>
//                           <span style={{ color: C.text.primary }}>{subject?.name}</span>
//                           {hasConflict && (
//                             <Badge variant="danger">Conflict</Badge>
//                           )}
//                         </div>
//                         <span style={{ color: C.accent.blue, fontSize: 12 }}>{subject?.totalWeeklyClasses}h</span>
//                       </div>
//                     );
//                   })}
//                 </div>
                
//                 {selectedFaculty === pref.facultyId ? (
//                   <div>
//                     <p style={{ color: C.accent.gold, fontSize: 13, marginBottom: 12 }}>Select subjects to allocate (max {faculty.remainingHours}h):</p>
//                     {pref.preferences.map(p => {
//                       const subject = AppState.subjects.find(s => s.id === p.subjectId);
//                       const isSelected = allocatedSubjects.includes(p.subjectId);
//                       const totalHours = allocatedSubjects.reduce((sum, sId) => {
//                         const sub = AppState.subjects.find(subj => subj.id === sId);
//                         return sum + (sub?.totalWeeklyClasses || 0);
//                       }, 0);
//                       const wouldExceed = totalHours + (subject?.totalWeeklyClasses || 0) > faculty.remainingHours;
//                       const hasConflict = checkFacultyConflict(faculty.id, p.subjectId);
                      
//                       return (
//                         <button
//                           key={p.level}
//                           onClick={() => {
//                             if (isSelected) {
//                               setAllocatedSubjects(allocatedSubjects.filter(s => s !== p.subjectId));
//                             } else if (!wouldExceed && !hasConflict) {
//                               setAllocatedSubjects([...allocatedSubjects, p.subjectId]);
//                             }
//                           }}
//                           disabled={(!isSelected && wouldExceed) || hasConflict}
//                           style={{
//                             display: "block",
//                             width: "100%",
//                             padding: "10px 12px",
//                             marginBottom: 6,
//                             background: isSelected ? C.accent.greenBg : "transparent",
//                             border: `1px solid ${isSelected ? C.accent.green : hasConflict ? C.accent.red : C.border}`,
//                             borderRadius: 8,
//                             cursor: (wouldExceed && !isSelected) || hasConflict ? "not-allowed" : "pointer",
//                             textAlign: "left",
//                             color: C.text.primary,
//                             opacity: (wouldExceed && !isSelected) || hasConflict ? 0.5 : 1,
//                           }}
//                         >
//                           <div style={{ display: "flex", justifyContent: "space-between" }}>
//                             <span>
//                               {subject?.name} (Pref {p.level})
//                               {hasConflict && " - Already Assigned"}
//                             </span>
//                             <span style={{ color: C.accent.blue }}>{subject?.totalWeeklyClasses}h</span>
//                           </div>
//                         </button>
//                       );
//                     })}
//                     <div style={{ marginTop: 12, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//                       <p style={{ color: C.text.secondary, fontSize: 13 }}>
//                         Selected: {allocatedSubjects.reduce((sum, sId) => {
//                           const sub = AppState.subjects.find(subj => subj.id === sId);
//                           return sum + (sub?.totalWeeklyClasses || 0);
//                         }, 0)}h / {faculty.remainingHours}h remaining
//                       </p>
//                     </div>
//                     <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
//                       <Button 
//                         onClick={() => handleAllocate(pref.facultyId, allocatedSubjects)}
//                         disabled={allocatedSubjects.length === 0}
//                         variant="success"
//                         fullWidth
//                       >
//                         Confirm Allocation
//                       </Button>
//                       <Button 
//                         onClick={() => { setSelectedFaculty(null); setAllocatedSubjects([]); }}
//                         variant="secondary"
//                         fullWidth
//                       >
//                         Cancel
//                       </Button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div style={{ display: "flex", gap: 12 }}>
//                     <Button onClick={() => setSelectedFaculty(pref.facultyId)} variant="primary" fullWidth>
//                       Review & Allocate
//                     </Button>
//                     <Button onClick={() => handleRequestChanges(pref.facultyId)} variant="warning" fullWidth>
//                       Request Changes
//                     </Button>
//                   </div>
//                 )}
//               </Card>
//             );
//           })
//         )}
//       </div>
      
//       {/* Allocated Preferences Section */}
//       {allocatedPrefs.length > 0 && (
//         <div>
//           <h4 style={{ color: C.text.primary, fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Allocated (Pending Dean Approval)</h4>
//           {allocatedPrefs.map(pref => {
//             const faculty = AppState.faculty.find(f => f.id === pref.facultyId);
//             return (
//               <Card key={pref.id} style={{ marginBottom: 16, background: C.accent.blueBg }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
//                   <div>
//                     <p style={{ fontWeight: 600 }}>{pref.facultyName}</p>
//                     <p style={{ fontSize: 12, color: C.text.tertiary }}>{faculty?.designation} · {faculty?.course}</p>
//                   </div>
//                   <Badge variant="warning">Pending Dean Approval</Badge>
//                 </div>
//                 <div>
//                   <p style={{ fontSize: 12, color: C.text.tertiary, marginBottom: 4 }}>Allocated Subjects:</p>
//                   {pref.allocatedSubjects?.map(subjectId => {
//                     const subject = AppState.subjects.find(s => s.id === subjectId);
//                     return (
//                       <Badge key={subjectId} variant="primary" style={{ marginRight: 8, marginBottom: 4 }}>
//                         {subject?.name} ({subject?.totalWeeklyClasses}h)
//                       </Badge>
//                     );
//                   })}
//                 </div>
//               </Card>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// src/components/coordinator/CoordinatorPreferenceReview.jsx
import { useState, useEffect } from "react";
import { Card, Title, Badge } from "../common";
import { AppState } from "../../AppState";
import { C } from "../../styles/theme";

export function CoordinatorPreferenceReview() {
  const [refresh, setRefresh] = useState(0);
  
  useEffect(() => {
    const handleStorageChange = () => {
      setRefresh(r => r + 1);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  // Get approved preferences (Dean approved)
  const approvedPrefs = AppState.subjectPreferences.filter(p => p.status === "approved");
  const pendingPrefs = AppState.subjectPreferences.filter(p => p.submitted && p.status === "pending");
  
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Title>Faculty Preferences (View Only)</Title>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
        <Card padding="20px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Dean Approval</p>
          <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingPrefs.length}</p>
        </Card>
        <Card padding="20px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Approved by Dean</p>
          <p style={{ color: C.accent.green, fontSize: 32, fontWeight: 700 }}>{approvedPrefs.length}</p>
        </Card>
      </div>
      
      <div>
        <h4 style={{ color: C.text.primary, fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Approved Preferences</h4>
        {approvedPrefs.length === 0 ? (
          <Card>
            <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>
              No approved preferences yet. Dean will approve preferences directly.
            </p>
          </Card>
        ) : (
          approvedPrefs.map(pref => {
            const faculty = AppState.faculty.find(f => f.id === pref.facultyId);
            return (
              <Card key={pref.id} style={{ marginBottom: 16, background: C.accent.greenBg }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 16 }}>{pref.facultyName}</p>
                    <p style={{ fontSize: 12, color: C.text.tertiary }}>{faculty?.designation} · {faculty?.course}</p>
                  </div>
                  <Badge variant="success">Approved by Dean</Badge>
                </div>
                <div>
                  <p style={{ fontSize: 12, color: C.text.tertiary, marginBottom: 8 }}>Selected Preferences:</p>
                  {pref.preferences?.map(p => {
                    const subject = AppState.subjects.find(s => s.id === p.subjectId);
                    return (
                      <div key={p.level} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", marginBottom: 4, background: C.surface, borderRadius: 8 }}>
                        <div>
                          <span style={{ fontWeight: 600 }}>Preference {p.level}:</span>
                          <span style={{ marginLeft: 8 }}>{subject?.name}</span>
                          <span style={{ marginLeft: 8, fontSize: 12, color: C.text.tertiary }}>({subject?.code})</span>
                        </div>
                        <div style={{ color: C.accent.purple, fontWeight: 600 }}>{subject?.totalWeeklyClasses} hrs/wk</div>
                      </div>
                    );
                  })}
                </div>
                {pref.approvedAt && (
                  <p style={{ fontSize: 11, color: C.text.tertiary, marginTop: 12 }}>
                    Approved on: {new Date(pref.approvedAt).toLocaleString()}
                  </p>
                )}
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}