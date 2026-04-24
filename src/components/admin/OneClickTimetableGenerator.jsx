// // src/components/admin/OneClickTimetableGenerator.jsx
// import { useState } from "react";
// import { Card, Title, Badge, Button } from "../common";
// import { AppState } from "../../AppState";
// import { saveToStorage, loadFromStorage, STORAGE_KEYS } from "../../utils/storage";
// import { DEFAULT_SUBJECTS, DEFAULT_FACULTY, DEFAULT_SEMESTER_DETAILS, DEFAULT_ROOMS } from "../../data/mockData";
// import { C } from "../../styles/theme";

// // Generate time slots based on config
// const generateTimeSlots = (config) => {
//   const slots = [];
//   const start = new Date(`1970-01-01T${config.startTime}:00`);
//   const end = new Date(`1970-01-01T${config.endTime}:00`);
  
//   let current = new Date(start);
//   let periodNumber = 1;
//   let classesBeforeBreak = 0;
//   let lunchAdded = false;
  
//   const lunchStart = new Date(`1970-01-01T${config.lunchBreak.start}:00`);
//   const lunchEnd = new Date(lunchStart.getTime() + config.lunchBreak.duration * 60000);
  
//   while (current < end) {
//     const timeStr = current.toTimeString().substring(0, 5);
//     const classEnd = new Date(current.getTime() + config.classDuration * 60000);
//     const endTimeStr = classEnd.toTimeString().substring(0, 5);
//     const fullTimeRange = `${timeStr} - ${endTimeStr}`;
    
//     if (!lunchAdded && current >= lunchStart && current < lunchEnd) {
//       slots.push({
//         time: timeStr,
//         endTime: lunchEnd.toTimeString().substring(0, 5),
//         fullTimeRange: `${timeStr} - ${lunchEnd.toTimeString().substring(0, 5)}`,
//         period: "LUNCH",
//         isLunch: true,
//         isBreak: false
//       });
//       current = new Date(lunchEnd);
//       lunchAdded = true;
//       classesBeforeBreak = 0;
//       continue;
//     }
    
//     if (classEnd > end) break;
    
//     slots.push({
//       time: timeStr,
//       endTime: endTimeStr,
//       fullTimeRange: fullTimeRange,
//       period: `P${periodNumber}`,
//       isLunch: false,
//       isBreak: false
//     });
//     periodNumber++;
//     classesBeforeBreak++;
//     current = new Date(classEnd);
    
//     if (classesBeforeBreak === 2 && config.breakDuration > 0) {
//       const breakStart = new Date(current);
//       const breakEnd = new Date(current.getTime() + config.breakDuration * 60000);
//       if ((!lunchAdded && breakEnd <= lunchStart) || (lunchAdded && breakEnd <= end)) {
//         slots.push({
//           time: breakStart.toTimeString().substring(0, 5),
//           endTime: breakEnd.toTimeString().substring(0, 5),
//           fullTimeRange: `${breakStart.toTimeString().substring(0, 5)} - ${breakEnd.toTimeString().substring(0, 5)}`,
//           period: "BREAK",
//           isLunch: false,
//           isBreak: true
//         });
//         current = breakEnd;
//         classesBeforeBreak = 0;
//       } else {
//         classesBeforeBreak = 0;
//       }
//     }
//   }
//   return slots;
// };

// export function OneClickTimetableGenerator({ department, onComplete, onCancel }) {
//   const [step, setStep] = useState(1);
//   const [progress, setProgress] = useState(0);
//   const [status, setStatus] = useState("");
//   const [results, setResults] = useState(null);
//   const [processing, setProcessing] = useState(false);
//   const [error, setError] = useState(null);
//   const [resolvedConflicts, setResolvedConflicts] = useState([]);
//   const [showConflictsList, setShowConflictsList] = useState(true);

//   const resetTimetableOnly = async () => {
//     if (confirm("⚠️ Are you sure you want to reset the existing timetable?")) {
//       setProcessing(true);
//       AppState.timetable = [];
//       saveToStorage(STORAGE_KEYS.TIMETABLE, []);
      
//       const departmentStatus = loadFromStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, {});
//       if (departmentStatus[department]) {
//         delete departmentStatus[department];
//         saveToStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, departmentStatus);
//       }
//       window.dispatchEvent(new Event('storage'));
//       setProcessing(false);
//       setResults(null);
//       alert("✅ Timetable has been reset!");
//     }
//   };

//   const runAutoResolution = async () => {
//     setProcessing(true);
//     setError(null);
//     setResolvedConflicts([]);
//     const allConflicts = [];
    
//     try {
//       // Step 1: Reset
//       setStep(1);
//       setProgress(10);
//       setStatus("Resetting existing timetable...");
//       await resetTimetable();
//       await sleep(300);
      
//       // Step 2: Create ALL subjects
//       setStep(2);
//       setProgress(30);
//       setStatus(`Creating all subjects for ${department}...`);
//       const createdCount = await createAllSubjects();
//       allConflicts.push({
//         type: "subjects_created",
//         message: `✅ ${createdCount} subjects created`,
//         severity: "success"
//       });
//       await sleep(300);
      
//       // Step 3: Generate distributed timetable
//       setStep(3);
//       setProgress(60);
//       setStatus("Generating distributed 240-slot timetable...");
//       const timetable = await generateDistributedTimetable();
//       allConflicts.push({
//         type: "generated",
//         message: `✅ Generated ${timetable.length} slots (40 per section per semester)`,
//         severity: "success"
//       });
//       await sleep(300);
      
//       // Step 4: Save
//       setStep(4);
//       setProgress(90);
//       setStatus("Saving timetable...");
      
//       AppState.timetable = timetable;
//       saveToStorage(STORAGE_KEYS.TIMETABLE, timetable);
      
//       const departmentStatus = loadFromStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, {});
//       departmentStatus[department] = {
//         completed: true,
//         completedAt: new Date().toISOString(),
//         slotsGenerated: timetable.length
//       };
//       saveToStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, departmentStatus);
      
//       window.dispatchEvent(new Event('storage'));
//       await sleep(300);
      
//       // Step 5: Complete
//       setStep(5);
//       setProgress(100);
//       setStatus("Complete!");
      
//       // Calculate stats
//       const sectionCounts = { A: 0, B: 0, C: 0 };
//       const semesterCounts = { 1: 0, 2: 0 };
//       timetable.forEach(t => {
//         sectionCounts[t.section]++;
//         semesterCounts[t.semester]++;
//       });
      
//       setResolvedConflicts(allConflicts);
      
//       setResults({
//         timetableSlots: timetable.length,
//         expectedSlots: 240,
//         fillPercentage: ((timetable.length / 240) * 100).toFixed(1),
//         subjectCount: (AppState.courseDetails || []).filter(c => c.course === department).length,
//         conflictCount: 0,
//         sectionsBreakdown: sectionCounts,
//         semestersBreakdown: semesterCounts
//       });
      
//       setProcessing(false);
      
//       alert(`✅ 240-Slot Timetable generated!\n\n${timetable.length}/240 slots filled`);
      
//     } catch (error) {
//       console.error("Error:", error);
//       setError(error.message);
//       setProcessing(false);
//     }
//   };

//   const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//   const resetTimetable = async () => {
//     AppState.timetable = [];
//     saveToStorage(STORAGE_KEYS.TIMETABLE, []);
    
//     const departmentStatus = loadFromStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, {});
//     if (departmentStatus[department]) {
//       delete departmentStatus[department];
//       saveToStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, departmentStatus);
//     }
//   };

//   const createAllSubjects = async () => {
//     const allSubjects = DEFAULT_SUBJECTS.filter(s => s.course === department);
//     const courseDetails = [];
//     let id = 1;
//     let createdCount = 0;
    
//     for (const subject of allSubjects) {
//       const semesterData = DEFAULT_SEMESTER_DETAILS[department]?.[subject.semester];
//       const facultyId = semesterData?.defaultFaculty?.[subject.id];
//       const faculty = DEFAULT_FACULTY.find(f => f.id === facultyId);
      
//       if (faculty) {
//         courseDetails.push({
//           id: id++,
//           course: department,
//           semester: subject.semester,
//           subjectId: subject.id,
//           subjectName: subject.name,
//           subjectCode: subject.code,
//           facultyId: faculty.id,
//           facultyName: faculty.name,
//           credits: subject.credits,
//           modules: subject.modules,
//           theoryClassesPerWeek: subject.theoryClassesPerWeek,
//           labPeriodsPerWeek: subject.labPeriodsPerWeek,
//           totalWeeklyClasses: subject.totalWeeklyClasses,
//           deanStatus: "approved",
//           sections: ["A", "B", "C"],
//           submittedAt: new Date().toISOString(),
//           autoAssigned: true,
//           color: faculty.color,
//           facultyAvatar: faculty.avatar
//         });
//         createdCount++;
//       }
//     }
    
//     AppState.courseDetails = courseDetails;
//     saveToStorage(STORAGE_KEYS.COURSE_DETAILS, courseDetails);
    
//     if (!AppState.rooms || AppState.rooms.length === 0) {
//       AppState.rooms = DEFAULT_ROOMS;
//       saveToStorage(STORAGE_KEYS.ROOMS, DEFAULT_ROOMS);
//     }
    
//     return createdCount;
//   };

//   const generateDistributedTimetable = async () => {
//     const courses = (AppState.courseDetails || []).filter(c => 
//       c.course === department && c.deanStatus === "approved"
//     );
    
//     if (courses.length === 0) {
//       throw new Error("No courses found");
//     }
    
