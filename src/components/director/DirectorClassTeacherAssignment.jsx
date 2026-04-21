// // src/components/director/DirectorClassTeacherAssignment.jsx
// import { useState, useEffect } from "react";
// import { Card, Title, Button, Select, Badge } from "../common";
// import { AppState } from "../../AppState";
// import { saveToStorage, loadFromStorage, STORAGE_KEYS } from "../../utils/storage";
// import { COURSES, SEMESTERS } from "../../data/mockData";
// import { C } from "../../styles/theme";

// export function DirectorClassTeacherAssignment({ onRefresh }) {
//   const [classTeachers, setClassTeachers] = useState({});
//   const [facultyList, setFacultyList] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState("BTech");
//   const [selectedSemester, setSelectedSemester] = useState(1);
//   const [selectedFaculty, setSelectedFaculty] = useState("");
//   const [refresh, setRefresh] = useState(0);

//   useEffect(() => {
//     loadData();
//   }, [refresh]);

//   const loadData = () => {
//     const savedClassTeachers = loadFromStorage(STORAGE_KEYS.CLASS_TEACHERS, {});
//     setClassTeachers(savedClassTeachers);
//     setFacultyList(AppState.faculty);
//   };

//   const handleAssign = () => {
//     if (!selectedFaculty) {
//       alert("Please select a faculty member");
//       return;
//     }

//     const updatedClassTeachers = { ...classTeachers };
//     if (!updatedClassTeachers[selectedCourse]) {
//       updatedClassTeachers[selectedCourse] = {};
//     }
//     updatedClassTeachers[selectedCourse][selectedSemester] = {
//       facultyId: parseInt(selectedFaculty),
//       facultyName: AppState.faculty.find(f => f.id === parseInt(selectedFaculty))?.name,
//       assignedDate: new Date().toISOString()
//     };

//     setClassTeachers(updatedClassTeachers);
//     saveToStorage(STORAGE_KEYS.CLASS_TEACHERS, updatedClassTeachers);
//     window.dispatchEvent(new Event('storage'));
//     alert(`Class Teacher assigned successfully for ${selectedCourse} Semester ${selectedSemester}`);
//     setSelectedFaculty("");
//     if (onRefresh) onRefresh();
//   };

//   const handleRemove = (course, semester) => {
//     if (confirm(`Remove class teacher for ${course} Semester ${semester}?`)) {
//       const updatedClassTeachers = { ...classTeachers };
//       if (updatedClassTeachers[course] && updatedClassTeachers[course][semester]) {
//         delete updatedClassTeachers[course][semester];
//         if (Object.keys(updatedClassTeachers[course]).length === 0) {
//           delete updatedClassTeachers[course];
//         }
//         setClassTeachers(updatedClassTeachers);
//         saveToStorage(STORAGE_KEYS.CLASS_TEACHERS, updatedClassTeachers);
//         window.dispatchEvent(new Event('storage'));
//         alert(`Class Teacher removed for ${course} Semester ${semester}`);
//         if (onRefresh) onRefresh();
//       }
//     }
//   };

//   const getCurrentTeacher = () => {
//     return classTeachers[selectedCourse]?.[selectedSemester];
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <Title>Class Teacher Assignment</Title>

//       <Card>
//         <Title level={4}>Assign Class Teacher</Title>
        
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
//           <Select
//             label="Course"
//             value={selectedCourse}
//             onChange={e => setSelectedCourse(e.target.value)}
//             options={COURSES.map(c => ({ value: c, label: c }))}
//           />
          
//           <Select
//             label="Semester"
//             value={selectedSemester}
//             onChange={e => setSelectedSemester(parseInt(e.target.value))}
//             options={SEMESTERS.map(s => ({ value: s, label: `Semester ${s}` }))}
//           />
          
//           <Select
//             label="Select Faculty"
//             value={selectedFaculty}
//             onChange={e => setSelectedFaculty(e.target.value)}
//             options={[
//               { value: "", label: "-- Select Faculty --" },
//               ...facultyList.map(f => ({ 
//                 value: f.id, 
//                 label: `${f.name} (${f.designation}) - ${f.course}` 
//               }))
//             ]}
//           />
//         </div>
        
