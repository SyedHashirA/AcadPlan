// // src/components/director/DirectorCourseDetailsReview.jsx
// import { useState, useEffect } from "react";
// import { Card, Title, Badge } from "../common";
// import { AppState } from "../../AppState";
// import { C } from "../../styles/theme";

// export function DirectorCourseDetailsReview() {
//   const [refresh, setRefresh] = useState(0);

//   useEffect(() => {
//     const handleStorageChange = () => setRefresh(r => r + 1);
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   const allCourses = AppState.courseDetails;

//   const coordinatorApprovedCount = allCourses.filter(c => c.coordinatorStatus === "approved").length;
//   const deanApprovedCount = allCourses.filter(c => c.deanStatus === "approved").length;
//   const pendingCount = allCourses.filter(c => c.coordinatorStatus === "pending").length;

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <Title>Course Details Overview (Director)</Title>

//       <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Total Courses</p>
//           <p style={{ color: C.accent.blue, fontSize: 32, fontWeight: 700 }}>{allCourses.length}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Coordinator Approved</p>
//           <p style={{ color: C.accent.green, fontSize: 32, fontWeight: 700 }}>{coordinatorApprovedCount}</p>
//         </Card>
//         <Card padding="20px">
//           <p style={{ color: C.text.tertiary, fontSize: 12 }}>Dean Approved</p>
//           <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{deanApprovedCount}</p>
//         </Card>
//       </div>

//       {allCourses.length === 0 ? (
//         <Card>
//           <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>
//             No course details have been submitted yet.
//           </p>
//         </Card>
//       ) : (
//         allCourses.map(course => {
//           const faculty = AppState.faculty.find(f => f.id === course.facultyId);
//           return (
//             <Card key={course.id}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
//                 <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
//                   <div style={{
//                     width: 48,
//                     height: 48,
//                     borderRadius: "50%",
//                     background: faculty ? `${faculty.color}20` : C.accent.blueBg,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: faculty?.color || C.accent.blue,
//                     fontWeight: 700,
//                   }}>
//                     {faculty?.avatar || "?"}
//                   </div>
//                   <div>
//                     <p style={{ color: C.text.primary, fontWeight: 600, fontSize: 16 }}>
//                       {faculty?.name || "Unknown Faculty"}
//                     </p>
//                     <p style={{ color: C.accent.blue, fontSize: 14 }}>
//                       {course.subjectName} ({course.subjectCode})
//                     </p>
//                     <p style={{ color: C.text.tertiary, fontSize: 12 }}>
//                       {course.course} Sem {course.semester}
//                     </p>
//                   </div>
//                 </div>
//                 <div style={{ display: "flex", gap: 8 }}>
//                   <Badge variant={course.coordinatorStatus === "approved" ? "success" : "warning"}>
//                     Coordinator: {course.coordinatorStatus}
//                   </Badge>
//                   <Badge variant={course.deanStatus === "approved" ? "success" : "warning"}>
//                     Dean: {course.deanStatus}
//                   </Badge>
//                 </div>
//               </div>

//               <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Credits</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.credits}</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Modules</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.modules}</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Theory</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.theoryClassesPerWeek}h</span></div>
//                 <div><span style={{ color: C.text.tertiary, fontSize: 11 }}>Lab</span><br /><span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.labPeriodsPerWeek}h</span></div>
//               </div>

//               <div style={{ marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
//                 <p style={{ color: C.accent.gold, fontSize: 14 }}>Total Weekly Classes per Section: {course.totalWeeklyClasses}</p>
//                 <p style={{ color: C.accent.gold, fontSize: 14 }}>Total Sessions (3 sections): {course.totalWeeklyClasses * 3}</p>
//               </div>

//               {(course.coordinatorFeedback || course.deanFeedback) && (
//                 <div style={{ marginTop: 12 }}>
//                   {course.coordinatorFeedback && (
//                     <div style={{ padding: 8, background: C.accent.blueBg, borderRadius: 8, marginBottom: 8 }}>
//                       <span style={{ color: C.accent.blue, fontWeight: 600 }}>Coordinator Feedback:</span> {course.coordinatorFeedback}
//                     </div>
//                   )}
//                   {course.deanFeedback && (
//                     <div style={{ padding: 8, background: C.accent.goldBg, borderRadius: 8 }}>
//                       <span style={{ color: C.accent.gold, fontWeight: 600 }}>Dean Feedback:</span> {course.deanFeedback}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </Card>
//           );
//         })
//       )}
//     </div>
//   );
// }

