// // // src/components/coordinator/CoordinatorSemesterDetailsForm.jsx
// // import { useState, useEffect } from "react";
// // import { Card, Title, Button, Select } from "../common";
// // import { AppState } from "../../AppState";
// // import { COURSES, SEMESTERS } from "../../data/mockData";
// // import { C } from "../../styles/theme";

// // export function CoordinatorSemesterDetailsForm() {
// //   const [selectedCourse, setSelectedCourse] = useState("BTech");
// //   const [selectedSemester, setSelectedSemester] = useState(1);
// //   const [subjects, setSubjects] = useState([]);
// //   const [defaultFaculty, setDefaultFaculty] = useState({});
// //   const [refresh, setRefresh] = useState(0);
  
// //   // Listen for storage changes (when director adds new subjects)
// //   useEffect(() => {
// //     const handleStorageChange = () => {
// //       setRefresh(r => r + 1);
// //     };
// //     window.addEventListener('storage', handleStorageChange);
// //     return () => window.removeEventListener('storage', handleStorageChange);
// //   }, []);
  
// //   useEffect(() => {
// //     loadExistingData();
// //   }, [selectedCourse, selectedSemester, refresh]);
  
// //   const loadExistingData = () => {
// //     const existing = AppState.semesterDetails[selectedCourse]?.[selectedSemester];
// //     if (existing) {
// //       setSubjects(existing.subjects || []);
// //       setDefaultFaculty(existing.defaultFaculty || {});
// //     } else {
// //       setSubjects([]);
// //       setDefaultFaculty({});
// //     }
// //   };
  
// //   // Get all subjects for this course and semester (from Director's additions)
// //   const availableSubjects = AppState.subjects.filter(s => 
// //     s.course === selectedCourse && s.semester === selectedSemester
// //   );
  
// //   const handleSetDefaultFaculty = (subjectId, facultyId) => {
// //     setDefaultFaculty({
// //       ...defaultFaculty,
// //       [subjectId]: parseInt(facultyId)
// //     });
// //   };
  
// //   const handleSave = () => {
// //     if (subjects.length === 0) {
// //       alert("No subjects available for this semester. Please ask the Director to add subjects first.");
// //       return;
// //     }
    
// //     const missingFaculty = subjects.filter(s => !defaultFaculty[s]);
// //     if (missingFaculty.length > 0) {
// //       alert(`Please assign default faculty for all subjects. Missing: ${missingFaculty.length} subject(s)`);
// //       return;
// //     }
    
// //     AppState.updateSemesterDetails(selectedCourse, selectedSemester, {
// //       subjects,
// //       defaultFaculty
// //     });
    
// //     alert("Semester details saved successfully!");
// //     // Trigger refresh to update other components
// //     window.dispatchEvent(new Event('storage'));
// //   };
  
// //   return (
// //     <Card>
// //       <Title level={4}>Configure Semester Details</Title>
      
// //       <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16, marginBottom: 24 }}>
// //         <Select
// //           label="Course"
// //           value={selectedCourse}
// //           onChange={e => setSelectedCourse(e.target.value)}
// //           options={COURSES.map(c => ({ value: c, label: c }))}
// //         />
        
// //         <Select
// //           label="Semester"
// //           value={selectedSemester}
// //           onChange={e => setSelectedSemester(parseInt(e.target.value))}
// //           options={SEMESTERS.map(s => ({ value: s, label: `Semester ${s}` }))}
// //         />
// //       </div>
      
// //       {/* Info Box - No Add Subject Option */}
// //       <div style={{ marginBottom: 24, padding: 16, background: C.accent.blueBg, borderRadius: 12 }}>
// //         <h5 style={{ color: C.accent.blue, fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
// //           📚 Subjects for {selectedCourse} - Semester {selectedSemester}
// //         </h5>
// //         <p style={{ color: C.text.secondary, fontSize: 13, margin: 0 }}>
// //           Subjects are added by the Director. If subjects are missing, please contact the Director to add them.
// //         </p>
// //       </div>
      
