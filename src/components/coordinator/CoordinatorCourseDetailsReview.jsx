// import { useState, useEffect } from "react";
// import { Card, Title, Badge, Button } from "../common";
// import { AppState } from "../../AppState";
// import { C } from "../../styles/theme";

// export function CoordinatorCourseDetailsReview() {
//   const [refresh, setRefresh] = useState(0);
  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRefresh(r => r + 1);
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const pendingCourses = AppState.getPendingCoordinatorApprovals();
//   const approvedCourses = AppState.courseDetails.filter(c => c.coordinatorStatus === "approved");
  
//   const handleApprove = (courseId) => {
//     AppState.updateCourseDetailCoordinatorStatus(courseId, "approved");
//     setRefresh(r => r + 1);
//   };
  
//   const handleReject = (courseId) => {
//     const reason = prompt("Enter rejection reason:");
//     if (reason) {
//       AppState.updateCourseDetailCoordinatorStatus(courseId, "rejected", reason);
//       setRefresh(r => r + 1);
//     }
//   };
  
//   const allPrefsApproved = AppState.subjectPreferences.every(p => p.status === "approved" || p.status === "rejected");
  
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <Title>Detailed Course Information Review (Coordinator)</Title>
//       </div>
      
//       {!allPrefsApproved && (
//         <Card padding="16px">
//           <p style={{ color: C.accent.gold }}>⚠ Please complete all preference allocations first before reviewing course details.</p>
//         </Card>
//       )}
      
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Review</p>
//           <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingCourses.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Approved (Sent to Dean)</p>
//           <p style={{ color: C.accent.green, fontSize: 32, fontWeight: 700 }}>{approvedCourses.length}</p>
//         </Card>
//       </div>
      
//       {pendingCourses.length > 0 ? (
//         pendingCourses.map(course => {
//           const faculty = AppState.faculty.find(f => f.id === course.facultyId);
          
//           return (
//             <Card key={course.id}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
//                 <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
//                   <div style={{
//                     width: 48,
//                     height: 48,
//                     borderRadius: "50%",
//                     background: `${faculty.color}20`,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: faculty.color,
//                     fontWeight: 700,
//                   }}>
//                     {faculty.avatar}
//                   </div>
//                   <div>
//                     <p style={{ color: C.text.primary, fontWeight: 600, fontSize: 16 }}>{faculty.name}</p>
//                     <p style={{ color: C.accent.blue, fontSize: 14 }}>{course.subjectName} ({course.subjectCode})</p>
//                     <p style={{ color: C.text.tertiary, fontSize: 12 }}>{course.course} Sem {course.semester}</p>
//                   </div>
//                 </div>
//               </div>
              
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Credits</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.credits}</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Modules</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.modules}</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Theory</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.theoryClassesPerWeek}h</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Lab</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.labPeriodsPerWeek}h</span></div>
//               </div>
              
//               <div style={{ marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//                 <p style={{ color: C.accent.gold, fontSize: 14 }}>Total Weekly Classes per Section: {course.totalWeeklyClasses}</p>
//                 <p style={{ color: C.accent.gold, fontSize: 14 }}>Total Sessions (3 sections): {course.totalWeeklyClasses * 3}</p>
//               </div>
              
//               <div style={{ display: "flex", gap: 12 }}>
//                 <Button onClick={() => handleApprove(course.id)} variant="success" fullWidth>
//                   ✓ Approve & Send to Dean
//                 </Button>
//                 <Button onClick={() => handleReject(course.id)} variant="danger" fullWidth>
//                   ✗ Reject
//                 </Button>
//               </div>
//             </Card>
//           );
//         })
//       ) : (
//         <Card>
//           <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>No pending course details</p>
//         </Card>
//       )}
//     </div>
//   );
// }
// src/components/coordinator/CoordinatorCourseDetailsReview.jsx
// import { useState, useEffect } from "react";
// import { Card, Title, Badge, Button } from "../common";
// import { AppState } from "../../AppState";
// import { C } from "../../styles/theme";

