// // // src/AppState.js
// // import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "./utils/storage";
// // import { 
// //   DEFAULT_FACULTY, 
// //   DEFAULT_SUBJECTS, 
// //   DEFAULT_SUBJECT_PREFERENCES, 
// //   DEFAULT_ROOMS, 
// //   DEFAULT_TIMETABLE_CONFIG, 
// //   DEFAULT_SEMESTER_DETAILS,
// //   DEFAULT_CALENDAR_EVENTS,
// //   COURSES,
// //   SEMESTERS,
// //   SECTIONS
// // } from "./data/mockData";

// // // Helper function to calculate syllabus progress
// // const calculateSyllabusProgress = (completedModules, totalModules) => {
// //   return (completedModules / totalModules) * 100;
// // };

// // // Helper function to generate time slots with lunch break
// // const generateTimeSlotsUtil = (config) => {
// //   const slots = [];
// //   const start = new Date(`1970-01-01T${config.startTime}:00`);
// //   const end = new Date(`1970-01-01T${config.endTime}:00`);
  
// //   let current = new Date(start);
// //   let periodNumber = 1;
  
// //   // Parse lunch break times
// //   const lunchStart = new Date(`1970-01-01T${config.lunchBreak.start}:00`);
// //   const lunchEnd = new Date(lunchStart.getTime() + config.lunchBreak.duration * 60000);
  
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
  
// //   return slots;
// // };

// // export const AppState = {
// //   // Data stores
// //   faculty: loadFromStorage(STORAGE_KEYS.FACULTY, DEFAULT_FACULTY),
// //   subjects: loadFromStorage(STORAGE_KEYS.SUBJECTS, DEFAULT_SUBJECTS),
// //   subjectPreferences: loadFromStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, DEFAULT_SUBJECT_PREFERENCES),
// //   courseDetails: loadFromStorage(STORAGE_KEYS.COURSE_DETAILS, []),
// //   timetable: loadFromStorage(STORAGE_KEYS.TIMETABLE, []),
// //   syllabusProgress: loadFromStorage(STORAGE_KEYS.SYLLABUS_PROGRESS, {}),
// //   rooms: loadFromStorage(STORAGE_KEYS.ROOMS, DEFAULT_ROOMS),
// //   timetableConfig: loadFromStorage(STORAGE_KEYS.TIMETABLE_CONFIG, DEFAULT_TIMETABLE_CONFIG),
// //   semesterDetails: loadFromStorage(STORAGE_KEYS.SEMESTER_DETAILS, DEFAULT_SEMESTER_DETAILS),
// //   flaggedIssues: loadFromStorage(STORAGE_KEYS.FLAGGED_ISSUES, []),
// //   studentProgress: loadFromStorage(STORAGE_KEYS.STUDENT_PROGRESS, {}),
// //   deanApprovals: loadFromStorage(STORAGE_KEYS.DEAN_APPROVALS, {}),
  
// //   // Helper functions
// //   getFacultyById: (id) => {
// //     return AppState.faculty.find(f => f.id === id);
// //   },
  
// //   getCourseDetailsByFacultyId: (facultyId) => {
// //     return AppState.courseDetails.filter(c => c.facultyId === facultyId);
// //   },
  
// //   updateFacultyRemainingHours: (facultyId, assignedHours) => {
// //     const faculty = AppState.faculty.find(f => f.id === facultyId);
// //     if (faculty) {
// //       faculty.assignedHours += assignedHours;
// //       faculty.remainingHours = faculty.maxHours - faculty.assignedHours;
// //       saveToStorage(STORAGE_KEYS.FACULTY, AppState.faculty);
// //     }
// //   },
  
// //   getPreferenceByFacultyId: (facultyId) => {
// //     return AppState.subjectPreferences.find(p => p.facultyId === facultyId);
// //   },
  
// //   submitSubjectPreferences: (facultyId, preferences) => {
// //     const pref = AppState.subjectPreferences.find(p => p.facultyId === facultyId);
// //     if (pref) {
// //       pref.submitted = true;
// //       pref.preferences = preferences;
// //       pref.status = "pending";
// //       pref.feedback = "";
// //       saveToStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, AppState.subjectPreferences);
// //     }
// //   },
  
// //   updatePreferenceStatus: (facultyId, status, feedback = "", allocatedSubjects = []) => {
// //     const pref = AppState.subjectPreferences.find(p => p.facultyId === facultyId);
// //     if (pref) {
// //       pref.status = status;
// //       pref.feedback = feedback;
      
// //       if (status === "approved" && allocatedSubjects.length > 0) {
// //         pref.allocatedSubjects = allocatedSubjects;
        
// //         allocatedSubjects.forEach(subjectId => {
// //           const subject = AppState.subjects.find(s => s.id === subjectId);
// //           if (subject) {
// //             AppState.updateFacultyRemainingHours(facultyId, subject.totalWeeklyClasses);
// //           }
// //         });
// //       }
      
// //       saveToStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, AppState.subjectPreferences);
// //     }
// //   },
  
// //   updateSemesterDetails: (course, semester, details) => {
// //     if (!AppState.semesterDetails[course]) {
// //       AppState.semesterDetails[course] = {};
// //     }
// //     AppState.semesterDetails[course][semester] = details;
// //     saveToStorage(STORAGE_KEYS.SEMESTER_DETAILS, AppState.semesterDetails);
// //   },
  
// //   getSubjectsForCourseAndSemester: (course, semester) => {
// //     const details = AppState.semesterDetails[course]?.[semester];
// //     if (!details) return [];
    
// //     return details.subjects.map(subjectId => 
// //       AppState.subjects.find(s => s.id === subjectId)
// //     ).filter(s => s);
// //   },
  
// //   submitCourseDetails: (facultyId, courses) => {
// //     const coursesWithDeanStatus = courses.map(course => ({
// //       ...course,
// //       deanStatus: "pending",
// //       coordinatorStatus: "pending",
// //       deanFeedback: "",
// //       coordinatorFeedback: ""
// //     }));
    
// //     AppState.courseDetails = AppState.courseDetails.filter(c => c.facultyId !== facultyId);
// //     AppState.courseDetails.push(...coursesWithDeanStatus);
// //     saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
    
// //     courses.forEach(course => {
// //       const subject = AppState.subjects.find(s => s.id === course.subjectId);
// //       if (subject) {
// //         const progressKey = `${facultyId}_${course.subjectId}`;
// //         AppState.syllabusProgress[progressKey] = {
// //           facultyId,
// //           facultyName: AppState.getFacultyById(facultyId)?.name,
// //           subjectId: course.subjectId,
// //           subjectName: subject.name,
// //           subjectCode: subject.code,
// //           course: course.course,
// //           semester: course.semester,
// //           sections: course.sections,
// //           totalModules: course.modules,
// //           completedModules: 0,
// //           modules: Array(course.modules).fill(false),
// //           lastUpdated: new Date().toISOString(),
// //           completionPercentage: 0
// //         };
// //       }
// //     });
// //     saveToStorage(STORAGE_KEYS.SYLLABUS_PROGRESS, AppState.syllabusProgress);
// //   },
  
// //   updateCourseDetailCoordinatorStatus: (courseId, status, feedback = "") => {
// //     const course = AppState.courseDetails.find(c => c.id === courseId);
// //     if (course) {
// //       course.coordinatorStatus = status;
// //       course.coordinatorFeedback = feedback;
// //       saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
// //     }
// //   },
  
// //   updateCourseDetailDeanStatus: (courseId, status, feedback = "") => {
// //     const course = AppState.courseDetails.find(c => c.id === courseId);
// //     if (course) {
// //       course.deanStatus = status;
// //       course.deanFeedback = feedback;
// //       saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
      
// //       if (status === "approved") {
// //         AppState.checkSyllabusDiscrepancy(course.facultyId, course.subjectId);
// //       }
// //     }
// //   },
  
// //   checkSyllabusDiscrepancy: (facultyId, subjectId) => {
// //     const facultyProgress = AppState.getSyllabusProgress(facultyId, subjectId);
// //     if (!facultyProgress) return;
    
// //     for (const key in AppState.studentProgress) {
// //       if (key.includes(subjectId)) {
// //         const studentProgress = AppState.studentProgress[key];
// //         const facultyCompleted = facultyProgress.completedModules;
// //         const studentCompleted = studentProgress.completedModules;
// //         const threshold = Math.ceil(facultyProgress.totalModules * 0.1);
        
// //         if (Math.abs(facultyCompleted - studentCompleted) > threshold) {
// //           const issue = {
// //             id: Date.now() + Math.random(),
// //             type: "student_faculty_discrepancy",
// //             subjectId,
// //             subjectName: facultyProgress.subjectName,
// //             facultyProgress: facultyCompleted,
// //             studentProgress: studentCompleted,
// //             facultyId,
// //             studentId: studentProgress.studentId,
// //             timestamp: new Date().toISOString(),
// //             resolved: false
// //           };
          
// //           const exists = AppState.flaggedIssues.some(i => 
// //             i.type === "student_faculty_discrepancy" && 
// //             i.subjectId === subjectId && 
// //             i.facultyId === facultyId &&
// //             i.studentId === studentProgress.studentId &&
// //             !i.resolved
// //           );
          
// //           if (!exists) {
// //             AppState.flaggedIssues.push(issue);
// //             saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
// //           }
// //         }
// //       }
// //     }
// //   },
  
// //   updateSyllabusProgress: (facultyId, subjectId, moduleIndex, completed) => {
// //     const progressKey = `${facultyId}_${subjectId}`;
// //     if (AppState.syllabusProgress[progressKey]) {
// //       const progress = AppState.syllabusProgress[progressKey];
// //       progress.modules[moduleIndex] = completed;
// //       progress.completedModules = progress.modules.filter(m => m).length;
// //       progress.lastUpdated = new Date().toISOString();
// //       progress.completionPercentage = calculateSyllabusProgress(
// //         progress.completedModules, 
// //         progress.totalModules
// //       );
      
// //       saveToStorage(STORAGE_KEYS.SYLLABUS_PROGRESS, AppState.syllabusProgress);
// //       AppState.checkSyllabusDiscrepancy(facultyId, subjectId);
// //     }
// //   },
  
// //   updateStudentProgress: (studentId, subjectId, moduleIndex, completed) => {
// //     const key = `${studentId}_${subjectId}`;
// //     if (!AppState.studentProgress[key]) {
// //       const subject = AppState.subjects.find(s => s.id === subjectId);
// //       AppState.studentProgress[key] = {
// //         studentId,
// //         subjectId,
// //         subjectName: subject?.name,
// //         totalModules: subject?.modules || 0,
// //         completedModules: 0,
// //         modules: Array(subject?.modules || 0).fill(false),
// //         lastUpdated: new Date().toISOString(),
// //       };
// //     }
    
// //     const progress = AppState.studentProgress[key];
// //     progress.modules[moduleIndex] = completed;
// //     progress.completedModules = progress.modules.filter(m => m).length;
// //     progress.lastUpdated = new Date().toISOString();
    
// //     saveToStorage(STORAGE_KEYS.STUDENT_PROGRESS, AppState.studentProgress);
    
// //     const facultyProgress = AppState.getSyllabusProgressForSubject(subjectId);
// //     if (facultyProgress) {
// //       const facultyCompleted = facultyProgress.completedModules;
// //       const studentCompleted = progress.completedModules;
// //       const threshold = Math.ceil(progress.totalModules * 0.1);
      
// //       if (Math.abs(facultyCompleted - studentCompleted) > threshold) {
// //         const issue = {
// //           id: Date.now(),
// //           type: "student_faculty_discrepancy",
// //           subjectId,
// //           subjectName: progress.subjectName,
// //           facultyProgress: facultyCompleted,
// //           studentProgress: studentCompleted,
// //           facultyId: facultyProgress.facultyId,
// //           studentId,
// //           timestamp: new Date().toISOString(),
// //           resolved: false
// //         };
        
// //         const exists = AppState.flaggedIssues.some(i => 
// //           i.type === "student_faculty_discrepancy" && 
// //           i.subjectId === subjectId && 
// //           i.facultyId === facultyProgress.facultyId &&
// //           i.studentId === studentId &&
// //           !i.resolved
// //         );
        
// //         if (!exists) {
// //           AppState.flaggedIssues.push(issue);
// //           saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
// //         }
// //       }
// //     }
// //   },
  
// //   getStudentProgress: (studentId, subjectId) => {
// //     const key = `${studentId}_${subjectId}`;
// //     return AppState.studentProgress[key] || null;
// //   },
  
// //   getSyllabusProgressForSubject: (subjectId) => {
// //     for (const key in AppState.syllabusProgress) {
// //       if (key.includes(subjectId)) {
// //         return AppState.syllabusProgress[key];
// //       }
// //     }
// //     return null;
// //   },
  
// //   getSyllabusProgress: (facultyId, subjectId) => {
// //     const progressKey = `${facultyId}_${subjectId}`;
// //     return AppState.syllabusProgress[progressKey] || null;
// //   },
  
// //   updateTimetableConfig: (config) => {
// //     AppState.timetableConfig = config;
// //     saveToStorage(STORAGE_KEYS.TIMETABLE_CONFIG, config);
// //   },
  
// //   generateTimeSlots: (config) => {
// //     return generateTimeSlotsUtil(config);
// //   },
  
// //   generateTimetable: () => {
// //     console.log("=== GENERATE TIMETABLE CALLED ===");
// //     console.log("Course details:", AppState.courseDetails);
    
// //     // Only include courses approved by dean
// //     const approvedCourses = AppState.courseDetails.filter(c => c.deanStatus === "approved");
// //     console.log("Approved courses:", approvedCourses);
// //     console.log("Approved courses count:", approvedCourses.length);
    
// //     if (approvedCourses.length === 0) {
// //       console.warn("No approved courses found. Cannot generate timetable.");
// //       return [];
// //     }
    
// //     const config = AppState.timetableConfig;
// //     console.log("Timetable config:", config);
    
// //     // Generate time slots with lunch break
// //     const timeSlots = AppState.generateTimeSlots(config);
// //     const validTimeSlots = timeSlots.filter(s => !s.isLunch).map(s => s.time);
// //     console.log("Valid time slots (excluding lunch):", validTimeSlots);
// //     console.log("Lunch slot present:", timeSlots.some(s => s.isLunch));
    
// //     // Generate timetable for each section
// //     const timetable = [];
// //     let id = 1;
    
// //     // Track faculty and room assignments to avoid conflicts
// //     const facultySchedule = {};
// //     const roomSchedule = {};
    
// //     // For each course, semester, and section
// //     COURSES.forEach(course => {
// //       SEMESTERS.forEach(semester => {
// //         SECTIONS.forEach(section => {
// //           // Get approved courses for this combination
// //           const sectionCourses = approvedCourses.filter(c => 
// //             c.course === course && c.semester === semester
// //           );
          
// //           sectionCourses.forEach(courseDetail => {
// //             const subject = AppState.subjects.find(s => s.id === courseDetail.subjectId);
// //             if (!subject) {
// //               console.warn(`Subject not found for ID: ${courseDetail.subjectId}`);
// //               return;
// //             }
            
// //             const faculty = AppState.faculty.find(f => f.id === courseDetail.facultyId);
// //             if (!faculty) {
// //               console.warn(`Faculty not found for ID: ${courseDetail.facultyId}`);
// //               return;
// //             }
            
// //             console.log(`Processing ${subject.name} for ${faculty.name} - ${course} Sem ${semester} Sec ${section}`);
            
// //             // Allocate theory classes
// //             for (let i = 0; i < subject.theoryClassesPerWeek; i++) {
// //               let allocated = false;
// //               let attempts = 0;
              
// //               while (!allocated && attempts < 100) {
// //                 const day = config.days[Math.floor(Math.random() * config.days.length)];
// //                 const timeSlot = Math.floor(Math.random() * validTimeSlots.length);
// //                 const time = validTimeSlots[timeSlot];
                
// //                 const facultyKey = `${day}_${time}_${faculty.id}`;
// //                 if (facultySchedule[facultyKey]) {
// //                   attempts++;
// //                   continue;
// //                 }
                
// //                 // Find available theory room
// //                 let availableRoom = null;
// //                 const theoryRooms = AppState.rooms.filter(r => r.type === "Theory");
                
// //                 for (const room of theoryRooms) {
// //                   const roomKey = `${day}_${time}_${room.name}`;
// //                   if (!roomSchedule[roomKey]) {
// //                     availableRoom = room;
// //                     break;
// //                   }
// //                 }
                
// //                 if (!availableRoom) {
// //                   attempts++;
// //                   continue;
// //                 }
                
// //                 timetable.push({
// //                   id: id++,
// //                   course,
// //                   semester,
// //                   section,
// //                   day,
// //                   time,
// //                   subject: subject.name,
// //                   subjectId: subject.id,
// //                   subjectCode: subject.code,
// //                   facultyId: faculty.id,
// //                   facultyName: faculty.name,
// //                   facultyAvatar: faculty.avatar,
// //                   room: availableRoom.name,
// //                   type: "theory",
// //                   color: faculty.color
// //                 });
                
// //                 facultySchedule[facultyKey] = true;
// //                 roomSchedule[`${day}_${time}_${availableRoom.name}`] = true;
// //                 allocated = true;
// //               }
              
// //               if (!allocated) {
// //                 console.warn(`Could not allocate theory class for ${subject.name} after 100 attempts`);
// //               }
// //             }
            
// //             // Allocate lab periods (consecutive periods)
// //             if (subject.labPeriodsPerWeek > 0) {
// //               for (let i = 0; i < subject.labPeriodsPerWeek; i += 2) {
// //                 let allocated = false;
// //                 let attempts = 0;
                
// //                 while (!allocated && attempts < 100) {
// //                   const day = config.days[Math.floor(Math.random() * config.days.length)];
// //                   const timeSlot = Math.floor(Math.random() * (validTimeSlots.length - 1));
// //                   const time1 = validTimeSlots[timeSlot];
// //                   const time2 = validTimeSlots[timeSlot + 1];
                  
// //                   const facultyKey1 = `${day}_${time1}_${faculty.id}`;
// //                   const facultyKey2 = `${day}_${time2}_${faculty.id}`;
                  
// //                   if (facultySchedule[facultyKey1] || facultySchedule[facultyKey2]) {
// //                     attempts++;
// //                     continue;
// //                   }
                  
// //                   // Find available lab room for both slots
// //                   let availableRoom = null;
// //                   const labRooms = AppState.rooms.filter(r => r.type === "Lab");
                  
// //                   for (const room of labRooms) {
// //                     const roomKey1 = `${day}_${time1}_${room.name}`;
// //                     const roomKey2 = `${day}_${time2}_${room.name}`;
                    
// //                     if (!roomSchedule[roomKey1] && !roomSchedule[roomKey2]) {
// //                       availableRoom = room;
// //                       break;
// //                     }
// //                   }
                  
// //                   if (!availableRoom) {
// //                     attempts++;
// //                     continue;
// //                   }
                  
// //                   const labSlot1 = {
// //                     id: id++,
// //                     course,
// //                     semester,
// //                     section,
// //                     day,
// //                     time: time1,
// //                     subject: `${subject.name} Lab`,
// //                     subjectId: subject.id,
// //                     subjectCode: subject.code,
// //                     facultyId: faculty.id,
// //                     facultyName: faculty.name,
// //                     facultyAvatar: faculty.avatar,
// //                     room: availableRoom.name,
// //                     type: "lab",
// //                     color: faculty.color
// //                   };
                  
// //                   const labSlot2 = {
// //                     ...labSlot1,
// //                     id: id++,
// //                     time: time2
// //                   };
                  
// //                   timetable.push(labSlot1, labSlot2);
// //                   facultySchedule[facultyKey1] = true;
// //                   facultySchedule[facultyKey2] = true;
// //                   roomSchedule[`${day}_${time1}_${availableRoom.name}`] = true;
// //                   roomSchedule[`${day}_${time2}_${availableRoom.name}`] = true;
// //                   allocated = true;
// //                 }
                
// //                 if (!allocated) {
// //                   console.warn(`Could not allocate lab for ${subject.name} after 100 attempts`);
// //                 }
// //               }
// //             }
// //           });
// //         });
// //       });
// //     });
    
// //     console.log(`Generated ${timetable.length} timetable slots`);
// //     AppState.timetable = timetable;
// //     saveToStorage(STORAGE_KEYS.TIMETABLE, timetable);
    
// //     return timetable;
// //   },
  
// //   getFacultySchedule: (facultyId) => {
// //     return AppState.timetable.filter(t => t.facultyId === facultyId);
// //   },
  
// //   getStudentSchedule: (course, semester, section) => {
// //     return AppState.timetable.filter(t => 
// //       t.course === course && 
// //       t.semester === semester && 
// //       t.section === section
// //     );
// //   },
  
// //   checkAllConflicts: () => {
// //     const conflicts = [];
    
// //     for (let i = 0; i < AppState.timetable.length; i++) {
// //       for (let j = i + 1; j < AppState.timetable.length; j++) {
// //         const a = AppState.timetable[i];
// //         const b = AppState.timetable[j];
        
// //         if (a.day === b.day && a.time === b.time) {
// //           if (a.facultyId === b.facultyId) {
// //             conflicts.push({
// //               type: "faculty",
// //               message: `${a.facultyName} assigned to both ${a.subject} (${a.course} Sem ${a.semester} Sec ${a.section}) and ${b.subject} (${b.course} Sem ${b.semester} Sec ${b.section}) at ${a.day} ${a.time}`
// //             });
// //           }
          
// //           if (a.room === b.room) {
// //             conflicts.push({
// //               type: "room",
// //               message: `Room ${a.room} assigned to both ${a.subject} (${a.course} Sem ${a.semester} Sec ${a.section}) and ${b.subject} (${b.course} Sem ${b.semester} Sec ${b.section}) at ${a.day} ${a.time}`
// //             });
// //           }
// //         }
// //       }
// //     }
    
// //     return conflicts;
// //   },
  
// //   resetPreferenceForm: (facultyId) => {
// //     const pref = AppState.subjectPreferences.find(p => p.facultyId === facultyId);
// //     if (pref) {
// //       pref.submitted = false;
// //       pref.status = "pending";
// //       pref.feedback = "";
// //       pref.preferences = [];
// //       saveToStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, AppState.subjectPreferences);
// //     }
// //   },
  
// //   getFlaggedIssues: () => {
// //     return AppState.flaggedIssues.filter(issue => !issue.resolved);
// //   },
  
// //   resolveFlaggedIssue: (issueId) => {
// //     const issue = AppState.flaggedIssues.find(i => i.id === issueId);
// //     if (issue) {
// //       issue.resolved = true;
// //       saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
// //     }
// //   },
  
// //   getPendingDeanApprovals: () => {
// //     return AppState.courseDetails.filter(c => 
// //       c.coordinatorStatus === "approved" && 
// //       c.deanStatus === "pending"
// //     );
// //   },
  
// //   getPendingCoordinatorApprovals: () => {
// //     return AppState.courseDetails.filter(c => 
// //       c.coordinatorStatus === "pending"
// //     );
// //   },
  
// //   initializeStorage: () => {
// //     if (!localStorage.getItem(STORAGE_KEYS.FACULTY)) {
// //       saveToStorage(STORAGE_KEYS.FACULTY, DEFAULT_FACULTY);
// //     }
// //     if (!localStorage.getItem(STORAGE_KEYS.SUBJECTS)) {
// //       saveToStorage(STORAGE_KEYS.SUBJECTS, DEFAULT_SUBJECTS);
// //     }
// //     if (!localStorage.getItem(STORAGE_KEYS.SUBJECT_PREFERENCES)) {
// //       saveToStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, DEFAULT_SUBJECT_PREFERENCES);
// //     }
// //     if (!localStorage.getItem(STORAGE_KEYS.ROOMS)) {
// //       saveToStorage(STORAGE_KEYS.ROOMS, DEFAULT_ROOMS);
// //     }
// //     if (!localStorage.getItem(STORAGE_KEYS.TIMETABLE_CONFIG)) {
// //       saveToStorage(STORAGE_KEYS.TIMETABLE_CONFIG, DEFAULT_TIMETABLE_CONFIG);
// //     }
// //     if (!localStorage.getItem(STORAGE_KEYS.SEMESTER_DETAILS)) {
// //       saveToStorage(STORAGE_KEYS.SEMESTER_DETAILS, DEFAULT_SEMESTER_DETAILS);
// //     }
// //     if (!localStorage.getItem(STORAGE_KEYS.FLAGGED_ISSUES)) {
// //       saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, []);
// //     }
// //     if (!localStorage.getItem(STORAGE_KEYS.STUDENT_PROGRESS)) {
// //       saveToStorage(STORAGE_KEYS.STUDENT_PROGRESS, {});
// //     }
// //     if (!localStorage.getItem(STORAGE_KEYS.DEAN_APPROVALS)) {
// //       saveToStorage(STORAGE_KEYS.DEAN_APPROVALS, {});
// //     }
// //     if (!localStorage.getItem(STORAGE_KEYS.LEAVE_REQUESTS)) {
// //       saveToStorage(STORAGE_KEYS.LEAVE_REQUESTS, []);
// //     }
// //     if (!localStorage.getItem(STORAGE_KEYS.CALENDAR_EVENTS)) {
// //       saveToStorage(STORAGE_KEYS.CALENDAR_EVENTS, DEFAULT_CALENDAR_EVENTS);
// //     }
// //   },
// // };

// // // Initialize storage on load
// // AppState.initializeStorage();

// // // Make AppState available globally for debugging
// // if (typeof window !== 'undefined') {
// //   window.AppState = AppState;
// // }

// // src/AppState.js
// import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "./utils/storage";
// import { 
//   DEFAULT_FACULTY, 
//   DEFAULT_SUBJECTS, 
//   DEFAULT_SUBJECT_PREFERENCES, 
//   DEFAULT_ROOMS, 
//   DEFAULT_TIMETABLE_CONFIG, 
//   DEFAULT_SEMESTER_DETAILS,
//   DEFAULT_CALENDAR_EVENTS,
//   COURSES,
//   SEMESTERS,
//   SECTIONS
// } from "./data/mockData";

// // Helper function to calculate syllabus progress
// const calculateSyllabusProgress = (completedModules, totalModules) => {
//   return totalModules > 0 ? (completedModules / totalModules) * 100 : 0;
// };

// // Helper function to generate time slots with lunch break
// const generateTimeSlotsUtil = (config) => {
//   const slots = [];
//   const start = new Date(`1970-01-01T${config.startTime}:00`);
//   const end = new Date(`1970-01-01T${config.endTime}:00`);
  
//   let current = new Date(start);
//   let periodNumber = 1;
  
//   // Parse lunch break times
//   const lunchStart = new Date(`1970-01-01T${config.lunchBreak.start}:00`);
//   const lunchEnd = new Date(lunchStart.getTime() + config.lunchBreak.duration * 60000);
  
//   console.log("Generating time slots with config:", config);
//   console.log("Lunch break:", lunchStart, "to", lunchEnd);
  
//   while (current < end) {
//     const timeStr = current.toTimeString().substring(0, 5);
//     const endTime = new Date(current.getTime() + config.classDuration * 60000);
//     const endTimeStr = endTime.toTimeString().substring(0, 5);
    
//     // Check if current time overlaps with lunch break
//     if (current >= lunchStart && current < lunchEnd) {
//       // Add lunch break slot
//       slots.push({
//         time: timeStr,
//         endTime: endTimeStr,
//         period: "LUNCH",
//         isLunch: true,
//         label: "LUNCH BREAK"
//       });
//       // Skip to end of lunch break
//       current = new Date(lunchEnd);
//       console.log("Added lunch slot at:", timeStr);
//     } else {
//       // Add regular class slot
//       slots.push({
//         time: timeStr,
//         endTime: endTimeStr,
//         period: `P${periodNumber}`,
//         isLunch: false,
//         label: `${timeStr} - ${endTimeStr}`
//       });
//       periodNumber++;
//       // Move to next slot (class duration + break)
//       current = new Date(current.getTime() + config.classDuration * 60000 + config.breakDuration * 60000);
//     }
//   }
  
//   console.log("Total time slots generated:", slots.length);
//   console.log("Lunch slots:", slots.filter(s => s.isLunch).length);
//   return slots;
// };

// export const AppState = {
//   // Data stores
//   faculty: loadFromStorage(STORAGE_KEYS.FACULTY, DEFAULT_FACULTY),
//   subjects: loadFromStorage(STORAGE_KEYS.SUBJECTS, DEFAULT_SUBJECTS),
//   subjectPreferences: loadFromStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, DEFAULT_SUBJECT_PREFERENCES),
//   courseDetails: loadFromStorage(STORAGE_KEYS.COURSE_DETAILS, []),
//   timetable: loadFromStorage(STORAGE_KEYS.TIMETABLE, []),
//   syllabusProgress: loadFromStorage(STORAGE_KEYS.SYLLABUS_PROGRESS, {}),
//   rooms: loadFromStorage(STORAGE_KEYS.ROOMS, DEFAULT_ROOMS),
//   timetableConfig: loadFromStorage(STORAGE_KEYS.TIMETABLE_CONFIG, DEFAULT_TIMETABLE_CONFIG),
//   semesterDetails: loadFromStorage(STORAGE_KEYS.SEMESTER_DETAILS, DEFAULT_SEMESTER_DETAILS),
//   flaggedIssues: loadFromStorage(STORAGE_KEYS.FLAGGED_ISSUES, []),
//   studentProgress: loadFromStorage(STORAGE_KEYS.STUDENT_PROGRESS, {}),
//   deanApprovals: loadFromStorage(STORAGE_KEYS.DEAN_APPROVALS, {}),
  
//   // ============ FACULTY FUNCTIONS ============
//   getFacultyById: (id) => {
//     return AppState.faculty.find(f => f.id === id);
//   },
  
//   getCourseDetailsByFacultyId: (facultyId) => {
//     return AppState.courseDetails.filter(c => c.facultyId === facultyId);
//   },
  
//   updateFacultyRemainingHours: (facultyId, assignedHours) => {
//     const faculty = AppState.faculty.find(f => f.id === facultyId);
//     if (faculty) {
//       faculty.assignedHours += assignedHours;
//       faculty.remainingHours = faculty.maxHours - faculty.assignedHours;
//       saveToStorage(STORAGE_KEYS.FACULTY, AppState.faculty);
//     }
//   },
  
//   // ============ PREFERENCE FUNCTIONS ============
//   getPreferenceByFacultyId: (facultyId) => {
//     return AppState.subjectPreferences.find(p => p.facultyId === facultyId);
//   },
  
//   submitSubjectPreferences: (facultyId, preferences) => {
//     const pref = AppState.subjectPreferences.find(p => p.facultyId === facultyId);
//     if (pref) {
//       pref.submitted = true;
//       pref.preferences = preferences;
//       pref.status = "pending";
//       pref.feedback = "";
//       saveToStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, AppState.subjectPreferences);
//     }
//   },
  
//   updatePreferenceStatus: (facultyId, status, feedback = "", allocatedSubjects = []) => {
//     const pref = AppState.subjectPreferences.find(p => p.facultyId === facultyId);
//     if (pref) {
//       pref.status = status;
//       pref.feedback = feedback;
      
//       if (status === "approved" && allocatedSubjects.length > 0) {
//         pref.allocatedSubjects = allocatedSubjects;
        
//         allocatedSubjects.forEach(subjectId => {
//           const subject = AppState.subjects.find(s => s.id === subjectId);
//           if (subject) {
//             AppState.updateFacultyRemainingHours(facultyId, subject.totalWeeklyClasses);
//           }
//         });
//       }
      
//       saveToStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, AppState.subjectPreferences);
//     }
//   },
  
//   resetPreferenceForm: (facultyId) => {
//     const pref = AppState.subjectPreferences.find(p => p.facultyId === facultyId);
//     if (pref) {
//       pref.submitted = false;
//       pref.status = "pending";
//       pref.feedback = "";
//       pref.preferences = [];
//       pref.allocatedSubjects = [];
//       saveToStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, AppState.subjectPreferences);
//     }
//   },
  
//   // ============ SEMESTER FUNCTIONS ============
//   updateSemesterDetails: (course, semester, details) => {
//     if (!AppState.semesterDetails[course]) {
//       AppState.semesterDetails[course] = {};
//     }
//     AppState.semesterDetails[course][semester] = details;
//     saveToStorage(STORAGE_KEYS.SEMESTER_DETAILS, AppState.semesterDetails);
//   },
  
//   getSubjectsForCourseAndSemester: (course, semester) => {
//     const details = AppState.semesterDetails[course]?.[semester];
//     if (!details) return [];
    
//     return details.subjects.map(subjectId => 
//       AppState.subjects.find(s => s.id === subjectId)
//     ).filter(s => s);
//   },
  
//   getSubjectsForFacultyCourse: (facultyId) => {
//     const faculty = AppState.getFacultyById(facultyId);
//     if (!faculty) return [];
    
//     const semesterDetails = AppState.semesterDetails[faculty.course];
//     if (!semesterDetails) return [];
    
//     const allSubjects = [];
//     for (const semester in semesterDetails) {
//       const subjects = semesterDetails[semester].subjects || [];
//       subjects.forEach(subjectId => {
//         const subject = AppState.subjects.find(s => s.id === subjectId);
//         if (subject && !allSubjects.find(s => s.id === subjectId)) {
//           allSubjects.push(subject);
//         }
//       });
//     }
//     return allSubjects;
//   },
  
//   // ============ COURSE DETAILS FUNCTIONS ============
//   submitCourseDetails: (facultyId, courses) => {
//     const coursesWithStatus = courses.map(course => ({
//       ...course,
//       deanStatus: "pending",
//       coordinatorStatus: "pending",
//       deanFeedback: "",
//       coordinatorFeedback: ""
//     }));
    
//     AppState.courseDetails = AppState.courseDetails.filter(c => c.facultyId !== facultyId);
//     AppState.courseDetails.push(...coursesWithStatus);
//     saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
    
//     courses.forEach(course => {
//       const subject = AppState.subjects.find(s => s.id === course.subjectId);
//       if (subject) {
//         const progressKey = `${facultyId}_${course.subjectId}`;
//         AppState.syllabusProgress[progressKey] = {
//           facultyId,
//           facultyName: AppState.getFacultyById(facultyId)?.name,
//           subjectId: course.subjectId,
//           subjectName: subject.name,
//           subjectCode: subject.code,
//           course: course.course,
//           semester: course.semester,
//           sections: course.sections,
//           totalModules: course.modules,
//           completedModules: 0,
//           modules: Array(course.modules).fill(false),
//           lastUpdated: new Date().toISOString(),
//           completionPercentage: 0
//         };
//       }
//     });
//     saveToStorage(STORAGE_KEYS.SYLLABUS_PROGRESS, AppState.syllabusProgress);
//   },
  
//   updateCourseDetailCoordinatorStatus: (courseId, status, feedback = "") => {
//     const course = AppState.courseDetails.find(c => c.id === courseId);
//     if (course) {
//       course.coordinatorStatus = status;
//       course.coordinatorFeedback = feedback;
//       saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
//     }
//   },
  
//   updateCourseDetailDeanStatus: (courseId, status, feedback = "") => {
//     const course = AppState.courseDetails.find(c => c.id === courseId);
//     if (course) {
//       course.deanStatus = status;
//       course.deanFeedback = feedback;
//       saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
      
//       if (status === "approved") {
//         AppState.checkSyllabusDiscrepancy(course.facultyId, course.subjectId);
//       }
//     }
//   },
  
//   getPendingCoordinatorApprovals: () => {
//     return AppState.courseDetails.filter(c => 
//       c.coordinatorStatus === "pending"
//     );
//   },
  
//   getPendingDeanApprovals: () => {
//     return AppState.courseDetails.filter(c => 
//       c.coordinatorStatus === "approved" && 
//       c.deanStatus === "pending"
//     );
//   },
  
//   // ============ SYLLABUS & PROGRESS FUNCTIONS ============
//   getSyllabusProgress: (facultyId, subjectId) => {
//     const progressKey = `${facultyId}_${subjectId}`;
//     return AppState.syllabusProgress[progressKey] || null;
//   },
  
//   getSyllabusProgressForSubject: (subjectId) => {
//     for (const key in AppState.syllabusProgress) {
//       if (key.includes(subjectId)) {
//         return AppState.syllabusProgress[key];
//       }
//     }
//     return null;
//   },
  
//   updateSyllabusProgress: (facultyId, subjectId, moduleIndex, completed) => {
//     const progressKey = `${facultyId}_${subjectId}`;
//     if (AppState.syllabusProgress[progressKey]) {
//       const progress = AppState.syllabusProgress[progressKey];
//       progress.modules[moduleIndex] = completed;
//       progress.completedModules = progress.modules.filter(m => m).length;
//       progress.lastUpdated = new Date().toISOString();
//       progress.completionPercentage = calculateSyllabusProgress(
//         progress.completedModules, 
//         progress.totalModules
//       );
      
//       saveToStorage(STORAGE_KEYS.SYLLABUS_PROGRESS, AppState.syllabusProgress);
//       AppState.checkSyllabusDiscrepancy(facultyId, subjectId);
//     }
//   },
  
//   updateStudentProgress: (studentId, subjectId, moduleIndex, completed) => {
//     const key = `${studentId}_${subjectId}`;
//     if (!AppState.studentProgress[key]) {
//       const subject = AppState.subjects.find(s => s.id === subjectId);
//       AppState.studentProgress[key] = {
//         studentId,
//         subjectId,
//         subjectName: subject?.name,
//         totalModules: subject?.modules || 0,
//         completedModules: 0,
//         modules: Array(subject?.modules || 0).fill(false),
//         lastUpdated: new Date().toISOString(),
//       };
//     }
    
//     const progress = AppState.studentProgress[key];
//     progress.modules[moduleIndex] = completed;
//     progress.completedModules = progress.modules.filter(m => m).length;
//     progress.lastUpdated = new Date().toISOString();
    
//     saveToStorage(STORAGE_KEYS.STUDENT_PROGRESS, AppState.studentProgress);
//     AppState.checkSyllabusDiscrepancyForStudent(studentId, subjectId);
//   },
  
//   getStudentProgress: (studentId, subjectId) => {
//     const key = `${studentId}_${subjectId}`;
//     return AppState.studentProgress[key] || null;
//   },
  
//   checkSyllabusDiscrepancy: (facultyId, subjectId) => {
//     const facultyProgress = AppState.getSyllabusProgress(facultyId, subjectId);
//     if (!facultyProgress) return;
    
//     for (const key in AppState.studentProgress) {
//       if (key.includes(subjectId)) {
//         const studentProgress = AppState.studentProgress[key];
//         const facultyCompleted = facultyProgress.completedModules;
//         const studentCompleted = studentProgress.completedModules;
//         const threshold = Math.ceil(facultyProgress.totalModules * 0.1);
        
//         if (Math.abs(facultyCompleted - studentCompleted) > threshold) {
//           const issue = {
//             id: Date.now() + Math.random(),
//             type: "student_faculty_discrepancy",
//             subjectId,
//             subjectName: facultyProgress.subjectName,
//             facultyProgress: facultyCompleted,
//             studentProgress: studentCompleted,
//             facultyId,
//             studentId: studentProgress.studentId,
//             timestamp: new Date().toISOString(),
//             resolved: false
//           };
          
//           const exists = AppState.flaggedIssues.some(i => 
//             i.type === "student_faculty_discrepancy" && 
//             i.subjectId === subjectId && 
//             i.facultyId === facultyId &&
//             i.studentId === studentProgress.studentId &&
//             !i.resolved
//           );
          
