// // src/components/admin/DeanCourseDetailsReview.jsx
// import { useState, useEffect } from "react";
// import { Card, Title, Badge, Button } from "../common";
// import { TimetableConfigModal } from "../shared/TimetableConfigModal";
// import { CapacityDashboard } from "../shared/CapacityDashboard";
// import { AppState } from "../../AppState";
// import { C } from "../../styles/theme";

// export function DeanCourseDetailsReview() {
//   const [refresh, setRefresh] = useState(0);
//   const [showConfigModal, setShowConfigModal] = useState(false);
//   const [generating, setGenerating] = useState(false);
//   const [validationResult, setValidationResult] = useState(null);
  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRefresh(r => r + 1);
//       loadValidation();
//     };
//     loadValidation();
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, [refresh]);
  
//   const loadValidation = () => {
//     try {
//       const approvedCoursesList = AppState.courseDetails?.filter(c => c.deanStatus === "approved") || [];
//       if (approvedCoursesList.length > 0) {
//         // Check if validateTimetable exists
//         if (typeof AppState.validateTimetable === 'function') {
//           const validation = AppState.validateTimetable();
//           setValidationResult(validation);
//         } else {
//           // Fallback to simple validation
//           setValidationResult({
//             canSchedule: true,
//             errors: [],
//             warnings: [],
//             subjectStatus: [],
//             facultyWorkload: [],
//             totalRequiredSlots: 0,
//             totalAvailableSlots: 120,
//             utilization: 0
//           });
//         }
//       } else {
//         setValidationResult(null);
//       }
//     } catch (error) {
//       console.error("Error loading validation:", error);
//       setValidationResult({
//         canSchedule: true,
//         errors: [],
//         warnings: [],
//         subjectStatus: [],
//         facultyWorkload: [],
//         totalRequiredSlots: 0,
//         totalAvailableSlots: 120,
//         utilization: 0
//       });
//     }
//   };
  
//   // Get course details pending dean approval (submitted by faculty)
//   const pendingDeanApprovals = AppState.courseDetails?.filter(c => 
//     c.deanStatus === "pending" && c.submittedAt
//   ) || [];
//   const approvedCourses = AppState.courseDetails?.filter(c => c.deanStatus === "approved") || [];
//   const totalCourses = AppState.courseDetails?.length || 0;
  
//   const handleApprove = (courseId) => {
//     AppState.updateCourseDetailDeanStatus(courseId, "approved");
//     setRefresh(r => r + 1);
//     window.dispatchEvent(new Event('storage'));
//     alert("Course approved successfully!");
//   };
  
//   const handleReject = (courseId) => {
//     const reason = prompt("Enter rejection reason:");
//     if (reason) {
//       AppState.updateCourseDetailDeanStatus(courseId, "rejected", reason);
//       setRefresh(r => r + 1);
//       window.dispatchEvent(new Event('storage'));
//       alert("Course rejected!");
//     }
//   };
  
//   const handleGenerateTimetable = (config) => {
//     setGenerating(true);
//     try {
//       // First validate if all subjects can be scheduled
//       let canSchedule = true;
//       let validationErrors = [];
      
//       if (typeof AppState.validateTimetable === 'function') {
//         const validation = AppState.validateTimetable();
//         canSchedule = validation.canSchedule;
//         validationErrors = validation.errors || [];
//       }
      
//       if (!canSchedule) {
//         const errorMessages = validationErrors.map(e => `- ${e.subject || e.faculty}: ${e.type}`).join("\n");
//         alert(`❌ Cannot generate timetable!\n\nIssues found:\n${errorMessages}\n\nPlease resolve these issues before generating.`);
//         setGenerating(false);
//         setShowConfigModal(false);
//         return;
//       }
      
//       const approvedCoursesList = AppState.courseDetails?.filter(c => c.deanStatus === "approved") || [];
      
//       if (approvedCoursesList.length === 0) {
//         alert(`No approved courses found.`);
//         setGenerating(false);
//         setShowConfigModal(false);
//         return;
//       }
      
//       const generatedTimetable = AppState.generateTimetable();
      
//       if (generatedTimetable && generatedTimetable.length > 0) {
//         alert(`✅ Timetable generated successfully with ${generatedTimetable.length} slots!`);
//         setRefresh(r => r + 1);
//         window.dispatchEvent(new Event('storage'));
//       } else {
//         alert(`⚠️ No timetable slots were generated.\n\nApproved courses: ${approvedCoursesList.length}`);
//       }
//     } catch (error) {
//       console.error("Error generating timetable:", error);
//       alert("Error generating timetable: " + error.message);
//     } finally {
//       setGenerating(false);
//       setShowConfigModal(false);
//     }
//   };
  
//   const allCoursesApproved = totalCourses > 0 && 
//     (AppState.courseDetails?.every(c => c.deanStatus === "approved") || false);
  
//   const canGenerateTimetable = allCoursesApproved && (validationResult?.canSchedule !== false);
  
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <TimetableConfigModal 
//         isOpen={showConfigModal} 
//         onClose={() => setShowConfigModal(false)} 
//         onGenerate={handleGenerateTimetable}
//       />
      
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
//         <Title>Course Details Approval (Dean)</Title>
//         {totalCourses > 0 && canGenerateTimetable && (
//           <Button 
//             onClick={() => setShowConfigModal(true)} 
//             variant="success"
//             disabled={generating}
//             size="lg"
//           >
//             {generating ? "⏳ Generating..." : "⚙️ Configure & Generate Timetable"}
//           </Button>
//         )}
//         {totalCourses > 0 && allCoursesApproved && validationResult?.canSchedule === false && (
//           <div style={{ padding: 8, background: C.accent.redBg, borderRadius: 8 }}>
//             <span style={{ color: C.accent.red, fontSize: 13 }}>
//               ⚠️ Fix scheduling issues before generating timetable
//             </span>
//           </div>
//         )}
//       </div>
      
//       {/* Capacity Dashboard - Shows scheduling feasibility */}
//       {approvedCourses.length > 0 && (
//         <CapacityDashboard approvedCourses={approvedCourses} />
//       )}
      
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Approval</p>
//           <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingDeanApprovals.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Approved Courses</p>
//           <p style={{ color: C.accent.green, fontSize: 32, fontWeight: 700 }}>{approvedCourses.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Total Courses</p>
//           <p style={{ color: C.accent.blue, fontSize: 32, fontWeight: 700 }}>{totalCourses}</p>
//         </Card>
//       </div>
      
//       {pendingDeanApprovals.length > 0 ? (
//         pendingDeanApprovals.map(course => {
//           const faculty = AppState.faculty?.find(f => f.id === course.facultyId);
//           const subject = AppState.subjects?.find(s => s.id === course.subjectId);
          
//           return (
//             <Card key={course.id}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
//                 <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
//                   <div style={{
//                     width: 48,
//                     height: 48,
//                     borderRadius: "50%",
//                     background: faculty ? `${faculty.color}20` : C.accent.blueBg,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: faculty?.color || C.accent.blue,
//                     fontWeight: 700,
//                     fontSize: 18,
//                   }}>
//                     {faculty?.avatar || "?"}
//                   </div>
//                   <div>
//                     <p style={{ color: C.text.primary, fontWeight: 600, fontSize: 16 }}>{faculty?.name || "Unknown Faculty"}</p>
//                     <p style={{ color: C.accent.blue, fontSize: 14 }}>{course.subjectName} ({course.subjectCode})</p>
//                     <p style={{ color: C.text.tertiary, fontSize: 12 }}>{course.course} Semester {course.semester}</p>
//                   </div>
//                 </div>
//                 <Badge variant="warning">Pending Dean Approval</Badge>
//               </div>
              
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12, marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Credits</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.credits}</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Modules</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.modules}</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Theory Classes</span><br /><span style={{ color: C.accent.blue, fontSize: 18, fontWeight: 600 }}>{course.theoryClassesPerWeek}/week</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Lab Periods</span><br /><span style={{ color: C.accent.green, fontSize: 18, fontWeight: 600 }}>{course.labPeriodsPerWeek}/week</span></div>
//               </div>
              
//               <div style={{ marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//                 <p style={{ color: C.accent.gold, fontSize: 14 }}>Total Weekly Classes per Section: <strong>{course.totalWeeklyClasses}</strong></p>
//                 <p style={{ color: C.accent.gold, fontSize: 14 }}>Total Sessions (3 sections): <strong>{course.totalWeeklyClasses * 3}</strong></p>
//               </div>
              
//               {course.submittedAt && (
//                 <div style={{ marginBottom: 16, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
//                   <p style={{ color: C.text.secondary, fontSize: 12 }}>
//                     <strong>Submitted by Faculty:</strong> {new Date(course.submittedAt).toLocaleString()}
//                   </p>
//                 </div>
//               )}
              
//               <div style={{ display: "flex", gap: 12 }}>
//                 <Button onClick={() => handleApprove(course.id)} variant="success" fullWidth>
//                   ✓ Approve Course
//                 </Button>
//                 <Button onClick={() => handleReject(course.id)} variant="danger" fullWidth>
//                   ✗ Reject Course
//                 </Button>
//               </div>
//             </Card>
//           );
//         })
//       ) : (
//         <Card>
//           <div style={{ textAlign: "center", padding: "20px" }}>
//             <p style={{ color: C.accent.green, fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
//               ✓ No pending course approvals!
//             </p>
//             {allCoursesApproved && totalCourses > 0 && (
//               <>
//                 {validationResult?.canSchedule !== false ? (
//                   <p style={{ color: C.text.secondary }}>All courses are approved. Click the button above to generate the timetable.</p>
//                 ) : (
//                   <div style={{ marginTop: 12, padding: 12, background: C.accent.redBg, borderRadius: 8 }}>
//                     <p style={{ color: C.accent.red, marginBottom: 4 }}>
//                       ⚠️ Scheduling issues detected!
//                     </p>
//                     {validationResult?.errors?.map((error, idx) => (
//                       <p key={idx} style={{ fontSize: 13, margin: 4 }}>
//                         • {error.subject ? `${error.subject}: ` : ''}{error.message || error.type}
//                       </p>
//                     ))}
//                     <p style={{ fontSize: 12, marginTop: 8, color: C.text.tertiary }}>
//                       Please contact coordinator to resolve these issues.
//                     </p>
//                   </div>
//                 )}
//               </>
//             )}
//             {totalCourses === 0 && (
//               <p style={{ color: C.text.tertiary }}>No course details have been submitted yet.</p>
//             )}
//           </div>
//         </Card>
//       )}
//     </div>
//   );
// }

// // src/components/admin/DeanCourseDetailsReview.jsx
// import { useState, useEffect } from "react";
// import { Card, Title, Badge, Button } from "../common";
// import { TimetableConfigModal } from "../shared/TimetableConfigModal";
// import { CapacityDashboard } from "../shared/CapacityDashboard";
// import { AppState } from "../../AppState";
// import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "../../utils/storage";
// import { C } from "../../styles/theme";

// export function DeanCourseDetailsReview() {
//   const [refresh, setRefresh] = useState(0);
//   const [showConfigModal, setShowConfigModal] = useState(false);
//   const [generating, setGenerating] = useState(false);
//   const [validationResult, setValidationResult] = useState(null);
//   const [activeDepartment, setActiveDepartment] = useState(null);
//   const [departmentStatus, setDepartmentStatus] = useState({});
  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRefresh(r => r + 1);
//       loadDepartmentStatus();
//       loadValidation();
//     };
//     loadDepartmentStatus();
//     loadValidation();
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, [refresh]);
  
//   const loadDepartmentStatus = () => {
//     const active = loadFromStorage(STORAGE_KEYS.ACTIVE_DEPARTMENT, null);
//     const status = loadFromStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, {});
//     setActiveDepartment(active);
//     setDepartmentStatus(status);
//   };
  
//   const loadValidation = () => {
//     try {
//       // Get approved courses for the active department only
//       let approvedCoursesList = AppState.courseDetails?.filter(c => c.deanStatus === "approved") || [];
      
//       if (activeDepartment) {
//         approvedCoursesList = approvedCoursesList.filter(c => c.course === activeDepartment);
//       }
      
//       if (approvedCoursesList.length > 0) {
//         if (typeof AppState.validateTimetable === 'function') {
//           const validation = AppState.validateTimetable(activeDepartment);
//           setValidationResult(validation);
//         } else {
//           setValidationResult({
//             canSchedule: true,
//             errors: [],
//             warnings: [],
//             subjectStatus: [],
//             facultyWorkload: [],
//             totalRequiredSlots: 0,
//             totalAvailableSlots: 120,
//             utilization: 0
//           });
//         }
//       } else {
//         setValidationResult(null);
//       }
//     } catch (error) {
//       console.error("Error loading validation:", error);
//       setValidationResult({
//         canSchedule: true,
//         errors: [],
//         warnings: [],
//         subjectStatus: [],
//         facultyWorkload: [],
//         totalRequiredSlots: 0,
//         totalAvailableSlots: 120,
//         utilization: 0
//       });
//     }
//   };
  
//   // Get course details pending dean approval for active department only
//   const pendingDeanApprovals = AppState.courseDetails?.filter(c => 
//     c.deanStatus === "pending" && c.submittedAt && (!activeDepartment || c.course === activeDepartment)
//   ) || [];
  
//   const approvedCourses = AppState.courseDetails?.filter(c => 
//     c.deanStatus === "approved" && (!activeDepartment || c.course === activeDepartment)
//   ) || [];
  
//   const totalCourses = approvedCourses.length + pendingDeanApprovals.length;
  
//   const handleApprove = (courseId) => {
//     AppState.updateCourseDetailDeanStatus(courseId, "approved");
//     setRefresh(r => r + 1);
//     window.dispatchEvent(new Event('storage'));
//     alert("Course approved successfully!");
//   };
  
//   const handleReject = (courseId) => {
//     const reason = prompt("Enter rejection reason:");
//     if (reason) {
//       AppState.updateCourseDetailDeanStatus(courseId, "rejected", reason);
//       setRefresh(r => r + 1);
//       window.dispatchEvent(new Event('storage'));
//       alert("Course rejected!");
//     }
//   };
  
//   const handleGenerateTimetable = (config) => {
//     setGenerating(true);
//     try {
//       if (!activeDepartment) {
//         alert("No active department selected. Please ask the Director to activate a department first.");
//         setGenerating(false);
//         setShowConfigModal(false);
//         return;
//       }
      
//       const isDeptCompleted = departmentStatus[activeDepartment]?.completed;
//       if (isDeptCompleted) {
//         if (!confirm(`Timetable for ${activeDepartment} is already completed. Generating again will overwrite it. Continue?`)) {
//           setGenerating(false);
//           setShowConfigModal(false);
//           return;
//         }
//       }
      
//       // First validate if all subjects can be scheduled
//       let canSchedule = true;
//       let validationErrors = [];
      
//       if (typeof AppState.validateTimetable === 'function') {
//         const validation = AppState.validateTimetable(activeDepartment);
//         canSchedule = validation.canSchedule;
//         validationErrors = validation.errors || [];
//       }
      
//       if (!canSchedule) {
//         const errorMessages = validationErrors.map(e => `- ${e.subject || e.faculty}: ${e.type}`).join("\n");
//         alert(`❌ Cannot generate timetable for ${activeDepartment}!\n\nIssues found:\n${errorMessages}\n\nPlease resolve these issues before generating.`);
//         setGenerating(false);
//         setShowConfigModal(false);
//         return;
//       }
      
//       const approvedCoursesList = AppState.courseDetails?.filter(c => 
//         c.deanStatus === "approved" && c.course === activeDepartment
//       ) || [];
      
//       if (approvedCoursesList.length === 0) {
//         alert(`No approved courses found for ${activeDepartment}.`);
//         setGenerating(false);
//         setShowConfigModal(false);
//         return;
//       }
      
//       const generatedTimetable = AppState.generateTimetable(activeDepartment);
      
//       if (generatedTimetable && generatedTimetable.length > 0) {
//         // Mark department as completed
//         const updatedStatus = {
//           ...departmentStatus,
//           [activeDepartment]: {
//             ...departmentStatus[activeDepartment],
//             completed: true,
//             completedAt: new Date().toISOString(),
//             slotsGenerated: generatedTimetable.length
//           }
//         };
//         saveToStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, updatedStatus);
//         setDepartmentStatus(updatedStatus);
        
//         alert(`✅ ${activeDepartment} timetable generated successfully with ${generatedTimetable.length} slots!`);
//         setRefresh(r => r + 1);
//         window.dispatchEvent(new Event('storage'));
//       } else {
//         alert(`⚠️ No timetable slots were generated for ${activeDepartment}.\n\nApproved courses: ${approvedCoursesList.length}`);
//       }
//     } catch (error) {
//       console.error("Error generating timetable:", error);
//       alert("Error generating timetable: " + error.message);
//     } finally {
//       setGenerating(false);
//       setShowConfigModal(false);
//     }
//   };
  
//   const allCoursesApproved = totalCourses > 0 && pendingDeanApprovals.length === 0;
  
//   const isDeptActive = !!activeDepartment;
//   const isDeptCompleted = activeDepartment ? departmentStatus[activeDepartment]?.completed : false;
//   const canGenerateTimetable = allCoursesApproved && isDeptActive && !isDeptCompleted && (validationResult?.canSchedule !== false);
  
//   // Get department display color
//   const getDepartmentColor = () => {
//     switch(activeDepartment) {
//       case "BTech": return C.accent.blue;
//       case "BSc": return C.accent.green;
//       case "BCA": return C.accent.gold;
//       default: return C.text.primary;
//     }
//   };
  
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <TimetableConfigModal 
//         isOpen={showConfigModal} 
//         onClose={() => setShowConfigModal(false)} 
//         onGenerate={handleGenerateTimetable}
//       />
      
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
//         <Title>Course Details Approval (Dean)</Title>
        
//         {/* Active Department Indicator */}
//         {activeDepartment && (
//           <div style={{ 
//             padding: "8px 16px", 
//             background: `${getDepartmentColor()}20`, 
//             borderRadius: 8,
//             border: `1px solid ${getDepartmentColor()}`
//           }}>
//             <span style={{ color: getDepartmentColor(), fontWeight: 600 }}>
//               Active Department: {activeDepartment}
//             </span>
//             {isDeptCompleted && (
//               <Badge variant="success" style={{ marginLeft: 8 }}>✓ Completed</Badge>
//             )}
//           </div>
//         )}
        
//         {!activeDepartment && (
//           <div style={{ padding: 8, background: C.accent.goldBg, borderRadius: 8 }}>
//             <span style={{ color: C.accent.gold }}>
//               ⚠️ No active department. Director needs to activate a department first.
//             </span>
//           </div>
//         )}
        
//         {totalCourses > 0 && canGenerateTimetable && (
//           <Button 
//             onClick={() => setShowConfigModal(true)} 
//             variant="success"
//             disabled={generating}
//             size="lg"
//           >
//             {generating ? "⏳ Generating..." : `⚙️ Generate ${activeDepartment} Timetable`}
//           </Button>
//         )}
        
//         {totalCourses > 0 && allCoursesApproved && isDeptActive && isDeptCompleted && (
//           <div style={{ padding: 8, background: C.accent.greenBg, borderRadius: 8 }}>
//             <span style={{ color: C.accent.green }}>
//               ✓ {activeDepartment} timetable has been generated and completed!
//             </span>
//           </div>
//         )}
        
//         {totalCourses > 0 && allCoursesApproved && isDeptActive && validationResult?.canSchedule === false && (
//           <div style={{ padding: 8, background: C.accent.redBg, borderRadius: 8 }}>
//             <span style={{ color: C.accent.red, fontSize: 13 }}>
//               ⚠️ Fix scheduling issues before generating timetable
//             </span>
//           </div>
//         )}
//       </div>
      
//       {/* Capacity Dashboard - Shows scheduling feasibility for active department */}
//       {approvedCourses.length > 0 && activeDepartment && (
//         <CapacityDashboard approvedCourses={approvedCourses} department={activeDepartment} />
//       )}
      
//       {!activeDepartment && approvedCourses.length > 0 && (
//         <Card style={{ background: C.accent.goldBg }}>
//           <p style={{ color: C.accent.gold, margin: 0, textAlign: "center" }}>
//             ⚠️ Please ask the Director to activate a department to view capacity dashboard and generate timetable.
//           </p>
//         </Card>
//       )}
      
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Approval</p>
//           <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingDeanApprovals.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Approved Courses</p>
//           <p style={{ color: C.accent.green, fontSize: 32, fontWeight: 700 }}>{approvedCourses.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Total ({activeDepartment || 'All'})</p>
//           <p style={{ color: C.accent.blue, fontSize: 32, fontWeight: 700 }}>{totalCourses}</p>
//         </Card>
//       </div>
      
//       {pendingDeanApprovals.length > 0 ? (
//         pendingDeanApprovals.map(course => {
//           const faculty = AppState.faculty?.find(f => f.id === course.facultyId);
//           const subject = AppState.subjects?.find(s => s.id === course.subjectId);
          
//           return (
//             <Card key={course.id}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
//                 <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
//                   <div style={{
//                     width: 48,
//                     height: 48,
//                     borderRadius: "50%",
//                     background: faculty ? `${faculty.color}20` : C.accent.blueBg,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: faculty?.color || C.accent.blue,
//                     fontWeight: 700,
//                     fontSize: 18,
//                   }}>
//                     {faculty?.avatar || "?"}
//                   </div>
//                   <div>
//                     <p style={{ color: C.text.primary, fontWeight: 600, fontSize: 16 }}>{faculty?.name || "Unknown Faculty"}</p>
//                     <p style={{ color: C.accent.blue, fontSize: 14 }}>{course.subjectName} ({course.subjectCode})</p>
//                     <p style={{ color: C.text.tertiary, fontSize: 12 }}>{course.course} Semester {course.semester}</p>
//                   </div>
//                 </div>
//                 <Badge variant="warning">Pending Dean Approval</Badge>
//               </div>
              
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12, marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Credits</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.credits}</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Modules</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.modules}</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Theory Classes</span><br /><span style={{ color: C.accent.blue, fontSize: 18, fontWeight: 600 }}>{course.theoryClassesPerWeek}/week</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Lab Periods</span><br /><span style={{ color: C.accent.green, fontSize: 18, fontWeight: 600 }}>{course.labPeriodsPerWeek}/week</span></div>
//               </div>
              
