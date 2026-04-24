// // // src/utils/timetableUtils.js
// // export const generateTimeSlots = (config) => {
// //   const slots = [];
// //   const start = new Date(`1970-01-01T${config.startTime}:00`);
// //   const end = new Date(`1970-01-01T${config.endTime}:00`);
  
// //   let current = new Date(start);
// //   let periodNumber = 1;
  
// //   // Parse lunch break times
// //   const lunchStart = new Date(`1970-01-01T${config.lunchBreak.start}:00`);
// //   const lunchEnd = new Date(lunchStart.getTime() + config.lunchBreak.duration * 60000);
  
// //   console.log("Generating time slots with config:", config);
// //   console.log("Lunch break period:", lunchStart, "to", lunchEnd);
  
// //   while (current < end) {
// //     const timeStr = current.toTimeString().substring(0, 5);
// //     const endTime = new Date(current.getTime() + config.classDuration * 60000);
// //     const endTimeStr = endTime.toTimeString().substring(0, 5);
    
// //     // Check if current time overlaps with lunch break
// //     if (current >= lunchStart && current < lunchEnd) {
// //       // Add lunch break slot
// //       slots.push({
// //         time: timeStr,
// //         endTime: endTimeStr,
// //         period: "LUNCH",
// //         isLunch: true,
// //         label: "LUNCH BREAK"
// //       });
// //       // Skip to end of lunch break
// //       current = new Date(lunchEnd);
// //       console.log("Added lunch break slot at", timeStr);
// //     } else {
// //       // Add regular class slot
// //       slots.push({
// //         time: timeStr,
// //         endTime: endTimeStr,
// //         period: `P${periodNumber}`,
// //         isLunch: false,
// //         label: `${timeStr} - ${endTimeStr}`
// //       });
// //       periodNumber++;
// //       // Move to next slot (class duration + break)
// //       current = new Date(current.getTime() + config.classDuration * 60000 + config.breakDuration * 60000);
// //     }
// //   }
  
// //   console.log("Total time slots generated:", slots.length);
// //   console.log("Lunch slots:", slots.filter(s => s.isLunch).length);
// //   return slots;
// // };

// // export const calculateSyllabusProgress = (completedModules, totalModules) => {
// //   return totalModules > 0 ? (completedModules / totalModules) * 100 : 0;
// // };

// // export const generateTimetable = (approvedCourses, facultyList, rooms, config) => {
// //   console.log("=== INSIDE timetableUtils.generateTimetable ===");
// //   console.log("Approved courses:", approvedCourses.length);
// //   console.log("Faculty list:", facultyList.length);
// //   console.log("Rooms:", rooms.length);
  
// //   if (!approvedCourses || approvedCourses.length === 0) {
// //     console.warn("No approved courses provided");
// //     return [];
// //   }
  
// //   if (!facultyList || facultyList.length === 0) {
// //     console.warn("No faculty list provided");
// //     return [];
// //   }
  
// //   if (!rooms || rooms.length === 0) {
// //     console.warn("No rooms provided");
// //     return [];
// //   }
  
// //   const timetable = [];
// //   let id = 1;
// //   const currentTimeSlots = generateTimeSlots(config);
// //   // Only use non-lunch slots for scheduling classes
// //   const validTimeSlots = currentTimeSlots.filter(s => !s.isLunch).map(s => s.time);
  
// //   console.log("Valid time slots for classes:", validTimeSlots);
// //   console.log("Lunch slots excluded from class scheduling:", currentTimeSlots.filter(s => s.isLunch).length);
  
// //   const facultyScheduleMap = {};
// //   const roomScheduleMap = {};
  
// //   // For each approved course
// //   approvedCourses.forEach(courseDetail => {
// //     console.log("Processing course:", courseDetail.subjectName);
    
// //     const subject = window.AppState?.subjects?.find(s => s.id === courseDetail.subjectId);
// //     if (!subject) {
// //       console.warn(`Subject not found for ID: ${courseDetail.subjectId}`);
// //       return;
// //     }
    
// //     const faculty = facultyList.find(f => f.id === courseDetail.facultyId);
// //     if (!faculty) {
// //       console.warn(`Faculty not found for ID: ${courseDetail.facultyId}`);
// //       return;
// //     }
    
// //     console.log(`Processing ${subject.name} for ${faculty.name}`);
    
// //     // Allocate theory classes
// //     for (let i = 0; i < subject.theoryClassesPerWeek; i++) {
// //       let allocated = false;
// //       let attempts = 0;
      
// //       while (!allocated && attempts < 500) {
// //         const day = config.days[Math.floor(Math.random() * config.days.length)];
// //         const timeSlot = Math.floor(Math.random() * validTimeSlots.length);
// //         const time = validTimeSlots[timeSlot];
        
// //         const facultyKey = `${day}_${time}_${faculty.id}`;
// //         if (facultyScheduleMap[facultyKey]) {
// //           attempts++;
// //           continue;
// //         }
        
// //         let availableRoom = null;
// //         const theoryRooms = rooms.filter(r => r.type === "Theory");
        
// //         for (const room of theoryRooms) {
// //           const roomKey = `${day}_${time}_${room.name}`;
// //           if (!roomScheduleMap[roomKey]) {
// //             availableRoom = room;
// //             break;
// //           }
// //         }
        
// //         if (!availableRoom) {
// //           attempts++;
// //           continue;
// //         }
        
// //         timetable.push({
// //           id: id++,
// //           course: courseDetail.course,
// //           semester: courseDetail.semester,
// //           section: "A",
// //           day,
// //           time,
// //           subject: subject.name,
// //           subjectId: subject.id,
// //           subjectCode: subject.code,
// //           facultyId: faculty.id,
// //           facultyName: faculty.name,
// //           facultyAvatar: faculty.avatar,
// //           room: availableRoom.name,
// //           type: "theory",
// //           color: faculty.color
// //         });
        
// //         facultyScheduleMap[facultyKey] = true;
// //         roomScheduleMap[`${day}_${time}_${availableRoom.name}`] = true;
// //         allocated = true;
// //       }
// //     }
    
// //     // Allocate lab periods (consecutive periods)
// //     if (subject.labPeriodsPerWeek > 0) {
// //       for (let i = 0; i < subject.labPeriodsPerWeek; i += 2) {
// //         let allocated = false;
// //         let attempts = 0;
        
// //         while (!allocated && attempts < 500) {
// //           const day = config.days[Math.floor(Math.random() * config.days.length)];
// //           const timeSlot = Math.floor(Math.random() * (validTimeSlots.length - 1));
// //           const time1 = validTimeSlots[timeSlot];
// //           const time2 = validTimeSlots[timeSlot + 1];
          
// //           const facultyKey1 = `${day}_${time1}_${faculty.id}`;
// //           const facultyKey2 = `${day}_${time2}_${faculty.id}`;
          
