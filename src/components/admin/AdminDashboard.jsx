// import { useState, useEffect } from "react";
// import { useAuth } from "../auth/AuthContext";
// import { Sidebar, Card, Title, Badge, Button } from "../common";
// import { DeanCourseDetailsReview } from "./DeanCourseDetailsReview";
// import { AdminFlaggedIssuesPanel } from "./AdminFlaggedIssuesPanel";
// import { CoordinatorTimetableView } from "../coordinator/CoordinatorTimetableView";
// import { FacultyWorkloadInsights } from "../shared/FacultyWorkloadInsights";
// import { AppState } from "../../AppState";
// import { COURSES, SEMESTERS } from "../../data/mockData";
// import { C } from "../../styles/theme";

// export function AdminDashboard() {
//   const { user } = useAuth();
//   const [active, setActive] = useState("overview");
//   const [collapsed, setCollapsed] = useState(false);
//   const [refresh, setRefresh] = useState(0);
  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRefresh(r => r + 1);
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const pendingDeanApprovals = AppState.getPendingDeanApprovals().length;
//   const flaggedIssues = AppState.getFlaggedIssues().length;
  
//   const ADMIN_NAV = [
//     { id: "overview", icon: "📊", label: "Overview" },
//     { id: "approvals", icon: "✅", label: "Course Approvals" },
//     { id: "timetable", icon: "📅", label: "Timetable" },
//     { id: "issues", icon: "⚠", label: "Flagged Issues" },
//   ];
  
//   const panels = {
//     overview: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//         <Title>Dean's Dashboard - SoCSE</Title>

//         <Card>
//           <Title level={4}>System Overview</Title>
//           <p style={{ color: C.text.primary, marginBottom: 16 }}>Welcome, {user?.name}</p>

//           <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
//             <div>
//               <h5 style={{ color: C.accent.blue, marginBottom: 12 }}>Configuration</h5>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Days: Mon-Fri</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Class Duration: {AppState.timetableConfig.classDuration} min</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Break: {AppState.timetableConfig.breakDuration} min</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Lunch: {AppState.timetableConfig.lunchBreak.duration} min</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Sections: 3 (A, B, C)</p>
//               <p style={{ color: C.text.secondary }}>• Rooms: {AppState.rooms.length}</p>
//             </div>

//             <div>
//               <h5 style={{ color: C.accent.blue, marginBottom: 12 }}>Workflow Status</h5>
//               <p style={{ color: C.accent.green, marginBottom: 8 }}>✓ All systems operational</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>Preferences: {AppState.subjectPreferences.filter(p => p.status === "approved").length}/6 approved</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>Coordinator Approved: {AppState.courseDetails.filter(c => c.coordinatorStatus === "approved").length} courses</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>Dean Approved: {AppState.courseDetails.filter(c => c.deanStatus === "approved").length} courses</p>
//               <p style={{ color: C.text.secondary }}>Timetable: {AppState.timetable.length} slots</p>
//             </div>
//           </div>
//         </Card>

//         <Card>
//           <Title level={4}>Semester Configuration Status</Title>
//           {COURSES.map(course => {
//             const semestersConfigured = SEMESTERS.filter(s => 
//               AppState.semesterDetails[course]?.[s]
//             ).length;

//             return (
//               <div key={course} style={{ marginBottom: 16 }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
//                   <span style={{ color: C.text.primary, fontWeight: 500 }}>{course}</span>
//                   <span style={{ color: semestersConfigured === 2 ? C.accent.green : C.accent.red }}>
//                     {semestersConfigured}/2 semesters
//                   </span>
//                 </div>
//                 <div style={{ height: 6, background: C.border, borderRadius: 3 }}>
//                   <div style={{
//                     height: "100%",
//                     width: `${(semestersConfigured / 2) * 100}%`,
//                     background: semestersConfigured === 2 ? C.accent.green : C.accent.red,
//                     borderRadius: 3,
//                   }} />
//                 </div>
//               </div>
//             );
//           })}
//         </Card>

//         <FacultyWorkloadInsights />
//       </div>
//     ),

//     approvals: <DeanCourseDetailsReview />,
//     timetable: <CoordinatorTimetableView />,
//     issues: <AdminFlaggedIssuesPanel />,
//   };
  
//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
//       <Sidebar navItems={ADMIN_NAV} active={active} setActive={setActive} collapsed={collapsed} setCollapsed={setCollapsed} user={user} badges={{ approvals: pendingDeanApprovals, issues: flaggedIssues }} accentColor={C.accent.gold} />
//       <main style={{ flex: 1, overflow: "auto" }}>
//         <header style={{
//           background: C.nav,
//           borderBottom: `1px solid ${C.navBorder}`,
//           padding: "16px 32px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}>
//           <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>Dean's Portal</h2>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             {pendingDeanApprovals > 0 && (
//               <Badge variant="warning">
//                 {pendingDeanApprovals} pending approvals
//               </Badge>
//             )}
//             {flaggedIssues > 0 && (
//               <Badge variant="danger">
//                 {flaggedIssues} flagged issues
//               </Badge>
//             )}
//             <div style={{
//               width: 40,
//               height: 40,
//               borderRadius: "50%",
//               background: C.accent.goldBg,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: C.accent.gold,
//               fontWeight: 700,
//             }}>
//               {user?.avatar}
//             </div>
//           </div>
//         </header>
//         <div style={{ padding: 32 }}>{panels[active]}</div>
//       </main>
//     </div>
//   );
// }

// // src/components/admin/AdminDashboard.jsx
// import { useState, useEffect } from "react";
// import { useAuth } from "../auth/AuthContext";
// import { Sidebar, Card, Title, Badge, Button } from "../common";
// import { DeanCourseDetailsReview } from "./DeanCourseDetailsReview";
// import { DeanSubjectApproval } from "./DeanSubjectApproval";
// import { AdminFlaggedIssuesPanel } from "./AdminFlaggedIssuesPanel";
// import { CoordinatorTimetableView } from "../coordinator/CoordinatorTimetableView";
// import { FacultyWorkloadInsights } from "../shared/FacultyWorkloadInsights";
// import { AppState } from "../../AppState";
// import { COURSES, SEMESTERS } from "../../data/mockData";
// import { C } from "../../styles/theme";

// export function AdminDashboard() {
//   const { user } = useAuth();
//   const [active, setActive] = useState("overview");
//   const [collapsed, setCollapsed] = useState(false);
//   const [refresh, setRefresh] = useState(0);
  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRefresh(r => r + 1);
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const pendingDeanApprovals = AppState.getPendingDeanApprovals().length;
//   const pendingSubjectApprovals = AppState.subjects.filter(s => s.approvalStatus === "pending").length;
//   const flaggedIssues = AppState.getFlaggedIssues().length;
  
//   const ADMIN_NAV = [
//     { id: "overview", icon: "📊", label: "Overview" },
//     { id: "subjectApproval", icon: "📚", label: "Subject Approval" },
//     { id: "approvals", icon: "✅", label: "Course Approvals" },
//     { id: "timetable", icon: "📅", label: "Timetable" },
//     { id: "issues", icon: "⚠", label: "Flagged Issues" },
//   ];
  
//   const panels = {
//     overview: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//         <Title>Dean's Dashboard - SoCSE</Title>

//         <Card>
//           <Title level={4}>System Overview</Title>
//           <p style={{ color: C.text.primary, marginBottom: 16 }}>Welcome, {user?.name}</p>

//           <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
//             <div>
//               <h5 style={{ color: C.accent.blue, marginBottom: 12 }}>Configuration</h5>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Days: Mon-Fri</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Class Duration: {AppState.timetableConfig.classDuration} min</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Break: {AppState.timetableConfig.breakDuration} min</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Lunch: {AppState.timetableConfig.lunchBreak.duration} min</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Sections: 3 (A, B, C)</p>
//               <p style={{ color: C.text.secondary }}>• Rooms: {AppState.rooms.length}</p>
//             </div>

//             <div>
//               <h5 style={{ color: C.accent.blue, marginBottom: 12 }}>Workflow Status</h5>
//               <p style={{ color: C.accent.green, marginBottom: 8 }}>✓ All systems operational</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>Subjects: {AppState.subjects.filter(s => s.approvalStatus === "approved").length}/{AppState.subjects.length} approved</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>Preferences: {AppState.subjectPreferences.filter(p => p.status === "approved").length}/6 approved</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>Coordinator Approved: {AppState.courseDetails.filter(c => c.coordinatorStatus === "approved").length} courses</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>Dean Approved: {AppState.courseDetails.filter(c => c.deanStatus === "approved").length} courses</p>
//               <p style={{ color: C.text.secondary }}>Timetable: {AppState.timetable.length} slots</p>
//             </div>
//           </div>
//         </Card>

//         <Card>
//           <Title level={4}>Semester Configuration Status</Title>
//           {COURSES.map(course => {
//             const semestersConfigured = SEMESTERS.filter(s => 
//               AppState.semesterDetails[course]?.[s]
//             ).length;

//             return (
//               <div key={course} style={{ marginBottom: 16 }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
//                   <span style={{ color: C.text.primary, fontWeight: 500 }}>{course}</span>
//                   <span style={{ color: semestersConfigured === 2 ? C.accent.green : C.accent.red }}>
//                     {semestersConfigured}/2 semesters
//                   </span>
//                 </div>
//                 <div style={{ height: 6, background: C.border, borderRadius: 3 }}>
//                   <div style={{
//                     height: "100%",
//                     width: `${(semestersConfigured / 2) * 100}%`,
//                     background: semestersConfigured === 2 ? C.accent.green : C.accent.red,
//                     borderRadius: 3,
//                   }} />
//                 </div>
//               </div>
//             );
//           })}
//         </Card>

//         <FacultyWorkloadInsights />
//       </div>
//     ),