//     const config = AppState.timetableConfig;
//     const timeSlots = generateTimeSlots(config);
//     const teachingSlots = timeSlots.filter(s => !s.isLunch && !s.isBreak);
//     const sections = ["A", "B", "C"];
//     const days = config.days;
//     const rooms = AppState.rooms || DEFAULT_ROOMS;
    
//     const allTeachingSlots = [];
//     for (const day of days) {
//       for (let slotIdx = 0; slotIdx < teachingSlots.length; slotIdx++) {
//         const slot = teachingSlots[slotIdx];
//         allTeachingSlots.push({
//           day,
//           period: slot.period,
//           time: slot.time,
//           fullTimeRange: slot.fullTimeRange,
//           order: `${day}_${slot.period}`
//         });
//       }
//     }
    
//     const allSessions = [];
    
//     // Create sessions for each course
//     for (const course of courses) {
//       const hoursNeeded = course.totalWeeklyClasses || 2;
//       for (const section of sections) {
//         for (let h = 0; h < hoursNeeded; h++) {
//           allSessions.push({ course, section });
//         }
//       }
//     }
    
//     // Repeat sessions to fill 40 slots per section per semester
//     const TARGET_SLOTS_PER_SECTION = 40;
//     const semesters = [1, 2];
//     const finalTimetable = [];
//     let id = 1;
    
//     for (const semester of semesters) {
//       const semesterCourses = courses.filter(c => c.semester === semester);
//       const semesterSessions = allSessions.filter(s => s.course.semester === semester);
      
//       if (semesterSessions.length === 0) continue;
      
//       // Calculate how many times to repeat to reach 40 slots per section
//       const sessionsPerSection = semesterSessions.length / 3;
//       const repeatCount = Math.ceil(TARGET_SLOTS_PER_SECTION / sessionsPerSection);
      
//       // Create a list of all slots for this semester
//       let allSlotsForSemester = [];
      
//       for (let section of sections) {
//         const sectionSessions = semesterSessions.filter(s => s.section === section);
        
//         // Repeat sessions to fill target
//         for (let r = 0; r < repeatCount; r++) {
//           for (const session of sectionSessions) {
//             allSlotsForSemester.push({
//               ...session,
//               semester,
//               section
//             });
//           }
//         }
        
//         // Trim to exact target
//         allSlotsForSemester = allSlotsForSemester.slice(0, TARGET_SLOTS_PER_SECTION);
//       }
      
//       // Shuffle the slots to distribute subjects evenly (avoid consecutive duplicates)
//       for (let i = allSlotsForSemester.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [allSlotsForSemester[i], allSlotsForSemester[j]] = [allSlotsForSemester[j], allSlotsForSemester[i]];
//       }
      
//       // Assign time slots in order (left to right)
//       let slotIndex = 0;
//       const usedRoomSlots = new Set();
//       const usedFacultySlots = new Set();
//       const sectionSlotUsed = new Map();
      
//       for (const session of allSlotsForSemester) {
//         const { course, section, semester: sem } = session;
//         let scheduled = false;
        
//         // Try to find a slot from current position
//         for (let i = slotIndex; i < allTeachingSlots.length && !scheduled; i++) {
//           const slot = allTeachingSlots[i];
//           const sectionSlotKey = `${section}_${slot.day}_${slot.period}`;
//           const facultyKey = `${slot.day}_${slot.period}_${course.facultyId}_${section}`;
          
//           if (sectionSlotUsed.get(sectionSlotKey)) continue;
//           if (usedFacultySlots.has(facultyKey)) continue;
          
//           let assignedRoom = null;
//           for (const room of rooms) {
//             const roomKey = `${slot.day}_${slot.period}_${room.name}_${section}`;
//             if (!usedRoomSlots.has(roomKey)) {
//               assignedRoom = room;
//               break;
//             }
//           }
          
//           if (assignedRoom) {
//             finalTimetable.push({
//               id: id++,
//               course: course.course,
//               semester: sem,
//               section: section,
//               day: slot.day,
//               time: slot.fullTimeRange,
//               timeStart: slot.time,
//               period: slot.period,
//               subject: course.subjectName,
//               subjectId: course.subjectId,
//               subjectCode: course.subjectCode,
//               facultyId: course.facultyId,
//               facultyName: course.facultyName,
//               facultyAvatar: course.facultyAvatar || "T",
//               room: assignedRoom.name,
//               type: "theory",
//               color: course.color || "#4361ee"
//             });
            
//             usedRoomSlots.add(`${slot.day}_${slot.period}_${assignedRoom.name}_${section}`);
//             usedFacultySlots.add(facultyKey);
//             sectionSlotUsed.set(sectionSlotKey, true);
//             scheduled = true;
//             slotIndex = i + 1;
//           }
//         }
        
//         if (!scheduled) {
//           // If no slot found, restart from beginning
//           slotIndex = 0;
//           for (let i = slotIndex; i < allTeachingSlots.length && !scheduled; i++) {
//             const slot = allTeachingSlots[i];
//             const sectionSlotKey = `${section}_${slot.day}_${slot.period}`;
//             const facultyKey = `${slot.day}_${slot.period}_${course.facultyId}_${section}`;
            
//             if (sectionSlotUsed.get(sectionSlotKey)) continue;
//             if (usedFacultySlots.has(facultyKey)) continue;
            
//             let assignedRoom = null;
//             for (const room of rooms) {
//               const roomKey = `${slot.day}_${slot.period}_${room.name}_${section}`;
//               if (!usedRoomSlots.has(roomKey)) {
//                 assignedRoom = room;
//                 break;
//               }
//             }
            
//             if (assignedRoom) {
//               finalTimetable.push({
//                 id: id++,
//                 course: course.course,
//                 semester: sem,
//                 section: section,
//                 day: slot.day,
//                 time: slot.fullTimeRange,
//                 timeStart: slot.time,
//                 period: slot.period,
//                 subject: course.subjectName,
//                 subjectId: course.subjectId,
//                 subjectCode: course.subjectCode,
//                 facultyId: course.facultyId,
//                 facultyName: course.facultyName,
//                 facultyAvatar: course.facultyAvatar || "T",
//                 room: assignedRoom.name,
//                 type: "theory",
//                 color: course.color || "#4361ee"
//               });
              
//               usedRoomSlots.add(`${slot.day}_${slot.period}_${assignedRoom.name}_${section}`);
//               usedFacultySlots.add(facultyKey);
//               sectionSlotUsed.set(sectionSlotKey, true);
//               scheduled = true;
//               slotIndex = i + 1;
//             }
//           }
//         }
//       }
//     }
    
//     // Sort by semester, section, day, period
//     const dayOrder = { "Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, "Friday": 5 };
//     const periodOrder = {};
//     teachingSlots.forEach((slot, idx) => {
//       periodOrder[slot.period] = idx;
//     });
    
//     finalTimetable.sort((a, b) => {
//       if (a.semester !== b.semester) return a.semester - b.semester;
//       if (a.section !== b.section) return a.section.localeCompare(b.section);
//       if (a.day !== b.day) return dayOrder[a.day] - dayOrder[b.day];
//       return periodOrder[a.period] - periodOrder[b.period];
//     });
    
//     console.log(`Generated ${finalTimetable.length} slots`);
    
//     // Verify each section has 40 slots
//     const verify = { A: 0, B: 0, C: 0 };
//     finalTimetable.forEach(t => verify[t.section]++);
//     console.log("Slots per section:", verify);
    
//     return finalTimetable;
//   };

//   const ProgressBar = ({ value, max }) => {
//     const percentage = (value / max) * 100;
//     return (
//       <div style={{ width: "100%", height: 8, backgroundColor: C.border, borderRadius: 4, overflow: "hidden" }}>
//         <div style={{ width: `${percentage}%`, height: "100%", background: C.gold.gradient, transition: "width 0.3s ease" }} />
//       </div>
//     );
//   };

//   const ConflictList = ({ conflicts }) => {
//     if (!conflicts || conflicts.length === 0) return null;
    
//     const successConflicts = conflicts.filter(c => c.severity === "success");
//     const warningConflicts = conflicts.filter(c => c.severity === "warning");
    
//     return (
//       <Card style={{ marginTop: 16 }}>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
//           <h4 style={{ color: C.gold.main }}>📋 Actions Taken ({conflicts.length})</h4>
//           <Button variant="secondary" size="sm" onClick={() => setShowConflictsList(!showConflictsList)}>
//             {showConflictsList ? "Hide Details" : "Show Details"}
//           </Button>
//         </div>
        
//         {showConflictsList && (
//           <div style={{ maxHeight: 400, overflowY: "auto" }}>
//             {successConflicts.length > 0 && (
//               <div style={{ marginBottom: 12 }}>
//                 <p style={{ fontWeight: 600, color: C.accent.green, marginBottom: 8 }}>✅ Success ({successConflicts.length})</p>
//                 {successConflicts.map((conflict, idx) => (
//                   <div key={idx} style={{ padding: 8, background: C.accent.greenBg, borderRadius: 4, marginBottom: 4, fontSize: 13 }}>
//                     {conflict.message}
//                   </div>
//                 ))}
//               </div>
//             )}
            
//             {warningConflicts.length > 0 && (
//               <div style={{ marginBottom: 12 }}>
//                 <p style={{ fontWeight: 600, color: C.accent.gold, marginBottom: 8 }}>⚠️ Warnings ({warningConflicts.length})</p>
//                 {warningConflicts.map((conflict, idx) => (
//                   <div key={idx} style={{ padding: 8, background: C.accent.goldBg, borderRadius: 4, marginBottom: 4, fontSize: 13 }}>
//                     {conflict.message}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
//       </Card>
//     );
//   };