//           if (!exists) {
//             AppState.flaggedIssues.push(issue);
//             saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
//           }
//         }
//       }
//     }
//   },
  
//   checkSyllabusDiscrepancyForStudent: (studentId, subjectId) => {
//     const studentProgress = AppState.getStudentProgress(studentId, subjectId);
//     if (!studentProgress) return;
    
//     const facultyProgress = AppState.getSyllabusProgressForSubject(subjectId);
//     if (facultyProgress) {
//       const facultyCompleted = facultyProgress.completedModules;
//       const studentCompleted = studentProgress.completedModules;
//       const threshold = Math.ceil(studentProgress.totalModules * 0.1);
      
//       if (Math.abs(facultyCompleted - studentCompleted) > threshold) {
//         const issue = {
//           id: Date.now(),
//           type: "student_faculty_discrepancy",
//           subjectId,
//           subjectName: studentProgress.subjectName,
//           facultyProgress: facultyCompleted,
//           studentProgress: studentCompleted,
//           facultyId: facultyProgress.facultyId,
//           studentId,
//           timestamp: new Date().toISOString(),
//           resolved: false
//         };
        
//         const exists = AppState.flaggedIssues.some(i => 
//           i.type === "student_faculty_discrepancy" && 
//           i.subjectId === subjectId && 
//           i.facultyId === facultyProgress.facultyId &&
//           i.studentId === studentId &&
//           !i.resolved
//         );
        
//         if (!exists) {
//           AppState.flaggedIssues.push(issue);
//           saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
//         }
//       }
//     }
//   },
  
//   // ============ TIMETABLE FUNCTIONS ============
//   generateTimeSlots: (config) => {
//     return generateTimeSlotsUtil(config);
//   },
  
//   updateTimetableConfig: (config) => {
//     AppState.timetableConfig = config;
//     saveToStorage(STORAGE_KEYS.TIMETABLE_CONFIG, config);
//   },
  
//   generateTimetable: () => {
//     console.log("=== GENERATE TIMETABLE CALLED ===");
    
//     // Get approved courses
//     const approvedCourses = AppState.courseDetails.filter(c => c.deanStatus === "approved");
//     console.log("Approved courses count:", approvedCourses.length);
    
//     if (approvedCourses.length === 0) {
//       console.warn("No approved courses found");
//       return [];
//     }
    
//     const config = AppState.timetableConfig;
//     console.log("Using config:", config);
    
//     // Generate time slots with lunch break
//     const timeSlots = AppState.generateTimeSlots(config);
//     // Only use non-lunch slots for scheduling classes
//     const validTimeSlots = timeSlots.filter(s => !s.isLunch).map(s => s.time);
    
//     console.log("Total time slots:", timeSlots.length);
//     console.log("Lunch slots:", timeSlots.filter(s => s.isLunch).length);
//     console.log("Valid class slots:", validTimeSlots.length);
    
//     const timetable = [];
//     let id = 1;
//     const facultySchedule = {};
//     const roomSchedule = {};
    
//     // For each course, semester, and section
//     COURSES.forEach(course => {
//       SEMESTERS.forEach(semester => {
//         SECTIONS.forEach(section => {
//           const sectionCourses = approvedCourses.filter(c => 
//             c.course === course && c.semester === semester
//           );
          
//           sectionCourses.forEach(courseDetail => {
//             const subject = AppState.subjects.find(s => s.id === courseDetail.subjectId);
//             if (!subject) {
//               console.warn(`Subject not found: ${courseDetail.subjectId}`);
//               return;
//             }
            
//             const faculty = AppState.faculty.find(f => f.id === courseDetail.facultyId);
//             if (!faculty) {
//               console.warn(`Faculty not found: ${courseDetail.facultyId}`);
//               return;
//             }
            
//             console.log(`Processing ${subject.name} for ${faculty.name} - ${course} Sem ${semester} Sec ${section}`);
            
//             // Allocate theory classes
//             for (let i = 0; i < subject.theoryClassesPerWeek; i++) {
//               let allocated = false;
//               let attempts = 0;
              
//               while (!allocated && attempts < 100) {
//                 const day = config.days[Math.floor(Math.random() * config.days.length)];
//                 const timeSlot = Math.floor(Math.random() * validTimeSlots.length);
//                 const time = validTimeSlots[timeSlot];
                
//                 const facultyKey = `${day}_${time}_${faculty.id}`;
//                 if (facultySchedule[facultyKey]) {
//                   attempts++;
//                   continue;
//                 }
                
//                 let availableRoom = null;
//                 const theoryRooms = AppState.rooms.filter(r => r.type === "Theory");
                
//                 for (const room of theoryRooms) {
//                   const roomKey = `${day}_${time}_${room.name}`;
//                   if (!roomSchedule[roomKey]) {
//                     availableRoom = room;
//                     break;
//                   }
//                 }
                
//                 if (!availableRoom) {
//                   attempts++;
//                   continue;
//                 }
                
//                 timetable.push({
//                   id: id++,
//                   course,
//                   semester,
//                   section,
//                   day,
//                   time,
//                   subject: subject.name,
//                   subjectId: subject.id,
//                   subjectCode: subject.code,
//                   facultyId: faculty.id,
//                   facultyName: faculty.name,
//                   facultyAvatar: faculty.avatar,
//                   room: availableRoom.name,
//                   type: "theory",
//                   color: faculty.color
//                 });
                
//                 facultySchedule[facultyKey] = true;
//                 roomSchedule[`${day}_${time}_${availableRoom.name}`] = true;
//                 allocated = true;
//               }
//             }
            
//             // Allocate lab periods (consecutive periods)
//             if (subject.labPeriodsPerWeek > 0) {
//               for (let i = 0; i < subject.labPeriodsPerWeek; i += 2) {
//                 let allocated = false;
//                 let attempts = 0;
                
//                 while (!allocated && attempts < 100) {
//                   const day = config.days[Math.floor(Math.random() * config.days.length)];
//                   const timeSlot = Math.floor(Math.random() * (validTimeSlots.length - 1));
//                   const time1 = validTimeSlots[timeSlot];
//                   const time2 = validTimeSlots[timeSlot + 1];
                  
//                   const facultyKey1 = `${day}_${time1}_${faculty.id}`;
//                   const facultyKey2 = `${day}_${time2}_${faculty.id}`;
                  
//                   if (facultySchedule[facultyKey1] || facultySchedule[facultyKey2]) {
//                     attempts++;
//                     continue;
//                   }
                  
//                   let availableRoom = null;
//                   const labRooms = AppState.rooms.filter(r => r.type === "Lab");
                  
//                   for (const room of labRooms) {
//                     const roomKey1 = `${day}_${time1}_${room.name}`;
//                     const roomKey2 = `${day}_${time2}_${room.name}`;
                    
//                     if (!roomSchedule[roomKey1] && !roomSchedule[roomKey2]) {
//                       availableRoom = room;
//                       break;
//                     }
//                   }
                  
//                   if (!availableRoom) {
//                     attempts++;
//                     continue;
//                   }
                  
//                   const labSlot1 = {
//                     id: id++,
//                     course,
//                     semester,
//                     section,
//                     day,
//                     time: time1,
//                     subject: `${subject.name} Lab`,
//                     subjectId: subject.id,
//                     subjectCode: subject.code,
//                     facultyId: faculty.id,
//                     facultyName: faculty.name,
//                     facultyAvatar: faculty.avatar,
//                     room: availableRoom.name,
//                     type: "lab",
//                     color: faculty.color
//                   };
                  
//                   const labSlot2 = {
//                     ...labSlot1,
//                     id: id++,
//                     time: time2
//                   };
                  
//                   timetable.push(labSlot1, labSlot2);
//                   facultySchedule[facultyKey1] = true;
//                   facultySchedule[facultyKey2] = true;
//                   roomSchedule[`${day}_${time1}_${availableRoom.name}`] = true;
//                   roomSchedule[`${day}_${time2}_${availableRoom.name}`] = true;
//                   allocated = true;
//                 }
//               }
//             }
//           });
//         });
//       });
//     });
    
//     console.log(`Generated ${timetable.length} timetable slots`);
//     AppState.timetable = timetable;
//     saveToStorage(STORAGE_KEYS.TIMETABLE, timetable);
    
//     return timetable;
//   },
  
//   getFacultySchedule: (facultyId) => {
//     return AppState.timetable.filter(t => t.facultyId === facultyId);
//   },
  
//   getStudentSchedule: (course, semester, section) => {
//     return AppState.timetable.filter(t => 
//       t.course === course && 
//       t.semester === semester && 
//       t.section === section
//     );
//   },
  
//   checkAllConflicts: () => {
//     const conflicts = [];
    
//     for (let i = 0; i < AppState.timetable.length; i++) {
//       for (let j = i + 1; j < AppState.timetable.length; j++) {
//         const a = AppState.timetable[i];
//         const b = AppState.timetable[j];
        
//         if (a.day === b.day && a.time === b.time) {
//           if (a.facultyId === b.facultyId) {
//             conflicts.push({
//               type: "faculty",
//               message: `${a.facultyName} assigned to both ${a.subject} and ${b.subject} at ${a.day} ${a.time}`
//             });
//           }
          
//           if (a.room === b.room) {
//             conflicts.push({
//               type: "room",
//               message: `Room ${a.room} assigned to both ${a.subject} and ${b.subject} at ${a.day} ${a.time}`
//             });
//           }
//         }
//       }
//     }
    
//     return conflicts;
//   },
  
//   // ============ FLAGGED ISSUES FUNCTIONS ============
//   getFlaggedIssues: () => {
//     return AppState.flaggedIssues.filter(issue => !issue.resolved);
//   },
  
//   resolveFlaggedIssue: (issueId) => {
//     const issue = AppState.flaggedIssues.find(i => i.id === issueId);
//     if (issue) {
//       issue.resolved = true;
//       saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
//     }
//   },
  
//   // ============ INITIALIZATION ============
//   initializeStorage: () => {
//     const keys = [
//       STORAGE_KEYS.FACULTY, 
//       STORAGE_KEYS.SUBJECTS, 
//       STORAGE_KEYS.SUBJECT_PREFERENCES,
//       STORAGE_KEYS.ROOMS, 
//       STORAGE_KEYS.TIMETABLE_CONFIG, 
//       STORAGE_KEYS.SEMESTER_DETAILS,
//       STORAGE_KEYS.FLAGGED_ISSUES, 
//       STORAGE_KEYS.STUDENT_PROGRESS, 
//       STORAGE_KEYS.DEAN_APPROVALS,
//       STORAGE_KEYS.LEAVE_REQUESTS, 
//       STORAGE_KEYS.CALENDAR_EVENTS,
//       STORAGE_KEYS.COURSE_DETAILS,
//       STORAGE_KEYS.TIMETABLE,
//       STORAGE_KEYS.SYLLABUS_PROGRESS
//     ];
    
//     const defaultValues = {
//       [STORAGE_KEYS.FACULTY]: DEFAULT_FACULTY,
//       [STORAGE_KEYS.SUBJECTS]: DEFAULT_SUBJECTS,
//       [STORAGE_KEYS.SUBJECT_PREFERENCES]: DEFAULT_SUBJECT_PREFERENCES,
//       [STORAGE_KEYS.ROOMS]: DEFAULT_ROOMS,
//       [STORAGE_KEYS.TIMETABLE_CONFIG]: DEFAULT_TIMETABLE_CONFIG,
//       [STORAGE_KEYS.SEMESTER_DETAILS]: DEFAULT_SEMESTER_DETAILS,
//       [STORAGE_KEYS.FLAGGED_ISSUES]: [],
//       [STORAGE_KEYS.STUDENT_PROGRESS]: {},
//       [STORAGE_KEYS.DEAN_APPROVALS]: {},
//       [STORAGE_KEYS.LEAVE_REQUESTS]: [],
//       [STORAGE_KEYS.CALENDAR_EVENTS]: DEFAULT_CALENDAR_EVENTS,
//       [STORAGE_KEYS.COURSE_DETAILS]: [],
//       [STORAGE_KEYS.TIMETABLE]: [],
//       [STORAGE_KEYS.SYLLABUS_PROGRESS]: {}
//     };
    
//     keys.forEach(key => {
//       if (!localStorage.getItem(key) && defaultValues[key] !== undefined) {
//         saveToStorage(key, defaultValues[key]);
//       }
//     });
    
//     // Ensure timetable config has proper lunch break
//     const currentConfig = loadFromStorage(STORAGE_KEYS.TIMETABLE_CONFIG, DEFAULT_TIMETABLE_CONFIG);
//     if (!currentConfig.lunchBreak) {
//       currentConfig.lunchBreak = { start: "12:30", duration: 40 };
//       saveToStorage(STORAGE_KEYS.TIMETABLE_CONFIG, currentConfig);
//       AppState.timetableConfig = currentConfig;
//     }
//   },
// };

// // Initialize storage on load
// AppState.initializeStorage();

// // Make AppState available globally for debugging
// if (typeof window !== 'undefined') {
//   window.AppState = AppState;
// }

// // src/AppState.js
// import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "./utils/storage";
// import { 
//   DEFAULT_FACULTY, 
//   DEFAULT_SUBJECTS, 
//   DEFAULT_SUBJECT_PREFERENCES, 
//   DEFAULT_ROOMS, 
//   DEFAULT_TIMETABLE_CONFIG, 
//   DEFAULT_SEMESTER_DETAILS,
//   DEFAULT_CALENDAR_EVENTS,
//   COURSES,
//   SEMESTERS,
//   SECTIONS
// } from "./data/mockData";

// // Helper function to calculate syllabus progress
// const calculateSyllabusProgress = (completedModules, totalModules) => {
//   return totalModules > 0 ? (completedModules / totalModules) * 100 : 0;
// };

// // Helper function to generate time slots with lunch break
// const generateTimeSlotsUtil = (config) => {
//   const slots = [];
//   const start = new Date(`1970-01-01T${config.startTime}:00`);
//   const end = new Date(`1970-01-01T${config.endTime}:00`);
  
//   let current = new Date(start);
//   let periodNumber = 1;
  
//   const lunchStart = new Date(`1970-01-01T${config.lunchBreak.start}:00`);
//   const lunchEnd = new Date(lunchStart.getTime() + config.lunchBreak.duration * 60000);
  
//   while (current < end) {
//     const timeStr = current.toTimeString().substring(0, 5);
//     const endTime = new Date(current.getTime() + config.classDuration * 60000);
//     const endTimeStr = endTime.toTimeString().substring(0, 5);
    
//     if (current >= lunchStart && current < lunchEnd) {
//       slots.push({
//         time: timeStr,
//         endTime: endTimeStr,
//         period: "LUNCH",
//         isLunch: true,
//         label: "LUNCH BREAK"
//       });
//       current = new Date(lunchEnd);
//     } else {
//       slots.push({
//         time: timeStr,
//         endTime: endTimeStr,
//         period: `P${periodNumber}`,
//         isLunch: false,
//         label: `${timeStr} - ${endTimeStr}`
//       });
//       periodNumber++;
//       current = new Date(current.getTime() + config.classDuration * 60000 + config.breakDuration * 60000);
//     }
//   }
  
//   return slots;
// };

// export const AppState = {
//   // Data stores
//   faculty: loadFromStorage(STORAGE_KEYS.FACULTY, DEFAULT_FACULTY),
//   subjects: loadFromStorage(STORAGE_KEYS.SUBJECTS, DEFAULT_SUBJECTS),
//   subjectPreferences: loadFromStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, DEFAULT_SUBJECT_PREFERENCES),
//   courseDetails: loadFromStorage(STORAGE_KEYS.COURSE_DETAILS, []),
//   timetable: loadFromStorage(STORAGE_KEYS.TIMETABLE, []),
//   syllabusProgress: loadFromStorage(STORAGE_KEYS.SYLLABUS_PROGRESS, {}),
//   rooms: loadFromStorage(STORAGE_KEYS.ROOMS, DEFAULT_ROOMS),
//   timetableConfig: loadFromStorage(STORAGE_KEYS.TIMETABLE_CONFIG, DEFAULT_TIMETABLE_CONFIG),
//   semesterDetails: loadFromStorage(STORAGE_KEYS.SEMESTER_DETAILS, DEFAULT_SEMESTER_DETAILS),
//   flaggedIssues: loadFromStorage(STORAGE_KEYS.FLAGGED_ISSUES, []),
//   studentProgress: loadFromStorage(STORAGE_KEYS.STUDENT_PROGRESS, {}),
//   deanApprovals: loadFromStorage(STORAGE_KEYS.DEAN_APPROVALS, {}),
  
//   // ============ FACULTY FUNCTIONS ============
//   getFacultyById: (id) => {
//     return AppState.faculty.find(f => f.id === id);
//   },
  
//   getCourseDetailsByFacultyId: (facultyId) => {
//     return AppState.courseDetails.filter(c => c.facultyId === facultyId);
//   },
  
//   updateFacultyRemainingHours: (facultyId, assignedHours) => {
//     const faculty = AppState.faculty.find(f => f.id === facultyId);
//     if (faculty) {
//       faculty.assignedHours += assignedHours;
//       faculty.remainingHours = faculty.maxHours - faculty.assignedHours;
//       saveToStorage(STORAGE_KEYS.FACULTY, AppState.faculty);
//     }
//   },
  
//   // ============ PREFERENCE FUNCTIONS ============
//   getPreferenceByFacultyId: (facultyId) => {
//     return AppState.subjectPreferences.find(p => p.facultyId === facultyId);
//   },
  
//   submitSubjectPreferences: (facultyId, preferences) => {
//     const pref = AppState.subjectPreferences.find(p => p.facultyId === facultyId);
//     if (pref) {
//       pref.submitted = true;
//       pref.preferences = preferences;
//       pref.status = "pending";
//       pref.feedback = "";
//       saveToStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, AppState.subjectPreferences);
//     }
//   },
  
//   updatePreferenceStatus: (facultyId, status, feedback = "", allocatedSubjects = []) => {
//     const pref = AppState.subjectPreferences.find(p => p.facultyId === facultyId);
//     if (pref) {
//       pref.status = status;
//       pref.feedback = feedback;
      
//       if (status === "approved" && allocatedSubjects.length > 0) {
//         pref.allocatedSubjects = allocatedSubjects;
        
//         allocatedSubjects.forEach(subjectId => {
//           const subject = AppState.subjects.find(s => s.id === subjectId);
//           if (subject) {
//             AppState.updateFacultyRemainingHours(facultyId, subject.totalWeeklyClasses);
//           }
//         });
//       }
      
//       saveToStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, AppState.subjectPreferences);
//     }
//   },
  
//   resetPreferenceForm: (facultyId) => {
//     const pref = AppState.subjectPreferences.find(p => p.facultyId === facultyId);
//     if (pref) {
//       pref.submitted = false;
//       pref.status = "pending";
//       pref.feedback = "";
//       pref.preferences = [];
//       pref.allocatedSubjects = [];
//       saveToStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, AppState.subjectPreferences);
//     }
//   },
  
//   // ============ SEMESTER FUNCTIONS ============
//   updateSemesterDetails: (course, semester, details) => {
//     if (!AppState.semesterDetails[course]) {
//       AppState.semesterDetails[course] = {};
//     }
//     AppState.semesterDetails[course][semester] = details;
//     saveToStorage(STORAGE_KEYS.SEMESTER_DETAILS, AppState.semesterDetails);
//   },
  
//   getSubjectsForCourseAndSemester: (course, semester) => {
//     const details = AppState.semesterDetails[course]?.[semester];
//     if (!details) return [];
    
//     return details.subjects.map(subjectId => 
//       AppState.subjects.find(s => s.id === subjectId)
//     ).filter(s => s && s.approvalStatus === "approved");
//   },
  
//   // ============ COURSE DETAILS FUNCTIONS ============
//   submitCourseDetails: (facultyId, courses) => {
//     const coursesWithStatus = courses.map(course => ({
//       ...course,
//       deanStatus: "pending",
//       coordinatorStatus: "pending",
//       deanFeedback: "",
//       coordinatorFeedback: ""
//     }));
    
//     AppState.courseDetails = AppState.courseDetails.filter(c => c.facultyId !== facultyId);
//     AppState.courseDetails.push(...coursesWithStatus);
//     saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
    
//     courses.forEach(course => {
//       const subject = AppState.subjects.find(s => s.id === course.subjectId);
//       if (subject) {
//         const progressKey = `${facultyId}_${course.subjectId}`;
//         AppState.syllabusProgress[progressKey] = {
//           facultyId,
//           facultyName: AppState.getFacultyById(facultyId)?.name,
//           subjectId: course.subjectId,
//           subjectName: subject.name,
//           subjectCode: subject.code,
//           course: course.course,
//           semester: course.semester,
//           sections: course.sections,
//           totalModules: course.modules,
//           completedModules: 0,
//           modules: Array(course.modules).fill(false),
//           lastUpdated: new Date().toISOString(),
//           completionPercentage: 0
//         };
//       }
//     });
//     saveToStorage(STORAGE_KEYS.SYLLABUS_PROGRESS, AppState.syllabusProgress);
//   },
  
//   updateCourseDetailCoordinatorStatus: (courseId, status, feedback = "") => {
//     const course = AppState.courseDetails.find(c => c.id === courseId);
//     if (course) {
//       course.coordinatorStatus = status;
//       course.coordinatorFeedback = feedback;
//       saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
//     }
//   },
  
//   updateCourseDetailDeanStatus: (courseId, status, feedback = "") => {
//     const course = AppState.courseDetails.find(c => c.id === courseId);
//     if (course) {
//       course.deanStatus = status;
//       course.deanFeedback = feedback;
//       saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
      
//       if (status === "approved") {
//         AppState.checkSyllabusDiscrepancy(course.facultyId, course.subjectId);
//       }
//     }
//   },
  
//   getPendingCoordinatorApprovals: () => {
//     return AppState.courseDetails.filter(c => 
//       c.coordinatorStatus === "pending"
//     );
//   },
  
//   getPendingDeanApprovals: () => {
//     return AppState.courseDetails.filter(c => 
//       c.coordinatorStatus === "approved" && 
//       c.deanStatus === "pending"
//     );
//   },
  
//   // ============ SYLLABUS & PROGRESS FUNCTIONS ============
//   getSyllabusProgress: (facultyId, subjectId) => {
//     const progressKey = `${facultyId}_${subjectId}`;
//     return AppState.syllabusProgress[progressKey] || null;
//   },
  
//   updateSyllabusProgress: (facultyId, subjectId, moduleIndex, completed) => {
//     const progressKey = `${facultyId}_${subjectId}`;
//     if (AppState.syllabusProgress[progressKey]) {
//       const progress = AppState.syllabusProgress[progressKey];
//       progress.modules[moduleIndex] = completed;
//       progress.completedModules = progress.modules.filter(m => m).length;
//       progress.lastUpdated = new Date().toISOString();
//       progress.completionPercentage = calculateSyllabusProgress(
//         progress.completedModules, 
//         progress.totalModules
//       );
      
//       saveToStorage(STORAGE_KEYS.SYLLABUS_PROGRESS, AppState.syllabusProgress);
//       AppState.checkSyllabusDiscrepancy(facultyId, subjectId);
//     }
//   },
  
//   updateStudentProgress: (studentId, subjectId, moduleIndex, completed) => {
//     const key = `${studentId}_${subjectId}`;
//     if (!AppState.studentProgress[key]) {
//       const subject = AppState.subjects.find(s => s.id === subjectId);
//       AppState.studentProgress[key] = {
//         studentId,
//         subjectId,
//         subjectName: subject?.name,
//         totalModules: subject?.modules || 0,
//         completedModules: 0,
//         modules: Array(subject?.modules || 0).fill(false),
//         lastUpdated: new Date().toISOString(),
//       };
//     }
    
//     const progress = AppState.studentProgress[key];
//     progress.modules[moduleIndex] = completed;
//     progress.completedModules = progress.modules.filter(m => m).length;
//     progress.lastUpdated = new Date().toISOString();
    
//     saveToStorage(STORAGE_KEYS.STUDENT_PROGRESS, AppState.studentProgress);
//     AppState.checkSyllabusDiscrepancyForStudent(studentId, subjectId);
//   },
  
//   getStudentProgress: (studentId, subjectId) => {
//     const key = `${studentId}_${subjectId}`;
//     return AppState.studentProgress[key] || null;
//   },
  
//   checkSyllabusDiscrepancy: (facultyId, subjectId) => {
//     const facultyProgress = AppState.getSyllabusProgress(facultyId, subjectId);
//     if (!facultyProgress) return;
    
//     for (const key in AppState.studentProgress) {
//       if (key.includes(subjectId)) {
//         const studentProgress = AppState.studentProgress[key];
//         const facultyCompleted = facultyProgress.completedModules;
//         const studentCompleted = studentProgress.completedModules;
//         const threshold = Math.ceil(facultyProgress.totalModules * 0.1);
        
//         if (Math.abs(facultyCompleted - studentCompleted) > threshold) {
//           const issue = {
//             id: Date.now() + Math.random(),
//             type: "student_faculty_discrepancy",
//             subjectId,
//             subjectName: facultyProgress.subjectName,
//             facultyProgress: facultyCompleted,
//             studentProgress: studentCompleted,
//             facultyId,
//             studentId: studentProgress.studentId,
//             timestamp: new Date().toISOString(),
//             resolved: false
//           };
          
//           const exists = AppState.flaggedIssues.some(i => 
//             i.type === "student_faculty_discrepancy" && 
//             i.subjectId === subjectId && 
//             i.facultyId === facultyId &&
//             i.studentId === studentProgress.studentId &&
//             !i.resolved
//           );
          
//           if (!exists) {
//             AppState.flaggedIssues.push(issue);
//             saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
//           }
//         }
//       }
//     }
//   },
  
//   checkSyllabusDiscrepancyForStudent: (studentId, subjectId) => {
//     const studentProgress = AppState.getStudentProgress(studentId, subjectId);
//     if (!studentProgress) return;
    
//     const facultyProgress = AppState.getSyllabusProgressForSubject(subjectId);
//     if (facultyProgress) {
//       const facultyCompleted = facultyProgress.completedModules;
//       const studentCompleted = studentProgress.completedModules;
//       const threshold = Math.ceil(studentProgress.totalModules * 0.1);
      
//       if (Math.abs(facultyCompleted - studentCompleted) > threshold) {
//         const issue = {
//           id: Date.now(),
//           type: "student_faculty_discrepancy",
//           subjectId,
//           subjectName: studentProgress.subjectName,
//           facultyProgress: facultyCompleted,
//           studentProgress: studentCompleted,
//           facultyId: facultyProgress.facultyId,
//           studentId,
//           timestamp: new Date().toISOString(),
//           resolved: false
//         };
        
//         const exists = AppState.flaggedIssues.some(i => 
//           i.type === "student_faculty_discrepancy" && 
//           i.subjectId === subjectId && 
//           i.facultyId === facultyProgress.facultyId &&
//           i.studentId === studentId &&
//           !i.resolved
//         );
        
//         if (!exists) {
//           AppState.flaggedIssues.push(issue);
//           saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
//         }
//       }
//     }
//   },
  
//   getSyllabusProgressForSubject: (subjectId) => {
//     for (const key in AppState.syllabusProgress) {
//       if (key.includes(subjectId)) {
//         return AppState.syllabusProgress[key];
//       }
//     }
//     return null;
//   },
  
//   // ============ TIMETABLE FUNCTIONS ============
//   generateTimeSlots: (config) => {
//     return generateTimeSlotsUtil(config);
//   },
  
//   updateTimetableConfig: (config) => {
//     AppState.timetableConfig = config;
//     saveToStorage(STORAGE_KEYS.TIMETABLE_CONFIG, config);
//   },
  
//   generateTimetable: () => {
//     const approvedCourses = AppState.courseDetails.filter(c => c.deanStatus === "approved");
    
//     if (approvedCourses.length === 0) {
//       console.warn("No approved courses found");
//       return [];
//     }
    
//     const config = AppState.timetableConfig;
//     const timeSlots = AppState.generateTimeSlots(config);
//     const validTimeSlots = timeSlots.filter(s => !s.isLunch).map(s => s.time);
    
//     const timetable = [];
//     let id = 1;
//     const facultySchedule = {};
//     const roomSchedule = {};
    
//     COURSES.forEach(course => {
//       SEMESTERS.forEach(semester => {
//         SECTIONS.forEach(section => {
//           const sectionCourses = approvedCourses.filter(c => 
//             c.course === course && c.semester === semester
//           );
          
//           sectionCourses.forEach(courseDetail => {
//             const subject = AppState.subjects.find(s => s.id === courseDetail.subjectId);
//             if (!subject) return;
            
//             const faculty = AppState.faculty.find(f => f.id === courseDetail.facultyId);
//             if (!faculty) return;
            
//             for (let i = 0; i < subject.theoryClassesPerWeek; i++) {
//               let allocated = false;
//               let attempts = 0;
              
//               while (!allocated && attempts < 100) {
//                 const day = config.days[Math.floor(Math.random() * config.days.length)];
//                 const timeSlot = Math.floor(Math.random() * validTimeSlots.length);
//                 const time = validTimeSlots[timeSlot];
                
//                 const facultyKey = `${day}_${time}_${faculty.id}`;
//                 if (facultySchedule[facultyKey]) {
//                   attempts++;
//                   continue;
//                 }
                
//                 let availableRoom = null;
//                 const theoryRooms = AppState.rooms.filter(r => r.type === "Theory");
                
//                 for (const room of theoryRooms) {
//                   const roomKey = `${day}_${time}_${room.name}`;
//                   if (!roomSchedule[roomKey]) {
//                     availableRoom = room;
//                     break;
//                   }
//                 }
                
//                 if (!availableRoom) {
//                   attempts++;
//                   continue;
//                 }
                
//                 timetable.push({
//                   id: id++,
//                   course,
//                   semester,
//                   section,
//                   day,
//                   time,
//                   subject: subject.name,
//                   subjectId: subject.id,
//                   subjectCode: subject.code,
//                   facultyId: faculty.id,
//                   facultyName: faculty.name,
//                   facultyAvatar: faculty.avatar,
//                   room: availableRoom.name,
//                   type: "theory",
//                   color: faculty.color
//                 });
                
//                 facultySchedule[facultyKey] = true;
//                 roomSchedule[`${day}_${time}_${availableRoom.name}`] = true;
//                 allocated = true;
//               }
//             }
            
//             if (subject.labPeriodsPerWeek > 0) {
//               for (let i = 0; i < subject.labPeriodsPerWeek; i += 2) {
//                 let allocated = false;
//                 let attempts = 0;
                
//                 while (!allocated && attempts < 100) {
//                   const day = config.days[Math.floor(Math.random() * config.days.length)];
//                   const timeSlot = Math.floor(Math.random() * (validTimeSlots.length - 1));
//                   const time1 = validTimeSlots[timeSlot];
//                   const time2 = validTimeSlots[timeSlot + 1];
                  
//                   const facultyKey1 = `${day}_${time1}_${faculty.id}`;
//                   const facultyKey2 = `${day}_${time2}_${faculty.id}`;
                  
//                   if (facultySchedule[facultyKey1] || facultySchedule[facultyKey2]) {
//                     attempts++;
//                     continue;
//                   }
                  
//                   let availableRoom = null;
//                   const labRooms = AppState.rooms.filter(r => r.type === "Lab");
                  
//                   for (const room of labRooms) {
//                     const roomKey1 = `${day}_${time1}_${room.name}`;
//                     const roomKey2 = `${day}_${time2}_${room.name}`;
                    
//                     if (!roomSchedule[roomKey1] && !roomSchedule[roomKey2]) {
//                       availableRoom = room;
//                       break;
//                     }
//                   }
                  
//                   if (!availableRoom) {
//                     attempts++;
//                     continue;
//                   }
                  
//                   timetable.push({
//                     id: id++,
//                     course,
//                     semester,
//                     section,
//                     day,
//                     time: time1,
//                     subject: `${subject.name} Lab`,
//                     subjectId: subject.id,
//                     subjectCode: subject.code,
//                     facultyId: faculty.id,
//                     facultyName: faculty.name,
//                     facultyAvatar: faculty.avatar,
//                     room: availableRoom.name,
//                     type: "lab",
//                     color: faculty.color
//                   });
                  
//                   timetable.push({
//                     id: id++,
//                     course,
//                     semester,
//                     section,
//                     day,
//                     time: time2,
//                     subject: `${subject.name} Lab`,
//                     subjectId: subject.id,
//                     subjectCode: subject.code,
//                     facultyId: faculty.id,
//                     facultyName: faculty.name,
//                     facultyAvatar: faculty.avatar,
//                     room: availableRoom.name,
//                     type: "lab",
//                     color: faculty.color
//                   });
                  
//                   facultySchedule[facultyKey1] = true;
//                   facultySchedule[facultyKey2] = true;
//                   roomSchedule[`${day}_${time1}_${availableRoom.name}`] = true;
//                   roomSchedule[`${day}_${time2}_${availableRoom.name}`] = true;
//                   allocated = true;
//                 }
//               }
//             }
//           });
//         });
//       });
//     });
    
//     AppState.timetable = timetable;
//     saveToStorage(STORAGE_KEYS.TIMETABLE, timetable);
    
//     return timetable;
//   },
  
//   getFacultySchedule: (facultyId) => {
//     return AppState.timetable.filter(t => t.facultyId === facultyId);
//   },
  
//   getStudentSchedule: (course, semester, section) => {
//     return AppState.timetable.filter(t => 
//       t.course === course && 
//       t.semester === semester && 
//       t.section === section
//     );
//   },
  
//   checkAllConflicts: () => {
//     const conflicts = [];
    
//     for (let i = 0; i < AppState.timetable.length; i++) {
//       for (let j = i + 1; j < AppState.timetable.length; j++) {
//         const a = AppState.timetable[i];
//         const b = AppState.timetable[j];
        
//         if (a.day === b.day && a.time === b.time) {
//           if (a.facultyId === b.facultyId) {
//             conflicts.push({
//               type: "faculty",
//               message: `${a.facultyName} assigned to both ${a.subject} and ${b.subject} at ${a.day} ${a.time}`
//             });
//           }
          
//           if (a.room === b.room) {
//             conflicts.push({
//               type: "room",
//               message: `Room ${a.room} assigned to both ${a.subject} and ${b.subject} at ${a.day} ${a.time}`
//             });
//           }
//         }
//       }
//     }
    
//     return conflicts;
//   },
  
//   // ============ FLAGGED ISSUES FUNCTIONS ============
//   getFlaggedIssues: () => {
//     return AppState.flaggedIssues.filter(issue => !issue.resolved);
//   },
  
//   resolveFlaggedIssue: (issueId) => {
//     const issue = AppState.flaggedIssues.find(i => i.id === issueId);
//     if (issue) {
//       issue.resolved = true;
//       saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
//     }
//   },
  
//   // ============ INITIALIZATION ============
//   initializeStorage: () => {
//     const keys = [
//       STORAGE_KEYS.FACULTY, STORAGE_KEYS.SUBJECTS, STORAGE_KEYS.SUBJECT_PREFERENCES,
//       STORAGE_KEYS.ROOMS, STORAGE_KEYS.TIMETABLE_CONFIG, STORAGE_KEYS.SEMESTER_DETAILS,
//       STORAGE_KEYS.FLAGGED_ISSUES, STORAGE_KEYS.STUDENT_PROGRESS, STORAGE_KEYS.DEAN_APPROVALS,
//       STORAGE_KEYS.LEAVE_REQUESTS, STORAGE_KEYS.CALENDAR_EVENTS, STORAGE_KEYS.COURSE_DETAILS,
//       STORAGE_KEYS.TIMETABLE, STORAGE_KEYS.SYLLABUS_PROGRESS
//     ];
    
//     const defaultValues = {
//       [STORAGE_KEYS.FACULTY]: DEFAULT_FACULTY,
//       [STORAGE_KEYS.SUBJECTS]: DEFAULT_SUBJECTS,
//       [STORAGE_KEYS.SUBJECT_PREFERENCES]: DEFAULT_SUBJECT_PREFERENCES,
//       [STORAGE_KEYS.ROOMS]: DEFAULT_ROOMS,
//       [STORAGE_KEYS.TIMETABLE_CONFIG]: DEFAULT_TIMETABLE_CONFIG,
//       [STORAGE_KEYS.SEMESTER_DETAILS]: DEFAULT_SEMESTER_DETAILS,
//       [STORAGE_KEYS.FLAGGED_ISSUES]: [],
//       [STORAGE_KEYS.STUDENT_PROGRESS]: {},
//       [STORAGE_KEYS.DEAN_APPROVALS]: {},
//       [STORAGE_KEYS.LEAVE_REQUESTS]: [],
//       [STORAGE_KEYS.CALENDAR_EVENTS]: DEFAULT_CALENDAR_EVENTS,
//       [STORAGE_KEYS.COURSE_DETAILS]: [],
//       [STORAGE_KEYS.TIMETABLE]: [],
//       [STORAGE_KEYS.SYLLABUS_PROGRESS]: {}
//     };
    
//     keys.forEach(key => {
//       if (!localStorage.getItem(key) && defaultValues[key] !== undefined) {
//         saveToStorage(key, defaultValues[key]);
//       }
//     });
    
//     const currentConfig = loadFromStorage(STORAGE_KEYS.TIMETABLE_CONFIG, DEFAULT_TIMETABLE_CONFIG);
//     if (!currentConfig.lunchBreak) {
//       currentConfig.lunchBreak = { start: "12:30", duration: 40 };
//       saveToStorage(STORAGE_KEYS.TIMETABLE_CONFIG, currentConfig);
//       AppState.timetableConfig = currentConfig;
//     }
    
//     let currentSubjects = loadFromStorage(STORAGE_KEYS.SUBJECTS, DEFAULT_SUBJECTS);
//     let needsUpdate = false;
//     const updatedSubjects = currentSubjects.map(subject => {
//       if (!subject.approvalStatus) {
//         needsUpdate = true;
//         return { ...subject, approvalStatus: "approved" };
//       }
//       return subject;
//     });
    
//     if (needsUpdate) {
//       saveToStorage(STORAGE_KEYS.SUBJECTS, updatedSubjects);
//       AppState.subjects = updatedSubjects;
//     }
//   },
// };

// AppState.initializeStorage();

// if (typeof window !== 'undefined') {
//   window.AppState = AppState;
// }

// // src/AppState.js
// import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "./utils/storage";
// import { 
//   DEFAULT_FACULTY, 
//   DEFAULT_SUBJECTS, 
//   DEFAULT_SUBJECT_PREFERENCES, 
//   DEFAULT_ROOMS, 
//   DEFAULT_TIMETABLE_CONFIG, 
//   DEFAULT_SEMESTER_DETAILS,
//   DEFAULT_CALENDAR_EVENTS,
//   COURSES,
//   SEMESTERS,
//   SECTIONS
// } from "./data/mockData";

// // Helper function to calculate syllabus progress
// const calculateSyllabusProgress = (completedModules, totalModules) => {
//   return totalModules > 0 ? (completedModules / totalModules) * 100 : 0;
// };

// // Helper function to generate time slots with lunch break
// const generateTimeSlotsUtil = (config) => {
//   const slots = [];
//   const start = new Date(`1970-01-01T${config.startTime}:00`);
//   const end = new Date(`1970-01-01T${config.endTime}:00`);
  
//   let current = new Date(start);
//   let periodNumber = 1;
  
//   const lunchStart = new Date(`1970-01-01T${config.lunchBreak.start}:00`);
//   const lunchEnd = new Date(lunchStart.getTime() + config.lunchBreak.duration * 60000);
  
//   while (current < end) {
//     const timeStr = current.toTimeString().substring(0, 5);
//     const endTime = new Date(current.getTime() + config.classDuration * 60000);
//     const endTimeStr = endTime.toTimeString().substring(0, 5);
    