//         {getCurrentTeacher() && (
//           <div style={{ marginTop: 16, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
//             <p style={{ color: C.accent.blue, margin: 0 }}>
//               <strong>Currently Assigned:</strong> {getCurrentTeacher().facultyName}
//               <br />
//               <small>Assigned on: {new Date(getCurrentTeacher().assignedDate).toLocaleDateString()}</small>
//             </p>
//           </div>
//         )}
        
//         <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
//           <Button onClick={handleAssign} variant="success" disabled={!selectedFaculty}>
//             Assign Class Teacher
//           </Button>
//           {getCurrentTeacher() && (
//             <Button onClick={() => handleRemove(selectedCourse, selectedSemester)} variant="danger">
//               Remove Assignment
//             </Button>
//           )}
//         </div>
//       </Card>

//       <Card>
//         <Title level={4}>Current Class Teacher Assignments</Title>
//         <div style={{ overflowX: "auto" }}>
//           <table style={{ width: "100%", borderCollapse: "collapse" }}>
//             <thead>
//               <tr>
//                 <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Course</th>
//                 <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Semester</th>
//                 <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Class Teacher</th>
//                 <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Assigned Date</th>
//                 <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {COURSES.map(course => (
//                 SEMESTERS.map(semester => {
//                   const teacher = classTeachers[course]?.[semester];
//                   return (
//                     <tr key={`${course}-${semester}`} style={{ borderBottom: `1px solid ${C.border}` }}>
//                       <td style={{ padding: 12 }}>{course}</td>
//                       <td style={{ padding: 12 }}>Semester {semester}</td>
//                       <td style={{ padding: 12 }}>
//                         {teacher ? (
//                           <Badge variant="success">{teacher.facultyName}</Badge>
//                         ) : (
//                           <Badge variant="warning">Not Assigned</Badge>
//                         )}
//                       </td>
//                       <td style={{ padding: 12 }}>
//                         {teacher ? new Date(teacher.assignedDate).toLocaleDateString() : "-"}
//                       </td>
//                       <td style={{ padding: 12 }}>
//                         {teacher && (
//                           <Button 
//                             onClick={() => handleRemove(course, semester)} 
//                             variant="danger" 
//                             size="sm"
//                           >
//                             Remove
//                           </Button>
//                         )}
//                       </td>
//                     </tr>
//                   );
//                 })
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </Card>
//     </div>
//   );
// }

// src/components/director/DirectorClassTeacherAssignment.jsx
import { useState, useEffect } from "react";
import { Card, Title, Button, Select, Badge, Input } from "../common";
import { AppState } from "../../AppState";
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from "../../utils/storage";
import { COURSES, SEMESTERS, SECTIONS } from "../../data/mockData";
import { C } from "../../styles/theme";