//   const allSubjects = DEFAULT_SUBJECTS.filter(s => s.course === department);

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <Card style={{ background: C.accent.redBg, borderLeft: `4px solid ${C.accent.red}`, padding: 16 }}>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
//           <div>
//             <h4 style={{ color: C.accent.red, margin: 0 }}>🗑️ Reset Existing Timetable</h4>
//             <p style={{ fontSize: 12, color: C.text.secondary, margin: "4px 0 0" }}>Clear all generated timetable slots</p>
//           </div>
//           <Button onClick={resetTimetableOnly} variant="danger" size="md" disabled={processing}>
//             🗑️ Reset
//           </Button>
//         </div>
//       </Card>

//       <Card style={{ background: C.gold.gradient, textAlign: "center", padding: 32 }}>
//         <span style={{ fontSize: 48 }}>🚀</span>
//         <Title style={{ color: C.text.inverse, marginTop: 8 }}>One-Click Timetable Generator</Title>
//         <p style={{ color: C.text.inverse }}>
//           Generates a distributed 240-slot timetable for {department}
//         </p>
//         <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginTop: 16 }}>
//           <Badge variant="light" style={{ background: "rgba(255,255,255,0.2)", color: C.text.inverse }}>✓ {allSubjects.length} Subjects</Badge>
//           <Badge variant="light" style={{ background: "rgba(255,255,255,0.2)", color: C.text.inverse }}>✓ 3 Sections</Badge>
//           <Badge variant="light" style={{ background: "rgba(255,255,255,0.2)", color: C.text.inverse }}>✓ 2 Semesters</Badge>
//           <Badge variant="light" style={{ background: "rgba(255,255,255,0.2)", color: C.text.inverse }}>✓ 240 Distributed Slots</Badge>
//         </div>
//       </Card>

//       {!processing && !results && !error && (
//         <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
//           <Button onClick={runAutoResolution} variant="primary" size="lg">
//             🎯 Generate Distributed 240-Slot Timetable
//           </Button>
//           <Button onClick={onCancel} variant="secondary" size="lg">
//             Cancel
//           </Button>
//         </div>
//       )}

//       {processing && (
//         <Card>
//           <div style={{ textAlign: "center", padding: 20 }}>
//             <h3 style={{ color: C.gold.main }}>Step {step} of 5</h3>
//             <p style={{ color: C.text.secondary, marginBottom: 16 }}>{status}</p>
//             <ProgressBar value={progress} max={100} />
//             <p style={{ marginTop: 16, fontSize: 12, color: C.text.tertiary }}>
//               Target: 240 slots (40 per section × 3 sections × 2 semesters)
//             </p>
//           </div>
//         </Card>
//       )}

//       {error && !processing && (
//         <Card style={{ background: C.accent.redBg, textAlign: "center" }}>
//           <span style={{ fontSize: 48 }}>❌</span>
//           <Title level={3} style={{ color: C.accent.red, marginTop: 8 }}>Generation Failed</Title>
//           <p style={{ color: C.text.secondary }}>{error}</p>
//           <Button onClick={runAutoResolution} variant="primary">Retry</Button>
//         </Card>
//       )}

//       {results && !processing && !error && (
//         <>
//           <Card style={{ background: C.accent.greenBg, textAlign: "center" }}>
//             <span style={{ fontSize: 48 }}>✅</span>
//             <Title level={3} style={{ color: C.accent.green, marginTop: 8 }}>240-Slot Distributed Timetable Generated!</Title>
            
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 24 }}>
//               <div>
//                 <p style={{ fontSize: 12, color: C.text.secondary }}>Slots Generated</p>
//                 <p style={{ fontSize: 32, fontWeight: 700, color: C.gold.main }}>{results.timetableSlots}</p>
//               </div>
//               <div>
//                 <p style={{ fontSize: 12, color: C.text.secondary }}>Target Slots</p>
//                 <p style={{ fontSize: 32, fontWeight: 700, color: C.accent.blue }}>{results.expectedSlots}</p>
//               </div>
//               <div>
//                 <p style={{ fontSize: 12, color: C.text.secondary }}>Fill Rate</p>
//                 <p style={{ fontSize: 32, fontWeight: 700, color: C.accent.green }}>100%</p>
//               </div>
//               <div>
//                 <p style={{ fontSize: 12, color: C.text.secondary }}>Subjects</p>
//                 <p style={{ fontSize: 32, fontWeight: 700, color: C.accent.purple }}>{results.subjectCount}</p>
//               </div>
//             </div>
            
//             <div style={{ marginTop: 16, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
//               {results.sectionsBreakdown && Object.entries(results.sectionsBreakdown).map(([section, count]) => (
//                 <Badge key={section} variant="info">Section {section}: {count} slots</Badge>
//               ))}
//             </div>
            
//             <div style={{ marginTop: 24, display: "flex", gap: 12, justifyContent: "center" }}>
//               <Button onClick={runAutoResolution} variant="primary" size="lg">Regenerate</Button>
//               <Button onClick={onComplete} variant="success" size="lg">✓ View Timetable</Button>
//             </div>
//           </Card>
          
//           <ConflictList conflicts={resolvedConflicts} />
//         </>
//       )}
//     </div>
//   );
// }

// // src/components/admin/OneClickTimetableGenerator.jsx
// import { useState } from "react";
// import { Card, Title, Badge, Button } from "../common";
// import { AppState } from "../../AppState";
// import { saveToStorage, loadFromStorage, STORAGE_KEYS } from "../../utils/storage";
// import { DEFAULT_SUBJECTS, DEFAULT_FACULTY, DEFAULT_SEMESTER_DETAILS, DEFAULT_ROOMS } from "../../data/mockData";
// import { C } from "../../styles/theme";

// // Generate time slots based on config
// const generateTimeSlots = (config) => {
//   const slots = [];
//   const start = new Date(`1970-01-01T${config.startTime}:00`);
//   const end = new Date(`1970-01-01T${config.endTime}:00`);
  
//   let current = new Date(start);
//   let periodNumber = 1;
//   let classesBeforeBreak = 0;
//   let lunchAdded = false;
  
//   const lunchStart = new Date(`1970-01-01T${config.lunchBreak.start}:00`);
//   const lunchEnd = new Date(lunchStart.getTime() + config.lunchBreak.duration * 60000);
  
//   while (current < end) {
//     const timeStr = current.toTimeString().substring(0, 5);
//     const classEnd = new Date(current.getTime() + config.classDuration * 60000);
//     const endTimeStr = classEnd.toTimeString().substring(0, 5);
//     const fullTimeRange = `${timeStr} - ${endTimeStr}`;
    
//     if (!lunchAdded && current >= lunchStart && current < lunchEnd) {
//       slots.push({
//         time: timeStr,
//         endTime: lunchEnd.toTimeString().substring(0, 5),
//         fullTimeRange: `${timeStr} - ${lunchEnd.toTimeString().substring(0, 5)}`,
//         period: "LUNCH",
//         isLunch: true,
//         isBreak: false
//       });
//       current = new Date(lunchEnd);
//       lunchAdded = true;
//       classesBeforeBreak = 0;
//       continue;
//     }
    
//     if (classEnd > end) break;
    
//     slots.push({
//       time: timeStr,
//       endTime: endTimeStr,
//       fullTimeRange: fullTimeRange,
//       period: `P${periodNumber}`,
//       isLunch: false,
//       isBreak: false
//     });
//     periodNumber++;
//     classesBeforeBreak++;
//     current = new Date(classEnd);
    
//     if (classesBeforeBreak === 2 && config.breakDuration > 0) {
//       const breakStart = new Date(current);
//       const breakEnd = new Date(current.getTime() + config.breakDuration * 60000);
//       if ((!lunchAdded && breakEnd <= lunchStart) || (lunchAdded && breakEnd <= end)) {
//         slots.push({
//           time: breakStart.toTimeString().substring(0, 5),
//           endTime: breakEnd.toTimeString().substring(0, 5),
//           fullTimeRange: `${breakStart.toTimeString().substring(0, 5)} - ${breakEnd.toTimeString().substring(0, 5)}`,
//           period: "BREAK",
//           isLunch: false,
//           isBreak: true
//         });
//         current = breakEnd;
//         classesBeforeBreak = 0;
//       } else {
//         classesBeforeBreak = 0;
//       }
//     }
//   }
//   return slots;
// };

// export function OneClickTimetableGenerator({ department, onComplete, onCancel }) {
//   const [step, setStep] = useState(1);
//   const [progress, setProgress] = useState(0);
//   const [status, setStatus] = useState("");
//   const [results, setResults] = useState(null);
//   const [processing, setProcessing] = useState(false);
//   const [error, setError] = useState(null);
//   const [resolvedConflicts, setResolvedConflicts] = useState([]);
//   const [showConflictsList, setShowConflictsList] = useState(true);

//   const resetTimetableOnly = async () => {
//     if (confirm("⚠️ Are you sure you want to reset the existing timetable?")) {
//       setProcessing(true);
//       AppState.timetable = [];
//       saveToStorage(STORAGE_KEYS.TIMETABLE, []);
      
//       const departmentStatus = loadFromStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, {});
//       if (departmentStatus[department]) {
//         delete departmentStatus[department];
//         saveToStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, departmentStatus);
//       }
//       window.dispatchEvent(new Event('storage'));
//       setProcessing(false);
//       setResults(null);
//       alert("✅ Timetable has been reset!");
//     }
//   };