//     subjectApproval: <DeanSubjectApproval />,
//     approvals: <DeanCourseDetailsReview />,
//     timetable: <CoordinatorTimetableView />,
//     issues: <AdminFlaggedIssuesPanel />,
//   };
  
//   const badges = {
//     subjectApproval: pendingSubjectApprovals,
//     approvals: pendingDeanApprovals,
//     issues: flaggedIssues,
//   };
  
//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
//       <Sidebar 
//         navItems={ADMIN_NAV} 
//         active={active} 
//         setActive={setActive} 
//         collapsed={collapsed} 
//         setCollapsed={setCollapsed} 
//         user={user} 
//         badges={badges} 
//         accentColor={C.accent.gold} 
//       />
//       <main style={{ flex: 1, overflow: "auto" }}>
//         <header style={{
//           background: C.nav,
//           borderBottom: `1px solid ${C.navBorder}`,
//           padding: "16px 32px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           flexWrap: "wrap",
//           gap: 12,
//         }}>
//           <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>{ADMIN_NAV.find(n => n.id === active)?.label}</h2>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             {pendingSubjectApprovals > 0 && (
//               <Badge variant="warning">
//                 {pendingSubjectApprovals} subjects pending
//               </Badge>
//             )}
//             {pendingDeanApprovals > 0 && (
//               <Badge variant="warning">
//                 {pendingDeanApprovals} courses pending
//               </Badge>
//             )}
//             {flaggedIssues > 0 && (
//               <Badge variant="danger">
//                 {flaggedIssues} flagged issues
//               </Badge>
//             )}
//             <div style={{
//               width: 40,
//               height: 40,
//               borderRadius: "50%",
//               background: C.accent.goldBg,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: C.accent.gold,
//               fontWeight: 700,
//             }}>
//               {user?.avatar}
//             </div>
//           </div>
//         </header>
//         <div style={{ padding: 32 }}>{panels[active]}</div>
//       </main>
//     </div>
//   );
// }

// // src/components/admin/AdminDashboard.jsx
// import { useState, useEffect } from "react";
// import { useAuth } from "../auth/AuthContext";
// import { Sidebar, Card, Title, Badge, Button } from "../common";
// import { DeanCourseDetailsReview } from "./DeanCourseDetailsReview";
// import { DeanSubjectApproval } from "./DeanSubjectApproval";
// import { DeanPreferenceApproval } from "./DeanPreferenceApproval";
// import { AdminFlaggedIssuesPanel } from "./AdminFlaggedIssuesPanel";
// import { CoordinatorTimetableView } from "../coordinator/CoordinatorTimetableView";
// import { FacultyWorkloadInsights } from "../shared/FacultyWorkloadInsights";
// import { AppState } from "../../AppState";
// import { COURSES, SEMESTERS } from "../../data/mockData";
// import { C } from "../../styles/theme";

// export function AdminDashboard() {
//   const { user } = useAuth();
//   const [active, setActive] = useState("overview");
//   const [collapsed, setCollapsed] = useState(false);
//   const [refresh, setRefresh] = useState(0);
  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRefresh(r => r + 1);
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   // Get pending counts using the correct functions
//   const pendingCourseApprovals = AppState.getPendingDeanCourseApprovals?.().length || 0;
//   const pendingPreferenceApprovals = AppState.getPendingDeanPreferenceApprovals?.().length || 0;
//   const pendingSubjectApprovals = AppState.getPendingSubjectApprovals?.().length || 0;
//   const flaggedIssues = AppState.getFlaggedIssues?.().length || 0;
  
//   // Total pending approvals for badge
//   const totalPendingApprovals = pendingSubjectApprovals + pendingPreferenceApprovals + pendingCourseApprovals;
  
//   const ADMIN_NAV = [
//     { id: "overview", icon: "📊", label: "Overview" },
//     { id: "subjectApproval", icon: "📚", label: "Subject Approval" },
//     { id: "preferenceApproval", icon: "⭐", label: "Preference Approval" },
//     { id: "courseApprovals", icon: "✅", label: "Course Approvals" },
//     { id: "timetable", icon: "📅", label: "Timetable" },
//     { id: "issues", icon: "⚠", label: "Flagged Issues" },
//   ];
  
//   const panels = {
//     overview: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//         <Title>Dean's Dashboard - SoCSE</Title>

//         {/* Statistics Cards */}
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
//           <Card padding="20px">
//             <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Subject Approvals</p>
//             <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingSubjectApprovals}</p>
//           </Card>
//           <Card padding="20px">
//             <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Preference Approvals</p>
//             <p style={{ color: C.accent.blue, fontSize: 32, fontWeight: 700 }}>{pendingPreferenceApprovals}</p>
//           </Card>
//           <Card padding="20px">
//             <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Course Approvals</p>
//             <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingCourseApprovals}</p>
//           </Card>
//           <Card padding="20px">
//             <p style={{ color: C.text.tertiary, fontSize: 12 }}>Flagged Issues</p>
//             <p style={{ color: C.accent.red, fontSize: 32, fontWeight: 700 }}>{flaggedIssues}</p>
//           </Card>
//         </div>

//         <Card>
//           <Title level={4}>System Overview</Title>
//           <p style={{ color: C.text.primary, marginBottom: 16 }}>Welcome, {user?.name}</p>

//           <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
//             <div>
//               <h5 style={{ color: C.accent.blue, marginBottom: 12 }}>Configuration</h5>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Days: Mon-Fri</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Class Duration: {AppState.timetableConfig?.classDuration || 50} min</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Break: {AppState.timetableConfig?.breakDuration || 10} min</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Lunch: {AppState.timetableConfig?.lunchBreak?.duration || 40} min</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Sections: 3 (A, B, C)</p>
//               <p style={{ color: C.text.secondary }}>• Rooms: {AppState.rooms?.length || 0}</p>
//             </div>

//             <div>
//               <h5 style={{ color: C.accent.blue, marginBottom: 12 }}>Workflow Status</h5>
//               <p style={{ color: C.accent.green, marginBottom: 8 }}>✓ All systems operational</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>
//                 Subjects: {AppState.subjects?.filter(s => s.approvalStatus === "approved").length || 0}/{AppState.subjects?.length || 0} approved
//               </p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>
//                 Preferences: {AppState.subjectPreferences?.filter(p => p.status === "approved").length || 0}/6 approved
//               </p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>
//                 Coordinator Reviewed: {AppState.courseDetails?.filter(c => c.coordinatorStatus === "reviewed").length || 0} courses
//               </p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>
//                 Dean Approved: {AppState.courseDetails?.filter(c => c.deanStatus === "approved").length || 0} courses
//               </p>
//               <p style={{ color: C.text.secondary }}>
//                 Timetable: {AppState.timetable?.length || 0} slots
//               </p>
//             </div>
//           </div>
//         </Card>

//         <Card>
//           <Title level={4}>Semester Configuration Status</Title>
//           {COURSES.map(course => {
//             const semestersConfigured = SEMESTERS.filter(s => 
//               AppState.semesterDetails[course]?.[s]
//             ).length;

//             return (
//               <div key={course} style={{ marginBottom: 16 }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
//                   <span style={{ color: C.text.primary, fontWeight: 500 }}>{course}</span>
//                   <span style={{ color: semestersConfigured === 2 ? C.accent.green : C.accent.red }}>
//                     {semestersConfigured}/2 semesters
//                   </span>
//                 </div>
//                 <div style={{ height: 6, background: C.border, borderRadius: 3 }}>
//                   <div style={{
//                     height: "100%",
//                     width: `${(semestersConfigured / 2) * 100}%`,
//                     background: semestersConfigured === 2 ? C.accent.green : C.accent.red,
//                     borderRadius: 3,
//                   }} />
//                 </div>
//               </div>
//             );
//           })}
//         </Card>

//         <FacultyWorkloadInsights />
//       </div>
//     ),

//     subjectApproval: <DeanSubjectApproval />,
//     preferenceApproval: <DeanPreferenceApproval />,
//     courseApprovals: <DeanCourseDetailsReview />,
//     timetable: <CoordinatorTimetableView />,
//     issues: <AdminFlaggedIssuesPanel />,
//   };
  
//   const badges = {
//     subjectApproval: pendingSubjectApprovals,
//     preferenceApproval: pendingPreferenceApprovals,
//     courseApprovals: pendingCourseApprovals,
//     issues: flaggedIssues,
//   };
  
//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
//       <Sidebar 
//         navItems={ADMIN_NAV} 
//         active={active} 
//         setActive={setActive} 
//         collapsed={collapsed} 
//         setCollapsed={setCollapsed} 
//         user={user} 
//         badges={badges} 
//         accentColor={C.accent.gold} 
//       />
//       <main style={{ flex: 1, overflow: "auto" }}>
//         <header style={{
//           background: C.nav,
//           borderBottom: `1px solid ${C.navBorder}`,
//           padding: "16px 32px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           flexWrap: "wrap",
//           gap: 12,
//         }}>
//           <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>{ADMIN_NAV.find(n => n.id === active)?.label}</h2>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             {totalPendingApprovals > 0 && (
//               <Badge variant="warning">
//                 {totalPendingApprovals} total pending
//               </Badge>
//             )}
//             {flaggedIssues > 0 && (
//               <Badge variant="danger">
//                 {flaggedIssues} flagged issues
//               </Badge>
//             )}
//             <div style={{
//               width: 40,
//               height: 40,
//               borderRadius: "50%",
//               background: C.accent.goldBg,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: C.accent.gold,
//               fontWeight: 700,
//             }}>
//               {user?.avatar}
//             </div>
//           </div>
//         </header>
//         <div style={{ padding: 32 }}>{panels[active]}</div>
//       </main>
//     </div>
//   );
// }