// //           if (facultyScheduleMap[facultyKey1] || facultyScheduleMap[facultyKey2]) {
// //             attempts++;
// //             continue;
// //           }
          
// //           let availableRoom = null;
// //           const labRooms = rooms.filter(r => r.type === "Lab");
          
// //           for (const room of labRooms) {
// //             const roomKey1 = `${day}_${time1}_${room.name}`;
// //             const roomKey2 = `${day}_${time2}_${room.name}`;
            
// //             if (!roomScheduleMap[roomKey1] && !roomScheduleMap[roomKey2]) {
// //               availableRoom = room;
// //               break;
// //             }
// //           }
          
// //           if (!availableRoom) {
// //             attempts++;
// //             continue;
// //           }
          
// //           timetable.push({
// //             id: id++,
// //             course: courseDetail.course,
// //             semester: courseDetail.semester,
// //             section: "A",
// //             day,
// //             time: time1,
// //             subject: `${subject.name} Lab`,
// //             subjectId: subject.id,
// //             subjectCode: subject.code,
// //             facultyId: faculty.id,
// //             facultyName: faculty.name,
// //             facultyAvatar: faculty.avatar,
// //             room: availableRoom.name,
// //             type: "lab",
// //             color: faculty.color
// //           });
          
// //           timetable.push({
// //             id: id++,
// //             course: courseDetail.course,
// //             semester: courseDetail.semester,
// //             section: "A",
// //             day,
// //             time: time2,
// //             subject: `${subject.name} Lab`,
// //             subjectId: subject.id,
// //             subjectCode: subject.code,
// //             facultyId: faculty.id,
// //             facultyName: faculty.name,
// //             facultyAvatar: faculty.avatar,
// //             room: availableRoom.name,
// //             type: "lab",
// //             color: faculty.color
// //           });
          
// //           facultyScheduleMap[facultyKey1] = true;
// //           facultyScheduleMap[facultyKey2] = true;
// //           roomScheduleMap[`${day}_${time1}_${availableRoom.name}`] = true;
// //           roomScheduleMap[`${day}_${time2}_${availableRoom.name}`] = true;
// //           allocated = true;
// //         }
// //       }
// //     }
// //   });
  
// //   console.log(`Total timetable slots generated: ${timetable.length}`);
// //   return timetable;
// // };

// // // src/utils/timetableUtils.js

// // export const generateTimeSlots = (config) => {
// //   const slots = [];
// //   const start = new Date(`1970-01-01T${config.startTime}:00`);
// //   const end = new Date(`1970-01-01T${config.endTime}:00`);
  
// //   let current = new Date(start);
// //   let periodNumber = 1;
// //   let classesBeforeBreak = 0;
  
// //   // Parse lunch break times
// //   const lunchStart = new Date(`1970-01-01T${config.lunchBreak.start}:00`);
// //   const lunchEnd = new Date(lunchStart.getTime() + config.lunchBreak.duration * 60000);
  
// //   console.log("Generating time slots with config:", config);
// //   console.log("Break after every 2 classes of", config.breakDuration, "minutes");
// //   console.log("Lunch break period:", lunchStart, "to", lunchEnd);
  
// //   while (current < end) {
// //     const timeStr = current.toTimeString().substring(0, 5);
// //     const endTime = new Date(current.getTime() + config.classDuration * 60000);
// //     const endTimeStr = endTime.toTimeString().substring(0, 5);
    
// //     // Check if current time overlaps with lunch break
// //     if (current >= lunchStart && current < lunchEnd) {
// //       // Add lunch break slot
// //       slots.push({
// //         time: timeStr,
// //         endTime: endTimeStr,
// //         period: "LUNCH",
// //         isLunch: true,
// //         isBreak: false,
// //         label: "LUNCH BREAK"
// //       });
// //       // Skip to end of lunch break
// //       current = new Date(lunchEnd);
// //       classesBeforeBreak = 0;
// //       console.log("Added lunch break slot at", timeStr);
// //       continue;
// //     }
    
// //     // Add regular class slot
// //     slots.push({
// //       time: timeStr,
// //       endTime: endTimeStr,
// //       period: `P${periodNumber}`,
// //       isLunch: false,
// //       isBreak: false,
// //       label: `${timeStr} - ${endTimeStr}`
// //     });
// //     periodNumber++;
// //     classesBeforeBreak++;
    
// //     // Move to next slot after class
// //     current = new Date(current.getTime() + config.classDuration * 60000);
    
// //     // Add break after every 2 classes (if break duration > 0)
// //     if (classesBeforeBreak === 2 && config.breakDuration > 0) {
// //       // Check if break would overlap with lunch
// //       const breakStart = new Date(current);
// //       const breakEnd = new Date(current.getTime() + config.breakDuration * 60000);
      
// //       // Only add break if it doesn't go into lunch time
// //       if (breakStart < lunchStart || breakEnd <= lunchStart) {
// //         slots.push({
// //           time: breakStart.toTimeString().substring(0, 5),
// //           endTime: breakEnd.toTimeString().substring(0, 5),
// //           period: "BREAK",
// //           isLunch: false,
// //           isBreak: true,
// //           label: "SHORT BREAK"
// //         });
        
// //         current = breakEnd;
// //         classesBeforeBreak = 0;
// //         console.log(`Added short break at ${breakStart.toTimeString().substring(0, 5)} for ${config.breakDuration} minutes`);
// //       } else {
// //         // If break would overlap with lunch, just reset counter
// //         classesBeforeBreak = 0;
// //       }
// //     }
// //   }
  
// //   console.log("Total time slots generated:", slots.length);
// //   console.log("Class slots:", slots.filter(s => !s.isLunch && !s.isBreak).length);
// //   console.log("Break slots:", slots.filter(s => s.isBreak).length);
// //   console.log("Lunch slots:", slots.filter(s => s.isLunch).length);
  
// //   return slots;
// // };

// // export const calculateSyllabusProgress = (completedModules, totalModules) => {
// //   return totalModules > 0 ? (completedModules / totalModules) * 100 : 0;
// // };

// // export const generateTimetable = (approvedCourses, facultyList, rooms, config) => {
// //   console.log("=== INSIDE timetableUtils.generateTimetable ===");
// //   console.log("Approved courses:", approvedCourses.length);
// //   console.log("Faculty list:", facultyList.length);
// //   console.log("Rooms:", rooms.length);
  
// //   if (!approvedCourses || approvedCourses.length === 0) {
// //     console.warn("No approved courses provided");
// //     return [];
// //   }
  
// //   if (!facultyList || facultyList.length === 0) {
// //     console.warn("No faculty list provided");
// //     return [];
// //   }
  
// //   if (!rooms || rooms.length === 0) {
// //     console.warn("No rooms provided");
// //     return [];
// //   }
  
// //   const timetable = [];
// //   let id = 1;
// //   const currentTimeSlots = generateTimeSlots(config);
// //   // Only use non-lunch and non-break slots for scheduling classes
// //   const validTimeSlots = currentTimeSlots.filter(s => !s.isLunch && !s.isBreak).map(s => s.time);
  