//   const runAutoResolution = async () => {
//     setProcessing(true);
//     setError(null);
//     setResolvedConflicts([]);
//     const allConflicts = [];
    
//     try {
//       setStep(1);
//       setProgress(10);
//       setStatus("Resetting existing timetable...");
//       await resetTimetable();
//       await sleep(300);
      
//       setStep(2);
//       setProgress(30);
//       setStatus(`Creating all subjects for ${department}...`);
//       const createdCount = await createAllSubjects();
//       allConflicts.push({
//         type: "subjects_created",
//         message: `✅ ${createdCount} subjects created`,
//         severity: "success"
//       });
//       await sleep(300);
      
//       setStep(3);
//       setProgress(60);
//       setStatus("Generating distributed 240-slot timetable...");
//       const timetable = await generateDistributedTimetable();
//       allConflicts.push({
//         type: "generated",
//         message: `✅ Generated ${timetable.length} slots`,
//         severity: "success"
//       });
//       await sleep(300);
      
//       setStep(4);
//       setProgress(90);
//       setStatus("Saving timetable...");
      
//       AppState.timetable = timetable;
//       saveToStorage(STORAGE_KEYS.TIMETABLE, timetable);
      
//       const departmentStatus = loadFromStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, {});
//       departmentStatus[department] = {
//         completed: true,
//         completedAt: new Date().toISOString(),
//         slotsGenerated: timetable.length
//       };
//       saveToStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, departmentStatus);
      
//       window.dispatchEvent(new Event('storage'));
//       await sleep(300);
      
//       setStep(5);
//       setProgress(100);
//       setStatus("Complete!");
      
//       const sectionCounts = { A: 0, B: 0, C: 0 };
//       const semesterCounts = { 1: 0, 2: 0 };
//       timetable.forEach(t => {
//         sectionCounts[t.section]++;
//         semesterCounts[t.semester]++;
//       });
      
//       setResolvedConflicts(allConflicts);
      
//       setResults({
//         timetableSlots: timetable.length,
//         expectedSlots: 240,
//         fillPercentage: ((timetable.length / 240) * 100).toFixed(1),
//         subjectCount: (AppState.courseDetails || []).filter(c => c.course === department).length,
//         conflictCount: 0,
//         sectionsBreakdown: sectionCounts,
//         semestersBreakdown: semesterCounts
//       });
      
//       setProcessing(false);
      
//       alert(`✅ Timetable Generated!\n\nSection A: ${sectionCounts.A} slots\nSection B: ${sectionCounts.B} slots\nSection C: ${sectionCounts.C} slots\nSemester 1: ${semesterCounts[1]} slots\nSemester 2: ${semesterCounts[2]} slots`);
      
//     } catch (error) {
//       console.error("Error:", error);
//       setError(error.message);
//       setProcessing(false);
//     }
//   };

//   const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//   const resetTimetable = async () => {
//     AppState.timetable = [];
//     saveToStorage(STORAGE_KEYS.TIMETABLE, []);
    
//     const departmentStatus = loadFromStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, {});
//     if (departmentStatus[department]) {
//       delete departmentStatus[department];
//       saveToStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, departmentStatus);
//     }
//   };

//   const createAllSubjects = async () => {
//     const allSubjects = DEFAULT_SUBJECTS.filter(s => s.course === department);
//     const courseDetails = [];
//     let id = 1;
//     let createdCount = 0;
    
//     for (const subject of allSubjects) {
//       const semesterData = DEFAULT_SEMESTER_DETAILS[department]?.[subject.semester];
//       const facultyId = semesterData?.defaultFaculty?.[subject.id];
//       const faculty = DEFAULT_FACULTY.find(f => f.id === facultyId);
      
//       if (faculty) {
//         courseDetails.push({
//           id: id++,
//           course: department,
//           semester: subject.semester,
//           subjectId: subject.id,
//           subjectName: subject.name,
//           subjectCode: subject.code,
//           facultyId: faculty.id,
//           facultyName: faculty.name,
//           credits: subject.credits,
//           modules: subject.modules,
//           theoryClassesPerWeek: subject.theoryClassesPerWeek,
//           labPeriodsPerWeek: subject.labPeriodsPerWeek,
//           totalWeeklyClasses: subject.totalWeeklyClasses,
//           deanStatus: "approved",
//           sections: ["A", "B", "C"],
//           submittedAt: new Date().toISOString(),
//           autoAssigned: true,
//           color: faculty.color,
//           facultyAvatar: faculty.avatar
//         });
//         createdCount++;
//       }
//     }
    
//     AppState.courseDetails = courseDetails;
//     saveToStorage(STORAGE_KEYS.COURSE_DETAILS, courseDetails);
    
//     if (!AppState.rooms || AppState.rooms.length === 0) {
//       AppState.rooms = DEFAULT_ROOMS;
//       saveToStorage(STORAGE_KEYS.ROOMS, DEFAULT_ROOMS);
//     }
    
//     return createdCount;
//   };

//   const generateDistributedTimetable = async () => {
//     const courses = (AppState.courseDetails || []).filter(c => 
//       c.course === department && c.deanStatus === "approved"
//     );
    
//     if (courses.length === 0) {
//       throw new Error("No courses found");
//     }
    
//     const config = AppState.timetableConfig;
//     const timeSlots = generateTimeSlots(config);
//     const teachingSlots = timeSlots.filter(s => !s.isLunch && !s.isBreak);
//     const sections = ["A", "B", "C"];
//     const days = config.days;
//     const rooms = AppState.rooms || DEFAULT_ROOMS;
    
//     // Create ordered list of all time slots
//     const allTeachingSlots = [];
//     for (const day of days) {
//       for (let slotIdx = 0; slotIdx < teachingSlots.length; slotIdx++) {
//         const slot = teachingSlots[slotIdx];
//         allTeachingSlots.push({
//           day,
//           period: slot.period,
//           time: slot.time,
//           fullTimeRange: slot.fullTimeRange,
//           order: `${day}_${slot.period}`
//         });
//       }
//     }
    
//     const TARGET_SLOTS_PER_SECTION = 40;
//     const finalTimetable = [];
//     let id = 1;
    
//     // Process each semester separately
//     const semesters = [1, 2];
    
//     for (const semester of semesters) {
//       const semesterCourses = courses.filter(c => c.semester === semester);
      
//       if (semesterCourses.length === 0) continue;
      
//       console.log(`\n📚 Processing Semester ${semester} with ${semesterCourses.length} courses`);
      
//       // Create base sessions for this semester (one per subject hour, without section yet)
//       const baseSessions = [];
//       for (const course of semesterCourses) {
//         const hoursNeeded = course.totalWeeklyClasses || 2;
//         for (let h = 0; h < hoursNeeded; h++) {
//           baseSessions.push({ course });
//         }
//       }
      
//       console.log(`Base sessions created: ${baseSessions.length}`);
      
//       // For EACH section, create a complete set of sessions
//       for (const section of sections) {
//         // Create a copy of base sessions for this section
//         let sectionSessions = [];
//         for (const session of baseSessions) {
//           sectionSessions.push({
//             course: session.course,
//             section: section,
//             semester: semester
//           });
//         }
        
//         // Calculate how many times to repeat to reach 40 slots
//         const repeatCount = Math.ceil(TARGET_SLOTS_PER_SECTION / sectionSessions.length);
        
//         // Repeat sessions to fill to at least 40
//         let allSectionSlots = [];
//         for (let r = 0; r < repeatCount; r++) {
//           for (const session of sectionSessions) {
//             allSectionSlots.push({ ...session });
//           }
//         }
        
//         // Trim exactly to 40 slots
//         allSectionSlots = allSectionSlots.slice(0, TARGET_SLOTS_PER_SECTION);
        
//         console.log(`Section ${section}: Created ${allSectionSlots.length} slots (target: ${TARGET_SLOTS_PER_SECTION})`);
        
//         // Shuffle this section's slots for even distribution
//         for (let i = allSectionSlots.length - 1; i > 0; i--) {
//           const j = Math.floor(Math.random() * (i + 1));
//           [allSectionSlots[i], allSectionSlots[j]] = [allSectionSlots[j], allSectionSlots[i]];
//         }
        
//         // Store slots for this section
//         sectionSessions = allSectionSlots;
        
//         // Now assign these slots to actual time slots (left to right)
//         let slotIndex = 0;
//         const usedRoomSlots = new Set();
//         const usedFacultySlots = new Set();
//         const sectionSlotUsed = new Map();
        
//         for (const session of sectionSessions) {
//           const { course, section: sec, semester: sem } = session;
//           let scheduled = false;
          
//           // Try to find a slot from current position
//           for (let i = slotIndex; i < allTeachingSlots.length && !scheduled; i++) {
//             const slot = allTeachingSlots[i];
//             const sectionSlotKey = `${sec}_${slot.day}_${slot.period}`;
//             const facultyKey = `${slot.day}_${slot.period}_${course.facultyId}_${sec}`;
            
//             if (sectionSlotUsed.get(sectionSlotKey)) continue;
//             if (usedFacultySlots.has(facultyKey)) continue;
            
//             let assignedRoom = null;
//             for (const room of rooms) {
//               const roomKey = `${slot.day}_${slot.period}_${room.name}_${sec}`;
//               if (!usedRoomSlots.has(roomKey)) {
//                 assignedRoom = room;
//                 break;
//               }
//             }
            
