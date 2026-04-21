// // // // // src/components/faculty/FacultySubjectPreferenceForm.jsx
// // // // import { useState, useEffect } from "react";
// // // // import { Card, Title, Button } from "../common";
// // // // import { AppState } from "../../AppState";
// // // // import { SEMESTERS } from "../../data/mockData";
// // // // import { C } from "../../styles/theme";

// // // // export function FacultySubjectPreferenceForm({ faculty, onComplete }) {
// // // //   const [preferences, setPreferences] = useState([
// // // //     { level: 1, subjectId: "" },
// // // //     { level: 2, subjectId: "" },
// // // //     { level: 3, subjectId: "" },
// // // //   ]);
// // // //   const [availableSubjects, setAvailableSubjects] = useState([]);
// // // //   const [refresh, setRefresh] = useState(0);
  
// // // //   // Load available subjects when component mounts or when storage changes
// // // //   useEffect(() => {
// // // //     loadAvailableSubjects();
    
// // // //     // Listen for storage changes (when director adds new subjects)
// // // //     const handleStorageChange = () => {
// // // //       console.log("Storage changed, reloading subjects...");
// // // //       loadAvailableSubjects();
// // // //       setRefresh(r => r + 1);
// // // //     };
    
// // // //     window.addEventListener('storage', handleStorageChange);
// // // //     return () => window.removeEventListener('storage', handleStorageChange);
// // // //   }, [faculty.course]);
  
// // // //   const loadAvailableSubjects = () => {
// // // //     // Get subjects configured by coordinator for this faculty's course
// // // //     const subjects = [];
// // // //     SEMESTERS.forEach(semester => {
// // // //       const semesterDetails = AppState.semesterDetails[faculty.course]?.[semester];
// // // //       if (semesterDetails && semesterDetails.subjects) {
// // // //         semesterDetails.subjects.forEach(subjectId => {
// // // //           const subject = AppState.subjects.find(s => s.id === subjectId);
// // // //           if (subject && !subjects.find(s => s.id === subjectId)) {
// // // //             subjects.push({
// // // //               ...subject,
// // // //               semester
// // // //             });
// // // //           }
// // // //         });
// // // //       }
// // // //     });
// // // //     console.log("Available subjects for faculty:", subjects);
// // // //     setAvailableSubjects(subjects);
// // // //   };
  
// // // //   const updatePreference = (level, subjectId) => {
// // // //     setPreferences(prefs => prefs.map(p => 
// // // //       p.level === level ? { ...p, subjectId } : p
// // // //     ));
// // // //   };
  
// // // //   const getUsedSubjects = () => {
// // // //     return preferences.map(p => p.subjectId).filter(id => id);
// // // //   };
  
// // // //   const isSubjectAvailable = (subjectId, currentLevel) => {
// // // //     const used = getUsedSubjects();
// // // //     return !used.includes(subjectId) || preferences.find(p => p.level === currentLevel)?.subjectId === subjectId;
// // // //   };
  
// // // //   const calculateWeeklyClasses = (subject) => {
// // // //     return {
// // // //       theoryClasses: subject.theoryClassesPerWeek,
// // // //       labPeriods: subject.labPeriodsPerWeek,
// // // //       total: subject.totalWeeklyClasses
// // // //     };
// // // //   };
  
// // // //   const handleSubmit = () => {
// // // //     const selectedSubjects = preferences.filter(p => p.subjectId);
    
// // // //     if (selectedSubjects.length < 2) {
// // // //       alert("Please select at least 2 subject preferences");
// // // //       return;
// // // //     }
    
// // // //     const formattedPreferences = selectedSubjects.map(p => ({
// // // //       level: p.level,
// // // //       subjectId: p.subjectId
// // // //     }));
    
// // // //     AppState.submitSubjectPreferences(faculty.id, formattedPreferences);
// // // //     onComplete();
// // // //   };
  
// // // //   return (
// // // //     <Card>
// // // //       <Title level={4}>Subject Preference Form</Title>
// // // //       <p style={{ color: C.text.secondary, fontSize: 13, marginBottom: 8 }}>Faculty ID: {faculty.facultyId} | {faculty.name}</p>
// // // //       <p style={{ color: C.accent.blue, fontSize: 13, marginBottom: 16 }}>Course: {faculty.course} | Designation: {faculty.designation}</p>
// // // //       <p style={{ color: C.accent.gold, fontSize: 12, marginBottom: 16 }}>Minimum 2 preferences required</p>
      
// // // //       {availableSubjects.length === 0 && (
// // // //         <div style={{ padding: 16, background: C.accent.goldBg, borderRadius: 8, marginBottom: 16 }}>
// // // //           <p style={{ color: C.accent.gold, margin: 0 }}>
// // // //             ⚠ No subjects have been configured for {faculty.course} course yet. Please contact the coordinator.
// // // //           </p>
// // // //         </div>
// // // //       )}
      
// // // //       <div style={{ marginBottom: 24 }}>
// // // //         <label style={{ color: C.text.secondary, fontSize: 12, display: "block", marginBottom: 12 }}>Subject Preferences (Ranked 1-3)</label>
        
// // // //         {preferences.map((pref, index) => (
// // // //           <div key={pref.level} style={{ marginBottom: 12 }}>
// // // //             <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
// // // //               <div style={{ 
// // // //                 width: 32, height: 32, borderRadius: "50%", 
// // // //                 background: index === 0 ? C.accent.goldBg : index === 1 ? C.accent.blueBg : C.accent.greenBg,
// // // //                 display: "flex", alignItems: "center", justifyContent: "center",
// // // //                 color: index === 0 ? C.accent.gold : index === 1 ? C.accent.blue : C.accent.green,
// // // //                 fontWeight: 700 
// // // //               }}>
// // // //                 {pref.level}
// // // //               </div>
// // // //               <select 
// // // //                 value={pref.subjectId} 
// // // //                 onChange={e => updatePreference(pref.level, e.target.value)}
// // // //                 style={{
// // // //                   flex: 1,
// // // //                   background: C.surface,
// // // //                   border: `1px solid ${C.border}`,
// // // //                   borderRadius: 8,
// // // //                   padding: "10px 12px",
// // // //                   color: C.text.primary,
// // // //                   fontSize: 13,
// // // //                   outline: "none",
// // // //                 }}
// // // //               >
// // // //                 <option value="">Select Preference {pref.level}</option>
// // // //                 {availableSubjects.map(subject => {
// // // //                   const weeklyClasses = calculateWeeklyClasses(subject);
// // // //                   return (
// // // //                     <option 
// // // //                       key={subject.id} 
// // // //                       value={subject.id}
// // // //                       disabled={!isSubjectAvailable(subject.id, pref.level)}
// // // //                     >
// // // //                       {subject.name} (Sem {subject.semester}, {weeklyClasses.total} classes/wk)
// // // //                     </option>
// // // //                   );
// // // //                 })}
// // // //               </select>
// // // //             </div>
// // // //           </div>
// // // //         ))}
// // // //       </div>
      
// // // //       <div style={{ marginBottom: 24, padding: 16, background: C.cardHover, borderRadius: 12 }}>
// // // //         <p style={{ color: C.accent.gold, fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Selected Subjects Summary</p>
// // // //         {preferences.filter(p => p.subjectId).map(p => {
// // // //           const subject = AppState.subjects.find(s => s.id === p.subjectId);
// // // //           const weeklyClasses = subject ? calculateWeeklyClasses(subject) : { total: 0 };
          