// //       {/* Available Subjects List (Read-only view of what Director added) */}
// //       <div style={{ marginBottom: 24 }}>
// //         <h5 style={{ color: C.text.secondary, fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
// //           Subjects Available ({availableSubjects.length})
// //         </h5>
// //         {availableSubjects.length === 0 ? (
// //           <div style={{ padding: 40, textAlign: "center", background: C.cardHover, borderRadius: 12 }}>
// //             <p style={{ color: C.accent.red, marginBottom: 8 }}>⚠ No subjects available for {selectedCourse} Semester {selectedSemester}</p>
// //             <p style={{ color: C.text.tertiary, fontSize: 13 }}>Please ask the Director to add subjects for this course and semester.</p>
// //           </div>
// //         ) : (
// //           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 12 }}>
// //             {availableSubjects.map(subject => {
// //               const isSelected = subjects.includes(subject.id);
// //               const assignedFaculty = defaultFaculty[subject.id];
// //               const facultyObj = assignedFaculty ? AppState.getFacultyById(assignedFaculty) : null;
              
// //               return (
// //                 <div 
// //                   key={subject.id} 
// //                   style={{ 
// //                     padding: 12, 
// //                     background: isSelected ? C.accent.greenBg : C.cardHover, 
// //                     borderRadius: 10,
// //                     border: `1px solid ${isSelected ? C.accent.green : C.border}`,
// //                     opacity: isSelected ? 1 : 0.7
// //                   }}
// //                 >
// //                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
// //                     <div>
// //                       <span style={{ fontWeight: 600, color: C.text.primary }}>{subject.name}</span>
// //                       <div style={{ fontSize: 11, color: C.text.tertiary, marginTop: 2 }}>{subject.code}</div>
// //                     </div>
// //                     {isSelected && (
// //                       <span style={{ fontSize: 11, color: C.accent.green, background: C.accent.greenBg, padding: "2px 8px", borderRadius: 12 }}>
// //                         Added ✓
// //                       </span>
// //                     )}
// //                   </div>
                  
// //                   <div style={{ fontSize: 11, color: C.text.tertiary, marginBottom: 8 }}>
// //                     {subject.credits} credits | {subject.totalWeeklyClasses} hrs/week | {subject.type}
// //                   </div>
                  
// //                   {isSelected && assignedFaculty && (
// //                     <div style={{ fontSize: 11, color: C.accent.blue, marginTop: 4 }}>
// //                       Default Faculty: {facultyObj?.name} ({facultyObj?.designation})
// //                     </div>
// //                   )}
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         )}
// //       </div>
      
// //       {/* Selected Subjects & Default Faculty Assignment */}
// //       {subjects.length > 0 && (
// //         <div>
// //           <h5 style={{ color: C.text.secondary, fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
// //             Assign Default Faculty ({subjects.length} subjects)
// //           </h5>
          
// //           {subjects.map(subjectId => {
// //             const subject = AppState.subjects.find(s => s.id === subjectId);
// //             const facultyOptions = AppState.faculty.filter(f => f.course === selectedCourse);
            
// //             return (
// //               <div key={subjectId} style={{ marginBottom: 12, padding: 16, background: C.cardHover, borderRadius: 12 }}>
// //                 <div style={{ marginBottom: 12 }}>
// //                   <span style={{ color: C.text.primary, fontWeight: 600, fontSize: 16 }}>{subject?.name}</span>
// //                   <div style={{ display: "flex", gap: 16, marginTop: 4, flexWrap: "wrap" }}>
// //                     <span style={{ color: C.text.tertiary, fontSize: 12 }}>Code: {subject?.code}</span>
// //                     <span style={{ color: C.text.tertiary, fontSize: 12 }}>Credits: {subject?.credits}</span>
// //                     <span style={{ color: C.text.tertiary, fontSize: 12 }}>Type: {subject?.type}</span>
// //                     <span style={{ color: C.accent.gold, fontSize: 12 }}>Hours/Week: {subject?.totalWeeklyClasses}</span>
// //                   </div>
// //                 </div>
                
