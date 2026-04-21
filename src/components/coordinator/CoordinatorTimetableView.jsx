// import { useState, useEffect } from "react";
// import { Card, Title, Select, Pill, Badge } from "../common";
// import { WeeklyTimetableView } from "../shared/WeeklyTimetableView";
// import { AppState } from "../../AppState";
// import { COURSES, SEMESTERS, SECTIONS } from "../../data/mockData";
// import { C } from "../../styles/theme";

// export function CoordinatorTimetableView() {
//   const [view, setView] = useState("grid");
//   const [selectedCourse, setSelectedCourse] = useState("all");
//   const [selectedSemester, setSelectedSemester] = useState("all");
//   const [selectedSection, setSelectedSection] = useState("all");
//   const [refresh, setRefresh] = useState(0);
  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRefresh(r => r + 1);
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const timetable = AppState.timetable;
//   const conflicts = AppState.checkAllConflicts();
  
//   const filteredTimetable = timetable.filter(t => {
//     if (selectedCourse !== "all" && t.course !== selectedCourse) return false;
//     if (selectedSemester !== "all" && t.semester !== selectedSemester) return false;
//     if (selectedSection !== "all" && t.section !== selectedSection) return false;
//     return true;
//   });
  
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <Title>Generated Timetable</Title>
//         <div style={{ display: "flex", gap: 8 }}>
//           <Pill active={view === "grid"} onClick={() => setView("grid")}>Grid View</Pill>
//           <Pill active={view === "list"} onClick={() => setView("list")}>List View</Pill>
//         </div>
//       </div>
      
//       <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
//         <Select
//           value={selectedCourse}
//           onChange={e => setSelectedCourse(e.target.value)}
//           options={[
//             { value: "all", label: "All Courses" },
//             ...COURSES.map(c => ({ value: c, label: c }))
//           ]}
//         />
        
//         <Select
//           value={selectedSemester}
//           onChange={e => setSelectedSemester(e.target.value === "all" ? "all" : parseInt(e.target.value))}
//           options={[
//             { value: "all", label: "All Semesters" },
//             ...SEMESTERS.map(s => ({ value: s, label: `Semester ${s}` }))
//           ]}
//         />
        
//         <Select
//           value={selectedSection}
//           onChange={e => setSelectedSection(e.target.value)}
//           options={[
//             { value: "all", label: "All Sections" },
//             ...SECTIONS.map(s => ({ value: s, label: `Section ${s}` }))
//           ]}
//         />
//       </div>
      
//       {conflicts.length > 0 && (
//         <Card padding="16px">
//           <h4 style={{ color: C.accent.red, marginBottom: 12 }}>⚠ {conflicts.length} Conflicts Detected</h4>
//           {conflicts.map((conflict, i) => (
//             <p key={i} style={{ color: C.text.secondary, fontSize: 13, marginBottom: 4 }}>{conflict.message}</p>
//           ))}
//         </Card>
//       )}
      
//       {timetable.length === 0 ? (
//         <Card>
//           <p style={{ color: C.text.tertiary, textAlign: "center", padding: "40px 0" }}>
//             No timetable generated yet. Wait for all courses to be approved by the Dean.
//           </p>
//         </Card>
//       ) : view === "grid" ? (
//         <WeeklyTimetableView 
//           schedule={filteredTimetable} 
//           title={`Timetable - ${selectedCourse !== "all" ? selectedCourse : "All Courses"} ${selectedSemester !== "all" ? `Sem ${selectedSemester}` : ""} ${selectedSection !== "all" ? `Sec ${selectedSection}` : ""}`}
//         />
//       ) : (
//         <Card>
//           <div style={{ overflowX: "auto" }}>
//             <table style={{ width: "100%", borderCollapse: "collapse" }}>
//               <thead>
//                 <tr>
//                   <th style={{ padding: "12px", textAlign: "left", color: C.text.primary, borderBottom: `2px solid ${C.border}` }}>Course</th>
//                   <th style={{ padding: "12px", textAlign: "left", color: C.text.primary, borderBottom: `2px solid ${C.border}` }}>Sem</th>
//                   <th style={{ padding: "12px", textAlign: "left", color: C.text.primary, borderBottom: `2px solid ${C.border}` }}>Sec</th>
//                   <th style={{ padding: "12px", textAlign: "left", color: C.text.primary, borderBottom: `2px solid ${C.border}` }}>Day</th>
//                   <th style={{ padding: "12px", textAlign: "left", color: C.text.primary, borderBottom: `2px solid ${C.border}` }}>Time</th>
//                   <th style={{ padding: "12px", textAlign: "left", color: C.text.primary, borderBottom: `2px solid ${C.border}` }}>Subject</th>
//                   <th style={{ padding: "12px", textAlign: "left", color: C.text.primary, borderBottom: `2px solid ${C.border}` }}>Faculty</th>
//                   <th style={{ padding: "12px", textAlign: "left", color: C.text.primary, borderBottom: `2px solid ${C.border}` }}>Room</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredTimetable.sort((a, b) => {
//                   if (a.course !== b.course) return a.course.localeCompare(b.course);
//                   if (a.semester !== b.semester) return a.semester - b.semester;
//                   if (a.section !== b.section) return a.section.localeCompare(b.section);
//                   if (a.day !== b.day) return AppState.timetableConfig.days.indexOf(a.day) - AppState.timetableConfig.days.indexOf(b.day);
//                   return a.time.localeCompare(b.time);
//                 }).map(slot => (
//                   <tr key={slot.id} style={{ borderBottom: `1px solid ${C.border}` }}>
//                     <td style={{ padding: "12px", color: C.accent.gold }}>{slot.course}</td>
//                     <td style={{ padding: "12px", color: C.accent.blue }}>{slot.semester}</td>
//                     <td style={{ padding: "12px", color: C.accent.green }}>{slot.section}</td>
//                     <td style={{ padding: "12px", color: C.text.primary }}>{slot.day}</td>
//                     <td style={{ padding: "12px", color: C.accent.blue }}>{slot.time}</td>
//                     <td style={{ padding: "12px", color: C.text.primary }}>{slot.subject}</td>
//                     <td style={{ padding: "12px", color: C.text.secondary }}>{slot.facultyName}</td>
//                     <td style={{ padding: "12px", color: C.accent.gold }}>{slot.room}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </Card>
//       )}
//     </div>
//   );
// }