// // src/components/admin/AdminDashboard.jsx
// import { useState, useEffect } from "react";
// import { useAuth } from "../auth/AuthContext";
// import { Sidebar, Card, Title, Badge, Button } from "../common";
// import { DeanCourseDetailsReview } from "./DeanCourseDetailsReview";
// import { DeanSubjectApproval } from "./DeanSubjectApproval";
// import { DeanPreferenceApproval } from "./DeanPreferenceApproval";
// import { EAPermissionsManager } from "./EAPermissionsManager";
// import { AdminFlaggedIssuesPanel } from "./AdminFlaggedIssuesPanel";
// import { CoordinatorTimetableView } from "../coordinator/CoordinatorTimetableView";
// import { FacultyWorkloadInsights } from "../shared/FacultyWorkloadInsights";
// import { AppState } from "../../AppState";
// import { COURSES, SEMESTERS } from "../../data/mockData";
// import { C } from "../../styles/theme";

// export function AdminDashboard() {
//   const { user } = useAuth();
//   const [active, setActive] = useState("overview");
//   const [collapsed, setCollapsed] = useState(false);
//   const [refresh, setRefresh] = useState(0);
  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRefresh(r => r + 1);
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   // Get pending counts using the correct functions
//   const pendingCourseApprovals = AppState.getPendingDeanCourseApprovals?.().length || 0;
//   const pendingPreferenceApprovals = AppState.getPendingDeanPreferenceApprovals?.().length || 0;
//   const pendingSubjectApprovals = AppState.getPendingSubjectApprovals?.().length || 0;
//   const flaggedIssues = AppState.getFlaggedIssues?.().length || 0;
  
//   // Total pending approvals for badge
//   const totalPendingApprovals = pendingSubjectApprovals + pendingPreferenceApprovals + pendingCourseApprovals;
  
//   const ADMIN_NAV = [
//     { id: "overview", icon: "📊", label: "Overview" },
//     { id: "subjectApproval", icon: "📚", label: "Subject Approval" },
//     { id: "preferenceApproval", icon: "⭐", label: "Preference Approval" },
//     { id: "courseApproval", icon: "✅", label: "Course Approval" },
//     { id: "timetable", icon: "📅", label: "Timetable" },
//     { id: "eaPermissions", icon: "👥", label: "EA Permissions" },
//     { id: "issues", icon: "⚠", label: "Flagged Issues" },
//   ];
  
//   const panels = {
//     overview: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//         <Title>Dean's Dashboard - SoCSE</Title>

//         {/* Statistics Cards */}
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
//           <Card padding="20px">
//             <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Subject Approvals</p>
//             <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingSubjectApprovals}</p>
//           </Card>
//           <Card padding="20px">
//             <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Preference Approvals</p>
//             <p style={{ color: C.accent.blue, fontSize: 32, fontWeight: 700 }}>{pendingPreferenceApprovals}</p>
//           </Card>
//           <Card padding="20px">
//             <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Course Approvals</p>
//             <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingCourseApprovals}</p>
//           </Card>
//           <Card padding="20px">
//             <p style={{ color: C.text.tertiary, fontSize: 12 }}>Flagged Issues</p>
//             <p style={{ color: C.accent.red, fontSize: 32, fontWeight: 700 }}>{flaggedIssues}</p>
//           </Card>
//         </div>

//         <Card>
//           <Title level={4}>System Overview</Title>
//           <p style={{ color: C.text.primary, marginBottom: 16 }}>Welcome, {user?.name}</p>

//           <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
//             <div>
//               <h5 style={{ color: C.accent.blue, marginBottom: 12 }}>Configuration</h5>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Days: Mon-Fri</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Class Duration: {AppState.timetableConfig?.classDuration || 50} min</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Break: {AppState.timetableConfig?.breakDuration || 10} min</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Lunch: {AppState.timetableConfig?.lunchBreak?.duration || 40} min</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Sections: 3 (A, B, C)</p>
//               <p style={{ color: C.text.secondary }}>• Rooms: {AppState.rooms?.length || 0}</p>
//             </div>

//             <div>
//               <h5 style={{ color: C.accent.blue, marginBottom: 12 }}>Workflow Status</h5>
//               <p style={{ color: C.accent.green, marginBottom: 8 }}>✓ All systems operational</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>
//                 Subjects: {AppState.subjects?.filter(s => s.approvalStatus === "approved").length || 0}/{AppState.subjects?.length || 0} approved
//               </p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>
//                 Preferences: {AppState.subjectPreferences?.filter(p => p.status === "approved").length || 0}/6 approved
//               </p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>
//                 Dean Approved: {AppState.courseDetails?.filter(c => c.deanStatus === "approved").length || 0} courses
//               </p>
//               <p style={{ color: C.text.secondary }}>
//                 Timetable: {AppState.timetable?.length || 0} slots
//               </p>
//             </div>
//           </div>
//         </Card>

//         <Card>
//           <Title level={4}>Semester Configuration Status</Title>
//           {COURSES.map(course => {
//             const semestersConfigured = SEMESTERS.filter(s => 
//               AppState.semesterDetails[course]?.[s]
//             ).length;

//             return (
//               <div key={course} style={{ marginBottom: 16 }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
//                   <span style={{ color: C.text.primary, fontWeight: 500 }}>{course}</span>
//                   <span style={{ color: semestersConfigured === 2 ? C.accent.green : C.accent.red }}>
//                     {semestersConfigured}/2 semesters
//                   </span>
//                 </div>
//                 <div style={{ height: 6, background: C.border, borderRadius: 3 }}>
//                   <div style={{
//                     height: "100%",
//                     width: `${(semestersConfigured / 2) * 100}%`,
//                     background: semestersConfigured === 2 ? C.accent.green : C.accent.red,
//                     borderRadius: 3,
//                   }} />
//                 </div>
//               </div>
//             );
//           })}
//         </Card>

//         <FacultyWorkloadInsights />
//       </div>
//     ),

//     subjectApproval: <DeanSubjectApproval />,
//     preferenceApproval: <DeanPreferenceApproval />,
//     courseApproval: <DeanCourseDetailsReview />,
//     timetable: <CoordinatorTimetableView />,
//     eaPermissions: <EAPermissionsManager onRefresh={() => setRefresh(r => r + 1)} />,
//     issues: <AdminFlaggedIssuesPanel />,
//   };
  
//   const badges = {
//     subjectApproval: pendingSubjectApprovals,
//     preferenceApproval: pendingPreferenceApprovals,
//     courseApproval: pendingCourseApprovals,
//     issues: flaggedIssues,
//   };
  
//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
//       <Sidebar 
//         navItems={ADMIN_NAV} 
//         active={active} 
//         setActive={setActive} 
//         collapsed={collapsed} 
//         setCollapsed={setCollapsed} 
//         user={user} 
//         badges={badges} 
//         accentColor={C.accent.gold} 
//       />
//       <main style={{ flex: 1, overflow: "auto" }}>
//         <header style={{
//           background: C.nav,
//           borderBottom: `1px solid ${C.navBorder}`,
//           padding: "16px 32px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           flexWrap: "wrap",
//           gap: 12,
//         }}>
//           <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>{ADMIN_NAV.find(n => n.id === active)?.label}</h2>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             {totalPendingApprovals > 0 && (
//               <Badge variant="warning">
//                 {totalPendingApprovals} total pending
//               </Badge>
//             )}
//             {flaggedIssues > 0 && (
//               <Badge variant="danger">
//                 {flaggedIssues} flagged issues
//               </Badge>
//             )}
//             <div style={{
//               width: 40,
//               height: 40,
//               borderRadius: "50%",
//               background: C.accent.goldBg,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: C.accent.gold,
//               fontWeight: 700,
//             }}>
//               {user?.avatar}
//             </div>
//           </div>
//         </header>
//         <div style={{ padding: 32 }}>{panels[active]}</div>
//       </main>
//     </div>
//   );
// }

// // src/components/admin/AdminDashboard.jsx
// import { useState, useEffect } from "react";
// import { useAuth } from "../auth/AuthContext";
// import { Sidebar, Card, Title, Badge, Button } from "../common";
// import { DeanCourseDetailsReview } from "./DeanCourseDetailsReview";
// import { DeanSubjectApproval } from "./DeanSubjectApproval";
// import { DeanPreferenceApproval } from "./DeanPreferenceApproval";
// import { DeanSubjectDeletionApproval } from "./DeanSubjectDeletionApproval";
// import { EAPermissionsManager } from "./EAPermissionsManager";
// import { AdminFlaggedIssuesPanel } from "./AdminFlaggedIssuesPanel";
// import { CoordinatorTimetableView } from "../coordinator/CoordinatorTimetableView";
// import { FacultyWorkloadInsights } from "../shared/FacultyWorkloadInsights";
// import { AppState } from "../../AppState";
// import { loadFromStorage, STORAGE_KEYS } from "../../utils/storage";
// import { COURSES, SEMESTERS } from "../../data/mockData";
// import { C } from "../../styles/theme";

// export function AdminDashboard() {
//   const { user } = useAuth();
//   const [active, setActive] = useState("overview");
//   const [collapsed, setCollapsed] = useState(false);
//   const [refresh, setRefresh] = useState(0);
  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRefresh(r => r + 1);
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   // Get pending counts using the correct functions
//   const pendingCourseApprovals = AppState.getPendingDeanCourseApprovals?.().length || 0;
//   const pendingPreferenceApprovals = AppState.getPendingDeanPreferenceApprovals?.().length || 0;
//   const pendingSubjectApprovals = AppState.getPendingSubjectApprovals?.().length || 0;
//   const flaggedIssues = AppState.getFlaggedIssues?.().length || 0;
  
//   // Get pending deletion requests count
//   const deletionRequests = loadFromStorage(STORAGE_KEYS.SUBJECT_DELETION_REQUESTS, []);
//   const pendingDeletionRequests = deletionRequests.filter(r => r.status === "pending").length;
  
//   // Total pending approvals for badge
//   const totalPendingApprovals = pendingSubjectApprovals + pendingPreferenceApprovals + pendingCourseApprovals + pendingDeletionRequests;
  
