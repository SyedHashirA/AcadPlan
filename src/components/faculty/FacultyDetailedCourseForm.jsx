// // src/components/faculty/FacultyDetailedCourseForm.jsx
// import { useState, useEffect } from "react";
// import { Card, Title, Button, Input, Select } from "../common";
// import { AppState } from "../../AppState";
// import { SECTIONS } from "../../data/mockData";
// import { C } from "../../styles/theme";

// export function FacultyDetailedCourseForm({ faculty, allocatedSubjects, onComplete }) {
//   const [courseDetails, setCourseDetails] = useState([]);
  
//   useEffect(() => {
//     // Build course details from allocated subjects
//     const details = allocatedSubjects.map((subjectId, index) => {
//       const subject = AppState.subjects.find(s => s.id === subjectId);
      
//       let semester = 1;
//       const SEMESTERS = [1, 2];
//       SEMESTERS.forEach(s => {
//         const semesterDetails = AppState.semesterDetails[faculty.course]?.[s];
//         if (semesterDetails && semesterDetails.subjects && semesterDetails.subjects.includes(subjectId)) {
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
//     });
//     setCourseDetails(details);
//   }, [allocatedSubjects, faculty]);
  
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
//       <p style={{ color: C.accent.green, fontSize: 13, marginBottom: 20 }}>
//         Your subject preferences have been approved! Please review the course details for {faculty.course}.
//       </p>
      
//       {courseDetails.map((detail, index) => (
//         <div key={index} style={{ marginBottom: 24, padding: 16, background: C.cardHover, borderRadius: 12 }}>
//           <h5 style={{ color: C.accent.blue, fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{detail.subjectName}</h5>
//           <p style={{ color: C.text.tertiary, fontSize: 12, marginBottom: 12 }}>Semester {detail.semester} | Code: {detail.subjectCode}</p>
          
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 12 }}>
//             <Input 
//               label="Credits" 
//               type="number" 
//               min="1" 
//               max="5" 
//               value={detail.credits} 
//               onChange={e => updateDetail(index, "credits", parseInt(e.target.value))}
//             />
//             <Input 
//               label="Modules" 
//               type="number" 
//               min="1" 
//               max="10" 
//               value={detail.modules} 
//               onChange={e => updateDetail(index, "modules", parseInt(e.target.value))}
//             />
//             <Select 
//               label="Type" 
//               value={detail.type} 
//               onChange={e => updateDetail(index, "type", e.target.value)}
//               options={[
//                 { value: "Theory", label: "Theory" },
//                 { value: "Lab", label: "Lab" },
//                 { value: "Both", label: "Both" }
//               ]}
//             />
//           </div>
          
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 12 }}>
//             <Input 
//               label="Theory Classes/Week" 
//               type="number" 
//               min="0" 
//               max="5" 
//               value={detail.theoryClassesPerWeek} 
//               onChange={e => updateDetail(index, "theoryClassesPerWeek", parseInt(e.target.value))}
//             />
//             <Input 
//               label="Lab Periods/Week" 
//               type="number" 
//               min="0" 
//               max="10" 
//               value={detail.labPeriodsPerWeek} 
//               onChange={e => updateDetail(index, "labPeriodsPerWeek", parseInt(e.target.value))}
//             />
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

// src/components/faculty/FacultyDetailedCourseForm.jsx
import { useState, useEffect } from "react";
import { Card, Title, Button, Input, Select } from "../common";
import { AppState } from "../../AppState";
import { SECTIONS } from "../../data/mockData";
import { C } from "../../styles/theme";