// src/components/director/DirectorCourseDetailsReview.jsx
import { useState, useEffect } from "react";
import { Card, Title, Badge, Select } from "../common";
import { AppState } from "../../AppState";
import { COURSES } from "../../data/mockData";
import { loadFromStorage, STORAGE_KEYS } from "../../utils/storage";
import { C } from "../../styles/theme";

export function DirectorCourseDetailsReview() {
  const [refresh, setRefresh] = useState(0);
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [activeDepartment, setActiveDepartment] = useState(null);

  useEffect(() => {
    const handleStorageChange = () => setRefresh(r => r + 1);
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    loadActiveDepartment();
  }, []);

  const loadActiveDepartment = () => {
    const active = loadFromStorage(STORAGE_KEYS.ACTIVE_DEPARTMENT, null);
    setActiveDepartment(active);
  };

  // Filter courses based on selected department or active department
  let allCourses = AppState.courseDetails || [];
  
  // If active department is set, prioritize showing that department's courses
  const filterDepartment = activeDepartment && selectedDepartment === "all" ? activeDepartment : selectedDepartment;
  
  if (filterDepartment !== "all") {
    allCourses = allCourses.filter(c => c.course === filterDepartment);
  }

  const coordinatorApprovedCount = allCourses.filter(c => c.coordinatorStatus === "approved").length;
  const deanApprovedCount = allCourses.filter(c => c.deanStatus === "approved").length;
  const pendingCount = allCourses.filter(c => c.coordinatorStatus === "pending").length;

  const getDepartmentColor = (department) => {
    switch(department) {
      case "BTech": return C.accent.blue;
      case "BSc": return C.accent.green;
      case "BCA": return C.accent.gold;
      default: return C.text.primary;
    }
  };

  const getDepartmentBg = (department) => {
    switch(department) {
      case "BTech": return C.accent.blueBg;
      case "BSc": return C.accent.greenBg;
      case "BCA": return C.accent.goldBg;
      default: return C.cardHover;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Title>Course Details Overview (Director)</Title>

      {/* Active Department Indicator */}
      {activeDepartment && (
        <div style={{ 
          padding: 12, 
          background: getDepartmentBg(activeDepartment), 
          borderRadius: 8,
          border: `1px solid ${getDepartmentColor(activeDepartment)}`,
          marginBottom: 8
        }}>
          <p style={{ margin: 0, textAlign: "center" }}>
            <strong>Currently Active Department for Timetable Generation:</strong>{' '}
            <span style={{ color: getDepartmentColor(activeDepartment), fontWeight: 600 }}>
              {activeDepartment}
            </span>
          </p>
        </div>
      )}

      {/* Department Filter */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ width: 250 }}>
          <Select
            label="Filter by Department"
            value={selectedDepartment}
            onChange={e => setSelectedDepartment(e.target.value)}
            options={[
              { value: "all", label: "All Departments" },
              ...COURSES.map(c => ({ value: c, label: c }))
            ]}
          />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Badge variant="primary">Total: {allCourses.length}</Badge>
          <Badge variant="success">Dean Approved: {deanApprovedCount}</Badge>
          <Badge variant="warning">Pending: {pendingCount}</Badge>
        </div>
      </div>

      {/* Statistics Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        <Card padding="20px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Total Courses</p>
          <p style={{ color: C.accent.blue, fontSize: 32, fontWeight: 700 }}>{allCourses.length}</p>
        </Card>
        <Card padding="20px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Coordinator Approved</p>
          <p style={{ color: C.accent.green, fontSize: 32, fontWeight: 700 }}>{coordinatorApprovedCount}</p>
        </Card>
        <Card padding="20px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Dean Approved</p>
          <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>{deanApprovedCount}</p>
        </Card>
      </div>

      {allCourses.length === 0 ? (
        <Card>
          <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>
            {filterDepartment !== "all" 
              ? `No course details have been submitted for ${filterDepartment} yet.`
              : "No course details have been submitted yet."}
          </p>
        </Card>
      ) : (
        allCourses.map(course => {
          const faculty = AppState.faculty.find(f => f.id === course.facultyId);
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
                  }}>
                    {faculty?.avatar || "?"}
                  </div>
                  <div>
                    <p style={{ color: C.text.primary, fontWeight: 600, fontSize: 16 }}>
                      {faculty?.name || "Unknown Faculty"}
                    </p>
                    <p style={{ color: C.accent.blue, fontSize: 14 }}>
                      {course.subjectName} ({course.subjectCode})
                    </p>
                    <p style={{ color: C.text.tertiary, fontSize: 12 }}>
                      {course.course} Semester {course.semester}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <Badge variant={course.coordinatorStatus === "approved" ? "success" : "warning"}>
                    Coordinator: {course.coordinatorStatus}
                  </Badge>
                  <Badge variant={course.deanStatus === "approved" ? "success" : "warning"}>
                    Dean: {course.deanStatus}
                  </Badge>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
                <div>
                  <span style={{ color: C.text.tertiary, fontSize: 11 }}>Credits</span>
                  <br />
                  <span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.credits}</span>
                </div>
                <div>
                  <span style={{ color: C.text.tertiary, fontSize: 11 }}>Modules</span>
                  <br />
                  <span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.modules}</span>
                </div>
                <div>
                  <span style={{ color: C.text.tertiary, fontSize: 11 }}>Theory</span>
                  <br />
                  <span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.theoryClassesPerWeek}h</span>
                </div>
                <div>
                  <span style={{ color: C.text.tertiary, fontSize: 11 }}>Lab</span>
                  <br />
                  <span style={{ color: C.text.primary, fontSize: 18, fontWeight: 600 }}>{course.labPeriodsPerWeek}h</span>
                </div>
              </div>

              <div style={{ marginBottom: 16, padding: 12, background: C.cardHover, borderRadius: 8 }}>
                <p style={{ color: C.accent.gold, fontSize: 14 }}>
                  <strong>Total Weekly Classes per Section:</strong> {course.totalWeeklyClasses}
                </p>
                <p style={{ color: C.accent.gold, fontSize: 14 }}>
                  <strong>Total Sessions (3 sections):</strong> {course.totalWeeklyClasses * 3}
                </p>
              </div>

              {(course.coordinatorFeedback || course.deanFeedback) && (
                <div style={{ marginTop: 12 }}>
                  {course.coordinatorFeedback && (
                    <div style={{ padding: 8, background: C.accent.blueBg, borderRadius: 8, marginBottom: 8 }}>
                      <span style={{ color: C.accent.blue, fontWeight: 600 }}>Coordinator Feedback:</span> {course.coordinatorFeedback}
                    </div>
                  )}
                  {course.deanFeedback && (
                    <div style={{ padding: 8, background: C.accent.goldBg, borderRadius: 8 }}>
                      <span style={{ color: C.accent.gold, fontWeight: 600 }}>Dean Feedback:</span> {course.deanFeedback}
                    </div>
                  )}
                </div>
              )}
            </Card>
          );
        })
      )}
      
      {/* Summary by Department */}
      <Card>
        <Title level={4}>Summary by Department</Title>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {COURSES.map(department => {
            const deptCourses = (AppState.courseDetails || []).filter(c => c.course === department);
            const deptApproved = deptCourses.filter(c => c.deanStatus === "approved").length;
            const deptTotal = deptCourses.length;
            
            return (
              <div key={department} style={{ 
                textAlign: "center", 
                padding: 12, 
                background: getDepartmentBg(department),
                borderRadius: 8,
                border: `1px solid ${getDepartmentColor(department)}`
              }}>
                <h4 style={{ color: getDepartmentColor(department), marginBottom: 8 }}>{department}</h4>
                <p style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>{deptApproved}/{deptTotal}</p>
                <p style={{ fontSize: 11, color: C.text.tertiary }}>Courses Approved</p>
                {activeDepartment === department && (
                  <Badge variant="success" style={{ marginTop: 8 }}>Active for Timetable</Badge>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}