//               <div style={{ marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//                 <p style={{ color: C.accent.gold, fontSize: 14 }}>Total Weekly Classes per Section: <strong>{course.totalWeeklyClasses}</strong></p>
//                 <p style={{ color: C.accent.gold, fontSize: 14 }}>Total Sessions (3 sections): <strong>{course.totalWeeklyClasses * 3}</strong></p>
//               </div>
              
//               {course.submittedAt && (
//                 <div style={{ marginBottom: 16, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
//                   <p style={{ color: C.text.secondary, fontSize: 12 }}>
//                     <strong>Submitted by Faculty:</strong> {new Date(course.submittedAt).toLocaleString()}
//                   </p>
//                 </div>
//               )}
              
//               <div style={{ display: "flex", gap: 12 }}>
//                 <Button onClick={() => handleApprove(course.id)} variant="success" fullWidth>
//                   ✓ Approve Course
//                 </Button>
//                 <Button onClick={() => handleReject(course.id)} variant="danger" fullWidth>
//                   ✗ Reject Course
//                 </Button>
//               </div>
//             </Card>
//           );
//         })
//       ) : (
//         <Card>
//           <div style={{ textAlign: "center", padding: "20px" }}>
//             <p style={{ color: C.accent.green, fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
//               ✓ No pending course approvals for {activeDepartment || 'active department'}!
//             </p>
//             {allCoursesApproved && totalCourses > 0 && (
//               <>
//                 {!activeDepartment && (
//                   <p style={{ color: C.accent.gold, marginBottom: 12 }}>
//                     ⚠️ No department is active. Director needs to activate a department first.
//                   </p>
//                 )}
//                 {activeDepartment && isDeptCompleted && (
//                   <p style={{ color: C.accent.green }}>
//                     ✅ {activeDepartment} timetable has been successfully generated!
//                   </p>
//                 )}
//                 {activeDepartment && !isDeptCompleted && validationResult?.canSchedule !== false && (
//                   <p style={{ color: C.text.secondary }}>All courses for {activeDepartment} are approved. Click the button above to generate the timetable.</p>
//                 )}
//                 {activeDepartment && validationResult?.canSchedule === false && (
//                   <div style={{ marginTop: 12, padding: 12, background: C.accent.redBg, borderRadius: 8 }}>
//                     <p style={{ color: C.accent.red, marginBottom: 4 }}>
//                       ⚠️ Scheduling issues detected for {activeDepartment}!
//                     </p>
//                     {validationResult?.errors?.map((error, idx) => (
//                       <p key={idx} style={{ fontSize: 13, margin: 4 }}>
//                         • {error.subject ? `${error.subject}: ` : ''}{error.message || error.type}
//                       </p>
//                     ))}
//                     <p style={{ fontSize: 12, marginTop: 8, color: C.text.tertiary }}>
//                       Please contact coordinator to resolve these issues.
//                     </p>
//                   </div>
//                 )}
//               </>
//             )}
//             {totalCourses === 0 && (
//               <p style={{ color: C.text.tertiary }}>No course details have been submitted yet for {activeDepartment || 'any department'}.</p>
//             )}
//           </div>
//         </Card>
//       )}
//     </div>
//   );
// }

// // src/components/admin/DeanCourseDetailsReview.jsx
// import { useState, useEffect } from "react";
// import { Card, Title, Badge, Button } from "../common";
// import { TimetableConfigModal } from "../shared/TimetableConfigModal";
// import { CapacityDashboard } from "../shared/CapacityDashboard";
// import { ConflictResolutionEngine } from "./ConflictResolutionEngine";
// import { AppState } from "../../AppState";
// import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "../../utils/storage";
// import { C } from "../../styles/theme";

// export function DeanCourseDetailsReview() {
//   const [refresh, setRefresh] = useState(0);
//   const [showConfigModal, setShowConfigModal] = useState(false);
//   const [showConflictResolver, setShowConflictResolver] = useState(false);
//   const [generating, setGenerating] = useState(false);
//   const [validationResult, setValidationResult] = useState(null);
//   const [activeDepartment, setActiveDepartment] = useState(null);
//   const [departmentStatus, setDepartmentStatus] = useState({});
//   const [conflictsResolved, setConflictsResolved] = useState(false);
  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRefresh(r => r + 1);
//       loadDepartmentStatus();
//       loadValidation();
//       setConflictsResolved(false);
//     };
//     loadDepartmentStatus();
//     loadValidation();
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, [refresh]);
  
//   const loadDepartmentStatus = () => {
//     const active = loadFromStorage(STORAGE_KEYS.ACTIVE_DEPARTMENT, null);
//     const status = loadFromStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, {});
//     setActiveDepartment(active);
//     setDepartmentStatus(status);
//   };
  
//   const loadValidation = () => {
//     try {
//       let approvedCoursesList = AppState.courseDetails?.filter(c => c.deanStatus === "approved") || [];
      
//       if (activeDepartment) {
//         approvedCoursesList = approvedCoursesList.filter(c => c.course === activeDepartment);
//       }
      
//       if (approvedCoursesList.length > 0) {
//         if (typeof AppState.validateTimetable === 'function') {
//           const validation = AppState.validateTimetable(activeDepartment);
//           setValidationResult(validation);
//         } else {
//           setValidationResult({
//             canSchedule: true,
//             errors: [],
//             warnings: [],
//             subjectStatus: [],
//             facultyWorkload: [],
//             totalRequiredSlots: 0,
//             totalAvailableSlots: 120,
//             utilization: 0
//           });
//         }
//       } else {
//         setValidationResult(null);
//       }
//     } catch (error) {
//       console.error("Error loading validation:", error);
//       setValidationResult({
//         canSchedule: true,
//         errors: [],
//         warnings: [],
//         subjectStatus: [],
//         facultyWorkload: [],
//         totalRequiredSlots: 0,
//         totalAvailableSlots: 120,
//         utilization: 0
//       });
//     }
//   };
  
//   // Get course details pending dean approval for active department only
//   const pendingDeanApprovals = AppState.courseDetails?.filter(c => 
//     c.deanStatus === "pending" && c.submittedAt && (!activeDepartment || c.course === activeDepartment)
//   ) || [];
  
//   const approvedCourses = AppState.courseDetails?.filter(c => 
//     c.deanStatus === "approved" && (!activeDepartment || c.course === activeDepartment)
//   ) || [];
  
//   const totalCourses = approvedCourses.length + pendingDeanApprovals.length;
  
//   const handleApprove = (courseId) => {
//     AppState.updateCourseDetailDeanStatus(courseId, "approved");
//     setRefresh(r => r + 1);
//     window.dispatchEvent(new Event('storage'));
//     alert("Course approved successfully!");
//   };
  
//   const handleReject = (courseId) => {
//     const reason = prompt("Enter rejection reason:");
//     if (reason) {
//       AppState.updateCourseDetailDeanStatus(courseId, "rejected", reason);
//       setRefresh(r => r + 1);
//       window.dispatchEvent(new Event('storage'));
//       alert("Course rejected!");
//     }
//   };
  
//   const handleGenerateTimetable = (config) => {
//     setGenerating(true);
//     try {
//       if (!activeDepartment) {
//         alert("No active department selected. Please ask the Director to activate a department first.");
//         setGenerating(false);
//         setShowConfigModal(false);
//         return;
//       }
      
//       const isDeptCompleted = departmentStatus[activeDepartment]?.completed;
//       if (isDeptCompleted) {
//         if (!confirm(`Timetable for ${activeDepartment} is already completed. Generating again will overwrite it. Continue?`)) {
//           setGenerating(false);
//           setShowConfigModal(false);
//           return;
//         }
//       }
      
//       // First validate if all subjects can be scheduled
//       let canSchedule = true;
//       let validationErrors = [];
      
//       if (typeof AppState.validateTimetable === 'function') {
//         const validation = AppState.validateTimetable(activeDepartment);
//         canSchedule = validation.canSchedule;
//         validationErrors = validation.errors || [];
//       }
      
//       if (!canSchedule) {
//         const errorMessages = validationErrors.map(e => `- ${e.subject || e.faculty}: ${e.type}`).join("\n");
//         alert(`❌ Cannot generate timetable for ${activeDepartment}!\n\nIssues found:\n${errorMessages}\n\nPlease resolve these issues before generating.`);
//         setGenerating(false);
//         setShowConfigModal(false);
//         return;
//       }
      
//       const approvedCoursesList = AppState.courseDetails?.filter(c => 
//         c.deanStatus === "approved" && c.course === activeDepartment
//       ) || [];
      
//       if (approvedCoursesList.length === 0) {
//         alert(`No approved courses found for ${activeDepartment}.`);
//         setGenerating(false);
//         setShowConfigModal(false);
//         return;
//       }
      
//       const generatedTimetable = AppState.generateTimetable(activeDepartment);
      
//       if (generatedTimetable && generatedTimetable.length > 0) {
//         // Mark department as completed
//         const updatedStatus = {
//           ...departmentStatus,
//           [activeDepartment]: {
//             ...departmentStatus[activeDepartment],
//             completed: true,
//             completedAt: new Date().toISOString(),
//             slotsGenerated: generatedTimetable.length
//           }
//         };
//         saveToStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, updatedStatus);
//         setDepartmentStatus(updatedStatus);
        
//         alert(`✅ ${activeDepartment} timetable generated successfully with ${generatedTimetable.length} slots!`);
//         setRefresh(r => r + 1);
//         window.dispatchEvent(new Event('storage'));
//       } else {
//         alert(`⚠️ No timetable slots were generated for ${activeDepartment}.\n\nApproved courses: ${approvedCoursesList.length}`);
//       }
//     } catch (error) {
//       console.error("Error generating timetable:", error);
//       alert("Error generating timetable: " + error.message);
//     } finally {
//       setGenerating(false);
//       setShowConfigModal(false);
//     }
//   };
  
//   const handleConflictsResolved = (resolved) => {
//     setShowConflictResolver(false);
//     if (resolved) {
//       setConflictsResolved(true);
//       loadValidation();
//       alert("✅ Conflicts resolved! You can now generate the timetable.");
//     }
//   };
  
//   const allCoursesApproved = totalCourses > 0 && pendingDeanApprovals.length === 0;
  
//   const isDeptActive = !!activeDepartment;
//   const isDeptCompleted = activeDepartment ? departmentStatus[activeDepartment]?.completed : false;
//   const hasSchedulingIssues = validationResult?.canSchedule === false;
//   const canGenerateTimetable = allCoursesApproved && isDeptActive && !isDeptCompleted && !hasSchedulingIssues && conflictsResolved;
  
//   // Get department display color
//   const getDepartmentColor = () => {
//     switch(activeDepartment) {
//       case "BTech": return C.accent.blue;
//       case "BSc": return C.accent.green;
//       case "BCA": return C.accent.gold;
//       default: return C.text.primary;
//     }
//   };
  
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <TimetableConfigModal 
//         isOpen={showConfigModal} 
//         onClose={() => setShowConfigModal(false)} 
//         onGenerate={handleGenerateTimetable}
//       />
      
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
//         <Title>Course Details Approval (Dean)</Title>
        
//         {/* Active Department Indicator */}
//         {activeDepartment && (
//           <div style={{ 
//             padding: "8px 16px", 
//             background: `${getDepartmentColor()}20`, 
//             borderRadius: 8,
//             border: `1px solid ${getDepartmentColor()}`
//           }}>
//             <span style={{ color: getDepartmentColor(), fontWeight: 600 }}>
//               Active Department: {activeDepartment}
//             </span>
//             {isDeptCompleted && (
//               <Badge variant="success" style={{ marginLeft: 8 }}>✓ Completed</Badge>
//             )}
//           </div>
//         )}
        
//         {!activeDepartment && (
//           <div style={{ padding: 8, background: C.accent.goldBg, borderRadius: 8 }}>
//             <span style={{ color: C.accent.gold }}>
//               ⚠️ No active department. Director needs to activate a department first.
//             </span>
//           </div>
//         )}
        
//         {totalCourses > 0 && canGenerateTimetable && (
//           <Button 
//             onClick={() => setShowConfigModal(true)} 
//             variant="success"
//             disabled={generating}
//             size="lg"
//           >
//             {generating ? "⏳ Generating..." : `⚙️ Generate ${activeDepartment} Timetable`}
//           </Button>
//         )}
        
//         {totalCourses > 0 && allCoursesApproved && isDeptActive && !isDeptCompleted && hasSchedulingIssues && !showConflictResolver && (
//           <Button 
//             onClick={() => setShowConflictResolver(true)} 
//             variant="warning"
//             size="lg"
//           >
//             ⚠️ Check & Resolve Conflicts First
//           </Button>
//         )}
        
//         {totalCourses > 0 && allCoursesApproved && isDeptActive && isDeptCompleted && (
//           <div style={{ padding: 8, background: C.accent.greenBg, borderRadius: 8 }}>
//             <span style={{ color: C.accent.green }}>
//               ✓ {activeDepartment} timetable has been generated and completed!
//             </span>
//           </div>
//         )}
        
//         {totalCourses > 0 && allCoursesApproved && isDeptActive && hasSchedulingIssues && !showConflictResolver && (
//           <div style={{ padding: 8, background: C.accent.redBg, borderRadius: 8 }}>
//             <span style={{ color: C.accent.red, fontSize: 13 }}>
//               ⚠️ Scheduling conflicts detected! Click "Check & Resolve Conflicts" button.
//             </span>
//           </div>
//         )}
//       </div>
      
//       {/* Conflict Resolution Engine */}
//       {showConflictResolver && activeDepartment && approvedCourses.length > 0 && (
//         <ConflictResolutionEngine 
//           approvedCourses={approvedCourses}
//           department={activeDepartment}
//           onResolved={handleConflictsResolved}
//         />
//       )}
      
//       {/* Capacity Dashboard - Shows scheduling feasibility for active department */}
//       {approvedCourses.length > 0 && activeDepartment && !showConflictResolver && (
//         <CapacityDashboard approvedCourses={approvedCourses} department={activeDepartment} />
//       )}
      
//       {!activeDepartment && approvedCourses.length > 0 && (
//         <Card style={{ background: C.accent.goldBg }}>
//           <p style={{ color: C.accent.gold, margin: 0, textAlign: "center" }}>
//             ⚠️ Please ask the Director to activate a department to view capacity dashboard and generate timetable.
//           </p>
//         </Card>
//       )}
      
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Approval</p>
//           <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingDeanApprovals.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Approved Courses</p>
//           <p style={{ color: C.accent.green, fontSize: 32, fontWeight: 700 }}>{approvedCourses.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Total ({activeDepartment || 'All'})</p>
//           <p style={{ color: C.accent.blue, fontSize: 32, fontWeight: 700 }}>{totalCourses}</p>
//         </Card>
//       </div>
      
//       {pendingDeanApprovals.length > 0 ? (
//         pendingDeanApprovals.map(course => {
//           const faculty = AppState.faculty?.find(f => f.id === course.facultyId);
//           const subject = AppState.subjects?.find(s => s.id === course.subjectId);
          
//           return (
//             <Card key={course.id}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
//                 <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
//                   <div style={{
//                     width: 48,
//                     height: 48,
//                     borderRadius: "50%",
//                     background: faculty ? `${faculty.color}20` : C.accent.blueBg,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: faculty?.color || C.accent.blue,
//                     fontWeight: 700,
//                     fontSize: 18,
//                   }}>
//                     {faculty?.avatar || "?"}
//                   </div>
//                   <div>
//                     <p style={{ color: C.text.primary, fontWeight: 600, fontSize: 16 }}>{faculty?.name || "Unknown Faculty"}</p>
//                     <p style={{ color: C.accent.blue, fontSize: 14 }}>{course.subjectName} ({course.subjectCode})</p>
//                     <p style={{ color: C.text.tertiary, fontSize: 12 }}>{course.course} Semester {course.semester}</p>
//                   </div>
//                 </div>
//                 <Badge variant="warning">Pending Dean Approval</Badge>
//               </div>
              
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12, marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Credits</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.credits}</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Modules</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.modules}</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Theory Classes</span><br /><span style={{ color: C.accent.blue, fontSize: 18, fontWeight: 600 }}>{course.theoryClassesPerWeek}/week</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Lab Periods</span><br /><span style={{ color: C.accent.green, fontSize: 18, fontWeight: 600 }}>{course.labPeriodsPerWeek}/week</span></div>
//               </div>
              
//               <div style={{ marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//                 <p style={{ color: C.accent.gold, fontSize: 14 }}>Total Weekly Classes per Section: <strong>{course.totalWeeklyClasses}</strong></p>
//                 <p style={{ color: C.accent.gold, fontSize: 14 }}>Total Sessions (3 sections): <strong>{course.totalWeeklyClasses * 3}</strong></p>
//               </div>
              
//               {course.submittedAt && (
//                 <div style={{ marginBottom: 16, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
//                   <p style={{ color: C.text.secondary, fontSize: 12 }}>
//                     <strong>Submitted by Faculty:</strong> {new Date(course.submittedAt).toLocaleString()}
//                   </p>
//                 </div>
//               )}
              
//               <div style={{ display: "flex", gap: 12 }}>
//                 <Button onClick={() => handleApprove(course.id)} variant="success" fullWidth>
//                   ✓ Approve Course
//                 </Button>
//                 <Button onClick={() => handleReject(course.id)} variant="danger" fullWidth>
//                   ✗ Reject Course
//                 </Button>
//               </div>
//             </Card>
//           );
//         })
//       ) : (
//         <Card>
//           <div style={{ textAlign: "center", padding: "20px" }}>
//             <p style={{ color: C.accent.green, fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
//               ✓ No pending course approvals for {activeDepartment || 'active department'}!
//             </p>
//             {allCoursesApproved && totalCourses > 0 && (
//               <>
//                 {!activeDepartment && (
//                   <p style={{ color: C.accent.gold, marginBottom: 12 }}>
//                     ⚠️ No department is active. Director needs to activate a department first.
//                   </p>
//                 )}
//                 {activeDepartment && isDeptCompleted && (
//                   <p style={{ color: C.accent.green }}>
//                     ✅ {activeDepartment} timetable has been successfully generated!
//                   </p>
//                 )}
//                 {activeDepartment && !isDeptCompleted && !hasSchedulingIssues && (
//                   <p style={{ color: C.text.secondary }}>All courses for {activeDepartment} are approved. Click the button above to generate the timetable.</p>
//                 )}
//                 {activeDepartment && !isDeptCompleted && hasSchedulingIssues && !showConflictResolver && (
//                   <div style={{ marginTop: 12, padding: 12, background: C.accent.redBg, borderRadius: 8 }}>
//                     <p style={{ color: C.accent.red, marginBottom: 4 }}>
//                       ⚠️ Scheduling conflicts detected for {activeDepartment}!
//                     </p>
//                     <p style={{ fontSize: 13, margin: 4 }}>
//                       • Faculty overload issues found
//                       • Slot capacity constraints detected
//                     </p>
//                     <Button 
//                       onClick={() => setShowConflictResolver(true)} 
//                       variant="warning" 
//                       size="sm"
//                       style={{ marginTop: 8 }}
//                     >
//                       Click here to resolve conflicts
//                     </Button>
//                   </div>
//                 )}
//               </>
//             )}
//             {totalCourses === 0 && (
//               <p style={{ color: C.text.tertiary }}>No course details have been submitted yet for {activeDepartment || 'any department'}.</p>
//             )}
//           </div>
//         </Card>
//       )}
//     </div>
//   );
// }

// // src/components/admin/DeanCourseDetailsReview.jsx
// import { useState, useEffect } from "react";
// import { Card, Title, Badge, Button } from "../common";
// import { TimetableConfigModal } from "../shared/TimetableConfigModal";
// import { CapacityDashboard } from "../shared/CapacityDashboard";
// import { AutoConflictResolver } from "./AutoConflictResolver";
// import { AppState } from "../../AppState";
// import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "../../utils/storage";
// import { C } from "../../styles/theme";

// export function DeanCourseDetailsReview() {
//   const [refresh, setRefresh] = useState(0);
//   const [showConfigModal, setShowConfigModal] = useState(false);
//   const [showConflictResolver, setShowConflictResolver] = useState(false);
//   const [generating, setGenerating] = useState(false);
//   const [validationResult, setValidationResult] = useState(null);
//   const [activeDepartment, setActiveDepartment] = useState(null);
//   const [departmentStatus, setDepartmentStatus] = useState({});
//   const [conflictsResolved, setConflictsResolved] = useState(false);
//   const [resolutionsApplied, setResolutionsApplied] = useState(false);
  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRefresh(r => r + 1);
//       loadDepartmentStatus();
//       loadValidation();
//     };
//     loadDepartmentStatus();
//     loadValidation();
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, [refresh]);
  
//   const loadDepartmentStatus = () => {
//     const active = loadFromStorage(STORAGE_KEYS.ACTIVE_DEPARTMENT, null);
//     const status = loadFromStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, {});
//     console.log("Loaded active department:", active);
//     setActiveDepartment(active);
//     setDepartmentStatus(status);
//   };
  
//   const loadValidation = () => {
//     try {
//       let approvedCoursesList = AppState.courseDetails?.filter(c => c.deanStatus === "approved") || [];
      
//       if (activeDepartment) {
//         approvedCoursesList = approvedCoursesList.filter(c => c.course === activeDepartment);
//       }
      
//       console.log("Approved courses for validation:", approvedCoursesList.length);
      
//       if (approvedCoursesList.length > 0) {
//         if (typeof AppState.validateTimetable === 'function') {
//           const validation = AppState.validateTimetable(activeDepartment);
//           console.log("Validation result:", validation);
//           setValidationResult(validation);
          
//           // If validation passes, set conflictsResolved to true
//           if (validation.canSchedule) {
//             setConflictsResolved(true);
//           } else {
//             setConflictsResolved(false);
//           }
//         } else {
//           setValidationResult({
//             canSchedule: true,
//             errors: [],
//             warnings: [],
//             subjectStatus: [],
//             facultyWorkload: [],
//             totalRequiredSlots: 0,
//             totalAvailableSlots: 120,
//             utilization: 0
//           });
//           setConflictsResolved(true);
//         }
//       } else {
//         setValidationResult(null);
//         setConflictsResolved(false);
//       }
//     } catch (error) {
//       console.error("Error loading validation:", error);
//       setValidationResult({
//         canSchedule: true,
//         errors: [],
//         warnings: [],
//         subjectStatus: [],
//         facultyWorkload: [],
//         totalRequiredSlots: 0,
//         totalAvailableSlots: 120,
//         utilization: 0
//       });
//       setConflictsResolved(true);
//     }
//   };
  
