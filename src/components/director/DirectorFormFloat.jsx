// src/components/director/DirectorFormFloat.jsx
import { useState, useEffect } from "react";
import { Card, Title, Button, Badge, Input } from "../common";
import { AppState } from "../../AppState";
import { saveToStorage, STORAGE_KEYS } from "../../utils/storage";
import { C } from "../../styles/theme";

export function DirectorFormFloat({ onRefresh }) {
  const [formStatus, setFormStatus] = useState({
    isFloated: false,
    floatedDate: null,
    floatedBy: null,
    semester: "2025",
    deadline: null
  });
  const [pendingSubjects, setPendingSubjects] = useState([]);
  const [approvedSubjects, setApprovedSubjects] = useState([]);
  const [deadline, setDeadline] = useState("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    loadData();
    
    const handleStorageChange = () => {
      loadData();
      setRefresh(r => r + 1);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadData = () => {
    // Load form status
    const savedStatus = loadFromStorage(STORAGE_KEYS.FORM_STATUS, {
      isFloated: false,
      floatedDate: null,
      floatedBy: null,
      semester: "2025",
      deadline: null
    });
    setFormStatus(savedStatus);
    setDeadline(savedStatus.deadline || "");

    // Load subjects
    const allSubjects = AppState.subjects;
    setPendingSubjects(allSubjects.filter(s => s.approvalStatus === "pending"));
    setApprovedSubjects(allSubjects.filter(s => s.approvalStatus === "approved"));
  };

  const allSubjectsApproved = pendingSubjects.length === 0 && approvedSubjects.length > 0;

  const handleFloatForm = () => {
    if (!allSubjectsApproved) {
      alert(`Cannot float the form. ${pendingSubjects.length} subject(s) are still pending Dean approval.`);
      return;
    }

    if (!deadline) {
      alert("Please set a submission deadline");
      return;
    }

    const updatedStatus = {
      isFloated: true,
      floatedDate: new Date().toISOString(),
      floatedBy: "director",
      semester: "2025",
      deadline: deadline
    };

    setFormStatus(updatedStatus);
    saveToStorage(STORAGE_KEYS.FORM_STATUS, updatedStatus);
    window.dispatchEvent(new Event('storage'));
    alert("Preference form has been floated! Faculty can now submit their preferences.");
    if (onRefresh) onRefresh();
  };

  const handleResetForm = () => {
    if (confirm("Are you sure you want to reset the form? This will allow faculty to submit again.")) {
      const resetStatus = {
        isFloated: false,
        floatedDate: null,
        floatedBy: null,
        semester: "2025",
        deadline: null
      };
      setFormStatus(resetStatus);
      saveToStorage(STORAGE_KEYS.FORM_STATUS, resetStatus);
      window.dispatchEvent(new Event('storage'));
      alert("Form has been reset. Faculty can no longer submit preferences until floated again.");
      if (onRefresh) onRefresh();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Title>Preference Form Management</Title>

      {/* Status Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        <Card padding="20px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Subjects</p>
          <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingSubjects.length}</p>
          {pendingSubjects.length > 0 && (
            <p style={{ color: C.text.tertiary, fontSize: 11, marginTop: 8 }}>
              Waiting for Dean approval
            </p>
          )}
        </Card>
        <Card padding="20px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Approved Subjects</p>
          <p style={{ color: C.accent.green, fontSize: 32, fontWeight: 700 }}>{approvedSubjects.length}</p>
        </Card>
        <Card padding="20px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Form Status</p>
          <p style={{ color: formStatus.isFloated ? C.accent.green : C.accent.red, fontSize: 24, fontWeight: 700 }}>
            {formStatus.isFloated ? "FLOATED ✓" : "NOT FLOATED"}
          </p>
          {formStatus.isFloated && formStatus.deadline && (
            <p style={{ color: C.text.tertiary, fontSize: 11, marginTop: 8 }}>
              Deadline: {new Date(formStatus.deadline).toLocaleString()}
            </p>
          )}
        </Card>
      </div>

      {/* Pending Subjects List */}
      {pendingSubjects.length > 0 && (
        <Card>
          <Title level={4}>Subjects Pending Approval ({pendingSubjects.length})</Title>
          <p style={{ color: C.accent.red, marginBottom: 12 }}>
            ⚠ These subjects need Dean approval before the form can be floated:
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {pendingSubjects.map(subject => (
              <Badge key={subject.id} variant="danger">
                {subject.name} ({subject.code})
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Approved Subjects List */}
      {approvedSubjects.length > 0 && (
        <Card>
          <Title level={4}>Approved Subjects ({approvedSubjects.length})</Title>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {approvedSubjects.map(subject => (
              <Badge key={subject.id} variant="success">
                {subject.name} ({subject.code})
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Float Form Section */}
      <Card>
        <Title level={4}>Float Preference Form</Title>
        
        <div style={{ marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
          <p style={{ color: C.text.secondary, fontSize: 13 }}>
            <strong>Current Status:</strong> {formStatus.isFloated ? (
              <span style={{ color: C.accent.green }}>✓ Form has been floated. Faculty can submit preferences.</span>
            ) : (
              <span style={{ color: C.accent.red }}>✗ Form is not floated. Faculty cannot submit preferences yet.</span>
            )}
          </p>
          {formStatus.isFloated && formStatus.floatedDate && (
            <p style={{ color: C.text.tertiary, fontSize: 12, marginTop: 8 }}>
              Floated on: {new Date(formStatus.floatedDate).toLocaleString()} by {formStatus.floatedBy}
            </p>
          )}
        </div>

        {!formStatus.isFloated ? (
          <>
            <Input
              label="Submission Deadline"
              type="datetime-local"
              value={deadline}
              onChange={e => setDeadline(e.target.value)}
              required
            />
            <div style={{ marginTop: 16, padding: 12, background: C.accent.blueBg, borderRadius: 8, marginBottom: 16 }}>
              <p style={{ color: C.accent.blue, fontSize: 13, margin: 0 }}>
                📋 Requirements before floating:
              </p>
              <ul style={{ color: C.text.secondary, fontSize: 12, marginTop: 8, paddingLeft: 20 }}>
                <li>All subjects must be approved by Dean</li>
                <li>Set a submission deadline for faculty</li>
                <li>Faculty will be able to submit their preferences after floating</li>
              </ul>
            </div>
            <Button
              onClick={handleFloatForm}
              variant="success"
              fullWidth
              size="lg"
              disabled={!allSubjectsApproved}
            >
              {allSubjectsApproved ? "Float Preference Form" : `Waiting for ${pendingSubjects.length} subject(s) to be approved`}
            </Button>
          </>
        ) : (
          <div>
            <div style={{ marginBottom: 16, padding: 12, background: C.accent.greenBg, borderRadius: 8 }}>
              <p style={{ color: C.accent.green, margin: 0 }}>
                ✓ Preference form has been floated. Faculty can now submit their preferences.
              </p>
              {formStatus.deadline && (
                <p style={{ color: C.accent.green, fontSize: 12, marginTop: 8 }}>
                  ⏰ Submission Deadline: {new Date(formStatus.deadline).toLocaleString()}
                </p>
              )}
            </div>
            <Button
              onClick={handleResetForm}
              variant="danger"
              fullWidth
            >
              Reset Form (Close submissions)
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

function loadFromStorage(key, defaultValue) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
}