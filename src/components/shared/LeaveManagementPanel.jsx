// src/components/shared/LeaveManagementPanel.jsx
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { Card, Title, Button, Input, Select, Badge } from "../common";
import { loadFromStorage, saveToStorage } from "../../utils/storage";
import { C } from "../../styles/theme";

const DEFAULT_LEAVE_REQUESTS = [];

export function LeaveManagementPanel() {
  const { user } = useAuth();
  const [leaveRequests, setLeaveRequests] = useState(() => loadFromStorage('acadplan_leave_requests', DEFAULT_LEAVE_REQUESTS));
  const [newRequest, setNewRequest] = useState({ type: "planned", startDate: "", endDate: "", reason: "" });

  const isFaculty = user.role === "faculty";
  const isDirector = user.role === "director";

  const addRequest = () => {
    if (newRequest.startDate && newRequest.endDate && newRequest.reason) {
      const request = {
        id: Date.now(),
        facultyId: user.id,
        facultyName: user.name,
        type: newRequest.type,
        startDate: newRequest.startDate,
        endDate: newRequest.endDate,
        reason: newRequest.reason,
        status: "pending",
        submittedAt: new Date().toISOString(),
      };
      const updated = [...leaveRequests, request];
      setLeaveRequests(updated);
      saveToStorage('acadplan_leave_requests', updated);
      setNewRequest({ type: "planned", startDate: "", endDate: "", reason: "" });
      alert("Leave request submitted");
    } else {
      alert("Please fill all fields");
    }
  };

  const updateRequestStatus = (id, status) => {
    const updated = leaveRequests.map(req => req.id === id ? { ...req, status, reviewedAt: new Date().toISOString() } : req);
    setLeaveRequests(updated);
    saveToStorage('acadplan_leave_requests', updated);
  };

  const myRequests = leaveRequests.filter(req => req.facultyId === user.id);
  const pendingRequests = leaveRequests.filter(req => req.status === "pending");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Title>Leave Management</Title>
      {isFaculty && (
        <Card>
          <Title level={4}>Request Leave</Title>
          <Select label="Leave Type" value={newRequest.type} onChange={e => setNewRequest({ ...newRequest, type: e.target.value })} options={[{ value: "planned", label: "Planned Leave" }, { value: "emergency", label: "Emergency Leave" }, { value: "medical", label: "Medical Leave" }]} />
          <Input label="Start Date" type="date" value={newRequest.startDate} onChange={e => setNewRequest({ ...newRequest, startDate: e.target.value })} />
          <Input label="End Date" type="date" value={newRequest.endDate} onChange={e => setNewRequest({ ...newRequest, endDate: e.target.value })} />
          <Input label="Reason" value={newRequest.reason} onChange={e => setNewRequest({ ...newRequest, reason: e.target.value })} />
          <Button onClick={addRequest} variant="primary" style={{ marginTop: 12 }}>Submit Request</Button>
        </Card>
      )}
      {isFaculty && (
        <Card>
          <Title level={4}>My Leave Requests</Title>
          {myRequests.length === 0 ? <p style={{ color: C.text.tertiary }}>No leave requests found.</p> : myRequests.map(req => (
            <div key={req.id} style={{ padding: 12, marginBottom: 8, background: C.cardHover, borderRadius: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{req.type} Leave</div>
                  <div style={{ fontSize: 12 }}>{new Date(req.startDate).toLocaleDateString()} - {new Date(req.endDate).toLocaleDateString()}</div>
                  <div style={{ fontSize: 12, color: C.text.tertiary }}>{req.reason}</div>
                </div>
                <Badge variant={req.status === "approved" ? "success" : req.status === "rejected" ? "danger" : "warning"}>{req.status}</Badge>
              </div>
            </div>
          ))}
        </Card>
      )}
      {isDirector && (
        <Card>
          <Title level={4}>Pending Leave Requests</Title>
          {pendingRequests.length === 0 ? <p style={{ color: C.text.tertiary }}>No pending requests.</p> : pendingRequests.map(req => (
            <div key={req.id} style={{ padding: 12, marginBottom: 8, background: C.cardHover, borderRadius: 8 }}>
              <div>
                <div style={{ fontWeight: 600 }}>{req.facultyName}</div>
                <div>{req.type} Leave</div>
                <div style={{ fontSize: 12 }}>{new Date(req.startDate).toLocaleDateString()} - {new Date(req.endDate).toLocaleDateString()}</div>
                <div style={{ fontSize: 12, color: C.text.tertiary }}>{req.reason}</div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <Button onClick={() => updateRequestStatus(req.id, "approved")} variant="success" size="sm">Approve</Button>
                <Button onClick={() => updateRequestStatus(req.id, "rejected")} variant="danger" size="sm">Reject</Button>
              </div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}