// // src/components/ea/EADashboard.jsx
// import { useState, useEffect } from "react";
// import { useAuth } from "../auth/AuthContext";
// import { Sidebar, Card, Title, Badge, Button } from "../common";
// import { DeanSubjectApproval } from "../admin/DeanSubjectApproval";
// import { DeanPreferenceApproval } from "../admin/DeanPreferenceApproval";
// import { DeanCourseDetailsReview } from "../admin/DeanCourseDetailsReview";
// import { CoordinatorTimetableView } from "../coordinator/CoordinatorTimetableView";
// import { AdminFlaggedIssuesPanel } from "../admin/AdminFlaggedIssuesPanel";
// import { FacultyWorkloadInsights } from "../shared/FacultyWorkloadInsights";
// import { loadFromStorage, STORAGE_KEYS } from "../../utils/storage";
// import { COURSES, SEMESTERS, DEFAULT_EA_PERMISSIONS } from "../../data/mockData";
// import { C } from "../../styles/theme";

// export function EADashboard() {
//   const { user } = useAuth();
//   const [active, setActive] = useState("overview");
//   const [collapsed, setCollapsed] = useState(false);
//   const [permissions, setPermissions] = useState(DEFAULT_EA_PERMISSIONS);
//   const [refresh, setRefresh] = useState(0);

//   useEffect(() => {
//     loadPermissions();
    
