// src/components/faculty/FacultyLeaveStatus.jsx
import { useState, useEffect } from "react";
import { Card, Title, Badge } from "../common";
import { loadFromStorage, STORAGE_KEYS } from "../../utils/storage";
import { AppState } from "../../AppState";
import { C } from "../../styles/theme";

export function FacultyLeaveStatus({ facultyId }) {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    loadLeaveRequests();
    
    const handleStorageChange = () => {
      loadLeaveRequests();
      setRefresh(r => r + 1);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadLeaveRequests = () => {
    const allRequests = loadFromStorage(STORAGE_KEYS.LEAVE_REQUESTS, []);
    const myRequests = allRequests.filter(r => r.facultyId === facultyId);
    // Sort by requested date (newest first)
    myRequests.sort((a, b) => new Date(b.requestedAt) - new Date(a.requestedAt));
    setLeaveRequests(myRequests);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case "approved":
        return <Badge variant="success">✅ Approved by Director</Badge>;
      case "rejected":
        return <Badge variant="danger">❌ Rejected</Badge>;
      default:
        return <Badge variant="warning">⏳ Pending Approval</Badge>;
    }
  };

  const getLeaveTypeLabel = (type) => {
    switch(type) {
      case "planned": return "Planned Leave";
      case "emergency": return "Emergency Leave";
      case "medical": return "Medical Leave";
      case "conference": return "Conference/Seminar";
      default: return type;
    }
  };

  if (leaveRequests.length === 0) {
    return (
      <Card>
        <p style={{ textAlign: "center", padding: 40, color: C.text.tertiary }}>
          No leave requests found. Use "Request Leave" tab to submit a leave request.
        </p>
      </Card>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Title level={4}>My Leave Requests</Title>
      
      {leaveRequests.map(request => {
        const startDate = new Date(request.startDate).toLocaleDateString();
        const endDate = new Date(request.endDate).toLocaleDateString();
        
        return (
          <Card key={request.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <h4 style={{ color: C.text.primary }}>{getLeaveTypeLabel(request.leaveType)}</h4>
                <p style={{ color: C.text.tertiary, fontSize: 12 }}>
                  {startDate} - {endDate}
                </p>
              </div>
              {getStatusBadge(request.directorStatus)}
            </div>
            
            <div style={{ marginBottom: 12 }}>
              <p><strong>Reason:</strong> {request.reason}</p>
              {request.substituteName && (
                <p><strong>Suggested Substitute:</strong> {request.substituteName}</p>
              )}
            </div>
            
            {request.directorFeedback && (
              <div style={{ 
                padding: 12, 
                background: request.directorStatus === "approved" ? C.accent.greenBg : C.accent.blueBg, 
                borderRadius: 8 
              }}>
                <p style={{ margin: 0 }}>
                  <strong>Director's Feedback:</strong> {request.directorFeedback}
                </p>
                {request.substituteAssigned && (
                  <p style={{ margin: "8px 0 0 0", fontSize: 13 }}>
                    <strong>Substitute Assigned:</strong> {
                      AppState.faculty.find(f => f.id === parseInt(request.substituteAssigned))?.name
                    }
                  </p>
                )}
              </div>
            )}
            
            <div style={{ marginTop: 8, fontSize: 11, color: C.text.tertiary }}>
              Requested on: {new Date(request.requestedAt).toLocaleString()}
            </div>
          </Card>
        );
      })}
    </div>
  );
}