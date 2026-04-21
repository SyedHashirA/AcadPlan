// import { useState, useCallback, createContext, useContext, useEffect } from "react";

// // ════════════════════════════════════════════════════════════════════════════
// //  AUTH CONTEXT WITH PERSISTENCE
// // ════════════════════════════════════════════════════════════════════════════
// const AuthContext = createContext(null);
// const useAuth = () => useContext(AuthContext);

// const MOCK_USERS = [
//   { id: 1, email: "dean@university.edu", password: "dean123", role: "admin", name: "Dr. Aravind Sharma", avatar: "AS", school: "Central Administration" },
//   { id: 2, email: "coordinator@university.edu", password: "coord123", role: "coordinator", name: "Prof. Meera Nair", avatar: "MN", school: "Timetable Office" },
//   { id: 3, email: "rahul@university.edu", password: "faculty123", role: "faculty", name: "Dr. Rahul Krishnan", avatar: "RK", school: "SoCSE", designation: "Assistant Professor", course: "BTech" },
//   { id: 4, email: "anita@university.edu", password: "faculty123", role: "faculty", name: "Dr. Anita Roy", avatar: "AR", school: "SoCSE", designation: "Assistant Professor", course: "BSc" },
//   { id: 5, email: "suresh@university.edu", password: "faculty123", role: "faculty", name: "Prof. Suresh Kumar", avatar: "SK", school: "SoCSE", designation: "Professor", course: "BCA" },
//   { id: 6, email: "priya@university.edu", password: "faculty123", role: "faculty", name: "Dr. Priya Iyer", avatar: "PI", school: "SoCSE", designation: "Associate Professor", course: "BTech" },
//   { id: 7, email: "vikram@university.edu", password: "faculty123", role: "faculty", name: "Dr. Vikram Singh", avatar: "VS", school: "SoCSE", designation: "Assistant Professor", course: "BSc" },
//   { id: 8, email: "deepa@university.edu", password: "faculty123", role: "faculty", name: "Prof. Deepa Nair", avatar: "DN", school: "SoCSE", designation: "Professor", course: "BCA" },
//   { id: 9, email: "student.btech@university.edu", password: "student123", role: "student", name: "Rohan Mehta", avatar: "RM", course: "BTech", semester: 1, section: "A" },
//   { id: 10, email: "student.bsc@university.edu", password: "student123", role: "student", name: "Priya Sharma", avatar: "PS", course: "BSc", semester: 1, section: "B" },
//   { id: 11, email: "student.bca@university.edu", password: "student123", role: "student", name: "Arjun Kumar", avatar: "AK", course: "BCA", semester: 2, section: "C" },
// ];