//     if (current >= lunchStart && current < lunchEnd) {
//       slots.push({
//         time: timeStr,
//         endTime: endTimeStr,
//         period: "LUNCH",
//         isLunch: true,
//         label: "LUNCH BREAK"
//       });
//       current = new Date(lunchEnd);
//     } else {
//       slots.push({
//         time: timeStr,
//         endTime: endTimeStr,
//         period: `P${periodNumber}`,
//         isLunch: false,
//         label: `${timeStr} - ${endTimeStr}`
//       });
//       periodNumber++;
//       current = new Date(current.getTime() + config.classDuration * 60000 + config.breakDuration * 60000);
//     }
//   }
  
//   return slots;
// };

// export const AppState = {
//   // Data stores
//   faculty: loadFromStorage(STORAGE_KEYS.FACULTY, DEFAULT_FACULTY),
//   subjects: loadFromStorage(STORAGE_KEYS.SUBJECTS, DEFAULT_SUBJECTS),
//   subjectPreferences: loadFromStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, DEFAULT_SUBJECT_PREFERENCES),
//   courseDetails: loadFromStorage(STORAGE_KEYS.COURSE_DETAILS, []),
//   timetable: loadFromStorage(STORAGE_KEYS.TIMETABLE, []),
//   syllabusProgress: loadFromStorage(STORAGE_KEYS.SYLLABUS_PROGRESS, {}),
//   rooms: loadFromStorage(STORAGE_KEYS.ROOMS, DEFAULT_ROOMS),
//   timetableConfig: loadFromStorage(STORAGE_KEYS.TIMETABLE_CONFIG, DEFAULT_TIMETABLE_CONFIG),
//   semesterDetails: loadFromStorage(STORAGE_KEYS.SEMESTER_DETAILS, DEFAULT_SEMESTER_DETAILS),
//   flaggedIssues: loadFromStorage(STORAGE_KEYS.FLAGGED_ISSUES, []),
//   studentProgress: loadFromStorage(STORAGE_KEYS.STUDENT_PROGRESS, {}),
//   deanApprovals: loadFromStorage(STORAGE_KEYS.DEAN_APPROVALS, {}),
  
//   // ============ FACULTY FUNCTIONS ============
//   getFacultyById: (id) => {
//     return AppState.faculty.find(f => f.id === id);
//   },
  
//   getCourseDetailsByFacultyId: (facultyId) => {
//     return AppState.courseDetails.filter(c => c.facultyId === facultyId);
//   },
  
//   updateFacultyRemainingHours: (facultyId, assignedHours) => {
//     const faculty = AppState.faculty.find(f => f.id === facultyId);
//     if (faculty) {
//       faculty.assignedHours += assignedHours;
//       faculty.remainingHours = faculty.maxHours - faculty.assignedHours;
//       saveToStorage(STORAGE_KEYS.FACULTY, AppState.faculty);
//     }
//   },
  
//   // ============ PREFERENCE FUNCTIONS ============
//   getPreferenceByFacultyId: (facultyId) => {
//     return AppState.subjectPreferences.find(p => p.facultyId === facultyId);
//   },
  
//   submitSubjectPreferences: (facultyId, preferences) => {
//     const pref = AppState.subjectPreferences.find(p => p.facultyId === facultyId);
//     if (pref) {
//       pref.submitted = true;
//       pref.preferences = preferences;
//       pref.status = "pending";
//       pref.feedback = "";
//       pref.submittedAt = new Date().toISOString();
//       saveToStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, AppState.subjectPreferences);
//     }
//   },
  
//   updatePreferenceStatus: (facultyId, status, feedback = "", allocatedSubjects = []) => {
//     const pref = AppState.subjectPreferences.find(p => p.facultyId === facultyId);
//     if (pref) {
//       pref.status = status;
//       pref.feedback = feedback;
      
//       if (status === "allocated" && allocatedSubjects.length > 0) {
//         pref.allocatedSubjects = allocatedSubjects;
//         pref.allocatedAt = new Date().toISOString();
        
//         allocatedSubjects.forEach(subjectId => {
//           const subject = AppState.subjects.find(s => s.id === subjectId);
//           if (subject) {
//             AppState.updateFacultyRemainingHours(facultyId, subject.totalWeeklyClasses);
//           }
//         });
//       }
      
//       if (status === "approved") {
//         pref.approvedAt = new Date().toISOString();
//         pref.approvedBy = "dean";
//       }
      
//       if (status === "rejected") {
//         pref.rejectedAt = new Date().toISOString();
//       }
      
//       saveToStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, AppState.subjectPreferences);
//     }
//   },
  
//   resetPreferenceForm: (facultyId) => {
//     const pref = AppState.subjectPreferences.find(p => p.facultyId === facultyId);
//     if (pref) {
//       pref.submitted = false;
//       pref.status = "pending";
//       pref.feedback = "";
//       pref.preferences = [];
//       pref.allocatedSubjects = [];
//       saveToStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, AppState.subjectPreferences);
//     }
//   },
  
//   // ============ SEMESTER FUNCTIONS ============
//   updateSemesterDetails: (course, semester, details) => {
//     if (!AppState.semesterDetails[course]) {
//       AppState.semesterDetails[course] = {};
//     }
//     AppState.semesterDetails[course][semester] = details;
//     saveToStorage(STORAGE_KEYS.SEMESTER_DETAILS, AppState.semesterDetails);
//   },
  
//   getSubjectsForCourseAndSemester: (course, semester) => {
//     const details = AppState.semesterDetails[course]?.[semester];
//     if (!details) return [];
    
//     return details.subjects.map(subjectId => 
//       AppState.subjects.find(s => s.id === subjectId)
//     ).filter(s => s && s.approvalStatus === "approved");
//   },
  
//   // ============ COURSE DETAILS FUNCTIONS ============
//   submitCourseDetails: (facultyId, courses) => {
//     const coursesWithStatus = courses.map(course => ({
//       ...course,
//       deanStatus: "pending",
//       coordinatorStatus: "pending",
//       deanFeedback: "",
//       coordinatorFeedback: "",
//       submittedAt: new Date().toISOString()
//     }));
    
//     AppState.courseDetails = AppState.courseDetails.filter(c => c.facultyId !== facultyId);
//     AppState.courseDetails.push(...coursesWithStatus);
//     saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
    
//     courses.forEach(course => {
//       const subject = AppState.subjects.find(s => s.id === course.subjectId);
//       if (subject) {
//         const progressKey = `${facultyId}_${course.subjectId}`;
//         AppState.syllabusProgress[progressKey] = {
//           facultyId,
//           facultyName: AppState.getFacultyById(facultyId)?.name,
//           subjectId: course.subjectId,
//           subjectName: subject.name,
//           subjectCode: subject.code,
//           course: course.course,
//           semester: course.semester,
//           sections: course.sections,
//           totalModules: course.modules,
//           completedModules: 0,
//           modules: Array(course.modules).fill(false),
//           lastUpdated: new Date().toISOString(),
//           completionPercentage: 0
//         };
//       }
//     });
//     saveToStorage(STORAGE_KEYS.SYLLABUS_PROGRESS, AppState.syllabusProgress);
//   },
  
//   updateCourseDetailCoordinatorStatus: (courseId, status, feedback = "") => {
//     const course = AppState.courseDetails.find(c => c.id === courseId);
//     if (course) {
//       course.coordinatorStatus = status;
//       course.coordinatorFeedback = feedback;
//       if (status === "reviewed") {
//         course.reviewedAt = new Date().toISOString();
//       }
//       saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
//     }
//   },
  
//   updateCourseDetailDeanStatus: (courseId, status, feedback = "") => {
//     const course = AppState.courseDetails.find(c => c.id === courseId);
//     if (course) {
//       course.deanStatus = status;
//       course.deanFeedback = feedback;
//       if (status === "approved") {
//         course.approvedAt = new Date().toISOString();
//         AppState.checkSyllabusDiscrepancy(course.facultyId, course.subjectId);
//       }
//       if (status === "rejected") {
//         course.rejectedAt = new Date().toISOString();
//       }
//       saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
//     }
//   },
  
//   getPendingCoordinatorReviews: () => {
//     return AppState.courseDetails.filter(c => 
//       c.coordinatorStatus === "pending"
//     );
//   },
  
//   getPendingDeanCourseApprovals: () => {
//     return AppState.courseDetails.filter(c => 
//       c.coordinatorStatus === "reviewed" && 
//       c.deanStatus === "pending"
//     );
//   },
  
//   getPendingDeanPreferenceApprovals: () => {
//     return AppState.subjectPreferences.filter(p => 
//       p.status === "allocated"
//     );
//   },
  
//   getPendingSubjectApprovals: () => {
//     return AppState.subjects.filter(s => s.approvalStatus === "pending");
//   },
  
//   getApprovedSubjects: () => {
//     return AppState.subjects.filter(s => s.approvalStatus === "approved");
//   },
  
//   getRejectedSubjects: () => {
//     return AppState.subjects.filter(s => s.approvalStatus === "rejected");
//   },
  
//   // Alias for backward compatibility
//   getPendingDeanApprovals: () => {
//     return AppState.getPendingDeanCourseApprovals();
//   },
  
//   // ============ SYLLABUS & PROGRESS FUNCTIONS ============
//   getSyllabusProgress: (facultyId, subjectId) => {
//     const progressKey = `${facultyId}_${subjectId}`;
//     return AppState.syllabusProgress[progressKey] || null;
//   },
  
//   updateSyllabusProgress: (facultyId, subjectId, moduleIndex, completed) => {
//     const progressKey = `${facultyId}_${subjectId}`;
//     if (AppState.syllabusProgress[progressKey]) {
//       const progress = AppState.syllabusProgress[progressKey];
//       progress.modules[moduleIndex] = completed;
//       progress.completedModules = progress.modules.filter(m => m).length;
//       progress.lastUpdated = new Date().toISOString();
//       progress.completionPercentage = calculateSyllabusProgress(
//         progress.completedModules, 
//         progress.totalModules
//       );
      
//       saveToStorage(STORAGE_KEYS.SYLLABUS_PROGRESS, AppState.syllabusProgress);
//       AppState.checkSyllabusDiscrepancy(facultyId, subjectId);
//     }
//   },
  
//   updateStudentProgress: (studentId, subjectId, moduleIndex, completed) => {
//     const key = `${studentId}_${subjectId}`;
//     if (!AppState.studentProgress[key]) {
//       const subject = AppState.subjects.find(s => s.id === subjectId);
//       AppState.studentProgress[key] = {
//         studentId,
//         subjectId,
//         subjectName: subject?.name,
//         totalModules: subject?.modules || 0,
//         completedModules: 0,
//         modules: Array(subject?.modules || 0).fill(false),
//         lastUpdated: new Date().toISOString(),
//       };
//     }
    
//     const progress = AppState.studentProgress[key];
//     progress.modules[moduleIndex] = completed;
//     progress.completedModules = progress.modules.filter(m => m).length;
//     progress.lastUpdated = new Date().toISOString();
    
//     saveToStorage(STORAGE_KEYS.STUDENT_PROGRESS, AppState.studentProgress);
//     AppState.checkSyllabusDiscrepancyForStudent(studentId, subjectId);
//   },
  
//   getStudentProgress: (studentId, subjectId) => {
//     const key = `${studentId}_${subjectId}`;
//     return AppState.studentProgress[key] || null;
//   },
  
//   checkSyllabusDiscrepancy: (facultyId, subjectId) => {
//     const facultyProgress = AppState.getSyllabusProgress(facultyId, subjectId);
//     if (!facultyProgress) return;
    
//     for (const key in AppState.studentProgress) {
//       if (key.includes(subjectId)) {
//         const studentProgress = AppState.studentProgress[key];
//         const facultyCompleted = facultyProgress.completedModules;
//         const studentCompleted = studentProgress.completedModules;
//         const threshold = Math.ceil(facultyProgress.totalModules * 0.1);
        
//         if (Math.abs(facultyCompleted - studentCompleted) > threshold) {
//           const issue = {
//             id: Date.now() + Math.random(),
//             type: "student_faculty_discrepancy",
//             subjectId,
//             subjectName: facultyProgress.subjectName,
//             facultyProgress: facultyCompleted,
//             studentProgress: studentCompleted,
//             facultyId,
//             studentId: studentProgress.studentId,
//             timestamp: new Date().toISOString(),
//             resolved: false
//           };
          
//           const exists = AppState.flaggedIssues.some(i => 
//             i.type === "student_faculty_discrepancy" && 
//             i.subjectId === subjectId && 
//             i.facultyId === facultyId &&
//             i.studentId === studentProgress.studentId &&
//             !i.resolved
//           );
          
//           if (!exists) {
//             AppState.flaggedIssues.push(issue);
//             saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
//           }
//         }
//       }
//     }
//   },
  
//   checkSyllabusDiscrepancyForStudent: (studentId, subjectId) => {
//     const studentProgress = AppState.getStudentProgress(studentId, subjectId);
//     if (!studentProgress) return;
    
//     const facultyProgress = AppState.getSyllabusProgressForSubject(subjectId);
//     if (facultyProgress) {
//       const facultyCompleted = facultyProgress.completedModules;
//       const studentCompleted = studentProgress.completedModules;
//       const threshold = Math.ceil(studentProgress.totalModules * 0.1);
      
//       if (Math.abs(facultyCompleted - studentCompleted) > threshold) {
//         const issue = {
//           id: Date.now(),
//           type: "student_faculty_discrepancy",
//           subjectId,
//           subjectName: studentProgress.subjectName,
//           facultyProgress: facultyCompleted,
//           studentProgress: studentCompleted,
//           facultyId: facultyProgress.facultyId,
//           studentId,
//           timestamp: new Date().toISOString(),
//           resolved: false
//         };
        
//         const exists = AppState.flaggedIssues.some(i => 
//           i.type === "student_faculty_discrepancy" && 
//           i.subjectId === subjectId && 
//           i.facultyId === facultyProgress.facultyId &&
//           i.studentId === studentId &&
//           !i.resolved
//         );
        
//         if (!exists) {
//           AppState.flaggedIssues.push(issue);
//           saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
//         }
//       }
//     }
//   },
  
//   getSyllabusProgressForSubject: (subjectId) => {
//     for (const key in AppState.syllabusProgress) {
//       if (key.includes(subjectId)) {
//         return AppState.syllabusProgress[key];
//       }
//     }
//     return null;
//   },
  
//   // ============ TIMETABLE FUNCTIONS ============
//   generateTimeSlots: (config) => {
//     return generateTimeSlotsUtil(config);
//   },
  
//   updateTimetableConfig: (config) => {
//     AppState.timetableConfig = config;
//     saveToStorage(STORAGE_KEYS.TIMETABLE_CONFIG, config);
//   },
  
//   generateTimetable: () => {
//     console.log("=== GENERATING TIMETABLE ===");
//     const approvedCourses = AppState.courseDetails.filter(c => c.deanStatus === "approved");
    
//     if (approvedCourses.length === 0) {
//       console.warn("No approved courses found");
//       return [];
//     }
    
//     const config = AppState.timetableConfig;
//     const timeSlots = AppState.generateTimeSlots(config);
//     const validTimeSlots = timeSlots.filter(s => !s.isLunch).map(s => s.time);
    
//     const timetable = [];
//     let id = 1;
//     const facultySchedule = {};
//     const roomSchedule = {};
    
//     COURSES.forEach(course => {
//       SEMESTERS.forEach(semester => {
//         SECTIONS.forEach(section => {
//           const sectionCourses = approvedCourses.filter(c => 
//             c.course === course && c.semester === semester
//           );
          
//           sectionCourses.forEach(courseDetail => {
//             const subject = AppState.subjects.find(s => s.id === courseDetail.subjectId);
//             if (!subject) return;
            
//             const faculty = AppState.faculty.find(f => f.id === courseDetail.facultyId);
//             if (!faculty) return;
            
//             for (let i = 0; i < subject.theoryClassesPerWeek; i++) {
//               let allocated = false;
//               let attempts = 0;
              
//               while (!allocated && attempts < 100) {
//                 const day = config.days[Math.floor(Math.random() * config.days.length)];
//                 const timeSlot = Math.floor(Math.random() * validTimeSlots.length);
//                 const time = validTimeSlots[timeSlot];
                
//                 const facultyKey = `${day}_${time}_${faculty.id}`;
//                 if (facultySchedule[facultyKey]) {
//                   attempts++;
//                   continue;
//                 }
                
//                 let availableRoom = null;
//                 const theoryRooms = AppState.rooms.filter(r => r.type === "Theory");
                
//                 for (const room of theoryRooms) {
//                   const roomKey = `${day}_${time}_${room.name}`;
//                   if (!roomSchedule[roomKey]) {
//                     availableRoom = room;
//                     break;
//                   }
//                 }
                
//                 if (!availableRoom) {
//                   attempts++;
//                   continue;
//                 }
                
//                 timetable.push({
//                   id: id++,
//                   course,
//                   semester,
//                   section,
//                   day,
//                   time,
//                   subject: subject.name,
//                   subjectId: subject.id,
//                   subjectCode: subject.code,
//                   facultyId: faculty.id,
//                   facultyName: faculty.name,
//                   facultyAvatar: faculty.avatar,
//                   room: availableRoom.name,
//                   type: "theory",
//                   color: faculty.color
//                 });
                
//                 facultySchedule[facultyKey] = true;
//                 roomSchedule[`${day}_${time}_${availableRoom.name}`] = true;
//                 allocated = true;
//               }
//             }
            
//             if (subject.labPeriodsPerWeek > 0) {
//               for (let i = 0; i < subject.labPeriodsPerWeek; i += 2) {
//                 let allocated = false;
//                 let attempts = 0;
                
//                 while (!allocated && attempts < 100) {
//                   const day = config.days[Math.floor(Math.random() * config.days.length)];
//                   const timeSlot = Math.floor(Math.random() * (validTimeSlots.length - 1));
//                   const time1 = validTimeSlots[timeSlot];
//                   const time2 = validTimeSlots[timeSlot + 1];
                  
//                   const facultyKey1 = `${day}_${time1}_${faculty.id}`;
//                   const facultyKey2 = `${day}_${time2}_${faculty.id}`;
                  
//                   if (facultySchedule[facultyKey1] || facultySchedule[facultyKey2]) {
//                     attempts++;
//                     continue;
//                   }
                  
//                   let availableRoom = null;
//                   const labRooms = AppState.rooms.filter(r => r.type === "Lab");
                  
//                   for (const room of labRooms) {
//                     const roomKey1 = `${day}_${time1}_${room.name}`;
//                     const roomKey2 = `${day}_${time2}_${room.name}`;
                    
//                     if (!roomSchedule[roomKey1] && !roomSchedule[roomKey2]) {
//                       availableRoom = room;
//                       break;
//                     }
//                   }
                  
//                   if (!availableRoom) {
//                     attempts++;
//                     continue;
//                   }
                  
//                   timetable.push({
//                     id: id++,
//                     course,
//                     semester,
//                     section,
//                     day,
//                     time: time1,
//                     subject: `${subject.name} Lab`,
//                     subjectId: subject.id,
//                     subjectCode: subject.code,
//                     facultyId: faculty.id,
//                     facultyName: faculty.name,
//                     facultyAvatar: faculty.avatar,
//                     room: availableRoom.name,
//                     type: "lab",
//                     color: faculty.color
//                   });
                  
//                   timetable.push({
//                     id: id++,
//                     course,
//                     semester,
//                     section,
//                     day,
//                     time: time2,
//                     subject: `${subject.name} Lab`,
//                     subjectId: subject.id,
//                     subjectCode: subject.code,
//                     facultyId: faculty.id,
//                     facultyName: faculty.name,
//                     facultyAvatar: faculty.avatar,
//                     room: availableRoom.name,
//                     type: "lab",
//                     color: faculty.color
//                   });
                  
//                   facultySchedule[facultyKey1] = true;
//                   facultySchedule[facultyKey2] = true;
//                   roomSchedule[`${day}_${time1}_${availableRoom.name}`] = true;
//                   roomSchedule[`${day}_${time2}_${availableRoom.name}`] = true;
//                   allocated = true;
//                 }
//               }
//             }
//           });
//         });
//       });
//     });
    
//     AppState.timetable = timetable;
//     saveToStorage(STORAGE_KEYS.TIMETABLE, timetable);
    
//     console.log(`Generated ${timetable.length} timetable slots`);
//     return timetable;
//   },
  
//   getFacultySchedule: (facultyId) => {
//     return AppState.timetable.filter(t => t.facultyId === facultyId);
//   },
  
//   getStudentSchedule: (course, semester, section) => {
//     return AppState.timetable.filter(t => 
//       t.course === course && 
//       t.semester === semester && 
//       t.section === section
//     );
//   },
  
//   checkAllConflicts: () => {
//     const conflicts = [];
    
//     for (let i = 0; i < AppState.timetable.length; i++) {
//       for (let j = i + 1; j < AppState.timetable.length; j++) {
//         const a = AppState.timetable[i];
//         const b = AppState.timetable[j];
        
//         if (a.day === b.day && a.time === b.time) {
//           if (a.facultyId === b.facultyId) {
//             conflicts.push({
//               type: "faculty",
//               message: `${a.facultyName} assigned to both ${a.subject} and ${b.subject} at ${a.day} ${a.time}`
//             });
//           }
          
//           if (a.room === b.room) {
//             conflicts.push({
//               type: "room",
//               message: `Room ${a.room} assigned to both ${a.subject} and ${b.subject} at ${a.day} ${a.time}`
//             });
//           }
//         }
//       }
//     }
    
//     return conflicts;
//   },
  
//   // ============ FLAGGED ISSUES FUNCTIONS ============
//   getFlaggedIssues: () => {
//     return AppState.flaggedIssues.filter(issue => !issue.resolved);
//   },
  
//   resolveFlaggedIssue: (issueId) => {
//     const issue = AppState.flaggedIssues.find(i => i.id === issueId);
//     if (issue) {
//       issue.resolved = true;
//       saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
//     }
//   },
  
//   // ============ INITIALIZATION ============
//   initializeStorage: () => {
//     const keys = [
//       STORAGE_KEYS.FACULTY, STORAGE_KEYS.SUBJECTS, STORAGE_KEYS.SUBJECT_PREFERENCES,
//       STORAGE_KEYS.ROOMS, STORAGE_KEYS.TIMETABLE_CONFIG, STORAGE_KEYS.SEMESTER_DETAILS,
//       STORAGE_KEYS.FLAGGED_ISSUES, STORAGE_KEYS.STUDENT_PROGRESS, STORAGE_KEYS.DEAN_APPROVALS,
//       STORAGE_KEYS.LEAVE_REQUESTS, STORAGE_KEYS.CALENDAR_EVENTS, STORAGE_KEYS.COURSE_DETAILS,
//       STORAGE_KEYS.TIMETABLE, STORAGE_KEYS.SYLLABUS_PROGRESS, STORAGE_KEYS.FACULTY_SUBMISSIONS,
//       STORAGE_KEYS.PREFERENCE_SETTINGS, STORAGE_KEYS.FACULTY_PREFERENCE_FORM
//     ];
    
//     const defaultValues = {
//       [STORAGE_KEYS.FACULTY]: DEFAULT_FACULTY,
//       [STORAGE_KEYS.SUBJECTS]: DEFAULT_SUBJECTS,
//       [STORAGE_KEYS.SUBJECT_PREFERENCES]: DEFAULT_SUBJECT_PREFERENCES,
//       [STORAGE_KEYS.ROOMS]: DEFAULT_ROOMS,
//       [STORAGE_KEYS.TIMETABLE_CONFIG]: DEFAULT_TIMETABLE_CONFIG,
//       [STORAGE_KEYS.SEMESTER_DETAILS]: DEFAULT_SEMESTER_DETAILS,
//       [STORAGE_KEYS.FLAGGED_ISSUES]: [],
//       [STORAGE_KEYS.STUDENT_PROGRESS]: {},
//       [STORAGE_KEYS.DEAN_APPROVALS]: {},
//       [STORAGE_KEYS.LEAVE_REQUESTS]: [],
//       [STORAGE_KEYS.CALENDAR_EVENTS]: DEFAULT_CALENDAR_EVENTS,
//       [STORAGE_KEYS.COURSE_DETAILS]: [],
//       [STORAGE_KEYS.TIMETABLE]: [],
//       [STORAGE_KEYS.SYLLABUS_PROGRESS]: {},
//       [STORAGE_KEYS.FACULTY_SUBMISSIONS]: [],
//       [STORAGE_KEYS.PREFERENCE_SETTINGS]: {
//         requireOneCoreOneMajorOneMinor: true,
//         requireDifferentSemesters: false,
//         maxPreferencesPerFaculty: 3,
//         minPreferencesRequired: 3,
//         allowSameSemester: true,
//         allowSameType: false,
//         requireDifferentSubjects: true
//       },
//       [STORAGE_KEYS.FACULTY_PREFERENCE_FORM]: {}
//     };
    
//     keys.forEach(key => {
//       if (!localStorage.getItem(key) && defaultValues[key] !== undefined) {
//         saveToStorage(key, defaultValues[key]);
//       }
//     });
    
//     const currentConfig = loadFromStorage(STORAGE_KEYS.TIMETABLE_CONFIG, DEFAULT_TIMETABLE_CONFIG);
//     if (!currentConfig.lunchBreak) {
//       currentConfig.lunchBreak = { start: "12:30", duration: 40 };
//       saveToStorage(STORAGE_KEYS.TIMETABLE_CONFIG, currentConfig);
//       AppState.timetableConfig = currentConfig;
//     }
    
//     let currentSubjects = loadFromStorage(STORAGE_KEYS.SUBJECTS, DEFAULT_SUBJECTS);
//     let needsUpdate = false;
//     const updatedSubjects = currentSubjects.map(subject => {
//       if (!subject.approvalStatus) {
//         needsUpdate = true;
//         return { ...subject, approvalStatus: "approved" };
//       }
//       return subject;
//     });
    
//     if (needsUpdate) {
//       saveToStorage(STORAGE_KEYS.SUBJECTS, updatedSubjects);
//       AppState.subjects = updatedSubjects;
//     }
//   },
// };

// AppState.initializeStorage();

// if (typeof window !== 'undefined') {
//   window.AppState = AppState;
// }

// // src/AppState.js
// import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "./utils/storage";
// import { 
//   DEFAULT_FACULTY, 
//   DEFAULT_SUBJECTS, 
//   DEFAULT_SUBJECT_PREFERENCES, 
//   DEFAULT_ROOMS, 
//   DEFAULT_TIMETABLE_CONFIG, 
//   DEFAULT_SEMESTER_DETAILS,
//   DEFAULT_CALENDAR_EVENTS,
//   COURSES,
//   SEMESTERS,
//   SECTIONS
// } from "./data/mockData";

// // Helper function to calculate syllabus progress
// const calculateSyllabusProgress = (completedModules, totalModules) => {
//   return totalModules > 0 ? (completedModules / totalModules) * 100 : 0;
// };

// // Helper function to generate time slots with lunch break and breaks after every 2 classes
// const generateTimeSlotsUtil = (config) => {
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
//     const endTime = new Date(current.getTime() + config.classDuration * 60000);
//     const endTimeStr = endTime.toTimeString().substring(0, 5);
    
//     // Check for lunch break
//     if (!lunchAdded && current >= lunchStart && current < lunchEnd) {
//       slots.push({
//         time: timeStr,
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
    
//     // Add class
//     if (endTime <= end) {
//       slots.push({
//         time: timeStr,
//         endTime: endTimeStr,
//         period: `P${periodNumber}`,
//         isLunch: false,
//         isBreak: false,
//         label: `${timeStr} - ${endTimeStr}`
//       });
//       periodNumber++;
//       classesBeforeBreak++;
//       current = new Date(endTime);
      
//       // Add break after every 2 classes
//       if (classesBeforeBreak === 2 && config.breakDuration > 0) {
//         const breakStart = new Date(current);
//         const breakEnd = new Date(current.getTime() + config.breakDuration * 60000);
        
//         let shouldAddBreak = false;
//         if (!lunchAdded && breakEnd <= lunchStart) {
//           shouldAddBreak = true;
//         } else if (lunchAdded && breakEnd <= end) {
//           shouldAddBreak = true;
//         }
        
//         if (shouldAddBreak) {
//           slots.push({
//             time: breakStart.toTimeString().substring(0, 5),
//             endTime: breakEnd.toTimeString().substring(0, 5),
//             period: "BREAK",
//             isLunch: false,
//             isBreak: true,
//             label: "SHORT BREAK"
//           });
//           current = breakEnd;
//           classesBeforeBreak = 0;
//         } else {
//           classesBeforeBreak = 0;
//         }
//       }
//     } else {
//       break;
//     }
//   }
  
//   return slots;
// };

// export const AppState = {
//   // Data stores
//   faculty: [],
//   subjects: [],
//   subjectPreferences: [],
//   courseDetails: [],
//   timetable: [],
//   syllabusProgress: {},
//   rooms: [],
//   timetableConfig: {},
//   semesterDetails: {},
//   flaggedIssues: [],
//   studentProgress: {},
//   deanApprovals: {},
  
//   // Initialize all data
//   init: () => {
//     AppState.faculty = loadFromStorage(STORAGE_KEYS.FACULTY, DEFAULT_FACULTY);
//     AppState.subjects = loadFromStorage(STORAGE_KEYS.SUBJECTS, DEFAULT_SUBJECTS);
//     AppState.subjectPreferences = loadFromStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, DEFAULT_SUBJECT_PREFERENCES);
//     AppState.courseDetails = loadFromStorage(STORAGE_KEYS.COURSE_DETAILS, []);
//     AppState.timetable = loadFromStorage(STORAGE_KEYS.TIMETABLE, []);
//     AppState.syllabusProgress = loadFromStorage(STORAGE_KEYS.SYLLABUS_PROGRESS, {});
//     AppState.rooms = loadFromStorage(STORAGE_KEYS.ROOMS, DEFAULT_ROOMS);
//     AppState.timetableConfig = loadFromStorage(STORAGE_KEYS.TIMETABLE_CONFIG, DEFAULT_TIMETABLE_CONFIG);
//     AppState.semesterDetails = loadFromStorage(STORAGE_KEYS.SEMESTER_DETAILS, DEFAULT_SEMESTER_DETAILS);
//     AppState.flaggedIssues = loadFromStorage(STORAGE_KEYS.FLAGGED_ISSUES, []);
//     AppState.studentProgress = loadFromStorage(STORAGE_KEYS.STUDENT_PROGRESS, {});
//     AppState.deanApprovals = loadFromStorage(STORAGE_KEYS.DEAN_APPROVALS, {});
    
//     // Ensure faculty data is valid
//     if (!AppState.faculty || AppState.faculty.length === 0) {
//       AppState.faculty = DEFAULT_FACULTY;
//       saveToStorage(STORAGE_KEYS.FACULTY, DEFAULT_FACULTY);
//     }
//   },
  
//   // ============ FACULTY FUNCTIONS ============
//   getFacultyById: (id) => {
//     return AppState.faculty.find(f => f.id === id);
//   },
  
//   getFacultyByEmail: (email) => {
//     return AppState.faculty.find(f => f.email === email);
//   },
  
//   getCourseDetailsByFacultyId: (facultyId) => {
//     return AppState.courseDetails.filter(c => c.facultyId === facultyId);
//   },
  
//   updateFacultyRemainingHours: (facultyId, assignedHours) => {
//     const faculty = AppState.faculty.find(f => f.id === facultyId);
//     if (faculty) {
//       faculty.assignedHours += assignedHours;
//       faculty.remainingHours = faculty.maxHours - faculty.assignedHours;
//       saveToStorage(STORAGE_KEYS.FACULTY, AppState.faculty);
//     }
//   },
  
//   // ============ PREFERENCE FUNCTIONS ============
//   getPreferenceByFacultyId: (facultyId) => {
//     return AppState.subjectPreferences.find(p => p.facultyId === facultyId);
//   },
  
//   submitSubjectPreferences: (facultyId, preferences) => {
//     const pref = AppState.subjectPreferences.find(p => p.facultyId === facultyId);
//     if (pref) {
//       pref.submitted = true;
//       pref.preferences = preferences;
//       pref.status = "pending";
//       pref.feedback = "";
//       pref.submittedAt = new Date().toISOString();
//       saveToStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, AppState.subjectPreferences);
//     }
//   },
  
//   updatePreferenceStatus: (facultyId, status, feedback = "", allocatedSubjects = []) => {
//     const pref = AppState.subjectPreferences.find(p => p.facultyId === facultyId);
//     if (pref) {
//       pref.status = status;
//       pref.feedback = feedback;
      
//       if (status === "allocated" && allocatedSubjects.length > 0) {
//         pref.allocatedSubjects = allocatedSubjects;
//         pref.allocatedAt = new Date().toISOString();
        
//         allocatedSubjects.forEach(subjectId => {
//           const subject = AppState.subjects.find(s => s.id === subjectId);
//           if (subject) {
//             AppState.updateFacultyRemainingHours(facultyId, subject.totalWeeklyClasses);
//           }
//         });
//       }
      
//       if (status === "approved") {
//         pref.approvedAt = new Date().toISOString();
//         pref.approvedBy = "dean";
//       }
      
//       if (status === "rejected") {
//         pref.rejectedAt = new Date().toISOString();
//       }
      
//       saveToStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, AppState.subjectPreferences);
//     }
//   },
  
//   resetPreferenceForm: (facultyId) => {
//     const pref = AppState.subjectPreferences.find(p => p.facultyId === facultyId);
//     if (pref) {
//       pref.submitted = false;
//       pref.status = "pending";
//       pref.feedback = "";
//       pref.preferences = [];
//       pref.allocatedSubjects = [];
//       saveToStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, AppState.subjectPreferences);
//     }
//   },
  
//   // ============ SEMESTER FUNCTIONS ============
//   updateSemesterDetails: (course, semester, details) => {
//     if (!AppState.semesterDetails[course]) {
//       AppState.semesterDetails[course] = {};
//     }
//     AppState.semesterDetails[course][semester] = details;
//     saveToStorage(STORAGE_KEYS.SEMESTER_DETAILS, AppState.semesterDetails);
//   },
  
//   getSubjectsForCourseAndSemester: (course, semester) => {
//     const details = AppState.semesterDetails[course]?.[semester];
//     if (!details) return [];
    
//     return details.subjects.map(subjectId => 
//       AppState.subjects.find(s => s.id === subjectId)
//     ).filter(s => s && s.approvalStatus === "approved");
//   },
  
//   // ============ COURSE DETAILS FUNCTIONS ============
//   submitCourseDetails: (facultyId, courses) => {
//     const coursesWithStatus = courses.map(course => ({
//       ...course,
//       deanStatus: "pending",
//       coordinatorStatus: "pending",
//       deanFeedback: "",
//       coordinatorFeedback: "",
//       submittedAt: new Date().toISOString()
//     }));
    
//     AppState.courseDetails = AppState.courseDetails.filter(c => c.facultyId !== facultyId);
//     AppState.courseDetails.push(...coursesWithStatus);
//     saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
    
//     courses.forEach(course => {
//       const subject = AppState.subjects.find(s => s.id === course.subjectId);
//       if (subject) {
//         const progressKey = `${facultyId}_${course.subjectId}`;
//         AppState.syllabusProgress[progressKey] = {
//           facultyId,
//           facultyName: AppState.getFacultyById(facultyId)?.name,
//           subjectId: course.subjectId,
//           subjectName: subject.name,
//           subjectCode: subject.code,
//           course: course.course,
//           semester: course.semester,
//           sections: course.sections,
//           totalModules: course.modules,
//           completedModules: 0,
//           modules: Array(course.modules).fill(false),
//           lastUpdated: new Date().toISOString(),
//           completionPercentage: 0
//         };
//       }
//     });
//     saveToStorage(STORAGE_KEYS.SYLLABUS_PROGRESS, AppState.syllabusProgress);
//   },
  
//   updateCourseDetailCoordinatorStatus: (courseId, status, feedback = "") => {
//     const course = AppState.courseDetails.find(c => c.id === courseId);
//     if (course) {
//       course.coordinatorStatus = status;
//       course.coordinatorFeedback = feedback;
//       if (status === "reviewed") {
//         course.reviewedAt = new Date().toISOString();
//       }
//       saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
//     }
//   },
  
//   updateCourseDetailDeanStatus: (courseId, status, feedback = "") => {
//     const course = AppState.courseDetails.find(c => c.id === courseId);
//     if (course) {
//       course.deanStatus = status;
//       course.deanFeedback = feedback;
//       if (status === "approved") {
//         course.approvedAt = new Date().toISOString();
//         AppState.checkSyllabusDiscrepancy(course.facultyId, course.subjectId);
//       }
//       if (status === "rejected") {
//         course.rejectedAt = new Date().toISOString();
//       }
//       saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
//     }
//   },
  
//   getPendingCoordinatorReviews: () => {
//     return AppState.courseDetails.filter(c => 
//       c.coordinatorStatus === "pending"
//     );
//   },
  
//   getPendingDeanCourseApprovals: () => {
//     return AppState.courseDetails.filter(c => 
//       c.coordinatorStatus === "reviewed" && 
//       c.deanStatus === "pending"
//     );
//   },
  
//   getPendingDeanPreferenceApprovals: () => {
//     return AppState.subjectPreferences.filter(p => 
//       p.status === "allocated"
//     );
//   },
  
//   getPendingSubjectApprovals: () => {
//     return AppState.subjects.filter(s => s.approvalStatus === "pending");
//   },
  
//   getApprovedSubjects: () => {
//     return AppState.subjects.filter(s => s.approvalStatus === "approved");
//   },
  
//   getRejectedSubjects: () => {
//     return AppState.subjects.filter(s => s.approvalStatus === "rejected");
//   },
  
//   // Alias for backward compatibility
//   getPendingDeanApprovals: () => {
//     return AppState.getPendingDeanCourseApprovals();
//   },
  
//   // ============ SYLLABUS & PROGRESS FUNCTIONS ============
//   getSyllabusProgress: (facultyId, subjectId) => {
//     const progressKey = `${facultyId}_${subjectId}`;
//     return AppState.syllabusProgress[progressKey] || null;
//   },
  
//   updateSyllabusProgress: (facultyId, subjectId, moduleIndex, completed) => {
//     const progressKey = `${facultyId}_${subjectId}`;
//     if (AppState.syllabusProgress[progressKey]) {
//       const progress = AppState.syllabusProgress[progressKey];
//       progress.modules[moduleIndex] = completed;
//       progress.completedModules = progress.modules.filter(m => m).length;
//       progress.lastUpdated = new Date().toISOString();
//       progress.completionPercentage = calculateSyllabusProgress(
//         progress.completedModules, 
//         progress.totalModules
//       );
      
//       saveToStorage(STORAGE_KEYS.SYLLABUS_PROGRESS, AppState.syllabusProgress);
//       AppState.checkSyllabusDiscrepancy(facultyId, subjectId);
//     }
//   },
  
//   updateStudentProgress: (studentId, subjectId, moduleIndex, completed) => {
//     const key = `${studentId}_${subjectId}`;
//     if (!AppState.studentProgress[key]) {
//       const subject = AppState.subjects.find(s => s.id === subjectId);
//       AppState.studentProgress[key] = {
//         studentId,
//         subjectId,
//         subjectName: subject?.name,
//         totalModules: subject?.modules || 0,
//         completedModules: 0,
//         modules: Array(subject?.modules || 0).fill(false),
//         lastUpdated: new Date().toISOString(),
//       };
//     }
    