//   // Get course details pending dean approval for active department only
//   const pendingDeanApprovals = AppState.courseDetails?.filter(c => 
//     c.deanStatus === "pending" && c.submittedAt && (!activeDepartment || c.course === activeDepartment)
//   ) || [];
  
//   const approvedCourses = AppState.courseDetails?.filter(c => 
//     c.deanStatus === "approved" && (!activeDepartment || c.course === activeDepartment)
//   ) || [];
  
//   const totalCourses = approvedCourses.length + pendingDeanApprovals.length;
  
//   const handleApprove = (courseId) => {
//     AppState.updateCourseDetailDeanStatus(courseId, "approved");
//     setRefresh(r => r + 1);
//     window.dispatchEvent(new Event('storage'));
//     alert("Course approved successfully!");
//   };
  
//   const handleReject = (courseId) => {
//     const reason = prompt("Enter rejection reason:");
//     if (reason) {
//       AppState.updateCourseDetailDeanStatus(courseId, "rejected", reason);
//       setRefresh(r => r + 1);
//       window.dispatchEvent(new Event('storage'));
//       alert("Course rejected!");
//     }
//   };
  
//   const handleGenerateTimetable = (config) => {
//     setGenerating(true);
//     try {
//       if (!activeDepartment) {
//         alert("No active department selected. Please ask the Director to activate a department first.");
//         setGenerating(false);
//         setShowConfigModal(false);
//         return;
//       }
      
//       const isDeptCompleted = departmentStatus[activeDepartment]?.completed;
//       if (isDeptCompleted) {
//         if (!confirm(`Timetable for ${activeDepartment} is already completed. Generating again will overwrite it. Continue?`)) {
//           setGenerating(false);
//           setShowConfigModal(false);
//           return;
//         }
//       }
      
//       // First validate if all subjects can be scheduled
//       let canSchedule = true;
//       let validationErrors = [];
      
//       if (typeof AppState.validateTimetable === 'function') {
//         const validation = AppState.validateTimetable(activeDepartment);
//         canSchedule = validation.canSchedule;
//         validationErrors = validation.errors || [];
//       }
      
//       if (!canSchedule) {
//         const errorMessages = validationErrors.map(e => `- ${e.subject || e.faculty}: ${e.type}`).join("\n");
//         alert(`❌ Cannot generate timetable for ${activeDepartment}!\n\nIssues found:\n${errorMessages}\n\nPlease resolve these issues before generating.`);
//         setGenerating(false);
//         setShowConfigModal(false);
//         return;
//       }
      
//       const approvedCoursesList = AppState.courseDetails?.filter(c => 
//         c.deanStatus === "approved" && c.course === activeDepartment
//       ) || [];
      
//       if (approvedCoursesList.length === 0) {
//         alert(`No approved courses found for ${activeDepartment}.`);
//         setGenerating(false);
//         setShowConfigModal(false);
//         return;
//       }
      
//       const generatedTimetable = AppState.generateTimetable(activeDepartment);
      
//       if (generatedTimetable && generatedTimetable.length > 0) {
//         // Mark department as completed
//         const updatedStatus = {
//           ...departmentStatus,
//           [activeDepartment]: {
//             ...departmentStatus[activeDepartment],
//             completed: true,
//             completedAt: new Date().toISOString(),
//             slotsGenerated: generatedTimetable.length
//           }
//         };
//         saveToStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, updatedStatus);
//         setDepartmentStatus(updatedStatus);
        
//         alert(`✅ ${activeDepartment} timetable generated successfully with ${generatedTimetable.length} slots!`);
//         setRefresh(r => r + 1);
//         window.dispatchEvent(new Event('storage'));
//       } else {
//         alert(`⚠️ No timetable slots were generated for ${activeDepartment}.\n\nApproved courses: ${approvedCoursesList.length}`);
//       }
//     } catch (error) {
//       console.error("Error generating timetable:", error);
//       alert("Error generating timetable: " + error.message);
//     } finally {
//       setGenerating(false);
//       setShowConfigModal(false);
//     }
//   };
  
//   const handleConflictsResolved = (resolved) => {
//     setShowConflictResolver(false);
//     if (resolved) {
//       setResolutionsApplied(true);
//       // Force a complete refresh of data
//       setTimeout(() => {
//         // Reload all data from localStorage
//         AppState.courseDetails = loadFromStorage(STORAGE_KEYS.COURSE_DETAILS, []);
//         AppState.faculty = loadFromStorage(STORAGE_KEYS.FACULTY, []);
//         AppState.subjects = loadFromStorage(STORAGE_KEYS.SUBJECTS, []);
        
//         // Re-validate
//         loadValidation();
//         setRefresh(r => r + 1);
        
//         alert("✅ Conflicts resolved successfully! You can now generate the timetable.");
//       }, 500);
//     }
//   };
  
//   const allCoursesApproved = totalCourses > 0 && pendingDeanApprovals.length === 0;
  
//   const isDeptActive = !!activeDepartment;
//   const isDeptCompleted = activeDepartment ? departmentStatus[activeDepartment]?.completed : false;
//   const hasSchedulingIssues = validationResult?.canSchedule === false;
  
//   // Show generate button when all conditions are met
//   const showGenerateButton = allCoursesApproved && isDeptActive && !isDeptCompleted;
//   const canGenerate = showGenerateButton && !hasSchedulingIssues;
  
//   console.log("Debug - Show Generate Button:", showGenerateButton);
//   console.log("Debug - Has Scheduling Issues:", hasSchedulingIssues);
//   console.log("Debug - Conflicts Resolved:", conflictsResolved);
//   console.log("Debug - Can Generate:", canGenerate);
//   console.log("Debug - Resolutions Applied:", resolutionsApplied);
  
//   // Get department display color
//   const getDepartmentColor = () => {
//     switch(activeDepartment) {
//       case "BTech": return C.accent.blue;
//       case "BSc": return C.accent.green;
//       case "BCA": return C.accent.gold;
//       default: return C.text.primary;
//     }
//   };
  
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <TimetableConfigModal 
//         isOpen={showConfigModal} 
//         onClose={() => setShowConfigModal(false)} 
//         onGenerate={handleGenerateTimetable}
//       />
      
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
//         <Title>Course Details Approval (Dean)</Title>
        
//         {/* Active Department Indicator */}
//         {activeDepartment && (
//           <div style={{ 
//             padding: "8px 16px", 
//             background: `${getDepartmentColor()}20`, 
//             borderRadius: 8,
//             border: `1px solid ${getDepartmentColor()}`
//           }}>
//             <span style={{ color: getDepartmentColor(), fontWeight: 600 }}>
//               Active Department: {activeDepartment}
//             </span>
//             {isDeptCompleted && (
//               <Badge variant="success" style={{ marginLeft: 8 }}>✓ Completed</Badge>
//             )}
//           </div>
//         )}
        
//         {!activeDepartment && (
//           <div style={{ padding: 8, background: C.accent.goldBg, borderRadius: 8 }}>
//             <span style={{ color: C.accent.gold }}>
//               ⚠️ No active department. Director needs to activate a department first.
//             </span>
//           </div>
//         )}
        
//         {/* Generate Timetable Button */}
//         {showGenerateButton && (
//           <Button 
//             onClick={() => setShowConfigModal(true)} 
//             variant="success"
//             disabled={generating || hasSchedulingIssues}
//             size="lg"
//           >
//             {generating ? "⏳ Generating..." : 
//              hasSchedulingIssues ? "⚠️ Resolve Conflicts First" : 
//              `⚙️ Generate ${activeDepartment} Timetable`}
//           </Button>
//         )}
        
//         {totalCourses > 0 && allCoursesApproved && isDeptActive && isDeptCompleted && (
//           <div style={{ padding: 8, background: C.accent.greenBg, borderRadius: 8 }}>
//             <span style={{ color: C.accent.green }}>
//               ✓ {activeDepartment} timetable has been generated and completed!
//             </span>
//           </div>
//         )}
//       </div>
      
//       {/* Show message when courses are approved but conflicts exist */}
//       {allCoursesApproved && isDeptActive && !isDeptCompleted && hasSchedulingIssues && !showConflictResolver && (
//         <Card style={{ background: C.accent.redBg }}>
//           <div style={{ textAlign: "center", padding: 16 }}>
//             <span style={{ fontSize: 32 }}>⚠️</span>
//             <h3 style={{ color: C.accent.red, marginTop: 8 }}>Scheduling Conflicts Detected!</h3>
//             <p style={{ color: C.text.secondary }}>
//               Faculty overload or slot capacity issues found. Click the button below to auto-resolve conflicts.
//             </p>
//             <Button 
//               onClick={() => setShowConflictResolver(true)} 
//               variant="warning"
//               size="lg"
//               style={{ marginTop: 12 }}
//             >
//               🔧 Auto-Resolve Conflicts
//             </Button>
//           </div>
//         </Card>
//       )}
      
//       {/* Show success message when conflicts are resolved */}
//       {allCoursesApproved && isDeptActive && !isDeptCompleted && !hasSchedulingIssues && resolutionsApplied && (
//         <Card style={{ background: C.accent.greenBg }}>
//           <div style={{ textAlign: "center", padding: 16 }}>
//             <span style={{ fontSize: 32 }}>✅</span>
//             <h3 style={{ color: C.accent.green, marginTop: 8 }}>Conflicts Resolved Successfully!</h3>
//             <p style={{ color: C.text.secondary }}>
//               All scheduling conflicts have been resolved. Click the "Generate Timetable" button above.
//             </p>
//           </div>
//         </Card>
//       )}
      
//       {/* Auto Conflict Resolution Engine */}
//       {showConflictResolver && activeDepartment && approvedCourses.length > 0 && (
//         <AutoConflictResolver 
//           approvedCourses={approvedCourses}
//           department={activeDepartment}
//           onResolved={handleConflictsResolved}
//           onCancel={() => setShowConflictResolver(false)}
//         />
//       )}
      
//       {/* Capacity Dashboard - Shows scheduling feasibility for active department */}
//       {approvedCourses.length > 0 && activeDepartment && !showConflictResolver && (
//         <CapacityDashboard approvedCourses={approvedCourses} department={activeDepartment} />
//       )}
      
//       {!activeDepartment && approvedCourses.length > 0 && (
//         <Card style={{ background: C.accent.goldBg }}>
//           <p style={{ color: C.accent.gold, margin: 0, textAlign: "center" }}>
//             ⚠️ Please ask the Director to activate a department to view capacity dashboard and generate timetable.
//           </p>
//         </Card>
//       )}
      
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Approval</p>
//           <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingDeanApprovals.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Approved Courses</p>
//           <p style={{ color: C.accent.green, fontSize: 32, fontWeight: 700 }}>{approvedCourses.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Total ({activeDepartment || 'All'})</p>
//           <p style={{ color: C.accent.blue, fontSize: 32, fontWeight: 700 }}>{totalCourses}</p>
//         </Card>
//       </div>
      
//       {pendingDeanApprovals.length > 0 ? (
//         pendingDeanApprovals.map(course => {
//           const faculty = AppState.faculty?.find(f => f.id === course.facultyId);
//           const subject = AppState.subjects?.find(s => s.id === course.subjectId);
          
//           return (
//             <Card key={course.id}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
//                 <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
//                   <div style={{
//                     width: 48,
//                     height: 48,
//                     borderRadius: "50%",
//                     background: faculty ? `${faculty.color}20` : C.accent.blueBg,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: faculty?.color || C.accent.blue,
//                     fontWeight: 700,
//                     fontSize: 18,
//                   }}>
//                     {faculty?.avatar || "?"}
//                   </div>
//                   <div>
//                     <p style={{ color: C.text.primary, fontWeight: 600, fontSize: 16 }}>{faculty?.name || "Unknown Faculty"}</p>
//                     <p style={{ color: C.accent.blue, fontSize: 14 }}>{course.subjectName} ({course.subjectCode})</p>
//                     <p style={{ color: C.text.tertiary, fontSize: 12 }}>{course.course} Semester {course.semester}</p>
//                   </div>
//                 </div>
//                 <Badge variant="warning">Pending Dean Approval</Badge>
//               </div>
              
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12, marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Credits</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.credits}</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Modules</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.modules}</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Theory Classes</span><br /><span style={{ color: C.accent.blue, fontSize: 18, fontWeight: 600 }}>{course.theoryClassesPerWeek}/week</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Lab Periods</span><br /><span style={{ color: C.accent.green, fontSize: 18, fontWeight: 600 }}>{course.labPeriodsPerWeek}/week</span></div>
//               </div>
              
//               <div style={{ marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//                 <p style={{ color: C.accent.gold, fontSize: 14 }}>Total Weekly Classes per Section: <strong>{course.totalWeeklyClasses}</strong></p>
//                 <p style={{ color: C.accent.gold, fontSize: 14 }}>Total Sessions (3 sections): <strong>{course.totalWeeklyClasses * 3}</strong></p>
//               </div>
              
//               {course.submittedAt && (
//                 <div style={{ marginBottom: 16, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
//                   <p style={{ color: C.text.secondary, fontSize: 12 }}>
//                     <strong>Submitted by Faculty:</strong> {new Date(course.submittedAt).toLocaleString()}
//                   </p>
//                 </div>
//               )}
              
//               <div style={{ display: "flex", gap: 12 }}>
//                 <Button onClick={() => handleApprove(course.id)} variant="success" fullWidth>
//                   ✓ Approve Course
//                 </Button>
//                 <Button onClick={() => handleReject(course.id)} variant="danger" fullWidth>
//                   ✗ Reject Course
//                 </Button>
//               </div>
//             </Card>
//           );
//         })
//       ) : (
//         <Card>
//           <div style={{ textAlign: "center", padding: "20px" }}>
//             <p style={{ color: C.accent.green, fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
//               ✓ No pending course approvals for {activeDepartment || 'active department'}!
//             </p>
//             {allCoursesApproved && totalCourses > 0 && (
//               <>
//                 {!activeDepartment && (
//                   <p style={{ color: C.accent.gold, marginBottom: 12 }}>
//                     ⚠️ No department is active. Director needs to activate a department first.
//                   </p>
//                 )}
//                 {activeDepartment && isDeptCompleted && (
//                   <p style={{ color: C.accent.green }}>
//                     ✅ {activeDepartment} timetable has been successfully generated!
//                   </p>
//                 )}
//                 {activeDepartment && !isDeptCompleted && !hasSchedulingIssues && (
//                   <p style={{ color: C.text.secondary }}>
//                     All courses for {activeDepartment} are approved and no conflicts detected. Click the "Generate Timetable" button above.
//                   </p>
//                 )}
//                 {activeDepartment && !isDeptCompleted && hasSchedulingIssues && (
//                   <p style={{ color: C.accent.red }}>
//                     ⚠️ Scheduling conflicts detected. Click "Auto-Resolve Conflicts" to fix them.
//                   </p>
//                 )}
//               </>
//             )}
//             {totalCourses === 0 && (
//               <p style={{ color: C.text.tertiary }}>No course details have been submitted yet for {activeDepartment || 'any department'}.</p>
//             )}
//           </div>
//         </Card>
//       )}
//     </div>
//   );
// }

// // src/components/admin/DeanCourseDetailsReview.jsx
// import { useState, useEffect } from "react";
// import { Card, Title, Badge, Button } from "../common";
// import { TimetableConfigModal } from "../shared/TimetableConfigModal";
// import { CapacityDashboard } from "../shared/CapacityDashboard";
// import { AutoConflictResolver } from "./AutoConflictResolver";
// import { AppState } from "../../AppState";
// import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "../../utils/storage";
// import { C } from "../../styles/theme";

// export function DeanCourseDetailsReview() {
//   const [refresh, setRefresh] = useState(0);
//   const [showConfigModal, setShowConfigModal] = useState(false);
//   const [showConflictResolver, setShowConflictResolver] = useState(false);
//   const [generating, setGenerating] = useState(false);
//   const [validationResult, setValidationResult] = useState(null);
//   const [activeDepartment, setActiveDepartment] = useState(null);
//   const [departmentStatus, setDepartmentStatus] = useState({});
//   const [conflictsResolved, setConflictsResolved] = useState(false);
//   const [resolutionsApplied, setResolutionsApplied] = useState(false);
  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRefresh(r => r + 1);
//       loadDepartmentStatus();
//       loadValidation();
//     };
//     loadDepartmentStatus();
//     loadValidation();
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, [refresh]);
  
//   const loadDepartmentStatus = () => {
//     const active = loadFromStorage(STORAGE_KEYS.ACTIVE_DEPARTMENT, null);
//     const status = loadFromStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, {});
//     console.log("Loaded active department:", active);
//     setActiveDepartment(active);
//     setDepartmentStatus(status);
//   };
  
//   const loadValidation = () => {
//     try {
//       let approvedCoursesList = AppState.courseDetails?.filter(c => c.deanStatus === "approved") || [];
      
//       if (activeDepartment) {
//         approvedCoursesList = approvedCoursesList.filter(c => c.course === activeDepartment);
//       }
      
//       console.log("Approved courses for validation:", approvedCoursesList.length);
      
//       if (approvedCoursesList.length > 0) {
//         if (typeof AppState.validateTimetable === 'function') {
//           const validation = AppState.validateTimetable(activeDepartment);
//           console.log("Validation result:", validation);
//           setValidationResult(validation);
          
//           if (validation.canSchedule) {
//             setConflictsResolved(true);
//           } else {
//             setConflictsResolved(false);
//           }
//         } else {
//           setValidationResult({
//             canSchedule: true,
//             errors: [],
//             warnings: [],
//             subjectStatus: [],
//             facultyWorkload: [],
//             totalRequiredSlots: 0,
//             totalAvailableSlots: 120,
//             utilization: 0
//           });
//           setConflictsResolved(true);
//         }
//       } else {
//         setValidationResult(null);
//         setConflictsResolved(false);
//       }
//     } catch (error) {
//       console.error("Error loading validation:", error);
//       setValidationResult({
//         canSchedule: true,
//         errors: [],
//         warnings: [],
//         subjectStatus: [],
//         facultyWorkload: [],
//         totalRequiredSlots: 0,
//         totalAvailableSlots: 120,
//         utilization: 0
//       });
//       setConflictsResolved(true);
//     }
//   };
  
//   const pendingDeanApprovals = AppState.courseDetails?.filter(c => 
//     c.deanStatus === "pending" && c.submittedAt && (!activeDepartment || c.course === activeDepartment)
//   ) || [];
  
//   const approvedCourses = AppState.courseDetails?.filter(c => 
//     c.deanStatus === "approved" && (!activeDepartment || c.course === activeDepartment)
//   ) || [];
  
//   const totalCourses = approvedCourses.length + pendingDeanApprovals.length;
  
//   const handleApprove = (courseId) => {
//     AppState.updateCourseDetailDeanStatus(courseId, "approved");
//     setRefresh(r => r + 1);
//     window.dispatchEvent(new Event('storage'));
//     alert("Course approved successfully!");
//   };
  
//   const handleReject = (courseId) => {
//     const reason = prompt("Enter rejection reason:");
//     if (reason) {
//       AppState.updateCourseDetailDeanStatus(courseId, "rejected", reason);
//       setRefresh(r => r + 1);
//       window.dispatchEvent(new Event('storage'));
//       alert("Course rejected!");
//     }
//   };
  
//   const handleGenerateTimetable = (config) => {
//     setGenerating(true);
//     try {
//       if (!activeDepartment) {
//         alert("No active department selected. Please ask the Director to activate a department first.");
//         setGenerating(false);
//         setShowConfigModal(false);
//         return;
//       }
      
//       const isDeptCompleted = departmentStatus[activeDepartment]?.completed;
//       if (isDeptCompleted) {
//         if (!confirm(`Timetable for ${activeDepartment} is already completed. Generating again will overwrite it. Continue?`)) {
//           setGenerating(false);
//           setShowConfigModal(false);
//           return;
//         }
//       }
      
//       let canSchedule = true;
//       let validationErrors = [];
      
//       if (typeof AppState.validateTimetable === 'function') {
//         const validation = AppState.validateTimetable(activeDepartment);
//         canSchedule = validation.canSchedule;
//         validationErrors = validation.errors || [];
//       }
      
//       if (!canSchedule) {
//         const errorMessages = validationErrors.map(e => `- ${e.subject || e.faculty}: ${e.type}`).join("\n");
//         alert(`❌ Cannot generate timetable for ${activeDepartment}!\n\nIssues found:\n${errorMessages}\n\nPlease resolve these issues before generating.`);
//         setGenerating(false);
//         setShowConfigModal(false);
//         return;
//       }
      
//       const approvedCoursesList = AppState.courseDetails?.filter(c => 
//         c.deanStatus === "approved" && c.course === activeDepartment
//       ) || [];
      
//       if (approvedCoursesList.length === 0) {
//         alert(`No approved courses found for ${activeDepartment}.`);
//         setGenerating(false);
//         setShowConfigModal(false);
//         return;
//       }
      
//       const generatedTimetable = AppState.generateTimetable(activeDepartment);
      
//       if (generatedTimetable && generatedTimetable.length > 0) {
//         const updatedStatus = {
//           ...departmentStatus,
//           [activeDepartment]: {
//             ...departmentStatus[activeDepartment],
//             completed: true,
//             completedAt: new Date().toISOString(),
//             slotsGenerated: generatedTimetable.length
//           }
//         };
//         saveToStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, updatedStatus);
//         setDepartmentStatus(updatedStatus);
        
//         alert(`✅ ${activeDepartment} timetable generated successfully with ${generatedTimetable.length} slots!`);
//         setRefresh(r => r + 1);
//         window.dispatchEvent(new Event('storage'));
//       } else {
//         alert(`⚠️ No timetable slots were generated for ${activeDepartment}.\n\nApproved courses: ${approvedCoursesList.length}`);
//       }
//     } catch (error) {
//       console.error("Error generating timetable:", error);
//       alert("Error generating timetable: " + error.message);
//     } finally {
//       setGenerating(false);
//       setShowConfigModal(false);
//     }
//   };
  
//   const handleConflictsResolved = (resolved) => {
//     setShowConflictResolver(false);
//     if (resolved) {
//       setResolutionsApplied(true);
//       setTimeout(() => {
//         AppState.courseDetails = loadFromStorage(STORAGE_KEYS.COURSE_DETAILS, []);
//         AppState.faculty = loadFromStorage(STORAGE_KEYS.FACULTY, []);
//         AppState.subjects = loadFromStorage(STORAGE_KEYS.SUBJECTS, []);
        