// function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     const saved = localStorage.getItem('acadplan_user');
//     return saved ? JSON.parse(saved) : null;
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const login = async (email, password) => {
//     setLoading(true); setError("");
//     await new Promise(r => setTimeout(r, 1100));
//     const found = MOCK_USERS.find(u => u.email === email && u.password === password);
//     if (found) {
//       setUser(found);
//       localStorage.setItem('acadplan_user', JSON.stringify(found));
//     } else {
//       setError("Invalid credentials. Please try again.");
//     }
//     setLoading(false);
//     return found || null;
//   };
  
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('acadplan_user');
//   };

//   return (
//     <AuthContext.Provider value={{ user, error, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// // ════════════════════════════════════════════════════════════════════════════
// //  ROUTER CONTEXT
// // ════════════════════════════════════════════════════════════════════════════
// const RouterContext = createContext(null);
// const useRouter = () => useContext(RouterContext);

// function RouterProvider({ children }) {
//   const [route, setRoute] = useState(() => {
//     const saved = localStorage.getItem('acadplan_route');
//     return saved || "login";
//   });
  
//   const navigate = (to) => {
//     setRoute(to);
//     localStorage.setItem('acadplan_route', to);
//   };
  
//   return (
//     <RouterContext.Provider value={{ route, navigate }}>
//       {children}
//     </RouterContext.Provider>
//   );
// }

// // ════════════════════════════════════════════════════════════════════════════
// //  LOCAL STORAGE MANAGER
// // ════════════════════════════════════════════════════════════════════════════
// const STORAGE_KEYS = {
//   FACULTY: 'acadplan_faculty',
//   SUBJECT_PREFERENCES: 'acadplan_subject_preferences',
//   SUBJECTS: 'acadplan_subjects',
//   COURSE_DETAILS: 'acadplan_course_details',
//   TIMETABLE: 'acadplan_timetable',
//   SYLLABUS_PROGRESS: 'acadplan_syllabus_progress',
//   SECTIONS: 'acadplan_sections',
//   ROOMS: 'acadplan_rooms',
//   TIMETABLE_CONFIG: 'acadplan_timetable_config',
//   SEMESTER_DETAILS: 'acadplan_semester_details',
//   FLAGGED_ISSUES: 'acadplan_flagged_issues',
//   STUDENT_PROGRESS: 'acadplan_student_progress',
//   DEAN_APPROVALS: 'acadplan_dean_approvals',
// };

// const loadFromStorage = (key, defaultValue) => {
//   try {
//     const stored = localStorage.getItem(key);
//     return stored ? JSON.parse(stored) : defaultValue;
//   } catch (error) {
//     console.error('Error loading from localStorage:', error);
//     return defaultValue;
//   }
// };

// const saveToStorage = (key, data) => {
//   try {
//     localStorage.setItem(key, JSON.stringify(data));
//   } catch (error) {
//     console.error('Error saving to localStorage:', error);
//   }
// };

// // ════════════════════════════════════════════════════════════════════════════
// //  BASE PROJECT INFORMATION
// // ════════════════════════════════════════════════════════════════════════════
// const COURSES = ["BTech", "BSc", "BCA"];
// const SEMESTERS = [1, 2];
// const SECTIONS = ["A", "B", "C"];

// // ════════════════════════════════════════════════════════════════════════════
// //  FACULTY DATA
// // ════════════════════════════════════════════════════════════════════════════
// const WORKLOAD_LIMITS = {
//   "Assistant Professor": 14,
//   "Associate Professor": 12,
//   "Professor": 10,
// };

// const DEFAULT_FACULTY = [
//   { 
//     id: 3, 
//     facultyId: "FAC001",
//     name: "Dr. Rahul Krishnan", 
//     avatar: "RK", 
//     dept: "CSE", 
//     designation: "Assistant Professor", 
//     specialization: "Data Structures, Algorithms, DBMS",
//     course: "BTech",
//     maxHours: 14,
//     assignedHours: 0,
//     remainingHours: 14,
//     preferences: [],
//     color: "#4361ee" 
//   },
//   { 
//     id: 4, 
//     facultyId: "FAC002",
//     name: "Dr. Anita Roy", 
//     avatar: "AR", 
//     dept: "CSE", 
//     designation: "Assistant Professor", 
//     specialization: "Operating Systems, Computer Networks",
//     course: "BSc",
//     maxHours: 14,
//     assignedHours: 0,
//     remainingHours: 14,
//     preferences: [],
//     color: "#06d6a0" 
//   },
//   { 
//     id: 5, 
//     facultyId: "FAC003",
//     name: "Prof. Suresh Kumar", 
//     avatar: "SK", 
//     dept: "CSE", 
//     designation: "Professor", 
//     specialization: "Mathematics, Discrete Structures",
//     course: "BCA",
//     maxHours: 10,
//     assignedHours: 0,
//     remainingHours: 10,
//     preferences: [],
//     color: "#ffb703" 
//   },
//   { 
//     id: 6, 
//     facultyId: "FAC004",
//     name: "Dr. Priya Iyer", 
//     avatar: "PI", 
//     dept: "CSE", 
//     designation: "Associate Professor", 
//     specialization: "Machine Learning, Python, AI",
//     course: "BTech",
//     maxHours: 12,
//     assignedHours: 0,
//     remainingHours: 12,
//     preferences: [],
//     color: "#9d4edd" 
//   },
//   { 
//     id: 7, 
//     facultyId: "FAC005",
//     name: "Dr. Vikram Singh", 
//     avatar: "VS", 
//     dept: "CSE", 
//     designation: "Assistant Professor", 
//     specialization: "Web Development, JavaScript, React",
//     course: "BSc",
//     maxHours: 14,
//     assignedHours: 0,
//     remainingHours: 14,
//     preferences: [],
//     color: "#e3646b" 
//   },
//   { 
//     id: 8, 
//     facultyId: "FAC006",
//     name: "Prof. Deepa Nair", 
//     avatar: "DN", 
//     dept: "CSE", 
//     designation: "Professor", 
//     specialization: "Software Engineering, Project Management",
//     course: "BCA",
//     maxHours: 10,
//     assignedHours: 0,
//     remainingHours: 10,
//     preferences: [],
//     color: "#6b705c" 
//   },
// ];

// // ════════════════════════════════════════════════════════════════════════════
// //  SUBJECT DATA
// // ════════════════════════════════════════════════════════════════════════════
// const DEFAULT_SUBJECTS = [
//   // BTech Semester 1 Subjects
//   { 
//     id: "BT101", 
//     code: "BT101",
//     name: "Data Structures", 
//     dept: "CSE", 
//     course: "BTech",
//     semester: 1,
//     credits: 4, 
//     modules: 5,
//     type: "Both",
//     theoryCredits: 3,
//     labCredits: 1,
//     theoryClassesPerWeek: 3,
//     labPeriodsPerWeek: 2,
//     totalWeeklyClasses: 5,
//   },
//   { 
//     id: "BT102", 
//     code: "BT102",
//     name: "Algorithms", 
//     dept: "CSE", 
//     course: "BTech",
//     semester: 1,
//     credits: 4, 
//     modules: 5,
//     type: "Theory",
//     theoryCredits: 4,
//     labCredits: 0,
//     theoryClassesPerWeek: 4,
//     labPeriodsPerWeek: 0,
//     totalWeeklyClasses: 4,
//   },
//   { 
//     id: "BT103", 
//     code: "BT103",
//     name: "DBMS", 
//     dept: "CSE", 
//     course: "BTech",
//     semester: 1,
//     credits: 3, 
//     modules: 4,
//     type: "Both",
//     theoryCredits: 2,
//     labCredits: 1,
//     theoryClassesPerWeek: 2,
//     labPeriodsPerWeek: 2,
//     totalWeeklyClasses: 4,
//   },
  
//   // BTech Semester 2 Subjects
//   { 
//     id: "BT201", 
//     code: "BT201",
//     name: "Operating Systems", 
//     dept: "CSE", 
//     course: "BTech",
//     semester: 2,
//     credits: 3, 
//     modules: 4,
//     type: "Theory",
//     theoryCredits: 3,
//     labCredits: 0,
//     theoryClassesPerWeek: 3,
//     labPeriodsPerWeek: 0,
//     totalWeeklyClasses: 3,
//   },
//   { 
//     id: "BT202", 
//     code: "BT202",
//     name: "Computer Networks", 
//     dept: "CSE", 
//     course: "BTech",
//     semester: 2,
//     credits: 3, 
//     modules: 4,
//     type: "Both",
//     theoryCredits: 2,
//     labCredits: 1,
//     theoryClassesPerWeek: 2,
//     labPeriodsPerWeek: 2,
//     totalWeeklyClasses: 4,
//   },
//   { 
//     id: "BT203", 
//     code: "BT203",
//     name: "Machine Learning", 
//     dept: "CSE", 
//     course: "BTech",
//     semester: 2,
//     credits: 4, 
//     modules: 5,
//     type: "Both",
//     theoryCredits: 3,
//     labCredits: 1,
//     theoryClassesPerWeek: 3,
//     labPeriodsPerWeek: 2,
//     totalWeeklyClasses: 5,
//   },
  
//   // BSc Semester 1 Subjects
//   { 
//     id: "BS101", 
//     code: "BS101",
//     name: "Mathematics I", 
//     dept: "CSE", 
//     course: "BSc",
//     semester: 1,
//     credits: 3, 
//     modules: 4,
//     type: "Theory",
//     theoryCredits: 3,
//     labCredits: 0,
//     theoryClassesPerWeek: 3,
//     labPeriodsPerWeek: 0,
//     totalWeeklyClasses: 3,
//   },
//   { 
//     id: "BS102", 
//     code: "BS102",
//     name: "Programming Fundamentals", 
//     dept: "CSE", 
//     course: "BSc",
//     semester: 1,
//     credits: 4, 
//     modules: 5,
//     type: "Both",
//     theoryCredits: 3,
//     labCredits: 1,
//     theoryClassesPerWeek: 3,
//     labPeriodsPerWeek: 2,
//     totalWeeklyClasses: 5,
//   },
//   { 
//     id: "BS103", 
//     code: "BS103",
//     name: "Discrete Mathematics", 
//     dept: "CSE", 
//     course: "BSc",
//     semester: 1,
//     credits: 3, 
//     modules: 4,
//     type: "Theory",
//     theoryCredits: 3,
//     labCredits: 0,
//     theoryClassesPerWeek: 3,
//     labPeriodsPerWeek: 0,
//     totalWeeklyClasses: 3,
//   },
  
//   // BSc Semester 2 Subjects
//   { 
//     id: "BS201", 
//     code: "BS201",
//     name: "Data Analysis", 
//     dept: "CSE", 
//     course: "BSc",
//     semester: 2,
//     credits: 3, 
//     modules: 4,
//     type: "Both",
//     theoryCredits: 2,
//     labCredits: 1,
//     theoryClassesPerWeek: 2,
//     labPeriodsPerWeek: 2,
//     totalWeeklyClasses: 4,
//   },
//   { 
//     id: "BS202", 
//     code: "BS202",
//     name: "Web Technologies", 
//     dept: "CSE", 
//     course: "BSc",
//     semester: 2,
//     credits: 4, 
//     modules: 5,
//     type: "Both",
//     theoryCredits: 3,
//     labCredits: 1,
//     theoryClassesPerWeek: 3,
//     labPeriodsPerWeek: 2,
//     totalWeeklyClasses: 5,
//   },
//   { 
//     id: "BS203", 
//     code: "BS203",
//     name: "Database Systems", 
//     dept: "CSE", 
//     course: "BSc",
//     semester: 2,
//     credits: 3, 
//     modules: 4,
//     type: "Both",
//     theoryCredits: 2,
//     labCredits: 1,
//     theoryClassesPerWeek: 2,
//     labPeriodsPerWeek: 2,
//     totalWeeklyClasses: 4,
//   },
  
//   // BCA Semester 1 Subjects
//   { 
//     id: "BC101", 
//     code: "BC101",
//     name: "Introduction to Programming", 
//     dept: "CSE", 
//     course: "BCA",
//     semester: 1,
//     credits: 3, 
//     modules: 4,
//     type: "Both",
//     theoryCredits: 2,
//     labCredits: 1,
//     theoryClassesPerWeek: 2,
//     labPeriodsPerWeek: 2,
//     totalWeeklyClasses: 4,
//   },
//   { 
//     id: "BC102", 
//     code: "BC102",
//     name: "Computer Fundamentals", 
//     dept: "CSE", 
//     course: "BCA",
//     semester: 1,
//     credits: 2, 
//     modules: 3,
//     type: "Theory",
//     theoryCredits: 2,
//     labCredits: 0,
//     theoryClassesPerWeek: 2,
//     labPeriodsPerWeek: 0,
//     totalWeeklyClasses: 2,
//   },
//   { 
//     id: "BC103", 
//     code: "BC103",
//     name: "Mathematics for Computing", 
//     dept: "CSE", 
//     course: "BCA",
//     semester: 1,
//     credits: 3, 
//     modules: 4,
//     type: "Theory",
//     theoryCredits: 3,
//     labCredits: 0,
//     theoryClassesPerWeek: 3,
//     labPeriodsPerWeek: 0,
//     totalWeeklyClasses: 3,
//   },
  
//   // BCA Semester 2 Subjects
//   { 
//     id: "BC201", 
//     code: "BC201",
//     name: "Object Oriented Programming", 
//     dept: "CSE", 
//     course: "BCA",
//     semester: 2,
//     credits: 4, 
//     modules: 5,
//     type: "Both",
//     theoryCredits: 3,
//     labCredits: 1,
//     theoryClassesPerWeek: 3,
//     labPeriodsPerWeek: 2,
//     totalWeeklyClasses: 5,
//   },
//   { 
//     id: "BC202", 
//     code: "BC202",
//     name: "Data Structures using C++", 
//     dept: "CSE", 
//     course: "BCA",
//     semester: 2,
//     credits: 4, 
//     modules: 5,
//     type: "Both",
//     theoryCredits: 3,
//     labCredits: 1,
//     theoryClassesPerWeek: 3,
//     labPeriodsPerWeek: 2,
//     totalWeeklyClasses: 5,
//   },
//   { 
//     id: "BC203", 
//     code: "BC203",
//     name: "Software Engineering", 
//     dept: "CSE", 
//     course: "BCA",
//     semester: 2,
//     credits: 3, 
//     modules: 4,
//     type: "Theory",
//     theoryCredits: 3,
//     labCredits: 0,
//     theoryClassesPerWeek: 3,
//     labPeriodsPerWeek: 0,
//     totalWeeklyClasses: 3,
//   },
// ];

// // ════════════════════════════════════════════════════════════════════════════
// //  SUBJECT PREFERENCES
// // ════════════════════════════════════════════════════════════════════════════
// const DEFAULT_SUBJECT_PREFERENCES = [
//   { id: 1, facultyId: 3, facultyName: "Dr. Rahul Krishnan", avatar: "RK", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 2, facultyId: 4, facultyName: "Dr. Anita Roy", avatar: "AR", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 3, facultyId: 5, facultyName: "Prof. Suresh Kumar", avatar: "SK", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 4, facultyId: 6, facultyName: "Dr. Priya Iyer", avatar: "PI", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 5, facultyId: 7, facultyName: "Dr. Vikram Singh", avatar: "VS", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 6, facultyId: 8, facultyName: "Prof. Deepa Nair", avatar: "DN", status: "pending", submitted: false, feedback: "", preferences: [] },
// ];

// // ════════════════════════════════════════════════════════════════════════════
// //  SEMESTER DETAILS
// // ════════════════════════════════════════════════════════════════════════════
// const DEFAULT_SEMESTER_DETAILS = {
//   BTech: {
//     1: {
//       subjects: ["BT101", "BT102", "BT103"],
//       defaultFaculty: {
//         "BT101": 3,
//         "BT102": 6,
//         "BT103": 3,
//       }
//     },
//     2: {
//       subjects: ["BT201", "BT202", "BT203"],
//       defaultFaculty: {
//         "BT201": 6,
//         "BT202": 3,
//         "BT203": 6,
//       }
//     }
//   },
//   BSc: {
//     1: {
//       subjects: ["BS101", "BS102", "BS103"],
//       defaultFaculty: {
//         "BS101": 5,
//         "BS102": 4,
//         "BS103": 5,
//       }
//     },
//     2: {
//       subjects: ["BS201", "BS202", "BS203"],
//       defaultFaculty: {
//         "BS201": 7,
//         "BS202": 7,
//         "BS203": 4,
//       }
//     }
//   },
//   BCA: {
//     1: {
//       subjects: ["BC101", "BC102", "BC103"],
//       defaultFaculty: {
//         "BC101": 8,
//         "BC102": 5,
//         "BC103": 8,
//       }
//     },
//     2: {
//       subjects: ["BC201", "BC202", "BC203"],
//       defaultFaculty: {
//         "BC201": 8,
//         "BC202": 7,
//         "BC203": 8,
//       }
//     }
//   }
// };

// // ════════════════════════════════════════════════════════════════════════════
// //  Infrastructure Data
// // ════════════════════════════════════════════════════════════════════════════
// const DEFAULT_ROOMS = [
//   { id: "R001", name: "Hall 201", type: "Theory", capacity: 60 },
//   { id: "R002", name: "Hall 202", type: "Theory", capacity: 60 },
//   { id: "R003", name: "Hall 203", type: "Theory", capacity: 60 },
//   { id: "R004", name: "Hall 301", type: "Theory", capacity: 50 },
//   { id: "R005", name: "Hall 302", type: "Theory", capacity: 50 },
//   { id: "R006", name: "Hall 303", type: "Theory", capacity: 50 },
//   { id: "R007", name: "Lab 1", type: "Lab", capacity: 30 },
//   { id: "R008", name: "Lab 2", type: "Lab", capacity: 30 },
//   { id: "R009", name: "Lab 3", type: "Lab", capacity: 30 },
//   { id: "R010", name: "Lab 4", type: "Lab", capacity: 30 },
// ];

// // ════════════════════════════════════════════════════════════════════════════
// //  TIMETABLE CONFIGURATION (9:10 AM to 3:50 PM)
// // ════════════════════════════════════════════════════════════════════════════
// const DEFAULT_TIMETABLE_CONFIG = {
//   startTime: "09:10",
//   endTime: "15:50",
//   classDuration: 50,
//   breakDuration: 10,
//   lunchBreak: {
//     start: "12:30",
//     duration: 40,
//   },
//   days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
// };

// const generateTimeSlots = (config) => {
//   const slots = [];
//   const start = new Date(`1970-01-01T${config.startTime}:00`);
//   const end = new Date(`1970-01-01T${config.endTime}:00`);
  
//   let current = new Date(start);
//   let periodNumber = 1;
  
//   while (current < end) {
//     const timeStr = current.toTimeString().substring(0, 5);
//     const endTime = new Date(current.getTime() + config.classDuration * 60000);
//     const endTimeStr = endTime.toTimeString().substring(0, 5);
    
//     // Check if this is lunch break time
//     const lunchStart = new Date(`1970-01-01T${config.lunchBreak.start}:00`);
//     const lunchEnd = new Date(lunchStart.getTime() + config.lunchBreak.duration * 60000);
    
//     if (current >= lunchStart && current < lunchEnd) {
//       slots.push({
//         time: timeStr,
//         endTime: endTimeStr,
//         period: "LUNCH",
//         isLunch: true,
//         label: "LUNCH"
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

// // ════════════════════════════════════════════════════════════════════════════
// //  Core Algorithm Functions
// // ════════════════════════════════════════════════════════════════════════════

// const getPreferenceScore = (preferenceLevel) => {
//   const scores = { 1: 5, 2: 4, 3: 3 };
//   return scores[preferenceLevel] || 0;
// };

// const calculateFacultyScore = (faculty, subject, preferenceLevel) => {
//   const preferenceWeight = getPreferenceScore(preferenceLevel) * 0.5;
//   const specializationMatch = faculty.specialization.toLowerCase().includes(subject.name.toLowerCase()) ? 0.3 : 0;
//   const remainingHoursRatio = (faculty.remainingHours / faculty.maxHours) * 0.2;
  
//   return {
//     total: preferenceWeight + specializationMatch + remainingHoursRatio,
//     preferenceWeight,
//     specializationMatch,
//     remainingHoursRatio
//   };
// };

// const canAssignSubject = (faculty, subject) => {
//   return faculty.remainingHours >= subject.totalWeeklyClasses;
// };

// const calculateWeeklyClasses = (subject) => {
//   return {
//     theoryClasses: subject.theoryClassesPerWeek,
//     labPeriods: subject.labPeriodsPerWeek,
//     total: subject.totalWeeklyClasses
//   };
// };

// const calculateTotalClasses = (subject, sectionsCount = 3) => {
//   return {
//     theoryTotal: subject.theoryClassesPerWeek * sectionsCount,
//     labTotal: subject.labPeriodsPerWeek * sectionsCount,
//     grandTotal: subject.totalWeeklyClasses * sectionsCount
//   };
// };

// const checkConflicts = (timetable, newSlot) => {
//   const conflicts = [];
  
//   const facultyConflict = timetable.find(slot => 
//     slot.day === newSlot.day && 
//     slot.time === newSlot.time && 
//     slot.facultyId === newSlot.facultyId
//   );
//   if (facultyConflict) {
//     conflicts.push({
//       type: "faculty",
//       message: `Faculty already assigned to ${facultyConflict.subject} in section ${facultyConflict.section}`
//     });
//   }
  
//   const roomConflict = timetable.find(slot => 
//     slot.day === newSlot.day && 
//     slot.time === newSlot.time && 
//     slot.room === newSlot.room
//   );
//   if (roomConflict) {
//     conflicts.push({
//       type: "room",
//       message: `Room already used for ${roomConflict.subject} in section ${roomConflict.section}`
//     });
//   }
  
//   return conflicts;
// };

// const calculateIdleTime = (facultySchedule, timeSlots) => {
//   let idleTime = 0;
//   const validTimeSlots = timeSlots.filter(s => !s.isLunch).map(s => s.time);
  
//   const sortedSchedule = [...facultySchedule].sort((a, b) => {
//     const timeA = validTimeSlots.indexOf(a.time);
//     const timeB = validTimeSlots.indexOf(b.time);
//     return timeA - timeB;
//   });
  
//   for (let i = 1; i < sortedSchedule.length; i++) {
//     const prevTime = validTimeSlots.indexOf(sortedSchedule[i-1].time);
//     const currTime = validTimeSlots.indexOf(sortedSchedule[i].time);
//     if (currTime - prevTime > 1) {
//       idleTime += (currTime - prevTime - 1);
//     }
//   }
  
//   return idleTime;
// };

// const calculateSyllabusProgress = (completedModules, totalModules) => {
//   return (completedModules / totalModules) * 100;
// };

// const generateTimetable = (approvedCourses, facultyList, rooms, config) => {
//   const timetable = [];
//   let id = 1;
//   const currentTimeSlots = generateTimeSlots(config);
//   const validTimeSlots = currentTimeSlots.filter(s => !s.isLunch).map(s => s.time);
  
//   // Create a map to track faculty assignments per time slot
//   const facultyScheduleMap = {};
//   const roomScheduleMap = {};
  
//   COURSES.forEach(course => {
//     SEMESTERS.forEach(semester => {
//       SECTIONS.forEach(section => {
//         const sectionCourses = approvedCourses.filter(c => 
//           c.course === course && 
//           c.semester === semester &&
//           c.deanStatus === "approved"
//         );
        
//         sectionCourses.forEach(courseDetail => {
//           const subject = DEFAULT_SUBJECTS.find(s => s.id === courseDetail.subjectId);
//           if (!subject) return;
          
//           const faculty = facultyList.find(f => f.id === courseDetail.facultyId);
//           if (!faculty) return;
          
//           // Allocate theory classes
//           for (let i = 0; i < subject.theoryClassesPerWeek; i++) {
//             let allocated = false;
//             let attempts = 0;
            
//             while (!allocated && attempts < 500) {
//               const day = config.days[Math.floor(Math.random() * config.days.length)];
//               const timeSlot = Math.floor(Math.random() * validTimeSlots.length);
//               const time = validTimeSlots[timeSlot];
              
//               // Check if faculty is available at this time
//               const facultyKey = `${day}_${time}_${faculty.id}`;
//               if (facultyScheduleMap[facultyKey]) {
//                 attempts++;
//                 continue;
//               }
              
//               // Find available theory room
//               let availableRoom = null;
//               const theoryRooms = rooms.filter(r => r.type === "Theory");
              
//               for (const room of theoryRooms) {
//                 const roomKey = `${day}_${time}_${room.name}`;
//                 if (!roomScheduleMap[roomKey]) {
//                   availableRoom = room;
//                   break;
//                 }
//               }
              
//               if (!availableRoom) {
//                 attempts++;
//                 continue;
//               }
              
//               const newSlot = {
//                 id: id++,
//                 course,
//                 semester,
//                 section,
//                 day,
//                 time,
//                 subject: subject.name,
//                 subjectId: subject.id,
//                 subjectCode: subject.code,
//                 facultyId: faculty.id,
//                 facultyName: faculty.name,
//                 facultyAvatar: faculty.avatar,
//                 room: availableRoom.name,
//                 type: "theory",
//                 color: faculty.color
//               };
              
//               timetable.push(newSlot);
//               facultyScheduleMap[`${day}_${time}_${faculty.id}`] = true;
//               roomScheduleMap[`${day}_${time}_${availableRoom.name}`] = true;
//               allocated = true;
//             }
//           }
          
//           // Allocate lab periods (must be consecutive)
//           if (subject.labPeriodsPerWeek > 0) {
//             const labPeriods = subject.labPeriodsPerWeek;
            
//             for (let i = 0; i < labPeriods; i += 2) {
//               let allocated = false;
//               let attempts = 0;
              
//               while (!allocated && attempts < 500) {
//                 const day = config.days[Math.floor(Math.random() * config.days.length)];
//                 const timeSlot = Math.floor(Math.random() * (validTimeSlots.length - 1));
//                 const time1 = validTimeSlots[timeSlot];
//                 const time2 = validTimeSlots[timeSlot + 1];
                
//                 // Check if faculty is available at both times
//                 const facultyKey1 = `${day}_${time1}_${faculty.id}`;
//                 const facultyKey2 = `${day}_${time2}_${faculty.id}`;
                
//                 if (facultyScheduleMap[facultyKey1] || facultyScheduleMap[facultyKey2]) {
//                   attempts++;
//                   continue;
//                 }
                
//                 // Find available lab room for both slots
//                 let availableRoom = null;
//                 const labRooms = rooms.filter(r => r.type === "Lab");
                
//                 for (const room of labRooms) {
//                   const roomKey1 = `${day}_${time1}_${room.name}`;
//                   const roomKey2 = `${day}_${time2}_${room.name}`;
                  
//                   if (!roomScheduleMap[roomKey1] && !roomScheduleMap[roomKey2]) {
//                     availableRoom = room;
//                     break;
//                   }
//                 }
                
//                 if (!availableRoom) {
//                   attempts++;
//                   continue;
//                 }
                
//                 const newSlot1 = {
//                   id: id++,
//                   course,
//                   semester,
//                   section,
//                   day,
//                   time: time1,
//                   subject: `${subject.name} Lab`,
//                   subjectId: subject.id,
//                   subjectCode: subject.code,
//                   facultyId: faculty.id,
//                   facultyName: faculty.name,
//                   facultyAvatar: faculty.avatar,
//                   room: availableRoom.name,
//                   type: "lab",
//                   color: faculty.color
//                 };
                
//                 const newSlot2 = {
//                   ...newSlot1,
//                   id: id++,
//                   time: time2
//                 };
                
//                 timetable.push(newSlot1, newSlot2);
//                 facultyScheduleMap[`${day}_${time1}_${faculty.id}`] = true;
//                 facultyScheduleMap[`${day}_${time2}_${faculty.id}`] = true;
//                 roomScheduleMap[`${day}_${time1}_${availableRoom.name}`] = true;
//                 roomScheduleMap[`${day}_${time2}_${availableRoom.name}`] = true;
//                 allocated = true;
//               }
//             }
//           }
//         });
//       });
//     });
//   });
  
//   return timetable;
// };

// // ════════════════════════════════════════════════════════════════════════════
// //  Global Application State
// // ════════════════════════════════════════════════════════════════════════════
// const AppState = {
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
  
//   getFacultyById: (id) => AppState.faculty.find(f => f.id === id),
  
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
  
//   getPreferenceByFacultyId: (facultyId) => AppState.subjectPreferences.find(p => p.facultyId === facultyId),
  
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
  
//   submitCourseDetails: (facultyId, courses) => {
//     // Add dean approval status to each course
//     const coursesWithDeanStatus = courses.map(course => ({
//       ...course,
//       deanStatus: "pending",
//       coordinatorStatus: "pending",
//       deanFeedback: "",
//       coordinatorFeedback: ""
//     }));
    
//     AppState.courseDetails = AppState.courseDetails.filter(c => c.facultyId !== facultyId);
//     AppState.courseDetails.push(...coursesWithDeanStatus);
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
//         };
//       }
//     });
//     saveToStorage(STORAGE_KEYS.SYLLABUS_PROGRESS, AppState.syllabusProgress);
//   },
  
//   // Coordinator approves courses (then they go to dean)
//   updateCourseDetailCoordinatorStatus: (courseId, status, feedback = "") => {
//     const course = AppState.courseDetails.find(c => c.id === courseId);
//     if (course) {
//       course.coordinatorStatus = status;
//       course.coordinatorFeedback = feedback;
//       saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
//     }
//   },
  
//   // Dean gives final approval
//   updateCourseDetailDeanStatus: (courseId, status, feedback = "") => {
//     const course = AppState.courseDetails.find(c => c.id === courseId);
//     if (course) {
//       course.deanStatus = status;
//       course.deanFeedback = feedback;
//       saveToStorage(STORAGE_KEYS.COURSE_DETAILS, AppState.courseDetails);
      
//       // If approved by dean, raise an issue if there's a progress discrepancy
//       if (status === "approved") {
//         AppState.checkSyllabusDiscrepancy(course.facultyId, course.subjectId);
//       }
//     }
//   },
  
//   // Check for syllabus progress discrepancies
//   checkSyllabusDiscrepancy: (facultyId, subjectId) => {
//     const facultyProgress = AppState.getSyllabusProgress(facultyId, subjectId);
//     if (!facultyProgress) return;
    
//     // Check all students for this subject
//     for (const key in AppState.studentProgress) {
//       if (key.includes(subjectId)) {
//         const studentProgress = AppState.studentProgress[key];
//         const facultyCompleted = facultyProgress.completedModules;
//         const studentCompleted = studentProgress.completedModules;
//         const threshold = Math.ceil(facultyProgress.totalModules * 0.1); // 10% threshold
        
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
          
//           // Check if similar issue already exists
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
      
//       // Check for discrepancy with student progress
//       AppState.checkSyllabusDiscrepancy(facultyId, subjectId);
//     }
//   },
  
//   // Student syllabus tracking
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
    
//     // Check if this creates a discrepancy with faculty progress
//     const facultyProgress = AppState.getSyllabusProgressForSubject(subjectId);
//     if (facultyProgress) {
//       const facultyCompleted = facultyProgress.completedModules;
//       const studentCompleted = progress.completedModules;
//       const threshold = Math.ceil(progress.totalModules * 0.1); // 10% threshold
      
//       if (Math.abs(facultyCompleted - studentCompleted) > threshold) {
//         const issue = {
//           id: Date.now(),
//           type: "student_faculty_discrepancy",
//           subjectId,
//           subjectName: progress.subjectName,
//           facultyProgress: facultyCompleted,
//           studentProgress: studentCompleted,
//           facultyId: facultyProgress.facultyId,
//           studentId,
//           timestamp: new Date().toISOString(),
//           resolved: false
//         };
        
//         // Check if similar issue already exists
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
  
//   getStudentProgress: (studentId, subjectId) => {
//     const key = `${studentId}_${subjectId}`;
//     return AppState.studentProgress[key] || null;
//   },
  
//   getSyllabusProgressForSubject: (subjectId) => {
//     // Find any faculty progress for this subject
//     for (const key in AppState.syllabusProgress) {
//       if (key.includes(subjectId)) {
//         return AppState.syllabusProgress[key];
//       }
//     }
//     return null;
//   },
  
//   getSyllabusProgress: (facultyId, subjectId) => {
//     const progressKey = `${facultyId}_${subjectId}`;
//     return AppState.syllabusProgress[progressKey] || null;
//   },
  
//   updateTimetableConfig: (config) => {
//     AppState.timetableConfig = config;
//     saveToStorage(STORAGE_KEYS.TIMETABLE_CONFIG, config);
//   },
  
//   generateTimetable: () => {
//     // Only include courses approved by dean
//     const approvedCourses = AppState.courseDetails.filter(c => c.deanStatus === "approved");
//     const config = AppState.timetableConfig;
    
//     const timetable = generateTimetable(
//       approvedCourses, 
//       AppState.faculty, 
//       AppState.rooms,
//       config
//     );
    
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
//               message: `${a.facultyName} assigned to both ${a.subject} (${a.course} Sem ${a.semester} Sec ${a.section}) and ${b.subject} (${b.course} Sem ${b.semester} Sec ${b.section}) at ${a.day} ${a.time}`
//             });
//           }
          
//           if (a.room === b.room) {
//             conflicts.push({
//               type: "room",
//               message: `Room ${a.room} assigned to both ${a.subject} (${a.course} Sem ${a.semester} Sec ${a.section}) and ${b.subject} (${b.course} Sem ${b.semester} Sec ${b.section}) at ${a.day} ${a.time}`
//             });
//           }
//         }
//       }
//     }
    
//     return conflicts;
//   },
  
//   resetPreferenceForm: (facultyId) => {
//     const pref = AppState.subjectPreferences.find(p => p.facultyId === facultyId);
//     if (pref) {
//       pref.submitted = false;
//       pref.status = "pending";
//       pref.feedback = "";
//       pref.preferences = [];
//       saveToStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, AppState.subjectPreferences);
//     }
//   },
  
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
  
//   getPendingDeanApprovals: () => {
//     return AppState.courseDetails.filter(c => 
//       c.coordinatorStatus === "approved" && 
//       c.deanStatus === "pending"
//     );
//   },
  
//   getPendingCoordinatorApprovals: () => {
//     return AppState.courseDetails.filter(c => 
//       c.coordinatorStatus === "pending"
//     );
//   },
  
//   initializeStorage: () => {
//     if (!localStorage.getItem(STORAGE_KEYS.FACULTY)) {
//       saveToStorage(STORAGE_KEYS.FACULTY, DEFAULT_FACULTY);
//     }
//     if (!localStorage.getItem(STORAGE_KEYS.SUBJECTS)) {
//       saveToStorage(STORAGE_KEYS.SUBJECTS, DEFAULT_SUBJECTS);
//     }
//     if (!localStorage.getItem(STORAGE_KEYS.SUBJECT_PREFERENCES)) {
//       saveToStorage(STORAGE_KEYS.SUBJECT_PREFERENCES, DEFAULT_SUBJECT_PREFERENCES);
//     }
//     if (!localStorage.getItem(STORAGE_KEYS.ROOMS)) {
//       saveToStorage(STORAGE_KEYS.ROOMS, DEFAULT_ROOMS);
//     }
//     if (!localStorage.getItem(STORAGE_KEYS.TIMETABLE_CONFIG)) {
//       saveToStorage(STORAGE_KEYS.TIMETABLE_CONFIG, DEFAULT_TIMETABLE_CONFIG);
//     }
//     if (!localStorage.getItem(STORAGE_KEYS.SEMESTER_DETAILS)) {
//       saveToStorage(STORAGE_KEYS.SEMESTER_DETAILS, DEFAULT_SEMESTER_DETAILS);
//     }
//     if (!localStorage.getItem(STORAGE_KEYS.FLAGGED_ISSUES)) {
//       saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, []);
//     }
//     if (!localStorage.getItem(STORAGE_KEYS.STUDENT_PROGRESS)) {
//       saveToStorage(STORAGE_KEYS.STUDENT_PROGRESS, {});
//     }
//     if (!localStorage.getItem(STORAGE_KEYS.DEAN_APPROVALS)) {
//       saveToStorage(STORAGE_KEYS.DEAN_APPROVALS, {});
//     }
//   },
// };

// AppState.initializeStorage();

// // ════════════════════════════════════════════════════════════════════════════
// //  PROFESSIONAL WHITE THEME DESIGN SYSTEM
// // ════════════════════════════════════════════════════════════════════════════
// const C = {
//   bg: "#f8fafc",
//   surface: "#ffffff",
//   card: "#ffffff",
//   cardHover: "#f1f5f9",
//   border: "#e2e8f0",
//   borderHover: "#cbd5e1",
//   nav: "#ffffff",
//   navBorder: "#f1f5f9",
  
//   primary: "#0f172a",
//   primaryLight: "#334155",
//   primaryDark: "#020617",
  
//   accent: {
//     blue: "#2563eb",
//     blueLight: "#3b82f6",
//     blueBg: "#eff6ff",
//     gold: "#b45309",
//     goldLight: "#d97706",
//     goldBg: "#fffbeb",
//     green: "#059669",
//     greenLight: "#10b981",
//     greenBg: "#ecfdf5",
//     red: "#b91c1c",
//     redLight: "#dc2626",
//     redBg: "#fef2f2",
//     purple: "#7c3aed",
//     purpleLight: "#8b5cf6",
//     purpleBg: "#f5f3ff",
//   },
  
//   text: {
//     primary: "#0f172a",
//     secondary: "#334155",
//     tertiary: "#64748b",
//     disabled: "#94a3b8",
//   },
  
//   gradient: {
//     blue: "linear-gradient(135deg, #2563eb, #1e40af)",
//     gold: "linear-gradient(135deg, #b45309, #92400e)",
//     green: "linear-gradient(135deg, #059669, #047857)",
//     red: "linear-gradient(135deg, #b91c1c, #991b1b)",
//     purple: "linear-gradient(135deg, #7c3aed, #6d28d9)",
//   },
  
//   shadow: {
//     sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
//     md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
//     lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
//     xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
//   },
// };

// const Card = ({ children, onClick, hover = true, padding = "24px" }) => (
//   <div 
//     onClick={onClick}
//     style={{ 
//       background: C.card,
//       borderRadius: 16,
//       padding,
//       border: `1px solid ${C.border}`,
//       boxShadow: C.shadow.md,
//       transition: "all 0.2s ease",
//       cursor: onClick ? "pointer" : "default",
//       ...(hover && onClick ? {
//         ':hover': {
//           transform: "translateY(-2px)",
//           boxShadow: C.shadow.lg,
//           borderColor: C.borderHover,
//         }
//       } : {})
//     }}
//   >
//     {children}
//   </div>
// );

// const Button = ({ children, onClick, variant = "primary", disabled, fullWidth = false, size = "md" }) => {
//   const sizes = {
//     sm: { padding: "8px 16px", fontSize: 13 },
//     md: { padding: "12px 24px", fontSize: 14 },
//     lg: { padding: "14px 32px", fontSize: 16 },
//   };
  
//   const variants = {
//     primary: {
//       background: C.gradient.blue,
//       color: "#ffffff",
//       border: "none",
//     },
//     secondary: {
//       background: C.surface,
//       color: C.text.primary,
//       border: `1px solid ${C.border}`,
//     },
//     danger: {
//       background: C.gradient.red,
//       color: "#ffffff",
//       border: "none",
//     },
//     success: {
//       background: C.gradient.green,
//       color: "#ffffff",
//       border: "none",
//     },
//     warning: {
//       background: C.gradient.gold,
//       color: "#ffffff",
//       border: "none",
//     },
//   };
  
//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       style={{
//         ...variants[variant],
//         borderRadius: 12,
//         ...sizes[size],
//         fontWeight: 600,
//         cursor: disabled ? "not-allowed" : "pointer",
//         boxShadow: C.shadow.md,
//         transition: "all 0.2s ease",
//         opacity: disabled ? 0.5 : 1,
//         width: fullWidth ? "100%" : "auto",
//       }}
//       onMouseEnter={(e) => !disabled && (e.currentTarget.style.transform = "translateY(-1px)")}
//       onMouseLeave={(e) => !disabled && (e.currentTarget.style.transform = "translateY(0)")}
//     >
//       {children}
//     </button>
//   );
// };

// const Badge = ({ variant = "primary", children }) => {
//   const variants = {
//     primary: { bg: C.accent.blueBg, color: C.accent.blue },
//     success: { bg: C.accent.greenBg, color: C.accent.green },
//     warning: { bg: C.accent.goldBg, color: C.accent.gold },
//     danger: { bg: C.accent.redBg, color: C.accent.red },
//     purple: { bg: C.accent.purpleBg, color: C.accent.purple },
//   };
  
//   return (
//     <span style={{
//       background: variants[variant].bg,
//       color: variants[variant].color,
//       padding: "4px 12px",
//       borderRadius: 30,
//       fontSize: 12,
//       fontWeight: 600,
//       display: "inline-block",
//       border: `1px solid ${variants[variant].bg}`,
//     }}>
//       {children}
//     </span>
//   );
// };

// const Title = ({ children, level = 2 }) => {
//   const styles = {
//     1: { fontSize: 28, fontWeight: 700, marginBottom: 24 },
//     2: { fontSize: 24, fontWeight: 600, marginBottom: 20 },
//     3: { fontSize: 20, fontWeight: 600, marginBottom: 16 },
//     4: { fontSize: 18, fontWeight: 600, marginBottom: 12 },
//   };
  
//   return (
//     <h3 style={{ 
//       color: C.text.primary,
//       ...styles[level],
//       letterSpacing: "-0.02em",
//     }}>
//       {children}
//     </h3>
//   );
// };

// const Input = ({ label, type = "text", value, onChange, placeholder, required, error }) => (
//   <div style={{ marginBottom: 16 }}>
//     {label && (
//       <label style={{ 
//         color: C.text.secondary, 
//         fontSize: 13, 
//         display: "block", 
//         marginBottom: 6,
//         fontWeight: 500,
//       }}>
//         {label} {required && <span style={{ color: C.accent.red }}>*</span>}
//       </label>
//     )}
//     <input
//       type={type}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       required={required}
//       style={{
//         width: "100%",
//         background: C.surface,
//         border: `1px solid ${error ? C.accent.red : C.border}`,
//         borderRadius: 10,
//         padding: "10px 14px",
//         color: C.text.primary,
//         fontSize: 14,
//         outline: "none",
//         transition: "all 0.2s ease",
//       }}
//       onFocus={(e) => e.currentTarget.style.borderColor = C.accent.blue}
//       onBlur={(e) => e.currentTarget.style.borderColor = error ? C.accent.red : C.border}
//     />
//     {error && <p style={{ color: C.accent.red, fontSize: 12, marginTop: 4 }}>{error}</p>}
//   </div>
// );

// const Select = ({ label, value, onChange, options, required }) => (
//   <div style={{ marginBottom: 16 }}>
//     {label && (
//       <label style={{ 
//         color: C.text.secondary, 
//         fontSize: 13, 
//         display: "block", 
//         marginBottom: 6,
//         fontWeight: 500,
//       }}>
//         {label} {required && <span style={{ color: C.accent.red }}>*</span>}
//       </label>
//     )}
//     <select
//       value={value}
//       onChange={onChange}
//       style={{
//         width: "100%",
//         background: C.surface,
//         border: `1px solid ${C.border}`,
//         borderRadius: 10,
//         padding: "10px 14px",
//         color: C.text.primary,
//         fontSize: 14,
//         outline: "none",
//         transition: "all 0.2s ease",
//       }}
//       onFocus={(e) => e.currentTarget.style.borderColor = C.accent.blue}
//       onBlur={(e) => e.currentTarget.style.borderColor = C.border}
//     >
//       {options.map(opt => (
//         <option key={opt.value} value={opt.value}>{opt.label}</option>
//       ))}
//     </select>
//   </div>
// );

// const Pill = ({ active, onClick, children }) => (
//   <button
//     onClick={onClick}
//     style={{
//       padding: "8px 16px",
//       borderRadius: 30,
//       border: `1px solid ${active ? C.accent.blue : C.border}`,
//       background: active ? C.accent.blueBg : "transparent",
//       color: active ? C.accent.blue : C.text.secondary,
//       fontSize: 13,
//       fontWeight: 500,
//       cursor: "pointer",
//       transition: "all 0.2s ease",
//     }}
//   >
//     {children}
//   </button>
// );

// // ════════════════════════════════════════════════════════════════════════════
// //  LOGIN PAGE - MODIFIED LAYOUT
// // ════════════════════════════════════════════════════════════════════════════
// function Spinner() {
//   return (
//     <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//     </svg>
//   );
// }

// function LoginPage() {
//   const { login, error, loading } = useAuth();
//   const { navigate } = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const u = await login(email, password);
//     if (u) navigate(u.role === "admin" ? "admin" : u.role === "coordinator" ? "coordinator" : u.role === "faculty" ? "faculty" : "student");
//   };

//   return (
//     <div style={{ 
//       minHeight: "100vh", 
//       background: C.bg,
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       padding: 20,
//     }}>
//       <div style={{ display: "flex", maxWidth: 1100, width: "100%", gap: 24 }}>
//         {/* Left side - Credentials List */}
//         <div style={{ flex: 1 }}>
//           <Card padding="32px" hover={false}>
//             <div style={{ marginBottom: 24 }}>
//               <div style={{
//                 width: 64,
//                 height: 64,
//                 borderRadius: 16,
//                 background: C.gradient.blue,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 24,
//                 fontWeight: 700,
//                 color: "#ffffff",
//                 marginBottom: 20,
//                 boxShadow: C.shadow.lg,
//               }}>AP</div>
//               <Title level={2}>AcadPlan</Title>
//               <p style={{ color: C.text.tertiary, fontSize: 14 }}>School of Computer Science & Engineering</p>
//             </div>
            
//             <p style={{ color: C.accent.blue, fontSize: 13, marginBottom: 16, fontWeight: 600 }}>Demo Credentials</p>
//             <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//               {MOCK_USERS.map(u => (
//                 <div
//                   key={u.id}
//                   onClick={() => { setEmail(u.email); setPassword(u.password); }}
//                   style={{
//                     padding: "12px 16px",
//                     borderRadius: 10,
//                     cursor: "pointer",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 12,
//                     transition: "all 0.2s",
//                     border: `1px solid ${C.border}`,
//                     background: email === u.email ? `${C.accent.blue}10` : C.surface,
//                   }}
//                   onMouseEnter={e => e.currentTarget.style.background = C.cardHover}
//                   onMouseLeave={e => e.currentTarget.style.background = email === u.email ? `${C.accent.blue}10` : C.surface}
//                 >
//                   <div style={{
//                     width: 36,
//                     height: 36,
//                     borderRadius: "50%",
//                     background: u.role === "faculty" ? C.accent.blueBg : u.role === "coordinator" ? C.accent.goldBg : u.role === "admin" ? C.accent.purpleBg : C.accent.greenBg,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontSize: 14,
//                     color: u.role === "faculty" ? C.accent.blue : u.role === "coordinator" ? C.accent.gold : u.role === "admin" ? C.accent.purple : C.accent.green,
//                     fontWeight: 600,
//                   }}>{u.avatar}</div>
//                   <div style={{ flex: 1 }}>
//                     <p style={{ color: C.text.primary, fontSize: 14, fontWeight: 600 }}>{u.name}</p>
//                     <p style={{ color: C.text.tertiary, fontSize: 12 }}>{u.email}</p>
//                   </div>
//                   <Badge variant={u.role === "faculty" ? "primary" : u.role === "coordinator" ? "warning" : u.role === "admin" ? "purple" : "success"}>
//                     {u.role}
//                   </Badge>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </div>

//         {/* Right side - Login Form */}
//         <div style={{ flex: 0.8 }}>
//           <Card padding="40px" hover={false}>
//             <div style={{ textAlign: "center", marginBottom: 32 }}>
//               <Title level={1}>Welcome Back</Title>
//               <p style={{ color: C.text.tertiary, fontSize: 14 }}>Sign in to your account</p>
//             </div>

//             <form onSubmit={handleSubmit}>
//               <Input
//                 label="Email"
//                 type="email"
//                 value={email}
//                 onChange={e => setEmail(e.target.value)}
//                 placeholder="name@university.edu"
//                 required
//               />
              
//               <Input
//                 label="Password"
//                 type="password"
//                 value={password}
//                 onChange={e => setPassword(e.target.value)}
//                 placeholder="••••••••"
//                 required
//               />

//               {error && (
//                 <div style={{
//                   padding: "12px",
//                   background: C.accent.redBg,
//                   border: `1px solid ${C.accent.red}`,
//                   borderRadius: 10,
//                   color: C.accent.red,
//                   fontSize: 13,
//                   marginBottom: 20,
//                 }}>
//                   {error}
//                 </div>
//               )}

//               <Button
//                 type="submit"
//                 variant="primary"
//                 disabled={loading}
//                 fullWidth
//                 size="lg"
//               >
//                 {loading ? <><Spinner /> Authenticating...</> : "Sign In"}
//               </Button>
//             </form>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ════════════════════════════════════════════════════════════════════════════
// //  SHARED SIDEBAR
// // ════════════════════════════════════════════════════════════════════════════
// function Sidebar({ navItems, active, setActive, collapsed, setCollapsed, user, badges = {}, accentColor = C.accent.blue }) {
//   const { logout } = useAuth();
//   const { navigate } = useRouter();
  
//   return (
//     <aside style={{
//       width: collapsed ? 80 : 260,
//       background: C.nav,
//       borderRight: `1px solid ${C.navBorder}`,
//       display: "flex",
//       flexDirection: "column",
//       transition: "width 0.3s ease",
//       flexShrink: 0,
//       height: "100vh",
//       position: "sticky",
//       top: 0,
//       boxShadow: C.shadow.md,
//     }}>
//       <div style={{
//         padding: collapsed ? "20px 0" : "24px",
//         borderBottom: `1px solid ${C.navBorder}`,
//         display: "flex",
//         alignItems: "center",
//         gap: 12,
//         justifyContent: collapsed ? "center" : "flex-start",
//       }}>
//         <div style={{
//           width: 40,
//           height: 40,
//           borderRadius: 12,
//           background: accentColor,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           fontSize: 18,
//           fontWeight: 700,
//           color: "#ffffff",
//           flexShrink: 0,
//         }}>AP</div>
//         {!collapsed && (
//           <div>
//             <p style={{ color: C.text.primary, fontSize: 16, fontWeight: 700 }}>AcadPlan</p>
//             <p style={{ color: C.text.tertiary, fontSize: 12 }}>SoCSE Portal</p>
//           </div>
//         )}
//       </div>

//       <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
//         {navItems.map(item => {
//           const isActive = active === item.id;
//           const badge = badges[item.id] || 0;
//           return (
//             <button
//               key={item.id}
//               onClick={() => setActive(item.id)}
//               title={collapsed ? item.label : ""}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 12,
//                 padding: collapsed ? "14px 0" : "12px 16px",
//                 justifyContent: collapsed ? "center" : "flex-start",
//                 borderRadius: 10,
//                 border: "none",
//                 background: isActive ? `${accentColor}10` : "transparent",
//                 cursor: "pointer",
//                 width: "100%",
//                 position: "relative",
//                 transition: "all 0.2s",
//                 color: isActive ? accentColor : C.text.secondary,
//                 fontWeight: isActive ? 600 : 400,
//               }}
//               onMouseEnter={e => !isActive && (e.currentTarget.style.background = C.cardHover)}
//               onMouseLeave={e => !isActive && (e.currentTarget.style.background = "transparent")}
//             >
//               <span style={{ fontSize: 18 }}>{item.icon}</span>
//               {!collapsed && <span style={{ fontSize: 14, flex: 1, textAlign: "left" }}>{item.label}</span>}
//               {badge > 0 && (
//                 <div style={{
//                   width: 20,
//                   height: 20,
//                   borderRadius: 10,
//                   background: C.accent.red,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   fontSize: 10,
//                   color: "#ffffff",
//                   fontWeight: 700,
//                 }}>
//                   {badge}
//                 </div>
//               )}
//             </button>
//           );
//         })}
//       </nav>

//       {!collapsed && user && (
//         <div style={{ padding: "16px", borderTop: `1px solid ${C.navBorder}` }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
//             <div style={{
//               width: 40,
//               height: 40,
//               borderRadius: "50%",
//               background: `${accentColor}20`,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: accentColor,
//               fontWeight: 700,
//               fontSize: 14,
//             }}>
//               {user.avatar}
//             </div>
//             <div style={{ flex: 1 }}>
//               <p style={{ color: C.text.primary, fontSize: 14, fontWeight: 600 }}>{user.name}</p>
//               <p style={{ color: C.text.tertiary, fontSize: 12, textTransform: "capitalize" }}>{user.role}</p>
//             </div>
//           </div>
//           <Button
//             onClick={() => { logout(); navigate("login"); }}
//             variant="secondary"
//             size="sm"
//             fullWidth
//           >
//             Sign Out
//           </Button>
//         </div>
//       )}

//       <button
//         onClick={() => setCollapsed(p => !p)}
//         style={{
//           margin: "12px",
//           padding: "8px",
//           borderRadius: 8,
//           border: `1px solid ${C.border}`,
//           background: "transparent",
//           color: C.text.tertiary,
//           cursor: "pointer",
//           fontSize: 14,
//         }}
//       >
//         {collapsed ? "→" : "←"}
//       </button>
//     </aside>
//   );
// }

// // ════════════════════════════════════════════════════════════════════════════
// //  TIMETABLE WEEKLY VIEW (Row-Column Format)
// // ════════════════════════════════════════════════════════════════════════════
// function WeeklyTimetableView({ schedule, title }) {
//   const config = AppState.timetableConfig;
//   const timeSlots = generateTimeSlots(config);
//   const validTimeSlots = timeSlots.filter(s => !s.isLunch);
  
//   const getSlotContent = (day, time) => {
//     const slots = schedule.filter(s => s.day === day && s.time === time);
//     return slots;
//   };
  
//   return (
//     <Card>
//       <Title level={4}>{title}</Title>
      
//       <div style={{ overflowX: "auto", marginTop: 20 }}>
//         <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 800 }}>
//           <thead>
//             <tr>
//               <th style={{ padding: "12px", textAlign: "left", color: C.text.primary, borderBottom: `2px solid ${C.border}` }}>Day / Time</th>
//               {validTimeSlots.map(slot => (
//                 <th key={slot.time} style={{ padding: "12px", textAlign: "center", color: C.text.primary, borderBottom: `2px solid ${C.border}` }}>
//                   <div style={{ fontWeight: 600 }}>{slot.period}</div>
//                   <div style={{ fontSize: 11, color: C.text.tertiary }}>{slot.time} - {slot.endTime}</div>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {config.days.map(day => (
//               <tr key={day}>
//                 <td style={{ padding: "12px", color: C.text.primary, fontWeight: 600, borderBottom: `1px solid ${C.border}` }}>{day}</td>
//                 {validTimeSlots.map(slot => {
//                   const slots = getSlotContent(day, slot.time);
//                   return (
//                     <td key={`${day}-${slot.time}`} style={{ padding: "6px", borderBottom: `1px solid ${C.border}`, verticalAlign: "top" }}>
//                       {slots.map(s => (
//                         <div
//                           key={s.id}
//                           style={{
//                             background: `${s.color}10`,
//                             border: `1px solid ${s.color}30`,
//                             borderRadius: 8,
//                             padding: "8px",
//                             marginBottom: slots.length > 1 ? 4 : 0,
//                           }}
//                         >
//                           <div style={{ fontWeight: 600, fontSize: 12, color: C.text.primary }}>{s.subject}</div>
//                           <div style={{ fontSize: 10, color: C.text.secondary }}>{s.facultyName}</div>
//                           <div style={{ fontSize: 10, color: s.type === "lab" ? C.accent.green : C.accent.blue }}>{s.room}</div>
//                         </div>
//                       ))}
//                     </td>
//                   );
//                 })}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </Card>
//   );
// }

// // ════════════════════════════════════════════════════════════════════════════
// //  STUDENT DASHBOARD
// // ════════════════════════════════════════════════════════════════════════════
// function StudentDashboard() {
//   const { user } = useAuth();
//   const [active, setActive] = useState("timetable");
//   const [collapsed, setCollapsed] = useState(false);
//   const [refresh, setRefresh] = useState(0);
  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRefresh(r => r + 1);
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const schedule = AppState.getStudentSchedule(user.course, user.semester, user.section);
  
//   // Get subjects for this student's course and semester
//   const subjects = AppState.getSubjectsForCourseAndSemester(user.course, user.semester);
  
//   const updateProgress = (subjectId, moduleIndex, completed) => {
//     AppState.updateStudentProgress(user.id, subjectId, moduleIndex, completed);
//     setRefresh(r => r + 1);
//   };
  
//   const getProgress = (subjectId) => {
//     return AppState.getStudentProgress(user.id, subjectId);
//   };
  
//   const STUDENT_NAV = [
//     { id: "timetable", icon: "📅", label: "My Timetable" },
//     { id: "syllabus", icon: "📚", label: "Syllabus Progress" },
//     { id: "profile", icon: "👤", label: "Profile" },
//   ];
  
//   const panels = {
//     timetable: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//         <Title>My Class Schedule</Title>
//         <WeeklyTimetableView 
//           schedule={schedule} 
//           title={`${user.course} - Semester ${user.semester} - Section ${user.section}`}
//         />
//       </div>
//     ),
    
//     syllabus: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//         <Title>Syllabus Progress (Student View)</Title>
        
//         {subjects.map(subject => {
//           const progress = getProgress(subject.id);
//           const completedModules = progress?.completedModules || 0;
//           const totalModules = subject.modules;
//           const completionPercentage = (completedModules / totalModules) * 100;
          
//           return (
//             <Card key={subject.id}>
//               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
//                 <div>
//                   <h4 style={{ color: C.text.primary, fontSize: 16, fontWeight: 600 }}>{subject.name}</h4>
//                   <p style={{ color: C.text.tertiary, fontSize: 12 }}>Code: {subject.code}</p>
//                 </div>
//                 <Badge variant={completionPercentage >= 75 ? "success" : completionPercentage >= 50 ? "warning" : "danger"}>
//                   {Math.round(completionPercentage)}% Complete
//                 </Badge>
//               </div>
              
//               <div style={{ marginBottom: 16 }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
//                   <span style={{ color: C.text.secondary, fontSize: 13 }}>Progress: {completedModules}/{totalModules} Modules</span>
//                 </div>
//                 <div style={{ height: 8, background: C.border, borderRadius: 10, overflow: "hidden" }}>
//                   <div style={{ height: "100%", width: `${completionPercentage}%`, background: completionPercentage >= 75 ? C.accent.green : completionPercentage >= 50 ? C.accent.gold : C.accent.red }} />
//                 </div>
//               </div>
              
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 8 }}>
//                 {Array.from({ length: totalModules }).map((_, idx) => {
//                   const isCompleted = progress?.modules[idx] || false;
//                   return (
//                     <button
//                       key={idx}
//                       onClick={() => updateProgress(subject.id, idx, !isCompleted)}
//                       style={{
//                         padding: "8px",
//                         background: isCompleted ? C.accent.greenBg : "transparent",
//                         border: `1px solid ${isCompleted ? C.accent.green : C.border}`,
//                         borderRadius: 8,
//                         cursor: "pointer",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 8,
//                         color: C.text.primary,
//                       }}
//                     >
//                       <div style={{
//                         width: 16,
//                         height: 16,
//                         borderRadius: 4,
//                         background: isCompleted ? C.accent.green : "transparent",
//                         border: `2px solid ${isCompleted ? C.accent.green : C.text.tertiary}`,
//                       }}>
//                         {isCompleted && <span style={{ color: "#ffffff", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</span>}
//                       </div>
//                       <span style={{ fontSize: 12 }}>Module {idx + 1}</span>
//                     </button>
//                   );
//                 })}
//               </div>
//             </Card>
//           );
//         })}
//       </div>
//     ),
    
