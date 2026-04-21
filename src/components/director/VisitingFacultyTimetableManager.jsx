// // src/components/director/VisitingFacultyTimetableManager.jsx
// import { useState, useEffect } from "react";
// import { Card, Title, Button, Select, Badge } from "../common";
// import { AppState } from "../../AppState";
// import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "../../utils/storage";
// import { generateTimeSlots } from "../../utils/timetableUtils";
// import { C } from "../../styles/theme";

// export function VisitingFacultyTimetableManager({ onRefresh }) {
//   const [visitingFaculty, setVisitingFaculty] = useState([]);
//   const [selectedFaculty, setSelectedFaculty] = useState("");
//   const [selectedFacultyData, setSelectedFacultyData] = useState(null);
//   const [timetable, setTimetable] = useState([]);
//   const [config, setConfig] = useState(AppState.timetableConfig);
//   const [timeSlots, setTimeSlots] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [selectedDay, setSelectedDay] = useState("");
//   const [selectedTime, setSelectedTime] = useState("");
//   const [selectedSubject, setSelectedSubject] = useState("");
//   const [selectedRoom, setSelectedRoom] = useState("");
//   const [editMode, setEditMode] = useState(false);
//   const [editingSlot, setEditingSlot] = useState(null);
//   const [rooms, setRooms] = useState([]);

//   useEffect(() => {
//     loadData();
//     generateSlots();
//   }, [config]);

//   useEffect(() => {
//     if (selectedFaculty) {
//       loadTimetable();
//       loadSubjectsForFaculty();
//     }
//   }, [selectedFaculty]);

//   const loadData = () => {
//     // Get all faculty from AppState
//     const allFaculty = AppState.faculty || [];
//     console.log("All faculty in AppState:", allFaculty);
    
//     // Filter for visiting faculty - check both designation and name
//     const visiting = allFaculty.filter(f => 
//       f.designation === "Visiting Professor" || 
//       f.designation?.toLowerCase().includes("visiting") ||
//       f.id === 14 ||
//       f.name === "Dr. James Wilson"
//     );
    
//     console.log("Filtered visiting faculty:", visiting);
//     setVisitingFaculty(visiting);
    
//     // Get rooms
//     const allRooms = AppState.rooms || [];
//     setRooms(allRooms);
//   };

//   const generateSlots = () => {
//     const slots = generateTimeSlots(config);
//     const validSlots = slots.filter(s => !s.isLunch && !s.isBreak);
//     setTimeSlots(validSlots);
//   };

//   const loadTimetable = () => {
//     const savedTimetable = loadFromStorage(STORAGE_KEYS.VISITING_FACULTY_TIMETABLE, {});
//     const facultyTimetable = savedTimetable[selectedFaculty] || [];
//     setTimetable(facultyTimetable);
//   };

//   const loadSubjectsForFaculty = () => {
//     const faculty = visitingFaculty.find(f => f.id === parseInt(selectedFaculty));
//     setSelectedFacultyData(faculty);
    
//     if (faculty) {
//       const allSubjects = AppState.subjects || [];
//       // Get subjects for the faculty's course
//       const courseSubjects = allSubjects.filter(s => 
//         s.course === faculty.course && 
//         s.approvalStatus === "approved"
//       );
//       console.log("Subjects for course", faculty.course, ":", courseSubjects);
//       setSubjects(courseSubjects);
//     }
//   };

//   const saveTimetable = (updatedTimetable) => {
//     const allTimetables = loadFromStorage(STORAGE_KEYS.VISITING_FACULTY_TIMETABLE, {});
//     allTimetables[selectedFaculty] = updatedTimetable;
//     saveToStorage(STORAGE_KEYS.VISITING_FACULTY_TIMETABLE, allTimetables);
//     window.dispatchEvent(new Event('storage'));
//   };

