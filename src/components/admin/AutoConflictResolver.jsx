// // src/components/admin/AutoConflictResolver.jsx
// import { useState, useEffect } from "react";
// import { Card, Title, Badge, Button, Select } from "../common";
// import { AppState } from "../../AppState";
// import { saveToStorage, loadFromStorage, STORAGE_KEYS } from "../../utils/storage";
// import { C } from "../../styles/theme";

// export function AutoConflictResolver({ approvedCourses, department, onResolved, onCancel }) {
//   const [resolutions, setResolutions] = useState([]);
//   const [appliedResolutions, setAppliedResolutions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [applying, setApplying] = useState(false);
//   const [showDetails, setShowDetails] = useState(true);

//   useEffect(() => {
//     generateAutoResolutions();
//   }, [approvedCourses, department]);

//   const generateAutoResolutions = () => {
//     setLoading(true);
//     const generatedResolutions = [];
    
//     // Get faculty and subjects
//     const facultyList = AppState.faculty || [];
//     const subjectsList = AppState.subjects || [];
    
//     // 1. Analyze Faculty Workload
//     const facultyLoad = {};
//     for (const course of approvedCourses) {
//       const subject = subjectsList.find(s => s.id === course.subjectId);
//       const faculty = facultyList.find(f => f.id === course.facultyId);
//       if (subject && faculty) {
//         facultyLoad[faculty.id] = facultyLoad[faculty.id] || {
//           id: faculty.id,
//           name: faculty.name,
//           assigned: 0,
//           max: faculty.maxHours,
//           subjects: []
//         };
//         facultyLoad[faculty.id].assigned += subject.totalWeeklyClasses;
//         facultyLoad[faculty.id].subjects.push({
//           courseId: course.id,
//           subjectId: subject.id,
//           subjectName: subject.name,
//           hours: subject.totalWeeklyClasses
//         });
//       }
//     }
    
//     // Find overloaded faculty and generate resolutions
//     for (const [id, load] of Object.entries(facultyLoad)) {
//       if (load.assigned > load.max) {
//         const overload = load.assigned - load.max;
        
//         // Find available faculty in same department
//         const availableFaculty = facultyList.filter(f => 
//           f.course === department && 
//           f.id !== parseInt(id) && 
//           (facultyLoad[f.id]?.assigned || 0) + 4 <= f.maxHours
//         );
        
//         if (availableFaculty.length > 0 && load.subjects.length > 0) {
//           // Sort subjects by hours (smallest first for easier redistribution)
//           const sortedSubjects = [...load.subjects].sort((a, b) => a.hours - b.hours);
//           let remainingOverload = overload;
//           const subjectsToMove = [];
          
//           for (const subject of sortedSubjects) {
//             if (remainingOverload > 0 && subject.hours <= remainingOverload + 2) {
//               subjectsToMove.push(subject);
//               remainingOverload -= subject.hours;
//             }
//           }
          
//           if (subjectsToMove.length > 0) {
//             generatedResolutions.push({
//               id: `resolve_${id}`,
//               type: "faculty_overload",
//               facultyId: parseInt(id),
//               facultyName: load.name,
//               overload: overload,
//               subjectsToMove: subjectsToMove,
//               targetFacultyId: availableFaculty[0].id,
//               targetFacultyName: availableFaculty[0].name,
//               action: "reassign",
//               applied: false,
//               canRevert: true
//             });
//           }
//         }
//       }
//     }
    
//     // 2. Slot Capacity Optimization
//     const TEACHING_SLOTS_PER_WEEK = 40;
//     const SECTIONS = 3;
//     const totalAvailableSlots = TEACHING_SLOTS_PER_WEEK * SECTIONS;
//     let totalRequiredSlots = 0;
//     const subjectHours = [];
    
//     for (const course of approvedCourses) {
//       const subject = subjectsList.find(s => s.id === course.subjectId);
//       if (subject) {
//         totalRequiredSlots += subject.totalWeeklyClasses * SECTIONS;
//         subjectHours.push({
//           courseId: course.id,
//           subjectId: subject.id,
//           subjectName: subject.name,
//           hours: subject.totalWeeklyClasses,
//           semester: course.semester
//         });
//       }
//     }
    
//     if (totalRequiredSlots > totalAvailableSlots) {
//       const deficit = totalRequiredSlots - totalAvailableSlots;
//       // Sort subjects by hours (largest first for reduction)
//       const sortedSubjects = [...subjectHours].sort((a, b) => b.hours - a.hours);
//       let remainingDeficit = deficit;
//       const subjectsToReduce = [];
      