//     const progress = AppState.studentProgress[key];
//     progress.modules[moduleIndex] = completed;
//     progress.completedModules = progress.modules.filter(m => m).length;
//     progress.lastUpdated = new Date().toISOString();
    
//     saveToStorage(STORAGE_KEYS.STUDENT_PROGRESS, AppState.studentProgress);
//     AppState.checkSyllabusDiscrepancyForStudent(studentId, subjectId);
//   },
  
//   getStudentProgress: (studentId, subjectId) => {
//     const key = `${studentId}_${subjectId}`;
//     return AppState.studentProgress[key] || null;
//   },
  
//   checkSyllabusDiscrepancy: (facultyId, subjectId) => {
//     const facultyProgress = AppState.getSyllabusProgress(facultyId, subjectId);
//     if (!facultyProgress) return;
    
//     for (const key in AppState.studentProgress) {
//       if (key.includes(subjectId)) {
//         const studentProgress = AppState.studentProgress[key];
//         const facultyCompleted = facultyProgress.completedModules;
//         const studentCompleted = studentProgress.completedModules;
//         const threshold = Math.ceil(facultyProgress.totalModules * 0.1);
        
//         if (Math.abs(facultyCompleted - studentCompleted) > threshold) {
//           const issue = {
//             id: Date.now() + Math.random(),
//             type: "student_faculty_discrepancy",
//             subjectId,
//             subjectName: facultyProgress.subjectName,
//             facultyProgress: facultyCompleted,
//             studentProgress: studentCompleted,
//             facultyId,
//             studentId: studentProgress.studentId,
//             timestamp: new Date().toISOString(),
//             resolved: false
//           };
          
//           const exists = AppState.flaggedIssues.some(i => 
//             i.type === "student_faculty_discrepancy" && 
//             i.subjectId === subjectId && 
//             i.facultyId === facultyId &&
//             i.studentId === studentProgress.studentId &&
//             !i.resolved
//           );
          
//           if (!exists) {
//             AppState.flaggedIssues.push(issue);
//             saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
//           }
//         }
//       }
//     }
//   },
  
//   checkSyllabusDiscrepancyForStudent: (studentId, subjectId) => {
//     const studentProgress = AppState.getStudentProgress(studentId, subjectId);
//     if (!studentProgress) return;
    
//     const facultyProgress = AppState.getSyllabusProgressForSubject(subjectId);
//     if (facultyProgress) {
//       const facultyCompleted = facultyProgress.completedModules;
//       const studentCompleted = studentProgress.completedModules;
//       const threshold = Math.ceil(studentProgress.totalModules * 0.1);
      
//       if (Math.abs(facultyCompleted - studentCompleted) > threshold) {
//         const issue = {
//           id: Date.now(),
//           type: "student_faculty_discrepancy",
//           subjectId,
//           subjectName: studentProgress.subjectName,
//           facultyProgress: facultyCompleted,
//           studentProgress: studentCompleted,
//           facultyId: facultyProgress.facultyId,
//           studentId,
//           timestamp: new Date().toISOString(),
//           resolved: false
//         };
        
//         const exists = AppState.flaggedIssues.some(i => 
//           i.type === "student_faculty_discrepancy" && 
//           i.subjectId === subjectId && 
//           i.facultyId === facultyProgress.facultyId &&
//           i.studentId === studentId &&
//           !i.resolved
//         );
        
//         if (!exists) {
//           AppState.flaggedIssues.push(issue);
//           saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
//         }
//       }
//     }
//   },
  
//   getSyllabusProgressForSubject: (subjectId) => {
//     for (const key in AppState.syllabusProgress) {
//       if (key.includes(subjectId)) {
//         return AppState.syllabusProgress[key];
//       }
//     }
//     return null;
//   },
  
//   // ============ TIMETABLE FUNCTIONS ============
//   generateTimeSlots: (config) => {
//     return generateTimeSlotsUtil(config);
//   },
  
//   updateTimetableConfig: (config) => {
//     AppState.timetableConfig = config;
//     saveToStorage(STORAGE_KEYS.TIMETABLE_CONFIG, config);
//   },
  
//   generateTimetable: () => {
//   console.log("=== GENERATING TIMETABLE (Conflict-free & Gap-free) ===");

//   // ------------------------------------------------------------------
//   // Step 1: Build a list of all required teaching sessions
//   // ------------------------------------------------------------------
//   const buildSessionList = (approvedCourses) => {
//     const sessions = [];
//     for (const courseDetail of approvedCourses) {
//       const subject = AppState.subjects.find(s => s.id === courseDetail.subjectId);
//       if (!subject) continue;
//       const faculty = AppState.faculty.find(f => f.id === courseDetail.facultyId);
//       if (!faculty) continue;

//       const sections = courseDetail.sections || SECTIONS;

//       for (const section of sections) {
//         // Theory sessions (each is one slot)
//         for (let i = 0; i < subject.theoryClassesPerWeek; i++) {
//           sessions.push({
//             id: `${courseDetail.id}_theory_${section}_${i}`,
//             course: courseDetail.course,
//             semester: courseDetail.semester,
//             section,
//             subjectId: subject.id,
//             subjectName: subject.name,
//             subjectCode: subject.code,
//             facultyId: faculty.id,
//             facultyName: faculty.name,
//             facultyAvatar: faculty.avatar,
//             color: faculty.color,
//             type: 'theory',
//           });
//         }
//         // Lab sessions (each lab period is one slot, but they need to be paired consecutively)
//         for (let i = 0; i < subject.labPeriodsPerWeek; i++) {
//           sessions.push({
//             id: `${courseDetail.id}_lab_${section}_${i}`,
//             course: courseDetail.course,
//             semester: courseDetail.semester,
//             section,
//             subjectId: subject.id,
//             subjectName: subject.name,
//             subjectCode: subject.code,
//             facultyId: faculty.id,
//             facultyName: faculty.name,
//             facultyAvatar: faculty.avatar,
//             color: faculty.color,
//             type: 'lab',
//           });
//         }
//       }
//     }
//     return sessions;
//   };

//   // ------------------------------------------------------------------
//   // Step 2: Sort sessions heuristically (labs first, then by faculty workload)
//   // ------------------------------------------------------------------
//   const sortSessions = (sessions) => {
//     // Count total sessions per faculty
//     const facultyCount = {};
//     sessions.forEach(s => { facultyCount[s.facultyId] = (facultyCount[s.facultyId] || 0) + 1; });
//     return [...sessions].sort((a, b) => {
//       if (a.type !== b.type) return a.type === 'lab' ? -1 : 1;
//       return (facultyCount[b.facultyId] || 0) - (facultyCount[a.facultyId] || 0);
//     });
//   };

//   // ------------------------------------------------------------------
//   // Get approved courses
//   // ------------------------------------------------------------------
//   const approvedCourses = AppState.courseDetails.filter(c => c.deanStatus === "approved");
//   if (approvedCourses.length === 0) {
//     console.warn("No approved courses found");
//     return [];
//   }

//   const config = AppState.timetableConfig;
//   const days = config.days;

//   // Generate all time slots of the day (including lunch and breaks)
//   const allTimeSlots = AppState.generateTimeSlots(config);
//   // Keep only the teaching slots (exclude lunch and short breaks)
//   const teachingSlots = allTimeSlots.filter(s => !s.isLunch && !s.isBreak);
//   // teachingSlots is an array of objects: { time, period, endTime, ... }

//   // ------------------------------------------------------------------
//   // Build and sort session list
//   // ------------------------------------------------------------------
//   let sessions = buildSessionList(approvedCourses);
//   const totalTeachingSlots = days.length * teachingSlots.length;
//   const totalSessionsNeeded = sessions.length;

//   console.log(`Total teaching slots available: ${totalTeachingSlots}`);
//   console.log(`Total sessions to schedule: ${totalSessionsNeeded}`);

//   // If there are fewer slots than sessions, we cannot schedule everything.
//   // We'll still try, but may leave sessions unscheduled (should not happen with balanced data).
//   if (totalSessionsNeeded > totalTeachingSlots) {
//     console.error(`Not enough teaching slots! Need ${totalSessionsNeeded}, have ${totalTeachingSlots}`);
//   }

//   sessions = sortSessions(sessions);

//   // ------------------------------------------------------------------
//   // Data structures to track occupancy
//   // ------------------------------------------------------------------
//   const facultyOccupancy = {};   // key: `${day}_${time}_${facultyId}`
//   const roomOccupancy = {};      // key: `${day}_${time}_${roomName}`

//   // Helper to find an available theory room at a given (day, time)
//   const getAvailableTheoryRoom = (day, time) => {
//     const theoryRooms = AppState.rooms.filter(r => r.type === "Theory");
//     return theoryRooms.find(r => !roomOccupancy[`${day}_${time}_${r.name}`]);
//   };

//   // Helper to find a lab room free for two consecutive slots
//   const getAvailableLabRoom = (day, time1, time2) => {
//     const labRooms = AppState.rooms.filter(r => r.type === "Lab");
//     return labRooms.find(r => !roomOccupancy[`${day}_${time1}_${r.name}`] && !roomOccupancy[`${day}_${time2}_${r.name}`]);
//   };

//   // ------------------------------------------------------------------
//   // Step 3 & 4: Fill every teaching slot sequentially
//   // ------------------------------------------------------------------
//   const timetable = [];
//   let sessionIdx = 0;   // index of the next session to try

//   // Iterate over each day and each teaching slot in order
//   for (let d = 0; d < days.length; d++) {
//     const day = days[d];
//     for (let s = 0; s < teachingSlots.length; s++) {
//       const slot = teachingSlots[s];
//       const time = slot.time;

//       // If we have already scheduled all sessions, break out (but we should fill remaining slots with free periods)
//       if (sessionIdx >= sessions.length) {
//         // No more sessions to assign – fill with free period to avoid gaps
//         timetable.push({
//           id: Date.now() + Math.random(),
//           subject: "Free Period",
//           subjectCode: "FREE",
//           facultyName: "None",
//           facultyId: null,
//           room: "N/A",
//           type: "free",
//           color: "#cccccc",
//           day,
//           time,
//           course: "",
//           semester: "",
//           section: "",
//         });
//         continue;
//       }

//       let assigned = false;
//       // Try to assign the current session; if conflict, try the next one (simple linear probe)
//       for (let i = sessionIdx; i < sessions.length && !assigned; i++) {
//         const session = sessions[i];
//         if (session.assigned) continue; // should not happen because we remove assigned ones

//         if (session.type === 'lab') {
//           // Lab requires two consecutive teaching slots
//           const nextSlot = teachingSlots[s + 1];
//           if (!nextSlot) continue; // no next slot available for this lab
//           const time2 = nextSlot.time;
//           const facultyKey1 = `${day}_${time}_${session.facultyId}`;
//           const facultyKey2 = `${day}_${time2}_${session.facultyId}`;
//           if (facultyOccupancy[facultyKey1] || facultyOccupancy[facultyKey2]) continue;

//           const room = getAvailableLabRoom(day, time, time2);
//           if (!room) continue;

//           // Allocate lab (two consecutive slots)
//           timetable.push({
//             id: Date.now() + Math.random(),
//             course: session.course,
//             semester: session.semester,
//             section: session.section,
//             day,
//             time,
//             subject: session.subjectName,
//             subjectId: session.subjectId,
//             subjectCode: session.subjectCode,
//             facultyId: session.facultyId,
//             facultyName: session.facultyName,
//             facultyAvatar: session.facultyAvatar,
//             room: room.name,
//             type: "lab",
//             color: session.color,
//           });
//           timetable.push({
//             id: Date.now() + Math.random(),
//             course: session.course,
//             semester: session.semester,
//             section: session.section,
//             day,
//             time: time2,
//             subject: session.subjectName,
//             subjectId: session.subjectId,
//             subjectCode: session.subjectCode,
//             facultyId: session.facultyId,
//             facultyName: session.facultyName,
//             facultyAvatar: session.facultyAvatar,
//             room: room.name,
//             type: "lab",
//             color: session.color,
//           });

//           // Mark occupancy
//           facultyOccupancy[facultyKey1] = true;
//           facultyOccupancy[facultyKey2] = true;
//           roomOccupancy[`${day}_${time}_${room.name}`] = true;
//           roomOccupancy[`${day}_${time2}_${room.name}`] = true;

//           // Remove this session from the list (swap with last and pop)
//           sessions[i] = sessions[sessions.length - 1];
//           sessions.pop();
//           assigned = true;
//           // Skip the next teaching slot because we already used it
//           s++; // increment outer slot counter
//           break;
//         } else {
//           // Theory session (single slot)
//           const facultyKey = `${day}_${time}_${session.facultyId}`;
//           if (facultyOccupancy[facultyKey]) continue;

//           const room = getAvailableTheoryRoom(day, time);
//           if (!room) continue;

//           timetable.push({
//             id: Date.now() + Math.random(),
//             course: session.course,
//             semester: session.semester,
//             section: session.section,
//             day,
//             time,
//             subject: session.subjectName,
//             subjectId: session.subjectId,
//             subjectCode: session.subjectCode,
//             facultyId: session.facultyId,
//             facultyName: session.facultyName,
//             facultyAvatar: session.facultyAvatar,
//             room: room.name,
//             type: "theory",
//             color: session.color,
//           });

//           facultyOccupancy[facultyKey] = true;
//           roomOccupancy[`${day}_${time}_${room.name}`] = true;

//           // Remove session
//           sessions[i] = sessions[sessions.length - 1];
//           sessions.pop();
//           assigned = true;
//           break;
//         }
//       }

//       if (!assigned) {
//         // No session could be placed at this slot – insert a free period to avoid gaps
//         timetable.push({
//           id: Date.now() + Math.random(),
//           subject: "Free Period",
//           subjectCode: "FREE",
//           facultyName: "None",
//           facultyId: null,
//           room: "N/A",
//           type: "free",
//           color: "#cccccc",
//           day,
//           time,
//           course: "",
//           semester: "",
//           section: "",
//         });
//       }
//     }
//   }

//   // If any sessions remain unscheduled (shouldn't happen with correct data), add them as free periods
//   if (sessions.length > 0) {
//     console.warn(`${sessions.length} sessions could not be scheduled. They will be ignored.`);
//   }

//   AppState.timetable = timetable;
//   saveToStorage(STORAGE_KEYS.TIMETABLE, timetable);
//   console.log(`Generated ${timetable.length} timetable slots (includes free periods if needed)`);
//   return timetable;
// },
  
//   getFacultySchedule: (facultyId) => {
//     return AppState.timetable.filter(t => t.facultyId === facultyId);
//   },
  
//   getStudentSchedule: (course, semester, section) => {
//     return AppState.timetable.filter(t => 
//       t.course === course && 
//       t.semester === semester && 
//       t.section === section
//     );
//   },
  
//   checkAllConflicts: () => {
//     const conflicts = [];
    
//     for (let i = 0; i < AppState.timetable.length; i++) {
//       for (let j = i + 1; j < AppState.timetable.length; j++) {
//         const a = AppState.timetable[i];
//         const b = AppState.timetable[j];
        
//         if (a.day === b.day && a.time === b.time) {
//           if (a.facultyId === b.facultyId) {
//             conflicts.push({
//               type: "faculty",
//               message: `${a.facultyName} assigned to both ${a.subject} and ${b.subject} at ${a.day} ${a.time}`
//             });
//           }
          
//           if (a.room === b.room) {
//             conflicts.push({
//               type: "room",
//               message: `Room ${a.room} assigned to both ${a.subject} and ${b.subject} at ${a.day} ${a.time}`
//             });
//           }
//         }
//       }
//     }
    
//     return conflicts;
//   },
  
//   // ============ FLAGGED ISSUES FUNCTIONS ============
//   getFlaggedIssues: () => {
//     return AppState.flaggedIssues.filter(issue => !issue.resolved);
//   },
  
//   resolveFlaggedIssue: (issueId) => {
//     const issue = AppState.flaggedIssues.find(i => i.id === issueId);
//     if (issue) {
//       issue.resolved = true;
//       saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
//     }
//   },
  
//   // ============ INITIALIZATION ============
//   initializeStorage: () => {
//     const keys = [
//       STORAGE_KEYS.FACULTY, STORAGE_KEYS.SUBJECTS, STORAGE_KEYS.SUBJECT_PREFERENCES,
//       STORAGE_KEYS.ROOMS, STORAGE_KEYS.TIMETABLE_CONFIG, STORAGE_KEYS.SEMESTER_DETAILS,
//       STORAGE_KEYS.FLAGGED_ISSUES, STORAGE_KEYS.STUDENT_PROGRESS, STORAGE_KEYS.DEAN_APPROVALS,
//       STORAGE_KEYS.LEAVE_REQUESTS, STORAGE_KEYS.CALENDAR_EVENTS, STORAGE_KEYS.COURSE_DETAILS,
//       STORAGE_KEYS.TIMETABLE, STORAGE_KEYS.SYLLABUS_PROGRESS, STORAGE_KEYS.FACULTY_SUBMISSIONS,
//       STORAGE_KEYS.PREFERENCE_SETTINGS, STORAGE_KEYS.FACULTY_PREFERENCE_FORM
//     ];
    
//     const defaultValues = {
//       [STORAGE_KEYS.FACULTY]: DEFAULT_FACULTY,
//       [STORAGE_KEYS.SUBJECTS]: DEFAULT_SUBJECTS,
//       [STORAGE_KEYS.SUBJECT_PREFERENCES]: DEFAULT_SUBJECT_PREFERENCES,
//       [STORAGE_KEYS.ROOMS]: DEFAULT_ROOMS,
//       [STORAGE_KEYS.TIMETABLE_CONFIG]: DEFAULT_TIMETABLE_CONFIG,
//       [STORAGE_KEYS.SEMESTER_DETAILS]: DEFAULT_SEMESTER_DETAILS,
//       [STORAGE_KEYS.FLAGGED_ISSUES]: [],
//       [STORAGE_KEYS.STUDENT_PROGRESS]: {},
//       [STORAGE_KEYS.DEAN_APPROVALS]: {},
//       [STORAGE_KEYS.LEAVE_REQUESTS]: [],
//       [STORAGE_KEYS.CALENDAR_EVENTS]: DEFAULT_CALENDAR_EVENTS,
//       [STORAGE_KEYS.COURSE_DETAILS]: [],
//       [STORAGE_KEYS.TIMETABLE]: [],
//       [STORAGE_KEYS.SYLLABUS_PROGRESS]: {},
//       [STORAGE_KEYS.FACULTY_SUBMISSIONS]: [],
//       [STORAGE_KEYS.PREFERENCE_SETTINGS]: {
//         requireOneCoreOneMajorOneMinor: true,
//         requireDifferentSemesters: false,
//         maxPreferencesPerFaculty: 3,
//         minPreferencesRequired: 3,
//         allowSameSemester: true,
//         allowSameType: false,
//         requireDifferentSubjects: true
//       },
//       [STORAGE_KEYS.FACULTY_PREFERENCE_FORM]: {}
//     };
    
//     keys.forEach(key => {
//       if (!localStorage.getItem(key) && defaultValues[key] !== undefined) {
//         saveToStorage(key, defaultValues[key]);
//       }
//     });
    
//     // Ensure faculty is properly loaded
//     const facultyData = loadFromStorage(STORAGE_KEYS.FACULTY, DEFAULT_FACULTY);
//     if (facultyData && facultyData.length > 0) {
//       AppState.faculty = facultyData;
//     } else {
//       AppState.faculty = DEFAULT_FACULTY;
//       saveToStorage(STORAGE_KEYS.FACULTY, DEFAULT_FACULTY);
//     }
    
//     const currentConfig = loadFromStorage(STORAGE_KEYS.TIMETABLE_CONFIG, DEFAULT_TIMETABLE_CONFIG);
//     if (!currentConfig.lunchBreak) {
//       currentConfig.lunchBreak = { start: "12:30", duration: 40 };
//       saveToStorage(STORAGE_KEYS.TIMETABLE_CONFIG, currentConfig);
//       AppState.timetableConfig = currentConfig;
//     }
    
//     let currentSubjects = loadFromStorage(STORAGE_KEYS.SUBJECTS, DEFAULT_SUBJECTS);
//     let needsUpdate = false;
//     const updatedSubjects = currentSubjects.map(subject => {
//       if (!subject.approvalStatus) {
//         needsUpdate = true;
//         return { ...subject, approvalStatus: "approved" };
//       }
//       return subject;
//     });
    
//     if (needsUpdate) {
//       saveToStorage(STORAGE_KEYS.SUBJECTS, updatedSubjects);
//       AppState.subjects = updatedSubjects;
//     }
//   },
// };

// // Initialize AppState
// AppState.init();
// AppState.initializeStorage();

// if (typeof window !== 'undefined') {
//   window.AppState = AppState;
// }

// // src/AppState.js
// import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "./utils/storage";
// import { 
//   DEFAULT_FACULTY, 
//   DEFAULT_SUBJECTS, 
//   DEFAULT_SUBJECT_PREFERENCES, 
//   DEFAULT_ROOMS, 
//   DEFAULT_TIMETABLE_CONFIG, 
//   DEFAULT_SEMESTER_DETAILS,
//   DEFAULT_CALENDAR_EVENTS,
//   COURSES,
//   SEMESTERS,
//   SECTIONS
// } from "./data/mockData";

// // Helper function to calculate syllabus progress
// const calculateSyllabusProgress = (completedModules, totalModules) => {
//   return totalModules > 0 ? (completedModules / totalModules) * 100 : 0;
// };

// // Helper function to generate time slots with lunch break and breaks after every 2 classes
// const generateTimeSlotsUtil = (config) => {
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
//     const endTime = new Date(current.getTime() + config.classDuration * 60000);
//     const endTimeStr = endTime.toTimeString().substring(0, 5);
    
//     // Check for lunch break
//     if (!lunchAdded && current >= lunchStart && current < lunchEnd) {
//       slots.push({
//         time: timeStr,
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
    
//     // Add class
//     if (endTime <= end) {
//       slots.push({
//         time: timeStr,
//         endTime: endTimeStr,
//         period: `P${periodNumber}`,
//         isLunch: false,
//         isBreak: false,
//         label: `${timeStr} - ${endTimeStr}`
//       });
//       periodNumber++;
//       classesBeforeBreak++;
//       current = new Date(endTime);
      
//       // Add break after every 2 classes
//       if (classesBeforeBreak === 2 && config.breakDuration > 0) {
//         const breakStart = new Date(current);
//         const breakEnd = new Date(current.getTime() + config.breakDuration * 60000);
        
//         let shouldAddBreak = false;
//         if (!lunchAdded && breakEnd <= lunchStart) {
//           shouldAddBreak = true;
//         } else if (lunchAdded && breakEnd <= end) {
//           shouldAddBreak = true;
//         }
        
//         if (shouldAddBreak) {
//           slots.push({
//             time: breakStart.toTimeString().substring(0, 5),
//             endTime: breakEnd.toTimeString().substring(0, 5),
//             period: "BREAK",
//             isLunch: false,
//             isBreak: true,
//             label: "SHORT BREAK"
//           });
//           current = breakEnd;
//           classesBeforeBreak = 0;
//         } else {
//           classesBeforeBreak = 0;
//         }
//       }
//     } else {
//       break;
//     }
//   }
  
//   return slots;
// };

// export const AppState = {
//   // Data stores
//   faculty: [],
//   subjects: [],
//   subjectPreferences: [],
//   courseDetails: [],
//   timetable: [],
//   syllabusProgress: {},
//   rooms: [],
//   timetableConfig: {},
//   semesterDetails: {},
//   flaggedIssues: [],
//   studentProgress: {},
//   deanApprovals: {},
  
//   // Initialize all data
//   init: () => {
//     AppState.faculty = loadFromStorage(STORAGE_KEYS.FACULTY, DEFAULT_FACULTY);
//     AppState.subjects = loadFromStorage(STORAGE_KEYS.SUBJECTS, DEFAULT_SUBJECTS);
//     AppState.subjectPreferences = loadFromStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, DEFAULT_SUBJECT_PREFERENCES);
//     AppState.courseDetails = loadFromStorage(STORAGE_KEYS.COURSE_DETAILS, []);
//     AppState.timetable = loadFromStorage(STORAGE_KEYS.TIMETABLE, []);
//     AppState.syllabusProgress = loadFromStorage(STORAGE_KEYS.SYLLABUS_PROGRESS, {});
//     AppState.rooms = loadFromStorage(STORAGE_KEYS.ROOMS, DEFAULT_ROOMS);
//     AppState.timetableConfig = loadFromStorage(STORAGE_KEYS.TIMETABLE_CONFIG, DEFAULT_TIMETABLE_CONFIG);
//     AppState.semesterDetails = loadFromStorage(STORAGE_KEYS.SEMESTER_DETAILS, DEFAULT_SEMESTER_DETAILS);
//     AppState.flaggedIssues = loadFromStorage(STORAGE_KEYS.FLAGGED_ISSUES, []);
//     AppState.studentProgress = loadFromStorage(STORAGE_KEYS.STUDENT_PROGRESS, {});
//     AppState.deanApprovals = loadFromStorage(STORAGE_KEYS.DEAN_APPROVALS, {});
    
//     // Ensure faculty data is valid
//     if (!AppState.faculty || AppState.faculty.length === 0) {
//       AppState.faculty = DEFAULT_FACULTY;
//       saveToStorage(STORAGE_KEYS.FACULTY, DEFAULT_FACULTY);
//     }
//   },
  
//   // ============ FACULTY FUNCTIONS ============
//   getFacultyById: (id) => {
//     return AppState.faculty.find(f => f.id === id);
//   },
  
//   getFacultyByEmail: (email) => {
//     return AppState.faculty.find(f => f.email === email);
//   },
  
//   getCourseDetailsByFacultyId: (facultyId) => {
//     return AppState.courseDetails.filter(c => c.facultyId === facultyId);
//   },
  
//   updateFacultyRemainingHours: (facultyId, assignedHours) => {
//     const faculty = AppState.faculty.find(f => f.id === facultyId);
//     if (faculty) {
//       faculty.assignedHours += assignedHours;
//       faculty.remainingHours = faculty.maxHours - faculty.assignedHours;
//       saveToStorage(STORAGE_KEYS.FACULTY, AppState.faculty);
//     }
//   },
  
//   // ============ PREFERENCE FUNCTIONS ============
//   getPreferenceByFacultyId: (facultyId) => {
//     return AppState.subjectPreferences.find(p => p.facultyId === facultyId);
//   },
  
//   submitSubjectPreferences: (facultyId, preferences) => {
//     const pref = AppState.subjectPreferences.find(p => p.facultyId === facultyId);
//     if (pref) {
//       pref.submitted = true;
//       pref.preferences = preferences;
//       pref.status = "pending";
//       pref.feedback = "";
//       pref.submittedAt = new Date().toISOString();
//       saveToStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, AppState.subjectPreferences);
//     }
//   },
  
//   updatePreferenceStatus: (facultyId, status, feedback = "", allocatedSubjects = []) => {
//     const pref = AppState.subjectPreferences.find(p => p.facultyId === facultyId);
//     if (pref) {
//       pref.status = status;
//       pref.feedback = feedback;
      
//       if (status === "allocated" && allocatedSubjects.length > 0) {
//         pref.allocatedSubjects = allocatedSubjects;
//         pref.allocatedAt = new Date().toISOString();
        
//         allocatedSubjects.forEach(subjectId => {
//           const subject = AppState.subjects.find(s => s.id === subjectId);
//           if (subject) {
//             AppState.updateFacultyRemainingHours(facultyId, subject.totalWeeklyClasses);
//           }
//         });
//       }
      
//       if (status === "approved") {
//         pref.approvedAt = new Date().toISOString();
//         pref.approvedBy = "dean";
//       }
      
//       if (status === "rejected") {
//         pref.rejectedAt = new Date().toISOString();
//       }
      
//       saveToStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, AppState.subjectPreferences);
//     }
//   },
  
//   resetPreferenceForm: (facultyId) => {
//     const pref = AppState.subjectPreferences.find(p => p.facultyId === facultyId);
//     if (pref) {
//       pref.submitted = false;
//       pref.status = "pending";
//       pref.feedback = "";
//       pref.preferences = [];
//       pref.allocatedSubjects = [];
//       saveToStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, AppState.subjectPreferences);
//     }
//   },
  
//   // ============ SEMESTER FUNCTIONS ============
//   updateSemesterDetails: (course, semester, details) => {
//     if (!AppState.semesterDetails[course]) {
//       AppState.semesterDetails[course] = {};
//     }
//     AppState.semesterDetails[course][semester] = details;
//     saveToStorage(STORAGE_KEYS.SEMESTER_DETAILS, AppState.semesterDetails);
//   },
  
//   getSubjectsForCourseAndSemester: (course, semester) => {
//     const details = AppState.semesterDetails[course]?.[semester];
//     if (!details) return [];
    
//     return details.subjects.map(subjectId => 
//       AppState.subjects.find(s => s.id === subjectId)
//     ).filter(s => s && s.approvalStatus === "approved");
//   },
  
//   // ============ COURSE DETAILS FUNCTIONS ============
//   submitCourseDetails: (facultyId, courses) => {
//     const coursesWithStatus = courses.map(course => ({
//       ...course,
//       deanStatus: "pending",
//       coordinatorStatus: "pending",
//       deanFeedback: "",
//       coordinatorFeedback: "",
//       submittedAt: new Date().toISOString()
//     }));
    
//     AppState.courseDetails = AppState.courseDetails.filter(c => c.facultyId !== facultyId);
//     AppState.courseDetails.push(...coursesWithStatus);
//     saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
    
//     courses.forEach(course => {
//       const subject = AppState.subjects.find(s => s.id === course.subjectId);
//       if (subject) {
//         const progressKey = `${facultyId}_${course.subjectId}`;
//         AppState.syllabusProgress[progressKey] = {
//           facultyId,
//           facultyName: AppState.getFacultyById(facultyId)?.name,
//           subjectId: course.subjectId,
//           subjectName: subject.name,
//           subjectCode: subject.code,
//           course: course.course,
//           semester: course.semester,
//           sections: course.sections,
//           totalModules: course.modules,
//           completedModules: 0,
//           modules: Array(course.modules).fill(false),
//           lastUpdated: new Date().toISOString(),
//           completionPercentage: 0
//         };
//       }
//     });
//     saveToStorage(STORAGE_KEYS.SYLLABUS_PROGRESS, AppState.syllabusProgress);
//   },
  
//   updateCourseDetailCoordinatorStatus: (courseId, status, feedback = "") => {
//     const course = AppState.courseDetails.find(c => c.id === courseId);
//     if (course) {
//       course.coordinatorStatus = status;
//       course.coordinatorFeedback = feedback;
//       if (status === "reviewed") {
//         course.reviewedAt = new Date().toISOString();
//       }
//       saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
//     }
//   },
  
//   updateCourseDetailDeanStatus: (courseId, status, feedback = "") => {
//     const course = AppState.courseDetails.find(c => c.id === courseId);
//     if (course) {
//       course.deanStatus = status;
//       course.deanFeedback = feedback;
//       if (status === "approved") {
//         course.approvedAt = new Date().toISOString();
//         AppState.checkSyllabusDiscrepancy(course.facultyId, course.subjectId);
//       }
//       if (status === "rejected") {
//         course.rejectedAt = new Date().toISOString();
//       }
//       saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
//     }
//   },
  
//   getPendingCoordinatorReviews: () => {
//     return AppState.courseDetails.filter(c => 
//       c.coordinatorStatus === "pending"
//     );
//   },
  
//   getPendingDeanCourseApprovals: () => {
//     return AppState.courseDetails.filter(c => 
//       c.coordinatorStatus === "reviewed" && 
//       c.deanStatus === "pending"
//     );
//   },
  
//   getPendingDeanPreferenceApprovals: () => {
//     return AppState.subjectPreferences.filter(p => 
//       p.status === "allocated"
//     );
//   },
  
//   getPendingSubjectApprovals: () => {
//     return AppState.subjects.filter(s => s.approvalStatus === "pending");
//   },
  
//   getApprovedSubjects: () => {
//     return AppState.subjects.filter(s => s.approvalStatus === "approved");
//   },
  
//   getRejectedSubjects: () => {
//     return AppState.subjects.filter(s => s.approvalStatus === "rejected");
//   },
  
//   // Alias for backward compatibility
//   getPendingDeanApprovals: () => {
//     return AppState.getPendingDeanCourseApprovals();
//   },
  
//   // ============ SYLLABUS & PROGRESS FUNCTIONS ============
//   getSyllabusProgress: (facultyId, subjectId) => {
//     const progressKey = `${facultyId}_${subjectId}`;
//     return AppState.syllabusProgress[progressKey] || null;
//   },
  
//   // Calculate conflict severity based on difference percentage
//   calculateConflictSeverity: (facultyProgress, avgStudentProgress, totalModules) => {
//     const difference = Math.abs(facultyProgress - avgStudentProgress);
//     const percentageDiff = totalModules > 0 ? (difference / totalModules) * 100 : 0;
    
//     // Increased thresholds to reduce false alerts
//     if (percentageDiff >= 40) {
//       return { level: "critical", percentage: percentageDiff, action: "Immediate meeting with Dean required" };
//     } else if (percentageDiff >= 30) {
//       return { level: "high", percentage: percentageDiff, action: "Dean review and explanation required" };
//     } else if (percentageDiff >= 20) {
//       return { level: "medium", percentage: percentageDiff, action: "Faculty explanation recommended" };
//     }
//     return { level: "low", percentage: percentageDiff, action: "Monitor only - No action needed" };
//   },
  
//   // Check and raise syllabus conflict alert for dean
//   checkAndRaiseSyllabusConflict: (facultyId, subjectId) => {
//     const facultyProgress = AppState.getSyllabusProgress(facultyId, subjectId);
//     if (!facultyProgress) return null;
    
//     // Collect all student progress for this subject
//     let totalStudentProgress = 0;
//     let studentCount = 0;
//     const studentDetails = [];
    
//     for (const key in AppState.studentProgress) {
//       if (key.includes(subjectId)) {
//         const studentProgress = AppState.studentProgress[key];
//         totalStudentProgress += studentProgress.completedModules;
//         studentCount++;
//         studentDetails.push({
//           studentId: studentProgress.studentId,
//           progress: studentProgress.completedModules
//         });
//       }
//     }
    
//     // Only check if there are at least 3 students (to avoid noise)
//     if (studentCount < 3) return null;
    
//     const avgStudentProgress = totalStudentProgress / studentCount;
//     const facultyCompleted = facultyProgress.completedModules;
//     const totalModules = facultyProgress.totalModules;
    
//     // Calculate severity
//     const severity = AppState.calculateConflictSeverity(facultyCompleted, avgStudentProgress, totalModules);
    
//     // Only raise alert for medium, high, or critical severity
//     if (severity.level !== "low") {
//       // Check if unresolved conflict already exists
//       const existingConflict = AppState.flaggedIssues.find(issue => 
//         issue.type === "syllabus_conflict" && 
//         issue.subjectId === subjectId && 
//         issue.facultyId === facultyId &&
//         !issue.resolved
//       );
      
//       // If conflict exists but severity changed, update it
//       if (existingConflict) {
//         if (existingConflict.severity !== severity.level || 
//             existingConflict.facultyProgress !== facultyCompleted ||
//             Math.abs(existingConflict.averageStudentProgress - avgStudentProgress) > 0.5) {
          
//           // Update existing conflict
//           existingConflict.severity = severity.level;
//           existingConflict.severityPercentage = severity.percentage;
//           existingConflict.facultyProgress = facultyCompleted;
//           existingConflict.averageStudentProgress = avgStudentProgress;
//           existingConflict.requiredAction = severity.action;
//           existingConflict.lastUpdated = new Date().toISOString();
          
//           saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
          
//           // Update dean notification
//           AppState.updateDeanNotification(existingConflict);
//         }
//         return existingConflict;
//       }
      
//       // Only create new conflict if difference is significant (avoid noise)
//       if (severity.percentage >= 20) {
//         const conflict = {
//           id: Date.now() + Math.random(),
//           type: "syllabus_conflict",
//           subjectId,
//           subjectName: facultyProgress.subjectName,
//           facultyId,
//           facultyName: facultyProgress.facultyName,
//           facultyProgress: facultyCompleted,
//           averageStudentProgress: avgStudentProgress,
//           totalModules,
//           severity: severity.level,
//           severityPercentage: severity.percentage,
//           requiredAction: severity.action,
//           studentsAffected: studentCount,
//           studentDetails: studentDetails,
//           timestamp: new Date().toISOString(),
//           lastUpdated: new Date().toISOString(),
//           resolved: false,
//           resolution: null,
//           facultyResponse: null,
//           deanAction: null
//         };
        
//         AppState.flaggedIssues.push(conflict);
//         saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
        
//         // Create dean notification
//         AppState.createDeanNotification(conflict);
        
//         return conflict;
//       }
//     }
    
//     return null;
//   },
  
//   // Create notification for dean
//   createDeanNotification: (conflict) => {
//     const notifications = loadFromStorage('acadplan_dean_notifications', []);
    
//     const notification = {
//       id: Date.now(),
//       conflictId: conflict.id,
//       subjectName: conflict.subjectName,
//       facultyName: conflict.facultyName,
//       severity: conflict.severity,
//       severityPercentage: conflict.severityPercentage,
//       message: `${conflict.severity.toUpperCase()} severity conflict detected in ${conflict.subjectName}. Faculty progress: ${conflict.facultyProgress}/${conflict.totalModules} modules, Student average: ${conflict.averageStudentProgress.toFixed(1)}/${conflict.totalModules} modules. Difference: ${conflict.severityPercentage.toFixed(1)}%. ${conflict.requiredAction}`,
//       timestamp: conflict.timestamp,
//       read: false,
//       actionTaken: false
//     };
    
//     notifications.push(notification);
//     saveToStorage('acadplan_dean_notifications', notifications);
//     window.dispatchEvent(new Event('storage'));
//   },
  
//   // Update dean notification
//   updateDeanNotification: (conflict) => {
//     const notifications = loadFromStorage('acadplan_dean_notifications', []);
//     const notification = notifications.find(n => n.conflictId === conflict.id);
//     if (notification) {
//       notification.severity = conflict.severity;
//       notification.severityPercentage = conflict.severityPercentage;
//       notification.message = `${conflict.severity.toUpperCase()} severity conflict detected in ${conflict.subjectName}. Faculty progress: ${conflict.facultyProgress}/${conflict.totalModules} modules, Student average: ${conflict.averageStudentProgress.toFixed(1)}/${conflict.totalModules} modules. Difference: ${conflict.severityPercentage.toFixed(1)}%. ${conflict.requiredAction}`;
//       notification.lastUpdated = conflict.lastUpdated;
//       saveToStorage('acadplan_dean_notifications', notifications);
//     }
//   },
  
//   // Faculty response to conflict
//   facultyRespondToConflict: (conflictId, responseType, explanation) => {
//     const issue = AppState.flaggedIssues.find(i => i.id === conflictId);
//     if (issue) {
//       issue.facultyResponse = {
//         responseType: responseType, // 'explanation' or 'meeting_requested'
//         explanation: explanation,
//         respondedAt: new Date().toISOString()
//       };
//       saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
      
//       // Update dean notification
//       const notifications = loadFromStorage('acadplan_dean_notifications', []);
//       const notification = notifications.find(n => n.conflictId === conflictId);
//       if (notification) {
//         notification.facultyResponded = true;
//         notification.facultyResponseType = responseType;
//         notification.facultyExplanation = explanation;
//         notification.facultyRespondedAt = new Date().toISOString();
//         saveToStorage('acadplan_dean_notifications', notifications);
//       }
      
