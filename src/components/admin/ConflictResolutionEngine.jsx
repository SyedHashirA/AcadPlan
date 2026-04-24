// // src/components/admin/ConflictResolutionEngine.jsx
// import { useState, useEffect } from "react";
// import { Card, Title, Badge, Button, Select, Input } from "../common";
// import { AppState } from "../../AppState";
// import { saveToStorage, loadFromStorage, STORAGE_KEYS } from "../../utils/storage";
// import { C } from "../../styles/theme";

// export function ConflictResolutionEngine({ approvedCourses, department, onResolved }) {
//   const [conflicts, setConflicts] = useState([]);
//   const [resolutions, setResolutions] = useState({});
//   const [autoResolveSuggestions, setAutoResolveSuggestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [applying, setApplying] = useState(false);

//   useEffect(() => {
//     analyzeConflicts();
//   }, [approvedCourses, department]);

//   const analyzeConflicts = () => {
//     setLoading(true);
//     const conflictsList = [];
//     const suggestions = [];
    
//     // 1. Faculty Overload Analysis
//     const facultyLoad = {};
//     const facultyList = AppState.faculty || [];
//     const subjectsList = AppState.subjects || [];
    
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
//           subjectId: subject.id,
//           subjectName: subject.name,
//           hours: subject.totalWeeklyClasses,
//           courseId: course.id
//         });
//       }
//     }
    
//     // Find overloaded faculty
//     for (const [id, load] of Object.entries(facultyLoad)) {
//       if (load.assigned > load.max) {
//         const overload = load.assigned - load.max;
//         conflictsList.push({
//           id: `overload_${id}`,
//           type: "faculty_overload",
//           severity: "high",
//           facultyId: parseInt(id),
//           facultyName: load.name,
//           currentLoad: load.assigned,
//           maxLoad: load.max,
//           overload: overload,
//           subjects: load.subjects,
//           suggestedResolution: `Reduce ${overload} hours by reassigning subjects to other faculty`,
//           autoResolve: true,
//           resolution: {
//             action: "reassign",
//             targetFaculty: null,
//             subjectsToMove: []
//           }
//         });
        
//         // Auto-resolve suggestion - find available faculty
//         const availableFaculty = facultyList.filter(f => 
//           f.course === department && 
//           f.id !== parseInt(id) && 
//           (facultyLoad[f.id]?.assigned || 0) + 4 <= f.maxHours
//         );
        
//         if (availableFaculty.length > 0 && load.subjects.length > 0) {
//           suggestions.push({
//             conflictId: `overload_${id}`,
//             action: "reassign",
//             suggestion: `Move "${load.subjects[0].subjectName}" to ${availableFaculty[0].name}`,
//             targetFacultyId: availableFaculty[0].id,
//             targetFacultyName: availableFaculty[0].name,
//             subjectToMove: load.subjects[0]
//           });
//         }
//       }
//     }
    
//     // 2. Slot Capacity Analysis
//     const TEACHING_SLOTS_PER_WEEK = 40;
//     const SECTIONS = 3;
//     const totalAvailableSlots = TEACHING_SLOTS_PER_WEEK * SECTIONS;
//     let totalRequiredSlots = 0;
    
//     for (const course of approvedCourses) {
//       const subject = subjectsList.find(s => s.id === course.subjectId);
//       if (subject) {
//         totalRequiredSlots += subject.totalWeeklyClasses * SECTIONS;
//       }
//     }
    
//     if (totalRequiredSlots > totalAvailableSlots) {
//       const deficit = totalRequiredSlots - totalAvailableSlots;
//       conflictsList.push({
//         id: "slot_capacity",
//         type: "slot_capacity",
//         severity: "high",
//         requiredSlots: totalRequiredSlots,
//         availableSlots: totalAvailableSlots,
//         deficit: deficit,
//         suggestedResolution: `Reduce ${deficit} slots by adjusting subject hours or moving subjects to next semester`,
//         autoResolve: false,
//         resolution: null
//       });
//     }
    
//     // 3. Room Conflict Analysis (if timetable exists)
//     const timetable = AppState.timetable || [];
//     const roomConflicts = [];
//     const roomSchedule = {};
    
