// import { useState, useEffect } from "react";
// import { useAuth } from "../auth/AuthContext";
// import { Sidebar, Card, Title, Badge, Button } from "../common";
// import { WeeklyTimetableView } from "../shared/WeeklyTimetableView";
// import { AppState } from "../../AppState";
// import { C } from "../../styles/theme";

// export function StudentDashboard() {
//   const { user } = useAuth();
//   const [active, setActive] = useState("timetable");
//   const [collapsed, setCollapsed] = useState(false);
//   const [refresh, setRefresh] = useState(0);
  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRefresh(r => r + 1);
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const schedule = AppState.getStudentSchedule(user.course, user.semester, user.section);
//   const subjects = AppState.getSubjectsForCourseAndSemester(user.course, user.semester);
  
//   const updateProgress = (subjectId, moduleIndex, completed) => {
//     AppState.updateStudentProgress(user.id, subjectId, moduleIndex, completed);
//     setRefresh(r => r + 1);
//   };
  
//   const getProgress = (subjectId) => {
//     return AppState.getStudentProgress(user.id, subjectId);
//   };
  
//   const STUDENT_NAV = [
//     { id: "timetable", icon: "📅", label: "My Timetable" },
//     { id: "syllabus", icon: "📚", label: "Syllabus Progress" },
//     { id: "profile", icon: "👤", label: "Profile" },
//   ];
  
//   const panels = {
//     timetable: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//         <Title>My Class Schedule</Title>
//         <WeeklyTimetableView 
//           schedule={schedule} 
//           title={`${user.course} - Semester ${user.semester} - Section ${user.section}`}
//         />
//       </div>
//     ),
    
//     syllabus: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//         <Title>Syllabus Progress (Student View)</Title>
        
//         {subjects.map(subject => {
//           const progress = getProgress(subject.id);
//           const completedModules = progress?.completedModules || 0;
//           const totalModules = subject.modules;
//           const completionPercentage = (completedModules / totalModules) * 100;
          
//           return (
//             <Card key={subject.id}>
//               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
//                 <div>
//                   <h4 style={{ color: C.text.primary, fontSize: 16, fontWeight: 600 }}>{subject.name}</h4>
//                   <p style={{ color: C.text.tertiary, fontSize: 12 }}>Code: {subject.code}</p>
//                 </div>
//                 <Badge variant={completionPercentage >= 75 ? "success" : completionPercentage >= 50 ? "warning" : "danger"}>
//                   {Math.round(completionPercentage)}% Complete
//                 </Badge>
//               </div>
              
//               <div style={{ marginBottom: 16 }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
//                   <span style={{ color: C.text.secondary, fontSize: 13 }}>Progress: {completedModules}/{totalModules} Modules</span>
//                 </div>
//                 <div style={{ height: 8, background: C.border, borderRadius: 10, overflow: "hidden" }}>
//                   <div style={{ height: "100%", width: `${completionPercentage}%`, background: completionPercentage >= 75 ? C.accent.green : completionPercentage >= 50 ? C.accent.gold : C.accent.red }} />
//                 </div>
//               </div>
              
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 8 }}>
//                 {Array.from({ length: totalModules }).map((_, idx) => {
//                   const isCompleted = progress?.modules[idx] || false;
//                   return (
//                     <button
//                       key={idx}
//                       onClick={() => updateProgress(subject.id, idx, !isCompleted)}
//                       style={{
//                         padding: "8px",
//                         background: isCompleted ? C.accent.greenBg : "transparent",
//                         border: `1px solid ${isCompleted ? C.accent.green : C.border}`,
//                         borderRadius: 8,
//                         cursor: "pointer",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 8,
//                         color: C.text.primary,
//                       }}
//                     >
//                       <div style={{
//                         width: 16,
//                         height: 16,
//                         borderRadius: 4,
//                         background: isCompleted ? C.accent.green : "transparent",
//                         border: `2px solid ${isCompleted ? C.accent.green : C.text.tertiary}`,
//                       }}>
//                         {isCompleted && <span style={{ color: "#ffffff", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</span>}
//                       </div>
//                       <span style={{ fontSize: 12 }}>Module {idx + 1}</span>
//                     </button>
//                   );
//                 })}
//               </div>
//             </Card>
//           );
//         })}
//       </div>
//     ),
    
//     profile: (
//       <Card>
//         <Title level={4}>Student Profile</Title>
//         <div style={{ display: "flex", gap: 32, alignItems: "center", marginTop: 20 }}>
//           <div style={{
//             width: 100,
//             height: 100,
//             borderRadius: "50%",
//             background: C.accent.purpleBg,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: 36,
//             fontWeight: 700,
//             color: C.accent.purple,
//           }}>
//             {user.avatar}
//           </div>
//           <div>
//             <h3 style={{ color: C.text.primary, fontSize: 24, fontWeight: 600, marginBottom: 8 }}>{user.name}</h3>
//             <p style={{ color: C.accent.blue, fontSize: 14, marginBottom: 4 }}>Course: {user.course}</p>
//             <p style={{ color: C.accent.blue, fontSize: 14, marginBottom: 4 }}>Semester: {user.semester}</p>
//             <p style={{ color: C.accent.blue, fontSize: 14 }}>Section: {user.section}</p>
//           </div>
//         </div>
//       </Card>
//     ),
//   };
  
//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
//       <Sidebar navItems={STUDENT_NAV} active={active} setActive={setActive} collapsed={collapsed} setCollapsed={setCollapsed} user={user} accentColor={C.accent.purple} />
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
//           <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>{STUDENT_NAV.find(n => n.id === active)?.label}</h2>
//           <Badge variant="purple">
//             {user.course} Sem {user.semester} Sec {user.section}
//           </Badge>
//         </header>
//         <div style={{ padding: 32 }}>{panels[active]}</div>
//       </main>
//     </div>
//   );
// }