//         loadValidation();
//         setRefresh(r => r + 1);
        
//         alert("✅ Conflicts resolved successfully! You can now generate the timetable.");
//       }, 500);
//     }
//   };
  
//   const allCoursesApproved = totalCourses > 0 && pendingDeanApprovals.length === 0;
  
//   const isDeptActive = !!activeDepartment;
//   const isDeptCompleted = activeDepartment ? departmentStatus[activeDepartment]?.completed : false;
//   const hasSchedulingIssues = validationResult?.canSchedule === false;
  
//   const showGenerateButton = allCoursesApproved && isDeptActive && !isDeptCompleted;
//   const canGenerate = showGenerateButton && !hasSchedulingIssues;
  
//   console.log("Debug - Show Generate Button:", showGenerateButton);
//   console.log("Debug - Has Scheduling Issues:", hasSchedulingIssues);
//   console.log("Debug - Conflicts Resolved:", conflictsResolved);
//   console.log("Debug - Can Generate:", canGenerate);
//   console.log("Debug - Resolutions Applied:", resolutionsApplied);
  
//   const getDepartmentColor = () => {
//     switch(activeDepartment) {
//       case "BTech": return C.accent.blue;
//       case "BSc": return C.accent.green;
//       case "BCA": return C.accent.gold;
//       default: return C.text.primary;
//     }
//   };
  
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <TimetableConfigModal 
//         isOpen={showConfigModal} 
//         onClose={() => setShowConfigModal(false)} 
//         onGenerate={handleGenerateTimetable}
//       />
      
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
//         <Title>Course Details Approval (Dean)</Title>
        
//         {activeDepartment && (
//           <div style={{ 
//             padding: "8px 16px", 
//             background: `${getDepartmentColor()}20`, 
//             borderRadius: 8,
//             border: `1px solid ${getDepartmentColor()}`
//           }}>
//             <span style={{ color: getDepartmentColor(), fontWeight: 600 }}>
//               Active Department: {activeDepartment}
//             </span>
//             {isDeptCompleted && (
//               <Badge variant="success" style={{ marginLeft: 8 }}>✓ Completed</Badge>
//             )}
//           </div>
//         )}
        
//         {!activeDepartment && (
//           <div style={{ padding: 8, background: C.accent.goldBg, borderRadius: 8 }}>
//             <span style={{ color: C.accent.gold }}>
//               ⚠️ No active department. Director needs to activate a department first.
//             </span>
//           </div>
//         )}
        
//         {showGenerateButton && (
//           <Button 
//             onClick={() => setShowConfigModal(true)} 
//             variant="success"
//             disabled={generating || hasSchedulingIssues}
//             size="lg"
//           >
//             {generating ? "⏳ Generating..." : 
//              hasSchedulingIssues ? "⚠️ Resolve Conflicts First" : 
//              `⚙️ Generate ${activeDepartment} Timetable`}
//           </Button>
//         )}
        
//         {totalCourses > 0 && allCoursesApproved && isDeptActive && isDeptCompleted && (
//           <div style={{ padding: 8, background: C.accent.greenBg, borderRadius: 8 }}>
//             <span style={{ color: C.accent.green }}>
//               ✓ {activeDepartment} timetable has been generated and completed!
//             </span>
//           </div>
//         )}
//       </div>
      
//       {allCoursesApproved && isDeptActive && !isDeptCompleted && hasSchedulingIssues && !showConflictResolver && (
//         <Card style={{ background: C.accent.redBg }}>
//           <div style={{ textAlign: "center", padding: 16 }}>
//             <span style={{ fontSize: 32 }}>⚠️</span>
//             <h3 style={{ color: C.accent.red, marginTop: 8 }}>Scheduling Conflicts Detected!</h3>
//             <p style={{ color: C.text.secondary }}>
//               Faculty overload or slot capacity issues found. Click the button below to auto-resolve conflicts.
//             </p>
//             <Button 
//               onClick={() => setShowConflictResolver(true)} 
//               variant="warning"
//               size="lg"
//               style={{ marginTop: 12 }}
//             >
//               🔧 Auto-Resolve Conflicts
//             </Button>
//           </div>
//         </Card>
//       )}
      
//       {allCoursesApproved && isDeptActive && !isDeptCompleted && !hasSchedulingIssues && resolutionsApplied && (
//         <Card style={{ background: C.accent.greenBg }}>
//           <div style={{ textAlign: "center", padding: 16 }}>
//             <span style={{ fontSize: 32 }}>✅</span>
//             <h3 style={{ color: C.accent.green, marginTop: 8 }}>Conflicts Resolved Successfully!</h3>
//             <p style={{ color: C.text.secondary }}>
//               All scheduling conflicts have been resolved. Click the "Generate Timetable" button above.
//             </p>
//           </div>
//         </Card>
//       )}
      
//       {showConflictResolver && activeDepartment && approvedCourses.length > 0 && (
//         <AutoConflictResolver 
//           approvedCourses={approvedCourses}
//           department={activeDepartment}
//           onResolved={handleConflictsResolved}
//           onCancel={() => setShowConflictResolver(false)}
//         />
//       )}
      
//       {approvedCourses.length > 0 && activeDepartment && !showConflictResolver && (
//         <CapacityDashboard approvedCourses={approvedCourses} department={activeDepartment} />
//       )}
      
//       {!activeDepartment && approvedCourses.length > 0 && (
//         <Card style={{ background: C.accent.goldBg }}>
//           <p style={{ color: C.accent.gold, margin: 0, textAlign: "center" }}>
//             ⚠️ Please ask the Director to activate a department to view capacity dashboard and generate timetable.
//           </p>
//         </Card>
//       )}
      
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Approval</p>
//           <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingDeanApprovals.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Approved Courses</p>
//           <p style={{ color: C.accent.green, fontSize: 32, fontWeight: 700 }}>{approvedCourses.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Total ({activeDepartment || 'All'})</p>
//           <p style={{ color: C.accent.blue, fontSize: 32, fontWeight: 700 }}>{totalCourses}</p>
//         </Card>
//       </div>
      
//       {pendingDeanApprovals.length > 0 ? (
//         pendingDeanApprovals.map(course => {
//           const faculty = AppState.faculty?.find(f => f.id === course.facultyId);
//           const subject = AppState.subjects?.find(s => s.id === course.subjectId);
          
//           return (
//             <Card key={course.id}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
//                 <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
//                   <div style={{
//                     width: 48,
//                     height: 48,
//                     borderRadius: "50%",
//                     background: faculty ? `${faculty.color}20` : C.accent.blueBg,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: faculty?.color || C.accent.blue,
//                     fontWeight: 700,
//                     fontSize: 18,
//                   }}>
//                     {faculty?.avatar || "?"}
//                   </div>
//                   <div>
//                     <p style={{ color: C.text.primary, fontWeight: 600, fontSize: 16 }}>{faculty?.name || "Unknown Faculty"}</p>
//                     <p style={{ color: C.accent.blue, fontSize: 14 }}>{course.subjectName} ({course.subjectCode})</p>
//                     <p style={{ color: C.text.tertiary, fontSize: 12 }}>{course.course} Semester {course.semester}</p>
//                   </div>
//                 </div>
//                 <Badge variant="warning">Pending Dean Approval</Badge>
//               </div>
              
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12, marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Credits</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.credits}</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Modules</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.modules}</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Theory Classes</span><br /><span style={{ color: C.accent.blue, fontSize: 18, fontWeight: 600 }}>{course.theoryClassesPerWeek}/week</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Lab Periods</span><br /><span style={{ color: C.accent.green, fontSize: 18, fontWeight: 600 }}>{course.labPeriodsPerWeek}/week</span></div>
//               </div>
              
//               <div style={{ marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//                 <p style={{ color: C.accent.gold, fontSize: 14 }}>Total Weekly Classes per Section: <strong>{course.totalWeeklyClasses}</strong></p>
//                 <p style={{ color: C.accent.gold, fontSize: 14 }}>Total Sessions (3 sections): <strong>{course.totalWeeklyClasses * 3}</strong></p>
//               </div>
              
//               {course.submittedAt && (
//                 <div style={{ marginBottom: 16, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
//                   <p style={{ color: C.text.secondary, fontSize: 12 }}>
//                     <strong>Submitted by Faculty:</strong> {new Date(course.submittedAt).toLocaleString()}
//                   </p>
//                 </div>
//               )}
              
//               <div style={{ display: "flex", gap: 12 }}>
//                 <Button onClick={() => handleApprove(course.id)} variant="success" fullWidth>
//                   ✓ Approve Course
//                 </Button>
//                 <Button onClick={() => handleReject(course.id)} variant="danger" fullWidth>
//                   ✗ Reject Course
//                 </Button>
//               </div>
//             </Card>
//           );
//         })
//       ) : (
//         <Card>
//           <div style={{ textAlign: "center", padding: "20px" }}>
//             <p style={{ color: C.accent.green, fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
//               ✓ No pending course approvals for {activeDepartment || 'active department'}!
//             </p>
//             {allCoursesApproved && totalCourses > 0 && (
//               <>
//                 {!activeDepartment && (
//                   <p style={{ color: C.accent.gold, marginBottom: 12 }}>
//                     ⚠️ No department is active. Director needs to activate a department first.
//                   </p>
//                 )}
//                 {activeDepartment && isDeptCompleted && (
//                   <p style={{ color: C.accent.green }}>
//                     ✅ {activeDepartment} timetable has been successfully generated!
//                   </p>
//                 )}
//                 {activeDepartment && !isDeptCompleted && !hasSchedulingIssues && (
//                   <p style={{ color: C.text.secondary }}>
//                     All courses for {activeDepartment} are approved and no conflicts detected. Click the "Generate Timetable" button above.
//                   </p>
//                 )}
//                 {activeDepartment && !isDeptCompleted && hasSchedulingIssues && (
//                   <p style={{ color: C.accent.red }}>
//                     ⚠️ Scheduling conflicts detected. Click "Auto-Resolve Conflicts" to fix them.
//                   </p>
//                 )}
//               </>
//             )}
//             {totalCourses === 0 && (
//               <p style={{ color: C.text.tertiary }}>No course details have been submitted yet for {activeDepartment || 'any department'}.</p>
//             )}
//           </div>
//         </Card>
//       )}
//     </div>
//   );
// }

// // src/components/admin/DeanCourseDetailsReview.jsx
// import { useState, useEffect } from "react";
// import { Card, Title, Badge, Button } from "../common";
// import { TimetableConfigModal } from "../shared/TimetableConfigModal";
// import { CapacityDashboard } from "../shared/CapacityDashboard";
// import { AutoConflictResolver } from "./AutoConflictResolver";
// import { SubjectAssignmentManager } from "./SubjectAssignmentManager";
// import { AppState } from "../../AppState";
// import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "../../utils/storage";
// import { findMissedSubjects, findDuplicateAssignments } from "../../utils/subjectAssignmentEngine";
// import { C } from "../../styles/theme";

// export function DeanCourseDetailsReview() {
//   const [refresh, setRefresh] = useState(0);
//   const [showConfigModal, setShowConfigModal] = useState(false);
//   const [showConflictResolver, setShowConflictResolver] = useState(false);
//   const [showAssignmentManager, setShowAssignmentManager] = useState(false);
//   const [generating, setGenerating] = useState(false);
//   const [validationResult, setValidationResult] = useState(null);
//   const [activeDepartment, setActiveDepartment] = useState(null);
//   const [departmentStatus, setDepartmentStatus] = useState({});
//   const [conflictsResolved, setConflictsResolved] = useState(false);
//   const [resolutionsApplied, setResolutionsApplied] = useState(false);
//   const [assignmentStatus, setAssignmentStatus] = useState({ allAssigned: true, missedCount: 0, duplicateCount: 0 });
  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRefresh(r => r + 1);
//       loadDepartmentStatus();
//       loadValidation();
//       checkAssignmentStatus();
//     };
//     loadDepartmentStatus();
//     loadValidation();
//     checkAssignmentStatus();
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, [refresh]);
  
//   const loadDepartmentStatus = () => {
//     const active = loadFromStorage(STORAGE_KEYS.ACTIVE_DEPARTMENT, null);
//     const status = loadFromStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, {});
//     console.log("Loaded active department:", active);
//     setActiveDepartment(active);
//     setDepartmentStatus(status);
//   };
  
//   const checkAssignmentStatus = () => {
//     if (!activeDepartment) return;
    
//     const missed = findMissedSubjects(activeDepartment);
//     const duplicates = findDuplicateAssignments(activeDepartment);
    
//     const allAssigned = missed.allAssigned && duplicates.length === 0;
//     setAssignmentStatus({
//       allAssigned: allAssigned,
//       missedCount: missed.missedSubjects.length,
//       duplicateCount: duplicates.length,
//       partialCount: missed.partialSubjects.length,
//       missedSubjects: missed.missedSubjects,
//       duplicates: duplicates
//     });
    
//     return allAssigned;
//   };
  
//   const loadValidation = () => {
//     try {
//       let approvedCoursesList = AppState.courseDetails?.filter(c => c.deanStatus === "approved") || [];
      
//       if (activeDepartment) {
//         approvedCoursesList = approvedCoursesList.filter(c => c.course === activeDepartment);
//       }
      
//       console.log("Approved courses for validation:", approvedCoursesList.length);
      
//       if (approvedCoursesList.length > 0) {
//         if (typeof AppState.validateTimetable === 'function') {
//           const validation = AppState.validateTimetable(activeDepartment);
//           console.log("Validation result:", validation);
//           setValidationResult(validation);
          
//           if (validation.canSchedule) {
//             setConflictsResolved(true);
//           } else {
//             setConflictsResolved(false);
//           }
//         } else {
//           setValidationResult({
//             canSchedule: true,
//             errors: [],
//             warnings: [],
//             subjectStatus: [],
//             facultyWorkload: [],
//             totalRequiredSlots: 0,
//             totalAvailableSlots: 120,
//             utilization: 0
//           });
//           setConflictsResolved(true);
//         }
//       } else {
//         setValidationResult(null);
//         setConflictsResolved(false);
//       }
//     } catch (error) {
//       console.error("Error loading validation:", error);
//       setValidationResult({
//         canSchedule: true,
//         errors: [],
//         warnings: [],
//         subjectStatus: [],
//         facultyWorkload: [],
//         totalRequiredSlots: 0,
//         totalAvailableSlots: 120,
//         utilization: 0
//       });
//       setConflictsResolved(true);
//     }
//   };
  
//   const pendingDeanApprovals = AppState.courseDetails?.filter(c => 
//     c.deanStatus === "pending" && c.submittedAt && (!activeDepartment || c.course === activeDepartment)
//   ) || [];
  
//   const approvedCourses = AppState.courseDetails?.filter(c => 
//     c.deanStatus === "approved" && (!activeDepartment || c.course === activeDepartment)
//   ) || [];
  
//   const totalCourses = approvedCourses.length + pendingDeanApprovals.length;
  
//   const handleApprove = (courseId) => {
//     AppState.updateCourseDetailDeanStatus(courseId, "approved");
//     setRefresh(r => r + 1);
//     window.dispatchEvent(new Event('storage'));
//     alert("Course approved successfully!");
//   };
  
//   const handleReject = (courseId) => {
//     const reason = prompt("Enter rejection reason:");
//     if (reason) {
//       AppState.updateCourseDetailDeanStatus(courseId, "rejected", reason);
//       setRefresh(r => r + 1);
//       window.dispatchEvent(new Event('storage'));
//       alert("Course rejected!");
//     }
//   };
  
//   const handleGenerateTimetable = (config) => {
//     setGenerating(true);
//     try {
//       if (!activeDepartment) {
//         alert("No active department selected. Please ask the Director to activate a department first.");
//         setGenerating(false);
//         setShowConfigModal(false);
//         return;
//       }
      
//       // Check if all subjects are assigned before generating
//       const missed = findMissedSubjects(activeDepartment);
//       const duplicates = findDuplicateAssignments(activeDepartment);
      
//       if (!missed.allAssigned) {
//         alert(`⚠️ Cannot generate timetable!\n\nMissing Assignments:\n- ${missed.missedSubjects.length} subjects have no faculty\n- ${missed.partialSubjects.length} subjects have partial assignments\n\nPlease complete subject assignments first.`);
//         setGenerating(false);
//         setShowConfigModal(false);
//         setShowAssignmentManager(true);
//         return;
//       }
      
//       if (duplicates.length > 0) {
//         alert(`⚠️ Cannot generate timetable!\n\n${duplicates.length} subject(s) have multiple faculty assignments.\n\nPlease resolve duplicates first.`);
//         setGenerating(false);
//         setShowConfigModal(false);
//         setShowAssignmentManager(true);
//         return;
//       }
      
//       const isDeptCompleted = departmentStatus[activeDepartment]?.completed;
//       if (isDeptCompleted) {
//         if (!confirm(`Timetable for ${activeDepartment} is already completed. Generating again will overwrite it. Continue?`)) {
//           setGenerating(false);
//           setShowConfigModal(false);
//           return;
//         }
//       }
      
//       let canSchedule = true;
//       let validationErrors = [];
      
//       if (typeof AppState.validateTimetable === 'function') {
//         const validation = AppState.validateTimetable(activeDepartment);
//         canSchedule = validation.canSchedule;
//         validationErrors = validation.errors || [];
//       }
      
//       if (!canSchedule) {
//         const errorMessages = validationErrors.map(e => `- ${e.subject || e.faculty}: ${e.type}`).join("\n");
//         alert(`❌ Cannot generate timetable for ${activeDepartment}!\n\nIssues found:\n${errorMessages}\n\nPlease resolve these issues before generating.`);
//         setGenerating(false);
//         setShowConfigModal(false);
//         return;
//       }
      
//       const approvedCoursesList = AppState.courseDetails?.filter(c => 
//         c.deanStatus === "approved" && c.course === activeDepartment
//       ) || [];
      
//       if (approvedCoursesList.length === 0) {
//         alert(`No approved courses found for ${activeDepartment}.`);
//         setGenerating(false);
//         setShowConfigModal(false);
//         return;
//       }
      
//       const generatedTimetable = AppState.generateTimetable(activeDepartment);
      
//       if (generatedTimetable && generatedTimetable.length > 0) {
//         const updatedStatus = {
//           ...departmentStatus,
//           [activeDepartment]: {
//             ...departmentStatus[activeDepartment],
//             completed: true,
//             completedAt: new Date().toISOString(),
//             slotsGenerated: generatedTimetable.length
//           }
//         };
//         saveToStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, updatedStatus);
//         setDepartmentStatus(updatedStatus);
        
//         alert(`✅ ${activeDepartment} timetable generated successfully with ${generatedTimetable.length} slots!`);
//         setRefresh(r => r + 1);
//         window.dispatchEvent(new Event('storage'));
//       } else {
//         alert(`⚠️ No timetable slots were generated for ${activeDepartment}.\n\nApproved courses: ${approvedCoursesList.length}`);
//       }
//     } catch (error) {
//       console.error("Error generating timetable:", error);
//       alert("Error generating timetable: " + error.message);
//     } finally {
//       setGenerating(false);
//       setShowConfigModal(false);
//     }
//   };
  
//   const handleConflictsResolved = (resolved) => {
//     setShowConflictResolver(false);
//     if (resolved) {
//       setResolutionsApplied(true);
//       setTimeout(() => {
//         AppState.courseDetails = loadFromStorage(STORAGE_KEYS.COURSE_DETAILS, []);
//         AppState.faculty = loadFromStorage(STORAGE_KEYS.FACULTY, []);
//         AppState.subjects = loadFromStorage(STORAGE_KEYS.SUBJECTS, []);
        
//         loadValidation();
//         checkAssignmentStatus();
//         setRefresh(r => r + 1);
        
//         alert("✅ Conflicts resolved successfully! You can now generate the timetable.");
//       }, 500);
//     }
//   };
  
//   const handleAssignmentComplete = () => {
//     setShowAssignmentManager(false);
//     checkAssignmentStatus();
//     loadValidation();
//     setRefresh(r => r + 1);
//     window.dispatchEvent(new Event('storage'));
//     alert("✅ Subject assignments completed! You can now review and approve courses.");
//   };
  
//   const allCoursesApproved = totalCourses > 0 && pendingDeanApprovals.length === 0;
  
//   const isDeptActive = !!activeDepartment;
//   const isDeptCompleted = activeDepartment ? departmentStatus[activeDepartment]?.completed : false;
//   const hasSchedulingIssues = validationResult?.canSchedule === false;
//   const hasAssignmentIssues = !assignmentStatus.allAssigned;
  
//   const showGenerateButton = allCoursesApproved && isDeptActive && !isDeptCompleted && !hasAssignmentIssues;
//   const canGenerate = showGenerateButton && !hasSchedulingIssues;
  
//   console.log("Debug - Show Generate Button:", showGenerateButton);
//   console.log("Debug - Has Scheduling Issues:", hasSchedulingIssues);
//   console.log("Debug - Has Assignment Issues:", hasAssignmentIssues);
//   console.log("Debug - Conflicts Resolved:", conflictsResolved);
//   console.log("Debug - Can Generate:", canGenerate);
//   console.log("Debug - Resolutions Applied:", resolutionsApplied);
  
//   const getDepartmentColor = () => {
//     switch(activeDepartment) {
//       case "BTech": return C.accent.blue;
//       case "BSc": return C.accent.green;
//       case "BCA": return C.accent.gold;
//       default: return C.text.primary;
//     }
//   };
  
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <TimetableConfigModal 
//         isOpen={showConfigModal} 
//         onClose={() => setShowConfigModal(false)} 
//         onGenerate={handleGenerateTimetable}
//       />
      
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
//         <Title>Course Details Approval (Dean)</Title>
        
//         {activeDepartment && (
//           <div style={{ 
//             padding: "8px 16px", 
//             background: `${getDepartmentColor()}20`, 
//             borderRadius: 8,
//             border: `1px solid ${getDepartmentColor()}`
//           }}>
//             <span style={{ color: getDepartmentColor(), fontWeight: 600 }}>
//               Active Department: {activeDepartment}
//             </span>
//             {isDeptCompleted && (
//               <Badge variant="success" style={{ marginLeft: 8 }}>✓ Completed</Badge>
//             )}
//           </div>
//         )}
        