//   const ADMIN_NAV = [
//     { id: "overview", icon: "📊", label: "Overview" },
//     { id: "subjectApproval", icon: "📚", label: "Subject Approval" },
//     { id: "preferenceApproval", icon: "⭐", label: "Preference Approval" },
//     { id: "courseApproval", icon: "✅", label: "Course Approval" },
//     { id: "timetable", icon: "📅", label: "Timetable" },
//     { id: "eaPermissions", icon: "👥", label: "EA Permissions" },
//     { id: "deletionApproval", icon: "🗑️", label: "Deletion Requests" },
//     { id: "issues", icon: "⚠", label: "Flagged Issues" },
//   ];
  
//   const panels = {
//     overview: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//         <Title>Dean's Dashboard - SoCSE</Title>

//         {/* Statistics Cards */}
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16 }}>
//           <Card padding="20px">
//             <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Subject Approvals</p>
//             <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingSubjectApprovals}</p>
//           </Card>
//           <Card padding="20px">
//             <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Preference Approvals</p>
//             <p style={{ color: C.accent.blue, fontSize: 32, fontWeight: 700 }}>{pendingPreferenceApprovals}</p>
//           </Card>
//           <Card padding="20px">
//             <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Course Approvals</p>
//             <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingCourseApprovals}</p>
//           </Card>
//           <Card padding="20px">
//             <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Deletion Requests</p>
//             <p style={{ color: C.accent.purple, fontSize: 32, fontWeight: 700 }}>{pendingDeletionRequests}</p>
//           </Card>
//           <Card padding="20px">
//             <p style={{ color: C.text.tertiary, fontSize: 12 }}>Flagged Issues</p>
//             <p style={{ color: C.accent.red, fontSize: 32, fontWeight: 700 }}>{flaggedIssues}</p>
//           </Card>
//         </div>

//         <Card>
//           <Title level={4}>System Overview</Title>
//           <p style={{ color: C.text.primary, marginBottom: 16 }}>Welcome, {user?.name}</p>

//           <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
//             <div>
//               <h5 style={{ color: C.accent.blue, marginBottom: 12 }}>Configuration</h5>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Days: Mon-Fri</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Class Duration: {AppState.timetableConfig?.classDuration || 50} min</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Break: {AppState.timetableConfig?.breakDuration || 10} min</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Lunch: {AppState.timetableConfig?.lunchBreak?.duration || 40} min</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Sections: 3 (A, B, C)</p>
//               <p style={{ color: C.text.secondary }}>• Rooms: {AppState.rooms?.length || 0}</p>
//             </div>

//             <div>
//               <h5 style={{ color: C.accent.blue, marginBottom: 12 }}>Workflow Status</h5>
//               <p style={{ color: C.accent.green, marginBottom: 8 }}>✓ All systems operational</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>
//                 Subjects: {AppState.subjects?.filter(s => s.approvalStatus === "approved").length || 0}/{AppState.subjects?.length || 0} approved
//               </p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>
//                 Preferences: {AppState.subjectPreferences?.filter(p => p.status === "approved").length || 0}/6 approved
//               </p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>
//                 Dean Approved: {AppState.courseDetails?.filter(c => c.deanStatus === "approved").length || 0} courses
//               </p>
//               <p style={{ color: C.text.secondary }}>
//                 Timetable: {AppState.timetable?.length || 0} slots
//               </p>
//             </div>
//           </div>
//         </Card>

//         <Card>
//           <Title level={4}>Semester Configuration Status</Title>
//           {COURSES.map(course => {
//             const semestersConfigured = SEMESTERS.filter(s => 
//               AppState.semesterDetails[course]?.[s]
//             ).length;

//             return (
//               <div key={course} style={{ marginBottom: 16 }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
//                   <span style={{ color: C.text.primary, fontWeight: 500 }}>{course}</span>
//                   <span style={{ color: semestersConfigured === 2 ? C.accent.green : C.accent.red }}>
//                     {semestersConfigured}/2 semesters
//                   </span>
//                 </div>
//                 <div style={{ height: 6, background: C.border, borderRadius: 3 }}>
//                   <div style={{
//                     height: "100%",
//                     width: `${(semestersConfigured / 2) * 100}%`,
//                     background: semestersConfigured === 2 ? C.accent.green : C.accent.red,
//                     borderRadius: 3,
//                   }} />
//                 </div>
//               </div>
//             );
//           })}
//         </Card>

//         <FacultyWorkloadInsights />
//       </div>
//     ),

//     subjectApproval: <DeanSubjectApproval />,
//     preferenceApproval: <DeanPreferenceApproval />,
//     courseApproval: <DeanCourseDetailsReview />,
//     timetable: <CoordinatorTimetableView />,
//     eaPermissions: <EAPermissionsManager onRefresh={() => setRefresh(r => r + 1)} />,
//     deletionApproval: <DeanSubjectDeletionApproval />,
//     issues: <AdminFlaggedIssuesPanel />,
//   };
  
//   const badges = {
//     subjectApproval: pendingSubjectApprovals,
//     preferenceApproval: pendingPreferenceApprovals,
//     courseApproval: pendingCourseApprovals,
//     deletionApproval: pendingDeletionRequests,
//     issues: flaggedIssues,
//   };
  
//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
//       <Sidebar 
//         navItems={ADMIN_NAV} 
//         active={active} 
//         setActive={setActive} 
//         collapsed={collapsed} 
//         setCollapsed={setCollapsed} 
//         user={user} 
//         badges={badges} 
//         accentColor={C.accent.gold} 
//       />
//       <main style={{ flex: 1, overflow: "auto" }}>
//         <header style={{
//           background: C.nav,
//           borderBottom: `1px solid ${C.navBorder}`,
//           padding: "16px 32px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           flexWrap: "wrap",
//           gap: 12,
//         }}>
//           <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>{ADMIN_NAV.find(n => n.id === active)?.label}</h2>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             {totalPendingApprovals > 0 && (
//               <Badge variant="warning">
//                 {totalPendingApprovals} total pending
//               </Badge>
//             )}
//             {flaggedIssues > 0 && (
//               <Badge variant="danger">
//                 {flaggedIssues} flagged issues
//               </Badge>
//             )}
//             <div style={{
//               width: 40,
//               height: 40,
//               borderRadius: "50%",
//               background: C.accent.goldBg,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: C.accent.gold,
//               fontWeight: 700,
//             }}>
//               {user?.avatar}
//             </div>
//           </div>
//         </header>
//         <div style={{ padding: 32 }}>{panels[active]}</div>
//       </main>
//     </div>
//   );
// }

// // src/components/admin/AdminDashboard.jsx
// import { useState, useEffect } from "react";
// import { useAuth } from "../auth/AuthContext";
// import { Sidebar, Card, Title, Badge, Button } from "../common";
// import { DeanCourseDetailsReview } from "./DeanCourseDetailsReview";
// import { DeanSubjectApproval } from "./DeanSubjectApproval";
// import { DeanPreferenceApproval } from "./DeanPreferenceApproval";
// import { DeanSubjectDeletionApproval } from "./DeanSubjectDeletionApproval";
// import { EAPermissionsManager } from "./EAPermissionsManager";
// import { AdminFlaggedIssuesPanel } from "./AdminFlaggedIssuesPanel";
// import { CoordinatorTimetableView } from "../coordinator/CoordinatorTimetableView";
// import { FacultyWorkloadInsights } from "../shared/FacultyWorkloadInsights";
// import { AppState } from "../../AppState";
// import { loadFromStorage, STORAGE_KEYS } from "../../utils/storage";
// import { COURSES, SEMESTERS } from "../../data/mockData";
// import { C } from "../../styles/theme";

// export function AdminDashboard() {
//   const { user } = useAuth();
//   const [active, setActive] = useState("overview");
//   const [collapsed, setCollapsed] = useState(false);
//   const [refresh, setRefresh] = useState(0);
//   const [showApprovedSubjects, setShowApprovedSubjects] = useState(false);
//   const [showRejectedSubjects, setShowRejectedSubjects] = useState(false);
//   const [showDeletedSubjects, setShowDeletedSubjects] = useState(false);
//   const [deletedSubjects, setDeletedSubjects] = useState([]);
  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRefresh(r => r + 1);