// // // //           return (
// // // //             <div key={p.level} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
// // // //               <span style={{ color: C.text.primary }}>Pref {p.level}: {subject?.name}</span>
// // // //               <span style={{ color: C.accent.blue }}>{weeklyClasses.total}h/wk</span>
// // // //             </div>
// // // //           );
// // // //         })}
// // // //         {preferences.filter(p => p.subjectId).length < 2 && (
// // // //           <p style={{ color: C.accent.red, fontSize: 12, marginTop: 8 }}>⚠ Please select at least 2 preferences</p>
// // // //         )}
// // // //       </div>
      
// // // //       <Button
// // // //         onClick={handleSubmit}
// // // //         disabled={preferences.filter(p => p.subjectId).length < 2 || availableSubjects.length === 0}
// // // //         variant="success"
// // // //         fullWidth
// // // //       >
// // // //         Submit Preferences
// // // //       </Button>
// // // //     </Card>
// // // //   );
// // // // }

// // // // src/components/faculty/FacultySubjectPreferenceForm.jsx
// // // import { useState, useEffect } from "react";
// // // import { Card, Title, Button } from "../common";
// // // import { AppState } from "../../AppState";
// // // import { SEMESTERS } from "../../data/mockData";
// // // import { C } from "../../styles/theme";

// // // export function FacultySubjectPreferenceForm({ faculty, onComplete }) {
// // //   const [preferences, setPreferences] = useState([
// // //     { level: 1, subjectId: "" },
// // //     { level: 2, subjectId: "" },
// // //     { level: 3, subjectId: "" },
// // //   ]);
// // //   const [availableSubjects, setAvailableSubjects] = useState([]);
// // //   const [refresh, setRefresh] = useState(0);
  
// // //   useEffect(() => {
// // //     loadAvailableSubjects();
    
// // //     const handleStorageChange = () => {
// // //       loadAvailableSubjects();
// // //       setRefresh(r => r + 1);
// // //     };
    
// // //     window.addEventListener('storage', handleStorageChange);
// // //     return () => window.removeEventListener('storage', handleStorageChange);
// // //   }, [faculty.course]);
  
// // //   const loadAvailableSubjects = () => {
// // //     const subjects = [];
// // //     SEMESTERS.forEach(semester => {
// // //       const semesterDetails = AppState.semesterDetails[faculty.course]?.[semester];
// // //       if (semesterDetails && semesterDetails.subjects) {
// // //         semesterDetails.subjects.forEach(subjectId => {
// // //           const subject = AppState.subjects.find(s => s.id === subjectId);
// // //           // Only include subjects that are approved by Dean
// // //           if (subject && subject.approvalStatus === "approved" && !subjects.find(s => s.id === subjectId)) {
// // //             subjects.push({
// // //               ...subject,
// // //               semester
// // //             });
// // //           }
// // //         });
// // //       }
// // //     });
// // //     setAvailableSubjects(subjects);
// // //   };
  
// // //   const updatePreference = (level, subjectId) => {
// // //     setPreferences(prefs => prefs.map(p => 
// // //       p.level === level ? { ...p, subjectId } : p
// // //     ));
// // //   };
  
// // //   const getUsedSubjects = () => {
// // //     return preferences.map(p => p.subjectId).filter(id => id);
// // //   };
  
// // //   const isSubjectAvailable = (subjectId, currentLevel) => {
// // //     const used = getUsedSubjects();
// // //     return !used.includes(subjectId) || preferences.find(p => p.level === currentLevel)?.subjectId === subjectId;
// // //   };
  
// // //   const calculateWeeklyClasses = (subject) => {
// // //     return {
// // //       theoryClasses: subject.theoryClassesPerWeek,
// // //       labPeriods: subject.labPeriodsPerWeek,
// // //       total: subject.totalWeeklyClasses
// // //     };
// // //   };
  
// // //   const handleSubmit = () => {
// // //     const selectedSubjects = preferences.filter(p => p.subjectId);
    
// // //     if (selectedSubjects.length < 2) {
// // //       alert("Please select at least 2 subject preferences");
// // //       return;
// // //     }
    
// // //     const formattedPreferences = selectedSubjects.map(p => ({
// // //       level: p.level,
// // //       subjectId: p.subjectId
// // //     }));
    
// // //     AppState.submitSubjectPreferences(faculty.id, formattedPreferences);
// // //     onComplete();
// // //   };
  
// // //   return (
// // //     <Card>
// // //       <Title level={4}>Subject Preference Form</Title>
// // //       <p style={{ color: C.text.secondary, fontSize: 13, marginBottom: 8 }}>Faculty ID: {faculty.facultyId} | {faculty.name}</p>
// // //       <p style={{ color: C.accent.blue, fontSize: 13, marginBottom: 16 }}>Course: {faculty.course} | Designation: {faculty.designation}</p>
// // //       <p style={{ color: C.accent.gold, fontSize: 12, marginBottom: 16 }}>Minimum 2 preferences required</p>
      
// // //       {availableSubjects.length === 0 && (
// // //         <div style={{ padding: 16, background: C.accent.goldBg, borderRadius: 8, marginBottom: 16 }}>
// // //           <p style={{ color: C.accent.gold, margin: 0 }}>
// // //             ⚠ No approved subjects have been configured for {faculty.course} course yet. 
// // //             Please contact the coordinator or dean.
// // //           </p>
// // //         </div>
// // //       )}
      
// // //       <div style={{ marginBottom: 24 }}>
// // //         <label style={{ color: C.text.secondary, fontSize: 12, display: "block", marginBottom: 12 }}>Subject Preferences (Ranked 1-3)</label>
        
// // //         {preferences.map((pref, index) => (
// // //           <div key={pref.level} style={{ marginBottom: 12 }}>
// // //             <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
// // //               <div style={{ 
// // //                 width: 32, height: 32, borderRadius: "50%", 
// // //                 background: index === 0 ? C.accent.goldBg : index === 1 ? C.accent.blueBg : C.accent.greenBg,
// // //                 display: "flex", alignItems: "center", justifyContent: "center",
// // //                 color: index === 0 ? C.accent.gold : index === 1 ? C.accent.blue : C.accent.green,
// // //                 fontWeight: 700 
// // //               }}>
// // //                 {pref.level}
// // //               </div>
// // //               <select 
// // //                 value={pref.subjectId} 
// // //                 onChange={e => updatePreference(pref.level, e.target.value)}
// // //                 style={{
// // //                   flex: 1,
// // //                   background: C.surface,
// // //                   border: `1px solid ${C.border}`,
// // //                   borderRadius: 8,
// // //                   padding: "10px 12px",
// // //                   color: C.text.primary,
// // //                   fontSize: 13,
// // //                   outline: "none",
// // //                 }}
// // //               >
// // //                 <option value="">Select Preference {pref.level}</option>
// // //                 {availableSubjects.map(subject => {
// // //                   const weeklyClasses = calculateWeeklyClasses(subject);
// // //                   return (
// // //                     <option 
// // //                       key={subject.id} 
// // //                       value={subject.id}
// // //                       disabled={!isSubjectAvailable(subject.id, pref.level)}
// // //                     >
// // //                       {subject.name} (Sem {subject.semester}, {weeklyClasses.total} classes/wk)
// // //                     </option>
// // //                   );
// // //                 })}
// // //               </select>
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>
      
// // //       <div style={{ marginBottom: 24, padding: 16, background: C.cardHover, borderRadius: 12 }}>
// // //         <p style={{ color: C.accent.gold, fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Selected Subjects Summary</p>
// // //         {preferences.filter(p => p.subjectId).map(p => {
// // //           const subject = AppState.subjects.find(s => s.id === p.subjectId);
// // //           const weeklyClasses = subject ? calculateWeeklyClasses(subject) : { total: 0 };
          
