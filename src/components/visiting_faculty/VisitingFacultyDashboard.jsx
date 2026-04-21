// src/components/visiting_faculty/VisitingFacultyDashboard.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { Sidebar, Card, Title, Badge, Button } from "../common";
import { WeeklyTimetableView } from "../shared/WeeklyTimetableView";
import { LeaveManagementPanel } from "../shared/LeaveManagementPanel";
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "../../utils/storage";
import { AppState } from "../../AppState";
import { DEFAULT_VISITING_FACULTY_PERMISSIONS } from "../../data/mockData";
import { C } from "../../styles/theme";

export function VisitingFacultyDashboard() {
  const { user } = useAuth();
  const [active, setActive] = useState("overview");
  const [collapsed, setCollapsed] = useState(false);
  const [permissions, setPermissions] = useState(DEFAULT_VISITING_FACULTY_PERMISSIONS);
  const [refresh, setRefresh] = useState(0);
  const [syllabusData, setSyllabusData] = useState({});
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    loadPermissions();
    loadSyllabusData();
    loadTimetable();
    
    const handleStorageChange = () => {
      loadPermissions();
      loadSyllabusData();
      loadTimetable();
      setRefresh(r => r + 1);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadPermissions = () => {
    try {
      const saved = loadFromStorage(STORAGE_KEYS.VISITING_FACULTY_PERMISSIONS, DEFAULT_VISITING_FACULTY_PERMISSIONS);
      console.log("Visiting Faculty - Loaded permissions:", saved);
      setPermissions(saved);
    } catch (error) {
      console.error("Error loading permissions:", error);
      setPermissions(DEFAULT_VISITING_FACULTY_PERMISSIONS);
    }
  };

  const loadSyllabusData = () => {
    const savedSyllabus = loadFromStorage(STORAGE_KEYS.VISITING_FACULTY_SYLLABUS, {});
    setSyllabusData(savedSyllabus);
  };

  const loadTimetable = () => {
    // Load manually scheduled timetable from Director
    const allTimetables = loadFromStorage(STORAGE_KEYS.VISITING_FACULTY_TIMETABLE, {});
    const facultyTimetable = allTimetables[user?.id] || [];
    setSchedule(facultyTimetable);
  };

  const faculty = AppState.faculty.find(f => f.id === user?.id);
  
  // Get subjects for visiting faculty's course
  const getSubjectsForCourse = () => {
    const subjects = [];
    if (faculty?.course) {
      const allSubjects = AppState.subjects || [];
      const courseSubjects = allSubjects.filter(s => s.course === faculty.course && s.approvalStatus === "approved");
      subjects.push(...courseSubjects);
    }
    return subjects;
  };

  const subjects = getSubjectsForCourse();

  const updateSyllabusProgress = (subjectId, moduleIndex, completed) => {
    const key = `${user.id}_${subjectId}`;
    const currentProgress = syllabusData[key] || { completedModules: 0, modules: [] };
    const updatedModules = [...(currentProgress.modules || [])];
    updatedModules[moduleIndex] = completed;
    const completedModules = updatedModules.filter(m => m).length;
    
    const updatedProgress = {
      ...currentProgress,
      modules: updatedModules,
      completedModules: completedModules,
      lastUpdated: new Date().toISOString(),
      completionPercentage: (completedModules / (currentProgress.totalModules || 4)) * 100
    };
    
    const newSyllabusData = { ...syllabusData, [key]: updatedProgress };
    setSyllabusData(newSyllabusData);
    saveToStorage(STORAGE_KEYS.VISITING_FACULTY_SYLLABUS, newSyllabusData);
  };

  const getProgress = (subjectId) => {
    const key = `${user.id}_${subjectId}`;
    return syllabusData[key] || { completedModules: 0, modules: [], totalModules: 4 };
  };

  // Build navigation based on permissions
  const VISITING_NAV = [
    { id: "overview", icon: "📊", label: "Overview" },
  ];
  
  if (permissions.canViewTimetable) {
    VISITING_NAV.push({ id: "timetable", icon: "📅", label: "My Schedule" });
  }
  if (permissions.canViewSyllabus) {
    VISITING_NAV.push({ id: "syllabus", icon: "📚", label: "Syllabus" });
  }
  if (permissions.canViewProfile) {
    VISITING_NAV.push({ id: "profile", icon: "👤", label: "Profile" });
  }
  if (permissions.canRequestLeave) {
    VISITING_NAV.push({ id: "leaves", icon: "🏖️", label: "Leave Requests" });
  }

  const panels = {
    overview: (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Title>Visiting Faculty Dashboard</Title>
        
        <Card>
          <Title level={4}>Welcome, {user?.name}</Title>
          <p style={{ color: C.text.secondary, marginBottom: 16 }}>
            You are logged in as Visiting Faculty. The Director has granted you the following permissions:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
            <div>
              <p style={{ color: permissions.canViewTimetable ? C.accent.green : C.accent.red }}>
                📅 View Timetable: {permissions.canViewTimetable ? "✓ Enabled" : "✗ Disabled"}
              </p>
              <p style={{ color: permissions.canViewSyllabus ? C.accent.green : C.accent.red }}>
                📚 View Syllabus: {permissions.canViewSyllabus ? "✓ Enabled" : "✗ Disabled"}
              </p>
              <p style={{ color: permissions.canUpdateSyllabus ? C.accent.green : C.accent.red }}>
                ✏️ Update Syllabus: {permissions.canUpdateSyllabus ? "✓ Enabled" : "✗ Disabled"}
              </p>
              <p style={{ color: permissions.canViewProfile ? C.accent.green : C.accent.red }}>
                👤 View Profile: {permissions.canViewProfile ? "✓ Enabled" : "✗ Disabled"}
              </p>
            </div>
            <div>
              <p style={{ color: permissions.canRequestLeave ? C.accent.green : C.accent.red }}>
                🏖️ Request Leave: {permissions.canRequestLeave ? "✓ Enabled" : "✗ Disabled"}
              </p>
              <p style={{ color: permissions.canViewStudents ? C.accent.green : C.accent.red }}>
                👨‍🎓 View Students: {permissions.canViewStudents ? "✓ Enabled" : "✗ Disabled"}
              </p>
              <p style={{ color: permissions.canSubmitGrades ? C.accent.green : C.accent.red }}>
                📊 Submit Grades: {permissions.canSubmitGrades ? "✓ Enabled" : "✗ Disabled"}
              </p>
              <p style={{ color: permissions.canRaiseIssues ? C.accent.green : C.accent.red }}>
                ⚠️ Raise Issues: {permissions.canRaiseIssues ? "✓ Enabled" : "✗ Disabled"}
              </p>
            </div>
          </div>
          <div style={{ marginTop: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
            <p style={{ textAlign: "center" }}>
              <strong>Maximum Weekly Hours:</strong> {permissions.maxHoursPerWeek} hours
            </p>
          </div>
        </Card>

        {permissions.canViewTimetable && schedule && schedule.length > 0 && (
          <Card>
            <Title level={4}>Upcoming Classes</Title>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {schedule.slice(0, 5).map(slot => (
                <div key={slot.id} style={{ padding: 12, background: C.cardHover, borderRadius: 8 }}>
                  <p><strong>{slot.subject}</strong> - {slot.day} at {slot.time}</p>
                  <p style={{ fontSize: 12, color: C.text.tertiary }}>Room: {slot.room}</p>
                </div>
              ))}
            </div>
          </Card>
        )}
        
        {permissions.canViewTimetable && (!schedule || schedule.length === 0) && (
          <Card>
            <p style={{ textAlign: "center", padding: 20, color: C.text.tertiary }}>
              No schedule assigned yet. The Director will assign your timetable.
            </p>
          </Card>
        )}
      </div>
    ),
    
    timetable: permissions.canViewTimetable ? (
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <Title>My Schedule</Title>
        {schedule.length === 0 ? (
          <Card>
            <p style={{ textAlign: "center", padding: 40, color: C.text.tertiary }}>
              No schedule available yet. The Director will assign your schedule manually.
            </p>
          </Card>
        ) : (
          <WeeklyTimetableView schedule={schedule} title={`${faculty?.name} - ${faculty?.course}`} />
        )}
      </div>
    ) : <Card><p style={{ textAlign: "center", padding: 40 }}>⚠️ You don't have permission to view timetable.</p></Card>,
    
    syllabus: permissions.canViewSyllabus ? (
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <Title>Syllabus Progress</Title>
        {subjects.length === 0 ? (
          <Card>
            <p style={{ textAlign: "center", padding: 40, color: C.text.tertiary }}>
              No subjects assigned yet for {faculty?.course} course.
            </p>
          </Card>
        ) : (
          subjects.map(subject => {
            const progress = getProgress(subject.id);
            const totalModules = subject.modules || 4;
            const completedModules = progress?.completedModules || 0;
            const completionPercentage = (completedModules / totalModules) * 100;
            
            return (
              <Card key={subject.id}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <div>
                    <h4 style={{ color: C.text.primary, fontSize: 16, fontWeight: 600 }}>{subject.name}</h4>
                    <p style={{ color: C.text.tertiary, fontSize: 12 }}>Code: {subject.code}</p>
                    <p style={{ color: C.text.tertiary, fontSize: 11, marginTop: 4 }}>
                      {subject.subjectType} | {subject.examType} | {subject.totalWeeklyClasses} hrs/week
                    </p>
                  </div>
                  <Badge variant={completionPercentage >= 75 ? "success" : completionPercentage >= 50 ? "warning" : "danger"}>
                    {Math.round(completionPercentage)}% Complete
                  </Badge>
                </div>
                
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ color: C.text.secondary, fontSize: 13 }}>Progress: {completedModules}/{totalModules} Modules</span>
                  </div>
                  <div style={{ height: 8, background: C.border, borderRadius: 10, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${completionPercentage}%`, background: completionPercentage >= 75 ? C.accent.green : completionPercentage >= 50 ? C.accent.gold : C.accent.red }} />
                  </div>
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 8 }}>
                  {Array.from({ length: totalModules }).map((_, idx) => {
                    const isCompleted = progress?.modules?.[idx] || false;
                    return (
                      <button
                        key={idx}
                        onClick={() => permissions.canUpdateSyllabus && updateSyllabusProgress(subject.id, idx, !isCompleted)}
                        style={{
                          padding: "8px",
                          background: isCompleted ? C.accent.greenBg : "transparent",
                          border: `1px solid ${isCompleted ? C.accent.green : C.border}`,
                          borderRadius: 8,
                          cursor: permissions.canUpdateSyllabus ? "pointer" : "default",
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          color: C.text.primary,
                          opacity: permissions.canUpdateSyllabus ? 1 : 0.6,
                        }}
                        disabled={!permissions.canUpdateSyllabus}
                      >
                        <div style={{
                          width: 16,
                          height: 16,
                          borderRadius: 4,
                          background: isCompleted ? C.accent.green : "transparent",
                          border: `2px solid ${isCompleted ? C.accent.green : C.text.tertiary}`,
                        }}>
                          {isCompleted && <span style={{ color: "#ffffff", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</span>}
                        </div>
                        <span style={{ fontSize: 12 }}>Module {idx + 1}</span>
                      </button>
                    );
                  })}
                </div>
              </Card>
            );
          })
        )}
      </div>
    ) : <Card><p style={{ textAlign: "center", padding: 40 }}>⚠️ You don't have permission to view syllabus.</p></Card>,
    
    profile: permissions.canViewProfile ? (
      <Card>
        <Title level={4}>Visiting Faculty Profile</Title>
        <div style={{ display: "flex", gap: 32, alignItems: "center", marginTop: 20, flexWrap: "wrap" }}>
          <div style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: C.accent.greenBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            fontWeight: 700,
            color: C.accent.green,
          }}>
            {user?.avatar}
          </div>
          <div>
            <h3 style={{ color: C.text.primary, fontSize: 24, fontWeight: 600, marginBottom: 8 }}>{user?.name}</h3>
            <p style={{ color: C.accent.blue, fontSize: 15, marginBottom: 4 }}>Email: {user?.email}</p>
            <p style={{ color: C.accent.blue, fontSize: 15, marginBottom: 4 }}>Role: Visiting Faculty</p>
            <p style={{ color: C.text.secondary, fontSize: 14 }}>Designation: {faculty?.designation || "Visiting Professor"}</p>
            <p style={{ color: C.text.secondary, fontSize: 14 }}>Course: {faculty?.course || "Not Assigned"}</p>
          </div>
        </div>
        
        <div style={{ marginTop: 24, padding: 16, background: C.cardHover, borderRadius: 12 }}>
          <h5 style={{ marginBottom: 8 }}>Permission Summary</h5>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>Timetable Access: {permissions.canViewTimetable ? "✓" : "✗"}</li>
            <li>Syllabus Access: {permissions.canViewSyllabus ? "✓" : "✗"}</li>
            <li>Syllabus Update: {permissions.canUpdateSyllabus ? "✓" : "✗"}</li>
            <li>Leave Requests: {permissions.canRequestLeave ? "✓" : "✗"}</li>
            <li>Max Hours/Week: {permissions.maxHoursPerWeek} hours</li>
          </ul>
        </div>
        
        <div style={{ marginTop: 16, padding: 16, background: C.accent.blueBg, borderRadius: 12 }}>
          <h5 style={{ marginBottom: 8 }}>Schedule Summary</h5>
          <p>Total Classes: {schedule.length}</p>
          <p>Total Weekly Hours: {schedule.reduce((sum, slot) => {
            const subject = AppState.subjects?.find(s => s.id === slot.subjectId);
            return sum + (subject?.totalWeeklyClasses || 0);
          }, 0)} hours</p>
        </div>
      </Card>
    ) : <Card><p style={{ textAlign: "center", padding: 40 }}>⚠️ You don't have permission to view profile.</p></Card>,
    
    leaves: permissions.canRequestLeave ? <LeaveManagementPanel /> : <Card><p style={{ textAlign: "center", padding: 40 }}>⚠️ You don't have permission to request leave.</p></Card>,
  };

  const currentPanel = panels[active] || panels.overview;

  if (!user) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", background: C.bg, alignItems: "center", justifyContent: "center" }}>
        <Card>
          <p style={{ textAlign: "center", padding: 40 }}>Loading...</p>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
      <Sidebar
        navItems={VISITING_NAV}
        active={active}
        setActive={setActive}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        user={user}
        accentColor={C.accent.green}
      />
      <main style={{ flex: 1, overflow: "auto" }}>
        <header style={{
          background: C.nav,
          borderBottom: `1px solid ${C.navBorder}`,
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}>
          <h2 style={{ color: C.text.primary, fontSize: 20, fontWeight: 600 }}>
            {VISITING_NAV.find(n => n.id === active)?.label || "Dashboard"}
          </h2>
          <Badge variant="success">
            Visiting Faculty - {user?.name}
          </Badge>
        </header>
        <div style={{ padding: 32 }}>{currentPanel}</div>
      </main>
    </div>
  );
}