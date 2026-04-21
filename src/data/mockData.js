// // // src/data/mockData.js - Update the MOCK_USERS array
// // export const MOCK_USERS = [
// //   { id: 1, email: "dean@university.edu", password: "dean123", role: "admin", name: "Dr. Aravind Sharma", avatar: "AS", school: "Central Administration", passwordChanged: true },
// //   { id: 2, email: "coordinator@university.edu", password: "coord123", role: "coordinator", name: "Prof. Meera Nair", avatar: "MN", school: "Timetable Office", passwordChanged: true },
// //   { id: 3, email: "rahul@university.edu", password: "faculty123", role: "faculty", name: "Dr. Rahul Krishnan", avatar: "RK", school: "SoCSE", designation: "Assistant Professor", course: "BTech", passwordChanged: true },
// //   { id: 4, email: "anita@university.edu", password: "faculty123", role: "faculty", name: "Dr. Anita Roy", avatar: "AR", school: "SoCSE", designation: "Assistant Professor", course: "BSc", passwordChanged: true },
// //   { id: 5, email: "suresh@university.edu", password: "faculty123", role: "faculty", name: "Prof. Suresh Kumar", avatar: "SK", school: "SoCSE", designation: "Professor", course: "BCA", passwordChanged: true },
// //   { id: 6, email: "priya@university.edu", password: "faculty123", role: "faculty", name: "Dr. Priya Iyer", avatar: "PI", school: "SoCSE", designation: "Associate Professor", course: "BTech", passwordChanged: true },
// //   { id: 7, email: "vikram@university.edu", password: "faculty123", role: "faculty", name: "Dr. Vikram Singh", avatar: "VS", school: "SoCSE", designation: "Assistant Professor", course: "BSc", passwordChanged: true },
// //   { id: 8, email: "deepa@university.edu", password: "faculty123", role: "faculty", name: "Prof. Deepa Nair", avatar: "DN", school: "SoCSE", designation: "Professor", course: "BCA", passwordChanged: true },
// //   { id: 9, email: "student.btech@university.edu", password: "student123", role: "student", name: "Rohan Mehta", avatar: "RM", course: "BTech", semester: 1, section: "A", passwordChanged: true },
// //   { id: 10, email: "student.bsc@university.edu", password: "student123", role: "student", name: "Priya Sharma", avatar: "PS", course: "BSc", semester: 1, section: "B", passwordChanged: true },
// //   { id: 11, email: "student.bca@university.edu", password: "student123", role: "student", name: "Arjun Kumar", avatar: "AK", course: "BCA", semester: 2, section: "C", passwordChanged: true },
// //   { id: 12, email: "director@university.edu", password: "director123", role: "director", name: "Prof. Rajesh Menon", avatar: "RM", school: "School of CSE", passwordChanged: true },
// // ];

// // export const COURSES = ["BTech", "BSc", "BCA"];
// // export const SEMESTERS = [1, 2];
// // export const SECTIONS = ["A", "B", "C"];

// // export const WORKLOAD_LIMITS = {
// //   "Assistant Professor": 14,
// //   "Associate Professor": 12,
// //   "Professor": 10,
// // };

// // export const DEFAULT_FACULTY = [
// //   { id: 3, facultyId: "FAC001", name: "Dr. Rahul Krishnan", avatar: "RK", dept: "CSE", designation: "Assistant Professor", specialization: "Data Structures, Algorithms, DBMS", course: "BTech", maxHours: 14, assignedHours: 0, remainingHours: 14, preferences: [], color: "#4361ee" },
// //   { id: 4, facultyId: "FAC002", name: "Dr. Anita Roy", avatar: "AR", dept: "CSE", designation: "Assistant Professor", specialization: "Operating Systems, Computer Networks", course: "BSc", maxHours: 14, assignedHours: 0, remainingHours: 14, preferences: [], color: "#06d6a0" },
// //   { id: 5, facultyId: "FAC003", name: "Prof. Suresh Kumar", avatar: "SK", dept: "CSE", designation: "Professor", specialization: "Mathematics, Discrete Structures", course: "BCA", maxHours: 10, assignedHours: 0, remainingHours: 10, preferences: [], color: "#ffb703" },
// //   { id: 6, facultyId: "FAC004", name: "Dr. Priya Iyer", avatar: "PI", dept: "CSE", designation: "Associate Professor", specialization: "Machine Learning, Python, AI", course: "BTech", maxHours: 12, assignedHours: 0, remainingHours: 12, preferences: [], color: "#9d4edd" },
// //   { id: 7, facultyId: "FAC005", name: "Dr. Vikram Singh", avatar: "VS", dept: "CSE", designation: "Assistant Professor", specialization: "Web Development, JavaScript, React", course: "BSc", maxHours: 14, assignedHours: 0, remainingHours: 14, preferences: [], color: "#e3646b" },
// //   { id: 8, facultyId: "FAC006", name: "Prof. Deepa Nair", avatar: "DN", dept: "CSE", designation: "Professor", specialization: "Software Engineering, Project Management", course: "BCA", maxHours: 10, assignedHours: 0, remainingHours: 10, preferences: [], color: "#6b705c" },
// // ];

// // export const DEFAULT_SUBJECTS = [
// //   { id: "BT101", code: "BT101", name: "Data Structures", dept: "CSE", course: "BTech", semester: 1, credits: 4, modules: 5, type: "Both", theoryCredits: 3, labCredits: 1, theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5 },
// //   { id: "BT102", code: "BT102", name: "Algorithms", dept: "CSE", course: "BTech", semester: 1, credits: 4, modules: 5, type: "Theory", theoryCredits: 4, labCredits: 0, theoryClassesPerWeek: 4, labPeriodsPerWeek: 0, totalWeeklyClasses: 4 },
// //   { id: "BT103", code: "BT103", name: "DBMS", dept: "CSE", course: "BTech", semester: 1, credits: 3, modules: 4, type: "Both", theoryCredits: 2, labCredits: 1, theoryClassesPerWeek: 2, labPeriodsPerWeek: 2, totalWeeklyClasses: 4 },
// //   { id: "BT201", code: "BT201", name: "Operating Systems", dept: "CSE", course: "BTech", semester: 2, credits: 3, modules: 4, type: "Theory", theoryCredits: 3, labCredits: 0, theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3 },
// //   { id: "BT202", code: "BT202", name: "Computer Networks", dept: "CSE", course: "BTech", semester: 2, credits: 3, modules: 4, type: "Both", theoryCredits: 2, labCredits: 1, theoryClassesPerWeek: 2, labPeriodsPerWeek: 2, totalWeeklyClasses: 4 },
// //   { id: "BT203", code: "BT203", name: "Machine Learning", dept: "CSE", course: "BTech", semester: 2, credits: 4, modules: 5, type: "Both", theoryCredits: 3, labCredits: 1, theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5 },
// //   { id: "BS101", code: "BS101", name: "Mathematics I", dept: "CSE", course: "BSc", semester: 1, credits: 3, modules: 4, type: "Theory", theoryCredits: 3, labCredits: 0, theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3 },
// //   { id: "BS102", code: "BS102", name: "Programming Fundamentals", dept: "CSE", course: "BSc", semester: 1, credits: 4, modules: 5, type: "Both", theoryCredits: 3, labCredits: 1, theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5 },
// //   { id: "BS103", code: "BS103", name: "Discrete Mathematics", dept: "CSE", course: "BSc", semester: 1, credits: 3, modules: 4, type: "Theory", theoryCredits: 3, labCredits: 0, theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3 },
// //   { id: "BS201", code: "BS201", name: "Data Analysis", dept: "CSE", course: "BSc", semester: 2, credits: 3, modules: 4, type: "Both", theoryCredits: 2, labCredits: 1, theoryClassesPerWeek: 2, labPeriodsPerWeek: 2, totalWeeklyClasses: 4 },
// //   { id: "BS202", code: "BS202", name: "Web Technologies", dept: "CSE", course: "BSc", semester: 2, credits: 4, modules: 5, type: "Both", theoryCredits: 3, labCredits: 1, theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5 },
// //   { id: "BS203", code: "BS203", name: "Database Systems", dept: "CSE", course: "BSc", semester: 2, credits: 3, modules: 4, type: "Both", theoryCredits: 2, labCredits: 1, theoryClassesPerWeek: 2, labPeriodsPerWeek: 2, totalWeeklyClasses: 4 },
// //   { id: "BC101", code: "BC101", name: "Introduction to Programming", dept: "CSE", course: "BCA", semester: 1, credits: 3, modules: 4, type: "Both", theoryCredits: 2, labCredits: 1, theoryClassesPerWeek: 2, labPeriodsPerWeek: 2, totalWeeklyClasses: 4 },
// //   { id: "BC102", code: "BC102", name: "Computer Fundamentals", dept: "CSE", course: "BCA", semester: 1, credits: 2, modules: 3, type: "Theory", theoryCredits: 2, labCredits: 0, theoryClassesPerWeek: 2, labPeriodsPerWeek: 0, totalWeeklyClasses: 2 },
// //   { id: "BC103", code: "BC103", name: "Mathematics for Computing", dept: "CSE", course: "BCA", semester: 1, credits: 3, modules: 4, type: "Theory", theoryCredits: 3, labCredits: 0, theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3 },
// //   { id: "BC201", code: "BC201", name: "Object Oriented Programming", dept: "CSE", course: "BCA", semester: 2, credits: 4, modules: 5, type: "Both", theoryCredits: 3, labCredits: 1, theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5 },
// //   { id: "BC202", code: "BC202", name: "Data Structures using C++", dept: "CSE", course: "BCA", semester: 2, credits: 4, modules: 5, type: "Both", theoryCredits: 3, labCredits: 1, theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5 },
// //   { id: "BC203", code: "BC203", name: "Software Engineering", dept: "CSE", course: "BCA", semester: 2, credits: 3, modules: 4, type: "Theory", theoryCredits: 3, labCredits: 0, theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3 },
// // ];

// // export const DEFAULT_SUBJECT_PREFERENCES = [
// //   { id: 1, facultyId: 3, facultyName: "Dr. Rahul Krishnan", avatar: "RK", status: "pending", submitted: false, feedback: "", preferences: [] },
// //   { id: 2, facultyId: 4, facultyName: "Dr. Anita Roy", avatar: "AR", status: "pending", submitted: false, feedback: "", preferences: [] },
// //   { id: 3, facultyId: 5, facultyName: "Prof. Suresh Kumar", avatar: "SK", status: "pending", submitted: false, feedback: "", preferences: [] },
// //   { id: 4, facultyId: 6, facultyName: "Dr. Priya Iyer", avatar: "PI", status: "pending", submitted: false, feedback: "", preferences: [] },
// //   { id: 5, facultyId: 7, facultyName: "Dr. Vikram Singh", avatar: "VS", status: "pending", submitted: false, feedback: "", preferences: [] },
// //   { id: 6, facultyId: 8, facultyName: "Prof. Deepa Nair", avatar: "DN", status: "pending", submitted: false, feedback: "", preferences: [] },
// // ];

// // export const DEFAULT_ROOMS = [
// //   { id: "R001", name: "Hall 201", type: "Theory", capacity: 60 },
// //   { id: "R002", name: "Hall 202", type: "Theory", capacity: 60 },
// //   { id: "R003", name: "Hall 203", type: "Theory", capacity: 60 },
// //   { id: "R004", name: "Hall 301", type: "Theory", capacity: 50 },
// //   { id: "R005", name: "Hall 302", type: "Theory", capacity: 50 },
// //   { id: "R006", name: "Hall 303", type: "Theory", capacity: 50 },
// //   { id: "R007", name: "Lab 1", type: "Lab", capacity: 30 },
// //   { id: "R008", name: "Lab 2", type: "Lab", capacity: 30 },
// //   { id: "R009", name: "Lab 3", type: "Lab", capacity: 30 },
// //   { id: "R010", name: "Lab 4", type: "Lab", capacity: 30 },
// // ];

// // export const DEFAULT_TIMETABLE_CONFIG = {
// //   startTime: "09:10",
// //   endTime: "15:50",
// //   classDuration: 50,
// //   breakDuration: 10,
// //   lunchBreak: { start: "12:30", duration: 40 },
// //   days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
// // };

// // export const DEFAULT_SEMESTER_DETAILS = {
// //   BTech: {
// //     1: { subjects: ["BT101", "BT102", "BT103"], defaultFaculty: { "BT101": 3, "BT102": 6, "BT103": 3 } },
// //     2: { subjects: ["BT201", "BT202", "BT203"], defaultFaculty: { "BT201": 6, "BT202": 3, "BT203": 6 } }
// //   },
// //   BSc: {
// //     1: { subjects: ["BS101", "BS102", "BS103"], defaultFaculty: { "BS101": 5, "BS102": 4, "BS103": 5 } },
// //     2: { subjects: ["BS201", "BS202", "BS203"], defaultFaculty: { "BS201": 7, "BS202": 7, "BS203": 4 } }
// //   },
// //   BCA: {
// //     1: { subjects: ["BC101", "BC102", "BC103"], defaultFaculty: { "BC101": 8, "BC102": 5, "BC103": 8 } },
// //     2: { subjects: ["BC201", "BC202", "BC203"], defaultFaculty: { "BC201": 8, "BC202": 7, "BC203": 8 } }
// //   }
// // };

// // export const DEFAULT_CALENDAR_EVENTS = [
// //   { id: 1, title: "Semester Begins", date: "2025-01-10", type: "academic" },
// //   { id: 2, title: "Mid-Semester Exams", date: "2025-03-01", type: "exam" },
// //   { id: 3, title: "End Semester Exams", date: "2025-05-15", type: "exam" },
// //   { id: 4, title: "Timetable Release", date: "2025-01-05", type: "admin" },
// // ];

// // src/data/mockData.js

// // Mock Users with passwordChanged flag
// // src/data/mockData.js

// // Mock Users with passwordChanged flag
// export const MOCK_USERS = [
//   { id: 1, email: "dean@university.edu", password: "dean123", role: "admin", name: "Dr. Aravind Sharma", avatar: "AS", school: "Central Administration", passwordChanged: true },
//   { id: 2, email: "coordinator@university.edu", password: "coord123", role: "coordinator", name: "Prof. Meera Nair", avatar: "MN", school: "Timetable Office", passwordChanged: true },
//   { id: 3, email: "rahul@university.edu", password: "faculty123", role: "faculty", name: "Dr. Rahul Krishnan", avatar: "RK", school: "SoCSE", designation: "Assistant Professor", course: "BTech", email: "rahul@university.edu", passwordChanged: true },
//   { id: 4, email: "anita@university.edu", password: "faculty123", role: "faculty", name: "Dr. Anita Roy", avatar: "AR", school: "SoCSE", designation: "Assistant Professor", course: "BSc", email: "anita@university.edu", passwordChanged: true },
//   { id: 5, email: "suresh@university.edu", password: "faculty123", role: "faculty", name: "Prof. Suresh Kumar", avatar: "SK", school: "SoCSE", designation: "Professor", course: "BCA", email: "suresh@university.edu", passwordChanged: true },
//   { id: 6, email: "priya@university.edu", password: "faculty123", role: "faculty", name: "Dr. Priya Iyer", avatar: "PI", school: "SoCSE", designation: "Associate Professor", course: "BTech", email: "priya@university.edu", passwordChanged: true },
//   { id: 7, email: "vikram@university.edu", password: "faculty123", role: "faculty", name: "Dr. Vikram Singh", avatar: "VS", school: "SoCSE", designation: "Assistant Professor", course: "BSc", email: "vikram@university.edu", passwordChanged: true },
//   { id: 8, email: "deepa@university.edu", password: "faculty123", role: "faculty", name: "Prof. Deepa Nair", avatar: "DN", school: "SoCSE", designation: "Professor", course: "BCA", email: "deepa@university.edu", passwordChanged: true },
//   { id: 9, email: "student.btech@university.edu", password: "student123", role: "student", name: "Rohan Mehta", avatar: "RM", course: "BTech", semester: 1, section: "A", passwordChanged: true },
//   { id: 10, email: "student.bsc@university.edu", password: "student123", role: "student", name: "Priya Sharma", avatar: "PS", course: "BSc", semester: 1, section: "B", passwordChanged: true },
//   { id: 11, email: "student.bca@university.edu", password: "student123", role: "student", name: "Arjun Kumar", avatar: "AK", course: "BCA", semester: 2, section: "C", passwordChanged: true },
//   { id: 12, email: "director@university.edu", password: "director123", role: "director", name: "Prof. Rajesh Menon", avatar: "RM", school: "School of CSE", passwordChanged: true },
// ];

// // Courses, Semesters, Sections
// export const COURSES = ["BTech", "BSc", "BCA"];
// export const SEMESTERS = [1, 2];
// export const SECTIONS = ["A", "B", "C"];