//     for (const slot of timetable) {
//       const key = `${slot.day}_${slot.time}_${slot.room}`;
//       if (roomSchedule[key]) {
//         roomConflicts.push({
//           id: `room_conflict_${slot.id}`,
//           type: "room_conflict",
//           severity: "medium",
//           room: slot.room,
//           day: slot.day,
//           time: slot.time,
//           subjects: [roomSchedule[key].subject, slot.subject],
//           suggestedResolution: `Reschedule one of the classes in ${slot.room} at ${slot.day} ${slot.time}`,
//           autoResolve: true,
//           resolution: null
//         });
//       } else {
//         roomSchedule[key] = slot;
//       }
//     }
    
//     conflictsList.push(...roomConflicts.slice(0, 5)); // Limit to first 5 room conflicts
    
//     setConflicts(conflictsList);
//     setAutoResolveSuggestions(suggestions);
//     setLoading(false);
//   };

//   const applyAutoResolution = (suggestion) => {
//     setApplying(true);
//     try {
//       // Find the conflict
//       const conflict = conflicts.find(c => c.id === suggestion.conflictId);
//       if (conflict && conflict.type === "faculty_overload") {
//         // Update course details to reassign subject
//         const updatedCourseDetails = AppState.courseDetails.map(course => {
//           if (course.id === suggestion.subjectToMove.courseId) {
//             return {
//               ...course,
//               facultyId: suggestion.targetFacultyId,
//               facultyName: suggestion.targetFacultyName
//             };
//           }
//           return course;
//         });
        
//         AppState.courseDetails = updatedCourseDetails;
//         saveToStorage(STORAGE_KEYS.COURSE_DETAILS, updatedCourseDetails);
        
//         // Update faculty workload
//         const facultyList = AppState.faculty;
//         const oldFaculty = facultyList.find(f => f.id === conflict.facultyId);
//         const newFaculty = facultyList.find(f => f.id === suggestion.targetFacultyId);
        
//         if (oldFaculty) {
//           oldFaculty.assignedHours -= suggestion.subjectToMove.hours;
//           oldFaculty.remainingHours += suggestion.subjectToMove.hours;
//         }
//         if (newFaculty) {
//           newFaculty.assignedHours += suggestion.subjectToMove.hours;
//           newFaculty.remainingHours -= suggestion.subjectToMove.hours;
//         }
        
//         saveToStorage(STORAGE_KEYS.FACULTY, facultyList);
//         AppState.faculty = facultyList;
        
//         alert(`✓ Auto-resolved: Moved "${suggestion.subjectToMove.subjectName}" from ${conflict.facultyName} to ${suggestion.targetFacultyName}`);
        
//         // Remove resolved conflict
//         setConflicts(conflicts.filter(c => c.id !== suggestion.conflictId));
//       }
      
//       window.dispatchEvent(new Event('storage'));
//       if (onResolved) onResolved();
//     } catch (error) {
//       console.error("Error applying resolution:", error);
//       alert("Failed to apply resolution. Please try manually.");
//     } finally {
//       setApplying(false);
//     }
//   };

//   const applyManualResolution = (conflictId, resolution) => {
//     setApplying(true);
//     try {
//       const conflict = conflicts.find(c => c.id === conflictId);
//       if (conflict && conflict.type === "faculty_overload" && resolution.action === "reduce_hours") {
//         // Update subject hours
//         const subjectToUpdate = conflict.subjects[0];
//         const updatedSubjects = AppState.subjects.map(s => {
//           if (s.id === subjectToUpdate.subjectId) {
//             const newHours = Math.max(2, s.totalWeeklyClasses - resolution.reduceBy);
//             return { ...s, totalWeeklyClasses: newHours };
//           }
//           return s;
//         });
        
//         AppState.subjects = updatedSubjects;
//         saveToStorage(STORAGE_KEYS.SUBJECTS, updatedSubjects);
        
//         alert(`✓ Reduced "${subjectToUpdate.subjectName}" hours by ${resolution.reduceBy}h`);
        
//         setConflicts(conflicts.filter(c => c.id !== conflictId));
//       }
      
