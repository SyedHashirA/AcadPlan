// src/components/coordinator/CoordinatorLeaveStatus.jsx
import { useState, useEffect } from "react";
import { Card, Title, Badge } from "../common";
import { loadFromStorage, STORAGE_KEYS } from "../../utils/storage";
import { AppState } from "../../AppState";
import { C } from "../../styles/theme";

export function CoordinatorLeaveStatus() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    loadRequests();
    
    const handleStorageChange = () => {
      loadRequests();
      setRefresh(r => r + 1);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadRequests = () => {
    const allRequests = loadFromStorage(STORAGE_KEYS.LEAVE_REQUESTS, []);
    setLeaveRequests(allRequests);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case "approved": 
        return <Badge variant="success">Approved by Director</Badge>;
      case "rejected": 
        return <Badge variant="danger">Rejected</Badge>;
      default: 
        return <Badge variant="warning">Pending Director Approval</Badge>;
    }
  };

  const approvedRequests = leaveRequests.filter(r => r.directorStatus === "approved");
  const pendingRequests = leaveRequests.filter(r => r.directorStatus === "pending");
  const rejectedRequests = leaveRequests.filter(r => r.directorStatus === "rejected");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Title>Leave Requests Status (View Only)</Title>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        <Card padding="20px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Approval</p>
          <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingRequests.length}</p>
        </Card>
        <Card padding="20px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Approved by Director</p>
          <p style={{ color: C.accent.green, fontSize: 32, fontWeight: 700 }}>{approvedRequests.length}</p>
        </Card>
        <Card padding="20px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Rejected</p>
          <p style={{ color: C.accent.red, fontSize: 32, fontWeight: 700 }}>{rejectedRequests.length}</p>
        </Card>
      </div>
      
      {leaveRequests.length === 0 ? (
        <Card>
          <p style={{ textAlign: "center", padding: 40, color: C.text.tertiary }}>
            No leave requests found
          </p>
        </Card>
      ) : (
        leaveRequests.map(request => {
          const faculty = AppState.faculty.find(f => f.id === request.facultyId);
          return (
            <Card key={request.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  <h4 style={{ color: C.text.primary }}>{request.facultyName}</h4>
                  <p style={{ color: C.text.tertiary, fontSize: 12 }}>{faculty?.designation} - {faculty?.course}</p>
                </div>
                {getStatusBadge(request.directorStatus)}
              </div>
              
              <div style={{ padding: 12, background: C.cardHover, borderRadius: 8, marginBottom: 12 }}>
                <p><strong>Leave Type:</strong> {request.leaveType}</p>
                <p><strong>Duration:</strong> {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}</p>
                <p><strong>Reason:</strong> {request.reason}</p>
                {request.substituteName && (
                  <p><strong>Suggested Substitute:</strong> {request.substituteName}</p>
                )}
              </div>
              
              {request.directorFeedback && (
                <div style={{ padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
                  <p><strong>Director's Feedback:</strong> {request.directorFeedback}</p>
                  {request.substituteAssigned && (
                    <p><strong>Substitute Assigned:</strong> {
                      AppState.faculty.find(f => f.id === parseInt(request.substituteAssigned))?.name
                    }</p>
                  )}
                </div>
              )}
              
              <div style={{ marginTop: 8, fontSize: 11, color: C.text.tertiary }}>
                Requested on: {new Date(request.requestedAt).toLocaleString()}
              </div>
            </Card>
          );
        })
      )}
    </div>
  );
}