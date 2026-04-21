// src/components/faculty/FacultyAppointments.jsx
import { useState, useEffect } from "react";
import { Card, Title, Badge, Button, Input } from "../common";
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "../../utils/storage";
import { C } from "../../styles/theme";

export function FacultyAppointments({ facultyId, facultyName }) {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newTime, setNewTime] = useState("");
  const [message, setMessage] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [facultyLocation, setFacultyLocation] = useState(null);

  useEffect(() => {
    loadAppointments();
    loadFacultyLocation();
    
    const handleStorageChange = () => {
      loadAppointments();
      loadFacultyLocation();
      setRefresh(r => r + 1);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadAppointments = () => {
    const allAppointments = loadFromStorage(STORAGE_KEYS.APPOINTMENTS, []);
    const myAppointments = allAppointments.filter(a => a.facultyId === facultyId);
    setAppointments(myAppointments);
  };

  const loadFacultyLocation = () => {
    const location = loadFromStorage(`${STORAGE_KEYS.FACULTY_LOCATION}_${facultyId}`, null);
    setFacultyLocation(location);
  };

  const handleApprove = (appointmentId) => {
    const allAppointments = loadFromStorage(STORAGE_KEYS.APPOINTMENTS, []);
    const updatedAppointments = allAppointments.map(a => 
      a.id === appointmentId 
        ? { 
            ...a, 
            status: "approved", 
            approvedTime: new Date(a.preferredDate + "T" + a.preferredTime).toISOString(),
            facultyMessage: message || "Your appointment has been approved.",
            facultyLocation: facultyLocation // Add faculty location to the appointment
          }
        : a
    );
    saveToStorage(STORAGE_KEYS.APPOINTMENTS, updatedAppointments);
    window.dispatchEvent(new Event('storage'));
    loadAppointments();
    setSelectedAppointment(null);
    setMessage("");
    alert("Appointment approved!");
  };

  const handleReschedule = (appointmentId) => {
    if (!newTime) {
      alert("Please select a new time");
      return;
    }
    
    const allAppointments = loadFromStorage(STORAGE_KEYS.APPOINTMENTS, []);
    const updatedAppointments = allAppointments.map(a => 
      a.id === appointmentId 
        ? { 
            ...a, 
            status: "rescheduled", 
            preferredTime: newTime,
            facultyMessage: message || `Please confirm this new time: ${newTime}`,
            rescheduledBy: "faculty",
            rescheduledAt: new Date().toISOString()
          }
        : a
    );
    saveToStorage(STORAGE_KEYS.APPOINTMENTS, updatedAppointments);
    window.dispatchEvent(new Event('storage'));
    loadAppointments();
    setSelectedAppointment(null);
    setNewTime("");
    setMessage("");
    alert("Reschedule request sent to student!");
  };

  const handleReject = (appointmentId) => {
    const reason = prompt("Enter reason for rejection:");
    if (reason) {
      const allAppointments = loadFromStorage(STORAGE_KEYS.APPOINTMENTS, []);
      const updatedAppointments = allAppointments.map(a => 
        a.id === appointmentId 
          ? { ...a, status: "rejected", facultyMessage: reason }
          : a
      );
      saveToStorage(STORAGE_KEYS.APPOINTMENTS, updatedAppointments);
      window.dispatchEvent(new Event('storage'));
      loadAppointments();
      alert("Appointment rejected!");
    }
  };

  const getFullLocationText = () => {
    if (!facultyLocation) return "Location not set";
    const parts = [];
    if (facultyLocation.block) parts.push(facultyLocation.block);
    if (facultyLocation.floor) parts.push(facultyLocation.floor);
    if (facultyLocation.roomNumber) parts.push(`Room ${facultyLocation.roomNumber}`);
    if (facultyLocation.cabinLocation) parts.push(`(${facultyLocation.cabinLocation})`);
    if (facultyLocation.buildingName) parts.push(facultyLocation.buildingName);
    if (facultyLocation.landmark) parts.push(`Near ${facultyLocation.landmark}`);
    return parts.join(', ');
  };

  const pendingAppointments = appointments.filter(a => a.status === "pending");
  const otherAppointments = appointments.filter(a => a.status !== "pending");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Title>Appointment Requests</Title>
      
      {/* Faculty Location Card */}
      <Card style={{ background: C.accent.blueBg }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 24 }}>📍</span>
          <div>
            <h4 style={{ margin: 0 }}>Your Office Location</h4>
            <p style={{ margin: 0, fontSize: 14, color: C.accent.blue }}>
              {getFullLocationText()}
            </p>
            {!facultyLocation && (
              <p style={{ margin: 0, fontSize: 12, color: C.accent.red, marginTop: 4 }}>
                ⚠️ Please set your office location in the Profile section.
              </p>
            )}
          </div>
        </div>
      </Card>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
        <Card padding="20px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Requests</p>
          <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingAppointments.length}</p>
        </Card>
        <Card padding="20px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Total Appointments</p>
          <p style={{ color: C.accent.blue, fontSize: 32, fontWeight: 700 }}>{appointments.length}</p>
        </Card>
      </div>
      
      {pendingAppointments.length > 0 && (
        <div>
          <h3 style={{ marginBottom: 16 }}>Pending Requests</h3>
          {pendingAppointments.map(app => (
            <Card key={app.id} style={{ marginBottom: 16 }}>
              <div style={{ marginBottom: 12 }}>
                <h4 style={{ color: C.text.primary }}>{app.studentName}</h4>
                <p style={{ color: C.text.tertiary, fontSize: 12 }}>
                  {app.studentCourse} Semester {app.studentSemester} - Section {app.studentSection}
                </p>
              </div>
              
              <div style={{ marginBottom: 12 }}>
                <p><strong>Reason:</strong> {app.reason}</p>
                <p><strong>Preferred Date:</strong> {new Date(app.preferredDate).toLocaleDateString()}</p>
                <p><strong>Preferred Time:</strong> {app.preferredTime}</p>
                <p><strong>Requested on:</strong> {new Date(app.requestedAt).toLocaleString()}</p>
              </div>
              
              {selectedAppointment === app.id ? (
                <div>
                  <Input
                    label="Message to Student (Optional)"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Add any additional information..."
                  />
                  
                  <div style={{ marginTop: 12 }}>
                    <label style={{ color: C.text.secondary, fontSize: 13, display: "block", marginBottom: 6 }}>
                      New Time (for reschedule)
                    </label>
                    <input
                      type="time"
                      value={newTime}
                      onChange={e => setNewTime(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: 10,
                        border: `1px solid ${C.border}`,
                        fontSize: 14,
                        marginBottom: 12
                      }}
                    />
                  </div>
                  
                  <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                    <Button onClick={() => handleApprove(app.id)} variant="success" size="sm">
                      Approve
                    </Button>
                    <Button onClick={() => handleReschedule(app.id)} variant="primary" size="sm">
                      Propose New Time
                    </Button>
                    <Button onClick={() => handleReject(app.id)} variant="danger" size="sm">
                      Reject
                    </Button>
                    <Button onClick={() => setSelectedAppointment(null)} variant="secondary" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", gap: 12 }}>
                  <Button onClick={() => setSelectedAppointment(app.id)} variant="primary">
                    Review Request
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
      
      {otherAppointments.length > 0 && (
        <div>
          <h3 style={{ marginBottom: 16 }}>Past Appointments</h3>
          {otherAppointments.map(app => (
            <Card key={app.id} style={{ marginBottom: 16, background: C.cardHover }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h4 style={{ color: C.text.primary }}>{app.studentName}</h4>
                  <p style={{ color: C.text.tertiary, fontSize: 12 }}>{app.studentCourse} Sem {app.studentSemester}</p>
                </div>
                {app.status === "approved" && <Badge variant="success">Approved</Badge>}
                {app.status === "rescheduled" && <Badge variant="primary">Rescheduled</Badge>}
                {app.status === "rejected" && <Badge variant="danger">Rejected</Badge>}
              </div>
              
              <div style={{ marginTop: 12 }}>
                <p><strong>Reason:</strong> {app.reason}</p>
                {app.approvedTime && (
                  <p><strong>Scheduled for:</strong> {new Date(app.approvedTime).toLocaleString()}</p>
                )}
                {app.facultyLocation && (
                  <div style={{ marginTop: 8, padding: 8, background: C.accent.blueBg, borderRadius: 6 }}>
                    <p style={{ margin: 0, fontSize: 12 }}>
                      <strong>📍 Meeting Location:</strong> {getFullLocationText()}
                    </p>
                  </div>
                )}
                {app.facultyMessage && (
                  <p><strong>Message:</strong> {app.facultyMessage}</p>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}