//     profile: (
//       <Card>
//         <Title level={4}>Student Profile</Title>
//         <div style={{ display: "flex", gap: 32, alignItems: "center", marginTop: 20 }}>
//           <div style={{
//             width: 100,
//             height: 100,
//             borderRadius: "50%",
//             background: C.accent.purpleBg,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: 36,
//             fontWeight: 700,
//             color: C.accent.purple,
//           }}>
//             {user.avatar}
//           </div>
//           <div>
//             <h3 style={{ color: C.text.primary, fontSize: 24, fontWeight: 600, marginBottom: 8 }}>{user.name}</h3>
//             <p style={{ color: C.accent.blue, fontSize: 14, marginBottom: 4 }}>Course: {user.course}</p>
//             <p style={{ color: C.accent.blue, fontSize: 14, marginBottom: 4 }}>Semester: {user.semester}</p>
//             <p style={{ color: C.accent.blue, fontSize: 14 }}>Section: {user.section}</p>
//           </div>
//         </div>
//       </Card>
//     ),
//   };
  
//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
//       <Sidebar navItems={STUDENT_NAV} active={active} setActive={setActive} collapsed={collapsed} setCollapsed={setCollapsed} user={user} accentColor={C.accent.purple} />
//       <main style={{ flex: 1, overflow: "auto" }}>
//         <header style={{
//           background: C.nav,
//           borderBottom: `1px solid ${C.navBorder}`,
//           padding: "16px 32px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           position: "sticky",
//           top: 0,
//           zIndex: 10,
//         }}>
//           <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>{STUDENT_NAV.find(n => n.id === active)?.label}</h2>
//           <Badge variant="purple">
//             {user.course} Sem {user.semester} Sec {user.section}
//           </Badge>
//         </header>
//         <div style={{ padding: 32 }}>{panels[active]}</div>
//       </main>
//     </div>
//   );
// }

