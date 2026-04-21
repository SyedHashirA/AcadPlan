// src/components/director/DirectorCourseLeadAssignment.jsx
import { useState, useEffect } from "react";
import { Card, Title, Button, Select, Badge } from "../common";
import { AppState } from "../../AppState";
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from "../../utils/storage";
import { COURSES } from "../../data/mockData";
import { C } from "../../styles/theme";

export function DirectorCourseLeadAssignment({ onRefresh }) {
  const [courseLeads, setCourseLeads] = useState({});
  const [facultyList, setFacultyList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("BTech");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    loadData();
  }, [refresh]);

  const loadData = () => {
    const savedCourseLeads = loadFromStorage(STORAGE_KEYS.COURSE_LEADS, {});
    setCourseLeads(savedCourseLeads);
    setFacultyList(AppState.faculty);
  };

  const handleAssign = () => {
    if (!selectedFaculty) {
      alert("Please select a faculty member");
      return;
    }

    const updatedCourseLeads = { ...courseLeads };
    updatedCourseLeads[selectedCourse] = {
      facultyId: parseInt(selectedFaculty),
      facultyName: AppState.faculty.find(f => f.id === parseInt(selectedFaculty))?.name,
      assignedDate: new Date().toISOString()
    };

    setCourseLeads(updatedCourseLeads);
    saveToStorage(STORAGE_KEYS.COURSE_LEADS, updatedCourseLeads);
    window.dispatchEvent(new Event('storage'));
    alert(`Course Lead assigned successfully for ${selectedCourse}`);
    setSelectedFaculty("");
    if (onRefresh) onRefresh();
  };

  const handleRemove = (course) => {
    if (confirm(`Remove course lead for ${course}?`)) {
      const updatedCourseLeads = { ...courseLeads };
      delete updatedCourseLeads[course];
      setCourseLeads(updatedCourseLeads);
      saveToStorage(STORAGE_KEYS.COURSE_LEADS, updatedCourseLeads);
      window.dispatchEvent(new Event('storage'));
      alert(`Course Lead removed for ${course}`);
      if (onRefresh) onRefresh();
    }
  };

  const getCurrentLead = () => {
    return courseLeads[selectedCourse];
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Title>Course Lead Assignment</Title>

      <Card>
        <Title level={4}>Assign Course Lead</Title>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
          <Select
            label="Course"
            value={selectedCourse}
            onChange={e => setSelectedCourse(e.target.value)}
            options={COURSES.map(c => ({ value: c, label: c }))}
          />
          
          <Select
            label="Select Faculty"
            value={selectedFaculty}
            onChange={e => setSelectedFaculty(e.target.value)}
            options={[
              { value: "", label: "-- Select Faculty --" },
              ...facultyList.map(f => ({ 
                value: f.id, 
                label: `${f.name} (${f.designation}) - ${f.course}` 
              }))
            ]}
          />
        </div>
        
        {getCurrentLead() && (
          <div style={{ marginTop: 16, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
            <p style={{ color: C.accent.blue, margin: 0 }}>
              <strong>Currently Assigned:</strong> {getCurrentLead().facultyName}
              <br />
              <small>Assigned on: {new Date(getCurrentLead().assignedDate).toLocaleDateString()}</small>
            </p>
          </div>
        )}
        
        <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
          <Button onClick={handleAssign} variant="success" disabled={!selectedFaculty}>
            Assign Course Lead
          </Button>
          {getCurrentLead() && (
            <Button onClick={() => handleRemove(selectedCourse)} variant="danger">
              Remove Assignment
            </Button>
          )}
        </div>
      </Card>

      <Card>
        <Title level={4}>Current Course Lead Assignments</Title>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Course</th>
                <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Course Lead</th>
                <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Assigned Date</th>
                <th style={{ textAlign: "left", padding: 12, borderBottom: `2px solid ${C.border}` }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {COURSES.map(course => {
                const lead = courseLeads[course];
                return (
                  <tr key={course} style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td style={{ padding: 12 }}>{course}</td>
                    <td style={{ padding: 12 }}>
                      {lead ? (
                        <Badge variant="success">{lead.facultyName}</Badge>
                      ) : (
                        <Badge variant="warning">Not Assigned</Badge>
                      )}
                    </td>
                    <td style={{ padding: 12 }}>
                      {lead ? new Date(lead.assignedDate).toLocaleDateString() : "-"}
                    </td>
                    <td style={{ padding: 12 }}>
                      {lead && (
                        <Button 
                          onClick={() => handleRemove(course)} 
                          variant="danger" 
                          size="sm"
                        >
                          Remove
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}