//       window.dispatchEvent(new Event('storage'));
//       if (onResolved) onResolved();
//     } catch (error) {
//       console.error("Error applying resolution:", error);
//       alert("Failed to apply resolution.");
//     } finally {
//       setApplying(false);
//     }
//   };

//   const resolveAllAuto = () => {
//     if (confirm("Apply all auto-resolvable suggestions?")) {
//       autoResolveSuggestions.forEach(suggestion => {
//         applyAutoResolution(suggestion);
//       });
//     }
//   };

//   if (loading) {
//     return (
//       <Card>
//         <div style={{ textAlign: "center", padding: 20 }}>
//           <p>Analyzing conflicts...</p>
//         </div>
//       </Card>
//     );
//   }

//   if (conflicts.length === 0) {
//     return (
//       <Card style={{ background: C.accent.greenBg }}>
//         <div style={{ textAlign: "center", padding: 20 }}>
//           <span style={{ fontSize: 48 }}>✅</span>
//           <h3 style={{ color: C.accent.green, marginTop: 8 }}>No Conflicts Detected!</h3>
//           <p style={{ color: C.text.secondary }}>All subjects can be scheduled without issues.</p>
//           <Button onClick={() => onResolved && onResolved(true)} variant="success">
//             Proceed to Generate Timetable
//           </Button>
//         </div>
//       </Card>
//     );
//   }

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <Title>⚠️ Conflict Resolution Required</Title>
      
//       <div style={{ 
//         padding: 12, 
//         background: C.accent.redBg, 
//         borderRadius: 8,
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexWrap: "wrap",
//         gap: 12
//       }}>
//         <div>
//           <p style={{ fontWeight: 600, color: C.accent.red, margin: 0 }}>
//             {conflicts.length} conflict(s) detected before timetable generation
//           </p>
//           <p style={{ fontSize: 12, color: C.text.secondary, margin: 4 }}>
//             Resolve these conflicts to generate a conflict-free timetable
//           </p>
//         </div>
//         {autoResolveSuggestions.length > 0 && (
//           <Button onClick={resolveAllAuto} variant="primary" disabled={applying}>
//             🔧 Apply All Auto-Resolutions
//           </Button>
//         )}
//       </div>

//       {/* Faculty Overload Conflicts */}
//       {conflicts.filter(c => c.type === "faculty_overload").map(conflict => (
//         <Card key={conflict.id} style={{ borderLeft: `4px solid ${C.accent.red}` }}>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
//             <div>
//               <h4 style={{ color: C.text.primary }}>👨‍🏫 Faculty Overload</h4>
//               <p><strong>{conflict.facultyName}</strong> is overloaded by <strong style={{ color: C.accent.red }}>{conflict.overload}h</strong></p>
//               <p style={{ fontSize: 13, color: C.text.secondary }}>
//                 Current: {conflict.currentLoad}h / {conflict.maxLoad}h max
//               </p>
//             </div>
//             <Badge variant="danger">High Severity</Badge>
//           </div>
          
//           <div style={{ marginTop: 12, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//             <p style={{ fontWeight: 600, marginBottom: 8 }}>Assigned Subjects:</p>
//             {conflict.subjects.map((subj, idx) => (
//               <div key={idx} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
//                 <span>{subj.subjectName}</span>
//                 <span style={{ color: C.accent.gold }}>{subj.hours}h/week</span>
//               </div>
//             ))}
//           </div>
          
//           <div style={{ marginTop: 12 }}>
//             <p style={{ fontWeight: 600, marginBottom: 8 }}>Suggested Resolution:</p>
//             <p style={{ fontSize: 13, color: C.text.secondary }}>{conflict.suggestedResolution}</p>
            
//             {autoResolveSuggestions.filter(s => s.conflictId === conflict.id).map((suggestion, idx) => (
//               <div key={idx} style={{ marginTop: 12, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
//                 <p style={{ marginBottom: 8 }}>💡 Auto-Resolution Suggestion:</p>
//                 <p style={{ fontSize: 13 }}>Move "{suggestion.subjectToMove.subjectName}" to <strong>{suggestion.targetFacultyName}</strong></p>
//                 <Button 
//                   onClick={() => applyAutoResolution(suggestion)} 
//                   variant="primary" 
//                   size="sm"
//                   disabled={applying}
//                 >
//                   Apply Suggestion
//                 </Button>
//               </div>
//             ))}
            