// // Exam Types and Subject Types
// export const EXAM_TYPES = ["SEE", "Practical", "Seminar"];
// export const SUBJECT_TYPES = ["Core", "Major", "Minor"];

// // Workload Limits based on designation
// export const WORKLOAD_LIMITS = {
//   "Assistant Professor": 14,
//   "Associate Professor": 12,
//   "Professor": 10,
// };

// // Default Faculty Data
// export const DEFAULT_FACULTY = [
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
//     color: "#4361ee",
//     email: "rahul@university.edu"
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
//     color: "#06d6a0",
//     email: "anita@university.edu"
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
//     color: "#ffb703",
//     email: "suresh@university.edu"
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
//     color: "#9d4edd",
//     email: "priya@university.edu"
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
//     color: "#e3646b",
//     email: "vikram@university.edu"
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
//     color: "#6b705c",
//     email: "deepa@university.edu"
//   },
// ];

// // Default Subjects with Core, Major, Minor classification
// export const DEFAULT_SUBJECTS = [
//   // ========== BTECH SEMESTER 1 ==========
//   // Core Subjects
//   { 
//     id: "BT101", code: "BT101", name: "Data Structures", dept: "CSE", course: "BTech", semester: 1,
//     credits: 4, modules: 5, type: "Both", theoryCredits: 3, labCredits: 1,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Core"
//   },
//   { 
//     id: "BT102", code: "BT102", name: "Algorithms", dept: "CSE", course: "BTech", semester: 1,
//     credits: 4, modules: 5, type: "Theory", theoryCredits: 4, labCredits: 0,
//     theoryClassesPerWeek: 4, labPeriodsPerWeek: 0, totalWeeklyClasses: 4,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Core"
//   },
//   { 
//     id: "BT103", code: "BT103", name: "Database Management Systems", dept: "CSE", course: "BTech", semester: 1,
//     credits: 3, modules: 4, type: "Both", theoryCredits: 2, labCredits: 1,
//     theoryClassesPerWeek: 2, labPeriodsPerWeek: 2, totalWeeklyClasses: 4,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Core"
//   },
//   // Major Subjects - BTech Sem 1
//   { 
//     id: "BT104", code: "BT104", name: "Advanced Data Structures", dept: "CSE", course: "BTech", semester: 1,
//     credits: 4, modules: 5, type: "Both", theoryCredits: 3, labCredits: 1,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Major"
//   },
//   { 
//     id: "BT105", code: "BT105", name: "Object Oriented Programming", dept: "CSE", course: "BTech", semester: 1,
//     credits: 4, modules: 5, type: "Both", theoryCredits: 3, labCredits: 1,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "Practical", subjectType: "Major"
//   },
//   // Minor Subjects - BTech Sem 1
//   { 
//     id: "BT106", code: "BT106", name: "Discrete Mathematics", dept: "CSE", course: "BTech", semester: 1,
//     credits: 3, modules: 4, type: "Theory", theoryCredits: 3, labCredits: 0,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Minor"
//   },
//   { 
//     id: "BT107", code: "BT107", name: "Digital Logic Design", dept: "CSE", course: "BTech", semester: 1,
//     credits: 3, modules: 4, type: "Theory", theoryCredits: 3, labCredits: 0,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Minor"
//   },

//   // ========== BTECH SEMESTER 2 ==========
//   // Core Subjects
//   { 
//     id: "BT201", code: "BT201", name: "Operating Systems", dept: "CSE", course: "BTech", semester: 2,
//     credits: 3, modules: 4, type: "Theory", theoryCredits: 3, labCredits: 0,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Core"
//   },
//   { 
//     id: "BT202", code: "BT202", name: "Computer Networks", dept: "CSE", course: "BTech", semester: 2,
//     credits: 3, modules: 4, type: "Both", theoryCredits: 2, labCredits: 1,
//     theoryClassesPerWeek: 2, labPeriodsPerWeek: 2, totalWeeklyClasses: 4,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Core"
//   },
//   // Major Subjects - BTech Sem 2
//   { 
//     id: "BT203", code: "BT203", name: "Machine Learning", dept: "CSE", course: "BTech", semester: 2,
//     credits: 4, modules: 5, type: "Both", theoryCredits: 3, labCredits: 1,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Major"
//   },
//   { 
//     id: "BT204", code: "BT204", name: "Web Development", dept: "CSE", course: "BTech", semester: 2,
//     credits: 4, modules: 5, type: "Both", theoryCredits: 2, labCredits: 2,
//     theoryClassesPerWeek: 2, labPeriodsPerWeek: 4, totalWeeklyClasses: 6,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "Practical", subjectType: "Major"
//   },
//   // Minor Subjects - BTech Sem 2
//   { 
//     id: "BT205", code: "BT205", name: "Software Engineering", dept: "CSE", course: "BTech", semester: 2,
//     credits: 3, modules: 4, type: "Theory", theoryCredits: 3, labCredits: 0,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "Seminar", subjectType: "Minor"
//   },
//   { 
//     id: "BT206", code: "BT206", name: "Cloud Computing", dept: "CSE", course: "BTech", semester: 2,
//     credits: 3, modules: 4, type: "Theory", theoryCredits: 3, labCredits: 0,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Minor"
//   },

//   // ========== BSC SEMESTER 1 ==========
//   // Core Subjects
//   { 
//     id: "BS101", code: "BS101", name: "Mathematics I", dept: "CSE", course: "BSc", semester: 1,
//     credits: 3, modules: 4, type: "Theory", theoryCredits: 3, labCredits: 0,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Core"
//   },
//   { 
//     id: "BS102", code: "BS102", name: "Programming Fundamentals", dept: "CSE", course: "BSc", semester: 1,
//     credits: 4, modules: 5, type: "Both", theoryCredits: 3, labCredits: 1,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "Practical", subjectType: "Core"
//   },
//   // Major Subjects - BSc Sem 1
//   { 
//     id: "BS103", code: "BS103", name: "Discrete Mathematics", dept: "CSE", course: "BSc", semester: 1,
//     credits: 3, modules: 4, type: "Theory", theoryCredits: 3, labCredits: 0,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Major"
//   },
//   { 
//     id: "BS104", code: "BS104", name: "C Programming", dept: "CSE", course: "BSc", semester: 1,
//     credits: 4, modules: 5, type: "Both", theoryCredits: 2, labCredits: 2,
//     theoryClassesPerWeek: 2, labPeriodsPerWeek: 4, totalWeeklyClasses: 6,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "Practical", subjectType: "Major"
//   },
//   // Minor Subjects - BSc Sem 1
//   { 
//     id: "BS105", code: "BS105", name: "Digital Electronics", dept: "CSE", course: "BSc", semester: 1,
//     credits: 3, modules: 4, type: "Theory", theoryCredits: 3, labCredits: 0,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Minor"
//   },

//   // ========== BSC SEMESTER 2 ==========
//   // Core Subjects
//   { 
//     id: "BS201", code: "BS201", name: "Data Analysis", dept: "CSE", course: "BSc", semester: 2,
//     credits: 3, modules: 4, type: "Both", theoryCredits: 2, labCredits: 1,
//     theoryClassesPerWeek: 2, labPeriodsPerWeek: 2, totalWeeklyClasses: 4,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "Practical", subjectType: "Core"
//   },
//   { 
//     id: "BS202", code: "BS202", name: "Web Technologies", dept: "CSE", course: "BSc", semester: 2,
//     credits: 4, modules: 5, type: "Both", theoryCredits: 3, labCredits: 1,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "Practical", subjectType: "Core"
//   },
//   // Major Subjects - BSc Sem 2
//   { 
//     id: "BS203", code: "BS203", name: "Database Systems", dept: "CSE", course: "BSc", semester: 2,
//     credits: 3, modules: 4, type: "Both", theoryCredits: 2, labCredits: 1,
//     theoryClassesPerWeek: 2, labPeriodsPerWeek: 2, totalWeeklyClasses: 4,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Major"
//   },
//   { 
//     id: "BS204", code: "BS204", name: "Python Programming", dept: "CSE", course: "BSc", semester: 2,
//     credits: 4, modules: 5, type: "Both", theoryCredits: 2, labCredits: 2,
//     theoryClassesPerWeek: 2, labPeriodsPerWeek: 4, totalWeeklyClasses: 6,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "Practical", subjectType: "Major"
//   },
//   // Minor Subjects - BSc Sem 2
//   { 
//     id: "BS205", code: "BS205", name: "Computer Graphics", dept: "CSE", course: "BSc", semester: 2,
//     credits: 3, modules: 4, type: "Theory", theoryCredits: 3, labCredits: 0,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Minor"
//   },

//   // ========== BCA SEMESTER 1 ==========
//   // Core Subjects
//   { 
//     id: "BC101", code: "BC101", name: "Introduction to Programming", dept: "CSE", course: "BCA", semester: 1,
//     credits: 3, modules: 4, type: "Both", theoryCredits: 2, labCredits: 1,
//     theoryClassesPerWeek: 2, labPeriodsPerWeek: 2, totalWeeklyClasses: 4,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "Practical", subjectType: "Core"
//   },
//   { 
//     id: "BC102", code: "BC102", name: "Computer Fundamentals", dept: "CSE", course: "BCA", semester: 1,
//     credits: 2, modules: 3, type: "Theory", theoryCredits: 2, labCredits: 0,
//     theoryClassesPerWeek: 2, labPeriodsPerWeek: 0, totalWeeklyClasses: 2,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Core"
//   },
//   // Major Subjects - BCA Sem 1
//   { 
//     id: "BC103", code: "BC103", name: "Mathematics for Computing", dept: "CSE", course: "BCA", semester: 1,
//     credits: 3, modules: 4, type: "Theory", theoryCredits: 3, labCredits: 0,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Major"
//   },
//   { 
//     id: "BC104", code: "BC104", name: "C Programming Lab", dept: "CSE", course: "BCA", semester: 1,
//     credits: 2, modules: 3, type: "Lab", theoryCredits: 0, labCredits: 2,
//     theoryClassesPerWeek: 0, labPeriodsPerWeek: 4, totalWeeklyClasses: 4,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "Practical", subjectType: "Major"
//   },
//   // Minor Subjects - BCA Sem 1
//   { 
//     id: "BC105", code: "BC105", name: "Office Automation", dept: "CSE", course: "BCA", semester: 1,
//     credits: 2, modules: 3, type: "Theory", theoryCredits: 2, labCredits: 0,
//     theoryClassesPerWeek: 2, labPeriodsPerWeek: 0, totalWeeklyClasses: 2,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Minor"
//   },

//   // ========== BCA SEMESTER 2 ==========
//   // Core Subjects
//   { 
//     id: "BC201", code: "BC201", name: "Object Oriented Programming", dept: "CSE", course: "BCA", semester: 2,
//     credits: 4, modules: 5, type: "Both", theoryCredits: 3, labCredits: 1,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "Practical", subjectType: "Core"
//   },
//   { 
//     id: "BC202", code: "BC202", name: "Data Structures using C++", dept: "CSE", course: "BCA", semester: 2,
//     credits: 4, modules: 5, type: "Both", theoryCredits: 3, labCredits: 1,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "Practical", subjectType: "Core"
//   },
//   // Major Subjects - BCA Sem 2
//   { 
//     id: "BC203", code: "BC203", name: "Software Engineering", dept: "CSE", course: "BCA", semester: 2,
//     credits: 3, modules: 4, type: "Theory", theoryCredits: 3, labCredits: 0,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "Seminar", subjectType: "Major"
//   },
//   { 
//     id: "BC204", code: "BC204", name: "Database Management Systems", dept: "CSE", course: "BCA", semester: 2,
//     credits: 4, modules: 5, type: "Both", theoryCredits: 3, labCredits: 1,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Major"
//   },
//   // Minor Subjects - BCA Sem 2
//   { 
//     id: "BC205", code: "BC205", name: "Internet Technologies", dept: "CSE", course: "BCA", semester: 2,
//     credits: 3, modules: 4, type: "Theory", theoryCredits: 3, labCredits: 0,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Minor"
//   },
//   { 
//     id: "BC206", code: "BC206", name: "Multimedia Systems", dept: "CSE", course: "BCA", semester: 2,
//     credits: 3, modules: 4, type: "Theory", theoryCredits: 3, labCredits: 0,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Minor"
//   },
// ];

// // Default Subject Preferences
// export const DEFAULT_SUBJECT_PREFERENCES = [
//   { id: 1, facultyId: 3, facultyName: "Dr. Rahul Krishnan", avatar: "RK", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 2, facultyId: 4, facultyName: "Dr. Anita Roy", avatar: "AR", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 3, facultyId: 5, facultyName: "Prof. Suresh Kumar", avatar: "SK", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 4, facultyId: 6, facultyName: "Dr. Priya Iyer", avatar: "PI", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 5, facultyId: 7, facultyName: "Dr. Vikram Singh", avatar: "VS", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 6, facultyId: 8, facultyName: "Prof. Deepa Nair", avatar: "DN", status: "pending", submitted: false, feedback: "", preferences: [] },
// ];

// // Default Rooms
// export const DEFAULT_ROOMS = [
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

// // Default Timetable Configuration with Lunch Break
// export const DEFAULT_TIMETABLE_CONFIG = {
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

// // Default Semester Details
// export const DEFAULT_SEMESTER_DETAILS = {
//   BTech: {
//     1: {
//       subjects: ["BT101", "BT102", "BT103", "BT104", "BT105", "BT106", "BT107"],
//       defaultFaculty: {
//         "BT101": 3, "BT102": 6, "BT103": 3, "BT104": 6, "BT105": 3, "BT106": 5, "BT107": 5
//       }
//     },
//     2: {
//       subjects: ["BT201", "BT202", "BT203", "BT204", "BT205", "BT206"],
//       defaultFaculty: {
//         "BT201": 6, "BT202": 3, "BT203": 6, "BT204": 3, "BT205": 5, "BT206": 5
//       }
//     }
//   },
//   BSc: {
//     1: {
//       subjects: ["BS101", "BS102", "BS103", "BS104", "BS105"],
//       defaultFaculty: {
//         "BS101": 5, "BS102": 4, "BS103": 5, "BS104": 4, "BS105": 7
//       }
//     },
//     2: {
//       subjects: ["BS201", "BS202", "BS203", "BS204", "BS205"],
//       defaultFaculty: {
//         "BS201": 7, "BS202": 7, "BS203": 4, "BS204": 4, "BS205": 7
//       }
//     }
//   },
//   BCA: {
//     1: {
//       subjects: ["BC101", "BC102", "BC103", "BC104", "BC105"],
//       defaultFaculty: {
//         "BC101": 8, "BC102": 5, "BC103": 8, "BC104": 8, "BC105": 5
//       }
//     },
//     2: {
//       subjects: ["BC201", "BC202", "BC203", "BC204", "BC205", "BC206"],
//       defaultFaculty: {
//         "BC201": 8, "BC202": 7, "BC203": 8, "BC204": 7, "BC205": 8, "BC206": 8
//       }
//     }
//   }
// };

// // Default Calendar Events
// export const DEFAULT_CALENDAR_EVENTS = [
//   { id: 1, title: "Semester Begins", date: "2025-01-10", type: "academic" },
//   { id: 2, title: "Mid-Semester Exams", date: "2025-03-01", type: "exam" },
//   { id: 3, title: "End Semester Exams", date: "2025-05-15", type: "exam" },
//   { id: 4, title: "Timetable Release", date: "2025-01-05", type: "admin" },
// ];

// // Default Form Status
// export const DEFAULT_FORM_STATUS = {
//   isFloated: false,
//   floatedDate: null,
//   floatedBy: null,
//   semester: "2025",
//   deadline: null
// };

// export const DEFAULT_CLASS_TEACHERS = {
//   BTech: {
//     1: { facultyId: null, assignedDate: null },
//     2: { facultyId: null, assignedDate: null }
//   },
//   BSc: {
//     1: { facultyId: null, assignedDate: null },
//     2: { facultyId: null, assignedDate: null }
//   },
//   BCA: {
//     1: { facultyId: null, assignedDate: null },
//     2: { facultyId: null, assignedDate: null }
//   }
// };

// export const DEFAULT_COURSE_LEADS = {
//   BTech: { facultyId: null, assignedDate: null },
//   BSc: { facultyId: null, assignedDate: null },
//   BCA: { facultyId: null, assignedDate: null }
// };

// // Storage Keys
// export const STORAGE_KEYS = {
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
//   LEAVE_REQUESTS: 'acadplan_leave_requests',
//   CALENDAR_EVENTS: 'acadplan_calendar_events',
//   FORM_STATUS: 'acadplan_form_status',
//   PREFERENCE_SETTINGS: 'acadplan_preference_settings',
//   FACULTY_PREFERENCE_FORM: 'acadplan_faculty_preference_form',
//   FACULTY_SUBMISSIONS: 'acadplan_faculty_submissions',
//   CLASS_TEACHERS: 'acadplan_class_teachers',
//   COURSE_LEADS: 'acadplan_course_leads',
// };