//   const handleAddSlot = () => {
//     if (!selectedDay || !selectedTime || !selectedSubject) {
//       alert("Please fill all required fields");
//       return;
//     }

//     const selectedSubjectData = subjects.find(s => s.id === selectedSubject);
//     const newSlot = {
//       id: Date.now(),
//       day: selectedDay,
//       time: selectedTime,
//       subject: selectedSubjectData?.name,
//       subjectId: selectedSubject,
//       subjectCode: selectedSubjectData?.code,
//       room: selectedRoom || "TBA",
//       type: selectedSubjectData?.type || "Theory",
//       color: C.accent.green
//     };

//     // Check for conflicts
//     const conflict = timetable.find(slot => slot.day === selectedDay && slot.time === selectedTime);
//     if (conflict && !editMode) {
//       alert(`Conflict! ${conflict.day} at ${conflict.time} already has ${conflict.subject}`);
//       return;
//     }

//     let updatedTimetable;
//     if (editMode && editingSlot) {
//       updatedTimetable = timetable.map(slot => 
//         slot.id === editingSlot.id ? { ...newSlot, id: slot.id } : slot
//       );
//       setEditMode(false);
//       setEditingSlot(null);
//     } else {
//       updatedTimetable = [...timetable, newSlot];
//     }

//     setTimetable(updatedTimetable);
//     saveTimetable(updatedTimetable);
    
//     // Reset form
//     setSelectedDay("");
//     setSelectedTime("");
//     setSelectedSubject("");
//     setSelectedRoom("");
    
//     alert(editMode ? "Slot updated successfully!" : "Slot added successfully!");
//   };

//   const handleEditSlot = (slot) => {
//     setEditMode(true);
//     setEditingSlot(slot);
//     setSelectedDay(slot.day);
//     setSelectedTime(slot.time);
//     setSelectedSubject(slot.subjectId);
//     setSelectedRoom(slot.room);
//   };

//   const handleDeleteSlot = (slotId) => {
//     if (confirm("Are you sure you want to delete this slot?")) {
//       const updatedTimetable = timetable.filter(slot => slot.id !== slotId);
//       setTimetable(updatedTimetable);
//       saveTimetable(updatedTimetable);
//       alert("Slot deleted successfully!");
//     }
//   };

//   const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

//   // If no visiting faculty found, show add button
//   const handleAddVisitingFaculty = () => {
//     // Add visiting faculty to AppState.faculty
//     const newVisitingFaculty = {
//       id: 14,
//       facultyId: "FAC007",
//       name: "Dr. James Wilson",
//       avatar: "JW",
//       dept: "CSE",
//       designation: "Visiting Professor",
//       specialization: "Cloud Computing, Distributed Systems",
//       course: "BTech",
//       maxHours: 8,
//       assignedHours: 0,
//       remainingHours: 8,
//       preferences: [],
//       color: "#10b981",
//       email: "visiting@university.edu"
//     };
    
//     const currentFaculty = [...AppState.faculty];
//     if (!currentFaculty.find(f => f.id === 14)) {
//       currentFaculty.push(newVisitingFaculty);
//       AppState.faculty = currentFaculty;
//       saveToStorage(STORAGE_KEYS.FACULTY, currentFaculty);
//       loadData();
//       alert("Visiting faculty added! Please refresh the page.");
//       window.location.reload();
//     } else {
//       alert("Visiting faculty already exists!");
//     }
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <Title>Visiting Faculty Timetable Manager</Title>
      
//       <Card>
//         <Title level={4}>Select Visiting Faculty</Title>
//         {visitingFaculty.length === 0 ? (
//           <div>
//             <p style={{ color: C.accent.red, marginBottom: 16 }}>
//               No visiting faculty found. Please add a visiting faculty member first.
//             </p>
//             <Button onClick={handleAddVisitingFaculty} variant="primary">
//               + Add Visiting Faculty
//             </Button>
//           </div>
//         ) : (
//           <Select
//             label="Select Faculty"
//             value={selectedFaculty}
//             onChange={e => setSelectedFaculty(e.target.value)}
//             options={[
//               { value: "", label: "-- Select Visiting Faculty --" },
//               ...visitingFaculty.map(f => ({ 
//                 value: f.id, 
//                 label: `${f.name} (${f.designation}) - ${f.course}` 
//               }))
//             ]}
//           />
//         )}
//       </Card>