//       loadDeletedSubjects();
//     };
//     window.addEventListener('storage', handleStorageChange);
//     loadDeletedSubjects();
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const loadDeletedSubjects = () => {
//     const deletionRequests = loadFromStorage(STORAGE_KEYS.SUBJECT_DELETION_REQUESTS, []);
//     const approvedDeletions = deletionRequests.filter(r => r.status === "approved");
//     setDeletedSubjects(approvedDeletions);
//   };
  
//   // Get pending counts using the correct functions
//   const pendingCourseApprovals = AppState.getPendingDeanCourseApprovals?.().length || 0;
//   const pendingPreferenceApprovals = AppState.getPendingDeanPreferenceApprovals?.().length || 0;
//   const pendingSubjectApprovals = AppState.getPendingSubjectApprovals?.().length || 0;
//   const flaggedIssues = AppState.getFlaggedIssues?.().length || 0;
  
//   // Get approved and rejected subjects
//   const approvedSubjects = AppState.subjects?.filter(s => s.approvalStatus === "approved") || [];
//   const rejectedSubjects = AppState.subjects?.filter(s => s.approvalStatus === "rejected") || [];
  
//   // Get pending deletion requests count
//   const deletionRequests = loadFromStorage(STORAGE_KEYS.SUBJECT_DELETION_REQUESTS, []);
//   const pendingDeletionRequests = deletionRequests.filter(r => r.status === "pending").length;
  
//   // Total pending approvals for badge
//   const totalPendingApprovals = pendingSubjectApprovals + pendingPreferenceApprovals + pendingCourseApprovals + pendingDeletionRequests;
  
//   const ADMIN_NAV = [
//     { id: "overview", icon: "📊", label: "Overview" },
//     { id: "subjectApproval", icon: "📚", label: "Subject Approval" },
//     { id: "preferenceApproval", icon: "⭐", label: "Preference Approval" },
//     { id: "courseApproval", icon: "✅", label: "Course Approval" },
//     { id: "timetable", icon: "📅", label: "Timetable" },
//     { id: "eaPermissions", icon: "👥", label: "EA Permissions" },
//     { id: "deletionApproval", icon: "🗑️", label: "Deletion Requests" },
//     { id: "issues", icon: "⚠", label: "Flagged Issues" },
//   ];
  
//   const panels = {
//     overview: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//         <Title>Dean's Dashboard - SoCSE</Title>

//         {/* Statistics Cards */}
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16 }}>
//           <Card padding="20px">
//             <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Subject Approvals</p>
//             <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingSubjectApprovals}</p>
//           </Card>
//           <Card padding="20px">
//             <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Preference Approvals</p>
//             <p style={{ color: C.accent.blue, fontSize: 32, fontWeight: 700 }}>{pendingPreferenceApprovals}</p>
//           </Card>
//           <Card padding="20px">
//             <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Course Approvals</p>
//             <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingCourseApprovals}</p>
//           </Card>
//           <Card padding="20px">
//             <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Deletion Requests</p>
//             <p style={{ color: C.accent.purple, fontSize: 32, fontWeight: 700 }}>{pendingDeletionRequests}</p>
//           </Card>
//           <Card padding="20px">
//             <p style={{ color: C.text.tertiary, fontSize: 12 }}>Flagged Issues</p>
//             <p style={{ color: C.accent.red, fontSize: 32, fontWeight: 700 }}>{flaggedIssues}</p>
//           </Card>
//         </div>

//         <Card>
//           <Title level={4}>System Overview</Title>
//           <p style={{ color: C.text.primary, marginBottom: 16 }}>Welcome, {user?.name}</p>

//           <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
//             <div>
//               <h5 style={{ color: C.accent.blue, marginBottom: 12 }}>Configuration</h5>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Days: Mon-Fri</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Class Duration: {AppState.timetableConfig?.classDuration || 50} min</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Break: {AppState.timetableConfig?.breakDuration || 10} min</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Lunch: {AppState.timetableConfig?.lunchBreak?.duration || 40} min</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Sections: 3 (A, B, C)</p>
//               <p style={{ color: C.text.secondary }}>• Rooms: {AppState.rooms?.length || 0}</p>
//             </div>

//             <div>
//               <h5 style={{ color: C.accent.blue, marginBottom: 12 }}>Workflow Status</h5>
//               <p style={{ color: C.accent.green, marginBottom: 8 }}>✓ All systems operational</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>
//                 Subjects: {approvedSubjects.length}/{AppState.subjects?.length || 0} approved
//               </p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>
//                 Preferences: {AppState.subjectPreferences?.filter(p => p.status === "approved").length || 0}/6 approved
//               </p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>
//                 Dean Approved: {AppState.courseDetails?.filter(c => c.deanStatus === "approved").length || 0} courses
//               </p>
//               <p style={{ color: C.text.secondary }}>
//                 Timetable: {AppState.timetable?.length || 0} slots
//               </p>
//             </div>
//           </div>
//         </Card>

//         {/* Subject Status Section with Dropdowns */}
//         <Card>
//           <Title level={4}>Subject Status Overview</Title>
          
//           {/* Approved Subjects Dropdown */}
//           <div style={{ marginBottom: 16 }}>
//             <button
//               onClick={() => setShowApprovedSubjects(!showApprovedSubjects)}
//               style={{
//                 width: "100%",
//                 padding: "12px 16px",
//                 background: C.accent.greenBg,
//                 border: `1px solid ${C.accent.green}`,
//                 borderRadius: 8,
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 cursor: "pointer",
//                 fontSize: 16,
//                 fontWeight: 600,
//                 color: C.accent.green
//               }}
//             >
//               <span>✅ Approved Subjects ({approvedSubjects.length})</span>
//               <span>{showApprovedSubjects ? "▲" : "▼"}</span>
//             </button>
//             {showApprovedSubjects && (
//               <div style={{ 
//                 marginTop: 8, 
//                 padding: 12, 
//                 background: C.cardHover, 
//                 borderRadius: 8,
//                 maxHeight: 300,
//                 overflowY: "auto"
//               }}>
//                 {approvedSubjects.length === 0 ? (
//                   <p style={{ color: C.text.tertiary, textAlign: "center" }}>No approved subjects</p>
//                 ) : (
//                   approvedSubjects.map(subject => (
//                     <div key={subject.id} style={{
//                       padding: "8px 12px",
//                       borderBottom: `1px solid ${C.border}`,
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center"
//                     }}>
//                       <div>
//                         <strong>{subject.name}</strong>
//                         <span style={{ marginLeft: 8, fontSize: 12, color: C.text.tertiary }}>({subject.code})</span>
//                         <div style={{ fontSize: 11, color: C.text.tertiary }}>
//                           {subject.course} - Semester {subject.semester} | {subject.subjectType} | {subject.examType}
//                         </div>
//                       </div>
//                       <Badge variant="success">Approved</Badge>
//                     </div>
//                   ))
//                 )}
//               </div>
//             )}
//           </div>
          
//           {/* Rejected Subjects Dropdown */}
//           <div style={{ marginBottom: 16 }}>
//             <button
//               onClick={() => setShowRejectedSubjects(!showRejectedSubjects)}
//               style={{
//                 width: "100%",
//                 padding: "12px 16px",
//                 background: C.accent.redBg,
//                 border: `1px solid ${C.accent.red}`,
//                 borderRadius: 8,
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 cursor: "pointer",
//                 fontSize: 16,
//                 fontWeight: 600,
//                 color: C.accent.red
//               }}
//             >
//               <span>❌ Rejected Subjects ({rejectedSubjects.length})</span>
//               <span>{showRejectedSubjects ? "▲" : "▼"}</span>
//             </button>
//             {showRejectedSubjects && (
//               <div style={{ 
//                 marginTop: 8, 
//                 padding: 12, 
//                 background: C.cardHover, 
//                 borderRadius: 8,
//                 maxHeight: 300,
//                 overflowY: "auto"
//               }}>
//                 {rejectedSubjects.length === 0 ? (
//                   <p style={{ color: C.text.tertiary, textAlign: "center" }}>No rejected subjects</p>
//                 ) : (
//                   rejectedSubjects.map(subject => (
//                     <div key={subject.id} style={{
//                       padding: "8px 12px",
//                       borderBottom: `1px solid ${C.border}`,
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center"
//                     }}>
//                       <div>
//                         <strong>{subject.name}</strong>
//                         <span style={{ marginLeft: 8, fontSize: 12, color: C.text.tertiary }}>({subject.code})</span>
//                         <div style={{ fontSize: 11, color: C.text.tertiary }}>
//                           {subject.course} - Semester {subject.semester}
//                         </div>
//                         {subject.rejectionReason && (
//                           <div style={{ fontSize: 11, color: C.accent.red, marginTop: 4 }}>
//                             Reason: {subject.rejectionReason}
//                           </div>
//                         )}
//                       </div>
//                       <Badge variant="danger">Rejected</Badge>
//                     </div>
//                   ))
//                 )}
//               </div>
//             )}
//           </div>
          
//           {/* Deleted Subjects Dropdown */}
//           <div>
//             <button
//               onClick={() => setShowDeletedSubjects(!showDeletedSubjects)}
//               style={{
//                 width: "100%",
//                 padding: "12px 16px",
//                 background: C.accent.purpleBg,
//                 border: `1px solid ${C.accent.purple}`,
//                 borderRadius: 8,
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 cursor: "pointer",
//                 fontSize: 16,
//                 fontWeight: 600,
//                 color: C.accent.purple
//               }}
//             >
//               <span>🗑️ Deleted Subjects ({deletedSubjects.length})</span>
//               <span>{showDeletedSubjects ? "▲" : "▼"}</span>
//             </button>
//             {showDeletedSubjects && (
//               <div style={{ 
//                 marginTop: 8, 
//                 padding: 12, 
//                 background: C.cardHover, 
//                 borderRadius: 8,
//                 maxHeight: 300,
//                 overflowY: "auto"
//               }}>
//                 {deletedSubjects.length === 0 ? (
//                   <p style={{ color: C.text.tertiary, textAlign: "center" }}>No deleted subjects</p>
//                 ) : (
//                   deletedSubjects.map(request => (
//                     <div key={request.id} style={{
//                       padding: "8px 12px",
//                       borderBottom: `1px solid ${C.border}`,
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center"
//                     }}>
//                       <div>
//                         <strong>{request.subjectName}</strong>
//                         <span style={{ marginLeft: 8, fontSize: 12, color: C.text.tertiary }}>({request.subjectCode})</span>
//                         <div style={{ fontSize: 11, color: C.text.tertiary }}>
//                           {request.course} - Semester {request.semester}
//                         </div>
//                         <div style={{ fontSize: 11, color: C.accent.red, marginTop: 4 }}>
//                           Deletion Reason: {request.reason}
//                         </div>
//                         {request.approvedDate && (
//                           <div style={{ fontSize: 11, color: C.accent.green, marginTop: 4 }}>
//                             Deleted on: {new Date(request.approvedDate).toLocaleString()}
//                           </div>
//                         )}
//                       </div>
//                       <Badge variant="purple">Deleted</Badge>
//                     </div>
//                   ))
//                 )}
//               </div>
//             )}
//           </div>
//         </Card>

//         <Card>
//           <Title level={4}>Semester Configuration Status</Title>
//           {COURSES.map(course => {
//             const semestersConfigured = SEMESTERS.filter(s => 
//               AppState.semesterDetails[course]?.[s]
//             ).length;