// // src/data/mockData.js

// // Mock Users with passwordChanged flag
// export const MOCK_USERS = [
//   { id: 1, email: "dean@university.edu", password: "dean123", role: "admin", name: "Dr. Aravind Sharma", avatar: "AS", school: "Central Administration", passwordChanged: true },
//   { id: 2, email: "coordinator@university.edu", password: "coord123", role: "coordinator", name: "Prof. Meera Nair", avatar: "MN", school: "Timetable Office", passwordChanged: true },
//   { id: 3, email: "rahul@university.edu", password: "faculty123", role: "faculty", name: "Dr. Rahul Krishnan", avatar: "RK", school: "SoCSE", designation: "Assistant Professor", course: "BTech", email: "rahul@university.edu", passwordChanged: true },
//   { id: 4, email: "anita@university.edu", password: "faculty123", role: "faculty", name: "Dr. Anita Roy", avatar: "AR", school: "SoCSE", designation: "Assistant Professor", course: "BSc", email: "anita@university.edu", passwordChanged: true },
//   { id: 5, email: "suresh@university.edu", password: "faculty123", role: "faculty", name: "Prof. Suresh Kumar", avatar: "SK", school: "SoCSE", designation: "Professor", course: "BCA", email: "suresh@university.edu", passwordChanged: true },
//   { id: 6, email: "priya@university.edu", password: "faculty123", role: "faculty", name: "Dr. Priya Iyer", avatar: "PI", school: "SoCSE", designation: "Associate Professor", course: "BTech", email: "priya@university.edu", passwordChanged: true },
//   { id: 7, email: "vikram@university.edu", password: "faculty123", role: "faculty", name: "Dr. Vikram Singh", avatar: "VS", school: "SoCSE", designation: "Assistant Professor", course: "BSc", email: "vikram@university.edu", passwordChanged: true },
//   { id: 8, email: "deepa@university.edu", password: "faculty123", role: "faculty", name: "Prof. Deepa Nair", avatar: "DN", school: "SoCSE", designation: "Professor", course: "BCA", email: "deepa@university.edu", passwordChanged: true },
//   { id: 9, email: "student.btech@university.edu", password: "student123", role: "student", name: "Rohan Mehta", avatar: "RM", course: "BTech", semester: 1, section: "A", passwordChanged: true },
//   { id: 10, email: "student.bsc@university.edu", password: "student123", role: "student", name: "Priya Sharma", avatar: "PS", course: "BSc", semester: 1, section: "B", passwordChanged: true },
//   { id: 11, email: "student.bca@university.edu", password: "student123", role: "student", name: "Arjun Kumar", avatar: "AK", course: "BCA", semester: 2, section: "C", passwordChanged: true },
//   { id: 12, email: "director@university.edu", password: "director123", role: "director", name: "Prof. Rajesh Menon", avatar: "RM", school: "School of CSE", passwordChanged: true },
//   // EA (Executive Assistant) User
//   { id: 13, email: "ea@university.edu", password: "ea123", role: "ea", name: "Sarah Johnson", avatar: "SJ", school: "Dean's Office", passwordChanged: true },
//   { id: 14, email: "visiting@university.edu", password: "visiting123", role: "visiting_faculty", name: "Dr. James Wilson", avatar: "JW", school: "SoCSE", designation: "Visiting Professor", course: "BTech", passwordChanged: true },
// ];

// // Courses, Semesters, Sections
// export const COURSES = ["BTech", "BSc", "BCA"];
// export const SEMESTERS = [1, 2];
// export const SECTIONS = ["A", "B", "C"];

// // Exam Types and Subject Types
// export const EXAM_TYPES = ["SEE", "Practical", "Seminar"];
// export const SUBJECT_TYPES = ["Core", "Major", "Minor"];

// // Workload Limits based on designation
// export const WORKLOAD_LIMITS = {
//   "Assistant Professor": 14,
//   "Associate Professor": 12,
//   "Professor": 10,
// };

// // Default EA Permissions (Dean can modify these)
// export const DEFAULT_EA_PERMISSIONS = {
//   subjectApproval: false,      // Can approve/reject subjects
//   preferenceApproval: false,   // Can approve/reject faculty preferences
//   courseApproval: false,       // Can approve/reject course details
//   timetableGeneration: false,  // Can generate timetable
//   viewReports: false,           // Can view reports (read-only)
//   manageFaculty: false,        // Can manage faculty
//   viewAllData: false,           // Can view all data (read-only)
// };

// // Default Faculty Data
// export const DEFAULT_FACULTY = [
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
//     color: "#4361ee",
//     email: "rahul@university.edu"
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
//     color: "#06d6a0",
//     email: "anita@university.edu"
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
//     color: "#ffb703",
//     email: "suresh@university.edu"
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
//     color: "#9d4edd",
//     email: "priya@university.edu"
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
//     color: "#e3646b",
//     email: "vikram@university.edu"
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
//     color: "#6b705c",
//     email: "deepa@university.edu"
//   },
//   { 
//     id: 14, 
//     facultyId: "FAC007",
//     name: "Dr. James Wilson", 
//     avatar: "JW", 
//     dept: "CSE", 
//     designation: "Visiting Professor", 
//     specialization: "Cloud Computing, Distributed Systems",
//     course: "BTech",
//     maxHours: 8,
//     assignedHours: 0,
//     remainingHours: 8,
//     preferences: [],
//     color: "#10b981",
//     email: "visiting@university.edu"
//   },
// ];

// // Default Subjects with Core, Major, Minor classification
// export const DEFAULT_SUBJECTS = [
//   // ========== BTECH SEMESTER 1 ==========
//   // Core Subjects
//   { 
//     id: "BT101", code: "BT101", name: "Data Structures", dept: "CSE", course: "BTech", semester: 1,
//     credits: 4, modules: 5, type: "Both", theoryCredits: 3, labCredits: 1,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Core"
//   },
//   { 
//     id: "BT102", code: "BT102", name: "Algorithms", dept: "CSE", course: "BTech", semester: 1,
//     credits: 4, modules: 5, type: "Theory", theoryCredits: 4, labCredits: 0,
//     theoryClassesPerWeek: 4, labPeriodsPerWeek: 0, totalWeeklyClasses: 4,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Core"
//   },
//   { 
//     id: "BT103", code: "BT103", name: "Database Management Systems", dept: "CSE", course: "BTech", semester: 1,
//     credits: 3, modules: 4, type: "Both", theoryCredits: 2, labCredits: 1,
//     theoryClassesPerWeek: 2, labPeriodsPerWeek: 2, totalWeeklyClasses: 4,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Core"
//   },
//   // Major Subjects - BTech Sem 1
//   { 
//     id: "BT104", code: "BT104", name: "Advanced Data Structures", dept: "CSE", course: "BTech", semester: 1,
//     credits: 4, modules: 5, type: "Both", theoryCredits: 3, labCredits: 1,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Major"
//   },
//   { 
//     id: "BT105", code: "BT105", name: "Object Oriented Programming", dept: "CSE", course: "BTech", semester: 1,
//     credits: 4, modules: 5, type: "Both", theoryCredits: 3, labCredits: 1,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "Practical", subjectType: "Major"
//   },
//   // Minor Subjects - BTech Sem 1
//   { 
//     id: "BT106", code: "BT106", name: "Discrete Mathematics", dept: "CSE", course: "BTech", semester: 1,
//     credits: 3, modules: 4, type: "Theory", theoryCredits: 3, labCredits: 0,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Minor"
//   },
//   { 
//     id: "BT107", code: "BT107", name: "Digital Logic Design", dept: "CSE", course: "BTech", semester: 1,
//     credits: 3, modules: 4, type: "Theory", theoryCredits: 3, labCredits: 0,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Minor"
//   },

//   // ========== BTECH SEMESTER 2 ==========
//   // Core Subjects
//   { 
//     id: "BT201", code: "BT201", name: "Operating Systems", dept: "CSE", course: "BTech", semester: 2,
//     credits: 3, modules: 4, type: "Theory", theoryCredits: 3, labCredits: 0,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Core"
//   },
//   { 
//     id: "BT202", code: "BT202", name: "Computer Networks", dept: "CSE", course: "BTech", semester: 2,
//     credits: 3, modules: 4, type: "Both", theoryCredits: 2, labCredits: 1,
//     theoryClassesPerWeek: 2, labPeriodsPerWeek: 2, totalWeeklyClasses: 4,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Core"
//   },
//   // Major Subjects - BTech Sem 2
//   { 
//     id: "BT203", code: "BT203", name: "Machine Learning", dept: "CSE", course: "BTech", semester: 2,
//     credits: 4, modules: 5, type: "Both", theoryCredits: 3, labCredits: 1,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Major"
//   },
//   { 
//     id: "BT204", code: "BT204", name: "Web Development", dept: "CSE", course: "BTech", semester: 2,
//     credits: 4, modules: 5, type: "Both", theoryCredits: 2, labCredits: 2,
//     theoryClassesPerWeek: 2, labPeriodsPerWeek: 4, totalWeeklyClasses: 6,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "Practical", subjectType: "Major"
//   },
//   // Minor Subjects - BTech Sem 2
//   { 
//     id: "BT205", code: "BT205", name: "Software Engineering", dept: "CSE", course: "BTech", semester: 2,
//     credits: 3, modules: 4, type: "Theory", theoryCredits: 3, labCredits: 0,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "Seminar", subjectType: "Minor"
//   },
//   { 
//     id: "BT206", code: "BT206", name: "Cloud Computing", dept: "CSE", course: "BTech", semester: 2,
//     credits: 3, modules: 4, type: "Theory", theoryCredits: 3, labCredits: 0,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Minor"
//   },

//   // ========== BSC SEMESTER 1 ==========
//   // Core Subjects
//   { 
//     id: "BS101", code: "BS101", name: "Mathematics I", dept: "CSE", course: "BSc", semester: 1,
//     credits: 3, modules: 4, type: "Theory", theoryCredits: 3, labCredits: 0,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Core"
//   },
//   { 
//     id: "BS102", code: "BS102", name: "Programming Fundamentals", dept: "CSE", course: "BSc", semester: 1,
//     credits: 4, modules: 5, type: "Both", theoryCredits: 3, labCredits: 1,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "Practical", subjectType: "Core"
//   },
//   // Major Subjects - BSc Sem 1
//   { 
//     id: "BS103", code: "BS103", name: "Discrete Mathematics", dept: "CSE", course: "BSc", semester: 1,
//     credits: 3, modules: 4, type: "Theory", theoryCredits: 3, labCredits: 0,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Major"
//   },
//   { 
//     id: "BS104", code: "BS104", name: "C Programming", dept: "CSE", course: "BSc", semester: 1,
//     credits: 4, modules: 5, type: "Both", theoryCredits: 2, labCredits: 2,
//     theoryClassesPerWeek: 2, labPeriodsPerWeek: 4, totalWeeklyClasses: 6,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "Practical", subjectType: "Major"
//   },
//   // Minor Subjects - BSc Sem 1
//   { 
//     id: "BS105", code: "BS105", name: "Digital Electronics", dept: "CSE", course: "BSc", semester: 1,
//     credits: 3, modules: 4, type: "Theory", theoryCredits: 3, labCredits: 0,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Minor"
//   },

//   // ========== BSC SEMESTER 2 ==========
//   // Core Subjects
//   { 
//     id: "BS201", code: "BS201", name: "Data Analysis", dept: "CSE", course: "BSc", semester: 2,
//     credits: 3, modules: 4, type: "Both", theoryCredits: 2, labCredits: 1,
//     theoryClassesPerWeek: 2, labPeriodsPerWeek: 2, totalWeeklyClasses: 4,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "Practical", subjectType: "Core"
//   },
//   { 
//     id: "BS202", code: "BS202", name: "Web Technologies", dept: "CSE", course: "BSc", semester: 2,
//     credits: 4, modules: 5, type: "Both", theoryCredits: 3, labCredits: 1,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "Practical", subjectType: "Core"
//   },
//   // Major Subjects - BSc Sem 2
//   { 
//     id: "BS203", code: "BS203", name: "Database Systems", dept: "CSE", course: "BSc", semester: 2,
//     credits: 3, modules: 4, type: "Both", theoryCredits: 2, labCredits: 1,
//     theoryClassesPerWeek: 2, labPeriodsPerWeek: 2, totalWeeklyClasses: 4,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Major"
//   },
//   { 
//     id: "BS204", code: "BS204", name: "Python Programming", dept: "CSE", course: "BSc", semester: 2,
//     credits: 4, modules: 5, type: "Both", theoryCredits: 2, labCredits: 2,
//     theoryClassesPerWeek: 2, labPeriodsPerWeek: 4, totalWeeklyClasses: 6,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "Practical", subjectType: "Major"
//   },
//   // Minor Subjects - BSc Sem 2
//   { 
//     id: "BS205", code: "BS205", name: "Computer Graphics", dept: "CSE", course: "BSc", semester: 2,
//     credits: 3, modules: 4, type: "Theory", theoryCredits: 3, labCredits: 0,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Minor"
//   },

//   // ========== BCA SEMESTER 1 ==========
//   // Core Subjects
//   { 
//     id: "BC101", code: "BC101", name: "Introduction to Programming", dept: "CSE", course: "BCA", semester: 1,
//     credits: 3, modules: 4, type: "Both", theoryCredits: 2, labCredits: 1,
//     theoryClassesPerWeek: 2, labPeriodsPerWeek: 2, totalWeeklyClasses: 4,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "Practical", subjectType: "Core"
//   },
//   { 
//     id: "BC102", code: "BC102", name: "Computer Fundamentals", dept: "CSE", course: "BCA", semester: 1,
//     credits: 2, modules: 3, type: "Theory", theoryCredits: 2, labCredits: 0,
//     theoryClassesPerWeek: 2, labPeriodsPerWeek: 0, totalWeeklyClasses: 2,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Core"
//   },
//   // Major Subjects - BCA Sem 1
//   { 
//     id: "BC103", code: "BC103", name: "Mathematics for Computing", dept: "CSE", course: "BCA", semester: 1,
//     credits: 3, modules: 4, type: "Theory", theoryCredits: 3, labCredits: 0,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Major"
//   },
//   { 
//     id: "BC104", code: "BC104", name: "C Programming Lab", dept: "CSE", course: "BCA", semester: 1,
//     credits: 2, modules: 3, type: "Lab", theoryCredits: 0, labCredits: 2,
//     theoryClassesPerWeek: 0, labPeriodsPerWeek: 4, totalWeeklyClasses: 4,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "Practical", subjectType: "Major"
//   },
//   // Minor Subjects - BCA Sem 1
//   { 
//     id: "BC105", code: "BC105", name: "Office Automation", dept: "CSE", course: "BCA", semester: 1,
//     credits: 2, modules: 3, type: "Theory", theoryCredits: 2, labCredits: 0,
//     theoryClassesPerWeek: 2, labPeriodsPerWeek: 0, totalWeeklyClasses: 2,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Minor"
//   },

//   // ========== BCA SEMESTER 2 ==========
//   // Core Subjects
//   { 
//     id: "BC201", code: "BC201", name: "Object Oriented Programming", dept: "CSE", course: "BCA", semester: 2,
//     credits: 4, modules: 5, type: "Both", theoryCredits: 3, labCredits: 1,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "Practical", subjectType: "Core"
//   },
//   { 
//     id: "BC202", code: "BC202", name: "Data Structures using C++", dept: "CSE", course: "BCA", semester: 2,
//     credits: 4, modules: 5, type: "Both", theoryCredits: 3, labCredits: 1,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "Practical", subjectType: "Core"
//   },
//   // Major Subjects - BCA Sem 2
//   { 
//     id: "BC203", code: "BC203", name: "Software Engineering", dept: "CSE", course: "BCA", semester: 2,
//     credits: 3, modules: 4, type: "Theory", theoryCredits: 3, labCredits: 0,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "Seminar", subjectType: "Major"
//   },
//   { 
//     id: "BC204", code: "BC204", name: "Database Management Systems", dept: "CSE", course: "BCA", semester: 2,
//     credits: 4, modules: 5, type: "Both", theoryCredits: 3, labCredits: 1,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Major"
//   },
//   // Minor Subjects - BCA Sem 2
//   { 
//     id: "BC205", code: "BC205", name: "Internet Technologies", dept: "CSE", course: "BCA", semester: 2,
//     credits: 3, modules: 4, type: "Theory", theoryCredits: 3, labCredits: 0,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Minor"
//   },
//   { 
//     id: "BC206", code: "BC206", name: "Multimedia Systems", dept: "CSE", course: "BCA", semester: 2,
//     credits: 3, modules: 4, type: "Theory", theoryCredits: 3, labCredits: 0,
//     theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3,
//     approvalStatus: "approved", approvedBy: "dean", approvedDate: new Date().toISOString(),
//     examType: "SEE", subjectType: "Minor"
//   },
// ];