// //                 <Select
// //                   label="Default Faculty"
// //                   value={defaultFaculty[subjectId] || ""}
// //                   onChange={e => handleSetDefaultFaculty(subjectId, e.target.value)}
// //                   options={[
// //                     { value: "", label: "Select Default Faculty" },
// //                     ...facultyOptions.map(f => ({ 
// //                       value: f.id, 
// //                       label: `${f.name} (${f.designation}) - ${f.remainingHours} hrs available` 
// //                     }))
// //                   ]}
// //                 />
// //               </div>
// //             );
// //           })}
// //         </div>
// //       )}
      
// //       {subjects.length > 0 && (
// //         <div style={{ marginTop: 20, padding: 16, background: C.accent.blueBg, borderRadius: 12 }}>
// //           <h5 style={{ color: C.accent.blue, fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Summary</h5>
// //           <p style={{ color: C.text.secondary, fontSize: 13 }}>
// //             <strong>Total Subjects:</strong> {subjects.length}<br />
// //             <strong>Total Weekly Classes:</strong> {subjects.reduce((total, subjectId) => {
// //               const subject = AppState.subjects.find(s => s.id === subjectId);
// //               return total + (subject?.totalWeeklyClasses || 0);
// //             }, 0)} hours per section<br />
// //             <strong>Faculty Assignments:</strong> {Object.keys(defaultFaculty).length}/{subjects.length} assigned
// //           </p>
// //         </div>
// //       )}
      
// //       <Button
// //         onClick={handleSave}
// //         variant="success"
// //         fullWidth
// //         size="lg"
// //         style={{ marginTop: 20 }}
// //         disabled={subjects.length === 0}
// //       >
// //         Save Semester Details
// //       </Button>
// //     </Card>
// //   );
// // }

// // src/components/coordinator/CoordinatorSemesterDetailsForm.jsx
// import { useState, useEffect } from "react";
// import { Card, Title, Button, Select } from "../common";
// import { AppState } from "../../AppState";
// import { COURSES, SEMESTERS } from "../../data/mockData";
// import { C } from "../../styles/theme";

// export function CoordinatorSemesterDetailsForm() {
//   const [selectedCourse, setSelectedCourse] = useState("BTech");
//   const [selectedSemester, setSelectedSemester] = useState(1);
//   const [subjects, setSubjects] = useState([]);
//   const [defaultFaculty, setDefaultFaculty] = useState({});
//   const [refresh, setRefresh] = useState(0);
//   const [availableSubjects, setAvailableSubjects] = useState([]);
  
//   // Listen for storage changes (when director adds new subjects)
//   useEffect(() => {
//     const handleStorageChange = () => {
//       console.log("Storage changed, reloading subjects...");
//       loadAvailableSubjects();
//       loadExistingData();
//       setRefresh(r => r + 1);
//     };
    
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   useEffect(() => {
//     loadAvailableSubjects();
//     loadExistingData();
//   }, [selectedCourse, selectedSemester, refresh]);
  
//   const loadAvailableSubjects = () => {
//     const subjectsForCourse = AppState.subjects.filter(s => 
//       s.course === selectedCourse && s.semester === selectedSemester
//     );
//     setAvailableSubjects(subjectsForCourse);
//   };
  
//   const loadExistingData = () => {
//     const existing = AppState.semesterDetails[selectedCourse]?.[selectedSemester];
//     if (existing) {
//       setSubjects(existing.subjects || []);
//       setDefaultFaculty(existing.defaultFaculty || {});
//     } else {
//       setSubjects([]);
//       setDefaultFaculty({});
//     }
//   };
  
//   // Get subjects that are not already added
//   const subjectsNotAdded = availableSubjects.filter(subject => !subjects.includes(subject.id));
  
//   const handleAddSubject = () => {
//     if (selectedSubjectToAdd && !subjects.includes(selectedSubjectToAdd)) {
//       setSubjects([...subjects, selectedSubjectToAdd]);
//       setSelectedSubjectToAdd("");
//     } else if (selectedSubjectToAdd) {
//       alert("Subject already added to this semester!");
//     } else {
//       alert("Please select a subject to add");
//     }
//   };
  
//   const [selectedSubjectToAdd, setSelectedSubjectToAdd] = useState("");
  
//   const handleRemoveSubject = (subjectId) => {
//     if (confirm("Remove this subject from the semester?")) {
//       setSubjects(subjects.filter(id => id !== subjectId));
//       const newDefaultFaculty = { ...defaultFaculty };
//       delete newDefaultFaculty[subjectId];
//       setDefaultFaculty(newDefaultFaculty);
//     }
//   };
  
//   const handleSetDefaultFaculty = (subjectId, facultyId) => {
//     setDefaultFaculty({
//       ...defaultFaculty,
//       [subjectId]: parseInt(facultyId)
//     });
//   };
  
//   const handleSave = () => {
//     if (subjects.length === 0) {
//       alert("Please add at least one subject");
//       return;
//     }
    
//     const missingFaculty = subjects.filter(s => !defaultFaculty[s]);
//     if (missingFaculty.length > 0) {
//       alert(`Please assign default faculty for all subjects. Missing: ${missingFaculty.length} subject(s)`);
//       return;
//     }
    
//     AppState.updateSemesterDetails(selectedCourse, selectedSemester, {
//       subjects,
//       defaultFaculty
//     });
    
//     alert("Semester details saved successfully!");
//     window.dispatchEvent(new Event('storage'));
//   };
  
//   return (
//     <Card>
//       <Title level={4}>Step 1: Configure Semester Details</Title>
      
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16, marginBottom: 24 }}>
//         <Select
//           label="Course"
//           value={selectedCourse}
//           onChange={e => setSelectedCourse(e.target.value)}
//           options={COURSES.map(c => ({ value: c, label: c }))}
//         />
        