// // ════════════════════════════════════════════════════════════════════════════
// //  COORDINATOR SEMESTER DETAILS FORM
// // ════════════════════════════════════════════════════════════════════════════
// function CoordinatorSemesterDetailsForm() {
//   const [selectedCourse, setSelectedCourse] = useState("BTech");
//   const [selectedSemester, setSelectedSemester] = useState(1);
//   const [subjects, setSubjects] = useState([]);
//   const [defaultFaculty, setDefaultFaculty] = useState({});
  
//   useEffect(() => {
//     const existing = AppState.semesterDetails[selectedCourse]?.[selectedSemester];
//     if (existing) {
//       setSubjects(existing.subjects || []);
//       setDefaultFaculty(existing.defaultFaculty || {});
//     } else {
//       setSubjects([]);
//       setDefaultFaculty({});
//     }
//   }, [selectedCourse, selectedSemester]);
  
//   const availableSubjects = AppState.subjects.filter(s => 
//     s.course === selectedCourse && s.semester === selectedSemester
//   );
  
//   const handleAddSubject = (subjectId) => {
//     if (!subjects.includes(subjectId)) {
//       setSubjects([...subjects, subjectId]);
//     }
//   };
  
//   const handleRemoveSubject = (subjectId) => {
//     setSubjects(subjects.filter(id => id !== subjectId));
//     const newDefaultFaculty = { ...defaultFaculty };
//     delete newDefaultFaculty[subjectId];
//     setDefaultFaculty(newDefaultFaculty);
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
//       alert("Please assign default faculty for all subjects");
//       return;
//     }
    