// // Default Subject Preferences
// export const DEFAULT_SUBJECT_PREFERENCES = [
//   { id: 1, facultyId: 3, facultyName: "Dr. Rahul Krishnan", avatar: "RK", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 2, facultyId: 4, facultyName: "Dr. Anita Roy", avatar: "AR", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 3, facultyId: 5, facultyName: "Prof. Suresh Kumar", avatar: "SK", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 4, facultyId: 6, facultyName: "Dr. Priya Iyer", avatar: "PI", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 5, facultyId: 7, facultyName: "Dr. Vikram Singh", avatar: "VS", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 6, facultyId: 8, facultyName: "Prof. Deepa Nair", avatar: "DN", status: "pending", submitted: false, feedback: "", preferences: [] },
// ];

// // Default Rooms
// export const DEFAULT_ROOMS = [
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

// // Default Timetable Configuration with Lunch Break
// export const DEFAULT_TIMETABLE_CONFIG = {
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

// // Default Semester Details
// export const DEFAULT_SEMESTER_DETAILS = {
//   BTech: {
//     1: {
//       subjects: ["BT101", "BT102", "BT103", "BT104", "BT105", "BT106", "BT107"],
//       defaultFaculty: {
//         "BT101": 3, "BT102": 6, "BT103": 3, "BT104": 6, "BT105": 3, "BT106": 5, "BT107": 5
//       }
//     },
//     2: {
//       subjects: ["BT201", "BT202", "BT203", "BT204", "BT205", "BT206"],
//       defaultFaculty: {
//         "BT201": 6, "BT202": 3, "BT203": 6, "BT204": 3, "BT205": 5, "BT206": 5
//       }
//     }
//   },
//   BSc: {
//     1: {
//       subjects: ["BS101", "BS102", "BS103", "BS104", "BS105"],
//       defaultFaculty: {
//         "BS101": 5, "BS102": 4, "BS103": 5, "BS104": 4, "BS105": 7
//       }
//     },
//     2: {
//       subjects: ["BS201", "BS202", "BS203", "BS204", "BS205"],
//       defaultFaculty: {
//         "BS201": 7, "BS202": 7, "BS203": 4, "BS204": 4, "BS205": 7
//       }
//     }
//   },
//   BCA: {
//     1: {
//       subjects: ["BC101", "BC102", "BC103", "BC104", "BC105"],
//       defaultFaculty: {
//         "BC101": 8, "BC102": 5, "BC103": 8, "BC104": 8, "BC105": 5
//       }
//     },
//     2: {
//       subjects: ["BC201", "BC202", "BC203", "BC204", "BC205", "BC206"],
//       defaultFaculty: {
//         "BC201": 8, "BC202": 7, "BC203": 8, "BC204": 7, "BC205": 8, "BC206": 8
//       }
//     }
//   }
// };

// // Default Calendar Events
// export const DEFAULT_CALENDAR_EVENTS = [
//   { id: 1, title: "Semester Begins", date: "2025-01-10", type: "academic" },
//   { id: 2, title: "Mid-Semester Exams", date: "2025-03-01", type: "exam" },
//   { id: 3, title: "End Semester Exams", date: "2025-05-15", type: "exam" },
//   { id: 4, title: "Timetable Release", date: "2025-01-05", type: "admin" },
// ];

// // Default Form Status
// export const DEFAULT_FORM_STATUS = {
//   isFloated: false,
//   floatedDate: null,
//   floatedBy: null,
//   semester: "2025",
//   deadline: null
// };

// // Default Class Teachers
// export const DEFAULT_CLASS_TEACHERS = {
//   BTech: {
//     1: { facultyId: null, assignedDate: null },
//     2: { facultyId: null, assignedDate: null }
//   },
//   BSc: {
//     1: { facultyId: null, assignedDate: null },
//     2: { facultyId: null, assignedDate: null }
//   },
//   BCA: {
//     1: { facultyId: null, assignedDate: null },
//     2: { facultyId: null, assignedDate: null }
//   }
// };

// // Default Course Leads
// export const DEFAULT_COURSE_LEADS = {
//   BTech: { facultyId: null, assignedDate: null },
//   BSc: { facultyId: null, assignedDate: null },
//   BCA: { facultyId: null, assignedDate: null }
// };

// export const DEFAULT_VISITING_FACULTY_PERMISSIONS = {
//   canViewTimetable: true,
//   canViewSyllabus: true,
//   canUpdateSyllabus: false,
//   canViewProfile: true,
//   canRequestLeave: true,
//   canViewStudents: false,
//   canSubmitGrades: false,
//   canAccessPreferences: false,
//   canAccessCourseDetails: false,
//   canRaiseIssues: true,
//   maxHoursPerWeek: 8
// };

// // Storage Keys
// export const STORAGE_KEYS = {
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
//   LEAVE_REQUESTS: 'acadplan_leave_requests',
//   CALENDAR_EVENTS: 'acadplan_calendar_events',
//   FORM_STATUS: 'acadplan_form_status',
//   PREFERENCE_SETTINGS: 'acadplan_preference_settings',
//   FACULTY_PREFERENCE_FORM: 'acadplan_faculty_preference_form',
//   FACULTY_SUBMISSIONS: 'acadplan_faculty_submissions',
//   CLASS_TEACHERS: 'acadplan_class_teachers',
//   COURSE_LEADS: 'acadplan_course_leads',
//   APPOINTMENTS: 'acadplan_appointments',
//   EA_PERMISSIONS: 'acadplan_ea_permissions',
//   MOCK_USERS: 'acadplan_mock_users',
//   VISITING_FACULTY_PERMISSIONS: 'acadplan_visiting_faculty_permissions',
//   LEAVE_REQUESTS: 'acadplan_leave_requests',
//   LEAVE_SUBSTITUTES: 'acadplan_leave_substitutes',
// };

// src/data/mockData.js

// // Mock Users with passwordChanged flag
// export const MOCK_USERS = [
//   { id: 1, email: "dean@university.edu", password: "dean123", role: "admin", name: "Dr. Aravind Sharma", avatar: "AS", school: "Central Administration", passwordChanged: true },
//   { id: 2, email: "coordinator@university.edu", password: "coord123", role: "coordinator", name: "Prof. Meera Nair", avatar: "MN", school: "Timetable Office", passwordChanged: true },
//   // BTech Faculty (8 faculty)
//   { id: 3, email: "rahul@university.edu", password: "faculty123", role: "faculty", name: "Dr. Rahul Krishnan", avatar: "RK", school: "SoCSE", designation: "Professor", course: "BTech", passwordChanged: true },
//   { id: 4, email: "priya@university.edu", password: "faculty123", role: "faculty", name: "Dr. Priya Iyer", avatar: "PI", school: "SoCSE", designation: "Professor", course: "BTech", passwordChanged: true },
//   { id: 5, email: "amit@university.edu", password: "faculty123", role: "faculty", name: "Dr. Amit Sharma", avatar: "AS", school: "SoCSE", designation: "Associate Professor", course: "BTech", passwordChanged: true },
//   { id: 6, email: "neha@university.edu", password: "faculty123", role: "faculty", name: "Dr. Neha Gupta", avatar: "NG", school: "SoCSE", designation: "Associate Professor", course: "BTech", passwordChanged: true },
//   { id: 7, email: "vikram@university.edu", password: "faculty123", role: "faculty", name: "Dr. Vikram Singh", avatar: "VS", school: "SoCSE", designation: "Assistant Professor", course: "BTech", passwordChanged: true },
//   { id: 8, email: "anita@university.edu", password: "faculty123", role: "faculty", name: "Dr. Anita Roy", avatar: "AR", school: "SoCSE", designation: "Assistant Professor", course: "BTech", passwordChanged: true },
//   { id: 9, email: "sanjay@university.edu", password: "faculty123", role: "faculty", name: "Dr. Sanjay Mehta", avatar: "SM", school: "SoCSE", designation: "Assistant Professor", course: "BTech", passwordChanged: true },
//   { id: 10, email: "pooja@university.edu", password: "faculty123", role: "faculty", name: "Dr. Pooja Reddy", avatar: "PR", school: "SoCSE", designation: "Assistant Professor", course: "BTech", passwordChanged: true },
//   // BSc Faculty (6 faculty)
//   { id: 11, email: "suresh@university.edu", password: "faculty123", role: "faculty", name: "Prof. Suresh Kumar", avatar: "SK", school: "SoCSE", designation: "Professor", course: "BSc", passwordChanged: true },
//   { id: 12, email: "deepa@university.edu", password: "faculty123", role: "faculty", name: "Prof. Deepa Nair", avatar: "DN", school: "SoCSE", designation: "Professor", course: "BSc", passwordChanged: true },
//   { id: 13, email: "rajesh@university.edu", password: "faculty123", role: "faculty", name: "Dr. Rajesh Kumar", avatar: "RK", school: "SoCSE", designation: "Associate Professor", course: "BSc", passwordChanged: true },
//   { id: 14, email: "kavita@university.edu", password: "faculty123", role: "faculty", name: "Dr. Kavita Joshi", avatar: "KJ", school: "SoCSE", designation: "Assistant Professor", course: "BSc", passwordChanged: true },
//   { id: 15, email: "manoj@university.edu", password: "faculty123", role: "faculty", name: "Dr. Manoj Tiwari", avatar: "MT", school: "SoCSE", designation: "Assistant Professor", course: "BSc", passwordChanged: true },
//   { id: 16, email: "swati@university.edu", password: "faculty123", role: "faculty", name: "Dr. Swati Desai", avatar: "SD", school: "SoCSE", designation: "Assistant Professor", course: "BSc", passwordChanged: true },
//   // BCA Faculty (6 faculty)
//   { id: 17, email: "alok@university.edu", password: "faculty123", role: "faculty", name: "Dr. Alok Mishra", avatar: "AM", school: "SoCSE", designation: "Professor", course: "BCA", passwordChanged: true },
//   { id: 18, email: "rekha@university.edu", password: "faculty123", role: "faculty", name: "Dr. Reha Verma", avatar: "RV", school: "SoCSE", designation: "Associate Professor", course: "BCA", passwordChanged: true },
//   { id: 19, email: "naveen@university.edu", password: "faculty123", role: "faculty", name: "Dr. Naveen Bhatia", avatar: "NB", school: "SoCSE", designation: "Assistant Professor", course: "BCA", passwordChanged: true },
//   { id: 20, email: "monica@university.edu", password: "faculty123", role: "faculty", name: "Dr. Monica Sethi", avatar: "MS", school: "SoCSE", designation: "Assistant Professor", course: "BCA", passwordChanged: true },
//   { id: 21, email: "tarun@university.edu", password: "faculty123", role: "faculty", name: "Dr. Tarun Kapoor", avatar: "TK", school: "SoCSE", designation: "Assistant Professor", course: "BCA", passwordChanged: true },
//   { id: 22, email: "divya@university.edu", password: "faculty123", role: "faculty", name: "Dr. Divya Malhotra", avatar: "DM", school: "SoCSE", designation: "Assistant Professor", course: "BCA", passwordChanged: true },
//   // Students
//   { id: 23, email: "student.btech@university.edu", password: "student123", role: "student", name: "Rohan Mehta", avatar: "RM", course: "BTech", semester: 1, section: "A", passwordChanged: true },
//   { id: 24, email: "student.bsc@university.edu", password: "student123", role: "student", name: "Priya Sharma", avatar: "PS", course: "BSc", semester: 1, section: "B", passwordChanged: true },
//   { id: 25, email: "student.bca@university.edu", password: "student123", role: "student", name: "Arjun Kumar", avatar: "AK", course: "BCA", semester: 2, section: "C", passwordChanged: true },
//   // Director
//   { id: 26, email: "director@university.edu", password: "director123", role: "director", name: "Prof. Rajesh Menon", avatar: "RM", school: "School of CSE", passwordChanged: true },
//   // EA
//   { id: 27, email: "ea@university.edu", password: "ea123", role: "ea", name: "Sarah Johnson", avatar: "SJ", school: "Dean's Office", passwordChanged: true },
//   // Visiting Faculty
//   { id: 28, email: "visiting@university.edu", password: "visiting123", role: "visiting_faculty", name: "Dr. James Wilson", avatar: "JW", school: "SoCSE", designation: "Visiting Professor", course: "BTech", passwordChanged: true },
// ];

// // Courses, Semesters, Sections
// export const COURSES = ["BTech", "BSc", "BCA"];
// export const SEMESTERS = [1, 2];
// export const SECTIONS = ["A", "B", "C"];

// // Exam Types and Subject Types
// export const EXAM_TYPES = ["SEE", "Practical", "Seminar"];
// export const SUBJECT_TYPES = ["Core", "Major", "Minor"];

// // Workload Limits based on designation
// export const WORKLOAD_LIMITS = {
//   "Assistant Professor": 14,
//   "Associate Professor": 12,
//   "Professor": 10,
// };

// // Default Faculty Data - Balanced for all courses
// export const DEFAULT_FACULTY = [
//   // BTech Faculty (8 faculty - 94 hours total)
//   { id: 3, facultyId: "FAC001", name: "Dr. Rahul Krishnan", avatar: "RK", dept: "CSE", designation: "Professor", specialization: "Data Structures, Algorithms", course: "BTech", maxHours: 10, assignedHours: 0, remainingHours: 10, preferences: [], color: "#4361ee", email: "rahul@university.edu" },
//   { id: 4, facultyId: "FAC002", name: "Dr. Priya Iyer", avatar: "PI", dept: "CSE", designation: "Professor", specialization: "Machine Learning, AI", course: "BTech", maxHours: 10, assignedHours: 0, remainingHours: 10, preferences: [], color: "#9d4edd", email: "priya@university.edu" },
//   { id: 5, facultyId: "FAC003", name: "Dr. Amit Sharma", avatar: "AS", dept: "CSE", designation: "Associate Professor", specialization: "DBMS, OS", course: "BTech", maxHours: 12, assignedHours: 0, remainingHours: 12, preferences: [], color: "#06d6a0", email: "amit@university.edu" },
//   { id: 6, facultyId: "FAC004", name: "Dr. Neha Gupta", avatar: "NG", dept: "CSE", designation: "Associate Professor", specialization: "Computer Networks, Security", course: "BTech", maxHours: 12, assignedHours: 0, remainingHours: 12, preferences: [], color: "#ffb703", email: "neha@university.edu" },
//   { id: 7, facultyId: "FAC005", name: "Dr. Vikram Singh", avatar: "VS", dept: "CSE", designation: "Assistant Professor", specialization: "Web Development, React", course: "BTech", maxHours: 14, assignedHours: 0, remainingHours: 14, preferences: [], color: "#e3646b", email: "vikram@university.edu" },
//   { id: 8, facultyId: "FAC006", name: "Dr. Anita Roy", avatar: "AR", dept: "CSE", designation: "Assistant Professor", specialization: "Python, Data Science", course: "BTech", maxHours: 14, assignedHours: 0, remainingHours: 14, preferences: [], color: "#6b705c", email: "anita@university.edu" },
//   { id: 9, facultyId: "FAC007", name: "Dr. Sanjay Mehta", avatar: "SM", dept: "CSE", designation: "Assistant Professor", specialization: "Cloud Computing, DevOps", course: "BTech", maxHours: 14, assignedHours: 0, remainingHours: 14, preferences: [], color: "#118ab2", email: "sanjay@university.edu" },
//   { id: 10, facultyId: "FAC008", name: "Dr. Pooja Reddy", avatar: "PR", dept: "CSE", designation: "Assistant Professor", specialization: "Software Engineering, Testing", course: "BTech", maxHours: 14, assignedHours: 0, remainingHours: 14, preferences: [], color: "#ef476f", email: "pooja@university.edu" },
  