// //   console.log("Valid time slots for classes:", validTimeSlots);
// //   console.log("Lunch slots excluded:", currentTimeSlots.filter(s => s.isLunch).length);
// //   console.log("Break slots excluded:", currentTimeSlots.filter(s => s.isBreak).length);
  
// //   const facultyScheduleMap = {};
// //   const roomScheduleMap = {};
  
// //   // For each approved course
// //   approvedCourses.forEach(courseDetail => {
// //     console.log("Processing course:", courseDetail.subjectName);
    
// //     const subject = window.AppState?.subjects?.find(s => s.id === courseDetail.subjectId);
// //     if (!subject) {
// //       console.warn(`Subject not found for ID: ${courseDetail.subjectId}`);
// //       return;
// //     }
    
// //     const faculty = facultyList.find(f => f.id === courseDetail.facultyId);
// //     if (!faculty) {
// //       console.warn(`Faculty not found for ID: ${courseDetail.facultyId}`);
// //       return;
// //     }
    
// //     console.log(`Processing ${subject.name} for ${faculty.name}`);
    
// //     // Allocate theory classes
// //     for (let i = 0; i < subject.theoryClassesPerWeek; i++) {
// //       let allocated = false;
// //       let attempts = 0;
      
// //       while (!allocated && attempts < 500) {
// //         const day = config.days[Math.floor(Math.random() * config.days.length)];
// //         const timeSlot = Math.floor(Math.random() * validTimeSlots.length);
// //         const time = validTimeSlots[timeSlot];
        
// //         const facultyKey = `${day}_${time}_${faculty.id}`;
// //         if (facultyScheduleMap[facultyKey]) {
// //           attempts++;
// //           continue;
// //         }
        
// //         let availableRoom = null;
// //         const theoryRooms = rooms.filter(r => r.type === "Theory");
        
// //         for (const room of theoryRooms) {
// //           const roomKey = `${day}_${time}_${room.name}`;
// //           if (!roomScheduleMap[roomKey]) {
// //             availableRoom = room;
// //             break;
// //           }
// //         }
        
// //         if (!availableRoom) {
// //           attempts++;
// //           continue;
// //         }
        
// //         timetable.push({
// //           id: id++,
// //           course: courseDetail.course,
// //           semester: courseDetail.semester,
// //           section: "A",
// //           day,
// //           time,
// //           subject: subject.name,
// //           subjectId: subject.id,
// //           subjectCode: subject.code,
// //           facultyId: faculty.id,
// //           facultyName: faculty.name,
// //           facultyAvatar: faculty.avatar,
// //           room: availableRoom.name,
// //           type: "theory",
// //           color: faculty.color
// //         });
        
// //         facultyScheduleMap[facultyKey] = true;
// //         roomScheduleMap[`${day}_${time}_${availableRoom.name}`] = true;
// //         allocated = true;
// //       }
      
// //       if (!allocated) {
// //         console.warn(`Could not allocate theory class for ${subject.name} after 500 attempts`);
// //       }
// //     }
    
// //     // Allocate lab periods (consecutive periods)
// //     if (subject.labPeriodsPerWeek > 0) {
// //       for (let i = 0; i < subject.labPeriodsPerWeek; i += 2) {
// //         let allocated = false;
// //         let attempts = 0;
        
// //         while (!allocated && attempts < 500) {
// //           const day = config.days[Math.floor(Math.random() * config.days.length)];
// //           const timeSlot = Math.floor(Math.random() * (validTimeSlots.length - 1));
// //           const time1 = validTimeSlots[timeSlot];
// //           const time2 = validTimeSlots[timeSlot + 1];
          
// //           const facultyKey1 = `${day}_${time1}_${faculty.id}`;
// //           const facultyKey2 = `${day}_${time2}_${faculty.id}`;
          
// //           if (facultyScheduleMap[facultyKey1] || facultyScheduleMap[facultyKey2]) {
// //             attempts++;
// //             continue;
// //           }
          
// //           let availableRoom = null;
// //           const labRooms = rooms.filter(r => r.type === "Lab");
          
// //           for (const room of labRooms) {
// //             const roomKey1 = `${day}_${time1}_${room.name}`;
// //             const roomKey2 = `${day}_${time2}_${room.name}`;
            
// //             if (!roomScheduleMap[roomKey1] && !roomScheduleMap[roomKey2]) {
// //               availableRoom = room;
// //               break;
// //             }
// //           }
          
// //           if (!availableRoom) {
// //             attempts++;
// //             continue;
// //           }
          
// //           timetable.push({
// //             id: id++,
// //             course: courseDetail.course,
// //             semester: courseDetail.semester,
// //             section: "A",
// //             day,
// //             time: time1,
// //             subject: `${subject.name} Lab`,
// //             subjectId: subject.id,
// //             subjectCode: subject.code,
// //             facultyId: faculty.id,
// //             facultyName: faculty.name,
// //             facultyAvatar: faculty.avatar,
// //             room: availableRoom.name,
// //             type: "lab",
// //             color: faculty.color
// //           });
          
// //           timetable.push({
// //             id: id++,
// //             course: courseDetail.course,
// //             semester: courseDetail.semester,
// //             section: "A",
// //             day,
// //             time: time2,
// //             subject: `${subject.name} Lab`,
// //             subjectId: subject.id,
// //             subjectCode: subject.code,
// //             facultyId: faculty.id,
// //             facultyName: faculty.name,
// //             facultyAvatar: faculty.avatar,
// //             room: availableRoom.name,
// //             type: "lab",
// //             color: faculty.color
// //           });
          
// //           facultyScheduleMap[facultyKey1] = true;
// //           facultyScheduleMap[facultyKey2] = true;
// //           roomScheduleMap[`${day}_${time1}_${availableRoom.name}`] = true;
// //           roomScheduleMap[`${day}_${time2}_${availableRoom.name}`] = true;
// //           allocated = true;
// //         }
        
// //         if (!allocated) {
// //           console.warn(`Could not allocate lab for ${subject.name} after 500 attempts`);
// //         }
// //       }
// //     }
// //   });
  
// //   console.log(`Total timetable slots generated: ${timetable.length}`);
// //   return timetable;
// // };

// // // Helper function to get timetable statistics
// // export const getTimetableStats = (timetable) => {
// //   const stats = {
// //     totalSlots: timetable.length,
// //     theorySlots: timetable.filter(s => s.type === "theory").length,
// //     labSlots: timetable.filter(s => s.type === "lab").length,
// //     byDay: {},
// //     byFaculty: {}
// //   };
  
// //   timetable.forEach(slot => {
// //     // Count by day
// //     if (!stats.byDay[slot.day]) {
// //       stats.byDay[slot.day] = 0;
// //     }
// //     stats.byDay[slot.day]++;
    
