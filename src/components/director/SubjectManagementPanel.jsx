// // // src/components/director/SubjectManagementPanel.jsx
// // import { useState } from "react";
// // import { Card, Title, Button, Input, Select } from "../common";
// // import { AppState } from "../../AppState";
// // import { saveToStorage, STORAGE_KEYS } from "../../utils/storage";
// // import { COURSES, SEMESTERS } from "../../data/mockData";
// // import { C } from "../../styles/theme";

// // export function SubjectManagementPanel({ onRefresh }) {
// //   const [subjects, setSubjects] = useState(() => [...AppState.subjects]);
// //   const [editingSubject, setEditingSubject] = useState(null);
// //   const [formData, setFormData] = useState({
// //     id: "", 
// //     code: "", 
// //     name: "", 
// //     dept: "CSE", 
// //     course: "BTech", 
// //     semester: 1,
// //     credits: 3, 
// //     modules: 4, 
// //     type: "Theory", 
// //     theoryCredits: 3, 
// //     labCredits: 0,
// //     theoryClassesPerWeek: 3, 
// //     labPeriodsPerWeek: 0, 
// //     totalWeeklyClasses: 3,
// //   });

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
    
// //     if (name === "type") {
// //       if (value === "Theory") {
// //         setFormData(prev => ({ 
// //           ...prev, 
// //           type: value, 
// //           labCredits: 0, 
// //           labPeriodsPerWeek: 0, 
// //           theoryCredits: prev.credits 
// //         }));
// //       } else if (value === "Lab") {
// //         setFormData(prev => ({ 
// //           ...prev, 
// //           type: value, 
// //           theoryCredits: 0, 
// //           theoryClassesPerWeek: 0, 
// //           labCredits: prev.credits 
// //         }));
// //       } else {
// //         setFormData(prev => ({ ...prev, type: value }));
// //       }
// //     } else if (name === "credits") {
// //       const num = parseInt(value) || 0;
// //       setFormData(prev => ({ 
// //         ...prev, 
// //         credits: num, 
// //         theoryCredits: prev.type === "Theory" ? num : (prev.type === "Both" ? num - 1 : 0), 
// //         labCredits: prev.type === "Lab" ? num : (prev.type === "Both" ? 1 : 0) 
// //       }));
// //     } else {
// //       setFormData(prev => ({ 
// //         ...prev, 
// //         [name]: name === "semester" || name === "credits" || name === "modules" || name === "theoryClassesPerWeek" || name === "labPeriodsPerWeek" 
// //           ? (parseInt(value) || 0) 
// //           : value 
// //       }));
// //     }
// //   };

// //   const calculateTotalClasses = () => {
// //     return (parseInt(formData.theoryClassesPerWeek) || 0) + (parseInt(formData.labPeriodsPerWeek) || 0);
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
    
// //     // Validate required fields
// //     if (!formData.code || !formData.name) {
// //       alert("Please fill in subject code and name");
// //       return;
// //     }
    
// //     const totalClasses = calculateTotalClasses();
// //     const newSubject = {
// //       id: formData.id || `SUB${Date.now()}`,
// //       code: formData.code,
// //       name: formData.name,
// //       dept: formData.dept,
// //       course: formData.course,
// //       semester: parseInt(formData.semester),
// //       credits: parseInt(formData.credits),
// //       modules: parseInt(formData.modules),
// //       type: formData.type,
// //       theoryCredits: parseInt(formData.theoryCredits) || 0,
// //       labCredits: parseInt(formData.labCredits) || 0,
// //       theoryClassesPerWeek: parseInt(formData.theoryClassesPerWeek) || 0,
// //       labPeriodsPerWeek: parseInt(formData.labPeriodsPerWeek) || 0,
// //       totalWeeklyClasses: totalClasses,
// //     };
    
// //     let newSubjects;
// //     if (editingSubject) {
// //       const index = subjects.findIndex(s => s.id === editingSubject.id);
// //       newSubjects = [...subjects];
// //       newSubjects[index] = newSubject;
// //       alert("Subject updated successfully!");
// //     } else {
// //       // Check if subject code already exists
// //       if (subjects.some(s => s.code === formData.code)) {
// //         alert("Subject code already exists!");
// //         return;
// //       }
// //       newSubjects = [...subjects, newSubject];
// //       alert("Subject added successfully!");
// //     }
    
// //     setSubjects(newSubjects);
// //     AppState.subjects = newSubjects;
// //     saveToStorage(STORAGE_KEYS.SUBJECTS, newSubjects);
// //     resetForm();
// //     if (onRefresh) onRefresh();
// //   };

// //   const resetForm = () => {
// //     setEditingSubject(null);
// //     setFormData({
// //       id: "", 
// //       code: "", 
// //       name: "", 
// //       dept: "CSE", 
// //       course: "BTech", 
// //       semester: 1,
// //       credits: 3, 
// //       modules: 4, 
// //       type: "Theory", 
// //       theoryCredits: 3, 
// //       labCredits: 0,
// //       theoryClassesPerWeek: 3, 
// //       labPeriodsPerWeek: 0, 
// //       totalWeeklyClasses: 3,
// //     });
// //   };

// //   const editSubject = (subject) => {
// //     setEditingSubject(subject);
// //     setFormData({
// //       id: subject.id,
// //       code: subject.code,
// //       name: subject.name,
// //       dept: subject.dept || "CSE",
// //       course: subject.course,
// //       semester: subject.semester,
// //       credits: subject.credits,
// //       modules: subject.modules,
// //       type: subject.type,
// //       theoryCredits: subject.theoryCredits || 0,
// //       labCredits: subject.labCredits || 0,
// //       theoryClassesPerWeek: subject.theoryClassesPerWeek || 0,
// //       labPeriodsPerWeek: subject.labPeriodsPerWeek || 0,
// //       totalWeeklyClasses: subject.totalWeeklyClasses || 0,
// //     });
// //   };

// //   const deleteSubject = (id) => {
// //     if (confirm("Delete subject? This will also remove it from all semester details.")) {
// //       const newSubjects = subjects.filter(s => s.id !== id);
// //       setSubjects(newSubjects);
// //       AppState.subjects = newSubjects;
// //       saveToStorage(STORAGE_KEYS.SUBJECTS, newSubjects);
      
// //       // Also remove from semester details
// //       for (let course in AppState.semesterDetails) {
// //         for (let sem in AppState.semesterDetails[course]) {
// //           if (AppState.semesterDetails[course][sem].subjects && 
// //               AppState.semesterDetails[course][sem].subjects.includes(id)) {
// //             AppState.semesterDetails[course][sem].subjects = 
// //               AppState.semesterDetails[course][sem].subjects.filter(s => s !== id);
// //             if (AppState.semesterDetails[course][sem].defaultFaculty && 
// //                 AppState.semesterDetails[course][sem].defaultFaculty[id]) {
// //               delete AppState.semesterDetails[course][sem].defaultFaculty[id];
// //             }
// //           }
// //         }
// //       }
// //       saveToStorage(STORAGE_KEYS.SEMESTER_DETAILS, AppState.semesterDetails);
      
// //       alert("Subject deleted successfully!");
// //       if (onRefresh) onRefresh();
// //     }
// //   };

// //   return (
// //     <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
// //       <Title>Subject Management</Title>
      