//     AppState.updateSemesterDetails(selectedCourse, selectedSemester, {
//       subjects,
//       defaultFaculty
//     });
    
//     alert("Semester details saved successfully!");
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
      
//       <div style={{ marginBottom: 24 }}>
//         <h5 style={{ color: C.text.secondary, fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Available Subjects</h5>
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8 }}>
//           {availableSubjects.map(subject => (
//             <button
//               key={subject.id}
//               onClick={() => handleAddSubject(subject.id)}
//               disabled={subjects.includes(subject.id)}
//               style={{
//                 padding: "10px",
//                 background: subjects.includes(subject.id) ? C.accent.greenBg : "transparent",
//                 border: `1px solid ${subjects.includes(subject.id) ? C.accent.green : C.border}`,
//                 borderRadius: 8,
//                 color: subjects.includes(subject.id) ? C.accent.green : C.text.primary,
//                 fontSize: 13,
//                 cursor: subjects.includes(subject.id) ? "default" : "pointer",
//                 textAlign: "left",
//               }}
//             >
//               {subject.name} ({subject.code})
//             </button>
//           ))}
//         </div>
//       </div>
      
//       <div>
//         <h5 style={{ color: C.text.secondary, fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Selected Subjects & Default Faculty</h5>
//         {subjects.length === 0 ? (
//           <p style={{ color: C.text.tertiary, fontSize: 13, textAlign: "center", padding: "20px" }}>
//             No subjects selected yet
//           </p>
//         ) : (
//           subjects.map(subjectId => {
//             const subject = AppState.subjects.find(s => s.id === subjectId);
//             const facultyOptions = AppState.faculty.filter(f => f.course === selectedCourse);
            
//             return (
//               <div key={subjectId} style={{ marginBottom: 12, padding: 16, background: C.cardHover, borderRadius: 12 }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
//                   <span style={{ color: C.text.primary, fontWeight: 600 }}>{subject?.name}</span>
//                   <button 
//                     onClick={() => handleRemoveSubject(subjectId)}
//                     style={{ color: C.accent.red, background: "none", border: "none", cursor: "pointer", fontSize: 16 }}
//                   >
//                     ×
//                   </button>
//                 </div>
                
//                 <Select
//                   label="Default Faculty"
//                   value={defaultFaculty[subjectId] || ""}
//                   onChange={e => handleSetDefaultFaculty(subjectId, e.target.value)}
//                   options={[
//                     { value: "", label: "Select Default Faculty" },
//                     ...facultyOptions.map(f => ({ value: f.id, label: `${f.name} (${f.designation})` }))
//                   ]}
//                 />
//               </div>
//             );
//           })
//         )}
//       </div>
      
//       <Button
//         onClick={handleSave}
//         variant="success"
//         fullWidth
//         size="lg"
//         style={{ marginTop: 20 }}
//       >
//         Save Semester Details
//       </Button>
//     </Card>
//   );
// }

// // ════════════════════════════════════════════════════════════════════════════
// //  FACULTY SUBJECT PREFERENCE FORM
// // ════════════════════════════════════════════════════════════════════════════
// function FacultySubjectPreferenceForm({ faculty, onComplete }) {
//   const [preferences, setPreferences] = useState([
//     { level: 1, subjectId: "" },
//     { level: 2, subjectId: "" },
//     { level: 3, subjectId: "" },
//   ]);
  
//   const getAvailableSubjects = () => {
//     const subjects = [];
//     SEMESTERS.forEach(semester => {
//       const semesterDetails = AppState.semesterDetails[faculty.course]?.[semester];
//       if (semesterDetails) {
//         semesterDetails.subjects.forEach(subjectId => {
//           const subject = AppState.subjects.find(s => s.id === subjectId);
//           if (subject) {
//             subjects.push({
//               ...subject,
//               semester
//             });
//           }
//         });
//       }
//     });
//     return subjects;
//   };
  
//   const availableSubjects = getAvailableSubjects();
  
//   const updatePreference = (level, subjectId) => {
//     setPreferences(prefs => prefs.map(p => 
//       p.level === level ? { ...p, subjectId } : p
//     ));
//   };
  
//   const getUsedSubjects = () => {
//     return preferences.map(p => p.subjectId).filter(id => id);
//   };
  
//   const isSubjectAvailable = (subjectId, currentLevel) => {
//     const used = getUsedSubjects();
//     return !used.includes(subjectId) || preferences.find(p => p.level === currentLevel)?.subjectId === subjectId;
//   };
  
//   const handleSubmit = () => {
//     const selectedSubjects = preferences.filter(p => p.subjectId);
    
//     if (selectedSubjects.length < 2) {
//       alert("Please select at least 2 subject preferences");
//       return;
//     }
    
//     const formattedPreferences = selectedSubjects.map(p => ({
//       level: p.level,
//       subjectId: p.subjectId
//     }));
    
//     AppState.submitSubjectPreferences(faculty.id, formattedPreferences);
//     onComplete();
//   };
  
//   return (
//     <Card>
//       <Title level={4}>Subject Preference Form</Title>
//       <p style={{ color: C.text.secondary, fontSize: 13, marginBottom: 8 }}>Faculty ID: {faculty.facultyId} | {faculty.name}</p>
//       <p style={{ color: C.accent.blue, fontSize: 13, marginBottom: 16 }}>Course: {faculty.course} | Designation: {faculty.designation}</p>
//       <p style={{ color: C.accent.gold, fontSize: 12, marginBottom: 16 }}>Minimum 2 preferences required</p>
      
//       <div style={{ marginBottom: 24 }}>
//         <label style={{ color: C.text.secondary, fontSize: 12, display: "block", marginBottom: 12 }}>Subject Preferences (Ranked 1-3)</label>
        
//         {preferences.map((pref, index) => (
//           <div key={pref.level} style={{ marginBottom: 12 }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//               <div style={{ 
//                 width: 32, height: 32, borderRadius: "50%", 
//                 background: index === 0 ? C.accent.goldBg : index === 1 ? C.accent.blueBg : C.accent.greenBg,
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 color: index === 0 ? C.accent.gold : index === 1 ? C.accent.blue : C.accent.green,
//                 fontWeight: 700 
//               }}>
//                 {pref.level}
//               </div>
//               <select 
//                 value={pref.subjectId} 
//                 onChange={e => updatePreference(pref.level, e.target.value)}
//                 style={{
//                   flex: 1,
//                   background: C.surface,
//                   border: `1px solid ${C.border}`,
//                   borderRadius: 8,
//                   padding: "10px 12px",
//                   color: C.text.primary,
//                   fontSize: 13,
//                   outline: "none",
//                 }}
//               >
//                 <option value="">Select Preference {pref.level}</option>
//                 {availableSubjects.map(subject => {
//                   const weeklyClasses = calculateWeeklyClasses(subject);
//                   return (
//                     <option 
//                       key={subject.id} 
//                       value={subject.id}
//                       disabled={!isSubjectAvailable(subject.id, pref.level)}
//                     >
//                       {subject.name} (Sem {subject.semester}, {weeklyClasses.total} classes/wk)
//                     </option>
//                   );
//                 })}
//               </select>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       <div style={{ marginBottom: 24, padding: 16, background: C.cardHover, borderRadius: 12 }}>
//         <p style={{ color: C.accent.gold, fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Selected Subjects Summary</p>
//         {preferences.filter(p => p.subjectId).map(p => {
//           const subject = AppState.subjects.find(s => s.id === p.subjectId);
//           const weeklyClasses = subject ? calculateWeeklyClasses(subject) : { total: 0 };
          
//           return (
//             <div key={p.level} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
//               <span style={{ color: C.text.primary }}>Pref {p.level}: {subject?.name}</span>
//               <span style={{ color: C.accent.blue }}>{weeklyClasses.total}h/wk</span>
//             </div>
//           );
//         })}
//         {preferences.filter(p => p.subjectId).length < 2 && (
//           <p style={{ color: C.accent.red, fontSize: 12, marginTop: 8 }}>⚠ Please select at least 2 preferences</p>
//         )}
//       </div>
      
//       <Button
//         onClick={handleSubmit}
//         disabled={preferences.filter(p => p.subjectId).length < 2}
//         variant="success"
//         fullWidth
//       >
//         Submit Preferences
//       </Button>
//     </Card>
//   );
// }

// // ════════════════════════════════════════════════════════════════════════════
// //  FACULTY DETAILED COURSE FORM
// // ════════════════════════════════════════════════════════════════════════════
// function FacultyDetailedCourseForm({ faculty, allocatedSubjects, onComplete }) {
//   const [courseDetails, setCourseDetails] = useState(
//     allocatedSubjects.map((subjectId, index) => {
//       const subject = AppState.subjects.find(s => s.id === subjectId);
      
//       let semester = 1;
//       SEMESTERS.forEach(s => {
//         const semesterDetails = AppState.semesterDetails[faculty.course]?.[s];
//         if (semesterDetails && semesterDetails.subjects.includes(subjectId)) {
//           semester = s;
//         }
//       });
      
//       return {
//         id: Date.now() + index,
//         facultyId: faculty.id,
//         facultyName: faculty.name,
//         course: faculty.course,
//         semester,
//         subjectId,
//         subjectName: subject?.name || "",
//         subjectCode: subject?.code || "",
//         credits: subject?.credits || 3,
//         modules: subject?.modules || 4,
//         type: subject?.type || "Theory",
//         theoryClassesPerWeek: subject?.theoryClassesPerWeek || 0,
//         labPeriodsPerWeek: subject?.labPeriodsPerWeek || 0,
//         totalWeeklyClasses: subject?.totalWeeklyClasses || 0,
//         sections: SECTIONS,
//         coordinatorStatus: "pending",
//         deanStatus: "pending",
//         coordinatorFeedback: "",
//         deanFeedback: "",
//       };
//     })
//   );
  
//   const updateDetail = (index, field, value) => {
//     const newDetails = [...courseDetails];
//     newDetails[index][field] = value;
    
//     if (field === 'theoryClassesPerWeek' || field === 'labPeriodsPerWeek') {
//       newDetails[index].totalWeeklyClasses = 
//         (newDetails[index].theoryClassesPerWeek || 0) + 
//         (newDetails[index].labPeriodsPerWeek || 0);
//     }
    
//     setCourseDetails(newDetails);
//   };
  
//   const handleSubmit = () => {
//     AppState.submitCourseDetails(faculty.id, courseDetails);
//     onComplete();
//   };
  
//   return (
//     <Card>
//       <Title level={4}>Detailed Course Information Form</Title>
//       <p style={{ color: C.accent.green, fontSize: 13, marginBottom: 20 }}>Your subject preferences have been approved! Please review the course details for {faculty.course}.</p>
      
//       {courseDetails.map((detail, index) => (
//         <div key={index} style={{ marginBottom: 24, padding: 16, background: C.cardHover, borderRadius: 12 }}>
//           <h5 style={{ color: C.accent.blue, fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{detail.subjectName}</h5>
//           <p style={{ color: C.text.tertiary, fontSize: 12, marginBottom: 12 }}>Semester {detail.semester} | Code: {detail.subjectCode}</p>
          
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 12 }}>
//             <div>
//               <label style={{ color: C.text.secondary, fontSize: 11, display: "block", marginBottom: 4 }}>Credits</label>
//               <input 
//                 type="number" 
//                 min="1" 
//                 max="5" 
//                 value={detail.credits} 
//                 onChange={e => updateDetail(index, "credits", parseInt(e.target.value))}
//                 style={{
//                   width: "100%",
//                   background: C.surface,
//                   border: `1px solid ${C.border}`,
//                   borderRadius: 6,
//                   padding: "8px",
//                   color: C.text.primary,
//                 }}
//               />
//             </div>
//             <div>
//               <label style={{ color: C.text.secondary, fontSize: 11, display: "block", marginBottom: 4 }}>Modules</label>
//               <input 
//                 type="number" 
//                 min="1" 
//                 max="10" 
//                 value={detail.modules} 
//                 onChange={e => updateDetail(index, "modules", parseInt(e.target.value))}
//                 style={{
//                   width: "100%",
//                   background: C.surface,
//                   border: `1px solid ${C.border}`,
//                   borderRadius: 6,
//                   padding: "8px",
//                   color: C.text.primary,
//                 }}
//               />
//             </div>
//             <div>
//               <label style={{ color: C.text.secondary, fontSize: 11, display: "block", marginBottom: 4 }}>Type</label>
//               <select 
//                 value={detail.type} 
//                 onChange={e => updateDetail(index, "type", e.target.value)}
//                 style={{
//                   width: "100%",
//                   background: C.surface,
//                   border: `1px solid ${C.border}`,
//                   borderRadius: 6,
//                   padding: "8px",
//                   color: C.text.primary,
//                 }}
//               >
//                 <option value="Theory">Theory</option>
//                 <option value="Lab">Lab</option>
//                 <option value="Both">Both</option>
//               </select>
//             </div>
//           </div>
          
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 12 }}>
//             <div>
//               <label style={{ color: C.text.secondary, fontSize: 11, display: "block", marginBottom: 4 }}>Theory Classes/Week</label>
//               <input 
//                 type="number" 
//                 min="0" 
//                 max="5" 
//                 value={detail.theoryClassesPerWeek} 
//                 onChange={e => updateDetail(index, "theoryClassesPerWeek", parseInt(e.target.value))}
//                 style={{
//                   width: "100%",
//                   background: C.surface,
//                   border: `1px solid ${C.border}`,
//                   borderRadius: 6,
//                   padding: "8px",
//                   color: C.text.primary,
//                 }}
//               />
//             </div>
//             <div>
//               <label style={{ color: C.text.secondary, fontSize: 11, display: "block", marginBottom: 4 }}>Lab Periods/Week</label>
//               <input 
//                 type="number" 
//                 min="0" 
//                 max="10" 
//                 value={detail.labPeriodsPerWeek} 
//                 onChange={e => updateDetail(index, "labPeriodsPerWeek", parseInt(e.target.value))}
//                 style={{
//                   width: "100%",
//                   background: C.surface,
//                   border: `1px solid ${C.border}`,
//                   borderRadius: 6,
//                   padding: "8px",
//                   color: C.text.primary,
//                 }}
//               />
//             </div>
//           </div>
          
//           <div style={{ padding: 12, background: C.surface, borderRadius: 8 }}>
//             <p style={{ color: C.accent.gold, fontSize: 13 }}>Total Weekly Classes per Section: {detail.totalWeeklyClasses}</p>
//             <p style={{ color: C.accent.gold, fontSize: 13 }}>Total Sessions (3 sections): {detail.totalWeeklyClasses * 3}</p>
//           </div>
//         </div>
//       ))}
      
//       <Button onClick={handleSubmit} variant="success" fullWidth size="lg">
//         Submit Detailed Course Information
//       </Button>
//     </Card>
//   );
// }

// // ════════════════════════════════════════════════════════════════════════════
// //  FACULTY SYLLABUS TRACKER
// // ════════════════════════════════════════════════════════════════════════════
// function FacultySyllabusTracker({ faculty }) {
//   const [refresh, setRefresh] = useState(0);
  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRefresh(r => r + 1);
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const courseDetails = AppState.getCourseDetailsByFacultyId(faculty.id);
  
//   const toggleModule = (subjectId, moduleIndex) => {
//     AppState.updateSyllabusProgress(faculty.id, subjectId, moduleIndex, 
//       !AppState.syllabusProgress[`${faculty.id}_${subjectId}`]?.modules[moduleIndex]
//     );
//     setRefresh(r => r + 1);
//   };
  
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//       <Title>Syllabus Progress Tracker</Title>
      