//         <Select
//           label="Semester"
//           value={selectedSemester}
//           onChange={e => setSelectedSemester(parseInt(e.target.value))}
//           options={SEMESTERS.map(s => ({ value: s, label: `Semester ${s}` }))}
//         />
//       </div>
      
//       {/* Add Subject Section */}
//       <div style={{ marginBottom: 24, padding: 16, background: C.cardHover, borderRadius: 12 }}>
//         <h5 style={{ color: C.text.secondary, fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
//           Add Subjects to Semester
//         </h5>
//         <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
//           <div style={{ flex: 1 }}>
//             <Select
//               label="Select Subject"
//               value={selectedSubjectToAdd}
//               onChange={e => setSelectedSubjectToAdd(e.target.value)}
//               options={[
//                 { value: "", label: "-- Select a subject --" },
//                 ...subjectsNotAdded.map(subject => ({ 
//                   value: subject.id, 
//                   label: `${subject.name} (${subject.code}) - ${subject.credits} credits, ${subject.totalWeeklyClasses} hrs/week` 
//                 }))
//               ]}
//             />
//           </div>
//           <Button 
//             onClick={handleAddSubject} 
//             variant="primary"
//             size="md"
//             disabled={!selectedSubjectToAdd}
//           >
//             + Add Subject
//           </Button>
//         </div>
//         {subjectsNotAdded.length === 0 && availableSubjects.length > 0 && (
//           <p style={{ color: C.accent.green, fontSize: 12, marginTop: 8 }}>
//             ✓ All available subjects have been added!
//           </p>
//         )}
//         {availableSubjects.length === 0 && (
//           <p style={{ color: C.accent.red, fontSize: 12, marginTop: 8 }}>
//             ⚠ No subjects available for {selectedCourse} Semester {selectedSemester}. 
//             Please ask the Director to add subjects first.
//           </p>
//         )}
//         {subjectsNotAdded.length > 0 && (
//           <p style={{ color: C.accent.blue, fontSize: 12, marginTop: 8 }}>
//             📚 {subjectsNotAdded.length} new subject(s) available to add
//           </p>
//         )}
//       </div>
      