// // src/components/student/StudentDashboard.jsx
// import { useState, useEffect } from "react";
// import { useAuth } from "../auth/AuthContext";
// import { Sidebar, Card, Title, Badge, Button, Input, Select } from "../common";
// import { WeeklyTimetableView } from "../shared/WeeklyTimetableView";
// import { AppState } from "../../AppState";
// import { saveToStorage, loadFromStorage, STORAGE_KEYS } from "../../utils/storage";
// import { C } from "../../styles/theme";

// export function StudentDashboard() {
//   const { user } = useAuth();
//   const [active, setActive] = useState("timetable");
//   const [collapsed, setCollapsed] = useState(false);
//   const [refresh, setRefresh] = useState(0);
//   const [showAppointmentModal, setShowAppointmentModal] = useState(false);
//   const [selectedFaculty, setSelectedFaculty] = useState("");
//   const [appointmentReason, setAppointmentReason] = useState("");
//   const [preferredDate, setPreferredDate] = useState("");
//   const [preferredTime, setPreferredTime] = useState("");
//   const [appointments, setAppointments] = useState([]);
//   const [facultyList, setFacultyList] = useState([]);
  
//   useEffect(() => {
//     loadAppointments();
//     loadFacultyList();
    
//     const handleStorageChange = () => {
//       setRefresh(r => r + 1);
//       loadAppointments();
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const loadAppointments = () => {
//     const allAppointments = loadFromStorage(STORAGE_KEYS.APPOINTMENTS, []);
//     const myAppointments = allAppointments.filter(a => a.studentId === user.id);
//     setAppointments(myAppointments);
//   };
  
//   const loadFacultyList = () => {
//     // Get all faculty members
//     const faculties = AppState.faculty.map(f => ({
//       id: f.id,
//       name: f.name,
//       designation: f.designation,
//       course: f.course,
//       email: f.email
//     }));
//     setFacultyList(faculties);
//   };
  
//   const handleRequestAppointment = () => {
//     if (!selectedFaculty) {
//       alert("Please select a faculty member");
//       return;
//     }
//     if (!appointmentReason) {
//       alert("Please enter a reason for the appointment");
//       return;
//     }
//     if (!preferredDate) {
//       alert("Please select a preferred date");
//       return;
//     }
//     if (!preferredTime) {
//       alert("Please select a preferred time");
//       return;
//     }
    
//     const selectedFacultyData = facultyList.find(f => f.id === parseInt(selectedFaculty));
    
//     const newAppointment = {
//       id: Date.now(),
//       studentId: user.id,
//       studentName: user.name,
//       studentCourse: user.course,
//       studentSemester: user.semester,
//       studentSection: user.section,
//       facultyId: parseInt(selectedFaculty),
//       facultyName: selectedFacultyData?.name,
//       facultyDesignation: selectedFacultyData?.designation,
//       reason: appointmentReason,
//       preferredDate: preferredDate,
//       preferredTime: preferredTime,
//       status: "pending", // pending, approved, rescheduled, rejected
//       requestedAt: new Date().toISOString(),
//       approvedTime: null,
//       facultyMessage: null
//     };
    
//     const allAppointments = loadFromStorage(STORAGE_KEYS.APPOINTMENTS, []);
//     allAppointments.push(newAppointment);
//     saveToStorage(STORAGE_KEYS.APPOINTMENTS, allAppointments);
//     window.dispatchEvent(new Event('storage'));
    
//     alert("Appointment request sent successfully!");
//     setShowAppointmentModal(false);
//     setSelectedFaculty("");
//     setAppointmentReason("");
//     setPreferredDate("");
//     setPreferredTime("");
//     loadAppointments();
//   };
  
//   const schedule = AppState.getStudentSchedule(user.course, user.semester, user.section);
//   const subjects = AppState.getSubjectsForCourseAndSemester(user.course, user.semester);
  
//   const updateProgress = (subjectId, moduleIndex, completed) => {
//     AppState.updateStudentProgress(user.id, subjectId, moduleIndex, completed);
//     setRefresh(r => r + 1);
//   };
  
//   const getProgress = (subjectId) => {
//     return AppState.getStudentProgress(user.id, subjectId);
//   };
  
//   const getStatusBadge = (status) => {
//     switch(status) {
//       case "pending":
//         return <Badge variant="warning">Pending</Badge>;
//       case "approved":
//         return <Badge variant="success">Approved</Badge>;
//       case "rescheduled":
//         return <Badge variant="primary">Rescheduled</Badge>;
//       case "rejected":
//         return <Badge variant="danger">Rejected</Badge>;
//       default:
//         return <Badge variant="warning">{status}</Badge>;
//     }
//   };
  
//   const STUDENT_NAV = [
//     { id: "timetable", icon: "📅", label: "My Timetable" },
//     { id: "syllabus", icon: "📚", label: "Syllabus Progress" },
//     { id: "appointments", icon: "📅", label: "Appointments" },
//     { id: "profile", icon: "👤", label: "Profile" },
//   ];
  
//   const panels = {
//     timetable: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//         <Title>My Class Schedule</Title>
//         <WeeklyTimetableView 
//           schedule={schedule} 
//           title={`${user.course} - Semester ${user.semester} - Section ${user.section}`}
//         />
//       </div>
//     ),
    
//     syllabus: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//         <Title>Syllabus Progress (Student View)</Title>
        
//         {subjects.map(subject => {
//           const progress = getProgress(subject.id);
//           const completedModules = progress?.completedModules || 0;
//           const totalModules = subject.modules;
//           const completionPercentage = (completedModules / totalModules) * 100;
          
//           return (
//             <Card key={subject.id}>
//               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
//                 <div>
//                   <h4 style={{ color: C.text.primary, fontSize: 16, fontWeight: 600 }}>{subject.name}</h4>
//                   <p style={{ color: C.text.tertiary, fontSize: 12 }}>Code: {subject.code}</p>
//                 </div>
//                 <Badge variant={completionPercentage >= 75 ? "success" : completionPercentage >= 50 ? "warning" : "danger"}>
//                   {Math.round(completionPercentage)}% Complete
//                 </Badge>
//               </div>
              
//               <div style={{ marginBottom: 16 }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
//                   <span style={{ color: C.text.secondary, fontSize: 13 }}>Progress: {completedModules}/{totalModules} Modules</span>
//                 </div>
//                 <div style={{ height: 8, background: C.border, borderRadius: 10, overflow: "hidden" }}>
//                   <div style={{ height: "100%", width: `${completionPercentage}%`, background: completionPercentage >= 75 ? C.accent.green : completionPercentage >= 50 ? C.accent.gold : C.accent.red }} />
//                 </div>
//               </div>
              
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 8 }}>
//                 {Array.from({ length: totalModules }).map((_, idx) => {
//                   const isCompleted = progress?.modules[idx] || false;
//                   return (
//                     <button
//                       key={idx}
//                       onClick={() => updateProgress(subject.id, idx, !isCompleted)}
//                       style={{
//                         padding: "8px",
//                         background: isCompleted ? C.accent.greenBg : "transparent",
//                         border: `1px solid ${isCompleted ? C.accent.green : C.border}`,
//                         borderRadius: 8,
//                         cursor: "pointer",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 8,
//                         color: C.text.primary,
//                       }}
//                     >
//                       <div style={{
//                         width: 16,
//                         height: 16,
//                         borderRadius: 4,
//                         background: isCompleted ? C.accent.green : "transparent",
//                         border: `2px solid ${isCompleted ? C.accent.green : C.text.tertiary}`,
//                       }}>
//                         {isCompleted && <span style={{ color: "#ffffff", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</span>}
//                       </div>
//                       <span style={{ fontSize: 12 }}>Module {idx + 1}</span>
//                     </button>
//                   );
//                 })}
//               </div>
//             </Card>
//           );
//         })}
//       </div>
//     ),
    