//       {courseDetails.filter(c => c.deanStatus === "approved").length === 0 ? (
//         <Card>
//           <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>
//             No approved courses yet. Wait for dean's approval.
//           </p>
//         </Card>
//       ) : (
//         courseDetails.filter(c => c.deanStatus === "approved").map(course => {
//           const progress = AppState.getSyllabusProgress(faculty.id, course.subjectId);
//           const completedModules = progress?.completedModules || 0;
//           const totalModules = course.modules;
//           const completionPercentage = progress?.completionPercentage || 0;
          
//           return (
//             <Card key={course.id}>
//               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
//                 <div>
//                   <h4 style={{ color: C.accent.blue, fontSize: 16, fontWeight: 600 }}>{course.subjectName}</h4>
//                   <p style={{ color: C.text.tertiary, fontSize: 12 }}>Code: {course.subjectCode} | Semester {course.semester}</p>
//                 </div>
//                 <Badge variant={completionPercentage >= 75 ? "success" : completionPercentage >= 50 ? "warning" : "danger"}>
//                   {Math.round(completionPercentage)}% Complete
//                 </Badge>
//               </div>
              
//               <div style={{ marginBottom: 16 }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
//                   <span style={{ color: C.text.secondary, fontSize: 13 }}>Progress: {completedModules}/{totalModules} Modules</span>
//                 </div>
//                 <div style={{ height: 8, background: C.border, borderRadius: 10, overflow: "hidden" }}>
//                   <div style={{ height: "100%", width: `${completionPercentage}%`, background: completionPercentage >= 75 ? C.accent.green : completionPercentage >= 50 ? C.accent.gold : C.accent.red }} />
//                 </div>
//               </div>
              
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 8 }}>
//                 {Array.from({ length: totalModules }).map((_, idx) => {
//                   const isCompleted = progress?.modules[idx] || false;
//                   return (
//                     <button
//                       key={idx}
//                       onClick={() => toggleModule(course.subjectId, idx)}
//                       style={{
//                         padding: "8px",
//                         background: isCompleted ? C.accent.greenBg : "transparent",
//                         border: `1px solid ${isCompleted ? C.accent.green : C.border}`,
//                         borderRadius: 8,
//                         cursor: "pointer",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 8,
//                         color: C.text.primary,
//                       }}
//                     >
//                       <div style={{
//                         width: 16,
//                         height: 16,
//                         borderRadius: 4,
//                         background: isCompleted ? C.accent.green : "transparent",
//                         border: `2px solid ${isCompleted ? C.accent.green : C.text.tertiary}`,
//                       }}>
//                         {isCompleted && <span style={{ color: "#ffffff", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</span>}
//                       </div>
//                       <span style={{ fontSize: 12 }}>Module {idx + 1}</span>
//                     </button>
//                   );
//                 })}
//               </div>
//             </Card>
//           );
//         })
//       )}
//     </div>
//   );
// }

// // ════════════════════════════════════════════════════════════════════════════
// //  TIMETABLE CONFIGURATION MODAL
// // ════════════════════════════════════════════════════════════════════════════
// function TimetableConfigModal({ isOpen, onClose, onGenerate }) {
//   const [config, setConfig] = useState(AppState.timetableConfig);
  
//   const updateConfig = (field, value) => {
//     setConfig({ ...config, [field]: value });
//   };
  
//   const updateLunchBreak = (field, value) => {
//     setConfig({ ...config, lunchBreak: { ...config.lunchBreak, [field]: value } });
//   };
  
//   const handleGenerate = () => {
//     AppState.updateTimetableConfig(config);
//     onGenerate(config);
//     onClose();
//   };
  
//   if (!isOpen) return null;
  
//   return (
//     <div style={{
//       position: "fixed",
//       inset: 0,
//       background: "rgba(0,0,0,0.5)",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       zIndex: 1000,
//     }}>
//       <Card padding="32px" hover={false}>
//         <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
//           <Title level={3}>Timetable Configuration</Title>
//           <button onClick={onClose} style={{ background: "none", border: "none", color: C.text.tertiary, fontSize: 20, cursor: "pointer" }}>×</button>
//         </div>
        
//         <div style={{ marginBottom: 20 }}>
//           <Title level={4}>Daily Schedule</Title>
          
//           <Input
//             label="Start Time"
//             type="time"
//             value={config.startTime}
//             onChange={e => updateConfig('startTime', e.target.value)}
//           />
          
//           <Input
//             label="End Time"
//             type="time"
//             value={config.endTime}
//             onChange={e => updateConfig('endTime', e.target.value)}
//           />
          
//           <Input
//             label="Class Duration (minutes)"
//             type="number"
//             min="30"
//             max="120"
//             step="5"
//             value={config.classDuration}
//             onChange={e => updateConfig('classDuration', parseInt(e.target.value))}
//           />
          
//           <Input
//             label="Break Between Classes (minutes)"
//             type="number"
//             min="0"
//             max="30"
//             value={config.breakDuration}
//             onChange={e => updateConfig('breakDuration', parseInt(e.target.value))}
//           />
//         </div>
        
//         <div style={{ marginBottom: 20 }}>
//           <Title level={4}>Lunch Break</Title>
          
//           <Input
//             label="Lunch Break Start"
//             type="time"
//             value={config.lunchBreak.start}
//             onChange={e => updateLunchBreak('start', e.target.value)}
//           />
          
//           <Input
//             label="Lunch Break Duration (minutes)"
//             type="number"
//             min="30"
//             max="90"
//             value={config.lunchBreak.duration}
//             onChange={e => updateLunchBreak('duration', parseInt(e.target.value))}
//           />
//         </div>
        
//         <div style={{ marginBottom: 20, padding: 16, background: C.cardHover, borderRadius: 12 }}>
//           <Title level={4}>Preview</Title>
//           {generateTimeSlots(config).map((slot, i) => (
//             <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0" }}>
//               <span style={{ color: slot.isLunch ? C.accent.gold : C.text.primary, fontSize: 13 }}>
//                 {slot.isLunch ? "🍽️ LUNCH" : `📚 ${slot.period}: ${slot.time} - ${slot.endTime}`}
//               </span>
//             </div>
//           ))}
//         </div>
        
//         <div style={{ display: "flex", gap: 12 }}>
//           <Button onClick={handleGenerate} variant="success" fullWidth>
//             Generate Timetable
//           </Button>
//           <Button onClick={onClose} variant="secondary" fullWidth>
//             Cancel
//           </Button>
//         </div>
//       </Card>
//     </div>
//   );
// }

// // ════════════════════════════════════════════════════════════════════════════
// //  COORDINATOR TIMETABLE VIEW
// // ════════════════════════════════════════════════════════════════════════════
// function CoordinatorTimetableView() {
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

// // ════════════════════════════════════════════════════════════════════════════
// //  COORDINATOR COURSE DETAILS REVIEW PANEL
// // ════════════════════════════════════════════════════════════════════════════
// function CoordinatorCourseDetailsReview() {
//   const [refresh, setRefresh] = useState(0);
  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRefresh(r => r + 1);
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const pendingCourses = AppState.getPendingCoordinatorApprovals();
//   const approvedCourses = AppState.courseDetails.filter(c => c.coordinatorStatus === "approved");
  
//   const handleApprove = (courseId) => {
//     AppState.updateCourseDetailCoordinatorStatus(courseId, "approved");
//     setRefresh(r => r + 1);
//   };
  
//   const handleReject = (courseId) => {
//     const reason = prompt("Enter rejection reason:");
//     if (reason) {
//       AppState.updateCourseDetailCoordinatorStatus(courseId, "rejected", reason);
//       setRefresh(r => r + 1);
//     }
//   };
  
//   const allPrefsApproved = AppState.subjectPreferences.every(p => p.status === "approved" || p.status === "rejected");
  
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <Title>Detailed Course Information Review (Coordinator)</Title>
//       </div>
      
//       {!allPrefsApproved && (
//         <Card padding="16px">
//           <p style={{ color: C.accent.gold }}>⚠ Please complete all preference allocations first before reviewing course details.</p>
//         </Card>
//       )}
      
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Review</p>
//           <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingCourses.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Approved (Sent to Dean)</p>
//           <p style={{ color: C.accent.green, fontSize: 32, fontWeight: 700 }}>{approvedCourses.length}</p>
//         </Card>
//       </div>
      
//       {pendingCourses.length > 0 ? (
//         pendingCourses.map(course => {
//           const faculty = AppState.faculty.find(f => f.id === course.facultyId);
          
//           return (
//             <Card key={course.id}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
//                 <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
//                   <div style={{
//                     width: 48,
//                     height: 48,
//                     borderRadius: "50%",
//                     background: `${faculty.color}20`,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: faculty.color,
//                     fontWeight: 700,
//                   }}>
//                     {faculty.avatar}
//                   </div>
//                   <div>
//                     <p style={{ color: C.text.primary, fontWeight: 600, fontSize: 16 }}>{faculty.name}</p>
//                     <p style={{ color: C.accent.blue, fontSize: 14 }}>{course.subjectName} ({course.subjectCode})</p>
//                     <p style={{ color: C.text.tertiary, fontSize: 12 }}>{course.course} Sem {course.semester}</p>
//                   </div>
//                 </div>
//               </div>
              
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Credits</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.credits}</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Modules</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.modules}</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Theory</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.theoryClassesPerWeek}h</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Lab</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.labPeriodsPerWeek}h</span></div>
//               </div>
              
//               <div style={{ marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//                 <p style={{ color: C.accent.gold, fontSize: 14 }}>Total Weekly Classes per Section: {course.totalWeeklyClasses}</p>
//                 <p style={{ color: C.accent.gold, fontSize: 14 }}>Total Sessions (3 sections): {course.totalWeeklyClasses * 3}</p>
//               </div>
              
//               <div style={{ display: "flex", gap: 12 }}>
//                 <Button onClick={() => handleApprove(course.id)} variant="success" fullWidth>
//                   ✓ Approve & Send to Dean
//                 </Button>
//                 <Button onClick={() => handleReject(course.id)} variant="danger" fullWidth>
//                   ✗ Reject
//                 </Button>
//               </div>
//             </Card>
//           );
//         })
//       ) : (
//         <Card>
//           <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>No pending course details</p>
//         </Card>
//       )}
//     </div>
//   );
// }

// // ════════════════════════════════════════════════════════════════════════════
// //  DEAN COURSE DETAILS REVIEW PANEL
// // ════════════════════════════════════════════════════════════════════════════
// function DeanCourseDetailsReview() {
//   const [refresh, setRefresh] = useState(0);
//   const [showConfigModal, setShowConfigModal] = useState(false);
  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRefresh(r => r + 1);
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const pendingDeanApprovals = AppState.getPendingDeanApprovals();
//   const approvedCourses = AppState.courseDetails.filter(c => c.deanStatus === "approved");
  
//   const handleApprove = (courseId) => {
//     AppState.updateCourseDetailDeanStatus(courseId, "approved");
//     setRefresh(r => r + 1);
//   };
  
//   const handleReject = (courseId) => {
//     const reason = prompt("Enter rejection reason:");
//     if (reason) {
//       AppState.updateCourseDetailDeanStatus(courseId, "rejected", reason);
//       setRefresh(r => r + 1);
//     }
//   };
  
//   const handleGenerateTimetable = (config) => {
//     AppState.generateTimetable();
//     setRefresh(r => r + 1);
//   };
  
//   const allCoursesApproved = AppState.courseDetails.length > 0 && 
//     AppState.courseDetails.every(c => c.deanStatus === "approved");
  
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <TimetableConfigModal 
//         isOpen={showConfigModal} 
//         onClose={() => setShowConfigModal(false)} 
//         onGenerate={handleGenerateTimetable}
//       />
      
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <Title>Dean's Approval - Course Details</Title>
//         {allCoursesApproved && (
//           <Button onClick={() => setShowConfigModal(true)} variant="success">
//             Configure & Generate Timetable
//           </Button>
//         )}
//       </div>
      
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Dean's Approval</p>
//           <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingDeanApprovals.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Dean Approved</p>
//           <p style={{ color: C.accent.green, fontSize: 32, fontWeight: 700 }}>{approvedCourses.length}</p>
//         </Card>
//       </div>
      
//       {pendingDeanApprovals.length > 0 ? (
//         pendingDeanApprovals.map(course => {
//           const faculty = AppState.faculty.find(f => f.id === course.facultyId);
          
//           return (
//             <Card key={course.id}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
//                 <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
//                   <div style={{
//                     width: 48,
//                     height: 48,
//                     borderRadius: "50%",
//                     background: `${faculty.color}20`,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: faculty.color,
//                     fontWeight: 700,
//                   }}>
//                     {faculty.avatar}
//                   </div>
//                   <div>
//                     <p style={{ color: C.text.primary, fontWeight: 600, fontSize: 16 }}>{faculty.name}</p>
//                     <p style={{ color: C.accent.blue, fontSize: 14 }}>{course.subjectName} ({course.subjectCode})</p>
//                     <p style={{ color: C.text.tertiary, fontSize: 12 }}>{course.course} Sem {course.semester}</p>
//                   </div>
//                 </div>
//                 <Badge variant="success">Coordinator Approved</Badge>
//               </div>
              
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Credits</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.credits}</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Modules</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.modules}</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Theory</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.theoryClassesPerWeek}h</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Lab</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.labPeriodsPerWeek}h</span></div>
//               </div>
              
//               <div style={{ marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//                 <p style={{ color: C.accent.gold, fontSize: 14 }}>Total Weekly Classes per Section: {course.totalWeeklyClasses}</p>
//                 <p style={{ color: C.accent.gold, fontSize: 14 }}>Total Sessions (3 sections): {course.totalWeeklyClasses * 3}</p>
//               </div>
              
//               <div style={{ display: "flex", gap: 12 }}>
//                 <Button onClick={() => handleApprove(course.id)} variant="success" fullWidth>
//                   ✓ Dean Approve
//                 </Button>
//                 <Button onClick={() => handleReject(course.id)} variant="danger" fullWidth>
//                   ✗ Dean Reject
//                 </Button>
//               </div>
//             </Card>
//           );
//         })
//       ) : (
//         <Card>
//           <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>No courses pending dean's approval</p>
//         </Card>
//       )}
//     </div>
//   );
// }

// // ════════════════════════════════════════════════════════════════════════════
// //  COORDINATOR PREFERENCE REVIEW PANEL
// // ════════════════════════════════════════════════════════════════════════════
// function CoordinatorPreferenceReview() {
//   const [refresh, setRefresh] = useState(0);
//   const [selectedFaculty, setSelectedFaculty] = useState(null);
//   const [allocatedSubjects, setAllocatedSubjects] = useState([]);
  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRefresh(r => r + 1);
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const pendingPrefs = AppState.subjectPreferences.filter(p => p.submitted && p.status === "pending");
//   const approvedPrefs = AppState.subjectPreferences.filter(p => p.status === "approved");
  
//   const handleApprove = (facultyId, selectedSubjects) => {
//     AppState.updatePreferenceStatus(facultyId, "approved", "", selectedSubjects);
//     setSelectedFaculty(null);
//     setAllocatedSubjects([]);
//     setRefresh(r => r + 1);
//   };
  
//   const handleReject = (facultyId) => {
//     const reason = prompt("Enter rejection reason:");
//     if (reason) {
//       AppState.updatePreferenceStatus(facultyId, "rejected", reason);
//       setRefresh(r => r + 1);
//     }
//   };
  
//   const checkFacultyConflict = (facultyId, subjectId) => {
//     const existingAllocations = AppState.courseDetails.filter(c => 
//       c.facultyId === facultyId && c.subjectId === subjectId
//     );
//     return existingAllocations.length > 0;
//   };
  
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <Title>Subject Preference Review & Conflict Resolution</Title>
      
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Reviews</p>
//           <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingPrefs.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Approved</p>
//           <p style={{ color: C.accent.green, fontSize: 32, fontWeight: 700 }}>{approvedPrefs.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Workload Used</p>
//           <p style={{ color: C.accent.blue, fontSize: 32, fontWeight: 700 }}>
//             {AppState.faculty.reduce((sum, f) => sum + f.assignedHours, 0)}h
//           </p>
//         </Card>
//       </div>
      