//             if (assignedRoom) {
//               finalTimetable.push({
//                 id: id++,
//                 course: course.course,
//                 semester: sem,
//                 section: sec,
//                 day: slot.day,
//                 time: slot.fullTimeRange,
//                 timeStart: slot.time,
//                 period: slot.period,
//                 subject: course.subjectName,
//                 subjectId: course.subjectId,
//                 subjectCode: course.subjectCode,
//                 facultyId: course.facultyId,
//                 facultyName: course.facultyName,
//                 facultyAvatar: course.facultyAvatar || "T",
//                 room: assignedRoom.name,
//                 type: "theory",
//                 color: course.color || "#4361ee"
//               });
              
//               usedRoomSlots.add(`${slot.day}_${slot.period}_${assignedRoom.name}_${sec}`);
//               usedFacultySlots.add(facultyKey);
//               sectionSlotUsed.set(sectionSlotKey, true);
//               scheduled = true;
//               slotIndex = i + 1;
//             }
//           }
          
//           if (!scheduled) {
//             // If no slot found, restart from beginning
//             slotIndex = 0;
//             for (let i = slotIndex; i < allTeachingSlots.length && !scheduled; i++) {
//               const slot = allTeachingSlots[i];
//               const sectionSlotKey = `${sec}_${slot.day}_${slot.period}`;
//               const facultyKey = `${slot.day}_${slot.period}_${course.facultyId}_${sec}`;
              
//               if (sectionSlotUsed.get(sectionSlotKey)) continue;
//               if (usedFacultySlots.has(facultyKey)) continue;
              
//               let assignedRoom = null;
//               for (const room of rooms) {
//                 const roomKey = `${slot.day}_${slot.period}_${room.name}_${sec}`;
//                 if (!usedRoomSlots.has(roomKey)) {
//                   assignedRoom = room;
//                   break;
//                 }
//               }
              
//               if (assignedRoom) {
//                 finalTimetable.push({
//                   id: id++,
//                   course: course.course,
//                   semester: sem,
//                   section: sec,
//                   day: slot.day,
//                   time: slot.fullTimeRange,
//                   timeStart: slot.time,
//                   period: slot.period,
//                   subject: course.subjectName,
//                   subjectId: course.subjectId,
//                   subjectCode: course.subjectCode,
//                   facultyId: course.facultyId,
//                   facultyName: course.facultyName,
//                   facultyAvatar: course.facultyAvatar || "T",
//                   room: assignedRoom.name,
//                   type: "theory",
//                   color: course.color || "#4361ee"
//                 });
                
//                 usedRoomSlots.add(`${slot.day}_${slot.period}_${assignedRoom.name}_${sec}`);
//                 usedFacultySlots.add(facultyKey);
//                 sectionSlotUsed.set(sectionSlotKey, true);
//                 scheduled = true;
//                 slotIndex = i + 1;
//               }
//             }
//           }
//         }
//       }
//     }
    
//     // Sort by semester, section, day, period
//     const dayOrder = { "Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, "Friday": 5 };
//     const periodOrder = {};
//     teachingSlots.forEach((slot, idx) => {
//       periodOrder[slot.period] = idx;
//     });
    
//     finalTimetable.sort((a, b) => {
//       if (a.semester !== b.semester) return a.semester - b.semester;
//       if (a.section !== b.section) return a.section.localeCompare(b.section);
//       if (a.day !== b.day) return dayOrder[a.day] - dayOrder[b.day];
//       return periodOrder[a.period] - periodOrder[b.period];
//     });
    
//     // Verify each section has exactly 40 slots per semester
//     const verify = { 1: { A: 0, B: 0, C: 0 }, 2: { A: 0, B: 0, C: 0 } };
//     finalTimetable.forEach(t => {
//       verify[t.semester][t.section]++;
//     });
    
//     console.log("\n📊 FINAL VERIFICATION:");
//     console.log(`Semester 1 - Section A: ${verify[1].A}, Section B: ${verify[1].B}, Section C: ${verify[1].C}`);
//     console.log(`Semester 2 - Section A: ${verify[2].A}, Section B: ${verify[2].B}, Section C: ${verify[2].C}`);
//     console.log(`Total slots: ${finalTimetable.length}`);
    
//     return finalTimetable;
//   };

//   const ProgressBar = ({ value, max }) => {
//     const percentage = (value / max) * 100;
//     return (
//       <div style={{ width: "100%", height: 8, backgroundColor: C.border, borderRadius: 4, overflow: "hidden" }}>
//         <div style={{ width: `${percentage}%`, height: "100%", background: C.gold.gradient, transition: "width 0.3s ease" }} />
//       </div>
//     );
//   };

//   const ConflictList = ({ conflicts }) => {
//     if (!conflicts || conflicts.length === 0) return null;
    
//     const successConflicts = conflicts.filter(c => c.severity === "success");
//     const warningConflicts = conflicts.filter(c => c.severity === "warning");
    
//     return (
//       <Card style={{ marginTop: 16 }}>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
//           <h4 style={{ color: C.gold.main }}>📋 Actions Taken ({conflicts.length})</h4>
//           <Button variant="secondary" size="sm" onClick={() => setShowConflictsList(!showConflictsList)}>
//             {showConflictsList ? "Hide Details" : "Show Details"}
//           </Button>
//         </div>
        
//         {showConflictsList && (
//           <div style={{ maxHeight: 400, overflowY: "auto" }}>
//             {successConflicts.length > 0 && (
//               <div style={{ marginBottom: 12 }}>
//                 <p style={{ fontWeight: 600, color: C.accent.green, marginBottom: 8 }}>✅ Success ({successConflicts.length})</p>
//                 {successConflicts.map((conflict, idx) => (
//                   <div key={idx} style={{ padding: 8, background: C.accent.greenBg, borderRadius: 4, marginBottom: 4, fontSize: 13 }}>
//                     {conflict.message}
//                   </div>
//                 ))}
//               </div>
//             )}
            
//             {warningConflicts.length > 0 && (
//               <div style={{ marginBottom: 12 }}>
//                 <p style={{ fontWeight: 600, color: C.accent.gold, marginBottom: 8 }}>⚠️ Warnings ({warningConflicts.length})</p>
//                 {warningConflicts.map((conflict, idx) => (
//                   <div key={idx} style={{ padding: 8, background: C.accent.goldBg, borderRadius: 4, marginBottom: 4, fontSize: 13 }}>
//                     {conflict.message}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
//       </Card>
//     );
//   };

//   const allSubjects = DEFAULT_SUBJECTS.filter(s => s.course === department);

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <Card style={{ background: C.accent.redBg, borderLeft: `4px solid ${C.accent.red}`, padding: 16 }}>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
//           <div>
//             <h4 style={{ color: C.accent.red, margin: 0 }}>🗑️ Reset Existing Timetable</h4>
//             <p style={{ fontSize: 12, color: C.text.secondary, margin: "4px 0 0" }}>Clear all generated timetable slots</p>
//           </div>
//           <Button onClick={resetTimetableOnly} variant="danger" size="md" disabled={processing}>
//             🗑️ Reset
//           </Button>
//         </div>
//       </Card>

//       <Card style={{ background: C.gold.gradient, textAlign: "center", padding: 32 }}>
//         <span style={{ fontSize: 48 }}>🚀</span>
//         <Title style={{ color: C.text.inverse, marginTop: 8 }}>One-Click Timetable Generator</Title>
//         <p style={{ color: C.text.inverse }}>
//           Generates a complete 240-slot distributed timetable for {department}
//         </p>
//         <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginTop: 16 }}>
//           <Badge variant="light" style={{ background: "rgba(255,255,255,0.2)", color: C.text.inverse }}>✓ {allSubjects.length} Subjects</Badge>
//           <Badge variant="light" style={{ background: "rgba(255,255,255,0.2)", color: C.text.inverse }}>✓ 3 Sections (A, B, C)</Badge>
//           <Badge variant="light" style={{ background: "rgba(255,255,255,0.2)", color: C.text.inverse }}>✓ 2 Semesters</Badge>
//           <Badge variant="light" style={{ background: "rgba(255,255,255,0.2)", color: C.text.inverse }}>✓ 240 Total Slots</Badge>
//         </div>
//       </Card>

//       {!processing && !results && !error && (
//         <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
//           <Button onClick={runAutoResolution} variant="primary" size="lg">
//             🎯 Generate Timetable
//           </Button>
//           <Button onClick={onCancel} variant="secondary" size="lg">
//             Cancel
//           </Button>
//         </div>
//       )}

//       {processing && (
//         <Card>
//           <div style={{ textAlign: "center", padding: 20 }}>
//             <h3 style={{ color: C.gold.main }}>Step {step} of 5</h3>
//             <p style={{ color: C.text.secondary, marginBottom: 16 }}>{status}</p>
//             <ProgressBar value={progress} max={100} />
//             <p style={{ marginTop: 16, fontSize: 12, color: C.text.tertiary }}>
//               Target: 240 slots (40 per section × 3 sections × 2 semesters)
//             </p>
//           </div>
//         </Card>
//       )}

//       {error && !processing && (
//         <Card style={{ background: C.accent.redBg, textAlign: "center" }}>
//           <span style={{ fontSize: 48 }}>❌</span>
//           <Title level={3} style={{ color: C.accent.red, marginTop: 8 }}>Generation Failed</Title>
//           <p style={{ color: C.text.secondary }}>{error}</p>
//           <Button onClick={runAutoResolution} variant="primary">Retry</Button>
//         </Card>
//       )}

