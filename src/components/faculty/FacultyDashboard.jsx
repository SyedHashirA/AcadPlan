// // import { useState, useEffect } from "react";
// // import { useAuth } from "../auth/AuthContext";
// // import { Sidebar, Card, Title, Badge, Button } from "../common";
// // import { WeeklyTimetableView } from "../shared/WeeklyTimetableView";
// // import { FacultySubjectPreferenceForm } from "./FacultySubjectPreferenceForm";
// // import { FacultyDetailedCourseForm } from "./FacultyDetailedCourseForm";
// // import { FacultySyllabusTracker } from "./FacultySyllabusTracker";
// // import { AppState } from "../../AppState";
// // import { C } from "../../styles/theme";
// // import { saveToStorage, STORAGE_KEYS } from "../../utils/storage";

// // export function FacultyDashboard() {
// //   const { user } = useAuth();
// //   const [active, setActive] = useState("forms");
// //   const [collapsed, setCollapsed] = useState(false);
// //   const [refresh, setRefresh] = useState(0);
  
// //   useEffect(() => {
// //     const handleStorageChange = () => {
// //       setRefresh(r => r + 1);
// //     };
// //     window.addEventListener('storage', handleStorageChange);
// //     return () => window.removeEventListener('storage', handleStorageChange);
// //   }, []);
  
// //   const faculty = AppState.faculty.find(f => f.id === user.id);
// //   const preference = AppState.getPreferenceByFacultyId(user.id);
// //   const courseDetails = AppState.getCourseDetailsByFacultyId(user.id);
// //   const schedule = AppState.getFacultySchedule(user.id);
  
// //   const preferenceApproved = preference?.status === "approved";
// //   const coordinatorApproved = courseDetails.length > 0 && courseDetails.every(c => c.coordinatorStatus === "approved");
// //   const deanApproved = courseDetails.length > 0 && courseDetails.every(c => c.deanStatus === "approved");
  
// //   const forceUpdate = () => {
// //     setRefresh(r => r + 1);
// //     window.dispatchEvent(new Event('storage'));
// //   };
  
// //   const FAC_NAV = [
// //     { id: "forms", icon: "📝", label: "Preference Forms" },
// //     { id: "status", icon: "📊", label: "Submission Status" },
// //     { id: "syllabus", icon: "📚", label: "Syllabus Tracker" },
// //     { id: "schedule", icon: "📅", label: "My Schedule" },
// //     { id: "profile", icon: "👤", label: "Profile" },
// //   ];
  
// //   const panels = {
// //     forms: (
// //       <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
// //         <Title>Faculty Onboarding Forms - {faculty.course}</Title>
        
// //         {!preference?.submitted && (
// //           <FacultySubjectPreferenceForm faculty={faculty} onComplete={forceUpdate} />
// //         )}
        
// //         {preference?.submitted && preference?.status === "pending" && (
// //           <Card>
// //             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
// //               <div style={{
// //                 width: 60,
// //                 height: 60,
// //                 borderRadius: "50%",
// //                 background: C.accent.goldBg,
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 fontSize: 30,
// //               }}>
// //                 ⏳
// //               </div>
// //               <div>
// //                 <h4 style={{ color: C.text.primary, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Subject Preferences Submitted</h4>
// //                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Waiting for coordinator review and conflict resolution.</p>
// //                 {preference.feedback && (
// //                   <p style={{ color: C.accent.gold, fontSize: 13, marginTop: 8 }}>Feedback: {preference.feedback}</p>
// //                 )}
// //               </div>
// //             </div>
// //           </Card>
// //         )}
        
// //         {preference?.status === "rejected" && (
// //           <Card>
// //             <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
// //               <div style={{
// //                 width: 60,
// //                 height: 60,
// //                 borderRadius: "50%",
// //                 background: C.accent.redBg,
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 fontSize: 30,
// //               }}>
// //                 ✗
// //               </div>
// //               <div>
// //                 <h4 style={{ color: C.accent.red, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Subject Preferences Rejected</h4>
// //                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Please revise and resubmit.</p>
// //                 {preference.feedback && (
// //                   <p style={{ color: C.accent.red, fontSize: 13, marginTop: 8 }}>Feedback: {preference.feedback}</p>
// //                 )}
// //               </div>
// //             </div>
// //             <Button onClick={() => { AppState.resetPreferenceForm(faculty.id); forceUpdate(); }} variant="primary" fullWidth>
// //               Resubmit Preferences
// //             </Button>
// //           </Card>
// //         )}
        
// //         {preferenceApproved && preference.allocatedSubjects && courseDetails.length === 0 && (
// //           <FacultyDetailedCourseForm 
// //             faculty={faculty} 
// //             allocatedSubjects={preference.allocatedSubjects} 
// //             onComplete={forceUpdate} 
// //           />
// //         )}
        
// //         {preferenceApproved && courseDetails.length > 0 && !coordinatorApproved && (
// //           <Card>
// //             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
// //               <div style={{
// //                 width: 60,
// //                 height: 60,
// //                 borderRadius: "50%",
// //                 background: C.accent.goldBg,
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 fontSize: 30,
// //               }}>
// //                 ⏳
// //               </div>
// //               <div>
// //                 <h4 style={{ color: C.text.primary, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Detailed Course Information Submitted</h4>
// //                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Waiting for coordinator review.</p>
// //               </div>
// //             </div>
// //           </Card>
// //         )}
        
// //         {coordinatorApproved && !deanApproved && (
// //           <Card>
// //             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
// //               <div style={{
// //                 width: 60,
// //                 height: 60,
// //                 borderRadius: "50%",
// //                 background: C.accent.goldBg,
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 fontSize: 30,
// //               }}>
// //                 ⏳
// //               </div>
// //               <div>
// //                 <h4 style={{ color: C.accent.blue, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Coordinator Approved</h4>
// //                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Waiting for Dean's final approval.</p>
// //               </div>
// //             </div>
// //           </Card>
// //         )}
        
// //         {deanApproved && (
// //           <Card>
// //             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
// //               <div style={{
// //                 width: 60,
// //                 height: 60,
// //                 borderRadius: "50%",
// //                 background: C.accent.greenBg,
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 fontSize: 30,
// //               }}>
// //                 ✓
// //               </div>
// //               <div>
// //                 <h4 style={{ color: C.accent.green, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>All Forms Approved by Dean!</h4>
// //                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Your schedule has been generated. Use the Syllabus Tracker to update module completion.</p>
// //               </div>
// //             </div>
// //           </Card>
// //         )}
// //       </div>
// //     ),
    
// //     status: (
// //       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
// //         <Title>Submission Status - {faculty.course}</Title>
        
// //         <Card>
// //           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
// //             <span style={{ color: C.text.primary, fontWeight: 600 }}>Subject Preferences</span>
// //             <Badge variant={preference?.status === "approved" ? "success" : preference?.status === "pending" ? "warning" : "danger"}>
// //               {preference?.status || "Not Submitted"}
// //             </Badge>
// //           </div>
// //           {preference?.submitted && (
// //             <div>
// //               {preference.preferences.map(p => {
// //                 const subject = AppState.subjects.find(s => s.id === p.subjectId);
// //                 return (
// //                   <div key={p.level} style={{
// //                     padding: "8px 12px",
// //                     background: C.cardHover,
// //                     borderRadius: 8,
// //                     marginBottom: 4,
// //                   }}>
// //                     <span style={{ color: p.level === 1 ? C.accent.gold : p.level === 2 ? C.accent.blue : C.accent.green }}>
// //                       Preference {p.level}:
// //                     </span>
// //                     <span style={{ color: C.text.primary, marginLeft: 8 }}>{subject?.name}</span>
// //                   </div>
// //                 );
// //               })}
// //               {preference.allocatedSubjects && (
// //                 <div style={{ marginTop: 12, padding: "8px 12px", background: C.cardHover, borderRadius: 8 }}>
// //                   <span style={{ color: C.accent.green }}>Allocated: </span>
// //                   <span style={{ color: C.text.primary }}>
// //                     {preference.allocatedSubjects.map(id => {
// //                       const s = AppState.subjects.find(sub => sub.id === id);
// //                       return s?.name;
// //                     }).join(", ")}
// //                   </span>
// //                 </div>
// //               )}
// //             </div>
// //           )}
// //         </Card>
        
// //         <Card>
// //           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
// //             <span style={{ color: C.text.primary, fontWeight: 600 }}>Detailed Course Information</span>
// //             {courseDetails.length > 0 ? (
// //               <div style={{ display: "flex", gap: 8 }}>
// //                 <Badge variant={courseDetails.every(c => c.coordinatorStatus === "approved") ? "success" : "warning"}>
// //                   Coordinator: {courseDetails.every(c => c.coordinatorStatus === "approved") ? "Approved" : "Pending"}
// //                 </Badge>
// //                 <Badge variant={courseDetails.every(c => c.deanStatus === "approved") ? "success" : "warning"}>
// //                   Dean: {courseDetails.every(c => c.deanStatus === "approved") ? "Approved" : "Pending"}
// //                 </Badge>
// //               </div>
// //             ) : (
// //               <Badge variant="danger">Locked</Badge>
// //             )}
// //           </div>
// //           {courseDetails.map(c => (
// //             <div key={c.id} style={{
// //               padding: "12px",
// //               background: C.cardHover,
// //               borderRadius: 8,
// //               marginBottom: 8,
// //             }}>
// //               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
// //                 <span style={{ color: C.accent.blue, fontWeight: 500 }}>{c.subjectName}</span>
// //                 <div style={{ display: "flex", gap: 8 }}>
// //                   <Badge variant={c.coordinatorStatus === "approved" ? "success" : c.coordinatorStatus === "pending" ? "warning" : "danger"}>
// //                     {c.coordinatorStatus}
// //                   </Badge>
// //                   <Badge variant={c.deanStatus === "approved" ? "success" : c.deanStatus === "pending" ? "warning" : "danger"}>
// //                     {c.deanStatus}
// //                   </Badge>
// //                 </div>
// //               </div>
// //               <div style={{ display: "flex", gap: 16, fontSize: 12, color: C.text.tertiary }}>
// //                 <span>{c.credits} Credits</span>
// //                 <span>{c.modules} Modules</span>
// //                 <span>Semester {c.semester}</span>
// //               </div>
// //             </div>
// //           ))}
// //         </Card>
// //       </div>
// //     ),
    
// //     syllabus: <FacultySyllabusTracker faculty={faculty} />,
    
// //     schedule: (
// //       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
// //         <Title>My Weekly Schedule</Title>
// //         {schedule.length === 0 ? (
// //           <Card>
// //             <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>
// //               {deanApproved ? "Schedule being generated..." : "Complete all forms and wait for dean's approval to see your schedule"}
// //             </p>
// //           </Card>
// //         ) : (
// //           <>
// //             <WeeklyTimetableView schedule={schedule} title={`${faculty.name} - ${faculty.course}`} />
// //             <Card>
// //               <Title level={4}>Suggest Timetable Change</Title>
// //               <p>If you notice any conflict or have a suggestion, please raise an issue.</p>
// //               <Button
// //                 onClick={() => {
// //                   const reason = prompt("Describe your suggestion or conflict:");
// //                   if (reason) {
// //                     const newIssue = {
// //                       id: Date.now(),
// //                       type: "timetable_suggestion",
// //                       facultyId: faculty.id,
// //                       facultyName: faculty.name,
// //                       reason,
// //                       status: "pending",
// //                       timestamp: new Date().toISOString(),
// //                     };
// //                     AppState.flaggedIssues.push(newIssue);
// //                     saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
// //                     alert("Issue raised. Director will review.");
// //                   }
// //                 }}
// //                 variant="warning"
// //               >
// //                 Raise Issue
// //               </Button>
// //             </Card>
// //           </>
// //         )}
// //       </div>
// //     ),
    
// //     profile: (
// //       <Card>
// //         <Title level={4}>Faculty Profile</Title>
// //         <div style={{ display: "flex", gap: 32, alignItems: "center", marginTop: 20 }}>
// //           <div style={{
// //             width: 100,
// //             height: 100,
// //             borderRadius: "50%",
// //             background: `${faculty.color}20`,
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             fontSize: 36,
// //             fontWeight: 700,
// //             color: faculty.color,
// //           }}>
// //             {faculty.avatar}
// //           </div>
// //           <div>
// //             <h3 style={{ color: C.text.primary, fontSize: 24, fontWeight: 600, marginBottom: 8 }}>{faculty.name}</h3>
// //             <p style={{ color: C.accent.blue, fontSize: 15, marginBottom: 4 }}>ID: {faculty.facultyId}</p>
// //             <p style={{ color: C.accent.blue, fontSize: 15, marginBottom: 4 }}>{faculty.designation}</p>
// //             <p style={{ color: C.text.secondary, fontSize: 14, marginBottom: 4 }}>Course: {faculty.course}</p>
// //             <p style={{ color: C.text.secondary, fontSize: 14 }}>Specialization: {faculty.specialization}</p>
// //           </div>
// //         </div>
// //       </Card>
// //     ),
// //   };

// //   return (
// //     <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
// //       <Sidebar navItems={FAC_NAV} active={active} setActive={setActive} collapsed={collapsed} setCollapsed={setCollapsed} user={user} badges={{ forms: preference?.status === "pending" ? 1 : 0 }} accentColor={C.accent.blue} />
// //       <main style={{ flex: 1, overflow: "auto" }}>
// //         <header style={{
// //           background: C.nav,
// //           borderBottom: `1px solid ${C.navBorder}`,
// //           padding: "16px 32px",
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "space-between",
// //           position: "sticky",
// //           top: 0,
// //           zIndex: 10,
// //         }}>
// //           <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>{FAC_NAV.find(n => n.id === active)?.label}</h2>
// //           <Badge variant={preference?.status === "approved" ? "success" : preference?.status === "pending" ? "warning" : "danger"}>
// //             {preference?.status === "approved" ? "Approved" : preference?.status === "pending" ? "Pending" : "Not Started"}
// //           </Badge>
// //         </header>
// //         <div style={{ padding: 32 }}>{panels[active]}</div>
// //       </main>
// //     </div>
// //   );
// // }

// // src/components/faculty/FacultyDashboard.jsx
// import { useState, useEffect } from "react";
// import { useAuth } from "../auth/AuthContext";
// import { Sidebar, Card, Title, Badge, Button } from "../common";
// import { WeeklyTimetableView } from "../shared/WeeklyTimetableView";
// import { FacultyPreferenceForm } from "./FacultyPreferenceForm";
// import { FacultyDetailedCourseForm } from "./FacultyDetailedCourseForm";
// import { FacultySyllabusTracker } from "./FacultySyllabusTracker";
// import { AppState } from "../../AppState";
// import { C } from "../../styles/theme";
// import { saveToStorage, STORAGE_KEYS } from "../../utils/storage";

// export function FacultyDashboard() {
//   const { user } = useAuth();
//   const [active, setActive] = useState("forms");
//   const [collapsed, setCollapsed] = useState(false);
//   const [refresh, setRefresh] = useState(0);
  
//   // Listen for storage changes (when director adds new subjects or coordinator updates)
//   useEffect(() => {
//     const handleStorageChange = () => {
//       console.log("Storage changed, refreshing faculty dashboard...");
//       setRefresh(r => r + 1);
//     };
    
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   // Get fresh data on refresh
//   useEffect(() => {
//     // Force reload of data from localStorage
//     const loadFreshData = () => {
//       // Refresh AppState data
//       AppState.faculty = JSON.parse(localStorage.getItem(STORAGE_KEYS.FACULTY) || '[]');
//       AppState.subjects = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBJECTS) || '[]');
//       AppState.subjectPreferences = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBJECT_PREFERENCES) || '[]');
//       AppState.courseDetails = JSON.parse(localStorage.getItem(STORAGE_KEYS.COURSE_DETAILS) || '[]');
//       AppState.semesterDetails = JSON.parse(localStorage.getItem(STORAGE_KEYS.SEMESTER_DETAILS) || '{}');
//     };
    
//     loadFreshData();
//   }, [refresh]);
  
//   const faculty = AppState.faculty.find(f => f.id === user.id);
//   const preference = AppState.getPreferenceByFacultyId(user.id);
//   const courseDetails = AppState.getCourseDetailsByFacultyId(user.id);
//   const schedule = AppState.getFacultySchedule(user.id);
  
//   const preferenceApproved = preference?.status === "approved";
//   const coordinatorApproved = courseDetails.length > 0 && courseDetails.every(c => c.coordinatorStatus === "approved");
//   const deanApproved = courseDetails.length > 0 && courseDetails.every(c => c.deanStatus === "approved");
  
//   const forceUpdate = () => {
//     setRefresh(r => r + 1);
//     window.dispatchEvent(new Event('storage'));
//   };
  
//   const FAC_NAV = [
//     { id: "forms", icon: "📝", label: "Preference Forms" },
//     { id: "status", icon: "📊", label: "Submission Status" },
//     { id: "syllabus", icon: "📚", label: "Syllabus Tracker" },
//     { id: "schedule", icon: "📅", label: "My Schedule" },
//     { id: "profile", icon: "👤", label: "Profile" },
//   ];
  
//   const panels = {
//     forms: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//         <Title>Faculty Onboarding Forms - {faculty?.course}</Title>
        
//         {!preference?.submitted && (
//           <FacultyPreferenceForm faculty={faculty} onComplete={forceUpdate} />
//         )}
        
//         {preference?.submitted && preference?.status === "pending" && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.goldBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ⏳
//               </div>
//               <div>
//                 <h4 style={{ color: C.text.primary, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Subject Preferences Submitted</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Waiting for coordinator review and conflict resolution.</p>
//                 {preference.feedback && (
//                   <p style={{ color: C.accent.gold, fontSize: 13, marginTop: 8 }}>Feedback: {preference.feedback}</p>
//                 )}
//               </div>
//             </div>
//           </Card>
//         )}
        
//         {preference?.status === "rejected" && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.redBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ✗
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.red, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Subject Preferences Rejected</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Please revise and resubmit.</p>
//                 {preference.feedback && (
//                   <p style={{ color: C.accent.red, fontSize: 13, marginTop: 8 }}>Feedback: {preference.feedback}</p>
//                 )}
//               </div>
//             </div>
//             <Button onClick={() => { AppState.resetPreferenceForm(faculty.id); forceUpdate(); }} variant="primary" fullWidth>
//               Resubmit Preferences
//             </Button>
//           </Card>
//         )}
        
//         {preferenceApproved && preference.allocatedSubjects && courseDetails.length === 0 && (
//           <FacultyDetailedCourseForm 
//             faculty={faculty} 
//             allocatedSubjects={preference.allocatedSubjects} 
//             onComplete={forceUpdate} 
//           />
//         )}
        
//         {preferenceApproved && courseDetails.length > 0 && !coordinatorApproved && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.goldBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ⏳
//               </div>
//               <div>
//                 <h4 style={{ color: C.text.primary, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Detailed Course Information Submitted</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Waiting for coordinator review.</p>
//               </div>
//             </div>
//           </Card>
//         )}
        
//         {coordinatorApproved && !deanApproved && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.goldBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ⏳
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.blue, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Coordinator Approved</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Waiting for Dean's final approval.</p>
//               </div>
//             </div>
//           </Card>
//         )}
        
//         {deanApproved && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.greenBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ✓
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.green, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>All Forms Approved by Dean!</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Your schedule has been generated. Use the Syllabus Tracker to update module completion.</p>
//               </div>
//             </div>
//           </Card>
//         )}
//       </div>
//     ),
    
//     status: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//         <Title>Submission Status - {faculty?.course}</Title>
        
//         <Card>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//             <span style={{ color: C.text.primary, fontWeight: 600 }}>Subject Preferences</span>
//             <Badge variant={preference?.status === "approved" ? "success" : preference?.status === "pending" ? "warning" : "danger"}>
//               {preference?.status || "Not Submitted"}
//             </Badge>
//           </div>
//           {preference?.submitted && (
//             <div>
//               {preference.preferences.map(p => {
//                 const subject = AppState.subjects.find(s => s.id === p.subjectId);
//                 return (
//                   <div key={p.level} style={{
//                     padding: "8px 12px",
//                     background: C.cardHover,
//                     borderRadius: 8,
//                     marginBottom: 4,
//                   }}>
//                     <span style={{ color: p.level === 1 ? C.accent.gold : p.level === 2 ? C.accent.blue : C.accent.green }}>
//                       Preference {p.level}:
//                     </span>
//                     <span style={{ color: C.text.primary, marginLeft: 8 }}>{subject?.name}</span>
//                   </div>
//                 );
//               })}
//               {preference.allocatedSubjects && (
//                 <div style={{ marginTop: 12, padding: "8px 12px", background: C.cardHover, borderRadius: 8 }}>
//                   <span style={{ color: C.accent.green }}>Allocated: </span>
//                   <span style={{ color: C.text.primary }}>
//                     {preference.allocatedSubjects.map(id => {
//                       const s = AppState.subjects.find(sub => sub.id === id);
//                       return s?.name;
//                     }).join(", ")}
//                   </span>
//                 </div>
//               )}
//             </div>
//           )}
//         </Card>
        
//         <Card>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//             <span style={{ color: C.text.primary, fontWeight: 600 }}>Detailed Course Information</span>
//             {courseDetails.length > 0 ? (
//               <div style={{ display: "flex", gap: 8 }}>
//                 <Badge variant={courseDetails.every(c => c.coordinatorStatus === "approved") ? "success" : "warning"}>
//                   Coordinator: {courseDetails.every(c => c.coordinatorStatus === "approved") ? "Approved" : "Pending"}
//                 </Badge>
//                 <Badge variant={courseDetails.every(c => c.deanStatus === "approved") ? "success" : "warning"}>
//                   Dean: {courseDetails.every(c => c.deanStatus === "approved") ? "Approved" : "Pending"}
//                 </Badge>
//               </div>
//             ) : (
//               <Badge variant="danger">Locked</Badge>
//             )}
//           </div>
//           {courseDetails.map(c => (
//             <div key={c.id} style={{
//               padding: "12px",
//               background: C.cardHover,
//               borderRadius: 8,
//               marginBottom: 8,
//             }}>
//               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
//                 <span style={{ color: C.accent.blue, fontWeight: 500 }}>{c.subjectName}</span>
//                 <div style={{ display: "flex", gap: 8 }}>
//                   <Badge variant={c.coordinatorStatus === "approved" ? "success" : c.coordinatorStatus === "pending" ? "warning" : "danger"}>
//                     {c.coordinatorStatus}
//                   </Badge>
//                   <Badge variant={c.deanStatus === "approved" ? "success" : c.deanStatus === "pending" ? "warning" : "danger"}>
//                     {c.deanStatus}
//                   </Badge>
//                 </div>
//               </div>
//               <div style={{ display: "flex", gap: 16, fontSize: 12, color: C.text.tertiary }}>
//                 <span>{c.credits} Credits</span>
//                 <span>{c.modules} Modules</span>
//                 <span>Semester {c.semester}</span>
//               </div>
//             </div>
//           ))}
//         </Card>
//       </div>
//     ),
    
//     syllabus: <FacultySyllabusTracker faculty={faculty} />,
    
//     schedule: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//         <Title>My Weekly Schedule</Title>
//         {schedule.length === 0 ? (
//           <Card>
//             <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>
//               {deanApproved ? "Schedule being generated..." : "Complete all forms and wait for dean's approval to see your schedule"}
//             </p>
//           </Card>
//         ) : (
//           <>
//             <WeeklyTimetableView schedule={schedule} title={`${faculty?.name} - ${faculty?.course}`} />
//             <Card>
//               <Title level={4}>Suggest Timetable Change</Title>
//               <p>If you notice any conflict or have a suggestion, please raise an issue.</p>
//               <Button
//                 onClick={() => {
//                   const reason = prompt("Describe your suggestion or conflict:");
//                   if (reason) {
//                     const newIssue = {
//                       id: Date.now(),
//                       type: "timetable_suggestion",
//                       facultyId: faculty.id,
//                       facultyName: faculty.name,
//                       reason,
//                       status: "pending",
//                       timestamp: new Date().toISOString(),
//                     };
//                     AppState.flaggedIssues.push(newIssue);
//                     saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
//                     alert("Issue raised. Director will review.");
//                   }
//                 }}
//                 variant="warning"
//               >
//                 Raise Issue
//               </Button>
//             </Card>
//           </>
//         )}
//       </div>
//     ),
    
//     profile: (
//       <Card>
//         <Title level={4}>Faculty Profile</Title>
//         <div style={{ display: "flex", gap: 32, alignItems: "center", marginTop: 20, flexWrap: "wrap" }}>
//           <div style={{
//             width: 100,
//             height: 100,
//             borderRadius: "50%",
//             background: `${faculty?.color}20`,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: 36,
//             fontWeight: 700,
//             color: faculty?.color,
//           }}>
//             {faculty?.avatar}
//           </div>
//           <div>
//             <h3 style={{ color: C.text.primary, fontSize: 24, fontWeight: 600, marginBottom: 8 }}>{faculty?.name}</h3>
//             <p style={{ color: C.accent.blue, fontSize: 15, marginBottom: 4 }}>ID: {faculty?.facultyId}</p>
//             <p style={{ color: C.accent.blue, fontSize: 15, marginBottom: 4 }}>{faculty?.designation}</p>
//             <p style={{ color: C.text.secondary, fontSize: 14, marginBottom: 4 }}>Course: {faculty?.course}</p>
//             <p style={{ color: C.text.secondary, fontSize: 14 }}>Specialization: {faculty?.specialization}</p>
//           </div>
//         </div>
        
//         <div style={{ marginTop: 24, padding: 16, background: C.cardHover, borderRadius: 12 }}>
//           <h5 style={{ color: C.text.primary, fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Workload Information</h5>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
//             <div>
//               <span style={{ color: C.text.tertiary, fontSize: 12 }}>Max Hours/Week</span>
//               <p style={{ color: C.accent.blue, fontSize: 20, fontWeight: 600 }}>{faculty?.maxHours}h</p>
//             </div>
//             <div>
//               <span style={{ color: C.text.tertiary, fontSize: 12 }}>Assigned Hours</span>
//               <p style={{ color: C.accent.gold, fontSize: 20, fontWeight: 600 }}>{faculty?.assignedHours || 0}h</p>
//             </div>
//             <div>
//               <span style={{ color: C.text.tertiary, fontSize: 12 }}>Remaining Hours</span>
//               <p style={{ color: C.accent.green, fontSize: 20, fontWeight: 600 }}>{faculty?.remainingHours || faculty?.maxHours}h</p>
//             </div>
//           </div>
//         </div>
//       </Card>
//     ),
//   };

//   if (!faculty) {
//     return (
//       <div style={{ display: "flex", minHeight: "100vh", background: C.bg, alignItems: "center", justifyContent: "center" }}>
//         <Card>
//           <p style={{ color: C.text.tertiary, textAlign: "center" }}>Loading faculty data...</p>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
//       <Sidebar 
//         navItems={FAC_NAV} 
//         active={active} 
//         setActive={setActive} 
//         collapsed={collapsed} 
//         setCollapsed={setCollapsed} 
//         user={user} 
//         badges={{ forms: preference?.status === "pending" ? 1 : 0 }} 
//         accentColor={C.accent.blue} 
//       />
//       <main style={{ flex: 1, overflow: "auto" }}>
//         <header style={{
//           background: C.nav,
//           borderBottom: `1px solid ${C.navBorder}`,
//           padding: "16px 32px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           position: "sticky",
//           top: 0,
//           zIndex: 10,
//           flexWrap: "wrap",
//           gap: 12,
//         }}>
//           <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>{FAC_NAV.find(n => n.id === active)?.label}</h2>
//           <Badge variant={preference?.status === "approved" ? "success" : preference?.status === "pending" ? "warning" : "danger"}>
//             {preference?.status === "approved" ? "Approved" : preference?.status === "pending" ? "Pending Review" : "Not Started"}
//           </Badge>
//         </header>
//         <div style={{ padding: 32 }}>{panels[active]}</div>
//       </main>
//     </div>
//   );
// }

// // src/components/faculty/FacultyDashboard.jsx
// import { useState, useEffect } from "react";
// import { useAuth } from "../auth/AuthContext";
// import { Sidebar, Card, Title, Badge, Button } from "../common";
// import { WeeklyTimetableView } from "../shared/WeeklyTimetableView";
// import { FacultyPreferenceForm } from "./FacultyPreferenceForm";
// import { FacultyDetailedCourseForm } from "./FacultyDetailedCourseForm";
// import { FacultySyllabusTracker } from "./FacultySyllabusTracker";
// import { AppState } from "../../AppState";
// import { C } from "../../styles/theme";
// import { saveToStorage, STORAGE_KEYS, loadFromStorage } from "../../utils/storage";

// export function FacultyDashboard() {
//   const { user } = useAuth();
//   const [active, setActive] = useState("forms");
//   const [collapsed, setCollapsed] = useState(false);
//   const [refresh, setRefresh] = useState(0);
//   const [formStatus, setFormStatus] = useState({
//     isFloated: false,
//     floatedDate: null,
//     floatedBy: null,
//     semester: "2025",
//     deadline: null
//   });
  
//   // Listen for storage changes
//   useEffect(() => {
//     const handleStorageChange = () => {
//       loadFormStatus();
//       setRefresh(r => r + 1);
//     };
    
