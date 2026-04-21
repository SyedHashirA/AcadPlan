// import { useState, useEffect } from "react";
// import { useAuth } from "../auth/AuthContext";
// import { Sidebar, Card, Title, Badge, Button } from "../common";
// import { CoordinatorSemesterDetailsForm } from "./CoordinatorSemesterDetailsForm";
// import { CoordinatorPreferenceReview } from "./CoordinatorPreferenceReview";
// import { CoordinatorCourseDetailsReview } from "./CoordinatorCourseDetailsReview";
// import { CoordinatorTimetableView } from "./CoordinatorTimetableView";
// import { AppState } from "../../AppState";
// import { COURSES, SEMESTERS } from "../../data/mockData";
// import { C } from "../../styles/theme";

// export function CoordinatorDashboard() {
//   const { user } = useAuth();
//   const [active, setActive] = useState("semester");
//   const [collapsed, setCollapsed] = useState(false);
//   const [refresh, setRefresh] = useState(0);
  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRefresh(r => r + 1);
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const pendingPrefs = AppState.subjectPreferences.filter(p => p.submitted && p.status === "pending").length;
//   const pendingCourses = AppState.getPendingCoordinatorApprovals().length;
  
//   const COORD_NAV = [
//     { id: "semester", icon: "📋", label: "Semester Details" },
//     { id: "preferences", icon: "⭐", label: "Subject Preferences" },
//     { id: "courses", icon: "📚", label: "Course Details" },
//     { id: "timetable", icon: "📅", label: "Timetable" },
//     { id: "overview", icon: "📊", label: "Overview" },
//   ];
  
//   const panels = {
//     semester: <CoordinatorSemesterDetailsForm />,
//     preferences: <CoordinatorPreferenceReview />,
//     courses: <CoordinatorCourseDetailsReview />,
//     timetable: <CoordinatorTimetableView />,
//     overview: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//         <Title>Workflow Overview - SoCSE</Title>
        
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
//           <Card>
//             <Title level={4}>Step 1: Semester Details</Title>
//             {COURSES.map(course => {
//               const semestersConfigured = SEMESTERS.filter(s => 
//                 AppState.semesterDetails[course]?.[s]
//               ).length;
              
//               return (
//                 <div key={course} style={{ marginBottom: 12 }}>
//                   <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
//                     <span style={{ color: C.text.secondary }}>{course}</span>
//                     <span style={{ color: semestersConfigured === 2 ? C.accent.green : C.accent.gold }}>
//                       {semestersConfigured}/2
//                     </span>
//                   </div>
//                   <div style={{ height: 4, background: C.border, borderRadius: 2 }}>
//                     <div style={{ height: "100%", width: `${(semestersConfigured / 2) * 100}%`, background: semestersConfigured === 2 ? C.accent.green : C.accent.gold, borderRadius: 2 }} />
//                   </div>
//                 </div>
//               );
//             })}
//           </Card>
          
//           <Card>
//             <Title level={4}>Step 2: Subject Preferences</Title>
//             <div style={{ marginBottom: 16 }}>
//               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
//                 <span style={{ color: C.text.secondary }}>Submitted</span>
//                 <span style={{ color: C.text.primary }}>{AppState.subjectPreferences.filter(p => p.submitted).length}/6</span>
//               </div>
//               <div style={{ height: 6, background: C.border, borderRadius: 3 }}>
//                 <div style={{ height: "100%", width: `${(AppState.subjectPreferences.filter(p => p.submitted).length / 6) * 100}%`, background: C.accent.blue, borderRadius: 3 }} />
//               </div>
//             </div>
//             <div>
//               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
//                 <span style={{ color: C.text.secondary }}>Approved</span>
//                 <span style={{ color: C.text.primary }}>{AppState.subjectPreferences.filter(p => p.status === "approved").length}/6</span>
//               </div>
//               <div style={{ height: 6, background: C.border, borderRadius: 3 }}>
//                 <div style={{ height: "100%", width: `${(AppState.subjectPreferences.filter(p => p.status === "approved").length / 6) * 100}%`, background: C.accent.green, borderRadius: 3 }} />
//               </div>
//             </div>
//           </Card>
          