//         {!activeDepartment && (
//           <div style={{ padding: 8, background: C.accent.goldBg, borderRadius: 8 }}>
//             <span style={{ color: C.accent.gold }}>
//               ⚠️ No active department. Director needs to activate a department first.
//             </span>
//           </div>
//         )}
        
//         {/* Assignment Manager Button */}
//         {isDeptActive && !isDeptCompleted && (
//           <Button 
//             onClick={() => setShowAssignmentManager(true)} 
//             variant="secondary"
//             size="md"
//           >
//             📋 Manage Subject Assignments
//             {hasAssignmentIssues && (
//               <Badge variant="danger" style={{ marginLeft: 8 }}>
//                 {assignmentStatus.missedCount + assignmentStatus.duplicateCount} Issues
//               </Badge>
//             )}
//           </Button>
//         )}
        
//         {showGenerateButton && (
//           <Button 
//             onClick={() => setShowConfigModal(true)} 
//             variant="success"
//             disabled={generating || hasSchedulingIssues}
//             size="lg"
//           >
//             {generating ? "⏳ Generating..." : 
//              hasSchedulingIssues ? "⚠️ Resolve Conflicts First" : 
//              `⚙️ Generate ${activeDepartment} Timetable`}
//           </Button>
//         )}
        
//         {totalCourses > 0 && allCoursesApproved && isDeptActive && isDeptCompleted && (
//           <div style={{ padding: 8, background: C.accent.greenBg, borderRadius: 8 }}>
//             <span style={{ color: C.accent.green }}>
//               ✓ {activeDepartment} timetable has been generated and completed!
//             </span>
//           </div>
//         )}
//       </div>
      
//       {/* Assignment Issues Warning */}
//       {isDeptActive && !isDeptCompleted && hasAssignmentIssues && !showAssignmentManager && (
//         <Card style={{ background: C.accent.redBg }}>
//           <div style={{ textAlign: "center", padding: 16 }}>
//             <span style={{ fontSize: 32 }}>⚠️</span>
//             <h3 style={{ color: C.accent.red, marginTop: 8 }}>Subject Assignment Issues Detected!</h3>
//             <p style={{ color: C.text.secondary }}>
//               {assignmentStatus.missedCount > 0 && `• ${assignmentStatus.missedCount} subject(s) have no faculty assigned\n`}
//               {assignmentStatus.partialCount > 0 && `• ${assignmentStatus.partialCount} subject(s) have partial assignments (missing sections)\n`}
//               {assignmentStatus.duplicateCount > 0 && `• ${assignmentStatus.duplicateCount} subject(s) have multiple faculty assignments\n`}
//             </p>
//             <Button 
//               onClick={() => setShowAssignmentManager(true)} 
//               variant="warning"
//               size="lg"
//               style={{ marginTop: 12 }}
//             >
//               📋 Open Subject Assignment Manager
//             </Button>
//           </div>
//         </Card>
//       )}
      
//       {/* Subject Assignment Manager */}
//       {showAssignmentManager && activeDepartment && (
//         <SubjectAssignmentManager 
//           department={activeDepartment}
//           onComplete={handleAssignmentComplete}
//           onCancel={() => setShowAssignmentManager(false)}
//         />
//       )}
      
//       {allCoursesApproved && isDeptActive && !isDeptCompleted && hasSchedulingIssues && !showConflictResolver && !showAssignmentManager && (
//         <Card style={{ background: C.accent.redBg }}>
//           <div style={{ textAlign: "center", padding: 16 }}>
//             <span style={{ fontSize: 32 }}>⚠️</span>
//             <h3 style={{ color: C.accent.red, marginTop: 8 }}>Scheduling Conflicts Detected!</h3>
//             <p style={{ color: C.text.secondary }}>
//               Faculty overload or slot capacity issues found. Click the button below to auto-resolve conflicts.
//             </p>
//             <Button 
//               onClick={() => setShowConflictResolver(true)} 
//               variant="warning"
//               size="lg"
//               style={{ marginTop: 12 }}
//             >
//               🔧 Auto-Resolve Conflicts
//             </Button>
//           </div>
//         </Card>
//       )}
      
//       {allCoursesApproved && isDeptActive && !isDeptCompleted && !hasSchedulingIssues && resolutionsApplied && !showAssignmentManager && (
//         <Card style={{ background: C.accent.greenBg }}>
//           <div style={{ textAlign: "center", padding: 16 }}>
//             <span style={{ fontSize: 32 }}>✅</span>
//             <h3 style={{ color: C.accent.green, marginTop: 8 }}>Conflicts Resolved Successfully!</h3>
//             <p style={{ color: C.text.secondary }}>
//               All scheduling conflicts have been resolved. Click the "Generate Timetable" button above.
//             </p>
//           </div>
//         </Card>
//       )}
      
//       {showConflictResolver && activeDepartment && approvedCourses.length > 0 && (
//         <AutoConflictResolver 
//           approvedCourses={approvedCourses}
//           department={activeDepartment}
//           onResolved={handleConflictsResolved}
//           onCancel={() => setShowConflictResolver(false)}
//         />
//       )}
      
//       {approvedCourses.length > 0 && activeDepartment && !showConflictResolver && !showAssignmentManager && (
//         <CapacityDashboard approvedCourses={approvedCourses} department={activeDepartment} />
//       )}
      
//       {!activeDepartment && approvedCourses.length > 0 && (
//         <Card style={{ background: C.accent.goldBg }}>
//           <p style={{ color: C.accent.gold, margin: 0, textAlign: "center" }}>
//             ⚠️ Please ask the Director to activate a department to view capacity dashboard and generate timetable.
//           </p>
//         </Card>
//       )}
      
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Approval</p>
//           <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingDeanApprovals.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Approved Courses</p>
//           <p style={{ color: C.accent.green, fontSize: 32, fontWeight: 700 }}>{approvedCourses.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Total ({activeDepartment || 'All'})</p>
//           <p style={{ color: C.accent.blue, fontSize: 32, fontWeight: 700 }}>{totalCourses}</p>
//         </Card>
//       </div>
      
//       {pendingDeanApprovals.length > 0 ? (
//         pendingDeanApprovals.map(course => {
//           const faculty = AppState.faculty?.find(f => f.id === course.facultyId);
//           const subject = AppState.subjects?.find(s => s.id === course.subjectId);
          
//           return (
//             <Card key={course.id}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
//                 <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
//                   <div style={{
//                     width: 48,
//                     height: 48,
//                     borderRadius: "50%",
//                     background: faculty ? `${faculty.color}20` : C.accent.blueBg,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: faculty?.color || C.accent.blue,
//                     fontWeight: 700,
//                     fontSize: 18,
//                   }}>
//                     {faculty?.avatar || "?"}
//                   </div>
//                   <div>
//                     <p style={{ color: C.text.primary, fontWeight: 600, fontSize: 16 }}>{faculty?.name || "Unknown Faculty"}</p>
//                     <p style={{ color: C.accent.blue, fontSize: 14 }}>{course.subjectName} ({course.subjectCode})</p>
//                     <p style={{ color: C.text.tertiary, fontSize: 12 }}>{course.course} Semester {course.semester}</p>
//                     {course.autoAssigned && (
//                       <Badge variant="info" style={{ marginTop: 4 }}>Auto-Assigned</Badge>
//                     )}
//                   </div>
//                 </div>
//                 <Badge variant="warning">Pending Dean Approval</Badge>
//               </div>
              
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12, marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Credits</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.credits}</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Modules</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.modules}</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Theory Classes</span><br /><span style={{ color: C.accent.blue, fontSize: 18, fontWeight: 600 }}>{course.theoryClassesPerWeek}/week</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Lab Periods</span><br /><span style={{ color: C.accent.green, fontSize: 18, fontWeight: 600 }}>{course.labPeriodsPerWeek}/week</span></div>
//               </div>
              
//               <div style={{ marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//                 <p style={{ color: C.accent.gold, fontSize: 14 }}>Total Weekly Classes per Section: <strong>{course.totalWeeklyClasses}</strong></p>
//                 <p style={{ color: C.accent.gold, fontSize: 14 }}>Total Sessions (3 sections): <strong>{course.totalWeeklyClasses * 3}</strong></p>
//               </div>
              
//               {course.submittedAt && (
//                 <div style={{ marginBottom: 16, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
//                   <p style={{ color: C.text.secondary, fontSize: 12 }}>
//                     <strong>Submitted by Faculty:</strong> {new Date(course.submittedAt).toLocaleString()}
//                   </p>
//                 </div>
//               )}
              
//               <div style={{ display: "flex", gap: 12 }}>
//                 <Button onClick={() => handleApprove(course.id)} variant="success" fullWidth>
//                   ✓ Approve Course
//                 </Button>
//                 <Button onClick={() => handleReject(course.id)} variant="danger" fullWidth>
//                   ✗ Reject Course
//                 </Button>
//               </div>
//             </Card>
//           );
//         })
//       ) : (
//         <Card>
//           <div style={{ textAlign: "center", padding: "20px" }}>
//             <p style={{ color: C.accent.green, fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
//               ✓ No pending course approvals for {activeDepartment || 'active department'}!
//             </p>
//             {allCoursesApproved && totalCourses > 0 && (
//               <>
//                 {!activeDepartment && (
//                   <p style={{ color: C.accent.gold, marginBottom: 12 }}>
//                     ⚠️ No department is active. Director needs to activate a department first.
//                   </p>
//                 )}
//                 {activeDepartment && isDeptCompleted && (
//                   <p style={{ color: C.accent.green }}>
//                     ✅ {activeDepartment} timetable has been successfully generated!
//                   </p>
//                 )}
//                 {activeDepartment && !isDeptCompleted && !hasAssignmentIssues && !hasSchedulingIssues && (
//                   <p style={{ color: C.text.secondary }}>
//                     All courses for {activeDepartment} are approved and no conflicts detected. Click the "Generate Timetable" button above.
//                   </p>
//                 )}
//                 {activeDepartment && !isDeptCompleted && !hasAssignmentIssues && hasSchedulingIssues && (
//                   <p style={{ color: C.accent.red }}>
//                     ⚠️ Scheduling conflicts detected. Click "Auto-Resolve Conflicts" to fix them.
//                   </p>
//                 )}
//                 {activeDepartment && !isDeptCompleted && hasAssignmentIssues && (
//                   <p style={{ color: C.accent.red }}>
//                     ⚠️ Subject assignment issues detected. Click "Manage Subject Assignments" to fix them.
//                   </p>
//                 )}
//               </>
//             )}
//             {totalCourses === 0 && (
//               <p style={{ color: C.text.tertiary }}>
//                 No course details have been submitted yet for {activeDepartment || 'any department'}.
//                 {activeDepartment && !hasAssignmentIssues && (
//                   <span> Click "Manage Subject Assignments" to auto-assign subjects.</span>
//                 )}
//               </p>
//             )}
//             {totalCourses === 0 && activeDepartment && !hasAssignmentIssues && (
//               <Button 
//                 onClick={() => setShowAssignmentManager(true)} 
//                 variant="primary" 
//                 style={{ marginTop: 16 }}
//               >
//                 📋 Auto-Assign Subjects
//               </Button>
//             )}
//           </div>
//         </Card>
//       )}
//     </div>
//   );
// }

// // src/components/admin/DeanCourseDetailsReview.jsx
// import { useState, useEffect } from "react";
// import { Card, Title, Badge, Button } from "../common";
// import { TimetableConfigModal } from "../shared/TimetableConfigModal";
// import { CapacityDashboard } from "../shared/CapacityDashboard";
// import { AutoConflictResolver } from "./AutoConflictResolver";
// import { SubjectAssignmentManager } from "./SubjectAssignmentManager";
// import { FacultyPreferenceDashboard } from "./FacultyPreferenceDashboard";
// import { AppState } from "../../AppState";
// import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "../../utils/storage";
// import { findMissedSubjects, findDuplicateAssignments } from "../../utils/subjectAssignmentEngine";
// import { C } from "../../styles/theme";

// export function DeanCourseDetailsReview() {
//   const [refresh, setRefresh] = useState(0);
//   const [showConfigModal, setShowConfigModal] = useState(false);
//   const [showConflictResolver, setShowConflictResolver] = useState(false);
//   const [showAssignmentManager, setShowAssignmentManager] = useState(false);
//   const [showPreferenceDashboard, setShowPreferenceDashboard] = useState(false);
//   const [generating, setGenerating] = useState(false);
//   const [validationResult, setValidationResult] = useState(null);
//   const [activeDepartment, setActiveDepartment] = useState(null);
//   const [departmentStatus, setDepartmentStatus] = useState({});
//   const [conflictsResolved, setConflictsResolved] = useState(false);
//   const [resolutionsApplied, setResolutionsApplied] = useState(false);
//   const [assignmentStatus, setAssignmentStatus] = useState({ allAssigned: true, missedCount: 0, duplicateCount: 0 });
  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRefresh(r => r + 1);
//       loadDepartmentStatus();
//       loadValidation();
//       checkAssignmentStatus();
//     };
//     loadDepartmentStatus();
//     loadValidation();
//     checkAssignmentStatus();
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, [refresh]);
  
//   const loadDepartmentStatus = () => {
//     const active = loadFromStorage(STORAGE_KEYS.ACTIVE_DEPARTMENT, null);
//     const status = loadFromStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, {});
//     console.log("Loaded active department:", active);
//     setActiveDepartment(active);
//     setDepartmentStatus(status);
//   };
  
//   const checkAssignmentStatus = () => {
//     if (!activeDepartment) return;
    
//     const missed = findMissedSubjects(activeDepartment);
//     const duplicates = findDuplicateAssignments(activeDepartment);
    
//     const allAssigned = missed.allAssigned && duplicates.length === 0;
//     setAssignmentStatus({
//       allAssigned: allAssigned,
//       missedCount: missed.missedSubjects.length,
//       duplicateCount: duplicates.length,
//       partialCount: missed.partialSubjects.length,
//       missedSubjects: missed.missedSubjects,
//       duplicates: duplicates
//     });
    
//     return allAssigned;
//   };
  
//   const loadValidation = () => {
//     try {
//       let approvedCoursesList = AppState.courseDetails?.filter(c => c.deanStatus === "approved") || [];
      
//       if (activeDepartment) {
//         approvedCoursesList = approvedCoursesList.filter(c => c.course === activeDepartment);
//       }
      
//       console.log("Approved courses for validation:", approvedCoursesList.length);
      
//       if (approvedCoursesList.length > 0) {
//         if (typeof AppState.validateTimetable === 'function') {
//           const validation = AppState.validateTimetable(activeDepartment);
//           console.log("Validation result:", validation);
//           setValidationResult(validation);
          
//           if (validation.canSchedule) {
//             setConflictsResolved(true);
//           } else {
//             setConflictsResolved(false);
//           }
//         } else {
//           setValidationResult({
//             canSchedule: true,
//             errors: [],
//             warnings: [],
//             subjectStatus: [],
//             facultyWorkload: [],
//             totalRequiredSlots: 0,
//             totalAvailableSlots: 120,
//             utilization: 0
//           });
//           setConflictsResolved(true);
//         }
//       } else {
//         setValidationResult(null);
//         setConflictsResolved(false);
//       }
//     } catch (error) {
//       console.error("Error loading validation:", error);
//       setValidationResult({
//         canSchedule: true,
//         errors: [],
//         warnings: [],
//         subjectStatus: [],
//         facultyWorkload: [],
//         totalRequiredSlots: 0,
//         totalAvailableSlots: 120,
//         utilization: 0
//       });
//       setConflictsResolved(true);
//     }
//   };
  
//   const pendingDeanApprovals = AppState.courseDetails?.filter(c => 
//     c.deanStatus === "pending" && c.submittedAt && (!activeDepartment || c.course === activeDepartment)
//   ) || [];
  
//   const approvedCourses = AppState.courseDetails?.filter(c => 
//     c.deanStatus === "approved" && (!activeDepartment || c.course === activeDepartment)
//   ) || [];
  
//   const totalCourses = approvedCourses.length + pendingDeanApprovals.length;
  
//   const handleApprove = (courseId) => {
//     AppState.updateCourseDetailDeanStatus(courseId, "approved");
//     setRefresh(r => r + 1);
//     window.dispatchEvent(new Event('storage'));
//     alert("Course approved successfully!");
//   };
  
//   const handleReject = (courseId) => {
//     const reason = prompt("Enter rejection reason:");
//     if (reason) {
//       AppState.updateCourseDetailDeanStatus(courseId, "rejected", reason);
//       setRefresh(r => r + 1);
//       window.dispatchEvent(new Event('storage'));
//       alert("Course rejected!");
//     }
//   };
  
//   const handleGenerateTimetable = (config) => {
//     setGenerating(true);
//     try {
//       if (!activeDepartment) {
//         alert("No active department selected. Please ask the Director to activate a department first.");
//         setGenerating(false);
//         setShowConfigModal(false);
//         return;
//       }
      
//       // Check if all subjects are assigned before generating
//       const missed = findMissedSubjects(activeDepartment);
//       const duplicates = findDuplicateAssignments(activeDepartment);
      
//       if (!missed.allAssigned) {
//         alert(`⚠️ Cannot generate timetable!\n\nMissing Assignments:\n- ${missed.missedSubjects.length} subjects have no faculty\n- ${missed.partialSubjects.length} subjects have partial assignments\n\nPlease complete subject assignments first.`);
//         setGenerating(false);
//         setShowConfigModal(false);
//         setShowAssignmentManager(true);
//         return;
//       }
      
//       if (duplicates.length > 0) {
//         alert(`⚠️ Cannot generate timetable!\n\n${duplicates.length} subject(s) have multiple faculty assignments.\n\nPlease resolve duplicates first.`);
//         setGenerating(false);
//         setShowConfigModal(false);
//         setShowAssignmentManager(true);
//         return;
//       }
      
//       const isDeptCompleted = departmentStatus[activeDepartment]?.completed;
//       if (isDeptCompleted) {
//         if (!confirm(`Timetable for ${activeDepartment} is already completed. Generating again will overwrite it. Continue?`)) {
//           setGenerating(false);
//           setShowConfigModal(false);
//           return;
//         }
//       }
      
//       let canSchedule = true;
//       let validationErrors = [];
      
//       if (typeof AppState.validateTimetable === 'function') {
//         const validation = AppState.validateTimetable(activeDepartment);
//         canSchedule = validation.canSchedule;
//         validationErrors = validation.errors || [];
//       }
      
//       if (!canSchedule) {
//         const errorMessages = validationErrors.map(e => `- ${e.subject || e.faculty}: ${e.type}`).join("\n");
//         alert(`❌ Cannot generate timetable for ${activeDepartment}!\n\nIssues found:\n${errorMessages}\n\nPlease resolve these issues before generating.`);
//         setGenerating(false);
//         setShowConfigModal(false);
//         return;
//       }
      
//       const approvedCoursesList = AppState.courseDetails?.filter(c => 
//         c.deanStatus === "approved" && c.course === activeDepartment
//       ) || [];
      
//       if (approvedCoursesList.length === 0) {
//         alert(`No approved courses found for ${activeDepartment}.`);
//         setGenerating(false);
//         setShowConfigModal(false);
//         return;
//       }
      
//       const generatedTimetable = AppState.generateTimetable(activeDepartment);
      
//       if (generatedTimetable && generatedTimetable.length > 0) {
//         const updatedStatus = {
//           ...departmentStatus,
//           [activeDepartment]: {
//             ...departmentStatus[activeDepartment],
//             completed: true,
//             completedAt: new Date().toISOString(),
//             slotsGenerated: generatedTimetable.length
//           }
//         };
//         saveToStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, updatedStatus);
//         setDepartmentStatus(updatedStatus);
        
//         alert(`✅ ${activeDepartment} timetable generated successfully with ${generatedTimetable.length} slots!`);
//         setRefresh(r => r + 1);
//         window.dispatchEvent(new Event('storage'));
//       } else {
//         alert(`⚠️ No timetable slots were generated for ${activeDepartment}.\n\nApproved courses: ${approvedCoursesList.length}`);
//       }
//     } catch (error) {
//       console.error("Error generating timetable:", error);
//       alert("Error generating timetable: " + error.message);
//     } finally {
//       setGenerating(false);
//       setShowConfigModal(false);
//     }
//   };
  
//   const handleConflictsResolved = (resolved) => {
//     setShowConflictResolver(false);
//     if (resolved) {
//       setResolutionsApplied(true);
//       setTimeout(() => {
//         AppState.courseDetails = loadFromStorage(STORAGE_KEYS.COURSE_DETAILS, []);
//         AppState.faculty = loadFromStorage(STORAGE_KEYS.FACULTY, []);
//         AppState.subjects = loadFromStorage(STORAGE_KEYS.SUBJECTS, []);
        
//         loadValidation();
//         checkAssignmentStatus();
//         setRefresh(r => r + 1);
        
//         alert("✅ Conflicts resolved successfully! You can now generate the timetable.");
//       }, 500);
//     }
//   };
  
//   const handleAssignmentComplete = () => {
//     setShowAssignmentManager(false);
//     checkAssignmentStatus();
//     loadValidation();
//     setRefresh(r => r + 1);
//     window.dispatchEvent(new Event('storage'));
//     alert("✅ Subject assignments completed! You can now review and approve courses.");
//   };
  
//   const handleDashboardComplete = () => {
//     setShowPreferenceDashboard(false);
//     checkAssignmentStatus();
//     loadValidation();
//     setRefresh(r => r + 1);
//     window.dispatchEvent(new Event('storage'));
//   };
  
//   const allCoursesApproved = totalCourses > 0 && pendingDeanApprovals.length === 0;
  
//   const isDeptActive = !!activeDepartment;
//   const isDeptCompleted = activeDepartment ? departmentStatus[activeDepartment]?.completed : false;
//   const hasSchedulingIssues = validationResult?.canSchedule === false;
//   const hasAssignmentIssues = !assignmentStatus.allAssigned;
  
//   const showGenerateButton = allCoursesApproved && isDeptActive && !isDeptCompleted && !hasAssignmentIssues;
//   const canGenerate = showGenerateButton && !hasSchedulingIssues;
  
//   console.log("Debug - Show Generate Button:", showGenerateButton);
//   console.log("Debug - Has Scheduling Issues:", hasSchedulingIssues);
//   console.log("Debug - Has Assignment Issues:", hasAssignmentIssues);
//   console.log("Debug - Conflicts Resolved:", conflictsResolved);
//   console.log("Debug - Can Generate:", canGenerate);
//   console.log("Debug - Resolutions Applied:", resolutionsApplied);
  