//   // BSc Faculty (6 faculty - 74 hours total)
//   { id: 11, facultyId: "FAC009", name: "Prof. Suresh Kumar", avatar: "SK", dept: "CSE", designation: "Professor", specialization: "Mathematics, Discrete Structures", course: "BSc", maxHours: 10, assignedHours: 0, remainingHours: 10, preferences: [], color: "#ffb703", email: "suresh@university.edu" },
//   { id: 12, facultyId: "FAC010", name: "Prof. Deepa Nair", avatar: "DN", dept: "CSE", designation: "Professor", specialization: "Programming Fundamentals, C", course: "BSc", maxHours: 10, assignedHours: 0, remainingHours: 10, preferences: [], color: "#6b705c", email: "deepa@university.edu" },
//   { id: 13, facultyId: "FAC011", name: "Dr. Rajesh Kumar", avatar: "RK", dept: "CSE", designation: "Associate Professor", specialization: "Database Systems, SQL", course: "BSc", maxHours: 12, assignedHours: 0, remainingHours: 12, preferences: [], color: "#9d4edd", email: "rajesh@university.edu" },
//   { id: 14, facultyId: "FAC012", name: "Dr. Kavita Joshi", avatar: "KJ", dept: "CSE", designation: "Assistant Professor", specialization: "Web Technologies, HTML/CSS", course: "BSc", maxHours: 14, assignedHours: 0, remainingHours: 14, preferences: [], color: "#06d6a0", email: "kavita@university.edu" },
//   { id: 15, facultyId: "FAC013", name: "Dr. Manoj Tiwari", avatar: "MT", dept: "CSE", designation: "Assistant Professor", specialization: "Data Analysis, Python", course: "BSc", maxHours: 14, assignedHours: 0, remainingHours: 14, preferences: [], color: "#e3646b", email: "manoj@university.edu" },
//   { id: 16, facultyId: "FAC014", name: "Dr. Swati Desai", avatar: "SD", dept: "CSE", designation: "Assistant Professor", specialization: "Computer Graphics, Multimedia", course: "BSc", maxHours: 14, assignedHours: 0, remainingHours: 14, preferences: [], color: "#118ab2", email: "swati@university.edu" },
  
//   // BCA Faculty (6 faculty - 74 hours total)
//   { id: 17, facultyId: "FAC015", name: "Dr. Alok Mishra", avatar: "AM", dept: "CSE", designation: "Professor", specialization: "Object Oriented Programming, C++", course: "BCA", maxHours: 10, assignedHours: 0, remainingHours: 10, preferences: [], color: "#4361ee", email: "alok@university.edu" },
//   { id: 18, facultyId: "FAC016", name: "Dr. Rekha Verma", avatar: "RV", dept: "CSE", designation: "Associate Professor", specialization: "Data Structures, Algorithms", course: "BCA", maxHours: 12, assignedHours: 0, remainingHours: 12, preferences: [], color: "#ffb703", email: "rekha@university.edu" },
//   { id: 19, facultyId: "FAC017", name: "Dr. Naveen Bhatia", avatar: "NB", dept: "CSE", designation: "Assistant Professor", specialization: "Software Engineering, Testing", course: "BCA", maxHours: 14, assignedHours: 0, remainingHours: 14, preferences: [], color: "#9d4edd", email: "naveen@university.edu" },
//   { id: 20, facultyId: "FAC018", name: "Dr. Monica Sethi", avatar: "MS", dept: "CSE", designation: "Assistant Professor", specialization: "Database Management, SQL", course: "BCA", maxHours: 14, assignedHours: 0, remainingHours: 14, preferences: [], color: "#06d6a0", email: "monica@university.edu" },
//   { id: 21, facultyId: "FAC019", name: "Dr. Tarun Kapoor", avatar: "TK", dept: "CSE", designation: "Assistant Professor", specialization: "Internet Technologies, Web Dev", course: "BCA", maxHours: 14, assignedHours: 0, remainingHours: 14, preferences: [], color: "#e3646b", email: "tarun@university.edu" },
//   { id: 22, facultyId: "FAC020", name: "Dr. Divya Malhotra", avatar: "DM", dept: "CSE", designation: "Assistant Professor", specialization: "Multimedia Systems, Graphics", course: "BCA", maxHours: 14, assignedHours: 0, remainingHours: 14, preferences: [], color: "#118ab2", email: "divya@university.edu" },
// ];

// // Default Subjects - Balanced for each course
// export const DEFAULT_SUBJECTS = [
//   // ========== BTECH (16 subjects - 8 per semester) ==========
//   // Semester 1 - Core (4), Major (2), Minor (2)
//   { id: "BT101", code: "BT101", name: "Data Structures", dept: "CSE", course: "BTech", semester: 1, credits: 4, modules: 5, type: "Both", theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5, approvalStatus: "approved", examType: "SEE", subjectType: "Core" },
//   { id: "BT102", code: "BT102", name: "Algorithms", dept: "CSE", course: "BTech", semester: 1, credits: 4, modules: 5, type: "Theory", theoryClassesPerWeek: 4, labPeriodsPerWeek: 0, totalWeeklyClasses: 4, approvalStatus: "approved", examType: "SEE", subjectType: "Core" },
//   { id: "BT103", code: "BT103", name: "Database Management Systems", dept: "CSE", course: "BTech", semester: 1, credits: 3, modules: 4, type: "Both", theoryClassesPerWeek: 2, labPeriodsPerWeek: 2, totalWeeklyClasses: 4, approvalStatus: "approved", examType: "SEE", subjectType: "Core" },
//   { id: "BT104", code: "BT104", name: "Object Oriented Programming", dept: "CSE", course: "BTech", semester: 1, credits: 4, modules: 5, type: "Both", theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5, approvalStatus: "approved", examType: "Practical", subjectType: "Core" },
//   { id: "BT105", code: "BT105", name: "Advanced Data Structures", dept: "CSE", course: "BTech", semester: 1, credits: 4, modules: 5, type: "Both", theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5, approvalStatus: "approved", examType: "SEE", subjectType: "Major" },
//   { id: "BT106", code: "BT106", name: "Machine Learning Basics", dept: "CSE", course: "BTech", semester: 1, credits: 4, modules: 5, type: "Both", theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5, approvalStatus: "approved", examType: "Practical", subjectType: "Major" },
//   { id: "BT107", code: "BT107", name: "Discrete Mathematics", dept: "CSE", course: "BTech", semester: 1, credits: 3, modules: 4, type: "Theory", theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3, approvalStatus: "approved", examType: "SEE", subjectType: "Minor" },
//   { id: "BT108", code: "BT108", name: "Digital Logic Design", dept: "CSE", course: "BTech", semester: 1, credits: 3, modules: 4, type: "Theory", theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3, approvalStatus: "approved", examType: "SEE", subjectType: "Minor" },
  
//   // Semester 2 - Core (4), Major (2), Minor (2)
//   { id: "BT201", code: "BT201", name: "Operating Systems", dept: "CSE", course: "BTech", semester: 2, credits: 3, modules: 4, type: "Both", theoryClassesPerWeek: 2, labPeriodsPerWeek: 2, totalWeeklyClasses: 4, approvalStatus: "approved", examType: "SEE", subjectType: "Core" },
//   { id: "BT202", code: "BT202", name: "Computer Networks", dept: "CSE", course: "BTech", semester: 2, credits: 3, modules: 4, type: "Both", theoryClassesPerWeek: 2, labPeriodsPerWeek: 2, totalWeeklyClasses: 4, approvalStatus: "approved", examType: "SEE", subjectType: "Core" },
//   { id: "BT203", code: "BT203", name: "Software Engineering", dept: "CSE", course: "BTech", semester: 2, credits: 3, modules: 4, type: "Theory", theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3, approvalStatus: "approved", examType: "Seminar", subjectType: "Core" },
//   { id: "BT204", code: "BT204", name: "Web Development", dept: "CSE", course: "BTech", semester: 2, credits: 4, modules: 5, type: "Both", theoryClassesPerWeek: 2, labPeriodsPerWeek: 4, totalWeeklyClasses: 6, approvalStatus: "approved", examType: "Practical", subjectType: "Core" },
//   { id: "BT205", code: "BT205", name: "Cloud Computing", dept: "CSE", course: "BTech", semester: 2, credits: 4, modules: 5, type: "Both", theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5, approvalStatus: "approved", examType: "SEE", subjectType: "Major" },
//   { id: "BT206", code: "BT206", name: "Artificial Intelligence", dept: "CSE", course: "BTech", semester: 2, credits: 4, modules: 5, type: "Both", theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5, approvalStatus: "approved", examType: "Practical", subjectType: "Major" },
//   { id: "BT207", code: "BT207", name: "Cyber Security", dept: "CSE", course: "BTech", semester: 2, credits: 3, modules: 4, type: "Theory", theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3, approvalStatus: "approved", examType: "SEE", subjectType: "Minor" },
//   { id: "BT208", code: "BT208", name: "Mobile App Development", dept: "CSE", course: "BTech", semester: 2, credits: 4, modules: 5, type: "Both", theoryClassesPerWeek: 2, labPeriodsPerWeek: 4, totalWeeklyClasses: 6, approvalStatus: "approved", examType: "Practical", subjectType: "Minor" },

//   // ========== BSC (14 subjects - 7 per semester) ==========
//   // Semester 1 - Core (3), Major (2), Minor (2)
//   { id: "BS101", code: "BS101", name: "Mathematics I", dept: "CSE", course: "BSc", semester: 1, credits: 3, modules: 4, type: "Theory", theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3, approvalStatus: "approved", examType: "SEE", subjectType: "Core" },
//   { id: "BS102", code: "BS102", name: "Programming Fundamentals", dept: "CSE", course: "BSc", semester: 1, credits: 4, modules: 5, type: "Both", theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5, approvalStatus: "approved", examType: "Practical", subjectType: "Core" },
//   { id: "BS103", code: "BS103", name: "Digital Electronics", dept: "CSE", course: "BSc", semester: 1, credits: 3, modules: 4, type: "Theory", theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3, approvalStatus: "approved", examType: "SEE", subjectType: "Core" },
//   { id: "BS104", code: "BS104", name: "C Programming", dept: "CSE", course: "BSc", semester: 1, credits: 4, modules: 5, type: "Both", theoryClassesPerWeek: 2, labPeriodsPerWeek: 4, totalWeeklyClasses: 6, approvalStatus: "approved", examType: "Practical", subjectType: "Major" },
//   { id: "BS105", code: "BS105", name: "Discrete Mathematics", dept: "CSE", course: "BSc", semester: 1, credits: 3, modules: 4, type: "Theory", theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3, approvalStatus: "approved", examType: "SEE", subjectType: "Major" },
//   { id: "BS106", code: "BS106", name: "Computer Organization", dept: "CSE", course: "BSc", semester: 1, credits: 3, modules: 4, type: "Theory", theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3, approvalStatus: "approved", examType: "SEE", subjectType: "Minor" },
//   { id: "BS107", code: "BS107", name: "Office Automation", dept: "CSE", course: "BSc", semester: 1, credits: 2, modules: 3, type: "Theory", theoryClassesPerWeek: 2, labPeriodsPerWeek: 0, totalWeeklyClasses: 2, approvalStatus: "approved", examType: "SEE", subjectType: "Minor" },
  
//   // Semester 2 - Core (3), Major (2), Minor (2)
//   { id: "BS201", code: "BS201", name: "Data Analysis", dept: "CSE", course: "BSc", semester: 2, credits: 3, modules: 4, type: "Both", theoryClassesPerWeek: 2, labPeriodsPerWeek: 2, totalWeeklyClasses: 4, approvalStatus: "approved", examType: "Practical", subjectType: "Core" },
//   { id: "BS202", code: "BS202", name: "Web Technologies", dept: "CSE", course: "BSc", semester: 2, credits: 4, modules: 5, type: "Both", theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5, approvalStatus: "approved", examType: "Practical", subjectType: "Core" },
//   { id: "BS203", code: "BS203", name: "Database Systems", dept: "CSE", course: "BSc", semester: 2, credits: 3, modules: 4, type: "Both", theoryClassesPerWeek: 2, labPeriodsPerWeek: 2, totalWeeklyClasses: 4, approvalStatus: "approved", examType: "SEE", subjectType: "Core" },
//   { id: "BS204", code: "BS204", name: "Python Programming", dept: "CSE", course: "BSc", semester: 2, credits: 4, modules: 5, type: "Both", theoryClassesPerWeek: 2, labPeriodsPerWeek: 4, totalWeeklyClasses: 6, approvalStatus: "approved", examType: "Practical", subjectType: "Major" },
//   { id: "BS205", code: "BS205", name: "Computer Graphics", dept: "CSE", course: "BSc", semester: 2, credits: 3, modules: 4, type: "Theory", theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3, approvalStatus: "approved", examType: "SEE", subjectType: "Major" },
//   { id: "BS206", code: "BS206", name: "Internet of Things", dept: "CSE", course: "BSc", semester: 2, credits: 3, modules: 4, type: "Theory", theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3, approvalStatus: "approved", examType: "SEE", subjectType: "Minor" },
//   { id: "BS207", code: "BS207", name: "Multimedia Systems", dept: "CSE", course: "BSc", semester: 2, credits: 3, modules: 4, type: "Theory", theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3, approvalStatus: "approved", examType: "SEE", subjectType: "Minor" },

//   // ========== BCA (14 subjects - 7 per semester) ==========
//   // Semester 1 - Core (3), Major (2), Minor (2)
//   { id: "BC101", code: "BC101", name: "Introduction to Programming", dept: "CSE", course: "BCA", semester: 1, credits: 3, modules: 4, type: "Both", theoryClassesPerWeek: 2, labPeriodsPerWeek: 2, totalWeeklyClasses: 4, approvalStatus: "approved", examType: "Practical", subjectType: "Core" },
//   { id: "BC102", code: "BC102", name: "Computer Fundamentals", dept: "CSE", course: "BCA", semester: 1, credits: 2, modules: 3, type: "Theory", theoryClassesPerWeek: 2, labPeriodsPerWeek: 0, totalWeeklyClasses: 2, approvalStatus: "approved", examType: "SEE", subjectType: "Core" },
//   { id: "BC103", code: "BC103", name: "Mathematics for Computing", dept: "CSE", course: "BCA", semester: 1, credits: 3, modules: 4, type: "Theory", theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3, approvalStatus: "approved", examType: "SEE", subjectType: "Core" },
//   { id: "BC104", code: "BC104", name: "C Programming Lab", dept: "CSE", course: "BCA", semester: 1, credits: 2, modules: 3, type: "Lab", theoryClassesPerWeek: 0, labPeriodsPerWeek: 4, totalWeeklyClasses: 4, approvalStatus: "approved", examType: "Practical", subjectType: "Major" },
//   { id: "BC105", code: "BC105", name: "Digital Logic", dept: "CSE", course: "BCA", semester: 1, credits: 3, modules: 4, type: "Theory", theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3, approvalStatus: "approved", examType: "SEE", subjectType: "Major" },
//   { id: "BC106", code: "BC106", name: "Office Automation Tools", dept: "CSE", course: "BCA", semester: 1, credits: 2, modules: 3, type: "Theory", theoryClassesPerWeek: 2, labPeriodsPerWeek: 0, totalWeeklyClasses: 2, approvalStatus: "approved", examType: "SEE", subjectType: "Minor" },
//   { id: "BC107", code: "BC107", name: "Communication Skills", dept: "CSE", course: "BCA", semester: 1, credits: 2, modules: 3, type: "Theory", theoryClassesPerWeek: 2, labPeriodsPerWeek: 0, totalWeeklyClasses: 2, approvalStatus: "approved", examType: "Seminar", subjectType: "Minor" },
  
//   // Semester 2 - Core (3), Major (2), Minor (2)
//   { id: "BC201", code: "BC201", name: "Object Oriented Programming", dept: "CSE", course: "BCA", semester: 2, credits: 4, modules: 5, type: "Both", theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5, approvalStatus: "approved", examType: "Practical", subjectType: "Core" },
//   { id: "BC202", code: "BC202", name: "Data Structures using C++", dept: "CSE", course: "BCA", semester: 2, credits: 4, modules: 5, type: "Both", theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5, approvalStatus: "approved", examType: "Practical", subjectType: "Core" },
//   { id: "BC203", code: "BC203", name: "Software Engineering", dept: "CSE", course: "BCA", semester: 2, credits: 3, modules: 4, type: "Theory", theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3, approvalStatus: "approved", examType: "Seminar", subjectType: "Core" },
//   { id: "BC204", code: "BC204", name: "Database Management Systems", dept: "CSE", course: "BCA", semester: 2, credits: 4, modules: 5, type: "Both", theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5, approvalStatus: "approved", examType: "SEE", subjectType: "Major" },
//   { id: "BC205", code: "BC205", name: "Internet Technologies", dept: "CSE", course: "BCA", semester: 2, credits: 3, modules: 4, type: "Theory", theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3, approvalStatus: "approved", examType: "SEE", subjectType: "Major" },
//   { id: "BC206", code: "BC206", name: "Multimedia Systems", dept: "CSE", course: "BCA", semester: 2, credits: 3, modules: 4, type: "Theory", theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3, approvalStatus: "approved", examType: "SEE", subjectType: "Minor" },
//   { id: "BC207", code: "BC207", name: "Web Design Lab", dept: "CSE", course: "BCA", semester: 2, credits: 2, modules: 3, type: "Lab", theoryClassesPerWeek: 0, labPeriodsPerWeek: 4, totalWeeklyClasses: 4, approvalStatus: "approved", examType: "Practical", subjectType: "Minor" },
// ];