// //     // Count by faculty
// //     if (!stats.byFaculty[slot.facultyName]) {
// //       stats.byFaculty[slot.facultyName] = 0;
// //     }
// //     stats.byFaculty[slot.facultyName]++;
// //   });
  
// //   return stats;
// // };

// // // Helper function to check for conflicts in timetable
// // export const findConflicts = (timetable) => {
// //   const conflicts = [];
  
// //   for (let i = 0; i < timetable.length; i++) {
// //     for (let j = i + 1; j < timetable.length; j++) {
// //       const a = timetable[i];
// //       const b = timetable[j];
      
// //       if (a.day === b.day && a.time === b.time) {
// //         if (a.facultyId === b.facultyId) {
// //           conflicts.push({
// //             type: "faculty",
// //             message: `${a.facultyName} has conflict: ${a.subject} and ${b.subject} at ${a.day} ${a.time}`,
// //             slots: [a, b]
// //           });
// //         }
        
// //         if (a.room === b.room) {
// //           conflicts.push({
// //             type: "room",
// //             message: `Room ${a.room} has conflict: ${a.subject} and ${b.subject} at ${a.day} ${a.time}`,
// //             slots: [a, b]
// //           });
// //         }
// //       }
// //     }
// //   }
  
// //   return conflicts;
// // };

// // src/utils/timetableUtils.js

// export const generateTimeSlots = (config) => {
//   const slots = [];
//   const start = new Date(`1970-01-01T${config.startTime}:00`);
//   const end = new Date(`1970-01-01T${config.endTime}:00`);
  
//   let current = new Date(start);
//   let periodNumber = 1;
//   let classesBeforeBreak = 0;
//   let lunchAdded = false;
  
//   // Parse lunch break times
//   const lunchStart = new Date(`1970-01-01T${config.lunchBreak.start}:00`);
//   const lunchEnd = new Date(lunchStart.getTime() + config.lunchBreak.duration * 60000);
  
//   console.log("Generating time slots with config:", config);
//   console.log("Pattern: Class -> Class -> Break -> Class -> Class -> Lunch -> Class -> Class -> Break -> Class -> Class");
//   console.log("Break after every 2 classes of", config.breakDuration, "minutes");
//   console.log("Lunch break period:", lunchStart, "to", lunchEnd);
  
//   while (current < end) {
//     // Check if it's time for lunch (after 2 classes before lunch)
//     if (!lunchAdded && current >= lunchStart && current < lunchEnd) {
//       // Add lunch break slot
//       slots.push({
//         time: current.toTimeString().substring(0, 5),
//         endTime: lunchEnd.toTimeString().substring(0, 5),
//         period: "LUNCH",
//         isLunch: true,
//         isBreak: false,
//         label: "LUNCH BREAK"
//       });
//       current = new Date(lunchEnd);
//       lunchAdded = true;
//       classesBeforeBreak = 0;
//       console.log("Added lunch break");
//       continue;
//     }
    
//     // Add regular class slot
//     const classEnd = new Date(current.getTime() + config.classDuration * 60000);
    
//     // Check if class would exceed end time
//     if (classEnd > end) {
//       console.log("Reached end time, stopping generation");
//       break;
//     }
    
//     slots.push({
//       time: current.toTimeString().substring(0, 5),
//       endTime: classEnd.toTimeString().substring(0, 5),
//       period: `P${periodNumber}`,
//       isLunch: false,
//       isBreak: false,
//       label: `${current.toTimeString().substring(0, 5)} - ${classEnd.toTimeString().substring(0, 5)}`
//     });
//     periodNumber++;
//     classesBeforeBreak++;
    
//     // Move to next slot after class
//     current = new Date(classEnd);
    
//     // Add break after every 2 classes (but not before lunch if we haven't had lunch yet)
//     if (classesBeforeBreak === 2 && config.breakDuration > 0) {
//       // Check if we should add break or lunch is coming
//       const breakStart = new Date(current);
//       const breakEnd = new Date(current.getTime() + config.breakDuration * 60000);
      
//       // Only add break if it doesn't go into lunch time and if we're not about to hit lunch
//       if (!lunchAdded && breakEnd <= lunchStart) {
//         slots.push({
//           time: breakStart.toTimeString().substring(0, 5),
//           endTime: breakEnd.toTimeString().substring(0, 5),
//           period: "BREAK",
//           isLunch: false,
//           isBreak: true,
//           label: "SHORT BREAK"
//         });
//         current = breakEnd;
//         classesBeforeBreak = 0;
//         console.log(`Added short break at ${breakStart.toTimeString().substring(0, 5)}`);
//       } else if (lunchAdded && breakEnd <= end) {
//         // After lunch, add breaks normally
//         slots.push({
//           time: breakStart.toTimeString().substring(0, 5),
//           endTime: breakEnd.toTimeString().substring(0, 5),
//           period: "BREAK",
//           isLunch: false,
//           isBreak: true,
//           label: "SHORT BREAK"
//         });
//         current = breakEnd;
//         classesBeforeBreak = 0;
//         console.log(`Added short break at ${breakStart.toTimeString().substring(0, 5)} (after lunch)`);
//       } else {
//         // Reset counter if break would overlap with lunch or exceed end time
//         classesBeforeBreak = 0;
//       }
//     }
//   }
  
//   console.log("Total time slots generated:", slots.length);
//   console.log("Class slots:", slots.filter(s => !s.isLunch && !s.isBreak).length);
//   console.log("Break slots:", slots.filter(s => s.isBreak).length);
//   console.log("Lunch slots:", slots.filter(s => s.isLunch).length);
  
//   // Log the pattern for verification
//   const pattern = slots.map(s => {
//     if (s.isLunch) return "LUNCH";
//     if (s.isBreak) return "BREAK";
//     return "CLASS";
//   }).join(" → ");
//   console.log("Schedule Pattern:", pattern);
  
//   return slots;
// };

// export const calculateSyllabusProgress = (completedModules, totalModules) => {
//   return totalModules > 0 ? (completedModules / totalModules) * 100 : 0;
// };

// export const generateTimetable = (approvedCourses, facultyList, rooms, config) => {
//   console.log("=== INSIDE timetableUtils.generateTimetable ===");
//   console.log("Approved courses:", approvedCourses.length);
//   console.log("Faculty list:", facultyList.length);
//   console.log("Rooms:", rooms.length);
  
//   if (!approvedCourses || approvedCourses.length === 0) {
//     console.warn("No approved courses provided");
//     return [];
//   }
  
//   if (!facultyList || facultyList.length === 0) {
//     console.warn("No faculty list provided");
//     return [];
//   }
  
//   if (!rooms || rooms.length === 0) {
//     console.warn("No rooms provided");
//     return [];
//   }
  
//   const timetable = [];
//   let id = 1;
//   const currentTimeSlots = generateTimeSlots(config);
//   // Only use non-lunch and non-break slots for scheduling classes
//   const validTimeSlots = currentTimeSlots.filter(s => !s.isLunch && !s.isBreak).map(s => s.time);
  