//   const getDepartmentColor = () => {
//     switch(activeDepartment) {
//       case "BTech": return C.accent.blue;
//       case "BSc": return C.accent.green;
//       case "BCA": return C.accent.gold;
//       default: return C.text.primary;
//     }
//   };
  
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <TimetableConfigModal 
//         isOpen={showConfigModal} 
//         onClose={() => setShowConfigModal(false)} 
//         onGenerate={handleGenerateTimetable}
//       />
      
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
//         <Title>Course Details Approval (Dean)</Title>
        
//         {activeDepartment && (
//           <div style={{ 
//             padding: "8px 16px", 
//             background: `${getDepartmentColor()}20`, 
//             borderRadius: 8,
//             border: `1px solid ${getDepartmentColor()}`
//           }}>
//             <span style={{ color: getDepartmentColor(), fontWeight: 600 }}>
//               Active Department: {activeDepartment}
//             </span>
//             {isDeptCompleted && (
//               <Badge variant="success" style={{ marginLeft: 8 }}>✓ Completed</Badge>
//             )}
//           </div>
//         )}
        
//         {!activeDepartment && (
//           <div style={{ padding: 8, background: C.accent.goldBg, borderRadius: 8 }}>
//             <span style={{ color: C.accent.gold }}>
//               ⚠️ No active department. Director needs to activate a department first.
//             </span>
//           </div>
//         )}
        
//         {/* View Dashboard Button */}
//         {isDeptActive && !isDeptCompleted && (
//           <Button 
//             onClick={() => setShowPreferenceDashboard(!showPreferenceDashboard)} 
//             variant="secondary"
//             size="md"
//           >
//             {showPreferenceDashboard ? "📋 Hide Dashboard" : "📊 View Preference Dashboard"}
//             {hasAssignmentIssues && !showPreferenceDashboard && (
//               <Badge variant="danger" style={{ marginLeft: 8 }}>
//                 {assignmentStatus.missedCount + assignmentStatus.duplicateCount} Issues
//               </Badge>
//             )}
//           </Button>
//         )}
        
//         {/* Assignment Manager Button */}
//         {isDeptActive && !isDeptCompleted && !showPreferenceDashboard && (
//           <Button 
//             onClick={() => setShowAssignmentManager(true)} 
//             variant="secondary"
//             size="md"
//           >
//             📋 Manage Subject Assignments
//             {hasAssignmentIssues && (
//               <Badge variant="danger" style={{ marginLeft: 8 }}>
//                 {assignmentStatus.missedCount + assignmentStatus.duplicateCount} Issues
//               </Badge>
//             )}
//           </Button>
//         )}
        
//         {showGenerateButton && !showPreferenceDashboard && (
//           <Button 
//             onClick={() => setShowConfigModal(true)} 
//             variant="success"
//             disabled={generating || hasSchedulingIssues}
//             size="lg"
//           >
//             {generating ? "⏳ Generating..." : 
//              hasSchedulingIssues ? "⚠️ Resolve Conflicts First" : 
//              `⚙️ Generate ${activeDepartment} Timetable`}
//           </Button>
//         )}
        
//         {totalCourses > 0 && allCoursesApproved && isDeptActive && isDeptCompleted && (
//           <div style={{ padding: 8, background: C.accent.greenBg, borderRadius: 8 }}>
//             <span style={{ color: C.accent.green }}>
//               ✓ {activeDepartment} timetable has been generated and completed!
//             </span>
//           </div>
//         )}
//       </div>
      
//       {/* Faculty Preference Dashboard */}
//       {showPreferenceDashboard && activeDepartment && (
//         <FacultyPreferenceDashboard 
//           department={activeDepartment}
//           onAssignComplete={handleDashboardComplete}
//         />
//       )}
      
//       {/* Assignment Issues Warning */}
//       {isDeptActive && !isDeptCompleted && hasAssignmentIssues && !showAssignmentManager && !showPreferenceDashboard && (
//         <Card style={{ background: C.accent.redBg }}>
//           <div style={{ textAlign: "center", padding: 16 }}>
//             <span style={{ fontSize: 32 }}>⚠️</span>
//             <h3 style={{ color: C.accent.red, marginTop: 8 }}>Subject Assignment Issues Detected!</h3>
//             <p style={{ color: C.text.secondary }}>
//               {assignmentStatus.missedCount > 0 && `• ${assignmentStatus.missedCount} subject(s) have no faculty assigned\n`}
//               {assignmentStatus.partialCount > 0 && `• ${assignmentStatus.partialCount} subject(s) have partial assignments (missing sections)\n`}
//               {assignmentStatus.duplicateCount > 0 && `• ${assignmentStatus.duplicateCount} subject(s) have multiple faculty assignments\n`}
//             </p>
//             <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 12 }}>
//               <Button 
//                 onClick={() => setShowPreferenceDashboard(true)} 
//                 variant="info"
//                 size="lg"
//               >
//                 📊 View Dashboard First
//               </Button>
//               <Button 
//                 onClick={() => setShowAssignmentManager(true)} 
//                 variant="warning"
//                 size="lg"
//               >
//                 📋 Open Assignment Manager
//               </Button>
//             </div>
//           </div>
//         </Card>
//       )}
      
//       {/* Subject Assignment Manager */}
//       {showAssignmentManager && activeDepartment && (
//         <SubjectAssignmentManager 
//           department={activeDepartment}
//           onComplete={handleAssignmentComplete}
//           onCancel={() => setShowAssignmentManager(false)}
//         />
//       )}
      
//       {allCoursesApproved && isDeptActive && !isDeptCompleted && hasSchedulingIssues && !showConflictResolver && !showAssignmentManager && !showPreferenceDashboard && (
//         <Card style={{ background: C.accent.redBg }}>
//           <div style={{ textAlign: "center", padding: 16 }}>
//             <span style={{ fontSize: 32 }}>⚠️</span>
//             <h3 style={{ color: C.accent.red, marginTop: 8 }}>Scheduling Conflicts Detected!</h3>
//             <p style={{ color: C.text.secondary }}>
//               Faculty overload or slot capacity issues found. Click the button below to auto-resolve conflicts.
//             </p>
//             <Button 
//               onClick={() => setShowConflictResolver(true)} 
//               variant="warning"
//               size="lg"
//               style={{ marginTop: 12 }}
//             >
//               🔧 Auto-Resolve Conflicts
//             </Button>
//           </div>
//         </Card>
//       )}
      
//       {allCoursesApproved && isDeptActive && !isDeptCompleted && !hasSchedulingIssues && resolutionsApplied && !showAssignmentManager && !showPreferenceDashboard && (
//         <Card style={{ background: C.accent.greenBg }}>
//           <div style={{ textAlign: "center", padding: 16 }}>
//             <span style={{ fontSize: 32 }}>✅</span>
//             <h3 style={{ color: C.accent.green, marginTop: 8 }}>Conflicts Resolved Successfully!</h3>
//             <p style={{ color: C.text.secondary }}>
//               All scheduling conflicts have been resolved. Click the "Generate Timetable" button above.
//             </p>
//           </div>
//         </Card>
//       )}
      
//       {showConflictResolver && activeDepartment && approvedCourses.length > 0 && (
//         <AutoConflictResolver 
//           approvedCourses={approvedCourses}
//           department={activeDepartment}
//           onResolved={handleConflictsResolved}
//           onCancel={() => setShowConflictResolver(false)}
//         />
//       )}
      
//       {approvedCourses.length > 0 && activeDepartment && !showConflictResolver && !showAssignmentManager && !showPreferenceDashboard && (
//         <CapacityDashboard approvedCourses={approvedCourses} department={activeDepartment} />
//       )}
      
//       {!activeDepartment && approvedCourses.length > 0 && (
//         <Card style={{ background: C.accent.goldBg }}>
//           <p style={{ color: C.accent.gold, margin: 0, textAlign: "center" }}>
//             ⚠️ Please ask the Director to activate a department to view capacity dashboard and generate timetable.
//           </p>
//         </Card>
//       )}
      
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Approval</p>
//           <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingDeanApprovals.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Approved Courses</p>
//           <p style={{ color: C.accent.green, fontSize: 32, fontWeight: 700 }}>{approvedCourses.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Total ({activeDepartment || 'All'})</p>
//           <p style={{ color: C.accent.blue, fontSize: 32, fontWeight: 700 }}>{totalCourses}</p>
//         </Card>
//       </div>
      
//       {pendingDeanApprovals.length > 0 ? (
//         pendingDeanApprovals.map(course => {
//           const faculty = AppState.faculty?.find(f => f.id === course.facultyId);
//           const subject = AppState.subjects?.find(s => s.id === course.subjectId);
          
//           return (
//             <Card key={course.id}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
//                 <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
//                   <div style={{
//                     width: 48,
//                     height: 48,
//                     borderRadius: "50%",
//                     background: faculty ? `${faculty.color}20` : C.accent.blueBg,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: faculty?.color || C.accent.blue,
//                     fontWeight: 700,
//                     fontSize: 18,
//                   }}>
//                     {faculty?.avatar || "?"}
//                   </div>
//                   <div>
//                     <p style={{ color: C.text.primary, fontWeight: 600, fontSize: 16 }}>{faculty?.name || "Unknown Faculty"}</p>
//                     <p style={{ color: C.accent.blue, fontSize: 14 }}>{course.subjectName} ({course.subjectCode})</p>
//                     <p style={{ color: C.text.tertiary, fontSize: 12 }}>{course.course} Semester {course.semester}</p>
//                     {course.autoAssigned && (
//                       <Badge variant="info" style={{ marginTop: 4 }}>Auto-Assigned</Badge>
//                     )}
//                   </div>
//                 </div>
//                 <Badge variant="warning">Pending Dean Approval</Badge>
//               </div>
              
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12, marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Credits</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.credits}</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Modules</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.modules}</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Theory Classes</span><br /><span style={{ color: C.accent.blue, fontSize: 18, fontWeight: 600 }}>{course.theoryClassesPerWeek}/week</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Lab Periods</span><br /><span style={{ color: C.accent.green, fontSize: 18, fontWeight: 600 }}>{course.labPeriodsPerWeek}/week</span></div>
//               </div>
              
//               <div style={{ marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//                 <p style={{ color: C.accent.gold, fontSize: 14 }}>Total Weekly Classes per Section: <strong>{course.totalWeeklyClasses}</strong></p>
//                 <p style={{ color: C.accent.gold, fontSize: 14 }}>Total Sessions (3 sections): <strong>{course.totalWeeklyClasses * 3}</strong></p>
//               </div>
              
//               {course.submittedAt && (
//                 <div style={{ marginBottom: 16, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
//                   <p style={{ color: C.text.secondary, fontSize: 12 }}>
//                     <strong>Submitted by Faculty:</strong> {new Date(course.submittedAt).toLocaleString()}
//                   </p>
//                 </div>
//               )}
              
//               <div style={{ display: "flex", gap: 12 }}>
//                 <Button onClick={() => handleApprove(course.id)} variant="success" fullWidth>
//                   ✓ Approve Course
//                 </Button>
//                 <Button onClick={() => handleReject(course.id)} variant="danger" fullWidth>
//                   ✗ Reject Course
//                 </Button>
//               </div>
//             </Card>
//           );
//         })
//       ) : (
//         <Card>
//           <div style={{ textAlign: "center", padding: "20px" }}>
//             <p style={{ color: C.accent.green, fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
//               ✓ No pending course approvals for {activeDepartment || 'active department'}!
//             </p>
//             {allCoursesApproved && totalCourses > 0 && (
//               <>
//                 {!activeDepartment && (
//                   <p style={{ color: C.accent.gold, marginBottom: 12 }}>
//                     ⚠️ No department is active. Director needs to activate a department first.
//                   </p>
//                 )}
//                 {activeDepartment && isDeptCompleted && (
//                   <p style={{ color: C.accent.green }}>
//                     ✅ {activeDepartment} timetable has been successfully generated!
//                   </p>
//                 )}
//                 {activeDepartment && !isDeptCompleted && !hasAssignmentIssues && !hasSchedulingIssues && (
//                   <p style={{ color: C.text.secondary }}>
//                     All courses for {activeDepartment} are approved and no conflicts detected. Click the "Generate Timetable" button above.
//                   </p>
//                 )}
//                 {activeDepartment && !isDeptCompleted && !hasAssignmentIssues && hasSchedulingIssues && (
//                   <p style={{ color: C.accent.red }}>
//                     ⚠️ Scheduling conflicts detected. Click "Auto-Resolve Conflicts" to fix them.
//                   </p>
//                 )}
//                 {activeDepartment && !isDeptCompleted && hasAssignmentIssues && (
//                   <p style={{ color: C.accent.red }}>
//                     ⚠️ Subject assignment issues detected. Click "View Preference Dashboard" or "Manage Subject Assignments" to fix them.
//                   </p>
//                 )}
//               </>
//             )}
//             {totalCourses === 0 && (
//               <p style={{ color: C.text.tertiary }}>
//                 No course details have been submitted yet for {activeDepartment || 'any department'}.
//                 {activeDepartment && !hasAssignmentIssues && (
//                   <span> Click "View Preference Dashboard" to see faculty preferences and auto-assign subjects.</span>
//                 )}
//               </p>
//             )}
//             {totalCourses === 0 && activeDepartment && !hasAssignmentIssues && !showPreferenceDashboard && (
//               <Button 
//                 onClick={() => setShowPreferenceDashboard(true)} 
//                 variant="primary" 
//                 style={{ marginTop: 16 }}
//               >
//                 📊 View Faculty Preferences & Assign Subjects
//               </Button>
//             )}
//           </div>
//         </Card>
//       )}
//     </div>
//   );
// }

// // src/components/admin/DeanCourseDetailsReview.jsx
// import { useState, useEffect } from "react";
// import { Card, Title, Badge, Button } from "../common";
// import { TimetableConfigModal } from "../shared/TimetableConfigModal";
// import { CapacityDashboard } from "../shared/CapacityDashboard";
// import { AutoConflictResolver } from "./AutoConflictResolver";
// import { SubjectAssignmentManager } from "./SubjectAssignmentManager";
// import { FacultyPreferenceDashboard } from "./FacultyPreferenceDashboard";
// import { OneClickTimetableGenerator } from "./OneClickTimetableGenerator";
// import { AppState } from "../../AppState";
// import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "../../utils/storage";
// import { findMissedSubjects, findDuplicateAssignments } from "../../utils/subjectAssignmentEngine";
// import { C } from "../../styles/theme";

// export function DeanCourseDetailsReview() {
//   const [refresh, setRefresh] = useState(0);
//   const [showConfigModal, setShowConfigModal] = useState(false);
//   const [showConflictResolver, setShowConflictResolver] = useState(false);
//   const [showAssignmentManager, setShowAssignmentManager] = useState(false);
//   const [showPreferenceDashboard, setShowPreferenceDashboard] = useState(false);
//   const [showOneClickGenerator, setShowOneClickGenerator] = useState(false);
//   const [generating, setGenerating] = useState(false);
//   const [validationResult, setValidationResult] = useState(null);
//   const [activeDepartment, setActiveDepartment] = useState(null);
//   const [departmentStatus, setDepartmentStatus] = useState({});
//   const [conflictsResolved, setConflictsResolved] = useState(false);
//   const [resolutionsApplied, setResolutionsApplied] = useState(false);
//   const [assignmentStatus, setAssignmentStatus] = useState({ allAssigned: true, missedCount: 0, duplicateCount: 0 });
  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRefresh(r => r + 1);
//       loadDepartmentStatus();
//       loadValidation();
//       checkAssignmentStatus();
//     };
//     loadDepartmentStatus();
//     loadValidation();
//     checkAssignmentStatus();
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, [refresh]);
  
//   const loadDepartmentStatus = () => {
//     const active = loadFromStorage(STORAGE_KEYS.ACTIVE_DEPARTMENT, null);
//     const status = loadFromStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, {});
//     console.log("Loaded active department:", active);
//     setActiveDepartment(active);
//     setDepartmentStatus(status);
//   };
  
//   const checkAssignmentStatus = () => {
//     if (!activeDepartment) return;
    
//     const missed = findMissedSubjects(activeDepartment);
//     const duplicates = findDuplicateAssignments(activeDepartment);
    
//     const allAssigned = missed.allAssigned && duplicates.length === 0;
//     setAssignmentStatus({
//       allAssigned: allAssigned,
//       missedCount: missed.missedSubjects.length,
//       duplicateCount: duplicates.length,
//       partialCount: missed.partialSubjects.length,
//       missedSubjects: missed.missedSubjects,
//       duplicates: duplicates
//     });
    
//     return allAssigned;
//   };
  
//   const loadValidation = () => {
//     try {
//       let approvedCoursesList = AppState.courseDetails?.filter(c => c.deanStatus === "approved") || [];
      
//       if (activeDepartment) {
//         approvedCoursesList = approvedCoursesList.filter(c => c.course === activeDepartment);
//       }
      
//       console.log("Approved courses for validation:", approvedCoursesList.length);
      
//       if (approvedCoursesList.length > 0) {
//         if (typeof AppState.validateTimetable === 'function') {
//           const validation = AppState.validateTimetable(activeDepartment);
//           console.log("Validation result:", validation);
//           setValidationResult(validation);
          
//           if (validation.canSchedule) {
//             setConflictsResolved(true);
//           } else {
//             setConflictsResolved(false);
//           }
//         } else {
//           setValidationResult({
//             canSchedule: true,
//             errors: [],
//             warnings: [],
//             subjectStatus: [],
//             facultyWorkload: [],
//             totalRequiredSlots: 0,
//             totalAvailableSlots: 120,
//             utilization: 0
//           });
//           setConflictsResolved(true);
//         }
//       } else {
//         setValidationResult(null);
//         setConflictsResolved(false);
//       }
//     } catch (error) {
//       console.error("Error loading validation:", error);
//       setValidationResult({
//         canSchedule: true,
//         errors: [],
//         warnings: [],
//         subjectStatus: [],
//         facultyWorkload: [],
//         totalRequiredSlots: 0,
//         totalAvailableSlots: 120,
//         utilization: 0
//       });
//       setConflictsResolved(true);
//     }
//   };
  
//   const pendingDeanApprovals = AppState.courseDetails?.filter(c => 
//     c.deanStatus === "pending" && c.submittedAt && (!activeDepartment || c.course === activeDepartment)
//   ) || [];
  
//   const approvedCourses = AppState.courseDetails?.filter(c => 
//     c.deanStatus === "approved" && (!activeDepartment || c.course === activeDepartment)
//   ) || [];
  
//   const totalCourses = approvedCourses.length + pendingDeanApprovals.length;
  
//   const handleApprove = (courseId) => {
//     AppState.updateCourseDetailDeanStatus(courseId, "approved");
//     setRefresh(r => r + 1);
//     window.dispatchEvent(new Event('storage'));
//     alert("Course approved successfully!");
//   };
  
//   const handleReject = (courseId) => {
//     const reason = prompt("Enter rejection reason:");
//     if (reason) {
//       AppState.updateCourseDetailDeanStatus(courseId, "rejected", reason);
//       setRefresh(r => r + 1);
//       window.dispatchEvent(new Event('storage'));
//       alert("Course rejected!");
//     }
//   };
  
//   const handleGenerateTimetable = (config) => {
//     setGenerating(true);
//     try {
//       if (!activeDepartment) {
//         alert("No active department selected. Please ask the Director to activate a department first.");
//         setGenerating(false);
//         setShowConfigModal(false);
//         return;
//       }
      
//       // Check if all subjects are assigned before generating
//       const missed = findMissedSubjects(activeDepartment);
//       const duplicates = findDuplicateAssignments(activeDepartment);
      
//       if (!missed.allAssigned) {
//         alert(`⚠️ Cannot generate timetable!\n\nMissing Assignments:\n- ${missed.missedSubjects.length} subjects have no faculty\n- ${missed.partialSubjects.length} subjects have partial assignments\n\nPlease complete subject assignments first.`);
//         setGenerating(false);
//         setShowConfigModal(false);
//         setShowAssignmentManager(true);
//         return;
//       }
      
//       if (duplicates.length > 0) {
//         alert(`⚠️ Cannot generate timetable!\n\n${duplicates.length} subject(s) have multiple faculty assignments.\n\nPlease resolve duplicates first.`);
//         setGenerating(false);
//         setShowConfigModal(false);
//         setShowAssignmentManager(true);
//         return;
//       }
      
//       const isDeptCompleted = departmentStatus[activeDepartment]?.completed;
//       if (isDeptCompleted) {
//         if (!confirm(`Timetable for ${activeDepartment} is already completed. Generating again will overwrite it. Continue?`)) {
//           setGenerating(false);
//           setShowConfigModal(false);
//           return;
//         }
//       }
      
//       let canSchedule = true;
//       let validationErrors = [];
      
//       if (typeof AppState.validateTimetable === 'function') {
//         const validation = AppState.validateTimetable(activeDepartment);
//         canSchedule = validation.canSchedule;
//         validationErrors = validation.errors || [];
//       }
      
//       if (!canSchedule) {
//         const errorMessages = validationErrors.map(e => `- ${e.subject || e.faculty}: ${e.type}`).join("\n");
//         alert(`❌ Cannot generate timetable for ${activeDepartment}!\n\nIssues found:\n${errorMessages}\n\nPlease resolve these issues before generating.`);
//         setGenerating(false);
//         setShowConfigModal(false);
//         return;
//       }
      
//       const approvedCoursesList = AppState.courseDetails?.filter(c => 
//         c.deanStatus === "approved" && c.course === activeDepartment
//       ) || [];
      
//       if (approvedCoursesList.length === 0) {
//         alert(`No approved courses found for ${activeDepartment}.`);
//         setGenerating(false);
//         setShowConfigModal(false);
//         return;
//       }
      
//       const generatedTimetable = AppState.generateTimetable(activeDepartment);
      
//       if (generatedTimetable && generatedTimetable.length > 0) {
//         const updatedStatus = {
//           ...departmentStatus,
//           [activeDepartment]: {
//             ...departmentStatus[activeDepartment],
//             completed: true,
//             completedAt: new Date().toISOString(),
//             slotsGenerated: generatedTimetable.length
//           }
//         };
//         saveToStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, updatedStatus);
//         setDepartmentStatus(updatedStatus);
        
