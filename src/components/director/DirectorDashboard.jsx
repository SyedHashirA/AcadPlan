// // src/components/director/DirectorDashboard.jsx
// import { useState, useEffect } from "react";
// import { useAuth } from "../auth/AuthContext";
// import { Sidebar, Card, Title, Badge, Button } from "../common";
// import { SubjectManagementPanel } from "./SubjectManagementPanel";
// import { DirectorSemesterDetailsForm } from "./DirectorSemesterDetailsForm";
// import { DirectorPreferenceReview } from "./DirectorPreferenceReview";
// import { DirectorCourseDetailsReview } from "./DirectorCourseDetailsReview";
// import { DirectorTimetableAndSuggestions } from "./DirectorTimetableAndSuggestions";
// import { AcademicCalendar } from "../shared/AcademicCalendar";
// import { LeaveManagementPanel } from "../shared/LeaveManagementPanel";
// import { DirectorOverview } from "./DirectorOverview";
// import { C } from "../../styles/theme";

// export function DirectorDashboard() {
//   const { user } = useAuth();
//   const [active, setActive] = useState("subjects");
//   const [collapsed, setCollapsed] = useState(false);
//   const [refresh, setRefresh] = useState(0);

//   useEffect(() => {
//     const handleStorageChange = () => setRefresh(r => r + 1);
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   const DIRECTOR_NAV = [
//     { id: "subjects", icon: "📚", label: "Subject Management" },
//     { id: "floatForm", icon: "📋", label: "Float Preference Form" },
//     { id: "semester", icon: "📋", label: "Semester Details" },
//     { id: "preferences", icon: "⭐", label: "Faculty Preferences" },
//     { id: "courses", icon: "📖", label: "Course Details" },
//     { id: "timetable", icon: "📅", label: "Timetable" },
//     { id: "calendar", icon: "🗓️", label: "Academic Calendar" },
//     { id: "leaves", icon: "🏖️", label: "Leave Requests" },
//     { id: "overview", icon: "📊", label: "Overview" },
//   ];

//   const panels = {
//     subjects: <SubjectManagementPanel onRefresh={() => setRefresh(r => r + 1)} />,
//     floatForm: <DirectorFormFloat onRefresh={() => setRefresh(r => r + 1)} />,
//     semester: <DirectorSemesterDetailsForm />,
//     preferences: <DirectorPreferenceReview />,
//     courses: <DirectorCourseDetailsReview />,
//     timetable: <DirectorTimetableAndSuggestions />,
//     calendar: <AcademicCalendar />,
//     leaves: <LeaveManagementPanel />,
//     overview: <DirectorOverview />,
//   };

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
//       <Sidebar
//         navItems={DIRECTOR_NAV}
//         active={active}
//         setActive={setActive}
//         collapsed={collapsed}
//         setCollapsed={setCollapsed}
//         user={user}
//         accentColor={C.accent.gold}
//       />
//       <main style={{ flex: 1, overflow: "auto" }}>
//         <header
//           style={{
//             background: C.nav,
//             borderBottom: `1px solid ${C.navBorder}`,
//             padding: "16px 32px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             position: "sticky",
//             top: 0,
//             zIndex: 10,
//           }}
//         >
//           <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>
//             {DIRECTOR_NAV.find(n => n.id === active)?.label}
//           </h2>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             <div
//               style={{
//                 width: 40,
//                 height: 40,
//                 borderRadius: "50%",
//                 background: C.accent.goldBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 color: C.accent.gold,
//                 fontWeight: 700,
//               }}
//             >
//               {user?.avatar}
//             </div>
//           </div>
//         </header>
//         <div style={{ padding: 32 }}>{panels[active]}</div>
//       </main>
//     </div>
//   );
// }

// // src/components/director/DirectorDashboard.jsx
// import { useState, useEffect } from "react";
// import { useAuth } from "../auth/AuthContext";
// import { Sidebar, Card, Title, Badge, Button } from "../common";
// import { SubjectManagementPanel } from "./SubjectManagementPanel";
// import { DirectorFormFloat } from "./DirectorFormFloat";
// import { DirectorPreferenceSettings } from "./DirectorPreferenceSettings"; // Add this import
// import { DirectorSemesterDetailsForm } from "./DirectorSemesterDetailsForm";
// import { DirectorPreferenceReview } from "./DirectorPreferenceReview";
// import { DirectorCourseDetailsReview } from "./DirectorCourseDetailsReview";
// import { DirectorTimetableAndSuggestions } from "./DirectorTimetableAndSuggestions";
// import { AcademicCalendar } from "../shared/AcademicCalendar";
// import { LeaveManagementPanel } from "../shared/LeaveManagementPanel";
// import { DirectorOverview } from "./DirectorOverview";
// import { AppState } from "../../AppState";
// import { C } from "../../styles/theme";

// export function DirectorDashboard() {
//   const { user } = useAuth();
//   const [active, setActive] = useState("subjects");
//   const [collapsed, setCollapsed] = useState(false);
//   const [refresh, setRefresh] = useState(0);

//   useEffect(() => {
//     const handleStorageChange = () => setRefresh(r => r + 1);
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   const DIRECTOR_NAV = [
//     { id: "subjects", icon: "📚", label: "Subject Management" },
//     { id: "preferenceSettings", icon: "⚙️", label: "Preference Settings" }, // Add this line
//     { id: "floatForm", icon: "📋", label: "Float Preference Form" },
//     { id: "semester", icon: "📋", label: "Semester Details" },
//     { id: "preferences", icon: "⭐", label: "Faculty Preferences" },
//     { id: "courses", icon: "📖", label: "Course Details" },
//     { id: "timetable", icon: "📅", label: "Timetable" },
//     { id: "calendar", icon: "🗓️", label: "Academic Calendar" },
//     { id: "leaves", icon: "🏖️", label: "Leave Requests" },
//     { id: "overview", icon: "📊", label: "Overview" },
//   ];

//   const panels = {
//     subjects: <SubjectManagementPanel onRefresh={() => setRefresh(r => r + 1)} />,
//     preferenceSettings: <DirectorPreferenceSettings onRefresh={() => setRefresh(r => r + 1)} />, // Add this panel
//     floatForm: <DirectorFormFloat onRefresh={() => setRefresh(r => r + 1)} />,
//     semester: <DirectorSemesterDetailsForm />,
//     preferences: <DirectorPreferenceReview />,
//     courses: <DirectorCourseDetailsReview />,
//     timetable: <DirectorTimetableAndSuggestions />,
//     calendar: <AcademicCalendar />,
//     leaves: <LeaveManagementPanel />,
//     overview: <DirectorOverview />,
//   };

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
//       <Sidebar
//         navItems={DIRECTOR_NAV}
//         active={active}
//         setActive={setActive}
//         collapsed={collapsed}
//         setCollapsed={setCollapsed}
//         user={user}
//         accentColor={C.accent.gold}
//       />
//       <main style={{ flex: 1, overflow: "auto" }}>
//         <header
//           style={{
//             background: C.nav,
//             borderBottom: `1px solid ${C.navBorder}`,
//             padding: "16px 32px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             position: "sticky",
//             top: 0,
//             zIndex: 10,
//           }}
//         >
//           <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>
//             {DIRECTOR_NAV.find(n => n.id === active)?.label}
//           </h2>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             <div
//               style={{
//                 width: 40,
//                 height: 40,
//                 borderRadius: "50%",
//                 background: C.accent.goldBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 color: C.accent.gold,
//                 fontWeight: 700,
//               }}
//             >
//               {user?.avatar}
//             </div>
//           </div>
//         </header>
//         <div style={{ padding: 32 }}>{panels[active]}</div>
//       </main>
//     </div>
//   );
// }

// // src/components/director/DirectorDashboard.jsx
// import { useState, useEffect } from "react";
// import { useAuth } from "../auth/AuthContext";
// import { Sidebar, Card, Title, Badge, Button } from "../common";
// import { SubjectManagementPanel } from "./SubjectManagementPanel";
// import { DirectorFormFloat } from "./DirectorFormFloat";
// import { DirectorPreferenceSettings } from "./DirectorPreferenceSettings";
// import { DirectorSemesterDetailsForm } from "./DirectorSemesterDetailsForm";
// import { DirectorPreferenceReview } from "./DirectorPreferenceReview";
// import { DirectorCourseDetailsReview } from "./DirectorCourseDetailsReview";
// import { DirectorTimetableAndSuggestions } from "./DirectorTimetableAndSuggestions";
// import { DirectorClassTeacherAssignment } from "./DirectorClassTeacherAssignment";
// import { DirectorCourseLeadAssignment } from "./DirectorCourseLeadAssignment";
// import { AcademicCalendar } from "../shared/AcademicCalendar";
// import { LeaveManagementPanel } from "../shared/LeaveManagementPanel";
// import { DirectorOverview } from "./DirectorOverview";
// import { AppState } from "../../AppState";
// import { C } from "../../styles/theme";

// export function DirectorDashboard() {
//   const { user } = useAuth();
//   const [active, setActive] = useState("subjects");
//   const [collapsed, setCollapsed] = useState(false);
//   const [refresh, setRefresh] = useState(0);

//   useEffect(() => {
//     const handleStorageChange = () => setRefresh(r => r + 1);
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   const DIRECTOR_NAV = [
//     { id: "subjects", icon: "📚", label: "Subject Management" },
//     { id: "classTeacher", icon: "👨‍🏫", label: "Class Teachers" },
//     { id: "courseLead", icon: "👨‍💼", label: "Course Leads" },
//     { id: "preferenceSettings", icon: "⚙️", label: "Preference Settings" },
//     { id: "floatForm", icon: "📋", label: "Float Preference Form" },
//     { id: "semester", icon: "📋", label: "Semester Details" },
//     { id: "preferences", icon: "⭐", label: "Faculty Preferences" },
//     { id: "courses", icon: "📖", label: "Course Details" },
//     { id: "timetable", icon: "📅", label: "Timetable" },
//     { id: "calendar", icon: "🗓️", label: "Academic Calendar" },
//     { id: "leaves", icon: "🏖️", label: "Leave Requests" },
//     { id: "overview", icon: "📊", label: "Overview" },
//   ];

//   const panels = {
//     subjects: <SubjectManagementPanel onRefresh={() => setRefresh(r => r + 1)} />,
//     classTeacher: <DirectorClassTeacherAssignment onRefresh={() => setRefresh(r => r + 1)} />,
//     courseLead: <DirectorCourseLeadAssignment onRefresh={() => setRefresh(r => r + 1)} />,
//     preferenceSettings: <DirectorPreferenceSettings onRefresh={() => setRefresh(r => r + 1)} />,
//     floatForm: <DirectorFormFloat onRefresh={() => setRefresh(r => r + 1)} />,
//     semester: <DirectorSemesterDetailsForm />,
//     preferences: <DirectorPreferenceReview />,
//     courses: <DirectorCourseDetailsReview />,
//     timetable: <DirectorTimetableAndSuggestions />,
//     calendar: <AcademicCalendar />,
//     leaves: <LeaveManagementPanel />,
//     overview: <DirectorOverview />,
//   };

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
//       <Sidebar
//         navItems={DIRECTOR_NAV}
//         active={active}
//         setActive={setActive}
//         collapsed={collapsed}
//         setCollapsed={setCollapsed}
//         user={user}
//         accentColor={C.accent.gold}
//       />
//       <main style={{ flex: 1, overflow: "auto" }}>
//         <header
//           style={{
//             background: C.nav,
//             borderBottom: `1px solid ${C.navBorder}`,
//             padding: "16px 32px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             position: "sticky",
//             top: 0,
//             zIndex: 10,
//           }}
//         >
//           <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>
//             {DIRECTOR_NAV.find(n => n.id === active)?.label}
//           </h2>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             <div
//               style={{
//                 width: 40,
//                 height: 40,
//                 borderRadius: "50%",
//                 background: C.accent.goldBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 color: C.accent.gold,
//                 fontWeight: 700,
//               }}
//             >
//               {user?.avatar}
//             </div>
//           </div>
//         </header>
//         <div style={{ padding: 32 }}>{panels[active]}</div>
//       </main>
//     </div>
//   );
// }

// // src/components/director/DirectorDashboard.jsx
// import { useState, useEffect } from "react";
// import { useAuth } from "../auth/AuthContext";
// import { Sidebar, Card, Title, Badge, Button } from "../common";
// import { SubjectManagementPanel } from "./SubjectManagementPanel";
// import { DirectorFormFloat } from "./DirectorFormFloat";
// import { DirectorPreferenceSettings } from "./DirectorPreferenceSettings";
// import { DirectorSemesterDetailsForm } from "./DirectorSemesterDetailsForm";
// import { DirectorPreferenceReview } from "./DirectorPreferenceReview";
// import { DirectorCourseDetailsReview } from "./DirectorCourseDetailsReview";
// import { DirectorTimetableAndSuggestions } from "./DirectorTimetableAndSuggestions";
// import { DirectorClassTeacherAssignment } from "./DirectorClassTeacherAssignment";
// import { DirectorCourseLeadAssignment } from "./DirectorCourseLeadAssignment";
// import { LeaveApprovalPanel } from "./LeaveApprovalPanel";
// import { VisitingFacultyPermissionsManager } from "./VisitingFacultyPermissionsManager";
// import { VisitingFacultyTimetableManager } from "./VisitingFacultyTimetableManager";
// import { AcademicCalendar } from "../shared/AcademicCalendar";
// import { LeaveManagementPanel } from "../shared/LeaveManagementPanel";
// import { DirectorOverview } from "./DirectorOverview";
// import { AppState } from "../../AppState";
// import { C } from "../../styles/theme";

// export function DirectorDashboard() {
//   const { user } = useAuth();
//   const [active, setActive] = useState("subjects");
//   const [collapsed, setCollapsed] = useState(false);
//   const [refresh, setRefresh] = useState(0);

//   useEffect(() => {
//     const handleStorageChange = () => setRefresh(r => r + 1);
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   const DIRECTOR_NAV = [
//     { id: "subjects", icon: "📚", label: "Subject Management" },
//     { id: "classTeacher", icon: "👨‍🏫", label: "Class Teachers" },
//     { id: "courseLead", icon: "👨‍💼", label: "Course Leads" },
//     { id: "visitingFacultyPerms", icon: "👨‍🏫", label: "Visiting Faculty Perms" },
//     { id: "preferenceSettings", icon: "⚙️", label: "Preference Settings" },
//     { id: "floatForm", icon: "📋", label: "Float Preference Form" },
//     { id: "semester", icon: "📋", label: "Semester Details" },
//     { id: "preferences", icon: "⭐", label: "Faculty Preferences" },
//     { id: "courses", icon: "📖", label: "Course Details" },
//     { id: "timetable", icon: "📅", label: "Timetable" },
//     { id: "calendar", icon: "🗓️", label: "Academic Calendar" },
//     { id: "leaves", icon: "🏖️", label: "Leave Requests" },
//     { id: "leaveApprovals", icon: "📋", label: "Leave Approvals" },
//     { id: "overview", icon: "📊", label: "Overview" },
//     { id: "visitingFacultyTimetable", icon: "📅", label: "VF Timetable" },
//   ];

//   const panels = {
//     subjects: <SubjectManagementPanel onRefresh={() => setRefresh(r => r + 1)} />,
//     classTeacher: <DirectorClassTeacherAssignment onRefresh={() => setRefresh(r => r + 1)} />,
//     courseLead: <DirectorCourseLeadAssignment onRefresh={() => setRefresh(r => r + 1)} />,
//     visitingFacultyPerms: <VisitingFacultyPermissionsManager onRefresh={() => setRefresh(r => r + 1)} />,
//     preferenceSettings: <DirectorPreferenceSettings onRefresh={() => setRefresh(r => r + 1)} />,
//     floatForm: <DirectorFormFloat onRefresh={() => setRefresh(r => r + 1)} />,
//     semester: <DirectorSemesterDetailsForm />,
//     preferences: <DirectorPreferenceReview />,
//     courses: <DirectorCourseDetailsReview />,
//     timetable: <DirectorTimetableAndSuggestions />,
//     calendar: <AcademicCalendar />,
//     leaves: <LeaveManagementPanel />,
//     leaveApprovals: <LeaveApprovalPanel onRefresh={() => setRefresh(r => r + 1)} />,
//     overview: <DirectorOverview />,
//     visitingFacultyTimetable: <VisitingFacultyTimetableManager onRefresh={() => setRefresh(r => r + 1)} />,
//   };

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
//       <Sidebar
//         navItems={DIRECTOR_NAV}
//         active={active}
//         setActive={setActive}
//         collapsed={collapsed}
//         setCollapsed={setCollapsed}
//         user={user}
//         accentColor={C.accent.gold}
//       />
//       <main style={{ flex: 1, overflow: "auto" }}>
//         <header
//           style={{
//             background: C.nav,
//             borderBottom: `1px solid ${C.navBorder}`,
//             padding: "16px 32px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             position: "sticky",
//             top: 0,
//             zIndex: 10,
//           }}
//         >
//           <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>
//             {DIRECTOR_NAV.find(n => n.id === active)?.label}
//           </h2>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             <div
//               style={{
//                 width: 40,
//                 height: 40,
//                 borderRadius: "50%",
//                 background: C.accent.goldBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 color: C.accent.gold,
//                 fontWeight: 700,
//               }}
//             >
//               {user?.avatar}
//             </div>
//           </div>
//         </header>
//         <div style={{ padding: 32 }}>{panels[active]}</div>
//       </main>
//     </div>
//   );
// }

// src/components/director/DirectorDashboard.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { Sidebar, Card, Title, Badge, Button } from "../common";
import { SubjectManagementPanel } from "./SubjectManagementPanel";
import { DepartmentTimetableControl } from "./DepartmentTimetableControl";
import { DirectorFormFloat } from "./DirectorFormFloat";
import { DirectorPreferenceSettings } from "./DirectorPreferenceSettings";
import { DirectorSemesterDetailsForm } from "./DirectorSemesterDetailsForm";
import { DirectorPreferenceReview } from "./DirectorPreferenceReview";
import { DirectorCourseDetailsReview } from "./DirectorCourseDetailsReview";
import { DirectorTimetableAndSuggestions } from "./DirectorTimetableAndSuggestions";
import { DirectorClassTeacherAssignment } from "./DirectorClassTeacherAssignment";
import { DirectorCourseLeadAssignment } from "./DirectorCourseLeadAssignment";
import { AddVisitingFaculty } from "./AddVisitingFaculty";
import { LeaveApprovalPanel } from "./LeaveApprovalPanel";
import { VisitingFacultyPermissionsManager } from "./VisitingFacultyPermissionsManager";
import { VisitingFacultyTimetableManager } from "./VisitingFacultyTimetableManager";
import { AcademicCalendar } from "../shared/AcademicCalendar";
import { DirectorOverview } from "./DirectorOverview";
import { AppState } from "../../AppState";
import { C } from "../../styles/theme";

export function DirectorDashboard() {
  const { user } = useAuth();
  const [active, setActive] = useState("subjects");
  const [collapsed, setCollapsed] = useState(false);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const handleStorageChange = () => setRefresh(r => r + 1);
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const DIRECTOR_NAV = [
    { id: "subjects", icon: "📚", label: "Subject Management" },
    { id: "classTeacher", icon: "👨‍🏫", label: "Class Teachers" },
    { id: "courseLead", icon: "👨‍💼", label: "Course Leads" },
    { id: "deptTimetableControl", icon: "🎯", label: "Dept Timetable Control" },
    { id: "addVisitingFaculty", icon: "👨‍🏫", label: "Add Visiting Faculty" },
    { id: "visitingFacultyPerms", icon: "👨‍🏫", label: "Visiting Faculty Perms" },
    { id: "visitingFacultyTimetable", icon: "📅", label: "VF Timetable" },
    { id: "preferenceSettings", icon: "⚙️", label: "Preference Settings" },
    { id: "floatForm", icon: "📋", label: "Float Preference Form" },
    { id: "semester", icon: "📋", label: "Semester Details" },
    { id: "preferences", icon: "⭐", label: "Faculty Preferences" },
    { id: "courses", icon: "📖", label: "Course Details" },
    { id: "timetable", icon: "📅", label: "Timetable" },
    { id: "calendar", icon: "🗓️", label: "Academic Calendar" },
    { id: "leaveApprovals", icon: "📋", label: "Leave Approvals" },
    { id: "overview", icon: "📊", label: "Overview" },
  ];

  const panels = {
    subjects: <SubjectManagementPanel onRefresh={() => setRefresh(r => r + 1)} />,
    classTeacher: <DirectorClassTeacherAssignment onRefresh={() => setRefresh(r => r + 1)} />,
    courseLead: <DirectorCourseLeadAssignment onRefresh={() => setRefresh(r => r + 1)} />,
    deptTimetableControl: <DepartmentTimetableControl onRefresh={() => setRefresh(r => r + 1)} />,
    addVisitingFaculty: <AddVisitingFaculty onRefresh={() => setRefresh(r => r + 1)} />,
    visitingFacultyPerms: <VisitingFacultyPermissionsManager onRefresh={() => setRefresh(r => r + 1)} />,
    visitingFacultyTimetable: <VisitingFacultyTimetableManager onRefresh={() => setRefresh(r => r + 1)} />,
    preferenceSettings: <DirectorPreferenceSettings onRefresh={() => setRefresh(r => r + 1)} />,
    floatForm: <DirectorFormFloat onRefresh={() => setRefresh(r => r + 1)} />,
    semester: <DirectorSemesterDetailsForm />,
    preferences: <DirectorPreferenceReview />,
    courses: <DirectorCourseDetailsReview />,
    timetable: <DirectorTimetableAndSuggestions />,
    calendar: <AcademicCalendar />,
    leaveApprovals: <LeaveApprovalPanel onRefresh={() => setRefresh(r => r + 1)} />,
    overview: <DirectorOverview />,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
      <Sidebar
        navItems={DIRECTOR_NAV}
        active={active}
        setActive={setActive}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        user={user}
        accentColor={C.accent.gold}
      />
      <main style={{ flex: 1, overflow: "auto" }}>
        <header
          style={{
            background: C.nav,
            borderBottom: `1px solid ${C.navBorder}`,
            padding: "16px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>
            {DIRECTOR_NAV.find(n => n.id === active)?.label}
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: C.accent.goldBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: C.accent.gold,
                fontWeight: 700,
              }}
            >
              {user?.avatar}
            </div>
          </div>
        </header>
        <div style={{ padding: 32 }}>{panels[active]}</div>
      </main>
    </div>
  );
}