// src/components/coordinator/CoordinatorTimetableView.jsx
import { useState, useEffect } from "react";
import { Card, Title, Select, Pill, Badge } from "../common";
import { WeeklyTimetableView } from "../shared/WeeklyTimetableView";
import { AppState } from "../../AppState";
import { COURSES, SEMESTERS, SECTIONS } from "../../data/mockData";
import { C } from "../../styles/theme";

export function CoordinatorTimetableView() {
  const [view, setView] = useState("grid");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [selectedSection, setSelectedSection] = useState("all");
  const [selectedFaculty, setSelectedFaculty] = useState("all");
  const [facultyList, setFacultyList] = useState([]);
  const [refresh, setRefresh] = useState(0);
  
  useEffect(() => {
    loadFacultyList();
    
    const handleStorageChange = () => {
      setRefresh(r => r + 1);
      loadFacultyList();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  const loadFacultyList = () => {
    const faculties = AppState.faculty || [];
    setFacultyList(faculties);
  };
  
  const timetable = AppState.timetable;
  const conflicts = AppState.checkAllConflicts();
  
  const filteredTimetable = timetable.filter(t => {
    if (selectedCourse !== "all" && t.course !== selectedCourse) return false;
    if (selectedSemester !== "all" && t.semester !== selectedSemester) return false;
    if (selectedSection !== "all" && t.section !== selectedSection) return false;
    if (selectedFaculty !== "all" && t.facultyId !== parseInt(selectedFaculty)) return false;
    return true;
  });
  
  // Get unique faculty names for the filter dropdown
  const uniqueFaculties = [...new Map(timetable.map(t => [t.facultyId, { id: t.facultyId, name: t.facultyName }])).values()];
  
  // Get filter summary text
  const getFilterSummary = () => {
    const filters = [];
    if (selectedCourse !== "all") filters.push(`Course: ${selectedCourse}`);
    if (selectedSemester !== "all") filters.push(`Semester: ${selectedSemester}`);
    if (selectedSection !== "all") filters.push(`Section: ${selectedSection}`);
    if (selectedFaculty !== "all") {
      const faculty = facultyList.find(f => f.id === parseInt(selectedFaculty));
      filters.push(`Faculty: ${faculty?.name || selectedFaculty}`);
    }
    return filters.length > 0 ? filters.join(" | ") : "All";
  };
  
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <Title>Generated Timetable</Title>
        <div style={{ display: "flex", gap: 8 }}>
          <Pill active={view === "grid"} onClick={() => setView("grid")}>Grid View</Pill>
          <Pill active={view === "list"} onClick={() => setView("list")}>List View</Pill>
        </div>
      </div>
      
      {/* Filter Section */}
      <Card padding="20px">
        <Title level={4}>Filters</Title>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          <Select
            label="Course"
            value={selectedCourse}
            onChange={e => setSelectedCourse(e.target.value)}
            options={[
              { value: "all", label: "All Courses" },
              ...COURSES.map(c => ({ value: c, label: c }))
            ]}
          />
          
          <Select
            label="Semester"
            value={selectedSemester}
            onChange={e => setSelectedSemester(e.target.value === "all" ? "all" : parseInt(e.target.value))}
            options={[
              { value: "all", label: "All Semesters" },
              ...SEMESTERS.map(s => ({ value: s, label: `Semester ${s}` }))
            ]}
          />
          
          <Select
            label="Section"
            value={selectedSection}
            onChange={e => setSelectedSection(e.target.value)}
            options={[
              { value: "all", label: "All Sections" },
              ...SECTIONS.map(s => ({ value: s, label: `Section ${s}` }))
            ]}
          />
          
          <Select
            label="Faculty"
            value={selectedFaculty}
            onChange={e => setSelectedFaculty(e.target.value)}
            options={[
              { value: "all", label: "All Faculty" },
              ...uniqueFaculties.map(f => ({ value: f.id, label: f.name }))
            ]}
          />
        </div>
        
        <div style={{ marginTop: 12, padding: 8, background: C.cardHover, borderRadius: 6 }}>
          <p style={{ fontSize: 12, color: C.text.secondary, margin: 0 }}>
            🔍 Showing: <strong>{getFilterSummary()}</strong> | 
            📊 Total slots: <strong>{filteredTimetable.length}</strong>
          </p>
        </div>
      </Card>
      
      {/* Conflicts Warning */}
      {conflicts.length > 0 && (
        <Card padding="16px" style={{ background: C.accent.redBg }}>
          <h4 style={{ color: C.accent.red, marginBottom: 12 }}>⚠ {conflicts.length} Conflicts Detected</h4>
          {conflicts.map((conflict, i) => (
            <p key={i} style={{ color: C.text.secondary, fontSize: 13, marginBottom: 4 }}>{conflict.message}</p>
          ))}
        </Card>
      )}
      
      {/* Timetable Display */}
      {timetable.length === 0 ? (
        <Card>
          <p style={{ color: C.text.tertiary, textAlign: "center", padding: "40px 0" }}>
            No timetable generated yet. Wait for all courses to be approved by the Dean.
          </p>
        </Card>
      ) : view === "grid" ? (
        <WeeklyTimetableView 
          schedule={filteredTimetable} 
          title={`Timetable - ${getFilterSummary()}`}
        />
      ) : (
        <Card>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ padding: "12px", textAlign: "left", color: C.text.primary, borderBottom: `2px solid ${C.border}` }}>Faculty</th>
                  <th style={{ padding: "12px", textAlign: "left", color: C.text.primary, borderBottom: `2px solid ${C.border}` }}>Course</th>
                  <th style={{ padding: "12px", textAlign: "left", color: C.text.primary, borderBottom: `2px solid ${C.border}` }}>Sem</th>
                  <th style={{ padding: "12px", textAlign: "left", color: C.text.primary, borderBottom: `2px solid ${C.border}` }}>Sec</th>
                  <th style={{ padding: "12px", textAlign: "left", color: C.text.primary, borderBottom: `2px solid ${C.border}` }}>Day</th>
                  <th style={{ padding: "12px", textAlign: "left", color: C.text.primary, borderBottom: `2px solid ${C.border}` }}>Time</th>
                  <th style={{ padding: "12px", textAlign: "left", color: C.text.primary, borderBottom: `2px solid ${C.border}` }}>Subject</th>
                  <th style={{ padding: "12px", textAlign: "left", color: C.text.primary, borderBottom: `2px solid ${C.border}` }}>Room</th>
                </tr>
              </thead>
              <tbody>
                {filteredTimetable.sort((a, b) => {
                  if (a.facultyName !== b.facultyName) return a.facultyName.localeCompare(b.facultyName);
                  if (a.course !== b.course) return a.course.localeCompare(b.course);
                  if (a.semester !== b.semester) return a.semester - b.semester;
                  if (a.section !== b.section) return a.section.localeCompare(b.section);
                  if (a.day !== b.day) return AppState.timetableConfig.days.indexOf(a.day) - AppState.timetableConfig.days.indexOf(b.day);
                  return a.time.localeCompare(b.time);
                }).map(slot => (
                  <tr key={slot.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td style={{ padding: "12px", color: C.accent.purple, fontWeight: 500 }}>{slot.facultyName}</td>
                    <td style={{ padding: "12px", color: C.accent.gold }}>{slot.course}</td>
                    <td style={{ padding: "12px", color: C.accent.blue }}>{slot.semester}</td>
                    <td style={{ padding: "12px", color: C.accent.green }}>{slot.section}</td>
                    <td style={{ padding: "12px", color: C.text.primary }}>{slot.day}</td>
                    <td style={{ padding: "12px", color: C.accent.blue }}>{slot.time}</td>
                    <td style={{ padding: "12px", color: C.text.primary }}>{slot.subject}</td>
                    <td style={{ padding: "12px", color: C.accent.gold }}>{slot.room}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}