//       window.dispatchEvent(new Event('storage'));
//       return true;
//     }
//     return false;
//   },
  
//   // Dean action on conflict
//   deanResolveConflict: (conflictId, action, notes) => {
//     const issue = AppState.flaggedIssues.find(i => i.id === conflictId);
//     if (issue) {
//       issue.deanAction = {
//         action: action, // 'approved', 'warning_issued', 'meeting_scheduled', 'investigation'
//         notes: notes,
//         actionedAt: new Date().toISOString()
//       };
//       issue.resolved = true;
//       issue.resolution = action;
//       issue.resolvedAt = new Date().toISOString();
//       saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
      
//       // Update notification
//       const notifications = loadFromStorage('acadplan_dean_notifications', []);
//       const notificationIndex = notifications.findIndex(n => n.conflictId === conflictId);
//       if (notificationIndex !== -1) {
//         notifications[notificationIndex].actionTaken = true;
//         notifications[notificationIndex].deanAction = action;
//         notifications[notificationIndex].deanNotes = notes;
//         notifications[notificationIndex].resolvedAt = new Date().toISOString();
//         saveToStorage('acadplan_dean_notifications', notifications);
//       }
      
//       window.dispatchEvent(new Event('storage'));
//       return true;
//     }
//     return false;
//   },
  
//   // Get unresolved syllabus conflicts
//   getUnresolvedSyllabusConflicts: () => {
//     return AppState.flaggedIssues.filter(issue => 
//       issue.type === "syllabus_conflict" && !issue.resolved
//     );
//   },
  
//   // Get conflicts by severity
//   getConflictsBySeverity: (severity) => {
//     return AppState.flaggedIssues.filter(issue => 
//       issue.type === "syllabus_conflict" && issue.severity === severity && !issue.resolved
//     );
//   },
  
//   // Get dean notifications
//   getDeanNotifications: () => {
//     return loadFromStorage('acadplan_dean_notifications', []);
//   },
  
//   // Mark dean notification as read
//   markDeanNotificationAsRead: (notificationId) => {
//     const notifications = loadFromStorage('acadplan_dean_notifications', []);
//     const notification = notifications.find(n => n.id === notificationId);
//     if (notification) {
//       notification.read = true;
//       saveToStorage('acadplan_dean_notifications', notifications);
//       window.dispatchEvent(new Event('storage'));
//     }
//   },
  
//   updateSyllabusProgress: (facultyId, subjectId, moduleIndex, completed) => {
//     const progressKey = `${facultyId}_${subjectId}`;
//     if (AppState.syllabusProgress[progressKey]) {
//       const progress = AppState.syllabusProgress[progressKey];
//       progress.modules[moduleIndex] = completed;
//       progress.completedModules = progress.modules.filter(m => m).length;
//       progress.lastUpdated = new Date().toISOString();
//       progress.completionPercentage = calculateSyllabusProgress(
//         progress.completedModules, 
//         progress.totalModules
//       );
      
//       saveToStorage(STORAGE_KEYS.SYLLABUS_PROGRESS, AppState.syllabusProgress);
      
//       // Check for student-faculty discrepancy (individual)
//       AppState.checkSyllabusDiscrepancy(facultyId, subjectId);
      
//       // Check and raise syllabus conflict alert for dean (aggregate)
//       AppState.checkAndRaiseSyllabusConflict(facultyId, subjectId);
//     }
//   },
  
//   updateStudentProgress: (studentId, subjectId, moduleIndex, completed) => {
//     const key = `${studentId}_${subjectId}`;
//     if (!AppState.studentProgress[key]) {
//       const subject = AppState.subjects.find(s => s.id === subjectId);
//       AppState.studentProgress[key] = {
//         studentId,
//         subjectId,
//         subjectName: subject?.name,
//         totalModules: subject?.modules || 0,
//         completedModules: 0,
//         modules: Array(subject?.modules || 0).fill(false),
//         lastUpdated: new Date().toISOString(),
//       };
//     }
    
//     const progress = AppState.studentProgress[key];
//     progress.modules[moduleIndex] = completed;
//     progress.completedModules = progress.modules.filter(m => m).length;
//     progress.lastUpdated = new Date().toISOString();
    
//     saveToStorage(STORAGE_KEYS.STUDENT_PROGRESS, AppState.studentProgress);
    
//     // Check for student-faculty discrepancy (individual)
//     AppState.checkSyllabusDiscrepancyForStudent(studentId, subjectId);
    
//     // Find faculty for this subject and check aggregate conflict
//     const facultyProgress = AppState.getSyllabusProgressForSubject(subjectId);
//     if (facultyProgress) {
//       AppState.checkAndRaiseSyllabusConflict(facultyProgress.facultyId, subjectId);
//     }
//   },
  
//   getStudentProgress: (studentId, subjectId) => {
//     const key = `${studentId}_${subjectId}`;
//     return AppState.studentProgress[key] || null;
//   },
  
//   checkSyllabusDiscrepancy: (facultyId, subjectId) => {
//     const facultyProgress = AppState.getSyllabusProgress(facultyId, subjectId);
//     if (!facultyProgress) return;
    
//     for (const key in AppState.studentProgress) {
//       if (key.includes(subjectId)) {
//         const studentProgress = AppState.studentProgress[key];
//         const facultyCompleted = facultyProgress.completedModules;
//         const studentCompleted = studentProgress.completedModules;
//         const threshold = Math.ceil(facultyProgress.totalModules * 0.1);
        
//         if (Math.abs(facultyCompleted - studentCompleted) > threshold) {
//           const issue = {
//             id: Date.now() + Math.random(),
//             type: "student_faculty_discrepancy",
//             subjectId,
//             subjectName: facultyProgress.subjectName,
//             facultyProgress: facultyCompleted,
//             studentProgress: studentCompleted,
//             facultyId,
//             studentId: studentProgress.studentId,
//             timestamp: new Date().toISOString(),
//             resolved: false
//           };
          
//           const exists = AppState.flaggedIssues.some(i => 
//             i.type === "student_faculty_discrepancy" && 
//             i.subjectId === subjectId && 
//             i.facultyId === facultyId &&
//             i.studentId === studentProgress.studentId &&
//             !i.resolved
//           );
          
//           if (!exists) {
//             AppState.flaggedIssues.push(issue);
//             saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
//           }
//         }
//       }
//     }
//   },
  
//   checkSyllabusDiscrepancyForStudent: (studentId, subjectId) => {
//     const studentProgress = AppState.getStudentProgress(studentId, subjectId);
//     if (!studentProgress) return;
    
//     const facultyProgress = AppState.getSyllabusProgressForSubject(subjectId);
//     if (facultyProgress) {
//       const facultyCompleted = facultyProgress.completedModules;
//       const studentCompleted = studentProgress.completedModules;
//       const threshold = Math.ceil(studentProgress.totalModules * 0.1);
      
//       if (Math.abs(facultyCompleted - studentCompleted) > threshold) {
//         const issue = {
//           id: Date.now(),
//           type: "student_faculty_discrepancy",
//           subjectId,
//           subjectName: studentProgress.subjectName,
//           facultyProgress: facultyCompleted,
//           studentProgress: studentCompleted,
//           facultyId: facultyProgress.facultyId,
//           studentId,
//           timestamp: new Date().toISOString(),
//           resolved: false
//         };
        
//         const exists = AppState.flaggedIssues.some(i => 
//           i.type === "student_faculty_discrepancy" && 
//           i.subjectId === subjectId && 
//           i.facultyId === facultyProgress.facultyId &&
//           i.studentId === studentId &&
//           !i.resolved
//         );
        
//         if (!exists) {
//           AppState.flaggedIssues.push(issue);
//           saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
//         }
//       }
//     }
//   },
  
//   getSyllabusProgressForSubject: (subjectId) => {
//     for (const key in AppState.syllabusProgress) {
//       if (key.includes(subjectId)) {
//         return AppState.syllabusProgress[key];
//       }
//     }
//     return null;
//   },
  
//   // ============ TIMETABLE FUNCTIONS ============
//   generateTimeSlots: (config) => {
//     return generateTimeSlotsUtil(config);
//   },
  
//   updateTimetableConfig: (config) => {
//     AppState.timetableConfig = config;
//     saveToStorage(STORAGE_KEYS.TIMETABLE_CONFIG, config);
//   },
  
//   generateTimetable: () => {
//     console.log("=== GENERATING TIMETABLE (Conflict-free & Gap-free) ===");

//     const buildSessionList = (approvedCourses) => {
//       const sessions = [];
//       for (const courseDetail of approvedCourses) {
//         const subject = AppState.subjects.find(s => s.id === courseDetail.subjectId);
//         if (!subject) continue;
//         const faculty = AppState.faculty.find(f => f.id === courseDetail.facultyId);
//         if (!faculty) continue;

//         const sections = courseDetail.sections || SECTIONS;

//         for (const section of sections) {
//           for (let i = 0; i < subject.theoryClassesPerWeek; i++) {
//             sessions.push({
//               id: `${courseDetail.id}_theory_${section}_${i}`,
//               course: courseDetail.course,
//               semester: courseDetail.semester,
//               section,
//               subjectId: subject.id,
//               subjectName: subject.name,
//               subjectCode: subject.code,
//               facultyId: faculty.id,
//               facultyName: faculty.name,
//               facultyAvatar: faculty.avatar,
//               color: faculty.color,
//               type: 'theory',
//             });
//           }
//           for (let i = 0; i < subject.labPeriodsPerWeek; i++) {
//             sessions.push({
//               id: `${courseDetail.id}_lab_${section}_${i}`,
//               course: courseDetail.course,
//               semester: courseDetail.semester,
//               section,
//               subjectId: subject.id,
//               subjectName: subject.name,
//               subjectCode: subject.code,
//               facultyId: faculty.id,
//               facultyName: faculty.name,
//               facultyAvatar: faculty.avatar,
//               color: faculty.color,
//               type: 'lab',
//             });
//           }
//         }
//       }
//       return sessions;
//     };

//     const sortSessions = (sessions) => {
//       const facultyCount = {};
//       sessions.forEach(s => { facultyCount[s.facultyId] = (facultyCount[s.facultyId] || 0) + 1; });
//       return [...sessions].sort((a, b) => {
//         if (a.type !== b.type) return a.type === 'lab' ? -1 : 1;
//         return (facultyCount[b.facultyId] || 0) - (facultyCount[a.facultyId] || 0);
//       });
//     };

//     const approvedCourses = AppState.courseDetails.filter(c => c.deanStatus === "approved");
//     if (approvedCourses.length === 0) {
//       console.warn("No approved courses found");
//       return [];
//     }

//     const config = AppState.timetableConfig;
//     const days = config.days;

//     const allTimeSlots = AppState.generateTimeSlots(config);
//     const teachingSlots = allTimeSlots.filter(s => !s.isLunch && !s.isBreak);

//     let sessions = buildSessionList(approvedCourses);
//     const totalTeachingSlots = days.length * teachingSlots.length;
//     const totalSessionsNeeded = sessions.length;

//     console.log(`Total teaching slots available: ${totalTeachingSlots}`);
//     console.log(`Total sessions to schedule: ${totalSessionsNeeded}`);

//     if (totalSessionsNeeded > totalTeachingSlots) {
//       console.error(`Not enough teaching slots! Need ${totalSessionsNeeded}, have ${totalTeachingSlots}`);
//     }

//     sessions = sortSessions(sessions);

//     const facultyOccupancy = {};
//     const roomOccupancy = {};

//     const getAvailableTheoryRoom = (day, time) => {
//       const theoryRooms = AppState.rooms.filter(r => r.type === "Theory");
//       return theoryRooms.find(r => !roomOccupancy[`${day}_${time}_${r.name}`]);
//     };

//     const getAvailableLabRoom = (day, time1, time2) => {
//       const labRooms = AppState.rooms.filter(r => r.type === "Lab");
//       return labRooms.find(r => !roomOccupancy[`${day}_${time1}_${r.name}`] && !roomOccupancy[`${day}_${time2}_${r.name}`]);
//     };

//     const timetable = [];
//     let sessionIdx = 0;

//     for (let d = 0; d < days.length; d++) {
//       const day = days[d];
//       for (let s = 0; s < teachingSlots.length; s++) {
//         const slot = teachingSlots[s];
//         const time = slot.time;

//         if (sessionIdx >= sessions.length) {
//           timetable.push({
//             id: Date.now() + Math.random(),
//             subject: "Free Period",
//             subjectCode: "FREE",
//             facultyName: "None",
//             facultyId: null,
//             room: "N/A",
//             type: "free",
//             color: "#cccccc",
//             day,
//             time,
//             course: "",
//             semester: "",
//             section: "",
//           });
//           continue;
//         }

//         let assigned = false;
//         for (let i = sessionIdx; i < sessions.length && !assigned; i++) {
//           const session = sessions[i];
//           if (session.assigned) continue;

//           if (session.type === 'lab') {
//             const nextSlot = teachingSlots[s + 1];
//             if (!nextSlot) continue;
//             const time2 = nextSlot.time;
//             const facultyKey1 = `${day}_${time}_${session.facultyId}`;
//             const facultyKey2 = `${day}_${time2}_${session.facultyId}`;
//             if (facultyOccupancy[facultyKey1] || facultyOccupancy[facultyKey2]) continue;

//             const room = getAvailableLabRoom(day, time, time2);
//             if (!room) continue;

//             timetable.push({
//               id: Date.now() + Math.random(),
//               course: session.course,
//               semester: session.semester,
//               section: session.section,
//               day,
//               time,
//               subject: session.subjectName,
//               subjectId: session.subjectId,
//               subjectCode: session.subjectCode,
//               facultyId: session.facultyId,
//               facultyName: session.facultyName,
//               facultyAvatar: session.facultyAvatar,
//               room: room.name,
//               type: "lab",
//               color: session.color,
//             });
//             timetable.push({
//               id: Date.now() + Math.random(),
//               course: session.course,
//               semester: session.semester,
//               section: session.section,
//               day,
//               time: time2,
//               subject: session.subjectName,
//               subjectId: session.subjectId,
//               subjectCode: session.subjectCode,
//               facultyId: session.facultyId,
//               facultyName: session.facultyName,
//               facultyAvatar: session.facultyAvatar,
//               room: room.name,
//               type: "lab",
//               color: session.color,
//             });

//             facultyOccupancy[facultyKey1] = true;
//             facultyOccupancy[facultyKey2] = true;
//             roomOccupancy[`${day}_${time}_${room.name}`] = true;
//             roomOccupancy[`${day}_${time2}_${room.name}`] = true;

//             sessions[i] = sessions[sessions.length - 1];
//             sessions.pop();
//             assigned = true;
//             s++;
//             break;
//           } else {
//             const facultyKey = `${day}_${time}_${session.facultyId}`;
//             if (facultyOccupancy[facultyKey]) continue;

//             const room = getAvailableTheoryRoom(day, time);
//             if (!room) continue;

//             timetable.push({
//               id: Date.now() + Math.random(),
//               course: session.course,
//               semester: session.semester,
//               section: session.section,
//               day,
//               time,
//               subject: session.subjectName,
//               subjectId: session.subjectId,
//               subjectCode: session.subjectCode,
//               facultyId: session.facultyId,
//               facultyName: session.facultyName,
//               facultyAvatar: session.facultyAvatar,
//               room: room.name,
//               type: "theory",
//               color: session.color,
//             });

//             facultyOccupancy[facultyKey] = true;
//             roomOccupancy[`${day}_${time}_${room.name}`] = true;

//             sessions[i] = sessions[sessions.length - 1];
//             sessions.pop();
//             assigned = true;
//             break;
//           }
//         }

//         if (!assigned) {
//           timetable.push({
//             id: Date.now() + Math.random(),
//             subject: "Free Period",
//             subjectCode: "FREE",
//             facultyName: "None",
//             facultyId: null,
//             room: "N/A",
//             type: "free",
//             color: "#cccccc",
//             day,
//             time,
//             course: "",
//             semester: "",
//             section: "",
//           });
//         }
//       }
//     }

//     if (sessions.length > 0) {
//       console.warn(`${sessions.length} sessions could not be scheduled. They will be ignored.`);
//     }

//     AppState.timetable = timetable;
//     saveToStorage(STORAGE_KEYS.TIMETABLE, timetable);
//     console.log(`Generated ${timetable.length} timetable slots (includes free periods if needed)`);
//     return timetable;
//   },
  
//   getFacultySchedule: (facultyId) => {
//     return AppState.timetable.filter(t => t.facultyId === facultyId);
//   },
  
//   getStudentSchedule: (course, semester, section) => {
//     return AppState.timetable.filter(t => 
//       t.course === course && 
//       t.semester === semester && 
//       t.section === section
//     );
//   },
  
//   checkAllConflicts: () => {
//     const conflicts = [];
    
//     for (let i = 0; i < AppState.timetable.length; i++) {
//       for (let j = i + 1; j < AppState.timetable.length; j++) {
//         const a = AppState.timetable[i];
//         const b = AppState.timetable[j];
        
//         if (a.day === b.day && a.time === b.time) {
//           if (a.facultyId === b.facultyId) {
//             conflicts.push({
//               type: "faculty",
//               message: `${a.facultyName} assigned to both ${a.subject} and ${b.subject} at ${a.day} ${a.time}`
//             });
//           }
          
//           if (a.room === b.room) {
//             conflicts.push({
//               type: "room",
//               message: `Room ${a.room} assigned to both ${a.subject} and ${b.subject} at ${a.day} ${a.time}`
//             });
//           }
//         }
//       }
//     }
    
//     return conflicts;
//   },
  
//   // ============ FLAGGED ISSUES FUNCTIONS ============
//   getFlaggedIssues: () => {
//     return AppState.flaggedIssues.filter(issue => !issue.resolved);
//   },
  
//   resolveFlaggedIssue: (issueId) => {
//     const issue = AppState.flaggedIssues.find(i => i.id === issueId);
//     if (issue) {
//       issue.resolved = true;
//       saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
//     }
//   },
  
//   // ============ INITIALIZATION ============
//   initializeStorage: () => {
//     const keys = [
//       STORAGE_KEYS.FACULTY, STORAGE_KEYS.SUBJECTS, STORAGE_KEYS.SUBJECT_PREFERENCES,
//       STORAGE_KEYS.ROOMS, STORAGE_KEYS.TIMETABLE_CONFIG, STORAGE_KEYS.SEMESTER_DETAILS,
//       STORAGE_KEYS.FLAGGED_ISSUES, STORAGE_KEYS.STUDENT_PROGRESS, STORAGE_KEYS.DEAN_APPROVALS,
//       STORAGE_KEYS.LEAVE_REQUESTS, STORAGE_KEYS.CALENDAR_EVENTS, STORAGE_KEYS.COURSE_DETAILS,
//       STORAGE_KEYS.TIMETABLE, STORAGE_KEYS.SYLLABUS_PROGRESS, STORAGE_KEYS.FACULTY_SUBMISSIONS,
//       STORAGE_KEYS.PREFERENCE_SETTINGS, STORAGE_KEYS.FACULTY_PREFERENCE_FORM
//     ];
    
//     const defaultValues = {
//       [STORAGE_KEYS.FACULTY]: DEFAULT_FACULTY,
//       [STORAGE_KEYS.SUBJECTS]: DEFAULT_SUBJECTS,
//       [STORAGE_KEYS.SUBJECT_PREFERENCES]: DEFAULT_SUBJECT_PREFERENCES,
//       [STORAGE_KEYS.ROOMS]: DEFAULT_ROOMS,
//       [STORAGE_KEYS.TIMETABLE_CONFIG]: DEFAULT_TIMETABLE_CONFIG,
//       [STORAGE_KEYS.SEMESTER_DETAILS]: DEFAULT_SEMESTER_DETAILS,
//       [STORAGE_KEYS.FLAGGED_ISSUES]: [],
//       [STORAGE_KEYS.STUDENT_PROGRESS]: {},
//       [STORAGE_KEYS.DEAN_APPROVALS]: {},
//       [STORAGE_KEYS.LEAVE_REQUESTS]: [],
//       [STORAGE_KEYS.CALENDAR_EVENTS]: DEFAULT_CALENDAR_EVENTS,
//       [STORAGE_KEYS.COURSE_DETAILS]: [],
//       [STORAGE_KEYS.TIMETABLE]: [],
//       [STORAGE_KEYS.SYLLABUS_PROGRESS]: {},
//       [STORAGE_KEYS.FACULTY_SUBMISSIONS]: [],
//       [STORAGE_KEYS.PREFERENCE_SETTINGS]: {
//         requireOneCoreOneMajorOneMinor: true,
//         requireDifferentSemesters: false,
//         maxPreferencesPerFaculty: 3,
//         minPreferencesRequired: 3,
//         allowSameSemester: true,
//         allowSameType: false,
//         requireDifferentSubjects: true
//       },
//       [STORAGE_KEYS.FACULTY_PREFERENCE_FORM]: {}
//     };
    
//     keys.forEach(key => {
//       if (!localStorage.getItem(key) && defaultValues[key] !== undefined) {
//         saveToStorage(key, defaultValues[key]);
//       }
//     });
    
//     // Ensure faculty is properly loaded
//     const facultyData = loadFromStorage(STORAGE_KEYS.FACULTY, DEFAULT_FACULTY);
//     if (facultyData && facultyData.length > 0) {
//       AppState.faculty = facultyData;
//     } else {
//       AppState.faculty = DEFAULT_FACULTY;
//       saveToStorage(STORAGE_KEYS.FACULTY, DEFAULT_FACULTY);
//     }
    
//     const currentConfig = loadFromStorage(STORAGE_KEYS.TIMETABLE_CONFIG, DEFAULT_TIMETABLE_CONFIG);
//     if (!currentConfig.lunchBreak) {
//       currentConfig.lunchBreak = { start: "12:30", duration: 40 };
//       saveToStorage(STORAGE_KEYS.TIMETABLE_CONFIG, currentConfig);
//       AppState.timetableConfig = currentConfig;
//     }
    
//     let currentSubjects = loadFromStorage(STORAGE_KEYS.SUBJECTS, DEFAULT_SUBJECTS);
//     let needsUpdate = false;
//     const updatedSubjects = currentSubjects.map(subject => {
//       if (!subject.approvalStatus) {
//         needsUpdate = true;
//         return { ...subject, approvalStatus: "approved" };
//       }
//       return subject;
//     });
    
//     if (needsUpdate) {
//       saveToStorage(STORAGE_KEYS.SUBJECTS, updatedSubjects);
//       AppState.subjects = updatedSubjects;
//     }
//   },
// };

// // Initialize AppState
// AppState.init();
// AppState.initializeStorage();

// if (typeof window !== 'undefined') {
//   window.AppState = AppState;
// }

// // src/AppState.js
// import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "./utils/storage";
// import { 
//   DEFAULT_FACULTY, 
//   DEFAULT_SUBJECTS, 
//   DEFAULT_SUBJECT_PREFERENCES, 
//   DEFAULT_ROOMS, 
//   DEFAULT_TIMETABLE_CONFIG, 
//   DEFAULT_SEMESTER_DETAILS,
//   DEFAULT_CALENDAR_EVENTS,
//   COURSES,
//   SEMESTERS,
//   SECTIONS
// } from "./data/mockData";

// // Helper function to calculate syllabus progress
// const calculateSyllabusProgress = (completedModules, totalModules) => {
//   return totalModules > 0 ? (completedModules / totalModules) * 100 : 0;
// };

// // Helper function to generate time slots with lunch break and breaks after every 2 classes
// const generateTimeSlotsUtil = (config) => {
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
//     const endTime = new Date(current.getTime() + config.classDuration * 60000);
//     const endTimeStr = endTime.toTimeString().substring(0, 5);
    
//     // Check for lunch break
//     if (!lunchAdded && current >= lunchStart && current < lunchEnd) {
//       slots.push({
//         time: timeStr,
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
    
//     // Add class
//     if (endTime <= end) {
//       slots.push({
//         time: timeStr,
//         endTime: endTimeStr,
//         period: `P${periodNumber}`,
//         isLunch: false,
//         isBreak: false,
//         label: `${timeStr} - ${endTimeStr}`
//       });
//       periodNumber++;
//       classesBeforeBreak++;
//       current = new Date(endTime);
      
//       // Add break after every 2 classes
//       if (classesBeforeBreak === 2 && config.breakDuration > 0) {
//         const breakStart = new Date(current);
//         const breakEnd = new Date(current.getTime() + config.breakDuration * 60000);
        
//         let shouldAddBreak = false;
//         if (!lunchAdded && breakEnd <= lunchStart) {
//           shouldAddBreak = true;
//         } else if (lunchAdded && breakEnd <= end) {
//           shouldAddBreak = true;
//         }
        
//         if (shouldAddBreak) {
//           slots.push({
//             time: breakStart.toTimeString().substring(0, 5),
//             endTime: breakEnd.toTimeString().substring(0, 5),
//             period: "BREAK",
//             isLunch: false,
//             isBreak: true,
//             label: "SHORT BREAK"
//           });
//           current = breakEnd;
//           classesBeforeBreak = 0;
//         } else {
//           classesBeforeBreak = 0;
//         }
//       }
//     } else {
//       break;
//     }
//   }
  
//   return slots;
// };

// // Helper function to validate timetable feasibility
// const validateTimetableFeasibility = (approvedCourses, facultyList, roomsList, config) => {
//   const TEACHING_SLOTS_PER_WEEK = 40; // 8 slots/day × 5 days
//   const SECTIONS = 3;
  
//   const results = {
//     canSchedule: true,
//     errors: [],
//     warnings: [],
//     subjectStatus: [],
//     facultyWorkload: {},
//     totalRequiredSlots: 0,
//     totalAvailableSlots: TEACHING_SLOTS_PER_WEEK * SECTIONS,
//     utilization: 0
//   };
  
//   // Track faculty workload
//   const facultyLoad = {};
  
//   for (const course of approvedCourses) {
//     const subject = AppState.subjects.find(s => s.id === course.subjectId);
//     const faculty = AppState.faculty.find(f => f.id === course.facultyId);
    
//     if (!subject || !faculty) continue;
    
//     // Calculate required slots for this subject (all sections)
//     const requiredSlots = subject.totalWeeklyClasses * SECTIONS;
//     results.totalRequiredSlots += requiredSlots;
    
//     // Track faculty load
//     facultyLoad[faculty.id] = (facultyLoad[faculty.id] || 0) + subject.totalWeeklyClasses;
    
//     // Check individual subject feasibility
//     const canSchedule = faculty.remainingHours >= subject.totalWeeklyClasses;
    
//     results.subjectStatus.push({
//       subjectId: subject.id,
//       subjectName: subject.name,
//       subjectCode: subject.code,
//       facultyName: faculty.name,
//       weeklyHours: subject.totalWeeklyClasses,
//       requiredSlots,
//       canSchedule,
//       error: canSchedule ? null : `Faculty ${faculty.name} has only ${faculty.remainingHours}h remaining, needs ${subject.totalWeeklyClasses}h`
//     });
    
//     if (!canSchedule) {
//       results.canSchedule = false;
//       results.errors.push({
//         type: 'faculty_overload',
//         subject: subject.name,
//         faculty: faculty.name,
//         required: subject.totalWeeklyClasses,
//         available: faculty.remainingHours
//       });
//     }
//   }
  
//   // Check faculty workload
//   for (const [facultyId, load] of Object.entries(facultyLoad)) {
//     const faculty = AppState.faculty.find(f => f.id === parseInt(facultyId));
//     if (faculty) {
//       results.facultyWorkload[faculty.name] = {
//         assigned: load,
//         max: faculty.maxHours,
//         remaining: faculty.maxHours - load,
//         isOverloaded: load > faculty.maxHours
//       };
      
//       if (load > faculty.maxHours) {
//         results.errors.push({
//           type: 'faculty_overall_overload',
//           faculty: faculty.name,
//           assigned: load,
//           max: faculty.maxHours
//         });
//       }
//     }
//   }
  
//   // Calculate utilization
//   results.utilization = (results.totalRequiredSlots / results.totalAvailableSlots) * 100;
  
//   if (results.utilization > 100) {
//     results.warnings.push({
//       type: 'over_capacity',
//       required: results.totalRequiredSlots,
//       available: results.totalAvailableSlots,
//       deficit: results.totalRequiredSlots - results.totalAvailableSlots
//     });
//     results.canSchedule = false;
//   } else if (results.utilization < 70) {
//     results.warnings.push({
//       type: 'under_capacity',
//       required: results.totalRequiredSlots,
//       available: results.totalAvailableSlots,
//       freeSlots: results.totalAvailableSlots - results.totalRequiredSlots
//     });
//   }
  
//   return results;
// };

// export const AppState = {
//   // Data stores
//   faculty: [],
//   subjects: [],
//   subjectPreferences: [],
//   courseDetails: [],
//   timetable: [],
//   syllabusProgress: {},
//   rooms: [],
//   timetableConfig: {},
//   semesterDetails: {},
//   flaggedIssues: [],
//   studentProgress: {},
//   deanApprovals: {},
  
//   // Initialize all data
//   init: () => {
//     AppState.faculty = loadFromStorage(STORAGE_KEYS.FACULTY, DEFAULT_FACULTY);
//     AppState.subjects = loadFromStorage(STORAGE_KEYS.SUBJECTS, DEFAULT_SUBJECTS);
//     AppState.subjectPreferences = loadFromStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, DEFAULT_SUBJECT_PREFERENCES);
//     AppState.courseDetails = loadFromStorage(STORAGE_KEYS.COURSE_DETAILS, []);
//     AppState.timetable = loadFromStorage(STORAGE_KEYS.TIMETABLE, []);
//     AppState.syllabusProgress = loadFromStorage(STORAGE_KEYS.SYLLABUS_PROGRESS, {});
//     AppState.rooms = loadFromStorage(STORAGE_KEYS.ROOMS, DEFAULT_ROOMS);
//     AppState.timetableConfig = loadFromStorage(STORAGE_KEYS.TIMETABLE_CONFIG, DEFAULT_TIMETABLE_CONFIG);
//     AppState.semesterDetails = loadFromStorage(STORAGE_KEYS.SEMESTER_DETAILS, DEFAULT_SEMESTER_DETAILS);
//     AppState.flaggedIssues = loadFromStorage(STORAGE_KEYS.FLAGGED_ISSUES, []);
//     AppState.studentProgress = loadFromStorage(STORAGE_KEYS.STUDENT_PROGRESS, {});
//     AppState.deanApprovals = loadFromStorage(STORAGE_KEYS.DEAN_APPROVALS, {});
    
//     // Ensure faculty data is valid
//     if (!AppState.faculty || AppState.faculty.length === 0) {
//       AppState.faculty = DEFAULT_FACULTY;
//       saveToStorage(STORAGE_KEYS.FACULTY, DEFAULT_FACULTY);
//     }
//   },
  
//   // ============ FACULTY FUNCTIONS ============
//   getFacultyById: (id) => {
//     return AppState.faculty.find(f => f.id === id);
//   },
  
//   getFacultyByEmail: (email) => {
//     return AppState.faculty.find(f => f.email === email);
//   },
  
//   getCourseDetailsByFacultyId: (facultyId) => {
//     return AppState.courseDetails.filter(c => c.facultyId === facultyId);
//   },
  
//   updateFacultyRemainingHours: (facultyId, assignedHours) => {
//     const faculty = AppState.faculty.find(f => f.id === facultyId);
//     if (faculty) {
//       faculty.assignedHours += assignedHours;
//       faculty.remainingHours = faculty.maxHours - faculty.assignedHours;
//       saveToStorage(STORAGE_KEYS.FACULTY, AppState.faculty);
//     }
//   },
  
//   // ============ PREFERENCE FUNCTIONS ============
//   getPreferenceByFacultyId: (facultyId) => {
//     return AppState.subjectPreferences.find(p => p.facultyId === facultyId);
//   },
  
//   submitSubjectPreferences: (facultyId, preferences) => {
//     const pref = AppState.subjectPreferences.find(p => p.facultyId === facultyId);
//     if (pref) {
//       pref.submitted = true;
//       pref.preferences = preferences;
//       pref.status = "pending";
//       pref.feedback = "";
//       pref.submittedAt = new Date().toISOString();
//       saveToStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, AppState.subjectPreferences);
//     }
//   },
  
//   updatePreferenceStatus: (facultyId, status, feedback = "", allocatedSubjects = []) => {
//     const pref = AppState.subjectPreferences.find(p => p.facultyId === facultyId);
//     if (pref) {
//       pref.status = status;
//       pref.feedback = feedback;
      
//       if (status === "allocated" && allocatedSubjects.length > 0) {
//         pref.allocatedSubjects = allocatedSubjects;
//         pref.allocatedAt = new Date().toISOString();
        
//         allocatedSubjects.forEach(subjectId => {
//           const subject = AppState.subjects.find(s => s.id === subjectId);
//           if (subject) {
//             AppState.updateFacultyRemainingHours(facultyId, subject.totalWeeklyClasses);
//           }
//         });
//       }
      
//       if (status === "approved") {
//         pref.approvedAt = new Date().toISOString();
//         pref.approvedBy = "dean";
//       }
      
//       if (status === "rejected") {
//         pref.rejectedAt = new Date().toISOString();
//       }
      
//       saveToStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, AppState.subjectPreferences);
//     }
//   },
  
//   resetPreferenceForm: (facultyId) => {
//     const pref = AppState.subjectPreferences.find(p => p.facultyId === facultyId);
//     if (pref) {
//       pref.submitted = false;
//       pref.status = "pending";
//       pref.feedback = "";
//       pref.preferences = [];
//       pref.allocatedSubjects = [];
//       saveToStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, AppState.subjectPreferences);
//     }
//   },
  
//   // ============ SEMESTER FUNCTIONS ============
//   updateSemesterDetails: (course, semester, details) => {
//     if (!AppState.semesterDetails[course]) {
//       AppState.semesterDetails[course] = {};
//     }
//     AppState.semesterDetails[course][semester] = details;
//     saveToStorage(STORAGE_KEYS.SEMESTER_DETAILS, AppState.semesterDetails);
//   },
  
//   getSubjectsForCourseAndSemester: (course, semester) => {
//     const details = AppState.semesterDetails[course]?.[semester];
//     if (!details) return [];
    
//     return details.subjects.map(subjectId => 
//       AppState.subjects.find(s => s.id === subjectId)
//     ).filter(s => s && s.approvalStatus === "approved");
//   },
  
//   // ============ COURSE DETAILS FUNCTIONS ============
//   submitCourseDetails: (facultyId, courses) => {
//     const coursesWithStatus = courses.map(course => ({
//       ...course,
//       deanStatus: "pending",
//       coordinatorStatus: "pending",
//       deanFeedback: "",
//       coordinatorFeedback: "",
//       submittedAt: new Date().toISOString()
//     }));
    
//     AppState.courseDetails = AppState.courseDetails.filter(c => c.facultyId !== facultyId);
//     AppState.courseDetails.push(...coursesWithStatus);
//     saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
    
//     courses.forEach(course => {
//       const subject = AppState.subjects.find(s => s.id === course.subjectId);
//       if (subject) {
//         const progressKey = `${facultyId}_${course.subjectId}`;
//         AppState.syllabusProgress[progressKey] = {
//           facultyId,
//           facultyName: AppState.getFacultyById(facultyId)?.name,
//           subjectId: course.subjectId,
//           subjectName: subject.name,
//           subjectCode: subject.code,
//           course: course.course,
//           semester: course.semester,
//           sections: course.sections,
//           totalModules: course.modules,
//           completedModules: 0,
//           modules: Array(course.modules).fill(false),
//           lastUpdated: new Date().toISOString(),
//           completionPercentage: 0
//         };
//       }
//     });
//     saveToStorage(STORAGE_KEYS.SYLLABUS_PROGRESS, AppState.syllabusProgress);
//   },
  
//   updateCourseDetailCoordinatorStatus: (courseId, status, feedback = "") => {
//     const course = AppState.courseDetails.find(c => c.id === courseId);
//     if (course) {
//       course.coordinatorStatus = status;
//       course.coordinatorFeedback = feedback;
//       if (status === "reviewed") {
//         course.reviewedAt = new Date().toISOString();
//       }
//       saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
//     }
//   },
  
//   updateCourseDetailDeanStatus: (courseId, status, feedback = "") => {
//     const course = AppState.courseDetails.find(c => c.id === courseId);
//     if (course) {
//       course.deanStatus = status;
//       course.deanFeedback = feedback;
//       if (status === "approved") {
//         course.approvedAt = new Date().toISOString();
//         AppState.checkSyllabusDiscrepancy(course.facultyId, course.subjectId);
//       }
//       if (status === "rejected") {
//         course.rejectedAt = new Date().toISOString();
//       }
//       saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
//     }
//   },
  
//   getPendingCoordinatorReviews: () => {
//     return AppState.courseDetails.filter(c => 
//       c.coordinatorStatus === "pending"
//     );
//   },
  
//   getPendingDeanCourseApprovals: () => {
//     return AppState.courseDetails.filter(c => 
//       c.coordinatorStatus === "reviewed" && 
//       c.deanStatus === "pending"
//     );
//   },
  
//   getPendingDeanPreferenceApprovals: () => {
//     return AppState.subjectPreferences.filter(p => 
//       p.status === "allocated"
//     );
//   },
  
//   getPendingSubjectApprovals: () => {
//     return AppState.subjects.filter(s => s.approvalStatus === "pending");
//   },
  
//   getApprovedSubjects: () => {
//     return AppState.subjects.filter(s => s.approvalStatus === "approved");
//   },
  
//   getRejectedSubjects: () => {
//     return AppState.subjects.filter(s => s.approvalStatus === "rejected");
//   },
  
//   // Alias for backward compatibility
//   getPendingDeanApprovals: () => {
//     return AppState.getPendingDeanCourseApprovals();
//   },
  
//   // Validate timetable before generation
//   validateTimetable: () => {
//     const approvedCourses = AppState.courseDetails.filter(c => c.deanStatus === "approved");
//     const config = AppState.timetableConfig;
//     return validateTimetableFeasibility(approvedCourses, AppState.faculty, AppState.rooms, config);
//   },
  
//   // ============ SYLLABUS & PROGRESS FUNCTIONS ============
//   getSyllabusProgress: (facultyId, subjectId) => {
//     const progressKey = `${facultyId}_${subjectId}`;
//     return AppState.syllabusProgress[progressKey] || null;
//   },
  
//   // Calculate conflict severity based on difference percentage
//   calculateConflictSeverity: (facultyProgress, avgStudentProgress, totalModules) => {
//     const difference = Math.abs(facultyProgress - avgStudentProgress);
//     const percentageDiff = totalModules > 0 ? (difference / totalModules) * 100 : 0;
    
//     // Increased thresholds to reduce false alerts
//     if (percentageDiff >= 40) {
//       return { level: "critical", percentage: percentageDiff, action: "Immediate meeting with Dean required" };
//     } else if (percentageDiff >= 30) {
//       return { level: "high", percentage: percentageDiff, action: "Dean review and explanation required" };
//     } else if (percentageDiff >= 20) {
//       return { level: "medium", percentage: percentageDiff, action: "Faculty explanation recommended" };
//     }
//     return { level: "low", percentage: percentageDiff, action: "Monitor only - No action needed" };
//   },
  
//   // Check and raise syllabus conflict alert for dean
//   checkAndRaiseSyllabusConflict: (facultyId, subjectId) => {
//     const facultyProgress = AppState.getSyllabusProgress(facultyId, subjectId);
//     if (!facultyProgress) return null;
    
//     // Collect all student progress for this subject
//     let totalStudentProgress = 0;
//     let studentCount = 0;
//     const studentDetails = [];
    