//       {/* Selected Subjects List */}
//       <div>
//         <h5 style={{ color: C.text.secondary, fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
//           Selected Subjects ({subjects.length}) & Default Faculty
//         </h5>
//         {subjects.length === 0 ? (
//           <p style={{ color: C.text.tertiary, fontSize: 13, textAlign: "center", padding: "40px 0", background: C.cardHover, borderRadius: 12 }}>
//             No subjects selected yet. Use the form above to add subjects.
//           </p>
//         ) : (
//           subjects.map(subjectId => {
//             const subject = AppState.subjects.find(s => s.id === subjectId);
//             const facultyOptions = AppState.faculty.filter(f => f.course === selectedCourse);
            
//             return (
//               <div key={subjectId} style={{ marginBottom: 12, padding: 16, background: C.cardHover, borderRadius: 12, position: "relative" }}>
//                 <button 
//                   onClick={() => handleRemoveSubject(subjectId)}
//                   style={{
//                     position: "absolute",
//                     top: 12,
//                     right: 12,
//                     color: C.accent.red,
//                     background: "none",
//                     border: "none",
//                     cursor: "pointer",
//                     fontSize: 20,
//                     padding: "4px 8px",
//                     borderRadius: 20,
//                     transition: "all 0.2s",
//                   }}
//                   onMouseEnter={e => e.currentTarget.style.background = C.accent.redBg}
//                   onMouseLeave={e => e.currentTarget.style.background = "none"}
//                 >
//                   ✕
//                 </button>
                
//                 <div style={{ marginBottom: 12, paddingRight: 40 }}>
//                   <span style={{ color: C.text.primary, fontWeight: 600, fontSize: 16 }}>{subject?.name}</span>
//                   <div style={{ display: "flex", gap: 16, marginTop: 4, flexWrap: "wrap" }}>
//                     <span style={{ color: C.text.tertiary, fontSize: 12 }}>Code: {subject?.code}</span>
//                     <span style={{ color: C.text.tertiary, fontSize: 12 }}>Credits: {subject?.credits}</span>
//                     <span style={{ color: C.text.tertiary, fontSize: 12 }}>Type: {subject?.type}</span>
//                     <span style={{ color: C.accent.gold, fontSize: 12 }}>Hours/Week: {subject?.totalWeeklyClasses}</span>
//                   </div>
//                 </div>
                
//                 <Select
//                   label="Default Faculty"
//                   value={defaultFaculty[subjectId] || ""}
//                   onChange={e => handleSetDefaultFaculty(subjectId, e.target.value)}
//                   options={[
//                     { value: "", label: "Select Default Faculty" },
//                     ...facultyOptions.map(f => ({ 
//                       value: f.id, 
//                       label: `${f.name} (${f.designation}) - ${f.remainingHours} hrs available` 
//                     }))
//                   ]}
//                 />
//               </div>
//             );
//           })
//         )}
//       </div>
      
//       {subjects.length > 0 && (
//         <div style={{ marginTop: 20, padding: 16, background: C.accent.blueBg, borderRadius: 12 }}>
//           <h5 style={{ color: C.accent.blue, fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Summary</h5>
//           <p style={{ color: C.text.secondary, fontSize: 13 }}>
//             <strong>Total Subjects:</strong> {subjects.length}<br />
//             <strong>Total Weekly Classes:</strong> {subjects.reduce((total, subjectId) => {
//               const subject = AppState.subjects.find(s => s.id === subjectId);
//               return total + (subject?.totalWeeklyClasses || 0);
//             }, 0)} hours per section<br />
//             <strong>Faculty Assignments:</strong> {Object.keys(defaultFaculty).length}/{subjects.length} assigned
//           </p>
//         </div>
//       )}
      
//       <Button
//         onClick={handleSave}
//         variant="success"
//         fullWidth
//         size="lg"
//         style={{ marginTop: 20 }}
//         disabled={subjects.length === 0}
//       >
//         Save Semester Details
//       </Button>
//     </Card>
//   );
// }

// src/components/coordinator/CoordinatorSemesterDetailsForm.jsx
import { useState, useEffect } from "react";
import { Card, Title, Button, Select } from "../common";
import { AppState } from "../../AppState";
import { COURSES, SEMESTERS } from "../../data/mockData";
import { C } from "../../styles/theme";