// export function CoordinatorCourseDetailsReview() {
//   const [refresh, setRefresh] = useState(0);
  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRefresh(r => r + 1);
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const pendingCourses = AppState.courseDetails.filter(c => c.coordinatorStatus === "pending");
//   const reviewedCourses = AppState.courseDetails.filter(c => c.coordinatorStatus === "reviewed");
  
//   const handleMarkReviewed = (courseId) => {
//     AppState.updateCourseDetailCoordinatorStatus(courseId, "reviewed");
//     setRefresh(r => r + 1);
//     alert("Course marked as reviewed. Sent to Dean for final approval.");
//   };
  
//   const handleRequestChanges = (courseId) => {
//     const reason = prompt("Enter reason for requesting changes:");
//     if (reason) {
//       AppState.updateCourseDetailCoordinatorStatus(courseId, "changes_requested", reason);
//       setRefresh(r => r + 1);
//       alert("Changes requested. Faculty will be notified.");
//     }
//   };
  
//   const allPrefsAllocated = AppState.subjectPreferences.every(p => p.status === "allocated" || p.status === "approved");
  
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <Title>Detailed Course Information Review (Coordinator)</Title>
//       </div>
      
//       {!allPrefsAllocated && (
//         <Card padding="16px">
//           <p style={{ color: C.accent.gold }}>⚠ Please complete all preference allocations first before reviewing course details.</p>
//         </Card>
//       )}
      
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Review</p>
//           <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingCourses.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Reviewed (Sent to Dean)</p>
//           <p style={{ color: C.accent.green, fontSize: 32, fontWeight: 700 }}>{reviewedCourses.length}</p>
//         </Card>
//       </div>
      
//       {pendingCourses.length > 0 ? (
//         pendingCourses.map(course => {
//           const faculty = AppState.faculty.find(f => f.id === course.facultyId);
          
//           return (
//             <Card key={course.id}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
//                 <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
//                   <div style={{
//                     width: 48,
//                     height: 48,
//                     borderRadius: "50%",
//                     background: `${faculty.color}20`,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: faculty.color,
//                     fontWeight: 700,
//                   }}>
//                     {faculty.avatar}
//                   </div>
//                   <div>
//                     <p style={{ color: C.text.primary, fontWeight: 600, fontSize: 16 }}>{faculty.name}</p>
//                     <p style={{ color: C.accent.blue, fontSize: 14 }}>{course.subjectName} ({course.subjectCode})</p>
//                     <p style={{ color: C.text.tertiary, fontSize: 12 }}>{course.course} Sem {course.semester}</p>
//                   </div>
//                 </div>
//               </div>
              
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Credits</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.credits}</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Modules</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.modules}</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Theory</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.theoryClassesPerWeek}h</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Lab</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.labPeriodsPerWeek}h</span></div>
//               </div>
              
//               <div style={{ marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//                 <p style={{ color: C.accent.gold, fontSize: 14 }}>Total Weekly Classes per Section: {course.totalWeeklyClasses}</p>
//                 <p style={{ color: C.accent.gold, fontSize: 14 }}>Total Sessions (3 sections): {course.totalWeeklyClasses * 3}</p>
//               </div>
              
//               <div style={{ display: "flex", gap: 12 }}>
//                 <Button onClick={() => handleMarkReviewed(course.id)} variant="success" fullWidth>
//                   ✓ Mark as Reviewed (Send to Dean)
//                 </Button>
//                 <Button onClick={() => handleRequestChanges(course.id)} variant="warning" fullWidth>
//                   Request Changes
//                 </Button>
//               </div>
//             </Card>
//           );
//         })
//       ) : (
//         <Card>
//           <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>No pending course details to review</p>
//         </Card>
//       )}
//     </div>
//   );
// }

// src/components/coordinator/CoordinatorCourseDetailsReview.jsx
import { useState, useEffect } from "react";
import { Card, Title, Badge } from "../common";
import { AppState } from "../../AppState";
import { C } from "../../styles/theme";