//           <Card>
//             <Title level={4}>Step 3: Course Details</Title>
//             <div style={{ marginBottom: 16 }}>
//               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
//                 <span style={{ color: C.text.secondary }}>Submitted</span>
//                 <span style={{ color: C.text.primary }}>{AppState.courseDetails.length} courses</span>
//               </div>
//             </div>
//             <div>
//               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
//                 <span style={{ color: C.text.secondary }}>Coordinator Approved</span>
//                 <span style={{ color: C.text.primary }}>{AppState.courseDetails.filter(c => c.coordinatorStatus === "approved").length} courses</span>
//               </div>
//               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
//                 <span style={{ color: C.text.secondary }}>Dean Approved</span>
//                 <span style={{ color: C.text.primary }}>{AppState.courseDetails.filter(c => c.deanStatus === "approved").length} courses</span>
//               </div>
//             </div>
//           </Card>
//         </div>
        
//         <Card>
//           <Title level={4}>Step 4: Timetable Generation</Title>
//           {AppState.timetable.length > 0 ? (
//             <div>
//               <p style={{ color: C.accent.green, marginBottom: 12 }}>✓ Timetable generated with {AppState.timetable.length} slots</p>
//               <Button onClick={() => setActive("timetable")} variant="primary">
//                 View Timetable
//               </Button>
//             </div>
//           ) : (
//             <p style={{ color: C.text.tertiary }}>Waiting for dean's approval before generation...</p>
//           )}
//         </Card>
//       </div>
//     ),
//   };
  
//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
//       <Sidebar navItems={COORD_NAV} active={active} setActive={setActive} collapsed={collapsed} setCollapsed={setCollapsed} user={user} badges={{ preferences: pendingPrefs, courses: pendingCourses }} accentColor={C.accent.blue} />
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
//         }}>
//           <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>{COORD_NAV.find(n => n.id === active)?.label}</h2>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             {(pendingPrefs > 0 || pendingCourses > 0) && (
//               <Badge variant="warning">
//                 {pendingPrefs + pendingCourses} pending
//               </Badge>
//             )}
//             <div style={{
//               width: 40,
//               height: 40,
//               borderRadius: "50%",
//               background: C.accent.blueBg,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: C.accent.blue,
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

// // src/components/coordinator/CoordinatorDashboard.jsx
// import { useState, useEffect } from "react";
// import { useAuth } from "../auth/AuthContext";
// import { Sidebar, Card, Title, Badge, Button } from "../common";
// import { CoordinatorSemesterDetailsForm } from "./CoordinatorSemesterDetailsForm";
// import { CoordinatorPreferenceReview } from "./CoordinatorPreferenceReview";
// import { CoordinatorCourseDetailsReview } from "./CoordinatorCourseDetailsReview";
// import { CoordinatorTimetableView } from "./CoordinatorTimetableView";
// import { AppState } from "../../AppState";
// import { COURSES, SEMESTERS } from "../../data/mockData";
// import { C } from "../../styles/theme";

// export function CoordinatorDashboard() {
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
  
//   // Get counts
//   const pendingPrefs = AppState.subjectPreferences?.filter(p => p.submitted && p.status === "pending").length || 0;
//   const pendingCourseReviews = AppState.getPendingCoordinatorReviews?.().length || 0;
  
//   // Get approved/allocated data
//   const approvedPreferences = AppState.subjectPreferences?.filter(p => p.status === "approved") || [];
//   const approvedCourseDetails = AppState.courseDetails?.filter(c => c.deanStatus === "approved") || [];
  