// //       {/* Add/Edit Subject Form */}
// //       <Card>
// //         <Title level={4}>{editingSubject ? "Edit Subject" : "Add New Subject"}</Title>
// //         <form onSubmit={handleSubmit}>
// //           <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
// //             <Input 
// //               label="Subject Code" 
// //               name="code" 
// //               value={formData.code} 
// //               onChange={handleInputChange} 
// //               placeholder="e.g., CS101"
// //               required 
// //             />
// //             <Input 
// //               label="Subject Name" 
// //               name="name" 
// //               value={formData.name} 
// //               onChange={handleInputChange} 
// //               placeholder="e.g., Data Structures"
// //               required 
// //             />
// //             <Select 
// //               label="Course" 
// //               name="course" 
// //               value={formData.course} 
// //               onChange={handleInputChange} 
// //               options={COURSES.map(c => ({ value: c, label: c }))} 
// //             />
// //             <Select 
// //               label="Semester" 
// //               name="semester" 
// //               value={formData.semester} 
// //               onChange={handleInputChange} 
// //               options={SEMESTERS.map(s => ({ value: s, label: `Semester ${s}` }))} 
// //             />
// //             <Input 
// //               label="Credits" 
// //               name="credits" 
// //               type="number" 
// //               min="1" 
// //               max="6"
// //               value={formData.credits} 
// //               onChange={handleInputChange} 
// //               required 
// //             />
// //             <Input 
// //               label="Modules" 
// //               name="modules" 
// //               type="number" 
// //               min="1" 
// //               max="10"
// //               value={formData.modules} 
// //               onChange={handleInputChange} 
// //               required 
// //             />
// //             <Select 
// //               label="Type" 
// //               name="type" 
// //               value={formData.type} 
// //               onChange={handleInputChange} 
// //               options={[
// //                 { value: "Theory", label: "Theory Only" }, 
// //                 { value: "Lab", label: "Lab Only" }, 
// //                 { value: "Both", label: "Both Theory & Lab" }
// //               ]} 
// //             />
// //             {formData.type !== "Lab" && (
// //               <Input 
// //                 label="Theory Classes/Week" 
// //                 name="theoryClassesPerWeek" 
// //                 type="number" 
// //                 min="0" 
// //                 max="6"
// //                 value={formData.theoryClassesPerWeek} 
// //                 onChange={handleInputChange} 
// //               />
// //             )}
// //             {formData.type !== "Theory" && (
// //               <Input 
// //                 label="Lab Periods/Week" 
// //                 name="labPeriodsPerWeek" 
// //                 type="number" 
// //                 min="0" 
// //                 max="8"
// //                 value={formData.labPeriodsPerWeek} 
// //                 onChange={handleInputChange} 
// //               />
// //             )}
// //           </div>
          
// //           <div style={{ marginTop: 20, padding: 12, background: C.cardHover, borderRadius: 8 }}>
// //             <p style={{ color: C.accent.blue, fontSize: 13 }}>
// //               Total Weekly Classes: <strong>{calculateTotalClasses()}</strong>
// //             </p>
// //           </div>
          
// //           <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
// //             <Button type="submit" variant="success">
// //               {editingSubject ? "Update Subject" : "Add Subject"}
// //             </Button>
// //             {editingSubject && (
// //               <Button onClick={resetForm} variant="secondary">
// //                 Cancel Edit
// //               </Button>
// //             )}
// //           </div>
// //         </form>
// //       </Card>

// //       {/* Existing Subjects List */}
// //       <Card>
// //         <Title level={4}>Existing Subjects ({subjects.length})</Title>
// //         <div style={{ overflowX: "auto", maxHeight: 500, overflowY: "auto" }}>
// //           <table style={{ width: "100%", borderCollapse: "collapse" }}>
// //             <thead style={{ position: "sticky", top: 0, background: C.surface }}>
// //               <tr>
// //                 <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Code</th>
// //                 <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Name</th>
// //                 <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Course</th>
// //                 <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Sem</th>
// //                 <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Type</th>
// //                 <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Credits</th>
// //                 <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Weekly Hours</th>
// //                 <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {subjects.map(sub => (
// //                 <tr key={sub.id} style={{ borderBottom: `1px solid ${C.border}` }}>
// //                   <td style={{ padding: 12, color: C.accent.blue, fontWeight: 500 }}>{sub.code}</td>
// //                   <td style={{ padding: 12, color: C.text.primary }}>{sub.name}</td>
// //                   <td style={{ padding: 12, color: C.text.secondary }}>{sub.course}</td>
// //                   <td style={{ padding: 12, color: C.text.secondary }}>{sub.semester}</td>
// //                   <td style={{ padding: 12 }}>
// //                     <span style={{
// //                       padding: "2px 8px",
// //                       borderRadius: 12,
// //                       fontSize: 11,
// //                       background: sub.type === "Theory" ? C.accent.blueBg : sub.type === "Lab" ? C.accent.greenBg : C.accent.purpleBg,
// //                       color: sub.type === "Theory" ? C.accent.blue : sub.type === "Lab" ? C.accent.green : C.accent.purple,
// //                     }}>
// //                       {sub.type}
// //                     </span>
// //                   </td>
// //                   <td style={{ padding: 12, color: C.text.secondary }}>{sub.credits}</td>
// //                   <td style={{ padding: 12, color: C.accent.gold, fontWeight: 500 }}>{sub.totalWeeklyClasses}h</td>
// //                   <td style={{ padding: 12 }}>
// //                     <button 
// //                       onClick={() => editSubject(sub)} 
// //                       style={{ 
// //                         marginRight: 8, 
// //                         background: C.accent.blue, 
// //                         color: "white", 
// //                         border: "none", 
// //                         borderRadius: 6, 
// //                         padding: "6px 12px", 
// //                         cursor: "pointer",
// //                         fontSize: 12
// //                       }}
// //                     >
// //                       Edit
// //                     </button>
// //                     <button 
// //                       onClick={() => deleteSubject(sub.id)} 
// //                       style={{ 
// //                         background: C.accent.red, 
// //                         color: "white", 
// //                         border: "none", 
// //                         borderRadius: 6, 
// //                         padding: "6px 12px", 
// //                         cursor: "pointer",
// //                         fontSize: 12
// //                       }}
// //                     >
// //                       Delete
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //           {subjects.length === 0 && (
// //             <p style={{ textAlign: "center", padding: 40, color: C.text.tertiary }}>
// //               No subjects added yet. Use the form above to add your first subject.
// //             </p>
// //           )}
// //         </div>
// //       </Card>
// //     </div>
// //   );
// // }

// // src/components/director/SubjectManagementPanel.jsx
// import { useState, useEffect } from "react";
// import { Card, Title, Button, Input, Select } from "../common";
// import { AppState } from "../../AppState";
// import { saveToStorage, STORAGE_KEYS } from "../../utils/storage";
// import { COURSES, SEMESTERS } from "../../data/mockData";
// import { C } from "../../styles/theme";

// export function SubjectManagementPanel({ onRefresh }) {
//   const [subjects, setSubjects] = useState([]);
//   const [editingSubject, setEditingSubject] = useState(null);
//   const [formData, setFormData] = useState({
//     code: "",
//     name: "",
//     course: "BTech",
//     semester: 1,
//     credits: 3,
//     modules: 4,
//     type: "Theory",
//     theoryClassesPerWeek: 3,
//     labPeriodsPerWeek: 0,
//   });

//   // Load subjects on mount and listen for changes
//   useEffect(() => {
//     loadSubjects();
    
