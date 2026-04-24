// src/utils/timetableValidator.js
export const validateTimetableFeasibility = (approvedCourses, faculty, rooms, config) => {
  const TEACHING_SLOTS_PER_WEEK = 40; // 8 slots/day × 5 days
  const results = {
    canSchedule: true,
    errors: [],
    warnings: [],
    subjectStatus: [],
    facultyWorkload: [],
    roomUtilization: {}
  };
  
  // 1. Check each subject can be scheduled
  for (const course of approvedCourses) {
    const subject = AppState.subjects.find(s => s.id === course.subjectId);
    const facultyMember = AppState.faculty.find(f => f.id === course.facultyId);
    
    // Check if faculty has enough remaining hours
    if (facultyMember.remainingHours < subject.totalWeeklyClasses) {
      results.canSchedule = false;
      results.errors.push({
        type: 'faculty_overload',
        subject: subject.name,
        faculty: facultyMember.name,
        required: subject.totalWeeklyClasses,
        available: facultyMember.remainingHours
      });
    }
    
    // Check if enough rooms available
    const requiredRoomType = subject.type === 'Lab' ? 'Lab' : 'Theory';
    const availableRooms = rooms.filter(r => r.type === requiredRoomType).length;
    if (availableRooms === 0) {
      results.canSchedule = false;
      results.errors.push({
        type: 'no_rooms',
        subject: subject.name,
        roomType: requiredRoomType
      });
    }
    
    results.subjectStatus.push({
      subjectId: subject.id,
      subjectName: subject.name,
      faculty: facultyMember.name,
      weeklyHours: subject.totalWeeklyClasses,
      canSchedule: facultyMember.remainingHours >= subject.totalWeeklyClasses
    });
  }
  
  // 2. Calculate total required slots vs available
  const totalRequiredSlots = approvedCourses.reduce((sum, course) => {
    const subject = AppState.subjects.find(s => s.id === course.subjectId);
    return sum + (subject.totalWeeklyClasses * 3); // 3 sections
  }, 0);
  
  const totalAvailableSlots = TEACHING_SLOTS_PER_WEEK * 3; // 3 sections × 40 slots
  
  if (totalRequiredSlots > totalAvailableSlots) {
    results.warnings.push({
      type: 'insufficient_slots',
      required: totalRequiredSlots,
      available: totalAvailableSlots,
      deficit: totalRequiredSlots - totalAvailableSlots
    });
  }
  
  return results;
};