//       for (const subject of sortedSubjects) {
//         if (remainingDeficit > 0 && subject.hours > 3) {
//           const reduceBy = Math.min(remainingDeficit / 3, 2); // Reduce by 1-2 hours
//           subjectsToReduce.push({
//             ...subject,
//             currentHours: subject.hours,
//             newHours: subject.hours - reduceBy,
//             reduceBy: reduceBy
//           });
//           remainingDeficit -= reduceBy * 3;
//         }
//       }
      
//       if (subjectsToReduce.length > 0) {
//         generatedResolutions.push({
//           id: "slot_capacity",
//           type: "slot_capacity",
//           deficit: deficit,
//           subjectsToReduce: subjectsToReduce,
//           action: "reduce_hours",
//           applied: false,
//           canRevert: true
//         });
//       }
//     }
    
//     setResolutions(generatedResolutions);
//     setLoading(false);
//   };

//   const applyResolution = async (resolution) => {
//     setApplying(true);
//     try {
//       if (resolution.type === "faculty_overload" && resolution.action === "reassign") {
//         // Update course details to reassign subjects
//         const updatedCourseDetails = [...AppState.courseDetails];
        
//         for (const subject of resolution.subjectsToMove) {
//           const courseIndex = updatedCourseDetails.findIndex(c => c.id === subject.courseId);
//           if (courseIndex !== -1) {
//             updatedCourseDetails[courseIndex] = {
//               ...updatedCourseDetails[courseIndex],
//               facultyId: resolution.targetFacultyId,
//               facultyName: resolution.targetFacultyName
//             };
//           }
//         }
        
//         AppState.courseDetails = updatedCourseDetails;
//         saveToStorage(STORAGE_KEYS.COURSE_DETAILS, updatedCourseDetails);
        
//         // Update faculty workload
//         const updatedFaculty = [...AppState.faculty];
//         const oldFaculty = updatedFaculty.find(f => f.id === resolution.facultyId);
//         const newFaculty = updatedFaculty.find(f => f.id === resolution.targetFacultyId);
        
//         const totalHoursMoved = resolution.subjectsToMove.reduce((sum, s) => sum + s.hours, 0);
        
//         if (oldFaculty) {
//           oldFaculty.assignedHours -= totalHoursMoved;
//           oldFaculty.remainingHours += totalHoursMoved;
//         }
//         if (newFaculty) {
//           newFaculty.assignedHours += totalHoursMoved;
//           newFaculty.remainingHours -= totalHoursMoved;
//         }
        
//         AppState.faculty = updatedFaculty;
//         saveToStorage(STORAGE_KEYS.FACULTY, updatedFaculty);
        
//         setAppliedResolutions(prev => [...prev, { ...resolution, applied: true, appliedAt: new Date().toISOString() }]);
//         alert(`✓ Auto-resolved: Moved ${resolution.subjectsToMove.length} subject(s) from ${resolution.facultyName} to ${resolution.targetFacultyName}`);
//       }
      
//       if (resolution.type === "slot_capacity" && resolution.action === "reduce_hours") {
//         // Update subject hours
//         const updatedSubjects = [...AppState.subjects];
        
//         for (const subject of resolution.subjectsToReduce) {
//           const subjectIndex = updatedSubjects.findIndex(s => s.id === subject.subjectId);
//           if (subjectIndex !== -1) {
//             updatedSubjects[subjectIndex] = {
//               ...updatedSubjects[subjectIndex],
//               totalWeeklyClasses: subject.newHours,
//               theoryClassesPerWeek: Math.min(subject.newHours, updatedSubjects[subjectIndex].theoryClassesPerWeek),
//               labPeriodsPerWeek: subject.newHours - Math.min(subject.newHours, updatedSubjects[subjectIndex].theoryClassesPerWeek)
//             };
//           }
//         }
        
//         AppState.subjects = updatedSubjects;
//         saveToStorage(STORAGE_KEYS.SUBJECTS, updatedSubjects);
        
//         setAppliedResolutions(prev => [...prev, { ...resolution, applied: true, appliedAt: new Date().toISOString() }]);
//         alert(`✓ Auto-resolved: Reduced hours for ${resolution.subjectsToReduce.length} subject(s)`);
//       }
      
//       window.dispatchEvent(new Event('storage'));
      
//       // Remove applied resolution from list
//       setResolutions(resolutions.filter(r => r.id !== resolution.id));
      
//     } catch (error) {
//       console.error("Error applying resolution:", error);
//       alert("Failed to apply resolution. Please try manually.");
//     } finally {
//       setApplying(false);
//     }
//   };

//   const revertResolution = async (appliedResolution) => {
//     if (!confirm(`Revert this resolution? This will undo the changes.`)) return;
    