//     loadFormStatus();
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const loadFormStatus = () => {
//     const savedStatus = loadFromStorage(STORAGE_KEYS.FORM_STATUS, {
//       isFloated: false,
//       floatedDate: null,
//       floatedBy: null,
//       semester: "2025",
//       deadline: null
//     });
//     setFormStatus(savedStatus);
//   };
  
//   // Get fresh data on refresh
//   useEffect(() => {
//     const loadFreshData = () => {
//       AppState.faculty = JSON.parse(localStorage.getItem(STORAGE_KEYS.FACULTY) || '[]');
//       AppState.subjects = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBJECTS) || '[]');
//       AppState.subjectPreferences = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBJECT_PREFERENCES) || '[]');
//       AppState.courseDetails = JSON.parse(localStorage.getItem(STORAGE_KEYS.COURSE_DETAILS) || '[]');
//       AppState.semesterDetails = JSON.parse(localStorage.getItem(STORAGE_KEYS.SEMESTER_DETAILS) || '{}');
//     };
    
//     loadFreshData();
//   }, [refresh]);
  
//   const faculty = AppState.faculty.find(f => f.id === user.id);
//   const preference = AppState.getPreferenceByFacultyId(user.id);
//   const courseDetails = AppState.getCourseDetailsByFacultyId(user.id);
//   const schedule = AppState.getFacultySchedule(user.id);
  
//   const preferenceApproved = preference?.status === "approved";
//   const coordinatorApproved = courseDetails.length > 0 && courseDetails.every(c => c.coordinatorStatus === "approved");
//   const deanApproved = courseDetails.length > 0 && courseDetails.every(c => c.deanStatus === "approved");
  
//   // Check if form is floated and deadline hasn't passed
//   const isFormOpen = formStatus.isFloated && (!formStatus.deadline || new Date() <= new Date(formStatus.deadline));
//   const isDeadlinePassed = formStatus.deadline && new Date() > new Date(formStatus.deadline);
  
//   const forceUpdate = () => {
//     setRefresh(r => r + 1);
//     window.dispatchEvent(new Event('storage'));
//   };
  
//   const FAC_NAV = [
//     { id: "forms", icon: "📝", label: "Preference Forms" },
//     { id: "status", icon: "📊", label: "Submission Status" },
//     { id: "syllabus", icon: "📚", label: "Syllabus Tracker" },
//     { id: "schedule", icon: "📅", label: "My Schedule" },
//     { id: "profile", icon: "👤", label: "Profile" },
//   ];
  
//   const panels = {
//     forms: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//         <Title>Faculty Onboarding Forms - {faculty?.course}</Title>
        
//         {/* Form Status Message */}
//         {!formStatus.isFloated && (
//           <Card style={{ background: C.accent.goldBg, textAlign: "center" }}>
//             <div style={{ padding: "20px" }}>
//               <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
//               <h3 style={{ color: C.accent.gold, marginBottom: 8 }}>Preference Form Not Yet Available</h3>
//               <p style={{ color: C.text.secondary }}>
//                 The preference form has not been floated by the Director yet. 
//                 Please check back later when the form is released.
//               </p>
//             </div>
//           </Card>
//         )}
        
//         {formStatus.isFloated && isDeadlinePassed && (
//           <Card style={{ background: C.accent.redBg, textAlign: "center" }}>
//             <div style={{ padding: "20px" }}>
//               <div style={{ fontSize: 48, marginBottom: 16 }}>⏰</div>
//               <h3 style={{ color: C.accent.red, marginBottom: 8 }}>Submission Deadline Passed</h3>
//               <p style={{ color: C.text.secondary }}>
//                 The submission deadline ({new Date(formStatus.deadline).toLocaleString()}) has passed.
//                 You cannot submit preferences at this time.
//               </p>
//             </div>
//           </Card>
//         )}
        
//         {formStatus.isFloated && !isDeadlinePassed && !preference?.submitted && (
//           <>
//             <div style={{ padding: 12, background: C.accent.greenBg, borderRadius: 8, marginBottom: 8 }}>
//               <p style={{ color: C.accent.green, margin: 0, textAlign: "center" }}>
//                 ✓ Preference form is OPEN! Please submit your preferences before {new Date(formStatus.deadline).toLocaleString()}
//               </p>
//             </div>
//             <FacultyPreferenceForm faculty={faculty} onComplete={forceUpdate} />
//           </>
//         )}
        
//         {preference?.submitted && preference?.status === "pending" && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.goldBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ⏳
//               </div>
//               <div>
//                 <h4 style={{ color: C.text.primary, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Subject Preferences Submitted</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Waiting for coordinator review and conflict resolution.</p>
//                 {preference.feedback && (
//                   <p style={{ color: C.accent.gold, fontSize: 13, marginTop: 8 }}>Feedback: {preference.feedback}</p>
//                 )}
//               </div>
//             </div>
//           </Card>
//         )}
        
//         {preference?.status === "rejected" && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.redBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ✗
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.red, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Subject Preferences Rejected</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Please revise and resubmit.</p>
//                 {preference.feedback && (
//                   <p style={{ color: C.accent.red, fontSize: 13, marginTop: 8 }}>Feedback: {preference.feedback}</p>
//                 )}
//               </div>
//             </div>
//             {isFormOpen ? (
//               <Button onClick={() => { AppState.resetPreferenceForm(faculty.id); forceUpdate(); }} variant="primary" fullWidth>
//                 Resubmit Preferences
//               </Button>
//             ) : (
//               <p style={{ color: C.accent.red, textAlign: "center" }}>
//                 The preference form is currently closed. Cannot resubmit at this time.
//               </p>
//             )}
//           </Card>
//         )}
        
//         {preferenceApproved && preference.allocatedSubjects && courseDetails.length === 0 && (
//           <FacultyDetailedCourseForm 
//             faculty={faculty} 
//             allocatedSubjects={preference.allocatedSubjects} 
//             onComplete={forceUpdate} 
//           />
//         )}
        
//         {preferenceApproved && courseDetails.length > 0 && !coordinatorApproved && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.goldBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ⏳
//               </div>
//               <div>
//                 <h4 style={{ color: C.text.primary, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Detailed Course Information Submitted</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Waiting for coordinator review.</p>
//               </div>
//             </div>
//           </Card>
//         )}
        
//         {coordinatorApproved && !deanApproved && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.goldBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ⏳
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.blue, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Coordinator Approved</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Waiting for Dean's final approval.</p>
//               </div>
//             </div>
//           </Card>
//         )}
        
//         {deanApproved && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.greenBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ✓
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.green, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>All Forms Approved by Dean!</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Your schedule has been generated. Use the Syllabus Tracker to update module completion.</p>
//               </div>
//             </div>
//           </Card>
//         )}
//       </div>
//     ),
    
//     status: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//         <Title>Submission Status - {faculty?.course}</Title>
        
//         <Card>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//             <span style={{ color: C.text.primary, fontWeight: 600 }}>Form Status</span>
//             <Badge variant={formStatus.isFloated ? "success" : "warning"}>
//               {formStatus.isFloated ? "Open" : "Not Yet Released"}
//             </Badge>
//           </div>
//           {formStatus.isFloated && formStatus.deadline && (
//             <p style={{ color: C.text.secondary, fontSize: 13, marginBottom: 16 }}>
//               Deadline: {new Date(formStatus.deadline).toLocaleString()}
//             </p>
//           )}
//         </Card>
        
//         <Card>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//             <span style={{ color: C.text.primary, fontWeight: 600 }}>Subject Preferences</span>
//             <Badge variant={preference?.status === "approved" ? "success" : preference?.status === "pending" ? "warning" : "danger"}>
//               {preference?.status || "Not Submitted"}
//             </Badge>
//           </div>
//           {preference?.submitted && (
//             <div>
//               {preference.preferences.map(p => {
//                 const subject = AppState.subjects.find(s => s.id === p.subjectId);
//                 return (
//                   <div key={p.level} style={{
//                     padding: "8px 12px",
//                     background: C.cardHover,
//                     borderRadius: 8,
//                     marginBottom: 4,
//                   }}>
//                     <span style={{ color: p.level === 1 ? C.accent.gold : p.level === 2 ? C.accent.blue : C.accent.green }}>
//                       Preference {p.level}:
//                     </span>
//                     <span style={{ color: C.text.primary, marginLeft: 8 }}>{subject?.name}</span>
//                   </div>
//                 );
//               })}
//               {preference.allocatedSubjects && (
//                 <div style={{ marginTop: 12, padding: "8px 12px", background: C.cardHover, borderRadius: 8 }}>
//                   <span style={{ color: C.accent.green }}>Allocated: </span>
//                   <span style={{ color: C.text.primary }}>
//                     {preference.allocatedSubjects.map(id => {
//                       const s = AppState.subjects.find(sub => sub.id === id);
//                       return s?.name;
//                     }).join(", ")}
//                   </span>
//                 </div>
//               )}
//             </div>
//           )}
//         </Card>
        
//         <Card>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//             <span style={{ color: C.text.primary, fontWeight: 600 }}>Detailed Course Information</span>
//             {courseDetails.length > 0 ? (
//               <div style={{ display: "flex", gap: 8 }}>
//                 <Badge variant={courseDetails.every(c => c.coordinatorStatus === "approved") ? "success" : "warning"}>
//                   Coordinator: {courseDetails.every(c => c.coordinatorStatus === "approved") ? "Approved" : "Pending"}
//                 </Badge>
//                 <Badge variant={courseDetails.every(c => c.deanStatus === "approved") ? "success" : "warning"}>
//                   Dean: {courseDetails.every(c => c.deanStatus === "approved") ? "Approved" : "Pending"}
//                 </Badge>
//               </div>
//             ) : (
//               <Badge variant="danger">Locked</Badge>
//             )}
//           </div>
//           {courseDetails.map(c => (
//             <div key={c.id} style={{
//               padding: "12px",
//               background: C.cardHover,
//               borderRadius: 8,
//               marginBottom: 8,
//             }}>
//               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
//                 <span style={{ color: C.accent.blue, fontWeight: 500 }}>{c.subjectName}</span>
//                 <div style={{ display: "flex", gap: 8 }}>
//                   <Badge variant={c.coordinatorStatus === "approved" ? "success" : c.coordinatorStatus === "pending" ? "warning" : "danger"}>
//                     {c.coordinatorStatus}
//                   </Badge>
//                   <Badge variant={c.deanStatus === "approved" ? "success" : c.deanStatus === "pending" ? "warning" : "danger"}>
//                     {c.deanStatus}
//                   </Badge>
//                 </div>
//               </div>
//               <div style={{ display: "flex", gap: 16, fontSize: 12, color: C.text.tertiary }}>
//                 <span>{c.credits} Credits</span>
//                 <span>{c.modules} Modules</span>
//                 <span>Semester {c.semester}</span>
//               </div>
//             </div>
//           ))}
//         </Card>
//       </div>
//     ),
    
//     syllabus: <FacultySyllabusTracker faculty={faculty} />,
    
//     schedule: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//         <Title>My Weekly Schedule</Title>
//         {schedule.length === 0 ? (
//           <Card>
//             <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>
//               {deanApproved ? "Schedule being generated..." : "Complete all forms and wait for dean's approval to see your schedule"}
//             </p>
//           </Card>
//         ) : (
//           <>
//             <WeeklyTimetableView schedule={schedule} title={`${faculty?.name} - ${faculty?.course}`} />
//             <Card>
//               <Title level={4}>Suggest Timetable Change</Title>
//               <p>If you notice any conflict or have a suggestion, please raise an issue.</p>
//               <Button
//                 onClick={() => {
//                   const reason = prompt("Describe your suggestion or conflict:");
//                   if (reason) {
//                     const newIssue = {
//                       id: Date.now(),
//                       type: "timetable_suggestion",
//                       facultyId: faculty.id,
//                       facultyName: faculty.name,
//                       reason,
//                       status: "pending",
//                       timestamp: new Date().toISOString(),
//                     };
//                     AppState.flaggedIssues.push(newIssue);
//                     saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
//                     alert("Issue raised. Director will review.");
//                   }
//                 }}
//                 variant="warning"
//               >
//                 Raise Issue
//               </Button>
//             </Card>
//           </>
//         )}
//       </div>
//     ),
    
//     profile: (
//       <Card>
//         <Title level={4}>Faculty Profile</Title>
//         <div style={{ display: "flex", gap: 32, alignItems: "center", marginTop: 20, flexWrap: "wrap" }}>
//           <div style={{
//             width: 100,
//             height: 100,
//             borderRadius: "50%",
//             background: `${faculty?.color}20`,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: 36,
//             fontWeight: 700,
//             color: faculty?.color,
//           }}>
//             {faculty?.avatar}
//           </div>
//           <div>
//             <h3 style={{ color: C.text.primary, fontSize: 24, fontWeight: 600, marginBottom: 8 }}>{faculty?.name}</h3>
//             <p style={{ color: C.accent.blue, fontSize: 15, marginBottom: 4 }}>ID: {faculty?.facultyId}</p>
//             <p style={{ color: C.accent.blue, fontSize: 15, marginBottom: 4 }}>{faculty?.designation}</p>
//             <p style={{ color: C.text.secondary, fontSize: 14, marginBottom: 4 }}>Course: {faculty?.course}</p>
//             <p style={{ color: C.text.secondary, fontSize: 14 }}>Specialization: {faculty?.specialization}</p>
//           </div>
//         </div>
        
//         <div style={{ marginTop: 24, padding: 16, background: C.cardHover, borderRadius: 12 }}>
//           <h5 style={{ color: C.text.primary, fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Workload Information</h5>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
//             <div>
//               <span style={{ color: C.text.tertiary, fontSize: 12 }}>Max Hours/Week</span>
//               <p style={{ color: C.accent.blue, fontSize: 20, fontWeight: 600 }}>{faculty?.maxHours}h</p>
//             </div>
//             <div>
//               <span style={{ color: C.text.tertiary, fontSize: 12 }}>Assigned Hours</span>
//               <p style={{ color: C.accent.gold, fontSize: 20, fontWeight: 600 }}>{faculty?.assignedHours || 0}h</p>
//             </div>
//             <div>
//               <span style={{ color: C.text.tertiary, fontSize: 12 }}>Remaining Hours</span>
//               <p style={{ color: C.accent.green, fontSize: 20, fontWeight: 600 }}>{faculty?.remainingHours || faculty?.maxHours}h</p>
//             </div>
//           </div>
//         </div>
//       </Card>
//     ),
//   };

//   if (!faculty) {
//     return (
//       <div style={{ display: "flex", minHeight: "100vh", background: C.bg, alignItems: "center", justifyContent: "center" }}>
//         <Card>
//           <p style={{ color: C.text.tertiary, textAlign: "center" }}>Loading faculty data...</p>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
//       <Sidebar 
//         navItems={FAC_NAV} 
//         active={active} 
//         setActive={setActive} 
//         collapsed={collapsed} 
//         setCollapsed={setCollapsed} 
//         user={user} 
//         badges={{ forms: preference?.status === "pending" ? 1 : 0 }} 
//         accentColor={C.accent.blue} 
//       />
//       <main style={{ flex: 1, overflow: "auto" }}>
//         <header style={{
//           background: C.nav,
//           borderBottom: `1px solid ${C.navBorder}`,
//           padding: "16px 32px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           position: "sticky",
//           top: 0,
//           zIndex: 10,
//           flexWrap: "wrap",
//           gap: 12,
//         }}>
//           <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>{FAC_NAV.find(n => n.id === active)?.label}</h2>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             {formStatus.isFloated && !preference?.submitted && (
//               <Badge variant="success">Form Open</Badge>
//             )}
//             {!formStatus.isFloated && (
//               <Badge variant="warning">Form Closed</Badge>
//             )}
//             <Badge variant={preference?.status === "approved" ? "success" : preference?.status === "pending" ? "warning" : "danger"}>
//               {preference?.status === "approved" ? "Approved" : preference?.status === "pending" ? "Pending Review" : "Not Started"}
//             </Badge>
//           </div>
//         </header>
//         <div style={{ padding: 32 }}>{panels[active]}</div>
//       </main>
//     </div>
//   );
// }

// // src/components/faculty/FacultyDashboard.jsx
// import { useState, useEffect } from "react";
// import { useAuth } from "../auth/AuthContext";
// import { Sidebar, Card, Title, Badge, Button } from "../common";
// import { WeeklyTimetableView } from "../shared/WeeklyTimetableView";
// import { FacultyPreferenceForm } from "./FacultyPreferenceForm";
// import { FacultyDetailedCourseForm } from "./FacultyDetailedCourseForm";
// import { FacultySyllabusTracker } from "./FacultySyllabusTracker";
// import { AppState } from "../../AppState";
// import { C } from "../../styles/theme";
// import { saveToStorage, STORAGE_KEYS, loadFromStorage } from "../../utils/storage";

// export function FacultyDashboard() {
//   const { user } = useAuth();
//   const [active, setActive] = useState("forms");
//   const [collapsed, setCollapsed] = useState(false);
//   const [refresh, setRefresh] = useState(0);
//   const [formStatus, setFormStatus] = useState({
//     isFloated: false,
//     floatedDate: null,
//     floatedBy: null,
//     semester: "2025",
//     deadline: null
//   });
  
//   // Listen for storage changes
//   useEffect(() => {
//     const handleStorageChange = () => {
//       loadFormStatus();
//       setRefresh(r => r + 1);
//     };
    
//     loadFormStatus();
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const loadFormStatus = () => {
//     const savedStatus = loadFromStorage(STORAGE_KEYS.FORM_STATUS, {
//       isFloated: false,
//       floatedDate: null,
//       floatedBy: null,
//       semester: "2025",
//       deadline: null
//     });
//     setFormStatus(savedStatus);
//   };
  
//   // Get fresh data on refresh
//   useEffect(() => {
//     const loadFreshData = () => {
//       AppState.faculty = JSON.parse(localStorage.getItem(STORAGE_KEYS.FACULTY) || '[]');
//       AppState.subjects = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBJECTS) || '[]');
//       AppState.subjectPreferences = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBJECT_PREFERENCES) || '[]');
//       AppState.courseDetails = JSON.parse(localStorage.getItem(STORAGE_KEYS.COURSE_DETAILS) || '[]');
//       AppState.semesterDetails = JSON.parse(localStorage.getItem(STORAGE_KEYS.SEMESTER_DETAILS) || '{}');
//     };
    
//     loadFreshData();
//   }, [refresh]);
  
//   const faculty = AppState.faculty.find(f => f.id === user.id);
//   const preference = AppState.getPreferenceByFacultyId(user.id);
//   const courseDetails = AppState.getCourseDetailsByFacultyId(user.id);
//   const schedule = AppState.getFacultySchedule(user.id);
  
//   // Updated status checks for the new workflow
//   const preferenceAllocated = preference?.status === "allocated"; // Coordinator allocated, waiting for Dean
//   const preferenceApproved = preference?.status === "approved"; // Dean approved preferences
//   const preferenceRejected = preference?.status === "rejected";
//   const preferencePending = preference?.status === "pending";
  
//   // Course details status
//   const courseDetailsPending = courseDetails.length > 0 && courseDetails.every(c => c.coordinatorStatus === "pending");
//   const courseDetailsReviewed = courseDetails.length > 0 && courseDetails.every(c => c.coordinatorStatus === "reviewed");
//   const courseDetailsApproved = courseDetails.length > 0 && courseDetails.every(c => c.deanStatus === "approved");
//   const courseDetailsChangesRequested = courseDetails.some(c => c.coordinatorStatus === "changes_requested");
  
//   // Check if form is floated and deadline hasn't passed
//   const isFormOpen = formStatus.isFloated && (!formStatus.deadline || new Date() <= new Date(formStatus.deadline));
//   const isDeadlinePassed = formStatus.deadline && new Date() > new Date(formStatus.deadline);
  
//   const forceUpdate = () => {
//     setRefresh(r => r + 1);
//     window.dispatchEvent(new Event('storage'));
//   };
  
//   const FAC_NAV = [
//     { id: "forms", icon: "📝", label: "Preference Forms" },
//     { id: "status", icon: "📊", label: "Submission Status" },
//     { id: "syllabus", icon: "📚", label: "Syllabus Tracker" },
//     { id: "schedule", icon: "📅", label: "My Schedule" },
//     { id: "profile", icon: "👤", label: "Profile" },
//   ];
  
//   const panels = {
//     forms: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//         <Title>Faculty Onboarding Forms - {faculty?.course}</Title>
        
//         {/* Form Status Message */}
//         {!formStatus.isFloated && (
//           <Card style={{ background: C.accent.goldBg, textAlign: "center" }}>
//             <div style={{ padding: "20px" }}>
//               <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
//               <h3 style={{ color: C.accent.gold, marginBottom: 8 }}>Preference Form Not Yet Available</h3>
//               <p style={{ color: C.text.secondary }}>
//                 The preference form has not been floated by the Director yet. 
//                 Please check back later when the form is released.
//               </p>
//             </div>
//           </Card>
//         )}
        
//         {formStatus.isFloated && isDeadlinePassed && (
//           <Card style={{ background: C.accent.redBg, textAlign: "center" }}>
//             <div style={{ padding: "20px" }}>
//               <div style={{ fontSize: 48, marginBottom: 16 }}>⏰</div>
//               <h3 style={{ color: C.accent.red, marginBottom: 8 }}>Submission Deadline Passed</h3>
//               <p style={{ color: C.text.secondary }}>
//                 The submission deadline ({new Date(formStatus.deadline).toLocaleString()}) has passed.
//                 You cannot submit preferences at this time.
//               </p>
//             </div>
//           </Card>
//         )}
        
//         {/* Show preference form if open and not submitted */}
//         {formStatus.isFloated && !isDeadlinePassed && !preference?.submitted && (
//           <>
//             <div style={{ padding: 12, background: C.accent.greenBg, borderRadius: 8, marginBottom: 8 }}>
//               <p style={{ color: C.accent.green, margin: 0, textAlign: "center" }}>
//                 ✓ Preference form is OPEN! Please submit your preferences before {new Date(formStatus.deadline).toLocaleString()}
//               </p>
//             </div>
//             <FacultyPreferenceForm faculty={faculty} onComplete={forceUpdate} />
//           </>
//         )}
        
//         {/* Waiting for Coordinator Allocation */}
//         {preference?.submitted && preferencePending && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.goldBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ⏳
//               </div>
//               <div>
//                 <h4 style={{ color: C.text.primary, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Subject Preferences Submitted</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Waiting for coordinator to allocate subjects.</p>
//                 {preference.feedback && (
//                   <p style={{ color: C.accent.gold, fontSize: 13, marginTop: 8 }}>Feedback: {preference.feedback}</p>
//                 )}
//               </div>
//             </div>
//           </Card>
//         )}
        
//         {/* Waiting for Dean Approval after Coordinator Allocation */}
//         {preferenceAllocated && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.blueBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 📋
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.blue, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Subjects Allocated by Coordinator</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Waiting for Dean's final approval of your preferences.</p>
//                 {preference.allocatedSubjects && (
//                   <div style={{ marginTop: 8 }}>
//                     <p style={{ fontSize: 12, color: C.text.tertiary }}>Allocated Subjects:</p>
//                     <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
//                       {preference.allocatedSubjects.map(subjectId => {
//                         const subject = AppState.subjects.find(s => s.id === subjectId);
//                         return subject ? (
//                           <Badge key={subjectId} variant="primary">{subject.name}</Badge>
//                         ) : null;
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </Card>
//         )}
        
//         {/* Preferences Rejected by Coordinator */}
//         {preferenceRejected && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.redBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ✗
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.red, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Subject Preferences Rejected</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Please revise and resubmit.</p>
//                 {preference.feedback && (
//                   <p style={{ color: C.accent.red, fontSize: 13, marginTop: 8 }}>Feedback: {preference.feedback}</p>
//                 )}
//               </div>
//             </div>
//             {isFormOpen ? (
//               <Button onClick={() => { AppState.resetPreferenceForm(faculty.id); forceUpdate(); }} variant="primary" fullWidth>
//                 Resubmit Preferences
//               </Button>
//             ) : (
//               <p style={{ color: C.accent.red, textAlign: "center" }}>
//                 The preference form is currently closed. Cannot resubmit at this time.
//               </p>
//             )}
//           </Card>
//         )}
        
//         {/* Preferences Approved by Dean - Show Detailed Course Form */}
//         {preferenceApproved && preference.allocatedSubjects && courseDetails.length === 0 && (
//           <FacultyDetailedCourseForm 
//             faculty={faculty} 
//             allocatedSubjects={preference.allocatedSubjects} 
//             onComplete={forceUpdate} 
//           />
//         )}
        
//         {/* Course Details Submitted - Waiting for Coordinator Review */}
//         {preferenceApproved && courseDetails.length > 0 && courseDetailsPending && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.goldBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ⏳
//               </div>
//               <div>
//                 <h4 style={{ color: C.text.primary, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Detailed Course Information Submitted</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Waiting for coordinator review.</p>
//               </div>
//             </div>
//           </Card>
//         )}
        
//         {/* Course Details Changes Requested */}
//         {courseDetailsChangesRequested && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.redBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ✗
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.red, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Changes Requested by Coordinator</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Please review the feedback and resubmit.</p>
//                 {courseDetails[0]?.coordinatorFeedback && (
//                   <p style={{ color: C.accent.red, fontSize: 13, marginTop: 8 }}>Feedback: {courseDetails[0].coordinatorFeedback}</p>
//                 )}
//               </div>
//             </div>
//             <Button onClick={() => {
//               // Reset course details to allow resubmission
//               AppState.courseDetails = AppState.courseDetails.filter(c => c.facultyId !== faculty.id);
//               saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
//               forceUpdate();
//             }} variant="primary" fullWidth>
//               Resubmit Course Details
//             </Button>
//           </Card>
//         )}
        
//         {/* Course Details Reviewed - Waiting for Dean Approval */}
//         {courseDetailsReviewed && !courseDetailsApproved && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.blueBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 📋
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.blue, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Course Details Reviewed by Coordinator</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Waiting for Dean's final approval.</p>
//               </div>
//             </div>
//           </Card>
//         )}
        
//         {/* Course Details Approved by Dean - Final Step */}
//         {courseDetailsApproved && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.greenBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ✓
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.green, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>All Forms Approved by Dean!</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Your schedule has been generated. Use the Syllabus Tracker to update module completion.</p>
//               </div>
//             </div>
//           </Card>
//         )}
//       </div>
//     ),
    
//     status: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//         <Title>Submission Status - {faculty?.course}</Title>
        
//         <Card>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//             <span style={{ color: C.text.primary, fontWeight: 600 }}>Form Status</span>
//             <Badge variant={formStatus.isFloated ? "success" : "warning"}>
//               {formStatus.isFloated ? "Open" : "Not Yet Released"}
//             </Badge>
//           </div>
//           {formStatus.isFloated && formStatus.deadline && (
//             <p style={{ color: C.text.secondary, fontSize: 13, marginBottom: 16 }}>
//               Deadline: {new Date(formStatus.deadline).toLocaleString()}
//             </p>
//           )}
//         </Card>
        
//         <Card>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//             <span style={{ color: C.text.primary, fontWeight: 600 }}>Subject Preferences</span>
//             <Badge variant={
//               preference?.status === "approved" ? "success" : 
//               preference?.status === "allocated" ? "primary" :
//               preference?.status === "pending" ? "warning" : "danger"
//             }>
//               {preference?.status === "approved" ? "Approved by Dean" : 
//                preference?.status === "allocated" ? "Allocated - Pending Dean" :
//                preference?.status === "pending" ? "Submitted - Pending Allocation" : 
//                preference?.status === "rejected" ? "Rejected" : "Not Submitted"}
//             </Badge>
//           </div>
//           {preference?.submitted && (
//             <div>
//               {preference.preferences.map(p => {
//                 const subject = AppState.subjects.find(s => s.id === p.subjectId);
//                 return (
//                   <div key={p.level} style={{
//                     padding: "8px 12px",
//                     background: C.cardHover,
//                     borderRadius: 8,
//                     marginBottom: 4,
//                   }}>
//                     <span style={{ color: p.level === 1 ? C.accent.gold : p.level === 2 ? C.accent.blue : C.accent.green }}>
//                       Preference {p.level}:
//                     </span>
//                     <span style={{ color: C.text.primary, marginLeft: 8 }}>{subject?.name}</span>
//                   </div>
//                 );
//               })}
//               {preference.allocatedSubjects && (
//                 <div style={{ marginTop: 12, padding: "8px 12px", background: C.cardHover, borderRadius: 8 }}>
//                   <span style={{ color: C.accent.green }}>Allocated by Coordinator: </span>
//                   <span style={{ color: C.text.primary }}>
//                     {preference.allocatedSubjects.map(id => {
//                       const s = AppState.subjects.find(sub => sub.id === id);
//                       return s?.name;
//                     }).join(", ")}
//                   </span>
//                 </div>
//               )}
//             </div>
//           )}
//         </Card>
        
//         <Card>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//             <span style={{ color: C.text.primary, fontWeight: 600 }}>Detailed Course Information</span>
//             {courseDetails.length > 0 ? (
//               <div style={{ display: "flex", gap: 8 }}>
//                 <Badge variant={courseDetails.every(c => c.coordinatorStatus === "reviewed") ? "primary" : "warning"}>
//                   Coordinator: {courseDetails.every(c => c.coordinatorStatus === "reviewed") ? "Reviewed" : "Pending"}
//                 </Badge>
//                 <Badge variant={courseDetails.every(c => c.deanStatus === "approved") ? "success" : "warning"}>
//                   Dean: {courseDetails.every(c => c.deanStatus === "approved") ? "Approved" : "Pending"}
//                 </Badge>
//               </div>
//             ) : (
//               <Badge variant="danger">Locked</Badge>
//             )}
//           </div>
//           {courseDetails.map(c => (
//             <div key={c.id} style={{
//               padding: "12px",
//               background: C.cardHover,
//               borderRadius: 8,
//               marginBottom: 8,
//             }}>
//               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
//                 <span style={{ color: C.accent.blue, fontWeight: 500 }}>{c.subjectName}</span>
//                 <div style={{ display: "flex", gap: 8 }}>
//                   <Badge variant={c.coordinatorStatus === "reviewed" ? "success" : c.coordinatorStatus === "pending" ? "warning" : "danger"}>
//                     {c.coordinatorStatus === "reviewed" ? "Reviewed" : c.coordinatorStatus}
//                   </Badge>
//                   <Badge variant={c.deanStatus === "approved" ? "success" : "warning"}>
//                     {c.deanStatus === "approved" ? "Dean Approved" : "Pending Dean"}
//                   </Badge>
//                 </div>
//               </div>
//               <div style={{ display: "flex", gap: 16, fontSize: 12, color: C.text.tertiary }}>
//                 <span>{c.credits} Credits</span>
//                 <span>{c.modules} Modules</span>
//                 <span>Semester {c.semester}</span>
//               </div>
//             </div>
//           ))}
//         </Card>
//       </div>
//     ),
    
//     syllabus: <FacultySyllabusTracker faculty={faculty} />,
    
//     schedule: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//         <Title>My Weekly Schedule</Title>
//         {schedule.length === 0 ? (
//           <Card>
//             <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>
//               {courseDetailsApproved ? "Schedule being generated..." : "Complete all forms and wait for dean's approval to see your schedule"}
//             </p>
//           </Card>
//         ) : (
//           <>
//             <WeeklyTimetableView schedule={schedule} title={`${faculty?.name} - ${faculty?.course}`} />
//             <Card>
//               <Title level={4}>Suggest Timetable Change</Title>
//               <p>If you notice any conflict or have a suggestion, please raise an issue.</p>
//               <Button
//                 onClick={() => {
//                   const reason = prompt("Describe your suggestion or conflict:");
//                   if (reason) {
//                     const newIssue = {
//                       id: Date.now(),
//                       type: "timetable_suggestion",
//                       facultyId: faculty.id,
//                       facultyName: faculty.name,
//                       reason,
//                       status: "pending",
//                       timestamp: new Date().toISOString(),
//                     };
//                     AppState.flaggedIssues.push(newIssue);
//                     saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
//                     alert("Issue raised. Director will review.");
//                   }
//                 }}
//                 variant="warning"
//               >
//                 Raise Issue
//               </Button>
//             </Card>
//           </>
//         )}
//       </div>
//     ),
    
//     profile: (
//       <Card>
//         <Title level={4}>Faculty Profile</Title>
//         <div style={{ display: "flex", gap: 32, alignItems: "center", marginTop: 20, flexWrap: "wrap" }}>
//           <div style={{
//             width: 100,
//             height: 100,
//             borderRadius: "50%",
//             background: `${faculty?.color}20`,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: 36,
//             fontWeight: 700,
//             color: faculty?.color,
//           }}>
//             {faculty?.avatar}
//           </div>
//           <div>
//             <h3 style={{ color: C.text.primary, fontSize: 24, fontWeight: 600, marginBottom: 8 }}>{faculty?.name}</h3>
//             <p style={{ color: C.accent.blue, fontSize: 15, marginBottom: 4 }}>ID: {faculty?.facultyId}</p>
//             <p style={{ color: C.accent.blue, fontSize: 15, marginBottom: 4 }}>{faculty?.designation}</p>
//             <p style={{ color: C.text.secondary, fontSize: 14, marginBottom: 4 }}>Course: {faculty?.course}</p>
//             <p style={{ color: C.text.secondary, fontSize: 14 }}>Specialization: {faculty?.specialization}</p>
//           </div>
//         </div>
        
//         <div style={{ marginTop: 24, padding: 16, background: C.cardHover, borderRadius: 12 }}>
//           <h5 style={{ color: C.text.primary, fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Workload Information</h5>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
//             <div>
//               <span style={{ color: C.text.tertiary, fontSize: 12 }}>Max Hours/Week</span>
//               <p style={{ color: C.accent.blue, fontSize: 20, fontWeight: 600 }}>{faculty?.maxHours}h</p>
//             </div>
//             <div>
//               <span style={{ color: C.text.tertiary, fontSize: 12 }}>Assigned Hours</span>
//               <p style={{ color: C.accent.gold, fontSize: 20, fontWeight: 600 }}>{faculty?.assignedHours || 0}h</p>
//             </div>
//             <div>
//               <span style={{ color: C.text.tertiary, fontSize: 12 }}>Remaining Hours</span>
//               <p style={{ color: C.accent.green, fontSize: 20, fontWeight: 600 }}>{faculty?.remainingHours || faculty?.maxHours}h</p>
//             </div>
//           </div>
//         </div>
//       </Card>
//     ),
//   };

//   if (!faculty) {
//     return (
//       <div style={{ display: "flex", minHeight: "100vh", background: C.bg, alignItems: "center", justifyContent: "center" }}>
//         <Card>
//           <p style={{ color: C.text.tertiary, textAlign: "center" }}>Loading faculty data...</p>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
//       <Sidebar 
//         navItems={FAC_NAV} 
//         active={active} 
//         setActive={setActive} 
//         collapsed={collapsed} 
//         setCollapsed={setCollapsed} 
//         user={user} 
//         badges={{ forms: preference?.status === "pending" ? 1 : 0 }} 
//         accentColor={C.accent.blue} 
//       />
//       <main style={{ flex: 1, overflow: "auto" }}>
//         <header style={{
//           background: C.nav,
//           borderBottom: `1px solid ${C.navBorder}`,
//           padding: "16px 32px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           position: "sticky",
//           top: 0,
//           zIndex: 10,
//           flexWrap: "wrap",
//           gap: 12,
//         }}>
//           <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>{FAC_NAV.find(n => n.id === active)?.label}</h2>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             {formStatus.isFloated && !preference?.submitted && (
//               <Badge variant="success">Form Open</Badge>
//             )}
//             {!formStatus.isFloated && (
//               <Badge variant="warning">Form Closed</Badge>
//             )}
//             <Badge variant={
//               preference?.status === "approved" ? "success" : 
//               preference?.status === "allocated" ? "primary" : 
//               preference?.status === "pending" ? "warning" : "danger"
//             }>
//               {preference?.status === "approved" ? "Dean Approved" : 
//                preference?.status === "allocated" ? "Awaiting Dean" : 
//                preference?.status === "pending" ? "Submitted" : "Not Started"}
//             </Badge>
//           </div>
//         </header>
//         <div style={{ padding: 32 }}>{panels[active]}</div>
//       </main>
//     </div>
//   );
// }

// // src/components/faculty/FacultyDashboard.jsx
// import { useState, useEffect } from "react";
// import { useAuth } from "../auth/AuthContext";
// import { Sidebar, Card, Title, Badge, Button } from "../common";
// import { WeeklyTimetableView } from "../shared/WeeklyTimetableView";
// import { FacultyPreferenceForm } from "./FacultyPreferenceForm";
// import { FacultyDetailedCourseForm } from "./FacultyDetailedCourseForm";
// import { FacultySyllabusTracker } from "./FacultySyllabusTracker";
// import { AppState } from "../../AppState";
// import { C } from "../../styles/theme";
// import { saveToStorage, STORAGE_KEYS, loadFromStorage } from "../../utils/storage";

// export function FacultyDashboard() {
//   const { user } = useAuth();
//   const [active, setActive] = useState("forms");
//   const [collapsed, setCollapsed] = useState(false);
//   const [refresh, setRefresh] = useState(0);
//   const [formStatus, setFormStatus] = useState({
//     isFloated: false,
//     floatedDate: null,
//     floatedBy: null,
//     semester: "2025",
//     deadline: null
//   });
  
//   // Listen for storage changes
//   useEffect(() => {
//     const handleStorageChange = () => {
//       loadFormStatus();
//       setRefresh(r => r + 1);
//     };
    
//     loadFormStatus();
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const loadFormStatus = () => {
//     const savedStatus = loadFromStorage(STORAGE_KEYS.FORM_STATUS, {
//       isFloated: false,
//       floatedDate: null,
//       floatedBy: null,
//       semester: "2025",
//       deadline: null
//     });
//     setFormStatus(savedStatus);
//   };
  
//   // Get fresh data on refresh
//   useEffect(() => {
//     const loadFreshData = () => {
//       AppState.faculty = JSON.parse(localStorage.getItem(STORAGE_KEYS.FACULTY) || '[]');
//       AppState.subjects = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBJECTS) || '[]');
//       AppState.subjectPreferences = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBJECT_PREFERENCES) || '[]');
//       AppState.courseDetails = JSON.parse(localStorage.getItem(STORAGE_KEYS.COURSE_DETAILS) || '[]');
//       AppState.semesterDetails = JSON.parse(localStorage.getItem(STORAGE_KEYS.SEMESTER_DETAILS) || '{}');
//     };
    
//     loadFreshData();
//   }, [refresh]);
  
//   const faculty = AppState.faculty.find(f => f.id === user.id);
//   const preference = AppState.getPreferenceByFacultyId(user.id);
//   const courseDetails = AppState.getCourseDetailsByFacultyId(user.id);
//   const schedule = AppState.getFacultySchedule(user.id);
  
//   // Status checks for the workflow
//   const preferencePending = preference?.submitted && preference?.status === "pending";
//   const preferenceApproved = preference?.status === "approved";
//   const preferenceRejected = preference?.status === "rejected";
  
//   // Course details status
//   const courseDetailsPending = courseDetails.length > 0 && courseDetails.every(c => c.deanStatus === "pending");
//   const courseDetailsApproved = courseDetails.length > 0 && courseDetails.every(c => c.deanStatus === "approved");
//   const courseDetailsRejected = courseDetails.length > 0 && courseDetails.every(c => c.deanStatus === "rejected");
  
//   // Check if form is floated and deadline hasn't passed
//   const isFormOpen = formStatus.isFloated && (!formStatus.deadline || new Date() <= new Date(formStatus.deadline));
//   const isDeadlinePassed = formStatus.deadline && new Date() > new Date(formStatus.deadline);
  
//   const forceUpdate = () => {
//     setRefresh(r => r + 1);
//     window.dispatchEvent(new Event('storage'));
//   };
  
//   const FAC_NAV = [
//     { id: "forms", icon: "📝", label: "Preference Forms" },
//     { id: "status", icon: "📊", label: "Submission Status" },
//     { id: "syllabus", icon: "📚", label: "Syllabus Tracker" },
//     { id: "schedule", icon: "📅", label: "My Schedule" },
//     { id: "profile", icon: "👤", label: "Profile" },
//   ];
  
//   const panels = {
//     forms: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//         <Title>Faculty Onboarding Forms - {faculty?.course}</Title>
        
//         {/* Form Status Message */}
//         {!formStatus.isFloated && (
//           <Card style={{ background: C.accent.goldBg, textAlign: "center" }}>
//             <div style={{ padding: "20px" }}>
//               <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
//               <h3 style={{ color: C.accent.gold, marginBottom: 8 }}>Preference Form Not Yet Available</h3>
//               <p style={{ color: C.text.secondary }}>
//                 The preference form has not been floated by the Director yet. 
//                 Please check back later when the form is released.
//               </p>
//             </div>
//           </Card>
//         )}
        
//         {formStatus.isFloated && isDeadlinePassed && (
//           <Card style={{ background: C.accent.redBg, textAlign: "center" }}>
//             <div style={{ padding: "20px" }}>
//               <div style={{ fontSize: 48, marginBottom: 16 }}>⏰</div>
//               <h3 style={{ color: C.accent.red, marginBottom: 8 }}>Submission Deadline Passed</h3>
//               <p style={{ color: C.text.secondary }}>
//                 The submission deadline ({new Date(formStatus.deadline).toLocaleString()}) has passed.
//                 You cannot submit preferences at this time.
//               </p>
//             </div>
//           </Card>
//         )}
        
//         {/* Show preference form if open and not submitted */}
//         {formStatus.isFloated && !isDeadlinePassed && !preference?.submitted && (
//           <>
//             <div style={{ padding: 12, background: C.accent.greenBg, borderRadius: 8, marginBottom: 8 }}>
//               <p style={{ color: C.accent.green, margin: 0, textAlign: "center" }}>
//                 ✓ Preference form is OPEN! Please submit your preferences before {new Date(formStatus.deadline).toLocaleString()}
//               </p>
//             </div>
//             <FacultyPreferenceForm faculty={faculty} onComplete={forceUpdate} />
//           </>
//         )}
        
//         {/* Waiting for Dean Approval */}
//         {preferencePending && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.goldBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ⏳
//               </div>
//               <div>
//                 <h4 style={{ color: C.text.primary, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Subject Preferences Submitted</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Waiting for Dean's approval.</p>
//                 {preference.feedback && (
//                   <p style={{ color: C.accent.gold, fontSize: 13, marginTop: 8 }}>Feedback: {preference.feedback}</p>
//                 )}
//               </div>
//             </div>
//           </Card>
//         )}
        
//         {/* Preferences Rejected by Dean */}
//         {preferenceRejected && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.redBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ✗
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.red, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Subject Preferences Rejected</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Please revise and resubmit.</p>
//                 {preference.feedback && (
//                   <p style={{ color: C.accent.red, fontSize: 13, marginTop: 8 }}>Feedback: {preference.feedback}</p>
//                 )}
//               </div>
//             </div>
//             {isFormOpen ? (
//               <Button onClick={() => { AppState.resetPreferenceForm(faculty.id); forceUpdate(); }} variant="primary" fullWidth>
//                 Resubmit Preferences
//               </Button>
//             ) : (
//               <p style={{ color: C.accent.red, textAlign: "center" }}>
//                 The preference form is currently closed. Cannot resubmit at this time.
//               </p>
//             )}
//           </Card>
//         )}
        
//         {/* Preferences Approved by Dean - Show Detailed Course Form */}
//         {preferenceApproved && courseDetails.length === 0 && (
//           <FacultyDetailedCourseForm 
//             faculty={faculty} 
//             allocatedSubjects={preference.preferences?.map(p => p.subjectId)} 
//             onComplete={forceUpdate} 
//           />
//         )}
        
//         {/* Course Details Submitted - Waiting for Dean Approval */}
//         {preferenceApproved && courseDetails.length > 0 && courseDetailsPending && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.goldBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ⏳
//               </div>
//               <div>
//                 <h4 style={{ color: C.text.primary, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Detailed Course Information Submitted</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Waiting for Dean's approval.</p>
//               </div>
//             </div>
//           </Card>
//         )}
        
//         {/* Course Details Rejected by Dean */}
//         {courseDetailsRejected && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.redBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ✗
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.red, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Course Details Rejected</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Please review the feedback and resubmit.</p>
//                 {courseDetails[0]?.deanFeedback && (
//                   <p style={{ color: C.accent.red, fontSize: 13, marginTop: 8 }}>Feedback: {courseDetails[0].deanFeedback}</p>
//                 )}
//               </div>
//             </div>
//             <Button onClick={() => {
//               // Reset course details to allow resubmission
//               AppState.courseDetails = AppState.courseDetails.filter(c => c.facultyId !== faculty.id);
//               saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
//               forceUpdate();
//             }} variant="primary" fullWidth>
//               Resubmit Course Details
//             </Button>
//           </Card>
//         )}
        
//         {/* Course Details Approved by Dean - Final Step */}
//         {courseDetailsApproved && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.greenBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ✓
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.green, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>All Forms Approved by Dean!</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Your schedule has been generated. Use the Syllabus Tracker to update module completion.</p>
//               </div>
//             </div>
//           </Card>
//         )}
//       </div>
//     ),
    
//     status: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//         <Title>Submission Status - {faculty?.course}</Title>
        
//         <Card>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//             <span style={{ color: C.text.primary, fontWeight: 600 }}>Form Status</span>
//             <Badge variant={formStatus.isFloated ? "success" : "warning"}>
//               {formStatus.isFloated ? "Open" : "Not Yet Released"}
//             </Badge>
//           </div>
//           {formStatus.isFloated && formStatus.deadline && (
//             <p style={{ color: C.text.secondary, fontSize: 13, marginBottom: 16 }}>
//               Deadline: {new Date(formStatus.deadline).toLocaleString()}
//             </p>
//           )}
//         </Card>
        
//         <Card>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//             <span style={{ color: C.text.primary, fontWeight: 600 }}>Subject Preferences</span>
//             <Badge variant={
//               preference?.status === "approved" ? "success" : 
//               preference?.status === "pending" ? "warning" : "danger"
//             }>
//               {preference?.status === "approved" ? "Approved by Dean" : 
//                preference?.status === "pending" ? "Pending Dean Approval" : 
//                preference?.status === "rejected" ? "Rejected" : "Not Submitted"}
//             </Badge>
//           </div>
//           {preference?.submitted && (
//             <div>
//               {preference.preferences?.map(p => {
//                 const subject = AppState.subjects.find(s => s.id === p.subjectId);
//                 return (
//                   <div key={p.level} style={{
//                     padding: "8px 12px",
//                     background: C.cardHover,
//                     borderRadius: 8,
//                     marginBottom: 4,
//                   }}>
//                     <span style={{ color: p.level === 1 ? C.accent.gold : p.level === 2 ? C.accent.blue : C.accent.green }}>
//                       Preference {p.level}:
//                     </span>
//                     <span style={{ color: C.text.primary, marginLeft: 8 }}>{subject?.name}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </Card>
        
//         <Card>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//             <span style={{ color: C.text.primary, fontWeight: 600 }}>Detailed Course Information</span>
//             {courseDetails.length > 0 ? (
//               <div style={{ display: "flex", gap: 8 }}>
//                 <Badge variant={courseDetails.every(c => c.deanStatus === "approved") ? "success" : "warning"}>
//                   Dean: {courseDetails.every(c => c.deanStatus === "approved") ? "Approved" : "Pending"}
//                 </Badge>
//               </div>
//             ) : (
//               <Badge variant="danger">Locked (Complete Preferences First)</Badge>
//             )}
//           </div>
//           {courseDetails.map(c => (
//             <div key={c.id} style={{
//               padding: "12px",
//               background: C.cardHover,
//               borderRadius: 8,
//               marginBottom: 8,
//             }}>
//               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
//                 <span style={{ color: C.accent.blue, fontWeight: 500 }}>{c.subjectName}</span>
//                 <Badge variant={c.deanStatus === "approved" ? "success" : "warning"}>
//                   {c.deanStatus === "approved" ? "Dean Approved" : "Pending Dean"}
//                 </Badge>
//               </div>
//               <div style={{ display: "flex", gap: 16, fontSize: 12, color: C.text.tertiary }}>
//                 <span>{c.credits} Credits</span>
//                 <span>{c.modules} Modules</span>
//                 <span>Semester {c.semester}</span>
//               </div>
//               {c.deanFeedback && (
//                 <p style={{ color: C.accent.red, fontSize: 11, marginTop: 8 }}>Feedback: {c.deanFeedback}</p>
//               )}
//             </div>
//           ))}
//         </Card>
//       </div>
//     ),
    
//     syllabus: <FacultySyllabusTracker faculty={faculty} />,
    
//     schedule: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//         <Title>My Weekly Schedule</Title>
//         {schedule.length === 0 ? (
//           <Card>
//             <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>
//               {courseDetailsApproved ? "Schedule being generated..." : "Complete all forms and wait for dean's approval to see your schedule"}
//             </p>
//           </Card>
//         ) : (
//           <>
//             <WeeklyTimetableView schedule={schedule} title={`${faculty?.name} - ${faculty?.course}`} />
//             <Card>
//               <Title level={4}>Suggest Timetable Change</Title>
//               <p>If you notice any conflict or have a suggestion, please raise an issue.</p>
//               <Button
//                 onClick={() => {
//                   const reason = prompt("Describe your suggestion or conflict:");
//                   if (reason) {
//                     const newIssue = {
//                       id: Date.now(),
//                       type: "timetable_suggestion",
//                       facultyId: faculty.id,
//                       facultyName: faculty.name,
//                       reason,
//                       status: "pending",
//                       timestamp: new Date().toISOString(),
//                     };
//                     AppState.flaggedIssues.push(newIssue);
//                     saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
//                     alert("Issue raised. Director will review.");
//                   }
//                 }}
//                 variant="warning"
//               >
//                 Raise Issue
//               </Button>
//             </Card>
//           </>
//         )}
//       </div>
//     ),
    
//     profile: (
//       <Card>
//         <Title level={4}>Faculty Profile</Title>
//         <div style={{ display: "flex", gap: 32, alignItems: "center", marginTop: 20, flexWrap: "wrap" }}>
//           <div style={{
//             width: 100,
//             height: 100,
//             borderRadius: "50%",
//             background: `${faculty?.color}20`,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: 36,
//             fontWeight: 700,
//             color: faculty?.color,
//           }}>
//             {faculty?.avatar}
//           </div>
//           <div>
//             <h3 style={{ color: C.text.primary, fontSize: 24, fontWeight: 600, marginBottom: 8 }}>{faculty?.name}</h3>
//             <p style={{ color: C.accent.blue, fontSize: 15, marginBottom: 4 }}>ID: {faculty?.facultyId}</p>
//             <p style={{ color: C.accent.blue, fontSize: 15, marginBottom: 4 }}>{faculty?.designation}</p>
//             <p style={{ color: C.text.secondary, fontSize: 14, marginBottom: 4 }}>Course: {faculty?.course}</p>
//             <p style={{ color: C.text.secondary, fontSize: 14 }}>Specialization: {faculty?.specialization}</p>
//           </div>
//         </div>
        
//         <div style={{ marginTop: 24, padding: 16, background: C.cardHover, borderRadius: 12 }}>
//           <h5 style={{ color: C.text.primary, fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Workload Information</h5>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
//             <div>
//               <span style={{ color: C.text.tertiary, fontSize: 12 }}>Max Hours/Week</span>
//               <p style={{ color: C.accent.blue, fontSize: 20, fontWeight: 600 }}>{faculty?.maxHours}h</p>
//             </div>
//             <div>
//               <span style={{ color: C.text.tertiary, fontSize: 12 }}>Assigned Hours</span>
//               <p style={{ color: C.accent.gold, fontSize: 20, fontWeight: 600 }}>{faculty?.assignedHours || 0}h</p>
//             </div>
//             <div>
//               <span style={{ color: C.text.tertiary, fontSize: 12 }}>Remaining Hours</span>
//               <p style={{ color: C.accent.green, fontSize: 20, fontWeight: 600 }}>{faculty?.remainingHours || faculty?.maxHours}h</p>
//             </div>
//           </div>
//         </div>
//       </Card>
//     ),
//   };

//   if (!faculty) {
//     return (
//       <div style={{ display: "flex", minHeight: "100vh", background: C.bg, alignItems: "center", justifyContent: "center" }}>
//         <Card>
//           <p style={{ color: C.text.tertiary, textAlign: "center" }}>Loading faculty data...</p>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
//       <Sidebar 
//         navItems={FAC_NAV} 
//         active={active} 
//         setActive={setActive} 
//         collapsed={collapsed} 
//         setCollapsed={setCollapsed} 
//         user={user} 
//         badges={{ forms: preference?.status === "pending" ? 1 : 0 }} 
//         accentColor={C.accent.blue} 
//       />
//       <main style={{ flex: 1, overflow: "auto" }}>
//         <header style={{
//           background: C.nav,
//           borderBottom: `1px solid ${C.navBorder}`,
//           padding: "16px 32px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           position: "sticky",
//           top: 0,
//           zIndex: 10,
//           flexWrap: "wrap",
//           gap: 12,
//         }}>
//           <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>{FAC_NAV.find(n => n.id === active)?.label}</h2>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             {formStatus.isFloated && !preference?.submitted && (
//               <Badge variant="success">Form Open</Badge>
//             )}
//             {!formStatus.isFloated && (
//               <Badge variant="warning">Form Closed</Badge>
//             )}
//             <Badge variant={
//               preference?.status === "approved" ? "success" : 
//               preference?.status === "pending" ? "warning" : "danger"
//             }>
//               {preference?.status === "approved" ? "Dean Approved" : 
//                preference?.status === "pending" ? "Pending Dean" : 
//                preference?.status === "rejected" ? "Rejected" : "Not Started"}
//             </Badge>
//           </div>
//         </header>
//         <div style={{ padding: 32 }}>{panels[active]}</div>
//       </main>
//     </div>
//   );
// }

// src/components/faculty/FacultyDashboard.jsx
// import { useState, useEffect } from "react";
// import { useAuth } from "../auth/AuthContext";
// import { Sidebar, Card, Title, Badge, Button, Input } from "../common";
// import { WeeklyTimetableView } from "../shared/WeeklyTimetableView";
// import { FacultyPreferenceForm } from "./FacultyPreferenceForm";
// import { FacultyDetailedCourseForm } from "./FacultyDetailedCourseForm";
// import { FacultySyllabusTracker } from "./FacultySyllabusTracker";
// import { FacultyAppointments } from "./FacultyAppointments";
// import { LeaveRequestForm } from "./LeaveRequestForm";
// import { AppState } from "../../AppState";
// import { C } from "../../styles/theme";
// import { saveToStorage, STORAGE_KEYS, loadFromStorage } from "../../utils/storage";

// export function FacultyDashboard() {
//   const { user } = useAuth();
//   const [active, setActive] = useState("forms");
//   const [collapsed, setCollapsed] = useState(false);
//   const [refresh, setRefresh] = useState(0);
//   const [formStatus, setFormStatus] = useState({
//     isFloated: false,
//     floatedDate: null,
//     floatedBy: null,
//     semester: "2025",
//     deadline: null
//   });
  
//   // Listen for storage changes
//   useEffect(() => {
//     const handleStorageChange = () => {
//       loadFormStatus();
//       setRefresh(r => r + 1);
//     };
    
//     loadFormStatus();
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const loadFormStatus = () => {
//     const savedStatus = loadFromStorage(STORAGE_KEYS.FORM_STATUS, {
//       isFloated: false,
//       floatedDate: null,
//       floatedBy: null,
//       semester: "2025",
//       deadline: null
//     });
//     setFormStatus(savedStatus);
//   };
  
//   // Get fresh data on refresh
//   useEffect(() => {
//     const loadFreshData = () => {
//       AppState.faculty = JSON.parse(localStorage.getItem(STORAGE_KEYS.FACULTY) || '[]');
//       AppState.subjects = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBJECTS) || '[]');
//       AppState.subjectPreferences = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBJECT_PREFERENCES) || '[]');
//       AppState.courseDetails = JSON.parse(localStorage.getItem(STORAGE_KEYS.COURSE_DETAILS) || '[]');
//       AppState.semesterDetails = JSON.parse(localStorage.getItem(STORAGE_KEYS.SEMESTER_DETAILS) || '{}');
//     };
    
//     loadFreshData();
//   }, [refresh]);
  
//   const faculty = AppState.faculty.find(f => f.id === user.id);
//   const preference = AppState.getPreferenceByFacultyId(user.id);
//   const courseDetails = AppState.getCourseDetailsByFacultyId(user.id);
//   const schedule = AppState.getFacultySchedule(user.id);
  
//   // Status checks for the workflow
//   const preferencePending = preference?.submitted && preference?.status === "pending";
//   const preferenceApproved = preference?.status === "approved";
//   const preferenceRejected = preference?.status === "rejected";
  
//   // Course details status
//   const courseDetailsPending = courseDetails.length > 0 && courseDetails.every(c => c.deanStatus === "pending");
//   const courseDetailsApproved = courseDetails.length > 0 && courseDetails.every(c => c.deanStatus === "approved");
//   const courseDetailsRejected = courseDetails.length > 0 && courseDetails.every(c => c.deanStatus === "rejected");
  
//   // Check if form is floated and deadline hasn't passed
//   const isFormOpen = formStatus.isFloated && (!formStatus.deadline || new Date() <= new Date(formStatus.deadline));
//   const isDeadlinePassed = formStatus.deadline && new Date() > new Date(formStatus.deadline);
  
//   const forceUpdate = () => {
//     setRefresh(r => r + 1);
//     window.dispatchEvent(new Event('storage'));
//   };
  
//   const FAC_NAV = [
//     { id: "forms", icon: "📝", label: "Preference Forms" },
//     { id: "status", icon: "📊", label: "Submission Status" },
//     { id: "syllabus", icon: "📚", label: "Syllabus Tracker" },
//     { id: "schedule", icon: "📅", label: "My Schedule" },
//     { id: "leaveRequest", icon: "🏖️", label: "Request Leave" },
//     { id: "appointments", icon: "📅", label: "Appointments" },
//     { id: "profile", icon: "👤", label: "Profile" },
//   ];
  
//   const panels = {
//     forms: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//         <Title>Faculty Onboarding Forms - {faculty?.course}</Title>
        
//         {/* Form Status Message */}
//         {!formStatus.isFloated && (
//           <Card style={{ background: C.accent.goldBg, textAlign: "center" }}>
//             <div style={{ padding: "20px" }}>
//               <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
//               <h3 style={{ color: C.accent.gold, marginBottom: 8 }}>Preference Form Not Yet Available</h3>
//               <p style={{ color: C.text.secondary }}>
//                 The preference form has not been floated by the Director yet. 
//                 Please check back later when the form is released.
//               </p>
//             </div>
//           </Card>
//         )}
        
//         {formStatus.isFloated && isDeadlinePassed && (
//           <Card style={{ background: C.accent.redBg, textAlign: "center" }}>
//             <div style={{ padding: "20px" }}>
//               <div style={{ fontSize: 48, marginBottom: 16 }}>⏰</div>
//               <h3 style={{ color: C.accent.red, marginBottom: 8 }}>Submission Deadline Passed</h3>
//               <p style={{ color: C.text.secondary }}>
//                 The submission deadline ({new Date(formStatus.deadline).toLocaleString()}) has passed.
//                 You cannot submit preferences at this time.
//               </p>
//             </div>
//           </Card>
//         )}
        
//         {/* Show preference form if open and not submitted */}
//         {formStatus.isFloated && !isDeadlinePassed && !preference?.submitted && (
//           <>
//             <div style={{ padding: 12, background: C.accent.greenBg, borderRadius: 8, marginBottom: 8 }}>
//               <p style={{ color: C.accent.green, margin: 0, textAlign: "center" }}>
//                 ✓ Preference form is OPEN! Please submit your preferences before {new Date(formStatus.deadline).toLocaleString()}
//               </p>
//             </div>
//             <FacultyPreferenceForm faculty={faculty} onComplete={forceUpdate} />
//           </>
//         )}
        
//         {/* Waiting for Dean Approval */}
//         {preferencePending && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.goldBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ⏳
//               </div>
//               <div>
//                 <h4 style={{ color: C.text.primary, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Subject Preferences Submitted</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Waiting for Dean's approval.</p>
//                 {preference.feedback && (
//                   <p style={{ color: C.accent.gold, fontSize: 13, marginTop: 8 }}>Feedback: {preference.feedback}</p>
//                 )}
//               </div>
//             </div>
//           </Card>
//         )}
        
//         {/* Preferences Rejected by Dean */}
//         {preferenceRejected && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.redBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ✗
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.red, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Subject Preferences Rejected</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Please revise and resubmit.</p>
//                 {preference.feedback && (
//                   <p style={{ color: C.accent.red, fontSize: 13, marginTop: 8 }}>Feedback: {preference.feedback}</p>
//                 )}
//               </div>
//             </div>
//             {isFormOpen ? (
//               <Button onClick={() => { AppState.resetPreferenceForm(faculty.id); forceUpdate(); }} variant="primary" fullWidth>
//                 Resubmit Preferences
//               </Button>
//             ) : (
//               <p style={{ color: C.accent.red, textAlign: "center" }}>
//                 The preference form is currently closed. Cannot resubmit at this time.
//               </p>
//             )}
//           </Card>
//         )}
        
//         {/* Preferences Approved by Dean - Show Detailed Course Form */}
//         {preferenceApproved && courseDetails.length === 0 && (
//           <FacultyDetailedCourseForm 
//             faculty={faculty} 
//             allocatedSubjects={preference.preferences?.map(p => p.subjectId)} 
//             onComplete={forceUpdate} 
//           />
//         )}
        
//         {/* Course Details Submitted - Waiting for Dean Approval */}
//         {preferenceApproved && courseDetails.length > 0 && courseDetailsPending && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.goldBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ⏳
//               </div>
//               <div>
//                 <h4 style={{ color: C.text.primary, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Detailed Course Information Submitted</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Waiting for Dean's approval.</p>
//               </div>
//             </div>
//           </Card>
//         )}
        
//         {/* Course Details Rejected by Dean */}
//         {courseDetailsRejected && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.redBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ✗
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.red, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Course Details Rejected</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Please review the feedback and resubmit.</p>
//                 {courseDetails[0]?.deanFeedback && (
//                   <p style={{ color: C.accent.red, fontSize: 13, marginTop: 8 }}>Feedback: {courseDetails[0].deanFeedback}</p>
//                 )}
//               </div>
//             </div>
//             <Button onClick={() => {
//               // Reset course details to allow resubmission
//               AppState.courseDetails = AppState.courseDetails.filter(c => c.facultyId !== faculty.id);
//               saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
//               forceUpdate();
//             }} variant="primary" fullWidth>
//               Resubmit Course Details
//             </Button>
//           </Card>
//         )}
        
//         {/* Course Details Approved by Dean - Final Step */}
//         {courseDetailsApproved && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.greenBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ✓
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.green, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>All Forms Approved by Dean!</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Your schedule has been generated. Use the Syllabus Tracker to update module completion.</p>
//               </div>
//             </div>
//           </Card>
//         )}
//       </div>
//     ),
    
//     status: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//         <Title>Submission Status - {faculty?.course}</Title>
        
//         <Card>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//             <span style={{ color: C.text.primary, fontWeight: 600 }}>Form Status</span>
//             <Badge variant={formStatus.isFloated ? "success" : "warning"}>
//               {formStatus.isFloated ? "Open" : "Not Yet Released"}
//             </Badge>
//           </div>
//           {formStatus.isFloated && formStatus.deadline && (
//             <p style={{ color: C.text.secondary, fontSize: 13, marginBottom: 16 }}>
//               Deadline: {new Date(formStatus.deadline).toLocaleString()}
//             </p>
//           )}
//         </Card>
        
//         <Card>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//             <span style={{ color: C.text.primary, fontWeight: 600 }}>Subject Preferences</span>
//             <Badge variant={
//               preference?.status === "approved" ? "success" : 
//               preference?.status === "pending" ? "warning" : "danger"
//             }>
//               {preference?.status === "approved" ? "Approved by Dean" : 
//                preference?.status === "pending" ? "Pending Dean Approval" : 
//                preference?.status === "rejected" ? "Rejected" : "Not Submitted"}
//             </Badge>
//           </div>
//           {preference?.submitted && (
//             <div>
//               {preference.preferences?.map(p => {
//                 const subject = AppState.subjects.find(s => s.id === p.subjectId);
//                 return (
//                   <div key={p.level} style={{
//                     padding: "8px 12px",
//                     background: C.cardHover,
//                     borderRadius: 8,
//                     marginBottom: 4,
//                   }}>
//                     <span style={{ color: p.level === 1 ? C.accent.gold : p.level === 2 ? C.accent.blue : C.accent.green }}>
//                       Preference {p.level}:
//                     </span>
//                     <span style={{ color: C.text.primary, marginLeft: 8 }}>{subject?.name}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </Card>
        
//         <Card>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//             <span style={{ color: C.text.primary, fontWeight: 600 }}>Detailed Course Information</span>
//             {courseDetails.length > 0 ? (
//               <div style={{ display: "flex", gap: 8 }}>
//                 <Badge variant={courseDetails.every(c => c.deanStatus === "approved") ? "success" : "warning"}>
//                   Dean: {courseDetails.every(c => c.deanStatus === "approved") ? "Approved" : "Pending"}
//                 </Badge>
//               </div>
//             ) : (
//               <Badge variant="danger">Locked (Complete Preferences First)</Badge>
//             )}
//           </div>
//           {courseDetails.map(c => (
//             <div key={c.id} style={{
//               padding: "12px",
//               background: C.cardHover,
//               borderRadius: 8,
//               marginBottom: 8,
//             }}>
//               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
//                 <span style={{ color: C.accent.blue, fontWeight: 500 }}>{c.subjectName}</span>
//                 <Badge variant={c.deanStatus === "approved" ? "success" : "warning"}>
//                   {c.deanStatus === "approved" ? "Dean Approved" : "Pending Dean"}
//                 </Badge>
//               </div>
//               <div style={{ display: "flex", gap: 16, fontSize: 12, color: C.text.tertiary }}>
//                 <span>{c.credits} Credits</span>
//                 <span>{c.modules} Modules</span>
//                 <span>Semester {c.semester}</span>
//               </div>
//               {c.deanFeedback && (
//                 <p style={{ color: C.accent.red, fontSize: 11, marginTop: 8 }}>Feedback: {c.deanFeedback}</p>
//               )}
//             </div>
//           ))}
//         </Card>
//       </div>
//     ),
    
//     syllabus: <FacultySyllabusTracker faculty={faculty} />,
    
//     schedule: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//         <Title>My Weekly Schedule</Title>
//         {schedule.length === 0 ? (
//           <Card>
//             <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>
//               {courseDetailsApproved ? "Schedule being generated..." : "Complete all forms and wait for dean's approval to see your schedule"}
//             </p>
//           </Card>
//         ) : (
//           <>
//             <WeeklyTimetableView schedule={schedule} title={`${faculty?.name} - ${faculty?.course}`} />
//             <Card>
//               <Title level={4}>Suggest Timetable Change</Title>
//               <p>If you notice any conflict or have a suggestion, please raise an issue.</p>
//               <Button
//                 onClick={() => {
//                   const reason = prompt("Describe your suggestion or conflict:");
//                   if (reason) {
//                     const newIssue = {
//                       id: Date.now(),
//                       type: "timetable_suggestion",
//                       facultyId: faculty.id,
//                       facultyName: faculty.name,
//                       reason,
//                       status: "pending",
//                       timestamp: new Date().toISOString(),
//                     };
//                     AppState.flaggedIssues.push(newIssue);
//                     saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
//                     alert("Issue raised. Director will review.");
//                   }
//                 }}
//                 variant="warning"
//               >
//                 Raise Issue
//               </Button>
//             </Card>
//           </>
//         )}
//       </div>
//     ),
    
//     appointments: <FacultyAppointments facultyId={faculty?.id} facultyName={faculty?.name} />,
    
//     profile: (
//       <Card>
//         <Title level={4}>Faculty Profile</Title>
//         <div style={{ display: "flex", gap: 32, alignItems: "center", marginTop: 20, flexWrap: "wrap" }}>
//           <div style={{
//             width: 100,
//             height: 100,
//             borderRadius: "50%",
//             background: `${faculty?.color}20`,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: 36,
//             fontWeight: 700,
//             color: faculty?.color,
//           }}>
//             {faculty?.avatar}
//           </div>
//           <div>
//             <h3 style={{ color: C.text.primary, fontSize: 24, fontWeight: 600, marginBottom: 8 }}>{faculty?.name}</h3>
//             <p style={{ color: C.accent.blue, fontSize: 15, marginBottom: 4 }}>ID: {faculty?.facultyId}</p>
//             <p style={{ color: C.accent.blue, fontSize: 15, marginBottom: 4 }}>{faculty?.designation}</p>
//             <p style={{ color: C.text.secondary, fontSize: 14, marginBottom: 4 }}>Course: {faculty?.course}</p>
//             <p style={{ color: C.text.secondary, fontSize: 14 }}>Specialization: {faculty?.specialization}</p>
//           </div>
//         </div>
        
//         <div style={{ marginTop: 24, padding: 16, background: C.cardHover, borderRadius: 12 }}>
//           <h5 style={{ color: C.text.primary, fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Workload Information</h5>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
//             <div>
//               <span style={{ color: C.text.tertiary, fontSize: 12 }}>Max Hours/Week</span>
//               <p style={{ color: C.accent.blue, fontSize: 20, fontWeight: 600 }}>{faculty?.maxHours}h</p>
//             </div>
//             <div>
//               <span style={{ color: C.text.tertiary, fontSize: 12 }}>Assigned Hours</span>
//               <p style={{ color: C.accent.gold, fontSize: 20, fontWeight: 600 }}>{faculty?.assignedHours || 0}h</p>
//             </div>
//             <div>
//               <span style={{ color: C.text.tertiary, fontSize: 12 }}>Remaining Hours</span>
//               <p style={{ color: C.accent.green, fontSize: 20, fontWeight: 600 }}>{faculty?.remainingHours || faculty?.maxHours}h</p>
//             </div>
//           </div>
//         </div>
//       </Card>
//     ),
//   };

//   if (!faculty) {
//     return (
//       <div style={{ display: "flex", minHeight: "100vh", background: C.bg, alignItems: "center", justifyContent: "center" }}>
//         <Card>
//           <p style={{ color: C.text.tertiary, textAlign: "center" }}>Loading faculty data...</p>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
//       <Sidebar 
//         navItems={FAC_NAV} 
//         active={active} 
//         setActive={setActive} 
//         collapsed={collapsed} 
//         setCollapsed={setCollapsed} 
//         user={user} 
//         badges={{ forms: preference?.status === "pending" ? 1 : 0 }} 
//         accentColor={C.accent.blue} 
//       />
//       <main style={{ flex: 1, overflow: "auto" }}>
//         <header style={{
//           background: C.nav,
//           borderBottom: `1px solid ${C.navBorder}`,
//           padding: "16px 32px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           position: "sticky",
//           top: 0,
//           zIndex: 10,
//           flexWrap: "wrap",
//           gap: 12,
//         }}>
//           <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>{FAC_NAV.find(n => n.id === active)?.label}</h2>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             {formStatus.isFloated && !preference?.submitted && (
//               <Badge variant="success">Form Open</Badge>
//             )}
//             {!formStatus.isFloated && (
//               <Badge variant="warning">Form Closed</Badge>
//             )}
//             <Badge variant={
//               preference?.status === "approved" ? "success" : 
//               preference?.status === "pending" ? "warning" : "danger"
//             }>
//               {preference?.status === "approved" ? "Dean Approved" : 
//                preference?.status === "pending" ? "Pending Dean" : 
//                preference?.status === "rejected" ? "Rejected" : "Not Started"}
//             </Badge>
//           </div>
//         </header>
//         <div style={{ padding: 32 }}>{panels[active]}</div>
//       </main>
//     </div>
//   );
// }

// // src/components/faculty/FacultyDashboard.jsx
// import { useState, useEffect } from "react";
// import { useAuth } from "../auth/AuthContext";
// import { Sidebar, Card, Title, Badge, Button } from "../common";
// import { WeeklyTimetableView } from "../shared/WeeklyTimetableView";
// import { FacultyPreferenceForm } from "./FacultyPreferenceForm";
// import { FacultyDetailedCourseForm } from "./FacultyDetailedCourseForm";
// import { FacultySyllabusTracker } from "./FacultySyllabusTracker";
// import { LeaveRequestForm } from "./LeaveRequestForm";
// import { FacultyLeaveStatus } from "./FacultyLeaveStatus";
// import { AppState } from "../../AppState";
// import { C } from "../../styles/theme";
// import { saveToStorage, STORAGE_KEYS, loadFromStorage } from "../../utils/storage";

// export function FacultyDashboard() {
//   const { user } = useAuth();
//   const [active, setActive] = useState("forms");
//   const [collapsed, setCollapsed] = useState(false);
//   const [refresh, setRefresh] = useState(0);
//   const [formStatus, setFormStatus] = useState({
//     isFloated: false,
//     floatedDate: null,
//     floatedBy: null,
//     semester: "2025",
//     deadline: null
//   });
  
//   // Listen for storage changes
//   useEffect(() => {
//     const handleStorageChange = () => {
//       loadFormStatus();
//       setRefresh(r => r + 1);
//     };
    
//     loadFormStatus();
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const loadFormStatus = () => {
//     const savedStatus = loadFromStorage(STORAGE_KEYS.FORM_STATUS, {
//       isFloated: false,
//       floatedDate: null,
//       floatedBy: null,
//       semester: "2025",
//       deadline: null
//     });
//     setFormStatus(savedStatus);
//   };
  
//   // Get fresh data on refresh
//   useEffect(() => {
//     const loadFreshData = () => {
//       AppState.faculty = JSON.parse(localStorage.getItem(STORAGE_KEYS.FACULTY) || '[]');
//       AppState.subjects = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBJECTS) || '[]');
//       AppState.subjectPreferences = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBJECT_PREFERENCES) || '[]');
//       AppState.courseDetails = JSON.parse(localStorage.getItem(STORAGE_KEYS.COURSE_DETAILS) || '[]');
//       AppState.semesterDetails = JSON.parse(localStorage.getItem(STORAGE_KEYS.SEMESTER_DETAILS) || '{}');
//     };
    
//     loadFreshData();
//   }, [refresh]);
  
//   const faculty = AppState.faculty.find(f => f.id === user.id);
//   const preference = AppState.getPreferenceByFacultyId(user.id);
//   const courseDetails = AppState.getCourseDetailsByFacultyId(user.id);
//   const schedule = AppState.getFacultySchedule(user.id);
  
//   // Status checks for the workflow
//   const preferencePending = preference?.submitted && preference?.status === "pending";
//   const preferenceApproved = preference?.status === "approved";
//   const preferenceRejected = preference?.status === "rejected";
  
//   // Course details status
//   const courseDetailsPending = courseDetails.length > 0 && courseDetails.every(c => c.deanStatus === "pending");
//   const courseDetailsApproved = courseDetails.length > 0 && courseDetails.every(c => c.deanStatus === "approved");
//   const courseDetailsRejected = courseDetails.length > 0 && courseDetails.every(c => c.deanStatus === "rejected");
  
//   // Check if form is floated and deadline hasn't passed
//   const isFormOpen = formStatus.isFloated && (!formStatus.deadline || new Date() <= new Date(formStatus.deadline));
//   const isDeadlinePassed = formStatus.deadline && new Date() > new Date(formStatus.deadline);
  
//   const forceUpdate = () => {
//     setRefresh(r => r + 1);
//     window.dispatchEvent(new Event('storage'));
//   };
  
//   const FAC_NAV = [
//     { id: "forms", icon: "📝", label: "Preference Forms" },
//     { id: "status", icon: "📊", label: "Submission Status" },
//     { id: "syllabus", icon: "📚", label: "Syllabus Tracker" },
//     { id: "schedule", icon: "📅", label: "My Schedule" },
//     { id: "requestLeave", icon: "📝", label: "Request Leave" },
//     { id: "myLeaves", icon: "📋", label: "My Leave Requests" },
//     { id: "profile", icon: "👤", label: "Profile" },
//   ];
  
//   const panels = {
//     forms: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//         <Title>Faculty Onboarding Forms - {faculty?.course}</Title>
        
//         {/* Form Status Message */}
//         {!formStatus.isFloated && (
//           <Card style={{ background: C.accent.goldBg, textAlign: "center" }}>
//             <div style={{ padding: "20px" }}>
//               <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
//               <h3 style={{ color: C.accent.gold, marginBottom: 8 }}>Preference Form Not Yet Available</h3>
//               <p style={{ color: C.text.secondary }}>
//                 The preference form has not been floated by the Director yet. 
//                 Please check back later when the form is released.
//               </p>
//             </div>
//           </Card>
//         )}
        
//         {formStatus.isFloated && isDeadlinePassed && (
//           <Card style={{ background: C.accent.redBg, textAlign: "center" }}>
//             <div style={{ padding: "20px" }}>
//               <div style={{ fontSize: 48, marginBottom: 16 }}>⏰</div>
//               <h3 style={{ color: C.accent.red, marginBottom: 8 }}>Submission Deadline Passed</h3>
//               <p style={{ color: C.text.secondary }}>
//                 The submission deadline ({new Date(formStatus.deadline).toLocaleString()}) has passed.
//                 You cannot submit preferences at this time.
//               </p>
//             </div>
//           </Card>
//         )}
        
//         {/* Show preference form if open and not submitted */}
//         {formStatus.isFloated && !isDeadlinePassed && !preference?.submitted && (
//           <>
//             <div style={{ padding: 12, background: C.accent.greenBg, borderRadius: 8, marginBottom: 8 }}>
//               <p style={{ color: C.accent.green, margin: 0, textAlign: "center" }}>
//                 ✓ Preference form is OPEN! Please submit your preferences before {new Date(formStatus.deadline).toLocaleString()}
//               </p>
//             </div>
//             <FacultyPreferenceForm faculty={faculty} onComplete={forceUpdate} />
//           </>
//         )}
        
//         {/* Waiting for Dean Approval */}
//         {preferencePending && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.goldBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ⏳
//               </div>
//               <div>
//                 <h4 style={{ color: C.text.primary, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Subject Preferences Submitted</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Waiting for Dean's approval.</p>
//                 {preference.feedback && (
//                   <p style={{ color: C.accent.gold, fontSize: 13, marginTop: 8 }}>Feedback: {preference.feedback}</p>
//                 )}
//               </div>
//             </div>
//           </Card>
//         )}
        
//         {/* Preferences Rejected by Dean */}
//         {preferenceRejected && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.redBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ✗
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.red, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Subject Preferences Rejected</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Please revise and resubmit.</p>
//                 {preference.feedback && (
//                   <p style={{ color: C.accent.red, fontSize: 13, marginTop: 8 }}>Feedback: {preference.feedback}</p>
//                 )}
//               </div>
//             </div>
//             {isFormOpen ? (
//               <Button onClick={() => { AppState.resetPreferenceForm(faculty.id); forceUpdate(); }} variant="primary" fullWidth>
//                 Resubmit Preferences
//               </Button>
//             ) : (
//               <p style={{ color: C.accent.red, textAlign: "center" }}>
//                 The preference form is currently closed. Cannot resubmit at this time.
//               </p>
//             )}
//           </Card>
//         )}
        
//         {/* Preferences Approved by Dean - Show Detailed Course Form */}
//         {preferenceApproved && courseDetails.length === 0 && (
//           <FacultyDetailedCourseForm 
//             faculty={faculty} 
//             allocatedSubjects={preference.preferences?.map(p => p.subjectId)} 
//             onComplete={forceUpdate} 
//           />
//         )}
        
//         {/* Course Details Submitted - Waiting for Dean Approval */}
//         {preferenceApproved && courseDetails.length > 0 && courseDetailsPending && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.goldBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ⏳
//               </div>
//               <div>
//                 <h4 style={{ color: C.text.primary, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Detailed Course Information Submitted</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Waiting for Dean's approval.</p>
//               </div>
//             </div>
//           </Card>
//         )}
        
//         {/* Course Details Rejected by Dean */}
//         {courseDetailsRejected && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.redBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ✗
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.red, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Course Details Rejected</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Please review the feedback and resubmit.</p>
//                 {courseDetails[0]?.deanFeedback && (
//                   <p style={{ color: C.accent.red, fontSize: 13, marginTop: 8 }}>Feedback: {courseDetails[0].deanFeedback}</p>
//                 )}
//               </div>
//             </div>
//             <Button onClick={() => {
//               AppState.courseDetails = AppState.courseDetails.filter(c => c.facultyId !== faculty.id);
//               saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
//               forceUpdate();
//             }} variant="primary" fullWidth>
//               Resubmit Course Details
//             </Button>
//           </Card>
//         )}
        
//         {/* Course Details Approved by Dean - Final Step */}
//         {courseDetailsApproved && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.greenBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ✓
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.green, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>All Forms Approved by Dean!</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Your schedule has been generated. Use the Syllabus Tracker to update module completion.</p>
//               </div>
//             </div>
//           </Card>
//         )}
//       </div>
//     ),
    
//     status: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//         <Title>Submission Status - {faculty?.course}</Title>
        
//         <Card>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//             <span style={{ color: C.text.primary, fontWeight: 600 }}>Form Status</span>
//             <Badge variant={formStatus.isFloated ? "success" : "warning"}>
//               {formStatus.isFloated ? "Open" : "Not Yet Released"}
//             </Badge>
//           </div>
//           {formStatus.isFloated && formStatus.deadline && (
//             <p style={{ color: C.text.secondary, fontSize: 13, marginBottom: 16 }}>
//               Deadline: {new Date(formStatus.deadline).toLocaleString()}
//             </p>
//           )}
//         </Card>
        
//         <Card>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//             <span style={{ color: C.text.primary, fontWeight: 600 }}>Subject Preferences</span>
//             <Badge variant={
//               preference?.status === "approved" ? "success" : 
//               preference?.status === "pending" ? "warning" : "danger"
//             }>
//               {preference?.status === "approved" ? "Approved by Dean" : 
//                preference?.status === "pending" ? "Pending Dean Approval" : 
//                preference?.status === "rejected" ? "Rejected" : "Not Submitted"}
//             </Badge>
//           </div>
//           {preference?.submitted && (
//             <div>
//               {preference.preferences?.map(p => {
//                 const subject = AppState.subjects.find(s => s.id === p.subjectId);
//                 return (
//                   <div key={p.level} style={{
//                     padding: "8px 12px",
//                     background: C.cardHover,
//                     borderRadius: 8,
//                     marginBottom: 4,
//                   }}>
//                     <span style={{ color: p.level === 1 ? C.accent.gold : p.level === 2 ? C.accent.blue : C.accent.green }}>
//                       Preference {p.level}:
//                     </span>
//                     <span style={{ color: C.text.primary, marginLeft: 8 }}>{subject?.name}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </Card>
        
//         <Card>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//             <span style={{ color: C.text.primary, fontWeight: 600 }}>Detailed Course Information</span>
//             {courseDetails.length > 0 ? (
//               <div style={{ display: "flex", gap: 8 }}>
//                 <Badge variant={courseDetails.every(c => c.deanStatus === "approved") ? "success" : "warning"}>
//                   Dean: {courseDetails.every(c => c.deanStatus === "approved") ? "Approved" : "Pending"}
//                 </Badge>
//               </div>
//             ) : (
//               <Badge variant="danger">Locked (Complete Preferences First)</Badge>
//             )}
//           </div>
//           {courseDetails.map(c => (
//             <div key={c.id} style={{
//               padding: "12px",
//               background: C.cardHover,
//               borderRadius: 8,
//               marginBottom: 8,
//             }}>
//               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
//                 <span style={{ color: C.accent.blue, fontWeight: 500 }}>{c.subjectName}</span>
//                 <Badge variant={c.deanStatus === "approved" ? "success" : "warning"}>
//                   {c.deanStatus === "approved" ? "Dean Approved" : "Pending Dean"}
//                 </Badge>
//               </div>
//               <div style={{ display: "flex", gap: 16, fontSize: 12, color: C.text.tertiary }}>
//                 <span>{c.credits} Credits</span>
//                 <span>{c.modules} Modules</span>
//                 <span>Semester {c.semester}</span>
//               </div>
//               {c.deanFeedback && (
//                 <p style={{ color: C.accent.red, fontSize: 11, marginTop: 8 }}>Feedback: {c.deanFeedback}</p>
//               )}
//             </div>
//           ))}
//         </Card>
//       </div>
//     ),
    
//     syllabus: <FacultySyllabusTracker faculty={faculty} />,
    
//     schedule: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//         <Title>My Weekly Schedule</Title>
//         {schedule.length === 0 ? (
//           <Card>
//             <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>
//               {courseDetailsApproved ? "Schedule being generated..." : "Complete all forms and wait for dean's approval to see your schedule"}
//             </p>
//           </Card>
//         ) : (
//           <>
//             <WeeklyTimetableView schedule={schedule} title={`${faculty?.name} - ${faculty?.course}`} />
//             <Card>
//               <Title level={4}>Suggest Timetable Change</Title>
//               <p>If you notice any conflict or have a suggestion, please raise an issue.</p>
//               <Button
//                 onClick={() => {
//                   const reason = prompt("Describe your suggestion or conflict:");
//                   if (reason) {
//                     const newIssue = {
//                       id: Date.now(),
//                       type: "timetable_suggestion",
//                       facultyId: faculty.id,
//                       facultyName: faculty.name,
//                       reason,
//                       status: "pending",
//                       timestamp: new Date().toISOString(),
//                     };
//                     AppState.flaggedIssues.push(newIssue);
//                     saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
//                     alert("Issue raised. Director will review.");
//                   }
//                 }}
//                 variant="warning"
//               >
//                 Raise Issue
//               </Button>
//             </Card>
//           </>
//         )}
//       </div>
//     ),
    
//     requestLeave: <LeaveRequestForm faculty={faculty} onComplete={forceUpdate} />,
    
//     myLeaves: <FacultyLeaveStatus facultyId={faculty?.id} />,
    
//     profile: (
//       <Card>
//         <Title level={4}>Faculty Profile</Title>
//         <div style={{ display: "flex", gap: 32, alignItems: "center", marginTop: 20, flexWrap: "wrap" }}>
//           <div style={{
//             width: 100,
//             height: 100,
//             borderRadius: "50%",
//             background: `${faculty?.color}20`,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: 36,
//             fontWeight: 700,
//             color: faculty?.color,
//           }}>
//             {faculty?.avatar}
//           </div>
//           <div>
//             <h3 style={{ color: C.text.primary, fontSize: 24, fontWeight: 600, marginBottom: 8 }}>{faculty?.name}</h3>
//             <p style={{ color: C.accent.blue, fontSize: 15, marginBottom: 4 }}>ID: {faculty?.facultyId}</p>
//             <p style={{ color: C.accent.blue, fontSize: 15, marginBottom: 4 }}>{faculty?.designation}</p>
//             <p style={{ color: C.text.secondary, fontSize: 14, marginBottom: 4 }}>Course: {faculty?.course}</p>
//             <p style={{ color: C.text.secondary, fontSize: 14 }}>Specialization: {faculty?.specialization}</p>
//           </div>
//         </div>
        
//         <div style={{ marginTop: 24, padding: 16, background: C.cardHover, borderRadius: 12 }}>
//           <h5 style={{ color: C.text.primary, fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Workload Information</h5>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
//             <div>
//               <span style={{ color: C.text.tertiary, fontSize: 12 }}>Max Hours/Week</span>
//               <p style={{ color: C.accent.blue, fontSize: 20, fontWeight: 600 }}>{faculty?.maxHours}h</p>
//             </div>
//             <div>
//               <span style={{ color: C.text.tertiary, fontSize: 12 }}>Assigned Hours</span>
//               <p style={{ color: C.accent.gold, fontSize: 20, fontWeight: 600 }}>{faculty?.assignedHours || 0}h</p>
//             </div>
//             <div>
//               <span style={{ color: C.text.tertiary, fontSize: 12 }}>Remaining Hours</span>
//               <p style={{ color: C.accent.green, fontSize: 20, fontWeight: 600 }}>{faculty?.remainingHours || faculty?.maxHours}h</p>
//             </div>
//           </div>
//         </div>
//       </Card>
//     ),
//   };

//   if (!faculty) {
//     return (
//       <div style={{ display: "flex", minHeight: "100vh", background: C.bg, alignItems: "center", justifyContent: "center" }}>
//         <Card>
//           <p style={{ color: C.text.tertiary, textAlign: "center" }}>Loading faculty data...</p>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
//       <Sidebar 
//         navItems={FAC_NAV} 
//         active={active} 
//         setActive={setActive} 
//         collapsed={collapsed} 
//         setCollapsed={setCollapsed} 
//         user={user} 
//         badges={{ forms: preference?.status === "pending" ? 1 : 0 }} 
//         accentColor={C.accent.blue} 
//       />
//       <main style={{ flex: 1, overflow: "auto" }}>
//         <header style={{
//           background: C.nav,
//           borderBottom: `1px solid ${C.navBorder}`,
//           padding: "16px 32px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           position: "sticky",
//           top: 0,
//           zIndex: 10,
//           flexWrap: "wrap",
//           gap: 12,
//         }}>
//           <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>{FAC_NAV.find(n => n.id === active)?.label}</h2>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             {formStatus.isFloated && !preference?.submitted && (
//               <Badge variant="success">Form Open</Badge>
//             )}
//             {!formStatus.isFloated && (
//               <Badge variant="warning">Form Closed</Badge>
//             )}
//             <Badge variant={
//               preference?.status === "approved" ? "success" : 
//               preference?.status === "pending" ? "warning" : "danger"
//             }>
//               {preference?.status === "approved" ? "Dean Approved" : 
//                preference?.status === "pending" ? "Pending Dean" : 
//                preference?.status === "rejected" ? "Rejected" : "Not Started"}
//             </Badge>
//           </div>
//         </header>
//         <div style={{ padding: 32 }}>{panels[active]}</div>
//       </main>
//     </div>
//   );
// }

// // src/components/faculty/FacultyDashboard.jsx
// import { useState, useEffect } from "react";
// import { useAuth } from "../auth/AuthContext";
// import { Sidebar, Card, Title, Badge, Button } from "../common";
// import { WeeklyTimetableView } from "../shared/WeeklyTimetableView";
// import { FacultyPreferenceForm } from "./FacultyPreferenceForm";
// import { FacultyDetailedCourseForm } from "./FacultyDetailedCourseForm";
// import { FacultySyllabusTracker } from "./FacultySyllabusTracker";
// import { LeaveRequestForm } from "./LeaveRequestForm";
// import { FacultyLeaveStatus } from "./FacultyLeaveStatus";
// import { AppState } from "../../AppState";
// import { C } from "../../styles/theme";
// import { saveToStorage, STORAGE_KEYS, loadFromStorage } from "../../utils/storage";

// export function FacultyDashboard() {
//   const { user } = useAuth();
//   const [active, setActive] = useState("forms");
//   const [collapsed, setCollapsed] = useState(false);
//   const [refresh, setRefresh] = useState(0);
//   const [formStatus, setFormStatus] = useState({
//     isFloated: false,
//     floatedDate: null,
//     floatedBy: null,
//     semester: "2025",
//     deadline: null
//   });
  
//   // Listen for storage changes
//   useEffect(() => {
//     const handleStorageChange = () => {
//       loadFormStatus();
//       setRefresh(r => r + 1);
//     };
    
//     loadFormStatus();
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const loadFormStatus = () => {
//     const savedStatus = loadFromStorage(STORAGE_KEYS.FORM_STATUS, {
//       isFloated: false,
//       floatedDate: null,
//       floatedBy: null,
//       semester: "2025",
//       deadline: null
//     });
//     setFormStatus(savedStatus);
//   };
  
//   // Get fresh data on refresh
//   useEffect(() => {
//     const loadFreshData = () => {
//       AppState.faculty = JSON.parse(localStorage.getItem(STORAGE_KEYS.FACULTY) || '[]');
//       AppState.subjects = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBJECTS) || '[]');
//       AppState.subjectPreferences = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBJECT_PREFERENCES) || '[]');
//       AppState.courseDetails = JSON.parse(localStorage.getItem(STORAGE_KEYS.COURSE_DETAILS) || '[]');
//       AppState.semesterDetails = JSON.parse(localStorage.getItem(STORAGE_KEYS.SEMESTER_DETAILS) || '{}');
//     };
    
//     loadFreshData();
//   }, [refresh]);
  
//   const faculty = AppState.faculty.find(f => f.id === user.id);
//   const preference = AppState.getPreferenceByFacultyId(user.id);
//   const courseDetails = AppState.getCourseDetailsByFacultyId(user.id);
//   const schedule = AppState.getFacultySchedule(user.id);
  
//   // Status checks for the workflow
//   const preferencePending = preference?.submitted && preference?.status === "pending";
//   const preferenceApproved = preference?.status === "approved";
//   const preferenceRejected = preference?.status === "rejected";
  
//   // Course details status
//   const courseDetailsPending = courseDetails.length > 0 && courseDetails.every(c => c.deanStatus === "pending");
//   const courseDetailsApproved = courseDetails.length > 0 && courseDetails.every(c => c.deanStatus === "approved");
//   const courseDetailsRejected = courseDetails.length > 0 && courseDetails.every(c => c.deanStatus === "rejected");
  
//   // Check if form is floated and deadline hasn't passed
//   const isFormOpen = formStatus.isFloated && (!formStatus.deadline || new Date() <= new Date(formStatus.deadline));
//   const isDeadlinePassed = formStatus.deadline && new Date() > new Date(formStatus.deadline);
  
//   const forceUpdate = () => {
//     setRefresh(r => r + 1);
//     window.dispatchEvent(new Event('storage'));
//   };
  
//   const FAC_NAV = [
//     { id: "forms", icon: "📝", label: "Preference Forms" },
//     { id: "status", icon: "📊", label: "Submission Status" },
//     { id: "syllabus", icon: "📚", label: "Syllabus Tracker" },
//     { id: "schedule", icon: "📅", label: "My Schedule" },
//     { id: "requestLeave", icon: "📝", label: "Request Leave" },
//     { id: "myLeaves", icon: "📋", label: "My Leave Requests" },
//     { id: "profile", icon: "👤", label: "Profile" },
//   ];
  
//   const panels = {
//     forms: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//         <Title>Faculty Onboarding Forms - {faculty?.course}</Title>
        
//         {/* Form Status Message */}
//         {!formStatus.isFloated && (
//           <Card style={{ background: C.accent.goldBg, textAlign: "center" }}>
//             <div style={{ padding: "20px" }}>
//               <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
//               <h3 style={{ color: C.accent.gold, marginBottom: 8 }}>Preference Form Not Yet Available</h3>
//               <p style={{ color: C.text.secondary }}>
//                 The preference form has not been floated by the Director yet. 
//                 Please check back later when the form is released.
//               </p>
//             </div>
//           </Card>
//         )}
        
//         {formStatus.isFloated && isDeadlinePassed && (
//           <Card style={{ background: C.accent.redBg, textAlign: "center" }}>
//             <div style={{ padding: "20px" }}>
//               <div style={{ fontSize: 48, marginBottom: 16 }}>⏰</div>
//               <h3 style={{ color: C.accent.red, marginBottom: 8 }}>Submission Deadline Passed</h3>
//               <p style={{ color: C.text.secondary }}>
//                 The submission deadline ({new Date(formStatus.deadline).toLocaleString()}) has passed.
//                 You cannot submit preferences at this time.
//               </p>
//             </div>
//           </Card>
//         )}
        
//         {/* Show preference form if open and not submitted */}
//         {formStatus.isFloated && !isDeadlinePassed && !preference?.submitted && (
//           <>
//             <div style={{ padding: 12, background: C.accent.greenBg, borderRadius: 8, marginBottom: 8 }}>
//               <p style={{ color: C.accent.green, margin: 0, textAlign: "center" }}>
//                 ✓ Preference form is OPEN! Please submit your preferences before {new Date(formStatus.deadline).toLocaleString()}
//               </p>
//             </div>
//             <FacultyPreferenceForm faculty={faculty} onComplete={forceUpdate} />
//           </>
//         )}
        
//         {/* Waiting for Dean Approval */}
//         {preferencePending && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.goldBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ⏳
//               </div>
//               <div>
//                 <h4 style={{ color: C.text.primary, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Subject Preferences Submitted</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Waiting for Dean's approval.</p>
//                 {preference.feedback && (
//                   <p style={{ color: C.accent.gold, fontSize: 13, marginTop: 8 }}>Feedback: {preference.feedback}</p>
//                 )}
//               </div>
//             </div>
//           </Card>
//         )}
        
//         {/* Preferences Rejected by Dean */}
//         {preferenceRejected && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.redBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ✗
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.red, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Subject Preferences Rejected</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Please revise and resubmit.</p>
//                 {preference.feedback && (
//                   <p style={{ color: C.accent.red, fontSize: 13, marginTop: 8 }}>Feedback: {preference.feedback}</p>
//                 )}
//               </div>
//             </div>
//             {isFormOpen ? (
//               <Button onClick={() => { AppState.resetPreferenceForm(faculty.id); forceUpdate(); }} variant="primary" fullWidth>
//                 Resubmit Preferences
//               </Button>
//             ) : (
//               <p style={{ color: C.accent.red, textAlign: "center" }}>
//                 The preference form is currently closed. Cannot resubmit at this time.
//               </p>
//             )}
//           </Card>
//         )}
        
//         {/* Preferences Approved by Dean - Show Detailed Course Form */}
//         {preferenceApproved && courseDetails.length === 0 && (
//           <FacultyDetailedCourseForm 
//             faculty={faculty} 
//             allocatedSubjects={preference.preferences?.map(p => p.subjectId)} 
//             onComplete={forceUpdate} 
//           />
//         )}
        
//         {/* Course Details Submitted - Waiting for Dean Approval */}
//         {preferenceApproved && courseDetails.length > 0 && courseDetailsPending && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.goldBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ⏳
//               </div>
//               <div>
//                 <h4 style={{ color: C.text.primary, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Detailed Course Information Submitted</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Waiting for Dean's approval.</p>
//               </div>
//             </div>
//           </Card>
//         )}
        
//         {/* Course Details Rejected by Dean */}
//         {courseDetailsRejected && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.redBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ✗
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.red, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Course Details Rejected</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Please review the feedback and resubmit.</p>
//                 {courseDetails[0]?.deanFeedback && (
//                   <p style={{ color: C.accent.red, fontSize: 13, marginTop: 8 }}>Feedback: {courseDetails[0].deanFeedback}</p>
//                 )}
//               </div>
//             </div>
//             <Button onClick={() => {
//               AppState.courseDetails = AppState.courseDetails.filter(c => c.facultyId !== faculty.id);
//               saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
//               forceUpdate();
//             }} variant="primary" fullWidth>
//               Resubmit Course Details
//             </Button>
//           </Card>
//         )}
        
//         {/* Course Details Approved by Dean - Final Step */}
//         {courseDetailsApproved && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.greenBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ✓
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.green, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>All Forms Approved by Dean!</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Your schedule has been generated. Use the Syllabus Tracker to update module completion.</p>
//               </div>
//             </div>
//           </Card>
//         )}
//       </div>
//     ),
    
//     status: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//         <Title>Submission Status - {faculty?.course}</Title>
        
//         <Card>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//             <span style={{ color: C.text.primary, fontWeight: 600 }}>Form Status</span>
//             <Badge variant={formStatus.isFloated ? "success" : "warning"}>
//               {formStatus.isFloated ? "Open" : "Not Yet Released"}
//             </Badge>
//           </div>
//           {formStatus.isFloated && formStatus.deadline && (
//             <p style={{ color: C.text.secondary, fontSize: 13, marginBottom: 16 }}>
//               Deadline: {new Date(formStatus.deadline).toLocaleString()}
//             </p>
//           )}
//         </Card>
        
//         <Card>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//             <span style={{ color: C.text.primary, fontWeight: 600 }}>Subject Preferences</span>
//             <Badge variant={
//               preference?.status === "approved" ? "success" : 
//               preference?.status === "pending" ? "warning" : "danger"
//             }>
//               {preference?.status === "approved" ? "Approved by Dean" : 
//                preference?.status === "pending" ? "Pending Dean Approval" : 
//                preference?.status === "rejected" ? "Rejected" : "Not Submitted"}
//             </Badge>
//           </div>
//           {preference?.submitted && (
//             <div>
//               {preference.preferences?.map(p => {
//                 const subject = AppState.subjects.find(s => s.id === p.subjectId);
//                 return (
//                   <div key={p.level} style={{
//                     padding: "8px 12px",
//                     background: C.cardHover,
//                     borderRadius: 8,
//                     marginBottom: 4,
//                   }}>
//                     <span style={{ color: p.level === 1 ? C.accent.gold : p.level === 2 ? C.accent.blue : C.accent.green }}>
//                       Preference {p.level}:
//                     </span>
//                     <span style={{ color: C.text.primary, marginLeft: 8 }}>{subject?.name}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </Card>
        
//         <Card>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//             <span style={{ color: C.text.primary, fontWeight: 600 }}>Detailed Course Information</span>
//             {courseDetails.length > 0 ? (
//               <div style={{ display: "flex", gap: 8 }}>
//                 <Badge variant={courseDetails.every(c => c.deanStatus === "approved") ? "success" : "warning"}>
//                   Dean: {courseDetails.every(c => c.deanStatus === "approved") ? "Approved" : "Pending"}
//                 </Badge>
//               </div>
//             ) : (
//               <Badge variant="danger">Locked (Complete Preferences First)</Badge>
//             )}
//           </div>
//           {courseDetails.map(c => (
//             <div key={c.id} style={{
//               padding: "12px",
//               background: C.cardHover,
//               borderRadius: 8,
//               marginBottom: 8,
//             }}>
//               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
//                 <span style={{ color: C.accent.blue, fontWeight: 500 }}>{c.subjectName}</span>
//                 <Badge variant={c.deanStatus === "approved" ? "success" : "warning"}>
//                   {c.deanStatus === "approved" ? "Dean Approved" : "Pending Dean"}
//                 </Badge>
//               </div>
//               <div style={{ display: "flex", gap: 16, fontSize: 12, color: C.text.tertiary }}>
//                 <span>{c.credits} Credits</span>
//                 <span>{c.modules} Modules</span>
//                 <span>Semester {c.semester}</span>
//               </div>
//               {c.deanFeedback && (
//                 <p style={{ color: C.accent.red, fontSize: 11, marginTop: 8 }}>Feedback: {c.deanFeedback}</p>
//               )}
//             </div>
//           ))}
//         </Card>
//       </div>
//     ),
    
//     syllabus: <FacultySyllabusTracker faculty={faculty} />,
    
//     schedule: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//         <Title>My Weekly Schedule</Title>
//         {schedule.length === 0 ? (
//           <Card>
//             <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>
//               {courseDetailsApproved ? "Schedule being generated..." : "Complete all forms and wait for dean's approval to see your schedule"}
//             </p>
//           </Card>
//         ) : (
//           <>
//             <WeeklyTimetableView schedule={schedule} title={`${faculty?.name} - ${faculty?.course}`} />
//             <Card>
//               <Title level={4}>Suggest Timetable Change</Title>
//               <p>If you notice any conflict or have a suggestion, please raise an issue.</p>
//               <Button
//                 onClick={() => {
//                   const reason = prompt("Describe your suggestion or conflict:");
//                   if (reason) {
//                     const newIssue = {
//                       id: Date.now(),
//                       type: "timetable_suggestion",
//                       facultyId: faculty.id,
//                       facultyName: faculty.name,
//                       reason,
//                       status: "pending",
//                       timestamp: new Date().toISOString(),
//                     };
//                     AppState.flaggedIssues.push(newIssue);
//                     saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
//                     alert("Issue raised. Director will review.");
//                   }
//                 }}
//                 variant="warning"
//               >
//                 Raise Issue
//               </Button>
//             </Card>
//           </>
//         )}
//       </div>
//     ),
    
//     requestLeave: <LeaveRequestForm faculty={faculty} onComplete={forceUpdate} />,
    
//     myLeaves: <FacultyLeaveStatus facultyId={faculty?.id} />,
    
//     profile: (
//       <Card>
//         <Title level={4}>Faculty Profile</Title>
//         <div style={{ display: "flex", gap: 32, alignItems: "center", marginTop: 20, flexWrap: "wrap" }}>
//           <div style={{
//             width: 100,
//             height: 100,
//             borderRadius: "50%",
//             background: `${faculty?.color}20`,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: 36,
//             fontWeight: 700,
//             color: faculty?.color,
//           }}>
//             {faculty?.avatar}
//           </div>
//           <div>
//             <h3 style={{ color: C.text.primary, fontSize: 24, fontWeight: 600, marginBottom: 8 }}>{faculty?.name}</h3>
//             <p style={{ color: C.accent.blue, fontSize: 15, marginBottom: 4 }}>ID: {faculty?.facultyId}</p>
//             <p style={{ color: C.accent.blue, fontSize: 15, marginBottom: 4 }}>{faculty?.designation}</p>
//             <p style={{ color: C.text.secondary, fontSize: 14, marginBottom: 4 }}>Course: {faculty?.course}</p>
//             <p style={{ color: C.text.secondary, fontSize: 14 }}>Specialization: {faculty?.specialization}</p>
//           </div>
//         </div>
        
//         <div style={{ marginTop: 24, padding: 16, background: C.cardHover, borderRadius: 12 }}>
//           <h5 style={{ color: C.text.primary, fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Workload Information</h5>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
//             <div>
//               <span style={{ color: C.text.tertiary, fontSize: 12 }}>Max Hours/Week</span>
//               <p style={{ color: C.accent.blue, fontSize: 20, fontWeight: 600 }}>{faculty?.maxHours}h</p>
//             </div>
//             <div>
//               <span style={{ color: C.text.tertiary, fontSize: 12 }}>Assigned Hours</span>
//               <p style={{ color: C.accent.gold, fontSize: 20, fontWeight: 600 }}>{faculty?.assignedHours || 0}h</p>
//             </div>
//             <div>
//               <span style={{ color: C.text.tertiary, fontSize: 12 }}>Remaining Hours</span>
//               <p style={{ color: C.accent.green, fontSize: 20, fontWeight: 600 }}>{faculty?.remainingHours || faculty?.maxHours}h</p>
//             </div>
//           </div>
//         </div>
//       </Card>
//     ),
//   };

//   if (!faculty) {
//     return (
//       <div style={{ display: "flex", minHeight: "100vh", background: C.bg, alignItems: "center", justifyContent: "center" }}>
//         <Card>
//           <p style={{ color: C.text.tertiary, textAlign: "center" }}>Loading faculty data...</p>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
//       <Sidebar 
//         navItems={FAC_NAV} 
//         active={active} 
//         setActive={setActive} 
//         collapsed={collapsed} 
//         setCollapsed={setCollapsed} 
//         user={user} 
//         badges={{ forms: preference?.status === "pending" ? 1 : 0 }} 
//         accentColor={C.accent.blue} 
//       />
//       <main style={{ flex: 1, overflow: "auto" }}>
//         <header style={{
//           background: C.nav,
//           borderBottom: `1px solid ${C.navBorder}`,
//           padding: "16px 32px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           position: "sticky",
//           top: 0,
//           zIndex: 10,
//           flexWrap: "wrap",
//           gap: 12,
//         }}>
//           <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>{FAC_NAV.find(n => n.id === active)?.label}</h2>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             {formStatus.isFloated && !preference?.submitted && (
//               <Badge variant="success">Form Open</Badge>
//             )}
//             {!formStatus.isFloated && (
//               <Badge variant="warning">Form Closed</Badge>
//             )}
//             <Badge variant={
//               preference?.status === "approved" ? "success" : 
//               preference?.status === "pending" ? "warning" : "danger"
//             }>
//               {preference?.status === "approved" ? "Dean Approved" : 
//                preference?.status === "pending" ? "Pending Dean" : 
//                preference?.status === "rejected" ? "Rejected" : "Not Started"}
//             </Badge>
//           </div>
//         </header>
//         <div style={{ padding: 32 }}>{panels[active]}</div>
//       </main>
//     </div>
//   );
// }

// // src/components/faculty/FacultyDashboard.jsx
// import { useState, useEffect } from "react";
// import { useAuth } from "../auth/AuthContext";
// import { Sidebar, Card, Title, Badge, Button } from "../common";
// import { WeeklyTimetableView } from "../shared/WeeklyTimetableView";
// import { FacultyPreferenceForm } from "./FacultyPreferenceForm";
// import { FacultyDetailedCourseForm } from "./FacultyDetailedCourseForm";
// import { FacultySyllabusTracker } from "./FacultySyllabusTracker";
// import { LeaveRequestForm } from "./LeaveRequestForm";
// import { FacultyLeaveStatus } from "./FacultyLeaveStatus";
// import { FacultyAppointments } from "./FacultyAppointments";
// import { AppState } from "../../AppState";
// import { C } from "../../styles/theme";
// import { saveToStorage, STORAGE_KEYS, loadFromStorage } from "../../utils/storage";

// export function FacultyDashboard() {
//   const { user } = useAuth();
//   const [active, setActive] = useState("forms");
//   const [collapsed, setCollapsed] = useState(false);
//   const [refresh, setRefresh] = useState(0);
//   const [formStatus, setFormStatus] = useState({
//     isFloated: false,
//     floatedDate: null,
//     floatedBy: null,
//     semester: "2025",
//     deadline: null
//   });
  
//   // Listen for storage changes
//   useEffect(() => {
//     const handleStorageChange = () => {
//       loadFormStatus();
//       setRefresh(r => r + 1);
//     };
    
//     loadFormStatus();
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const loadFormStatus = () => {
//     const savedStatus = loadFromStorage(STORAGE_KEYS.FORM_STATUS, {
//       isFloated: false,
//       floatedDate: null,
//       floatedBy: null,
//       semester: "2025",
//       deadline: null
//     });
//     setFormStatus(savedStatus);
//   };
  
//   // Get fresh data on refresh
//   useEffect(() => {
//     const loadFreshData = () => {
//       AppState.faculty = JSON.parse(localStorage.getItem(STORAGE_KEYS.FACULTY) || '[]');
//       AppState.subjects = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBJECTS) || '[]');
//       AppState.subjectPreferences = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBJECT_PREFERENCES) || '[]');
//       AppState.courseDetails = JSON.parse(localStorage.getItem(STORAGE_KEYS.COURSE_DETAILS) || '[]');
//       AppState.semesterDetails = JSON.parse(localStorage.getItem(STORAGE_KEYS.SEMESTER_DETAILS) || '{}');
//     };
    
//     loadFreshData();
//   }, [refresh]);
  
//   const faculty = AppState.faculty.find(f => f.id === user.id);
//   const preference = AppState.getPreferenceByFacultyId(user.id);
//   const courseDetails = AppState.getCourseDetailsByFacultyId(user.id);
//   const schedule = AppState.getFacultySchedule(user.id);
  
//   // Status checks for the workflow
//   const preferencePending = preference?.submitted && preference?.status === "pending";
//   const preferenceApproved = preference?.status === "approved";
//   const preferenceRejected = preference?.status === "rejected";
  
//   // Course details status
//   const courseDetailsPending = courseDetails.length > 0 && courseDetails.every(c => c.deanStatus === "pending");
//   const courseDetailsApproved = courseDetails.length > 0 && courseDetails.every(c => c.deanStatus === "approved");
//   const courseDetailsRejected = courseDetails.length > 0 && courseDetails.every(c => c.deanStatus === "rejected");
  
//   // Check if form is floated and deadline hasn't passed
//   const isFormOpen = formStatus.isFloated && (!formStatus.deadline || new Date() <= new Date(formStatus.deadline));
//   const isDeadlinePassed = formStatus.deadline && new Date() > new Date(formStatus.deadline);
  
//   const forceUpdate = () => {
//     setRefresh(r => r + 1);
//     window.dispatchEvent(new Event('storage'));
//   };
  
//   const FAC_NAV = [
//     { id: "forms", icon: "📝", label: "Preference Forms" },
//     { id: "status", icon: "📊", label: "Submission Status" },
//     { id: "syllabus", icon: "📚", label: "Syllabus Tracker" },
//     { id: "schedule", icon: "📅", label: "My Schedule" },
//     { id: "appointments", icon: "📅", label: "Appointments" },
//     { id: "requestLeave", icon: "📝", label: "Request Leave" },
//     { id: "myLeaves", icon: "📋", label: "My Leave Requests" },
//     { id: "profile", icon: "👤", label: "Profile" },
//   ];
  
//   const panels = {
//     forms: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//         <Title>Faculty Onboarding Forms - {faculty?.course}</Title>
        
//         {/* Form Status Message */}
//         {!formStatus.isFloated && (
//           <Card style={{ background: C.accent.goldBg, textAlign: "center" }}>
//             <div style={{ padding: "20px" }}>
//               <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
//               <h3 style={{ color: C.accent.gold, marginBottom: 8 }}>Preference Form Not Yet Available</h3>
//               <p style={{ color: C.text.secondary }}>
//                 The preference form has not been floated by the Director yet. 
//                 Please check back later when the form is released.
//               </p>
//             </div>
//           </Card>
//         )}
        
//         {formStatus.isFloated && isDeadlinePassed && (
//           <Card style={{ background: C.accent.redBg, textAlign: "center" }}>
//             <div style={{ padding: "20px" }}>
//               <div style={{ fontSize: 48, marginBottom: 16 }}>⏰</div>
//               <h3 style={{ color: C.accent.red, marginBottom: 8 }}>Submission Deadline Passed</h3>
//               <p style={{ color: C.text.secondary }}>
//                 The submission deadline ({new Date(formStatus.deadline).toLocaleString()}) has passed.
//                 You cannot submit preferences at this time.
//               </p>
//             </div>
//           </Card>
//         )}
        
//         {/* Show preference form if open and not submitted */}
//         {formStatus.isFloated && !isDeadlinePassed && !preference?.submitted && (
//           <>
//             <div style={{ padding: 12, background: C.accent.greenBg, borderRadius: 8, marginBottom: 8 }}>
//               <p style={{ color: C.accent.green, margin: 0, textAlign: "center" }}>
//                 ✓ Preference form is OPEN! Please submit your preferences before {new Date(formStatus.deadline).toLocaleString()}
//               </p>
//             </div>
//             <FacultyPreferenceForm faculty={faculty} onComplete={forceUpdate} />
//           </>
//         )}
        
//         {/* Waiting for Dean Approval */}
//         {preferencePending && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.goldBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ⏳
//               </div>
//               <div>
//                 <h4 style={{ color: C.text.primary, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Subject Preferences Submitted</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Waiting for Dean's approval.</p>
//                 {preference.feedback && (
//                   <p style={{ color: C.accent.gold, fontSize: 13, marginTop: 8 }}>Feedback: {preference.feedback}</p>
//                 )}
//               </div>
//             </div>
//           </Card>
//         )}
        
//         {/* Preferences Rejected by Dean */}
//         {preferenceRejected && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.redBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ✗
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.red, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Subject Preferences Rejected</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Please revise and resubmit.</p>
//                 {preference.feedback && (
//                   <p style={{ color: C.accent.red, fontSize: 13, marginTop: 8 }}>Feedback: {preference.feedback}</p>
//                 )}
//               </div>
//             </div>
//             {isFormOpen ? (
//               <Button onClick={() => { AppState.resetPreferenceForm(faculty.id); forceUpdate(); }} variant="primary" fullWidth>
//                 Resubmit Preferences
//               </Button>
//             ) : (
//               <p style={{ color: C.accent.red, textAlign: "center" }}>
//                 The preference form is currently closed. Cannot resubmit at this time.
//               </p>
//             )}
//           </Card>
//         )}
        
//         {/* Preferences Approved by Dean - Show Detailed Course Form */}
//         {preferenceApproved && courseDetails.length === 0 && (
//           <FacultyDetailedCourseForm 
//             faculty={faculty} 
//             allocatedSubjects={preference.preferences?.map(p => p.subjectId)} 
//             onComplete={forceUpdate} 
//           />
//         )}
        
//         {/* Course Details Submitted - Waiting for Dean Approval */}
//         {preferenceApproved && courseDetails.length > 0 && courseDetailsPending && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.goldBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ⏳
//               </div>
//               <div>
//                 <h4 style={{ color: C.text.primary, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Detailed Course Information Submitted</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Waiting for Dean's approval.</p>
//               </div>
//             </div>
//           </Card>
//         )}
        
//         {/* Course Details Rejected by Dean */}
//         {courseDetailsRejected && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.redBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ✗
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.red, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Course Details Rejected</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Please review the feedback and resubmit.</p>
//                 {courseDetails[0]?.deanFeedback && (
//                   <p style={{ color: C.accent.red, fontSize: 13, marginTop: 8 }}>Feedback: {courseDetails[0].deanFeedback}</p>
//                 )}
//               </div>
//             </div>
//             <Button onClick={() => {
//               AppState.courseDetails = AppState.courseDetails.filter(c => c.facultyId !== faculty.id);
//               saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
//               forceUpdate();
//             }} variant="primary" fullWidth>
//               Resubmit Course Details
//             </Button>
//           </Card>
//         )}
        
//         {/* Course Details Approved by Dean - Final Step */}
//         {courseDetailsApproved && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.greenBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ✓
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.green, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>All Forms Approved by Dean!</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Your schedule has been generated. Use the Syllabus Tracker to update module completion.</p>
//               </div>
//             </div>
//           </Card>
//         )}
//       </div>
//     ),
    
//     status: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//         <Title>Submission Status - {faculty?.course}</Title>
        
//         <Card>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//             <span style={{ color: C.text.primary, fontWeight: 600 }}>Form Status</span>
//             <Badge variant={formStatus.isFloated ? "success" : "warning"}>
//               {formStatus.isFloated ? "Open" : "Not Yet Released"}
//             </Badge>
//           </div>
//           {formStatus.isFloated && formStatus.deadline && (
//             <p style={{ color: C.text.secondary, fontSize: 13, marginBottom: 16 }}>
//               Deadline: {new Date(formStatus.deadline).toLocaleString()}
//             </p>
//           )}
//         </Card>
        
//         <Card>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//             <span style={{ color: C.text.primary, fontWeight: 600 }}>Subject Preferences</span>
//             <Badge variant={
//               preference?.status === "approved" ? "success" : 
//               preference?.status === "pending" ? "warning" : "danger"
//             }>
//               {preference?.status === "approved" ? "Approved by Dean" : 
//                preference?.status === "pending" ? "Pending Dean Approval" : 
//                preference?.status === "rejected" ? "Rejected" : "Not Submitted"}
//             </Badge>
//           </div>
//           {preference?.submitted && (
//             <div>
//               {preference.preferences?.map(p => {
//                 const subject = AppState.subjects.find(s => s.id === p.subjectId);
//                 return (
//                   <div key={p.level} style={{
//                     padding: "8px 12px",
//                     background: C.cardHover,
//                     borderRadius: 8,
//                     marginBottom: 4,
//                   }}>
//                     <span style={{ color: p.level === 1 ? C.accent.gold : p.level === 2 ? C.accent.blue : C.accent.green }}>
//                       Preference {p.level}:
//                     </span>
//                     <span style={{ color: C.text.primary, marginLeft: 8 }}>{subject?.name}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </Card>
        
//         <Card>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//             <span style={{ color: C.text.primary, fontWeight: 600 }}>Detailed Course Information</span>
//             {courseDetails.length > 0 ? (
//               <div style={{ display: "flex", gap: 8 }}>
//                 <Badge variant={courseDetails.every(c => c.deanStatus === "approved") ? "success" : "warning"}>
//                   Dean: {courseDetails.every(c => c.deanStatus === "approved") ? "Approved" : "Pending"}
//                 </Badge>
//               </div>
//             ) : (
//               <Badge variant="danger">Locked (Complete Preferences First)</Badge>
//             )}
//           </div>
//           {courseDetails.map(c => (
//             <div key={c.id} style={{
//               padding: "12px",
//               background: C.cardHover,
//               borderRadius: 8,
//               marginBottom: 8,
//             }}>
//               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
//                 <span style={{ color: C.accent.blue, fontWeight: 500 }}>{c.subjectName}</span>
//                 <Badge variant={c.deanStatus === "approved" ? "success" : "warning"}>
//                   {c.deanStatus === "approved" ? "Dean Approved" : "Pending Dean"}
//                 </Badge>
//               </div>
//               <div style={{ display: "flex", gap: 16, fontSize: 12, color: C.text.tertiary }}>
//                 <span>{c.credits} Credits</span>
//                 <span>{c.modules} Modules</span>
//                 <span>Semester {c.semester}</span>
//               </div>
//               {c.deanFeedback && (
//                 <p style={{ color: C.accent.red, fontSize: 11, marginTop: 8 }}>Feedback: {c.deanFeedback}</p>
//               )}
//             </div>
//           ))}
//         </Card>
//       </div>
//     ),
    
//     syllabus: <FacultySyllabusTracker faculty={faculty} />,
    
//     schedule: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//         <Title>My Weekly Schedule</Title>
//         {schedule.length === 0 ? (
//           <Card>
//             <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>
//               {courseDetailsApproved ? "Schedule being generated..." : "Complete all forms and wait for dean's approval to see your schedule"}
//             </p>
//           </Card>
//         ) : (
//           <>
//             <WeeklyTimetableView schedule={schedule} title={`${faculty?.name} - ${faculty?.course}`} />
//             <Card>
//               <Title level={4}>Suggest Timetable Change</Title>
//               <p>If you notice any conflict or have a suggestion, please raise an issue.</p>
//               <Button
//                 onClick={() => {
//                   const reason = prompt("Describe your suggestion or conflict:");
//                   if (reason) {
//                     const newIssue = {
//                       id: Date.now(),
//                       type: "timetable_suggestion",
//                       facultyId: faculty.id,
//                       facultyName: faculty.name,
//                       reason,
//                       status: "pending",
//                       timestamp: new Date().toISOString(),
//                     };
//                     AppState.flaggedIssues.push(newIssue);
//                     saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
//                     alert("Issue raised. Director will review.");
//                   }
//                 }}
//                 variant="warning"
//               >
//                 Raise Issue
//               </Button>
//             </Card>
//           </>
//         )}
//       </div>
//     ),
    
//     appointments: <FacultyAppointments facultyId={faculty?.id} facultyName={faculty?.name} />,
    
//     requestLeave: <LeaveRequestForm faculty={faculty} onComplete={forceUpdate} />,
    
//     myLeaves: <FacultyLeaveStatus facultyId={faculty?.id} />,
    
//     profile: (
//       <Card>
//         <Title level={4}>Faculty Profile</Title>
//         <div style={{ display: "flex", gap: 32, alignItems: "center", marginTop: 20, flexWrap: "wrap" }}>
//           <div style={{
//             width: 100,
//             height: 100,
//             borderRadius: "50%",
//             background: `${faculty?.color}20`,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: 36,
//             fontWeight: 700,
//             color: faculty?.color,
//           }}>
//             {faculty?.avatar}
//           </div>
//           <div>
//             <h3 style={{ color: C.text.primary, fontSize: 24, fontWeight: 600, marginBottom: 8 }}>{faculty?.name}</h3>
//             <p style={{ color: C.accent.blue, fontSize: 15, marginBottom: 4 }}>ID: {faculty?.facultyId}</p>
//             <p style={{ color: C.accent.blue, fontSize: 15, marginBottom: 4 }}>{faculty?.designation}</p>
//             <p style={{ color: C.text.secondary, fontSize: 14, marginBottom: 4 }}>Course: {faculty?.course}</p>
//             <p style={{ color: C.text.secondary, fontSize: 14 }}>Specialization: {faculty?.specialization}</p>
//           </div>
//         </div>
        
//         <div style={{ marginTop: 24, padding: 16, background: C.cardHover, borderRadius: 12 }}>
//           <h5 style={{ color: C.text.primary, fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Workload Information</h5>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
//             <div>
//               <span style={{ color: C.text.tertiary, fontSize: 12 }}>Max Hours/Week</span>
//               <p style={{ color: C.accent.blue, fontSize: 20, fontWeight: 600 }}>{faculty?.maxHours}h</p>
//             </div>
//             <div>
//               <span style={{ color: C.text.tertiary, fontSize: 12 }}>Assigned Hours</span>
//               <p style={{ color: C.accent.gold, fontSize: 20, fontWeight: 600 }}>{faculty?.assignedHours || 0}h</p>
//             </div>
//             <div>
//               <span style={{ color: C.text.tertiary, fontSize: 12 }}>Remaining Hours</span>
//               <p style={{ color: C.accent.green, fontSize: 20, fontWeight: 600 }}>{faculty?.remainingHours || faculty?.maxHours}h</p>
//             </div>
//           </div>
//         </div>
//       </Card>
//     ),
//   };

//   if (!faculty) {
//     return (
//       <div style={{ display: "flex", minHeight: "100vh", background: C.bg, alignItems: "center", justifyContent: "center" }}>
//         <Card>
//           <p style={{ color: C.text.tertiary, textAlign: "center" }}>Loading faculty data...</p>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
//       <Sidebar 
//         navItems={FAC_NAV} 
//         active={active} 
//         setActive={setActive} 
//         collapsed={collapsed} 
//         setCollapsed={setCollapsed} 
//         user={user} 
//         badges={{ forms: preference?.status === "pending" ? 1 : 0 }} 
//         accentColor={C.accent.blue} 
//       />
//       <main style={{ flex: 1, overflow: "auto" }}>
//         <header style={{
//           background: C.nav,
//           borderBottom: `1px solid ${C.navBorder}`,
//           padding: "16px 32px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           position: "sticky",
//           top: 0,
//           zIndex: 10,
//           flexWrap: "wrap",
//           gap: 12,
//         }}>
//           <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>{FAC_NAV.find(n => n.id === active)?.label}</h2>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             {formStatus.isFloated && !preference?.submitted && (
//               <Badge variant="success">Form Open</Badge>
//             )}
//             {!formStatus.isFloated && (
//               <Badge variant="warning">Form Closed</Badge>
//             )}
//             <Badge variant={
//               preference?.status === "approved" ? "success" : 
//               preference?.status === "pending" ? "warning" : "danger"
//             }>
//               {preference?.status === "approved" ? "Dean Approved" : 
//                preference?.status === "pending" ? "Pending Dean" : 
//                preference?.status === "rejected" ? "Rejected" : "Not Started"}
//             </Badge>
//           </div>
//         </header>
//         <div style={{ padding: 32 }}>{panels[active]}</div>
//       </main>
//     </div>
//   );
// }

// // src/components/faculty/FacultyDashboard.jsx
// import { useState, useEffect } from "react";
// import { useAuth } from "../auth/AuthContext";
// import { Sidebar, Card, Title, Badge, Button } from "../common";
// import { WeeklyTimetableView } from "../shared/WeeklyTimetableView";
// import { FacultyPreferenceForm } from "./FacultyPreferenceForm";
// import { FacultyDetailedCourseForm } from "./FacultyDetailedCourseForm";
// import { FacultySyllabusTracker } from "./FacultySyllabusTracker";
// import { LeaveRequestForm } from "./LeaveRequestForm";
// import { FacultyLeaveStatus } from "./FacultyLeaveStatus";
// import { FacultyAppointments } from "./FacultyAppointments";
// import { FacultyLocationSetup } from "./FacultyLocationSetup";
// import { AppState } from "../../AppState";
// import { C } from "../../styles/theme";
// import { saveToStorage, STORAGE_KEYS, loadFromStorage } from "../../utils/storage";

// export function FacultyDashboard() {
//   const { user } = useAuth();
//   const [active, setActive] = useState("forms");
//   const [collapsed, setCollapsed] = useState(false);
//   const [refresh, setRefresh] = useState(0);
//   const [formStatus, setFormStatus] = useState({
//     isFloated: false,
//     floatedDate: null,
//     floatedBy: null,
//     semester: "2025",
//     deadline: null
//   });
  
//   // Listen for storage changes
//   useEffect(() => {
//     const handleStorageChange = () => {
//       loadFormStatus();
//       setRefresh(r => r + 1);
//     };
    
//     loadFormStatus();
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const loadFormStatus = () => {
//     const savedStatus = loadFromStorage(STORAGE_KEYS.FORM_STATUS, {
//       isFloated: false,
//       floatedDate: null,
//       floatedBy: null,
//       semester: "2025",
//       deadline: null
//     });
//     setFormStatus(savedStatus);
//   };
  
//   // Get fresh data on refresh
//   useEffect(() => {
//     const loadFreshData = () => {
//       AppState.faculty = JSON.parse(localStorage.getItem(STORAGE_KEYS.FACULTY) || '[]');
//       AppState.subjects = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBJECTS) || '[]');
//       AppState.subjectPreferences = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBJECT_PREFERENCES) || '[]');
//       AppState.courseDetails = JSON.parse(localStorage.getItem(STORAGE_KEYS.COURSE_DETAILS) || '[]');
//       AppState.semesterDetails = JSON.parse(localStorage.getItem(STORAGE_KEYS.SEMESTER_DETAILS) || '{}');
//     };
    
//     loadFreshData();
//   }, [refresh]);
  
//   const faculty = AppState.faculty.find(f => f.id === user.id);
//   const preference = AppState.getPreferenceByFacultyId(user.id);
//   const courseDetails = AppState.getCourseDetailsByFacultyId(user.id);
//   const schedule = AppState.getFacultySchedule(user.id);
  
//   // Status checks for the workflow
//   const preferencePending = preference?.submitted && preference?.status === "pending";
//   const preferenceApproved = preference?.status === "approved";
//   const preferenceRejected = preference?.status === "rejected";
  
//   // Course details status
//   const courseDetailsPending = courseDetails.length > 0 && courseDetails.every(c => c.deanStatus === "pending");
//   const courseDetailsApproved = courseDetails.length > 0 && courseDetails.every(c => c.deanStatus === "approved");
//   const courseDetailsRejected = courseDetails.length > 0 && courseDetails.every(c => c.deanStatus === "rejected");
  
//   // Check if form is floated and deadline hasn't passed
//   const isFormOpen = formStatus.isFloated && (!formStatus.deadline || new Date() <= new Date(formStatus.deadline));
//   const isDeadlinePassed = formStatus.deadline && new Date() > new Date(formStatus.deadline);
  
//   const forceUpdate = () => {
//     setRefresh(r => r + 1);
//     window.dispatchEvent(new Event('storage'));
//   };
  
//   const FAC_NAV = [
//     { id: "forms", icon: "📝", label: "Preference Forms" },
//     { id: "status", icon: "📊", label: "Submission Status" },
//     { id: "syllabus", icon: "📚", label: "Syllabus Tracker" },
//     { id: "schedule", icon: "📅", label: "My Schedule" },
//     { id: "appointments", icon: "📅", label: "Appointments" },
//     { id: "location", icon: "📍", label: "Office Location" },
//     { id: "requestLeave", icon: "📝", label: "Request Leave" },
//     { id: "myLeaves", icon: "📋", label: "My Leave Requests" },
//     { id: "profile", icon: "👤", label: "Profile" },
//   ];
  
//   const panels = {
//     forms: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//         <Title>Faculty Onboarding Forms - {faculty?.course}</Title>
        
//         {/* Form Status Message */}
//         {!formStatus.isFloated && (
//           <Card style={{ background: C.accent.goldBg, textAlign: "center" }}>
//             <div style={{ padding: "20px" }}>
//               <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
//               <h3 style={{ color: C.accent.gold, marginBottom: 8 }}>Preference Form Not Yet Available</h3>
//               <p style={{ color: C.text.secondary }}>
//                 The preference form has not been floated by the Director yet. 
//                 Please check back later when the form is released.
//               </p>
//             </div>
//           </Card>
//         )}
        
//         {formStatus.isFloated && isDeadlinePassed && (
//           <Card style={{ background: C.accent.redBg, textAlign: "center" }}>
//             <div style={{ padding: "20px" }}>
//               <div style={{ fontSize: 48, marginBottom: 16 }}>⏰</div>
//               <h3 style={{ color: C.accent.red, marginBottom: 8 }}>Submission Deadline Passed</h3>
//               <p style={{ color: C.text.secondary }}>
//                 The submission deadline ({new Date(formStatus.deadline).toLocaleString()}) has passed.
//                 You cannot submit preferences at this time.
//               </p>
//             </div>
//           </Card>
//         )}
        
//         {/* Show preference form if open and not submitted */}
//         {formStatus.isFloated && !isDeadlinePassed && !preference?.submitted && (
//           <>
//             <div style={{ padding: 12, background: C.accent.greenBg, borderRadius: 8, marginBottom: 8 }}>
//               <p style={{ color: C.accent.green, margin: 0, textAlign: "center" }}>
//                 ✓ Preference form is OPEN! Please submit your preferences before {new Date(formStatus.deadline).toLocaleString()}
//               </p>
//             </div>
//             <FacultyPreferenceForm faculty={faculty} onComplete={forceUpdate} />
//           </>
//         )}
        
//         {/* Waiting for Dean Approval */}
//         {preferencePending && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.goldBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ⏳
//               </div>
//               <div>
//                 <h4 style={{ color: C.text.primary, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Subject Preferences Submitted</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Waiting for Dean's approval.</p>
//                 {preference.feedback && (
//                   <p style={{ color: C.accent.gold, fontSize: 13, marginTop: 8 }}>Feedback: {preference.feedback}</p>
//                 )}
//               </div>
//             </div>
//           </Card>
//         )}
        
//         {/* Preferences Rejected by Dean */}
//         {preferenceRejected && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.redBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ✗
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.red, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Subject Preferences Rejected</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Please revise and resubmit.</p>
//                 {preference.feedback && (
//                   <p style={{ color: C.accent.red, fontSize: 13, marginTop: 8 }}>Feedback: {preference.feedback}</p>
//                 )}
//               </div>
//             </div>
//             {isFormOpen ? (
//               <Button onClick={() => { AppState.resetPreferenceForm(faculty.id); forceUpdate(); }} variant="primary" fullWidth>
//                 Resubmit Preferences
//               </Button>
//             ) : (
//               <p style={{ color: C.accent.red, textAlign: "center" }}>
//                 The preference form is currently closed. Cannot resubmit at this time.
//               </p>
//             )}
//           </Card>
//         )}
        
//         {/* Preferences Approved by Dean - Show Detailed Course Form */}
//         {preferenceApproved && courseDetails.length === 0 && (
//           <FacultyDetailedCourseForm 
//             faculty={faculty} 
//             allocatedSubjects={preference.preferences?.map(p => p.subjectId)} 
//             onComplete={forceUpdate} 
//           />
//         )}
        
//         {/* Course Details Submitted - Waiting for Dean Approval */}
//         {preferenceApproved && courseDetails.length > 0 && courseDetailsPending && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.goldBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ⏳
//               </div>
//               <div>
//                 <h4 style={{ color: C.text.primary, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Detailed Course Information Submitted</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Waiting for Dean's approval.</p>
//               </div>
//             </div>
//           </Card>
//         )}
        
//         {/* Course Details Rejected by Dean */}
//         {courseDetailsRejected && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.redBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ✗
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.red, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Course Details Rejected</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Please review the feedback and resubmit.</p>
//                 {courseDetails[0]?.deanFeedback && (
//                   <p style={{ color: C.accent.red, fontSize: 13, marginTop: 8 }}>Feedback: {courseDetails[0].deanFeedback}</p>
//                 )}
//               </div>
//             </div>
//             <Button onClick={() => {
//               AppState.courseDetails = AppState.courseDetails.filter(c => c.facultyId !== faculty.id);
//               saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
//               forceUpdate();
//             }} variant="primary" fullWidth>
//               Resubmit Course Details
//             </Button>
//           </Card>
//         )}
        
//         {/* Course Details Approved by Dean - Final Step */}
//         {courseDetailsApproved && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.greenBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ✓
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.green, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>All Forms Approved by Dean!</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Your schedule has been generated. Use the Syllabus Tracker to update module completion.</p>
//               </div>
//             </div>
//           </Card>
//         )}
//       </div>
//     ),
    
//     status: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//         <Title>Submission Status - {faculty?.course}</Title>
        
//         <Card>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//             <span style={{ color: C.text.primary, fontWeight: 600 }}>Form Status</span>
//             <Badge variant={formStatus.isFloated ? "success" : "warning"}>
//               {formStatus.isFloated ? "Open" : "Not Yet Released"}
//             </Badge>
//           </div>
//           {formStatus.isFloated && formStatus.deadline && (
//             <p style={{ color: C.text.secondary, fontSize: 13, marginBottom: 16 }}>
//               Deadline: {new Date(formStatus.deadline).toLocaleString()}
//             </p>
//           )}
//         </Card>
        
//         <Card>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//             <span style={{ color: C.text.primary, fontWeight: 600 }}>Subject Preferences</span>
//             <Badge variant={
//               preference?.status === "approved" ? "success" : 
//               preference?.status === "pending" ? "warning" : "danger"
//             }>
//               {preference?.status === "approved" ? "Approved by Dean" : 
//                preference?.status === "pending" ? "Pending Dean Approval" : 
//                preference?.status === "rejected" ? "Rejected" : "Not Submitted"}
//             </Badge>
//           </div>
//           {preference?.submitted && (
//             <div>
//               {preference.preferences?.map(p => {
//                 const subject = AppState.subjects.find(s => s.id === p.subjectId);
//                 return (
//                   <div key={p.level} style={{
//                     padding: "8px 12px",
//                     background: C.cardHover,
//                     borderRadius: 8,
//                     marginBottom: 4,
//                   }}>
//                     <span style={{ color: p.level === 1 ? C.accent.gold : p.level === 2 ? C.accent.blue : C.accent.green }}>
//                       Preference {p.level}:
//                     </span>
//                     <span style={{ color: C.text.primary, marginLeft: 8 }}>{subject?.name}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </Card>
        
//         <Card>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//             <span style={{ color: C.text.primary, fontWeight: 600 }}>Detailed Course Information</span>
//             {courseDetails.length > 0 ? (
//               <div style={{ display: "flex", gap: 8 }}>
//                 <Badge variant={courseDetails.every(c => c.deanStatus === "approved") ? "success" : "warning"}>
//                   Dean: {courseDetails.every(c => c.deanStatus === "approved") ? "Approved" : "Pending"}
//                 </Badge>
//               </div>
//             ) : (
//               <Badge variant="danger">Locked (Complete Preferences First)</Badge>
//             )}
//           </div>
//           {courseDetails.map(c => (
//             <div key={c.id} style={{
//               padding: "12px",
//               background: C.cardHover,
//               borderRadius: 8,
//               marginBottom: 8,
//             }}>
//               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
//                 <span style={{ color: C.accent.blue, fontWeight: 500 }}>{c.subjectName}</span>
//                 <Badge variant={c.deanStatus === "approved" ? "success" : "warning"}>
//                   {c.deanStatus === "approved" ? "Dean Approved" : "Pending Dean"}
//                 </Badge>
//               </div>
//               <div style={{ display: "flex", gap: 16, fontSize: 12, color: C.text.tertiary }}>
//                 <span>{c.credits} Credits</span>
//                 <span>{c.modules} Modules</span>
//                 <span>Semester {c.semester}</span>
//               </div>
//               {c.deanFeedback && (
//                 <p style={{ color: C.accent.red, fontSize: 11, marginTop: 8 }}>Feedback: {c.deanFeedback}</p>
//               )}
//             </div>
//           ))}
//         </Card>
//       </div>
//     ),
    
//     syllabus: <FacultySyllabusTracker faculty={faculty} />,
    
//     schedule: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//         <Title>My Weekly Schedule</Title>
//         {schedule.length === 0 ? (
//           <Card>
//             <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>
//               {courseDetailsApproved ? "Schedule being generated..." : "Complete all forms and wait for dean's approval to see your schedule"}
//             </p>
//           </Card>
//         ) : (
//           <>
//             <WeeklyTimetableView schedule={schedule} title={`${faculty?.name} - ${faculty?.course}`} />
//             <Card>
//               <Title level={4}>Suggest Timetable Change</Title>
//               <p>If you notice any conflict or have a suggestion, please raise an issue.</p>
//               <Button
//                 onClick={() => {
//                   const reason = prompt("Describe your suggestion or conflict:");
//                   if (reason) {
//                     const newIssue = {
//                       id: Date.now(),
//                       type: "timetable_suggestion",
//                       facultyId: faculty.id,
//                       facultyName: faculty.name,
//                       reason,
//                       status: "pending",
//                       timestamp: new Date().toISOString(),
//                     };
//                     AppState.flaggedIssues.push(newIssue);
//                     saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
//                     alert("Issue raised. Director will review.");
//                   }
//                 }}
//                 variant="warning"
//               >
//                 Raise Issue
//               </Button>
//             </Card>
//           </>
//         )}
//       </div>
//     ),
    
//     appointments: <FacultyAppointments facultyId={faculty?.id} facultyName={faculty?.name} />,
    
//     location: <FacultyLocationSetup faculty={faculty} onComplete={forceUpdate} />,
    
//     requestLeave: <LeaveRequestForm faculty={faculty} onComplete={forceUpdate} />,
    
//     myLeaves: <FacultyLeaveStatus facultyId={faculty?.id} />,
    
//     profile: (
//       <Card>
//         <Title level={4}>Faculty Profile</Title>
//         <div style={{ display: "flex", gap: 32, alignItems: "center", marginTop: 20, flexWrap: "wrap" }}>
//           <div style={{
//             width: 100,
//             height: 100,
//             borderRadius: "50%",
//             background: `${faculty?.color}20`,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: 36,
//             fontWeight: 700,
//             color: faculty?.color,
//           }}>
//             {faculty?.avatar}
//           </div>
//           <div>
//             <h3 style={{ color: C.text.primary, fontSize: 24, fontWeight: 600, marginBottom: 8 }}>{faculty?.name}</h3>
//             <p style={{ color: C.accent.blue, fontSize: 15, marginBottom: 4 }}>ID: {faculty?.facultyId}</p>
//             <p style={{ color: C.accent.blue, fontSize: 15, marginBottom: 4 }}>{faculty?.designation}</p>
//             <p style={{ color: C.text.secondary, fontSize: 14, marginBottom: 4 }}>Course: {faculty?.course}</p>
//             <p style={{ color: C.text.secondary, fontSize: 14 }}>Specialization: {faculty?.specialization}</p>
//           </div>
//         </div>
        
//         <div style={{ marginTop: 24, padding: 16, background: C.cardHover, borderRadius: 12 }}>
//           <h5 style={{ color: C.text.primary, fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Workload Information</h5>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
//             <div>
//               <span style={{ color: C.text.tertiary, fontSize: 12 }}>Max Hours/Week</span>
//               <p style={{ color: C.accent.blue, fontSize: 20, fontWeight: 600 }}>{faculty?.maxHours}h</p>
//             </div>
//             <div>
//               <span style={{ color: C.text.tertiary, fontSize: 12 }}>Assigned Hours</span>
//               <p style={{ color: C.accent.gold, fontSize: 20, fontWeight: 600 }}>{faculty?.assignedHours || 0}h</p>
//             </div>
//             <div>
//               <span style={{ color: C.text.tertiary, fontSize: 12 }}>Remaining Hours</span>
//               <p style={{ color: C.accent.green, fontSize: 20, fontWeight: 600 }}>{faculty?.remainingHours || faculty?.maxHours}h</p>
//             </div>
//           </div>
//         </div>
        
//         {/* Current Location Display in Profile */}
//         {faculty?.block && (
//           <div style={{ marginTop: 16, padding: 16, background: C.accent.blueBg, borderRadius: 12 }}>
//             <h5 style={{ color: C.accent.blue, fontSize: 14, fontWeight: 600, marginBottom: 8 }}>📍 Office Location</h5>
//             <p style={{ margin: 0 }}>
//               {faculty.block}, {faculty.floor}<br />
//               Room {faculty.roomNumber} {faculty.cabinLocation && `(${faculty.cabinLocation})`}
//             </p>
//           </div>
//         )}
//       </Card>
//     ),
//   };

//   if (!faculty) {
//     return (
//       <div style={{ display: "flex", minHeight: "100vh", background: C.bg, alignItems: "center", justifyContent: "center" }}>
//         <Card>
//           <p style={{ color: C.text.tertiary, textAlign: "center" }}>Loading faculty data...</p>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
//       <Sidebar 
//         navItems={FAC_NAV} 
//         active={active} 
//         setActive={setActive} 
//         collapsed={collapsed} 
//         setCollapsed={setCollapsed} 
//         user={user} 
//         badges={{ forms: preference?.status === "pending" ? 1 : 0 }} 
//         accentColor={C.accent.blue} 
//       />
//       <main style={{ flex: 1, overflow: "auto" }}>
//         <header style={{
//           background: C.nav,
//           borderBottom: `1px solid ${C.navBorder}`,
//           padding: "16px 32px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           position: "sticky",
//           top: 0,
//           zIndex: 10,
//           flexWrap: "wrap",
//           gap: 12,
//         }}>
//           <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>{FAC_NAV.find(n => n.id === active)?.label}</h2>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             {formStatus.isFloated && !preference?.submitted && (
//               <Badge variant="success">Form Open</Badge>
//             )}
//             {!formStatus.isFloated && (
//               <Badge variant="warning">Form Closed</Badge>
//             )}
//             <Badge variant={
//               preference?.status === "approved" ? "success" : 
//               preference?.status === "pending" ? "warning" : "danger"
//             }>
//               {preference?.status === "approved" ? "Dean Approved" : 
//                preference?.status === "pending" ? "Pending Dean" : 
//                preference?.status === "rejected" ? "Rejected" : "Not Started"}
//             </Badge>
//           </div>
//         </header>
//         <div style={{ padding: 32 }}>{panels[active]}</div>
//       </main>
//     </div>
//   );
// }

// // src/components/faculty/FacultyDashboard.jsx
// import { useState, useEffect } from "react";
// import { useAuth } from "../auth/AuthContext";
// import { Sidebar, Card, Title, Badge, Button } from "../common";
// import { WeeklyTimetableView } from "../shared/WeeklyTimetableView";
// import { FacultyPreferenceForm } from "./FacultyPreferenceForm";
// import { FacultyDetailedCourseForm } from "./FacultyDetailedCourseForm";
// import { FacultySyllabusTracker } from "./FacultySyllabusTracker";
// import { LeaveRequestForm } from "./LeaveRequestForm";
// import { FacultyLeaveStatus } from "./FacultyLeaveStatus";
// import { FacultyAppointments } from "./FacultyAppointments";
// import { FacultyLocationSetup } from "./FacultyLocationSetup";
// import { AppState } from "../../AppState";
// import { C } from "../../styles/theme";
// import { saveToStorage, STORAGE_KEYS, loadFromStorage } from "../../utils/storage";

// export function FacultyDashboard() {
//   const { user } = useAuth();
//   const [active, setActive] = useState("overview");
//   const [collapsed, setCollapsed] = useState(false);
//   const [refresh, setRefresh] = useState(0);
//   const [formStatus, setFormStatus] = useState({
//     isFloated: false,
//     floatedDate: null,
//     floatedBy: null,
//     semester: "2025",
//     deadline: null
//   });
//   const [classTeacherInfo, setClassTeacherInfo] = useState(null);
//   const [courseLeadInfo, setCourseLeadInfo] = useState(null);
//   const [pendingAppointments, setPendingAppointments] = useState([]);
  
//   // Listen for storage changes
//   useEffect(() => {
//     const handleStorageChange = () => {
//       loadFormStatus();
//       loadClassTeacherInfo();
//       loadCourseLeadInfo();
//       loadPendingAppointments();
//       setRefresh(r => r + 1);
//     };
    
//     loadFormStatus();
//     loadClassTeacherInfo();
//     loadCourseLeadInfo();
//     loadPendingAppointments();
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const loadFormStatus = () => {
//     const savedStatus = loadFromStorage(STORAGE_KEYS.FORM_STATUS, {
//       isFloated: false,
//       floatedDate: null,
//       floatedBy: null,
//       semester: "2025",
//       deadline: null
//     });
//     setFormStatus(savedStatus);
//   };
  
//   const loadClassTeacherInfo = () => {
//     const facultyId = faculty?.id;
//     if (!facultyId) return;
    
//     const classTeachers = loadFromStorage(STORAGE_KEYS.CLASS_TEACHERS, {});
//     let found = null;
    
//     // Updated to handle 3-level nesting: course -> semester -> section
//     for (const course in classTeachers) {
//       for (const semester in classTeachers[course]) {
//         for (const section in classTeachers[course][semester]) {
//           if (classTeachers[course][semester][section].facultyId === facultyId) {
//             found = {
//               course,
//               semester,
//               section,
//               assignedDate: classTeachers[course][semester][section].assignedDate
//             };
//             break;
//           }
//         }
//         if (found) break;
//       }
//       if (found) break;
//     }
//     setClassTeacherInfo(found);
//   };
  
//   const loadCourseLeadInfo = () => {
//     const facultyId = faculty?.id;
//     if (!facultyId) return;
    
//     const courseLeads = loadFromStorage(STORAGE_KEYS.COURSE_LEADS, {});
//     let found = null;
    
//     for (const course in courseLeads) {
//       if (courseLeads[course]?.facultyId === facultyId) {
//         found = {
//           course,
//           assignedDate: courseLeads[course].assignedDate
//         };
//         break;
//       }
//     }
//     setCourseLeadInfo(found);
//   };
  
//   const loadPendingAppointments = () => {
//     const allAppointments = loadFromStorage(STORAGE_KEYS.APPOINTMENTS, []);
//     const pending = allAppointments.filter(a => a.facultyId === faculty?.id && a.status === "pending");
//     setPendingAppointments(pending);
//   };
  
//   // Get fresh data on refresh
//   useEffect(() => {
//     const loadFreshData = () => {
//       AppState.faculty = JSON.parse(localStorage.getItem(STORAGE_KEYS.FACULTY) || '[]');
//       AppState.subjects = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBJECTS) || '[]');
//       AppState.subjectPreferences = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBJECT_PREFERENCES) || '[]');
//       AppState.courseDetails = JSON.parse(localStorage.getItem(STORAGE_KEYS.COURSE_DETAILS) || '[]');
//       AppState.semesterDetails = JSON.parse(localStorage.getItem(STORAGE_KEYS.SEMESTER_DETAILS) || '{}');
//     };
    
//     loadFreshData();
//   }, [refresh]);
  
//   const faculty = AppState.faculty.find(f => f.id === user.id);
//   const preference = AppState.getPreferenceByFacultyId(user.id);
//   const courseDetails = AppState.getCourseDetailsByFacultyId(user.id);
//   const schedule = AppState.getFacultySchedule(user.id);
  
//   // Status checks for the workflow
//   const preferencePending = preference?.submitted && preference?.status === "pending";
//   const preferenceApproved = preference?.status === "approved";
//   const preferenceRejected = preference?.status === "rejected";
  
//   // Course details status
//   const courseDetailsPending = courseDetails.length > 0 && courseDetails.every(c => c.deanStatus === "pending");
//   const courseDetailsApproved = courseDetails.length > 0 && courseDetails.every(c => c.deanStatus === "approved");
//   const courseDetailsRejected = courseDetails.length > 0 && courseDetails.every(c => c.deanStatus === "rejected");
  
//   // Check if form is floated and deadline hasn't passed
//   const isFormOpen = formStatus.isFloated && (!formStatus.deadline || new Date() <= new Date(formStatus.deadline));
//   const isDeadlinePassed = formStatus.deadline && new Date() > new Date(formStatus.deadline);
  
//   const forceUpdate = () => {
//     setRefresh(r => r + 1);
//     window.dispatchEvent(new Event('storage'));
//   };
  
//   const FAC_NAV = [
//     { id: "overview", icon: "📊", label: "Overview" },
//     { id: "forms", icon: "📝", label: "Preference Forms" },
//     { id: "status", icon: "📊", label: "Submission Status" },
//     { id: "syllabus", icon: "📚", label: "Syllabus Tracker" },
//     { id: "schedule", icon: "📅", label: "My Schedule" },
//     { id: "appointments", icon: "📅", label: "Appointments" },
//     { id: "location", icon: "📍", label: "Office Location" },
//     { id: "requestLeave", icon: "📝", label: "Request Leave" },
//     { id: "myLeaves", icon: "📋", label: "My Leave Requests" },
//     { id: "profile", icon: "👤", label: "Profile" },
//   ];
  
//   const panels = {
//     overview: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//         <Title>Faculty Dashboard Overview</Title>
        
//         {/* Welcome Card */}
//         <Card>
//           <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
//             <div style={{
//               width: 80,
//               height: 80,
//               borderRadius: "50%",
//               background: `${faculty?.color}20`,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               fontSize: 32,
//               fontWeight: 700,
//               color: faculty?.color,
//             }}>
//               {faculty?.avatar}
//             </div>
//             <div>
//               <h2 style={{ color: C.text.primary, marginBottom: 4 }}>Welcome, {faculty?.name}</h2>
//               <p style={{ color: C.text.secondary }}>{faculty?.designation} | {faculty?.course}</p>
//               <p style={{ color: C.text.tertiary, fontSize: 13 }}>ID: {faculty?.facultyId} | Email: {faculty?.email}</p>
//             </div>
//           </div>
//         </Card>
        
//         {/* Quick Stats */}
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
//           <Card padding="16px">
//             <p style={{ color: C.text.tertiary, fontSize: 12 }}>Preference Status</p>
//             <p style={{ color: preferenceApproved ? C.accent.green : preferencePending ? C.accent.gold : C.text.primary, fontSize: 24, fontWeight: 700 }}>
//               {preferenceApproved ? "Approved" : preferencePending ? "Pending" : preference?.submitted ? "Submitted" : "Not Started"}
//             </p>
//           </Card>
//           <Card padding="16px">
//             <p style={{ color: C.text.tertiary, fontSize: 12 }}>Course Details</p>
//             <p style={{ color: courseDetailsApproved ? C.accent.green : courseDetailsPending ? C.accent.gold : C.text.primary, fontSize: 24, fontWeight: 700 }}>
//               {courseDetailsApproved ? "Approved" : courseDetailsPending ? "Pending" : courseDetails.length > 0 ? "Submitted" : "Not Started"}
//             </p>
//           </Card>
//           <Card padding="16px">
//             <p style={{ color: C.text.tertiary, fontSize: 12 }}>Appointments</p>
//             <p style={{ color: C.accent.blue, fontSize: 24, fontWeight: 700 }}>{pendingAppointments.length} Pending</p>
//           </Card>
//           <Card padding="16px">
//             <p style={{ color: C.text.tertiary, fontSize: 12 }}>Workload</p>
//             <p style={{ color: C.accent.gold, fontSize: 24, fontWeight: 700 }}>{faculty?.assignedHours || 0}/{faculty?.maxHours}h</p>
//           </Card>
//         </div>
        
//         {/* Class Teacher & Course Lead Info */}
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
//           {classTeacherInfo && (
//             <Card style={{ background: C.accent.greenBg }}>
//               <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
//                 <span style={{ fontSize: 24 }}>👨‍🏫</span>
//                 <h4 style={{ color: C.accent.green, margin: 0 }}>Class Teacher</h4>
//               </div>
//               <p><strong>Course:</strong> {classTeacherInfo.course}</p>
//               <p><strong>Semester:</strong> {classTeacherInfo.semester}</p>
//               <p><strong>Section:</strong> {classTeacherInfo.section}</p>
//               <p><strong>Assigned on:</strong> {new Date(classTeacherInfo.assignedDate).toLocaleDateString()}</p>
//             </Card>
//           )}
          
//           {courseLeadInfo && (
//             <Card style={{ background: C.accent.blueBg }}>
//               <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
//                 <span style={{ fontSize: 24 }}>👨‍💼</span>
//                 <h4 style={{ color: C.accent.blue, margin: 0 }}>Course Lead</h4>
//               </div>
//               <p><strong>Course:</strong> {courseLeadInfo.course}</p>
//               <p><strong>Assigned on:</strong> {new Date(courseLeadInfo.assignedDate).toLocaleDateString()}</p>
//             </Card>
//           )}
//         </div>
        
//         {/* Recent Activity / Next Steps */}
//         <Card>
//           <Title level={4}>Next Steps</Title>
//           <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//             {!preference?.submitted && isFormOpen && (
//               <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
//                 <span>📝 Submit your subject preferences</span>
//                 <Button onClick={() => setActive("forms")} variant="primary" size="sm">Go to Forms</Button>
//               </div>
//             )}
//             {preferenceApproved && courseDetails.length === 0 && (
//               <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
//                 <span>📚 Submit detailed course information</span>
//                 <Button onClick={() => setActive("forms")} variant="primary" size="sm">Go to Forms</Button>
//               </div>
//             )}
//             {courseDetailsApproved && schedule.length === 0 && (
//               <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
//                 <span>📅 Your timetable is being generated</span>
//                 <Button onClick={() => setActive("schedule")} variant="primary" size="sm">View Schedule</Button>
//               </div>
//             )}
//             {schedule.length > 0 && (
//               <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
//                 <span>📖 Update your syllabus progress</span>
//                 <Button onClick={() => setActive("syllabus")} variant="primary" size="sm">Go to Syllabus</Button>
//               </div>
//             )}
//             {!classTeacherInfo && !courseLeadInfo && (
//               <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
//                 <span>📍 Set up your office location for student appointments</span>
//                 <Button onClick={() => setActive("location")} variant="primary" size="sm">Set Location</Button>
//               </div>
//             )}
//             {preferenceApproved && courseDetailsApproved && schedule.length > 0 && (
//               <div style={{ padding: 12, background: C.accent.greenBg, borderRadius: 8, textAlign: "center" }}>
//                 <span style={{ color: C.accent.green }}>✓ All tasks completed! Your onboarding is complete.</span>
//               </div>
//             )}
//           </div>
//         </Card>
        
//         {/* Upcoming Appointments Preview */}
//         {pendingAppointments.length > 0 && (
//           <Card>
//             <Title level={4}>Pending Appointment Requests</Title>
//             <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//               {pendingAppointments.slice(0, 3).map(app => (
//                 <div key={app.id} style={{ padding: 8, background: C.cardHover, borderRadius: 8 }}>
//                   <p><strong>{app.studentName}</strong> - {app.studentCourse} Sem {app.studentSemester}</p>
//                   <p style={{ fontSize: 12, color: C.text.tertiary }}>Reason: {app.reason}</p>
//                 </div>
//               ))}
//               {pendingAppointments.length > 3 && (
//                 <Button onClick={() => setActive("appointments")} variant="secondary" size="sm">
//                   View all {pendingAppointments.length} requests
//                 </Button>
//               )}
//             </div>
//           </Card>
//         )}
//       </div>
//     ),
    
//     forms: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//         <Title>Faculty Onboarding Forms - {faculty?.course}</Title>
        
//         {/* Form Status Message */}
//         {!formStatus.isFloated && (
//           <Card style={{ background: C.accent.goldBg, textAlign: "center" }}>
//             <div style={{ padding: "20px" }}>
//               <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
//               <h3 style={{ color: C.accent.gold, marginBottom: 8 }}>Preference Form Not Yet Available</h3>
//               <p style={{ color: C.text.secondary }}>
//                 The preference form has not been floated by the Director yet. 
//                 Please check back later when the form is released.
//               </p>
//             </div>
//           </Card>
//         )}
        
//         {formStatus.isFloated && isDeadlinePassed && (
//           <Card style={{ background: C.accent.redBg, textAlign: "center" }}>
//             <div style={{ padding: "20px" }}>
//               <div style={{ fontSize: 48, marginBottom: 16 }}>⏰</div>
//               <h3 style={{ color: C.accent.red, marginBottom: 8 }}>Submission Deadline Passed</h3>
//               <p style={{ color: C.text.secondary }}>
//                 The submission deadline ({new Date(formStatus.deadline).toLocaleString()}) has passed.
//                 You cannot submit preferences at this time.
//               </p>
//             </div>
//           </Card>
//         )}
        
//         {/* Show preference form if open and not submitted */}
//         {formStatus.isFloated && !isDeadlinePassed && !preference?.submitted && (
//           <>
//             <div style={{ padding: 12, background: C.accent.greenBg, borderRadius: 8, marginBottom: 8 }}>
//               <p style={{ color: C.accent.green, margin: 0, textAlign: "center" }}>
//                 ✓ Preference form is OPEN! Please submit your preferences before {new Date(formStatus.deadline).toLocaleString()}
//               </p>
//             </div>
//             <FacultyPreferenceForm faculty={faculty} onComplete={forceUpdate} />
//           </>
//         )}
        
//         {/* Waiting for Dean Approval */}
//         {preferencePending && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.goldBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ⏳
//               </div>
//               <div>
//                 <h4 style={{ color: C.text.primary, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Subject Preferences Submitted</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Waiting for Dean's approval.</p>
//                 {preference.feedback && (
//                   <p style={{ color: C.accent.gold, fontSize: 13, marginTop: 8 }}>Feedback: {preference.feedback}</p>
//                 )}
//               </div>
//             </div>
//           </Card>
//         )}
        
//         {/* Preferences Rejected by Dean */}
//         {preferenceRejected && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.redBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ✗
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.red, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Subject Preferences Rejected</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Please revise and resubmit.</p>
//                 {preference.feedback && (
//                   <p style={{ color: C.accent.red, fontSize: 13, marginTop: 8 }}>Feedback: {preference.feedback}</p>
//                 )}
//               </div>
//             </div>
//             {isFormOpen ? (
//               <Button onClick={() => { AppState.resetPreferenceForm(faculty.id); forceUpdate(); }} variant="primary" fullWidth>
//                 Resubmit Preferences
//               </Button>
//             ) : (
//               <p style={{ color: C.accent.red, textAlign: "center" }}>
//                 The preference form is currently closed. Cannot resubmit at this time.
//               </p>
//             )}
//           </Card>
//         )}
        
//         {/* Preferences Approved by Dean - Show Detailed Course Form */}
//         {preferenceApproved && courseDetails.length === 0 && (
//           <FacultyDetailedCourseForm 
//             faculty={faculty} 
//             allocatedSubjects={preference.preferences?.map(p => p.subjectId)} 
//             onComplete={forceUpdate} 
//           />
//         )}
        
//         {/* Course Details Submitted - Waiting for Dean Approval */}
//         {preferenceApproved && courseDetails.length > 0 && courseDetailsPending && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.goldBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ⏳
//               </div>
//               <div>
//                 <h4 style={{ color: C.text.primary, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Detailed Course Information Submitted</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Waiting for Dean's approval.</p>
//               </div>
//             </div>
//           </Card>
//         )}
        
//         {/* Course Details Rejected by Dean */}
//         {courseDetailsRejected && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.redBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ✗
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.red, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Course Details Rejected</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Please review the feedback and resubmit.</p>
//                 {courseDetails[0]?.deanFeedback && (
//                   <p style={{ color: C.accent.red, fontSize: 13, marginTop: 8 }}>Feedback: {courseDetails[0].deanFeedback}</p>
//                 )}
//               </div>
//             </div>
//             <Button onClick={() => {
//               AppState.courseDetails = AppState.courseDetails.filter(c => c.facultyId !== faculty.id);
//               saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
//               forceUpdate();
//             }} variant="primary" fullWidth>
//               Resubmit Course Details
//             </Button>
//           </Card>
//         )}
        
//         {/* Course Details Approved by Dean - Final Step */}
//         {courseDetailsApproved && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.greenBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ✓
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.green, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>All Forms Approved by Dean!</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Your schedule has been generated. Use the Syllabus Tracker to update module completion.</p>
//               </div>
//             </div>
//           </Card>
//         )}
//       </div>
//     ),
    
//     status: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//         <Title>Submission Status - {faculty?.course}</Title>
        
//         <Card>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//             <span style={{ color: C.text.primary, fontWeight: 600 }}>Form Status</span>
//             <Badge variant={formStatus.isFloated ? "success" : "warning"}>
//               {formStatus.isFloated ? "Open" : "Not Yet Released"}
//             </Badge>
//           </div>
//           {formStatus.isFloated && formStatus.deadline && (
//             <p style={{ color: C.text.secondary, fontSize: 13, marginBottom: 16 }}>
//               Deadline: {new Date(formStatus.deadline).toLocaleString()}
//             </p>
//           )}
//         </Card>
        
//         <Card>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//             <span style={{ color: C.text.primary, fontWeight: 600 }}>Subject Preferences</span>
//             <Badge variant={
//               preference?.status === "approved" ? "success" : 
//               preference?.status === "pending" ? "warning" : "danger"
//             }>
//               {preference?.status === "approved" ? "Approved by Dean" : 
//                preference?.status === "pending" ? "Pending Dean Approval" : 
//                preference?.status === "rejected" ? "Rejected" : "Not Submitted"}
//             </Badge>
//           </div>
//           {preference?.submitted && (
//             <div>
//               {preference.preferences?.map(p => {
//                 const subject = AppState.subjects.find(s => s.id === p.subjectId);
//                 return (
//                   <div key={p.level} style={{
//                     padding: "8px 12px",
//                     background: C.cardHover,
//                     borderRadius: 8,
//                     marginBottom: 4,
//                   }}>
//                     <span style={{ color: p.level === 1 ? C.accent.gold : p.level === 2 ? C.accent.blue : C.accent.green }}>
//                       Preference {p.level}:
//                     </span>
//                     <span style={{ color: C.text.primary, marginLeft: 8 }}>{subject?.name}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </Card>
        
//         <Card>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//             <span style={{ color: C.text.primary, fontWeight: 600 }}>Detailed Course Information</span>
//             {courseDetails.length > 0 ? (
//               <div style={{ display: "flex", gap: 8 }}>
//                 <Badge variant={courseDetails.every(c => c.deanStatus === "approved") ? "success" : "warning"}>
//                   Dean: {courseDetails.every(c => c.deanStatus === "approved") ? "Approved" : "Pending"}
//                 </Badge>
//               </div>
//             ) : (
//               <Badge variant="danger">Locked (Complete Preferences First)</Badge>
//             )}
//           </div>
//           {courseDetails.map(c => (
//             <div key={c.id} style={{
//               padding: "12px",
//               background: C.cardHover,
//               borderRadius: 8,
//               marginBottom: 8,
//             }}>
//               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
//                 <span style={{ color: C.accent.blue, fontWeight: 500 }}>{c.subjectName}</span>
//                 <Badge variant={c.deanStatus === "approved" ? "success" : "warning"}>
//                   {c.deanStatus === "approved" ? "Dean Approved" : "Pending Dean"}
//                 </Badge>
//               </div>
//               <div style={{ display: "flex", gap: 16, fontSize: 12, color: C.text.tertiary }}>
//                 <span>{c.credits} Credits</span>
//                 <span>{c.modules} Modules</span>
//                 <span>Semester {c.semester}</span>
//               </div>
//               {c.deanFeedback && (
//                 <p style={{ color: C.accent.red, fontSize: 11, marginTop: 8 }}>Feedback: {c.deanFeedback}</p>
//               )}
//             </div>
//           ))}
//         </Card>
//       </div>
//     ),
    
//     syllabus: <FacultySyllabusTracker faculty={faculty} />,
    
//     schedule: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//         <Title>My Weekly Schedule</Title>
//         {schedule.length === 0 ? (
//           <Card>
//             <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>
//               {courseDetailsApproved ? "Schedule being generated..." : "Complete all forms and wait for dean's approval to see your schedule"}
//             </p>
//           </Card>
//         ) : (
//           <>
//             <WeeklyTimetableView schedule={schedule} title={`${faculty?.name} - ${faculty?.course}`} />
//             <Card>
//               <Title level={4}>Suggest Timetable Change</Title>
//               <p>If you notice any conflict or have a suggestion, please raise an issue.</p>
//               <Button
//                 onClick={() => {
//                   const reason = prompt("Describe your suggestion or conflict:");
//                   if (reason) {
//                     const newIssue = {
//                       id: Date.now(),
//                       type: "timetable_suggestion",
//                       facultyId: faculty.id,
//                       facultyName: faculty.name,
//                       reason,
//                       status: "pending",
//                       timestamp: new Date().toISOString(),
//                     };
//                     AppState.flaggedIssues.push(newIssue);
//                     saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
//                     alert("Issue raised. Director will review.");
//                   }
//                 }}
//                 variant="warning"
//               >
//                 Raise Issue
//               </Button>
//             </Card>
//           </>
//         )}
//       </div>
//     ),
    
//     appointments: <FacultyAppointments facultyId={faculty?.id} facultyName={faculty?.name} />,
    
//     location: <FacultyLocationSetup faculty={faculty} onComplete={forceUpdate} />,
    
//     requestLeave: <LeaveRequestForm faculty={faculty} onComplete={forceUpdate} />,
    
//     myLeaves: <FacultyLeaveStatus facultyId={faculty?.id} />,
    
//     profile: (
//       <Card>
//         <Title level={4}>Faculty Profile</Title>
//         <div style={{ display: "flex", gap: 32, alignItems: "center", marginTop: 20, flexWrap: "wrap" }}>
//           <div style={{
//             width: 100,
//             height: 100,
//             borderRadius: "50%",
//             background: `${faculty?.color}20`,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: 36,
//             fontWeight: 700,
//             color: faculty?.color,
//           }}>
//             {faculty?.avatar}
//           </div>
//           <div>
//             <h3 style={{ color: C.text.primary, fontSize: 24, fontWeight: 600, marginBottom: 8 }}>{faculty?.name}</h3>
//             <p style={{ color: C.accent.blue, fontSize: 15, marginBottom: 4 }}>ID: {faculty?.facultyId}</p>
//             <p style={{ color: C.accent.blue, fontSize: 15, marginBottom: 4 }}>{faculty?.designation}</p>
//             <p style={{ color: C.text.secondary, fontSize: 14, marginBottom: 4 }}>Course: {faculty?.course}</p>
//             <p style={{ color: C.text.secondary, fontSize: 14 }}>Specialization: {faculty?.specialization}</p>
//           </div>
//         </div>
        
//         {/* Class Teacher Information with Section */}
//         {classTeacherInfo && (
//           <div style={{ marginTop: 16, padding: 16, background: C.accent.greenBg, borderRadius: 12 }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
//               <span style={{ fontSize: 20 }}>👨‍🏫</span>
//               <h5 style={{ color: C.accent.green, fontSize: 14, fontWeight: 600, margin: 0 }}>Class Teacher</h5>
//             </div>
//             <p style={{ margin: 0 }}>
//               <strong>Course:</strong> {classTeacherInfo.course}<br />
//               <strong>Semester:</strong> {classTeacherInfo.semester}<br />
//               <strong>Section:</strong> {classTeacherInfo.section}<br />
//               <strong>Assigned on:</strong> {new Date(classTeacherInfo.assignedDate).toLocaleDateString()}
//             </p>
//           </div>
//         )}
        
//         {/* Course Lead Information */}
//         {courseLeadInfo && (
//           <div style={{ marginTop: 16, padding: 16, background: C.accent.blueBg, borderRadius: 12 }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
//               <span style={{ fontSize: 20 }}>👨‍💼</span>
//               <h5 style={{ color: C.accent.blue, fontSize: 14, fontWeight: 600, margin: 0 }}>Course Lead</h5>
//             </div>
//             <p style={{ margin: 0 }}>
//               <strong>Course:</strong> {courseLeadInfo.course}<br />
//               <strong>Assigned on:</strong> {new Date(courseLeadInfo.assignedDate).toLocaleDateString()}
//             </p>
//           </div>
//         )}
        
//         <div style={{ marginTop: 16, padding: 16, background: C.cardHover, borderRadius: 12 }}>
//           <h5 style={{ color: C.text.primary, fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Workload Information</h5>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
//             <div>
//               <span style={{ color: C.text.tertiary, fontSize: 12 }}>Max Hours/Week</span>
//               <p style={{ color: C.accent.blue, fontSize: 20, fontWeight: 600 }}>{faculty?.maxHours}h</p>
//             </div>
//             <div>
//               <span style={{ color: C.text.tertiary, fontSize: 12 }}>Assigned Hours</span>
//               <p style={{ color: C.accent.gold, fontSize: 20, fontWeight: 600 }}>{faculty?.assignedHours || 0}h</p>
//             </div>
//             <div>
//               <span style={{ color: C.text.tertiary, fontSize: 12 }}>Remaining Hours</span>
//               <p style={{ color: C.accent.green, fontSize: 20, fontWeight: 600 }}>{faculty?.remainingHours || faculty?.maxHours}h</p>
//             </div>
//           </div>
//         </div>
        
//         {/* Current Location Display in Profile */}
//         {faculty?.block && (
//           <div style={{ marginTop: 16, padding: 16, background: C.accent.blueBg, borderRadius: 12 }}>
//             <h5 style={{ color: C.accent.blue, fontSize: 14, fontWeight: 600, marginBottom: 8 }}>📍 Office Location</h5>
//             <p style={{ margin: 0 }}>
//               {faculty.block}, {faculty.floor}<br />
//               Room {faculty.roomNumber} {faculty.cabinLocation && `(${faculty.cabinLocation})`}
//             </p>
//           </div>
//         )}
//       </Card>
//     ),
//   };

//   if (!faculty) {
//     return (
//       <div style={{ display: "flex", minHeight: "100vh", background: C.bg, alignItems: "center", justifyContent: "center" }}>
//         <Card>
//           <p style={{ color: C.text.tertiary, textAlign: "center" }}>Loading faculty data...</p>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
//       <Sidebar 
//         navItems={FAC_NAV} 
//         active={active} 
//         setActive={setActive} 
//         collapsed={collapsed} 
//         setCollapsed={setCollapsed} 
//         user={user} 
//         badges={{ forms: preference?.status === "pending" ? 1 : 0, appointments: pendingAppointments.length }} 
//         accentColor={C.accent.blue} 
//       />
//       <main style={{ flex: 1, overflow: "auto" }}>
//         <header style={{
//           background: C.nav,
//           borderBottom: `1px solid ${C.navBorder}`,
//           padding: "16px 32px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           position: "sticky",
//           top: 0,
//           zIndex: 10,
//           flexWrap: "wrap",
//           gap: 12,
//         }}>
//           <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>{FAC_NAV.find(n => n.id === active)?.label}</h2>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             {formStatus.isFloated && !preference?.submitted && (
//               <Badge variant="success">Form Open</Badge>
//             )}
//             {!formStatus.isFloated && (
//               <Badge variant="warning">Form Closed</Badge>
//             )}
//             <Badge variant={
//               preference?.status === "approved" ? "success" : 
//               preference?.status === "pending" ? "warning" : "danger"
//             }>
//               {preference?.status === "approved" ? "Dean Approved" : 
//                preference?.status === "pending" ? "Pending Dean" : 
//                preference?.status === "rejected" ? "Rejected" : "Not Started"}
//             </Badge>
//           </div>
//         </header>
//         <div style={{ padding: 32 }}>{panels[active]}</div>
//       </main>
//     </div>
//   );
// }

// src/components/faculty/FacultyDashboard.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { Sidebar, Card, Title, Badge, Button } from "../common";
import { WeeklyTimetableView } from "../shared/WeeklyTimetableView";
import { FacultyPreferenceForm } from "./FacultyPreferenceForm";
import { FacultyDetailedCourseForm } from "./FacultyDetailedCourseForm";
import { FacultySyllabusTracker } from "./FacultySyllabusTracker";
import { LeaveRequestForm } from "./LeaveRequestForm";
import { FacultyLeaveStatus } from "./FacultyLeaveStatus";
import { FacultyAppointments } from "./FacultyAppointments";
import { FacultyLocationSetup } from "./FacultyLocationSetup";
import { AppState } from "../../AppState";
import { C } from "../../styles/theme";
import { saveToStorage, STORAGE_KEYS, loadFromStorage } from "../../utils/storage";

export function FacultyDashboard() {
  const { user } = useAuth();
  const [active, setActive] = useState("overview");
  const [collapsed, setCollapsed] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [formStatus, setFormStatus] = useState({
    isFloated: false,
    floatedDate: null,
    floatedBy: null,
    semester: "2025",
    deadline: null
  });
  const [classTeacherInfo, setClassTeacherInfo] = useState(null);
  const [courseLeadInfo, setCourseLeadInfo] = useState(null);
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [activeDepartment, setActiveDepartment] = useState(null);
  const [departmentStatus, setDepartmentStatus] = useState({});
  
  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      loadFormStatus();
      loadClassTeacherInfo();
      loadCourseLeadInfo();
      loadPendingAppointments();
      loadDepartmentStatus();
      setRefresh(r => r + 1);
    };
    
    loadFormStatus();
    loadClassTeacherInfo();
    loadCourseLeadInfo();
    loadPendingAppointments();
    loadDepartmentStatus();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  const loadFormStatus = () => {
    const allStatus = loadFromStorage(STORAGE_KEYS.FORM_STATUS, {});
    const deptStatus = allStatus[faculty?.course] || {
      isFloated: false,
      floatedDate: null,
      floatedBy: null,
      semester: "2025",
      deadline: null
    };
    setFormStatus(deptStatus);
  };
  
  const loadDepartmentStatus = () => {
    const active = loadFromStorage(STORAGE_KEYS.ACTIVE_DEPARTMENT, null);
    const status = loadFromStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, {});
    setActiveDepartment(active);
    setDepartmentStatus(status);
  };
  
  const loadClassTeacherInfo = () => {
    const facultyId = faculty?.id;
    if (!facultyId) return;
    
    const classTeachers = loadFromStorage(STORAGE_KEYS.CLASS_TEACHERS, {});
    let found = null;
    
    for (const course in classTeachers) {
      for (const semester in classTeachers[course]) {
        for (const section in classTeachers[course][semester]) {
          if (classTeachers[course][semester][section].facultyId === facultyId) {
            found = {
              course,
              semester,
              section,
              assignedDate: classTeachers[course][semester][section].assignedDate
            };
            break;
          }
        }
        if (found) break;
      }
      if (found) break;
    }
    setClassTeacherInfo(found);
  };
  
  const loadCourseLeadInfo = () => {
    const facultyId = faculty?.id;
    if (!facultyId) return;
    
    const courseLeads = loadFromStorage(STORAGE_KEYS.COURSE_LEADS, {});
    let found = null;
    
    for (const course in courseLeads) {
      if (courseLeads[course]?.facultyId === facultyId) {
        found = {
          course,
          assignedDate: courseLeads[course].assignedDate
        };
        break;
      }
    }
    setCourseLeadInfo(found);
  };
  
  const loadPendingAppointments = () => {
    const allAppointments = loadFromStorage(STORAGE_KEYS.APPOINTMENTS, []);
    const pending = allAppointments.filter(a => a.facultyId === faculty?.id && a.status === "pending");
    setPendingAppointments(pending);
  };
  
  // Get fresh data on refresh
  useEffect(() => {
    const loadFreshData = () => {
      AppState.faculty = JSON.parse(localStorage.getItem(STORAGE_KEYS.FACULTY) || '[]');
      AppState.subjects = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBJECTS) || '[]');
      AppState.subjectPreferences = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBJECT_PREFERENCES) || '[]');
      AppState.courseDetails = JSON.parse(localStorage.getItem(STORAGE_KEYS.COURSE_DETAILS) || '[]');
      AppState.semesterDetails = JSON.parse(localStorage.getItem(STORAGE_KEYS.SEMESTER_DETAILS) || '{}');
    };
    
    loadFreshData();
  }, [refresh]);
  
  const faculty = AppState.faculty.find(f => f.id === user.id);
  const preference = AppState.getPreferenceByFacultyId(user.id);
  const courseDetails = AppState.getCourseDetailsByFacultyId(user.id);
  const schedule = AppState.getFacultySchedule(user.id);
  
  // Status checks for the workflow
  const preferencePending = preference?.submitted && preference?.status === "pending";
  const preferenceApproved = preference?.status === "approved";
  const preferenceRejected = preference?.status === "rejected";
  
  // Course details status
  const courseDetailsPending = courseDetails.length > 0 && courseDetails.every(c => c.deanStatus === "pending");
  const courseDetailsApproved = courseDetails.length > 0 && courseDetails.every(c => c.deanStatus === "approved");
  const courseDetailsRejected = courseDetails.length > 0 && courseDetails.every(c => c.deanStatus === "rejected");
  
  // Check if form is floated and deadline hasn't passed
  const isFormOpen = formStatus.isFloated && (!formStatus.deadline || new Date() <= new Date(formStatus.deadline));
  const isDeadlinePassed = formStatus.deadline && new Date() > new Date(formStatus.deadline);
  
  // Department timetable status
  const isDeptActive = activeDepartment === faculty?.course;
  const isDeptCompleted = departmentStatus[faculty?.course]?.completed;
  const canViewSchedule = isDeptActive || isDeptCompleted;
  
  const forceUpdate = () => {
    setRefresh(r => r + 1);
    window.dispatchEvent(new Event('storage'));
  };
  
  const FAC_NAV = [
    { id: "overview", icon: "📊", label: "Overview" },
    { id: "forms", icon: "📝", label: "Preference Forms" },
    { id: "status", icon: "📊", label: "Submission Status" },
    { id: "syllabus", icon: "📚", label: "Syllabus Tracker" },
    { id: "schedule", icon: "📅", label: "My Schedule" },
    { id: "appointments", icon: "📅", label: "Appointments" },
    { id: "location", icon: "📍", label: "Office Location" },
    { id: "requestLeave", icon: "📝", label: "Request Leave" },
    { id: "myLeaves", icon: "📋", label: "My Leave Requests" },
    { id: "profile", icon: "👤", label: "Profile" },
  ];
  
  const panels = {
    overview: (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Title>Faculty Dashboard Overview</Title>
        
        {/* Department Timetable Status Warning */}
        {!isDeptActive && !isDeptCompleted && (
          <Card style={{ background: C.accent.goldBg }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 24 }}>⏳</span>
              <div>
                <h4 style={{ color: C.accent.gold, margin: 0 }}>Timetable Not Yet Available</h4>
                <p style={{ color: C.text.secondary, margin: 0 }}>
                  Your department's timetable ({faculty?.course}) has not been activated yet. 
                  The Director will activate it when ready.
                </p>
              </div>
            </div>
          </Card>
        )}
        
        {isDeptActive && !schedule.length && (
          <Card style={{ background: C.accent.blueBg }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 24 }}>🔄</span>
              <div>
                <h4 style={{ color: C.accent.blue, margin: 0 }}>Timetable Being Generated</h4>
                <p style={{ color: C.text.secondary, margin: 0 }}>
                  Your department's timetable ({faculty?.course}) is currently being generated. 
                  Please check back soon.
                </p>
              </div>
            </div>
          </Card>
        )}
        
        {isDeptCompleted && (
          <Card style={{ background: C.accent.greenBg }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 24 }}>✅</span>
              <div>
                <h4 style={{ color: C.accent.green, margin: 0 }}>Timetable Ready</h4>
                <p style={{ color: C.text.secondary, margin: 0 }}>
                  Your department's timetable ({faculty?.course}) has been generated and is ready to view.
                </p>
              </div>
            </div>
          </Card>
        )}
        
        {/* Welcome Card */}
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <div style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: `${faculty?.color}20`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 700,
              color: faculty?.color,
            }}>
              {faculty?.avatar}
            </div>
            <div>
              <h2 style={{ color: C.text.primary, marginBottom: 4 }}>Welcome, {faculty?.name}</h2>
              <p style={{ color: C.text.secondary }}>{faculty?.designation} | {faculty?.course}</p>
              <p style={{ color: C.text.tertiary, fontSize: 13 }}>ID: {faculty?.facultyId} | Email: {faculty?.email}</p>
            </div>
          </div>
        </Card>
        
        {/* Quick Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          <Card padding="16px">
            <p style={{ color: C.text.tertiary, fontSize: 12 }}>Preference Status</p>
            <p style={{ color: preferenceApproved ? C.accent.green : preferencePending ? C.accent.gold : C.text.primary, fontSize: 24, fontWeight: 700 }}>
              {preferenceApproved ? "Approved" : preferencePending ? "Pending" : preference?.submitted ? "Submitted" : "Not Started"}
            </p>
          </Card>
          <Card padding="16px">
            <p style={{ color: C.text.tertiary, fontSize: 12 }}>Course Details</p>
            <p style={{ color: courseDetailsApproved ? C.accent.green : courseDetailsPending ? C.accent.gold : C.text.primary, fontSize: 24, fontWeight: 700 }}>
              {courseDetailsApproved ? "Approved" : courseDetailsPending ? "Pending" : courseDetails.length > 0 ? "Submitted" : "Not Started"}
            </p>
          </Card>
          <Card padding="16px">
            <p style={{ color: C.text.tertiary, fontSize: 12 }}>Appointments</p>
            <p style={{ color: C.accent.blue, fontSize: 24, fontWeight: 700 }}>{pendingAppointments.length} Pending</p>
          </Card>
          <Card padding="16px">
            <p style={{ color: C.text.tertiary, fontSize: 12 }}>Workload</p>
            <p style={{ color: C.accent.gold, fontSize: 24, fontWeight: 700 }}>{faculty?.assignedHours || 0}/{faculty?.maxHours}h</p>
          </Card>
        </div>
        
        {/* Class Teacher & Course Lead Info */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
          {classTeacherInfo && (
            <Card style={{ background: C.accent.greenBg }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 24 }}>👨‍🏫</span>
                <h4 style={{ color: C.accent.green, margin: 0 }}>Class Teacher</h4>
              </div>
              <p><strong>Course:</strong> {classTeacherInfo.course}</p>
              <p><strong>Semester:</strong> {classTeacherInfo.semester}</p>
              <p><strong>Section:</strong> {classTeacherInfo.section}</p>
              <p><strong>Assigned on:</strong> {new Date(classTeacherInfo.assignedDate).toLocaleDateString()}</p>
            </Card>
          )}
          
          {courseLeadInfo && (
            <Card style={{ background: C.accent.blueBg }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 24 }}>👨‍💼</span>
                <h4 style={{ color: C.accent.blue, margin: 0 }}>Course Lead</h4>
              </div>
              <p><strong>Course:</strong> {courseLeadInfo.course}</p>
              <p><strong>Assigned on:</strong> {new Date(courseLeadInfo.assignedDate).toLocaleDateString()}</p>
            </Card>
          )}
        </div>
        
        {/* Recent Activity / Next Steps */}
        <Card>
          <Title level={4}>Next Steps</Title>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {!preference?.submitted && isFormOpen && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                <span>📝 Submit your subject preferences</span>
                <Button onClick={() => setActive("forms")} variant="primary" size="sm">Go to Forms</Button>
              </div>
            )}
            {preferenceApproved && courseDetails.length === 0 && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                <span>📚 Submit detailed course information</span>
                <Button onClick={() => setActive("forms")} variant="primary" size="sm">Go to Forms</Button>
              </div>
            )}
            {courseDetailsApproved && schedule.length === 0 && isDeptActive && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                <span>📅 Your timetable is being generated</span>
                <Button onClick={() => setActive("schedule")} variant="primary" size="sm">View Schedule</Button>
              </div>
            )}
            {courseDetailsApproved && schedule.length === 0 && !isDeptActive && !isDeptCompleted && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                <span>⏳ Waiting for department timetable activation</span>
                <Badge variant="warning">Pending</Badge>
              </div>
            )}
            {schedule.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                <span>📖 Update your syllabus progress</span>
                <Button onClick={() => setActive("syllabus")} variant="primary" size="sm">Go to Syllabus</Button>
              </div>
            )}
            {!classTeacherInfo && !courseLeadInfo && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                <span>📍 Set up your office location for student appointments</span>
                <Button onClick={() => setActive("location")} variant="primary" size="sm">Set Location</Button>
              </div>
            )}
            {preferenceApproved && courseDetailsApproved && schedule.length > 0 && (
              <div style={{ padding: 12, background: C.accent.greenBg, borderRadius: 8, textAlign: "center" }}>
                <span style={{ color: C.accent.green }}>✓ All tasks completed! Your onboarding is complete.</span>
              </div>
            )}
          </div>
        </Card>
        
        {/* Upcoming Appointments Preview */}
        {pendingAppointments.length > 0 && (
          <Card>
            <Title level={4}>Pending Appointment Requests</Title>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {pendingAppointments.slice(0, 3).map(app => (
                <div key={app.id} style={{ padding: 8, background: C.cardHover, borderRadius: 8 }}>
                  <p><strong>{app.studentName}</strong> - {app.studentCourse} Sem {app.studentSemester}</p>
                  <p style={{ fontSize: 12, color: C.text.tertiary }}>Reason: {app.reason}</p>
                </div>
              ))}
              {pendingAppointments.length > 3 && (
                <Button onClick={() => setActive("appointments")} variant="secondary" size="sm">
                  View all {pendingAppointments.length} requests
                </Button>
              )}
            </div>
          </Card>
        )}
      </div>
    ),
    
    forms: (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Title>Faculty Onboarding Forms - {faculty?.course}</Title>
        
        {/* Form Status Message */}
        {!formStatus.isFloated && (
          <Card style={{ background: C.accent.goldBg, textAlign: "center" }}>
            <div style={{ padding: "20px" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
              <h3 style={{ color: C.accent.gold, marginBottom: 8 }}>Preference Form Not Yet Available</h3>
              <p style={{ color: C.text.secondary }}>
                The preference form has not been floated by the Director yet. 
                Please check back later when the form is released.
              </p>
            </div>
          </Card>
        )}
        
        {formStatus.isFloated && isDeadlinePassed && (
          <Card style={{ background: C.accent.redBg, textAlign: "center" }}>
            <div style={{ padding: "20px" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>⏰</div>
              <h3 style={{ color: C.accent.red, marginBottom: 8 }}>Submission Deadline Passed</h3>
              <p style={{ color: C.text.secondary }}>
                The submission deadline ({new Date(formStatus.deadline).toLocaleString()}) has passed.
                You cannot submit preferences at this time.
              </p>
            </div>
          </Card>
        )}
        
        {/* Show preference form if open and not submitted */}
        {formStatus.isFloated && !isDeadlinePassed && !preference?.submitted && (
          <>
            <div style={{ padding: 12, background: C.accent.greenBg, borderRadius: 8, marginBottom: 8 }}>
              <p style={{ color: C.accent.green, margin: 0, textAlign: "center" }}>
                ✓ Preference form is OPEN! Please submit your preferences before {new Date(formStatus.deadline).toLocaleString()}
              </p>
            </div>
            <FacultyPreferenceForm faculty={faculty} onComplete={forceUpdate} />
          </>
        )}
        
        {/* Waiting for Dean Approval */}
        {preferencePending && (
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: C.accent.goldBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
              }}>
                ⏳
              </div>
              <div>
                <h4 style={{ color: C.text.primary, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Subject Preferences Submitted</h4>
                <p style={{ color: C.text.secondary, fontSize: 14 }}>Waiting for Dean's approval.</p>
                {preference.feedback && (
                  <p style={{ color: C.accent.gold, fontSize: 13, marginTop: 8 }}>Feedback: {preference.feedback}</p>
                )}
              </div>
            </div>
          </Card>
        )}
        
        {/* Preferences Rejected by Dean */}
        {preferenceRejected && (
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
              <div style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: C.accent.redBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
              }}>
                ✗
              </div>
              <div>
                <h4 style={{ color: C.accent.red, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Subject Preferences Rejected</h4>
                <p style={{ color: C.text.secondary, fontSize: 14 }}>Please revise and resubmit.</p>
                {preference.feedback && (
                  <p style={{ color: C.accent.red, fontSize: 13, marginTop: 8 }}>Feedback: {preference.feedback}</p>
                )}
              </div>
            </div>
            {isFormOpen ? (
              <Button onClick={() => { AppState.resetPreferenceForm(faculty.id); forceUpdate(); }} variant="primary" fullWidth>
                Resubmit Preferences
              </Button>
            ) : (
              <p style={{ color: C.accent.red, textAlign: "center" }}>
                The preference form is currently closed. Cannot resubmit at this time.
              </p>
            )}
          </Card>
        )}
        
        {/* Preferences Approved by Dean - Show Detailed Course Form */}
        {preferenceApproved && courseDetails.length === 0 && (
          <FacultyDetailedCourseForm 
            faculty={faculty} 
            allocatedSubjects={preference.preferences?.map(p => p.subjectId)} 
            onComplete={forceUpdate} 
          />
        )}
        
        {/* Course Details Submitted - Waiting for Dean Approval */}
        {preferenceApproved && courseDetails.length > 0 && courseDetailsPending && (
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: C.accent.goldBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
              }}>
                ⏳
              </div>
              <div>
                <h4 style={{ color: C.text.primary, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Detailed Course Information Submitted</h4>
                <p style={{ color: C.text.secondary, fontSize: 14 }}>Waiting for Dean's approval.</p>
              </div>
            </div>
          </Card>
        )}
        
        {/* Course Details Rejected by Dean */}
        {courseDetailsRejected && (
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
              <div style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: C.accent.redBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
              }}>
                ✗
              </div>
              <div>
                <h4 style={{ color: C.accent.red, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Course Details Rejected</h4>
                <p style={{ color: C.text.secondary, fontSize: 14 }}>Please review the feedback and resubmit.</p>
                {courseDetails[0]?.deanFeedback && (
                  <p style={{ color: C.accent.red, fontSize: 13, marginTop: 8 }}>Feedback: {courseDetails[0].deanFeedback}</p>
                )}
              </div>
            </div>
            <Button onClick={() => {
              AppState.courseDetails = AppState.courseDetails.filter(c => c.facultyId !== faculty.id);
              saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
              forceUpdate();
            }} variant="primary" fullWidth>
              Resubmit Course Details
            </Button>
          </Card>
        )}
        
        {/* Course Details Approved by Dean - Final Step */}
        {courseDetailsApproved && (
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: C.accent.greenBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
              }}>
                ✓
              </div>
              <div>
                <h4 style={{ color: C.accent.green, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>All Forms Approved by Dean!</h4>
                <p style={{ color: C.text.secondary, fontSize: 14 }}>Your schedule has been generated. Use the Syllabus Tracker to update module completion.</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    ),
    
    status: (
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <Title>Submission Status - {faculty?.course}</Title>
        
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <span style={{ color: C.text.primary, fontWeight: 600 }}>Form Status</span>
            <Badge variant={formStatus.isFloated ? "success" : "warning"}>
              {formStatus.isFloated ? "Open" : "Not Yet Released"}
            </Badge>
          </div>
          {formStatus.isFloated && formStatus.deadline && (
            <p style={{ color: C.text.secondary, fontSize: 13, marginBottom: 16 }}>
              Deadline: {new Date(formStatus.deadline).toLocaleString()}
            </p>
          )}
        </Card>
        
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <span style={{ color: C.text.primary, fontWeight: 600 }}>Subject Preferences</span>
            <Badge variant={
              preference?.status === "approved" ? "success" : 
              preference?.status === "pending" ? "warning" : "danger"
            }>
              {preference?.status === "approved" ? "Approved by Dean" : 
               preference?.status === "pending" ? "Pending Dean Approval" : 
               preference?.status === "rejected" ? "Rejected" : "Not Submitted"}
            </Badge>
          </div>
          {preference?.submitted && (
            <div>
              {preference.preferences?.map(p => {
                const subject = AppState.subjects.find(s => s.id === p.subjectId);
                return (
                  <div key={p.level} style={{
                    padding: "8px 12px",
                    background: C.cardHover,
                    borderRadius: 8,
                    marginBottom: 4,
                  }}>
                    <span style={{ color: p.level === 1 ? C.accent.gold : p.level === 2 ? C.accent.blue : C.accent.green }}>
                      Preference {p.level}:
                    </span>
                    <span style={{ color: C.text.primary, marginLeft: 8 }}>{subject?.name}</span>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
        
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <span style={{ color: C.text.primary, fontWeight: 600 }}>Detailed Course Information</span>
            {courseDetails.length > 0 ? (
              <div style={{ display: "flex", gap: 8 }}>
                <Badge variant={courseDetails.every(c => c.deanStatus === "approved") ? "success" : "warning"}>
                  Dean: {courseDetails.every(c => c.deanStatus === "approved") ? "Approved" : "Pending"}
                </Badge>
              </div>
            ) : (
              <Badge variant="danger">Locked (Complete Preferences First)</Badge>
            )}
          </div>
          {courseDetails.map(c => (
            <div key={c.id} style={{
              padding: "12px",
              background: C.cardHover,
              borderRadius: 8,
              marginBottom: 8,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ color: C.accent.blue, fontWeight: 500 }}>{c.subjectName}</span>
                <Badge variant={c.deanStatus === "approved" ? "success" : "warning"}>
                  {c.deanStatus === "approved" ? "Dean Approved" : "Pending Dean"}
                </Badge>
              </div>
              <div style={{ display: "flex", gap: 16, fontSize: 12, color: C.text.tertiary }}>
                <span>{c.credits} Credits</span>
                <span>{c.modules} Modules</span>
                <span>Semester {c.semester}</span>
              </div>
              {c.deanFeedback && (
                <p style={{ color: C.accent.red, fontSize: 11, marginTop: 8 }}>Feedback: {c.deanFeedback}</p>
              )}
            </div>
          ))}
        </Card>
      </div>
    ),
    
    syllabus: <FacultySyllabusTracker faculty={faculty} />,
    
    schedule: (
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <Title>My Weekly Schedule</Title>
        
        {!isDeptActive && !isDeptCompleted && (
          <Card style={{ background: C.accent.goldBg }}>
            <div style={{ textAlign: "center", padding: 20 }}>
              <span style={{ fontSize: 48 }}>⏳</span>
              <h3 style={{ color: C.accent.gold, marginTop: 12 }}>Timetable Not Yet Available</h3>
              <p style={{ color: C.text.secondary }}>
                Your department's timetable ({faculty?.course}) has not been activated yet.
                The Director will activate it when all approvals are complete.
              </p>
            </div>
          </Card>
        )}
        
        {isDeptActive && schedule.length === 0 && (
          <Card style={{ background: C.accent.blueBg }}>
            <div style={{ textAlign: "center", padding: 20 }}>
              <span style={{ fontSize: 48 }}>🔄</span>
              <h3 style={{ color: C.accent.blue, marginTop: 12 }}>Timetable Being Generated</h3>
              <p style={{ color: C.text.secondary }}>
                Your department's timetable is currently being generated. 
                This may take a few moments. Please refresh or check back soon.
              </p>
            </div>
          </Card>
        )}
        
        {schedule.length === 0 && !isDeptActive && !isDeptCompleted && (
          <Card>
            <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>
              Complete all forms and wait for the Director to activate your department's timetable generation.
            </p>
          </Card>
        )}
        
        {schedule.length > 0 && (
          <>
            <WeeklyTimetableView schedule={schedule} title={`${faculty?.name} - ${faculty?.course}`} />
            <Card>
              <Title level={4}>Suggest Timetable Change</Title>
              <p>If you notice any conflict or have a suggestion, please raise an issue.</p>
              <Button
                onClick={() => {
                  const reason = prompt("Describe your suggestion or conflict:");
                  if (reason) {
                    const newIssue = {
                      id: Date.now(),
                      type: "timetable_suggestion",
                      facultyId: faculty.id,
                      facultyName: faculty.name,
                      reason,
                      status: "pending",
                      timestamp: new Date().toISOString(),
                    };
                    AppState.flaggedIssues.push(newIssue);
                    saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
                    alert("Issue raised. Director will review.");
                  }
                }}
                variant="warning"
              >
                Raise Issue
              </Button>
            </Card>
          </>
        )}
      </div>
    ),
    
    appointments: <FacultyAppointments facultyId={faculty?.id} facultyName={faculty?.name} />,
    
    location: <FacultyLocationSetup faculty={faculty} onComplete={forceUpdate} />,
    
    requestLeave: <LeaveRequestForm faculty={faculty} onComplete={forceUpdate} />,
    
    myLeaves: <FacultyLeaveStatus facultyId={faculty?.id} />,
    
    profile: (
      <Card>
        <Title level={4}>Faculty Profile</Title>
        <div style={{ display: "flex", gap: 32, alignItems: "center", marginTop: 20, flexWrap: "wrap" }}>
          <div style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: `${faculty?.color}20`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            fontWeight: 700,
            color: faculty?.color,
          }}>
            {faculty?.avatar}
          </div>
          <div>
            <h3 style={{ color: C.text.primary, fontSize: 24, fontWeight: 600, marginBottom: 8 }}>{faculty?.name}</h3>
            <p style={{ color: C.accent.blue, fontSize: 15, marginBottom: 4 }}>ID: {faculty?.facultyId}</p>
            <p style={{ color: C.accent.blue, fontSize: 15, marginBottom: 4 }}>{faculty?.designation}</p>
            <p style={{ color: C.text.secondary, fontSize: 14, marginBottom: 4 }}>Course: {faculty?.course}</p>
            <p style={{ color: C.text.secondary, fontSize: 14 }}>Specialization: {faculty?.specialization}</p>
          </div>
        </div>
        
        {/* Department Timestamp Status in Profile */}
        <div style={{ marginTop: 16, padding: 12, background: C.cardHover, borderRadius: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>Department Timetable Status</span>
            {isDeptActive && <Badge variant="success">Active</Badge>}
            {isDeptCompleted && <Badge variant="primary">Completed</Badge>}
            {!isDeptActive && !isDeptCompleted && <Badge variant="warning">Pending</Badge>}
          </div>
        </div>
        
        {/* Class Teacher Information with Section */}
        {classTeacherInfo && (
          <div style={{ marginTop: 16, padding: 16, background: C.accent.greenBg, borderRadius: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>👨‍🏫</span>
              <h5 style={{ color: C.accent.green, fontSize: 14, fontWeight: 600, margin: 0 }}>Class Teacher</h5>
            </div>
            <p style={{ margin: 0 }}>
              <strong>Course:</strong> {classTeacherInfo.course}<br />
              <strong>Semester:</strong> {classTeacherInfo.semester}<br />
              <strong>Section:</strong> {classTeacherInfo.section}<br />
              <strong>Assigned on:</strong> {new Date(classTeacherInfo.assignedDate).toLocaleDateString()}
            </p>
          </div>
        )}
        
        {/* Course Lead Information */}
        {courseLeadInfo && (
          <div style={{ marginTop: 16, padding: 16, background: C.accent.blueBg, borderRadius: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>👨‍💼</span>
              <h5 style={{ color: C.accent.blue, fontSize: 14, fontWeight: 600, margin: 0 }}>Course Lead</h5>
            </div>
            <p style={{ margin: 0 }}>
              <strong>Course:</strong> {courseLeadInfo.course}<br />
              <strong>Assigned on:</strong> {new Date(courseLeadInfo.assignedDate).toLocaleDateString()}
            </p>
          </div>
        )}
        
        <div style={{ marginTop: 16, padding: 16, background: C.cardHover, borderRadius: 12 }}>
          <h5 style={{ color: C.text.primary, fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Workload Information</h5>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
            <div>
              <span style={{ color: C.text.tertiary, fontSize: 12 }}>Max Hours/Week</span>
              <p style={{ color: C.accent.blue, fontSize: 20, fontWeight: 600 }}>{faculty?.maxHours}h</p>
            </div>
            <div>
              <span style={{ color: C.text.tertiary, fontSize: 12 }}>Assigned Hours</span>
              <p style={{ color: C.accent.gold, fontSize: 20, fontWeight: 600 }}>{faculty?.assignedHours || 0}h</p>
            </div>
            <div>
              <span style={{ color: C.text.tertiary, fontSize: 12 }}>Remaining Hours</span>
              <p style={{ color: C.accent.green, fontSize: 20, fontWeight: 600 }}>{faculty?.remainingHours || faculty?.maxHours}h</p>
            </div>
          </div>
        </div>
        
        {/* Current Location Display in Profile */}
        {faculty?.block && (
          <div style={{ marginTop: 16, padding: 16, background: C.accent.blueBg, borderRadius: 12 }}>
            <h5 style={{ color: C.accent.blue, fontSize: 14, fontWeight: 600, marginBottom: 8 }}>📍 Office Location</h5>
            <p style={{ margin: 0 }}>
              {faculty.block}, {faculty.floor}<br />
              Room {faculty.roomNumber} {faculty.cabinLocation && `(${faculty.cabinLocation})`}
            </p>
          </div>
        )}
      </Card>
    ),
  };

  if (!faculty) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", background: C.bg, alignItems: "center", justifyContent: "center" }}>
        <Card>
          <p style={{ color: C.text.tertiary, textAlign: "center" }}>Loading faculty data...</p>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
      <Sidebar 
        navItems={FAC_NAV} 
        active={active} 
        setActive={setActive} 
        collapsed={collapsed} 
        setCollapsed={setCollapsed} 
        user={user} 
        badges={{ forms: preference?.status === "pending" ? 1 : 0, appointments: pendingAppointments.length }} 
        accentColor={C.accent.blue} 
      />
      <main style={{ flex: 1, overflow: "auto" }}>
        <header style={{
          background: C.nav,
          borderBottom: `1px solid ${C.navBorder}`,
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 10,
          flexWrap: "wrap",
          gap: 12,
        }}>
          <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>{FAC_NAV.find(n => n.id === active)?.label}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {formStatus.isFloated && !preference?.submitted && (
              <Badge variant="success">Form Open</Badge>
            )}
            {!formStatus.isFloated && (
              <Badge variant="warning">Form Closed</Badge>
            )}
            <Badge variant={
              preference?.status === "approved" ? "success" : 
              preference?.status === "pending" ? "warning" : "danger"
            }>
              {preference?.status === "approved" ? "Dean Approved" : 
               preference?.status === "pending" ? "Pending Dean" : 
               preference?.status === "rejected" ? "Rejected" : "Not Started"}
            </Badge>
            {isDeptActive && (
              <Badge variant="success" style={{ marginLeft: 8 }}>Dept Active</Badge>
            )}
            {isDeptCompleted && (
              <Badge variant="primary" style={{ marginLeft: 8 }}>Timetable Ready</Badge>
            )}
          </div>
        </header>
        <div style={{ padding: 32 }}>{panels[active]}</div>
      </main>
    </div>
  );
}