//             <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
//               <Select
//                 label="Manual Resolution"
//                 options={[
//                   { value: "", label: "Select action..." },
//                   { value: "reassign", label: "Reassign to another faculty" },
//                   { value: "reduce_hours", label: "Reduce subject hours" }
//                 ]}
//                 onChange={(e) => {
//                   if (e.target.value === "reassign") {
//                     const newFaculty = prompt("Enter faculty ID to reassign to:");
//                     if (newFaculty) {
//                       applyManualResolution(conflict.id, { action: "reassign", targetFacultyId: parseInt(newFaculty) });
//                     }
//                   } else if (e.target.value === "reduce_hours") {
//                     const hours = prompt("How many hours to reduce? (1-4)", "2");
//                     if (hours) {
//                       applyManualResolution(conflict.id, { action: "reduce_hours", reduceBy: parseInt(hours) });
//                     }
//                   }
//                 }}
//               />
//             </div>
//           </div>
//         </Card>
//       ))}

//       {/* Slot Capacity Conflict */}
//       {conflicts.filter(c => c.type === "slot_capacity").map(conflict => (
//         <Card key={conflict.id} style={{ borderLeft: `4px solid ${C.accent.red}` }}>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
//             <div>
//               <h4 style={{ color: C.text.primary }}>📊 Slot Capacity Issue</h4>
//               <p>Need <strong style={{ color: C.accent.red }}>{conflict.deficit} more slots</strong> to schedule all subjects</p>
//               <p style={{ fontSize: 13, color: C.text.secondary }}>
//                 Required: {conflict.requiredSlots} slots | Available: {conflict.availableSlots} slots
//               </p>
//             </div>
//             <Badge variant="danger">High Severity</Badge>
//           </div>
          
//           <div style={{ marginTop: 12 }}>
//             <p style={{ fontWeight: 600, marginBottom: 8 }}>Suggested Resolution:</p>
//             <p style={{ fontSize: 13, color: C.text.secondary }}>{conflict.suggestedResolution}</p>
            
//             <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
//               <Button 
//                 onClick={() => {
//                   alert("Please contact coordinator to:\n- Reduce weekly hours for some subjects\n- Move subjects to next semester\n- Add more teaching days");
//                 }} 
//                 variant="primary"
//               >
//                 Get Help from Coordinator
//               </Button>
//             </div>
//           </div>
//         </Card>
//       ))}

//       {/* Room Conflicts */}
//       {conflicts.filter(c => c.type === "room_conflict").map(conflict => (
//         <Card key={conflict.id} style={{ borderLeft: `4px solid ${C.accent.gold}` }}>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
//             <div>
//               <h4 style={{ color: C.text.primary }}>🏢 Room Conflict</h4>
//               <p>Room <strong>{conflict.room}</strong> has multiple classes at {conflict.day} {conflict.time}</p>
//               <p style={{ fontSize: 13, color: C.text.secondary }}>
//                 Conflicting subjects: {conflict.subjects.join(", ")}
//               </p>
//             </div>
//             <Badge variant="warning">Medium Severity</Badge>
//           </div>
          
//           <div style={{ marginTop: 12 }}>
//             <Button 
//               onClick={() => {
//                 alert("Room conflict will be automatically resolved during timetable regeneration.\nThe algorithm will find alternative rooms.");
//               }} 
//               variant="primary"
//               size="sm"
//             >
//               Auto-resolve on Generation
//             </Button>
//           </div>
//         </Card>
//       ))}