// // //           return (
// // //             <div key={p.level} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
// // //               <span style={{ color: C.text.primary }}>Pref {p.level}: {subject?.name}</span>
// // //               <span style={{ color: C.accent.blue }}>{weeklyClasses.total}h/wk</span>
// // //             </div>
// // //           );
// // //         })}
// // //         {preferences.filter(p => p.subjectId).length < 2 && (
// // //           <p style={{ color: C.accent.red, fontSize: 12, marginTop: 8 }}>⚠ Please select at least 2 preferences</p>
// // //         )}
// // //       </div>
      
// // //       <Button
// // //         onClick={handleSubmit}
// // //         disabled={preferences.filter(p => p.subjectId).length < 2 || availableSubjects.length === 0}
// // //         variant="success"
// // //         fullWidth
// // //       >
// // //         Submit Preferences
// // //       </Button>
// // //     </Card>
// // //   );
// // // }

// // // src/components/faculty/FacultySubjectPreferenceForm.jsx
// // import { useState, useEffect } from "react";
// // import { Card, Title, Button } from "../common";
// // import { AppState } from "../../AppState";
// // import { loadFromStorage, STORAGE_KEYS } from "../../utils/storage";
// // import { SEMESTERS } from "../../data/mockData";
// // import { C } from "../../styles/theme";

// // export function FacultySubjectPreferenceForm({ faculty, onComplete }) {
// //   const [preferences, setPreferences] = useState([
// //     { level: 1, subjectId: "" },
// //     { level: 2, subjectId: "" },
// //     { level: 3, subjectId: "" },
// //   ]);
// //   const [availableSubjects, setAvailableSubjects] = useState([]);
// //   const [refresh, setRefresh] = useState(0);
// //   const [formStatus, setFormStatus] = useState(null);
// //   const [canSubmit, setCanSubmit] = useState(false);
  
// //   useEffect(() => {
// //     loadFormStatus();
// //     loadAvailableSubjects();
    
// //     const handleStorageChange = () => {
// //       loadFormStatus();
// //       loadAvailableSubjects();
// //       setRefresh(r => r + 1);
// //     };
    
// //     window.addEventListener('storage', handleStorageChange);
// //     return () => window.removeEventListener('storage', handleStorageChange);
// //   }, [faculty.course]);
  
// //   const loadFormStatus = () => {
// //     const status = loadFromStorage(STORAGE_KEYS.FORM_STATUS, {
// //       isFloated: false,
// //       floatedDate: null,
// //       floatedBy: null,
// //       semester: "2025",
// //       deadline: null
// //     });
// //     setFormStatus(status);
    
// //     // Check if form is floated and deadline hasn't passed
// //     const isDeadlinePassed = status.deadline ? new Date() > new Date(status.deadline) : false;
// //     setCanSubmit(status.isFloated && !isDeadlinePassed);
// //   };
  
// //   const loadAvailableSubjects = () => {
// //     const subjects = [];
// //     SEMESTERS.forEach(semester => {
// //       const semesterDetails = AppState.semesterDetails[faculty.course]?.[semester];
// //       if (semesterDetails && semesterDetails.subjects) {
// //         semesterDetails.subjects.forEach(subjectId => {
// //           const subject = AppState.subjects.find(s => s.id === subjectId);
// //           if (subject && subject.approvalStatus === "approved" && !subjects.find(s => s.id === subjectId)) {
// //             subjects.push({
// //               ...subject,
// //               semester
// //             });
// //           }
// //         });
// //       }
// //     });
// //     setAvailableSubjects(subjects);
// //   };
  
// //   const updatePreference = (level, subjectId) => {
// //     setPreferences(prefs => prefs.map(p => 
// //       p.level === level ? { ...p, subjectId } : p
// //     ));
// //   };
  
// //   const getUsedSubjects = () => {
// //     return preferences.map(p => p.subjectId).filter(id => id);
// //   };
  
// //   const isSubjectAvailable = (subjectId, currentLevel) => {
// //     const used = getUsedSubjects();
// //     return !used.includes(subjectId) || preferences.find(p => p.level === currentLevel)?.subjectId === subjectId;
// //   };
  
// //   const calculateWeeklyClasses = (subject) => {
// //     return {
// //       theoryClasses: subject.theoryClassesPerWeek,
// //       labPeriods: subject.labPeriodsPerWeek,
// //       total: subject.totalWeeklyClasses
// //     };
// //   };
  
// //   const handleSubmit = () => {
// //     if (!canSubmit) {
// //       alert("The preference form is not open for submission. Please contact the director.");
// //       return;
// //     }
    
// //     const selectedSubjects = preferences.filter(p => p.subjectId);
    
// //     if (selectedSubjects.length < 2) {
// //       alert("Please select at least 2 subject preferences");
// //       return;
// //     }
    
// //     const formattedPreferences = selectedSubjects.map(p => ({
// //       level: p.level,
// //       subjectId: p.subjectId
// //     }));
    
// //     AppState.submitSubjectPreferences(faculty.id, formattedPreferences);
// //     onComplete();
// //   };
  
// //   // Check if deadline is passed
// //   const isDeadlinePassed = formStatus?.deadline ? new Date() > new Date(formStatus.deadline) : false;
  
// //   return (
// //     <Card>
// //       <Title level={4}>Subject Preference Form</Title>
// //       <p style={{ color: C.text.secondary, fontSize: 13, marginBottom: 8 }}>Faculty ID: {faculty.facultyId} | {faculty.name}</p>
// //       <p style={{ color: C.accent.blue, fontSize: 13, marginBottom: 16 }}>Course: {faculty.course} | Designation: {faculty.designation}</p>
      
// //       {/* Form Status Message */}
// //       {!formStatus?.isFloated && (
// //         <div style={{ padding: 16, background: C.accent.goldBg, borderRadius: 8, marginBottom: 16 }}>
// //           <p style={{ color: C.accent.gold, margin: 0, fontWeight: 600 }}>
// //             ⏳ The preference form has not been floated yet. Please wait for the director to open submissions.
// //           </p>
// //         </div>
// //       )}
      
// //       {formStatus?.isFloated && isDeadlinePassed && (
// //         <div style={{ padding: 16, background: C.accent.redBg, borderRadius: 8, marginBottom: 16 }}>
// //           <p style={{ color: C.accent.red, margin: 0, fontWeight: 600 }}>
// //             ⚠ The submission deadline ({new Date(formStatus.deadline).toLocaleString()}) has passed. You cannot submit preferences now.
// //           </p>
// //         </div>
// //       )}
      
// //       {formStatus?.isFloated && !isDeadlinePassed && (
// //         <div style={{ padding: 16, background: C.accent.greenBg, borderRadius: 8, marginBottom: 16 }}>
// //           <p style={{ color: C.accent.green, margin: 0, fontWeight: 600 }}>
// //             ✓ Preference form is open! Please submit your preferences before {new Date(formStatus.deadline).toLocaleString()}
// //           </p>
// //         </div>
// //       )}
      
// //       <p style={{ color: C.accent.gold, fontSize: 12, marginBottom: 16 }}>Minimum 2 preferences required</p>
      
// //       {availableSubjects.length === 0 && (
// //         <div style={{ padding: 16, background: C.accent.goldBg, borderRadius: 8, marginBottom: 16 }}>
// //           <p style={{ color: C.accent.gold, margin: 0 }}>
// //             ⚠ No approved subjects have been configured for {faculty.course} course yet. 
// //             Please contact the coordinator or dean.
// //           </p>
// //         </div>
// //       )}
      