//     setApplying(true);
//     try {
//       if (appliedResolution.type === "faculty_overload") {
//         // Get original state before resolution
//         const originalFaculty = AppState.faculty.find(f => f.id === appliedResolution.facultyId);
//         const targetFaculty = AppState.faculty.find(f => f.id === appliedResolution.targetFacultyId);
//         const totalHoursMoved = appliedResolution.subjectsToMove.reduce((sum, s) => sum + s.hours, 0);
        
//         // Revert faculty workload
//         if (originalFaculty) {
//           originalFaculty.assignedHours += totalHoursMoved;
//           originalFaculty.remainingHours -= totalHoursMoved;
//         }
//         if (targetFaculty) {
//           targetFaculty.assignedHours -= totalHoursMoved;
//           targetFaculty.remainingHours += totalHoursMoved;
//         }
        
//         // Revert course assignments
//         const updatedCourseDetails = [...AppState.courseDetails];
//         for (const subject of appliedResolution.subjectsToMove) {
//           const courseIndex = updatedCourseDetails.findIndex(c => c.id === subject.courseId);
//           if (courseIndex !== -1) {
//             updatedCourseDetails[courseIndex] = {
//               ...updatedCourseDetails[courseIndex],
//               facultyId: appliedResolution.facultyId,
//               facultyName: appliedResolution.facultyName
//             };
//           }
//         }
        
//         AppState.courseDetails = updatedCourseDetails;
//         AppState.faculty = AppState.faculty.map(f => 
//           f.id === originalFaculty.id ? originalFaculty : f.id === targetFaculty.id ? targetFaculty : f
//         );
        
//         saveToStorage(STORAGE_KEYS.COURSE_DETAILS, updatedCourseDetails);
//         saveToStorage(STORAGE_KEYS.FACULTY, AppState.faculty);
        
//         alert(`✓ Reverted: Subjects moved back to ${appliedResolution.facultyName}`);
//       }
      
//       if (appliedResolution.type === "slot_capacity") {
//         // Revert subject hours
//         const updatedSubjects = [...AppState.subjects];
//         for (const subject of appliedResolution.subjectsToReduce) {
//           const subjectIndex = updatedSubjects.findIndex(s => s.id === subject.subjectId);
//           if (subjectIndex !== -1) {
//             updatedSubjects[subjectIndex] = {
//               ...updatedSubjects[subjectIndex],
//               totalWeeklyClasses: subject.currentHours,
//               theoryClassesPerWeek: subject.currentHours,
//               labPeriodsPerWeek: 0
//             };
//           }
//         }
        
//         AppState.subjects = updatedSubjects;
//         saveToStorage(STORAGE_KEYS.SUBJECTS, updatedSubjects);
        
//         alert(`✓ Reverted: Hours restored for ${appliedResolution.subjectsToReduce.length} subject(s)`);
//       }
      
//       window.dispatchEvent(new Event('storage'));
//       setAppliedResolutions(appliedResolutions.filter(r => r.id !== appliedResolution.id));
      
//       // Regenerate resolutions
//       generateAutoResolutions();
      
//     } catch (error) {
//       console.error("Error reverting resolution:", error);
//       alert("Failed to revert resolution.");
//     } finally {
//       setApplying(false);
//     }
//   };

//   const applyAllResolutions = async () => {
//     if (confirm(`Apply all ${resolutions.length} auto-resolutions?`)) {
//       for (const resolution of resolutions) {
//         await applyResolution(resolution);
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <Card>
//         <div style={{ textAlign: "center", padding: 20 }}>
//           <p>Analyzing and generating auto-resolutions...</p>
//         </div>
//       </Card>
//     );
//   }

//   if (resolutions.length === 0 && appliedResolutions.length === 0) {
//     return (
//       <Card style={{ background: C.accent.greenBg }}>
//         <div style={{ textAlign: "center", padding: 20 }}>
//           <span style={{ fontSize: 48 }}>✅</span>
//           <h3 style={{ color: C.accent.green, marginTop: 8 }}>No Conflicts Found!</h3>
//           <p style={{ color: C.text.secondary }}>All subjects can be scheduled without issues.</p>
//           <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 16 }}>
//             <Button onClick={() => onResolved(true)} variant="success">
//               Proceed to Generate Timetable
//             </Button>
//             <Button onClick={onCancel} variant="secondary">
//               Cancel
//             </Button>
//           </div>
//         </div>
//       </Card>
//     );
//   }

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <Title>🔧 Auto-Conflict Resolution</Title>
      