//   console.log("Valid time slots for classes:", validTimeSlots);
//   console.log("Lunch slots excluded:", currentTimeSlots.filter(s => s.isLunch).length);
//   console.log("Break slots excluded:", currentTimeSlots.filter(s => s.isBreak).length);
  
//   const facultyScheduleMap = {};
//   const roomScheduleMap = {};
  
//   // For each approved course
//   approvedCourses.forEach(courseDetail => {
//     console.log("Processing course:", courseDetail.subjectName);
    
//     const subject = window.AppState?.subjects?.find(s => s.id === courseDetail.subjectId);
//     if (!subject) {
//       console.warn(`Subject not found for ID: ${courseDetail.subjectId}`);
//       return;
//     }
    
//     const faculty = facultyList.find(f => f.id === courseDetail.facultyId);
//     if (!faculty) {
//       console.warn(`Faculty not found for ID: ${courseDetail.facultyId}`);
//       return;
//     }
    
//     console.log(`Processing ${subject.name} for ${faculty.name}`);
    
//     // Allocate theory classes
//     for (let i = 0; i < subject.theoryClassesPerWeek; i++) {
//       let allocated = false;
//       let attempts = 0;
      
//       while (!allocated && attempts < 500) {
//         const day = config.days[Math.floor(Math.random() * config.days.length)];
//         const timeSlot = Math.floor(Math.random() * validTimeSlots.length);
//         const time = validTimeSlots[timeSlot];
        
//         const facultyKey = `${day}_${time}_${faculty.id}`;
//         if (facultyScheduleMap[facultyKey]) {
//           attempts++;
//           continue;
//         }
        
//         let availableRoom = null;
//         const theoryRooms = rooms.filter(r => r.type === "Theory");
        
//         for (const room of theoryRooms) {
//           const roomKey = `${day}_${time}_${room.name}`;
//           if (!roomScheduleMap[roomKey]) {
//             availableRoom = room;
//             break;
//           }
//         }
        
//         if (!availableRoom) {
//           attempts++;
//           continue;
//         }
        
//         timetable.push({
//           id: id++,
//           course: courseDetail.course,
//           semester: courseDetail.semester,
//           section: "A",
//           day,
//           time,
//           subject: subject.name,
//           subjectId: subject.id,
//           subjectCode: subject.code,
//           facultyId: faculty.id,
//           facultyName: faculty.name,
//           facultyAvatar: faculty.avatar,
//           room: availableRoom.name,
//           type: "theory",
//           color: faculty.color
//         });
        
//         facultyScheduleMap[facultyKey] = true;
//         roomScheduleMap[`${day}_${time}_${availableRoom.name}`] = true;
//         allocated = true;
//       }
      
//       if (!allocated) {
//         console.warn(`Could not allocate theory class for ${subject.name} after 500 attempts`);
//       }
//     }
    
//     // Allocate lab periods (consecutive periods)
//     if (subject.labPeriodsPerWeek > 0) {
//       for (let i = 0; i < subject.labPeriodsPerWeek; i += 2) {
//         let allocated = false;
//         let attempts = 0;
        
//         while (!allocated && attempts < 500) {
//           const day = config.days[Math.floor(Math.random() * config.days.length)];
//           const timeSlot = Math.floor(Math.random() * (validTimeSlots.length - 1));
//           const time1 = validTimeSlots[timeSlot];
//           const time2 = validTimeSlots[timeSlot + 1];
          
//           const facultyKey1 = `${day}_${time1}_${faculty.id}`;
//           const facultyKey2 = `${day}_${time2}_${faculty.id}`;
          
//           if (facultyScheduleMap[facultyKey1] || facultyScheduleMap[facultyKey2]) {
//             attempts++;
//             continue;
//           }
          
//           let availableRoom = null;
//           const labRooms = rooms.filter(r => r.type === "Lab");
          
//           for (const room of labRooms) {
//             const roomKey1 = `${day}_${time1}_${room.name}`;
//             const roomKey2 = `${day}_${time2}_${room.name}`;
            
//             if (!roomScheduleMap[roomKey1] && !roomScheduleMap[roomKey2]) {
//               availableRoom = room;
//               break;
//             }
//           }
          
//           if (!availableRoom) {
//             attempts++;
//             continue;
//           }
          
//           timetable.push({
//             id: id++,
//             course: courseDetail.course,
//             semester: courseDetail.semester,
//             section: "A",
//             day,
//             time: time1,
//             subject: `${subject.name} Lab`,
//             subjectId: subject.id,
//             subjectCode: subject.code,
//             facultyId: faculty.id,
//             facultyName: faculty.name,
//             facultyAvatar: faculty.avatar,
//             room: availableRoom.name,
//             type: "lab",
//             color: faculty.color
//           });
          
//           timetable.push({
//             id: id++,
//             course: courseDetail.course,
//             semester: courseDetail.semester,
//             section: "A",
//             day,
//             time: time2,
//             subject: `${subject.name} Lab`,
//             subjectId: subject.id,
//             subjectCode: subject.code,
//             facultyId: faculty.id,
//             facultyName: faculty.name,
//             facultyAvatar: faculty.avatar,
//             room: availableRoom.name,
//             type: "lab",
//             color: faculty.color
//           });
          
//           facultyScheduleMap[facultyKey1] = true;
//           facultyScheduleMap[facultyKey2] = true;
//           roomScheduleMap[`${day}_${time1}_${availableRoom.name}`] = true;
//           roomScheduleMap[`${day}_${time2}_${availableRoom.name}`] = true;
//           allocated = true;
//         }
        
//         if (!allocated) {
//           console.warn(`Could not allocate lab for ${subject.name} after 500 attempts`);
//         }
//       }
//     }
//   });
  
//   console.log(`Total timetable slots generated: ${timetable.length}`);
//   return timetable;
// };

// // Helper function to get timetable statistics
// export const getTimetableStats = (timetable) => {
//   const stats = {
//     totalSlots: timetable.length,
//     theorySlots: timetable.filter(s => s.type === "theory").length,
//     labSlots: timetable.filter(s => s.type === "lab").length,
//     byDay: {},
//     byFaculty: {}
//   };
  
//   timetable.forEach(slot => {
//     // Count by day
//     if (!stats.byDay[slot.day]) {
//       stats.byDay[slot.day] = 0;
//     }
//     stats.byDay[slot.day]++;
    
//     // Count by faculty
//     if (!stats.byFaculty[slot.facultyName]) {
//       stats.byFaculty[slot.facultyName] = 0;
//     }
//     stats.byFaculty[slot.facultyName]++;
//   });
  
//   return stats;
// };

// // Helper function to check for conflicts in timetable
// export const findConflicts = (timetable) => {
//   const conflicts = [];
  
//   for (let i = 0; i < timetable.length; i++) {
//     for (let j = i + 1; j < timetable.length; j++) {
//       const a = timetable[i];
//       const b = timetable[j];
      