export function CoordinatorCourseDetailsReview() {
  const [refresh, setRefresh] = useState(0);
  
  useEffect(() => {
    const handleStorageChange = () => {
      setRefresh(r => r + 1);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  // Get course details that have been approved by Dean
  const approvedCourses = AppState.courseDetails.filter(c => c.deanStatus === "approved");
  const pendingCourses = AppState.courseDetails.filter(c => c.deanStatus === "pending");
  const rejectedCourses = AppState.courseDetails.filter(c => c.deanStatus === "rejected");
  
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Title>Course Details (View Only)</Title>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        <Card padding="20px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Dean Approval</p>
          <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingCourses.length}</p>
        </Card>
        <Card padding="20px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Approved by Dean</p>
          <p style={{ color: C.accent.green, fontSize: 32, fontWeight: 700 }}>{approvedCourses.length}</p>
        </Card>
        <Card padding="20px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Rejected</p>
          <p style={{ color: C.accent.red, fontSize: 32, fontWeight: 700 }}>{rejectedCourses.length}</p>
        </Card>
      </div>
      
      <div>
        <h4 style={{ color: C.text.primary, fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Approved Course Details</h4>
        {approvedCourses.length === 0 ? (
          <Card>
            <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>
              No course details have been approved by Dean yet.
            </p>
          </Card>
        ) : (
          approvedCourses.map(course => {
            const faculty = AppState.faculty.find(f => f.id === course.facultyId);
            return (
              <Card key={course.id} style={{ marginBottom: 16, background: C.accent.greenBg }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 16 }}>{course.subjectName}</p>
                    <p style={{ fontSize: 12, color: C.text.tertiary }}>{faculty?.name} - {course.course} Sem {course.semester}</p>
                  </div>
                  <Badge variant="success">Approved by Dean</Badge>
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 12, padding: 12, background: C.surface, borderRadius: 8 }}>
                  <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Credits</span><br /><span style={{ fontWeight: 600 }}>{course.credits}</span></div>
                  <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Modules</span><br /><span style={{ fontWeight: 600 }}>{course.modules}</span></div>
                  <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Theory Hours</span><br /><span style={{ fontWeight: 600 }}>{course.theoryClassesPerWeek}h</span></div>
                  <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Lab Hours</span><br /><span style={{ fontWeight: 600 }}>{course.labPeriodsPerWeek}h</span></div>
                </div>
                
                <div style={{ padding: 12, background: C.surface, borderRadius: 8 }}>
                  <p style={{ fontSize: 13 }}>Total Weekly Classes: <strong>{course.totalWeeklyClasses}</strong> per section</p>
                </div>
                
                {course.approvedAt && (
                  <p style={{ fontSize: 11, color: C.text.tertiary, marginTop: 12 }}>
                    Approved on: {new Date(course.approvedAt).toLocaleString()}
                  </p>
                )}
              </Card>
            );
          })
        )}
      </div>
      
      {/* Pending Courses Section */}
      {pendingCourses.length > 0 && (
        <div>
          <h4 style={{ color: C.text.primary, fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Pending Dean Approval</h4>
          {pendingCourses.map(course => {
            const faculty = AppState.faculty.find(f => f.id === course.facultyId);
            return (
              <Card key={course.id} style={{ marginBottom: 16, background: C.accent.goldBg }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div>
                    <p style={{ fontWeight: 600 }}>{course.subjectName}</p>
                    <p style={{ fontSize: 12, color: C.text.tertiary }}>{faculty?.name}</p>
                  </div>
                  <Badge variant="warning">Pending Dean Approval</Badge>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
                  <div><span style={{ fontSize: 11, color: C.text.tertiary }}>Credits</span><br />{course.credits}</div>
                  <div><span style={{ fontSize: 11, color: C.text.tertiary }}>Theory</span><br />{course.theoryClassesPerWeek}h</div>
                  <div><span style={{ fontSize: 11, color: C.text.tertiary }}>Lab</span><br />{course.labPeriodsPerWeek}h</div>
                  <div><span style={{ fontSize: 11, color: C.text.tertiary }}>Total</span><br />{course.totalWeeklyClasses}h</div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}