//       <div style={{ 
//         padding: 12, 
//         background: C.accent.blueBg, 
//         borderRadius: 8,
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexWrap: "wrap",
//         gap: 12
//       }}>
//         <div>
//           <p style={{ fontWeight: 600, color: C.accent.blue, margin: 0 }}>
//             Auto-resolution suggestions generated
//           </p>
//           <p style={{ fontSize: 12, color: C.text.secondary, margin: 4 }}>
//             {resolutions.length} conflict(s) can be automatically resolved
//           </p>
//         </div>
//         <div style={{ display: "flex", gap: 12 }}>
//           <Button onClick={() => setShowDetails(!showDetails)} variant="secondary" size="sm">
//             {showDetails ? "Hide Details" : "Show Details"}
//           </Button>
//           {resolutions.length > 0 && (
//             <Button onClick={applyAllResolutions} variant="primary" disabled={applying}>
//               🔧 Apply All Resolutions
//             </Button>
//           )}
//         </div>
//       </div>

//       {/* Applied Resolutions Section */}
//       {appliedResolutions.length > 0 && (
//         <Card>
//           <Title level={4}>✅ Applied Resolutions</Title>
//           {appliedResolutions.map((resolution, idx) => (
//             <div key={idx} style={{ 
//               padding: 12, 
//               background: C.accent.greenBg, 
//               borderRadius: 8,
//               marginBottom: 8,
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               flexWrap: "wrap",
//               gap: 12
//             }}>
//               <div>
//                 <strong>{resolution.type === "faculty_overload" ? "Faculty Load Rebalanced" : "Hours Reduced"}</strong>
//                 <p style={{ fontSize: 12, margin: 4, color: C.text.secondary }}>
//                   Applied at: {new Date(resolution.appliedAt).toLocaleTimeString()}
//                 </p>
//                 {resolution.type === "faculty_overload" && (
//                   <p style={{ fontSize: 12, margin: 4 }}>
//                     Moved {resolution.subjectsToMove.length} subject(s) from {resolution.facultyName} to {resolution.targetFacultyName}
//                   </p>
//                 )}
//                 {resolution.type === "slot_capacity" && (
//                   <p style={{ fontSize: 12, margin: 4 }}>
//                     Reduced {resolution.subjectsToReduce.length} subject(s) by {resolution.subjectsToReduce.reduce((sum, s) => sum + s.reduceBy, 0)} hours
//                   </p>
//                 )}
//               </div>
//               <Button onClick={() => revertResolution(resolution)} variant="warning" size="sm" disabled={applying}>
//                 Undo
//               </Button>
//             </div>
//           ))}
//         </Card>
//       )}

//       {/* Pending Resolutions */}
//       {showDetails && resolutions.length > 0 && (
//         <div>
//           <Title level={4}>📋 Pending Auto-Resolutions</Title>
//           {resolutions.map(resolution => (
//             <Card key={resolution.id} style={{ marginBottom: 16 }}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
//                 <div>
//                   <h4 style={{ color: resolution.type === "faculty_overload" ? C.accent.red : C.accent.gold }}>
//                     {resolution.type === "faculty_overload" ? "👨‍🏫 Faculty Overload" : "📊 Slot Capacity Issue"}
//                   </h4>
//                   {resolution.type === "faculty_overload" && (
//                     <>
//                       <p><strong>{resolution.facultyName}</strong> is overloaded by <strong style={{ color: C.accent.red }}>{resolution.overload}h</strong></p>
//                       <p style={{ fontSize: 13 }}>Moving to: <strong>{resolution.targetFacultyName}</strong></p>
//                       <div style={{ marginTop: 8, padding: 8, background: C.cardHover, borderRadius: 8 }}>
//                         <p style={{ fontWeight: 600, marginBottom: 4 }}>Subjects to move:</p>
//                         {resolution.subjectsToMove.map((subj, i) => (
//                           <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
//                             <span>{subj.subjectName}</span>
//                             <span style={{ color: C.accent.gold }}>{subj.hours}h/week</span>
//                           </div>
//                         ))}
//                       </div>
//                     </>
//                   )}
//                   {resolution.type === "slot_capacity" && (
//                     <>
//                       <p>Need <strong style={{ color: C.accent.red }}>{resolution.deficit} more slots</strong></p>
//                       <div style={{ marginTop: 8, padding: 8, background: C.cardHover, borderRadius: 8 }}>
//                         <p style={{ fontWeight: 600, marginBottom: 4 }}>Subjects to reduce hours:</p>
//                         {resolution.subjectsToReduce.map((subj, i) => (
//                           <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
//                             <span>{subj.subjectName}</span>
//                             <span>{subj.currentHours}h → <strong style={{ color: C.accent.green }}>{subj.newHours}h</strong> (-{subj.reduceBy}h)</span>
//                           </div>
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </div>
//                 <Button onClick={() => applyResolution(resolution)} variant="success" disabled={applying}>
//                   Apply This Resolution
//                 </Button>
//               </div>
//             </Card>
//           ))}
//         </div>
//       )}

