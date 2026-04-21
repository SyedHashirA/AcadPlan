// // src/components/admin/DeanPreferenceApproval.jsx
// import { useState, useEffect } from "react";
// import { Card, Title, Badge, Button } from "../common";
// import { AppState } from "../../AppState";
// import { saveToStorage, STORAGE_KEYS } from "../../utils/storage";
// import { C } from "../../styles/theme";

// export function DeanPreferenceApproval() {
//   const [refresh, setRefresh] = useState(0);
//   const [pendingApprovals, setPendingApprovals] = useState([]);
//   const [approvedApprovals, setApprovedApprovals] = useState([]);
//   const [rejectedApprovals, setRejectedApprovals] = useState([]);
  
//   useEffect(() => {
//     loadData();
    
//     const handleStorageChange = () => {
//       loadData();
//       setRefresh(r => r + 1);
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const loadData = () => {
//     const pending = AppState.getPendingDeanPreferenceApprovals?.() || [];
//     const allPreferences = AppState.subjectPreferences || [];
//     const approved = allPreferences.filter(p => p.status === "approved");
//     const rejected = allPreferences.filter(p => p.status === "rejected");
    
//     setPendingApprovals(pending);
//     setApprovedApprovals(approved);
//     setRejectedApprovals(rejected);
//   };
  
//   const handleApprove = (facultyId) => {
//     AppState.updatePreferenceStatus(facultyId, "approved");
//     window.dispatchEvent(new Event('storage'));
//     loadData();
//     alert("Preference approved successfully!");
//   };
  
//   const handleReject = (facultyId) => {
//     const reason = prompt("Enter rejection reason:");
//     if (reason) {
//       AppState.updatePreferenceStatus(facultyId, "rejected", reason);
//       window.dispatchEvent(new Event('storage'));
//       loadData();
//       alert("Preference rejected!");
//     }
//   };
  
//   const getSubjectTypeBadge = (subjectType) => {
//     switch(subjectType) {
//       case "Core": return <Badge variant="primary">Core</Badge>;
//       case "Major": return <Badge variant="success">Major</Badge>;
//       case "Minor": return <Badge variant="warning">Minor</Badge>;
//       default: return <Badge variant="primary">{subjectType}</Badge>;
//     }
//   };
  
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <Title>Faculty Preference Approvals (Dean)</Title>
      
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Approval</p>
//           <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingApprovals.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Approved</p>
//           <p style={{ color: C.accent.green, fontSize: 32, fontWeight: 700 }}>{approvedApprovals.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Rejected</p>
//           <p style={{ color: C.accent.red, fontSize: 32, fontWeight: 700 }}>{rejectedApprovals.length}</p>
//         </Card>
//       </div>
      
//       {pendingApprovals.length > 0 ? (
//         pendingApprovals.map(pref => {
//           const faculty = AppState.faculty.find(f => f.id === pref.facultyId);
//           return (
//             <Card key={pref.facultyId}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
//                 <div>
//                   <h4 style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{pref.facultyName}</h4>
//                   <p style={{ color: C.accent.blue, fontSize: 14 }}>{faculty?.designation} - {faculty?.course}</p>
//                 </div>
//                 <Badge variant="warning">Pending Dean Approval</Badge>
//               </div>
              
//               <div style={{ marginBottom: 16 }}>
//                 <p style={{ color: C.text.tertiary, fontSize: 12, marginBottom: 8 }}>Allocated Subjects (by Coordinator):</p>
//                 {pref.allocatedSubjects?.map(subjectId => {
//                   const subject = AppState.subjects.find(s => s.id === subjectId);
//                   return (
//                     <div key={subjectId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", marginBottom: 4, background: C.cardHover, borderRadius: 8 }}>
//                       <div>
//                         <span style={{ fontWeight: 600 }}>{subject?.name}</span>
//                         <span style={{ marginLeft: 8, fontSize: 12, color: C.text.tertiary }}>({subject?.code})</span>
//                         {getSubjectTypeBadge(subject?.subjectType)}
//                       </div>
//                       <div style={{ color: C.accent.purple, fontWeight: 600 }}>{subject?.totalWeeklyClasses} hrs/wk</div>
//                     </div>
//                   );
//                 })}
//               </div>
              
//               <div style={{ marginBottom: 16, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
//                 <p style={{ color: C.text.secondary, fontSize: 13 }}>
//                   <strong>Allocated by Coordinator</strong> - Please review and approve or reject these preferences.
//                 </p>
//               </div>
              
//               <div style={{ display: "flex", gap: 12 }}>
//                 <Button onClick={() => handleApprove(pref.facultyId)} variant="success" fullWidth>
//                   ✓ Approve Preferences
//                 </Button>
//                 <Button onClick={() => handleReject(pref.facultyId)} variant="danger" fullWidth>
//                   ✗ Reject Preferences
//                 </Button>
//               </div>
//             </Card>
//           );
//         })
//       ) : (
//         <Card>
//           <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>
//             No faculty preferences pending approval
//           </p>
//         </Card>
//       )}
      
//       {/* Approved Preferences Section */}
//       {approvedApprovals.length > 0 && (
//         <Card>
//           <Title level={4}>Approved Preferences ({approvedApprovals.length})</Title>
//           <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//             {approvedApprovals.map(pref => (
//               <div key={pref.facultyId} style={{ padding: 12, background: C.accent.greenBg, borderRadius: 8 }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                   <span style={{ fontWeight: 600 }}>{pref.facultyName}</span>
//                   <Badge variant="success">Approved</Badge>
//                 </div>
//                 <div style={{ fontSize: 12, color: C.text.secondary, marginTop: 4 }}>
//                   {pref.allocatedSubjects?.length} subjects allocated
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Card>
//       )}
//     </div>
//   );
// }

// src/components/admin/DeanPreferenceApproval.jsx
import { useState, useEffect } from "react";
import { Card, Title, Badge, Button } from "../common";
import { AppState } from "../../AppState";
import { C } from "../../styles/theme";

export function DeanPreferenceApproval() {
  const [refresh, setRefresh] = useState(0);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [approvedApprovals, setApprovedApprovals] = useState([]);
  const [rejectedApprovals, setRejectedApprovals] = useState([]);
  
  useEffect(() => {
    loadData();
    
    const handleStorageChange = () => {
      loadData();
      setRefresh(r => r + 1);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  const loadData = () => {
    // Get preferences that are submitted but not yet approved/rejected
    const allPreferences = AppState.subjectPreferences || [];
    const pending = allPreferences.filter(p => p.submitted && p.status === "pending");
    const approved = allPreferences.filter(p => p.status === "approved");
    const rejected = allPreferences.filter(p => p.status === "rejected");
    
    setPendingApprovals(pending);
    setApprovedApprovals(approved);
    setRejectedApprovals(rejected);
  };
  
  const handleApprove = (facultyId, preferences) => {
    // Dean approves the preferences as they are - no allocation needed
    AppState.updatePreferenceStatus(facultyId, "approved", "");
    window.dispatchEvent(new Event('storage'));
    loadData();
    alert("Preference approved successfully! Faculty can now submit course details.");
  };
  
  const handleReject = (facultyId) => {
    const reason = prompt("Enter rejection reason:");
    if (reason) {
      AppState.updatePreferenceStatus(facultyId, "rejected", reason);
      window.dispatchEvent(new Event('storage'));
      loadData();
      alert("Preference rejected!");
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
      <Title>Faculty Preference Approvals (Dean)</Title>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        <Card padding="20px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Approval</p>
          <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingApprovals.length}</p>
        </Card>
        <Card padding="20px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Approved</p>
          <p style={{ color: C.accent.green, fontSize: 32, fontWeight: 700 }}>{approvedApprovals.length}</p>
        </Card>
        <Card padding="20px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Rejected</p>
          <p style={{ color: C.accent.red, fontSize: 32, fontWeight: 700 }}>{rejectedApprovals.length}</p>
        </Card>
      </div>
      
      {pendingApprovals.length > 0 ? (
        pendingApprovals.map(pref => {
          const faculty = AppState.faculty.find(f => f.id === pref.facultyId);
          return (
            <Card key={pref.facultyId}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
                <div>
                  <h4 style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{pref.facultyName}</h4>
                  <p style={{ color: C.accent.blue, fontSize: 14 }}>{faculty?.designation} - {faculty?.course}</p>
                  <p style={{ color: C.text.tertiary, fontSize: 12 }}>Email: {faculty?.email} | Contact: {pref.contactNumber || 'N/A'}</p>
                </div>
                <Badge variant="warning">Pending Dean Approval</Badge>
              </div>
              
              <div style={{ marginBottom: 16 }}>
                <p style={{ color: C.text.tertiary, fontSize: 12, marginBottom: 8 }}>Selected Preferences:</p>
                {pref.preferences?.map(p => {
                  const subject = AppState.subjects.find(s => s.id === p.subjectId);
                  return (
                    <div key={p.level} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", marginBottom: 4, background: C.cardHover, borderRadius: 8 }}>
                      <div>
                        <span style={{ fontWeight: 600 }}>Preference {p.level}:</span>
                        <span style={{ marginLeft: 8 }}>{subject?.name}</span>
                        <span style={{ marginLeft: 8, fontSize: 12, color: C.text.tertiary }}>({subject?.code})</span>
                        {getSubjectTypeBadge(subject?.subjectType)}
                      </div>
                      <div style={{ color: C.accent.purple, fontWeight: 600 }}>{subject?.totalWeeklyClasses} hrs/wk</div>
                    </div>
                  );
                })}
              </div>
              
              <div style={{ marginBottom: 16, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
                <p style={{ color: C.text.secondary, fontSize: 13 }}>
                  <strong>Submitted by Faculty</strong> - Please review and approve or reject these preferences.
                </p>
              </div>
              
              <div style={{ display: "flex", gap: 12 }}>
                <Button onClick={() => handleApprove(pref.facultyId, pref.preferences)} variant="success" fullWidth>
                  ✓ Approve Preferences
                </Button>
                <Button onClick={() => handleReject(pref.facultyId)} variant="danger" fullWidth>
                  ✗ Reject Preferences
                </Button>
              </div>
            </Card>
          );
        })
      ) : (
        <Card>
          <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>
            No faculty preferences pending approval
          </p>
        </Card>
      )}
      
      {/* Approved Preferences Section */}
      {approvedApprovals.length > 0 && (
        <Card>
          <Title level={4}>Approved Preferences ({approvedApprovals.length})</Title>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {approvedApprovals.map(pref => (
              <div key={pref.facultyId} style={{ padding: 12, background: C.accent.greenBg, borderRadius: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 600 }}>{pref.facultyName}</span>
                  <Badge variant="success">Approved by Dean</Badge>
                </div>
                <div style={{ fontSize: 12, color: C.text.secondary, marginTop: 4 }}>
                  {pref.preferences?.length} subjects selected
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}