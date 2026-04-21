// // src/components/faculty/LeaveRequestForm.jsx
// import { useState, useEffect } from "react";
// import { Card, Title, Button, Input, Select, Badge } from "../common";
// import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "../../utils/storage";
// import { AppState } from "../../AppState";
// import { C } from "../../styles/theme";

// export function LeaveRequestForm({ faculty, onComplete }) {
//   const [formData, setFormData] = useState({
//     leaveType: "planned",
//     startDate: "",
//     endDate: "",
//     reason: "",
//     substituteSuggestion: ""
//   });
//   const [availableFaculty, setAvailableFaculty] = useState([]);
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     loadAvailableFaculty();
//   }, []);

//   const loadAvailableFaculty = () => {
//     // Get all faculty from same department/course
//     const allFaculty = AppState.faculty || [];
//     const sameCourseFaculty = allFaculty.filter(f => 
//       f.course === faculty.course && f.id !== faculty.id
//     );
//     setAvailableFaculty(sameCourseFaculty);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {
//     if (!formData.startDate || !formData.endDate || !formData.reason) {
//       alert("Please fill all required fields");
//       return;
//     }

//     const leaveRequest = {
//       id: Date.now(),
//       facultyId: faculty.id,
//       facultyName: faculty.name,
//       facultyDesignation: faculty.designation,
//       facultyCourse: faculty.course,
//       facultyEmail: faculty.email,
//       leaveType: formData.leaveType,
//       startDate: formData.startDate,
//       endDate: formData.endDate,
//       reason: formData.reason,
//       substituteSuggestion: formData.substituteSuggestion,
//       substituteName: formData.substituteSuggestion ? 
//         availableFaculty.find(f => f.id === parseInt(formData.substituteSuggestion))?.name : null,
//       status: "pending",
//       directorStatus: "pending",
//       coordinatorStatus: "pending",
//       requestedAt: new Date().toISOString(),
//       directorApprovedAt: null,
//       coordinatorApprovedAt: null,
//       directorFeedback: null,
//       coordinatorFeedback: null
//     };

//     const allRequests = loadFromStorage(STORAGE_KEYS.LEAVE_REQUESTS, []);
//     allRequests.push(leaveRequest);
//     saveToStorage(STORAGE_KEYS.LEAVE_REQUESTS, allRequests);
//     window.dispatchEvent(new Event('storage'));
    
//     alert("Leave request submitted successfully! Waiting for approval.");
//     onComplete();
//   };

//   const leaveTypes = [
//     { value: "planned", label: "Planned Leave" },
//     { value: "emergency", label: "Emergency Leave" },
//     { value: "medical", label: "Medical Leave" },
//     { value: "conference", label: "Conference/Seminar" }
//   ];

//   return (
//     <Card>
//       <Title level={4}>Request Leave</Title>
      
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
//         <Select
//           label="Leave Type"
//           name="leaveType"
//           value={formData.leaveType}
//           onChange={handleChange}
//           options={leaveTypes}
//         />
        
//         <Input
//           label="Start Date"
//           type="date"
//           name="startDate"
//           value={formData.startDate}
//           onChange={handleChange}
//           required
//         />
        
//         <Input
//           label="End Date"
//           type="date"
//           name="endDate"
//           value={formData.endDate}
//           onChange={handleChange}
//           required
//         />
        
//         <Select
//           label="Suggest Substitute (Optional)"
//           name="substituteSuggestion"
//           value={formData.substituteSuggestion}
//           onChange={handleChange}
//           options={[
//             { value: "", label: "-- No suggestion --" },
//             ...availableFaculty.map(f => ({ 
//               value: f.id, 
//               label: `${f.name} (${f.designation})` 
//             }))
//           ]}
//         />
//       </div>
      
//       <Input
//         label="Reason for Leave"
//         name="reason"
//         value={formData.reason}
//         onChange={handleChange}
//         placeholder="Please provide a detailed reason..."
//         required
//       />
      
//       <div style={{ marginTop: 20, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
//         <p style={{ margin: 0, fontSize: 13 }}>
//           📋 Your request will be sent to the Director for approval. 
//           The Timetable Coordinator will also be notified.
//         </p>
//       </div>
      