//       <div>
//         <h4 style={{ color: C.text.primary, fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Pending Reviews</h4>
//         {pendingPrefs.length === 0 ? (
//           <Card>
//             <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>No pending preference forms</p>
//           </Card>
//         ) : (
//           pendingPrefs.map(pref => {
//             const faculty = AppState.faculty.find(f => f.id === pref.facultyId);
            
//             return (
//               <Card key={pref.id} style={{ marginBottom: 16 }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
//                   <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
//                     <div style={{
//                       width: 48,
//                       height: 48,
//                       borderRadius: "50%",
//                       background: `${faculty.color}20`,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       color: faculty.color,
//                       fontWeight: 700,
//                     }}>
//                       {pref.avatar}
//                     </div>
//                     <div>
//                       <p style={{ color: C.text.primary, fontWeight: 600, fontSize: 16 }}>{pref.facultyName}</p>
//                       <p style={{ color: C.text.secondary, fontSize: 13 }}>{faculty.designation} · {faculty.course}</p>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div style={{ marginBottom: 16 }}>
//                   <p style={{ color: C.text.tertiary, fontSize: 12, marginBottom: 4 }}>Workload:</p>
//                   <p style={{ color: faculty.assignedHours <= faculty.maxHours ? C.accent.green : C.accent.red, fontSize: 14, fontWeight: 600 }}>
//                     Assigned: {faculty.assignedHours}h / {faculty.maxHours}h max | Remaining: {faculty.remainingHours}h
//                   </p>
//                 </div>
                
//                 <div style={{ marginBottom: 16 }}>
//                   <p style={{ color: C.text.tertiary, fontSize: 12, marginBottom: 8 }}>Subject Preferences:</p>
//                   {pref.preferences.map(p => {
//                     const subject = AppState.subjects.find(s => s.id === p.subjectId);
//                     const hasConflict = checkFacultyConflict(faculty.id, p.subjectId);
                    
//                     return (
//                       <div key={p.level} style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         padding: "8px 12px",
//                         marginBottom: 4,
//                         background: C.cardHover,
//                         borderRadius: 8,
//                       }}>
//                         <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                           <span style={{
//                             width: 24,
//                             height: 24,
//                             borderRadius: "50%",
//                             background: p.level === 1 ? C.accent.goldBg : p.level === 2 ? C.accent.blueBg : C.accent.greenBg,
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             color: p.level === 1 ? C.accent.gold : p.level === 2 ? C.accent.blue : C.accent.green,
//                             fontSize: 12,
//                             fontWeight: 700,
//                           }}>
//                             {p.level}
//                           </span>
//                           <span style={{ color: C.text.primary }}>{subject?.name}</span>
//                           {hasConflict && (
//                             <Badge variant="danger">Conflict</Badge>
//                           )}
//                         </div>
//                         <span style={{ color: C.accent.blue, fontSize: 12 }}>{subject?.totalWeeklyClasses}h</span>
//                       </div>
//                     );
//                   })}
//                 </div>
                
//                 {selectedFaculty === pref.facultyId ? (
//                   <div>
//                     <p style={{ color: C.accent.gold, fontSize: 13, marginBottom: 12 }}>Select subjects to allocate (max {faculty.remainingHours}h):</p>
//                     {pref.preferences.map(p => {
//                       const subject = AppState.subjects.find(s => s.id === p.subjectId);
//                       const isSelected = allocatedSubjects.includes(p.subjectId);
//                       const totalHours = allocatedSubjects.reduce((sum, sId) => {
//                         const sub = AppState.subjects.find(subj => subj.id === sId);
//                         return sum + (sub?.totalWeeklyClasses || 0);
//                       }, 0);
//                       const wouldExceed = totalHours + (subject?.totalWeeklyClasses || 0) > faculty.remainingHours;
//                       const hasConflict = checkFacultyConflict(faculty.id, p.subjectId);
                      
//                       return (
//                         <button
//                           key={p.level}
//                           onClick={() => {
//                             if (isSelected) {
//                               setAllocatedSubjects(allocatedSubjects.filter(s => s !== p.subjectId));
//                             } else if (!wouldExceed && !hasConflict) {
//                               setAllocatedSubjects([...allocatedSubjects, p.subjectId]);
//                             }
//                           }}
//                           disabled={(!isSelected && wouldExceed) || hasConflict}
//                           style={{
//                             display: "block",
//                             width: "100%",
//                             padding: "10px 12px",
//                             marginBottom: 6,
//                             background: isSelected ? C.accent.greenBg : "transparent",
//                             border: `1px solid ${isSelected ? C.accent.green : hasConflict ? C.accent.red : C.border}`,
//                             borderRadius: 8,
//                             cursor: (wouldExceed && !isSelected) || hasConflict ? "not-allowed" : "pointer",
//                             textAlign: "left",
//                             color: C.text.primary,
//                             opacity: (wouldExceed && !isSelected) || hasConflict ? 0.5 : 1,
//                           }}
//                         >
//                           <div style={{ display: "flex", justifyContent: "space-between" }}>
//                             <span>
//                               {subject?.name} (Pref {p.level})
//                               {hasConflict && " - Already Assigned"}
//                             </span>
//                             <span style={{ color: C.accent.blue }}>{subject?.totalWeeklyClasses}h</span>
//                           </div>
//                         </button>
//                       );
//                     })}
//                     <div style={{ marginTop: 12, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//                       <p style={{ color: C.text.secondary, fontSize: 13 }}>
//                         Selected: {allocatedSubjects.reduce((sum, sId) => {
//                           const sub = AppState.subjects.find(subj => subj.id === sId);
//                           return sum + (sub?.totalWeeklyClasses || 0);
//                         }, 0)}h / {faculty.remainingHours}h remaining
//                       </p>
//                     </div>
//                     <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
//                       <Button 
//                         onClick={() => handleApprove(pref.facultyId, allocatedSubjects)}
//                         disabled={allocatedSubjects.length === 0}
//                         variant="success"
//                         fullWidth
//                       >
//                         Confirm Allocation
//                       </Button>
//                       <Button 
//                         onClick={() => { setSelectedFaculty(null); setAllocatedSubjects([]); }}
//                         variant="secondary"
//                         fullWidth
//                       >
//                         Cancel
//                       </Button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div style={{ display: "flex", gap: 12 }}>
//                     <Button onClick={() => setSelectedFaculty(pref.facultyId)} variant="primary" fullWidth>
//                       Review & Allocate
//                     </Button>
//                     <Button onClick={() => handleReject(pref.facultyId)} variant="danger" fullWidth>
//                       Reject
//                     </Button>
//                   </div>
//                 )}
//               </Card>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// }

// // ════════════════════════════════════════════════════════════════════════════
// //  ADMIN FLAGGED ISSUES PANEL
// // ════════════════════════════════════════════════════════════════════════════
// function AdminFlaggedIssuesPanel() {
//   const [refresh, setRefresh] = useState(0);
  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRefresh(r => r + 1);
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const flaggedIssues = AppState.getFlaggedIssues();
  
//   const handleResolve = (issueId) => {
//     AppState.resolveFlaggedIssue(issueId);
//     setRefresh(r => r + 1);
//   };
  
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//       <Title>Flagged Issues & Discrepancies</Title>
      
//       {flaggedIssues.length === 0 ? (
//         <Card>
//           <p style={{ color: C.accent.green, textAlign: "center", padding: "20px 0" }}>
//             ✓ No flagged issues at this time
//           </p>
//         </Card>
//       ) : (
//         flaggedIssues.map(issue => {
//           const faculty = issue.facultyId ? AppState.getFacultyById(issue.facultyId) : null;
//           const subject = AppState.subjects.find(s => s.id === issue.subjectId);
          
//           return (
//             <Card key={issue.id}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//                 <div>
//                   <h4 style={{ color: C.accent.red, fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
//                     ⚠ {issue.type === "student_faculty_discrepancy" ? "Student-Faculty Progress Discrepancy" : "Syllabus Progress Discrepancy"}
//                   </h4>
//                   <p style={{ color: C.text.primary, marginBottom: 8 }}>
//                     <span style={{ color: C.text.tertiary }}>Subject:</span> {subject?.name}
//                   </p>
//                   {faculty && (
//                     <p style={{ color: C.text.primary, marginBottom: 8 }}>
//                       <span style={{ color: C.text.tertiary }}>Faculty:</span> {faculty.name}
//                     </p>
//                   )}
//                   {issue.type === "student_faculty_discrepancy" ? (
//                     <>
//                       <p style={{ color: C.text.primary, marginBottom: 4 }}>
//                         <span style={{ color: C.text.tertiary }}>Faculty Progress:</span> {issue.facultyProgress} modules
//                       </p>
//                       <p style={{ color: C.text.primary, marginBottom: 8 }}>
//                         <span style={{ color: C.text.tertiary }}>Student Progress:</span> {issue.studentProgress} modules
//                       </p>
//                     </>
//                   ) : (
//                     <>
//                       <p style={{ color: C.text.primary, marginBottom: 4 }}>
//                         <span style={{ color: C.text.tertiary }}>Expected:</span> {issue.expectedPercentage?.toFixed(1)}%
//                       </p>
//                       <p style={{ color: C.text.primary, marginBottom: 8 }}>
//                         <span style={{ color: C.text.tertiary }}>Actual:</span> {issue.actualPercentage?.toFixed(1)}%
//                       </p>
//                     </>
//                   )}
//                   <p style={{ color: C.text.tertiary, fontSize: 12 }}>
//                     {new Date(issue.timestamp).toLocaleString()}
//                   </p>
//                 </div>
//                 <Button onClick={() => handleResolve(issue.id)} variant="success" size="sm">
//                   Mark Resolved
//                 </Button>
//               </div>
//             </Card>
//           );
//         })
//       )}
//     </div>
//   );
// }

// // ════════════════════════════════════════════════════════════════════════════
// //  COORDINATOR DASHBOARD
// // ════════════════════════════════════════════════════════════════════════════
// function CoordinatorDashboard() {
//   const { user } = useAuth();
//   const [active, setActive] = useState("semester");
//   const [collapsed, setCollapsed] = useState(false);
//   const [refresh, setRefresh] = useState(0);
  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRefresh(r => r + 1);
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const pendingPrefs = AppState.subjectPreferences.filter(p => p.submitted && p.status === "pending").length;
//   const pendingCourses = AppState.getPendingCoordinatorApprovals().length;
  
//   const COORD_NAV = [
//     { id: "semester", icon: "📋", label: "Semester Details" },
//     { id: "preferences", icon: "⭐", label: "Subject Preferences" },
//     { id: "courses", icon: "📚", label: "Course Details" },
//     { id: "timetable", icon: "📅", label: "Timetable" },
//     { id: "overview", icon: "📊", label: "Overview" },
//   ];
  
//   const panels = {
//     semester: <CoordinatorSemesterDetailsForm />,
//     preferences: <CoordinatorPreferenceReview />,
//     courses: <CoordinatorCourseDetailsReview />,
//     timetable: <CoordinatorTimetableView />,
//     overview: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//         <Title>Workflow Overview - SoCSE</Title>
        
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
//           <Card>
//             <Title level={4}>Step 1: Semester Details</Title>
//             {COURSES.map(course => {
//               const semestersConfigured = SEMESTERS.filter(s => 
//                 AppState.semesterDetails[course]?.[s]
//               ).length;
              
//               return (
//                 <div key={course} style={{ marginBottom: 12 }}>
//                   <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
//                     <span style={{ color: C.text.secondary }}>{course}</span>
//                     <span style={{ color: semestersConfigured === 2 ? C.accent.green : C.accent.gold }}>
//                       {semestersConfigured}/2
//                     </span>
//                   </div>
//                   <div style={{ height: 4, background: C.border, borderRadius: 2 }}>
//                     <div style={{ height: "100%", width: `${(semestersConfigured / 2) * 100}%`, background: semestersConfigured === 2 ? C.accent.green : C.accent.gold, borderRadius: 2 }} />
//                   </div>
//                 </div>
//               );
//             })}
//           </Card>
          
//           <Card>
//             <Title level={4}>Step 2: Subject Preferences</Title>
//             <div style={{ marginBottom: 16 }}>
//               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
//                 <span style={{ color: C.text.secondary }}>Submitted</span>
//                 <span style={{ color: C.text.primary }}>{AppState.subjectPreferences.filter(p => p.submitted).length}/6</span>
//               </div>
//               <div style={{ height: 6, background: C.border, borderRadius: 3 }}>
//                 <div style={{ height: "100%", width: `${(AppState.subjectPreferences.filter(p => p.submitted).length / 6) * 100}%`, background: C.accent.blue, borderRadius: 3 }} />
//               </div>
//             </div>
//             <div>
//               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
//                 <span style={{ color: C.text.secondary }}>Approved</span>
//                 <span style={{ color: C.text.primary }}>{AppState.subjectPreferences.filter(p => p.status === "approved").length}/6</span>
//               </div>
//               <div style={{ height: 6, background: C.border, borderRadius: 3 }}>
//                 <div style={{ height: "100%", width: `${(AppState.subjectPreferences.filter(p => p.status === "approved").length / 6) * 100}%`, background: C.accent.green, borderRadius: 3 }} />
//               </div>
//             </div>
//           </Card>
          
//           <Card>
//             <Title level={4}>Step 3: Course Details</Title>
//             <div style={{ marginBottom: 16 }}>
//               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
//                 <span style={{ color: C.text.secondary }}>Submitted</span>
//                 <span style={{ color: C.text.primary }}>{AppState.courseDetails.length} courses</span>
//               </div>
//             </div>
//             <div>
//               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
//                 <span style={{ color: C.text.secondary }}>Coordinator Approved</span>
//                 <span style={{ color: C.text.primary }}>{AppState.courseDetails.filter(c => c.coordinatorStatus === "approved").length} courses</span>
//               </div>
//               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
//                 <span style={{ color: C.text.secondary }}>Dean Approved</span>
//                 <span style={{ color: C.text.primary }}>{AppState.courseDetails.filter(c => c.deanStatus === "approved").length} courses</span>
//               </div>
//             </div>
//           </Card>
//         </div>
        
//         <Card>
//           <Title level={4}>Step 4: Timetable Generation</Title>
//           {AppState.timetable.length > 0 ? (
//             <div>
//               <p style={{ color: C.accent.green, marginBottom: 12 }}>✓ Timetable generated with {AppState.timetable.length} slots</p>
//               <Button onClick={() => setActive("timetable")} variant="primary">
//                 View Timetable
//               </Button>
//             </div>
//           ) : (
//             <p style={{ color: C.text.tertiary }}>Waiting for dean's approval before generation...</p>
//           )}
//         </Card>
//       </div>
//     ),
//   };
  
//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
//       <Sidebar navItems={COORD_NAV} active={active} setActive={setActive} collapsed={collapsed} setCollapsed={setCollapsed} user={user} badges={{ preferences: pendingPrefs, courses: pendingCourses }} accentColor={C.accent.blue} />
//       <main style={{ flex: 1, overflow: "auto" }}>
//         <header style={{
//           background: C.nav,
//           borderBottom: `1px solid ${C.navBorder}`,
//           padding: "16px 32px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           position: "sticky",
//           top: 0,
//           zIndex: 10,
//         }}>
//           <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>{COORD_NAV.find(n => n.id === active)?.label}</h2>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             {(pendingPrefs > 0 || pendingCourses > 0) && (
//               <Badge variant="warning">
//                 {pendingPrefs + pendingCourses} pending
//               </Badge>
//             )}
//             <div style={{
//               width: 40,
//               height: 40,
//               borderRadius: "50%",
//               background: C.accent.blueBg,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: C.accent.blue,
//               fontWeight: 700,
//             }}>
//               {user?.avatar}
//             </div>
//           </div>
//         </header>
//         <div style={{ padding: 32 }}>{panels[active]}</div>
//       </main>
//     </div>
//   );
// }

// // ════════════════════════════════════════════════════════════════════════════
// //  FACULTY DASHBOARD
// // ════════════════════════════════════════════════════════════════════════════
// function FacultyDashboard() {
//   const { user } = useAuth();
//   const [active, setActive] = useState("forms");
//   const [collapsed, setCollapsed] = useState(false);
//   const [refresh, setRefresh] = useState(0);
  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRefresh(r => r + 1);
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const faculty = AppState.faculty.find(f => f.id === user.id);
//   const preference = AppState.getPreferenceByFacultyId(user.id);
//   const courseDetails = AppState.getCourseDetailsByFacultyId(user.id);
//   const schedule = AppState.getFacultySchedule(user.id);
  