// //       <div style={{ marginBottom: 24 }}>
// //         <label style={{ color: C.text.secondary, fontSize: 12, display: "block", marginBottom: 12 }}>Subject Preferences (Ranked 1-3)</label>
        
// //         {preferences.map((pref, index) => (
// //           <div key={pref.level} style={{ marginBottom: 12 }}>
// //             <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
// //               <div style={{ 
// //                 width: 32, height: 32, borderRadius: "50%", 
// //                 background: index === 0 ? C.accent.goldBg : index === 1 ? C.accent.blueBg : C.accent.greenBg,
// //                 display: "flex", alignItems: "center", justifyContent: "center",
// //                 color: index === 0 ? C.accent.gold : index === 1 ? C.accent.blue : C.accent.green,
// //                 fontWeight: 700 
// //               }}>
// //                 {pref.level}
// //               </div>
// //               <select 
// //                 value={pref.subjectId} 
// //                 onChange={e => updatePreference(pref.level, e.target.value)}
// //                 disabled={!canSubmit || isDeadlinePassed}
// //                 style={{
// //                   flex: 1,
// //                   background: C.surface,
// //                   border: `1px solid ${C.border}`,
// //                   borderRadius: 8,
// //                   padding: "10px 12px",
// //                   color: C.text.primary,
// //                   fontSize: 13,
// //                   outline: "none",
// //                   opacity: (!canSubmit || isDeadlinePassed) ? 0.6 : 1,
// //                   cursor: (!canSubmit || isDeadlinePassed) ? "not-allowed" : "pointer"
// //                 }}
// //               >
// //                 <option value="">Select Preference {pref.level}</option>
// //                 {availableSubjects.map(subject => {
// //                   const weeklyClasses = calculateWeeklyClasses(subject);
// //                   return (
// //                     <option 
// //                       key={subject.id} 
// //                       value={subject.id}
// //                       disabled={!isSubjectAvailable(subject.id, pref.level)}
// //                     >
// //                       {subject.name} (Sem {subject.semester}, {weeklyClasses.total} classes/wk)
// //                     </option>
// //                   );
// //                 })}
// //               </select>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
      
// //       <div style={{ marginBottom: 24, padding: 16, background: C.cardHover, borderRadius: 12 }}>
// //         <p style={{ color: C.accent.gold, fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Selected Subjects Summary</p>
// //         {preferences.filter(p => p.subjectId).map(p => {
// //           const subject = AppState.subjects.find(s => s.id === p.subjectId);
// //           const weeklyClasses = subject ? calculateWeeklyClasses(subject) : { total: 0 };
          
// //           return (
// //             <div key={p.level} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
// //               <span style={{ color: C.text.primary }}>Pref {p.level}: {subject?.name}</span>
// //               <span style={{ color: C.accent.blue }}>{weeklyClasses.total}h/wk</span>
// //             </div>
// //           );
// //         })}
// //         {preferences.filter(p => p.subjectId).length < 2 && (
// //           <p style={{ color: C.accent.red, fontSize: 12, marginTop: 8 }}>⚠ Please select at least 2 preferences</p>
// //         )}
// //       </div>
      
// //       <Button
// //         onClick={handleSubmit}
// //         disabled={preferences.filter(p => p.subjectId).length < 2 || availableSubjects.length === 0 || !canSubmit || isDeadlinePassed}
// //         variant="success"
// //         fullWidth
// //       >
// //         {!canSubmit ? "Form Not Open Yet" : isDeadlinePassed ? "Deadline Passed" : "Submit Preferences"}
// //       </Button>
// //     </Card>
// //   );
// // }

// // src/components/faculty/FacultyPreferenceForm.jsx
// import { useState, useEffect } from "react";
// import { Card, Title, Button, Input, Select, Badge } from "../common";
// import { AppState } from "../../AppState";
// import { loadFromStorage, STORAGE_KEYS } from "../../utils/storage";
// import { SEMESTERS, EXAM_TYPES, SUBJECT_TYPES } from "../../data/mockData";
// import { C } from "../../styles/theme";

// export function FacultyPreferenceForm({ faculty, onComplete }) {
//   const [formData, setFormData] = useState({
//     title: "",
//     name: faculty?.name || "",
//     email: faculty?.email || "",
//     contactNumber: "",
//     designation: faculty?.designation || "",
//     preferences: [
//       { level: 1, subjectId: "", subjectCode: "", subjectName: "", semester: "", subjectType: "", examType: "", theoryHours: 0, labHours: 0 },
//       { level: 2, subjectId: "", subjectCode: "", subjectName: "", semester: "", subjectType: "", examType: "", theoryHours: 0, labHours: 0 },
//       { level: 3, subjectId: "", subjectCode: "", subjectName: "", semester: "", subjectType: "", examType: "", theoryHours: 0, labHours: 0 }
//     ]
//   });

//   const [availableSubjects, setAvailableSubjects] = useState([]);
//   const [settings, setSettings] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [refresh, setRefresh] = useState(0);

//   const titleOptions = [
//     { value: "Dr.", label: "Dr." },
//     { value: "Prof.", label: "Prof." },
//     { value: "Mr.", label: "Mr." },
//     { value: "Mrs.", label: "Mrs." },
//     { value: "Miss.", label: "Miss." }
//   ];

//   useEffect(() => {
//     loadSettings();
//     loadAvailableSubjects();
    
//     const handleStorageChange = () => {
//       loadSettings();
//       loadAvailableSubjects();
//       setRefresh(r => r + 1);
//     };
    
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, [faculty.course]);

//   const loadSettings = () => {
//     const savedSettings = loadFromStorage(STORAGE_KEYS.PREFERENCE_SETTINGS, {
//       requireOneCoreOneMajorOneMinor: true,
//       requireDifferentSemesters: true,
//       maxPreferencesPerFaculty: 3,
//       minPreferencesRequired: 3,
//       allowSameSemester: false,
//       allowSameType: false
//     });
//     setSettings(savedSettings);
//   };

//   const loadAvailableSubjects = () => {
//     const subjects = [];
//     SEMESTERS.forEach(semester => {
//       const semesterDetails = AppState.semesterDetails[faculty.course]?.[semester];
//       if (semesterDetails && semesterDetails.subjects) {
//         semesterDetails.subjects.forEach(subjectId => {
//           const subject = AppState.subjects.find(s => s.id === subjectId);
//           if (subject && subject.approvalStatus === "approved" && !subjects.find(s => s.id === subjectId)) {
//             subjects.push({
//               ...subject,
//               semester: semester
//             });
//           }
//         });
//       }
//     });
//     setAvailableSubjects(subjects);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handlePreferenceChange = (level, subjectId) => {
//     const selectedSubject = availableSubjects.find(s => s.id === subjectId);
    
//     setFormData(prev => ({
//       ...prev,
//       preferences: prev.preferences.map(p => 
//         p.level === level ? {
//           ...p,
//           subjectId: subjectId,
//           subjectCode: selectedSubject?.code || "",
//           subjectName: selectedSubject?.name || "",
//           semester: selectedSubject?.semester || "",
//           subjectType: selectedSubject?.subjectType || "",
//           examType: selectedSubject?.examType || "",
//           theoryHours: selectedSubject?.theoryClassesPerWeek || 0,
//           labHours: selectedSubject?.labPeriodsPerWeek || 0
//         } : p
//       )
//     }));
    