//   const COORD_NAV = [
//     { id: "overview", icon: "📊", label: "Overview" },
//     { id: "semester", icon: "📋", label: "Semester Details" },
//     { id: "preferences", icon: "⭐", label: "Preference Allocation" },
//     { id: "courses", icon: "📚", label: "Course Review" },
//     { id: "timetable", icon: "📅", label: "Timetable" },
//     { id: "approved", icon: "✅", label: "Approved Records" },
//   ];
  
//   const panels = {
//     overview: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//         <Title>Workflow Overview - SoCSE</Title>
        
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24 }}>
//           <Card>
//             <Title level={4}>Step 1: Semester Details</Title>
//             {COURSES.map(course => {
//               const semestersConfigured = SEMESTERS.filter(s => 
//                 AppState.semesterDetails[course]?.[s]
//               ).length;
              
//               return (
//                 <div key={course} style={{ marginBottom: 12 }}>
//                   <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
//                     <span style={{ color: C.text.secondary }}>{course}</span>
//                     <span style={{ color: semestersConfigured === 2 ? C.accent.green : C.accent.gold }}>
//                       {semestersConfigured}/2
//                     </span>
//                   </div>
//                   <div style={{ height: 4, background: C.border, borderRadius: 2 }}>
//                     <div style={{ height: "100%", width: `${(semestersConfigured / 2) * 100}%`, background: semestersConfigured === 2 ? C.accent.green : C.accent.gold, borderRadius: 2 }} />
//                   </div>
//                 </div>
//               );
//             })}
//           </Card>
          
//           <Card>
//             <Title level={4}>Dean Approved Records</Title>
//             <div style={{ marginBottom: 16 }}>
//               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
//                 <span style={{ color: C.text.secondary }}>Approved Preferences</span>
//                 <span style={{ color: C.accent.green, fontWeight: 600 }}>{approvedPreferences.length}/6</span>
//               </div>
//               <div style={{ height: 6, background: C.border, borderRadius: 3 }}>
//                 <div style={{ height: "100%", width: `${(approvedPreferences.length / 6) * 100}%`, background: C.accent.green, borderRadius: 3 }} />
//               </div>
//             </div>
//             <div>
//               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
//                 <span style={{ color: C.text.secondary }}>Approved Courses</span>
//                 <span style={{ color: C.accent.green, fontWeight: 600 }}>{approvedCourseDetails.length} courses</span>
//               </div>
//               <div style={{ height: 6, background: C.border, borderRadius: 3 }}>
//                 <div style={{ height: "100%", width: `${Math.min((approvedCourseDetails.length / 20) * 100, 100)}%`, background: C.accent.green, borderRadius: 3 }} />
//               </div>
//             </div>
//           </Card>
//         </div>
        
//         <Card>
//           <Title level={4}>Step 2 & 3: Pending Actions</Title>
//           <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
//             <div style={{ flex: 1, padding: 16, background: pendingPrefs > 0 ? C.accent.goldBg : C.accent.greenBg, borderRadius: 12 }}>
//               <p style={{ color: pendingPrefs > 0 ? C.accent.gold : C.accent.green, fontWeight: 600 }}>Pending Preference Allocation</p>
//               <p style={{ fontSize: 32, fontWeight: 700 }}>{pendingPrefs}</p>
//               {pendingPrefs === 0 && <p style={{ fontSize: 12 }}>✓ All preferences allocated</p>}
//             </div>
//             <div style={{ flex: 1, padding: 16, background: pendingCourseReviews > 0 ? C.accent.goldBg : C.accent.greenBg, borderRadius: 12 }}>
//               <p style={{ color: pendingCourseReviews > 0 ? C.accent.gold : C.accent.green, fontWeight: 600 }}>Pending Course Review</p>
//               <p style={{ fontSize: 32, fontWeight: 700 }}>{pendingCourseReviews}</p>
//               {pendingCourseReviews === 0 && <p style={{ fontSize: 12 }}>✓ All courses reviewed</p>}
//             </div>
//           </div>
//         </Card>
        