//       {selectedFaculty && selectedFacultyData && (
//         <>
//           <Card>
//             <Title level={4}>Add/Edit Timetable Slot for {selectedFacultyData.name}</Title>
//             <div style={{ marginBottom: 16, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
//               <p style={{ margin: 0 }}>
//                 <strong>Course:</strong> {selectedFacultyData.course} | 
//                 <strong> Max Hours/Week:</strong> {selectedFacultyData.maxHours} hours
//               </p>
//               <p style={{ margin: 0, fontSize: 12, color: C.text.tertiary }}>
//                 Currently assigned: {timetable.length} slots | 
//                 Total hours: {timetable.reduce((sum, slot) => {
//                   const subject = subjects.find(s => s.id === slot.subjectId);
//                   return sum + (subject?.totalWeeklyClasses || 0);
//                 }, 0)} / {selectedFacultyData.maxHours} hours
//               </p>
//             </div>
            
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
//               <Select
//                 label="Day"
//                 value={selectedDay}
//                 onChange={e => setSelectedDay(e.target.value)}
//                 options={[
//                   { value: "", label: "-- Select Day --" },
//                   ...days.map(d => ({ value: d, label: d }))
//                 ]}
//               />
              
//               <Select
//                 label="Time Slot"
//                 value={selectedTime}
//                 onChange={e => setSelectedTime(e.target.value)}
//                 options={[
//                   { value: "", label: "-- Select Time --" },
//                   ...timeSlots.map(slot => ({ 
//                     value: slot.time, 
//                     label: `${slot.period}: ${slot.time} - ${slot.endTime}` 
//                   }))
//                 ]}
//               />
              
//               <Select
//                 label="Subject"
//                 value={selectedSubject}
//                 onChange={e => setSelectedSubject(e.target.value)}
//                 options={[
//                   { value: "", label: "-- Select Subject --" },
//                   ...subjects.map(s => ({ 
//                     value: s.id, 
//                     label: `${s.name} (${s.code}) - ${s.subjectType} - ${s.totalWeeklyClasses}h/wk` 
//                   }))
//                 ]}
//               />
              
//               <Select
//                 label="Room"
//                 value={selectedRoom}
//                 onChange={e => setSelectedRoom(e.target.value)}
//                 options={[
//                   { value: "", label: "-- Select Room --" },
//                   ...rooms.map(r => ({ value: r.name, label: `${r.name} (${r.type}, Capacity: ${r.capacity})` }))
//                 ]}
//               />
//             </div>
            
//             <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
//               <Button onClick={handleAddSlot} variant="success" fullWidth>
//                 {editMode ? "Update Slot" : "Add Slot"}
//               </Button>
//               {editMode && (
//                 <Button onClick={() => {
//                   setEditMode(false);
//                   setEditingSlot(null);
//                   setSelectedDay("");
//                   setSelectedTime("");
//                   setSelectedSubject("");
//                   setSelectedRoom("");
//                 }} variant="secondary" fullWidth>
//                   Cancel Edit
//                 </Button>
//               )}
//             </div>
//           </Card>