//     for (const key in AppState.studentProgress) {
//       if (key.includes(subjectId)) {
//         const studentProgress = AppState.studentProgress[key];
//         totalStudentProgress += studentProgress.completedModules;
//         studentCount++;
//         studentDetails.push({
//           studentId: studentProgress.studentId,
//           progress: studentProgress.completedModules
//         });
//       }
//     }
    
//     // Only check if there are at least 3 students (to avoid noise)
//     if (studentCount < 3) return null;
    
//     const avgStudentProgress = totalStudentProgress / studentCount;
//     const facultyCompleted = facultyProgress.completedModules;
//     const totalModules = facultyProgress.totalModules;
    
//     // Calculate severity
//     const severity = AppState.calculateConflictSeverity(facultyCompleted, avgStudentProgress, totalModules);
    
//     // Only raise alert for medium, high, or critical severity
//     if (severity.level !== "low") {
//       // Check if unresolved conflict already exists
//       const existingConflict = AppState.flaggedIssues.find(issue => 
//         issue.type === "syllabus_conflict" && 
//         issue.subjectId === subjectId && 
//         issue.facultyId === facultyId &&
//         !issue.resolved
//       );
      
//       // If conflict exists but severity changed, update it
//       if (existingConflict) {
//         if (existingConflict.severity !== severity.level || 
//             existingConflict.facultyProgress !== facultyCompleted ||
//             Math.abs(existingConflict.averageStudentProgress - avgStudentProgress) > 0.5) {
          
//           // Update existing conflict
//           existingConflict.severity = severity.level;
//           existingConflict.severityPercentage = severity.percentage;
//           existingConflict.facultyProgress = facultyCompleted;
//           existingConflict.averageStudentProgress = avgStudentProgress;
//           existingConflict.requiredAction = severity.action;
//           existingConflict.lastUpdated = new Date().toISOString();
          
//           saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
          
//           // Update dean notification
//           AppState.updateDeanNotification(existingConflict);
//         }
//         return existingConflict;
//       }
      
//       // Only create new conflict if difference is significant (avoid noise)
//       if (severity.percentage >= 20) {
//         const conflict = {
//           id: Date.now() + Math.random(),
//           type: "syllabus_conflict",
//           subjectId,
//           subjectName: facultyProgress.subjectName,
//           facultyId,
//           facultyName: facultyProgress.facultyName,
//           facultyProgress: facultyCompleted,
//           averageStudentProgress: avgStudentProgress,
//           totalModules,
//           severity: severity.level,
//           severityPercentage: severity.percentage,
//           requiredAction: severity.action,
//           studentsAffected: studentCount,
//           studentDetails: studentDetails,
//           timestamp: new Date().toISOString(),
//           lastUpdated: new Date().toISOString(),
//           resolved: false,
//           resolution: null,
//           facultyResponse: null,
//           deanAction: null
//         };
        
//         AppState.flaggedIssues.push(conflict);
//         saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
        
//         // Create dean notification
//         AppState.createDeanNotification(conflict);
        
//         return conflict;
//       }
//     }
    
//     return null;
//   },
  
//   // Create notification for dean
//   createDeanNotification: (conflict) => {
//     const notifications = loadFromStorage('acadplan_dean_notifications', []);
    
//     const notification = {
//       id: Date.now(),
//       conflictId: conflict.id,
//       subjectName: conflict.subjectName,
//       facultyName: conflict.facultyName,
//       severity: conflict.severity,
//       severityPercentage: conflict.severityPercentage,
//       message: `${conflict.severity.toUpperCase()} severity conflict detected in ${conflict.subjectName}. Faculty progress: ${conflict.facultyProgress}/${conflict.totalModules} modules, Student average: ${conflict.averageStudentProgress.toFixed(1)}/${conflict.totalModules} modules. Difference: ${conflict.severityPercentage.toFixed(1)}%. ${conflict.requiredAction}`,
//       timestamp: conflict.timestamp,
//       read: false,
//       actionTaken: false
//     };
    
//     notifications.push(notification);
//     saveToStorage('acadplan_dean_notifications', notifications);
//     window.dispatchEvent(new Event('storage'));
//   },
  
//   // Update dean notification
//   updateDeanNotification: (conflict) => {
//     const notifications = loadFromStorage('acadplan_dean_notifications', []);
//     const notification = notifications.find(n => n.conflictId === conflict.id);
//     if (notification) {
//       notification.severity = conflict.severity;
//       notification.severityPercentage = conflict.severityPercentage;
//       notification.message = `${conflict.severity.toUpperCase()} severity conflict detected in ${conflict.subjectName}. Faculty progress: ${conflict.facultyProgress}/${conflict.totalModules} modules, Student average: ${conflict.averageStudentProgress.toFixed(1)}/${conflict.totalModules} modules. Difference: ${conflict.severityPercentage.toFixed(1)}%. ${conflict.requiredAction}`;
//       notification.lastUpdated = conflict.lastUpdated;
//       saveToStorage('acadplan_dean_notifications', notifications);
//     }
//   },
  
//   // Faculty response to conflict
//   facultyRespondToConflict: (conflictId, responseType, explanation) => {
//     const issue = AppState.flaggedIssues.find(i => i.id === conflictId);
//     if (issue) {
//       issue.facultyResponse = {
//         responseType: responseType, // 'explanation' or 'meeting_requested'
//         explanation: explanation,
//         respondedAt: new Date().toISOString()
//       };
//       saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
      
//       // Update dean notification
//       const notifications = loadFromStorage('acadplan_dean_notifications', []);
//       const notification = notifications.find(n => n.conflictId === conflictId);
//       if (notification) {
//         notification.facultyResponded = true;
//         notification.facultyResponseType = responseType;
//         notification.facultyExplanation = explanation;
//         notification.facultyRespondedAt = new Date().toISOString();
//         saveToStorage('acadplan_dean_notifications', notifications);
//       }
      
//       window.dispatchEvent(new Event('storage'));
//       return true;
//     }
//     return false;
//   },
  
//   // Dean action on conflict
//   deanResolveConflict: (conflictId, action, notes) => {
//     const issue = AppState.flaggedIssues.find(i => i.id === conflictId);
//     if (issue) {
//       issue.deanAction = {
//         action: action, // 'approved', 'warning_issued', 'meeting_scheduled', 'investigation'
//         notes: notes,
//         actionedAt: new Date().toISOString()
//       };
//       issue.resolved = true;
//       issue.resolution = action;
//       issue.resolvedAt = new Date().toISOString();
//       saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
      
//       // Update notification
//       const notifications = loadFromStorage('acadplan_dean_notifications', []);
//       const notificationIndex = notifications.findIndex(n => n.conflictId === conflictId);
//       if (notificationIndex !== -1) {
//         notifications[notificationIndex].actionTaken = true;
//         notifications[notificationIndex].deanAction = action;
//         notifications[notificationIndex].deanNotes = notes;
//         notifications[notificationIndex].resolvedAt = new Date().toISOString();
//         saveToStorage('acadplan_dean_notifications', notifications);
//       }
      
//       window.dispatchEvent(new Event('storage'));
//       return true;
//     }
//     return false;
//   },
  
//   // Get unresolved syllabus conflicts
//   getUnresolvedSyllabusConflicts: () => {
//     return AppState.flaggedIssues.filter(issue => 
//       issue.type === "syllabus_conflict" && !issue.resolved
//     );
//   },
  
//   // Get conflicts by severity
//   getConflictsBySeverity: (severity) => {
//     return AppState.flaggedIssues.filter(issue => 
//       issue.type === "syllabus_conflict" && issue.severity === severity && !issue.resolved
//     );
//   },
  
//   // Get dean notifications
//   getDeanNotifications: () => {
//     return loadFromStorage('acadplan_dean_notifications', []);
//   },
  
//   // Mark dean notification as read
//   markDeanNotificationAsRead: (notificationId) => {
//     const notifications = loadFromStorage('acadplan_dean_notifications', []);
//     const notification = notifications.find(n => n.id === notificationId);
//     if (notification) {
//       notification.read = true;
//       saveToStorage('acadplan_dean_notifications', notifications);
//       window.dispatchEvent(new Event('storage'));
//     }
//   },
  
//   updateSyllabusProgress: (facultyId, subjectId, moduleIndex, completed) => {
//     const progressKey = `${facultyId}_${subjectId}`;
//     if (AppState.syllabusProgress[progressKey]) {
//       const progress = AppState.syllabusProgress[progressKey];
//       progress.modules[moduleIndex] = completed;
//       progress.completedModules = progress.modules.filter(m => m).length;
//       progress.lastUpdated = new Date().toISOString();
//       progress.completionPercentage = calculateSyllabusProgress(
//         progress.completedModules, 
//         progress.totalModules
//       );
      
//       saveToStorage(STORAGE_KEYS.SYLLABUS_PROGRESS, AppState.syllabusProgress);
      
//       // Check for student-faculty discrepancy (individual)
//       AppState.checkSyllabusDiscrepancy(facultyId, subjectId);
      
//       // Check and raise syllabus conflict alert for dean (aggregate)
//       AppState.checkAndRaiseSyllabusConflict(facultyId, subjectId);
//     }
//   },
  
//   updateStudentProgress: (studentId, subjectId, moduleIndex, completed) => {
//     const key = `${studentId}_${subjectId}`;
//     if (!AppState.studentProgress[key]) {
//       const subject = AppState.subjects.find(s => s.id === subjectId);
//       AppState.studentProgress[key] = {
//         studentId,
//         subjectId,
//         subjectName: subject?.name,
//         totalModules: subject?.modules || 0,
//         completedModules: 0,
//         modules: Array(subject?.modules || 0).fill(false),
//         lastUpdated: new Date().toISOString(),
//       };
//     }
    
//     const progress = AppState.studentProgress[key];
//     progress.modules[moduleIndex] = completed;
//     progress.completedModules = progress.modules.filter(m => m).length;
//     progress.lastUpdated = new Date().toISOString();
    
//     saveToStorage(STORAGE_KEYS.STUDENT_PROGRESS, AppState.studentProgress);
    
//     // Check for student-faculty discrepancy (individual)
//     AppState.checkSyllabusDiscrepancyForStudent(studentId, subjectId);
    
//     // Find faculty for this subject and check aggregate conflict
//     const facultyProgress = AppState.getSyllabusProgressForSubject(subjectId);
//     if (facultyProgress) {
//       AppState.checkAndRaiseSyllabusConflict(facultyProgress.facultyId, subjectId);
//     }
//   },
  
//   getStudentProgress: (studentId, subjectId) => {
//     const key = `${studentId}_${subjectId}`;
//     return AppState.studentProgress[key] || null;
//   },
  
//   checkSyllabusDiscrepancy: (facultyId, subjectId) => {
//     const facultyProgress = AppState.getSyllabusProgress(facultyId, subjectId);
//     if (!facultyProgress) return;
    
//     for (const key in AppState.studentProgress) {
//       if (key.includes(subjectId)) {
//         const studentProgress = AppState.studentProgress[key];
//         const facultyCompleted = facultyProgress.completedModules;
//         const studentCompleted = studentProgress.completedModules;
//         const threshold = Math.ceil(facultyProgress.totalModules * 0.1);
        
//         if (Math.abs(facultyCompleted - studentCompleted) > threshold) {
//           const issue = {
//             id: Date.now() + Math.random(),
//             type: "student_faculty_discrepancy",
//             subjectId,
//             subjectName: facultyProgress.subjectName,
//             facultyProgress: facultyCompleted,
//             studentProgress: studentCompleted,
//             facultyId,
//             studentId: studentProgress.studentId,
//             timestamp: new Date().toISOString(),
//             resolved: false
//           };
          
//           const exists = AppState.flaggedIssues.some(i => 
//             i.type === "student_faculty_discrepancy" && 
//             i.subjectId === subjectId && 
//             i.facultyId === facultyId &&
//             i.studentId === studentProgress.studentId &&
//             !i.resolved
//           );
          
//           if (!exists) {
//             AppState.flaggedIssues.push(issue);
//             saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
//           }
//         }
//       }
//     }
//   },
  
//   checkSyllabusDiscrepancyForStudent: (studentId, subjectId) => {
//     const studentProgress = AppState.getStudentProgress(studentId, subjectId);
//     if (!studentProgress) return;
    
//     const facultyProgress = AppState.getSyllabusProgressForSubject(subjectId);
//     if (facultyProgress) {
//       const facultyCompleted = facultyProgress.completedModules;
//       const studentCompleted = studentProgress.completedModules;
//       const threshold = Math.ceil(studentProgress.totalModules * 0.1);
      
//       if (Math.abs(facultyCompleted - studentCompleted) > threshold) {
//         const issue = {
//           id: Date.now(),
//           type: "student_faculty_discrepancy",
//           subjectId,
//           subjectName: studentProgress.subjectName,
//           facultyProgress: facultyCompleted,
//           studentProgress: studentCompleted,
//           facultyId: facultyProgress.facultyId,
//           studentId,
//           timestamp: new Date().toISOString(),
//           resolved: false
//         };
        
//         const exists = AppState.flaggedIssues.some(i => 
//           i.type === "student_faculty_discrepancy" && 
//           i.subjectId === subjectId && 
//           i.facultyId === facultyProgress.facultyId &&
//           i.studentId === studentId &&
//           !i.resolved
//         );
        
//         if (!exists) {
//           AppState.flaggedIssues.push(issue);
//           saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
//         }
//       }
//     }
//   },
  
//   getSyllabusProgressForSubject: (subjectId) => {
//     for (const key in AppState.syllabusProgress) {
//       if (key.includes(subjectId)) {
//         return AppState.syllabusProgress[key];
//       }
//     }
//     return null;
//   },
  
//   // ============ TIMETABLE FUNCTIONS ============
//   generateTimeSlots: (config) => {
//     return generateTimeSlotsUtil(config);
//   },
  
//   updateTimetableConfig: (config) => {
//     AppState.timetableConfig = config;
//     saveToStorage(STORAGE_KEYS.TIMETABLE_CONFIG, config);
//   },
  
//   generateTimetable: () => {
//     console.log("=== GENERATING TIMETABLE (Conflict-free & Gap-free) ===");
    
//     // First validate if all subjects can be scheduled
//     const validation = AppState.validateTimetable();
    
//     if (!validation.canSchedule) {
//       console.error("Cannot schedule all subjects:", validation.errors);
//       // Store validation errors for UI display
//       AppState.timetableValidationErrors = validation.errors;
//       alert("Cannot generate timetable! Some subjects cannot be scheduled due to:\n" + 
//             validation.errors.map(e => `- ${e.subject || e.faculty}: ${e.type}`).join("\n"));
//       return [];
//     }
    
//     if (validation.warnings.length > 0) {
//       console.warn("Timetable generation warnings:", validation.warnings);
//       // Optionally show warnings but continue
//     }

//     const buildSessionList = (approvedCourses) => {
//       const sessions = [];
//       for (const courseDetail of approvedCourses) {
//         const subject = AppState.subjects.find(s => s.id === courseDetail.subjectId);
//         if (!subject) continue;
//         const faculty = AppState.faculty.find(f => f.id === courseDetail.facultyId);
//         if (!faculty) continue;

//         const sections = courseDetail.sections || SECTIONS;

//         for (const section of sections) {
//           for (let i = 0; i < subject.theoryClassesPerWeek; i++) {
//             sessions.push({
//               id: `${courseDetail.id}_theory_${section}_${i}`,
//               course: courseDetail.course,
//               semester: courseDetail.semester,
//               section,
//               subjectId: subject.id,
//               subjectName: subject.name,
//               subjectCode: subject.code,
//               facultyId: faculty.id,
//               facultyName: faculty.name,
//               facultyAvatar: faculty.avatar,
//               color: faculty.color,
//               type: 'theory',
//             });
//           }
//           for (let i = 0; i < subject.labPeriodsPerWeek; i++) {
//             sessions.push({
//               id: `${courseDetail.id}_lab_${section}_${i}`,
//               course: courseDetail.course,
//               semester: courseDetail.semester,
//               section,
//               subjectId: subject.id,
//               subjectName: subject.name,
//               subjectCode: subject.code,
//               facultyId: faculty.id,
//               facultyName: faculty.name,
//               facultyAvatar: faculty.avatar,
//               color: faculty.color,
//               type: 'lab',
//             });
//           }
//         }
//       }
//       return sessions;
//     };

//     const sortSessions = (sessions) => {
//       const facultyCount = {};
//       sessions.forEach(s => { facultyCount[s.facultyId] = (facultyCount[s.facultyId] || 0) + 1; });
//       return [...sessions].sort((a, b) => {
//         if (a.type !== b.type) return a.type === 'lab' ? -1 : 1;
//         return (facultyCount[b.facultyId] || 0) - (facultyCount[a.facultyId] || 0);
//       });
//     };

//     const approvedCourses = AppState.courseDetails.filter(c => c.deanStatus === "approved");
//     if (approvedCourses.length === 0) {
//       console.warn("No approved courses found");
//       return [];
//     }

//     const config = AppState.timetableConfig;
//     const days = config.days;

//     const allTimeSlots = AppState.generateTimeSlots(config);
//     const teachingSlots = allTimeSlots.filter(s => !s.isLunch && !s.isBreak);

//     let sessions = buildSessionList(approvedCourses);
//     const totalTeachingSlots = days.length * teachingSlots.length;
//     const totalSessionsNeeded = sessions.length;

//     console.log(`Total teaching slots available: ${totalTeachingSlots}`);
//     console.log(`Total sessions to schedule: ${totalSessionsNeeded}`);
//     console.log(`Utilization: ${(totalSessionsNeeded / totalTeachingSlots * 100).toFixed(1)}%`);

//     if (totalSessionsNeeded > totalTeachingSlots) {
//       console.error(`Not enough teaching slots! Need ${totalSessionsNeeded}, have ${totalTeachingSlots}`);
//     }

//     sessions = sortSessions(sessions);

//     const facultyOccupancy = {};
//     const roomOccupancy = {};

//     const getAvailableTheoryRoom = (day, time) => {
//       const theoryRooms = AppState.rooms.filter(r => r.type === "Theory");
//       return theoryRooms.find(r => !roomOccupancy[`${day}_${time}_${r.name}`]);
//     };

//     const getAvailableLabRoom = (day, time1, time2) => {
//       const labRooms = AppState.rooms.filter(r => r.type === "Lab");
//       return labRooms.find(r => !roomOccupancy[`${day}_${time1}_${r.name}`] && !roomOccupancy[`${day}_${time2}_${r.name}`]);
//     };

//     const timetable = [];
//     let sessionIdx = 0;

//     for (let d = 0; d < days.length; d++) {
//       const day = days[d];
//       for (let s = 0; s < teachingSlots.length; s++) {
//         const slot = teachingSlots[s];
//         const time = slot.time;

//         if (sessionIdx >= sessions.length) {
//           timetable.push({
//             id: Date.now() + Math.random(),
//             subject: "Free Period",
//             subjectCode: "FREE",
//             facultyName: "None",
//             facultyId: null,
//             room: "N/A",
//             type: "free",
//             color: "#cccccc",
//             day,
//             time,
//             course: "",
//             semester: "",
//             section: "",
//           });
//           continue;
//         }

//         let assigned = false;
//         for (let i = sessionIdx; i < sessions.length && !assigned; i++) {
//           const session = sessions[i];
//           if (session.assigned) continue;

//           if (session.type === 'lab') {
//             const nextSlot = teachingSlots[s + 1];
//             if (!nextSlot) continue;
//             const time2 = nextSlot.time;
//             const facultyKey1 = `${day}_${time}_${session.facultyId}`;
//             const facultyKey2 = `${day}_${time2}_${session.facultyId}`;
//             if (facultyOccupancy[facultyKey1] || facultyOccupancy[facultyKey2]) continue;

//             const room = getAvailableLabRoom(day, time, time2);
//             if (!room) continue;

//             timetable.push({
//               id: Date.now() + Math.random(),
//               course: session.course,
//               semester: session.semester,
//               section: session.section,
//               day,
//               time,
//               subject: session.subjectName,
//               subjectId: session.subjectId,
//               subjectCode: session.subjectCode,
//               facultyId: session.facultyId,
//               facultyName: session.facultyName,
//               facultyAvatar: session.facultyAvatar,
//               room: room.name,
//               type: "lab",
//               color: session.color,
//             });
//             timetable.push({
//               id: Date.now() + Math.random(),
//               course: session.course,
//               semester: session.semester,
//               section: session.section,
//               day,
//               time: time2,
//               subject: session.subjectName,
//               subjectId: session.subjectId,
//               subjectCode: session.subjectCode,
//               facultyId: session.facultyId,
//               facultyName: session.facultyName,
//               facultyAvatar: session.facultyAvatar,
//               room: room.name,
//               type: "lab",
//               color: session.color,
//             });

//             facultyOccupancy[facultyKey1] = true;
//             facultyOccupancy[facultyKey2] = true;
//             roomOccupancy[`${day}_${time}_${room.name}`] = true;
//             roomOccupancy[`${day}_${time2}_${room.name}`] = true;

//             sessions[i] = sessions[sessions.length - 1];
//             sessions.pop();
//             assigned = true;
//             s++;
//             break;
//           } else {
//             const facultyKey = `${day}_${time}_${session.facultyId}`;
//             if (facultyOccupancy[facultyKey]) continue;

//             const room = getAvailableTheoryRoom(day, time);
//             if (!room) continue;

//             timetable.push({
//               id: Date.now() + Math.random(),
//               course: session.course,
//               semester: session.semester,
//               section: session.section,
//               day,
//               time,
//               subject: session.subjectName,
//               subjectId: session.subjectId,
//               subjectCode: session.subjectCode,
//               facultyId: session.facultyId,
//               facultyName: session.facultyName,
//               facultyAvatar: session.facultyAvatar,
//               room: room.name,
//               type: "theory",
//               color: session.color,
//             });

//             facultyOccupancy[facultyKey] = true;
//             roomOccupancy[`${day}_${time}_${room.name}`] = true;

//             sessions[i] = sessions[sessions.length - 1];
//             sessions.pop();
//             assigned = true;
//             break;
//           }
//         }

//         if (!assigned) {
//           timetable.push({
//             id: Date.now() + Math.random(),
//             subject: "Free Period",
//             subjectCode: "FREE",
//             facultyName: "None",
//             facultyId: null,
//             room: "N/A",
//             type: "free",
//             color: "#cccccc",
//             day,
//             time,
//             course: "",
//             semester: "",
//             section: "",
//           });
//         }
//       }
//     }

//     if (sessions.length > 0) {
//       console.warn(`${sessions.length} sessions could not be scheduled. They will be ignored.`);
//     }

//     AppState.timetable = timetable;
//     saveToStorage(STORAGE_KEYS.TIMETABLE, timetable);
//     console.log(`Generated ${timetable.length} timetable slots (includes free periods if needed)`);
//     return timetable;
//   },
  
//   getFacultySchedule: (facultyId) => {
//     return AppState.timetable.filter(t => t.facultyId === facultyId);
//   },
  
//   getStudentSchedule: (course, semester, section) => {
//     return AppState.timetable.filter(t => 
//       t.course === course && 
//       t.semester === semester && 
//       t.section === section
//     );
//   },
  
//   checkAllConflicts: () => {
//     const conflicts = [];
    
//     for (let i = 0; i < AppState.timetable.length; i++) {
//       for (let j = i + 1; j < AppState.timetable.length; j++) {
//         const a = AppState.timetable[i];
//         const b = AppState.timetable[j];
        
//         if (a.day === b.day && a.time === b.time) {
//           if (a.facultyId === b.facultyId) {
//             conflicts.push({
//               type: "faculty",
//               message: `${a.facultyName} assigned to both ${a.subject} and ${b.subject} at ${a.day} ${a.time}`
//             });
//           }
          
//           if (a.room === b.room) {
//             conflicts.push({
//               type: "room",
//               message: `Room ${a.room} assigned to both ${a.subject} and ${b.subject} at ${a.day} ${a.time}`
//             });
//           }
//         }
//       }
//     }
    
//     return conflicts;
//   },
  
//   // ============ FLAGGED ISSUES FUNCTIONS ============
//   getFlaggedIssues: () => {
//     return AppState.flaggedIssues.filter(issue => !issue.resolved);
//   },
  
//   resolveFlaggedIssue: (issueId) => {
//     const issue = AppState.flaggedIssues.find(i => i.id === issueId);
//     if (issue) {
//       issue.resolved = true;
//       saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
//     }
//   },
  
//   // ============ INITIALIZATION ============
//   initializeStorage: () => {
//     const keys = [
//       STORAGE_KEYS.FACULTY, STORAGE_KEYS.SUBJECTS, STORAGE_KEYS.SUBJECT_PREFERENCES,
//       STORAGE_KEYS.ROOMS, STORAGE_KEYS.TIMETABLE_CONFIG, STORAGE_KEYS.SEMESTER_DETAILS,
//       STORAGE_KEYS.FLAGGED_ISSUES, STORAGE_KEYS.STUDENT_PROGRESS, STORAGE_KEYS.DEAN_APPROVALS,
//       STORAGE_KEYS.LEAVE_REQUESTS, STORAGE_KEYS.CALENDAR_EVENTS, STORAGE_KEYS.COURSE_DETAILS,
//       STORAGE_KEYS.TIMETABLE, STORAGE_KEYS.SYLLABUS_PROGRESS, STORAGE_KEYS.FACULTY_SUBMISSIONS,
//       STORAGE_KEYS.PREFERENCE_SETTINGS, STORAGE_KEYS.FACULTY_PREFERENCE_FORM
//     ];
    
//     const defaultValues = {
//       [STORAGE_KEYS.FACULTY]: DEFAULT_FACULTY,
//       [STORAGE_KEYS.SUBJECTS]: DEFAULT_SUBJECTS,
//       [STORAGE_KEYS.SUBJECT_PREFERENCES]: DEFAULT_SUBJECT_PREFERENCES,
//       [STORAGE_KEYS.ROOMS]: DEFAULT_ROOMS,
//       [STORAGE_KEYS.TIMETABLE_CONFIG]: DEFAULT_TIMETABLE_CONFIG,
//       [STORAGE_KEYS.SEMESTER_DETAILS]: DEFAULT_SEMESTER_DETAILS,
//       [STORAGE_KEYS.FLAGGED_ISSUES]: [],
//       [STORAGE_KEYS.STUDENT_PROGRESS]: {},
//       [STORAGE_KEYS.DEAN_APPROVALS]: {},
//       [STORAGE_KEYS.LEAVE_REQUESTS]: [],
//       [STORAGE_KEYS.CALENDAR_EVENTS]: DEFAULT_CALENDAR_EVENTS,
//       [STORAGE_KEYS.COURSE_DETAILS]: [],
//       [STORAGE_KEYS.TIMETABLE]: [],
//       [STORAGE_KEYS.SYLLABUS_PROGRESS]: {},
//       [STORAGE_KEYS.FACULTY_SUBMISSIONS]: [],
//       [STORAGE_KEYS.PREFERENCE_SETTINGS]: {
//         requireOneCoreOneMajorOneMinor: true,
//         requireDifferentSemesters: false,
//         maxPreferencesPerFaculty: 3,
//         minPreferencesRequired: 3,
//         allowSameSemester: true,
//         allowSameType: false,
//         requireDifferentSubjects: true
//       },
//       [STORAGE_KEYS.FACULTY_PREFERENCE_FORM]: {}
//     };
    
//     keys.forEach(key => {
//       if (!localStorage.getItem(key) && defaultValues[key] !== undefined) {
//         saveToStorage(key, defaultValues[key]);
//       }
//     });
    
//     // Ensure faculty is properly loaded
//     const facultyData = loadFromStorage(STORAGE_KEYS.FACULTY, DEFAULT_FACULTY);
//     if (facultyData && facultyData.length > 0) {
//       AppState.faculty = facultyData;
//     } else {
//       AppState.faculty = DEFAULT_FACULTY;
//       saveToStorage(STORAGE_KEYS.FACULTY, DEFAULT_FACULTY);
//     }
    
//     const currentConfig = loadFromStorage(STORAGE_KEYS.TIMETABLE_CONFIG, DEFAULT_TIMETABLE_CONFIG);
//     if (!currentConfig.lunchBreak) {
//       currentConfig.lunchBreak = { start: "12:30", duration: 40 };
//       saveToStorage(STORAGE_KEYS.TIMETABLE_CONFIG, currentConfig);
//       AppState.timetableConfig = currentConfig;
//     }
    
//     let currentSubjects = loadFromStorage(STORAGE_KEYS.SUBJECTS, DEFAULT_SUBJECTS);
//     let needsUpdate = false;
//     const updatedSubjects = currentSubjects.map(subject => {
//       if (!subject.approvalStatus) {
//         needsUpdate = true;
//         return { ...subject, approvalStatus: "approved" };
//       }
//       return subject;
//     });
    
//     if (needsUpdate) {
//       saveToStorage(STORAGE_KEYS.SUBJECTS, updatedSubjects);
//       AppState.subjects = updatedSubjects;
//     }
//   },
// };

// // Initialize AppState
// AppState.init();
// AppState.initializeStorage();

// if (typeof window !== 'undefined') {
//   window.AppState = AppState;
// }

// // src/AppState.js
// import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "./utils/storage";
// import { 
//   DEFAULT_FACULTY, 
//   DEFAULT_SUBJECTS, 
//   DEFAULT_SUBJECT_PREFERENCES, 
//   DEFAULT_ROOMS, 
//   DEFAULT_TIMETABLE_CONFIG, 
//   DEFAULT_SEMESTER_DETAILS,
//   DEFAULT_CALENDAR_EVENTS,
//   COURSES,
//   SEMESTERS,
//   SECTIONS
// } from "./data/mockData";

// // Helper function to calculate syllabus progress
// const calculateSyllabusProgress = (completedModules, totalModules) => {
//   return totalModules > 0 ? (completedModules / totalModules) * 100 : 0;
// };

// // Helper function to generate time slots with lunch break and breaks after every 2 classes
// const generateTimeSlotsUtil = (config) => {
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
//     const endTime = new Date(current.getTime() + config.classDuration * 60000);
//     const endTimeStr = endTime.toTimeString().substring(0, 5);
    
//     // Check for lunch break
//     if (!lunchAdded && current >= lunchStart && current < lunchEnd) {
//       slots.push({
//         time: timeStr,
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
    
//     // Add class
//     if (endTime <= end) {
//       slots.push({
//         time: timeStr,
//         endTime: endTimeStr,
//         period: `P${periodNumber}`,
//         isLunch: false,
//         isBreak: false,
//         label: `${timeStr} - ${endTimeStr}`
//       });
//       periodNumber++;
//       classesBeforeBreak++;
//       current = new Date(endTime);
      
//       // Add break after every 2 classes
//       if (classesBeforeBreak === 2 && config.breakDuration > 0) {
//         const breakStart = new Date(current);
//         const breakEnd = new Date(current.getTime() + config.breakDuration * 60000);
        
//         let shouldAddBreak = false;
//         if (!lunchAdded && breakEnd <= lunchStart) {
//           shouldAddBreak = true;
//         } else if (lunchAdded && breakEnd <= end) {
//           shouldAddBreak = true;
//         }
        
//         if (shouldAddBreak) {
//           slots.push({
//             time: breakStart.toTimeString().substring(0, 5),
//             endTime: breakEnd.toTimeString().substring(0, 5),
//             period: "BREAK",
//             isLunch: false,
//             isBreak: true,
//             label: "SHORT BREAK"
//           });
//           current = breakEnd;
//           classesBeforeBreak = 0;
//         } else {
//           classesBeforeBreak = 0;
//         }
//       }
//     } else {
//       break;
//     }
//   }
  
//   return slots;
// };

// // Helper function to validate timetable feasibility for a specific department
// const validateTimetableFeasibility = (approvedCourses, facultyList, roomsList, config) => {
//   const TEACHING_SLOTS_PER_WEEK = 40; // 8 slots/day × 5 days
//   const SECTIONS = 3;
  
//   const results = {
//     canSchedule: true,
//     errors: [],
//     warnings: [],
//     subjectStatus: [],
//     facultyWorkload: {},
//     totalRequiredSlots: 0,
//     totalAvailableSlots: TEACHING_SLOTS_PER_WEEK * SECTIONS,
//     utilization: 0
//   };
  
//   // Track faculty workload
//   const facultyLoad = {};
  
//   for (const course of approvedCourses) {
//     const subject = AppState.subjects.find(s => s.id === course.subjectId);
//     const faculty = AppState.faculty.find(f => f.id === course.facultyId);
    
//     if (!subject || !faculty) continue;
    
//     // Calculate required slots for this subject (all sections)
//     const requiredSlots = subject.totalWeeklyClasses * SECTIONS;
//     results.totalRequiredSlots += requiredSlots;
    
//     // Track faculty load
//     facultyLoad[faculty.id] = (facultyLoad[faculty.id] || 0) + subject.totalWeeklyClasses;
    
//     // Check individual subject feasibility
//     const canSchedule = faculty.remainingHours >= subject.totalWeeklyClasses;
    
//     results.subjectStatus.push({
//       subjectId: subject.id,
//       subjectName: subject.name,
//       subjectCode: subject.code,
//       facultyName: faculty.name,
//       weeklyHours: subject.totalWeeklyClasses,
//       requiredSlots,
//       canSchedule,
//       error: canSchedule ? null : `Faculty ${faculty.name} has only ${faculty.remainingHours}h remaining, needs ${subject.totalWeeklyClasses}h`
//     });
    
//     if (!canSchedule) {
//       results.canSchedule = false;
//       results.errors.push({
//         type: 'faculty_overload',
//         subject: subject.name,
//         faculty: faculty.name,
//         required: subject.totalWeeklyClasses,
//         available: faculty.remainingHours
//       });
//     }
//   }
  
//   // Check faculty workload
//   for (const [facultyId, load] of Object.entries(facultyLoad)) {
//     const faculty = AppState.faculty.find(f => f.id === parseInt(facultyId));
//     if (faculty) {
//       results.facultyWorkload[faculty.name] = {
//         assigned: load,
//         max: faculty.maxHours,
//         remaining: faculty.maxHours - load,
//         isOverloaded: load > faculty.maxHours
//       };
      
//       if (load > faculty.maxHours) {
//         results.errors.push({
//           type: 'faculty_overall_overload',
//           faculty: faculty.name,
//           assigned: load,
//           max: faculty.maxHours
//         });
//       }
//     }
//   }
  
//   // Calculate utilization
//   results.utilization = (results.totalRequiredSlots / results.totalAvailableSlots) * 100;
  
//   if (results.utilization > 100) {
//     results.warnings.push({
//       type: 'over_capacity',
//       required: results.totalRequiredSlots,
//       available: results.totalAvailableSlots,
//       deficit: results.totalRequiredSlots - results.totalAvailableSlots
//     });
//     results.canSchedule = false;
//   } else if (results.utilization < 70) {
//     results.warnings.push({
//       type: 'under_capacity',
//       required: results.totalRequiredSlots,
//       available: results.totalAvailableSlots,
//       freeSlots: results.totalAvailableSlots - results.totalRequiredSlots
//     });
//   }
  
//   return results;
// };

// export const AppState = {
//   // Data stores
//   faculty: [],
//   subjects: [],
//   subjectPreferences: [],
//   courseDetails: [],
//   timetable: [],
//   syllabusProgress: {},
//   rooms: [],
//   timetableConfig: {},
//   semesterDetails: {},
//   flaggedIssues: [],
//   studentProgress: {},
//   deanApprovals: {},
  
//   // Initialize all data
//   init: () => {
//     AppState.faculty = loadFromStorage(STORAGE_KEYS.FACULTY, DEFAULT_FACULTY);
//     AppState.subjects = loadFromStorage(STORAGE_KEYS.SUBJECTS, DEFAULT_SUBJECTS);
//     AppState.subjectPreferences = loadFromStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, DEFAULT_SUBJECT_PREFERENCES);
//     AppState.courseDetails = loadFromStorage(STORAGE_KEYS.COURSE_DETAILS, []);
//     AppState.timetable = loadFromStorage(STORAGE_KEYS.TIMETABLE, []);
//     AppState.syllabusProgress = loadFromStorage(STORAGE_KEYS.SYLLABUS_PROGRESS, {});
//     AppState.rooms = loadFromStorage(STORAGE_KEYS.ROOMS, DEFAULT_ROOMS);
//     AppState.timetableConfig = loadFromStorage(STORAGE_KEYS.TIMETABLE_CONFIG, DEFAULT_TIMETABLE_CONFIG);
//     AppState.semesterDetails = loadFromStorage(STORAGE_KEYS.SEMESTER_DETAILS, DEFAULT_SEMESTER_DETAILS);
//     AppState.flaggedIssues = loadFromStorage(STORAGE_KEYS.FLAGGED_ISSUES, []);
//     AppState.studentProgress = loadFromStorage(STORAGE_KEYS.STUDENT_PROGRESS, {});
//     AppState.deanApprovals = loadFromStorage(STORAGE_KEYS.DEAN_APPROVALS, {});
    
//     // Ensure faculty data is valid
//     if (!AppState.faculty || AppState.faculty.length === 0) {
//       AppState.faculty = DEFAULT_FACULTY;
//       saveToStorage(STORAGE_KEYS.FACULTY, DEFAULT_FACULTY);
//     }
//   },
  
//   // ============ FACULTY FUNCTIONS ============
//   getFacultyById: (id) => {
//     return AppState.faculty.find(f => f.id === id);
//   },
  
//   getFacultyByEmail: (email) => {
//     return AppState.faculty.find(f => f.email === email);
//   },
  
//   getCourseDetailsByFacultyId: (facultyId) => {
//     return AppState.courseDetails.filter(c => c.facultyId === facultyId);
//   },
  
//   updateFacultyRemainingHours: (facultyId, assignedHours) => {
//     const faculty = AppState.faculty.find(f => f.id === facultyId);
//     if (faculty) {
//       faculty.assignedHours += assignedHours;
//       faculty.remainingHours = faculty.maxHours - faculty.assignedHours;
//       saveToStorage(STORAGE_KEYS.FACULTY, AppState.faculty);
//     }
//   },
  
//   // ============ PREFERENCE FUNCTIONS ============
//   getPreferenceByFacultyId: (facultyId) => {
//     return AppState.subjectPreferences.find(p => p.facultyId === facultyId);
//   },
  
//   submitSubjectPreferences: (facultyId, preferences) => {
//     const pref = AppState.subjectPreferences.find(p => p.facultyId === facultyId);
//     if (pref) {
//       pref.submitted = true;
//       pref.preferences = preferences;
//       pref.status = "pending";
//       pref.feedback = "";
//       pref.submittedAt = new Date().toISOString();
//       saveToStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, AppState.subjectPreferences);
//     }
//   },
  
//   updatePreferenceStatus: (facultyId, status, feedback = "", allocatedSubjects = []) => {
//     const pref = AppState.subjectPreferences.find(p => p.facultyId === facultyId);
//     if (pref) {
//       pref.status = status;
//       pref.feedback = feedback;
      
//       if (status === "allocated" && allocatedSubjects.length > 0) {
//         pref.allocatedSubjects = allocatedSubjects;
//         pref.allocatedAt = new Date().toISOString();
        
//         allocatedSubjects.forEach(subjectId => {
//           const subject = AppState.subjects.find(s => s.id === subjectId);
//           if (subject) {
//             AppState.updateFacultyRemainingHours(facultyId, subject.totalWeeklyClasses);
//           }
//         });
//       }
      
//       if (status === "approved") {
//         pref.approvedAt = new Date().toISOString();
//         pref.approvedBy = "dean";
//       }
      
//       if (status === "rejected") {
//         pref.rejectedAt = new Date().toISOString();
//       }
      