// // Default Subject Preferences
// export const DEFAULT_SUBJECT_PREFERENCES = [
//   { id: 1, facultyId: 3, facultyName: "Dr. Rahul Krishnan", avatar: "RK", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 2, facultyId: 4, facultyName: "Dr. Priya Iyer", avatar: "PI", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 3, facultyId: 5, facultyName: "Dr. Amit Sharma", avatar: "AS", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 4, facultyId: 6, facultyName: "Dr. Neha Gupta", avatar: "NG", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 5, facultyId: 7, facultyName: "Dr. Vikram Singh", avatar: "VS", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 6, facultyId: 8, facultyName: "Dr. Anita Roy", avatar: "AR", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 7, facultyId: 9, facultyName: "Dr. Sanjay Mehta", avatar: "SM", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 8, facultyId: 10, facultyName: "Dr. Pooja Reddy", avatar: "PR", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 9, facultyId: 11, facultyName: "Prof. Suresh Kumar", avatar: "SK", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 10, facultyId: 12, facultyName: "Prof. Deepa Nair", avatar: "DN", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 11, facultyId: 13, facultyName: "Dr. Rajesh Kumar", avatar: "RK", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 12, facultyId: 14, facultyName: "Dr. Kavita Joshi", avatar: "KJ", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 13, facultyId: 15, facultyName: "Dr. Manoj Tiwari", avatar: "MT", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 14, facultyId: 16, facultyName: "Dr. Swati Desai", avatar: "SD", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 15, facultyId: 17, facultyName: "Dr. Alok Mishra", avatar: "AM", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 16, facultyId: 18, facultyName: "Dr. Rekha Verma", avatar: "RV", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 17, facultyId: 19, facultyName: "Dr. Naveen Bhatia", avatar: "NB", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 18, facultyId: 20, facultyName: "Dr. Monica Sethi", avatar: "MS", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 19, facultyId: 21, facultyName: "Dr. Tarun Kapoor", avatar: "TK", status: "pending", submitted: false, feedback: "", preferences: [] },
//   { id: 20, facultyId: 22, facultyName: "Dr. Divya Malhotra", avatar: "DM", status: "pending", submitted: false, feedback: "", preferences: [] },
// ];

// // Default Rooms (increased)
// export const DEFAULT_ROOMS = [
//   { id: "R001", name: "Hall 201", type: "Theory", capacity: 60 },
//   { id: "R002", name: "Hall 202", type: "Theory", capacity: 60 },
//   { id: "R003", name: "Hall 203", type: "Theory", capacity: 60 },
//   { id: "R004", name: "Hall 301", type: "Theory", capacity: 50 },
//   { id: "R005", name: "Hall 302", type: "Theory", capacity: 50 },
//   { id: "R006", name: "Hall 303", type: "Theory", capacity: 50 },
//   { id: "R007", name: "Hall 304", type: "Theory", capacity: 50 },
//   { id: "R008", name: "Hall 305", type: "Theory", capacity: 50 },
//   { id: "R009", name: "Lab 1", type: "Lab", capacity: 30 },
//   { id: "R010", name: "Lab 2", type: "Lab", capacity: 30 },
//   { id: "R011", name: "Lab 3", type: "Lab", capacity: 30 },
//   { id: "R012", name: "Lab 4", type: "Lab", capacity: 30 },
//   { id: "R013", name: "Lab 5", type: "Lab", capacity: 30 },
//   { id: "R014", name: "Lab 6", type: "Lab", capacity: 30 },
// ];

// // Default Timetable Configuration
// export const DEFAULT_TIMETABLE_CONFIG = {
//   startTime: "09:10",
//   endTime: "16:50",
//   classDuration: 50,
//   breakDuration: 10,
//   lunchBreak: { start: "12:30", duration: 40 },
//   days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
// };

// // Default Semester Details - Updated with balanced subjects
// export const DEFAULT_SEMESTER_DETAILS = {
//   BTech: {
//     1: {
//       subjects: ["BT101", "BT102", "BT103", "BT104", "BT105", "BT106", "BT107", "BT108"],
//       defaultFaculty: {
//         "BT101": 3, "BT102": 4, "BT103": 5, "BT104": 6, "BT105": 7, "BT106": 8, "BT107": 9, "BT108": 10
//       }
//     },
//     2: {
//       subjects: ["BT201", "BT202", "BT203", "BT204", "BT205", "BT206", "BT207", "BT208"],
//       defaultFaculty: {
//         "BT201": 3, "BT202": 4, "BT203": 5, "BT204": 6, "BT205": 7, "BT206": 8, "BT207": 9, "BT208": 10
//       }
//     }
//   },
//   BSc: {
//     1: {
//       subjects: ["BS101", "BS102", "BS103", "BS104", "BS105", "BS106", "BS107"],
//       defaultFaculty: {
//         "BS101": 11, "BS102": 12, "BS103": 13, "BS104": 14, "BS105": 15, "BS106": 16, "BS107": 11
//       }
//     },
//     2: {
//       subjects: ["BS201", "BS202", "BS203", "BS204", "BS205", "BS206", "BS207"],
//       defaultFaculty: {
//         "BS201": 12, "BS202": 13, "BS203": 14, "BS204": 15, "BS205": 16, "BS206": 11, "BS207": 12
//       }
//     }
//   },
//   BCA: {
//     1: {
//       subjects: ["BC101", "BC102", "BC103", "BC104", "BC105", "BC106", "BC107"],
//       defaultFaculty: {
//         "BC101": 17, "BC102": 18, "BC103": 19, "BC104": 20, "BC105": 21, "BC106": 22, "BC107": 17
//       }
//     },
//     2: {
//       subjects: ["BC201", "BC202", "BC203", "BC204", "BC205", "BC206", "BC207"],
//       defaultFaculty: {
//         "BC201": 18, "BC202": 19, "BC203": 20, "BC204": 21, "BC205": 22, "BC206": 17, "BC207": 18
//       }
//     }
//   }
// };

// // Default Calendar Events
// export const DEFAULT_CALENDAR_EVENTS = [
//   { id: 1, title: "Semester Begins", date: "2025-01-10", type: "academic" },
//   { id: 2, title: "Mid-Semester Exams", date: "2025-03-01", type: "exam" },
//   { id: 3, title: "End Semester Exams", date: "2025-05-15", type: "exam" },
//   { id: 4, title: "Timetable Release", date: "2025-01-05", type: "admin" },
// ];

// // Default Form Status
// export const DEFAULT_FORM_STATUS = {
//   isFloated: false,
//   floatedDate: null,
//   floatedBy: null,
//   semester: "2025",
//   deadline: null
// };

// // Default Class Teachers
// export const DEFAULT_CLASS_TEACHERS = {
//   BTech: { 1: { facultyId: 3, assignedDate: null }, 2: { facultyId: 4, assignedDate: null } },
//   BSc: { 1: { facultyId: 11, assignedDate: null }, 2: { facultyId: 12, assignedDate: null } },
//   BCA: { 1: { facultyId: 17, assignedDate: null }, 2: { facultyId: 18, assignedDate: null } }
// };

// // Default Course Leads
// export const DEFAULT_COURSE_LEADS = {
//   BTech: { facultyId: 3, assignedDate: null },
//   BSc: { facultyId: 11, assignedDate: null },
//   BCA: { facultyId: 17, assignedDate: null }
// };

// // Default EA Permissions
// export const DEFAULT_EA_PERMISSIONS = {
//   subjectApproval: false,
//   preferenceApproval: false,
//   courseApproval: false,
//   timetableGeneration: false,
//   viewReports: true,
//   manageFaculty: false,
//   viewAllData: true
// };

// // Default Visiting Faculty Permissions
// export const DEFAULT_VISITING_FACULTY_PERMISSIONS = {
//   canViewTimetable: true,
//   canViewSyllabus: true,
//   canUpdateSyllabus: false,
//   canViewProfile: true,
//   canRequestLeave: true,
//   canViewStudents: false,
//   canSubmitGrades: false,
//   canAccessPreferences: false,
//   canAccessCourseDetails: false,
//   canRaiseIssues: true,
//   maxHoursPerWeek: 8
// };

// export const DEFAULT_SUBJECT_DELETION_REQUESTS = [];

// // Storage Keys
// export const STORAGE_KEYS = {
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
//   LEAVE_REQUESTS: 'acadplan_leave_requests',
//   CALENDAR_EVENTS: 'acadplan_calendar_events',
//   FORM_STATUS: 'acadplan_form_status',
//   PREFERENCE_SETTINGS: 'acadplan_preference_settings',
//   FACULTY_PREFERENCE_FORM: 'acadplan_faculty_preference_form',
//   FACULTY_SUBMISSIONS: 'acadplan_faculty_submissions',
//   CLASS_TEACHERS: 'acadplan_class_teachers',
//   COURSE_LEADS: 'acadplan_course_leads',
//   APPOINTMENTS: 'acadplan_appointments',
//   EA_PERMISSIONS: 'acadplan_ea_permissions',
//   MOCK_USERS: 'acadplan_mock_users',
//   VISITING_FACULTY_PERMISSIONS: 'acadplan_visiting_faculty_permissions',
//   VISITING_FACULTY_SYLLABUS: 'acadplan_visiting_faculty_syllabus',
//   VISITING_FACULTY_TIMETABLE: 'acadplan_visiting_faculty_timetable',
//   SUBJECT_DELETION_REQUESTS: 'acadplan_subject_deletion_requests'
// };

// src/data/mockData.js

// Mock Users with passwordChanged flag
export const MOCK_USERS = [
  { id: 1, email: "dean@university.edu", password: "dean123", role: "admin", name: "Dr. Aravind Sharma", avatar: "AS", school: "Central Administration", passwordChanged: true },
  { id: 2, email: "coordinator@university.edu", password: "coord123", role: "coordinator", name: "Prof. Meera Nair", avatar: "MN", school: "Timetable Office", passwordChanged: true },
  // BTech Faculty (8 faculty)
  { id: 3, email: "rahul@university.edu", password: "faculty123", role: "faculty", name: "Dr. Rahul Krishnan", avatar: "RK", school: "SoCSE", designation: "Professor", course: "BTech", passwordChanged: true },
  { id: 4, email: "priya@university.edu", password: "faculty123", role: "faculty", name: "Dr. Priya Iyer", avatar: "PI", school: "SoCSE", designation: "Professor", course: "BTech", passwordChanged: true },
  { id: 5, email: "amit@university.edu", password: "faculty123", role: "faculty", name: "Dr. Amit Sharma", avatar: "AS", school: "SoCSE", designation: "Associate Professor", course: "BTech", passwordChanged: true },
  { id: 6, email: "neha@university.edu", password: "faculty123", role: "faculty", name: "Dr. Neha Gupta", avatar: "NG", school: "SoCSE", designation: "Associate Professor", course: "BTech", passwordChanged: true },
  { id: 7, email: "vikram@university.edu", password: "faculty123", role: "faculty", name: "Dr. Vikram Singh", avatar: "VS", school: "SoCSE", designation: "Assistant Professor", course: "BTech", passwordChanged: true },
  { id: 8, email: "anita@university.edu", password: "faculty123", role: "faculty", name: "Dr. Anita Roy", avatar: "AR", school: "SoCSE", designation: "Assistant Professor", course: "BTech", passwordChanged: true },
  { id: 9, email: "sanjay@university.edu", password: "faculty123", role: "faculty", name: "Dr. Sanjay Mehta", avatar: "SM", school: "SoCSE", designation: "Assistant Professor", course: "BTech", passwordChanged: true },
  { id: 10, email: "pooja@university.edu", password: "faculty123", role: "faculty", name: "Dr. Pooja Reddy", avatar: "PR", school: "SoCSE", designation: "Assistant Professor", course: "BTech", passwordChanged: true },
  // BSc Faculty (6 faculty)
  { id: 11, email: "suresh@university.edu", password: "faculty123", role: "faculty", name: "Prof. Suresh Kumar", avatar: "SK", school: "SoCSE", designation: "Professor", course: "BSc", passwordChanged: true },
  { id: 12, email: "deepa@university.edu", password: "faculty123", role: "faculty", name: "Prof. Deepa Nair", avatar: "DN", school: "SoCSE", designation: "Professor", course: "BSc", passwordChanged: true },
  { id: 13, email: "rajesh@university.edu", password: "faculty123", role: "faculty", name: "Dr. Rajesh Kumar", avatar: "RK", school: "SoCSE", designation: "Associate Professor", course: "BSc", passwordChanged: true },
  { id: 14, email: "kavita@university.edu", password: "faculty123", role: "faculty", name: "Dr. Kavita Joshi", avatar: "KJ", school: "SoCSE", designation: "Assistant Professor", course: "BSc", passwordChanged: true },
  { id: 15, email: "manoj@university.edu", password: "faculty123", role: "faculty", name: "Dr. Manoj Tiwari", avatar: "MT", school: "SoCSE", designation: "Assistant Professor", course: "BSc", passwordChanged: true },
  { id: 16, email: "swati@university.edu", password: "faculty123", role: "faculty", name: "Dr. Swati Desai", avatar: "SD", school: "SoCSE", designation: "Assistant Professor", course: "BSc", passwordChanged: true },
  // BCA Faculty (6 faculty)
  { id: 17, email: "alok@university.edu", password: "faculty123", role: "faculty", name: "Dr. Alok Mishra", avatar: "AM", school: "SoCSE", designation: "Professor", course: "BCA", passwordChanged: true },
  { id: 18, email: "rekha@university.edu", password: "faculty123", role: "faculty", name: "Dr. Rekha Verma", avatar: "RV", school: "SoCSE", designation: "Associate Professor", course: "BCA", passwordChanged: true },
  { id: 19, email: "naveen@university.edu", password: "faculty123", role: "faculty", name: "Dr. Naveen Bhatia", avatar: "NB", school: "SoCSE", designation: "Assistant Professor", course: "BCA", passwordChanged: true },
  { id: 20, email: "monica@university.edu", password: "faculty123", role: "faculty", name: "Dr. Monica Sethi", avatar: "MS", school: "SoCSE", designation: "Assistant Professor", course: "BCA", passwordChanged: true },
  { id: 21, email: "tarun@university.edu", password: "faculty123", role: "faculty", name: "Dr. Tarun Kapoor", avatar: "TK", school: "SoCSE", designation: "Assistant Professor", course: "BCA", passwordChanged: true },
  { id: 22, email: "divya@university.edu", password: "faculty123", role: "faculty", name: "Dr. Divya Malhotra", avatar: "DM", school: "SoCSE", designation: "Assistant Professor", course: "BCA", passwordChanged: true },
  // Students
  { id: 23, email: "student.btech@university.edu", password: "student123", role: "student", name: "Rohan Mehta", avatar: "RM", course: "BTech", semester: 1, section: "A", passwordChanged: true },
  { id: 24, email: "student.bsc@university.edu", password: "student123", role: "student", name: "Priya Sharma", avatar: "PS", course: "BSc", semester: 1, section: "B", passwordChanged: true },
  { id: 25, email: "student.bca@university.edu", password: "student123", role: "student", name: "Arjun Kumar", avatar: "AK", course: "BCA", semester: 2, section: "C", passwordChanged: true },
  // Director
  { id: 26, email: "director@university.edu", password: "director123", role: "director", name: "Prof. Rajesh Menon", avatar: "RM", school: "School of CSE", passwordChanged: true },
  // EA
  { id: 27, email: "ea@university.edu", password: "ea123", role: "ea", name: "Sarah Johnson", avatar: "SJ", school: "Dean's Office", passwordChanged: true },
  // Visiting Faculty
  { id: 28, email: "visiting@university.edu", password: "visiting123", role: "visiting_faculty", name: "Dr. James Wilson", avatar: "JW", school: "SoCSE", designation: "Visiting Professor", course: "BTech", passwordChanged: true },
];

// Courses, Semesters, Sections
export const COURSES = ["BTech", "BSc", "BCA"];
export const SEMESTERS = [1, 2];
export const SECTIONS = ["A", "B", "C"];

// Exam Types and Subject Types
export const EXAM_TYPES = ["SEE", "Practical", "Seminar"];
export const SUBJECT_TYPES = ["Core", "Major", "Minor"];

// Workload Limits based on designation
export const WORKLOAD_LIMITS = {
  "Assistant Professor": 14,
  "Associate Professor": 12,
  "Professor": 10,
};