//         alert(`✅ ${activeDepartment} timetable generated successfully with ${generatedTimetable.length} slots!`);
//         setRefresh(r => r + 1);
//         window.dispatchEvent(new Event('storage'));
//       } else {
//         alert(`⚠️ No timetable slots were generated for ${activeDepartment}.\n\nApproved courses: ${approvedCoursesList.length}`);
//       }
//     } catch (error) {
//       console.error("Error generating timetable:", error);
//       alert("Error generating timetable: " + error.message);
//     } finally {
//       setGenerating(false);
//       setShowConfigModal(false);
//     }
//   };
  
//   const handleConflictsResolved = (resolved) => {
//     setShowConflictResolver(false);
//     if (resolved) {
//       setResolutionsApplied(true);
//       setTimeout(() => {
//         AppState.courseDetails = loadFromStorage(STORAGE_KEYS.COURSE_DETAILS, []);
//         AppState.faculty = loadFromStorage(STORAGE_KEYS.FACULTY, []);
//         AppState.subjects = loadFromStorage(STORAGE_KEYS.SUBJECTS, []);
        
//         loadValidation();
//         checkAssignmentStatus();
//         setRefresh(r => r + 1);
        
//         alert("✅ Conflicts resolved successfully! You can now generate the timetable.");
//       }, 500);
//     }
//   };
  
//   const handleAssignmentComplete = () => {
//     setShowAssignmentManager(false);
//     checkAssignmentStatus();
//     loadValidation();
//     setRefresh(r => r + 1);
//     window.dispatchEvent(new Event('storage'));
//     alert("✅ Subject assignments completed! You can now review and approve courses.");
//   };
  
//   const handleDashboardComplete = () => {
//     setShowPreferenceDashboard(false);
//     checkAssignmentStatus();
//     loadValidation();
//     setRefresh(r => r + 1);
//     window.dispatchEvent(new Event('storage'));
//   };
  
//   const handleOneClickComplete = () => {
//     setShowOneClickGenerator(false);
//     // Refresh everything
//     setTimeout(() => {
//       loadDepartmentStatus();
//       loadValidation();
//       checkAssignmentStatus();
//       setRefresh(r => r + 1);
//       window.dispatchEvent(new Event('storage'));
//       // Optionally reload to show timetable
//       window.location.reload();
//     }, 1000);
//   };
  
//   const allCoursesApproved = totalCourses > 0 && pendingDeanApprovals.length === 0;
  
//   const isDeptActive = !!activeDepartment;
//   const isDeptCompleted = activeDepartment ? departmentStatus[activeDepartment]?.completed : false;
//   const hasSchedulingIssues = validationResult?.canSchedule === false;
//   const hasAssignmentIssues = !assignmentStatus.allAssigned;
  
//   const showGenerateButton = allCoursesApproved && isDeptActive && !isDeptCompleted && !hasAssignmentIssues;
//   const canGenerate = showGenerateButton && !hasSchedulingIssues;
  
//   console.log("Debug - Show Generate Button:", showGenerateButton);
//   console.log("Debug - Has Scheduling Issues:", hasSchedulingIssues);
//   console.log("Debug - Has Assignment Issues:", hasAssignmentIssues);
//   console.log("Debug - Conflicts Resolved:", conflictsResolved);
//   console.log("Debug - Can Generate:", canGenerate);
//   console.log("Debug - Resolutions Applied:", resolutionsApplied);
  
//   const getDepartmentColor = () => {
//     switch(activeDepartment) {
//       case "BTech": return C.accent.blue;
//       case "BSc": return C.accent.green;
//       case "BCA": return C.accent.gold;
//       default: return C.text.primary;
//     }
//   };
  
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <TimetableConfigModal 
//         isOpen={showConfigModal} 
//         onClose={() => setShowConfigModal(false)} 
//         onGenerate={handleGenerateTimetable}
//       />
      
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
//         <Title>Course Details Approval (Dean)</Title>
        
//         {activeDepartment && (
//           <div style={{ 
//             padding: "8px 16px", 
//             background: `${getDepartmentColor()}20`, 
//             borderRadius: 8,
//             border: `1px solid ${getDepartmentColor()}`
//           }}>
//             <span style={{ color: getDepartmentColor(), fontWeight: 600 }}>
//               Active Department: {activeDepartment}
//             </span>
//             {isDeptCompleted && (
//               <Badge variant="success" style={{ marginLeft: 8 }}>✓ Completed</Badge>
//             )}
//           </div>
//         )}
        
//         {!activeDepartment && (
//           <div style={{ padding: 8, background: C.accent.goldBg, borderRadius: 8 }}>
//             <span style={{ color: C.accent.gold }}>
//               ⚠️ No active department. Director needs to activate a department first.
//             </span>
//           </div>
//         )}
        
//         {/* ONE-CLICK GENERATOR BUTTON - Primary Action */}
//         {isDeptActive && !isDeptCompleted && !showOneClickGenerator && (
//           <Button 
//             onClick={() => setShowOneClickGenerator(true)} 
//             variant="primary"
//             size="lg"
//             style={{ 
//               background: C.gold.gradient,
//               boxShadow: C.shadow.glow,
//               fontWeight: "bold"
//             }}
//           >
//             🚀 ONE-CLICK GENERATE TIMETABLE
//           </Button>
//         )}
        
//         {/* View Dashboard Button */}
//         {isDeptActive && !isDeptCompleted && !showOneClickGenerator && (
//           <Button 
//             onClick={() => setShowPreferenceDashboard(!showPreferenceDashboard)} 
//             variant="secondary"
//             size="md"
//           >
//             {showPreferenceDashboard ? "📋 Hide Dashboard" : "📊 View Preference Dashboard"}
//             {hasAssignmentIssues && !showPreferenceDashboard && (
//               <Badge variant="danger" style={{ marginLeft: 8 }}>
//                 {assignmentStatus.missedCount + assignmentStatus.duplicateCount} Issues
//               </Badge>
//             )}
//           </Button>
//         )}
        
//         {/* Assignment Manager Button */}
//         {isDeptActive && !isDeptCompleted && !showPreferenceDashboard && !showOneClickGenerator && (
//           <Button 
//             onClick={() => setShowAssignmentManager(true)} 
//             variant="secondary"
//             size="md"
//           >
//             📋 Manage Subject Assignments
//             {hasAssignmentIssues && (
//               <Badge variant="danger" style={{ marginLeft: 8 }}>
//                 {assignmentStatus.missedCount + assignmentStatus.duplicateCount} Issues
//               </Badge>
//             )}
//           </Button>
//         )}
        
//         {showGenerateButton && !showPreferenceDashboard && !showOneClickGenerator && (
//           <Button 
//             onClick={() => setShowConfigModal(true)} 
//             variant="success"
//             disabled={generating || hasSchedulingIssues}
//             size="lg"
//           >
//             {generating ? "⏳ Generating..." : 
//              hasSchedulingIssues ? "⚠️ Resolve Conflicts First" : 
//              `⚙️ Generate ${activeDepartment} Timetable`}
//           </Button>
//         )}
        
//         {totalCourses > 0 && allCoursesApproved && isDeptActive && isDeptCompleted && (
//           <div style={{ padding: 8, background: C.accent.greenBg, borderRadius: 8 }}>
//             <span style={{ color: C.accent.green }}>
//               ✓ {activeDepartment} timetable has been generated and completed!
//             </span>
//           </div>
//         )}
//       </div>
      
//       {/* ONE-CLICK GENERATOR */}
//       {showOneClickGenerator && activeDepartment && (
//         <OneClickTimetableGenerator 
//           department={activeDepartment}
//           onComplete={handleOneClickComplete}
//           onCancel={() => setShowOneClickGenerator(false)}
//         />
//       )}
      
//       {/* Faculty Preference Dashboard */}
//       {showPreferenceDashboard && activeDepartment && !showOneClickGenerator && (
//         <FacultyPreferenceDashboard 
//           department={activeDepartment}
//           onAssignComplete={handleDashboardComplete}
//         />
//       )}
      
//       {/* Assignment Issues Warning */}
//       {isDeptActive && !isDeptCompleted && hasAssignmentIssues && !showAssignmentManager && !showPreferenceDashboard && !showOneClickGenerator && (
//         <Card style={{ background: C.accent.redBg }}>
//           <div style={{ textAlign: "center", padding: 16 }}>
//             <span style={{ fontSize: 32 }}>⚠️</span>
//             <h3 style={{ color: C.accent.red, marginTop: 8 }}>Subject Assignment Issues Detected!</h3>
//             <p style={{ color: C.text.secondary }}>
//               {assignmentStatus.missedCount > 0 && `• ${assignmentStatus.missedCount} subject(s) have no faculty assigned\n`}
//               {assignmentStatus.partialCount > 0 && `• ${assignmentStatus.partialCount} subject(s) have partial assignments (missing sections)\n`}
//               {assignmentStatus.duplicateCount > 0 && `• ${assignmentStatus.duplicateCount} subject(s) have multiple faculty assignments\n`}
//             </p>
//             <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 12 }}>
//               <Button 
//                 onClick={() => setShowOneClickGenerator(true)} 
//                 variant="primary"
//                 size="lg"
//                 style={{ background: C.gold.gradient }}
//               >
//                 🚀 Fix Automatically with One-Click
//               </Button>
//               <Button 
//                 onClick={() => setShowPreferenceDashboard(true)} 
//                 variant="info"
//                 size="lg"
//               >
//                 📊 View Dashboard
//               </Button>
//               <Button 
//                 onClick={() => setShowAssignmentManager(true)} 
//                 variant="warning"
//                 size="lg"
//               >
//                 📋 Manual Assignment
//               </Button>
//             </div>
//           </div>
//         </Card>
//       )}
      
//       {/* Subject Assignment Manager */}
//       {showAssignmentManager && activeDepartment && !showOneClickGenerator && (
//         <SubjectAssignmentManager 
//           department={activeDepartment}
//           onComplete={handleAssignmentComplete}
//           onCancel={() => setShowAssignmentManager(false)}
//         />
//       )}
      
//       {allCoursesApproved && isDeptActive && !isDeptCompleted && hasSchedulingIssues && !showConflictResolver && !showAssignmentManager && !showPreferenceDashboard && !showOneClickGenerator && (
//         <Card style={{ background: C.accent.redBg }}>
//           <div style={{ textAlign: "center", padding: 16 }}>
//             <span style={{ fontSize: 32 }}>⚠️</span>
//             <h3 style={{ color: C.accent.red, marginTop: 8 }}>Scheduling Conflicts Detected!</h3>
//             <p style={{ color: C.text.secondary }}>
//               Faculty overload or slot capacity issues found. Click the button below to auto-resolve conflicts.
//             </p>
//             <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 12 }}>
//               <Button 
//                 onClick={() => setShowOneClickGenerator(true)} 
//                 variant="primary"
//                 size="lg"
//                 style={{ background: C.gold.gradient }}
//               >
//                 🚀 Fix Automatically with One-Click
//               </Button>
//               <Button 
//                 onClick={() => setShowConflictResolver(true)} 
//                 variant="warning"
//                 size="lg"
//               >
//                 🔧 Auto-Resolve Conflicts
//               </Button>
//             </div>
//           </div>
//         </Card>
//       )}
      
//       {allCoursesApproved && isDeptActive && !isDeptCompleted && !hasSchedulingIssues && resolutionsApplied && !showAssignmentManager && !showPreferenceDashboard && !showOneClickGenerator && (
//         <Card style={{ background: C.accent.greenBg }}>
//           <div style={{ textAlign: "center", padding: 16 }}>
//             <span style={{ fontSize: 32 }}>✅</span>
//             <h3 style={{ color: C.accent.green, marginTop: 8 }}>Conflicts Resolved Successfully!</h3>
//             <p style={{ color: C.text.secondary }}>
//               All scheduling conflicts have been resolved. Click the "Generate Timetable" button above.
//             </p>
//           </div>
//         </Card>
//       )}
      
//       {showConflictResolver && activeDepartment && approvedCourses.length > 0 && !showOneClickGenerator && (
//         <AutoConflictResolver 
//           approvedCourses={approvedCourses}
//           department={activeDepartment}
//           onResolved={handleConflictsResolved}
//           onCancel={() => setShowConflictResolver(false)}
//         />
//       )}
      
//       {approvedCourses.length > 0 && activeDepartment && !showConflictResolver && !showAssignmentManager && !showPreferenceDashboard && !showOneClickGenerator && (
//         <CapacityDashboard approvedCourses={approvedCourses} department={activeDepartment} />
//       )}
      
//       {!activeDepartment && approvedCourses.length > 0 && (
//         <Card style={{ background: C.accent.goldBg }}>
//           <p style={{ color: C.accent.gold, margin: 0, textAlign: "center" }}>
//             ⚠️ Please ask the Director to activate a department to view capacity dashboard and generate timetable.
//           </p>
//         </Card>
//       )}
      
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Approval</p>
//           <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingDeanApprovals.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Approved Courses</p>
//           <p style={{ color: C.accent.green, fontSize: 32, fontWeight: 700 }}>{approvedCourses.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Total ({activeDepartment || 'All'})</p>
//           <p style={{ color: C.accent.blue, fontSize: 32, fontWeight: 700 }}>{totalCourses}</p>
//         </Card>
//       </div>
      
//       {pendingDeanApprovals.length > 0 ? (
//         pendingDeanApprovals.map(course => {
//           const faculty = AppState.faculty?.find(f => f.id === course.facultyId);
//           const subject = AppState.subjects?.find(s => s.id === course.subjectId);
          
//           return (
//             <Card key={course.id}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
//                 <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
//                   <div style={{
//                     width: 48,
//                     height: 48,
//                     borderRadius: "50%",
//                     background: faculty ? `${faculty.color}20` : C.accent.blueBg,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: faculty?.color || C.accent.blue,
//                     fontWeight: 700,
//                     fontSize: 18,
//                   }}>
//                     {faculty?.avatar || "?"}
//                   </div>
//                   <div>
//                     <p style={{ color: C.text.primary, fontWeight: 600, fontSize: 16 }}>{faculty?.name || "Unknown Faculty"}</p>
//                     <p style={{ color: C.accent.blue, fontSize: 14 }}>{course.subjectName} ({course.subjectCode})</p>
//                     <p style={{ color: C.text.tertiary, fontSize: 12 }}>{course.course} Semester {course.semester}</p>
//                     {course.autoAssigned && (
//                       <Badge variant="info" style={{ marginTop: 4 }}>Auto-Assigned</Badge>
//                     )}
//                   </div>
//                 </div>
//                 <Badge variant="warning">Pending Dean Approval</Badge>
//               </div>
              
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12, marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Credits</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.credits}</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Modules</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.modules}</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Theory Classes</span><br /><span style={{ color: C.accent.blue, fontSize: 18, fontWeight: 600 }}>{course.theoryClassesPerWeek}/week</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Lab Periods</span><br /><span style={{ color: C.accent.green, fontSize: 18, fontWeight: 600 }}>{course.labPeriodsPerWeek}/week</span></div>
//               </div>
              
//               <div style={{ marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//                 <p style={{ color: C.accent.gold, fontSize: 14 }}>Total Weekly Classes per Section: <strong>{course.totalWeeklyClasses}</strong></p>
//                 <p style={{ color: C.accent.gold, fontSize: 14 }}>Total Sessions (3 sections): <strong>{course.totalWeeklyClasses * 3}</strong></p>
//               </div>
              
//               {course.submittedAt && (
//                 <div style={{ marginBottom: 16, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
//                   <p style={{ color: C.text.secondary, fontSize: 12 }}>
//                     <strong>Submitted by Faculty:</strong> {new Date(course.submittedAt).toLocaleString()}
//                   </p>
//                 </div>
//               )}
              
//               <div style={{ display: "flex", gap: 12 }}>
//                 <Button onClick={() => handleApprove(course.id)} variant="success" fullWidth>
//                   ✓ Approve Course
//                 </Button>
//                 <Button onClick={() => handleReject(course.id)} variant="danger" fullWidth>
//                   ✗ Reject Course
//                 </Button>
//               </div>
//             </Card>
//           );
//         })
//       ) : (
//         <Card>
//           <div style={{ textAlign: "center", padding: "20px" }}>
//             <p style={{ color: C.accent.green, fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
//               ✓ No pending course approvals for {activeDepartment || 'active department'}!
//             </p>
//             {allCoursesApproved && totalCourses > 0 && (
//               <>
//                 {!activeDepartment && (
//                   <p style={{ color: C.accent.gold, marginBottom: 12 }}>
//                     ⚠️ No department is active. Director needs to activate a department first.
//                   </p>
//                 )}
//                 {activeDepartment && isDeptCompleted && (
//                   <p style={{ color: C.accent.green }}>
//                     ✅ {activeDepartment} timetable has been successfully generated!
//                   </p>
//                 )}
//                 {activeDepartment && !isDeptCompleted && !hasAssignmentIssues && !hasSchedulingIssues && (
//                   <p style={{ color: C.text.secondary }}>
//                     All courses for {activeDepartment} are approved and no conflicts detected. Click the "Generate Timetable" button above.
//                   </p>
//                 )}
//                 {activeDepartment && !isDeptCompleted && !hasAssignmentIssues && hasSchedulingIssues && (
//                   <p style={{ color: C.accent.red }}>
//                     ⚠️ Scheduling conflicts detected. Click "One-Click Generate Timetable" to fix them automatically.
//                   </p>
//                 )}
//                 {activeDepartment && !isDeptCompleted && hasAssignmentIssues && (
//                   <p style={{ color: C.accent.red }}>
//                     ⚠️ Subject assignment issues detected. Click "One-Click Generate Timetable" to fix them automatically.
//                   </p>
//                 )}
//               </>
//             )}
//             {totalCourses === 0 && (
//               <p style={{ color: C.text.tertiary }}>
//                 No course details have been submitted yet for {activeDepartment || 'any department'}.
//                 {activeDepartment && !hasAssignmentIssues && (
//                   <span> Click "One-Click Generate Timetable" to auto-assign subjects and generate timetable.</span>
//                 )}
//               </p>
//             )}
//             {totalCourses === 0 && activeDepartment && !hasAssignmentIssues && !showOneClickGenerator && (
//               <Button 
//                 onClick={() => setShowOneClickGenerator(true)} 
//                 variant="primary" 
//                 size="lg"
//                 style={{ 
//                   background: C.gold.gradient,
//                   marginTop: 16,
//                   boxShadow: C.shadow.glow
//                 }}
//               >
//                 🚀 One-Click Generate Timetable
//               </Button>
//             )}
//           </div>
//         </Card>
//       )}
//     </div>
//   );
// }

// src/components/admin/DeanCourseDetailsReview.jsx
import { useState, useEffect } from "react";
import { Card, Title, Badge, Button } from "../common";
import { TimetableConfigModal } from "../shared/TimetableConfigModal";
import { CapacityDashboard } from "../shared/CapacityDashboard";
import { AutoConflictResolver } from "./AutoConflictResolver";
import { SubjectAssignmentManager } from "./SubjectAssignmentManager";
import { FacultyPreferenceDashboard } from "./FacultyPreferenceDashboard";
import { OneClickTimetableGenerator } from "./OneClickTimetableGenerator";
import { AppState } from "../../AppState";
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "../../utils/storage";
import { findMissedSubjects, findDuplicateAssignments } from "../../utils/subjectAssignmentEngine";
import { C } from "../../styles/theme";