//     // Listen for storage changes from other tabs/windows
//     const handleStorageChange = () => {
//       loadSubjects();
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   const loadSubjects = () => {
//     const savedSubjects = loadFromStorage(STORAGE_KEYS.SUBJECTS, []);
//     setSubjects(savedSubjects);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const calculateTotalClasses = () => {
//     const theory = parseInt(formData.theoryClassesPerWeek) || 0;
//     const lab = parseInt(formData.labPeriodsPerWeek) || 0;
//     return theory + lab;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Validation
//     if (!formData.code.trim()) {
//       alert("Please enter subject code");
//       return;
//     }
//     if (!formData.name.trim()) {
//       alert("Please enter subject name");
//       return;
//     }
    
//     const totalClasses = calculateTotalClasses();
    
//     const newSubject = {
//       id: editingSubject ? editingSubject.id : `SUB${Date.now()}`,
//       code: formData.code.toUpperCase(),
//       name: formData.name,
//       course: formData.course,
//       semester: parseInt(formData.semester),
//       credits: parseInt(formData.credits),
//       modules: parseInt(formData.modules),
//       type: formData.type,
//       theoryClassesPerWeek: parseInt(formData.theoryClassesPerWeek) || 0,
//       labPeriodsPerWeek: parseInt(formData.labPeriodsPerWeek) || 0,
//       totalWeeklyClasses: totalClasses,
//     };
    
//     let updatedSubjects;
//     if (editingSubject) {
//       updatedSubjects = subjects.map(s => 
//         s.id === editingSubject.id ? newSubject : s
//       );
//       alert("Subject updated successfully!");
//     } else {
//       if (subjects.some(s => s.code === formData.code.toUpperCase())) {
//         alert("Subject code already exists!");
//         return;
//       }
//       updatedSubjects = [...subjects, newSubject];
//       alert("Subject added successfully!");
//     }
    
//     setSubjects(updatedSubjects);
//     AppState.subjects = updatedSubjects;
//     saveToStorage(STORAGE_KEYS.SUBJECTS, updatedSubjects);
    
//     // CRITICAL: Dispatch storage event to notify all components
//     window.dispatchEvent(new Event('storage'));
    
//     // Reset form
//     setEditingSubject(null);
//     setFormData({
//       code: "",
//       name: "",
//       course: "BTech",
//       semester: 1,
//       credits: 3,
//       modules: 4,
//       type: "Theory",
//       theoryClassesPerWeek: 3,
//       labPeriodsPerWeek: 0,
//     });
    
//     if (onRefresh) onRefresh();
//   };

//   const handleEdit = (subject) => {
//     setEditingSubject(subject);
//     setFormData({
//       code: subject.code,
//       name: subject.name,
//       course: subject.course,
//       semester: subject.semester,
//       credits: subject.credits,
//       modules: subject.modules,
//       type: subject.type,
//       theoryClassesPerWeek: subject.theoryClassesPerWeek,
//       labPeriodsPerWeek: subject.labPeriodsPerWeek,
//     });
//   };

//   const handleDelete = (id) => {
//     if (confirm("Are you sure you want to delete this subject?")) {
//       const updatedSubjects = subjects.filter(s => s.id !== id);
//       setSubjects(updatedSubjects);
//       AppState.subjects = updatedSubjects;
//       saveToStorage(STORAGE_KEYS.SUBJECTS, updatedSubjects);
      
//       // CRITICAL: Dispatch storage event to notify all components
//       window.dispatchEvent(new Event('storage'));
      
//       alert("Subject deleted successfully!");
//       if (onRefresh) onRefresh();
//     }
//   };

//   const handleCancel = () => {
//     setEditingSubject(null);
//     setFormData({
//       code: "",
//       name: "",
//       course: "BTech",
//       semester: 1,
//       credits: 3,
//       modules: 4,
//       type: "Theory",
//       theoryClassesPerWeek: 3,
//       labPeriodsPerWeek: 0,
//     });
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//       <Title>Subject Management</Title>
      
//       <Card>
//         <Title level={4}>{editingSubject ? "Edit Subject" : "Add New Subject"}</Title>
//         <form onSubmit={handleSubmit}>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
//             <Input 
//               label="Subject Code" 
//               name="code" 
//               value={formData.code} 
//               onChange={handleInputChange} 
//               placeholder="e.g., CS101"
//               required 
//             />
//             <Input 
//               label="Subject Name" 
//               name="name" 
//               value={formData.name} 
//               onChange={handleInputChange} 
//               placeholder="e.g., Data Structures"
//               required 
//             />
//             <Select 
//               label="Course" 
//               name="course" 
//               value={formData.course} 
//               onChange={handleInputChange} 
//               options={COURSES.map(c => ({ value: c, label: c }))} 
//             />
//             <Select 
//               label="Semester" 
//               name="semester" 
//               value={formData.semester} 
//               onChange={handleInputChange} 
//               options={SEMESTERS.map(s => ({ value: s, label: `Semester ${s}` }))} 
//             />
//             <Input 
//               label="Credits" 
//               name="credits" 
//               type="number" 
//               min="1" 
//               max="6"
//               value={formData.credits} 
//               onChange={handleInputChange} 
//               required 
//             />
//             <Input 
//               label="Number of Modules" 
//               name="modules" 
//               type="number" 
//               min="1" 
//               max="10"
//               value={formData.modules} 
//               onChange={handleInputChange} 
//               required 
//             />
//             <Select 
//               label="Subject Type" 
//               name="type" 
//               value={formData.type} 
//               onChange={handleInputChange} 
//               options={[
//                 { value: "Theory", label: "Theory Only" }, 
//                 { value: "Lab", label: "Lab Only" }, 
//                 { value: "Both", label: "Both Theory & Lab" }
//               ]} 
//             />
//             {formData.type !== "Lab" && (
//               <Input 
//                 label="Theory Classes per Week" 
//                 name="theoryClassesPerWeek" 
//                 type="number" 
//                 min="0" 
//                 max="6"
//                 value={formData.theoryClassesPerWeek} 
//                 onChange={handleInputChange} 
//               />
//             )}
//             {formData.type !== "Theory" && (
//               <Input 
//                 label="Lab Periods per Week" 
//                 name="labPeriodsPerWeek" 
//                 type="number" 
//                 min="0" 
//                 max="8"
//                 value={formData.labPeriodsPerWeek} 
//                 onChange={handleInputChange} 
//               />
//             )}
//           </div>
          
//           <div style={{ marginTop: 20, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//             <p style={{ color: C.accent.blue, fontSize: 14 }}>
//               <strong>Total Weekly Classes:</strong> {calculateTotalClasses()} hours per week
//             </p>
//           </div>
          
//           <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
//             <Button type="submit" variant="success">
//               {editingSubject ? "Update Subject" : "Add Subject"}
//             </Button>
//             {editingSubject && (
//               <Button type="button" onClick={handleCancel} variant="secondary">
//                 Cancel
//               </Button>
//             )}
//           </div>
//         </form>
//       </Card>

//       <Card>
//         <Title level={4}>Existing Subjects ({subjects.length})</Title>
//         <div style={{ overflowX: "auto", maxHeight: 500, overflowY: "auto" }}>
//           <table style={{ width: "100%", borderCollapse: "collapse" }}>
//             <thead style={{ position: "sticky", top: 0, background: C.surface, zIndex: 1 }}>
//               <tr>
//                 <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Code</th>
//                 <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Name</th>
//                 <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Course</th>
//                 <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Sem</th>
//                 <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Type</th>
//                 <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Credits</th>
//                 <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Weekly Hours</th>
//                 <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {subjects.map(sub => (
//                 <tr key={sub.id} style={{ borderBottom: `1px solid ${C.border}` }}>
//                   <td style={{ padding: 12, color: C.accent.blue, fontWeight: 500 }}>{sub.code}</td>
//                   <td style={{ padding: 12, color: C.text.primary }}>{sub.name}</td>
//                   <td style={{ padding: 12, color: C.text.secondary }}>{sub.course}</td>
//                   <td style={{ padding: 12, color: C.text.secondary }}>{sub.semester}</td>
//                   <td style={{ padding: 12 }}>
//                     <span style={{
//                       padding: "4px 10px",
//                       borderRadius: 12,
//                       fontSize: 11,
//                       fontWeight: 500,
//                       background: sub.type === "Theory" ? C.accent.blueBg : sub.type === "Lab" ? C.accent.greenBg : C.accent.purpleBg,
//                       color: sub.type === "Theory" ? C.accent.blue : sub.type === "Lab" ? C.accent.green : C.accent.purple,
//                     }}>
//                       {sub.type}
//                     </span>
//                    </td>
//                   <td style={{ padding: 12, color: C.text.secondary }}>{sub.credits}</td>
//                   <td style={{ padding: 12, color: C.accent.gold, fontWeight: 500 }}>{sub.totalWeeklyClasses}h</td>
//                   <td style={{ padding: 12 }}>
//                     <button 
//                       onClick={() => handleEdit(sub)} 
//                       style={{ 
//                         marginRight: 8, 
//                         background: C.accent.blue, 
//                         color: "white", 
//                         border: "none", 
//                         borderRadius: 6, 
//                         padding: "6px 12px", 
//                         cursor: "pointer",
//                         fontSize: 12
//                       }}
//                     >
//                       Edit
//                     </button>
//                     <button 
//                       onClick={() => handleDelete(sub.id)} 
//                       style={{ 
//                         background: C.accent.red, 
//                         color: "white", 
//                         border: "none", 
//                         borderRadius: 6, 
//                         padding: "6px 12px", 
//                         cursor: "pointer",
//                         fontSize: 12
//                       }}
//                     >
//                       Delete
//                     </button>
//                    </td>
//                  </tr>
//               ))}
//             </tbody>
//           </table>
//           {subjects.length === 0 && (
//             <p style={{ textAlign: "center", padding: 40, color: C.text.tertiary }}>
//               No subjects added yet. Use the form above to add your first subject.
//             </p>
//           )}
//         </div>
//       </Card>
//     </div>
//   );
// }

// // Helper function to load from storage
// function loadFromStorage(key, defaultValue) {
//   try {
//     const stored = localStorage.getItem(key);
//     return stored ? JSON.parse(stored) : defaultValue;
//   } catch (error) {
//     console.error('Error loading from localStorage:', error);
//     return defaultValue;
//   }
// }

// // src/components/director/SubjectManagementPanel.jsx
// import { useState, useEffect } from "react";
// import { Card, Title, Button, Input, Select, Badge } from "../common";
// import { AppState } from "../../AppState";
// import { saveToStorage, STORAGE_KEYS } from "../../utils/storage";
// import { COURSES, SEMESTERS, EXAM_TYPES, SUBJECT_TYPES } from "../../data/mockData";
// import { C } from "../../styles/theme";

// export function SubjectManagementPanel({ onRefresh }) {
//   const [subjects, setSubjects] = useState([]);
//   const [editingSubject, setEditingSubject] = useState(null);
//   const [selectedRejectedSubject, setSelectedRejectedSubject] = useState(null);
//   const [formData, setFormData] = useState({
//     code: "",
//     name: "",
//     course: "BTech",
//     semester: 1,
//     credits: 3,
//     modules: 4,
//     type: "Theory",
//     theoryClassesPerWeek: 3,
//     labPeriodsPerWeek: 0,
//     examType: "SEE",
//     subjectType: "Core"
//   });

//   useEffect(() => {
//     loadSubjects();
    
//     const handleStorageChange = () => {
//       loadSubjects();
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   const loadSubjects = () => {
//     const savedSubjects = loadFromStorage(STORAGE_KEYS.SUBJECTS, []);
//     setSubjects(savedSubjects);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const calculateTotalClasses = () => {
//     const theory = parseInt(formData.theoryClassesPerWeek) || 0;
//     const lab = parseInt(formData.labPeriodsPerWeek) || 0;
//     return theory + lab;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (!formData.code.trim()) {
//       alert("Please enter subject code");
//       return;
//     }
//     if (!formData.name.trim()) {
//       alert("Please enter subject name");
//       return;
//     }
    
//     const totalClasses = calculateTotalClasses();
    
//     const newSubject = {
//       id: editingSubject ? editingSubject.id : `SUB${Date.now()}`,
//       code: formData.code.toUpperCase(),
//       name: formData.name,
//       course: formData.course,
//       semester: parseInt(formData.semester),
//       credits: parseInt(formData.credits),
//       modules: parseInt(formData.modules),
//       type: formData.type,
//       theoryClassesPerWeek: parseInt(formData.theoryClassesPerWeek) || 0,
//       labPeriodsPerWeek: parseInt(formData.labPeriodsPerWeek) || 0,
//       totalWeeklyClasses: totalClasses,
//       examType: formData.examType,
//       subjectType: formData.subjectType,
//       approvalStatus: editingSubject && editingSubject.approvalStatus === "rejected" ? "pending" : (editingSubject ? editingSubject.approvalStatus : "pending"),
//       createdBy: "director",
//       createdDate: editingSubject ? editingSubject.createdDate : new Date().toISOString(),
//       rejectionReason: null,
//       rejectedBy: null,
//       rejectedDate: null
//     };
    
//     let updatedSubjects;
//     let alertMessage = "";
    
//     if (editingSubject) {
//       updatedSubjects = subjects.map(s => 
//         s.id === editingSubject.id ? newSubject : s
//       );
      
//       if (editingSubject.approvalStatus === "rejected") {
//         alertMessage = `Subject "${formData.name}" has been resubmitted for Dean approval!`;
//       } else {
//         alertMessage = "Subject updated successfully!";
//       }
//       alert(alertMessage);
//     } else {
//       if (subjects.some(s => s.code === formData.code.toUpperCase())) {
//         alert("Subject code already exists!");
//         return;
//       }
//       updatedSubjects = [...subjects, newSubject];
//       alert(`Subject "${formData.name}" added and sent for Dean approval!`);
//     }
    
//     setSubjects(updatedSubjects);
//     AppState.subjects = updatedSubjects;
//     saveToStorage(STORAGE_KEYS.SUBJECTS, updatedSubjects);
    
//     window.dispatchEvent(new Event('storage'));
    
//     setEditingSubject(null);
//     setFormData({
//       code: "",
//       name: "",
//       course: "BTech",
//       semester: 1,
//       credits: 3,
//       modules: 4,
//       type: "Theory",
//       theoryClassesPerWeek: 3,
//       labPeriodsPerWeek: 0,
//       examType: "SEE",
//       subjectType: "Core"
//     });
    
//     if (onRefresh) onRefresh();
//   };

//   const handleEdit = (subject) => {
//     setEditingSubject(subject);
//     setFormData({
//       code: subject.code,
//       name: subject.name,
//       course: subject.course,
//       semester: subject.semester,
//       credits: subject.credits,
//       modules: subject.modules,
//       type: subject.type,
//       theoryClassesPerWeek: subject.theoryClassesPerWeek,
//       labPeriodsPerWeek: subject.labPeriodsPerWeek,
//       examType: subject.examType || "SEE",
//       subjectType: subject.subjectType || "Core"
//     });
//   };

//   const handleDelete = (id) => {
//     if (confirm("Are you sure you want to delete this subject?")) {
//       const updatedSubjects = subjects.filter(s => s.id !== id);
//       setSubjects(updatedSubjects);
//       AppState.subjects = updatedSubjects;
//       saveToStorage(STORAGE_KEYS.SUBJECTS, updatedSubjects);
      
//       window.dispatchEvent(new Event('storage'));
      
//       alert("Subject deleted successfully!");
//       if (onRefresh) onRefresh();
//     }
//   };

//   const handleCancel = () => {
//     setEditingSubject(null);
//     setFormData({
//       code: "",
//       name: "",
//       course: "BTech",
//       semester: 1,
//       credits: 3,
//       modules: 4,
//       type: "Theory",
//       theoryClassesPerWeek: 3,
//       labPeriodsPerWeek: 0,
//       examType: "SEE",
//       subjectType: "Core"
//     });
//   };

//   const handleResubmit = (subject) => {
//     handleEdit(subject);
//     setSelectedRejectedSubject(null);
//   };

//   const getApprovalBadge = (status) => {
//     switch(status) {
//       case "approved":
//         return <Badge variant="success">Approved</Badge>;
//       case "pending":
//         return <Badge variant="warning">Pending Dean Approval</Badge>;
//       case "rejected":
//         return <Badge variant="danger">Rejected</Badge>;
//       default:
//         return <Badge variant="warning">Pending</Badge>;
//     }
//   };

//   const getExamTypeBadge = (examType) => {
//     switch(examType) {
//       case "SEE":
//         return <Badge variant="primary">SEE</Badge>;
//       case "Practical":
//         return <Badge variant="success">Practical</Badge>;
//       case "Seminar":
//         return <Badge variant="warning">Seminar</Badge>;
//       default:
//         return <Badge variant="primary">{examType}</Badge>;
//     }
//   };

//   const getSubjectTypeBadge = (subjectType) => {
//     switch(subjectType) {
//       case "Core":
//         return <Badge variant="primary">Core</Badge>;
//       case "Major":
//         return <Badge variant="success">Major</Badge>;
//       case "Minor":
//         return <Badge variant="warning">Minor</Badge>;
//       default:
//         return <Badge variant="primary">{subjectType}</Badge>;
//     }
//   };

//   const showRejectionDetails = (subject) => {
//     setSelectedRejectedSubject(subject);
//   };

//   const closeRejectionDetails = () => {
//     setSelectedRejectedSubject(null);
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//       <Title>Subject Management</Title>
      
//       {/* Rejection Details Modal */}
//       {selectedRejectedSubject && (
//         <div style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background: "rgba(0,0,0,0.5)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           zIndex: 1000
//         }}>
//           <Card padding="24px" style={{ width: 500, maxWidth: "90%" }}>
//             <Title level={4}>Rejection Details</Title>
//             <div style={{ marginBottom: 16 }}>
//               <h5 style={{ color: C.text.primary, fontWeight: 600 }}>{selectedRejectedSubject.name}</h5>
//               <p style={{ color: C.text.secondary, fontSize: 12 }}>Code: {selectedRejectedSubject.code}</p>
//             </div>
//             <div style={{ 
//               padding: 16, 
//               background: C.accent.redBg, 
//               borderRadius: 12,
//               marginBottom: 16
//             }}>
//               <p style={{ color: C.accent.red, fontWeight: 600, marginBottom: 8 }}>Rejection Reason:</p>
//               <p style={{ color: C.text.primary }}>{selectedRejectedSubject.rejectionReason || "No reason provided"}</p>
//               {selectedRejectedSubject.rejectedDate && (
//                 <p style={{ color: C.text.tertiary, fontSize: 11, marginTop: 12 }}>
//                   Rejected on: {new Date(selectedRejectedSubject.rejectedDate).toLocaleString()}
//                 </p>
//               )}
//               {selectedRejectedSubject.rejectedBy && (
//                 <p style={{ color: C.text.tertiary, fontSize: 11 }}>
//                   Rejected by: {selectedRejectedSubject.rejectedBy}
//                 </p>
//               )}
//             </div>
//             <div style={{ display: "flex", gap: 12 }}>
//               <Button onClick={closeRejectionDetails} variant="secondary" fullWidth>
//                 Close
//               </Button>
//               <Button 
//                 onClick={() => handleResubmit(selectedRejectedSubject)} 
//                 variant="warning" 
//                 fullWidth
//               >
//                 Edit & Resubmit for Approval
//               </Button>
//             </div>
//           </Card>
//         </div>
//       )}
      
//       <Card>
//         <Title level={4}>{editingSubject ? (editingSubject.approvalStatus === "rejected" ? "Resubmit Subject" : "Edit Subject") : "Add New Subject"}</Title>
//         {editingSubject && editingSubject.approvalStatus === "rejected" && (
//           <div style={{ 
//             marginBottom: 16, 
//             padding: 12, 
//             background: C.accent.blueBg, 
//             borderRadius: 8,
//             color: C.accent.blue
//           }}>
//             <strong>ℹ️ Resubmission Mode:</strong> This subject was previously rejected. After making changes, it will be sent for Dean approval again.
//           </div>
//         )}
//         <form onSubmit={handleSubmit}>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
//             <Input 
//               label="Subject Code" 
//               name="code" 
//               value={formData.code} 
//               onChange={handleInputChange} 
//               placeholder="e.g., CS101"
//               required 
//             />
//             <Input 
//               label="Subject Name" 
//               name="name" 
//               value={formData.name} 
//               onChange={handleInputChange} 
//               placeholder="e.g., Data Structures"
//               required 
//             />
//             <Select 
//               label="Course" 
//               name="course" 
//               value={formData.course} 
//               onChange={handleInputChange} 
//               options={COURSES.map(c => ({ value: c, label: c }))} 
//             />
//             <Select 
//               label="Semester" 
//               name="semester" 
//               value={formData.semester} 
//               onChange={handleInputChange} 
//               options={SEMESTERS.map(s => ({ value: s, label: `Semester ${s}` }))} 
//             />
//             <Input 
//               label="Credits" 
//               name="credits" 
//               type="number" 
//               min="1" 
//               max="6"
//               value={formData.credits} 
//               onChange={handleInputChange} 
//               required 
//             />
//             <Input 
//               label="Number of Modules" 
//               name="modules" 
//               type="number" 
//               min="1" 
//               max="10"
//               value={formData.modules} 
//               onChange={handleInputChange} 
//               required 
//             />
//             <Select 
//               label="Subject Type" 
//               name="type" 
//               value={formData.type} 
//               onChange={handleInputChange} 
//               options={[
//                 { value: "Theory", label: "Theory Only" }, 
//                 { value: "Lab", label: "Lab Only" }, 
//                 { value: "Both", label: "Both Theory & Lab" }
//               ]} 
//             />
//             <Select 
//               label="Exam Type" 
//               name="examType" 
//               value={formData.examType} 
//               onChange={handleInputChange} 
//               options={EXAM_TYPES.map(e => ({ value: e, label: e }))} 
//             />
//             <Select 
//               label="Subject Category" 
//               name="subjectType" 
//               value={formData.subjectType} 
//               onChange={handleInputChange} 
//               options={SUBJECT_TYPES.map(s => ({ value: s, label: s }))} 
//             />
//             {formData.type !== "Lab" && (
//               <Input 
//                 label="Theory Classes per Week" 
//                 name="theoryClassesPerWeek" 
//                 type="number" 
//                 min="0" 
//                 max="6"
//                 value={formData.theoryClassesPerWeek} 
//                 onChange={handleInputChange} 
//               />
//             )}
//             {formData.type !== "Theory" && (
//               <Input 
//                 label="Lab Periods per Week" 
//                 name="labPeriodsPerWeek" 
//                 type="number" 
//                 min="0" 
//                 max="8"
//                 value={formData.labPeriodsPerWeek} 
//                 onChange={handleInputChange} 
//               />
//             )}
//           </div>
          
//           <div style={{ marginTop: 20, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//             <p style={{ color: C.accent.blue, fontSize: 14 }}>
//               <strong>Total Weekly Classes:</strong> {calculateTotalClasses()} hours per week
//             </p>
//           </div>
          
//           <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
//             <Button type="submit" variant="success">
//               {editingSubject ? (editingSubject.approvalStatus === "rejected" ? "Resubmit for Approval" : "Update Subject") : "Add Subject"}
//             </Button>
//             {editingSubject && (
//               <Button type="button" onClick={handleCancel} variant="secondary">
//                 Cancel
//               </Button>
//             )}
//           </div>
//         </form>
//       </Card>

//       <Card>
//         <Title level={4}>Existing Subjects ({subjects.length})</Title>
//         <div style={{ overflowX: "auto", maxHeight: 500, overflowY: "auto" }}>
//           <table style={{ width: "100%", borderCollapse: "collapse" }}>
//             <thead style={{ position: "sticky", top: 0, background: C.surface, zIndex: 1 }}>
//               <tr>
//                 <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Code</th>
//                 <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Name</th>
//                 <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Course</th>
//                 <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Sem</th>
//                 <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Type</th>
//                 <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Exam Type</th>
//                 <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Category</th>
//                 <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Credits</th>
//                 <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Weekly Hours</th>
//                 <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Status</th>
//                 <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {subjects.map(sub => (
//                 <tr key={sub.id} style={{ borderBottom: `1px solid ${C.border}` }}>
//                   <td style={{ padding: 12, color: C.accent.blue, fontWeight: 500 }}>{sub.code}</td>
//                   <td style={{ padding: 12, color: C.text.primary }}>{sub.name}</td>
//                   <td style={{ padding: 12, color: C.text.secondary }}>{sub.course}</td>
//                   <td style={{ padding: 12, color: C.text.secondary }}>{sub.semester}</td>
//                   <td style={{ padding: 12 }}>
//                     <span style={{
//                       padding: "4px 10px",
//                       borderRadius: 12,
//                       fontSize: 11,
//                       fontWeight: 500,
//                       background: sub.type === "Theory" ? C.accent.blueBg : sub.type === "Lab" ? C.accent.greenBg : C.accent.purpleBg,
//                       color: sub.type === "Theory" ? C.accent.blue : sub.type === "Lab" ? C.accent.green : C.accent.purple,
//                     }}>
//                       {sub.type}
//                     </span>
//                    </td>
//                   <td style={{ padding: 12 }}>{getExamTypeBadge(sub.examType || "SEE")}</td>
//                   <td style={{ padding: 12 }}>{getSubjectTypeBadge(sub.subjectType || "Core")}</td>
//                   <td style={{ padding: 12, color: C.text.secondary }}>{sub.credits}</td>
//                   <td style={{ padding: 12, color: C.accent.gold, fontWeight: 500 }}>{sub.totalWeeklyClasses}h</td>
//                   <td style={{ padding: 12 }}>
//                     {getApprovalBadge(sub.approvalStatus)}
//                     {sub.approvalStatus === "rejected" && sub.rejectionReason && (
//                       <button
//                         onClick={() => showRejectionDetails(sub)}
//                         style={{
//                           marginLeft: 8,
//                           background: "none",
//                           border: "none",
//                           color: C.accent.red,
//                           cursor: "pointer",
//                           fontSize: 12,
//                           textDecoration: "underline"
//                         }}
//                       >
//                         View Reason
//                       </button>
//                     )}
//                     {sub.approvalStatus === "pending" && (
//                       <span style={{ marginLeft: 8, fontSize: 11, color: C.accent.gold }}>
//                         (Awaiting)
//                       </span>
//                     )}
//                    </td>
//                   <td style={{ padding: 12 }}>
//                     <button 
//                       onClick={() => handleEdit(sub)} 
//                       style={{ 
//                         marginRight: 8, 
//                         background: C.accent.blue, 
//                         color: "white", 
//                         border: "none", 
//                         borderRadius: 6, 
//                         padding: "6px 12px", 
//                         cursor: "pointer",
//                         fontSize: 12
//                       }}
//                       disabled={sub.approvalStatus === "pending"}
//                       title={sub.approvalStatus === "pending" ? "Cannot edit while pending approval" : ""}
//                     >
//                       Edit
//                     </button>
//                     <button 
//                       onClick={() => handleDelete(sub.id)} 
//                       style={{ 
//                         background: C.accent.red, 
//                         color: "white", 
//                         border: "none", 
//                         borderRadius: 6, 
//                         padding: "6px 12px", 
//                         cursor: "pointer",
//                         fontSize: 12
//                       }}
//                     >
//                       Delete
//                     </button>
//                    </td>
//                  </tr>
//               ))}
//             </tbody>
//           </table>
//           {subjects.length === 0 && (
//             <p style={{ textAlign: "center", padding: 40, color: C.text.tertiary }}>
//               No subjects added yet. Use the form above to add your first subject.
//             </p>
//           )}
//         </div>
//       </Card>
//     </div>
//   );
// }

// function loadFromStorage(key, defaultValue) {
//   try {
//     const stored = localStorage.getItem(key);
//     return stored ? JSON.parse(stored) : defaultValue;
//   } catch (error) {
//     console.error('Error loading from localStorage:', error);
//     return defaultValue;
//   }
// }

// src/components/director/SubjectManagementPanel.jsx
import { useState, useEffect } from "react";
import { Card, Title, Button, Input, Select, Badge } from "../common";
import { AppState } from "../../AppState";
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from "../../utils/storage";
import { COURSES, SEMESTERS, EXAM_TYPES, SUBJECT_TYPES } from "../../data/mockData";
import { C } from "../../styles/theme";

export function SubjectManagementPanel({ onRefresh }) {
  const [subjects, setSubjects] = useState([]);
  const [editingSubject, setEditingSubject] = useState(null);
  const [selectedRejectedSubject, setSelectedRejectedSubject] = useState(null);
  const [deletionRequests, setDeletionRequests] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [deleteReason, setDeleteReason] = useState("");
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    course: "BTech",
    semester: 1,
    credits: 3,
    modules: 4,
    type: "Theory",
    theoryClassesPerWeek: 3,
    labPeriodsPerWeek: 0,
    examType: "SEE",
    subjectType: "Core"
  });

  useEffect(() => {
    loadSubjects();
    loadDeletionRequests();
    
    const handleStorageChange = () => {
      loadSubjects();
      loadDeletionRequests();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadSubjects = () => {
    const savedSubjects = loadFromStorage(STORAGE_KEYS.SUBJECTS, []);
    setSubjects(savedSubjects);
  };

  const loadDeletionRequests = () => {
    const savedRequests = loadFromStorage(STORAGE_KEYS.SUBJECT_DELETION_REQUESTS, []);
    setDeletionRequests(savedRequests);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotalClasses = () => {
    const theory = parseInt(formData.theoryClassesPerWeek) || 0;
    const lab = parseInt(formData.labPeriodsPerWeek) || 0;
    return theory + lab;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.code.trim()) {
      alert("Please enter subject code");
      return;
    }
    if (!formData.name.trim()) {
      alert("Please enter subject name");
      return;
    }
    
    const totalClasses = calculateTotalClasses();
    
    const newSubject = {
      id: editingSubject ? editingSubject.id : `SUB${Date.now()}`,
      code: formData.code.toUpperCase(),
      name: formData.name,
      course: formData.course,
      semester: parseInt(formData.semester),
      credits: parseInt(formData.credits),
      modules: parseInt(formData.modules),
      type: formData.type,
      theoryClassesPerWeek: parseInt(formData.theoryClassesPerWeek) || 0,
      labPeriodsPerWeek: parseInt(formData.labPeriodsPerWeek) || 0,
      totalWeeklyClasses: totalClasses,
      examType: formData.examType,
      subjectType: formData.subjectType,
      approvalStatus: editingSubject && editingSubject.approvalStatus === "rejected" ? "pending" : (editingSubject ? editingSubject.approvalStatus : "pending"),
      createdBy: "director",
      createdDate: editingSubject ? editingSubject.createdDate : new Date().toISOString(),
      rejectionReason: null,
      rejectedBy: null,
      rejectedDate: null,
      deletionRequested: false,
      deletionReason: null,
      deletionRequestId: null
    };
    
    let updatedSubjects;
    let alertMessage = "";
    
    if (editingSubject) {
      updatedSubjects = subjects.map(s => 
        s.id === editingSubject.id ? newSubject : s
      );
      
      if (editingSubject.approvalStatus === "rejected") {
        alertMessage = `Subject "${formData.name}" has been resubmitted for Dean approval!`;
      } else {
        alertMessage = "Subject updated successfully!";
      }
      alert(alertMessage);
    } else {
      if (subjects.some(s => s.code === formData.code.toUpperCase())) {
        alert("Subject code already exists!");
        return;
      }
      updatedSubjects = [...subjects, newSubject];
      alert(`Subject "${formData.name}" added and sent for Dean approval!`);
    }
    
    setSubjects(updatedSubjects);
    AppState.subjects = updatedSubjects;
    saveToStorage(STORAGE_KEYS.SUBJECTS, updatedSubjects);
    
    window.dispatchEvent(new Event('storage'));
    
    setEditingSubject(null);
    setFormData({
      code: "",
      name: "",
      course: "BTech",
      semester: 1,
      credits: 3,
      modules: 4,
      type: "Theory",
      theoryClassesPerWeek: 3,
      labPeriodsPerWeek: 0,
      examType: "SEE",
      subjectType: "Core"
    });
    
    if (onRefresh) onRefresh();
  };

  const handleEdit = (subject) => {
    setEditingSubject(subject);
    setFormData({
      code: subject.code,
      name: subject.name,
      course: subject.course,
      semester: subject.semester,
      credits: subject.credits,
      modules: subject.modules,
      type: subject.type,
      theoryClassesPerWeek: subject.theoryClassesPerWeek,
      labPeriodsPerWeek: subject.labPeriodsPerWeek,
      examType: subject.examType || "SEE",
      subjectType: subject.subjectType || "Core"
    });
  };

  // Request deletion instead of immediate delete
  const requestDelete = (subject) => {
    setShowDeleteModal(subject);
    setDeleteReason("");
  };

  const submitDeletionRequest = () => {
    if (!deleteReason.trim()) {
      alert("Please provide a reason for deletion");
      return;
    }

    const subject = showDeleteModal;
    
    // Create deletion request
    const deletionRequest = {
      id: Date.now(),
      subjectId: subject.id,
      subjectCode: subject.code,
      subjectName: subject.name,
      course: subject.course,
      semester: subject.semester,
      requestedBy: "director",
      requestedByName: "Prof. Rajesh Menon",
      requestedDate: new Date().toISOString(),
      reason: deleteReason,
      status: "pending",
      approvedBy: null,
      approvedDate: null,
      rejectionReason: null
    };

    const updatedRequests = [...deletionRequests, deletionRequest];
    setDeletionRequests(updatedRequests);
    saveToStorage(STORAGE_KEYS.SUBJECT_DELETION_REQUESTS, updatedRequests);
    
    // Mark subject as deletion requested (but not deleted yet)
    const updatedSubjects = subjects.map(s => 
      s.id === subject.id 
        ? { ...s, deletionRequested: true, deletionReason: deleteReason, deletionRequestId: deletionRequest.id }
        : s
    );
    setSubjects(updatedSubjects);
    AppState.subjects = updatedSubjects;
    saveToStorage(STORAGE_KEYS.SUBJECTS, updatedSubjects);
    
    window.dispatchEvent(new Event('storage'));
    
    setShowDeleteModal(null);
    setDeleteReason("");
    alert(`Deletion request for "${subject.name}" has been sent to Dean for approval.`);
    if (onRefresh) onRefresh();
  };

  const cancelDeletionRequest = () => {
    setShowDeleteModal(null);
    setDeleteReason("");
  };

  const handleCancel = () => {
    setEditingSubject(null);
    setFormData({
      code: "",
      name: "",
      course: "BTech",
      semester: 1,
      credits: 3,
      modules: 4,
      type: "Theory",
      theoryClassesPerWeek: 3,
      labPeriodsPerWeek: 0,
      examType: "SEE",
      subjectType: "Core"
    });
  };

  const handleResubmit = (subject) => {
    handleEdit(subject);
    setSelectedRejectedSubject(null);
  };

  const getApprovalBadge = (status) => {
    switch(status) {
      case "approved":
        return <Badge variant="success">Approved</Badge>;
      case "pending":
        return <Badge variant="warning">Pending Dean Approval</Badge>;
      case "rejected":
        return <Badge variant="danger">Rejected</Badge>;
      default:
        return <Badge variant="warning">Pending</Badge>;
    }
  };

  const getExamTypeBadge = (examType) => {
    switch(examType) {
      case "SEE":
        return <Badge variant="primary">SEE</Badge>;
      case "Practical":
        return <Badge variant="success">Practical</Badge>;
      case "Seminar":
        return <Badge variant="warning">Seminar</Badge>;
      default:
        return <Badge variant="primary">{examType}</Badge>;
    }
  };

  const getSubjectTypeBadge = (subjectType) => {
    switch(subjectType) {
      case "Core":
        return <Badge variant="primary">Core</Badge>;
      case "Major":
        return <Badge variant="success">Major</Badge>;
      case "Minor":
        return <Badge variant="warning">Minor</Badge>;
      default:
        return <Badge variant="primary">{subjectType}</Badge>;
    }
  };

  const showRejectionDetails = (subject) => {
    setSelectedRejectedSubject(subject);
  };

  const closeRejectionDetails = () => {
    setSelectedRejectedSubject(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Title>Subject Management</Title>
      
      {/* Delete Request Modal */}
      {showDeleteModal && (
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
          <Card padding="24px" style={{ width: 450, maxWidth: "90%" }}>
            <Title level={4}>Request Subject Deletion</Title>
            <div style={{ marginBottom: 16 }}>
              <h5 style={{ color: C.text.primary }}>{showDeleteModal.name}</h5>
              <p style={{ color: C.text.secondary, fontSize: 12 }}>Code: {showDeleteModal.code}</p>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ color: C.text.secondary, fontSize: 13, display: "block", marginBottom: 6 }}>
                Reason for Deletion *
              </label>
              <textarea
                value={deleteReason}
                onChange={e => setDeleteReason(e.target.value)}
                placeholder="Please provide a reason for deleting this subject..."
                rows={4}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: 8,
                  border: `1px solid ${C.border}`,
                  fontSize: 14,
                  resize: "vertical"
                }}
              />
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <Button onClick={submitDeletionRequest} variant="danger" fullWidth>
                Send Deletion Request
              </Button>
              <Button onClick={cancelDeletionRequest} variant="secondary" fullWidth>
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
      
      {/* Rejection Details Modal */}
      {selectedRejectedSubject && (
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
          <Card padding="24px" style={{ width: 500, maxWidth: "90%" }}>
            <Title level={4}>Rejection Details</Title>
            <div style={{ marginBottom: 16 }}>
              <h5 style={{ color: C.text.primary, fontWeight: 600 }}>{selectedRejectedSubject.name}</h5>
              <p style={{ color: C.text.secondary, fontSize: 12 }}>Code: {selectedRejectedSubject.code}</p>
            </div>
            <div style={{ 
              padding: 16, 
              background: C.accent.redBg, 
              borderRadius: 12,
              marginBottom: 16
            }}>
              <p style={{ color: C.accent.red, fontWeight: 600, marginBottom: 8 }}>Rejection Reason:</p>
              <p style={{ color: C.text.primary }}>{selectedRejectedSubject.rejectionReason || "No reason provided"}</p>
              {selectedRejectedSubject.rejectedDate && (
                <p style={{ color: C.text.tertiary, fontSize: 11, marginTop: 12 }}>
                  Rejected on: {new Date(selectedRejectedSubject.rejectedDate).toLocaleString()}
                </p>
              )}
              {selectedRejectedSubject.rejectedBy && (
                <p style={{ color: C.text.tertiary, fontSize: 11 }}>
                  Rejected by: {selectedRejectedSubject.rejectedBy}
                </p>
              )}
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <Button onClick={closeRejectionDetails} variant="secondary" fullWidth>
                Close
              </Button>
              <Button 
                onClick={() => handleResubmit(selectedRejectedSubject)} 
                variant="warning" 
                fullWidth
              >
                Edit & Resubmit for Approval
              </Button>
            </div>
          </Card>
        </div>
      )}
      
      <Card>
        <Title level={4}>{editingSubject ? (editingSubject.approvalStatus === "rejected" ? "Resubmit Subject" : "Edit Subject") : "Add New Subject"}</Title>
        {editingSubject && editingSubject.approvalStatus === "rejected" && (
          <div style={{ 
            marginBottom: 16, 
            padding: 12, 
            background: C.accent.blueBg, 
            borderRadius: 8,
            color: C.accent.blue
          }}>
            <strong>ℹ️ Resubmission Mode:</strong> This subject was previously rejected. After making changes, it will be sent for Dean approval again.
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
            <Input 
              label="Subject Code" 
              name="code" 
              value={formData.code} 
              onChange={handleInputChange} 
              placeholder="e.g., CS101"
              required 
            />
            <Input 
              label="Subject Name" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              placeholder="e.g., Data Structures"
              required 
            />
            <Select 
              label="Course" 
              name="course" 
              value={formData.course} 
              onChange={handleInputChange} 
              options={COURSES.map(c => ({ value: c, label: c }))} 
            />
            <Select 
              label="Semester" 
              name="semester" 
              value={formData.semester} 
              onChange={handleInputChange} 
              options={SEMESTERS.map(s => ({ value: s, label: `Semester ${s}` }))} 
            />
            <Input 
              label="Credits" 
              name="credits" 
              type="number" 
              min="1" 
              max="6"
              value={formData.credits} 
              onChange={handleInputChange} 
              required 
            />
            <Input 
              label="Number of Modules" 
              name="modules" 
              type="number" 
              min="1" 
              max="10"
              value={formData.modules} 
              onChange={handleInputChange} 
              required 
            />
            <Select 
              label="Subject Type" 
              name="type" 
              value={formData.type} 
              onChange={handleInputChange} 
              options={[
                { value: "Theory", label: "Theory Only" }, 
                { value: "Lab", label: "Lab Only" }, 
                { value: "Both", label: "Both Theory & Lab" }
              ]} 
            />
            <Select 
              label="Exam Type" 
              name="examType" 
              value={formData.examType} 
              onChange={handleInputChange} 
              options={EXAM_TYPES.map(e => ({ value: e, label: e }))} 
            />
            <Select 
              label="Subject Category" 
              name="subjectType" 
              value={formData.subjectType} 
              onChange={handleInputChange} 
              options={SUBJECT_TYPES.map(s => ({ value: s, label: s }))} 
            />
            {formData.type !== "Lab" && (
              <Input 
                label="Theory Classes per Week" 
                name="theoryClassesPerWeek" 
                type="number" 
                min="0" 
                max="6"
                value={formData.theoryClassesPerWeek} 
                onChange={handleInputChange} 
              />
            )}
            {formData.type !== "Theory" && (
              <Input 
                label="Lab Periods per Week" 
                name="labPeriodsPerWeek" 
                type="number" 
                min="0" 
                max="8"
                value={formData.labPeriodsPerWeek} 
                onChange={handleInputChange} 
              />
            )}
          </div>
          
          <div style={{ marginTop: 20, padding: 12, background: C.cardHover, borderRadius: 8 }}>
            <p style={{ color: C.accent.blue, fontSize: 14 }}>
              <strong>Total Weekly Classes:</strong> {calculateTotalClasses()} hours per week
            </p>
          </div>
          
          <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
            <Button type="submit" variant="success">
              {editingSubject ? (editingSubject.approvalStatus === "rejected" ? "Resubmit for Approval" : "Update Subject") : "Add Subject"}
            </Button>
            {editingSubject && (
              <Button type="button" onClick={handleCancel} variant="secondary">
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Card>

      <Card>
        <Title level={4}>Existing Subjects ({subjects.length})</Title>
        <div style={{ overflowX: "auto", maxHeight: 500, overflowY: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ position: "sticky", top: 0, background: C.surface, zIndex: 1 }}>
              <tr>
                <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Code</th>
                <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Name</th>
                <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Course</th>
                <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Sem</th>
                <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Type</th>
                <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Exam Type</th>
                <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Category</th>
                <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Credits</th>
                <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Weekly Hours</th>
                <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Status</th>
                <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map(sub => (
                <tr key={sub.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: 12, color: C.accent.blue, fontWeight: 500 }}>{sub.code}</td>
                  <td style={{ padding: 12, color: C.text.primary }}>{sub.name}
                    {sub.deletionRequested && (
                      <span style={{ marginLeft: 8, fontSize: 10, color: C.accent.red }}>(Deletion Requested)</span>
                    )}
                   </td>
                  <td style={{ padding: 12, color: C.text.secondary }}>{sub.course}</td>
                  <td style={{ padding: 12, color: C.text.secondary }}>{sub.semester}</td>
                  <td style={{ padding: 12 }}>
                    <span style={{
                      padding: "4px 10px",
                      borderRadius: 12,
                      fontSize: 11,
                      fontWeight: 500,
                      background: sub.type === "Theory" ? C.accent.blueBg : sub.type === "Lab" ? C.accent.greenBg : C.accent.purpleBg,
                      color: sub.type === "Theory" ? C.accent.blue : sub.type === "Lab" ? C.accent.green : C.accent.purple,
                    }}>
                      {sub.type}
                    </span>
                   </td>
                  <td style={{ padding: 12 }}>{getExamTypeBadge(sub.examType || "SEE")}</td>
                  <td style={{ padding: 12 }}>{getSubjectTypeBadge(sub.subjectType || "Core")}</td>
                  <td style={{ padding: 12, color: C.text.secondary }}>{sub.credits}</td>
                  <td style={{ padding: 12, color: C.accent.gold, fontWeight: 500 }}>{sub.totalWeeklyClasses}h</td>
                  <td style={{ padding: 12 }}>
                    {getApprovalBadge(sub.approvalStatus)}
                    {sub.approvalStatus === "rejected" && sub.rejectionReason && (
                      <button
                        onClick={() => showRejectionDetails(sub)}
                        style={{
                          marginLeft: 8,
                          background: "none",
                          border: "none",
                          color: C.accent.red,
                          cursor: "pointer",
                          fontSize: 12,
                          textDecoration: "underline"
                        }}
                      >
                        View Reason
                      </button>
                    )}
                    {sub.approvalStatus === "pending" && (
                      <span style={{ marginLeft: 8, fontSize: 11, color: C.accent.gold }}>
                        (Awaiting)
                      </span>
                    )}
                    {sub.deletionRequested && (
                      <span style={{ marginLeft: 8, fontSize: 11, color: C.accent.red }}>
                        (Deletion Pending)
                      </span>
                    )}
                    </td>
                  <td style={{ padding: 12 }}>
                    <button 
                      onClick={() => handleEdit(sub)} 
                      style={{ 
                        marginRight: 8, 
                        background: C.accent.blue, 
                        color: "white", 
                        border: "none", 
                        borderRadius: 6, 
                        padding: "6px 12px", 
                        cursor: "pointer",
                        fontSize: 12
                      }}
                      disabled={sub.approvalStatus === "pending" || sub.deletionRequested}
                      title={sub.approvalStatus === "pending" ? "Cannot edit while pending approval" : sub.deletionRequested ? "Deletion requested, cannot edit" : ""}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => requestDelete(sub)} 
                      style={{ 
                        background: sub.deletionRequested ? C.border : C.accent.red,
                        color: sub.deletionRequested ? C.text.disabled : "white", 
                        border: "none", 
                        borderRadius: 6, 
                        padding: "6px 12px", 
                        cursor: sub.deletionRequested ? "not-allowed" : "pointer",
                        fontSize: 12
                      }}
                      disabled={sub.deletionRequested}
                      title={sub.deletionRequested ? "Deletion already requested" : "Request deletion"}
                    >
                      {sub.deletionRequested ? "Requested" : "Delete"}
                    </button>
                    </td>
                 </tr>
              ))}
            </tbody>
          </table>
          {subjects.length === 0 && (
            <p style={{ textAlign: "center", padding: 40, color: C.text.tertiary }}>
              No subjects added yet. Use the form above to add your first subject.
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}