//   const preferenceApproved = preference?.status === "approved";
//   const coordinatorApproved = courseDetails.length > 0 && courseDetails.every(c => c.coordinatorStatus === "approved");
//   const deanApproved = courseDetails.length > 0 && courseDetails.every(c => c.deanStatus === "approved");
  
//   const forceUpdate = () => {
//     setRefresh(r => r + 1);
//     window.dispatchEvent(new Event('storage'));
//   };
  
//   const FAC_NAV = [
//     { id: "forms", icon: "📝", label: "Preference Forms" },
//     { id: "status", icon: "📊", label: "Submission Status" },
//     { id: "syllabus", icon: "📚", label: "Syllabus Tracker" },
//     { id: "schedule", icon: "📅", label: "My Schedule" },
//     { id: "profile", icon: "👤", label: "Profile" },
//   ];
  
//   const panels = {
//     forms: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//         <Title>Faculty Onboarding Forms - {faculty.course}</Title>
        
//         {!preference?.submitted && (
//           <FacultySubjectPreferenceForm faculty={faculty} onComplete={forceUpdate} />
//         )}
        
//         {preference?.submitted && preference?.status === "pending" && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.goldBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ⏳
//               </div>
//               <div>
//                 <h4 style={{ color: C.text.primary, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Subject Preferences Submitted</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Waiting for coordinator review and conflict resolution.</p>
//                 {preference.feedback && (
//                   <p style={{ color: C.accent.gold, fontSize: 13, marginTop: 8 }}>Feedback: {preference.feedback}</p>
//                 )}
//               </div>
//             </div>
//           </Card>
//         )}
        
//         {preference?.status === "rejected" && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.redBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ✗
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.red, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Subject Preferences Rejected</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Please revise and resubmit.</p>
//                 {preference.feedback && (
//                   <p style={{ color: C.accent.red, fontSize: 13, marginTop: 8 }}>Feedback: {preference.feedback}</p>
//                 )}
//               </div>
//             </div>
//             <Button onClick={() => { AppState.resetPreferenceForm(faculty.id); forceUpdate(); }} variant="primary" fullWidth>
//               Resubmit Preferences
//             </Button>
//           </Card>
//         )}
        
//         {preferenceApproved && preference.allocatedSubjects && courseDetails.length === 0 && (
//           <FacultyDetailedCourseForm 
//             faculty={faculty} 
//             allocatedSubjects={preference.allocatedSubjects} 
//             onComplete={forceUpdate} 
//           />
//         )}
        
//         {preferenceApproved && courseDetails.length > 0 && !coordinatorApproved && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.goldBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ⏳
//               </div>
//               <div>
//                 <h4 style={{ color: C.text.primary, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Detailed Course Information Submitted</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Waiting for coordinator review.</p>
//               </div>
//             </div>
//           </Card>
//         )}
        
//         {coordinatorApproved && !deanApproved && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.goldBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ⏳
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.blue, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Coordinator Approved</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Waiting for Dean's final approval.</p>
//               </div>
//             </div>
//           </Card>
//         )}
        
//         {deanApproved && (
//           <Card>
//             <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//               <div style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 background: C.accent.greenBg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 30,
//               }}>
//                 ✓
//               </div>
//               <div>
//                 <h4 style={{ color: C.accent.green, fontWeight: 600, fontSize: 18, marginBottom: 4 }}>All Forms Approved by Dean!</h4>
//                 <p style={{ color: C.text.secondary, fontSize: 14 }}>Your schedule has been generated. Use the Syllabus Tracker to update module completion.</p>
//               </div>
//             </div>
//           </Card>
//         )}
//       </div>
//     ),
    
//     status: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//         <Title>Submission Status - {faculty.course}</Title>
        
//         <Card>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//             <span style={{ color: C.text.primary, fontWeight: 600 }}>Subject Preferences</span>
//             <Badge variant={preference?.status === "approved" ? "success" : preference?.status === "pending" ? "warning" : "danger"}>
//               {preference?.status || "Not Submitted"}
//             </Badge>
//           </div>
//           {preference?.submitted && (
//             <div>
//               {preference.preferences.map(p => {
//                 const subject = AppState.subjects.find(s => s.id === p.subjectId);
//                 return (
//                   <div key={p.level} style={{
//                     padding: "8px 12px",
//                     background: C.cardHover,
//                     borderRadius: 8,
//                     marginBottom: 4,
//                   }}>
//                     <span style={{ color: p.level === 1 ? C.accent.gold : p.level === 2 ? C.accent.blue : C.accent.green }}>
//                       Preference {p.level}:
//                     </span>
//                     <span style={{ color: C.text.primary, marginLeft: 8 }}>{subject?.name}</span>
//                   </div>
//                 );
//               })}
//               {preference.allocatedSubjects && (
//                 <div style={{ marginTop: 12, padding: "8px 12px", background: C.cardHover, borderRadius: 8 }}>
//                   <span style={{ color: C.accent.green }}>Allocated: </span>
//                   <span style={{ color: C.text.primary }}>
//                     {preference.allocatedSubjects.map(id => {
//                       const s = AppState.subjects.find(sub => sub.id === id);
//                       return s?.name;
//                     }).join(", ")}
//                   </span>
//                 </div>
//               )}
//             </div>
//           )}
//         </Card>
        
//         <Card>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//             <span style={{ color: C.text.primary, fontWeight: 600 }}>Detailed Course Information</span>
//             {courseDetails.length > 0 ? (
//               <div style={{ display: "flex", gap: 8 }}>
//                 <Badge variant={courseDetails.every(c => c.coordinatorStatus === "approved") ? "success" : "warning"}>
//                   Coordinator: {courseDetails.every(c => c.coordinatorStatus === "approved") ? "Approved" : "Pending"}
//                 </Badge>
//                 <Badge variant={courseDetails.every(c => c.deanStatus === "approved") ? "success" : "warning"}>
//                   Dean: {courseDetails.every(c => c.deanStatus === "approved") ? "Approved" : "Pending"}
//                 </Badge>
//               </div>
//             ) : (
//               <Badge variant="danger">Locked</Badge>
//             )}
//           </div>
//           {courseDetails.map(c => (
//             <div key={c.id} style={{
//               padding: "12px",
//               background: C.cardHover,
//               borderRadius: 8,
//               marginBottom: 8,
//             }}>
//               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
//                 <span style={{ color: C.accent.blue, fontWeight: 500 }}>{c.subjectName}</span>
//                 <div style={{ display: "flex", gap: 8 }}>
//                   <Badge variant={c.coordinatorStatus === "approved" ? "success" : c.coordinatorStatus === "pending" ? "warning" : "danger"}>
//                     {c.coordinatorStatus}
//                   </Badge>
//                   <Badge variant={c.deanStatus === "approved" ? "success" : c.deanStatus === "pending" ? "warning" : "danger"}>
//                     {c.deanStatus}
//                   </Badge>
//                 </div>
//               </div>
//               <div style={{ display: "flex", gap: 16, fontSize: 12, color: C.text.tertiary }}>
//                 <span>{c.credits} Credits</span>
//                 <span>{c.modules} Modules</span>
//                 <span>Semester {c.semester}</span>
//               </div>
//             </div>
//           ))}
//         </Card>
//       </div>
//     ),
    
//     syllabus: <FacultySyllabusTracker faculty={faculty} />,
    
//     schedule: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//         <Title>My Weekly Schedule</Title>
//         {schedule.length === 0 ? (
//           <Card>
//             <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>
//               {deanApproved ? "Schedule being generated..." : "Complete all forms and wait for dean's approval to see your schedule"}
//             </p>
//           </Card>
//         ) : (
//           <WeeklyTimetableView schedule={schedule} title={`${faculty.name} - ${faculty.course}`} />
//         )}
//       </div>
//     ),
    
//     profile: (
//       <Card>
//         <Title level={4}>Faculty Profile</Title>
//         <div style={{ display: "flex", gap: 32, alignItems: "center", marginTop: 20 }}>
//           <div style={{
//             width: 100,
//             height: 100,
//             borderRadius: "50%",
//             background: `${faculty.color}20`,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: 36,
//             fontWeight: 700,
//             color: faculty.color,
//           }}>
//             {faculty.avatar}
//           </div>
//           <div>
//             <h3 style={{ color: C.text.primary, fontSize: 24, fontWeight: 600, marginBottom: 8 }}>{faculty.name}</h3>
//             <p style={{ color: C.accent.blue, fontSize: 15, marginBottom: 4 }}>ID: {faculty.facultyId}</p>
//             <p style={{ color: C.accent.blue, fontSize: 15, marginBottom: 4 }}>{faculty.designation}</p>
//             <p style={{ color: C.text.secondary, fontSize: 14, marginBottom: 4 }}>Course: {faculty.course}</p>
//             <p style={{ color: C.text.secondary, fontSize: 14 }}>Specialization: {faculty.specialization}</p>
//           </div>
//         </div>
//       </Card>
//     ),
//   };

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
//       <Sidebar navItems={FAC_NAV} active={active} setActive={setActive} collapsed={collapsed} setCollapsed={setCollapsed} user={user} badges={{ forms: preference?.status === "pending" ? 1 : 0 }} accentColor={C.accent.blue} />
//       <main style={{ flex: 1, overflow: "auto" }}>
//         <header style={{
//           background: C.nav,
//           borderBottom: `1px solid ${C.navBorder}`,
//           padding: "16px 32px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           position: "sticky",
//           top: 0,
//           zIndex: 10,
//         }}>
//           <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>{FAC_NAV.find(n => n.id === active)?.label}</h2>
//           <Badge variant={preference?.status === "approved" ? "success" : preference?.status === "pending" ? "warning" : "danger"}>
//             {preference?.status === "approved" ? "Approved" : preference?.status === "pending" ? "Pending" : "Not Started"}
//           </Badge>
//         </header>
//         <div style={{ padding: 32 }}>{panels[active]}</div>
//       </main>
//     </div>
//   );
// }

// // ════════════════════════════════════════════════════════════════════════════
// //  ADMIN DASHBOARD (DEAN)
// // ════════════════════════════════════════════════════════════════════════════
// function AdminDashboard() {
//   const { user } = useAuth();
//   const [active, setActive] = useState("overview");
//   const [collapsed, setCollapsed] = useState(false);
//   const [refresh, setRefresh] = useState(0);
  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRefresh(r => r + 1);
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);
  
//   const pendingDeanApprovals = AppState.getPendingDeanApprovals().length;
//   const flaggedIssues = AppState.getFlaggedIssues().length;
  
//   const ADMIN_NAV = [
//     { id: "overview", icon: "📊", label: "Overview" },
//     { id: "approvals", icon: "✅", label: "Course Approvals" },
//     { id: "timetable", icon: "📅", label: "Timetable" },
//     { id: "issues", icon: "⚠", label: "Flagged Issues" },
//   ];
  
//   const panels = {
//     overview: (
//       <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//         <Title>Dean's Dashboard - SoCSE</Title>
        
//         <Card>
//           <Title level={4}>System Overview</Title>
//           <p style={{ color: C.text.primary, marginBottom: 16 }}>Welcome, {user?.name}</p>
          
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
//             <div>
//               <h5 style={{ color: C.accent.blue, marginBottom: 12 }}>Configuration</h5>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Days: Mon-Fri</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Class Duration: {AppState.timetableConfig.classDuration} min</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Break: {AppState.timetableConfig.breakDuration} min</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Lunch: {AppState.timetableConfig.lunchBreak.duration} min</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>• Sections: 3 (A, B, C)</p>
//               <p style={{ color: C.text.secondary }}>• Rooms: {AppState.rooms.length}</p>
//             </div>
            
//             <div>
//               <h5 style={{ color: C.accent.blue, marginBottom: 12 }}>Workflow Status</h5>
//               <p style={{ color: C.accent.green, marginBottom: 8 }}>✓ All systems operational</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>Preferences: {AppState.subjectPreferences.filter(p => p.status === "approved").length}/6 approved</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>Coordinator Approved: {AppState.courseDetails.filter(c => c.coordinatorStatus === "approved").length} courses</p>
//               <p style={{ color: C.text.secondary, marginBottom: 4 }}>Dean Approved: {AppState.courseDetails.filter(c => c.deanStatus === "approved").length} courses</p>
//               <p style={{ color: C.text.secondary }}>Timetable: {AppState.timetable.length} slots</p>
//             </div>
//           </div>
//         </Card>
        
//         <Card>
//           <Title level={4}>Semester Configuration Status</Title>
//           {COURSES.map(course => {
//             const semestersConfigured = SEMESTERS.filter(s => 
//               AppState.semesterDetails[course]?.[s]
//             ).length;
            
//             return (
//               <div key={course} style={{ marginBottom: 16 }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
//                   <span style={{ color: C.text.primary, fontWeight: 500 }}>{course}</span>
//                   <span style={{ color: semestersConfigured === 2 ? C.accent.green : C.accent.red }}>
//                     {semestersConfigured}/2 semesters
//                   </span>
//                 </div>
//                 <div style={{ height: 6, background: C.border, borderRadius: 3 }}>
//                   <div style={{
//                     height: "100%",
//                     width: `${(semestersConfigured / 2) * 100}%`,
//                     background: semestersConfigured === 2 ? C.accent.green : C.accent.red,
//                     borderRadius: 3,
//                   }} />
//                 </div>
//               </div>
//             );
//           })}
//         </Card>
//       </div>
//     ),
    
//     approvals: <DeanCourseDetailsReview />,
//     timetable: <CoordinatorTimetableView />,
//     issues: <AdminFlaggedIssuesPanel />,
//   };
  
//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
//       <Sidebar navItems={ADMIN_NAV} active={active} setActive={setActive} collapsed={collapsed} setCollapsed={setCollapsed} user={user} badges={{ approvals: pendingDeanApprovals, issues: flaggedIssues }} accentColor={C.accent.gold} />
//       <main style={{ flex: 1, overflow: "auto" }}>
//         <header style={{
//           background: C.nav,
//           borderBottom: `1px solid ${C.navBorder}`,
//           padding: "16px 32px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}>
//           <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>Dean's Portal</h2>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             {pendingDeanApprovals > 0 && (
//               <Badge variant="warning">
//                 {pendingDeanApprovals} pending approvals
//               </Badge>
//             )}
//             {flaggedIssues > 0 && (
//               <Badge variant="danger">
//                 {flaggedIssues} flagged issues
//               </Badge>
//             )}
//             <div style={{
//               width: 40,
//               height: 40,
//               borderRadius: "50%",
//               background: C.accent.goldBg,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: C.accent.gold,
//               fontWeight: 700,
//             }}>
//               {user?.avatar}
//             </div>
//           </div>
//         </header>
//         <div style={{ padding: 32 }}>{panels[active]}</div>
//       </main>
//     </div>
//   );
// }

// // ════════════════════════════════════════════════════════════════════════════
// //  ROOT ROUTER
// // ════════════════════════════════════════════════════════════════════════════
// function AppRouter() {
//   const { route } = useRouter();
//   const { user } = useAuth();

//   if (!user && route !== "login") {
//     localStorage.setItem('acadplan_route', 'login');
//     return <LoginPage />;
//   }

//   if (user) {
//     localStorage.setItem('acadplan_user', JSON.stringify(user));
    
//     if (route === "login" || !route) {
//       const targetRoute = user.role === "admin" ? "admin" : 
//                           user.role === "coordinator" ? "coordinator" : 
//                           user.role === "faculty" ? "faculty" : "student";
//       localStorage.setItem('acadplan_route', targetRoute);
      
//       switch(targetRoute) {
//         case "faculty": return <FacultyDashboard />;
//         case "coordinator": return <CoordinatorDashboard />;
//         case "admin": return <AdminDashboard />;
//         case "student": return <StudentDashboard />;
//         default: return <LoginPage />;
//       }
//     }
//   }

//   switch(route) {
//     case "faculty": return <FacultyDashboard />;
//     case "coordinator": return <CoordinatorDashboard />;
//     case "admin": return <AdminDashboard />;
//     case "student": return <StudentDashboard />;
//     default: return <LoginPage />;
//   }
// }

// // ════════════════════════════════════════════════════════════════════════════
// //  APP ENTRY POINT
// // ════════════════════════════════════════════════════════════════════════════
// export default function AcadPlanApp() {
//   return (
//     <RouterProvider>
//       <AuthProvider>
//         <AppRouter />
//       </AuthProvider>
//     </RouterProvider>
//   );
// }