//         <Card>
//           <Title level={4}>Step 4: Timetable Generation</Title>
//           {AppState.timetable?.length > 0 ? (
//             <div>
//               <p style={{ color: C.accent.green, marginBottom: 12 }}>✓ Timetable generated with {AppState.timetable.length} slots</p>
//               <Button onClick={() => setActive("timetable")} variant="primary">
//                 View Timetable
//               </Button>
//             </div>
//           ) : (
//             <p style={{ color: C.text.tertiary }}>Waiting for dean's approval before generation...</p>
//           )}
//         </Card>
//       </div>
//     ),
    
//     semester: <CoordinatorSemesterDetailsForm />,
//     preferences: <CoordinatorPreferenceReview />,
//     courses: <CoordinatorCourseDetailsReview />,
//     timetable: <CoordinatorTimetableView />,
    
//     approved: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//         <Title>Dean Approved Records</Title>
        
//         {/* Approved Preferences Section */}
//         <Card>
//           <Title level={4}>Approved Faculty Preferences ({approvedPreferences.length})</Title>
//           {approvedPreferences.length === 0 ? (
//             <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>
//               No preferences have been approved by the Dean yet.
//             </p>
//           ) : (
//             <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//               {approvedPreferences.map(pref => {
//                 const faculty = AppState.faculty.find(f => f.id === pref.facultyId);
//                 return (
//                   <div key={pref.facultyId} style={{ padding: 16, background: C.cardHover, borderRadius: 12 }}>
//                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
//                       <div>
//                         <h5 style={{ fontWeight: 600 }}>{pref.facultyName}</h5>
//                         <p style={{ fontSize: 12, color: C.text.tertiary }}>{faculty?.designation} - {faculty?.course}</p>
//                       </div>
//                       <Badge variant="success">Dean Approved</Badge>
//                     </div>
//                     <div>
//                       <p style={{ fontSize: 12, color: C.text.tertiary, marginBottom: 8 }}>Approved Subjects:</p>
//                       <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
//                         {pref.allocatedSubjects?.map(subjectId => {
//                           const subject = AppState.subjects.find(s => s.id === subjectId);
//                           return subject ? (
//                             <Badge key={subjectId} variant="primary">
//                               {subject.name} ({subject.totalWeeklyClasses}h/wk)
//                             </Badge>
//                           ) : null;
//                         })}
//                       </div>
//                     </div>
//                     {pref.approvedAt && (
//                       <p style={{ fontSize: 11, color: C.text.tertiary, marginTop: 12 }}>
//                         Approved on: {new Date(pref.approvedAt).toLocaleString()}
//                       </p>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </Card>
        
//         {/* Approved Course Details Section */}
//         <Card>
//           <Title level={4}>Approved Course Details ({approvedCourseDetails.length})</Title>
//           {approvedCourseDetails.length === 0 ? (
//             <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>
//               No course details have been approved by the Dean yet.
//             </p>
//           ) : (
//             <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//               {approvedCourseDetails.map(course => {
//                 const faculty = AppState.faculty.find(f => f.id === course.facultyId);
//                 const subject = AppState.subjects.find(s => s.id === course.subjectId);
//                 return (
//                   <div key={course.id} style={{ padding: 16, background: C.cardHover, borderRadius: 12 }}>
//                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
//                       <div>
//                         <h5 style={{ fontWeight: 600 }}>{course.subjectName}</h5>
//                         <p style={{ fontSize: 12, color: C.text.tertiary }}>
//                           {faculty?.name} - {course.course} Sem {course.semester}
//                         </p>
//                       </div>
//                       <Badge variant="success">Dean Approved</Badge>
//                     </div>
//                     <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 12 }}>
//                       <div>
//                         <span style={{ fontSize: 11, color: C.text.tertiary }}>Credits</span>
//                         <p style={{ fontWeight: 600 }}>{course.credits}</p>
//                       </div>
//                       <div>
//                         <span style={{ fontSize: 11, color: C.text.tertiary }}>Theory Hours</span>
//                         <p style={{ fontWeight: 600 }}>{course.theoryClassesPerWeek}h</p>
//                       </div>
//                       <div>
//                         <span style={{ fontSize: 11, color: C.text.tertiary }}>Lab Hours</span>
//                         <p style={{ fontWeight: 600 }}>{course.labPeriodsPerWeek}h</p>
//                       </div>
//                       <div>
//                         <span style={{ fontSize: 11, color: C.text.tertiary }}>Total Hours</span>
//                         <p style={{ fontWeight: 600 }}>{course.totalWeeklyClasses}h</p>
//                       </div>
//                     </div>
//                     {course.approvedAt && (
//                       <p style={{ fontSize: 11, color: C.text.tertiary }}>
//                         Approved on: {new Date(course.approvedAt).toLocaleString()}
//                       </p>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </Card>
//       </div>
//     ),
//   };
  