// Default Faculty Data with Location Fields
export const DEFAULT_FACULTY = [
  // BTech Faculty (8 faculty - 94 hours total)
  { id: 3, facultyId: "FAC001", name: "Dr. Rahul Krishnan", avatar: "RK", dept: "CSE", designation: "Professor", specialization: "Data Structures, Algorithms", course: "BTech", maxHours: 10, assignedHours: 0, remainingHours: 10, preferences: [], color: "#4361ee", email: "rahul@university.edu", block: "Academic Block A", floor: "3rd Floor", roomNumber: "301", cabinLocation: "A-301" },
  { id: 4, facultyId: "FAC002", name: "Dr. Priya Iyer", avatar: "PI", dept: "CSE", designation: "Professor", specialization: "Machine Learning, AI", course: "BTech", maxHours: 10, assignedHours: 0, remainingHours: 10, preferences: [], color: "#9d4edd", email: "priya@university.edu", block: "Academic Block A", floor: "3rd Floor", roomNumber: "302", cabinLocation: "A-302" },
  { id: 5, facultyId: "FAC003", name: "Dr. Amit Sharma", avatar: "AS", dept: "CSE", designation: "Associate Professor", specialization: "DBMS, OS", course: "BTech", maxHours: 12, assignedHours: 0, remainingHours: 12, preferences: [], color: "#06d6a0", email: "amit@university.edu", block: "Academic Block A", floor: "2nd Floor", roomNumber: "201", cabinLocation: "A-201" },
  { id: 6, facultyId: "FAC004", name: "Dr. Neha Gupta", avatar: "NG", dept: "CSE", designation: "Associate Professor", specialization: "Computer Networks, Security", course: "BTech", maxHours: 12, assignedHours: 0, remainingHours: 12, preferences: [], color: "#ffb703", email: "neha@university.edu", block: "Academic Block A", floor: "2nd Floor", roomNumber: "202", cabinLocation: "A-202" },
  { id: 7, facultyId: "FAC005", name: "Dr. Vikram Singh", avatar: "VS", dept: "CSE", designation: "Assistant Professor", specialization: "Web Development, React", course: "BTech", maxHours: 14, assignedHours: 0, remainingHours: 14, preferences: [], color: "#e3646b", email: "vikram@university.edu", block: "Academic Block B", floor: "1st Floor", roomNumber: "101", cabinLocation: "B-101" },
  { id: 8, facultyId: "FAC006", name: "Dr. Anita Roy", avatar: "AR", dept: "CSE", designation: "Assistant Professor", specialization: "Python, Data Science", course: "BTech", maxHours: 14, assignedHours: 0, remainingHours: 14, preferences: [], color: "#6b705c", email: "anita@university.edu", block: "Academic Block B", floor: "1st Floor", roomNumber: "102", cabinLocation: "B-102" },
  { id: 9, facultyId: "FAC007", name: "Dr. Sanjay Mehta", avatar: "SM", dept: "CSE", designation: "Assistant Professor", specialization: "Cloud Computing, DevOps", course: "BTech", maxHours: 14, assignedHours: 0, remainingHours: 14, preferences: [], color: "#118ab2", email: "sanjay@university.edu", block: "Academic Block B", floor: "2nd Floor", roomNumber: "201", cabinLocation: "B-201" },
  { id: 10, facultyId: "FAC008", name: "Dr. Pooja Reddy", avatar: "PR", dept: "CSE", designation: "Assistant Professor", specialization: "Software Engineering, Testing", course: "BTech", maxHours: 14, assignedHours: 0, remainingHours: 14, preferences: [], color: "#ef476f", email: "pooja@university.edu", block: "Academic Block B", floor: "2nd Floor", roomNumber: "202", cabinLocation: "B-202" },
  
  // BSc Faculty (6 faculty - 74 hours total)
  { id: 11, facultyId: "FAC009", name: "Prof. Suresh Kumar", avatar: "SK", dept: "CSE", designation: "Professor", specialization: "Mathematics, Discrete Structures", course: "BSc", maxHours: 10, assignedHours: 0, remainingHours: 10, preferences: [], color: "#ffb703", email: "suresh@university.edu", block: "Science Block", floor: "2nd Floor", roomNumber: "201", cabinLocation: "S-201" },
  { id: 12, facultyId: "FAC010", name: "Prof. Deepa Nair", avatar: "DN", dept: "CSE", designation: "Professor", specialization: "Programming Fundamentals, C", course: "BSc", maxHours: 10, assignedHours: 0, remainingHours: 10, preferences: [], color: "#6b705c", email: "deepa@university.edu", block: "Science Block", floor: "2nd Floor", roomNumber: "202", cabinLocation: "S-202" },
  { id: 13, facultyId: "FAC011", name: "Dr. Rajesh Kumar", avatar: "RK", dept: "CSE", designation: "Associate Professor", specialization: "Database Systems, SQL", course: "BSc", maxHours: 12, assignedHours: 0, remainingHours: 12, preferences: [], color: "#9d4edd", email: "rajesh@university.edu", block: "Science Block", floor: "1st Floor", roomNumber: "101", cabinLocation: "S-101" },
  { id: 14, facultyId: "FAC012", name: "Dr. Kavita Joshi", avatar: "KJ", dept: "CSE", designation: "Assistant Professor", specialization: "Web Technologies, HTML/CSS", course: "BSc", maxHours: 14, assignedHours: 0, remainingHours: 14, preferences: [], color: "#06d6a0", email: "kavita@university.edu", block: "Science Block", floor: "1st Floor", roomNumber: "102", cabinLocation: "S-102" },
  { id: 15, facultyId: "FAC013", name: "Dr. Manoj Tiwari", avatar: "MT", dept: "CSE", designation: "Assistant Professor", specialization: "Data Analysis, Python", course: "BSc", maxHours: 14, assignedHours: 0, remainingHours: 14, preferences: [], color: "#e3646b", email: "manoj@university.edu", block: "Science Block", floor: "Ground Floor", roomNumber: "001", cabinLocation: "S-001" },
  { id: 16, facultyId: "FAC014", name: "Dr. Swati Desai", avatar: "SD", dept: "CSE", designation: "Assistant Professor", specialization: "Computer Graphics, Multimedia", course: "BSc", maxHours: 14, assignedHours: 0, remainingHours: 14, preferences: [], color: "#118ab2", email: "swati@university.edu", block: "Science Block", floor: "Ground Floor", roomNumber: "002", cabinLocation: "S-002" },
  
  // BCA Faculty (6 faculty - 74 hours total)
  { id: 17, facultyId: "FAC015", name: "Dr. Alok Mishra", avatar: "AM", dept: "CSE", designation: "Professor", specialization: "Object Oriented Programming, C++", course: "BCA", maxHours: 10, assignedHours: 0, remainingHours: 10, preferences: [], color: "#4361ee", email: "alok@university.edu", block: "Academic Block C", floor: "2nd Floor", roomNumber: "201", cabinLocation: "C-201" },
  { id: 18, facultyId: "FAC016", name: "Dr. Rekha Verma", avatar: "RV", dept: "CSE", designation: "Associate Professor", specialization: "Data Structures, Algorithms", course: "BCA", maxHours: 12, assignedHours: 0, remainingHours: 12, preferences: [], color: "#ffb703", email: "rekha@university.edu", block: "Academic Block C", floor: "2nd Floor", roomNumber: "202", cabinLocation: "C-202" },
  { id: 19, facultyId: "FAC017", name: "Dr. Naveen Bhatia", avatar: "NB", dept: "CSE", designation: "Assistant Professor", specialization: "Software Engineering, Testing", course: "BCA", maxHours: 14, assignedHours: 0, remainingHours: 14, preferences: [], color: "#9d4edd", email: "naveen@university.edu", block: "Academic Block C", floor: "1st Floor", roomNumber: "101", cabinLocation: "C-101" },
  { id: 20, facultyId: "FAC018", name: "Dr. Monica Sethi", avatar: "MS", dept: "CSE", designation: "Assistant Professor", specialization: "Database Management, SQL", course: "BCA", maxHours: 14, assignedHours: 0, remainingHours: 14, preferences: [], color: "#06d6a0", email: "monica@university.edu", block: "Academic Block C", floor: "1st Floor", roomNumber: "102", cabinLocation: "C-102" },
  { id: 21, facultyId: "FAC019", name: "Dr. Tarun Kapoor", avatar: "TK", dept: "CSE", designation: "Assistant Professor", specialization: "Internet Technologies, Web Dev", course: "BCA", maxHours: 14, assignedHours: 0, remainingHours: 14, preferences: [], color: "#e3646b", email: "tarun@university.edu", block: "Academic Block C", floor: "Ground Floor", roomNumber: "001", cabinLocation: "C-001" },
  { id: 22, facultyId: "FAC020", name: "Dr. Divya Malhotra", avatar: "DM", dept: "CSE", designation: "Assistant Professor", specialization: "Multimedia Systems, Graphics", course: "BCA", maxHours: 14, assignedHours: 0, remainingHours: 14, preferences: [], color: "#118ab2", email: "divya@university.edu", block: "Academic Block C", floor: "Ground Floor", roomNumber: "002", cabinLocation: "C-002" },
];

// Default Subjects - Balanced for each course
export const DEFAULT_SUBJECTS = [
  // ========== BTECH (16 subjects - 8 per semester) ==========
  // Semester 1 - Core (4), Major (2), Minor (2)
  { id: "BT101", code: "BT101", name: "Data Structures", dept: "CSE", course: "BTech", semester: 1, credits: 4, modules: 5, type: "Both", theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5, approvalStatus: "approved", examType: "SEE", subjectType: "Core" },
  { id: "BT102", code: "BT102", name: "Algorithms", dept: "CSE", course: "BTech", semester: 1, credits: 4, modules: 5, type: "Theory", theoryClassesPerWeek: 4, labPeriodsPerWeek: 0, totalWeeklyClasses: 4, approvalStatus: "approved", examType: "SEE", subjectType: "Core" },
  { id: "BT103", code: "BT103", name: "Database Management Systems", dept: "CSE", course: "BTech", semester: 1, credits: 3, modules: 4, type: "Both", theoryClassesPerWeek: 2, labPeriodsPerWeek: 2, totalWeeklyClasses: 4, approvalStatus: "approved", examType: "SEE", subjectType: "Core" },
  { id: "BT104", code: "BT104", name: "Object Oriented Programming", dept: "CSE", course: "BTech", semester: 1, credits: 4, modules: 5, type: "Both", theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5, approvalStatus: "approved", examType: "Practical", subjectType: "Core" },
  { id: "BT105", code: "BT105", name: "Advanced Data Structures", dept: "CSE", course: "BTech", semester: 1, credits: 4, modules: 5, type: "Both", theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5, approvalStatus: "approved", examType: "SEE", subjectType: "Major" },
  { id: "BT106", code: "BT106", name: "Machine Learning Basics", dept: "CSE", course: "BTech", semester: 1, credits: 4, modules: 5, type: "Both", theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5, approvalStatus: "approved", examType: "Practical", subjectType: "Major" },
  { id: "BT107", code: "BT107", name: "Discrete Mathematics", dept: "CSE", course: "BTech", semester: 1, credits: 3, modules: 4, type: "Theory", theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3, approvalStatus: "approved", examType: "SEE", subjectType: "Minor" },
  { id: "BT108", code: "BT108", name: "Digital Logic Design", dept: "CSE", course: "BTech", semester: 1, credits: 3, modules: 4, type: "Theory", theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3, approvalStatus: "approved", examType: "SEE", subjectType: "Minor" },
  
  // Semester 2 - Core (4), Major (2), Minor (2)
  { id: "BT201", code: "BT201", name: "Operating Systems", dept: "CSE", course: "BTech", semester: 2, credits: 3, modules: 4, type: "Both", theoryClassesPerWeek: 2, labPeriodsPerWeek: 2, totalWeeklyClasses: 4, approvalStatus: "approved", examType: "SEE", subjectType: "Core" },
  { id: "BT202", code: "BT202", name: "Computer Networks", dept: "CSE", course: "BTech", semester: 2, credits: 3, modules: 4, type: "Both", theoryClassesPerWeek: 2, labPeriodsPerWeek: 2, totalWeeklyClasses: 4, approvalStatus: "approved", examType: "SEE", subjectType: "Core" },
  { id: "BT203", code: "BT203", name: "Software Engineering", dept: "CSE", course: "BTech", semester: 2, credits: 3, modules: 4, type: "Theory", theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3, approvalStatus: "approved", examType: "Seminar", subjectType: "Core" },
  { id: "BT204", code: "BT204", name: "Web Development", dept: "CSE", course: "BTech", semester: 2, credits: 4, modules: 5, type: "Both", theoryClassesPerWeek: 2, labPeriodsPerWeek: 4, totalWeeklyClasses: 6, approvalStatus: "approved", examType: "Practical", subjectType: "Core" },
  { id: "BT205", code: "BT205", name: "Cloud Computing", dept: "CSE", course: "BTech", semester: 2, credits: 4, modules: 5, type: "Both", theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5, approvalStatus: "approved", examType: "SEE", subjectType: "Major" },
  { id: "BT206", code: "BT206", name: "Artificial Intelligence", dept: "CSE", course: "BTech", semester: 2, credits: 4, modules: 5, type: "Both", theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5, approvalStatus: "approved", examType: "Practical", subjectType: "Major" },
  { id: "BT207", code: "BT207", name: "Cyber Security", dept: "CSE", course: "BTech", semester: 2, credits: 3, modules: 4, type: "Theory", theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3, approvalStatus: "approved", examType: "SEE", subjectType: "Minor" },
  { id: "BT208", code: "BT208", name: "Mobile App Development", dept: "CSE", course: "BTech", semester: 2, credits: 4, modules: 5, type: "Both", theoryClassesPerWeek: 2, labPeriodsPerWeek: 4, totalWeeklyClasses: 6, approvalStatus: "approved", examType: "Practical", subjectType: "Minor" },

  // ========== BSC (14 subjects - 7 per semester) ==========
  // Semester 1 - Core (3), Major (2), Minor (2)
  { id: "BS101", code: "BS101", name: "Mathematics I", dept: "CSE", course: "BSc", semester: 1, credits: 3, modules: 4, type: "Theory", theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3, approvalStatus: "approved", examType: "SEE", subjectType: "Core" },
  { id: "BS102", code: "BS102", name: "Programming Fundamentals", dept: "CSE", course: "BSc", semester: 1, credits: 4, modules: 5, type: "Both", theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5, approvalStatus: "approved", examType: "Practical", subjectType: "Core" },
  { id: "BS103", code: "BS103", name: "Digital Electronics", dept: "CSE", course: "BSc", semester: 1, credits: 3, modules: 4, type: "Theory", theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3, approvalStatus: "approved", examType: "SEE", subjectType: "Core" },
  { id: "BS104", code: "BS104", name: "C Programming", dept: "CSE", course: "BSc", semester: 1, credits: 4, modules: 5, type: "Both", theoryClassesPerWeek: 2, labPeriodsPerWeek: 4, totalWeeklyClasses: 6, approvalStatus: "approved", examType: "Practical", subjectType: "Major" },
  { id: "BS105", code: "BS105", name: "Discrete Mathematics", dept: "CSE", course: "BSc", semester: 1, credits: 3, modules: 4, type: "Theory", theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3, approvalStatus: "approved", examType: "SEE", subjectType: "Major" },
  { id: "BS106", code: "BS106", name: "Computer Organization", dept: "CSE", course: "BSc", semester: 1, credits: 3, modules: 4, type: "Theory", theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3, approvalStatus: "approved", examType: "SEE", subjectType: "Minor" },
  { id: "BS107", code: "BS107", name: "Office Automation", dept: "CSE", course: "BSc", semester: 1, credits: 2, modules: 3, type: "Theory", theoryClassesPerWeek: 2, labPeriodsPerWeek: 0, totalWeeklyClasses: 2, approvalStatus: "approved", examType: "SEE", subjectType: "Minor" },
  
  // Semester 2 - Core (3), Major (2), Minor (2)
  { id: "BS201", code: "BS201", name: "Data Analysis", dept: "CSE", course: "BSc", semester: 2, credits: 3, modules: 4, type: "Both", theoryClassesPerWeek: 2, labPeriodsPerWeek: 2, totalWeeklyClasses: 4, approvalStatus: "approved", examType: "Practical", subjectType: "Core" },
  { id: "BS202", code: "BS202", name: "Web Technologies", dept: "CSE", course: "BSc", semester: 2, credits: 4, modules: 5, type: "Both", theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5, approvalStatus: "approved", examType: "Practical", subjectType: "Core" },
  { id: "BS203", code: "BS203", name: "Database Systems", dept: "CSE", course: "BSc", semester: 2, credits: 3, modules: 4, type: "Both", theoryClassesPerWeek: 2, labPeriodsPerWeek: 2, totalWeeklyClasses: 4, approvalStatus: "approved", examType: "SEE", subjectType: "Core" },
  { id: "BS204", code: "BS204", name: "Python Programming", dept: "CSE", course: "BSc", semester: 2, credits: 4, modules: 5, type: "Both", theoryClassesPerWeek: 2, labPeriodsPerWeek: 4, totalWeeklyClasses: 6, approvalStatus: "approved", examType: "Practical", subjectType: "Major" },
  { id: "BS205", code: "BS205", name: "Computer Graphics", dept: "CSE", course: "BSc", semester: 2, credits: 3, modules: 4, type: "Theory", theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3, approvalStatus: "approved", examType: "SEE", subjectType: "Major" },
  { id: "BS206", code: "BS206", name: "Internet of Things", dept: "CSE", course: "BSc", semester: 2, credits: 3, modules: 4, type: "Theory", theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3, approvalStatus: "approved", examType: "SEE", subjectType: "Minor" },
  { id: "BS207", code: "BS207", name: "Multimedia Systems", dept: "CSE", course: "BSc", semester: 2, credits: 3, modules: 4, type: "Theory", theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3, approvalStatus: "approved", examType: "SEE", subjectType: "Minor" },

  // ========== BCA (14 subjects - 7 per semester) ==========
  // Semester 1 - Core (3), Major (2), Minor (2)
  { id: "BC101", code: "BC101", name: "Introduction to Programming", dept: "CSE", course: "BCA", semester: 1, credits: 3, modules: 4, type: "Both", theoryClassesPerWeek: 2, labPeriodsPerWeek: 2, totalWeeklyClasses: 4, approvalStatus: "approved", examType: "Practical", subjectType: "Core" },
  { id: "BC102", code: "BC102", name: "Computer Fundamentals", dept: "CSE", course: "BCA", semester: 1, credits: 2, modules: 3, type: "Theory", theoryClassesPerWeek: 2, labPeriodsPerWeek: 0, totalWeeklyClasses: 2, approvalStatus: "approved", examType: "SEE", subjectType: "Core" },
  { id: "BC103", code: "BC103", name: "Mathematics for Computing", dept: "CSE", course: "BCA", semester: 1, credits: 3, modules: 4, type: "Theory", theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3, approvalStatus: "approved", examType: "SEE", subjectType: "Core" },
  { id: "BC104", code: "BC104", name: "C Programming Lab", dept: "CSE", course: "BCA", semester: 1, credits: 2, modules: 3, type: "Lab", theoryClassesPerWeek: 0, labPeriodsPerWeek: 4, totalWeeklyClasses: 4, approvalStatus: "approved", examType: "Practical", subjectType: "Major" },
  { id: "BC105", code: "BC105", name: "Digital Logic", dept: "CSE", course: "BCA", semester: 1, credits: 3, modules: 4, type: "Theory", theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3, approvalStatus: "approved", examType: "SEE", subjectType: "Major" },
  { id: "BC106", code: "BC106", name: "Office Automation Tools", dept: "CSE", course: "BCA", semester: 1, credits: 2, modules: 3, type: "Theory", theoryClassesPerWeek: 2, labPeriodsPerWeek: 0, totalWeeklyClasses: 2, approvalStatus: "approved", examType: "SEE", subjectType: "Minor" },
  { id: "BC107", code: "BC107", name: "Communication Skills", dept: "CSE", course: "BCA", semester: 1, credits: 2, modules: 3, type: "Theory", theoryClassesPerWeek: 2, labPeriodsPerWeek: 0, totalWeeklyClasses: 2, approvalStatus: "approved", examType: "Seminar", subjectType: "Minor" },
  
  // Semester 2 - Core (3), Major (2), Minor (2)
  { id: "BC201", code: "BC201", name: "Object Oriented Programming", dept: "CSE", course: "BCA", semester: 2, credits: 4, modules: 5, type: "Both", theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5, approvalStatus: "approved", examType: "Practical", subjectType: "Core" },
  { id: "BC202", code: "BC202", name: "Data Structures using C++", dept: "CSE", course: "BCA", semester: 2, credits: 4, modules: 5, type: "Both", theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5, approvalStatus: "approved", examType: "Practical", subjectType: "Core" },
  { id: "BC203", code: "BC203", name: "Software Engineering", dept: "CSE", course: "BCA", semester: 2, credits: 3, modules: 4, type: "Theory", theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3, approvalStatus: "approved", examType: "Seminar", subjectType: "Core" },
  { id: "BC204", code: "BC204", name: "Database Management Systems", dept: "CSE", course: "BCA", semester: 2, credits: 4, modules: 5, type: "Both", theoryClassesPerWeek: 3, labPeriodsPerWeek: 2, totalWeeklyClasses: 5, approvalStatus: "approved", examType: "SEE", subjectType: "Major" },
  { id: "BC205", code: "BC205", name: "Internet Technologies", dept: "CSE", course: "BCA", semester: 2, credits: 3, modules: 4, type: "Theory", theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3, approvalStatus: "approved", examType: "SEE", subjectType: "Major" },
  { id: "BC206", code: "BC206", name: "Multimedia Systems", dept: "CSE", course: "BCA", semester: 2, credits: 3, modules: 4, type: "Theory", theoryClassesPerWeek: 3, labPeriodsPerWeek: 0, totalWeeklyClasses: 3, approvalStatus: "approved", examType: "SEE", subjectType: "Minor" },
  { id: "BC207", code: "BC207", name: "Web Design Lab", dept: "CSE", course: "BCA", semester: 2, credits: 2, modules: 3, type: "Lab", theoryClassesPerWeek: 0, labPeriodsPerWeek: 4, totalWeeklyClasses: 4, approvalStatus: "approved", examType: "Practical", subjectType: "Minor" },
];