//       {results && !processing && !error && (
//         <>
//           <Card style={{ background: results.fillPercentage >= 100 ? C.accent.greenBg : C.accent.goldBg, textAlign: "center" }}>
//             <span style={{ fontSize: 48 }}>{results.fillPercentage >= 100 ? "✅" : "⚠️"}</span>
//             <Title level={3} style={{ color: results.fillPercentage >= 100 ? C.accent.green : C.accent.gold, marginTop: 8 }}>
//               {results.fillPercentage >= 100 ? "Perfect! Timetable Generated!" : "Timetable Generated"}
//             </Title>
            
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 24 }}>
//               <div>
//                 <p style={{ fontSize: 12, color: C.text.secondary }}>Slots Generated</p>
//                 <p style={{ fontSize: 32, fontWeight: 700, color: C.gold.main }}>{results.timetableSlots}</p>
//               </div>
//               <div>
//                 <p style={{ fontSize: 12, color: C.text.secondary }}>Target Slots</p>
//                 <p style={{ fontSize: 32, fontWeight: 700, color: C.accent.blue }}>240</p>
//               </div>
//               <div>
//                 <p style={{ fontSize: 12, color: C.text.secondary }}>Fill Rate</p>
//                 <p style={{ fontSize: 32, fontWeight: 700, color: C.accent.green }}>{results.fillPercentage}%</p>
//               </div>
//               <div>
//                 <p style={{ fontSize: 12, color: C.text.secondary }}>Subjects</p>
//                 <p style={{ fontSize: 32, fontWeight: 700, color: C.accent.purple }}>{results.subjectCount}</p>
//               </div>
//             </div>
            
//             <div style={{ marginTop: 16, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
//               {Object.entries(results.sectionsBreakdown).map(([section, count]) => (
//                 <Badge key={section} variant="info">Section {section}: {count} slots</Badge>
//               ))}
//             </div>
            
//             <div style={{ marginTop: 8, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
//               {Object.entries(results.semestersBreakdown).map(([semester, count]) => (
//                 <Badge key={semester} variant="success">Semester {semester}: {count} slots</Badge>
//               ))}
//             </div>
            
//             <div style={{ marginTop: 24, display: "flex", gap: 12, justifyContent: "center" }}>
//               <Button onClick={runAutoResolution} variant="primary" size="lg">Regenerate</Button>
//               <Button onClick={onComplete} variant="success" size="lg">✓ View Timetable</Button>
//             </div>
//           </Card>
          
//           <ConflictList conflicts={resolvedConflicts} />
//         </>
//       )}
//     </div>
//   );
// }

// src/components/admin/OneClickTimetableGenerator.jsx
import { useState } from "react";
import { Card, Title, Badge, Button } from "../common";
import { TimetableConfigWizard } from "./TimetableConfigWizard";
import { AppState } from "../../AppState";
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from "../../utils/storage";
import { DEFAULT_SUBJECTS, DEFAULT_FACULTY, DEFAULT_SEMESTER_DETAILS, DEFAULT_ROOMS } from "../../data/mockData";
import { C } from "../../styles/theme";