//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
//       <Sidebar 
//         navItems={COORD_NAV} 
//         active={active} 
//         setActive={setActive} 
//         collapsed={collapsed} 
//         setCollapsed={setCollapsed} 
//         user={user} 
//         badges={{ preferences: pendingPrefs, courses: pendingCourseReviews }} 
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
//         }}>
//           <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>{COORD_NAV.find(n => n.id === active)?.label}</h2>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             {(pendingPrefs > 0 || pendingCourseReviews > 0) && (
//               <Badge variant="warning">
//                 {pendingPrefs + pendingCourseReviews} pending
//               </Badge>
//             )}
//             <div style={{
//               width: 40,
//               height: 40,
//               borderRadius: "50%",
//               background: C.accent.blueBg,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: C.accent.blue,
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

// src/components/coordinator/CoordinatorDashboard.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { Sidebar, Card, Title, Badge, Button } from "../common";
import { CoordinatorSemesterDetailsForm } from "./CoordinatorSemesterDetailsForm";
import { CoordinatorPreferenceReview } from "./CoordinatorPreferenceReview";
import { CoordinatorCourseDetailsReview } from "./CoordinatorCourseDetailsReview";
import { CoordinatorTimetableView } from "./CoordinatorTimetableView";
import { CoordinatorLeaveStatus } from "./CoordinatorLeaveStatus";
import { AppState } from "../../AppState";
import { COURSES, SEMESTERS } from "../../data/mockData";
import { C } from "../../styles/theme";