//     appointments: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <Title>My Appointments</Title>
//           <Button onClick={() => setShowAppointmentModal(true)} variant="primary">
//             + Request Appointment
//           </Button>
//         </div>
        
//         {appointments.length === 0 ? (
//           <Card>
//             <p style={{ color: C.text.tertiary, textAlign: "center", padding: "40px 0" }}>
//               No appointment requests yet. Click "Request Appointment" to book a meeting with a faculty member.
//             </p>
//           </Card>
//         ) : (
//           appointments.map(app => (
//             <Card key={app.id}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
//                 <div>
//                   <h4 style={{ color: C.text.primary, fontSize: 16, fontWeight: 600 }}>{app.facultyName}</h4>
//                   <p style={{ color: C.text.tertiary, fontSize: 12 }}>{app.facultyDesignation}</p>
//                 </div>
//                 {getStatusBadge(app.status)}
//               </div>
              
//               <div style={{ marginBottom: 12 }}>
//                 <p><strong>Reason:</strong> {app.reason}</p>
//                 <p><strong>Preferred Date:</strong> {new Date(app.preferredDate).toLocaleDateString()}</p>
//                 <p><strong>Preferred Time:</strong> {app.preferredTime}</p>
//                 <p><strong>Requested on:</strong> {new Date(app.requestedAt).toLocaleString()}</p>
//               </div>
              
//               {app.approvedTime && (
//                 <div style={{ padding: 12, background: C.accent.greenBg, borderRadius: 8, marginBottom: 12 }}>
//                   <p style={{ color: C.accent.green, margin: 0 }}>
//                     <strong>✓ Appointment Approved!</strong><br />
//                     Scheduled for: {new Date(app.approvedTime).toLocaleString()}
//                   </p>
//                 </div>
//               )}
              
//               {app.facultyMessage && (
//                 <div style={{ padding: 12, background: app.status === "rescheduled" ? C.accent.blueBg : C.accent.goldBg, borderRadius: 8 }}>
//                   <p style={{ color: app.status === "rescheduled" ? C.accent.blue : C.accent.gold, margin: 0 }}>
//                     <strong>Faculty Message:</strong> {app.facultyMessage}
//                   </p>
//                 </div>
//               )}
              
//               {app.status === "pending" && (
//                 <p style={{ color: C.accent.gold, fontSize: 12, marginTop: 8 }}>
//                   ⏳ Waiting for faculty response...
//                 </p>
//               )}
//             </Card>
//           ))
//         )}
        
//         {/* Appointment Request Modal */}
//         {showAppointmentModal && (
//           <div style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: "rgba(0,0,0,0.5)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 1000
//           }}>
//             <Card padding="24px" style={{ width: 500, maxWidth: "90%", maxHeight: "90vh", overflow: "auto" }}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//                 <Title level={3}>Request Appointment</Title>
//                 <button 
//                   onClick={() => setShowAppointmentModal(false)}
//                   style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: C.text.tertiary }}
//                 >
//                   ×
//                 </button>
//               </div>
              
