// src/components/admin/DeanSubjectDeletionApproval.jsx
import { useState, useEffect } from "react";
import { Card, Title, Badge, Button } from "../common";
import { AppState } from "../../AppState";
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from "../../utils/storage";
import { C } from "../../styles/theme";

export function DeanSubjectDeletionApproval() {
  const [refresh, setRefresh] = useState(0);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(null);

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
    const allRequests = loadFromStorage(STORAGE_KEYS.SUBJECT_DELETION_REQUESTS, []);
    setPendingRequests(allRequests.filter(r => r.status === "pending"));
    setApprovedRequests(allRequests.filter(r => r.status === "approved"));
    setRejectedRequests(allRequests.filter(r => r.status === "rejected"));
  };

  const handleApprove = (requestId, subjectId) => {
    // Delete the subject
    const allSubjects = AppState.subjects || [];
    const updatedSubjects = allSubjects.filter(s => s.id !== subjectId);
    AppState.subjects = updatedSubjects;
    saveToStorage(STORAGE_KEYS.SUBJECTS, updatedSubjects);
    
    // Update request status
    const allRequests = loadFromStorage(STORAGE_KEYS.SUBJECT_DELETION_REQUESTS, []);
    const updatedRequests = allRequests.map(r => 
      r.id === requestId 
        ? { 
            ...r, 
            status: "approved", 
            approvedBy: "dean",
            approvedDate: new Date().toISOString()
          } 
        : r
    );
    saveToStorage(STORAGE_KEYS.SUBJECT_DELETION_REQUESTS, updatedRequests);
    
    window.dispatchEvent(new Event('storage'));
    loadRequests();
    alert("Subject deletion approved and subject removed!");
  };

  const handleReject = (requestId) => {
    if (!rejectReason.trim()) {
      alert("Please enter a rejection reason");
      return;
    }
    
    const allRequests = loadFromStorage(STORAGE_KEYS.SUBJECT_DELETION_REQUESTS, []);
    const updatedRequests = allRequests.map(r => 
      r.id === requestId 
        ? { 
            ...r, 
            status: "rejected", 
            rejectionReason: rejectReason,
            rejectedBy: "dean",
            rejectedDate: new Date().toISOString()
          } 
        : r
    );
    saveToStorage(STORAGE_KEYS.SUBJECT_DELETION_REQUESTS, updatedRequests);
    
    // Also update the subject to remove deletionRequested flag
    const allSubjects = AppState.subjects || [];
    const updatedSubjects = allSubjects.map(s => 
      s.deletionRequestId === requestId 
        ? { ...s, deletionRequested: false, deletionReason: null, deletionRequestId: null }
        : s
    );
    AppState.subjects = updatedSubjects;
    saveToStorage(STORAGE_KEYS.SUBJECTS, updatedSubjects);
    
    window.dispatchEvent(new Event('storage'));
    loadRequests();
    setShowRejectModal(null);
    setRejectReason("");
    alert("Deletion request rejected!");
  };

  const openRejectModal = (requestId) => {
    setShowRejectModal(requestId);
    setRejectReason("");
  };

  const closeRejectModal = () => {
    setShowRejectModal(null);
    setRejectReason("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Title>Subject Deletion Requests (Dean)</Title>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        <Card padding="20px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Deletion Requests</p>
          <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingRequests.length}</p>
        </Card>
        <Card padding="20px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Approved Deletions</p>
          <p style={{ color: C.accent.green, fontSize: 32, fontWeight: 700 }}>{approvedRequests.length}</p>
        </Card>
        <Card padding="20px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Rejected Requests</p>
          <p style={{ color: C.accent.red, fontSize: 32, fontWeight: 700 }}>{rejectedRequests.length}</p>
        </Card>
      </div>
      
      {/* Reject Reason Modal */}
      {showRejectModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <Card padding="24px" style={{ width: 400, maxWidth: "90%" }}>
            <Title level={4}>Reject Deletion Request</Title>
            <p style={{ color: C.text.secondary, marginBottom: 16 }}>
              Please provide a reason for rejecting this deletion request:
            </p>
            <textarea
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              placeholder="Enter rejection reason..."
              rows={4}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: 8,
                border: `1px solid ${C.border}`,
                fontSize: 14,
                marginBottom: 16,
                resize: "vertical"
              }}
            />
            <div style={{ display: "flex", gap: 12 }}>
              <Button onClick={() => handleReject(showRejectModal)} variant="danger" fullWidth>
                Confirm Rejection
              </Button>
              <Button onClick={closeRejectModal} variant="secondary" fullWidth>
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
      
      {pendingRequests.length > 0 ? (
        pendingRequests.map(request => {
          return (
            <Card key={request.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
                <div>
                  <h4 style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{request.subjectName}</h4>
                  <p style={{ color: C.accent.blue, fontSize: 14 }}>Code: {request.subjectCode}</p>
                  <p style={{ color: C.text.tertiary, fontSize: 12 }}>{request.course} - Semester {request.semester}</p>
                </div>
                <Badge variant="warning">Pending Dean Approval</Badge>
              </div>
              
              <div style={{ marginBottom: 16, padding: 12, background: C.accent.redBg, borderRadius: 8 }}>
                <p style={{ color: C.accent.red, fontWeight: 600, marginBottom: 8 }}>Deletion Request Details:</p>
                <p style={{ color: C.text.primary, marginBottom: 4 }}>
                  <strong>Requested by:</strong> {request.requestedByName}
                </p>
                <p style={{ color: C.text.primary, marginBottom: 4 }}>
                  <strong>Requested on:</strong> {new Date(request.requestedDate).toLocaleString()}
                </p>
                <p style={{ color: C.text.primary }}>
                  <strong>Reason:</strong> {request.reason}
                </p>
              </div>
              
              <div style={{ display: "flex", gap: 12 }}>
                <Button onClick={() => handleApprove(request.id, request.subjectId)} variant="success" fullWidth>
                  ✓ Approve Deletion
                </Button>
                <Button onClick={() => openRejectModal(request.id)} variant="danger" fullWidth>
                  ✗ Reject Request
                </Button>
              </div>
            </Card>
          );
        })
      ) : (
        <Card>
          <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>
            No pending subject deletion requests
          </p>
        </Card>
      )}
      
      {/* Rejected Requests Section */}
      {rejectedRequests.length > 0 && (
        <Card>
          <Title level={4}>Rejected Deletion Requests ({rejectedRequests.length})</Title>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {rejectedRequests.map(request => (
              <div key={request.id} style={{ 
                padding: 16, 
                background: C.accent.redBg, 
                borderRadius: 12,
                border: `1px solid ${C.accent.red}`
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                  <div>
                    <h5 style={{ color: C.text.primary, fontWeight: 600 }}>{request.subjectName} ({request.subjectCode})</h5>
                    <p style={{ color: C.text.secondary, fontSize: 12 }}>{request.course} - Semester {request.semester}</p>
                  </div>
                  <Badge variant="danger">Rejected</Badge>
                </div>
                <div style={{ marginTop: 12, padding: 12, background: C.surface, borderRadius: 8 }}>
                  <p style={{ color: C.accent.red, fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Rejection Reason:</p>
                  <p style={{ color: C.text.primary, fontSize: 13 }}>{request.rejectionReason || "No reason provided"}</p>
                  {request.rejectedDate && (
                    <p style={{ color: C.text.tertiary, fontSize: 11, marginTop: 8 }}>
                      Rejected on: {new Date(request.rejectedDate).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}