export function CoordinatorDashboard() {
  const { user } = useAuth();
  const [active, setActive] = useState("overview");
  const [collapsed, setCollapsed] = useState(false);
  const [refresh, setRefresh] = useState(0);
  
  useEffect(() => {
    const handleStorageChange = () => {
      setRefresh(r => r + 1);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  // Get counts
  const pendingPrefs = AppState.subjectPreferences?.filter(p => p.submitted && p.status === "pending").length || 0;
  const pendingCourseReviews = AppState.getPendingCoordinatorReviews?.().length || 0;
  
  // Get approved/allocated data
  const approvedPreferences = AppState.subjectPreferences?.filter(p => p.status === "approved") || [];
  const approvedCourseDetails = AppState.courseDetails?.filter(c => c.deanStatus === "approved") || [];
  
  const COORD_NAV = [
    { id: "overview", icon: "📊", label: "Overview" },
    { id: "semester", icon: "📋", label: "Semester Details" },
    { id: "preferences", icon: "⭐", label: "Preference Allocation" },
    { id: "courses", icon: "📚", label: "Course Review" },
    { id: "timetable", icon: "📅", label: "Timetable" },
    { id: "approved", icon: "✅", label: "Approved Records" },
    { id: "leaveStatus", icon: "📊", label: "Leave Status" },
  ];
  
  const panels = {
    overview: (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Title>Workflow Overview - SoCSE</Title>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24 }}>
          <Card>
            <Title level={4}>Step 1: Semester Details</Title>
            {COURSES.map(course => {
              const semestersConfigured = SEMESTERS.filter(s => 
                AppState.semesterDetails[course]?.[s]
              ).length;
              
              return (
                <div key={course} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ color: C.text.secondary }}>{course}</span>
                    <span style={{ color: semestersConfigured === 2 ? C.accent.green : C.accent.gold }}>
                      {semestersConfigured}/2
                    </span>
                  </div>
                  <div style={{ height: 4, background: C.border, borderRadius: 2 }}>
                    <div style={{ height: "100%", width: `${(semestersConfigured / 2) * 100}%`, background: semestersConfigured === 2 ? C.accent.green : C.accent.gold, borderRadius: 2 }} />
                  </div>
                </div>
              );
            })}
          </Card>
          
          <Card>
            <Title level={4}>Dean Approved Records</Title>
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ color: C.text.secondary }}>Approved Preferences</span>
                <span style={{ color: C.accent.green, fontWeight: 600 }}>{approvedPreferences.length}/6</span>
              </div>
              <div style={{ height: 6, background: C.border, borderRadius: 3 }}>
                <div style={{ height: "100%", width: `${(approvedPreferences.length / 6) * 100}%`, background: C.accent.green, borderRadius: 3 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ color: C.text.secondary }}>Approved Courses</span>
                <span style={{ color: C.accent.green, fontWeight: 600 }}>{approvedCourseDetails.length} courses</span>
              </div>
              <div style={{ height: 6, background: C.border, borderRadius: 3 }}>
                <div style={{ height: "100%", width: `${Math.min((approvedCourseDetails.length / 20) * 100, 100)}%`, background: C.accent.green, borderRadius: 3 }} />
              </div>
            </div>
          </Card>
        </div>
        
        <Card>
          <Title level={4}>Step 2 & 3: Pending Actions</Title>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <div style={{ flex: 1, padding: 16, background: pendingPrefs > 0 ? C.accent.goldBg : C.accent.greenBg, borderRadius: 12 }}>
              <p style={{ color: pendingPrefs > 0 ? C.accent.gold : C.accent.green, fontWeight: 600 }}>Pending Preference Allocation</p>
              <p style={{ fontSize: 32, fontWeight: 700 }}>{pendingPrefs}</p>
              {pendingPrefs === 0 && <p style={{ fontSize: 12 }}>✓ All preferences allocated</p>}
            </div>
            <div style={{ flex: 1, padding: 16, background: pendingCourseReviews > 0 ? C.accent.goldBg : C.accent.greenBg, borderRadius: 12 }}>
              <p style={{ color: pendingCourseReviews > 0 ? C.accent.gold : C.accent.green, fontWeight: 600 }}>Pending Course Review</p>
              <p style={{ fontSize: 32, fontWeight: 700 }}>{pendingCourseReviews}</p>
              {pendingCourseReviews === 0 && <p style={{ fontSize: 12 }}>✓ All courses reviewed</p>}
            </div>
          </div>
        </Card>
        
        <Card>
          <Title level={4}>Step 4: Timetable Generation</Title>
          {AppState.timetable?.length > 0 ? (
            <div>
              <p style={{ color: C.accent.green, marginBottom: 12 }}>✓ Timetable generated with {AppState.timetable.length} slots</p>
              <Button onClick={() => setActive("timetable")} variant="primary">
                View Timetable
              </Button>
            </div>
          ) : (
            <p style={{ color: C.text.tertiary }}>Waiting for dean's approval before generation...</p>
          )}
        </Card>
      </div>
    ),
    
    semester: <CoordinatorSemesterDetailsForm />,
    preferences: <CoordinatorPreferenceReview />,
    courses: <CoordinatorCourseDetailsReview />,
    timetable: <CoordinatorTimetableView />,
    leaveStatus: <CoordinatorLeaveStatus />,
    
    approved: (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Title>Dean Approved Records</Title>
        
        {/* Approved Preferences Section */}
        <Card>
          <Title level={4}>Approved Faculty Preferences ({approvedPreferences.length})</Title>
          {approvedPreferences.length === 0 ? (
            <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>
              No preferences have been approved by the Dean yet.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {approvedPreferences.map(pref => {
                const faculty = AppState.faculty.find(f => f.id === pref.facultyId);
                return (
                  <div key={pref.facultyId} style={{ padding: 16, background: C.cardHover, borderRadius: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <div>
                        <h5 style={{ fontWeight: 600 }}>{pref.facultyName}</h5>
                        <p style={{ fontSize: 12, color: C.text.tertiary }}>{faculty?.designation} - {faculty?.course}</p>
                      </div>
                      <Badge variant="success">Dean Approved</Badge>
                    </div>
                    <div>
                      <p style={{ fontSize: 12, color: C.text.tertiary, marginBottom: 8 }}>Approved Subjects:</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {pref.allocatedSubjects?.map(subjectId => {
                          const subject = AppState.subjects.find(s => s.id === subjectId);
                          return subject ? (
                            <Badge key={subjectId} variant="primary">
                              {subject.name} ({subject.totalWeeklyClasses}h/wk)
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </div>
                    {pref.approvedAt && (
                      <p style={{ fontSize: 11, color: C.text.tertiary, marginTop: 12 }}>
                        Approved on: {new Date(pref.approvedAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </Card>
        
        {/* Approved Course Details Section */}
        <Card>
          <Title level={4}>Approved Course Details ({approvedCourseDetails.length})</Title>
          {approvedCourseDetails.length === 0 ? (
            <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>
              No course details have been approved by the Dean yet.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {approvedCourseDetails.map(course => {
                const faculty = AppState.faculty.find(f => f.id === course.facultyId);
                const subject = AppState.subjects.find(s => s.id === course.subjectId);
                return (
                  <div key={course.id} style={{ padding: 16, background: C.cardHover, borderRadius: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <div>
                        <h5 style={{ fontWeight: 600 }}>{course.subjectName}</h5>
                        <p style={{ fontSize: 12, color: C.text.tertiary }}>
                          {faculty?.name} - {course.course} Sem {course.semester}
                        </p>
                      </div>
                      <Badge variant="success">Dean Approved</Badge>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 12 }}>
                      <div>
                        <span style={{ fontSize: 11, color: C.text.tertiary }}>Credits</span>
                        <p style={{ fontWeight: 600 }}>{course.credits}</p>
                      </div>
                      <div>
                        <span style={{ fontSize: 11, color: C.text.tertiary }}>Theory Hours</span>
                        <p style={{ fontWeight: 600 }}>{course.theoryClassesPerWeek}h</p>
                      </div>
                      <div>
                        <span style={{ fontSize: 11, color: C.text.tertiary }}>Lab Hours</span>
                        <p style={{ fontWeight: 600 }}>{course.labPeriodsPerWeek}h</p>
                      </div>
                      <div>
                        <span style={{ fontSize: 11, color: C.text.tertiary }}>Total Hours</span>
                        <p style={{ fontWeight: 600 }}>{course.totalWeeklyClasses}h</p>
                      </div>
                    </div>
                    {course.approvedAt && (
                      <p style={{ fontSize: 11, color: C.text.tertiary }}>
                        Approved on: {new Date(course.approvedAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>
    ),
  };
  
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
      <Sidebar 
        navItems={COORD_NAV} 
        active={active} 
        setActive={setActive} 
        collapsed={collapsed} 
        setCollapsed={setCollapsed} 
        user={user} 
        badges={{ preferences: pendingPrefs, courses: pendingCourseReviews }} 
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
        }}>
          <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>{COORD_NAV.find(n => n.id === active)?.label}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {(pendingPrefs > 0 || pendingCourseReviews > 0) && (
              <Badge variant="warning">
                {pendingPrefs + pendingCourseReviews} pending
              </Badge>
            )}
            <div style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: C.accent.blueBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: C.accent.blue,
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