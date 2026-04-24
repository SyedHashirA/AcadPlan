export const STORAGE_KEYS = {
  FACULTY: 'acadplan_faculty',
  SUBJECT_PREFERENCES: 'acadplan_subject_preferences',
  SUBJECTS: 'acadplan_subjects',
  COURSE_DETAILS: 'acadplan_course_details',
  TIMETABLE: 'acadplan_timetable',
  SYLLABUS_PROGRESS: 'acadplan_syllabus_progress',
  SECTIONS: 'acadplan_sections',
  ROOMS: 'acadplan_rooms',
  TIMETABLE_CONFIG: 'acadplan_timetable_config',
  SEMESTER_DETAILS: 'acadplan_semester_details',
  FLAGGED_ISSUES: 'acadplan_flagged_issues',
  STUDENT_PROGRESS: 'acadplan_student_progress',
  DEAN_APPROVALS: 'acadplan_dean_approvals',
  LEAVE_REQUESTS: 'acadplan_leave_requests',
  CALENDAR_EVENTS: 'acadplan_calendar_events',
  FORM_STATUS: 'acadplan_form_status',
  PREFERENCE_SETTINGS: 'acadplan_preference_settings',
  FACULTY_PREFERENCE_FORM: 'acadplan_faculty_preference_form',
  FACULTY_SUBMISSIONS: 'acadplan_faculty_submissions',
  CLASS_TEACHERS: 'acadplan_class_teachers',
  COURSE_LEADS: 'acadplan_course_leads',
  APPOINTMENTS: 'acadplan_appointments',
  EA_PERMISSIONS: 'acadplan_ea_permissions',
  MOCK_USERS: 'acadplan_mock_users',
  VISITING_FACULTY_SYLLABUS: 'acadplan_visiting_faculty_syllabus',
  VISITING_FACULTY_TIMETABLE: 'acadplan_visiting_faculty_timetable',
  VISITING_FACULTY_LIST: 'acadplan_visiting_faculty_list',
  FACULTY_LOCATION: 'acadplan_faculty_location',
  STUDENT_USN: 'acadplan_student_usn',
  DEPARTMENT_TIMETABLE_STATUS: 'acadplan_dept_timetable_status',
  ACTIVE_DEPARTMENT: 'acadplan_active_department',
  CURRENT_GENERATING_DEPT: 'acadplan_current_generating_dept',
};

export const loadFromStorage = (key, defaultValue) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};