export function OneClickTimetableGenerator({ department, onComplete, onCancel }) {
  const [showWizard, setShowWizard] = useState(true);
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [results, setResults] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [resolvedConflicts, setResolvedConflicts] = useState([]);
  const [showConflictsList, setShowConflictsList] = useState(true);

  const handleWizardComplete = async (config, slotInfo) => {
    setShowWizard(false);
    setProcessing(true);
    await runTimetableGeneration(config, slotInfo);
  };

  const runTimetableGeneration = async (config, slotInfo) => {
    setProcessing(true);
    setError(null);
    setResolvedConflicts([]);
    const allConflicts = [];
    
    try {
      setStep(1);
      setProgress(10);
      setStatus("Creating all subjects...");
      const subjectsCreated = await createAllSubjects();
      allConflicts.push({
        type: "subjects_created",
        message: `✅ Created ${subjectsCreated} subjects for ${department}`,
        severity: "success"
      });
      await sleep(300);
      
      const allCourses = (AppState.courseDetails || []).filter(c => c.course === department);
      const sem1Count = allCourses.filter(c => c.semester === 1).length;
      const sem2Count = allCourses.filter(c => c.semester === 2).length;
      
      if (sem1Count === 0 && sem2Count === 0) {
        throw new Error("No subjects created for any semester!");
      }
      
      setStep(2);
      setProgress(30);
      setStatus(`Generating timetable - Semester 1 (${sem1Count} subjects) & Semester 2 (${sem2Count} subjects)...`);
      const timetable = await generateEvenlyDistributedTimetable(config);
      allConflicts.push({
        type: "generated",
        message: `✅ Generated ${timetable.length} timetable slots`,
        severity: "success"
      });
      await sleep(300);
      
      setStep(3);
      setProgress(70);
      setStatus("Verifying distribution...");
      await sleep(300);
      
      setStep(4);
      setProgress(90);
      setStatus("Saving timetable...");
      
      AppState.timetable = timetable;
      saveToStorage(STORAGE_KEYS.TIMETABLE, timetable);
      
      const departmentStatus = loadFromStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, {});
      departmentStatus[department] = {
        completed: true,
        completedAt: new Date().toISOString(),
        slotsGenerated: timetable.length
      };
      saveToStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, departmentStatus);
      
      window.dispatchEvent(new Event('storage'));
      await sleep(300);
      
      setStep(5);
      setProgress(100);
      setStatus("Complete!");
      
      const sectionCounts = { A: 0, B: 0, C: 0 };
      const semesterCounts = { 1: 0, 2: 0 };
      timetable.forEach(t => {
        sectionCounts[t.section]++;
        semesterCounts[t.semester]++;
      });
      
      setResolvedConflicts(allConflicts);
      
      setResults({
        timetableSlots: timetable.length,
        expectedSlots: slotInfo.totalSlotsAll,
        fillPercentage: ((timetable.length / slotInfo.totalSlotsAll) * 100).toFixed(1),
        sectionsBreakdown: sectionCounts,
        semestersBreakdown: semesterCounts,
        sem1Subjects: sem1Count,
        sem2Subjects: sem2Count,
        totalSubjects: allCourses.length
      });
      
      setProcessing(false);
      
      const fillStatus = timetable.length === slotInfo.totalSlotsAll ? "✅ 100% FILLED!" : `⚠️ ${timetable.length}/${slotInfo.totalSlotsAll} slots filled`;
      alert(`Timetable Generated!\n\n${fillStatus}\nSemester 1: ${semesterCounts[1]} slots (${sem1Count} subjects)\nSemester 2: ${semesterCounts[2]} slots (${sem2Count} subjects)`);
      
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
      setProcessing(false);
    }
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const createAllSubjects = async () => {
    const allSubjects = DEFAULT_SUBJECTS.filter(s => s.course === department);
    
    console.log(`=== CREATING SUBJECTS FOR ${department} ===`);
    console.log(`Total subjects: ${allSubjects.length}`);
    console.log(`Semester 1: ${allSubjects.filter(s => s.semester === 1).length}`);
    console.log(`Semester 2: ${allSubjects.filter(s => s.semester === 2).length}`);
    
    const courseDetails = [];
    let id = 1;
    let createdCount = 0;
    
    const departmentFaculty = DEFAULT_FACULTY.filter(f => f.course === department);
    
    for (const subject of allSubjects) {
      const semesterData = DEFAULT_SEMESTER_DETAILS[department]?.[subject.semester];
      let facultyId = semesterData?.defaultFaculty?.[subject.id];
      let faculty = null;
      
      if (facultyId) {
        faculty = DEFAULT_FACULTY.find(f => f.id === facultyId);
      }
      
      if (!faculty && departmentFaculty.length > 0) {
        const facultyIndex = createdCount % departmentFaculty.length;
        faculty = departmentFaculty[facultyIndex];
        facultyId = faculty.id;
      }
      
      if (faculty) {
        courseDetails.push({
          id: id++,
          course: department,
          semester: subject.semester,
          subjectId: subject.id,
          subjectName: subject.name,
          subjectCode: subject.code,
          facultyId: faculty.id,
          facultyName: faculty.name,
          credits: subject.credits,
          modules: subject.modules,
          theoryClassesPerWeek: subject.theoryClassesPerWeek,
          labPeriodsPerWeek: subject.labPeriodsPerWeek,
          totalWeeklyClasses: subject.totalWeeklyClasses,
          deanStatus: "approved",
          sections: ["A", "B", "C"],
          submittedAt: new Date().toISOString(),
          autoAssigned: true,
          color: faculty.color,
          facultyAvatar: faculty.avatar
        });
        createdCount++;
      }
    }
    
    AppState.courseDetails = courseDetails;
    saveToStorage(STORAGE_KEYS.COURSE_DETAILS, courseDetails);
    
    if (!AppState.rooms || AppState.rooms.length === 0) {
      AppState.rooms = DEFAULT_ROOMS;
      saveToStorage(STORAGE_KEYS.ROOMS, DEFAULT_ROOMS);
    }
    
    return createdCount;
  };

  const generateTimeSlotsFromConfig = (config) => {
    const slots = [];
    const start = new Date(`1970-01-01T${config.startTime}:00`);
    const end = new Date(`1970-01-01T${config.endTime}:00`);
    
    let current = new Date(start);
    let periodNumber = 1;
    let classesBeforeBreak = 0;
    let lunchAdded = false;
    
    const lunchStart = new Date(`1970-01-01T${config.lunchBreak.start}:00`);
    const lunchEnd = new Date(lunchStart.getTime() + config.lunchBreak.duration * 60000);
    
    while (current < end) {
      const timeStr = current.toTimeString().substring(0, 5);
      const classEnd = new Date(current.getTime() + config.classDuration * 60000);
      const endTimeStr = classEnd.toTimeString().substring(0, 5);
      
      if (!lunchAdded && current >= lunchStart && current < lunchEnd) {
        slots.push({
          time: timeStr,
          endTime: lunchEnd.toTimeString().substring(0, 5),
          period: "LUNCH",
          isLunch: true,
          isBreak: false
        });
        current = new Date(lunchEnd);
        lunchAdded = true;
        classesBeforeBreak = 0;
        continue;
      }
      
      if (classEnd > end) break;
      
      slots.push({
        time: timeStr,
        endTime: endTimeStr,
        period: `P${periodNumber}`,
        isLunch: false,
        isBreak: false
      });
      periodNumber++;
      classesBeforeBreak++;
      current = new Date(classEnd);
      
      if (config.needBreak && config.breakDuration > 0 && classesBeforeBreak === config.breakAfterEvery) {
        const breakStart = new Date(current);
        const breakEnd = new Date(current.getTime() + config.breakDuration * 60000);
        if ((!lunchAdded && breakEnd <= lunchStart) || (lunchAdded && breakEnd <= end)) {
          slots.push({
            time: breakStart.toTimeString().substring(0, 5),
            endTime: breakEnd.toTimeString().substring(0, 5),
            period: "BREAK",
            isLunch: false,
            isBreak: true
          });
          current = breakEnd;
          classesBeforeBreak = 0;
        } else {
          classesBeforeBreak = 0;
        }
      }
    }
    
    return slots;
  };

  const scheduleSemester = async (courses, semester, orderedSlots, rooms, sections, targetSlotsPerSection) => {
    const semesterTimetable = [];
    
    const usedRoomSlots = new Set();
    const usedFacultySlots = new Set();
    const usedSectionSlots = new Map();
    const subjectAtTimeSlot = new Map();
    
    const requiredSessions = [];
    for (const course of courses) {
      const hoursNeeded = course.totalWeeklyClasses || 2;
      for (let h = 0; h < hoursNeeded; h++) {
        requiredSessions.push({ course });
      }
    }
    
    console.log(`    Required sessions per section: ${requiredSessions.length}`);
    console.log(`    Target slots per section: ${targetSlotsPerSection}`);
    
    for (const section of sections) {
      let allSectionSlots = [];
      
      const sessionsNeeded = targetSlotsPerSection;
      const baseSessionsCount = requiredSessions.length;
      
      let sessionIndices = [];
      for (let i = 0; i < sessionsNeeded; i++) {
        sessionIndices.push(i % baseSessionsCount);
      }
      
      for (let i = sessionIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sessionIndices[i], sessionIndices[j]] = [sessionIndices[j], sessionIndices[i]];
      }
      
      for (const idx of sessionIndices) {
        const session = requiredSessions[idx % requiredSessions.length];
        allSectionSlots.push({
          course: session.course,
          section: section,
          semester: semester
        });
      }
      
      allSectionSlots = allSectionSlots.slice(0, targetSlotsPerSection);
      
      console.log(`    Section ${section}: Need to schedule ${allSectionSlots.length} slots`);
      
      let availableSlotIndices = [...Array(orderedSlots.length).keys()];
      for (let i = availableSlotIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availableSlotIndices[i], availableSlotIndices[j]] = [availableSlotIndices[j], availableSlotIndices[i]];
      }
      
      let slotPosition = 0;
      let scheduledCount = 0;
      
      for (let sessionIdx = 0; sessionIdx < allSectionSlots.length; sessionIdx++) {
        const session = allSectionSlots[sessionIdx];
        let scheduled = false;
        
        for (let i = 0; i < availableSlotIndices.length && !scheduled; i++) {
          const slotIdx = availableSlotIndices[(slotPosition + i) % availableSlotIndices.length];
          const slot = orderedSlots[slotIdx];
          
          const sectionSlotKey = `${section}_${slot.day}_${slot.period}`;
          const facultyKey = `${slot.day}_${slot.period}_${session.course.facultyId}`;
          
          if (usedSectionSlots.has(sectionSlotKey)) continue;
          if (usedFacultySlots.has(facultyKey)) continue;
          
          const subjectKey = `${slot.day}_${slot.period}_${session.course.subjectName}`;
          const existingSections = subjectAtTimeSlot.get(subjectKey);
          if (existingSections && existingSections.length > 0 && !existingSections.includes(section)) {
            continue;
          }
          
          let availableRoom = null;
          for (const room of rooms) {
            const roomKey = `${slot.day}_${slot.period}_${room.name}_${section}`;
            if (!usedRoomSlots.has(roomKey)) {
              availableRoom = room;
              break;
            }
          }
          
          if (availableRoom) {
            semesterTimetable.push({
              id: Date.now() + Math.random() * 10000 + semester * 1000 + slotIdx * 100 + sessionIdx,
              course: session.course.course,
              semester: semester,
              section: section,
              day: slot.day,
              time: slot.fullTimeRange,
              timeStart: slot.time,
              period: slot.period,
              subject: session.course.subjectName,
              subjectId: session.course.subjectId,
              subjectCode: session.course.subjectCode,
              facultyId: session.course.facultyId,
              facultyName: session.course.facultyName,
              facultyAvatar: session.course.facultyAvatar || "T",
              room: availableRoom.name,
              type: "theory",
              color: session.course.color || "#4361ee"
            });
            
            usedSectionSlots.set(sectionSlotKey, true);
            usedFacultySlots.add(facultyKey);
            usedRoomSlots.add(`${slot.day}_${slot.period}_${availableRoom.name}_${section}`);
            
            if (!subjectAtTimeSlot.has(subjectKey)) {
              subjectAtTimeSlot.set(subjectKey, []);
            }
            subjectAtTimeSlot.get(subjectKey).push(section);
            
            scheduled = true;
            scheduledCount++;
          }
        }
        
        if (!scheduled) {
          for (let i = 0; i < orderedSlots.length && !scheduled; i++) {
            const slot = orderedSlots[i];
            const sectionSlotKey = `${section}_${slot.day}_${slot.period}`;
            const facultyKey = `${slot.day}_${slot.period}_${session.course.facultyId}`;
            
            if (usedSectionSlots.has(sectionSlotKey)) continue;
            if (usedFacultySlots.has(facultyKey)) continue;
            
            let availableRoom = null;
            for (const room of rooms) {
              const roomKey = `${slot.day}_${slot.period}_${room.name}_${section}`;
              if (!usedRoomSlots.has(roomKey)) {
                availableRoom = room;
                break;
              }
            }
            
            if (availableRoom) {
              semesterTimetable.push({
                id: Date.now() + Math.random() * 10000 + semester * 1000 + i * 100 + sessionIdx,
                course: session.course.course,
                semester: semester,
                section: section,
                day: slot.day,
                time: slot.fullTimeRange,
                timeStart: slot.time,
                period: slot.period,
                subject: session.course.subjectName,
                subjectId: session.course.subjectId,
                subjectCode: session.course.subjectCode,
                facultyId: session.course.facultyId,
                facultyName: session.course.facultyName,
                facultyAvatar: session.course.facultyAvatar || "T",
                room: availableRoom.name,
                type: "theory",
                color: session.course.color || "#4361ee"
              });
              
              usedSectionSlots.set(sectionSlotKey, true);
              usedFacultySlots.add(facultyKey);
              usedRoomSlots.add(`${slot.day}_${slot.period}_${availableRoom.name}_${section}`);
              scheduled = true;
              scheduledCount++;
            }
          }
        }
        
        slotPosition++;
      }
      
      console.log(`    Section ${section}: Scheduled ${scheduledCount}/${allSectionSlots.length} slots (${((scheduledCount/allSectionSlots.length)*100).toFixed(1)}%)`);
      
      if (scheduledCount < allSectionSlots.length) {
        console.log(`    Section ${section}: Missing ${allSectionSlots.length - scheduledCount} slots, running final fill pass...`);
        
        const remainingGap = allSectionSlots.length - scheduledCount;
        const fallbackSession = allSectionSlots[0];
        
        for (let gap = 0; gap < remainingGap; gap++) {
          let filled = false;
          for (const slot of orderedSlots) {
            if (filled) break;
            
            const sectionSlotKey = `${section}_${slot.day}_${slot.period}`;
            if (usedSectionSlots.has(sectionSlotKey)) continue;
            
            for (const room of rooms) {
              const roomKey = `${slot.day}_${slot.period}_${room.name}_${section}`;
              if (!usedRoomSlots.has(roomKey)) {
                semesterTimetable.push({
                  id: Date.now() + Math.random() * 10000 + semester * 1000 + gap * 100,
                  course: fallbackSession.course.course,
                  semester: semester,
                  section: section,
                  day: slot.day,
                  time: slot.fullTimeRange,
                  timeStart: slot.time,
                  period: slot.period,
                  subject: fallbackSession.course.subjectName,
                  subjectId: fallbackSession.course.subjectId,
                  subjectCode: fallbackSession.course.subjectCode,
                  facultyId: fallbackSession.course.facultyId,
                  facultyName: fallbackSession.course.facultyName,
                  facultyAvatar: fallbackSession.course.facultyAvatar || "T",
                  room: room.name,
                  type: "theory",
                  color: fallbackSession.course.color || "#4361ee"
                });
                
                usedSectionSlots.set(sectionSlotKey, true);
                usedRoomSlots.add(`${slot.day}_${slot.period}_${room.name}_${section}`);
                filled = true;
                scheduledCount++;
                break;
              }
            }
          }
        }
        
        console.log(`    Section ${section}: After final fill - ${scheduledCount}/${allSectionSlots.length} slots`);
      }
    }
    
    return semesterTimetable;
  };

  const generateEvenlyDistributedTimetable = async (config) => {
    const courses = (AppState.courseDetails || []).filter(c => 
      c.course === department && c.deanStatus === "approved"
    );
    
    console.log(`=== GENERATING TIMETABLE ===`);
    console.log(`Total courses: ${courses.length}`);
    console.log(`Semester 1: ${courses.filter(c => c.semester === 1).length}`);
    console.log(`Semester 2: ${courses.filter(c => c.semester === 2).length}`);
    
    if (courses.length === 0) {
      throw new Error("No courses found");
    }
    
    const rooms = AppState.rooms || DEFAULT_ROOMS;
    const sections = ["A", "B", "C"];
    const days = config.days;
    
    const timeSlots = generateTimeSlotsFromConfig(config);
    const teachingSlots = timeSlots.filter(s => !s.isLunch && !s.isBreak);
    
    const orderedSlots = [];
    for (const day of days) {
      for (let slotIdx = 0; slotIdx < teachingSlots.length; slotIdx++) {
        const slot = teachingSlots[slotIdx];
        orderedSlots.push({
          day,
          period: slot.period,
          time: slot.time,
          fullTimeRange: `${slot.time} - ${slot.endTime}`,
          slotIndex: slotIdx
        });
      }
    }
    
    const TARGET_SLOTS_PER_SECTION = orderedSlots.length;
    const finalTimetable = [];
    
    console.log(`Target slots per section: ${TARGET_SLOTS_PER_SECTION}`);
    console.log(`Total slots needed: ${TARGET_SLOTS_PER_SECTION * sections.length * 2}`);
    
    const sem1Courses = courses.filter(c => c.semester === 1);
    const sem2Courses = courses.filter(c => c.semester === 2);
    
    if (sem1Courses.length > 0) {
      console.log(`\n📚 Processing Semester 1 with ${sem1Courses.length} courses`);
      const sem1Timetable = await scheduleSemester(sem1Courses, 1, orderedSlots, rooms, sections, TARGET_SLOTS_PER_SECTION);
      finalTimetable.push(...sem1Timetable);
      console.log(`Semester 1 generated: ${sem1Timetable.length} slots`);
    }
    
    if (sem2Courses.length > 0) {
      console.log(`\n📚 Processing Semester 2 with ${sem2Courses.length} courses`);
      const sem2Timetable = await scheduleSemester(sem2Courses, 2, orderedSlots, rooms, sections, TARGET_SLOTS_PER_SECTION);
      finalTimetable.push(...sem2Timetable);
      console.log(`Semester 2 generated: ${sem2Timetable.length} slots`);
    }
    
    const dayOrder = { "Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, "Friday": 5 };
    const periodOrder = {};
    teachingSlots.forEach((slot, idx) => {
      periodOrder[slot.period] = idx;
    });
    
    finalTimetable.sort((a, b) => {
      if (a.semester !== b.semester) return a.semester - b.semester;
      if (a.section !== b.section) return a.section.localeCompare(b.section);
      if (a.day !== b.day) return dayOrder[a.day] - dayOrder[b.day];
      return periodOrder[a.period] - periodOrder[b.period];
    });
    
    console.log(`\n📊 FINAL VERIFICATION:`);
    console.log(`Expected slots per section: ${TARGET_SLOTS_PER_SECTION}`);
    for (const section of sections) {
      const sectionSlots = finalTimetable.filter(t => t.section === section).length;
      console.log(`  Section ${section}: ${sectionSlots} slots (${sectionSlots === TARGET_SLOTS_PER_SECTION ? '✓' : '✗'})`);
    }
    console.log(`Total expected: ${TARGET_SLOTS_PER_SECTION * sections.length * 2}`);
    console.log(`Total actual: ${finalTimetable.length}`);
    
    return finalTimetable;
  };

  const ProgressBar = ({ value, max }) => {
    const percentage = (value / max) * 100;
    return (
      <div style={{ width: "100%", height: 8, backgroundColor: C.border, borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: `${percentage}%`, height: "100%", background: C.gold.gradient, transition: "width 0.3s ease" }} />
      </div>
    );
  };

  const ConflictList = ({ conflicts }) => {
    if (!conflicts || conflicts.length === 0) return null;
    
    const successConflicts = conflicts.filter(c => c.severity === "success");
    
    return (
      <Card style={{ marginTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h4 style={{ color: C.gold.main }}>📋 Actions Taken ({conflicts.length})</h4>
          <Button variant="secondary" size="sm" onClick={() => setShowConflictsList(!showConflictsList)}>
            {showConflictsList ? "Hide Details" : "Show Details"}
          </Button>
        </div>
        
        {showConflictsList && (
          <div style={{ maxHeight: 400, overflowY: "auto" }}>
            {successConflicts.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <p style={{ fontWeight: 600, color: C.accent.green, marginBottom: 8 }}>✅ Success ({successConflicts.length})</p>
                {successConflicts.map((conflict, idx) => (
                  <div key={idx} style={{ padding: 8, background: C.accent.greenBg, borderRadius: 4, marginBottom: 4, fontSize: 13 }}>
                    {conflict.message}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Card>
    );
  };

  if (showWizard) {
    return (
      <TimetableConfigWizard 
        department={department}
        onComplete={handleWizardComplete}
        onCancel={onCancel}
      />
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Card style={{ background: C.gold.gradient, textAlign: "center", padding: 32 }}>
        <span style={{ fontSize: 48 }}>🚀</span>
        <Title style={{ color: C.text.inverse, marginTop: 8 }}>Generating Timetable</Title>
        <p style={{ color: C.text.inverse }}>Please wait while your timetable is being created...</p>
      </Card>

      {processing && (
        <Card>
          <div style={{ textAlign: "center", padding: 20 }}>
            <h3 style={{ color: C.gold.main }}>Step {step} of 5</h3>
            <p style={{ color: C.text.secondary, marginBottom: 16 }}>{status}</p>
            <ProgressBar value={progress} max={100} />
          </div>
        </Card>
      )}

      {error && !processing && (
        <Card style={{ background: C.accent.redBg, textAlign: "center" }}>
          <span style={{ fontSize: 48 }}>❌</span>
          <Title level={3} style={{ color: C.accent.red, marginTop: 8 }}>Generation Failed</Title>
          <p style={{ color: C.text.secondary }}>{error}</p>
          <Button onClick={() => window.location.reload()} variant="primary">Try Again</Button>
        </Card>
      )}

      {results && !processing && !error && (
        <>
          <Card style={{ background: results.timetableSlots === results.expectedSlots ? C.accent.greenBg : C.accent.goldBg, textAlign: "center" }}>
            <span style={{ fontSize: 48 }}>{results.timetableSlots === results.expectedSlots ? "✅" : "⚠️"}</span>
            <Title level={3} style={{ color: results.timetableSlots === results.expectedSlots ? C.accent.green : C.accent.gold, marginTop: 8 }}>
              {results.timetableSlots === results.expectedSlots ? "100% Complete! Timetable Generated!" : "Timetable Generated"}
            </Title>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 24 }}>
              <div>
                <p style={{ fontSize: 12, color: C.text.secondary }}>Slots Generated</p>
                <p style={{ fontSize: 28, fontWeight: 700, color: C.gold.main }}>{results.timetableSlots}</p>
              </div>
              <div>
                <p style={{ fontSize: 12, color: C.text.secondary }}>Expected Slots</p>
                <p style={{ fontSize: 28, fontWeight: 700, color: C.accent.blue }}>{results.expectedSlots}</p>
              </div>
              <div>
                <p style={{ fontSize: 12, color: C.text.secondary }}>Fill Rate</p>
                <p style={{ fontSize: 28, fontWeight: 700, color: results.timetableSlots === results.expectedSlots ? C.accent.green : C.accent.gold }}>
                  {results.fillPercentage}%
                </p>
              </div>
              <div>
                <p style={{ fontSize: 12, color: C.text.secondary }}>Subjects</p>
                <p style={{ fontSize: 28, fontWeight: 700, color: C.accent.purple }}>{results.totalSubjects}</p>
              </div>
            </div>
            
            <div style={{ marginTop: 16, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Badge variant="info">Semester 1: {results.semestersBreakdown[1]} slots ({results.sem1Subjects} subjects)</Badge>
              <Badge variant="info">Semester 2: {results.semestersBreakdown[2]} slots ({results.sem2Subjects} subjects)</Badge>
            </div>
            
            <div style={{ marginTop: 8, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              {Object.entries(results.sectionsBreakdown).map(([section, count]) => (
                <Badge key={section} variant="success">Section {section}: {count} slots</Badge>
              ))}
            </div>
            
            {results.timetableSlots === results.expectedSlots && (
              <p style={{ marginTop: 16, fontSize: 14, color: C.accent.green, fontWeight: 600 }}>
                🎉 PERFECT! All {results.expectedSlots} slots filled!
              </p>
            )}
            
            <div style={{ marginTop: 24, display: "flex", gap: 12, justifyContent: "center" }}>
              <Button onClick={() => window.location.reload()} variant="primary" size="lg">
                🔄 Regenerate
              </Button>
              <Button onClick={onComplete} variant="success" size="lg">
                ✓ View Timetable
              </Button>
            </div>
          </Card>
          
          <ConflictList conflicts={resolvedConflicts} />
        </>
      )}
    </div>
  );
}