//       if (a.day === b.day && a.time === b.time) {
//         if (a.facultyId === b.facultyId) {
//           conflicts.push({
//             type: "faculty",
//             message: `${a.facultyName} has conflict: ${a.subject} and ${b.subject} at ${a.day} ${a.time}`,
//             slots: [a, b]
//           });
//         }
        
//         if (a.room === b.room) {
//           conflicts.push({
//             type: "room",
//             message: `Room ${a.room} has conflict: ${a.subject} and ${b.subject} at ${a.day} ${a.time}`,
//             slots: [a, b]
//           });
//         }
//       }
//     }
//   }
  
//   return conflicts;
// };

// // Helper function to get available time slots for a specific day
// export const getAvailableTimeSlots = (timetable, day, facultyId = null) => {
//   const occupiedTimes = timetable
//     .filter(slot => slot.day === day && (!facultyId || slot.facultyId === facultyId))
//     .map(slot => slot.time);
  
//   return occupiedTimes;
// };

// // Helper function to check if a time slot is available
// export const isTimeSlotAvailable = (timetable, day, time, facultyId = null, room = null) => {
//   const conflict = timetable.find(slot => 
//     slot.day === day && 
//     slot.time === time &&
//     ((facultyId && slot.facultyId === facultyId) || (room && slot.room === room))
//   );
  
//   return !conflict;
// };

// src/utils/timetableUtils.js

// export const generateTimeSlots = (config) => {
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
//     if (!lunchAdded && current >= lunchStart && current < lunchEnd) {
//       slots.push({
//         time: current.toTimeString().substring(0, 5),
//         endTime: lunchEnd.toTimeString().substring(0, 5),
//         period: "LUNCH",
//         isLunch: true,
//         isBreak: false,
//         label: "LUNCH BREAK"
//       });
//       current = new Date(lunchEnd);
//       lunchAdded = true;
//       classesBeforeBreak = 0;
//       continue;
//     }
    
//     const classEnd = new Date(current.getTime() + config.classDuration * 60000);
    
//     if (classEnd > end) {
//       break;
//     }
    
//     slots.push({
//       time: current.toTimeString().substring(0, 5),
//       endTime: classEnd.toTimeString().substring(0, 5),
//       period: `P${periodNumber}`,
//       isLunch: false,
//       isBreak: false,
//       label: `${current.toTimeString().substring(0, 5)} - ${classEnd.toTimeString().substring(0, 5)}`
//     });
//     periodNumber++;
//     classesBeforeBreak++;
    
//     current = new Date(classEnd);
    
//     if (classesBeforeBreak === 2 && config.breakDuration > 0) {
//       const breakStart = new Date(current);
//       const breakEnd = new Date(current.getTime() + config.breakDuration * 60000);
      
//       if (!lunchAdded && breakEnd <= lunchStart) {
//         slots.push({
//           time: breakStart.toTimeString().substring(0, 5),
//           endTime: breakEnd.toTimeString().substring(0, 5),
//           period: "BREAK",
//           isLunch: false,
//           isBreak: true,
//           label: "SHORT BREAK"
//         });
//         current = breakEnd;
//         classesBeforeBreak = 0;
//       } else if (lunchAdded && breakEnd <= end) {
//         slots.push({
//           time: breakStart.toTimeString().substring(0, 5),
//           endTime: breakEnd.toTimeString().substring(0, 5),
//           period: "BREAK",
//           isLunch: false,
//           isBreak: true,
//           label: "SHORT BREAK"
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

// export const calculateSyllabusProgress = (completedModules, totalModules) => {
//   return totalModules > 0 ? (completedModules / totalModules) * 100 : 0;
// };

// export const generateTimetable = (approvedCourses, facultyList, rooms, config) => {
//   console.log("=== GENERATING TIMETABLE FOR ALL SECTIONS ===");
  
//   if (!approvedCourses || approvedCourses.length === 0) {
//     console.warn("No approved courses provided");
//     return [];
//   }
  
//   if (!facultyList || facultyList.length === 0) {
//     console.warn("No faculty list provided");
//     return [];
//   }
  
//   if (!rooms || rooms.length === 0) {
//     console.warn("No rooms provided");
//     return [];
//   }
  
//   const timetable = [];
//   let id = 1;
//   const currentTimeSlots = generateTimeSlots(config);
//   const validTimeSlots = currentTimeSlots.filter(s => !s.isLunch && !s.isBreak).map(s => s.time);
//   const sections = ["A", "B", "C"];
  
//   console.log(`Valid time slots for classes: ${validTimeSlots.length}`);
//   console.log(`Sections to schedule: ${sections.join(", ")}`);
  
//   const facultyScheduleMap = new Map(); // key: "day_time_facultyId_section"
//   const roomScheduleMap = new Map();    // key: "day_time_room_section"
  
//   // For each approved course
//   for (const courseDetail of approvedCourses) {
//     const subject = (window.AppState?.subjects || []).find(s => s.id === courseDetail.subjectId);
//     if (!subject) {
//       console.warn(`Subject not found for ID: ${courseDetail.subjectId}`);
//       continue;
//     }
    
//     const faculty = facultyList.find(f => f.id === courseDetail.facultyId);
//     if (!faculty) {
//       console.warn(`Faculty not found for ID: ${courseDetail.facultyId}`);
//       continue;
//     }
    
//     console.log(`Processing ${subject.name} for ${faculty.name} - Theory: ${subject.theoryClassesPerWeek}, Lab: ${subject.labPeriodsPerWeek}`);
    
//     // For each section (A, B, C)
//     for (const section of sections) {
//       // Allocate theory classes
//       for (let i = 0; i < subject.theoryClassesPerWeek; i++) {
//         let allocated = false;
//         let attempts = 0;
        
//         while (!allocated && attempts < 1000) {
//           const day = config.days[Math.floor(Math.random() * config.days.length)];
//           const timeSlot = Math.floor(Math.random() * validTimeSlots.length);
//           const time = validTimeSlots[timeSlot];
          
//           const facultyKey = `${day}_${time}_${faculty.id}_${section}`;
//           if (facultyScheduleMap.has(facultyKey)) {
//             attempts++;
//             continue;
//           }
          
//           let availableRoom = null;
//           const theoryRooms = rooms.filter(r => r.type === "Theory");
          
//           for (const room of theoryRooms) {
//             const roomKey = `${day}_${time}_${room.name}_${section}`;
//             if (!roomScheduleMap.has(roomKey)) {
//               availableRoom = room;
//               break;
//             }
//           }
          
//           if (!availableRoom) {
//             attempts++;
//             continue;
//           }
          