//               <Select
//                 label="Select Faculty"
//                 value={selectedFaculty}
//                 onChange={e => setSelectedFaculty(e.target.value)}
//                 options={[
//                   { value: "", label: "-- Select Faculty --" },
//                   ...facultyList.map(f => ({ 
//                     value: f.id, 
//                     label: `${f.name} (${f.designation}) - ${f.course}` 
//                   }))
//                 ]}
//               />
              
//               <Input
//                 label="Reason for Appointment"
//                 value={appointmentReason}
//                 onChange={e => setAppointmentReason(e.target.value)}
//                 placeholder="e.g., Discuss project, Clarify doubts, etc."
//                 required
//               />
              
//               <Input
//                 label="Preferred Date"
//                 type="date"
//                 value={preferredDate}
//                 onChange={e => setPreferredDate(e.target.value)}
//                 required
//               />
              
//               <Input
//                 label="Preferred Time"
//                 type="time"
//                 value={preferredTime}
//                 onChange={e => setPreferredTime(e.target.value)}
//                 required
//               />
              
//               <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
//                 <Button onClick={handleRequestAppointment} variant="success" fullWidth>
//                   Send Request
//                 </Button>
//                 <Button onClick={() => setShowAppointmentModal(false)} variant="secondary" fullWidth>
//                   Cancel
//                 </Button>
//               </div>
//             </Card>
//           </div>
//         )}
//       </div>
//     ),
    
//     profile: (
//       <Card>
//         <Title level={4}>Student Profile</Title>
//         <div style={{ display: "flex", gap: 32, alignItems: "center", marginTop: 20, flexWrap: "wrap" }}>
//           <div style={{
//             width: 100,
//             height: 100,
//             borderRadius: "50%",
//             background: C.accent.purpleBg,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: 36,
//             fontWeight: 700,
//             color: C.accent.purple,
//           }}>
//             {user.avatar}
//           </div>
//           <div>
//             <h3 style={{ color: C.text.primary, fontSize: 24, fontWeight: 600, marginBottom: 8 }}>{user.name}</h3>
//             <p style={{ color: C.accent.blue, fontSize: 14, marginBottom: 4 }}>Course: {user.course}</p>
//             <p style={{ color: C.accent.blue, fontSize: 14, marginBottom: 4 }}>Semester: {user.semester}</p>
//             <p style={{ color: C.accent.blue, fontSize: 14 }}>Section: {user.section}</p>
//           </div>
//         </div>
//       </Card>
//     ),
//   };
  
//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
//       <Sidebar navItems={STUDENT_NAV} active={active} setActive={setActive} collapsed={collapsed} setCollapsed={setCollapsed} user={user} accentColor={C.accent.purple} />
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
//           <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>{STUDENT_NAV.find(n => n.id === active)?.label}</h2>
//           <Badge variant="purple">
//             {user.course} Sem {user.semester} Sec {user.section}
//           </Badge>
//         </header>
//         <div style={{ padding: 32 }}>{panels[active]}</div>
//       </main>
//     </div>
//   );
// }

// src/components/student/StudentDashboard.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { Sidebar, Card, Title, Badge, Button, Input, Select } from "../common";
import { WeeklyTimetableView } from "../shared/WeeklyTimetableView";
import { AppState } from "../../AppState";
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from "../../utils/storage";
import { C } from "../../styles/theme";