//           <Card>
//             <Title level={4}>Current Timetable for {selectedFacultyData.name}</Title>
//             {timetable.length === 0 ? (
//               <p style={{ textAlign: "center", padding: 40, color: C.text.tertiary }}>
//                 No timetable slots added yet. Use the form above to add slots.
//               </p>
//             ) : (
//               <div style={{ overflowX: "auto" }}>
//                 <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                   <thead>
//                     <tr>
//                       <th style={{ padding: 12, textAlign: "left", borderBottom: `2px solid ${C.border}` }}>Day</th>
//                       <th style={{ padding: 12, textAlign: "left", borderBottom: `2px solid ${C.border}` }}>Time</th>
//                       <th style={{ padding: 12, textAlign: "left", borderBottom: `2px solid ${C.border}` }}>Subject</th>
//                       <th style={{ padding: 12, textAlign: "left", borderBottom: `2px solid ${C.border}` }}>Room</th>
//                       <th style={{ padding: 12, textAlign: "left", borderBottom: `2px solid ${C.border}` }}>Type</th>
//                       <th style={{ padding: 12, textAlign: "left", borderBottom: `2px solid ${C.border}` }}>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {timetable.sort((a, b) => {
//                       const dayOrder = days.indexOf(a.day) - days.indexOf(b.day);
//                       if (dayOrder !== 0) return dayOrder;
//                       return a.time.localeCompare(b.time);
//                     }).map(slot => {
//                       const subject = subjects.find(s => s.id === slot.subjectId);
//                       return (
//                         <tr key={slot.id} style={{ borderBottom: `1px solid ${C.border}` }}>
//                           <td style={{ padding: 12 }}>{slot.day}</td>
//                           <td style={{ padding: 12 }}>{slot.time}</td>
//                           <td style={{ padding: 12 }}>
//                             {slot.subject} ({slot.subjectCode})
//                             <br />
//                             <span style={{ fontSize: 11, color: C.text.tertiary }}>
//                               {subject?.totalWeeklyClasses}h/wk
//                             </span>
//                           </td>
//                           <td style={{ padding: 12 }}>{slot.room}</td>
//                           <td style={{ padding: 12 }}>
//                             <Badge variant={slot.type === "lab" ? "success" : "primary"}>
//                               {slot.type}
//                             </Badge>
//                           </td>
//                           <td style={{ padding: 12 }}>
//                             <Button onClick={() => handleEditSlot(slot)} variant="primary" size="sm" style={{ marginRight: 8 }}>
//                               Edit
//                             </Button>
//                             <Button onClick={() => handleDeleteSlot(slot.id)} variant="danger" size="sm">
//                               Delete
//                             </Button>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </Card>
//         </>
//       )}
//     </div>
//   );
// }

// src/components/director/VisitingFacultyTimetableManager.jsx
import { useState, useEffect } from "react";
import { Card, Title, Button, Select, Badge, Input } from "../common";
import { AppState } from "../../AppState";
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "../../utils/storage";
import { generateTimeSlots } from "../../utils/timetableUtils";
import { C } from "../../styles/theme";