//           timetable.push({
//             id: id++,
//             course: courseDetail.course,
//             semester: courseDetail.semester,
//             section: section,
//             day: day,
//             time: time,
//             subject: subject.name,
//             subjectId: subject.id,
//             subjectCode: subject.code,
//             facultyId: faculty.id,
//             facultyName: faculty.name,
//             facultyAvatar: faculty.avatar,
//             room: availableRoom.name,
//             type: "theory",
//             color: faculty.color
//           });
          
//           facultyScheduleMap.set(facultyKey, true);
//           roomScheduleMap.set(`${day}_${time}_${availableRoom.name}_${section}`, true);
//           allocated = true;
//         }
        
//         if (!allocated) {
//           console.warn(`Could not allocate theory for ${subject.name} Section ${section} after 1000 attempts`);
//         }
//       }
      
//       // Allocate lab periods (consecutive periods)
//       if (subject.labPeriodsPerWeek > 0) {
//         for (let i = 0; i < subject.labPeriodsPerWeek; i += 2) {
//           let allocated = false;
//           let attempts = 0;
          
//           while (!allocated && attempts < 1000) {
//             const day = config.days[Math.floor(Math.random() * config.days.length)];
//             const timeSlot = Math.floor(Math.random() * (validTimeSlots.length - 1));
//             const time1 = validTimeSlots[timeSlot];
//             const time2 = validTimeSlots[timeSlot + 1];
            
//             const facultyKey1 = `${day}_${time1}_${faculty.id}_${section}`;
//             const facultyKey2 = `${day}_${time2}_${faculty.id}_${section}`;
            
//             if (facultyScheduleMap.has(facultyKey1) || facultyScheduleMap.has(facultyKey2)) {
//               attempts++;
//               continue;
//             }
            
//             let availableRoom = null;
//             const labRooms = rooms.filter(r => r.type === "Lab");
            
//             for (const room of labRooms) {
//               const roomKey1 = `${day}_${time1}_${room.name}_${section}`;
//               const roomKey2 = `${day}_${time2}_${room.name}_${section}`;
              
//               if (!roomScheduleMap.has(roomKey1) && !roomScheduleMap.has(roomKey2)) {
//                 availableRoom = room;
//                 break;
//               }
//             }
            
//             if (!availableRoom) {
//               attempts++;
//               continue;
//             }
            
//             timetable.push({
//               id: id++,
//               course: courseDetail.course,
//               semester: courseDetail.semester,
//               section: section,
//               day: day,
//               time: time1,
//               subject: `${subject.name} Lab`,
//               subjectId: subject.id,
//               subjectCode: subject.code,
//               facultyId: faculty.id,
//               facultyName: faculty.name,
//               facultyAvatar: faculty.avatar,
//               room: availableRoom.name,
//               type: "lab",
//               color: faculty.color
//             });
            
//             timetable.push({
//               id: id++,
//               course: courseDetail.course,
//               semester: courseDetail.semester,
//               section: section,
//               day: day,
//               time: time2,
//               subject: `${subject.name} Lab`,
//               subjectId: subject.id,
//               subjectCode: subject.code,
//               facultyId: faculty.id,
//               facultyName: faculty.name,
//               facultyAvatar: faculty.avatar,
//               room: availableRoom.name,
//               type: "lab",
//               color: faculty.color
//             });
            
//             facultyScheduleMap.set(facultyKey1, true);
//             facultyScheduleMap.set(facultyKey2, true);
//             roomScheduleMap.set(`${day}_${time1}_${availableRoom.name}_${section}`, true);
//             roomScheduleMap.set(`${day}_${time2}_${availableRoom.name}_${section}`, true);
//             allocated = true;
//           }
          
//           if (!allocated) {
//             console.warn(`Could not allocate lab for ${subject.name} Section ${section} after 1000 attempts`);
//           }
//         }
//       }
//     }
//   }
  
//   console.log(`Total timetable slots generated: ${timetable.length}`);
//   console.log(`Theoretical minimum slots needed: ${approvedCourses.reduce((sum, c) => {
//     const subject = (window.AppState?.subjects || []).find(s => s.id === c.subjectId);
//     return sum + ((subject?.totalWeeklyClasses || 2) * 3);
//   }, 0)}`);
  
//   return timetable;
// };

// export const getTimetableStats = (timetable) => {
//   const stats = {
//     totalSlots: timetable.length,
//     theorySlots: timetable.filter(s => s.type === "theory").length,
//     labSlots: timetable.filter(s => s.type === "lab").length,
//     byDay: {},
//     bySection: {},
//     byFaculty: {}
//   };
  
//   timetable.forEach(slot => {
//     if (!stats.byDay[slot.day]) stats.byDay[slot.day] = 0;
//     stats.byDay[slot.day]++;
    
//     if (!stats.bySection[slot.section]) stats.bySection[slot.section] = 0;
//     stats.bySection[slot.section]++;
    
//     if (!stats.byFaculty[slot.facultyName]) stats.byFaculty[slot.facultyName] = 0;
//     stats.byFaculty[slot.facultyName]++;
//   });
  
//   return stats;
// };

// export const findConflicts = (timetable) => {
//   const conflicts = [];
//   const slotMap = new Map(); // key: "day_time_room_section" or "day_time_faculty_section"
  
//   for (const slot of timetable) {
//     const roomKey = `${slot.day}_${slot.time}_${slot.room}_${slot.section}`;
//     const facultyKey = `${slot.day}_${slot.time}_${slot.facultyId}_${slot.section}`;
    
//     if (slotMap.has(roomKey)) {
//       conflicts.push({
//         type: "room",
//         message: `Room ${slot.room} has conflict: ${slotMap.get(roomKey)} and ${slot.subject} at ${slot.day} ${slot.time} (Section ${slot.section})`,
//         slots: [slotMap.get(roomKey), slot.subject]
//       });
//     }
//     slotMap.set(roomKey, slot.subject);
    
//     if (slotMap.has(facultyKey)) {
//       conflicts.push({
//         type: "faculty",
//         message: `Faculty ${slot.facultyName} has conflict: ${slotMap.get(facultyKey)} and ${slot.subject} at ${slot.day} ${slot.time} (Section ${slot.section})`,
//         slots: [slotMap.get(facultyKey), slot.subject]
//       });
//     }
//     slotMap.set(facultyKey, slot.subject);
//   }
  
//   return conflicts;
// };

// export const getAvailableTimeSlots = (timetable, day, section, facultyId = null) => {
//   const occupiedTimes = timetable
//     .filter(slot => slot.day === day && slot.section === section && (!facultyId || slot.facultyId === facultyId))
//     .map(slot => slot.time);
  
//   return occupiedTimes;
// };

// export const isTimeSlotAvailable = (timetable, day, time, section, facultyId = null, room = null) => {
//   const conflict = timetable.find(slot => 
//     slot.day === day && 
//     slot.time === time &&
//     slot.section === section &&
//     ((facultyId && slot.facultyId === facultyId) || (room && slot.room === room))
//   );
  
//   return !conflict;
// };

// src/utils/timetableUtils.js