export function DirectorClassTeacherAssignment({ onRefresh }) {
  const [classTeachers, setClassTeachers] = useState({});
  const [facultyList, setFacultyList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("BTech");
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [selectedSection, setSelectedSection] = useState("A");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    loadData();
  }, [refresh]);

  const loadData = () => {
    const savedClassTeachers = loadFromStorage(STORAGE_KEYS.CLASS_TEACHERS, {});
    setClassTeachers(savedClassTeachers);
    setFacultyList(AppState.faculty);
  };

  const handleAssign = () => {
    if (!selectedFaculty) {
      alert("Please select a faculty member");
      return;
    }

    const updatedClassTeachers = { ...classTeachers };
    if (!updatedClassTeachers[selectedCourse]) {
      updatedClassTeachers[selectedCourse] = {};
    }
    if (!updatedClassTeachers[selectedCourse][selectedSemester]) {
      updatedClassTeachers[selectedCourse][selectedSemester] = {};
    }
    
    updatedClassTeachers[selectedCourse][selectedSemester][selectedSection] = {
      facultyId: parseInt(selectedFaculty),
      facultyName: AppState.faculty.find(f => f.id === parseInt(selectedFaculty))?.name,
      assignedDate: new Date().toISOString(),
      section: selectedSection
    };

    setClassTeachers(updatedClassTeachers);
    saveToStorage(STORAGE_KEYS.CLASS_TEACHERS, updatedClassTeachers);
    window.dispatchEvent(new Event('storage'));
    alert(`Class Teacher assigned successfully for ${selectedCourse} Semester ${selectedSemester} - Section ${selectedSection}`);
    setSelectedFaculty("");
    if (onRefresh) onRefresh();
  };

  const handleRemove = (course, semester, section) => {
    if (confirm(`Remove class teacher for ${course} Semester ${semester} - Section ${section}?`)) {
      const updatedClassTeachers = { ...classTeachers };
      if (updatedClassTeachers[course] && 
          updatedClassTeachers[course][semester] && 
          updatedClassTeachers[course][semester][section]) {
        delete updatedClassTeachers[course][semester][section];
        
        // Clean up empty objects
        if (Object.keys(updatedClassTeachers[course][semester]).length === 0) {
          delete updatedClassTeachers[course][semester];
        }
        if (Object.keys(updatedClassTeachers[course]).length === 0) {
          delete updatedClassTeachers[course];
        }
        
        setClassTeachers(updatedClassTeachers);
        saveToStorage(STORAGE_KEYS.CLASS_TEACHERS, updatedClassTeachers);
        window.dispatchEvent(new Event('storage'));
        alert(`Class Teacher removed for ${course} Semester ${semester} - Section ${section}`);
        if (onRefresh) onRefresh();
      }
    }
  };

  const getCurrentTeacher = () => {
    return classTeachers[selectedCourse]?.[selectedSemester]?.[selectedSection];
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Title>Class Teacher Assignment</Title>

      <Card>
        <Title level={4}>Assign Class Teacher</Title>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          <Select
            label="Course"
            value={selectedCourse}
            onChange={e => setSelectedCourse(e.target.value)}
            options={COURSES.map(c => ({ value: c, label: c }))}
          />
          
          <Select
            label="Semester"
            value={selectedSemester}
            onChange={e => setSelectedSemester(parseInt(e.target.value))}
            options={SEMESTERS.map(s => ({ value: s, label: `Semester ${s}` }))}
          />
          
          <Select
            label="Section"
            value={selectedSection}
            onChange={e => setSelectedSection(e.target.value)}
            options={SECTIONS.map(s => ({ value: s, label: `Section ${s}` }))}
          />
          
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
        </div>
        
        {getCurrentTeacher() && (
          <div style={{ marginTop: 16, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
            <p style={{ color: C.accent.blue, margin: 0 }}>
              <strong>Currently Assigned:</strong> {getCurrentTeacher().facultyName}
              <br />
              <small>Assigned on: {new Date(getCurrentTeacher().assignedDate).toLocaleDateString()}</small>
            </p>
          </div>
        )}
        
        <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
          <Button onClick={handleAssign} variant="success" disabled={!selectedFaculty}>
            Assign Class Teacher
          </Button>
          {getCurrentTeacher() && (
            <Button onClick={() => handleRemove(selectedCourse, selectedSemester, selectedSection)} variant="danger">
              Remove Assignment
            </Button>
          )}
        </div>
      </Card>

      <Card>
        <Title level={4}>Current Class Teacher Assignments</Title>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Course</th>
                <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Semester</th>
                <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Section</th>
                <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Class Teacher</th>
                <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Assigned Date</th>
                <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {COURSES.map(course => (
                SEMESTERS.map(semester => (
                  SECTIONS.map(section => {
                    const teacher = classTeachers[course]?.[semester]?.[section];
                    return (
                      <tr key={`${course}-${semester}-${section}`} style={{ borderBottom: `1px solid ${C.border}` }}>
                        <td style={{ padding: 12 }}>{course}</td>
                        <td style={{ padding: 12 }}>Semester {semester}</td>
                        <td style={{ padding: 12 }}>Section {section}</td>
                        <td style={{ padding: 12 }}>
                          {teacher ? (
                            <Badge variant="success">{teacher.facultyName}</Badge>
                          ) : (
                            <Badge variant="warning">Not Assigned</Badge>
                          )}
                        </td>
                        <td style={{ padding: 12 }}>
                          {teacher ? new Date(teacher.assignedDate).toLocaleDateString() : "-"}
                        </td>
                        <td style={{ padding: 12 }}>
                          {teacher && (
                            <Button 
                              onClick={() => handleRemove(course, semester, section)} 
                              variant="danger" 
                              size="sm"
                            >
                              Remove
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ))
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}