// Default Subject Preferences
export const DEFAULT_SUBJECT_PREFERENCES = [
  { id: 1, facultyId: 3, facultyName: "Dr. Rahul Krishnan", avatar: "RK", status: "pending", submitted: false, feedback: "", preferences: [] },
  { id: 2, facultyId: 4, facultyName: "Dr. Priya Iyer", avatar: "PI", status: "pending", submitted: false, feedback: "", preferences: [] },
  { id: 3, facultyId: 5, facultyName: "Dr. Amit Sharma", avatar: "AS", status: "pending", submitted: false, feedback: "", preferences: [] },
  { id: 4, facultyId: 6, facultyName: "Dr. Neha Gupta", avatar: "NG", status: "pending", submitted: false, feedback: "", preferences: [] },
  { id: 5, facultyId: 7, facultyName: "Dr. Vikram Singh", avatar: "VS", status: "pending", submitted: false, feedback: "", preferences: [] },
  { id: 6, facultyId: 8, facultyName: "Dr. Anita Roy", avatar: "AR", status: "pending", submitted: false, feedback: "", preferences: [] },
  { id: 7, facultyId: 9, facultyName: "Dr. Sanjay Mehta", avatar: "SM", status: "pending", submitted: false, feedback: "", preferences: [] },
  { id: 8, facultyId: 10, facultyName: "Dr. Pooja Reddy", avatar: "PR", status: "pending", submitted: false, feedback: "", preferences: [] },
  { id: 9, facultyId: 11, facultyName: "Prof. Suresh Kumar", avatar: "SK", status: "pending", submitted: false, feedback: "", preferences: [] },
  { id: 10, facultyId: 12, facultyName: "Prof. Deepa Nair", avatar: "DN", status: "pending", submitted: false, feedback: "", preferences: [] },
  { id: 11, facultyId: 13, facultyName: "Dr. Rajesh Kumar", avatar: "RK", status: "pending", submitted: false, feedback: "", preferences: [] },
  { id: 12, facultyId: 14, facultyName: "Dr. Kavita Joshi", avatar: "KJ", status: "pending", submitted: false, feedback: "", preferences: [] },
  { id: 13, facultyId: 15, facultyName: "Dr. Manoj Tiwari", avatar: "MT", status: "pending", submitted: false, feedback: "", preferences: [] },
  { id: 14, facultyId: 16, facultyName: "Dr. Swati Desai", avatar: "SD", status: "pending", submitted: false, feedback: "", preferences: [] },
  { id: 15, facultyId: 17, facultyName: "Dr. Alok Mishra", avatar: "AM", status: "pending", submitted: false, feedback: "", preferences: [] },
  { id: 16, facultyId: 18, facultyName: "Dr. Rekha Verma", avatar: "RV", status: "pending", submitted: false, feedback: "", preferences: [] },
  { id: 17, facultyId: 19, facultyName: "Dr. Naveen Bhatia", avatar: "NB", status: "pending", submitted: false, feedback: "", preferences: [] },
  { id: 18, facultyId: 20, facultyName: "Dr. Monica Sethi", avatar: "MS", status: "pending", submitted: false, feedback: "", preferences: [] },
  { id: 19, facultyId: 21, facultyName: "Dr. Tarun Kapoor", avatar: "TK", status: "pending", submitted: false, feedback: "", preferences: [] },
  { id: 20, facultyId: 22, facultyName: "Dr. Divya Malhotra", avatar: "DM", status: "pending", submitted: false, feedback: "", preferences: [] },
];

// Default Rooms (increased)
export const DEFAULT_ROOMS = [
  { id: "R001", name: "Hall 201", type: "Theory", capacity: 60 },
  { id: "R002", name: "Hall 202", type: "Theory", capacity: 60 },
  { id: "R003", name: "Hall 203", type: "Theory", capacity: 60 },
  { id: "R004", name: "Hall 301", type: "Theory", capacity: 50 },
  { id: "R005", name: "Hall 302", type: "Theory", capacity: 50 },
  { id: "R006", name: "Hall 303", type: "Theory", capacity: 50 },
  { id: "R007", name: "Hall 304", type: "Theory", capacity: 50 },
  { id: "R008", name: "Hall 305", type: "Theory", capacity: 50 },
  { id: "R009", name: "Lab 1", type: "Lab", capacity: 30 },
  { id: "R010", name: "Lab 2", type: "Lab", capacity: 30 },
  { id: "R011", name: "Lab 3", type: "Lab", capacity: 30 },
  { id: "R012", name: "Lab 4", type: "Lab", capacity: 30 },
  { id: "R013", name: "Lab 5", type: "Lab", capacity: 30 },
  { id: "R014", name: "Lab 6", type: "Lab", capacity: 30 },
];

// Default Timetable Configuration
export const DEFAULT_TIMETABLE_CONFIG = {
  startTime: "09:10",
  endTime: "16:50",
  classDuration: 50,
  breakDuration: 10,
  lunchBreak: { start: "12:30", duration: 40 },
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
};

// Default Semester Details - Updated with balanced subjects
export const DEFAULT_SEMESTER_DETAILS = {
  BTech: {
    1: {
      subjects: ["BT101", "BT102", "BT103", "BT104", "BT105", "BT106", "BT107", "BT108"],
      defaultFaculty: {
        "BT101": 3, "BT102": 4, "BT103": 5, "BT104": 6, "BT105": 7, "BT106": 8, "BT107": 9, "BT108": 10
      }
    },
    2: {
      subjects: ["BT201", "BT202", "BT203", "BT204", "BT205", "BT206", "BT207", "BT208"],
      defaultFaculty: {
        "BT201": 3, "BT202": 4, "BT203": 5, "BT204": 6, "BT205": 7, "BT206": 8, "BT207": 9, "BT208": 10
      }
    }
  },
  BSc: {
    1: {
      subjects: ["BS101", "BS102", "BS103", "BS104", "BS105", "BS106", "BS107"],
      defaultFaculty: {
        "BS101": 11, "BS102": 12, "BS103": 13, "BS104": 14, "BS105": 15, "BS106": 16, "BS107": 11
      }
    },
    2: {
      subjects: ["BS201", "BS202", "BS203", "BS204", "BS205", "BS206", "BS207"],
      defaultFaculty: {
        "BS201": 12, "BS202": 13, "BS203": 14, "BS204": 15, "BS205": 16, "BS206": 11, "BS207": 12
      }
    }
  },
  BCA: {
    1: {
      subjects: ["BC101", "BC102", "BC103", "BC104", "BC105", "BC106", "BC107"],
      defaultFaculty: {
        "BC101": 17, "BC102": 18, "BC103": 19, "BC104": 20, "BC105": 21, "BC106": 22, "BC107": 17
      }
    },
    2: {
      subjects: ["BC201", "BC202", "BC203", "BC204", "BC205", "BC206", "BC207"],
      defaultFaculty: {
        "BC201": 18, "BC202": 19, "BC203": 20, "BC204": 21, "BC205": 22, "BC206": 17, "BC207": 18
      }
    }
  }
};

// Default Calendar Events
export const DEFAULT_CALENDAR_EVENTS = [
  { id: 1, title: "Semester Begins", date: "2025-01-10", type: "academic" },
  { id: 2, title: "Mid-Semester Exams", date: "2025-03-01", type: "exam" },
  { id: 3, title: "End Semester Exams", date: "2025-05-15", type: "exam" },
  { id: 4, title: "Timetable Release", date: "2025-01-05", type: "admin" },
];

// Default Form Status
export const DEFAULT_FORM_STATUS = {
  isFloated: false,
  floatedDate: null,
  floatedBy: null,
  semester: "2025",
  deadline: null
};

// Default Class Teachers
export const DEFAULT_CLASS_TEACHERS = {
  BTech: { 1: { facultyId: 3, assignedDate: null }, 2: { facultyId: 4, assignedDate: null } },
  BSc: { 1: { facultyId: 11, assignedDate: null }, 2: { facultyId: 12, assignedDate: null } },
  BCA: { 1: { facultyId: 17, assignedDate: null }, 2: { facultyId: 18, assignedDate: null } }
};

// Default Course Leads
export const DEFAULT_COURSE_LEADS = {
  BTech: { facultyId: 3, assignedDate: null },
  BSc: { facultyId: 11, assignedDate: null },
  BCA: { facultyId: 17, assignedDate: null }
};

// Default EA Permissions
export const DEFAULT_EA_PERMISSIONS = {
  subjectApproval: false,
  preferenceApproval: false,
  courseApproval: false,
  timetableGeneration: false,
  viewReports: true,
  manageFaculty: false,
  viewAllData: true
};

// Default Visiting Faculty Permissions
export const DEFAULT_VISITING_FACULTY_PERMISSIONS = {
  canViewTimetable: true,
  canViewSyllabus: true,
  canUpdateSyllabus: false,
  canViewProfile: true,
  canRequestLeave: true,
  canViewStudents: false,
  canSubmitGrades: false,
  canAccessPreferences: false,
  canAccessCourseDetails: false,
  canRaiseIssues: true,
  maxHoursPerWeek: 8
};

export const DEFAULT_SUBJECT_DELETION_REQUESTS = [];

// Faculty Location Storage Key (used in components)
export const FACULTY_LOCATION_STORAGE_KEY = 'acadplan_faculty_location';

// Storage Keys
export const STORAGE_KEYS = {
  FACULTY: 'acadplan_faculty',
  SUBJECT_PREFERENCES: 'acadplan_subject_preferences',
  SUBJECTS: 'acadplan_subjects',
  COURSE_DETAILS: 'acadplan_course_details',
  TIMETABLE: 'acadplan_timetable',
  SYLLABUS_PROGRESS: 'acadplan_syllabus_progress',
  SECTIONS: 'acadplan_sections',
  ROOMS: 'acadplan_rooms',
  TIMETABLE_CONFIG: 'acadplan_timetable_config',
  SEMESTER_DETAILS: 'acadplan_semester_details',
  FLAGGED_ISSUES: 'acadplan_flagged_issues',
  STUDENT_PROGRESS: 'acadplan_student_progress',
  DEAN_APPROVALS: 'acadplan_dean_approvals',
  LEAVE_REQUESTS: 'acadplan_leave_requests',
  CALENDAR_EVENTS: 'acadplan_calendar_events',
  FORM_STATUS: 'acadplan_form_status',
  PREFERENCE_SETTINGS: 'acadplan_preference_settings',
  FACULTY_PREFERENCE_FORM: 'acadplan_faculty_preference_form',
  FACULTY_SUBMISSIONS: 'acadplan_faculty_submissions',
  CLASS_TEACHERS: 'acadplan_class_teachers',
  COURSE_LEADS: 'acadplan_course_leads',
  APPOINTMENTS: 'acadplan_appointments',
  EA_PERMISSIONS: 'acadplan_ea_permissions',
  MOCK_USERS: 'acadplan_mock_users',
  VISITING_FACULTY_PERMISSIONS: 'acadplan_visiting_faculty_permissions',
  VISITING_FACULTY_SYLLABUS: 'acadplan_visiting_faculty_syllabus',
  VISITING_FACULTY_TIMETABLE: 'acadplan_visiting_faculty_timetable',
  SUBJECT_DELETION_REQUESTS: 'acadplan_subject_deletion_requests',
  FACULTY_LOCATION: 'acadplan_faculty_location'
};