export function DeanCourseDetailsReview() {
  const [refresh, setRefresh] = useState(0);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showConflictResolver, setShowConflictResolver] = useState(false);
  const [showAssignmentManager, setShowAssignmentManager] = useState(false);
  const [showPreferenceDashboard, setShowPreferenceDashboard] = useState(false);
  const [showOneClickGenerator, setShowOneClickGenerator] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const [activeDepartment, setActiveDepartment] = useState(null);
  const [departmentStatus, setDepartmentStatus] = useState({});
  const [conflictsResolved, setConflictsResolved] = useState(false);
  const [resolutionsApplied, setResolutionsApplied] = useState(false);
  const [assignmentStatus, setAssignmentStatus] = useState({ allAssigned: true, missedCount: 0, duplicateCount: 0 });
  
  useEffect(() => {
    const handleStorageChange = () => {
      setRefresh(r => r + 1);
      loadDepartmentStatus();
      loadValidation();
      checkAssignmentStatus();
    };
    loadDepartmentStatus();
    loadValidation();
    checkAssignmentStatus();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [refresh]);
  
  const loadDepartmentStatus = () => {
    const active = loadFromStorage(STORAGE_KEYS.ACTIVE_DEPARTMENT, null);
    const status = loadFromStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, {});
    console.log("Loaded active department:", active);
    setActiveDepartment(active);
    setDepartmentStatus(status);
  };
  
  const checkAssignmentStatus = () => {
    if (!activeDepartment) return;
    
    const missed = findMissedSubjects(activeDepartment);
    const duplicates = findDuplicateAssignments(activeDepartment);
    
    const allAssigned = missed.allAssigned && duplicates.length === 0;
    setAssignmentStatus({
      allAssigned: allAssigned,
      missedCount: missed.missedSubjects.length,
      duplicateCount: duplicates.length,
      partialCount: missed.partialSubjects.length,
      missedSubjects: missed.missedSubjects,
      duplicates: duplicates
    });
    
    return allAssigned;
  };
  
  const loadValidation = () => {
    try {
      let approvedCoursesList = AppState.courseDetails?.filter(c => c.deanStatus === "approved") || [];
      
      if (activeDepartment) {
        approvedCoursesList = approvedCoursesList.filter(c => c.course === activeDepartment);
      }
      
      console.log("Approved courses for validation:", approvedCoursesList.length);
      
      if (approvedCoursesList.length > 0) {
        if (typeof AppState.validateTimetable === 'function') {
          const validation = AppState.validateTimetable(activeDepartment);
          console.log("Validation result:", validation);
          setValidationResult(validation);
          
          if (validation.canSchedule) {
            setConflictsResolved(true);
          } else {
            setConflictsResolved(false);
          }
        } else {
          setValidationResult({
            canSchedule: true,
            errors: [],
            warnings: [],
            subjectStatus: [],
            facultyWorkload: [],
            totalRequiredSlots: 0,
            totalAvailableSlots: 120,
            utilization: 0
          });
          setConflictsResolved(true);
        }
      } else {
        setValidationResult(null);
        setConflictsResolved(false);
      }
    } catch (error) {
      console.error("Error loading validation:", error);
      setValidationResult({
        canSchedule: true,
        errors: [],
        warnings: [],
        subjectStatus: [],
        facultyWorkload: [],
        totalRequiredSlots: 0,
        totalAvailableSlots: 120,
        utilization: 0
      });
      setConflictsResolved(true);
    }
  };
  
  const pendingDeanApprovals = AppState.courseDetails?.filter(c => 
    c.deanStatus === "pending" && c.submittedAt && (!activeDepartment || c.course === activeDepartment)
  ) || [];
  
  const approvedCourses = AppState.courseDetails?.filter(c => 
    c.deanStatus === "approved" && (!activeDepartment || c.course === activeDepartment)
  ) || [];
  
  const totalCourses = approvedCourses.length + pendingDeanApprovals.length;
  
  // Function to reset timetable for current department
  const resetTimetable = () => {
    if (confirm(`⚠️ Are you sure you want to reset the timetable for ${activeDepartment}?\n\nThis will clear all generated timetable slots for this department.`)) {
      // Clear timetable for this department only
      const currentTimetable = AppState.timetable || [];
      const otherDeptSlots = currentTimetable.filter(t => t.course !== activeDepartment);
      AppState.timetable = otherDeptSlots;
      saveToStorage(STORAGE_KEYS.TIMETABLE, otherDeptSlots);
      
      // Reset department completion status
      const updatedStatus = { ...departmentStatus };
      if (updatedStatus[activeDepartment]) {
        delete updatedStatus[activeDepartment];
        saveToStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, updatedStatus);
        setDepartmentStatus(updatedStatus);
      }
      
      // Clear any timetable validation errors
      AppState.timetableValidationErrors = null;
      
      // Refresh the page data
      setRefresh(r => r + 1);
      window.dispatchEvent(new Event('storage'));
      
      alert(`✅ Timetable for ${activeDepartment} has been reset! You can now generate a new one.`);
    }
  };
  
  const handleApprove = (courseId) => {
    AppState.updateCourseDetailDeanStatus(courseId, "approved");
    setRefresh(r => r + 1);
    window.dispatchEvent(new Event('storage'));
    alert("Course approved successfully!");
  };
  
  const handleReject = (courseId) => {
    const reason = prompt("Enter rejection reason:");
    if (reason) {
      AppState.updateCourseDetailDeanStatus(courseId, "rejected", reason);
      setRefresh(r => r + 1);
      window.dispatchEvent(new Event('storage'));
      alert("Course rejected!");
    }
  };
  
  const handleGenerateTimetable = (config) => {
    setGenerating(true);
    try {
      if (!activeDepartment) {
        alert("No active department selected. Please ask the Director to activate a department first.");
        setGenerating(false);
        setShowConfigModal(false);
        return;
      }
      
      const missed = findMissedSubjects(activeDepartment);
      const duplicates = findDuplicateAssignments(activeDepartment);
      
      if (!missed.allAssigned) {
        alert(`⚠️ Cannot generate timetable!\n\nMissing Assignments:\n- ${missed.missedSubjects.length} subjects have no faculty\n- ${missed.partialSubjects.length} subjects have partial assignments\n\nPlease complete subject assignments first.`);
        setGenerating(false);
        setShowConfigModal(false);
        setShowAssignmentManager(true);
        return;
      }
      
      if (duplicates.length > 0) {
        alert(`⚠️ Cannot generate timetable!\n\n${duplicates.length} subject(s) have multiple faculty assignments.\n\nPlease resolve duplicates first.`);
        setGenerating(false);
        setShowConfigModal(false);
        setShowAssignmentManager(true);
        return;
      }
      
      const isDeptCompleted = departmentStatus[activeDepartment]?.completed;
      if (isDeptCompleted) {
        if (!confirm(`Timetable for ${activeDepartment} is already completed. Generating again will overwrite it. Continue?`)) {
          setGenerating(false);
          setShowConfigModal(false);
          return;
        }
      }
      
      let canSchedule = true;
      let validationErrors = [];
      
      if (typeof AppState.validateTimetable === 'function') {
        const validation = AppState.validateTimetable(activeDepartment);
        canSchedule = validation.canSchedule;
        validationErrors = validation.errors || [];
      }
      
      if (!canSchedule) {
        const errorMessages = validationErrors.map(e => `- ${e.subject || e.faculty}: ${e.type}`).join("\n");
        alert(`❌ Cannot generate timetable for ${activeDepartment}!\n\nIssues found:\n${errorMessages}\n\nPlease resolve these issues before generating.`);
        setGenerating(false);
        setShowConfigModal(false);
        return;
      }
      
      const approvedCoursesList = AppState.courseDetails?.filter(c => 
        c.deanStatus === "approved" && c.course === activeDepartment
      ) || [];
      
      if (approvedCoursesList.length === 0) {
        alert(`No approved courses found for ${activeDepartment}.`);
        setGenerating(false);
        setShowConfigModal(false);
        return;
      }
      
      const generatedTimetable = AppState.generateTimetable(activeDepartment);
      
      if (generatedTimetable && generatedTimetable.length > 0) {
        const updatedStatus = {
          ...departmentStatus,
          [activeDepartment]: {
            ...departmentStatus[activeDepartment],
            completed: true,
            completedAt: new Date().toISOString(),
            slotsGenerated: generatedTimetable.length
          }
        };
        saveToStorage(STORAGE_KEYS.DEPARTMENT_TIMETABLE_STATUS, updatedStatus);
        setDepartmentStatus(updatedStatus);
        
        alert(`✅ ${activeDepartment} timetable generated successfully with ${generatedTimetable.length} slots!`);
        setRefresh(r => r + 1);
        window.dispatchEvent(new Event('storage'));
      } else {
        alert(`⚠️ No timetable slots were generated for ${activeDepartment}.\n\nApproved courses: ${approvedCoursesList.length}`);
      }
    } catch (error) {
      console.error("Error generating timetable:", error);
      alert("Error generating timetable: " + error.message);
    } finally {
      setGenerating(false);
      setShowConfigModal(false);
    }
  };
  
  const handleConflictsResolved = (resolved) => {
    setShowConflictResolver(false);
    if (resolved) {
      setResolutionsApplied(true);
      setTimeout(() => {
        AppState.courseDetails = loadFromStorage(STORAGE_KEYS.COURSE_DETAILS, []);
        AppState.faculty = loadFromStorage(STORAGE_KEYS.FACULTY, []);
        AppState.subjects = loadFromStorage(STORAGE_KEYS.SUBJECTS, []);
        
        loadValidation();
        checkAssignmentStatus();
        setRefresh(r => r + 1);
        
        alert("✅ Conflicts resolved successfully! You can now generate the timetable.");
      }, 500);
    }
  };
  
  const handleAssignmentComplete = () => {
    setShowAssignmentManager(false);
    checkAssignmentStatus();
    loadValidation();
    setRefresh(r => r + 1);
    window.dispatchEvent(new Event('storage'));
    alert("✅ Subject assignments completed! You can now review and approve courses.");
  };
  
  const handleDashboardComplete = () => {
    setShowPreferenceDashboard(false);
    checkAssignmentStatus();
    loadValidation();
    setRefresh(r => r + 1);
    window.dispatchEvent(new Event('storage'));
  };
  
  const handleOneClickComplete = () => {
    setShowOneClickGenerator(false);
    setTimeout(() => {
      loadDepartmentStatus();
      loadValidation();
      checkAssignmentStatus();
      setRefresh(r => r + 1);
      window.dispatchEvent(new Event('storage'));
    }, 1000);
  };
  
  const allCoursesApproved = totalCourses > 0 && pendingDeanApprovals.length === 0;
  
  const isDeptActive = !!activeDepartment;
  const isDeptCompleted = activeDepartment ? departmentStatus[activeDepartment]?.completed : false;
  const hasSchedulingIssues = validationResult?.canSchedule === false;
  const hasAssignmentIssues = !assignmentStatus.allAssigned;
  
  const showGenerateButton = allCoursesApproved && isDeptActive && !isDeptCompleted && !hasAssignmentIssues;
  
  const getDepartmentColor = () => {
    switch(activeDepartment) {
      case "BTech": return C.accent.blue;
      case "BSc": return C.accent.green;
      case "BCA": return C.accent.gold;
      default: return C.text.primary;
    }
  };
  
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <TimetableConfigModal 
        isOpen={showConfigModal} 
        onClose={() => setShowConfigModal(false)} 
        onGenerate={handleGenerateTimetable}
      />
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <Title>Course Details Approval (Dean)</Title>
        
        {activeDepartment && (
          <div style={{ 
            padding: "8px 16px", 
            background: `${getDepartmentColor()}20`, 
            borderRadius: 8,
            border: `1px solid ${getDepartmentColor()}`
          }}>
            <span style={{ color: getDepartmentColor(), fontWeight: 600 }}>
              Active Department: {activeDepartment}
            </span>
            {isDeptCompleted && (
              <Badge variant="success" style={{ marginLeft: 8 }}>✓ Completed</Badge>
            )}
          </div>
        )}
        
        {!activeDepartment && (
          <div style={{ padding: 8, background: C.accent.goldBg, borderRadius: 8 }}>
            <span style={{ color: C.accent.gold }}>
              ⚠️ No active department. Director needs to activate a department first.
            </span>
          </div>
        )}
        
        {/* RESET TIMETABLE BUTTON - Always visible when department is active */}
        {isDeptActive && (
          <Button 
            onClick={resetTimetable} 
            variant="danger" 
            size="md"
            style={{ 
              background: C.accent.red,
              color: "white"
            }}
          >
            🗑️ Reset Timetable for {activeDepartment}
          </Button>
        )}
        
        {/* ONE-CLICK GENERATOR BUTTON */}
        {isDeptActive && !isDeptCompleted && !showOneClickGenerator && (
          <Button 
            onClick={() => setShowOneClickGenerator(true)} 
            variant="primary"
            size="lg"
            style={{ 
              background: C.gold.gradient,
              boxShadow: C.shadow.glow,
              fontWeight: "bold"
            }}
          >
            🚀 ONE-CLICK GENERATE TIMETABLE
          </Button>
        )}
        
        {/* View Dashboard Button */}
        {isDeptActive && !isDeptCompleted && !showOneClickGenerator && (
          <Button 
            onClick={() => setShowPreferenceDashboard(!showPreferenceDashboard)} 
            variant="secondary"
            size="md"
          >
            {showPreferenceDashboard ? "📋 Hide Dashboard" : "📊 View Preference Dashboard"}
            {hasAssignmentIssues && !showPreferenceDashboard && (
              <Badge variant="danger" style={{ marginLeft: 8 }}>
                {assignmentStatus.missedCount + assignmentStatus.duplicateCount} Issues
              </Badge>
            )}
          </Button>
        )}
        
        {/* Assignment Manager Button */}
        {isDeptActive && !isDeptCompleted && !showPreferenceDashboard && !showOneClickGenerator && (
          <Button 
            onClick={() => setShowAssignmentManager(true)} 
            variant="secondary"
            size="md"
          >
            📋 Manage Subject Assignments
            {hasAssignmentIssues && (
              <Badge variant="danger" style={{ marginLeft: 8 }}>
                {assignmentStatus.missedCount + assignmentStatus.duplicateCount} Issues
              </Badge>
            )}
          </Button>
        )}
        
        {showGenerateButton && !showPreferenceDashboard && !showOneClickGenerator && (
          <Button 
            onClick={() => setShowConfigModal(true)} 
            variant="success"
            disabled={generating || hasSchedulingIssues}
            size="lg"
          >
            {generating ? "⏳ Generating..." : 
             hasSchedulingIssues ? "⚠️ Resolve Conflicts First" : 
             `⚙️ Generate ${activeDepartment} Timetable`}
          </Button>
        )}
        
        {totalCourses > 0 && allCoursesApproved && isDeptActive && isDeptCompleted && (
          <div style={{ padding: 8, background: C.accent.greenBg, borderRadius: 8 }}>
            <span style={{ color: C.accent.green }}>
              ✓ {activeDepartment} timetable has been generated and completed!
            </span>
          </div>
        )}
      </div>
      
      {/* ONE-CLICK GENERATOR */}
      {showOneClickGenerator && activeDepartment && (
        <OneClickTimetableGenerator 
          department={activeDepartment}
          onComplete={handleOneClickComplete}
          onCancel={() => setShowOneClickGenerator(false)}
        />
      )}
      
      {/* Faculty Preference Dashboard */}
      {showPreferenceDashboard && activeDepartment && !showOneClickGenerator && (
        <FacultyPreferenceDashboard 
          department={activeDepartment}
          onAssignComplete={handleDashboardComplete}
        />
      )}
      
      {/* Assignment Issues Warning */}
      {isDeptActive && !isDeptCompleted && hasAssignmentIssues && !showAssignmentManager && !showPreferenceDashboard && !showOneClickGenerator && (
        <Card style={{ background: C.accent.redBg }}>
          <div style={{ textAlign: "center", padding: 16 }}>
            <span style={{ fontSize: 32 }}>⚠️</span>
            <h3 style={{ color: C.accent.red, marginTop: 8 }}>Subject Assignment Issues Detected!</h3>
            <p style={{ color: C.text.secondary }}>
              {assignmentStatus.missedCount > 0 && `• ${assignmentStatus.missedCount} subject(s) have no faculty assigned\n`}
              {assignmentStatus.partialCount > 0 && `• ${assignmentStatus.partialCount} subject(s) have partial assignments (missing sections)\n`}
              {assignmentStatus.duplicateCount > 0 && `• ${assignmentStatus.duplicateCount} subject(s) have multiple faculty assignments\n`}
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 12 }}>
              <Button 
                onClick={() => setShowOneClickGenerator(true)} 
                variant="primary"
                size="lg"
                style={{ background: C.gold.gradient }}
              >
                🚀 Fix Automatically with One-Click
              </Button>
              <Button 
                onClick={() => setShowPreferenceDashboard(true)} 
                variant="info"
                size="lg"
              >
                📊 View Dashboard
              </Button>
              <Button 
                onClick={() => setShowAssignmentManager(true)} 
                variant="warning"
                size="lg"
              >
                📋 Manual Assignment
              </Button>
            </div>
          </div>
        </Card>
      )}
      
      {/* Subject Assignment Manager */}
      {showAssignmentManager && activeDepartment && !showOneClickGenerator && (
        <SubjectAssignmentManager 
          department={activeDepartment}
          onComplete={handleAssignmentComplete}
          onCancel={() => setShowAssignmentManager(false)}
        />
      )}
      
      {allCoursesApproved && isDeptActive && !isDeptCompleted && hasSchedulingIssues && !showConflictResolver && !showAssignmentManager && !showPreferenceDashboard && !showOneClickGenerator && (
        <Card style={{ background: C.accent.redBg }}>
          <div style={{ textAlign: "center", padding: 16 }}>
            <span style={{ fontSize: 32 }}>⚠️</span>
            <h3 style={{ color: C.accent.red, marginTop: 8 }}>Scheduling Conflicts Detected!</h3>
            <p style={{ color: C.text.secondary }}>
              Faculty overload or slot capacity issues found. Click the button below to auto-resolve conflicts.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 12 }}>
              <Button 
                onClick={() => setShowOneClickGenerator(true)} 
                variant="primary"
                size="lg"
                style={{ background: C.gold.gradient }}
              >
                🚀 Fix Automatically with One-Click
              </Button>
              <Button 
                onClick={() => setShowConflictResolver(true)} 
                variant="warning"
                size="lg"
              >
                🔧 Auto-Resolve Conflicts
              </Button>
            </div>
          </div>
        </Card>
      )}
      
      {allCoursesApproved && isDeptActive && !isDeptCompleted && !hasSchedulingIssues && resolutionsApplied && !showAssignmentManager && !showPreferenceDashboard && !showOneClickGenerator && (
        <Card style={{ background: C.accent.greenBg }}>
          <div style={{ textAlign: "center", padding: 16 }}>
            <span style={{ fontSize: 32 }}>✅</span>
            <h3 style={{ color: C.accent.green, marginTop: 8 }}>Conflicts Resolved Successfully!</h3>
            <p style={{ color: C.text.secondary }}>
              All scheduling conflicts have been resolved. Click the "Generate Timetable" button above.
            </p>
          </div>
        </Card>
      )}
      
      {showConflictResolver && activeDepartment && approvedCourses.length > 0 && !showOneClickGenerator && (
        <AutoConflictResolver 
          approvedCourses={approvedCourses}
          department={activeDepartment}
          onResolved={handleConflictsResolved}
          onCancel={() => setShowConflictResolver(false)}
        />
      )}
      
      {approvedCourses.length > 0 && activeDepartment && !showConflictResolver && !showAssignmentManager && !showPreferenceDashboard && !showOneClickGenerator && (
        <CapacityDashboard approvedCourses={approvedCourses} department={activeDepartment} />
      )}
      
      {!activeDepartment && approvedCourses.length > 0 && (
        <Card style={{ background: C.accent.goldBg }}>
          <p style={{ color: C.accent.gold, margin: 0, textAlign: "center" }}>
            ⚠️ Please ask the Director to activate a department to view capacity dashboard and generate timetable.
          </p>
        </Card>
      )}
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        <Card padding="20px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Approval</p>
          <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingDeanApprovals.length}</p>
        </Card>
        <Card padding="20px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Approved Courses</p>
          <p style={{ color: C.accent.green, fontSize: 32, fontWeight: 700 }}>{approvedCourses.length}</p>
        </Card>
        <Card padding="20px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Total ({activeDepartment || 'All'})</p>
          <p style={{ color: C.accent.blue, fontSize: 32, fontWeight: 700 }}>{totalCourses}</p>
        </Card>
      </div>
      
      {pendingDeanApprovals.length > 0 ? (
        pendingDeanApprovals.map(course => {
          const faculty = AppState.faculty?.find(f => f.id === course.facultyId);
          const subject = AppState.subjects?.find(s => s.id === course.subjectId);
          
          return (
            <Card key={course.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: faculty ? `${faculty.color}20` : C.accent.blueBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: faculty?.color || C.accent.blue,
                    fontWeight: 700,
                    fontSize: 18,
                  }}>
                    {faculty?.avatar || "?"}
                  </div>
                  <div>
                    <p style={{ color: C.text.primary, fontWeight: 600, fontSize: 16 }}>{faculty?.name || "Unknown Faculty"}</p>
                    <p style={{ color: C.accent.blue, fontSize: 14 }}>{course.subjectName} ({course.subjectCode})</p>
                    <p style={{ color: C.text.tertiary, fontSize: 12 }}>{course.course} Semester {course.semester}</p>
                    {course.autoAssigned && (
                      <Badge variant="info" style={{ marginTop: 4 }}>Auto-Assigned</Badge>
                    )}
                  </div>
                </div>
                <Badge variant="warning">Pending Dean Approval</Badge>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12, marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
                <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Credits</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.credits}</span></div>
                <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Modules</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.modules}</span></div>
                <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Theory Classes</span><br /><span style={{ color: C.accent.blue, fontSize: 18, fontWeight: 600 }}>{course.theoryClassesPerWeek}/week</span></div>
                <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Lab Periods</span><br /><span style={{ color: C.accent.green, fontSize: 18, fontWeight: 600 }}>{course.labPeriodsPerWeek}/week</span></div>
              </div>
              
              <div style={{ marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
                <p style={{ color: C.accent.gold, fontSize: 14 }}>Total Weekly Classes per Section: <strong>{course.totalWeeklyClasses}</strong></p>
                <p style={{ color: C.accent.gold, fontSize: 14 }}>Total Sessions (3 sections): <strong>{course.totalWeeklyClasses * 3}</strong></p>
              </div>
              
              {course.submittedAt && (
                <div style={{ marginBottom: 16, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
                  <p style={{ color: C.text.secondary, fontSize: 12 }}>
                    <strong>Submitted by Faculty:</strong> {new Date(course.submittedAt).toLocaleString()}
                  </p>
                </div>
              )}
              
              <div style={{ display: "flex", gap: 12 }}>
                <Button onClick={() => handleApprove(course.id)} variant="success" fullWidth>
                  ✓ Approve Course
                </Button>
                <Button onClick={() => handleReject(course.id)} variant="danger" fullWidth>
                  ✗ Reject Course
                </Button>
              </div>
            </Card>
          );
        })
      ) : (
        <Card>
          <div style={{ textAlign: "center", padding: "20px" }}>
            <p style={{ color: C.accent.green, fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
              ✓ No pending course approvals for {activeDepartment || 'active department'}!
            </p>
            {allCoursesApproved && totalCourses > 0 && (
              <>
                {!activeDepartment && (
                  <p style={{ color: C.accent.gold, marginBottom: 12 }}>
                    ⚠️ No department is active. Director needs to activate a department first.
                  </p>
                )}
                {activeDepartment && isDeptCompleted && (
                  <p style={{ color: C.accent.green }}>
                    ✅ {activeDepartment} timetable has been successfully generated!
                  </p>
                )}
                {activeDepartment && !isDeptCompleted && !hasAssignmentIssues && !hasSchedulingIssues && (
                  <p style={{ color: C.text.secondary }}>
                    All courses for {activeDepartment} are approved and no conflicts detected. Click the "Generate Timetable" button above.
                  </p>
                )}
                {activeDepartment && !isDeptCompleted && !hasAssignmentIssues && hasSchedulingIssues && (
                  <p style={{ color: C.accent.red }}>
                    ⚠️ Scheduling conflicts detected. Click "One-Click Generate Timetable" to fix them automatically.
                  </p>
                )}
                {activeDepartment && !isDeptCompleted && hasAssignmentIssues && (
                  <p style={{ color: C.accent.red }}>
                    ⚠️ Subject assignment issues detected. Click "One-Click Generate Timetable" to fix them automatically.
                  </p>
                )}
              </>
            )}
            {totalCourses === 0 && (
              <p style={{ color: C.text.tertiary }}>
                No course details have been submitted yet for {activeDepartment || 'any department'}.
                {activeDepartment && !hasAssignmentIssues && (
                  <span> Click "One-Click Generate Timetable" to auto-assign subjects and generate timetable.</span>
                )}
              </p>
            )}
            {totalCourses === 0 && activeDepartment && !hasAssignmentIssues && !showOneClickGenerator && (
              <Button 
                onClick={() => setShowOneClickGenerator(true)} 
                variant="primary" 
                size="lg"
                style={{ 
                  background: C.gold.gradient,
                  marginTop: 16,
                  boxShadow: C.shadow.glow
                }}
              >
                🚀 One-Click Generate Timetable
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}