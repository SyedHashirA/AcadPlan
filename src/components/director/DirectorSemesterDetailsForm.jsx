// src/components/director/DirectorSemesterDetailsForm.jsx
import { useState, useEffect } from "react";
import { Card, Title, Button, Select, Input } from "../common";
import { AppState } from "../../AppState";
import { COURSES, SEMESTERS } from "../../data/mockData";
import { C } from "../../styles/theme";

export function DirectorSemesterDetailsForm() {
  const [selectedCourse, setSelectedCourse] = useState("BTech");
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [subjects, setSubjects] = useState([]);
  const [defaultFaculty, setDefaultFaculty] = useState({});
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    const existing = AppState.semesterDetails[selectedCourse]?.[selectedSemester];
    if (existing) {
      setSubjects(existing.subjects || []);
      setDefaultFaculty(existing.defaultFaculty || {});
      setDeadline(existing.preferenceDeadline || "");
    } else {
      setSubjects([]);
      setDefaultFaculty({});
      setDeadline("");
    }
  }, [selectedCourse, selectedSemester]);

  const availableSubjects = AppState.subjects.filter(s => 
    s.course === selectedCourse && s.semester === selectedSemester
  );

  const handleAddSubject = (subjectId) => {
    if (!subjects.includes(subjectId)) {
      setSubjects([...subjects, subjectId]);
    }
  };

  const handleRemoveSubject = (subjectId) => {
    setSubjects(subjects.filter(id => id !== subjectId));
    const newDefaultFaculty = { ...defaultFaculty };
    delete newDefaultFaculty[subjectId];
    setDefaultFaculty(newDefaultFaculty);
  };

  const handleSetDefaultFaculty = (subjectId, facultyId) => {
    setDefaultFaculty({
      ...defaultFaculty,
      [subjectId]: parseInt(facultyId)
    });
  };

  const handleSave = () => {
    if (subjects.length === 0) {
      alert("Please add at least one subject");
      return;
    }

    const missingFaculty = subjects.filter(s => !defaultFaculty[s]);
    if (missingFaculty.length > 0) {
      alert("Please assign default faculty for all subjects");
      return;
    }

    AppState.updateSemesterDetails(selectedCourse, selectedSemester, {
      subjects,
      defaultFaculty,
      preferenceDeadline: deadline,
    });

    alert("Semester details saved successfully!");
  };

  return (
    <Card>
      <Title level={4}>Step 1: Configure Semester Details (Director)</Title>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16, marginBottom: 24 }}>
        <Select
          label="Course"
          value={selectedCourse}
          onChange={e => setSelectedCourse(e.target.value)}
          options={COURSES.map(c => ({ value: c, label: c }))}
        />
        <Select
          label="Semester"
          value={selectedSemester}
          onChange={e => setSelectedSemester(parseInt(e.target.value))}
          options={SEMESTERS.map(s => ({ value: s, label: `Semester ${s}` }))}
        />
      </div>

      <Input
        label="Preference Submission Deadline"
        type="datetime-local"
        value={deadline}
        onChange={e => setDeadline(e.target.value)}
      />

      <div style={{ marginBottom: 24 }}>
        <h5 style={{ color: C.text.secondary, fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
          Available Subjects
        </h5>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8 }}>
          {availableSubjects.map(subject => (
            <button
              key={subject.id}
              onClick={() => handleAddSubject(subject.id)}
              disabled={subjects.includes(subject.id)}
              style={{
                padding: "10px",
                background: subjects.includes(subject.id) ? C.accent.greenBg : "transparent",
                border: `1px solid ${subjects.includes(subject.id) ? C.accent.green : C.border}`,
                borderRadius: 8,
                color: subjects.includes(subject.id) ? C.accent.green : C.text.primary,
                fontSize: 13,
                cursor: subjects.includes(subject.id) ? "default" : "pointer",
                textAlign: "left",
              }}
            >
              {subject.name} ({subject.code})
            </button>
          ))}
        </div>
      </div>

      <div>
        <h5 style={{ color: C.text.secondary, fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
          Selected Subjects & Default Faculty
        </h5>
        {subjects.length === 0 ? (
          <p style={{ color: C.text.tertiary, fontSize: 13, textAlign: "center", padding: "20px 0" }}>
            No subjects selected yet
          </p>
        ) : (
          subjects.map(subjectId => {
            const subject = AppState.subjects.find(s => s.id === subjectId);
            const facultyOptions = AppState.faculty.filter(f => f.course === selectedCourse);
            return (
              <div key={subjectId} style={{ marginBottom: 12, padding: 16, background: C.cardHover, borderRadius: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ color: C.text.primary, fontWeight: 600 }}>{subject?.name}</span>
                  <button 
                    onClick={() => handleRemoveSubject(subjectId)}
                    style={{ color: C.accent.red, background: "none", border: "none", cursor: "pointer", fontSize: 16 }}
                  >
                    ×
                  </button>
                </div>

                <Select
                  label="Default Faculty"
                  value={defaultFaculty[subjectId] || ""}
                  onChange={e => handleSetDefaultFaculty(subjectId, e.target.value)}
                  options={[
                    { value: "", label: "Select Default Faculty" },
                    ...facultyOptions.map(f => ({ value: f.id, label: `${f.name} (${f.designation})` }))
                  ]}
                />
              </div>
            );
          })
        )}
      </div>

      <Button
        onClick={handleSave}
        variant="success"
        fullWidth
        size="lg"
        style={{ marginTop: 20 }}
      >
        Save Semester Details
      </Button>
    </Card>
  );
}