export function StudentDashboard() {
  const { user } = useAuth();
  const [active, setActive] = useState("timetable");
  const [collapsed, setCollapsed] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [appointmentReason, setAppointmentReason] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [facultyList, setFacultyList] = useState([]);
  const [facultyLocations, setFacultyLocations] = useState({});
  const [isEditingUsn, setIsEditingUsn] = useState(false);
  const [usn, setUsn] = useState("");
  
  // Syllabus confirmation modal states
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingUpdate, setPendingUpdate] = useState(null);
  const [selectedModulesTemp, setSelectedModulesTemp] = useState({});
  
  useEffect(() => {
    loadAppointments();
    loadFacultyList();
    loadFacultyLocations();
    loadStudentUsn();
    
    const handleStorageChange = () => {
      setRefresh(r => r + 1);
      loadAppointments();
      loadFacultyLocations();
      loadStudentUsn();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  const loadAppointments = () => {
    const allAppointments = loadFromStorage(STORAGE_KEYS.APPOINTMENTS, []);
    const myAppointments = allAppointments.filter(a => a.studentId === user.id);
    setAppointments(myAppointments);
  };
  
  const loadFacultyList = () => {
    const faculties = AppState.faculty.map(f => ({
      id: f.id,
      name: f.name,
      designation: f.designation,
      course: f.course,
      email: f.email,
      block: f.block,
      floor: f.floor,
      roomNumber: f.roomNumber,
      cabinLocation: f.cabinLocation
    }));
    setFacultyList(faculties);
  };
  
  const loadFacultyLocations = () => {
    const locations = {};
    AppState.faculty.forEach(f => {
      const savedLocation = loadFromStorage(`${STORAGE_KEYS.FACULTY_LOCATION}_${f.id}`, null);
      if (savedLocation) {
        locations[f.id] = savedLocation;
      } else if (f.block || f.floor || f.roomNumber) {
        locations[f.id] = {
          block: f.block,
          floor: f.floor,
          roomNumber: f.roomNumber,
          cabinLocation: f.cabinLocation
        };
      }
    });
    setFacultyLocations(locations);
  };
  
  const loadStudentUsn = () => {
    const savedUsn = loadFromStorage(`${STORAGE_KEYS.STUDENT_USN}_${user.id}`, user.usn || "");
    setUsn(savedUsn);
  };
  
  const handleSaveUsn = () => {
    if (!usn.trim()) {
      alert("Please enter a USN");
      return;
    }
    
    saveToStorage(`${STORAGE_KEYS.STUDENT_USN}_${user.id}`, usn);
    const updatedUser = { ...user, usn: usn };
    localStorage.setItem('acadplan_user', JSON.stringify(updatedUser));
    
    setIsEditingUsn(false);
    alert("USN saved successfully!");
    setRefresh(r => r + 1);
  };
  
  const getFacultyLocationText = (facultyId) => {
    const location = facultyLocations[facultyId];
    if (!location) return "Location not set";
    
    const parts = [];
    if (location.block) parts.push(location.block);
    if (location.floor) parts.push(location.floor);
    if (location.roomNumber) parts.push(`Room ${location.roomNumber}`);
    if (location.cabinLocation) parts.push(`(${location.cabinLocation})`);
    if (location.buildingName) parts.push(location.buildingName);
    if (location.landmark) parts.push(`Near ${location.landmark}`);
    return parts.join(', ');
  };
  
  const handleRequestAppointment = () => {
    if (!selectedFaculty) {
      alert("Please select a faculty member");
      return;
    }
    if (!appointmentReason) {
      alert("Please enter a reason for the appointment");
      return;
    }
    if (!preferredDate) {
      alert("Please select a preferred date");
      return;
    }
    if (!preferredTime) {
      alert("Please select a preferred time");
      return;
    }
    
    const selectedFacultyData = facultyList.find(f => f.id === parseInt(selectedFaculty));
    
    const newAppointment = {
      id: Date.now(),
      studentId: user.id,
      studentName: user.name,
      studentUsn: usn || user.usn || "Not provided",
      studentCourse: user.course,
      studentSemester: user.semester,
      studentSection: user.section,
      facultyId: parseInt(selectedFaculty),
      facultyName: selectedFacultyData?.name,
      facultyDesignation: selectedFacultyData?.designation,
      reason: appointmentReason,
      preferredDate: preferredDate,
      preferredTime: preferredTime,
      status: "pending",
      requestedAt: new Date().toISOString(),
      approvedTime: null,
      facultyMessage: null,
      facultyLocation: null
    };
    
    const allAppointments = loadFromStorage(STORAGE_KEYS.APPOINTMENTS, []);
    allAppointments.push(newAppointment);
    saveToStorage(STORAGE_KEYS.APPOINTMENTS, allAppointments);
    window.dispatchEvent(new Event('storage'));
    
    alert("Appointment request sent successfully!");
    setShowAppointmentModal(false);
    setSelectedFaculty("");
    setAppointmentReason("");
    setPreferredDate("");
    setPreferredTime("");
    loadAppointments();
  };
  
  const schedule = AppState.getStudentSchedule(user.course, user.semester, user.section);
  const subjects = AppState.getSubjectsForCourseAndSemester(user.course, user.semester);
  
  // Open confirmation modal before updating progress
  const openConfirmModal = (subjectId, subjectName, currentProgress, newModules) => {
    setPendingUpdate({
      subjectId,
      subjectName,
      currentProgress,
      newModules
    });
    setShowConfirmModal(true);
  };
  
  // Handle module toggle with temporary selection
  const handleModuleToggle = (subjectId, moduleIndex, isCurrentlyCompleted) => {
    const tempKey = `${subjectId}_temp`;
    const currentTemp = selectedModulesTemp[tempKey] || {};
    
    // Toggle the specific module
    const newValue = !isCurrentlyCompleted;
    
    const newTempState = {
      ...currentTemp,
      [moduleIndex]: newValue
    };
    
    setSelectedModulesTemp({
      ...selectedModulesTemp,
      [tempKey]: newTempState
    });
    
    // Force refresh to update UI
    setRefresh(r => r + 1);
  };
  
  // Confirm and save progress
  const confirmUpdate = () => {
    if (pendingUpdate) {
      const { subjectId, subjectName, newModules } = pendingUpdate;
      
      console.log("Saving updates for", subjectName, newModules);
      
      // Apply all selected module changes one by one
      Object.entries(newModules).forEach(([moduleIndex, isCompleted]) => {
        const idx = parseInt(moduleIndex);
        AppState.updateStudentProgress(user.id, subjectId, idx, isCompleted);
      });
      
      setRefresh(r => r + 1);
      setShowConfirmModal(false);
      setPendingUpdate(null);
      
      // Clear temporary selections for this subject
      const tempKey = `${subjectId}_temp`;
      const newTemp = { ...selectedModulesTemp };
      delete newTemp[tempKey];
      setSelectedModulesTemp(newTemp);
      
      alert(`✅ Progress updated for ${subjectName}!`);
      
      // Force a full refresh to update all components
      setTimeout(() => {
        window.dispatchEvent(new Event('storage'));
        setRefresh(r => r + 1);
      }, 100);
    }
  };
  
  const getProgress = (subjectId) => {
    return AppState.getStudentProgress(user.id, subjectId);
  };
  
  // Get temporary module state for a subject
  const getTempModuleState = (subjectId, moduleIndex, isCompleted) => {
    const tempKey = `${subjectId}_temp`;
    const tempState = selectedModulesTemp[tempKey];
    
    // Check if this module has a pending change
    if (tempState && tempState[moduleIndex] !== undefined) {
      return tempState[moduleIndex];
    }
    return isCompleted;
  };
  
  // Get pending changes count for a subject
  const getPendingChangesCount = (subjectId, currentProgress) => {
    const tempKey = `${subjectId}_temp`;
    const tempState = selectedModulesTemp[tempKey];
    if (!tempState) return 0;
    
    let changes = 0;
    Object.entries(tempState).forEach(([idx, newValue]) => {
      const currentValue = currentProgress?.modules[parseInt(idx)] || false;
      if (newValue !== currentValue) {
        changes++;
      }
    });
    return changes;
  };
  
  const getStatusBadge = (status) => {
    switch(status) {
      case "pending":
        return <Badge variant="warning">Pending</Badge>;
      case "approved":
        return <Badge variant="success">Approved</Badge>;
      case "rescheduled":
        return <Badge variant="primary">Rescheduled</Badge>;
      case "rejected":
        return <Badge variant="danger">Rejected</Badge>;
      default:
        return <Badge variant="warning">{status}</Badge>;
    }
  };
  
  const STUDENT_NAV = [
    { id: "timetable", icon: "📅", label: "My Timetable" },
    { id: "syllabus", icon: "📚", label: "Syllabus Progress" },
    { id: "appointments", icon: "📅", label: "Appointments" },
    { id: "profile", icon: "👤", label: "Profile" },
  ];
  
  const panels = {
    timetable: (
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <Title>My Class Schedule</Title>
        <WeeklyTimetableView 
          schedule={schedule} 
          title={`${user.course} - Semester ${user.semester} - Section ${user.section}`}
        />
      </div>
    ),
    
    syllabus: (
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <Title>Syllabus Progress (Student View)</Title>
        
        {/* Info Banner */}
        <Card style={{ background: C.accent.blueBg, borderLeft: `4px solid ${C.accent.blue}` }}>
          <p style={{ color: C.text.primary, margin: 0 }}>
            📚 <strong>How it works:</strong> Click on modules to mark them as completed. 
            Once you're done with your selections, click "Confirm Changes" to save your progress.
          </p>
        </Card>
        
        {subjects.map(subject => {
          const progress = getProgress(subject.id);
          const completedModules = progress?.completedModules || 0;
          const totalModules = subject.modules;
          const completionPercentage = (completedModules / totalModules) * 100;
          const pendingChanges = getPendingChangesCount(subject.id, progress);
          
          // Get temporary selections for this subject
          const tempKey = `${subject.id}_temp`;
          const tempSelections = selectedModulesTemp[tempKey] || {};
          
          return (
            <Card key={subject.id}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <div>
                  <h4 style={{ color: C.text.primary, fontSize: 16, fontWeight: 600 }}>{subject.name}</h4>
                  <p style={{ color: C.text.tertiary, fontSize: 12 }}>Code: {subject.code}</p>
                </div>
                <Badge variant={completionPercentage >= 75 ? "success" : completionPercentage >= 50 ? "warning" : "danger"}>
                  {Math.round(completionPercentage)}% Complete
                </Badge>
              </div>
              
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ color: C.text.secondary, fontSize: 13 }}>Progress: {completedModules}/{totalModules} Modules</span>
                  {pendingChanges > 0 && (
                    <span style={{ color: C.accent.gold, fontSize: 12 }}>
                      {pendingChanges} pending change(s)
                    </span>
                  )}
                </div>
                <div style={{ height: 8, background: C.border, borderRadius: 10, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${completionPercentage}%`, background: completionPercentage >= 75 ? C.accent.green : completionPercentage >= 50 ? C.accent.gold : C.accent.red }} />
                </div>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 8, marginBottom: 16 }}>
                {Array.from({ length: totalModules }).map((_, idx) => {
                  const isCompleted = getTempModuleState(subject.id, idx, progress?.modules[idx] || false);
                  return (
                    <button
                      key={idx}
                      onClick={() => handleModuleToggle(subject.id, idx, progress?.modules[idx] || false)}
                      style={{
                        padding: "8px",
                        background: isCompleted ? C.accent.greenBg : "transparent",
                        border: `1px solid ${isCompleted ? C.accent.green : C.border}`,
                        borderRadius: 8,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        color: C.text.primary,
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (!isCompleted) {
                          e.currentTarget.style.background = C.cardHover;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isCompleted) {
                          e.currentTarget.style.background = "transparent";
                        }
                      }}
                    >
                      <div style={{
                        width: 16,
                        height: 16,
                        borderRadius: 4,
                        background: isCompleted ? C.accent.green : "transparent",
                        border: `2px solid ${isCompleted ? C.accent.green : C.text.tertiary}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                        {isCompleted && <span style={{ color: "#ffffff", fontSize: 10 }}>✓</span>}
                      </div>
                      <span style={{ fontSize: 12 }}>Module {idx + 1}</span>
                    </button>
                  );
                })}
              </div>
              
              {/* Confirm Changes Button */}
              {pendingChanges > 0 && (
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <Button 
                    onClick={() => {
                      // Build the changes object
                      const newModules = {};
                      Object.entries(tempSelections).forEach(([idx, newValue]) => {
                        const currentValue = progress?.modules[parseInt(idx)] || false;
                        if (newValue !== currentValue) {
                          newModules[idx] = newValue;
                        }
                      });
                      
                      openConfirmModal(subject.id, subject.name, progress, newModules);
                    }}
                    variant="success"
                    size="md"
                    style={{ flex: 1 }}
                  >
                    ✓ Confirm Changes ({pendingChanges} module{pendingChanges !== 1 ? 's' : ''})
                  </Button>
                  
                  <Button 
                    onClick={() => {
                      const tempKey = `${subject.id}_temp`;
                      const newTemp = { ...selectedModulesTemp };
                      delete newTemp[tempKey];
                      setSelectedModulesTemp(newTemp);
                      setRefresh(r => r + 1);
                    }}
                    variant="secondary"
                    size="md"
                  >
                    ↺ Reset
                  </Button>
                </div>
              )}
            </Card>
          );
        })}
        
        {/* Confirmation Modal - Custom Modal */}
        {showConfirmModal && pendingUpdate && (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}>
            <div style={{
              backgroundColor: C.surface,
              borderRadius: 12,
              maxWidth: 500,
              width: "90%",
              maxHeight: "80vh",
              overflow: "auto",
              boxShadow: C.shadow.xl,
            }}>
              <div style={{ padding: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <h3 style={{ color: C.text.primary, margin: 0 }}>Confirm Progress Update</h3>
                  <button
                    onClick={() => {
                      setShowConfirmModal(false);
                      setPendingUpdate(null);
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: 24,
                      cursor: "pointer",
                      color: C.text.tertiary,
                    }}
                  >
                    ×
                  </button>
                </div>
                
                <div style={{ marginBottom: 20 }}>
                  <p><strong>Subject:</strong> {pendingUpdate.subjectName}</p>
                  <p><strong>Current Progress:</strong> {pendingUpdate.currentProgress?.completedModules || 0}/{pendingUpdate.currentProgress?.totalModules || 0} modules</p>
                  
                  <div style={{ marginTop: 16, padding: 12, background: C.accent.goldBg, borderRadius: 8 }}>
                    <p style={{ color: C.accent.gold, fontWeight: 600, marginBottom: 8 }}>Changes to be saved:</p>
                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                      {Object.entries(pendingUpdate.newModules).map(([idx, newValue]) => {
                        const currentValue = pendingUpdate.currentProgress?.modules[parseInt(idx)] || false;
                        const moduleNum = parseInt(idx) + 1;
                        return (
                          <li key={idx} style={{ marginBottom: 8 }}>
                            <strong>Module {moduleNum}:</strong>
                            <span style={{ 
                              color: newValue ? C.accent.green : C.accent.red, 
                              marginLeft: 8,
                              display: "inline-block"
                            }}>
                              {currentValue ? "✓ Completed → " : "⬚ Not started → "}
                              {newValue ? "✓ Completed" : "⬚ Not started"}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                
                <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                  <Button 
                    onClick={() => {
                      setShowConfirmModal(false);
                      setPendingUpdate(null);
                    }} 
                    variant="secondary"
                  >
                    Cancel
                  </Button>
                  <Button onClick={confirmUpdate} variant="success">
                    Confirm & Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    ),
    
    appointments: (
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Title>My Appointments</Title>
          <Button onClick={() => setShowAppointmentModal(true)} variant="primary">
            + Request Appointment
          </Button>
        </div>
        
        {appointments.length === 0 ? (
          <Card>
            <p style={{ color: C.text.tertiary, textAlign: "center", padding: "40px 0" }}>
              No appointment requests yet. Click "Request Appointment" to book a meeting with a faculty member.
            </p>
          </Card>
        ) : (
          appointments.map(app => (
            <Card key={app.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  <h4 style={{ color: C.text.primary, fontSize: 16, fontWeight: 600 }}>{app.facultyName}</h4>
                  <p style={{ color: C.text.tertiary, fontSize: 12 }}>{app.facultyDesignation}</p>
                </div>
                {getStatusBadge(app.status)}
              </div>
              
              <div style={{ marginBottom: 12 }}>
                <p><strong>Reason:</strong> {app.reason}</p>
                <p><strong>Preferred Date:</strong> {new Date(app.preferredDate).toLocaleDateString()}</p>
                <p><strong>Preferred Time:</strong> {app.preferredTime}</p>
                <p><strong>Requested on:</strong> {new Date(app.requestedAt).toLocaleString()}</p>
                {app.studentUsn && (
                  <p><strong>USN:</strong> {app.studentUsn}</p>
                )}
              </div>
              
              {app.approvedTime && (
                <div style={{ padding: 12, background: C.accent.greenBg, borderRadius: 8, marginBottom: 12 }}>
                  <p style={{ color: C.accent.green, margin: 0 }}>
                    <strong>✓ Appointment Approved!</strong><br />
                    Scheduled for: {new Date(app.approvedTime).toLocaleString()}
                  </p>
                </div>
              )}
              
              {app.status === "approved" && (
                <div style={{ marginTop: 12, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 18 }}>📍</span>
                    <strong style={{ color: C.accent.blue }}>Meeting Location:</strong>
                  </div>
                  <p style={{ margin: 0, fontSize: 14, color: C.text.primary }}>
                    {app.facultyLocation ? (
                      <>
                        {app.facultyLocation.block && <div><strong>Block:</strong> {app.facultyLocation.block}</div>}
                        {app.facultyLocation.floor && <div><strong>Floor:</strong> {app.facultyLocation.floor}</div>}
                        {app.facultyLocation.roomNumber && <div><strong>Room:</strong> {app.facultyLocation.roomNumber}</div>}
                        {app.facultyLocation.cabinLocation && <div><strong>Cabin:</strong> {app.facultyLocation.cabinLocation}</div>}
                        {app.facultyLocation.landmark && <div><strong>Near:</strong> {app.facultyLocation.landmark}</div>}
                      </>
                    ) : (
                      getFacultyLocationText(app.facultyId)
                    )}
                  </p>
                </div>
              )}
              
              {app.facultyMessage && (
                <div style={{ padding: 12, background: app.status === "rescheduled" ? C.accent.blueBg : C.accent.goldBg, borderRadius: 8, marginTop: 8 }}>
                  <p style={{ color: app.status === "rescheduled" ? C.accent.blue : C.accent.gold, margin: 0 }}>
                    <strong>Faculty Message:</strong> {app.facultyMessage}
                  </p>
                </div>
              )}
              
              {app.status === "pending" && (
                <p style={{ color: C.accent.gold, fontSize: 12, marginTop: 8 }}>
                  ⏳ Waiting for faculty response...
                </p>
              )}
            </Card>
          ))
        )}
        
        {/* Appointment Request Modal */}
        {showAppointmentModal && (
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
            <Card padding="24px" style={{ width: 500, maxWidth: "90%", maxHeight: "90vh", overflow: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <Title level={3}>Request Appointment</Title>
                <button 
                  onClick={() => setShowAppointmentModal(false)}
                  style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: C.text.tertiary }}
                >
                  ×
                </button>
              </div>
              
              <Select
                label="Select Faculty"
                value={selectedFaculty}
                onChange={e => setSelectedFaculty(e.target.value)}
                options={[
                  { value: "", label: "-- Select Faculty --" },
                  ...facultyList.map(f => ({ 
                    value: f.id, 
                    label: `${f.name} (${f.designation}) - ${f.course}` 
                  }))
                ]}
              />
              
              <Input
                label="Reason for Appointment"
                value={appointmentReason}
                onChange={e => setAppointmentReason(e.target.value)}
                placeholder="e.g., Discuss project, Clarify doubts, etc."
                required
              />
              
              <Input
                label="Preferred Date"
                type="date"
                value={preferredDate}
                onChange={e => setPreferredDate(e.target.value)}
                required
              />
              
              <Input
                label="Preferred Time"
                type="time"
                value={preferredTime}
                onChange={e => setPreferredTime(e.target.value)}
                required
              />
              
              <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
                <Button onClick={handleRequestAppointment} variant="success" fullWidth>
                  Send Request
                </Button>
                <Button onClick={() => setShowAppointmentModal(false)} variant="secondary" fullWidth>
                  Cancel
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    ),
    
    profile: (
      <Card>
        <Title level={4}>Student Profile</Title>
        <div style={{ display: "flex", gap: 32, alignItems: "center", marginTop: 20, flexWrap: "wrap" }}>
          <div style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: C.accent.purpleBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            fontWeight: 700,
            color: C.accent.purple,
          }}>
            {user.avatar}
          </div>
          <div>
            <h3 style={{ color: C.text.primary, fontSize: 24, fontWeight: 600, marginBottom: 8 }}>{user.name}</h3>
            <p style={{ color: C.accent.blue, fontSize: 14, marginBottom: 4 }}>Course: {user.course}</p>
            <p style={{ color: C.accent.blue, fontSize: 14, marginBottom: 4 }}>Semester: {user.semester}</p>
            <p style={{ color: C.accent.blue, fontSize: 14, marginBottom: 4 }}>Section: {user.section}</p>
            
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <p style={{ color: C.text.tertiary, fontSize: 12, marginBottom: 4 }}>University Seat Number (USN)</p>
                  {isEditingUsn ? (
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                      <Input
                        value={usn}
                        onChange={e => setUsn(e.target.value)}
                        placeholder="Enter your USN"
                        style={{ width: 250 }}
                      />
                      <Button onClick={handleSaveUsn} variant="success" size="sm">Save</Button>
                      <Button onClick={() => setIsEditingUsn(false)} variant="secondary" size="sm">Cancel</Button>
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                      <p style={{ color: C.text.primary, fontSize: 16, fontWeight: 600 }}>
                        {usn || "Not provided"}
                      </p>
                      <Button onClick={() => setIsEditingUsn(true)} variant="primary" size="sm">
                        {usn ? "Edit USN" : "Add USN"}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: 24, padding: 16, background: C.cardHover, borderRadius: 12 }}>
          <h5 style={{ color: C.text.primary, fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Student Information</h5>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
            <div>
              <span style={{ color: C.text.tertiary, fontSize: 12 }}>Email ID</span>
              <p style={{ color: C.text.primary, fontSize: 14 }}>{user.email}</p>
            </div>
            <div>
              <span style={{ color: C.text.tertiary, fontSize: 12 }}>USN</span>
              <p style={{ color: C.text.primary, fontSize: 14, fontWeight: 500 }}>{usn || "Not provided"}</p>
            </div>
            <div>
              <span style={{ color: C.text.tertiary, fontSize: 12 }}>Course</span>
              <p style={{ color: C.text.primary, fontSize: 14 }}>{user.course}</p>
            </div>
            <div>
              <span style={{ color: C.text.tertiary, fontSize: 12 }}>Semester</span>
              <p style={{ color: C.text.primary, fontSize: 14 }}>{user.semester}</p>
            </div>
            <div>
              <span style={{ color: C.text.tertiary, fontSize: 12 }}>Section</span>
              <p style={{ color: C.text.primary, fontSize: 14 }}>{user.section}</p>
            </div>
            <div>
              <span style={{ color: C.text.tertiary, fontSize: 12 }}>Student ID</span>
              <p style={{ color: C.text.primary, fontSize: 14 }}>{user.id}</p>
            </div>
          </div>
        </div>
      </Card>
    ),
  };
  
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
      <Sidebar navItems={STUDENT_NAV} active={active} setActive={setActive} collapsed={collapsed} setCollapsed={setCollapsed} user={user} accentColor={C.accent.purple} />
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
          <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>{STUDENT_NAV.find(n => n.id === active)?.label}</h2>
          <Badge variant="purple">
            {user.course} Sem {user.semester} Sec {user.section}
          </Badge>
        </header>
        <div style={{ padding: 32 }}>{panels[active]}</div>
      </main>
    </div>
  );
}