export function CoordinatorSemesterDetailsForm() {
  const [selectedCourse, setSelectedCourse] = useState("BTech");
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [subjects, setSubjects] = useState([]);
  const [defaultFaculty, setDefaultFaculty] = useState({});
  const [refresh, setRefresh] = useState(0);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [selectedSubjectToAdd, setSelectedSubjectToAdd] = useState("");
  
  useEffect(() => {
    const handleStorageChange = () => {
      loadAvailableSubjects();
      loadExistingData();
      setRefresh(r => r + 1);
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  useEffect(() => {
    loadAvailableSubjects();
    loadExistingData();
  }, [selectedCourse, selectedSemester, refresh]);
  
  const loadAvailableSubjects = () => {
    // Only show subjects that are approved by Dean
    const subjectsForCourse = AppState.subjects.filter(s => 
      s.course === selectedCourse && 
      s.semester === selectedSemester &&
      s.approvalStatus === "approved"
    );
    setAvailableSubjects(subjectsForCourse);
  };
  
  const loadExistingData = () => {
    const existing = AppState.semesterDetails[selectedCourse]?.[selectedSemester];
    if (existing) {
      setSubjects(existing.subjects || []);
      setDefaultFaculty(existing.defaultFaculty || {});
    } else {
      setSubjects([]);
      setDefaultFaculty({});
    }
  };
  
  const subjectsNotAdded = availableSubjects.filter(subject => !subjects.includes(subject.id));
  
  const handleAddSubject = () => {
    if (selectedSubjectToAdd && !subjects.includes(selectedSubjectToAdd)) {
      setSubjects([...subjects, selectedSubjectToAdd]);
      setSelectedSubjectToAdd("");
    } else if (selectedSubjectToAdd) {
      alert("Subject already added to this semester!");
    } else {
      alert("Please select a subject to add");
    }
  };
  
  const handleRemoveSubject = (subjectId) => {
    if (confirm("Remove this subject from the semester?")) {
      setSubjects(subjects.filter(id => id !== subjectId));
      const newDefaultFaculty = { ...defaultFaculty };
      delete newDefaultFaculty[subjectId];
      setDefaultFaculty(newDefaultFaculty);
    }
  };
  
  const handleSetDefaultFaculty = (subjectId, facultyId) => {
    setDefaultFaculty({
      ...defaultFaculty,
      [subjectId]: parseInt(facultyId)
    });
  };
  
  const handleSave = () => {
    if (subjects.length === 0) {
      alert("Please add at least one subject");
      return;
    }
    
    const missingFaculty = subjects.filter(s => !defaultFaculty[s]);
    if (missingFaculty.length > 0) {
      alert(`Please assign default faculty for all subjects. Missing: ${missingFaculty.length} subject(s)`);
      return;
    }
    
    AppState.updateSemesterDetails(selectedCourse, selectedSemester, {
      subjects,
      defaultFaculty
    });
    
    alert("Semester details saved successfully!");
    window.dispatchEvent(new Event('storage'));
  };
  
  return (
    <Card>
      <Title level={4}>Configure Semester Details</Title>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16, marginBottom: 24 }}>
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
      </div>
      
      <div style={{ marginBottom: 24, padding: 16, background: C.cardHover, borderRadius: 12 }}>
        <h5 style={{ color: C.text.secondary, fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
          Add Subjects to Semester
        </h5>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
          <div style={{ flex: 1 }}>
            <Select
              label="Select Subject"
              value={selectedSubjectToAdd}
              onChange={e => setSelectedSubjectToAdd(e.target.value)}
              options={[
                { value: "", label: "-- Select a subject --" },
                ...subjectsNotAdded.map(subject => ({ 
                  value: subject.id, 
                  label: `${subject.name} (${subject.code}) - ${subject.credits} credits, ${subject.totalWeeklyClasses} hrs/week` 
                }))
              ]}
            />
          </div>
          <Button 
            onClick={handleAddSubject} 
            variant="primary"
            size="md"
            disabled={!selectedSubjectToAdd}
          >
            + Add Subject
          </Button>
        </div>
        {subjectsNotAdded.length === 0 && availableSubjects.length > 0 && (
          <p style={{ color: C.accent.green, fontSize: 12, marginTop: 8 }}>
            ✓ All available subjects have been added!
          </p>
        )}
        {availableSubjects.length === 0 && (
          <p style={{ color: C.accent.red, fontSize: 12, marginTop: 8 }}>
            ⚠ No approved subjects available for {selectedCourse} Semester {selectedSemester}. 
            Please ask the Director to add subjects and Dean to approve them.
          </p>
        )}
        {subjectsNotAdded.length > 0 && (
          <p style={{ color: C.accent.blue, fontSize: 12, marginTop: 8 }}>
            📚 {subjectsNotAdded.length} new subject(s) available to add
          </p>
        )}
      </div>
      
      <div>
        <h5 style={{ color: C.text.secondary, fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
          Selected Subjects ({subjects.length}) & Default Faculty
        </h5>
        {subjects.length === 0 ? (
          <p style={{ color: C.text.tertiary, fontSize: 13, textAlign: "center", padding: "40px 0", background: C.cardHover, borderRadius: 12 }}>
            No subjects selected yet. Use the form above to add subjects.
          </p>
        ) : (
          subjects.map(subjectId => {
            const subject = AppState.subjects.find(s => s.id === subjectId);
            const facultyOptions = AppState.faculty.filter(f => f.course === selectedCourse);
            
            return (
              <div key={subjectId} style={{ marginBottom: 12, padding: 16, background: C.cardHover, borderRadius: 12, position: "relative" }}>
                <button 
                  onClick={() => handleRemoveSubject(subjectId)}
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    color: C.accent.red,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 20,
                    padding: "4px 8px",
                    borderRadius: 20,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = C.accent.redBg}
                  onMouseLeave={e => e.currentTarget.style.background = "none"}
                >
                  ✕
                </button>
                
                <div style={{ marginBottom: 12, paddingRight: 40 }}>
                  <span style={{ color: C.text.primary, fontWeight: 600, fontSize: 16 }}>{subject?.name}</span>
                  <div style={{ display: "flex", gap: 16, marginTop: 4, flexWrap: "wrap" }}>
                    <span style={{ color: C.text.tertiary, fontSize: 12 }}>Code: {subject?.code}</span>
                    <span style={{ color: C.text.tertiary, fontSize: 12 }}>Credits: {subject?.credits}</span>
                    <span style={{ color: C.text.tertiary, fontSize: 12 }}>Type: {subject?.type}</span>
                    <span style={{ color: C.accent.gold, fontSize: 12 }}>Hours/Week: {subject?.totalWeeklyClasses}</span>
                  </div>
                </div>
                
                <Select
                  label="Default Faculty"
                  value={defaultFaculty[subjectId] || ""}
                  onChange={e => handleSetDefaultFaculty(subjectId, e.target.value)}
                  options={[
                    { value: "", label: "Select Default Faculty" },
                    ...facultyOptions.map(f => ({ 
                      value: f.id, 
                      label: `${f.name} (${f.designation}) - ${f.remainingHours} hrs available` 
                    }))
                  ]}
                />
              </div>
            );
          })
        )}
      </div>
      
      {subjects.length > 0 && (
        <div style={{ marginTop: 20, padding: 16, background: C.accent.blueBg, borderRadius: 12 }}>
          <h5 style={{ color: C.accent.blue, fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Summary</h5>
          <p style={{ color: C.text.secondary, fontSize: 13 }}>
            <strong>Total Subjects:</strong> {subjects.length}<br />
            <strong>Total Weekly Classes:</strong> {subjects.reduce((total, subjectId) => {
              const subject = AppState.subjects.find(s => s.id === subjectId);
              return total + (subject?.totalWeeklyClasses || 0);
            }, 0)} hours per section<br />
            <strong>Faculty Assignments:</strong> {Object.keys(defaultFaculty).length}/{subjects.length} assigned
          </p>
        </div>
      )}
      
      <Button
        onClick={handleSave}
        variant="success"
        fullWidth
        size="lg"
        style={{ marginTop: 20 }}
        disabled={subjects.length === 0}
      >
        Save Semester Details
      </Button>
    </Card>
  );
}