//       <Button 
//         onClick={handleSubmit} 
//         variant="success" 
//         fullWidth 
//         size="lg"
//         disabled={submitting}
//         style={{ marginTop: 20 }}
//       >
//         {submitting ? "Submitting..." : "Submit Leave Request"}
//       </Button>
//     </Card>
//   );
// }

// src/components/faculty/LeaveRequestForm.jsx
import { useState, useEffect } from "react";
import { Card, Title, Button, Input, Select } from "../common";
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "../../utils/storage";
import { AppState } from "../../AppState";
import { C } from "../../styles/theme";

export function LeaveRequestForm({ faculty, onComplete }) {
  const [formData, setFormData] = useState({
    leaveType: "planned",
    startDate: "",
    endDate: "",
    reason: "",
    substituteSuggestion: ""
  });
  const [availableFaculty, setAvailableFaculty] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadAvailableFaculty();
  }, []);

  const loadAvailableFaculty = () => {
    // Get all faculty from same department/course
    const allFaculty = AppState.faculty || [];
    const sameCourseFaculty = allFaculty.filter(f => 
      f.course === faculty?.course && f.id !== faculty?.id
    );
    setAvailableFaculty(sameCourseFaculty);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.startDate || !formData.endDate || !formData.reason) {
      alert("Please fill all required fields");
      return;
    }

    const leaveRequest = {
      id: Date.now(),
      facultyId: faculty.id,
      facultyName: faculty.name,
      facultyDesignation: faculty.designation,
      facultyCourse: faculty.course,
      facultyEmail: faculty.email,
      leaveType: formData.leaveType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      reason: formData.reason,
      substituteSuggestion: formData.substituteSuggestion,
      substituteName: formData.substituteSuggestion ? 
        availableFaculty.find(f => f.id === parseInt(formData.substituteSuggestion))?.name : null,
      status: "pending",
      directorStatus: "pending",
      coordinatorStatus: "pending",
      requestedAt: new Date().toISOString(),
      directorApprovedAt: null,
      coordinatorApprovedAt: null,
      directorFeedback: null,
      coordinatorFeedback: null
    };

    const allRequests = loadFromStorage(STORAGE_KEYS.LEAVE_REQUESTS, []);
    allRequests.push(leaveRequest);
    saveToStorage(STORAGE_KEYS.LEAVE_REQUESTS, allRequests);
    window.dispatchEvent(new Event('storage'));
    
    alert("Leave request submitted successfully! Waiting for approval.");
    onComplete();
  };

  const leaveTypes = [
    { value: "planned", label: "Planned Leave" },
    { value: "emergency", label: "Emergency Leave" },
    { value: "medical", label: "Medical Leave" },
    { value: "conference", label: "Conference/Seminar" }
  ];

  if (!faculty) {
    return (
      <Card>
        <p style={{ textAlign: "center", padding: 40 }}>Loading faculty data...</p>
      </Card>
    );
  }

  return (
    <Card>
      <Title level={4}>Request Leave</Title>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
        <Select
          label="Leave Type"
          name="leaveType"
          value={formData.leaveType}
          onChange={handleChange}
          options={leaveTypes}
        />
        
        <Input
          label="Start Date"
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
        
        <Input
          label="End Date"
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
        
        <Select
          label="Suggest Substitute (Optional)"
          name="substituteSuggestion"
          value={formData.substituteSuggestion}
          onChange={handleChange}
          options={[
            { value: "", label: "-- No suggestion --" },
            ...availableFaculty.map(f => ({ 
              value: f.id, 
              label: `${f.name} (${f.designation})` 
            }))
          ]}
        />
      </div>
      
      <Input
        label="Reason for Leave"
        name="reason"
        value={formData.reason}
        onChange={handleChange}
        placeholder="Please provide a detailed reason..."
        required
      />
      
      <div style={{ marginTop: 20, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
        <p style={{ margin: 0, fontSize: 13 }}>
          📋 Your request will be sent to the Director for approval. 
          The Timetable Coordinator will also be notified.
        </p>
      </div>
      
      <Button 
        onClick={handleSubmit} 
        variant="success" 
        fullWidth 
        size="lg"
        disabled={submitting}
        style={{ marginTop: 20 }}
      >
        {submitting ? "Submitting..." : "Submit Leave Request"}
      </Button>
    </Card>
  );
}