//     const handleStorageChange = () => {
//       loadPermissions();
//       setRefresh(r => r + 1);
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   const loadPermissions = () => {
//     const savedPermissions = loadFromStorage(STORAGE_KEYS.EA_PERMISSIONS, DEFAULT_EA_PERMISSIONS);
//     setPermissions(savedPermissions);
//   };

//   // Build navigation based on permissions (duplicate of Dean's NAV but filtered)
//   const EA_NAV = [
//     { id: "overview", icon: "📊", label: "Overview", requires: true },
//     { id: "subjectApproval", icon: "📚", label: "Subject Approval", requires: permissions.subjectApproval },
//     { id: "preferenceApproval", icon: "⭐", label: "Preference Approval", requires: permissions.preferenceApproval },
//     { id: "courseApproval", icon: "✅", label: "Course Approval", requires: permissions.courseApproval },
//     { id: "timetable", icon: "📅", label: "Timetable", requires: permissions.timetableGeneration },
//     { id: "issues", icon: "⚠", label: "Flagged Issues", requires: true },
//     { id: "reports", icon: "📊", label: "Reports", requires: permissions.viewReports },
//   ].filter(item => item.requires);

//   // Get counts for badges
//   const pendingSubjectApprovals = permissions.subjectApproval ? (AppState.subjects?.filter(s => s.approvalStatus === "pending").length || 0) : 0;
//   const pendingPreferenceApprovals = permissions.preferenceApproval ? (AppState.subjectPreferences?.filter(p => p.submitted && p.status === "pending").length || 0) : 0;
//   const pendingCourseApprovals = permissions.courseApproval ? (AppState.courseDetails?.filter(c => c.deanStatus === "pending").length || 0) : 0;
//   const flaggedIssues = AppState.getFlaggedIssues?.().length || 0;

//   const badges = {
//     subjectApproval: pendingSubjectApprovals,
//     preferenceApproval: pendingPreferenceApprovals,
//     courseApproval: pendingCourseApprovals,
//     issues: flaggedIssues,
//   };

//   const panels = {
//     overview: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//         <Title>EA Dashboard - Executive Assistant</Title>
        
//         {/* Welcome Card with Permissions Summary */}
//         <Card>
//           <Title level={4}>Welcome, {user?.name}</Title>
//           <p style={{ color: C.text.secondary, marginBottom: 16 }}>
//             You are logged in as Executive Assistant. The Dean has granted you the following permissions:
//           </p>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
//             <div>
//               <p style={{ color: permissions.subjectApproval ? C.accent.green : C.accent.red }}>
//                 📚 Subject Approval: {permissions.subjectApproval ? "✓ Enabled" : "✗ Disabled"}
//               </p>
//               <p style={{ color: permissions.preferenceApproval ? C.accent.green : C.accent.red }}>
//                 ⭐ Preference Approval: {permissions.preferenceApproval ? "✓ Enabled" : "✗ Disabled"}
//               </p>
//               <p style={{ color: permissions.courseApproval ? C.accent.green : C.accent.red }}>
//                 ✅ Course Approval: {permissions.courseApproval ? "✓ Enabled" : "✗ Disabled"}
//               </p>
//             </div>
//             <div>
//               <p style={{ color: permissions.timetableGeneration ? C.accent.green : C.accent.red }}>
//                 📅 Timetable Generation: {permissions.timetableGeneration ? "✓ Enabled" : "✗ Disabled"}
//               </p>
//               <p style={{ color: permissions.viewReports ? C.accent.green : C.accent.red }}>
//                 📊 View Reports: {permissions.viewReports ? "✓ Enabled" : "✗ Disabled"}
//               </p>
//               <p style={{ color: permissions.viewAllData ? C.accent.green : C.accent.red }}>
//                 👁️ View All Data: {permissions.viewAllData ? "✓ Enabled" : "✗ Disabled"}
//               </p>
//             </div>
//           </div>
//         </Card>

//         {/* Statistics Cards - Only show if EA has permission to view */}
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
//           {permissions.subjectApproval && (
//             <Card padding="20px">
//               <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Subject Approvals</p>
//               <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingSubjectApprovals}</p>
//             </Card>
//           )}
//           {permissions.preferenceApproval && (
//             <Card padding="20px">
//               <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Preference Approvals</p>
//               <p style={{ color: C.accent.blue, fontSize: 32, fontWeight: 700 }}>{pendingPreferenceApprovals}</p>
//             </Card>
//           )}
//           {permissions.courseApproval && (
//             <Card padding="20px">
//               <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Course Approvals</p>
//               <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingCourseApprovals}</p>
//             </Card>
//           )}
//           <Card padding="20px">
//             <p style={{ color: C.text.tertiary, fontSize: 12 }}>Flagged Issues</p>
//             <p style={{ color: C.accent.red, fontSize: 32, fontWeight: 700 }}>{flaggedIssues}</p>
//           </Card>
//         </div>

//         {/* System Overview - Visible if viewAllData is enabled */}
//         {(permissions.viewAllData || permissions.viewReports) && (
//           <Card>
//             <Title level={4}>System Overview</Title>
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
//               <div>
//                 <h5 style={{ color: C.accent.blue, marginBottom: 12 }}>Configuration</h5>
//                 <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Days: Mon-Fri</p>
//                 <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Class Duration: {AppState.timetableConfig?.classDuration || 50} min</p>
//                 <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Break: {AppState.timetableConfig?.breakDuration || 10} min</p>
//                 <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Lunch: {AppState.timetableConfig?.lunchBreak?.duration || 40} min</p>
//                 <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Sections: 3 (A, B, C)</p>
//                 <p style={{ color: C.text.secondary }}>• Rooms: {AppState.rooms?.length || 0}</p>
//               </div>
//               <div>
//                 <h5 style={{ color: C.accent.blue, marginBottom: 12 }}>Workflow Status</h5>
//                 <p style={{ color: C.accent.green, marginBottom: 8 }}>✓ All systems operational</p>
//                 <p style={{ color: C.text.secondary, marginBottom: 4 }}>
//                   Subjects: {AppState.subjects?.filter(s => s.approvalStatus === "approved").length || 0}/{AppState.subjects?.length || 0} approved
//                 </p>
//                 <p style={{ color: C.text.secondary, marginBottom: 4 }}>
//                   Preferences: {AppState.subjectPreferences?.filter(p => p.status === "approved").length || 0}/6 approved
//                 </p>
//                 <p style={{ color: C.text.secondary, marginBottom: 4 }}>
//                   Dean Approved: {AppState.courseDetails?.filter(c => c.deanStatus === "approved").length || 0} courses
//                 </p>
//                 <p style={{ color: C.text.secondary }}>
//                   Timetable: {AppState.timetable?.length || 0} slots
//                 </p>
//               </div>
//             </div>
//           </Card>
//         )}

//         {/* Semester Configuration Status - Visible if viewAllData is enabled */}
//         {(permissions.viewAllData || permissions.viewReports) && (
//           <Card>
//             <Title level={4}>Semester Configuration Status</Title>
//             {COURSES.map(course => {
//               const semestersConfigured = SEMESTERS.filter(s => 
//                 AppState.semesterDetails[course]?.[s]
//               ).length;
//               return (
//                 <div key={course} style={{ marginBottom: 16 }}>
//                   <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
//                     <span style={{ color: C.text.primary, fontWeight: 500 }}>{course}</span>
//                     <span style={{ color: semestersConfigured === 2 ? C.accent.green : C.accent.red }}>
//                       {semestersConfigured}/2 semesters
//                     </span>
//                   </div>
//                   <div style={{ height: 6, background: C.border, borderRadius: 3 }}>
//                     <div style={{
//                       height: "100%",
//                       width: `${(semestersConfigured / 2) * 100}%`,
//                       background: semestersConfigured === 2 ? C.accent.green : C.accent.red,
//                       borderRadius: 3,
//                     }} />
//                   </div>
//                 </div>
//               );
//             })}
//           </Card>
//         )}

//         {/* Faculty Workload Insights - Visible if viewAllData is enabled */}
//         {(permissions.viewAllData || permissions.viewReports) && (
//           <FacultyWorkloadInsights />
//         )}
//       </div>
//     ),
//     subjectApproval: permissions.subjectApproval ? <DeanSubjectApproval /> : <Card><p>You don't have permission to access this feature.</p></Card>,
//     preferenceApproval: permissions.preferenceApproval ? <DeanPreferenceApproval /> : <Card><p>You don't have permission to access this feature.</p></Card>,
//     courseApproval: permissions.courseApproval ? <DeanCourseDetailsReview /> : <Card><p>You don't have permission to access this feature.</p></Card>,
//     timetable: permissions.timetableGeneration ? <CoordinatorTimetableView /> : <Card><p>You don't have permission to access this feature.</p></Card>,
//     issues: <AdminFlaggedIssuesPanel />,
//     reports: permissions.viewReports ? (
//       <Card>
//         <Title level={4}>Reports & Analytics</Title>
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
//           <div style={{ padding: 16, background: C.cardHover, borderRadius: 8 }}>
//             <h4>Subject Statistics</h4>
//             <p>Total Subjects: {AppState.subjects?.length || 0}</p>
//             <p>Approved: {AppState.subjects?.filter(s => s.approvalStatus === "approved").length || 0}</p>
//             <p>Pending: {AppState.subjects?.filter(s => s.approvalStatus === "pending").length || 0}</p>
//             <p>Rejected: {AppState.subjects?.filter(s => s.approvalStatus === "rejected").length || 0}</p>
//           </div>
//           <div style={{ padding: 16, background: C.cardHover, borderRadius: 8 }}>
//             <h4>Faculty Statistics</h4>
//             <p>Total Faculty: {AppState.faculty?.length || 0}</p>
//             <p>Preferences Submitted: {AppState.subjectPreferences?.filter(p => p.submitted).length || 0}</p>
//             <p>Preferences Approved: {AppState.subjectPreferences?.filter(p => p.status === "approved").length || 0}</p>
//           </div>
//           <div style={{ padding: 16, background: C.cardHover, borderRadius: 8 }}>
//             <h4>Course Statistics</h4>
//             <p>Total Courses: {AppState.courseDetails?.length || 0}</p>
//             <p>Approved by Dean: {AppState.courseDetails?.filter(c => c.deanStatus === "approved").length || 0}</p>
//             <p>Timetable Slots: {AppState.timetable?.length || 0}</p>
//           </div>
//           <div style={{ padding: 16, background: C.cardHover, borderRadius: 8 }}>
//             <h4>Flagged Issues</h4>
//             <p>Total Issues: {flaggedIssues}</p>
//             <p>Resolved: {AppState.flaggedIssues?.filter(i => i.resolved).length || 0}</p>
//             <p>Pending: {flaggedIssues}</p>
//           </div>
//         </div>
//       </Card>
//     ) : <Card><p>You don't have permission to view reports.</p></Card>,
//   };

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
//       <Sidebar
//         navItems={EA_NAV}
//         active={active}
//         setActive={setActive}
//         collapsed={collapsed}
//         setCollapsed={setCollapsed}
//         user={user}
//         badges={badges}
//         accentColor={C.accent.purple}
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
//           <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>
//             {EA_NAV.find(n => n.id === active)?.label || "Dashboard"}
//           </h2>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             <Badge variant="purple">
//               EA - {user?.name}
//             </Badge>
//             <div style={{
//               width: 40,
//               height: 40,
//               borderRadius: "50%",
//               background: C.accent.purpleBg,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: C.accent.purple,
//               fontWeight: 700,
//             }}>
//               {user?.avatar}
//             </div>
//           </div>
//         </header>
//         <div style={{ padding: 32 }}>{panels[active] || panels.overview}</div>
//       </main>
//     </div>
//   );
// }

// src/components/ea/EADashboard.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { Sidebar, Card, Title, Badge, Button } from "../common";
import { DeanSubjectApproval } from "../admin/DeanSubjectApproval";
import { DeanPreferenceApproval } from "../admin/DeanPreferenceApproval";
import { DeanCourseDetailsReview } from "../admin/DeanCourseDetailsReview";
import { CoordinatorTimetableView } from "../coordinator/CoordinatorTimetableView";
import { AdminFlaggedIssuesPanel } from "../admin/AdminFlaggedIssuesPanel";
import { FacultyWorkloadInsights } from "../shared/FacultyWorkloadInsights";
import { loadFromStorage, STORAGE_KEYS } from "../../utils/storage";
import { COURSES, SEMESTERS } from "../../data/mockData";
import { C } from "../../styles/theme";

// Default all permissions to FALSE
const DEFAULT_PERMISSIONS = {
  subjectApproval: false,
  preferenceApproval: false,
  courseApproval: false,
  timetableGeneration: false,
  viewReports: false,
  manageFaculty: false,
  viewAllData: false
};

export function EADashboard() {
  const { user } = useAuth();
  const [active, setActive] = useState("overview");
  const [collapsed, setCollapsed] = useState(false);
  const [permissions, setPermissions] = useState(DEFAULT_PERMISSIONS);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    loadPermissions();
    
    const handleStorageChange = () => {
      console.log("Storage changed, reloading permissions...");
      loadPermissions();
      setRefresh(r => r + 1);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadPermissions = () => {
    try {
      const saved = loadFromStorage(STORAGE_KEYS.EA_PERMISSIONS, DEFAULT_PERMISSIONS);
      console.log("EA Dashboard - Loaded permissions:", saved);
      setPermissions(saved);
    } catch (error) {
      console.error("Error loading permissions:", error);
      setPermissions(DEFAULT_PERMISSIONS);
    }
  };

  // Build navigation based on permissions (only show enabled features)
  const EA_NAV = [
    { id: "overview", icon: "📊", label: "Overview" },
  ];
  
  if (permissions.subjectApproval === true) {
    EA_NAV.push({ id: "subjectApproval", icon: "📚", label: "Subject Approval" });
  }
  if (permissions.preferenceApproval === true) {
    EA_NAV.push({ id: "preferenceApproval", icon: "⭐", label: "Preference Approval" });
  }
  if (permissions.courseApproval === true) {
    EA_NAV.push({ id: "courseApproval", icon: "✅", label: "Course Approval" });
  }
  if (permissions.timetableGeneration === true) {
    EA_NAV.push({ id: "timetable", icon: "📅", label: "Timetable" });
  }
  
  EA_NAV.push({ id: "issues", icon: "⚠", label: "Flagged Issues" });
  
  if (permissions.viewReports === true) {
    EA_NAV.push({ id: "reports", icon: "📊", label: "Reports" });
  }

  console.log("EA Navigation tabs:", EA_NAV.map(n => n.label));

  // Get counts for badges
  const pendingSubjectApprovals = permissions.subjectApproval ? (window.AppState?.subjects?.filter(s => s.approvalStatus === "pending").length || 0) : 0;
  const pendingPreferenceApprovals = permissions.preferenceApproval ? (window.AppState?.subjectPreferences?.filter(p => p.submitted && p.status === "pending").length || 0) : 0;
  const pendingCourseApprovals = permissions.courseApproval ? (window.AppState?.courseDetails?.filter(c => c.deanStatus === "pending").length || 0) : 0;
  const flaggedIssues = window.AppState?.getFlaggedIssues?.().length || 0;

  const badges = {
    subjectApproval: pendingSubjectApprovals,
    preferenceApproval: pendingPreferenceApprovals,
    courseApproval: pendingCourseApprovals,
    issues: flaggedIssues,
  };

  const panels = {
    overview: (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Title>EA Dashboard - Executive Assistant</Title>
        
        <Card>
          <Title level={4}>Welcome, {user?.name}</Title>
          <p style={{ color: C.text.secondary, marginBottom: 16 }}>
            You are logged in as Executive Assistant. The Dean has granted you the following permissions:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
            <div>
              <p style={{ color: permissions.subjectApproval ? C.accent.green : C.accent.red }}>
                📚 Subject Approval: {permissions.subjectApproval ? "✓ Enabled" : "✗ Disabled"}
              </p>
              <p style={{ color: permissions.preferenceApproval ? C.accent.green : C.accent.red }}>
                ⭐ Preference Approval: {permissions.preferenceApproval ? "✓ Enabled" : "✗ Disabled"}
              </p>
              <p style={{ color: permissions.courseApproval ? C.accent.green : C.accent.red }}>
                ✅ Course Approval: {permissions.courseApproval ? "✓ Enabled" : "✗ Disabled"}
              </p>
            </div>
            <div>
              <p style={{ color: permissions.timetableGeneration ? C.accent.green : C.accent.red }}>
                📅 Timetable Generation: {permissions.timetableGeneration ? "✓ Enabled" : "✗ Disabled"}
              </p>
              <p style={{ color: permissions.viewReports ? C.accent.green : C.accent.red }}>
                📊 View Reports: {permissions.viewReports ? "✓ Enabled" : "✗ Disabled"}
              </p>
              <p style={{ color: permissions.viewAllData ? C.accent.green : C.accent.red }}>
                👁️ View All Data: {permissions.viewAllData ? "✓ Enabled" : "✗ Disabled"}
              </p>
            </div>
          </div>
        </Card>

        {/* Statistics Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {permissions.subjectApproval && (
            <Card padding="20px">
              <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Subject Approvals</p>
              <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingSubjectApprovals}</p>
            </Card>
          )}
          {permissions.preferenceApproval && (
            <Card padding="20px">
              <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Preference Approvals</p>
              <p style={{ color: C.accent.blue, fontSize: 32, fontWeight: 700 }}>{pendingPreferenceApprovals}</p>
            </Card>
          )}
          {permissions.courseApproval && (
            <Card padding="20px">
              <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Course Approvals</p>
              <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingCourseApprovals}</p>
            </Card>
          )}
          <Card padding="20px">
            <p style={{ color: C.text.tertiary, fontSize: 12 }}>Flagged Issues</p>
            <p style={{ color: C.accent.red, fontSize: 32, fontWeight: 700 }}>{flaggedIssues}</p>
          </Card>
        </div>

        {/* System Overview - Only if viewAllData enabled */}
        {permissions.viewAllData && (
          <Card>
            <Title level={4}>System Overview</Title>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
              <div>
                <h5 style={{ color: C.accent.blue, marginBottom: 12 }}>Configuration</h5>
                <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Days: Mon-Fri</p>
                <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Class Duration: {window.AppState?.timetableConfig?.classDuration || 50} min</p>
                <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Break: {window.AppState?.timetableConfig?.breakDuration || 10} min</p>
                <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Lunch: {window.AppState?.timetableConfig?.lunchBreak?.duration || 40} min</p>
                <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Sections: 3 (A, B, C)</p>
                <p style={{ color: C.text.secondary }}>• Rooms: {window.AppState?.rooms?.length || 0}</p>
              </div>
              <div>
                <h5 style={{ color: C.accent.blue, marginBottom: 12 }}>Workflow Status</h5>
                <p style={{ color: C.accent.green, marginBottom: 8 }}>✓ All systems operational</p>
                <p style={{ color: C.text.secondary, marginBottom: 4 }}>
                  Subjects: {window.AppState?.subjects?.filter(s => s.approvalStatus === "approved").length || 0}/{window.AppState?.subjects?.length || 0} approved
                </p>
                <p style={{ color: C.text.secondary, marginBottom: 4 }}>
                  Preferences: {window.AppState?.subjectPreferences?.filter(p => p.status === "approved").length || 0}/6 approved
                </p>
                <p style={{ color: C.text.secondary, marginBottom: 4 }}>
                  Dean Approved: {window.AppState?.courseDetails?.filter(c => c.deanStatus === "approved").length || 0} courses
                </p>
                <p style={{ color: C.text.secondary }}>
                  Timetable: {window.AppState?.timetable?.length || 0} slots
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Semester Configuration - Only if viewAllData enabled */}
        {permissions.viewAllData && (
          <Card>
            <Title level={4}>Semester Configuration Status</Title>
            {COURSES.map(course => {
              const semestersConfigured = SEMESTERS.filter(s => 
                window.AppState?.semesterDetails[course]?.[s]
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
        )}

        {/* Faculty Workload - Only if viewAllData enabled */}
        {permissions.viewAllData && <FacultyWorkloadInsights />}
      </div>
    ),
    subjectApproval: permissions.subjectApproval ? <DeanSubjectApproval /> : <Card><p style={{ textAlign: "center", padding: 40 }}>⚠️ You don't have permission to access Subject Approval. Please contact the Dean.</p></Card>,
    preferenceApproval: permissions.preferenceApproval ? <DeanPreferenceApproval /> : <Card><p style={{ textAlign: "center", padding: 40 }}>⚠️ You don't have permission to access Preference Approval. Please contact the Dean.</p></Card>,
    courseApproval: permissions.courseApproval ? <DeanCourseDetailsReview /> : <Card><p style={{ textAlign: "center", padding: 40 }}>⚠️ You don't have permission to access Course Approval. Please contact the Dean.</p></Card>,
    timetable: permissions.timetableGeneration ? <CoordinatorTimetableView /> : <Card><p style={{ textAlign: "center", padding: 40 }}>⚠️ You don't have permission to access Timetable. Please contact the Dean.</p></Card>,
    issues: <AdminFlaggedIssuesPanel />,
    reports: permissions.viewReports ? (
      <Card>
        <Title level={4}>Reports & Analytics</Title>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
          <div style={{ padding: 16, background: C.cardHover, borderRadius: 8 }}>
            <h4>Subject Statistics</h4>
            <p>Total Subjects: {window.AppState?.subjects?.length || 0}</p>
            <p>Approved: {window.AppState?.subjects?.filter(s => s.approvalStatus === "approved").length || 0}</p>
            <p>Pending: {window.AppState?.subjects?.filter(s => s.approvalStatus === "pending").length || 0}</p>
            <p>Rejected: {window.AppState?.subjects?.filter(s => s.approvalStatus === "rejected").length || 0}</p>
          </div>
          <div style={{ padding: 16, background: C.cardHover, borderRadius: 8 }}>
            <h4>Faculty Statistics</h4>
            <p>Total Faculty: {window.AppState?.faculty?.length || 0}</p>
            <p>Preferences Submitted: {window.AppState?.subjectPreferences?.filter(p => p.submitted).length || 0}</p>
            <p>Preferences Approved: {window.AppState?.subjectPreferences?.filter(p => p.status === "approved").length || 0}</p>
          </div>
          <div style={{ padding: 16, background: C.cardHover, borderRadius: 8 }}>
            <h4>Course Statistics</h4>
            <p>Total Courses: {window.AppState?.courseDetails?.length || 0}</p>
            <p>Approved by Dean: {window.AppState?.courseDetails?.filter(c => c.deanStatus === "approved").length || 0}</p>
            <p>Timetable Slots: {window.AppState?.timetable?.length || 0}</p>
          </div>
          <div style={{ padding: 16, background: C.cardHover, borderRadius: 8 }}>
            <h4>Flagged Issues</h4>
            <p>Total Issues: {flaggedIssues}</p>
            <p>Resolved: {window.AppState?.flaggedIssues?.filter(i => i.resolved).length || 0}</p>
            <p>Pending: {flaggedIssues}</p>
          </div>
        </div>
      </Card>
    ) : <Card><p style={{ textAlign: "center", padding: 40 }}>⚠️ You don't have permission to view Reports. Please contact the Dean.</p></Card>,
  };

  const currentPanel = panels[active] || panels.overview;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
      <Sidebar
        navItems={EA_NAV}
        active={active}
        setActive={setActive}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        user={user}
        badges={badges}
        accentColor={C.accent.purple}
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
          <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>
            {EA_NAV.find(n => n.id === active)?.label || "Dashboard"}
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Badge variant="purple">
              EA - {user?.name}
            </Badge>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: C.accent.purpleBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: C.accent.purple,
              fontWeight: 700,
            }}>
              {user?.avatar}
            </div>
          </div>
        </header>
        <div style={{ padding: 32 }}>{currentPanel}</div>
      </main>
    </div>
  );
}