//       {/* Summary */}
//       <Card>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
//           <div>
//             <p><strong>Conflicts Summary:</strong></p>
//             <p style={{ fontSize: 13, color: C.text.secondary }}>
//               Faculty Overload: {conflicts.filter(c => c.type === "faculty_overload").length}<br />
//               Slot Capacity: {conflicts.filter(c => c.type === "slot_capacity").length}<br />
//               Room Conflicts: {conflicts.filter(c => c.type === "room_conflict").length}
//             </p>
//           </div>
//           <Button 
//             onClick={() => onResolved && onResolved(false)} 
//             variant="secondary"
//             disabled={conflicts.filter(c => c.severity === "high").length > 0}
//           >
//             {conflicts.filter(c => c.severity === "high").length > 0 
//               ? "Resolve High Severity Conflicts First" 
//               : "Generate Anyway (with warnings)"}
//           </Button>
//         </div>
//       </Card>
//     </div>
//   );
// }

// src/components/admin/ConflictResolutionEngine.jsx
import { useState, useEffect } from "react";
import { Card, Title, Badge, Button, Select, Input } from "../common";
import { AppState } from "../../AppState";
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from "../../utils/storage";
import { C } from "../../styles/theme";

export function ConflictResolutionEngine({ approvedCourses, department, onResolved }) {
  const [conflicts, setConflicts] = useState([]);
  const [resolutions, setResolutions] = useState({});
  const [autoResolveSuggestions, setAutoResolveSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    analyzeConflicts();
  }, [approvedCourses, department]);

  const analyzeConflicts = () => {
    setLoading(true);
    const conflictsList = [];
    const suggestions = [];
    
    // 1. Faculty Overload Analysis
    const facultyLoad = {};
    const facultyList = AppState.faculty || [];
    const subjectsList = AppState.subjects || [];
    
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
          subjectId: subject.id,
          subjectName: subject.name,
          hours: subject.totalWeeklyClasses,
          courseId: course.id
        });
      }
    }
    
    // Find overloaded faculty
    for (const [id, load] of Object.entries(facultyLoad)) {
      if (load.assigned > load.max) {
        const overload = load.assigned - load.max;
        conflictsList.push({
          id: `overload_${id}`,
          type: "faculty_overload",
          severity: "high",
          facultyId: parseInt(id),
          facultyName: load.name,
          currentLoad: load.assigned,
          maxLoad: load.max,
          overload: overload,
          subjects: load.subjects,
          suggestedResolution: `Reduce ${overload} hours by reassigning subjects to other faculty`,
          autoResolve: true,
          resolution: {
            action: "reassign",
            targetFaculty: null,
            subjectsToMove: []
          }
        });
        
        // Auto-resolve suggestion - find available faculty
        const availableFaculty = facultyList.filter(f => 
          f.course === department && 
          f.id !== parseInt(id) && 
          (facultyLoad[f.id]?.assigned || 0) + 4 <= (f.maxHours || (f.designation === "Professor" ? 10 : f.designation === "Associate Professor" ? 12 : 14))
        );
        
        if (availableFaculty.length > 0 && load.subjects.length > 0) {
          suggestions.push({
            conflictId: `overload_${id}`,
            action: "reassign",
            suggestion: `Move "${load.subjects[0].subjectName}" to ${availableFaculty[0].name}`,
            targetFacultyId: availableFaculty[0].id,
            targetFacultyName: availableFaculty[0].name,
            subjectToMove: load.subjects[0]
          });
        }
      }
    }
    
    // 2. Slot Capacity Analysis
    const TEACHING_SLOTS_PER_WEEK = 40;
    const SECTIONS = 3;
    const totalAvailableSlots = TEACHING_SLOTS_PER_WEEK * SECTIONS;
    let totalRequiredSlots = 0;
    
    for (const course of approvedCourses) {
      const subject = subjectsList.find(s => s.id === course.subjectId);
      if (subject) {
        totalRequiredSlots += subject.totalWeeklyClasses * SECTIONS;
      }
    }
    
    // Check if slots exceed available capacity
    const capacityThreshold = totalAvailableSlots * 0.9; // 90% utilization threshold
    if (totalRequiredSlots > capacityThreshold) {
      const deficit = totalRequiredSlots - totalAvailableSlots;
      conflictsList.push({
        id: "slot_capacity",
        type: "slot_capacity",
        severity: "high",
        requiredSlots: totalRequiredSlots,
        availableSlots: totalAvailableSlots,
        deficit: deficit > 0 ? deficit : 0,
        utilization: (totalRequiredSlots / totalAvailableSlots) * 100,
        suggestedResolution: `Reduce ${Math.abs(deficit)} slots by adjusting subject hours or moving subjects to next semester`,
        autoResolve: false,
        resolution: null
      });
    }
    
    // 3. Room Conflict Analysis (if timetable exists)
    const timetable = AppState.timetable || [];
    const roomConflicts = [];
    const roomSchedule = {};
    
    for (const slot of timetable) {
      if (slot.room && slot.day && slot.time) {
        const key = `${slot.day}_${slot.time}_${slot.room}`;
        if (roomSchedule[key]) {
          roomConflicts.push({
            id: `room_conflict_${slot.id || Date.now()}_${Math.random()}`,
            type: "room_conflict",
            severity: "medium",
            room: slot.room,
            day: slot.day,
            time: slot.time,
            subjects: [roomSchedule[key].subject, slot.subject],
            suggestedResolution: `Reschedule one of the classes in ${slot.room} at ${slot.day} ${slot.time}`,
            autoResolve: true,
            resolution: null
          });
        } else {
          roomSchedule[key] = slot;
        }
      }
    }
    
    conflictsList.push(...roomConflicts.slice(0, 5));
    
    setConflicts(conflictsList);
    setAutoResolveSuggestions(suggestions);
    setLoading(false);
  };

  const applyAutoResolution = (suggestion) => {
    setApplying(true);
    try {
      const conflict = conflicts.find(c => c.id === suggestion.conflictId);
      if (conflict && conflict.type === "faculty_overload") {
        const updatedCourseDetails = AppState.courseDetails.map(course => {
          if (course.id === suggestion.subjectToMove.courseId) {
            return {
              ...course,
              facultyId: suggestion.targetFacultyId,
              facultyName: suggestion.targetFacultyName
            };
          }
          return course;
        });
        
        AppState.courseDetails = updatedCourseDetails;
        saveToStorage(STORAGE_KEYS.COURSE_DETAILS, updatedCourseDetails);
        
        const facultyList = AppState.faculty;
        const oldFaculty = facultyList.find(f => f.id === conflict.facultyId);
        const newFaculty = facultyList.find(f => f.id === suggestion.targetFacultyId);
        
        if (oldFaculty) {
          oldFaculty.assignedHours = (oldFaculty.assignedHours || 0) - suggestion.subjectToMove.hours;
          oldFaculty.remainingHours = (oldFaculty.remainingHours || oldFaculty.maxHours) + suggestion.subjectToMove.hours;
        }
        if (newFaculty) {
          newFaculty.assignedHours = (newFaculty.assignedHours || 0) + suggestion.subjectToMove.hours;
          newFaculty.remainingHours = (newFaculty.remainingHours || newFaculty.maxHours) - suggestion.subjectToMove.hours;
        }
        
        saveToStorage(STORAGE_KEYS.FACULTY, facultyList);
        AppState.faculty = facultyList;
        
        alert(`✓ Auto-resolved: Moved "${suggestion.subjectToMove.subjectName}" from ${conflict.facultyName} to ${suggestion.targetFacultyName}`);
        
        setConflicts(conflicts.filter(c => c.id !== suggestion.conflictId));
      }
      
      window.dispatchEvent(new Event('storage'));
      if (onResolved) onResolved();
    } catch (error) {
      console.error("Error applying resolution:", error);
      alert("Failed to apply resolution. Please try manually.");
    } finally {
      setApplying(false);
    }
  };

  const applyManualResolution = (conflictId, resolution) => {
    setApplying(true);
    try {
      const conflict = conflicts.find(c => c.id === conflictId);
      if (conflict && conflict.type === "faculty_overload" && resolution.action === "reduce_hours") {
        const subjectToUpdate = conflict.subjects[0];
        const updatedSubjects = AppState.subjects.map(s => {
          if (s.id === subjectToUpdate.subjectId) {
            const newHours = Math.max(2, s.totalWeeklyClasses - resolution.reduceBy);
            return { ...s, totalWeeklyClasses: newHours };
          }
          return s;
        });
        
        AppState.subjects = updatedSubjects;
        saveToStorage(STORAGE_KEYS.SUBJECTS, updatedSubjects);
        
        alert(`✓ Reduced "${subjectToUpdate.subjectName}" hours by ${resolution.reduceBy}h`);
        
        setConflicts(conflicts.filter(c => c.id !== conflictId));
      }
      
      window.dispatchEvent(new Event('storage'));
      if (onResolved) onResolved();
    } catch (error) {
      console.error("Error applying resolution:", error);
      alert("Failed to apply resolution.");
    } finally {
      setApplying(false);
    }
  };

  const resolveAllAuto = () => {
    if (confirm("Apply all auto-resolvable suggestions?")) {
      autoResolveSuggestions.forEach(suggestion => {
        applyAutoResolution(suggestion);
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <div style={{ textAlign: "center", padding: 20 }}>
          <p>Analyzing conflicts...</p>
        </div>
      </Card>
    );
  }

  if (conflicts.length === 0) {
    return (
      <Card style={{ background: C.accent.greenBg }}>
        <div style={{ textAlign: "center", padding: 20 }}>
          <span style={{ fontSize: 48 }}>✅</span>
          <h3 style={{ color: C.accent.green, marginTop: 8 }}>No Conflicts Detected!</h3>
          <p style={{ color: C.text.secondary }}>All subjects can be scheduled without issues.</p>
          <Button onClick={() => onResolved && onResolved(true)} variant="success">
            Proceed to Generate Timetable
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Title>⚠️ Conflict Resolution Required</Title>
      
      <div style={{ 
        padding: 12, 
        background: C.accent.redBg, 
        borderRadius: 8,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12
      }}>
        <div>
          <p style={{ fontWeight: 600, color: C.accent.red, margin: 0 }}>
            {conflicts.length} conflict(s) detected before timetable generation
          </p>
          <p style={{ fontSize: 12, color: C.text.secondary, margin: 4 }}>
            Resolve these conflicts to generate a conflict-free timetable
          </p>
        </div>
        {autoResolveSuggestions.length > 0 && (
          <Button onClick={resolveAllAuto} variant="primary" disabled={applying}>
            🔧 Apply All Auto-Resolutions
          </Button>
        )}
      </div>

      {conflicts.filter(c => c.type === "faculty_overload").map(conflict => (
        <Card key={conflict.id} style={{ borderLeft: `4px solid ${C.accent.red}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
            <div>
              <h4 style={{ color: C.text.primary }}>👨‍🏫 Faculty Overload</h4>
              <p><strong>{conflict.facultyName}</strong> is overloaded by <strong style={{ color: C.accent.red }}>{conflict.overload}h</strong></p>
              <p style={{ fontSize: 13, color: C.text.secondary }}>
                Current: {conflict.currentLoad}h / {conflict.maxLoad}h max
              </p>
            </div>
            <Badge variant="danger">High Severity</Badge>
          </div>
          
          <div style={{ marginTop: 12, padding: 12, background: C.cardHover, borderRadius: 8 }}>
            <p style={{ fontWeight: 600, marginBottom: 8 }}>Assigned Subjects:</p>
            {conflict.subjects.map((subj, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                <span>{subj.subjectName}</span>
                <span style={{ color: C.accent.gold }}>{subj.hours}h/week</span>
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: 12 }}>
            <p style={{ fontWeight: 600, marginBottom: 8 }}>Suggested Resolution:</p>
            <p style={{ fontSize: 13, color: C.text.secondary }}>{conflict.suggestedResolution}</p>
            
            {autoResolveSuggestions.filter(s => s.conflictId === conflict.id).map((suggestion, idx) => (
              <div key={idx} style={{ marginTop: 12, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
                <p style={{ marginBottom: 8 }}>💡 Auto-Resolution Suggestion:</p>
                <p style={{ fontSize: 13 }}>Move "{suggestion.subjectToMove.subjectName}" to <strong>{suggestion.targetFacultyName}</strong></p>
                <Button 
                  onClick={() => applyAutoResolution(suggestion)} 
                  variant="primary" 
                  size="sm"
                  disabled={applying}
                >
                  Apply Suggestion
                </Button>
              </div>
            ))}
            
            <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
              <Select
                label="Manual Resolution"
                options={[
                  { value: "", label: "Select action..." },
                  { value: "reassign", label: "Reassign to another faculty" },
                  { value: "reduce_hours", label: "Reduce subject hours" }
                ]}
                onChange={(e) => {
                  if (e.target.value === "reassign") {
                    const newFaculty = prompt("Enter faculty ID to reassign to:");
                    if (newFaculty) {
                      applyManualResolution(conflict.id, { action: "reassign", targetFacultyId: parseInt(newFaculty) });
                    }
                  } else if (e.target.value === "reduce_hours") {
                    const hours = prompt("How many hours to reduce? (1-4)", "2");
                    if (hours) {
                      applyManualResolution(conflict.id, { action: "reduce_hours", reduceBy: parseInt(hours) });
                    }
                  }
                }}
              />
            </div>
          </div>
        </Card>
      ))}

      {conflicts.filter(c => c.type === "slot_capacity").map(conflict => (
        <Card key={conflict.id} style={{ borderLeft: `4px solid ${C.accent.red}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
            <div>
              <h4 style={{ color: C.text.primary }}>📊 Slot Capacity Issue</h4>
              <p>Need <strong style={{ color: C.accent.red }}>{conflict.deficit} more slots</strong> to schedule all subjects</p>
              <p style={{ fontSize: 13, color: C.text.secondary }}>
                Required: {conflict.requiredSlots} slots | Available: {conflict.availableSlots} slots
              </p>
              <p style={{ fontSize: 12, color: C.text.secondary, marginTop: 4 }}>
                Utilization: {conflict.utilization?.toFixed(1)}%
              </p>
            </div>
            <Badge variant="danger">High Severity</Badge>
          </div>
          
          <div style={{ marginTop: 12 }}>
            <p style={{ fontWeight: 600, marginBottom: 8 }}>Suggested Resolution:</p>
            <p style={{ fontSize: 13, color: C.text.secondary }}>{conflict.suggestedResolution}</p>
            
            <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
              <Button 
                onClick={() => {
                  alert("Please contact coordinator to:\n- Reduce weekly hours for some subjects\n- Move subjects to next semester\n- Add more teaching days");
                }} 
                variant="primary"
              >
                Get Help from Coordinator
              </Button>
            </div>
          </div>
        </Card>
      ))}

      {conflicts.filter(c => c.type === "room_conflict").map(conflict => (
        <Card key={conflict.id} style={{ borderLeft: `4px solid ${C.accent.gold}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
            <div>
              <h4 style={{ color: C.text.primary }}>🏢 Room Conflict</h4>
              <p>Room <strong>{conflict.room}</strong> has multiple classes at {conflict.day} {conflict.time}</p>
              <p style={{ fontSize: 13, color: C.text.secondary }}>
                Conflicting subjects: {conflict.subjects.join(", ")}
              </p>
            </div>
            <Badge variant="warning">Medium Severity</Badge>
          </div>
          
          <div style={{ marginTop: 12 }}>
            <Button 
              onClick={() => {
                alert("Room conflict will be automatically resolved during timetable regeneration.\nThe algorithm will find alternative rooms.");
              }} 
              variant="primary"
              size="sm"
            >
              Auto-resolve on Generation
            </Button>
          </div>
        </Card>
      ))}

      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div>
            <p><strong>Conflicts Summary:</strong></p>
            <p style={{ fontSize: 13, color: C.text.secondary }}>
              Faculty Overload: {conflicts.filter(c => c.type === "faculty_overload").length}<br />
              Slot Capacity: {conflicts.filter(c => c.type === "slot_capacity").length}<br />
              Room Conflicts: {conflicts.filter(c => c.type === "room_conflict").length}
            </p>
          </div>
          <Button 
            onClick={() => onResolved && onResolved(false)} 
            variant="secondary"
            disabled={conflicts.filter(c => c.severity === "high").length > 0}
          >
            {conflicts.filter(c => c.severity === "high").length > 0 
              ? "Resolve High Severity Conflicts First" 
              : "Generate Anyway (with warnings)"}
          </Button>
        </div>
      </Card>
    </div>
  );
}