export function VisitingFacultyTimetableManager({ onRefresh }) {
  const [visitingFaculty, setVisitingFaculty] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedFacultyData, setSelectedFacultyData] = useState(null);
  const [timetable, setTimetable] = useState([]);
  const [config, setConfig] = useState(AppState.timetableConfig);
  const [timeSlots, setTimeSlots] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    loadData();
    generateSlots();
  }, [config]);

  useEffect(() => {
    if (selectedFaculty) {
      loadTimetable();
      loadSubjectsForFaculty();
    }
  }, [selectedFaculty]);

  // Get day of week from selected date
  useEffect(() => {
    if (selectedDate) {
      const date = new Date(selectedDate);
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const dayName = days[date.getDay()];
      setSelectedDay(dayName);
    }
  }, [selectedDate]);

  const loadData = () => {
    // Get all faculty from AppState
    const allFaculty = AppState.faculty || [];
    console.log("All faculty in AppState:", allFaculty);
    
    // Filter for visiting faculty - check both designation and name
    const visiting = allFaculty.filter(f => 
      f.designation === "Visiting Professor" || 
      f.designation?.toLowerCase().includes("visiting") ||
      f.id === 14 ||
      f.name === "Dr. James Wilson"
    );
    
    console.log("Filtered visiting faculty:", visiting);
    setVisitingFaculty(visiting);
    
    // Get rooms
    const allRooms = AppState.rooms || [];
    setRooms(allRooms);
  };

  const generateSlots = () => {
    const slots = generateTimeSlots(config);
    const validSlots = slots.filter(s => !s.isLunch && !s.isBreak);
    setTimeSlots(validSlots);
  };

  const loadTimetable = () => {
    const savedTimetable = loadFromStorage(STORAGE_KEYS.VISITING_FACULTY_TIMETABLE, {});
    const facultyTimetable = savedTimetable[selectedFaculty] || [];
    setTimetable(facultyTimetable);
  };

  const loadSubjectsForFaculty = () => {
    const faculty = visitingFaculty.find(f => f.id === parseInt(selectedFaculty));
    setSelectedFacultyData(faculty);
    
    if (faculty) {
      const allSubjects = AppState.subjects || [];
      // Get subjects for the faculty's course
      const courseSubjects = allSubjects.filter(s => 
        s.course === faculty.course && 
        s.approvalStatus === "approved"
      );
      console.log("Subjects for course", faculty.course, ":", courseSubjects);
      setSubjects(courseSubjects);
    }
  };

  const saveTimetable = (updatedTimetable) => {
    const allTimetables = loadFromStorage(STORAGE_KEYS.VISITING_FACULTY_TIMETABLE, {});
    allTimetables[selectedFaculty] = updatedTimetable;
    saveToStorage(STORAGE_KEYS.VISITING_FACULTY_TIMETABLE, allTimetables);
    window.dispatchEvent(new Event('storage'));
  };

  const handleAddSlot = () => {
    if (!selectedDate || !selectedTime || !selectedSubject) {
      alert("Please fill all required fields (Date, Time, Subject)");
      return;
    }

    const selectedSubjectData = subjects.find(s => s.id === selectedSubject);
    const dateObj = new Date(selectedDate);
    
    const newSlot = {
      id: Date.now(),
      date: selectedDate,
      formattedDate: dateObj.toLocaleDateString(),
      day: selectedDay,
      time: selectedTime,
      subject: selectedSubjectData?.name,
      subjectId: selectedSubject,
      subjectCode: selectedSubjectData?.code,
      room: selectedRoom || "TBA",
      type: selectedSubjectData?.type || "Theory",
      color: C.accent.green,
      duration: selectedSubjectData?.totalWeeklyClasses || 1
    };

    // Check for conflicts on same date and time
    const conflict = timetable.find(slot => slot.date === selectedDate && slot.time === selectedTime);
    if (conflict && !editMode) {
      alert(`Conflict! On ${selectedDate} at ${selectedTime} already has ${conflict.subject}`);
      return;
    }

    let updatedTimetable;
    if (editMode && editingSlot) {
      updatedTimetable = timetable.map(slot => 
        slot.id === editingSlot.id ? { ...newSlot, id: slot.id } : slot
      );
      setEditMode(false);
      setEditingSlot(null);
    } else {
      updatedTimetable = [...timetable, newSlot];
    }

    setTimetable(updatedTimetable);
    saveTimetable(updatedTimetable);
    
    // Reset form
    setSelectedDate("");
    setSelectedDay("");
    setSelectedTime("");
    setSelectedSubject("");
    setSelectedRoom("");
    
    alert(editMode ? "Slot updated successfully!" : "Slot added successfully!");
  };

  const handleEditSlot = (slot) => {
    setEditMode(true);
    setEditingSlot(slot);
    setSelectedDate(slot.date);
    setSelectedDay(slot.day);
    setSelectedTime(slot.time);
    setSelectedSubject(slot.subjectId);
    setSelectedRoom(slot.room);
  };

  const handleDeleteSlot = (slotId) => {
    if (confirm("Are you sure you want to delete this slot?")) {
      const updatedTimetable = timetable.filter(slot => slot.id !== slotId);
      setTimetable(updatedTimetable);
      saveTimetable(updatedTimetable);
      alert("Slot deleted successfully!");
    }
  };

  // Get today's date in YYYY-MM-DD format for min date
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // If no visiting faculty found, show add button
  const handleAddVisitingFaculty = () => {
    // Add visiting faculty to AppState.faculty
    const newVisitingFaculty = {
      id: 14,
      facultyId: "FAC007",
      name: "Dr. James Wilson",
      avatar: "JW",
      dept: "CSE",
      designation: "Visiting Professor",
      specialization: "Cloud Computing, Distributed Systems",
      course: "BTech",
      maxHours: 8,
      assignedHours: 0,
      remainingHours: 8,
      preferences: [],
      color: "#10b981",
      email: "visiting@university.edu"
    };
    
    const currentFaculty = [...AppState.faculty];
    if (!currentFaculty.find(f => f.id === 14)) {
      currentFaculty.push(newVisitingFaculty);
      AppState.faculty = currentFaculty;
      saveToStorage(STORAGE_KEYS.FACULTY, currentFaculty);
      loadData();
      alert("Visiting faculty added! Please refresh the page.");
      window.location.reload();
    } else {
      alert("Visiting faculty already exists!");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Title>Visiting Faculty Timetable Manager</Title>
      
      <Card>
        <Title level={4}>Select Visiting Faculty</Title>
        {visitingFaculty.length === 0 ? (
          <div>
            <p style={{ color: C.accent.red, marginBottom: 16 }}>
              No visiting faculty found. Please add a visiting faculty member first.
            </p>
            <Button onClick={handleAddVisitingFaculty} variant="primary">
              + Add Visiting Faculty
            </Button>
          </div>
        ) : (
          <Select
            label="Select Faculty"
            value={selectedFaculty}
            onChange={e => setSelectedFaculty(e.target.value)}
            options={[
              { value: "", label: "-- Select Visiting Faculty --" },
              ...visitingFaculty.map(f => ({ 
                value: f.id, 
                label: `${f.name} (${f.designation}) - ${f.course}` 
              }))
            ]}
          />
        )}
      </Card>

      {selectedFaculty && selectedFacultyData && (
        <>
          <Card>
            <Title level={4}>Add/Edit Timetable Slot for {selectedFacultyData.name}</Title>
            <div style={{ marginBottom: 16, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
              <p style={{ margin: 0 }}>
                <strong>Course:</strong> {selectedFacultyData.course} | 
                <strong> Max Hours/Week:</strong> {selectedFacultyData.maxHours} hours
              </p>
              <p style={{ margin: 0, fontSize: 12, color: C.text.tertiary }}>
                Currently assigned: {timetable.length} slots | 
                Total hours: {timetable.reduce((sum, slot) => sum + (slot.duration || 1), 0)} / {selectedFacultyData.maxHours} hours
              </p>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
              <Input
                label="Date"
                type="date"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                min={getTodayDate()}
                required
              />
              
              <Input
                label="Day"
                value={selectedDay}
                disabled
                placeholder="Day will be auto-filled from date"
              />
              
              <Select
                label="Time Slot"
                value={selectedTime}
                onChange={e => setSelectedTime(e.target.value)}
                options={[
                  { value: "", label: "-- Select Time --" },
                  ...timeSlots.map(slot => ({ 
                    value: slot.time, 
                    label: `${slot.period}: ${slot.time} - ${slot.endTime}` 
                  }))
                ]}
              />
              
              <Select
                label="Subject"
                value={selectedSubject}
                onChange={e => setSelectedSubject(e.target.value)}
                options={[
                  { value: "", label: "-- Select Subject --" },
                  ...subjects.map(s => ({ 
                    value: s.id, 
                    label: `${s.name} (${s.code}) - ${s.subjectType} - ${s.totalWeeklyClasses}h/wk` 
                  }))
                ]}
              />
              
              <Select
                label="Room"
                value={selectedRoom}
                onChange={e => setSelectedRoom(e.target.value)}
                options={[
                  { value: "", label: "-- Select Room --" },
                  ...rooms.map(r => ({ value: r.name, label: `${r.name} (${r.type}, Capacity: ${r.capacity})` }))
                ]}
              />
            </div>
            
            <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
              <Button onClick={handleAddSlot} variant="success" fullWidth>
                {editMode ? "Update Slot" : "Add Slot"}
              </Button>
              {editMode && (
                <Button onClick={() => {
                  setEditMode(false);
                  setEditingSlot(null);
                  setSelectedDate("");
                  setSelectedDay("");
                  setSelectedTime("");
                  setSelectedSubject("");
                  setSelectedRoom("");
                }} variant="secondary" fullWidth>
                  Cancel Edit
                </Button>
              )}
            </div>
          </Card>

          <Card>
            <Title level={4}>Current Timetable for {selectedFacultyData.name}</Title>
            {timetable.length === 0 ? (
              <p style={{ textAlign: "center", padding: 40, color: C.text.tertiary }}>
                No timetable slots added yet. Use the form above to add slots.
              </p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={{ padding: 12, textAlign: "left", borderBottom: `2px solid ${C.border}` }}>Date</th>
                      <th style={{ padding: 12, textAlign: "left", borderBottom: `2px solid ${C.border}` }}>Day</th>
                      <th style={{ padding: 12, textAlign: "left", borderBottom: `2px solid ${C.border}` }}>Time</th>
                      <th style={{ padding: 12, textAlign: "left", borderBottom: `2px solid ${C.border}` }}>Subject</th>
                      <th style={{ padding: 12, textAlign: "left", borderBottom: `2px solid ${C.border}` }}>Room</th>
                      <th style={{ padding: 12, textAlign: "left", borderBottom: `2px solid ${C.border}` }}>Type</th>
                      <th style={{ padding: 12, textAlign: "left", borderBottom: `2px solid ${C.border}` }}>Duration</th>
                      <th style={{ padding: 12, textAlign: "left", borderBottom: `2px solid ${C.border}` }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timetable.sort((a, b) => {
                      const dateCompare = new Date(a.date) - new Date(b.date);
                      if (dateCompare !== 0) return dateCompare;
                      return a.time.localeCompare(b.time);
                    }).map(slot => {
                      const subject = subjects.find(s => s.id === slot.subjectId);
                      return (
                        <tr key={slot.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ padding: 12 }}>{slot.formattedDate || new Date(slot.date).toLocaleDateString()}</td>
                          <td style={{ padding: 12 }}>{slot.day}</td>
                          <td style={{ padding: 12 }}>{slot.time}</td>
                          <td style={{ padding: 12 }}>
                            {slot.subject} ({slot.subjectCode})
                            <br />
                            <span style={{ fontSize: 11, color: C.text.tertiary }}>
                              {subject?.subjectType} - {subject?.examType}
                            </span>
                           </td>
                          <td style={{ padding: 12 }}>{slot.room}</td>
                          <td style={{ padding: 12 }}>
                            <Badge variant={slot.type === "lab" ? "success" : "primary"}>
                              {slot.type}
                            </Badge>
                          </td>
                          <td style={{ padding: 12 }}>
                            <Badge variant="warning">{slot.duration || 1} hour(s)</Badge>
                          </td>
                          <td style={{ padding: 12 }}>
                            <Button onClick={() => handleEditSlot(slot)} variant="primary" size="sm" style={{ marginRight: 8 }}>
                              Edit
                            </Button>
                            <Button onClick={() => handleDeleteSlot(slot.id)} variant="danger" size="sm">
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  );
}