//             return (
//               <div key={course} style={{ marginBottom: 16 }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
//                   <span style={{ color: C.text.primary, fontWeight: 500 }}>{course}</span>
//                   <span style={{ color: semestersConfigured === 2 ? C.accent.green : C.accent.red }}>
//                     {semestersConfigured}/2 semesters
//                   </span>
//                 </div>
//                 <div style={{ height: 6, background: C.border, borderRadius: 3 }}>
//                   <div style={{
//                     height: "100%",
//                     width: `${(semestersConfigured / 2) * 100}%`,
//                     background: semestersConfigured === 2 ? C.accent.green : C.accent.red,
//                     borderRadius: 3,
//                   }} />
//                 </div>
//               </div>
//             );
//           })}
//         </Card>

//         <FacultyWorkloadInsights />
//       </div>
//     ),

//     subjectApproval: <DeanSubjectApproval />,
//     preferenceApproval: <DeanPreferenceApproval />,
//     courseApproval: <DeanCourseDetailsReview />,
//     timetable: <CoordinatorTimetableView />,
//     eaPermissions: <EAPermissionsManager onRefresh={() => setRefresh(r => r + 1)} />,
//     deletionApproval: <DeanSubjectDeletionApproval />,
//     issues: <AdminFlaggedIssuesPanel />,
//   };
  
//   const badges = {
//     subjectApproval: pendingSubjectApprovals,
//     preferenceApproval: pendingPreferenceApprovals,
//     courseApproval: pendingCourseApprovals,
//     deletionApproval: pendingDeletionRequests,
//     issues: flaggedIssues,
//   };
  
//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
//       <Sidebar 
//         navItems={ADMIN_NAV} 
//         active={active} 
//         setActive={setActive} 
//         collapsed={collapsed} 
//         setCollapsed={setCollapsed} 
//         user={user} 
//         badges={badges} 
//         accentColor={C.accent.gold} 
//       />
//       <main style={{ flex: 1, overflow: "auto" }}>
//         <header style={{
//           background: C.nav,
//           borderBottom: `1px solid ${C.navBorder}`,
//           padding: "16px 32px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           flexWrap: "wrap",
//           gap: 12,
//         }}>
//           <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>{ADMIN_NAV.find(n => n.id === active)?.label}</h2>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             {totalPendingApprovals > 0 && (
//               <Badge variant="warning">
//                 {totalPendingApprovals} total pending
//               </Badge>
//             )}
//             {flaggedIssues > 0 && (
//               <Badge variant="danger">
//                 {flaggedIssues} flagged issues
//               </Badge>
//             )}
//             <div style={{
//               width: 40,
//               height: 40,
//               borderRadius: "50%",
//               background: C.accent.goldBg,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: C.accent.gold,
//               fontWeight: 700,
//             }}>
//               {user?.avatar}
//             </div>
//           </div>
//         </header>
//         <div style={{ padding: 32 }}>{panels[active]}</div>
//       </main>
//     </div>
//   );
// }

// src/components/admin/AdminDashboard.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { Sidebar, Card, Title, Badge, Button } from "../common";
import { DeanCourseDetailsReview } from "./DeanCourseDetailsReview";
import { DeanSubjectApproval } from "./DeanSubjectApproval";
import { DeanPreferenceApproval } from "./DeanPreferenceApproval";
import { DeanSubjectDeletionApproval } from "./DeanSubjectDeletionApproval";
import { EAPermissionsManager } from "./EAPermissionsManager";
import { AdminFlaggedIssuesPanel } from "./AdminFlaggedIssuesPanel";
import { CoordinatorTimetableView } from "../coordinator/CoordinatorTimetableView";
import { FacultyWorkloadInsights } from "../shared/FacultyWorkloadInsights";
import { AppState } from "../../AppState";
import { loadFromStorage, STORAGE_KEYS } from "../../utils/storage";
import { COURSES, SEMESTERS } from "../../data/mockData";
import { C } from "../../styles/theme";

// Import html2pdf library
import html2pdf from "html2pdf.js";