//       {/* Summary and Actions */}
//       <Card>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
//           <div>
//             <p><strong>Summary:</strong></p>
//             <p style={{ fontSize: 13, color: C.text.secondary }}>
//               {resolutions.length} pending resolution(s) | {appliedResolutions.length} applied
//             </p>
//           </div>
//           <div style={{ display: "flex", gap: 12 }}>
//             <Button onClick={onCancel} variant="secondary">
//               Cancel
//             </Button>
//             <Button 
//               onClick={() => onResolved(true)} 
//               variant="success"
//               disabled={resolutions.length > 0}
//             >
//               {resolutions.length > 0 ? "Apply All Resolutions First" : "Proceed to Generate Timetable"}
//             </Button>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// }

// src/components/admin/AutoConflictResolver.jsx
import { useState, useEffect } from "react";
import { Card, Title, Badge, Button, Select } from "../common";
import { AppState } from "../../AppState";
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from "../../utils/storage";
import { C } from "../../styles/theme";

export function AutoConflictResolver({ approvedCourses, department, onResolved, onCancel }) {
  const [resolutions, setResolutions] = useState([]);
  const [appliedResolutions, setAppliedResolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [showDetails, setShowDetails] = useState(true);

  useEffect(() => {
    generateAutoResolutions();
  }, [approvedCourses, department]);

  const generateAutoResolutions = () => {
    setLoading(true);
    const generatedResolutions = [];
    
    const facultyList = AppState.faculty || [];
    const subjectsList = AppState.subjects || [];
    
    // 1. Analyze Faculty Workload
    const facultyLoad = {};
    for (const course of approvedCourses) {
      const subject = subjectsList.find(s => s.id === course.subjectId);
      const faculty = facultyList.find(f => f.id === course.facultyId);
      if (subject && faculty) {
        facultyLoad[faculty.id] = facultyLoad[faculty.id] || {
          id: faculty.id,
          name: faculty.name,
          assigned: 0,
          max: faculty.maxHours || (faculty.designation === "Professor" ? 10 : faculty.designation === "Associate Professor" ? 12 : 14),
          subjects: []
        };
        facultyLoad[faculty.id].assigned += subject.totalWeeklyClasses;
        facultyLoad[faculty.id].subjects.push({
          courseId: course.id,
          subjectId: subject.id,
          subjectName: subject.name,
          hours: subject.totalWeeklyClasses
        });
      }
    }
    
    // Find overloaded faculty and generate resolutions
    for (const [id, load] of Object.entries(facultyLoad)) {
      if (load.assigned > load.max) {
        const overload = load.assigned - load.max;
        
        const availableFaculty = facultyList.filter(f => 
          f.course === department && 
          f.id !== parseInt(id) && 
          (facultyLoad[f.id]?.assigned || 0) + 4 <= (f.maxHours || (f.designation === "Professor" ? 10 : f.designation === "Associate Professor" ? 12 : 14))
        );
        
        if (availableFaculty.length > 0 && load.subjects.length > 0) {
          const sortedSubjects = [...load.subjects].sort((a, b) => a.hours - b.hours);
          let remainingOverload = overload;
          const subjectsToMove = [];
          
          for (const subject of sortedSubjects) {
            if (remainingOverload > 0 && subject.hours <= remainingOverload + 2) {
              subjectsToMove.push(subject);
              remainingOverload -= subject.hours;
            }
          }
          
          if (subjectsToMove.length > 0) {
            generatedResolutions.push({
              id: `resolve_${id}`,
              type: "faculty_overload",
              facultyId: parseInt(id),
              facultyName: load.name,
              overload: overload,
              subjectsToMove: subjectsToMove,
              targetFacultyId: availableFaculty[0].id,
              targetFacultyName: availableFaculty[0].name,
              action: "reassign",
              applied: false,
              canRevert: true
            });
          }
        }
      }
    }
    
    // 2. Slot Capacity Optimization
    const TEACHING_SLOTS_PER_WEEK = 40;
    const SECTIONS = 3;
    const totalAvailableSlots = TEACHING_SLOTS_PER_WEEK * SECTIONS;
    let totalRequiredSlots = 0;
    const subjectHours = [];
    
    for (const course of approvedCourses) {
      const subject = subjectsList.find(s => s.id === course.subjectId);
      if (subject) {
        totalRequiredSlots += subject.totalWeeklyClasses * SECTIONS;
        subjectHours.push({
          courseId: course.id,
          subjectId: subject.id,
          subjectName: subject.name,
          hours: subject.totalWeeklyClasses,
          semester: course.semester
        });
      }
    }
    
    const capacityThreshold = totalAvailableSlots * 0.9;
    if (totalRequiredSlots > capacityThreshold) {
      const deficit = totalRequiredSlots - totalAvailableSlots;
      const sortedSubjects = [...subjectHours].sort((a, b) => b.hours - a.hours);
      let remainingDeficit = deficit > 0 ? deficit : 0;
      const subjectsToReduce = [];
      
      for (const subject of sortedSubjects) {
        if (remainingDeficit > 0 && subject.hours > 3) {
          const reduceBy = Math.min(Math.ceil(remainingDeficit / 3), 2);
          if (reduceBy > 0 && subject.hours - reduceBy >= 2) {
            subjectsToReduce.push({
              ...subject,
              currentHours: subject.hours,
              newHours: subject.hours - reduceBy,
              reduceBy: reduceBy
            });
            remainingDeficit -= reduceBy * 3;
          }
        }
      }
      
      if (subjectsToReduce.length > 0) {
        generatedResolutions.push({
          id: "slot_capacity",
          type: "slot_capacity",
          deficit: deficit > 0 ? deficit : 0,
          subjectsToReduce: subjectsToReduce,
          action: "reduce_hours",
          applied: false,
          canRevert: true
        });
      }
    }
    
    setResolutions(generatedResolutions);
    setLoading(false);
  };

  const applyResolution = async (resolution) => {
    setApplying(true);
    try {
      if (resolution.type === "faculty_overload" && resolution.action === "reassign") {
        const updatedCourseDetails = [...AppState.courseDetails];
        
        for (const subject of resolution.subjectsToMove) {
          const courseIndex = updatedCourseDetails.findIndex(c => c.id === subject.courseId);
          if (courseIndex !== -1) {
            updatedCourseDetails[courseIndex] = {
              ...updatedCourseDetails[courseIndex],
              facultyId: resolution.targetFacultyId,
              facultyName: resolution.targetFacultyName
            };
          }
        }
        
        AppState.courseDetails = updatedCourseDetails;
        saveToStorage(STORAGE_KEYS.COURSE_DETAILS, updatedCourseDetails);
        
        const updatedFaculty = [...AppState.faculty];
        const oldFaculty = updatedFaculty.find(f => f.id === resolution.facultyId);
        const newFaculty = updatedFaculty.find(f => f.id === resolution.targetFacultyId);
        
        const totalHoursMoved = resolution.subjectsToMove.reduce((sum, s) => sum + s.hours, 0);
        
        if (oldFaculty) {
          oldFaculty.assignedHours = (oldFaculty.assignedHours || 0) - totalHoursMoved;
          oldFaculty.remainingHours = (oldFaculty.remainingHours || oldFaculty.maxHours) + totalHoursMoved;
        }
        if (newFaculty) {
          newFaculty.assignedHours = (newFaculty.assignedHours || 0) + totalHoursMoved;
          newFaculty.remainingHours = (newFaculty.remainingHours || newFaculty.maxHours) - totalHoursMoved;
        }
        
        AppState.faculty = updatedFaculty;
        saveToStorage(STORAGE_KEYS.FACULTY, updatedFaculty);
        
        setAppliedResolutions(prev => [...prev, { ...resolution, applied: true, appliedAt: new Date().toISOString() }]);
        alert(`✓ Auto-resolved: Moved ${resolution.subjectsToMove.length} subject(s) from ${resolution.facultyName} to ${resolution.targetFacultyName}`);
      }
      
      if (resolution.type === "slot_capacity" && resolution.action === "reduce_hours") {
        const updatedSubjects = [...AppState.subjects];
        
        for (const subject of resolution.subjectsToReduce) {
          const subjectIndex = updatedSubjects.findIndex(s => s.id === subject.subjectId);
          if (subjectIndex !== -1) {
            updatedSubjects[subjectIndex] = {
              ...updatedSubjects[subjectIndex],
              totalWeeklyClasses: subject.newHours,
              theoryClassesPerWeek: Math.min(subject.newHours, updatedSubjects[subjectIndex].theoryClassesPerWeek),
              labPeriodsPerWeek: subject.newHours - Math.min(subject.newHours, updatedSubjects[subjectIndex].theoryClassesPerWeek)
            };
          }
        }
        
        AppState.subjects = updatedSubjects;
        saveToStorage(STORAGE_KEYS.SUBJECTS, updatedSubjects);
        
        setAppliedResolutions(prev => [...prev, { ...resolution, applied: true, appliedAt: new Date().toISOString() }]);
        alert(`✓ Auto-resolved: Reduced hours for ${resolution.subjectsToReduce.length} subject(s)`);
      }
      
      window.dispatchEvent(new Event('storage'));
      
      setResolutions(resolutions.filter(r => r.id !== resolution.id));
      
    } catch (error) {
      console.error("Error applying resolution:", error);
      alert("Failed to apply resolution. Please try manually.");
    } finally {
      setApplying(false);
    }
  };

  const revertResolution = async (appliedResolution) => {
    if (!confirm(`Revert this resolution? This will undo the changes.`)) return;
    
    setApplying(true);
    try {
      if (appliedResolution.type === "faculty_overload") {
        const originalFaculty = AppState.faculty.find(f => f.id === appliedResolution.facultyId);
        const targetFaculty = AppState.faculty.find(f => f.id === appliedResolution.targetFacultyId);
        const totalHoursMoved = appliedResolution.subjectsToMove.reduce((sum, s) => sum + s.hours, 0);
        
        if (originalFaculty) {
          originalFaculty.assignedHours = (originalFaculty.assignedHours || 0) + totalHoursMoved;
          originalFaculty.remainingHours = (originalFaculty.remainingHours || originalFaculty.maxHours) - totalHoursMoved;
        }
        if (targetFaculty) {
          targetFaculty.assignedHours = (targetFaculty.assignedHours || 0) - totalHoursMoved;
          targetFaculty.remainingHours = (targetFaculty.remainingHours || targetFaculty.maxHours) + totalHoursMoved;
        }
        
        const updatedCourseDetails = [...AppState.courseDetails];
        for (const subject of appliedResolution.subjectsToMove) {
          const courseIndex = updatedCourseDetails.findIndex(c => c.id === subject.courseId);
          if (courseIndex !== -1) {
            updatedCourseDetails[courseIndex] = {
              ...updatedCourseDetails[courseIndex],
              facultyId: appliedResolution.facultyId,
              facultyName: appliedResolution.facultyName
            };
          }
        }
        
        AppState.courseDetails = updatedCourseDetails;
        AppState.faculty = AppState.faculty.map(f => 
          f.id === originalFaculty.id ? originalFaculty : f.id === targetFaculty.id ? targetFaculty : f
        );
        
        saveToStorage(STORAGE_KEYS.COURSE_DETAILS, updatedCourseDetails);
        saveToStorage(STORAGE_KEYS.FACULTY, AppState.faculty);
        
        alert(`✓ Reverted: Subjects moved back to ${appliedResolution.facultyName}`);
      }
      
      if (appliedResolution.type === "slot_capacity") {
        const updatedSubjects = [...AppState.subjects];
        for (const subject of appliedResolution.subjectsToReduce) {
          const subjectIndex = updatedSubjects.findIndex(s => s.id === subject.subjectId);
          if (subjectIndex !== -1) {
            updatedSubjects[subjectIndex] = {
              ...updatedSubjects[subjectIndex],
              totalWeeklyClasses: subject.currentHours,
              theoryClassesPerWeek: subject.currentHours,
              labPeriodsPerWeek: 0
            };
          }
        }
        
        AppState.subjects = updatedSubjects;
        saveToStorage(STORAGE_KEYS.SUBJECTS, updatedSubjects);
        
        alert(`✓ Reverted: Hours restored for ${appliedResolution.subjectsToReduce.length} subject(s)`);
      }
      
      window.dispatchEvent(new Event('storage'));
      setAppliedResolutions(appliedResolutions.filter(r => r.id !== appliedResolution.id));
      
      generateAutoResolutions();
      
    } catch (error) {
      console.error("Error reverting resolution:", error);
      alert("Failed to revert resolution.");
    } finally {
      setApplying(false);
    }
  };

  const applyAllResolutions = async () => {
    if (confirm(`Apply all ${resolutions.length} auto-resolutions?`)) {
      for (const resolution of resolutions) {
        await applyResolution(resolution);
      }
    }
  };

  if (loading) {
    return (
      <Card>
        <div style={{ textAlign: "center", padding: 20 }}>
          <p>Analyzing and generating auto-resolutions...</p>
        </div>
      </Card>
    );
  }

  if (resolutions.length === 0 && appliedResolutions.length === 0) {
    return (
      <Card style={{ background: C.accent.greenBg }}>
        <div style={{ textAlign: "center", padding: 20 }}>
          <span style={{ fontSize: 48 }}>✅</span>
          <h3 style={{ color: C.accent.green, marginTop: 8 }}>No Conflicts Found!</h3>
          <p style={{ color: C.text.secondary }}>All subjects can be scheduled without issues.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 16 }}>
            <Button onClick={() => onResolved(true)} variant="success">
              Proceed to Generate Timetable
            </Button>
            <Button onClick={onCancel} variant="secondary">
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Title>🔧 Auto-Conflict Resolution</Title>
      
      <div style={{ 
        padding: 12, 
        background: C.accent.blueBg, 
        borderRadius: 8,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12
      }}>
        <div>
          <p style={{ fontWeight: 600, color: C.accent.blue, margin: 0 }}>
            Auto-resolution suggestions generated
          </p>
          <p style={{ fontSize: 12, color: C.text.secondary, margin: 4 }}>
            {resolutions.length} conflict(s) can be automatically resolved
          </p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <Button onClick={() => setShowDetails(!showDetails)} variant="secondary" size="sm">
            {showDetails ? "Hide Details" : "Show Details"}
          </Button>
          {resolutions.length > 0 && (
            <Button onClick={applyAllResolutions} variant="primary" disabled={applying}>
              🔧 Apply All Resolutions
            </Button>
          )}
        </div>
      </div>

      {appliedResolutions.length > 0 && (
        <Card>
          <Title level={4}>✅ Applied Resolutions</Title>
          {appliedResolutions.map((resolution, idx) => (
            <div key={idx} style={{ 
              padding: 12, 
              background: C.accent.greenBg, 
              borderRadius: 8,
              marginBottom: 8,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12
            }}>
              <div>
                <strong>{resolution.type === "faculty_overload" ? "Faculty Load Rebalanced" : "Hours Reduced"}</strong>
                <p style={{ fontSize: 12, margin: 4, color: C.text.secondary }}>
                  Applied at: {new Date(resolution.appliedAt).toLocaleTimeString()}
                </p>
                {resolution.type === "faculty_overload" && (
                  <p style={{ fontSize: 12, margin: 4 }}>
                    Moved {resolution.subjectsToMove.length} subject(s) from {resolution.facultyName} to {resolution.targetFacultyName}
                  </p>
                )}
                {resolution.type === "slot_capacity" && (
                  <p style={{ fontSize: 12, margin: 4 }}>
                    Reduced {resolution.subjectsToReduce.length} subject(s) by {resolution.subjectsToReduce.reduce((sum, s) => sum + s.reduceBy, 0)} hours
                  </p>
                )}
              </div>
              <Button onClick={() => revertResolution(resolution)} variant="warning" size="sm" disabled={applying}>
                Undo
              </Button>
            </div>
          ))}
        </Card>
      )}

      {showDetails && resolutions.length > 0 && (
        <div>
          <Title level={4}>📋 Pending Auto-Resolutions</Title>
          {resolutions.map(resolution => (
            <Card key={resolution.id} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <h4 style={{ color: resolution.type === "faculty_overload" ? C.accent.red : C.accent.gold }}>
                    {resolution.type === "faculty_overload" ? "👨‍🏫 Faculty Overload" : "📊 Slot Capacity Issue"}
                  </h4>
                  {resolution.type === "faculty_overload" && (
                    <>
                      <p><strong>{resolution.facultyName}</strong> is overloaded by <strong style={{ color: C.accent.red }}>{resolution.overload}h</strong></p>
                      <p style={{ fontSize: 13 }}>Moving to: <strong>{resolution.targetFacultyName}</strong></p>
                      <div style={{ marginTop: 8, padding: 8, background: C.cardHover, borderRadius: 8 }}>
                        <p style={{ fontWeight: 600, marginBottom: 4 }}>Subjects to move:</p>
                        {resolution.subjectsToMove.map((subj, i) => (
                          <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                            <span>{subj.subjectName}</span>
                            <span style={{ color: C.accent.gold }}>{subj.hours}h/week</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  {resolution.type === "slot_capacity" && (
                    <>
                      <p>Need <strong style={{ color: C.accent.red }}>{resolution.deficit} more slots</strong></p>
                      <div style={{ marginTop: 8, padding: 8, background: C.cardHover, borderRadius: 8 }}>
                        <p style={{ fontWeight: 600, marginBottom: 4 }}>Subjects to reduce hours:</p>
                        {resolution.subjectsToReduce.map((subj, i) => (
                          <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                            <span>{subj.subjectName}</span>
                            <span>{subj.currentHours}h → <strong style={{ color: C.accent.green }}>{subj.newHours}h</strong> (-{subj.reduceBy}h)</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <Button onClick={() => applyResolution(resolution)} variant="success" disabled={applying}>
                  Apply This Resolution
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div>
            <p><strong>Summary:</strong></p>
            <p style={{ fontSize: 13, color: C.text.secondary }}>
              {resolutions.length} pending resolution(s) | {appliedResolutions.length} applied
            </p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <Button onClick={onCancel} variant="secondary">
              Cancel
            </Button>
            <Button 
              onClick={() => onResolved(true)} 
              variant="success"
              disabled={resolutions.length > 0}
            >
              {resolutions.length > 0 ? "Apply All Resolutions First" : "Proceed to Generate Timetable"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}