// // src/components/director/DirectorFormFloat.jsx
// import { useState, useEffect } from "react";
// import { Card, Title, Button, Badge, Input } from "../common";
// import { AppState } from "../../AppState";
// import { saveToStorage, STORAGE_KEYS } from "../../utils/storage";
// import { C } from "../../styles/theme";

// export function DirectorFormFloat({ onRefresh }) {
//   const [formStatus, setFormStatus] = useState({
//     isFloated: false,
//     floatedDate: null,
//     floatedBy: null,
//     semester: "2025",
//     deadline: null
//   });
//   const [pendingSubjects, setPendingSubjects] = useState([]);
//   const [approvedSubjects, setApprovedSubjects] = useState([]);
//   const [deadline, setDeadline] = useState("");
//   const [refresh, setRefresh] = useState(0);

//   useEffect(() => {
//     loadData();
    
//     const handleStorageChange = () => {
//       loadData();
//       setRefresh(r => r + 1);
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   const loadData = () => {
//     // Load form status
//     const savedStatus = loadFromStorage(STORAGE_KEYS.FORM_STATUS, {
//       isFloated: false,
//       floatedDate: null,
//       floatedBy: null,
//       semester: "2025",
//       deadline: null
//     });
//     setFormStatus(savedStatus);
//     setDeadline(savedStatus.deadline || "");

//     // Load subjects
//     const allSubjects = AppState.subjects;
//     setPendingSubjects(allSubjects.filter(s => s.approvalStatus === "pending"));
//     setApprovedSubjects(allSubjects.filter(s => s.approvalStatus === "approved"));
//   };

//   const allSubjectsApproved = pendingSubjects.length === 0 && approvedSubjects.length > 0;

//   const handleFloatForm = () => {
//     if (!allSubjectsApproved) {
//       alert(`Cannot float the form. ${pendingSubjects.length} subject(s) are still pending Dean approval.`);
//       return;
//     }

//     if (!deadline) {
//       alert("Please set a submission deadline");
//       return;
//     }

//     const updatedStatus = {
//       isFloated: true,
//       floatedDate: new Date().toISOString(),
//       floatedBy: "director",
//       semester: "2025",
//       deadline: deadline
//     };

//     setFormStatus(updatedStatus);
//     saveToStorage(STORAGE_KEYS.FORM_STATUS, updatedStatus);
//     window.dispatchEvent(new Event('storage'));
//     alert("Preference form has been floated! Faculty can now submit their preferences.");
//     if (onRefresh) onRefresh();
//   };

//   const handleResetForm = () => {
//     if (confirm("Are you sure you want to reset the form? This will allow faculty to submit again.")) {
//       const resetStatus = {
//         isFloated: false,
//         floatedDate: null,
//         floatedBy: null,
//         semester: "2025",
//         deadline: null
//       };
//       setFormStatus(resetStatus);
//       saveToStorage(STORAGE_KEYS.FORM_STATUS, resetStatus);
//       window.dispatchEvent(new Event('storage'));
//       alert("Form has been reset. Faculty can no longer submit preferences until floated again.");
//       if (onRefresh) onRefresh();
//     }
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <Title>Preference Form Management</Title>

//       {/* Status Cards */}
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Subjects</p>
//           <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingSubjects.length}</p>
//           {pendingSubjects.length > 0 && (
//             <p style={{ color: C.text.tertiary, fontSize: 11, marginTop: 8 }}>
//               Waiting for Dean approval
//             </p>
//           )}
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Approved Subjects</p>
//           <p style={{ color: C.accent.green, fontSize: 32, fontWeight: 700 }}>{approvedSubjects.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Form Status</p>
//           <p style={{ color: formStatus.isFloated ? C.accent.green : C.accent.red, fontSize: 24, fontWeight: 700 }}>
//             {formStatus.isFloated ? "FLOATED ✓" : "NOT FLOATED"}
//           </p>
//           {formStatus.isFloated && formStatus.deadline && (
//             <p style={{ color: C.text.tertiary, fontSize: 11, marginTop: 8 }}>
//               Deadline: {new Date(formStatus.deadline).toLocaleString()}
//             </p>
//           )}
//         </Card>
//       </div>

//       {/* Pending Subjects List */}
//       {pendingSubjects.length > 0 && (
//         <Card>
//           <Title level={4}>Subjects Pending Approval ({pendingSubjects.length})</Title>
//           <p style={{ color: C.accent.red, marginBottom: 12 }}>
//             ⚠ These subjects need Dean approval before the form can be floated:
//           </p>
//           <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
//             {pendingSubjects.map(subject => (
//               <Badge key={subject.id} variant="danger">
//                 {subject.name} ({subject.code})
//               </Badge>
//             ))}
//           </div>
//         </Card>
//       )}

//       {/* Approved Subjects List */}
//       {approvedSubjects.length > 0 && (
//         <Card>
//           <Title level={4}>Approved Subjects ({approvedSubjects.length})</Title>
//           <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
//             {approvedSubjects.map(subject => (
//               <Badge key={subject.id} variant="success">
//                 {subject.name} ({subject.code})
//               </Badge>
//             ))}
//           </div>
//         </Card>
//       )}

//       {/* Float Form Section */}
//       <Card>
//         <Title level={4}>Float Preference Form</Title>
        
//         <div style={{ marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//           <p style={{ color: C.text.secondary, fontSize: 13 }}>
//             <strong>Current Status:</strong> {formStatus.isFloated ? (
//               <span style={{ color: C.accent.green }}>✓ Form has been floated. Faculty can submit preferences.</span>
//             ) : (
//               <span style={{ color: C.accent.red }}>✗ Form is not floated. Faculty cannot submit preferences yet.</span>
//             )}
//           </p>
//           {formStatus.isFloated && formStatus.floatedDate && (
//             <p style={{ color: C.text.tertiary, fontSize: 12, marginTop: 8 }}>
//               Floated on: {new Date(formStatus.floatedDate).toLocaleString()} by {formStatus.floatedBy}
//             </p>
//           )}
//         </div>

//         {!formStatus.isFloated ? (
//           <>
//             <Input
//               label="Submission Deadline"
//               type="datetime-local"
//               value={deadline}
//               onChange={e => setDeadline(e.target.value)}
//               required
//             />
//             <div style={{ marginTop: 16, padding: 12, background: C.accent.blueBg, borderRadius: 8, marginBottom: 16 }}>
//               <p style={{ color: C.accent.blue, fontSize: 13, margin: 0 }}>
//                 📋 Requirements before floating:
//               </p>
//               <ul style={{ color: C.text.secondary, fontSize: 12, marginTop: 8, paddingLeft: 20 }}>
//                 <li>All subjects must be approved by Dean</li>
//                 <li>Set a submission deadline for faculty</li>
//                 <li>Faculty will be able to submit their preferences after floating</li>
//               </ul>
//             </div>
//             <Button
//               onClick={handleFloatForm}
//               variant="success"
//               fullWidth
//               size="lg"
//               disabled={!allSubjectsApproved}
//             >
//               {allSubjectsApproved ? "Float Preference Form" : `Waiting for ${pendingSubjects.length} subject(s) to be approved`}
//             </Button>
//           </>
//         ) : (
//           <div>
//             <div style={{ marginBottom: 16, padding: 12, background: C.accent.greenBg, borderRadius: 8 }}>
//               <p style={{ color: C.accent.green, margin: 0 }}>
//                 ✓ Preference form has been floated. Faculty can now submit their preferences.
//               </p>
//               {formStatus.deadline && (
//                 <p style={{ color: C.accent.green, fontSize: 12, marginTop: 8 }}>
//                   ⏰ Submission Deadline: {new Date(formStatus.deadline).toLocaleString()}
//                 </p>
//               )}
//             </div>
//             <Button
//               onClick={handleResetForm}
//               variant="danger"
//               fullWidth
//             >
//               Reset Form (Close submissions)
//             </Button>
//           </div>
//         )}
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

// src/components/director/DirectorFormFloat.jsx
import { useState, useEffect } from "react";
import { Card, Title, Button, Badge, Input, Select } from "../common";
import { AppState } from "../../AppState";
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from "../../utils/storage";
import { COURSES } from "../../data/mockData";
import { C } from "../../styles/theme";

export function DirectorFormFloat({ onRefresh }) {
  const [formStatus, setFormStatus] = useState({});
  const [selectedDepartment, setSelectedDepartment] = useState("BTech");
  const [deadline, setDeadline] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [departmentSubjects, setDepartmentSubjects] = useState({});

  useEffect(() => {
    loadData();
    loadDepartmentSubjects();
    
    const handleStorageChange = () => {
      loadData();
      loadDepartmentSubjects();
      setRefresh(r => r + 1);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadData = () => {
    const savedStatus = loadFromStorage(STORAGE_KEYS.FORM_STATUS, {});
    setFormStatus(savedStatus);
  };

  const loadDepartmentSubjects = () => {
    const subjects = {};
    COURSES.forEach(course => {
      const semester1Subjects = AppState.getSubjectsForCourseAndSemester(course, 1) || [];
      const semester2Subjects = AppState.getSubjectsForCourseAndSemester(course, 2) || [];
      subjects[course] = {
        total: semester1Subjects.length + semester2Subjects.length,
        semester1: semester1Subjects.length,
        semester2: semester2Subjects.length
      };
    });
    setDepartmentSubjects(subjects);
  };

  const getDepartmentStatus = (department) => {
    return formStatus[department] || {
      isFloated: false,
      floatedDate: null,
      floatedBy: null,
      semester: "2025",
      deadline: null
    };
  };

  const allSubjectsApproved = (department) => {
    const subjects = AppState.subjects.filter(s => 
      s.course === department && s.approvalStatus === "approved"
    );
    return subjects.length > 0;
  };

  const handleFloatForm = (department) => {
    if (!allSubjectsApproved(department)) {
      alert(`Cannot float the form for ${department}. No approved subjects available.`);
      return;
    }

    if (!deadline) {
      alert("Please set a submission deadline");
      return;
    }

    const updatedStatus = {
      ...formStatus,
      [department]: {
        isFloated: true,
        floatedDate: new Date().toISOString(),
        floatedBy: "director",
        semester: "2025",
        deadline: deadline,
        department: department
      }
    };

    setFormStatus(updatedStatus);
    saveToStorage(STORAGE_KEYS.FORM_STATUS, updatedStatus);
    window.dispatchEvent(new Event('storage'));
    alert(`Preference form for ${department} has been floated! Faculty can now submit their preferences.`);
    setDeadline("");
    if (onRefresh) onRefresh();
  };

  const handleResetForm = (department) => {
    if (confirm(`Are you sure you want to reset the form for ${department}? This will allow faculty to submit again.`)) {
      const updatedStatus = { ...formStatus };
      delete updatedStatus[department];
      setFormStatus(updatedStatus);
      saveToStorage(STORAGE_KEYS.FORM_STATUS, updatedStatus);
      window.dispatchEvent(new Event('storage'));
      alert(`Form for ${department} has been reset. Faculty can no longer submit preferences until floated again.`);
      if (onRefresh) onRefresh();
    }
  };

  const getDepartmentColor = (department) => {
    switch(department) {
      case "BTech": return C.accent.blue;
      case "BSc": return C.accent.green;
      case "BCA": return C.accent.gold;
      default: return C.text.primary;
    }
  };

  const getDepartmentBg = (department) => {
    switch(department) {
      case "BTech": return C.accent.blueBg;
      case "BSc": return C.accent.greenBg;
      case "BCA": return C.accent.goldBg;
      default: return C.cardHover;
    }
  };

  const getDepartmentIcon = (department) => {
    switch(department) {
      case "BTech": return "🔧";
      case "BSc": return "🔬";
      case "BCA": return "💻";
      default: return "📚";
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Title>Department-wise Preference Form Management</Title>
      
      <div style={{ marginBottom: 16, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
        <p style={{ color: C.accent.blue, margin: 0 }}>
          📋 <strong>How it works:</strong>
        </p>
        <ul style={{ color: C.text.secondary, fontSize: 13, marginTop: 8, paddingLeft: 20 }}>
          <li>Each department has its own preference form</li>
          <li>Float forms independently for each department</li>
          <li>Set different deadlines for different departments</li>
          <li>Faculty only see forms for their department when floated</li>
        </ul>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
        {COURSES.map(department => {
          const status = getDepartmentStatus(department);
          const isFloated = status.isFloated;
          const departmentDeadline = status.deadline;
          const hasSubjects = allSubjectsApproved(department);
          const subjectStats = departmentSubjects[department] || { total: 0, semester1: 0, semester2: 0 };
          
          return (
            <Card key={department} style={{ 
              borderTop: `4px solid ${getDepartmentColor(department)}`,
              opacity: isFloated ? 1 : 0.85,
              position: "relative",
              overflow: "hidden"
            }}>
              {isFloated && (
                <div style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  background: getDepartmentColor(department),
                  color: "white",
                  padding: "4px 12px",
                  fontSize: 11,
                  fontWeight: 600,
                  borderRadius: "0 12px 0 12px"
                }}>
                  FLOATED
                </div>
              )}
              
              <div style={{ textAlign: "center", marginBottom: 16 }}>
                <div style={{ 
                  width: 60, 
                  height: 60, 
                  borderRadius: "50%", 
                  background: getDepartmentBg(department),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px auto"
                }}>
                  <span style={{ fontSize: 28 }}>{getDepartmentIcon(department)}</span>
                </div>
                <Title level={3}>{department}</Title>
                
                <div style={{ marginTop: 8 }}>
                  {isFloated ? (
                    <Badge variant="success">✓ Form Floated</Badge>
                  ) : (
                    <Badge variant="warning">Not Floated</Badge>
                  )}
                </div>
              </div>

              <div style={{ marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
                <p style={{ fontSize: 12, color: C.text.tertiary, marginBottom: 4 }}>
                  <strong>Subjects Available:</strong> {subjectStats.total}
                </p>
                <p style={{ fontSize: 12, color: C.text.tertiary, marginBottom: 4 }}>
                  Semester 1: {subjectStats.semester1} | Semester 2: {subjectStats.semester2}
                </p>
                {!hasSubjects && (
                  <p style={{ fontSize: 11, color: C.accent.red, marginTop: 4 }}>
                    ⚠️ No approved subjects! Add subjects first.
                  </p>
                )}
              </div>

              {isFloated && (
                <div style={{ marginBottom: 16, padding: 12, background: C.accent.greenBg, borderRadius: 8 }}>
                  <p style={{ fontSize: 12, margin: 0 }}>
                    <strong>Floated on:</strong> {new Date(status.floatedDate).toLocaleString()}
                  </p>
                  <p style={{ fontSize: 12, margin: 4 }}>
                    <strong>Deadline:</strong> {new Date(departmentDeadline).toLocaleString()}
                  </p>
                </div>
              )}

              {!isFloated ? (
                <>
                  <Input
                    label="Submission Deadline"
                    type="datetime-local"
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                    required
                  />
                  <div style={{ marginTop: 12, padding: 12, background: C.accent.blueBg, borderRadius: 8, marginBottom: 16 }}>
                    <p style={{ color: C.accent.blue, fontSize: 12, margin: 0 }}>
                      📋 Requirements for {department}:
                    </p>
                    <ul style={{ color: C.text.secondary, fontSize: 11, marginTop: 8, paddingLeft: 20 }}>
                      <li>All subjects must be approved by Dean</li>
                      <li>Set a submission deadline for faculty</li>
                      <li>Faculty will be able to submit their preferences after floating</li>
                    </ul>
                  </div>
                  <Button
                    onClick={() => handleFloatForm(department)}
                    variant="success"
                    fullWidth
                    disabled={!hasSubjects || !deadline}
                  >
                    Float {department} Form
                  </Button>
                </>
              ) : (
                <div>
                  <div style={{ marginBottom: 16, padding: 12, background: C.accent.greenBg, borderRadius: 8 }}>
                    <p style={{ color: C.accent.green, margin: 0, fontSize: 12 }}>
                      ✓ Form has been floated for {department}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleResetForm(department)}
                    variant="danger"
                    fullWidth
                  >
                    Reset {department} Form
                  </Button>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Summary Card */}
      <Card>
        <Title level={4}>Summary</Title>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          {COURSES.map(department => {
            const status = getDepartmentStatus(department);
            return (
              <div key={department} style={{ textAlign: "center", flex: 1 }}>
                <p style={{ fontWeight: 600, color: getDepartmentColor(department), marginBottom: 4 }}>
                  {department}
                </p>
                <Badge variant={status.isFloated ? "success" : "warning"}>
                  {status.isFloated ? "Floated" : "Not Floated"}
                </Badge>
                {status.isFloated && status.deadline && (
                  <p style={{ fontSize: 10, color: C.text.tertiary, marginTop: 4 }}>
                    Due: {new Date(status.deadline).toLocaleDateString()}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Card>
      
      {/* Instructions Card */}
      <Card>
        <Title level={4}>Instructions for Department-wise Form Floating</Title>
        <ol style={{ color: C.text.secondary, fontSize: 13, paddingLeft: 20, margin: 0 }}>
          <li>Ensure all subjects for the department are approved by the Dean</li>
          <li>Set a submission deadline for faculty</li>
          <li>Click "Float Form" for the respective department</li>
          <li>Faculty will receive access to submit their preferences</li>
          <li>After the deadline, the form will automatically close</li>
          <li>You can reset the form if needed to allow resubmissions</li>
        </ol>
        
        <div style={{ marginTop: 16, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
          <p style={{ color: C.accent.blue, margin: 0, fontSize: 12 }}>
            💡 <strong>Note:</strong> Each department's form is managed independently. 
            You can float forms for different departments at different times with different deadlines.
          </p>
        </div>
      </Card>
    </div>
  );
}