export function AdminDashboard() {
  const { user } = useAuth();
  const [active, setActive] = useState("overview");
  const [collapsed, setCollapsed] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [showApprovedSubjects, setShowApprovedSubjects] = useState(false);
  const [showRejectedSubjects, setShowRejectedSubjects] = useState(false);
  const [showDeletedSubjects, setShowDeletedSubjects] = useState(false);
  const [deletedSubjects, setDeletedSubjects] = useState([]);
  const [downloading, setDownloading] = useState(false);
  const [activeDepartment, setActiveDepartment] = useState(null);
  
  useEffect(() => {
    const handleStorageChange = () => {
      setRefresh(r => r + 1);
      loadDeletedSubjects();
      loadActiveDepartment();
    };
    window.addEventListener('storage', handleStorageChange);
    loadDeletedSubjects();
    loadActiveDepartment();
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  const loadDeletedSubjects = () => {
    const deletionRequests = loadFromStorage(STORAGE_KEYS.SUBJECT_DELETION_REQUESTS, []);
    const approvedDeletions = deletionRequests.filter(r => r.status === "approved");
    setDeletedSubjects(approvedDeletions);
  };

  const loadActiveDepartment = () => {
    const active = loadFromStorage(STORAGE_KEYS.ACTIVE_DEPARTMENT, null);
    setActiveDepartment(active);
  };
  
  // Get pending counts using the correct functions
  const pendingCourseApprovals = AppState.getPendingDeanCourseApprovals?.().length || 0;
  const pendingPreferenceApprovals = AppState.getPendingDeanPreferenceApprovals?.().length || 0;
  const pendingSubjectApprovals = AppState.getPendingSubjectApprovals?.().length || 0;
  const flaggedIssues = AppState.getFlaggedIssues?.().length || 0;
  
  // Get approved and rejected subjects
  const approvedSubjects = AppState.subjects?.filter(s => s.approvalStatus === "approved") || [];
  const rejectedSubjects = AppState.subjects?.filter(s => s.approvalStatus === "rejected") || [];
  
  // Get pending deletion requests count
  const deletionRequests = loadFromStorage(STORAGE_KEYS.SUBJECT_DELETION_REQUESTS, []);
  const pendingDeletionRequests = deletionRequests.filter(r => r.status === "pending").length;
  
  // Total pending approvals for badge
  const totalPendingApprovals = pendingSubjectApprovals + pendingPreferenceApprovals + pendingCourseApprovals + pendingDeletionRequests;

  // Generate time slots from config including breaks and lunch
  const generateTimeSlotsFromConfig = (config) => {
    const slots = [];
    const start = new Date(`1970-01-01T${config.startTime}:00`);
    const end = new Date(`1970-01-01T${config.endTime}:00`);
    
    let current = new Date(start);
    let periodNumber = 1;
    let classesBeforeBreak = 0;
    let lunchAdded = false;
    
    const lunchStart = new Date(`1970-01-01T${config.lunchBreak.start}:00`);
    const lunchEnd = new Date(lunchStart.getTime() + config.lunchBreak.duration * 60000);
    
    while (current < end) {
      const timeStr = current.toTimeString().substring(0, 5);
      const classEnd = new Date(current.getTime() + config.classDuration * 60000);
      const endTimeStr = classEnd.toTimeString().substring(0, 5);
      
      // Check for lunch break
      if (!lunchAdded && current >= lunchStart && current < lunchEnd) {
        slots.push({
          time: timeStr,
          endTime: lunchEnd.toTimeString().substring(0, 5),
          period: "LUNCH",
          isLunch: true,
          isBreak: false
        });
        current = new Date(lunchEnd);
        lunchAdded = true;
        classesBeforeBreak = 0;
        continue;
      }
      
      if (classEnd > end) break;
      
      // Add regular class slot
      slots.push({
        time: timeStr,
        endTime: endTimeStr,
        period: `P${periodNumber}`,
        isLunch: false,
        isBreak: false
      });
      periodNumber++;
      classesBeforeBreak++;
      current = new Date(classEnd);
      
      // Add short break after every X classes if breaks are enabled
      if (config.needBreak && config.breakDuration > 0 && classesBeforeBreak === config.breakAfterEvery) {
        const breakStart = new Date(current);
        const breakEnd = new Date(current.getTime() + config.breakDuration * 60000);
        const breakEndTimeStr = breakEnd.toTimeString().substring(0, 5);
        
        if ((!lunchAdded && breakEnd <= lunchStart) || (lunchAdded && breakEnd <= end)) {
          slots.push({
            time: breakStart.toTimeString().substring(0, 5),
            endTime: breakEndTimeStr,
            period: "BREAK",
            isLunch: false,
            isBreak: true
          });
          current = breakEnd;
          classesBeforeBreak = 0;
        } else {
          classesBeforeBreak = 0;
        }
      }
    }
    
    return slots;
  };

  // PDF Download Function - Section Wise
  const downloadSectionPDF = async (semester, section) => {
    setDownloading(true);
    
    try {
      const timetable = AppState.timetable || [];
      const department = activeDepartment;
      
      if (!department) {
        alert("No active department selected. Please activate a department first.");
        setDownloading(false);
        return;
      }
      
      const filteredSlots = timetable.filter(t => 
        t.semester === semester && t.section === section && t.course === department
      );
      
      if (filteredSlots.length === 0) {
        alert(`No timetable data found for ${department} Semester ${semester}, Section ${section}`);
        setDownloading(false);
        return;
      }
      
      // Group by day
      const groupedByDay = {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: []
      };
      
      filteredSlots.forEach(slot => {
        if (groupedByDay[slot.day]) {
          groupedByDay[slot.day].push(slot);
        }
      });
      
      // Sort slots by period
      const periodOrder = { "P1": 1, "P2": 2, "P3": 3, "P4": 4, "P5": 5, "P6": 6, "P7": 7, "P8": 8 };
      Object.keys(groupedByDay).forEach(day => {
        groupedByDay[day].sort((a, b) => periodOrder[a.period] - periodOrder[b.period]);
      });
      
      // Get ALL time slots including breaks and lunch
      const config = AppState.timetableConfig;
      const allTimeSlots = generateTimeSlotsFromConfig(config);
      
      // Create HTML content for PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Timetable - ${department} Semester ${semester} Section ${section}</title>
          <style>
            @page {
              size: landscape;
              margin: 20mm;
            }
            body {
              font-family: 'Segoe UI', Arial, sans-serif;
              margin: 0;
              padding: 20px;
              background: white;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .header h1 {
              color: #B9A572;
              margin: 0;
              font-size: 24px;
            }
            .header h2 {
              color: #1F2D34;
              margin: 5px 0;
              font-size: 18px;
            }
            .header p {
              color: #666;
              margin: 5px 0;
              font-size: 12px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th {
              background: #B9A572;
              color: white;
              padding: 10px;
              text-align: center;
              font-weight: bold;
              border: 1px solid #9B8558;
            }
            td {
              border: 1px solid #ddd;
              padding: 8px;
              vertical-align: top;
            }
            .day-cell {
              background: #f5f5f5;
              font-weight: bold;
              text-align: center;
              vertical-align: middle;
              width: 80px;
            }
            .slot-cell {
              min-height: 80px;
              background: white;
            }
            .class-item {
              margin-bottom: 8px;
              padding: 6px;
              border-left: 3px solid #B9A572;
              background: #f9f9f9;
            }
            .class-subject {
              font-weight: bold;
              font-size: 11px;
              color: #1F2D34;
            }
            .class-faculty {
              font-size: 9px;
              color: #666;
              margin-top: 4px;
            }
            .class-room {
              font-size: 9px;
              color: #5B8FB9;
              margin-top: 2px;
            }
            .lunch-cell {
              background: #FFFBEB;
              text-align: center;
              vertical-align: middle;
              color: #B9A572;
              font-weight: bold;
            }
            .break-cell {
              background: #EFF6FF;
              text-align: center;
              vertical-align: middle;
              color: #5B8FB9;
              font-weight: bold;
            }
            .footer {
              margin-top: 30px;
              text-align: center;
              font-size: 10px;
              color: #999;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${department} Timetable</h1>
            <h2>Semester ${semester} - Section ${section}</h2>
            <p>Generated on: ${new Date().toLocaleString()}</p>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Day / Time</th>
                ${allTimeSlots.map(slot => `
                  <th>
                    ${slot.isLunch ? '🍽️ LUNCH' : (slot.isBreak ? '☕ BREAK' : slot.period)}<br>
                    <small>${slot.time} - ${slot.endTime}</small>
                  </th>
                `).join('')}
              </tr>
            </thead>
            <tbody>
              ${["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(day => `
                <tr>
                  <td class="day-cell">${day}</td>
                  ${allTimeSlots.map(slot => {
                    // For lunch slots
                    if (slot.isLunch) {
                      return `<td class="lunch-cell">🍽️ LUNCH BREAK<br><small>${slot.time} - ${slot.endTime}</small></td>`;
                    }
                    // For break slots
                    if (slot.isBreak) {
                      return `<td class="break-cell">☕ SHORT BREAK<br><small>${slot.time} - ${slot.endTime}</small></td>`;
                    }
                    // For regular class slots
                    const classes = groupedByDay[day].filter(c => c.time === `${slot.time} - ${slot.endTime}`);
                    if (classes.length > 0) {
                      return `
                        <td class="slot-cell">
                          ${classes.map(c => `
                            <div class="class-item">
                              <div class="class-subject">${c.subject}</div>
                              <div class="class-faculty">👨‍🏫 ${c.facultyName}</div>
                              <div class="class-room">🏛️ ${c.room}</div>
                            </div>
                          `).join('')}
                        </td>
                      `;
                    }
                    return `<td class="slot-cell" style="text-align:center; color:#999;">—</td>`;
                  }).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="footer">
            <p>This is a computer-generated timetable. Please verify with the academic office for any changes.</p>
          </div>
        </body>
        </html>
      `;
      
      const element = document.createElement('div');
      element.innerHTML = htmlContent;
      document.body.appendChild(element);
      
      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `${department}_Sem${semester}_Sec${section}_Timetable.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, letterRendering: true },
        jsPDF: { unit: 'in', format: 'a3', orientation: 'landscape' }
      };
      
      await html2pdf().set(opt).from(element).save();
      document.body.removeChild(element);
      
      alert(`PDF downloaded for ${department} Semester ${semester}, Section ${section}`);
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const downloadAllSectionsPDF = async () => {
    if (!activeDepartment) {
      alert("No active department selected. Please activate a department first.");
      return;
    }
    
    setDownloading(true);
    try {
      for (const semester of [1, 2]) {
        for (const section of ["A", "B", "C"]) {
          await downloadSectionPDF(semester, section);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      alert("All PDFs downloaded successfully!");
    } catch (error) {
      console.error("Error downloading all PDFs:", error);
    } finally {
      setDownloading(false);
    }
  };

  // Custom Timetable View with PDF buttons
  const TimetableViewWithPDF = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <CoordinatorTimetableView />
      
      {/* PDF Download Section */}
      {activeDepartment && (
        <Card style={{ marginTop: 24 }}>
          <div style={{ padding: 20 }}>
            <h4 style={{ color: C.gold.main, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <span>📄</span> Download Timetable as PDF
            </h4>
            <p style={{ color: C.text.secondary, marginBottom: 16, fontSize: 13 }}>
              Generate and download timetable for each section and semester separately. Includes lunch and short breaks.
            </p>
            
            <div style={{ marginBottom: 20 }}>
              <h5 style={{ color: C.accent.blue, marginBottom: 12 }}>Semester 1</h5>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Button 
                  onClick={() => downloadSectionPDF(1, "A")} 
                  variant="secondary" 
                  size="md"
                  disabled={downloading}
                >
                  📥 Semester 1 - Section A
                </Button>
                <Button 
                  onClick={() => downloadSectionPDF(1, "B")} 
                  variant="secondary" 
                  size="md"
                  disabled={downloading}
                >
                  📥 Semester 1 - Section B
                </Button>
                <Button 
                  onClick={() => downloadSectionPDF(1, "C")} 
                  variant="secondary" 
                  size="md"
                  disabled={downloading}
                >
                  📥 Semester 1 - Section C
                </Button>
              </div>
            </div>
            
            <div style={{ marginBottom: 20 }}>
              <h5 style={{ color: C.accent.green, marginBottom: 12 }}>Semester 2</h5>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Button 
                  onClick={() => downloadSectionPDF(2, "A")} 
                  variant="secondary" 
                  size="md"
                  disabled={downloading}
                >
                  📥 Semester 2 - Section A
                </Button>
                <Button 
                  onClick={() => downloadSectionPDF(2, "B")} 
                  variant="secondary" 
                  size="md"
                  disabled={downloading}
                >
                  📥 Semester 2 - Section B
                </Button>
                <Button 
                  onClick={() => downloadSectionPDF(2, "C")} 
                  variant="secondary" 
                  size="md"
                  disabled={downloading}
                >
                  📥 Semester 2 - Section C
                </Button>
              </div>
            </div>
            
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16, marginTop: 8 }}>
              <Button 
                onClick={downloadAllSectionsPDF} 
                variant="primary" 
                size="lg"
                disabled={downloading}
                style={{ background: C.gold.gradient, width: "100%" }}
              >
                {downloading ? "⏳ Generating PDFs..." : "📥 Download ALL Sections (6 PDFs)"}
              </Button>
              {downloading && (
                <p style={{ marginTop: 12, fontSize: 12, color: C.text.secondary, textAlign: "center" }}>
                  ⏳ Generating PDFs, please wait... This may take a few moments.
                </p>
              )}
            </div>
          </div>
        </Card>
      )}
      
      {!activeDepartment && (
        <Card style={{ background: C.accent.goldBg }}>
          <p style={{ color: C.accent.gold, margin: 0, textAlign: "center" }}>
            ⚠️ No active department. Please activate a department first to download timetable PDFs.
          </p>
        </Card>
      )}
    </div>
  );
  
  const ADMIN_NAV = [
    { id: "overview", icon: "📊", label: "Overview" },
    { id: "subjectApproval", icon: "📚", label: "Subject Approval" },
    { id: "preferenceApproval", icon: "⭐", label: "Preference Approval" },
    { id: "courseApproval", icon: "✅", label: "Course Approval" },
    { id: "timetable", icon: "📅", label: "Timetable" },
    { id: "eaPermissions", icon: "👥", label: "EA Permissions" },
    { id: "deletionApproval", icon: "🗑️", label: "Deletion Requests" },
    { id: "issues", icon: "⚠", label: "Flagged Issues" },
  ];
  
  const panels = {
    overview: (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Title>Dean's Dashboard - SoCSE</Title>

        {/* Statistics Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16 }}>
          <Card padding="20px">
            <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Subject Approvals</p>
            <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingSubjectApprovals}</p>
          </Card>
          <Card padding="20px">
            <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Preference Approvals</p>
            <p style={{ color: C.accent.blue, fontSize: 32, fontWeight: 700 }}>{pendingPreferenceApprovals}</p>
          </Card>
          <Card padding="20px">
            <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Course Approvals</p>
            <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingCourseApprovals}</p>
          </Card>
          <Card padding="20px">
            <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Deletion Requests</p>
            <p style={{ color: C.accent.purple, fontSize: 32, fontWeight: 700 }}>{pendingDeletionRequests}</p>
          </Card>
          <Card padding="20px">
            <p style={{ color: C.text.tertiary, fontSize: 12 }}>Flagged Issues</p>
            <p style={{ color: C.accent.red, fontSize: 32, fontWeight: 700 }}>{flaggedIssues}</p>
          </Card>
        </div>

        <Card>
          <Title level={4}>System Overview</Title>
          <p style={{ color: C.text.primary, marginBottom: 16 }}>Welcome, {user?.name}</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
            <div>
              <h5 style={{ color: C.accent.blue, marginBottom: 12 }}>Configuration</h5>
              <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Days: Mon-Fri</p>
              <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Class Duration: {AppState.timetableConfig?.classDuration || 50} min</p>
              <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Break: {AppState.timetableConfig?.breakDuration || 10} min</p>
              <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Lunch: {AppState.timetableConfig?.lunchBreak?.duration || 40} min</p>
              <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Sections: 3 (A, B, C)</p>
              <p style={{ color: C.text.secondary }}>• Rooms: {AppState.rooms?.length || 0}</p>
            </div>

            <div>
              <h5 style={{ color: C.accent.blue, marginBottom: 12 }}>Workflow Status</h5>
              <p style={{ color: C.accent.green, marginBottom: 8 }}>✓ All systems operational</p>
              <p style={{ color: C.text.secondary, marginBottom: 4 }}>
                Subjects: {approvedSubjects.length}/{AppState.subjects?.length || 0} approved
              </p>
              <p style={{ color: C.text.secondary, marginBottom: 4 }}>
                Preferences: {AppState.subjectPreferences?.filter(p => p.status === "approved").length || 0}/6 approved
              </p>
              <p style={{ color: C.text.secondary, marginBottom: 4 }}>
                Dean Approved: {AppState.courseDetails?.filter(c => c.deanStatus === "approved").length || 0} courses
              </p>
              <p style={{ color: C.text.secondary }}>
                Timetable: {AppState.timetable?.length || 0} slots
              </p>
            </div>
          </div>
        </Card>

        {/* Subject Status Section with Dropdowns */}
        <Card>
          <Title level={4}>Subject Status Overview</Title>
          
          {/* Approved Subjects Dropdown */}
          <div style={{ marginBottom: 16 }}>
            <button
              onClick={() => setShowApprovedSubjects(!showApprovedSubjects)}
              style={{
                width: "100%",
                padding: "12px 16px",
                background: C.accent.greenBg,
                border: `1px solid ${C.accent.green}`,
                borderRadius: 8,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                fontSize: 16,
                fontWeight: 600,
                color: C.accent.green
              }}
            >
              <span>✅ Approved Subjects ({approvedSubjects.length})</span>
              <span>{showApprovedSubjects ? "▲" : "▼"}</span>
            </button>
            {showApprovedSubjects && (
              <div style={{ 
                marginTop: 8, 
                padding: 12, 
                background: C.cardHover, 
                borderRadius: 8,
                maxHeight: 300,
                overflowY: "auto"
              }}>
                {approvedSubjects.length === 0 ? (
                  <p style={{ color: C.text.tertiary, textAlign: "center" }}>No approved subjects</p>
                ) : (
                  approvedSubjects.map(subject => (
                    <div key={subject.id} style={{
                      padding: "8px 12px",
                      borderBottom: `1px solid ${C.border}`,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                      <div>
                        <strong>{subject.name}</strong>
                        <span style={{ marginLeft: 8, fontSize: 12, color: C.text.tertiary }}>({subject.code})</span>
                        <div style={{ fontSize: 11, color: C.text.tertiary }}>
                          {subject.course} - Semester {subject.semester} | {subject.subjectType} | {subject.examType}
                        </div>
                      </div>
                      <Badge variant="success">Approved</Badge>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          
          {/* Rejected Subjects Dropdown */}
          <div style={{ marginBottom: 16 }}>
            <button
              onClick={() => setShowRejectedSubjects(!showRejectedSubjects)}
              style={{
                width: "100%",
                padding: "12px 16px",
                background: C.accent.redBg,
                border: `1px solid ${C.accent.red}`,
                borderRadius: 8,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                fontSize: 16,
                fontWeight: 600,
                color: C.accent.red
              }}
            >
              <span>❌ Rejected Subjects ({rejectedSubjects.length})</span>
              <span>{showRejectedSubjects ? "▲" : "▼"}</span>
            </button>
            {showRejectedSubjects && (
              <div style={{ 
                marginTop: 8, 
                padding: 12, 
                background: C.cardHover, 
                borderRadius: 8,
                maxHeight: 300,
                overflowY: "auto"
              }}>
                {rejectedSubjects.length === 0 ? (
                  <p style={{ color: C.text.tertiary, textAlign: "center" }}>No rejected subjects</p>
                ) : (
                  rejectedSubjects.map(subject => (
                    <div key={subject.id} style={{
                      padding: "8px 12px",
                      borderBottom: `1px solid ${C.border}`,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                      <div>
                        <strong>{subject.name}</strong>
                        <span style={{ marginLeft: 8, fontSize: 12, color: C.text.tertiary }}>({subject.code})</span>
                        <div style={{ fontSize: 11, color: C.text.tertiary }}>
                          {subject.course} - Semester {subject.semester}
                        </div>
                        {subject.rejectionReason && (
                          <div style={{ fontSize: 11, color: C.accent.red, marginTop: 4 }}>
                            Reason: {subject.rejectionReason}
                          </div>
                        )}
                      </div>
                      <Badge variant="danger">Rejected</Badge>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          
          {/* Deleted Subjects Dropdown */}
          <div>
            <button
              onClick={() => setShowDeletedSubjects(!showDeletedSubjects)}
              style={{
                width: "100%",
                padding: "12px 16px",
                background: C.accent.purpleBg,
                border: `1px solid ${C.accent.purple}`,
                borderRadius: 8,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                fontSize: 16,
                fontWeight: 600,
                color: C.accent.purple
              }}
            >
              <span>🗑️ Deleted Subjects ({deletedSubjects.length})</span>
              <span>{showDeletedSubjects ? "▲" : "▼"}</span>
            </button>
            {showDeletedSubjects && (
              <div style={{ 
                marginTop: 8, 
                padding: 12, 
                background: C.cardHover, 
                borderRadius: 8,
                maxHeight: 300,
                overflowY: "auto"
              }}>
                {deletedSubjects.length === 0 ? (
                  <p style={{ color: C.text.tertiary, textAlign: "center" }}>No deleted subjects</p>
                ) : (
                  deletedSubjects.map(request => (
                    <div key={request.id} style={{
                      padding: "8px 12px",
                      borderBottom: `1px solid ${C.border}`,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                      <div>
                        <strong>{request.subjectName}</strong>
                        <span style={{ marginLeft: 8, fontSize: 12, color: C.text.tertiary }}>({request.subjectCode})</span>
                        <div style={{ fontSize: 11, color: C.text.tertiary }}>
                          {request.course} - Semester {request.semester}
                        </div>
                        <div style={{ fontSize: 11, color: C.accent.red, marginTop: 4 }}>
                          Deletion Reason: {request.reason}
                        </div>
                        {request.approvedDate && (
                          <div style={{ fontSize: 11, color: C.accent.green, marginTop: 4 }}>
                            Deleted on: {new Date(request.approvedDate).toLocaleString()}
                          </div>
                        )}
                      </div>
                      <Badge variant="purple">Deleted</Badge>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </Card>

        <Card>
          <Title level={4}>Semester Configuration Status</Title>
          {COURSES.map(course => {
            const semestersConfigured = SEMESTERS.filter(s => 
              AppState.semesterDetails[course]?.[s]
            ).length;

            return (
              <div key={course} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ color: C.text.primary, fontWeight: 500 }}>{course}</span>
                  <span style={{ color: semestersConfigured === 2 ? C.accent.green : C.accent.red }}>
                    {semestersConfigured}/2 semesters
                  </span>
                </div>
                <div style={{ height: 6, background: C.border, borderRadius: 3 }}>
                  <div style={{
                    height: "100%",
                    width: `${(semestersConfigured / 2) * 100}%`,
                    background: semestersConfigured === 2 ? C.accent.green : C.accent.red,
                    borderRadius: 3,
                  }} />
                </div>
              </div>
            );
          })}
        </Card>

        <FacultyWorkloadInsights />
      </div>
    ),

    subjectApproval: <DeanSubjectApproval />,
    preferenceApproval: <DeanPreferenceApproval />,
    courseApproval: <DeanCourseDetailsReview />,
    timetable: <TimetableViewWithPDF />,
    eaPermissions: <EAPermissionsManager onRefresh={() => setRefresh(r => r + 1)} />,
    deletionApproval: <DeanSubjectDeletionApproval />,
    issues: <AdminFlaggedIssuesPanel />,
  };
  
  const badges = {
    subjectApproval: pendingSubjectApprovals,
    preferenceApproval: pendingPreferenceApprovals,
    courseApproval: pendingCourseApprovals,
    deletionApproval: pendingDeletionRequests,
    issues: flaggedIssues,
  };
  
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
      <Sidebar 
        navItems={ADMIN_NAV} 
        active={active} 
        setActive={setActive} 
        collapsed={collapsed} 
        setCollapsed={setCollapsed} 
        user={user} 
        badges={badges} 
        accentColor={C.accent.gold} 
      />
      <main style={{ flex: 1, overflow: "auto" }}>
        <header style={{
          background: C.nav,
          borderBottom: `1px solid ${C.navBorder}`,
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}>
          <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>{ADMIN_NAV.find(n => n.id === active)?.label}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {totalPendingApprovals > 0 && (
              <Badge variant="warning">
                {totalPendingApprovals} total pending
              </Badge>
            )}
            {flaggedIssues > 0 && (
              <Badge variant="danger">
                {flaggedIssues} flagged issues
              </Badge>
            )}
            <div style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: C.accent.goldBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: C.accent.gold,
              fontWeight: 700,
            }}>
              {user?.avatar}
            </div>
          </div>
        </header>
        <div style={{ padding: 32 }}>{panels[active]}</div>
      </main>
    </div>
  );
}