//       saveToStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, AppState.subjectPreferences);
//     }
//   },
  
//   resetPreferenceForm: (facultyId) => {
//     const pref = AppState.subjectPreferences.find(p => p.facultyId === facultyId);
//     if (pref) {
//       pref.submitted = false;
//       pref.status = "pending";
//       pref.feedback = "";
//       pref.preferences = [];
//       pref.allocatedSubjects = [];
//       saveToStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, AppState.subjectPreferences);
//     }
//   },
  
//   // ============ SEMESTER FUNCTIONS ============
//   updateSemesterDetails: (course, semester, details) => {
//     if (!AppState.semesterDetails[course]) {
//       AppState.semesterDetails[course] = {};
//     }
//     AppState.semesterDetails[course][semester] = details;
//     saveToStorage(STORAGE_KEYS.SEMESTER_DETAILS, AppState.semesterDetails);
//   },
  
//   getSubjectsForCourseAndSemester: (course, semester) => {
//     const details = AppState.semesterDetails[course]?.[semester];
//     if (!details) return [];
    
//     return details.subjects.map(subjectId => 
//       AppState.subjects.find(s => s.id === subjectId)
//     ).filter(s => s && s.approvalStatus === "approved");
//   },
  
//   // ============ COURSE DETAILS FUNCTIONS ============
//   submitCourseDetails: (facultyId, courses) => {
//     const coursesWithStatus = courses.map(course => ({
//       ...course,
//       deanStatus: "pending",
//       coordinatorStatus: "pending",
//       deanFeedback: "",
//       coordinatorFeedback: "",
//       submittedAt: new Date().toISOString()
//     }));
    
//     AppState.courseDetails = AppState.courseDetails.filter(c => c.facultyId !== facultyId);
//     AppState.courseDetails.push(...coursesWithStatus);
//     saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
    
//     courses.forEach(course => {
//       const subject = AppState.subjects.find(s => s.id === course.subjectId);
//       if (subject) {
//         const progressKey = `${facultyId}_${course.subjectId}`;
//         AppState.syllabusProgress[progressKey] = {
//           facultyId,
//           facultyName: AppState.getFacultyById(facultyId)?.name,
//           subjectId: course.subjectId,
//           subjectName: subject.name,
//           subjectCode: subject.code,
//           course: course.course,
//           semester: course.semester,
//           sections: course.sections,
//           totalModules: course.modules,
//           completedModules: 0,
//           modules: Array(course.modules).fill(false),
//           lastUpdated: new Date().toISOString(),
//           completionPercentage: 0
//         };
//       }
//     });
//     saveToStorage(STORAGE_KEYS.SYLLABUS_PROGRESS, AppState.syllabusProgress);
//   },
  
//   updateCourseDetailCoordinatorStatus: (courseId, status, feedback = "") => {
//     const course = AppState.courseDetails.find(c => c.id === courseId);
//     if (course) {
//       course.coordinatorStatus = status;
//       course.coordinatorFeedback = feedback;
//       if (status === "reviewed") {
//         course.reviewedAt = new Date().toISOString();
//       }
//       saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
//     }
//   },
  
//   updateCourseDetailDeanStatus: (courseId, status, feedback = "") => {
//     const course = AppState.courseDetails.find(c => c.id === courseId);
//     if (course) {
//       course.deanStatus = status;
//       course.deanFeedback = feedback;
//       if (status === "approved") {
//         course.approvedAt = new Date().toISOString();
//         AppState.checkSyllabusDiscrepancy(course.facultyId, course.subjectId);
//       }
//       if (status === "rejected") {
//         course.rejectedAt = new Date().toISOString();
//       }
//       saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
//     }
//   },
  
//   getPendingCoordinatorReviews: () => {
//     return AppState.courseDetails.filter(c => 
//       c.coordinatorStatus === "pending"
//     );
//   },
  
//   getPendingDeanCourseApprovals: () => {
//     return AppState.courseDetails.filter(c => 
//       c.coordinatorStatus === "reviewed" && 
//       c.deanStatus === "pending"
//     );
//   },
  
//   getPendingDeanPreferenceApprovals: () => {
//     return AppState.subjectPreferences.filter(p => 
//       p.status === "allocated"
//     );
//   },
  
//   getPendingSubjectApprovals: () => {
//     return AppState.subjects.filter(s => s.approvalStatus === "pending");
//   },
  
//   getApprovedSubjects: () => {
//     return AppState.subjects.filter(s => s.approvalStatus === "approved");
//   },
  
//   getRejectedSubjects: () => {
//     return AppState.subjects.filter(s => s.approvalStatus === "rejected");
//   },
  
//   // Alias for backward compatibility
//   getPendingDeanApprovals: () => {
//     return AppState.getPendingDeanCourseApprovals();
//   },
  
//   // Validate timetable before generation for a specific department
//   validateTimetable: (department = null) => {
//     let approvedCourses = AppState.courseDetails.filter(c => c.deanStatus === "approved");
//     if (department) {
//       approvedCourses = approvedCourses.filter(c => c.course === department);
//     }
//     const config = AppState.timetableConfig;
//     return validateTimetableFeasibility(approvedCourses, AppState.faculty, AppState.rooms, config);
//   },
  
//   // ============ SYLLABUS & PROGRESS FUNCTIONS ============
//   getSyllabusProgress: (facultyId, subjectId) => {
//     const progressKey = `${facultyId}_${subjectId}`;
//     return AppState.syllabusProgress[progressKey] || null;
//   },
  
//   // Calculate conflict severity based on difference percentage
//   calculateConflictSeverity: (facultyProgress, avgStudentProgress, totalModules) => {
//     const difference = Math.abs(facultyProgress - avgStudentProgress);
//     const percentageDiff = totalModules > 0 ? (difference / totalModules) * 100 : 0;
    
//     if (percentageDiff >= 40) {
//       return { level: "critical", percentage: percentageDiff, action: "Immediate meeting with Dean required" };
//     } else if (percentageDiff >= 30) {
//       return { level: "high", percentage: percentageDiff, action: "Dean review and explanation required" };
//     } else if (percentageDiff >= 20) {
//       return { level: "medium", percentage: percentageDiff, action: "Faculty explanation recommended" };
//     }
//     return { level: "low", percentage: percentageDiff, action: "Monitor only - No action needed" };
//   },
  
//   // Check and raise syllabus conflict alert for dean
//   checkAndRaiseSyllabusConflict: (facultyId, subjectId) => {
//     const facultyProgress = AppState.getSyllabusProgress(facultyId, subjectId);
//     if (!facultyProgress) return null;
    
//     let totalStudentProgress = 0;
//     let studentCount = 0;
//     const studentDetails = [];
    
//     for (const key in AppState.studentProgress) {
//       if (key.includes(subjectId)) {
//         const studentProgress = AppState.studentProgress[key];
//         totalStudentProgress += studentProgress.completedModules;
//         studentCount++;
//         studentDetails.push({
//           studentId: studentProgress.studentId,
//           progress: studentProgress.completedModules
//         });
//       }
//     }
    
//     if (studentCount < 3) return null;
    
//     const avgStudentProgress = totalStudentProgress / studentCount;
//     const facultyCompleted = facultyProgress.completedModules;
//     const totalModules = facultyProgress.totalModules;
//     const severity = AppState.calculateConflictSeverity(facultyCompleted, avgStudentProgress, totalModules);
    
//     if (severity.level !== "low") {
//       const existingConflict = AppState.flaggedIssues.find(issue => 
//         issue.type === "syllabus_conflict" && 
//         issue.subjectId === subjectId && 
//         issue.facultyId === facultyId &&
//         !issue.resolved
//       );
      
//       if (existingConflict) {
//         if (existingConflict.severity !== severity.level || 
//             existingConflict.facultyProgress !== facultyCompleted ||
//             Math.abs(existingConflict.averageStudentProgress - avgStudentProgress) > 0.5) {
          
//           existingConflict.severity = severity.level;
//           existingConflict.severityPercentage = severity.percentage;
//           existingConflict.facultyProgress = facultyCompleted;
//           existingConflict.averageStudentProgress = avgStudentProgress;
//           existingConflict.requiredAction = severity.action;
//           existingConflict.lastUpdated = new Date().toISOString();
          
//           saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
//           AppState.updateDeanNotification(existingConflict);
//         }
//         return existingConflict;
//       }
      
//       if (severity.percentage >= 20) {
//         const conflict = {
//           id: Date.now() + Math.random(),
//           type: "syllabus_conflict",
//           subjectId,
//           subjectName: facultyProgress.subjectName,
//           facultyId,
//           facultyName: facultyProgress.facultyName,
//           facultyProgress: facultyCompleted,
//           averageStudentProgress: avgStudentProgress,
//           totalModules,
//           severity: severity.level,
//           severityPercentage: severity.percentage,
//           requiredAction: severity.action,
//           studentsAffected: studentCount,
//           studentDetails: studentDetails,
//           timestamp: new Date().toISOString(),
//           lastUpdated: new Date().toISOString(),
//           resolved: false,
//           resolution: null,
//           facultyResponse: null,
//           deanAction: null
//         };
        
//         AppState.flaggedIssues.push(conflict);
//         saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
//         AppState.createDeanNotification(conflict);
//         return conflict;
//       }
//     }
    
//     return null;
//   },
  
//   createDeanNotification: (conflict) => {
//     const notifications = loadFromStorage('acadplan_dean_notifications', []);
//     const notification = {
//       id: Date.now(),
//       conflictId: conflict.id,
//       subjectName: conflict.subjectName,
//       facultyName: conflict.facultyName,
//       severity: conflict.severity,
//       severityPercentage: conflict.severityPercentage,
//       message: `${conflict.severity.toUpperCase()} severity conflict detected in ${conflict.subjectName}. Faculty progress: ${conflict.facultyProgress}/${conflict.totalModules} modules, Student average: ${conflict.averageStudentProgress.toFixed(1)}/${conflict.totalModules} modules. Difference: ${conflict.severityPercentage.toFixed(1)}%. ${conflict.requiredAction}`,
//       timestamp: conflict.timestamp,
//       read: false,
//       actionTaken: false
//     };
//     notifications.push(notification);
//     saveToStorage('acadplan_dean_notifications', notifications);
//     window.dispatchEvent(new Event('storage'));
//   },
  
//   updateDeanNotification: (conflict) => {
//     const notifications = loadFromStorage('acadplan_dean_notifications', []);
//     const notification = notifications.find(n => n.conflictId === conflict.id);
//     if (notification) {
//       notification.severity = conflict.severity;
//       notification.severityPercentage = conflict.severityPercentage;
//       notification.message = `${conflict.severity.toUpperCase()} severity conflict detected in ${conflict.subjectName}. Faculty progress: ${conflict.facultyProgress}/${conflict.totalModules} modules, Student average: ${conflict.averageStudentProgress.toFixed(1)}/${conflict.totalModules} modules. Difference: ${conflict.severityPercentage.toFixed(1)}%. ${conflict.requiredAction}`;
//       notification.lastUpdated = conflict.lastUpdated;
//       saveToStorage('acadplan_dean_notifications', notifications);
//     }
//   },
  
//   facultyRespondToConflict: (conflictId, responseType, explanation) => {
//     const issue = AppState.flaggedIssues.find(i => i.id === conflictId);
//     if (issue) {
//       issue.facultyResponse = {
//         responseType: responseType,
//         explanation: explanation,
//         respondedAt: new Date().toISOString()
//       };
//       saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
      
//       const notifications = loadFromStorage('acadplan_dean_notifications', []);
//       const notification = notifications.find(n => n.conflictId === conflictId);
//       if (notification) {
//         notification.facultyResponded = true;
//         notification.facultyResponseType = responseType;
//         notification.facultyExplanation = explanation;
//         notification.facultyRespondedAt = new Date().toISOString();
//         saveToStorage('acadplan_dean_notifications', notifications);
//       }
      
//       window.dispatchEvent(new Event('storage'));
//       return true;
//     }
//     return false;
//   },
  
//   deanResolveConflict: (conflictId, action, notes) => {
//     const issue = AppState.flaggedIssues.find(i => i.id === conflictId);
//     if (issue) {
//       issue.deanAction = {
//         action: action,
//         notes: notes,
//         actionedAt: new Date().toISOString()
//       };
//       issue.resolved = true;
//       issue.resolution = action;
//       issue.resolvedAt = new Date().toISOString();
//       saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
      
//       const notifications = loadFromStorage('acadplan_dean_notifications', []);
//       const notificationIndex = notifications.findIndex(n => n.conflictId === conflictId);
//       if (notificationIndex !== -1) {
//         notifications[notificationIndex].actionTaken = true;
//         notifications[notificationIndex].deanAction = action;
//         notifications[notificationIndex].deanNotes = notes;
//         notifications[notificationIndex].resolvedAt = new Date().toISOString();
//         saveToStorage('acadplan_dean_notifications', notifications);
//       }
      
//       window.dispatchEvent(new Event('storage'));
//       return true;
//     }
//     return false;
//   },
  
//   getUnresolvedSyllabusConflicts: () => {
//     return AppState.flaggedIssues.filter(issue => 
//       issue.type === "syllabus_conflict" && !issue.resolved
//     );
//   },
  
//   getConflictsBySeverity: (severity) => {
//     return AppState.flaggedIssues.filter(issue => 
//       issue.type === "syllabus_conflict" && issue.severity === severity && !issue.resolved
//     );
//   },
  
//   getDeanNotifications: () => {
//     return loadFromStorage('acadplan_dean_notifications', []);
//   },
  
//   markDeanNotificationAsRead: (notificationId) => {
//     const notifications = loadFromStorage('acadplan_dean_notifications', []);
//     const notification = notifications.find(n => n.id === notificationId);
//     if (notification) {
//       notification.read = true;
//       saveToStorage('acadplan_dean_notifications', notifications);
//       window.dispatchEvent(new Event('storage'));
//     }
//   },
  
//   updateSyllabusProgress: (facultyId, subjectId, moduleIndex, completed) => {
//     const progressKey = `${facultyId}_${subjectId}`;
//     if (AppState.syllabusProgress[progressKey]) {
//       const progress = AppState.syllabusProgress[progressKey];
//       progress.modules[moduleIndex] = completed;
//       progress.completedModules = progress.modules.filter(m => m).length;
//       progress.lastUpdated = new Date().toISOString();
//       progress.completionPercentage = calculateSyllabusProgress(
//         progress.completedModules, 
//         progress.totalModules
//       );
      
//       saveToStorage(STORAGE_KEYS.SYLLABUS_PROGRESS, AppState.syllabusProgress);
//       AppState.checkSyllabusDiscrepancy(facultyId, subjectId);
//       AppState.checkAndRaiseSyllabusConflict(facultyId, subjectId);
//     }
//   },
  
//   updateStudentProgress: (studentId, subjectId, moduleIndex, completed) => {
//     const key = `${studentId}_${subjectId}`;
//     if (!AppState.studentProgress[key]) {
//       const subject = AppState.subjects.find(s => s.id === subjectId);
//       AppState.studentProgress[key] = {
//         studentId,
//         subjectId,
//         subjectName: subject?.name,
//         totalModules: subject?.modules || 0,
//         completedModules: 0,
//         modules: Array(subject?.modules || 0).fill(false),
//         lastUpdated: new Date().toISOString(),
//       };
//     }
    
//     const progress = AppState.studentProgress[key];
//     progress.modules[moduleIndex] = completed;
//     progress.completedModules = progress.modules.filter(m => m).length;
//     progress.lastUpdated = new Date().toISOString();
    
//     saveToStorage(STORAGE_KEYS.STUDENT_PROGRESS, AppState.studentProgress);
//     AppState.checkSyllabusDiscrepancyForStudent(studentId, subjectId);
    
//     const facultyProgress = AppState.getSyllabusProgressForSubject(subjectId);
//     if (facultyProgress) {
//       AppState.checkAndRaiseSyllabusConflict(facultyProgress.facultyId, subjectId);
//     }
//   },
  
//   getStudentProgress: (studentId, subjectId) => {
//     const key = `${studentId}_${subjectId}`;
//     return AppState.studentProgress[key] || null;
//   },
  
//   checkSyllabusDiscrepancy: (facultyId, subjectId) => {
//     const facultyProgress = AppState.getSyllabusProgress(facultyId, subjectId);
//     if (!facultyProgress) return;
    
//     for (const key in AppState.studentProgress) {
//       if (key.includes(subjectId)) {
//         const studentProgress = AppState.studentProgress[key];
//         const facultyCompleted = facultyProgress.completedModules;
//         const studentCompleted = studentProgress.completedModules;
//         const threshold = Math.ceil(facultyProgress.totalModules * 0.1);
        
//         if (Math.abs(facultyCompleted - studentCompleted) > threshold) {
//           const issue = {
//             id: Date.now() + Math.random(),
//             type: "student_faculty_discrepancy",
//             subjectId,
//             subjectName: facultyProgress.subjectName,
//             facultyProgress: facultyCompleted,
//             studentProgress: studentCompleted,
//             facultyId,
//             studentId: studentProgress.studentId,
//             timestamp: new Date().toISOString(),
//             resolved: false
//           };
          
//           const exists = AppState.flaggedIssues.some(i => 
//             i.type === "student_faculty_discrepancy" && 
//             i.subjectId === subjectId && 
//             i.facultyId === facultyId &&
//             i.studentId === studentProgress.studentId &&
//             !i.resolved
//           );
          
//           if (!exists) {
//             AppState.flaggedIssues.push(issue);
//             saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
//           }
//         }
//       }
//     }
//   },
  
//   checkSyllabusDiscrepancyForStudent: (studentId, subjectId) => {
//     const studentProgress = AppState.getStudentProgress(studentId, subjectId);
//     if (!studentProgress) return;
    
//     const facultyProgress = AppState.getSyllabusProgressForSubject(subjectId);
//     if (facultyProgress) {
//       const facultyCompleted = facultyProgress.completedModules;
//       const studentCompleted = studentProgress.completedModules;
//       const threshold = Math.ceil(studentProgress.totalModules * 0.1);
      
//       if (Math.abs(facultyCompleted - studentCompleted) > threshold) {
//         const issue = {
//           id: Date.now(),
//           type: "student_faculty_discrepancy",
//           subjectId,
//           subjectName: studentProgress.subjectName,
//           facultyProgress: facultyCompleted,
//           studentProgress: studentCompleted,
//           facultyId: facultyProgress.facultyId,
//           studentId,
//           timestamp: new Date().toISOString(),
//           resolved: false
//         };
        
//         const exists = AppState.flaggedIssues.some(i => 
//           i.type === "student_faculty_discrepancy" && 
//           i.subjectId === subjectId && 
//           i.facultyId === facultyProgress.facultyId &&
//           i.studentId === studentId &&
//           !i.resolved
//         );
        
//         if (!exists) {
//           AppState.flaggedIssues.push(issue);
//           saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
//         }
//       }
//     }
//   },
  
//   getSyllabusProgressForSubject: (subjectId) => {
//     for (const key in AppState.syllabusProgress) {
//       if (key.includes(subjectId)) {
//         return AppState.syllabusProgress[key];
//       }
//     }
//     return null;
//   },
  
//   // ============ TIMETABLE FUNCTIONS ============
//   generateTimeSlots: (config) => {
//     return generateTimeSlotsUtil(config);
//   },
  
//   updateTimetableConfig: (config) => {
//     AppState.timetableConfig = config;
//     saveToStorage(STORAGE_KEYS.TIMETABLE_CONFIG, config);
//   },
  
//   generateTimetable: (department = null) => {
//     console.log(`=== GENERATING TIMETABLE for ${department || 'ALL'} (Conflict-free & Gap-free) ===`);
    
//     // Get active department from localStorage
//     let activeDept = department;
//     if (!activeDept) {
//       activeDept = loadFromStorage(STORAGE_KEYS.ACTIVE_DEPARTMENT, null);
//     }
    
//     // Filter courses by department if specified
//     let approvedCourses = AppState.courseDetails.filter(c => c.deanStatus === "approved");
//     if (activeDept) {
//       approvedCourses = approvedCourses.filter(c => c.course === activeDept);
//       console.log(`Filtered to ${activeDept}: ${approvedCourses.length} courses`);
//     }
    
//     if (approvedCourses.length === 0) {
//       console.warn(`No approved courses found for ${activeDept || 'any department'}`);
//       return [];
//     }
    
//     // First validate if all subjects can be scheduled
//     const validation = AppState.validateTimetable(activeDept);
    
//     if (!validation.canSchedule) {
//       console.error("Cannot schedule all subjects:", validation.errors);
//       AppState.timetableValidationErrors = validation.errors;
//       alert(`Cannot generate timetable for ${activeDept}! Some subjects cannot be scheduled due to:\n` + 
//             validation.errors.map(e => `- ${e.subject || e.faculty}: ${e.type}`).join("\n"));
//       return [];
//     }
    
//     if (validation.warnings.length > 0) {
//       console.warn("Timetable generation warnings:", validation.warnings);
//     }

//     const buildSessionList = (approvedCourses) => {
//       const sessions = [];
//       for (const courseDetail of approvedCourses) {
//         const subject = AppState.subjects.find(s => s.id === courseDetail.subjectId);
//         if (!subject) continue;
//         const faculty = AppState.faculty.find(f => f.id === courseDetail.facultyId);
//         if (!faculty) continue;

//         const sections = courseDetail.sections || SECTIONS;

//         for (const section of sections) {
//           for (let i = 0; i < subject.theoryClassesPerWeek; i++) {
//             sessions.push({
//               id: `${courseDetail.id}_theory_${section}_${i}`,
//               course: courseDetail.course,
//               semester: courseDetail.semester,
//               section,
//               subjectId: subject.id,
//               subjectName: subject.name,
//               subjectCode: subject.code,
//               facultyId: faculty.id,
//               facultyName: faculty.name,
//               facultyAvatar: faculty.avatar,
//               color: faculty.color,
//               type: 'theory',
//             });
//           }
//           for (let i = 0; i < subject.labPeriodsPerWeek; i++) {
//             sessions.push({
//               id: `${courseDetail.id}_lab_${section}_${i}`,
//               course: courseDetail.course,
//               semester: courseDetail.semester,
//               section,
//               subjectId: subject.id,
//               subjectName: subject.name,
//               subjectCode: subject.code,
//               facultyId: faculty.id,
//               facultyName: faculty.name,
//               facultyAvatar: faculty.avatar,
//               color: faculty.color,
//               type: 'lab',
//             });
//           }
//         }
//       }
//       return sessions;
//     };

//     const sortSessions = (sessions) => {
//       const facultyCount = {};
//       sessions.forEach(s => { facultyCount[s.facultyId] = (facultyCount[s.facultyId] || 0) + 1; });
//       return [...sessions].sort((a, b) => {
//         if (a.type !== b.type) return a.type === 'lab' ? -1 : 1;
//         return (facultyCount[b.facultyId] || 0) - (facultyCount[a.facultyId] || 0);
//       });
//     };

//     const config = AppState.timetableConfig;
//     const days = config.days;

//     const allTimeSlots = AppState.generateTimeSlots(config);
//     const teachingSlots = allTimeSlots.filter(s => !s.isLunch && !s.isBreak);

//     let sessions = buildSessionList(approvedCourses);
//     const totalTeachingSlots = days.length * teachingSlots.length;
//     const totalSessionsNeeded = sessions.length;

//     console.log(`Total teaching slots available: ${totalTeachingSlots}`);
//     console.log(`Total sessions to schedule: ${totalSessionsNeeded}`);
//     console.log(`Utilization: ${(totalSessionsNeeded / totalTeachingSlots * 100).toFixed(1)}%`);

//     if (totalSessionsNeeded > totalTeachingSlots) {
//       console.error(`Not enough teaching slots! Need ${totalSessionsNeeded}, have ${totalTeachingSlots}`);
//     }

//     sessions = sortSessions(sessions);

//     const facultyOccupancy = {};
//     const roomOccupancy = {};

//     const getAvailableTheoryRoom = (day, time) => {
//       const theoryRooms = AppState.rooms.filter(r => r.type === "Theory");
//       return theoryRooms.find(r => !roomOccupancy[`${day}_${time}_${r.name}`]);
//     };

//     const getAvailableLabRoom = (day, time1, time2) => {
//       const labRooms = AppState.rooms.filter(r => r.type === "Lab");
//       return labRooms.find(r => !roomOccupancy[`${day}_${time1}_${r.name}`] && !roomOccupancy[`${day}_${time2}_${r.name}`]);
//     };

//     const timetable = [];
//     let sessionIdx = 0;

//     for (let d = 0; d < days.length; d++) {
//       const day = days[d];
//       for (let s = 0; s < teachingSlots.length; s++) {
//         const slot = teachingSlots[s];
//         const time = slot.time;

//         if (sessionIdx >= sessions.length) {
//           timetable.push({
//             id: Date.now() + Math.random(),
//             subject: "Free Period",
//             subjectCode: "FREE",
//             facultyName: "None",
//             facultyId: null,
//             room: "N/A",
//             type: "free",
//             color: "#cccccc",
//             day,
//             time,
//             course: "",
//             semester: "",
//             section: "",
//           });
//           continue;
//         }

//         let assigned = false;
//         for (let i = sessionIdx; i < sessions.length && !assigned; i++) {
//           const session = sessions[i];
//           if (session.assigned) continue;

//           if (session.type === 'lab') {
//             const nextSlot = teachingSlots[s + 1];
//             if (!nextSlot) continue;
//             const time2 = nextSlot.time;
//             const facultyKey1 = `${day}_${time}_${session.facultyId}`;
//             const facultyKey2 = `${day}_${time2}_${session.facultyId}`;
//             if (facultyOccupancy[facultyKey1] || facultyOccupancy[facultyKey2]) continue;

//             const room = getAvailableLabRoom(day, time, time2);
//             if (!room) continue;

//             timetable.push({
//               id: Date.now() + Math.random(),
//               course: session.course,
//               semester: session.semester,
//               section: session.section,
//               day,
//               time,
//               subject: session.subjectName,
//               subjectId: session.subjectId,
//               subjectCode: session.subjectCode,
//               facultyId: session.facultyId,
//               facultyName: session.facultyName,
//               facultyAvatar: session.facultyAvatar,
//               room: room.name,
//               type: "lab",
//               color: session.color,
//             });
//             timetable.push({
//               id: Date.now() + Math.random(),
//               course: session.course,
//               semester: session.semester,
//               section: session.section,
//               day,
//               time: time2,
//               subject: session.subjectName,
//               subjectId: session.subjectId,
//               subjectCode: session.subjectCode,
//               facultyId: session.facultyId,
//               facultyName: session.facultyName,
//               facultyAvatar: session.facultyAvatar,
//               room: room.name,
//               type: "lab",
//               color: session.color,
//             });

//             facultyOccupancy[facultyKey1] = true;
//             facultyOccupancy[facultyKey2] = true;
//             roomOccupancy[`${day}_${time}_${room.name}`] = true;
//             roomOccupancy[`${day}_${time2}_${room.name}`] = true;

//             sessions[i] = sessions[sessions.length - 1];
//             sessions.pop();
//             assigned = true;
//             s++;
//             break;
//           } else {
//             const facultyKey = `${day}_${time}_${session.facultyId}`;
//             if (facultyOccupancy[facultyKey]) continue;

//             const room = getAvailableTheoryRoom(day, time);
//             if (!room) continue;

//             timetable.push({
//               id: Date.now() + Math.random(),
//               course: session.course,
//               semester: session.semester,
//               section: session.section,
//               day,
//               time,
//               subject: session.subjectName,
//               subjectId: session.subjectId,
//               subjectCode: session.subjectCode,
//               facultyId: session.facultyId,
//               facultyName: session.facultyName,
//               facultyAvatar: session.facultyAvatar,
//               room: room.name,
//               type: "theory",
//               color: session.color,
//             });

//             facultyOccupancy[facultyKey] = true;
//             roomOccupancy[`${day}_${time}_${room.name}`] = true;

//             sessions[i] = sessions[sessions.length - 1];
//             sessions.pop();
//             assigned = true;
//             break;
//           }
//         }

//         if (!assigned) {
//           timetable.push({
//             id: Date.now() + Math.random(),
//             subject: "Free Period",
//             subjectCode: "FREE",
//             facultyName: "None",
//             facultyId: null,
//             room: "N/A",
//             type: "free",
//             color: "#cccccc",
//             day,
//             time,
//             course: "",
//             semester: "",
//             section: "",
//           });
//         }
//       }
//     }

//     if (sessions.length > 0) {
//       console.warn(`${sessions.length} sessions could not be scheduled. They will be ignored.`);
//     }

//     // Store the generated timetable for the specific department
//     // Keep existing timetable for other departments
//     const existingTimetable = loadFromStorage(STORAGE_KEYS.TIMETABLE, []);
//     const otherDeptSlots = existingTimetable.filter(t => t.course !== activeDept);
//     const allTimetable = [...otherDeptSlots, ...timetable];
    
//     AppState.timetable = allTimetable;
//     saveToStorage(STORAGE_KEYS.TIMETABLE, allTimetable);
    
//     console.log(`Generated ${timetable.length} timetable slots for ${activeDept} (includes free periods if needed)`);
//     return timetable;
//   },
  
//   getFacultySchedule: (facultyId) => {
//     return AppState.timetable.filter(t => t.facultyId === facultyId);
//   },
  
//   getStudentSchedule: (course, semester, section) => {
//     return AppState.timetable.filter(t => 
//       t.course === course && 
//       t.semester === semester && 
//       t.section === section
//     );
//   },
  
//   checkAllConflicts: () => {
//     const conflicts = [];
    
//     for (let i = 0; i < AppState.timetable.length; i++) {
//       for (let j = i + 1; j < AppState.timetable.length; j++) {
//         const a = AppState.timetable[i];
//         const b = AppState.timetable[j];
        
//         if (a.day === b.day && a.time === b.time) {
//           if (a.facultyId === b.facultyId) {
//             conflicts.push({
//               type: "faculty",
//               message: `${a.facultyName} assigned to both ${a.subject} and ${b.subject} at ${a.day} ${a.time}`
//             });
//           }
          
//           if (a.room === b.room) {
//             conflicts.push({
//               type: "room",
//               message: `Room ${a.room} assigned to both ${a.subject} and ${b.subject} at ${a.day} ${a.time}`
//             });
//           }
//         }
//       }
//     }
    
//     return conflicts;
//   },
  
//   // ============ FLAGGED ISSUES FUNCTIONS ============
//   getFlaggedIssues: () => {
//     return AppState.flaggedIssues.filter(issue => !issue.resolved);
//   },
  
//   resolveFlaggedIssue: (issueId) => {
//     const issue = AppState.flaggedIssues.find(i => i.id === issueId);
//     if (issue) {
//       issue.resolved = true;
//       saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
//     }
//   },
  
//   // ============ INITIALIZATION ============
//   initializeStorage: () => {
//     const keys = [
//       STORAGE_KEYS.FACULTY, STORAGE_KEYS.SUBJECTS, STORAGE_KEYS.SUBJECT_PREFERENCES,
//       STORAGE_KEYS.ROOMS, STORAGE_KEYS.TIMETABLE_CONFIG, STORAGE_KEYS.SEMESTER_DETAILS,
//       STORAGE_KEYS.FLAGGED_ISSUES, STORAGE_KEYS.STUDENT_PROGRESS, STORAGE_KEYS.DEAN_APPROVALS,
//       STORAGE_KEYS.LEAVE_REQUESTS, STORAGE_KEYS.CALENDAR_EVENTS, STORAGE_KEYS.COURSE_DETAILS,
//       STORAGE_KEYS.TIMETABLE, STORAGE_KEYS.SYLLABUS_PROGRESS, STORAGE_KEYS.FACULTY_SUBMISSIONS,
//       STORAGE_KEYS.PREFERENCE_SETTINGS, STORAGE_KEYS.FACULTY_PREFERENCE_FORM
//     ];
    
//     const defaultValues = {
//       [STORAGE_KEYS.FACULTY]: DEFAULT_FACULTY,
//       [STORAGE_KEYS.SUBJECTS]: DEFAULT_SUBJECTS,
//       [STORAGE_KEYS.SUBJECT_PREFERENCES]: DEFAULT_SUBJECT_PREFERENCES,
//       [STORAGE_KEYS.ROOMS]: DEFAULT_ROOMS,
//       [STORAGE_KEYS.TIMETABLE_CONFIG]: DEFAULT_TIMETABLE_CONFIG,
//       [STORAGE_KEYS.SEMESTER_DETAILS]: DEFAULT_SEMESTER_DETAILS,
//       [STORAGE_KEYS.FLAGGED_ISSUES]: [],
//       [STORAGE_KEYS.STUDENT_PROGRESS]: {},
//       [STORAGE_KEYS.DEAN_APPROVALS]: {},
//       [STORAGE_KEYS.LEAVE_REQUESTS]: [],
//       [STORAGE_KEYS.CALENDAR_EVENTS]: DEFAULT_CALENDAR_EVENTS,
//       [STORAGE_KEYS.COURSE_DETAILS]: [],
//       [STORAGE_KEYS.TIMETABLE]: [],
//       [STORAGE_KEYS.SYLLABUS_PROGRESS]: {},
//       [STORAGE_KEYS.FACULTY_SUBMISSIONS]: [],
//       [STORAGE_KEYS.PREFERENCE_SETTINGS]: {
//         requireOneCoreOneMajorOneMinor: true,
//         requireDifferentSemesters: false,
//         maxPreferencesPerFaculty: 3,
//         minPreferencesRequired: 3,
//         allowSameSemester: true,
//         allowSameType: false,
//         requireDifferentSubjects: true
//       },
//       [STORAGE_KEYS.FACULTY_PREFERENCE_FORM]: {}
//     };
    
//     keys.forEach(key => {
//       if (!localStorage.getItem(key) && defaultValues[key] !== undefined) {
//         saveToStorage(key, defaultValues[key]);
//       }
//     });
    
//     const facultyData = loadFromStorage(STORAGE_KEYS.FACULTY, DEFAULT_FACULTY);
//     if (facultyData && facultyData.length > 0) {
//       AppState.faculty = facultyData;
//     } else {
//       AppState.faculty = DEFAULT_FACULTY;
//       saveToStorage(STORAGE_KEYS.FACULTY, DEFAULT_FACULTY);
//     }
    
//     const currentConfig = loadFromStorage(STORAGE_KEYS.TIMETABLE_CONFIG, DEFAULT_TIMETABLE_CONFIG);
//     if (!currentConfig.lunchBreak) {
//       currentConfig.lunchBreak = { start: "12:30", duration: 40 };
//       saveToStorage(STORAGE_KEYS.TIMETABLE_CONFIG, currentConfig);
//       AppState.timetableConfig = currentConfig;
//     }
    
//     let currentSubjects = loadFromStorage(STORAGE_KEYS.SUBJECTS, DEFAULT_SUBJECTS);
//     let needsUpdate = false;
//     const updatedSubjects = currentSubjects.map(subject => {
//       if (!subject.approvalStatus) {
//         needsUpdate = true;
//         return { ...subject, approvalStatus: "approved" };
//       }
//       return subject;
//     });
    
//     if (needsUpdate) {
//       saveToStorage(STORAGE_KEYS.SUBJECTS, updatedSubjects);
//       AppState.subjects = updatedSubjects;
//     }
//   },
// };

// // Initialize AppState
// AppState.init();
// AppState.initializeStorage();

// if (typeof window !== 'undefined') {
//   window.AppState = AppState;
// }

// src/AppState.js
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "./utils/storage";
import { 
  DEFAULT_FACULTY, 
  DEFAULT_SUBJECTS, 
  DEFAULT_SUBJECT_PREFERENCES, 
  DEFAULT_ROOMS, 
  DEFAULT_TIMETABLE_CONFIG, 
  DEFAULT_SEMESTER_DETAILS,
  DEFAULT_CALENDAR_EVENTS,
  COURSES,
  SEMESTERS,
  SECTIONS
} from "./data/mockData";

// Helper function to calculate syllabus progress
const calculateSyllabusProgress = (completedModules, totalModules) => {
  return totalModules > 0 ? (completedModules / totalModules) * 100 : 0;
};

// Helper function to generate time slots with lunch break and breaks after every 2 classes
const generateTimeSlotsUtil = (config) => {
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
    const endTime = new Date(current.getTime() + config.classDuration * 60000);
    const endTimeStr = endTime.toTimeString().substring(0, 5);
    
    // Check for lunch break
    if (!lunchAdded && current >= lunchStart && current < lunchEnd) {
      slots.push({
        time: timeStr,
        endTime: lunchEnd.toTimeString().substring(0, 5),
        period: "LUNCH",
        isLunch: true,
        isBreak: false,
        label: "LUNCH BREAK"
      });
      current = new Date(lunchEnd);
      lunchAdded = true;
      classesBeforeBreak = 0;
      continue;
    }
    
    // Add class
    if (endTime <= end) {
      slots.push({
        time: timeStr,
        endTime: endTimeStr,
        period: `P${periodNumber}`,
        isLunch: false,
        isBreak: false,
        label: `${timeStr} - ${endTimeStr}`
      });
      periodNumber++;
      classesBeforeBreak++;
      current = new Date(endTime);
      
      // Add break after every 2 classes
      if (classesBeforeBreak === 2 && config.breakDuration > 0) {
        const breakStart = new Date(current);
        const breakEnd = new Date(current.getTime() + config.breakDuration * 60000);
        
        let shouldAddBreak = false;
        if (!lunchAdded && breakEnd <= lunchStart) {
          shouldAddBreak = true;
        } else if (lunchAdded && breakEnd <= end) {
          shouldAddBreak = true;
        }
        
        if (shouldAddBreak) {
          slots.push({
            time: breakStart.toTimeString().substring(0, 5),
            endTime: breakEnd.toTimeString().substring(0, 5),
            period: "BREAK",
            isLunch: false,
            isBreak: true,
            label: "SHORT BREAK"
          });
          current = breakEnd;
          classesBeforeBreak = 0;
        } else {
          classesBeforeBreak = 0;
        }
      }
    } else {
      break;
    }
  }
  
  return slots;
};