//     // Clear errors for this preference
//     if (errors[`pref${level}`]) {
//       setErrors(prev => ({ ...prev, [`pref${level}`]: "" }));
//     }
//   };

//   const validatePreferences = () => {
//     const newErrors = {};
//     const selectedPreferences = formData.preferences.filter(p => p.subjectId);
    
//     // Check minimum preferences
//     if (selectedPreferences.length < settings.minPreferencesRequired) {
//       newErrors.general = `Please select at least ${settings.minPreferencesRequired} subject preferences`;
//     }
    
//     // Check for duplicate subjects
//     const subjectIds = selectedPreferences.map(p => p.subjectId);
//     const hasDuplicates = subjectIds.length !== new Set(subjectIds).size;
//     if (hasDuplicates) {
//       newErrors.general = "Cannot select the same subject for multiple preferences";
//     }
    
//     // Check one Core, one Major, one Minor condition
//     if (settings.requireOneCoreOneMajorOneMinor && selectedPreferences.length === 3) {
//       const hasCore = selectedPreferences.some(p => p.subjectType === "Core");
//       const hasMajor = selectedPreferences.some(p => p.subjectType === "Major");
//       const hasMinor = selectedPreferences.some(p => p.subjectType === "Minor");
      
//       if (!hasCore || !hasMajor || !hasMinor) {
//         newErrors.general = "You must select one Core, one Major, and one Minor subject";
//       }
//     }
    
//     // Check different semesters condition
//     if (settings.requireDifferentSemesters && !settings.allowSameSemester) {
//       const semesters = selectedPreferences.map(p => p.semester);
//       const hasDuplicateSemesters = semesters.length !== new Set(semesters).size;
//       if (hasDuplicateSemesters) {
//         newErrors.general = "Preferences must be from different semesters";
//       }
//     }
    