export function FacultyDetailedCourseForm({ faculty, allocatedSubjects, onComplete }) {
  const [courseDetails, setCourseDetails] = useState([]);
  const [originalValues, setOriginalValues] = useState({});
  
  useEffect(() => {
    // Build course details from allocated subjects
    const details = allocatedSubjects.map((subjectId, index) => {
      const subject = AppState.subjects.find(s => s.id === subjectId);
      
      let semester = 1;
      const SEMESTERS = [1, 2];
      SEMESTERS.forEach(s => {
        const semesterDetails = AppState.semesterDetails[faculty.course]?.[s];
        if (semesterDetails && semesterDetails.subjects && semesterDetails.subjects.includes(subjectId)) {
          semester = s;
        }
      });
      
      // Check if course already exists
      const existingDetail = AppState.courseDetails.find(c => 
        c.facultyId === faculty.id && 
        c.subjectId === subjectId &&
        c.semester === semester
      );
      
      if (existingDetail) {
        // Store original values for change detection
        setOriginalValues(prev => ({
          ...prev,
          [subjectId]: {
            credits: existingDetail.credits,
            modules: existingDetail.modules,
            theoryClassesPerWeek: existingDetail.theoryClassesPerWeek,
            labPeriodsPerWeek: existingDetail.labPeriodsPerWeek,
            type: existingDetail.type
          }
        }));
        
        return existingDetail;
      }
      
      return {
        id: Date.now() + index,
        facultyId: faculty.id,
        facultyName: faculty.name,
        course: faculty.course,
        semester,
        subjectId,
        subjectName: subject?.name || "",
        subjectCode: subject?.code || "",
        credits: subject?.credits || 3,
        modules: subject?.modules || 4,
        type: subject?.type || "Theory",
        theoryClassesPerWeek: subject?.theoryClassesPerWeek || 0,
        labPeriodsPerWeek: subject?.labPeriodsPerWeek || 0,
        totalWeeklyClasses: subject?.totalWeeklyClasses || 0,
        sections: SECTIONS,
        coordinatorStatus: "pending",
        deanStatus: "pending",
        coordinatorFeedback: "",
        deanFeedback: "",
      };
    });
    setCourseDetails(details);
  }, [allocatedSubjects, faculty]);
  
  const updateDetail = (index, field, value) => {
    const newDetails = [...courseDetails];
    const oldValue = newDetails[index][field];
    newDetails[index][field] = value;
    
    if (field === 'theoryClassesPerWeek' || field === 'labPeriodsPerWeek') {
      newDetails[index].totalWeeklyClasses = 
        (newDetails[index].theoryClassesPerWeek || 0) + 
        (newDetails[index].labPeriodsPerWeek || 0);
    }
    
    // Track if this field changed from original
    const subjectId = newDetails[index].subjectId;
    const original = originalValues[subjectId];
    if (original && original[field] !== value) {
      newDetails[index].hasChanges = true;
      newDetails[index].deanStatus = "pending"; // Reset to pending if changed
    } else if (original && original[field] === value) {
      // Check if any other fields have changes
      const hasAnyChanges = Object.keys(original).some(key => 
        original[key] !== newDetails[index][key]
      );
      newDetails[index].hasChanges = hasAnyChanges;
      newDetails[index].deanStatus = hasAnyChanges ? "pending" : "approved";
    }
    
    setCourseDetails(newDetails);
  };
  
  const handleSubmit = () => {
    // Show warning if changes detected
    const hasChanges = courseDetails.some(d => d.hasChanges);
    if (hasChanges) {
      if (!window.confirm("You've made changes to course details. This will require Dean's approval. Continue?")) {
        return;
      }
    }
    
    AppState.submitCourseDetails(faculty.id, courseDetails);
    onComplete();
  };
  
  // Helper to check if a field has changed
  const hasFieldChanged = (subjectId, field, currentValue) => {
    const original = originalValues[subjectId];
    return original && original[field] !== currentValue;
  };
  
  return (
    <Card>
      <Title level={4}>Detailed Course Information Form</Title>
      <p style={{ color: C.accent.green, fontSize: 13, marginBottom: 20 }}>
        Your subject preferences have been approved! Please review the course details for {faculty.course}.
      </p>
      
      {/* Show auto-approve notice */}
      <div style={{ 
        padding: 12, 
        background: C.accent.blueBg, 
        borderRadius: 8, 
        marginBottom: 20,
        borderLeft: `4px solid ${C.accent.blue}`
      }}>
        <p style={{ color: C.text.secondary, fontSize: 13, margin: 0 }}>
          ℹ️ <strong>Auto-Approval Notice:</strong> If you don't make any changes, courses will be automatically approved. 
          Any changes will require Dean's approval.
        </p>
      </div>
      
      {courseDetails.map((detail, index) => {
        const hasChanges = hasFieldChanged(detail.subjectId, 'credits', detail.credits) ||
                          hasFieldChanged(detail.subjectId, 'modules', detail.modules) ||
                          hasFieldChanged(detail.subjectId, 'theoryClassesPerWeek', detail.theoryClassesPerWeek) ||
                          hasFieldChanged(detail.subjectId, 'labPeriodsPerWeek', detail.labPeriodsPerWeek);
        
        return (
          <div key={index} style={{ 
            marginBottom: 24, 
            padding: 16, 
            background: C.cardHover, 
            borderRadius: 12,
            border: hasChanges ? `2px solid ${C.accent.gold}` : 'none'
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <h5 style={{ color: C.accent.blue, fontWeight: 600, fontSize: 16 }}>{detail.subjectName}</h5>
              {hasChanges && (
                <Badge variant="warning">Changes Detected - Pending Approval</Badge>
              )}
              {!hasChanges && detail.deanStatus === "approved" && (
                <Badge variant="success">Auto-Approved</Badge>
              )}
            </div>
            
            <p style={{ color: C.text.tertiary, fontSize: 12, marginBottom: 12 }}>Semester {detail.semester} | Code: {detail.subjectCode}</p>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 12 }}>
              <div>
                <Input 
                  label="Credits" 
                  type="number" 
                  min="1" 
                  max="5" 
                  value={detail.credits} 
                  onChange={e => updateDetail(index, "credits", parseInt(e.target.value))}
                />
                {hasFieldChanged(detail.subjectId, 'credits', detail.credits) && (
                  <p style={{ color: C.accent.gold, fontSize: 11, marginTop: 4 }}>
                    Changed from {originalValues[detail.subjectId]?.credits}
                  </p>
                )}
              </div>
              
              <div>
                <Input 
                  label="Modules" 
                  type="number" 
                  min="1" 
                  max="10" 
                  value={detail.modules} 
                  onChange={e => updateDetail(index, "modules", parseInt(e.target.value))}
                />
                {hasFieldChanged(detail.subjectId, 'modules', detail.modules) && (
                  <p style={{ color: C.accent.gold, fontSize: 11, marginTop: 4 }}>
                    Changed from {originalValues[detail.subjectId]?.modules}
                  </p>
                )}
              </div>
              
              <Select 
                label="Type" 
                value={detail.type} 
                onChange={e => updateDetail(index, "type", e.target.value)}
                options={[
                  { value: "Theory", label: "Theory" },
                  { value: "Lab", label: "Lab" },
                  { value: "Both", label: "Both" }
                ]}
              />
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 12 }}>
              <div>
                <Input 
                  label="Theory Classes/Week" 
                  type="number" 
                  min="0" 
                  max="5" 
                  value={detail.theoryClassesPerWeek} 
                  onChange={e => updateDetail(index, "theoryClassesPerWeek", parseInt(e.target.value))}
                />
                {hasFieldChanged(detail.subjectId, 'theoryClassesPerWeek', detail.theoryClassesPerWeek) && (
                  <p style={{ color: C.accent.gold, fontSize: 11, marginTop: 4 }}>
                    Changed from {originalValues[detail.subjectId]?.theoryClassesPerWeek}
                  </p>
                )}
              </div>
              
              <div>
                <Input 
                  label="Lab Periods/Week" 
                  type="number" 
                  min="0" 
                  max="10" 
                  value={detail.labPeriodsPerWeek} 
                  onChange={e => updateDetail(index, "labPeriodsPerWeek", parseInt(e.target.value))}
                />
                {hasFieldChanged(detail.subjectId, 'labPeriodsPerWeek', detail.labPeriodsPerWeek) && (
                  <p style={{ color: C.accent.gold, fontSize: 11, marginTop: 4 }}>
                    Changed from {originalValues[detail.subjectId]?.labPeriodsPerWeek}
                  </p>
                )}
              </div>
            </div>
            
            <div style={{ padding: 12, background: C.surface, borderRadius: 8 }}>
              <p style={{ color: C.accent.gold, fontSize: 13 }}>Total Weekly Classes per Section: {detail.totalWeeklyClasses}</p>
              <p style={{ color: C.accent.gold, fontSize: 13 }}>Total Sessions (3 sections): {detail.totalWeeklyClasses * 3}</p>
            </div>
          </div>
        );
      })}
      
      <Button onClick={handleSubmit} variant="success" fullWidth size="lg">
        Submit Detailed Course Information
      </Button>
    </Card>
  );
}

// Add Badge component if not imported
const Badge = ({ children, variant }) => {
  const colors = {
    warning: { background: C.accent.goldBg, color: C.accent.gold },
    success: { background: C.accent.greenBg, color: C.accent.green },
    info: { background: C.accent.blueBg, color: C.accent.blue }
  };
  
  const style = colors[variant] || colors.info;
  
  return (
    <span style={{
      padding: '4px 8px',
      borderRadius: 12,
      fontSize: 11,
      fontWeight: 600,
      background: style.background,
      color: style.color
    }}>
      {children}
    </span>
  );
};