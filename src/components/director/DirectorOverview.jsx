// src/components/director/DirectorOverview.jsx
import { useState, useEffect } from "react";
import { Card, Title, Badge } from "../common";
import { AppState } from "../../AppState";
import { C } from "../../styles/theme";

export function DirectorOverview() {
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const handleStorageChange = () => setRefresh(r => r + 1);
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const totalFaculty = AppState.faculty.length;
  const totalSubjects = AppState.subjects.length;
  const totalCourses = AppState.courseDetails.length;
  const totalTimetableSlots = AppState.timetable.length;

  const preferencesSubmitted = AppState.subjectPreferences.filter(p => p.submitted).length;
  const preferencesApproved = AppState.subjectPreferences.filter(p => p.status === "approved").length;

  const coursesCoordApproved = AppState.courseDetails.filter(c => c.coordinatorStatus === "approved").length;
  const coursesDeanApproved = AppState.courseDetails.filter(c => c.deanStatus === "approved").length;

  const pendingSuggestions = AppState.flaggedIssues.filter(
    i => i.type === "timetable_suggestion" && i.status === "pending"
  ).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Title>Director Overview</Title>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24 }}>
        <Card>
          <Title level={4}>System Status</Title>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <span style={{ color: C.text.secondary }}>Faculty Members:</span>
              <span style={{ color: C.text.primary, fontWeight: 600, marginLeft: 8 }}>{totalFaculty}</span>
            </div>
            <div>
              <span style={{ color: C.text.secondary }}>Subjects Defined:</span>
              <span style={{ color: C.text.primary, fontWeight: 600, marginLeft: 8 }}>{totalSubjects}</span>
            </div>
            <div>
              <span style={{ color: C.text.secondary }}>Course Details Submitted:</span>
              <span style={{ color: C.text.primary, fontWeight: 600, marginLeft: 8 }}>{totalCourses}</span>
            </div>
            <div>
              <span style={{ color: C.text.secondary }}>Timetable Slots:</span>
              <span style={{ color: C.text.primary, fontWeight: 600, marginLeft: 8 }}>{totalTimetableSlots}</span>
            </div>
          </div>
        </Card>

        <Card>
          <Title level={4}>Preference Workflow</Title>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <span style={{ color: C.text.secondary }}>Submitted Preferences:</span>
              <span style={{ color: C.accent.gold, fontWeight: 600, marginLeft: 8 }}>{preferencesSubmitted}/{totalFaculty}</span>
            </div>
            <div>
              <span style={{ color: C.text.secondary }}>Approved Preferences:</span>
              <span style={{ color: C.accent.green, fontWeight: 600, marginLeft: 8 }}>{preferencesApproved}/{totalFaculty}</span>
            </div>
            <div>
              <span style={{ color: C.text.secondary }}>Coordinator Approved Courses:</span>
              <span style={{ color: C.accent.blue, fontWeight: 600, marginLeft: 8 }}>{coursesCoordApproved}/{totalCourses}</span>
            </div>
            <div>
              <span style={{ color: C.text.secondary }}>Dean Approved Courses:</span>
              <span style={{ color: C.accent.blue, fontWeight: 600, marginLeft: 8 }}>{coursesDeanApproved}/{totalCourses}</span>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <Title level={4}>Pending Actions</Title>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <span style={{ color: C.text.secondary }}>Unsubmitted Preferences:</span>
            <span style={{ color: C.accent.red, fontWeight: 600, marginLeft: 8 }}>{totalFaculty - preferencesSubmitted}</span>
          </div>
          <div>
            <span style={{ color: C.text.secondary }}>Unapproved Preferences:</span>
            <span style={{ color: C.accent.red, fontWeight: 600, marginLeft: 8 }}>{preferencesSubmitted - preferencesApproved}</span>
          </div>
          <div>
            <span style={{ color: C.text.secondary }}>Pending Timetable Suggestions:</span>
            <span style={{ color: C.accent.red, fontWeight: 600, marginLeft: 8 }}>{pendingSuggestions}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}