//     // Check same type condition
//     if (!settings.allowSameType && selectedPreferences.length === 3) {
//       const subjectTypes = selectedPreferences.map(p => p.subjectType);
//       const hasDuplicateTypes = subjectTypes.length !== new Set(subjectTypes).size;
//       if (hasDuplicateTypes) {
//         newErrors.general = "Cannot select multiple subjects of the same type (Core/Major/Minor)";
//       }
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = () => {
//     // Validate personal details
//     if (!formData.title) {
//       alert("Please select your title");
//       return;
//     }
//     if (!formData.contactNumber) {
//       alert("Please enter your contact number");
//       return;
//     }
//     if (!formData.email) {
//       alert("Please enter your email");
//       return;
//     }
    
//     // Validate preferences
//     if (!validatePreferences()) {
//       return;
//     }
    
//     const selectedPreferences = formData.preferences.filter(p => p.subjectId);
//     const formattedPreferences = selectedPreferences.map(p => ({
//       level: p.level,
//       subjectId: p.subjectId,
//       subjectCode: p.subjectCode,
//       subjectName: p.subjectName,
//       semester: p.semester,
//       subjectType: p.subjectType,
//       examType: p.examType,
//       theoryHours: p.theoryHours,
//       labHours: p.labHours
//     }));
    
//     const submissionData = {
//       facultyId: faculty.id,
//       facultyName: `${formData.title} ${formData.name}`,
//       email: formData.email,
//       contactNumber: formData.contactNumber,
//       designation: formData.designation,
//       course: faculty.course,
//       submittedAt: new Date().toISOString(),
//       preferences: formattedPreferences
//     };
    
//     AppState.submitSubjectPreferences(faculty.id, formattedPreferences);
    
//     // Also save the full form data
//     saveToStorage(`${STORAGE_KEYS.FACULTY_PREFERENCE_FORM}_${faculty.id}`, submissionData);
    
//     alert("Preferences submitted successfully!");
//     onComplete();
//   };

//   const getSubjectTypeColor = (type) => {
//     switch(type) {
//       case "Core": return C.accent.blue;
//       case "Major": return C.accent.green;
//       case "Minor": return C.accent.gold;
//       default: return C.text.secondary;
//     }
//   };

//   return (
//     <Card>
//       <Title level={4}>Faculty Subject Preference Form</Title>
      
//       {/* Personal Information Section */}
//       <div style={{ marginBottom: 24 }}>
//         <h5 style={{ color: C.text.primary, fontSize: 16, fontWeight: 600, marginBottom: 16, borderBottom: `2px solid ${C.accent.blue}`, paddingBottom: 8 }}>
//           Personal Information
//         </h5>
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
//           <Select
//             label="Title"
//             name="title"
//             value={formData.title}
//             onChange={handleInputChange}
//             options={titleOptions}
//             required
//           />
//           <Input
//             label="Full Name"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             placeholder="Enter your full name"
//             required
//             disabled
//           />
//           <Input
//             label="Email ID"
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             placeholder="faculty@university.edu"
//             required
//           />
//           <Input
//             label="Contact Number"
//             name="contactNumber"
//             type="tel"
//             value={formData.contactNumber}
//             onChange={handleInputChange}
//             placeholder="+91 XXXXXXXXXX"
//             required
//           />
//           <Input
//             label="Designation"
//             name="designation"
//             value={formData.designation}
//             onChange={handleInputChange}
//             disabled
//           />
//           <Input
//             label="Course"
//             value={faculty.course}
//             disabled
//           />
//         </div>
//       </div>
      
//       {/* Subject Preferences Section */}
//       <div style={{ marginBottom: 24 }}>
//         <h5 style={{ color: C.text.primary, fontSize: 16, fontWeight: 600, marginBottom: 16, borderBottom: `2px solid ${C.accent.blue}`, paddingBottom: 8 }}>
//           Subject Preferences (Rank 1, 2, 3)
//         </h5>
        
//         {/* Rules Summary */}
//         {settings && (
//           <div style={{ marginBottom: 16, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
//             <p style={{ color: C.accent.blue, fontWeight: 600, marginBottom: 4 }}>Preference Rules:</p>
//             <ul style={{ color: C.text.secondary, fontSize: 12, margin: 0, paddingLeft: 20 }}>
//               <li>Select {settings.minPreferencesRequired} different subjects</li>
//               {settings.requireOneCoreOneMajorOneMinor && <li>Must select one Core, one Major, and one Minor subject</li>}
//               {settings.requireDifferentSemesters && !settings.allowSameSemester && <li>Each preference must be from a different semester</li>}
//             </ul>
//           </div>
//         )}
        
//         {formData.preferences.map((pref, index) => (
//           <div key={pref.level} style={{ marginBottom: 20, padding: 16, background: C.cardHover, borderRadius: 12 }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
//               <div style={{ 
//                 width: 40, height: 40, borderRadius: "50%", 
//                 background: index === 0 ? C.accent.goldBg : index === 1 ? C.accent.blueBg : C.accent.greenBg,
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 color: index === 0 ? C.accent.gold : index === 1 ? C.accent.blue : C.accent.green,
//                 fontWeight: 700,
//                 fontSize: 18
//               }}>
//                 {pref.level}
//               </div>
//               <h5 style={{ color: C.text.primary, fontWeight: 600 }}>Preference {pref.level}</h5>
//             </div>
            
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
//               <Select
//                 label="Select Subject"
//                 value={pref.subjectId}
//                 onChange={e => handlePreferenceChange(pref.level, e.target.value)}
//                 options={[
//                   { value: "", label: "-- Select a subject --" },
//                   ...availableSubjects.map(subject => ({ 
//                     value: subject.id, 
//                     label: `${subject.name} (${subject.code}) - ${subject.subjectType} - Sem ${subject.semester}` 
//                   }))
//                 ]}
//               />
              
//               {pref.subjectId && (
//                 <>
//                   <div style={{ padding: 8, background: C.surface, borderRadius: 8 }}>
//                     <span style={{ color: C.text.tertiary, fontSize: 11 }}>Subject Code</span>
//                     <p style={{ color: C.accent.blue, fontWeight: 600 }}>{pref.subjectCode}</p>
//                   </div>
//                   <div style={{ padding: 8, background: C.surface, borderRadius: 8 }}>
//                     <span style={{ color: C.text.tertiary, fontSize: 11 }}>Subject Type</span>
//                     <p style={{ color: getSubjectTypeColor(pref.subjectType), fontWeight: 600 }}>{pref.subjectType}</p>
//                   </div>
//                   <div style={{ padding: 8, background: C.surface, borderRadius: 8 }}>
//                     <span style={{ color: C.text.tertiary, fontSize: 11 }}>Exam Type</span>
//                     <p style={{ color: C.text.primary, fontWeight: 600 }}>{pref.examType}</p>
//                   </div>
//                   <div style={{ padding: 8, background: C.surface, borderRadius: 8 }}>
//                     <span style={{ color: C.text.tertiary, fontSize: 11 }}>Semester</span>
//                     <p style={{ color: C.accent.gold, fontWeight: 600 }}>Semester {pref.semester}</p>
//                   </div>
//                   <div style={{ padding: 8, background: C.surface, borderRadius: 8 }}>
//                     <span style={{ color: C.text.tertiary, fontSize: 11 }}>Theory Hours/Week</span>
//                     <p style={{ color: C.accent.blue, fontWeight: 600 }}>{pref.theoryHours} hrs</p>
//                   </div>
//                   <div style={{ padding: 8, background: C.surface, borderRadius: 8 }}>
//                     <span style={{ color: C.text.tertiary, fontSize: 11 }}>Lab Hours/Week</span>
//                     <p style={{ color: C.accent.green, fontWeight: 600 }}>{pref.labHours} hrs</p>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         ))}
        
//         {errors.general && (
//           <div style={{ padding: 12, background: C.accent.redBg, borderRadius: 8, marginTop: 16 }}>
//             <p style={{ color: C.accent.red, margin: 0 }}>⚠ {errors.general}</p>
//           </div>
//         )}
//       </div>
      
//       {/* Summary Section */}
//       {formData.preferences.filter(p => p.subjectId).length > 0 && (
//         <div style={{ marginBottom: 24, padding: 16, background: C.accent.greenBg, borderRadius: 12 }}>
//           <h5 style={{ color: C.accent.green, fontWeight: 600, marginBottom: 8 }}>Selected Preferences Summary</h5>
//           {formData.preferences.filter(p => p.subjectId).map(p => (
//             <div key={p.level} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, padding: 8, background: C.surface, borderRadius: 8 }}>
//               <div>
//                 <span style={{ fontWeight: 600 }}>Preference {p.level}:</span>
//                 <span style={{ marginLeft: 8 }}>{p.subjectName}</span>
//                 <Badge variant={p.subjectType === "Core" ? "primary" : p.subjectType === "Major" ? "success" : "warning"} style={{ marginLeft: 8 }}>
//                   {p.subjectType}
//                 </Badge>
//               </div>
//               <div style={{ color: C.text.tertiary, fontSize: 12 }}>
//                 Sem {p.semester} | {p.theoryHours + p.labHours} hrs/wk
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
      
//       <Button
//         onClick={handleSubmit}
//         variant="success"
//         fullWidth
//         size="lg"
//       >
//         Submit Preferences
//       </Button>
//     </Card>
//   );
// }

// src/components/faculty/FacultyPreferenceForm.jsx
import { useState, useEffect } from "react";
import { Card, Title, Button, Input, Badge } from "../common";
import { AppState } from "../../AppState";
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "../../utils/storage";
import { SEMESTERS } from "../../data/mockData";
import { C } from "../../styles/theme";

export function FacultyPreferenceForm({ faculty, onComplete }) {
  const [formData, setFormData] = useState({
    title: "",
    name: faculty?.name || "",
    email: faculty?.email || "",
    contactNumber: "",
    designation: faculty?.designation || "",
    preferences: [
      { level: 1, subjectId: "", subjectCode: "", subjectName: "", semester: "", subjectType: "", examType: "", theoryHours: 0, labHours: 0, totalHours: 0 },
      { level: 2, subjectId: "", subjectCode: "", subjectName: "", semester: "", subjectType: "", examType: "", theoryHours: 0, labHours: 0, totalHours: 0 },
      { level: 3, subjectId: "", subjectCode: "", subjectName: "", semester: "", subjectType: "", examType: "", theoryHours: 0, labHours: 0, totalHours: 0 }
    ]
  });

  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [settings, setSettings] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const titleOptions = [
    { value: "", label: "-- Select Title --" },
    { value: "Dr.", label: "Dr." },
    { value: "Prof.", label: "Prof." },
    { value: "Mr.", label: "Mr." },
    { value: "Mrs.", label: "Mrs." },
    { value: "Miss.", label: "Miss." }
  ];

  const designationOptions = [
    { value: "", label: "-- Select Designation --" },
    { value: "Assistant Professor", label: "Assistant Professor" },
    { value: "Associate Professor", label: "Associate Professor" },
    { value: "Professor", label: "Professor" },
    { value: "Visiting Professor", label: "Visiting Professor" }
  ];

  useEffect(() => {
    loadSettings();
    loadAvailableSubjects();
    
    const handleStorageChange = () => {
      loadSettings();
      loadAvailableSubjects();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [faculty.course]);

  const loadSettings = () => {
    const savedSettings = loadFromStorage(STORAGE_KEYS.PREFERENCE_SETTINGS, {
      requireOneCoreOneMajorOneMinor: true,
      requireDifferentSemesters: false,
      maxPreferencesPerFaculty: 3,
      minPreferencesRequired: 3,
      allowSameSemester: true,
      allowSameType: false,
      requireDifferentSubjects: true
    });
    setSettings(savedSettings);
  };

  const loadAvailableSubjects = () => {
    const subjects = [];
    SEMESTERS.forEach(semester => {
      const semesterDetails = AppState.semesterDetails[faculty.course]?.[semester];
      if (semesterDetails && semesterDetails.subjects) {
        semesterDetails.subjects.forEach(subjectId => {
          const subject = AppState.subjects.find(s => s.id === subjectId);
          if (subject && subject.approvalStatus === "approved" && !subjects.find(s => s.id === subjectId)) {
            subjects.push({
              id: subject.id,
              code: subject.code,
              name: subject.name,
              course: subject.course,
              semester: semester,
              credits: subject.credits,
              modules: subject.modules,
              type: subject.type,
              theoryClassesPerWeek: subject.theoryClassesPerWeek || 0,
              labPeriodsPerWeek: subject.labPeriodsPerWeek || 0,
              totalWeeklyClasses: subject.totalWeeklyClasses,
              examType: subject.examType || "SEE",
              subjectType: subject.subjectType || "Core",
              approvalStatus: subject.approvalStatus
            });
          }
        });
      }
    });
    setAvailableSubjects(subjects);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, title: value }));
    if (errors.title) {
      setErrors(prev => ({ ...prev, title: "" }));
    }
  };

  const handleDesignationChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, designation: value }));
    if (errors.designation) {
      setErrors(prev => ({ ...prev, designation: "" }));
    }
  };

  const getSelectedSubjectIds = () => {
    return formData.preferences.map(p => p.subjectId).filter(id => id && id !== "");
  };

  const handlePreferenceChange = (level, subjectId) => {
    const selectedSubject = availableSubjects.find(s => s.id === subjectId);
    const selectedIds = getSelectedSubjectIds();
    const currentPreference = formData.preferences.find(p => p.level === level);
    
    if (subjectId && selectedIds.includes(subjectId) && currentPreference?.subjectId !== subjectId) {
      alert("This subject has already been selected for another preference. Please choose a different subject.");
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.map(p => 
        p.level === level ? {
          ...p,
          subjectId: subjectId,
          subjectCode: selectedSubject?.code || "",
          subjectName: selectedSubject?.name || "",
          semester: selectedSubject?.semester || "",
          subjectType: selectedSubject?.subjectType || "",
          examType: selectedSubject?.examType || "",
          theoryHours: selectedSubject?.theoryClassesPerWeek || 0,
          labHours: selectedSubject?.labPeriodsPerWeek || 0,
          totalHours: (selectedSubject?.theoryClassesPerWeek || 0) + (selectedSubject?.labPeriodsPerWeek || 0)
        } : p
      )
    }));
    
    if (errors[`pref${level}`]) {
      setErrors(prev => ({ ...prev, [`pref${level}`]: "" }));
    }
  };

  const validatePreferences = () => {
    const newErrors = {};
    const selectedPreferences = formData.preferences.filter(p => p.subjectId && p.subjectId !== "");
    
    if (selectedPreferences.length < settings.minPreferencesRequired) {
      newErrors.general = `Please select at least ${settings.minPreferencesRequired} subject preferences`;
      setErrors(newErrors);
      return false;
    }
    
    if (settings.requireDifferentSubjects) {
      const subjectIds = selectedPreferences.map(p => p.subjectId);
      const hasDuplicates = subjectIds.length !== new Set(subjectIds).size;
      if (hasDuplicates) {
        newErrors.general = "Cannot select the same subject for multiple preferences";
        setErrors(newErrors);
        return false;
      }
    }
    
    if (settings.requireOneCoreOneMajorOneMinor && selectedPreferences.length >= 3) {
      const hasCore = selectedPreferences.some(p => p.subjectType === "Core");
      const hasMajor = selectedPreferences.some(p => p.subjectType === "Major");
      const hasMinor = selectedPreferences.some(p => p.subjectType === "Minor");
      
      if (!hasCore || !hasMajor || !hasMinor) {
        newErrors.general = "You must select one Core, one Major, and one Minor subject";
        setErrors(newErrors);
        return false;
      }
    }
    
    if (settings.requireDifferentSemesters && !settings.allowSameSemester && selectedPreferences.length >= 2) {
      const semesters = selectedPreferences.map(p => p.semester);
      const hasDuplicateSemesters = semesters.length !== new Set(semesters).size;
      if (hasDuplicateSemesters) {
        newErrors.general = "Preferences must be from different semesters";
        setErrors(newErrors);
        return false;
      }
    }
    
    if (!settings.allowSameType && settings.requireOneCoreOneMajorOneMinor && selectedPreferences.length >= 3) {
      const coreCount = selectedPreferences.filter(p => p.subjectType === "Core").length;
      const majorCount = selectedPreferences.filter(p => p.subjectType === "Major").length;
      const minorCount = selectedPreferences.filter(p => p.subjectType === "Minor").length;
      
      if (coreCount > 1 || majorCount > 1 || minorCount > 1) {
        newErrors.general = "Cannot select multiple subjects of the same type (Core/Major/Minor)";
        setErrors(newErrors);
        return false;
      }
    }
    
    setErrors({});
    return true;
  };

  const handleSubmit = async () => {
    setErrors({});
    
    if (!formData.title || formData.title === "") {
      alert("Please select your title");
      return;
    }
    if (!formData.designation || formData.designation === "") {
      alert("Please select your designation");
      return;
    }
    if (!formData.contactNumber) {
      alert("Please enter your contact number");
      return;
    }
    if (!formData.email) {
      alert("Please enter your email");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }
    
    if (formData.contactNumber.length < 10) {
      alert("Please enter a valid contact number (minimum 10 digits)");
      return;
    }
    
    if (!validatePreferences()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const selectedPreferences = formData.preferences.filter(p => p.subjectId && p.subjectId !== "");
      const formattedPreferences = selectedPreferences.map(p => ({
        level: p.level,
        subjectId: p.subjectId,
        subjectCode: p.subjectCode,
        subjectName: p.subjectName,
        semester: p.semester,
        subjectType: p.subjectType,
        examType: p.examType,
        theoryHours: p.theoryHours,
        labHours: p.labHours,
        totalHours: p.totalHours
      }));
      
      const submissionData = {
        facultyId: faculty.id,
        facultyName: `${formData.title} ${formData.name}`,
        email: formData.email,
        contactNumber: formData.contactNumber,
        designation: formData.designation,
        course: faculty.course,
        submittedAt: new Date().toISOString(),
        preferences: formattedPreferences
      };
      
      AppState.submitSubjectPreferences(faculty.id, formattedPreferences);
      saveToStorage(`${STORAGE_KEYS.FACULTY_PREFERENCE_FORM}_${faculty.id}`, submissionData);
      
      const existingSubmissions = loadFromStorage(STORAGE_KEYS.FACULTY_SUBMISSIONS, []);
      const updatedSubmissions = existingSubmissions.filter(s => s.facultyId !== faculty.id);
      updatedSubmissions.push(submissionData);
      saveToStorage(STORAGE_KEYS.FACULTY_SUBMISSIONS, updatedSubmissions);
      
      window.dispatchEvent(new Event('storage'));
      
      alert("✅ Preferences submitted successfully!");
      onComplete();
    } catch (error) {
      console.error("Error submitting preferences:", error);
      alert("❌ Failed to submit preferences. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getExamTypeBadge = (examType) => {
    switch(examType) {
      case "SEE": return <Badge variant="primary">SEE</Badge>;
      case "Practical": return <Badge variant="success">Practical</Badge>;
      case "Seminar": return <Badge variant="warning">Seminar</Badge>;
      default: return <Badge variant="primary">{examType}</Badge>;
    }
  };

  const getSubjectTypeBadge = (subjectType) => {
    switch(subjectType) {
      case "Core": return <Badge variant="primary">Core</Badge>;
      case "Major": return <Badge variant="success">Major</Badge>;
      case "Minor": return <Badge variant="warning">Minor</Badge>;
      default: return <Badge variant="primary">{subjectType}</Badge>;
    }
  };

  // Calculate total hours for selected preferences
  const totalSelectedHours = formData.preferences
    .filter(p => p.subjectId && p.subjectId !== "")
    .reduce((sum, p) => sum + p.totalHours, 0);

  return (
    <Card>
      <Title level={4}>Faculty Subject Preference Form</Title>
      
      {/* Personal Information Section */}
      <div style={{ marginBottom: 24 }}>
        <h5 style={{ color: C.text.primary, fontSize: 16, fontWeight: 600, marginBottom: 16, borderBottom: `2px solid ${C.accent.blue}`, paddingBottom: 8 }}>
          Personal Information
        </h5>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: C.text.secondary, fontSize: 13, display: "block", marginBottom: 6 }}>Title *</label>
            <select
              style={{
                width: "100%",
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                padding: "10px 14px",
                color: C.text.primary,
                fontSize: 14,
                outline: "none",
                cursor: "pointer"
              }}
              value={formData.title}
              onChange={handleTitleChange}
            >
              {titleOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            disabled
          />
          
          <Input
            label="Email ID"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="faculty@university.edu"
            required
          />
          
          <Input
            label="Contact Number"
            name="contactNumber"
            type="tel"
            value={formData.contactNumber}
            onChange={handleInputChange}
            placeholder="+91 XXXXXXXXXX"
            required
          />
          
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: C.text.secondary, fontSize: 13, display: "block", marginBottom: 6 }}>Designation *</label>
            <select
              style={{
                width: "100%",
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                padding: "10px 14px",
                color: C.text.primary,
                fontSize: 14,
                outline: "none",
                cursor: "pointer"
              }}
              value={formData.designation}
              onChange={handleDesignationChange}
            >
              {designationOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          
          <Input
            label="Course"
            value={faculty.course}
            disabled
          />
        </div>
      </div>
      
      {/* Subject Preferences Section */}
      <div style={{ marginBottom: 24 }}>
        <h5 style={{ color: C.text.primary, fontSize: 16, fontWeight: 600, marginBottom: 16, borderBottom: `2px solid ${C.accent.blue}`, paddingBottom: 8 }}>
          Subject Preferences (Rank 1, 2, 3)
        </h5>
        
        {settings && (
          <div style={{ marginBottom: 16, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
            <p style={{ color: C.accent.blue, fontWeight: 600, marginBottom: 4 }}>Preference Rules:</p>
            <ul style={{ color: C.text.secondary, fontSize: 12, margin: 0, paddingLeft: 20 }}>
              <li>Select {settings.minPreferencesRequired} different subjects</li>
              {settings.requireOneCoreOneMajorOneMinor && <li>Must select one Core, one Major, and one Minor subject</li>}
              {settings.allowSameSemester && <li>✓ Multiple preferences from the same semester are allowed</li>}
              {/* {settings.requireDifferentSubjects && <li>Cannot select the same subject twice</li>} */}
            </ul>
          </div>
        )}
        
        {formData.preferences.map((pref, index) => (
          <div key={pref.level} style={{ marginBottom: 20, padding: 16, background: C.cardHover, borderRadius: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ 
                width: 40, height: 40, borderRadius: "50%", 
                background: index === 0 ? C.accent.goldBg : index === 1 ? C.accent.blueBg : C.accent.greenBg,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: index === 0 ? C.accent.gold : index === 1 ? C.accent.blue : C.accent.green,
                fontWeight: 700,
                fontSize: 18
              }}>
                {pref.level}
              </div>
              <h5 style={{ color: C.text.primary, fontWeight: 600 }}>Preference {pref.level}</h5>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ color: C.text.secondary, fontSize: 13, display: "block", marginBottom: 6 }}>Select Subject *</label>
                <select
                  style={{
                    width: "100%",
                    background: C.surface,
                    border: `1px solid ${C.border}`,
                    borderRadius: 10,
                    padding: "10px 14px",
                    color: C.text.primary,
                    fontSize: 14,
                    outline: "none",
                    cursor: "pointer"
                  }}
                  value={pref.subjectId}
                  onChange={e => handlePreferenceChange(pref.level, e.target.value)}
                >
                  <option value="">-- Select a subject --</option>
                  {availableSubjects.map(subject => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name} ({subject.code}) - {subject.subjectType} - Sem {subject.semester} - {subject.totalWeeklyClasses}h/wk
                    </option>
                  ))}
                </select>
              </div>
              
              {pref.subjectId && pref.subjectId !== "" && (
                <>
                  <div style={{ padding: 8, background: C.surface, borderRadius: 8 }}>
                    <span style={{ color: C.text.tertiary, fontSize: 11 }}>Course Code</span>
                    <p style={{ color: C.accent.blue, fontWeight: 600, margin: 0 }}>{pref.subjectCode || "N/A"}</p>
                  </div>
                  <div style={{ padding: 8, background: C.surface, borderRadius: 8 }}>
                    <span style={{ color: C.text.tertiary, fontSize: 11 }}>Subject Type</span>
                    <p style={{ margin: 0 }}>{getSubjectTypeBadge(pref.subjectType)}</p>
                  </div>
                  <div style={{ padding: 8, background: C.surface, borderRadius: 8 }}>
                    <span style={{ color: C.text.tertiary, fontSize: 11 }}>Exam Type</span>
                    <p style={{ margin: 0 }}>{getExamTypeBadge(pref.examType)}</p>
                  </div>
                  <div style={{ padding: 8, background: C.surface, borderRadius: 8 }}>
                    <span style={{ color: C.text.tertiary, fontSize: 11 }}>Semester</span>
                    <p style={{ color: C.accent.gold, fontWeight: 600, margin: 0 }}>Semester {pref.semester}</p>
                  </div>
                  <div style={{ padding: 8, background: C.surface, borderRadius: 8 }}>
                    <span style={{ color: C.text.tertiary, fontSize: 11 }}>Theory Hours/Week</span>
                    <p style={{ color: C.accent.blue, fontWeight: 600, margin: 0 }}>{pref.theoryHours} hrs</p>
                  </div>
                  <div style={{ padding: 8, background: C.surface, borderRadius: 8 }}>
                    <span style={{ color: C.text.tertiary, fontSize: 11 }}>Lab Hours/Week</span>
                    <p style={{ color: C.accent.green, fontWeight: 600, margin: 0 }}>{pref.labHours} hrs</p>
                  </div>
                  <div style={{ padding: 8, background: C.surface, borderRadius: 8 }}>
                    <span style={{ color: C.text.tertiary, fontSize: 11 }}>Total Hours/Week</span>
                    <p style={{ color: C.accent.purple, fontWeight: 700, margin: 0 }}>{pref.totalHours} hrs</p>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
        
        {errors.general && (
          <div style={{ padding: 12, background: C.accent.redBg, borderRadius: 8, marginTop: 16 }}>
            <p style={{ color: C.accent.red, margin: 0 }}>⚠ {errors.general}</p>
          </div>
        )}
      </div>
      
      {/* Summary Section with Total Hours */}
      {formData.preferences.filter(p => p.subjectId && p.subjectId !== "").length > 0 && (
        <div style={{ marginBottom: 24, padding: 16, background: C.accent.greenBg, borderRadius: 12 }}>
          <h5 style={{ color: C.accent.green, fontWeight: 600, marginBottom: 8 }}>Selected Preferences Summary</h5>
          {formData.preferences.filter(p => p.subjectId && p.subjectId !== "").map(p => (
            <div key={p.level} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, padding: 8, background: C.surface, borderRadius: 8 }}>
              <div>
                <span style={{ fontWeight: 600 }}>Preference {p.level}:</span>
                <span style={{ marginLeft: 8 }}>{p.subjectName}</span>
                <span style={{ marginLeft: 8, fontSize: 12, color: C.text.tertiary }}>({p.subjectCode})</span>
                {getSubjectTypeBadge(p.subjectType)}
              </div>
              <div style={{ color: C.accent.purple, fontWeight: 600, fontSize: 13 }}>
                {p.totalHours} hrs/wk
              </div>
            </div>
          ))}
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.accent.green}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 600, color: C.text.primary }}>Total Weekly Hours:</span>
              <span style={{ color: C.accent.purple, fontWeight: 700, fontSize: 18 }}>{totalSelectedHours} hrs/week</span>
            </div>
          </div>
        </div>
      )}
      
      <Button
        onClick={handleSubmit}
        variant="success"
        fullWidth
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Preferences"}
      </Button>
    </Card>
  );
}