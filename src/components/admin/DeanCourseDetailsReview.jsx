
// src/components/admin/DeanCourseDetailsReview.jsx
import { useState, useEffect } from "react";
import { Card, Title, Badge, Button } from "../common";
import { TimetableConfigModal } from "../shared/TimetableConfigModal";
import { AppState } from "../../AppState";
import { C } from "../../styles/theme";

export function DeanCourseDetailsReview() {
  const [refresh, setRefresh] = useState(0);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [generating, setGenerating] = useState(false);
  
  useEffect(() => {
    const handleStorageChange = () => {
      setRefresh(r => r + 1);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  // Get course details pending dean approval (submitted by faculty)
  const pendingDeanApprovals = AppState.courseDetails.filter(c => 
    c.deanStatus === "pending" && c.submittedAt
  );
  const approvedCourses = AppState.courseDetails.filter(c => c.deanStatus === "approved");
  const totalCourses = AppState.courseDetails.length;
  
  const handleApprove = (courseId) => {
    AppState.updateCourseDetailDeanStatus(courseId, "approved");
    setRefresh(r => r + 1);
    window.dispatchEvent(new Event('storage'));
    alert("Course approved successfully!");
  };
  
  const handleReject = (courseId) => {
    const reason = prompt("Enter rejection reason:");
    if (reason) {
      AppState.updateCourseDetailDeanStatus(courseId, "rejected", reason);
      setRefresh(r => r + 1);
      window.dispatchEvent(new Event('storage'));
      alert("Course rejected!");
    }
  };
  
  const handleGenerateTimetable = (config) => {
    setGenerating(true);
    try {
      const approvedCoursesList = AppState.courseDetails.filter(c => c.deanStatus === "approved");
      
      if (approvedCoursesList.length === 0) {
        alert(`No approved courses found.`);
        setGenerating(false);
        return;
      }
      
      const generatedTimetable = AppState.generateTimetable();
      
      if (generatedTimetable && generatedTimetable.length > 0) {
        alert(`✅ Timetable generated successfully with ${generatedTimetable.length} slots!`);
        setRefresh(r => r + 1);
        window.dispatchEvent(new Event('storage'));
      } else {
        alert(`⚠️ No timetable slots were generated.\n\nApproved courses: ${approvedCoursesList.length}`);
      }
    } catch (error) {
      console.error("Error generating timetable:", error);
      alert("Error generating timetable: " + error.message);
    } finally {
      setGenerating(false);
      setShowConfigModal(false);
    }
  };
  
  const allCoursesApproved = totalCourses > 0 && 
    AppState.courseDetails.every(c => c.deanStatus === "approved");
  
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <TimetableConfigModal 
        isOpen={showConfigModal} 
        onClose={() => setShowConfigModal(false)} 
        onGenerate={handleGenerateTimetable}
      />
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <Title>Course Details Approval (Dean)</Title>
        {totalCourses > 0 && allCoursesApproved && (
          <Button 
            onClick={() => setShowConfigModal(true)} 
            variant="success"
            disabled={generating}
            size="lg"
          >
            {generating ? "⏳ Generating..." : "⚙️ Configure & Generate Timetable"}
          </Button>
        )}
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        <Card padding="20px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Pending Approval</p>
          <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{pendingDeanApprovals.length}</p>
        </Card>
        <Card padding="20px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Approved Courses</p>
          <p style={{ color: C.accent.green, fontSize: 32, fontWeight: 700 }}>{approvedCourses.length}</p>
        </Card>
        <Card padding="20px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Total Courses</p>
          <p style={{ color: C.accent.blue, fontSize: 32, fontWeight: 700 }}>{totalCourses}</p>
        </Card>
      </div>
      
      {pendingDeanApprovals.length > 0 ? (
        pendingDeanApprovals.map(course => {
          const faculty = AppState.faculty.find(f => f.id === course.facultyId);
          const subject = AppState.subjects.find(s => s.id === course.subjectId);
          
          return (
            <Card key={course.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: faculty ? `${faculty.color}20` : C.accent.blueBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: faculty?.color || C.accent.blue,
                    fontWeight: 700,
                    fontSize: 18,
                  }}>
                    {faculty?.avatar || "?"}
                  </div>
                  <div>
                    <p style={{ color: C.text.primary, fontWeight: 600, fontSize: 16 }}>{faculty?.name || "Unknown Faculty"}</p>
                    <p style={{ color: C.accent.blue, fontSize: 14 }}>{course.subjectName} ({course.subjectCode})</p>
                    <p style={{ color: C.text.tertiary, fontSize: 12 }}>{course.course} Semester {course.semester}</p>
                  </div>
                </div>
                <Badge variant="warning">Pending Dean Approval</Badge>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12, marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
                <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Credits</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.credits}</span></div>
                <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Modules</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.modules}</span></div>
                <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Theory Classes</span><br /><span style={{ color: C.accent.blue, fontSize: 18, fontWeight: 600 }}>{course.theoryClassesPerWeek}/week</span></div>
                <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Lab Periods</span><br /><span style={{ color: C.accent.green, fontSize: 18, fontWeight: 600 }}>{course.labPeriodsPerWeek}/week</span></div>
              </div>
              
              <div style={{ marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
                <p style={{ color: C.accent.gold, fontSize: 14 }}>Total Weekly Classes per Section: <strong>{course.totalWeeklyClasses}</strong></p>
                <p style={{ color: C.accent.gold, fontSize: 14 }}>Total Sessions (3 sections): <strong>{course.totalWeeklyClasses * 3}</strong></p>
              </div>
              
              {course.submittedAt && (
                <div style={{ marginBottom: 16, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
                  <p style={{ color: C.text.secondary, fontSize: 12 }}>
                    <strong>Submitted by Faculty:</strong> {new Date(course.submittedAt).toLocaleString()}
                  </p>
                </div>
              )}
              
              <div style={{ display: "flex", gap: 12 }}>
                <Button onClick={() => handleApprove(course.id)} variant="success" fullWidth>
                  ✓ Approve Course
                </Button>
                <Button onClick={() => handleReject(course.id)} variant="danger" fullWidth>
                  ✗ Reject Course
                </Button>
              </div>
            </Card>
          );
        })
      ) : (
        <Card>
          <div style={{ textAlign: "center", padding: "20px" }}>
            <p style={{ color: C.accent.green, fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
              ✓ No pending course approvals!
            </p>
            {allCoursesApproved && totalCourses > 0 && (
              <p style={{ color: C.text.secondary }}>All courses are approved. Click the button above to generate the timetable.</p>
            )}
            {totalCourses === 0 && (
              <p style={{ color: C.text.tertiary }}>No course details have been submitted yet.</p>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}