export const generateTimeSlots = (config) => {
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
    const fullTimeRange = `${timeStr} - ${endTimeStr}`;
    
    if (!lunchAdded && current >= lunchStart && current < lunchEnd) {
      slots.push({
        time: timeStr,
        endTime: lunchEnd.toTimeString().substring(0, 5),
        fullTimeRange: `${timeStr} - ${lunchEnd.toTimeString().substring(0, 5)}`,
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
      fullTimeRange: fullTimeRange,
      period: `P${periodNumber}`,
      isLunch: false,
      isBreak: false
    });
    periodNumber++;
    classesBeforeBreak++;
    current = new Date(classEnd);
    
    if (classesBeforeBreak === 2 && config.breakDuration > 0) {
      const breakStart = new Date(current);
      const breakEnd = new Date(current.getTime() + config.breakDuration * 60000);
      if ((!lunchAdded && breakEnd <= lunchStart) || (lunchAdded && breakEnd <= end)) {
        slots.push({
          time: breakStart.toTimeString().substring(0, 5),
          endTime: breakEnd.toTimeString().substring(0, 5),
          fullTimeRange: `${breakStart.toTimeString().substring(0, 5)} - ${breakEnd.toTimeString().substring(0, 5)}`,
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

export const generateTimetable = (approvedCourses, facultyList, rooms, config) => {
  console.log("=== GENERATING CONFLICT-FREE TIMETABLE ===");
  
  const timetable = [];
  let id = 1;
  const timeSlots = generateTimeSlots(config);
  const teachingSlots = timeSlots.filter(s => !s.isLunch && !s.isBreak);
  const sections = ["A", "B", "C"];
  const days = config.days;
  
  // Create a list of all available slots (day, period, room)
  const allSlots = [];
  for (const day of days) {
    for (let slotIdx = 0; slotIdx < teachingSlots.length; slotIdx++) {
      const slot = teachingSlots[slotIdx];
      for (const room of rooms) {
        allSlots.push({
          day,
          period: slot.period,
          time: slot.time,
          fullTimeRange: slot.fullTimeRange,
          room: room.name,
          roomObj: room
        });
      }
    }
  }
  
  // Shuffle slots for better distribution
  for (let i = allSlots.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allSlots[i], allSlots[j]] = [allSlots[j], allSlots[i]];
  }
  
  // Track used resources
  const usedSlots = new Set(); // "day_period_room"
  const facultySchedule = new Map(); // "day_period_facultyId" -> subject
  
  // Create all required sessions
  const requiredSessions = [];
  for (const course of approvedCourses) {
    const hoursNeeded = course.totalWeeklyClasses || 2;
    for (const section of sections) {
      for (let hourIdx = 0; hourIdx < hoursNeeded; hourIdx++) {
        requiredSessions.push({
          course,
          section,
          hourIdx,
          semester: course.semester
        });
      }
    }
  }
  
  console.log(`Required sessions: ${requiredSessions.length}`);
  console.log(`Available slots: ${allSlots.length}`);
  
  // Shuffle sessions
  for (let i = requiredSessions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [requiredSessions[i], requiredSessions[j]] = [requiredSessions[j], requiredSessions[i]];
  }
  
  let slotIndex = 0;
  let scheduled = 0;
  
  for (const session of requiredSessions) {
    let assigned = false;
    let attempts = 0;
    
    while (!assigned && attempts < allSlots.length) {
      const slot = allSlots[slotIndex % allSlots.length];
      const slotKey = `${slot.day}_${slot.period}_${slot.room}`;
      const facultyKey = `${slot.day}_${slot.period}_${session.course.facultyId}`;
      
      // Check if slot and faculty are available
      if (!usedSlots.has(slotKey) && !facultySchedule.has(facultyKey)) {
        timetable.push({
          id: id++,
          course: session.course.course,
          semester: session.semester,
          section: session.section,
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
          room: slot.room,
          type: session.course.type || "theory",
          color: session.course.color || "#4361ee"
        });
        
        usedSlots.add(slotKey);
        facultySchedule.set(facultyKey, session.course.subjectName);
        assigned = true;
        scheduled++;
      }
      
      slotIndex++;
      attempts++;
    }
    
    if (!assigned) {
      console.warn(`Could not schedule ${session.course.subjectName} - Section ${session.section}`);
    }
  }
  
  console.log(`Scheduled ${scheduled}/${requiredSessions.length} sessions`);
  
  // Log breakdown
  const sectionCounts = { A: 0, B: 0, C: 0 };
  const semesterCounts = { 1: 0, 2: 0 };
  timetable.forEach(t => {
    sectionCounts[t.section]++;
    semesterCounts[t.semester]++;
  });
  console.log("Slots per section:", sectionCounts);
  console.log("Slots per semester:", semesterCounts);
  
  return timetable;
};

export const findConflicts = (timetable) => {
  const conflicts = [];
  const facultyMap = new Map();
  const roomMap = new Map();
  
  for (const slot of timetable) {
    const facultyKey = `${slot.day}_${slot.period}_${slot.facultyId}`;
    const roomKey = `${slot.day}_${slot.period}_${slot.room}`;
    
    if (facultyMap.has(facultyKey) && facultyMap.get(facultyKey) !== slot.subject) {
      conflicts.push({
        type: "faculty",
        message: `${slot.facultyName} assigned to both ${facultyMap.get(facultyKey)} and ${slot.subject} at ${slot.day} ${slot.time}`
      });
    } else {
      facultyMap.set(facultyKey, slot.subject);
    }
    
    if (roomMap.has(roomKey) && roomMap.get(roomKey) !== slot.subject) {
      conflicts.push({
        type: "room",
        message: `Room ${slot.room} assigned to both ${roomMap.get(roomKey)} and ${slot.subject} at ${slot.day} ${slot.time}`
      });
    } else {
      roomMap.set(roomKey, slot.subject);
    }
  }
  
  return conflicts;
};

export const getTimetableStats = (timetable) => {
  const stats = {
    totalSlots: timetable.length,
    byDay: {},
    bySection: {},
    bySemester: {},
    byFaculty: {}
  };
  
  timetable.forEach(slot => {
    stats.byDay[slot.day] = (stats.byDay[slot.day] || 0) + 1;
    stats.bySection[slot.section] = (stats.bySection[slot.section] || 0) + 1;
    stats.bySemester[slot.semester] = (stats.bySemester[slot.semester] || 0) + 1;
    stats.byFaculty[slot.facultyName] = (stats.byFaculty[slot.facultyName] || 0) + 1;
  });
  
  return stats;
};

export const getFacultyUtilization = (timetable, facultyList) => {
  const utilization = [];
  for (const faculty of facultyList) {
    const slots = timetable.filter(s => s.facultyId === faculty.id);
    utilization.push({
      facultyId: faculty.id,
      facultyName: faculty.name,
      slots: slots.length,
      hours: (slots.length * 0.83).toFixed(1)
    });
  }
  return utilization;
};