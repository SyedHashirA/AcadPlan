// src/components/director/AddVisitingFaculty.jsx
import { useState, useEffect } from "react";
import { Card, Title, Button, Input, Select, Badge } from "../common";
import { AppState } from "../../AppState";
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from "../../utils/storage";
import { COURSES } from "../../data/mockData";
import { C } from "../../styles/theme";

export function AddVisitingFaculty({ onRefresh }) {
  const [numberOfFaculty, setNumberOfFaculty] = useState(1);
  const [facultyDetails, setFacultyDetails] = useState([]);
  const [existingFaculty, setExistingFaculty] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const designationOptions = [
    { value: "Visiting Professor", label: "Visiting Professor" },
    { value: "Visiting Associate Professor", label: "Visiting Associate Professor" },
    { value: "Visiting Assistant Professor", label: "Visiting Assistant Professor" },
    { value: "Guest Faculty", label: "Guest Faculty" },
    { value: "Industry Expert", label: "Industry Expert" }
  ];

  const specializationOptions = [
    "Artificial Intelligence", "Machine Learning", "Data Science", "Cloud Computing",
    "Cybersecurity", "Blockchain", "IoT", "Web Development", "Mobile App Development",
    "Database Systems", "Computer Networks", "Software Engineering", "Big Data Analytics",
    "DevOps", "UI/UX Design", "Digital Marketing", "Business Analytics", "Financial Management"
  ];

  useEffect(() => {
    loadExistingFaculty();
  }, []);

  const loadExistingFaculty = () => {
    const allFaculty = AppState.faculty || [];
    const visiting = allFaculty.filter(f => 
      f.designation?.toLowerCase().includes("visiting") || 
      f.designation === "Guest Faculty" ||
      f.designation === "Industry Expert" ||
      f.role === "visiting_faculty"
    );
    setExistingFaculty(visiting);
  };

  const getRandomColor = () => {
    const colors = ["#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#84cc16", "#f97316"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getInitials = (name) => {
    if (!name) return "VF";
    return name.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2);
  };

  const generateEmailFromName = (name) => {
    if (!name) return "";
    const emailName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `${emailName}@university.edu`;
  };

  const handleNumberOfFacultyChange = (value) => {
    const num = parseInt(value) || 1;
    setNumberOfFaculty(num);
    
    // Initialize faculty details array
    const details = [];
    const nextId = existingFaculty.length + 1;
    
    for (let i = 0; i < num; i++) {
      details.push({
        id: null,
        name: "",
        email: `visitingfaculty${nextId + i}@university.edu`,
        designation: "Visiting Professor",
        specialization: "",
        course: "BTech",
        maxHours: 8,
        color: getRandomColor(),
        avatar: "VF"
      });
    }
    setFacultyDetails(details);
  };

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...facultyDetails];
    updatedDetails[index][field] = value;
    
    // Auto-generate email based on name
    if (field === 'name') {
      updatedDetails[index].email = generateEmailFromName(value);
      updatedDetails[index].avatar = getInitials(value);
    }
    
    setFacultyDetails(updatedDetails);
  };

  const handleAddMore = () => {
    const newIndex = facultyDetails.length;
    const nextId = existingFaculty.length + newIndex + 1;
    const newFaculty = {
      id: null,
      name: "",
      email: `visitingfaculty${nextId}@university.edu`,
      designation: "Visiting Professor",
      specialization: "",
      course: "BTech",
      maxHours: 8,
      color: getRandomColor(),
      avatar: "VF"
    };
    setFacultyDetails([...facultyDetails, newFaculty]);
    setNumberOfFaculty(facultyDetails.length + 1);
  };

  const handleRemoveFaculty = (index) => {
    if (confirm(`Remove visiting faculty member ${index + 1}?`)) {
      const updatedDetails = facultyDetails.filter((_, i) => i !== index);
      setFacultyDetails(updatedDetails);
      setNumberOfFaculty(updatedDetails.length);
    }
  };

  const handleSubmit = async () => {
    // Validate all faculty have names
    const invalidFaculty = facultyDetails.filter(f => !f.name || !f.name.trim());
    if (invalidFaculty.length > 0) {
      alert(`Please fill names for all ${invalidFaculty.length} visiting faculty member(s)`);
      return;
    }

    setIsSubmitting(true);

    try {
      const currentFaculty = [...(AppState.faculty || [])];
      const newFacultyList = [];
      let nextId = Math.max(...currentFaculty.map(f => f.id), 0) + 1;

      for (const faculty of facultyDetails) {
        const newFaculty = {
          id: nextId++,
          facultyId: `VFAC${String(nextId - 1).padStart(3, '0')}`,
          name: faculty.name,
          avatar: faculty.avatar || getInitials(faculty.name),
          dept: "CSE",
          designation: faculty.designation,
          specialization: faculty.specialization || "Computer Science",
          course: faculty.course,
          maxHours: parseInt(faculty.maxHours),
          assignedHours: 0,
          remainingHours: parseInt(faculty.maxHours),
          preferences: [],
          color: faculty.color,
          email: faculty.email,
          password: "visiting123",
          passwordChanged: false,
          role: "visiting_faculty",
          createdAt: new Date().toISOString()
        };
        newFacultyList.push(newFaculty);
        currentFaculty.push(newFaculty);
      }

      // Update AppState and localStorage
      AppState.faculty = currentFaculty;
      saveToStorage(STORAGE_KEYS.FACULTY, currentFaculty);
      
      // Save to visiting faculty specific storage
      const visitingFacultyList = loadFromStorage(STORAGE_KEYS.VISITING_FACULTY_LIST, []);
      const updatedVisitingList = [...visitingFacultyList, ...newFacultyList];
      saveToStorage(STORAGE_KEYS.VISITING_FACULTY_LIST, updatedVisitingList);
      
      // Also save to mock users for login page display
      const mockUsers = loadFromStorage(STORAGE_KEYS.MOCK_USERS, []);
      newFacultyList.forEach(vf => {
        if (!mockUsers.some(u => u.email === vf.email)) {
          mockUsers.push({
            id: vf.id,
            email: vf.email,
            password: "visiting123",
            role: "visiting_faculty",
            name: vf.name,
            avatar: vf.avatar,
            designation: vf.designation,
            course: vf.course,
            passwordChanged: false
          });
        }
      });
      saveToStorage(STORAGE_KEYS.MOCK_USERS, mockUsers);
      
      window.dispatchEvent(new Event('storage'));
      
      // Show success message with credentials summary
      const credentialsList = newFacultyList.map(f => `${f.name}: ${f.email} / visiting123`).join('\n');
      alert(`✅ ${newFacultyList.length} visiting faculty member(s) added successfully!\n\nCredentials:\n${credentialsList}\n\nDefault password for all: visiting123`);
      
      // Reset form
      setFacultyDetails([]);
      setNumberOfFaculty(1);
      setShowPreview(false);
      loadExistingFaculty();
      
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error("Error adding visiting faculty:", error);
      alert("Failed to add visiting faculty. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (confirm("Reset all entered data?")) {
      setFacultyDetails([]);
      setNumberOfFaculty(1);
      setShowPreview(false);
    }
  };

  const getTotalHours = () => {
    return facultyDetails.reduce((sum, f) => sum + (parseInt(f.maxHours) || 0), 0);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Title>Add Visiting Faculty</Title>
      
      <Card>
        <Title level={4}>Bulk Add Visiting Faculty</Title>
        
        <div style={{ marginBottom: 20, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
          <p style={{ margin: 0, color: C.accent.blue }}>
            💡 <strong>Tip:</strong> You can add multiple visiting faculty members at once. 
            Their email IDs will be auto-generated based on their names.
            Default password for all: <strong>visiting123</strong>
          </p>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <label style={{ color: C.text.secondary, fontSize: 13, display: "block", marginBottom: 6 }}>
            Number of Visiting Faculty to Add
          </label>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <input
              type="number"
              min="1"
              max="20"
              value={numberOfFaculty}
              onChange={e => handleNumberOfFacultyChange(e.target.value)}
              style={{
                width: 100,
                padding: "10px 14px",
                borderRadius: 10,
                border: `1px solid ${C.border}`,
                fontSize: 14
              }}
            />
            <Button onClick={() => handleNumberOfFacultyChange(numberOfFaculty)} variant="primary">
              Generate Forms
            </Button>
            {facultyDetails.length > 0 && (
              <Button onClick={handleReset} variant="secondary">
                Reset All
              </Button>
            )}
          </div>
        </div>
      </Card>

      {facultyDetails.length > 0 && (
        <>
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
              <Title level={4}>Faculty Details ({facultyDetails.length})</Title>
              <div style={{ display: "flex", gap: 8 }}>
                <Button onClick={() => setShowPreview(!showPreview)} variant="secondary" size="sm">
                  {showPreview ? "Hide Preview" : "Show Preview"}
                </Button>
                <Button onClick={handleAddMore} variant="primary" size="sm">
                  + Add More
                </Button>
              </div>
            </div>
            
            <div style={{ maxHeight: 500, overflowY: "auto", paddingRight: 8 }}>
              {facultyDetails.map((faculty, index) => (
                <div key={index} style={{ 
                  marginBottom: 20, 
                  padding: 16, 
                  background: C.cardHover, 
                  borderRadius: 12,
                  border: `1px solid ${C.border}`
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <h5 style={{ color: C.text.primary, margin: 0 }}>
                      Visiting Faculty {index + 1}
                      {faculty.name && <span style={{ color: C.accent.green, marginLeft: 8 }}>✓</span>}
                    </h5>
                    <button
                      onClick={() => handleRemoveFaculty(index)}
                      style={{
                        color: C.accent.red,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: 18,
                        padding: "4px 8px"
                      }}
                      title="Remove this faculty"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
                    <Input
                      label="Full Name *"
                      value={faculty.name}
                      onChange={e => handleDetailChange(index, 'name', e.target.value)}
                      placeholder="e.g., Dr. John Smith"
                      required
                    />
                    
                    <Input
                      label="Email"
                      value={faculty.email}
                      onChange={e => handleDetailChange(index, 'email', e.target.value)}
                      placeholder="auto-generated"
                      disabled
                    />
                    
                    <Select
                      label="Designation"
                      value={faculty.designation}
                      onChange={e => handleDetailChange(index, 'designation', e.target.value)}
                      options={designationOptions}
                    />
                    
                    <Select
                      label="Specialization"
                      value={faculty.specialization}
                      onChange={e => handleDetailChange(index, 'specialization', e.target.value)}
                      options={[
                        { value: "", label: "-- Select Specialization --" },
                        ...specializationOptions.map(s => ({ value: s, label: s }))
                      ]}
                    />
                    
                    <Select
                      label="Course"
                      value={faculty.course}
                      onChange={e => handleDetailChange(index, 'course', e.target.value)}
                      options={COURSES.map(c => ({ value: c, label: c }))}
                    />
                    
                    <Input
                      label="Max Hours/Week"
                      type="number"
                      min="4"
                      max="20"
                      value={faculty.maxHours}
                      onChange={e => handleDetailChange(index, 'maxHours', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  
                  <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <Badge variant="primary">ID: Will be auto-generated</Badge>
                    <Badge variant="success">Password: visiting123</Badge>
                    {faculty.name && <Badge variant="purple">Avatar: {faculty.avatar}</Badge>}
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ marginTop: 16, padding: 12, background: C.accent.greenBg, borderRadius: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <strong>Summary:</strong> {facultyDetails.length} faculty | Total capacity: {getTotalHours()} hours/week
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <Button onClick={handleSubmit} variant="success" disabled={isSubmitting}>
                    {isSubmitting ? "Adding..." : `Add ${facultyDetails.length} Visiting Faculty`}
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {showPreview && (
            <Card>
              <Title level={4}>Preview - Generated Credentials</Title>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={{ padding: 12, textAlign: "left", borderBottom: `2px solid ${C.border}` }}>#</th>
                      <th style={{ padding: 12, textAlign: "left", borderBottom: `2px solid ${C.border}` }}>Name</th>
                      <th style={{ padding: 12, textAlign: "left", borderBottom: `2px solid ${C.border}` }}>Email</th>
                      <th style={{ padding: 12, textAlign: "left", borderBottom: `2px solid ${C.border}` }}>Password</th>
                      <th style={{ padding: 12, textAlign: "left", borderBottom: `2px solid ${C.border}` }}>Designation</th>
                      <th style={{ padding: 12, textAlign: "left", borderBottom: `2px solid ${C.border}` }}>Course</th>
                      <th style={{ padding: 12, textAlign: "left", borderBottom: `2px solid ${C.border}` }}>Max Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {facultyDetails.map((faculty, index) => (
                      <tr key={index} style={{ borderBottom: `1px solid ${C.border}` }}>
                        <td style={{ padding: 12 }}>{index + 1}</td>
                        <td style={{ padding: 12 }}>{faculty.name || `Visiting Faculty ${index + 1}`}</td>
                        <td style={{ padding: 12, color: C.accent.blue }}>{faculty.email}</td>
                        <td style={{ padding: 12 }}><code>visiting123</code></td>
                        <td style={{ padding: 12 }}>{faculty.designation}</td>
                        <td style={{ padding: 12 }}>{faculty.course}</td>
                        <td style={{ padding: 12 }}>{faculty.maxHours} hrs/wk</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: 16, padding: 12, background: C.accent.goldBg, borderRadius: 8 }}>
                <p style={{ margin: 0, color: C.accent.gold }}>
                  ⚠️ <strong>Important:</strong> Please save these credentials. Faculty can change their password after first login.
                  They will appear in the login page credential list.
                </p>
              </div>
            </Card>
          )}
        </>
      )}
      
      {/* Existing Visiting Faculty List */}
      {existingFaculty.length > 0 && (
        <Card>
          <Title level={4}>Existing Visiting Faculty ({existingFaculty.length})</Title>
          <div style={{ overflowX: "auto", maxHeight: 300, overflowY: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ position: "sticky", top: 0, background: C.surface }}>
                <tr>
                  <th style={{ padding: 12, textAlign: "left", borderBottom: `2px solid ${C.border}` }}>Name</th>
                  <th style={{ padding: 12, textAlign: "left", borderBottom: `2px solid ${C.border}` }}>Email</th>
                  <th style={{ padding: 12, textAlign: "left", borderBottom: `2px solid ${C.border}` }}>Designation</th>
                  <th style={{ padding: 12, textAlign: "left", borderBottom: `2px solid ${C.border}` }}>Course</th>
                  <th style={{ padding: 12, textAlign: "left", borderBottom: `2px solid ${C.border}` }}>Max Hours</th>
                </tr>
              </thead>
              <tbody>
                {existingFaculty.map(faculty => (
                  <tr key={faculty.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td style={{ padding: 12 }}>{faculty.name}</td>
                    <td style={{ padding: 12, color: C.accent.blue }}>{faculty.email}</td>
                    <td style={{ padding: 12 }}>{faculty.designation}</td>
                    <td style={{ padding: 12 }}>{faculty.course}</td>
                    <td style={{ padding: 12 }}>{faculty.maxHours} hrs/wk</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}