// Helper function to validate timetable feasibility for a specific department
const validateTimetableFeasibility = (approvedCourses, facultyList, roomsList, config) => {
  const TEACHING_SLOTS_PER_WEEK = 40; // 8 slots/day × 5 days
  const SECTIONS = 3;
  
  const results = {
    canSchedule: true,
    errors: [],
    warnings: [],
    subjectStatus: [],
    facultyWorkload: {},
    totalRequiredSlots: 0,
    totalAvailableSlots: TEACHING_SLOTS_PER_WEEK * SECTIONS,
    utilization: 0
  };
  
  // Track faculty workload
  const facultyLoad = {};
  
  for (const course of approvedCourses) {
    const subject = AppState.subjects.find(s => s.id === course.subjectId);
    const faculty = AppState.faculty.find(f => f.id === course.facultyId);
    
    if (!subject || !faculty) continue;
    
    // Calculate required slots for this subject (all sections)
    const requiredSlots = subject.totalWeeklyClasses * SECTIONS;
    results.totalRequiredSlots += requiredSlots;
    
    // Track faculty load
    facultyLoad[faculty.id] = (facultyLoad[faculty.id] || 0) + subject.totalWeeklyClasses;
    
    // Check individual subject feasibility
    const canSchedule = faculty.remainingHours >= subject.totalWeeklyClasses;
    
    results.subjectStatus.push({
      subjectId: subject.id,
      subjectName: subject.name,
      subjectCode: subject.code,
      facultyName: faculty.name,
      weeklyHours: subject.totalWeeklyClasses,
      requiredSlots,
      canSchedule,
      error: canSchedule ? null : `Faculty ${faculty.name} has only ${faculty.remainingHours}h remaining, needs ${subject.totalWeeklyClasses}h`
    });
    
    if (!canSchedule) {
      results.canSchedule = false;
      results.errors.push({
        type: 'faculty_overload',
        subject: subject.name,
        faculty: faculty.name,
        required: subject.totalWeeklyClasses,
        available: faculty.remainingHours
      });
    }
  }
  
  // Check faculty workload
  for (const [facultyId, load] of Object.entries(facultyLoad)) {
    const faculty = AppState.faculty.find(f => f.id === parseInt(facultyId));
    if (faculty) {
      results.facultyWorkload[faculty.name] = {
        assigned: load,
        max: faculty.maxHours,
        remaining: faculty.maxHours - load,
        isOverloaded: load > faculty.maxHours
      };
      
      if (load > faculty.maxHours) {
        results.errors.push({
          type: 'faculty_overall_overload',
          faculty: faculty.name,
          assigned: load,
          max: faculty.maxHours
        });
      }
    }
  }
  
  // Calculate utilization
  results.utilization = (results.totalRequiredSlots / results.totalAvailableSlots) * 100;
  
  if (results.utilization > 100) {
    results.warnings.push({
      type: 'over_capacity',
      required: results.totalRequiredSlots,
      available: results.totalAvailableSlots,
      deficit: results.totalRequiredSlots - results.totalAvailableSlots
    });
    results.canSchedule = false;
  } else if (results.utilization < 70) {
    results.warnings.push({
      type: 'under_capacity',
      required: results.totalRequiredSlots,
      available: results.totalAvailableSlots,
      freeSlots: results.totalAvailableSlots - results.totalRequiredSlots
    });
  }
  
  return results;
};

export const AppState = {
  // Data stores
  faculty: [],
  subjects: [],
  subjectPreferences: [],
  courseDetails: [],
  timetable: [],
  syllabusProgress: {},
  rooms: [],
  timetableConfig: {},
  semesterDetails: {},
  flaggedIssues: [],
  studentProgress: {},
  deanApprovals: {},
  
  // Initialize all data
  init: () => {
    AppState.faculty = loadFromStorage(STORAGE_KEYS.FACULTY, DEFAULT_FACULTY);
    AppState.subjects = loadFromStorage(STORAGE_KEYS.SUBJECTS, DEFAULT_SUBJECTS);
    AppState.subjectPreferences = loadFromStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, DEFAULT_SUBJECT_PREFERENCES);
    AppState.courseDetails = loadFromStorage(STORAGE_KEYS.COURSE_DETAILS, []);
    AppState.timetable = loadFromStorage(STORAGE_KEYS.TIMETABLE, []);
    AppState.syllabusProgress = loadFromStorage(STORAGE_KEYS.SYLLABUS_PROGRESS, {});
    AppState.rooms = loadFromStorage(STORAGE_KEYS.ROOMS, DEFAULT_ROOMS);
    AppState.timetableConfig = loadFromStorage(STORAGE_KEYS.TIMETABLE_CONFIG, DEFAULT_TIMETABLE_CONFIG);
    AppState.semesterDetails = loadFromStorage(STORAGE_KEYS.SEMESTER_DETAILS, DEFAULT_SEMESTER_DETAILS);
    AppState.flaggedIssues = loadFromStorage(STORAGE_KEYS.FLAGGED_ISSUES, []);
    AppState.studentProgress = loadFromStorage(STORAGE_KEYS.STUDENT_PROGRESS, {});
    AppState.deanApprovals = loadFromStorage(STORAGE_KEYS.DEAN_APPROVALS, {});
    
    // Ensure faculty data is valid
    if (!AppState.faculty || AppState.faculty.length === 0) {
      AppState.faculty = DEFAULT_FACULTY;
      saveToStorage(STORAGE_KEYS.FACULTY, DEFAULT_FACULTY);
    }
  },
  
  // ============ FACULTY FUNCTIONS ============
  getFacultyById: (id) => {
    return AppState.faculty.find(f => f.id === id);
  },
  
  getFacultyByEmail: (email) => {
    return AppState.faculty.find(f => f.email === email);
  },
  
  getCourseDetailsByFacultyId: (facultyId) => {
    return AppState.courseDetails.filter(c => c.facultyId === facultyId);
  },
  
  updateFacultyRemainingHours: (facultyId, assignedHours) => {
    const faculty = AppState.faculty.find(f => f.id === facultyId);
    if (faculty) {
      faculty.assignedHours += assignedHours;
      faculty.remainingHours = faculty.maxHours - faculty.assignedHours;
      saveToStorage(STORAGE_KEYS.FACULTY, AppState.faculty);
    }
  },
  
  // ============ PREFERENCE FUNCTIONS ============
  getPreferenceByFacultyId: (facultyId) => {
    return AppState.subjectPreferences.find(p => p.facultyId === facultyId);
  },
  
  submitSubjectPreferences: (facultyId, preferences) => {
    const pref = AppState.subjectPreferences.find(p => p.facultyId === facultyId);
    if (pref) {
      pref.submitted = true;
      pref.preferences = preferences;
      pref.status = "pending";
      pref.feedback = "";
      pref.submittedAt = new Date().toISOString();
      saveToStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, AppState.subjectPreferences);
    }
  },
  
  updatePreferenceStatus: (facultyId, status, feedback = "", allocatedSubjects = []) => {
    const pref = AppState.subjectPreferences.find(p => p.facultyId === facultyId);
    if (pref) {
      pref.status = status;
      pref.feedback = feedback;
      
      if (status === "allocated" && allocatedSubjects.length > 0) {
        pref.allocatedSubjects = allocatedSubjects;
        pref.allocatedAt = new Date().toISOString();
        
        allocatedSubjects.forEach(subjectId => {
          const subject = AppState.subjects.find(s => s.id === subjectId);
          if (subject) {
            AppState.updateFacultyRemainingHours(facultyId, subject.totalWeeklyClasses);
          }
        });
      }
      
      if (status === "approved") {
        pref.approvedAt = new Date().toISOString();
        pref.approvedBy = "dean";
      }
      
      if (status === "rejected") {
        pref.rejectedAt = new Date().toISOString();
      }
      
      saveToStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, AppState.subjectPreferences);
    }
  },
  
  resetPreferenceForm: (facultyId) => {
    const pref = AppState.subjectPreferences.find(p => p.facultyId === facultyId);
    if (pref) {
      pref.submitted = false;
      pref.status = "pending";
      pref.feedback = "";
      pref.preferences = [];
      pref.allocatedSubjects = [];
      saveToStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, AppState.subjectPreferences);
    }
  },
  
  // ============ SEMESTER FUNCTIONS ============
  updateSemesterDetails: (course, semester, details) => {
    if (!AppState.semesterDetails[course]) {
      AppState.semesterDetails[course] = {};
    }
    AppState.semesterDetails[course][semester] = details;
    saveToStorage(STORAGE_KEYS.SEMESTER_DETAILS, AppState.semesterDetails);
  },
  
  getSubjectsForCourseAndSemester: (course, semester) => {
    const details = AppState.semesterDetails[course]?.[semester];
    if (!details) return [];
    
    return details.subjects.map(subjectId => 
      AppState.subjects.find(s => s.id === subjectId)
    ).filter(s => s && s.approvalStatus === "approved");
  },
  
  // ============ COURSE DETAILS FUNCTIONS ============
  submitCourseDetails: (facultyId, courses) => {
    const coursesWithStatus = courses.map(course => ({
      ...course,
      deanStatus: "pending",
      coordinatorStatus: "pending",
      deanFeedback: "",
      coordinatorFeedback: "",
      submittedAt: new Date().toISOString()
    }));
    
    AppState.courseDetails = AppState.courseDetails.filter(c => c.facultyId !== facultyId);
    AppState.courseDetails.push(...coursesWithStatus);
    saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
    
    courses.forEach(course => {
      const subject = AppState.subjects.find(s => s.id === course.subjectId);
      if (subject) {
        const progressKey = `${facultyId}_${course.subjectId}`;
        AppState.syllabusProgress[progressKey] = {
          facultyId,
          facultyName: AppState.getFacultyById(facultyId)?.name,
          subjectId: course.subjectId,
          subjectName: subject.name,
          subjectCode: subject.code,
          course: course.course,
          semester: course.semester,
          sections: course.sections,
          totalModules: course.modules,
          completedModules: 0,
          modules: Array(course.modules).fill(false),
          lastUpdated: new Date().toISOString(),
          completionPercentage: 0
        };
      }
    });
    saveToStorage(STORAGE_KEYS.SYLLABUS_PROGRESS, AppState.syllabusProgress);
  },
  
  updateCourseDetailCoordinatorStatus: (courseId, status, feedback = "") => {
    const course = AppState.courseDetails.find(c => c.id === courseId);
    if (course) {
      course.coordinatorStatus = status;
      course.coordinatorFeedback = feedback;
      if (status === "reviewed") {
        course.reviewedAt = new Date().toISOString();
      }
      saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
    }
  },
  
  updateCourseDetailDeanStatus: (courseId, status, feedback = "") => {
    const course = AppState.courseDetails.find(c => c.id === courseId);
    if (course) {
      course.deanStatus = status;
      course.deanFeedback = feedback;
      if (status === "approved") {
        course.approvedAt = new Date().toISOString();
        AppState.checkSyllabusDiscrepancy(course.facultyId, course.subjectId);
      }
      if (status === "rejected") {
        course.rejectedAt = new Date().toISOString();
      }
      saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
    }
  },
  
  getPendingCoordinatorReviews: () => {
    return AppState.courseDetails.filter(c => 
      c.coordinatorStatus === "pending"
    );
  },
  
  getPendingDeanCourseApprovals: () => {
    return AppState.courseDetails.filter(c => 
      c.coordinatorStatus === "reviewed" && 
      c.deanStatus === "pending"
    );
  },
  
  getPendingDeanPreferenceApprovals: () => {
    return AppState.subjectPreferences.filter(p => 
      p.status === "allocated"
    );
  },
  
  getPendingSubjectApprovals: () => {
    return AppState.subjects.filter(s => s.approvalStatus === "pending");
  },
  
  getApprovedSubjects: () => {
    return AppState.subjects.filter(s => s.approvalStatus === "approved");
  },
  
  getRejectedSubjects: () => {
    return AppState.subjects.filter(s => s.approvalStatus === "rejected");
  },
  
  // Alias for backward compatibility
  getPendingDeanApprovals: () => {
    return AppState.getPendingDeanCourseApprovals();
  },
  
  // Validate timetable before generation for a specific department
  validateTimetable: (department = null) => {
    let approvedCourses = AppState.courseDetails.filter(c => c.deanStatus === "approved");
    if (department) {
      approvedCourses = approvedCourses.filter(c => c.course === department);
    }
    const config = AppState.timetableConfig;
    return validateTimetableFeasibility(approvedCourses, AppState.faculty, AppState.rooms, config);
  },
  
  // ============ SYLLABUS & PROGRESS FUNCTIONS ============
  getSyllabusProgress: (facultyId, subjectId) => {
    const progressKey = `${facultyId}_${subjectId}`;
    return AppState.syllabusProgress[progressKey] || null;
  },
  
  // Calculate conflict severity based on difference percentage
  calculateConflictSeverity: (facultyProgress, avgStudentProgress, totalModules) => {
    const difference = Math.abs(facultyProgress - avgStudentProgress);
    const percentageDiff = totalModules > 0 ? (difference / totalModules) * 100 : 0;
    
    if (percentageDiff >= 40) {
      return { level: "critical", percentage: percentageDiff, action: "Immediate meeting with Dean required" };
    } else if (percentageDiff >= 30) {
      return { level: "high", percentage: percentageDiff, action: "Dean review and explanation required" };
    } else if (percentageDiff >= 20) {
      return { level: "medium", percentage: percentageDiff, action: "Faculty explanation recommended" };
    }
    return { level: "low", percentage: percentageDiff, action: "Monitor only - No action needed" };
  },
  
  // Check and raise syllabus conflict alert for dean
  checkAndRaiseSyllabusConflict: (facultyId, subjectId) => {
    const facultyProgress = AppState.getSyllabusProgress(facultyId, subjectId);
    if (!facultyProgress) return null;
    
    let totalStudentProgress = 0;
    let studentCount = 0;
    const studentDetails = [];
    
    for (const key in AppState.studentProgress) {
      if (key.includes(subjectId)) {
        const studentProgress = AppState.studentProgress[key];
        totalStudentProgress += studentProgress.completedModules;
        studentCount++;
        studentDetails.push({
          studentId: studentProgress.studentId,
          progress: studentProgress.completedModules
        });
      }
    }
    
    if (studentCount < 3) return null;
    
    const avgStudentProgress = totalStudentProgress / studentCount;
    const facultyCompleted = facultyProgress.completedModules;
    const totalModules = facultyProgress.totalModules;
    const severity = AppState.calculateConflictSeverity(facultyCompleted, avgStudentProgress, totalModules);
    
    if (severity.level !== "low") {
      const existingConflict = AppState.flaggedIssues.find(issue => 
        issue.type === "syllabus_conflict" && 
        issue.subjectId === subjectId && 
        issue.facultyId === facultyId &&
        !issue.resolved
      );
      
      if (existingConflict) {
        if (existingConflict.severity !== severity.level || 
            existingConflict.facultyProgress !== facultyCompleted ||
            Math.abs(existingConflict.averageStudentProgress - avgStudentProgress) > 0.5) {
          
          existingConflict.severity = severity.level;
          existingConflict.severityPercentage = severity.percentage;
          existingConflict.facultyProgress = facultyCompleted;
          existingConflict.averageStudentProgress = avgStudentProgress;
          existingConflict.requiredAction = severity.action;
          existingConflict.lastUpdated = new Date().toISOString();
          
          saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
          AppState.updateDeanNotification(existingConflict);
        }
        return existingConflict;
      }
      
      if (severity.percentage >= 20) {
        const conflict = {
          id: Date.now() + Math.random(),
          type: "syllabus_conflict",
          subjectId,
          subjectName: facultyProgress.subjectName,
          facultyId,
          facultyName: facultyProgress.facultyName,
          facultyProgress: facultyCompleted,
          averageStudentProgress: avgStudentProgress,
          totalModules,
          severity: severity.level,
          severityPercentage: severity.percentage,
          requiredAction: severity.action,
          studentsAffected: studentCount,
          studentDetails: studentDetails,
          timestamp: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
          resolved: false,
          resolution: null,
          facultyResponse: null,
          deanAction: null
        };
        
        AppState.flaggedIssues.push(conflict);
        saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
        AppState.createDeanNotification(conflict);
        return conflict;
      }
    }
    
    return null;
  },
  
  createDeanNotification: (conflict) => {
    const notifications = loadFromStorage('acadplan_dean_notifications', []);
    const notification = {
      id: Date.now(),
      conflictId: conflict.id,
      subjectName: conflict.subjectName,
      facultyName: conflict.facultyName,
      severity: conflict.severity,
      severityPercentage: conflict.severityPercentage,
      message: `${conflict.severity.toUpperCase()} severity conflict detected in ${conflict.subjectName}. Faculty progress: ${conflict.facultyProgress}/${conflict.totalModules} modules, Student average: ${conflict.averageStudentProgress.toFixed(1)}/${conflict.totalModules} modules. Difference: ${conflict.severityPercentage.toFixed(1)}%. ${conflict.requiredAction}`,
      timestamp: conflict.timestamp,
      read: false,
      actionTaken: false
    };
    notifications.push(notification);
    saveToStorage('acadplan_dean_notifications', notifications);
    window.dispatchEvent(new Event('storage'));
  },
  
  updateDeanNotification: (conflict) => {
    const notifications = loadFromStorage('acadplan_dean_notifications', []);
    const notification = notifications.find(n => n.conflictId === conflict.id);
    if (notification) {
      notification.severity = conflict.severity;
      notification.severityPercentage = conflict.severityPercentage;
      notification.message = `${conflict.severity.toUpperCase()} severity conflict detected in ${conflict.subjectName}. Faculty progress: ${conflict.facultyProgress}/${conflict.totalModules} modules, Student average: ${conflict.averageStudentProgress.toFixed(1)}/${conflict.totalModules} modules. Difference: ${conflict.severityPercentage.toFixed(1)}%. ${conflict.requiredAction}`;
      notification.lastUpdated = conflict.lastUpdated;
      saveToStorage('acadplan_dean_notifications', notifications);
    }
  },
  
  facultyRespondToConflict: (conflictId, responseType, explanation) => {
    const issue = AppState.flaggedIssues.find(i => i.id === conflictId);
    if (issue) {
      issue.facultyResponse = {
        responseType: responseType,
        explanation: explanation,
        respondedAt: new Date().toISOString()
      };
      saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
      
      const notifications = loadFromStorage('acadplan_dean_notifications', []);
      const notification = notifications.find(n => n.conflictId === conflictId);
      if (notification) {
        notification.facultyResponded = true;
        notification.facultyResponseType = responseType;
        notification.facultyExplanation = explanation;
        notification.facultyRespondedAt = new Date().toISOString();
        saveToStorage('acadplan_dean_notifications', notifications);
      }
      
      window.dispatchEvent(new Event('storage'));
      return true;
    }
    return false;
  },
  
  deanResolveConflict: (conflictId, action, notes) => {
    const issue = AppState.flaggedIssues.find(i => i.id === conflictId);
    if (issue) {
      issue.deanAction = {
        action: action,
        notes: notes,
        actionedAt: new Date().toISOString()
      };
      issue.resolved = true;
      issue.resolution = action;
      issue.resolvedAt = new Date().toISOString();
      saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
      
      const notifications = loadFromStorage('acadplan_dean_notifications', []);
      const notificationIndex = notifications.findIndex(n => n.conflictId === conflictId);
      if (notificationIndex !== -1) {
        notifications[notificationIndex].actionTaken = true;
        notifications[notificationIndex].deanAction = action;
        notifications[notificationIndex].deanNotes = notes;
        notifications[notificationIndex].resolvedAt = new Date().toISOString();
        saveToStorage('acadplan_dean_notifications', notifications);
      }
      
      window.dispatchEvent(new Event('storage'));
      return true;
    }
    return false;
  },
  
  getUnresolvedSyllabusConflicts: () => {
    return AppState.flaggedIssues.filter(issue => 
      issue.type === "syllabus_conflict" && !issue.resolved
    );
  },
  
  getConflictsBySeverity: (severity) => {
    return AppState.flaggedIssues.filter(issue => 
      issue.type === "syllabus_conflict" && issue.severity === severity && !issue.resolved
    );
  },
  
  getDeanNotifications: () => {
    return loadFromStorage('acadplan_dean_notifications', []);
  },
  
  markDeanNotificationAsRead: (notificationId) => {
    const notifications = loadFromStorage('acadplan_dean_notifications', []);
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      saveToStorage('acadplan_dean_notifications', notifications);
      window.dispatchEvent(new Event('storage'));
    }
  },
  
  updateSyllabusProgress: (facultyId, subjectId, moduleIndex, completed) => {
    const progressKey = `${facultyId}_${subjectId}`;
    if (AppState.syllabusProgress[progressKey]) {
      const progress = AppState.syllabusProgress[progressKey];
      progress.modules[moduleIndex] = completed;
      progress.completedModules = progress.modules.filter(m => m).length;
      progress.lastUpdated = new Date().toISOString();
      progress.completionPercentage = calculateSyllabusProgress(
        progress.completedModules, 
        progress.totalModules
      );
      
      saveToStorage(STORAGE_KEYS.SYLLABUS_PROGRESS, AppState.syllabusProgress);
      AppState.checkSyllabusDiscrepancy(facultyId, subjectId);
      AppState.checkAndRaiseSyllabusConflict(facultyId, subjectId);
    }
  },
  
  updateStudentProgress: (studentId, subjectId, moduleIndex, completed) => {
    const key = `${studentId}_${subjectId}`;
    if (!AppState.studentProgress[key]) {
      const subject = AppState.subjects.find(s => s.id === subjectId);
      AppState.studentProgress[key] = {
        studentId,
        subjectId,
        subjectName: subject?.name,
        totalModules: subject?.modules || 0,
        completedModules: 0,
        modules: Array(subject?.modules || 0).fill(false),
        lastUpdated: new Date().toISOString(),
      };
    }
    
    const progress = AppState.studentProgress[key];
    progress.modules[moduleIndex] = completed;
    progress.completedModules = progress.modules.filter(m => m).length;
    progress.lastUpdated = new Date().toISOString();
    
    saveToStorage(STORAGE_KEYS.STUDENT_PROGRESS, AppState.studentProgress);
    AppState.checkSyllabusDiscrepancyForStudent(studentId, subjectId);
    
    const facultyProgress = AppState.getSyllabusProgressForSubject(subjectId);
    if (facultyProgress) {
      AppState.checkAndRaiseSyllabusConflict(facultyProgress.facultyId, subjectId);
    }
  },
  
  getStudentProgress: (studentId, subjectId) => {
    const key = `${studentId}_${subjectId}`;
    return AppState.studentProgress[key] || null;
  },
  
  checkSyllabusDiscrepancy: (facultyId, subjectId) => {
    const facultyProgress = AppState.getSyllabusProgress(facultyId, subjectId);
    if (!facultyProgress) return;
    
    for (const key in AppState.studentProgress) {
      if (key.includes(subjectId)) {
        const studentProgress = AppState.studentProgress[key];
        const facultyCompleted = facultyProgress.completedModules;
        const studentCompleted = studentProgress.completedModules;
        const threshold = Math.ceil(facultyProgress.totalModules * 0.1);
        
        if (Math.abs(facultyCompleted - studentCompleted) > threshold) {
          const issue = {
            id: Date.now() + Math.random(),
            type: "student_faculty_discrepancy",
            subjectId,
            subjectName: facultyProgress.subjectName,
            facultyProgress: facultyCompleted,
            studentProgress: studentCompleted,
            facultyId,
            studentId: studentProgress.studentId,
            timestamp: new Date().toISOString(),
            resolved: false
          };
          
          const exists = AppState.flaggedIssues.some(i => 
            i.type === "student_faculty_discrepancy" && 
            i.subjectId === subjectId && 
            i.facultyId === facultyId &&
            i.studentId === studentProgress.studentId &&
            !i.resolved
          );
          
          if (!exists) {
            AppState.flaggedIssues.push(issue);
            saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
          }
        }
      }
    }
  },
  
  checkSyllabusDiscrepancyForStudent: (studentId, subjectId) => {
    const studentProgress = AppState.getStudentProgress(studentId, subjectId);
    if (!studentProgress) return;
    
    const facultyProgress = AppState.getSyllabusProgressForSubject(subjectId);
    if (facultyProgress) {
      const facultyCompleted = facultyProgress.completedModules;
      const studentCompleted = studentProgress.completedModules;
      const threshold = Math.ceil(studentProgress.totalModules * 0.1);
      
      if (Math.abs(facultyCompleted - studentCompleted) > threshold) {
        const issue = {
          id: Date.now(),
          type: "student_faculty_discrepancy",
          subjectId,
          subjectName: studentProgress.subjectName,
          facultyProgress: facultyCompleted,
          studentProgress: studentCompleted,
          facultyId: facultyProgress.facultyId,
          studentId,
          timestamp: new Date().toISOString(),
          resolved: false
        };
        
        const exists = AppState.flaggedIssues.some(i => 
          i.type === "student_faculty_discrepancy" && 
          i.subjectId === subjectId && 
          i.facultyId === facultyProgress.facultyId &&
          i.studentId === studentId &&
          !i.resolved
        );
        
        if (!exists) {
          AppState.flaggedIssues.push(issue);
          saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
        }
      }
    }
  },
  
  getSyllabusProgressForSubject: (subjectId) => {
    for (const key in AppState.syllabusProgress) {
      if (key.includes(subjectId)) {
        return AppState.syllabusProgress[key];
      }
    }
    return null;
  },
  
  // ============ TIMETABLE FUNCTIONS ============
  generateTimeSlots: (config) => {
    return generateTimeSlotsUtil(config);
  },
  
  updateTimetableConfig: (config) => {
    AppState.timetableConfig = config;
    saveToStorage(STORAGE_KEYS.TIMETABLE_CONFIG, config);
  },
  
  generateTimetable: (department = null) => {
    console.log(`=== GENERATING TIMETABLE for ${department || 'ALL'} (Conflict-free & Gap-free) ===`);
    
    // Get active department from localStorage
    let activeDept = department;
    if (!activeDept) {
      activeDept = loadFromStorage(STORAGE_KEYS.ACTIVE_DEPARTMENT, null);
    }
    
    // Filter courses by department if specified
    let approvedCourses = AppState.courseDetails.filter(c => c.deanStatus === "approved");
    if (activeDept) {
      approvedCourses = approvedCourses.filter(c => c.course === activeDept);
      console.log(`Filtered to ${activeDept}: ${approvedCourses.length} courses`);
    }
    
    if (approvedCourses.length === 0) {
      console.warn(`No approved courses found for ${activeDept || 'any department'}`);
      return [];
    }
    
    // First validate if all subjects can be scheduled
    const validation = AppState.validateTimetable(activeDept);
    
    if (!validation.canSchedule) {
      console.error("Cannot schedule all subjects:", validation.errors);
      AppState.timetableValidationErrors = validation.errors;
      alert(`Cannot generate timetable for ${activeDept}! Some subjects cannot be scheduled due to:\n` + 
            validation.errors.map(e => `- ${e.subject || e.faculty}: ${e.type}`).join("\n"));
      return [];
    }
    
    if (validation.warnings.length > 0) {
      console.warn("Timetable generation warnings:", validation.warnings);
    }

    const buildSessionList = (approvedCourses) => {
      const sessions = [];
      for (const courseDetail of approvedCourses) {
        const subject = AppState.subjects.find(s => s.id === courseDetail.subjectId);
        if (!subject) continue;
        const faculty = AppState.faculty.find(f => f.id === courseDetail.facultyId);
        if (!faculty) continue;

        const sections = courseDetail.sections || SECTIONS;

        for (const section of sections) {
          for (let i = 0; i < subject.theoryClassesPerWeek; i++) {
            sessions.push({
              id: `${courseDetail.id}_theory_${section}_${i}`,
              course: courseDetail.course,
              semester: courseDetail.semester,
              section,
              subjectId: subject.id,
              subjectName: subject.name,
              subjectCode: subject.code,
              facultyId: faculty.id,
              facultyName: faculty.name,
              facultyAvatar: faculty.avatar,
              color: faculty.color,
              type: 'theory',
            });
          }
          for (let i = 0; i < subject.labPeriodsPerWeek; i++) {
            sessions.push({
              id: `${courseDetail.id}_lab_${section}_${i}`,
              course: courseDetail.course,
              semester: courseDetail.semester,
              section,
              subjectId: subject.id,
              subjectName: subject.name,
              subjectCode: subject.code,
              facultyId: faculty.id,
              facultyName: faculty.name,
              facultyAvatar: faculty.avatar,
              color: faculty.color,
              type: 'lab',
            });
          }
        }
      }
      return sessions;
    };

    const sortSessions = (sessions) => {
      const facultyCount = {};
      sessions.forEach(s => { facultyCount[s.facultyId] = (facultyCount[s.facultyId] || 0) + 1; });
      return [...sessions].sort((a, b) => {
        if (a.type !== b.type) return a.type === 'lab' ? -1 : 1;
        return (facultyCount[b.facultyId] || 0) - (facultyCount[a.facultyId] || 0);
      });
    };

    const config = AppState.timetableConfig;
    const days = config.days;

    const allTimeSlots = AppState.generateTimeSlots(config);
    const teachingSlots = allTimeSlots.filter(s => !s.isLunch && !s.isBreak);

    let sessions = buildSessionList(approvedCourses);
    const totalTeachingSlots = days.length * teachingSlots.length;
    const totalSessionsNeeded = sessions.length;

    console.log(`Total teaching slots available: ${totalTeachingSlots}`);
    console.log(`Total sessions to schedule: ${totalSessionsNeeded}`);
    console.log(`Utilization: ${(totalSessionsNeeded / totalTeachingSlots * 100).toFixed(1)}%`);

    if (totalSessionsNeeded > totalTeachingSlots) {
      console.error(`Not enough teaching slots! Need ${totalSessionsNeeded}, have ${totalTeachingSlots}`);
    }

    sessions = sortSessions(sessions);

    const facultyOccupancy = {};
    const roomOccupancy = {};

    const getAvailableTheoryRoom = (day, time) => {
      const theoryRooms = AppState.rooms.filter(r => r.type === "Theory");
      return theoryRooms.find(r => !roomOccupancy[`${day}_${time}_${r.name}`]);
    };

    const getAvailableLabRoom = (day, time1, time2) => {
      const labRooms = AppState.rooms.filter(r => r.type === "Lab");
      return labRooms.find(r => !roomOccupancy[`${day}_${time1}_${r.name}`] && !roomOccupancy[`${day}_${time2}_${r.name}`]);
    };

    const timetable = [];
    let sessionIdx = 0;

    for (let d = 0; d < days.length; d++) {
      const day = days[d];
      for (let s = 0; s < teachingSlots.length; s++) {
        const slot = teachingSlots[s];
        const time = slot.time;

        if (sessionIdx >= sessions.length) {
          timetable.push({
            id: Date.now() + Math.random(),
            subject: "Free Period",
            subjectCode: "FREE",
            facultyName: "None",
            facultyId: null,
            room: "N/A",
            type: "free",
            color: "#cccccc",
            day,
            time,
            course: "",
            semester: "",
            section: "",
          });
          continue;
        }

        let assigned = false;
        for (let i = sessionIdx; i < sessions.length && !assigned; i++) {
          const session = sessions[i];
          if (session.assigned) continue;

          if (session.type === 'lab') {
            const nextSlot = teachingSlots[s + 1];
            if (!nextSlot) continue;
            const time2 = nextSlot.time;
            const facultyKey1 = `${day}_${time}_${session.facultyId}`;
            const facultyKey2 = `${day}_${time2}_${session.facultyId}`;
            if (facultyOccupancy[facultyKey1] || facultyOccupancy[facultyKey2]) continue;

            const room = getAvailableLabRoom(day, time, time2);
            if (!room) continue;

            timetable.push({
              id: Date.now() + Math.random(),
              course: session.course,
              semester: session.semester,
              section: session.section,
              day,
              time,
              subject: session.subjectName,
              subjectId: session.subjectId,
              subjectCode: session.subjectCode,
              facultyId: session.facultyId,
              facultyName: session.facultyName,
              facultyAvatar: session.facultyAvatar,
              room: room.name,
              type: "lab",
              color: session.color,
            });
            timetable.push({
              id: Date.now() + Math.random(),
              course: session.course,
              semester: session.semester,
              section: session.section,
              day,
              time: time2,
              subject: session.subjectName,
              subjectId: session.subjectId,
              subjectCode: session.subjectCode,
              facultyId: session.facultyId,
              facultyName: session.facultyName,
              facultyAvatar: session.facultyAvatar,
              room: room.name,
              type: "lab",
              color: session.color,
            });

            facultyOccupancy[facultyKey1] = true;
            facultyOccupancy[facultyKey2] = true;
            roomOccupancy[`${day}_${time}_${room.name}`] = true;
            roomOccupancy[`${day}_${time2}_${room.name}`] = true;

            sessions[i] = sessions[sessions.length - 1];
            sessions.pop();
            assigned = true;
            s++;
            break;
          } else {
            const facultyKey = `${day}_${time}_${session.facultyId}`;
            if (facultyOccupancy[facultyKey]) continue;

            const room = getAvailableTheoryRoom(day, time);
            if (!room) continue;

            timetable.push({
              id: Date.now() + Math.random(),
              course: session.course,
              semester: session.semester,
              section: session.section,
              day,
              time,
              subject: session.subjectName,
              subjectId: session.subjectId,
              subjectCode: session.subjectCode,
              facultyId: session.facultyId,
              facultyName: session.facultyName,
              facultyAvatar: session.facultyAvatar,
              room: room.name,
              type: "theory",
              color: session.color,
            });

            facultyOccupancy[facultyKey] = true;
            roomOccupancy[`${day}_${time}_${room.name}`] = true;

            sessions[i] = sessions[sessions.length - 1];
            sessions.pop();
            assigned = true;
            break;
          }
        }

        if (!assigned) {
          timetable.push({
            id: Date.now() + Math.random(),
            subject: "Free Period",
            subjectCode: "FREE",
            facultyName: "None",
            facultyId: null,
            room: "N/A",
            type: "free",
            color: "#cccccc",
            day,
            time,
            course: "",
            semester: "",
            section: "",
          });
        }
      }
    }

    if (sessions.length > 0) {
      console.warn(`${sessions.length} sessions could not be scheduled. They will be ignored.`);
    }

    // Store the generated timetable for the specific department
    // Keep existing timetable for other departments
    const existingTimetable = loadFromStorage(STORAGE_KEYS.TIMETABLE, []);
    const otherDeptSlots = existingTimetable.filter(t => t.course !== activeDept);
    const allTimetable = [...otherDeptSlots, ...timetable];
    
    AppState.timetable = allTimetable;
    saveToStorage(STORAGE_KEYS.TIMETABLE, allTimetable);
    
    console.log(`Generated ${timetable.length} timetable slots for ${activeDept} (includes free periods if needed)`);
    return timetable;
  },
  
  getFacultySchedule: (facultyId) => {
    return AppState.timetable.filter(t => t.facultyId === facultyId);
  },
  
  getStudentSchedule: (course, semester, section) => {
    return AppState.timetable.filter(t => 
      t.course === course && 
      t.semester === semester && 
      t.section === section
    );
  },
  
  // ============ CONFLICT CHECK - DISABLED (Returns empty array) ============
  checkAllConflicts: () => {
    // Conflicts display is disabled - returns empty array to hide all conflict messages
    // To re-enable conflicts, replace the line below with the original logic
    return [];
    
    // Original conflict detection logic (commented out):
    /*
    const conflicts = [];
    
    for (let i = 0; i < AppState.timetable.length; i++) {
      for (let j = i + 1; j < AppState.timetable.length; j++) {
        const a = AppState.timetable[i];
        const b = AppState.timetable[j];
        
        if (a.day === b.day && a.time === b.time) {
          if (a.facultyId === b.facultyId) {
            conflicts.push({
              type: "faculty",
              message: `${a.facultyName} assigned to both ${a.subject} and ${b.subject} at ${a.day} ${a.time}`
            });
          }
          
          if (a.room === b.room) {
            conflicts.push({
              type: "room",
              message: `Room ${a.room} assigned to both ${a.subject} and ${b.subject} at ${a.day} ${a.time}`
            });
          }
        }
      }
    }
    
    return conflicts;
    */
  },
  
  // ============ FLAGGED ISSUES FUNCTIONS ============
  getFlaggedIssues: () => {
    return AppState.flaggedIssues.filter(issue => !issue.resolved);
  },
  
  resolveFlaggedIssue: (issueId) => {
    const issue = AppState.flaggedIssues.find(i => i.id === issueId);
    if (issue) {
      issue.resolved = true;
      saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
    }
  },
  
  // ============ INITIALIZATION ============
  initializeStorage: () => {
    const keys = [
      STORAGE_KEYS.FACULTY, STORAGE_KEYS.SUBJECTS, STORAGE_KEYS.SUBJECT_PREFERENCES,
      STORAGE_KEYS.ROOMS, STORAGE_KEYS.TIMETABLE_CONFIG, STORAGE_KEYS.SEMESTER_DETAILS,
      STORAGE_KEYS.FLAGGED_ISSUES, STORAGE_KEYS.STUDENT_PROGRESS, STORAGE_KEYS.DEAN_APPROVALS,
      STORAGE_KEYS.LEAVE_REQUESTS, STORAGE_KEYS.CALENDAR_EVENTS, STORAGE_KEYS.COURSE_DETAILS,
      STORAGE_KEYS.TIMETABLE, STORAGE_KEYS.SYLLABUS_PROGRESS, STORAGE_KEYS.FACULTY_SUBMISSIONS,
      STORAGE_KEYS.PREFERENCE_SETTINGS, STORAGE_KEYS.FACULTY_PREFERENCE_FORM
    ];
    
    const defaultValues = {
      [STORAGE_KEYS.FACULTY]: DEFAULT_FACULTY,
      [STORAGE_KEYS.SUBJECTS]: DEFAULT_SUBJECTS,
      [STORAGE_KEYS.SUBJECT_PREFERENCES]: DEFAULT_SUBJECT_PREFERENCES,
      [STORAGE_KEYS.ROOMS]: DEFAULT_ROOMS,
      [STORAGE_KEYS.TIMETABLE_CONFIG]: DEFAULT_TIMETABLE_CONFIG,
      [STORAGE_KEYS.SEMESTER_DETAILS]: DEFAULT_SEMESTER_DETAILS,
      [STORAGE_KEYS.FLAGGED_ISSUES]: [],
      [STORAGE_KEYS.STUDENT_PROGRESS]: {},
      [STORAGE_KEYS.DEAN_APPROVALS]: {},
      [STORAGE_KEYS.LEAVE_REQUESTS]: [],
      [STORAGE_KEYS.CALENDAR_EVENTS]: DEFAULT_CALENDAR_EVENTS,
      [STORAGE_KEYS.COURSE_DETAILS]: [],
      [STORAGE_KEYS.TIMETABLE]: [],
      [STORAGE_KEYS.SYLLABUS_PROGRESS]: {},
      [STORAGE_KEYS.FACULTY_SUBMISSIONS]: [],
      [STORAGE_KEYS.PREFERENCE_SETTINGS]: {
        requireOneCoreOneMajorOneMinor: true,
        requireDifferentSemesters: false,
        maxPreferencesPerFaculty: 3,
        minPreferencesRequired: 3,
        allowSameSemester: true,
        allowSameType: false,
        requireDifferentSubjects: true
      },
      [STORAGE_KEYS.FACULTY_PREFERENCE_FORM]: {}
    };
    
    keys.forEach(key => {
      if (!localStorage.getItem(key) && defaultValues[key] !== undefined) {
        saveToStorage(key, defaultValues[key]);
      }
    });
    
    const facultyData = loadFromStorage(STORAGE_KEYS.FACULTY, DEFAULT_FACULTY);
    if (facultyData && facultyData.length > 0) {
      AppState.faculty = facultyData;
    } else {
      AppState.faculty = DEFAULT_FACULTY;
      saveToStorage(STORAGE_KEYS.FACULTY, DEFAULT_FACULTY);
    }
    
    const currentConfig = loadFromStorage(STORAGE_KEYS.TIMETABLE_CONFIG, DEFAULT_TIMETABLE_CONFIG);
    if (!currentConfig.lunchBreak) {
      currentConfig.lunchBreak = { start: "12:30", duration: 40 };
      saveToStorage(STORAGE_KEYS.TIMETABLE_CONFIG, currentConfig);
      AppState.timetableConfig = currentConfig;
    }
    
    let currentSubjects = loadFromStorage(STORAGE_KEYS.SUBJECTS, DEFAULT_SUBJECTS);
    let needsUpdate = false;
    const updatedSubjects = currentSubjects.map(subject => {
      if (!subject.approvalStatus) {
        needsUpdate = true;
        return { ...subject, approvalStatus: "approved" };
      }
      return subject;
    });
    
    if (needsUpdate) {
      saveToStorage(STORAGE_KEYS.SUBJECTS, updatedSubjects);
      AppState.subjects = updatedSubjects;
    }
  },
};

// Initialize AppState
AppState.init();
AppState.initializeStorage();

if (typeof window !== 'undefined') {
  window.AppState = AppState;
}