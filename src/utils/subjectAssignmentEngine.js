// src/utils/subjectAssignmentEngine.js

import { AppState } from "../AppState";
import { saveToStorage, STORAGE_KEYS } from "./storage";

export class SubjectAssignmentEngine {
  constructor(department) {
    this.department = department;
    this.facultyList = [];
    this.subjectsList = [];
    this.preferences = [];
    this.assignments = new Map();
    this.unassignedSubjects = [];
    this.multipleChoiceSubjects = new Map();
  }

  // Main function to run the assignment process
  async runAssignment() {
    this.loadData();
    this.analyzePreferences();
    this.assignSubjects();
    this.handleUnassignedSubjects();
    return this.getAssignmentReport();
  }

  loadData() {
    // Get faculty for this department
    this.facultyList = (AppState.faculty || []).filter(
      f => f.course === this.department
    );
    
    // Get subjects for this department
    this.subjectsList = (AppState.subjects || []).filter(
      s => s.course === this.department
    );
    
    // Get faculty preferences
    this.preferences = (AppState.subjectPreferences || []).filter(
      p => this.facultyList.some(f => f.id === p.facultyId)
    );
    
    console.log(`Loaded ${this.facultyList.length} faculty, ${this.subjectsList.length} subjects`);
  }

  analyzePreferences() {
    // Track which subjects are chosen by which faculty
    const subjectChoices = new Map();
    
    for (const faculty of this.facultyList) {
      const facultyPref = this.preferences.find(p => p.facultyId === faculty.id);
      if (facultyPref && facultyPref.preferences && facultyPref.preferences.length > 0) {
        for (const pref of facultyPref.preferences) {
          if (!subjectChoices.has(pref.subjectId)) {
            subjectChoices.set(pref.subjectId, []);
          }
          subjectChoices.get(pref.subjectId).push({
            facultyId: faculty.id,
            facultyName: faculty.name,
            priority: pref.priority || 1,
            preferenceLevel: pref.preferenceLevel || "medium"
          });
        }
      }
    }
    
    // Identify subjects with multiple choices and no choices
    for (const subject of this.subjectsList) {
      const choices = subjectChoices.get(subject.id) || [];
      
      if (choices.length === 0) {
        this.unassignedSubjects.push(subject);
      } else if (choices.length > 1) {
        this.multipleChoiceSubjects.set(subject.id, {
          subject: subject,
          choices: choices
        });
      }
    }
    
    console.log(`Found ${this.unassignedSubjects.length} unassigned subjects`);
    console.log(`Found ${this.multipleChoiceSubjects.size} subjects with multiple choices`);
  }

  assignSubjects() {
    // First, assign subjects with only one choice
    const singleChoiceSubjects = this.subjectsList.filter(subject => {
      const choices = this.getFacultyChoicesForSubject(subject.id);
      return choices.length === 1;
    });
    
    for (const subject of singleChoiceSubjects) {
      const choices = this.getFacultyChoicesForSubject(subject.id);
      const faculty = this.facultyList.find(f => f.id === choices[0].facultyId);
      
      if (this.canAssignSubject(faculty, subject)) {
        this.assignSubject(subject, faculty);
      }
    }
    
    // Then, handle subjects with multiple choices using priority algorithm
    for (const [subjectId, data] of this.multipleChoiceSubjects) {
      const subject = data.subject;
      const sortedChoices = this.sortChoicesByPriority(data.choices);
      
      let assigned = false;
      for (const choice of sortedChoices) {
        const faculty = this.facultyList.find(f => f.id === choice.facultyId);
        
        if (this.canAssignSubject(faculty, subject)) {
          this.assignSubject(subject, faculty);
          assigned = true;
          break;
        }
      }
      
      if (!assigned) {
        // If no one can take it, add to unassigned
        this.unassignedSubjects.push(subject);
      }
    }
  }

  getFacultyChoicesForSubject(subjectId) {
    const choices = [];
    
    for (const faculty of this.facultyList) {
      const facultyPref = this.preferences.find(p => p.facultyId === faculty.id);
      if (facultyPref && facultyPref.preferences) {
        const pref = facultyPref.preferences.find(p => p.subjectId === subjectId);
        if (pref) {
          choices.push({
            facultyId: faculty.id,
            facultyName: faculty.name,
            priority: pref.priority || 1,
            preferenceLevel: pref.preferenceLevel || "medium"
          });
        }
      }
    }
    
    return choices;
  }

  sortChoicesByPriority(choices) {
    // Sort by: priority (lower number = higher priority), then preference level
    const preferenceRank = { high: 1, medium: 2, low: 3 };
    
    return choices.sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      return (preferenceRank[a.preferenceLevel] || 2) - (preferenceRank[b.preferenceLevel] || 2);
    });
  }

  canAssignSubject(faculty, subject) {
    if (!faculty || !subject) return false;
    
    // Check if faculty is already assigned this subject
    const existingAssignments = this.assignments.get(faculty.id) || [];
    if (existingAssignments.some(a => a.subjectId === subject.id)) {
      return false;
    }
    
    // Calculate current total hours for this faculty
    const currentHours = existingAssignments.reduce((sum, a) => sum + a.hours, 0);
    const newTotal = currentHours + subject.totalWeeklyClasses;
    
    // Check against faculty max hours
    const maxHours = faculty.maxHours || 
                    (faculty.designation === "Professor" ? 10 :
                     faculty.designation === "Associate Professor" ? 12 : 14);
    
    return newTotal <= maxHours;
  }

  assignSubject(subject, faculty) {
    if (!this.assignments.has(faculty.id)) {
      this.assignments.set(faculty.id, []);
    }
    
    this.assignments.get(faculty.id).push({
      subjectId: subject.id,
      subjectName: subject.name,
      subjectCode: subject.code,
      hours: subject.totalWeeklyClasses,
      credits: subject.credits,
      semester: subject.semester
    });
    
    console.log(`Assigned ${subject.name} to ${faculty.name}`);
  }

  handleUnassignedSubjects() {
    if (this.unassignedSubjects.length === 0) return;
    
    // First, try to find faculty with remaining capacity
    for (const subject of [...this.unassignedSubjects]) {
      let assigned = false;
      
      // Sort faculty by available hours (most available first)
      const availableFaculty = this.facultyList
        .map(faculty => ({
          faculty,
          currentHours: (this.assignments.get(faculty.id) || []).reduce((sum, a) => sum + a.hours, 0),
          maxHours: faculty.maxHours || 
                   (faculty.designation === "Professor" ? 10 :
                    faculty.designation === "Associate Professor" ? 12 : 14)
        }))
        .filter(f => f.currentHours + subject.totalWeeklyClasses <= f.maxHours)
        .sort((a, b) => (b.maxHours - b.currentHours) - (a.maxHours - a.currentHours));
      
      if (availableFaculty.length > 0) {
        this.assignSubject(subject, availableFaculty[0].faculty);
        this.unassignedSubjects = this.unassignedSubjects.filter(s => s.id !== subject.id);
        assigned = true;
      }
      
      if (!assigned) {
        console.warn(`Cannot assign ${subject.name} - no faculty available`);
      }
    }
    
    // If still unassigned, suggest creating course details for next semester
    if (this.unassignedSubjects.length > 0) {
      console.error(`${this.unassignedSubjects.length} subjects cannot be assigned due to capacity constraints`);
    }
  }

  getAssignmentReport() {
    const report = {
      totalSubjects: this.subjectsList.length,
      assignedSubjects: 0,
      unassignedSubjects: this.unassignedSubjects,
      multipleChoiceSubjects: Array.from(this.multipleChoiceSubjects.values()),
      facultyAssignments: [],
      recommendations: []
    };
    
    // Build faculty assignments
    for (const [facultyId, subjects] of this.assignments) {
      const faculty = this.facultyList.find(f => f.id === facultyId);
      const totalHours = subjects.reduce((sum, s) => sum + s.hours, 0);
      const maxHours = faculty.maxHours || 
                      (faculty.designation === "Professor" ? 10 :
                       faculty.designation === "Associate Professor" ? 12 : 14);
      
      report.assignedSubjects += subjects.length;
      report.facultyAssignments.push({
        facultyId: faculty.id,
        facultyName: faculty.name,
        subjects: subjects,
        totalHours: totalHours,
        maxHours: maxHours,
        utilization: (totalHours / maxHours) * 100,
        hasCapacity: totalHours < maxHours
      });
    }
    
    // Generate recommendations
    if (this.unassignedSubjects.length > 0) {
      report.recommendations.push({
        type: "unassigned_subjects",
        message: `${this.unassignedSubjects.length} subjects have no faculty assigned`,
        subjects: this.unassignedSubjects.map(s => s.name),
        action: "Please ask faculty to submit preferences for these subjects"
      });
    }
    
    for (const multi of this.multipleChoiceSubjects) {
      report.recommendations.push({
        type: "multiple_choices",
        message: `${multi.subject.name} has ${multi.choices.length} faculty interested`,
        subject: multi.subject.name,
        faculties: multi.choices.map(c => c.facultyName),
        action: "Auto-assigned based on priority and availability"
      });
    }
    
    // Check for faculty overload
    for (const assignment of report.facultyAssignments) {
      if (assignment.totalHours > assignment.maxHours) {
        report.recommendations.push({
          type: "faculty_overload",
          message: `${assignment.facultyName} is overloaded`,
          faculty: assignment.facultyName,
          currentHours: assignment.totalHours,
          maxHours: assignment.maxHours,
          action: "Reassign some subjects to other faculty"
        });
      }
    }
    
    return report;
  }

  async saveAssignmentsToCourseDetails() {
    const courseDetails = [];
    let id = (AppState.courseDetails?.length || 0) + 1;
    
    for (const [facultyId, subjects] of this.assignments) {
      const faculty = this.facultyList.find(f => f.id === facultyId);
      
      for (const subject of subjects) {
        courseDetails.push({
          id: id++,
          course: this.department,
          semester: subject.semester,
          subjectId: subject.subjectId,
          subjectName: subject.subjectName,
          subjectCode: subject.subjectCode,
          facultyId: facultyId,
          facultyName: faculty.name,
          credits: subject.credits,
          modules: 4,
          theoryClassesPerWeek: subject.hours,
          labPeriodsPerWeek: 0,
          totalWeeklyClasses: subject.hours,
          deanStatus: "pending",
          submittedAt: new Date().toISOString(),
          autoAssigned: true
        });
      }
    }
    
    // Merge with existing course details
    const existingDetails = AppState.courseDetails || [];
    const mergedDetails = [...existingDetails];
    
    for (const newDetail of courseDetails) {
      const exists = mergedDetails.some(d => 
        d.subjectId === newDetail.subjectId && 
        d.course === newDetail.course && 
        d.semester === newDetail.semester
      );
      
      if (!exists) {
        mergedDetails.push(newDetail);
      }
    }
    
    AppState.courseDetails = mergedDetails;
    saveToStorage(STORAGE_KEYS.COURSE_DETAILS, mergedDetails);
    
    return courseDetails.length;
  }
}

// Helper function to check for missed subjects
export function findMissedSubjects(department) {
  const subjects = (AppState.subjects || []).filter(s => s.course === department);
  const courseDetails = (AppState.courseDetails || []).filter(c => c.course === department);
  
  const assignedSubjectIds = new Set(courseDetails.map(c => c.subjectId));
  const missedSubjects = subjects.filter(s => !assignedSubjectIds.has(s.id));
  
  const partialSubjects = [];
  for (const subject of subjects) {
    const assignments = courseDetails.filter(c => c.subjectId === subject.id);
    if (assignments.length > 0 && assignments.length < 3) {
      partialSubjects.push({
        subject: subject,
        assignedSections: assignments.length,
        missingSections: 3 - assignments.length
      });
    }
  }
  
  return {
    totalSubjects: subjects.length,
    assignedSubjects: assignedSubjectIds.size,
    missedSubjects: missedSubjects,
    partialSubjects: partialSubjects,
    allAssigned: missedSubjects.length === 0 && partialSubjects.length === 0
  };
}

// Helper function to find subjects with multiple faculty assignments
export function findDuplicateAssignments(department) {
  const courseDetails = (AppState.courseDetails || []).filter(c => c.course === department);
  const subjectFacultyMap = new Map();
  
  for (const detail of courseDetails) {
    const key = `${detail.subjectId}_${detail.semester}`;
    if (!subjectFacultyMap.has(key)) {
      subjectFacultyMap.set(key, []);
    }
    subjectFacultyMap.get(key).push({
      facultyId: detail.facultyId,
      facultyName: detail.facultyName,
      courseDetailId: detail.id
    });
  }
  
  const duplicates = [];
  for (const [key, faculties] of subjectFacultyMap) {
    if (faculties.length > 1) {
      const [subjectId, semester] = key.split('_');
      const subject = (AppState.subjects || []).find(s => s.id === subjectId);
      
      duplicates.push({
        subjectId: subjectId,
        subjectName: subject?.name || subjectId,
        semester: parseInt(semester),
        faculties: faculties,
        conflictCount: faculties.length
      });
    }
  }
  
  return duplicates;
}

// Function to resolve duplicate assignments (keep the best one)
export function resolveDuplicateAssignments(department, strategy = "priority") {
  const duplicates = findDuplicateAssignments(department);
  const resolvedCount = { removed: 0, kept: 0 };
  
  for (const duplicate of duplicates) {
    if (duplicate.faculties.length <= 1) continue;
    
    let keepIndex = 0;
    
    if (strategy === "priority") {
      // Keep the assignment with highest priority (based on faculty preferences)
      const preferences = AppState.subjectPreferences || [];
      const scoredFaculties = duplicate.faculties.map((f, idx) => {
        const facultyPref = preferences.find(p => p.facultyId === f.facultyId);
        const pref = facultyPref?.preferences?.find(p => p.subjectId === duplicate.subjectId);
        const score = pref ? (pref.priority || 3) : 999;
        return { idx, score, facultyId: f.facultyId };
      });
      scoredFaculties.sort((a, b) => a.score - b.score);
      keepIndex = scoredFaculties[0].idx;
    } else if (strategy === "workload") {
      // Keep the faculty with lowest current workload
      const facultyWorkload = duplicate.faculties.map((f, idx) => {
        const faculty = (AppState.faculty || []).find(fac => fac.id === f.facultyId);
        const currentHours = faculty?.assignedHours || 0;
        const maxHours = faculty?.maxHours || 14;
        return { idx, workload: currentHours / maxHours };
      });
      facultyWorkload.sort((a, b) => a.workload - b.workload);
      keepIndex = facultyWorkload[0].idx;
    }
    
    // Remove duplicate assignments
    for (let i = 0; i < duplicate.faculties.length; i++) {
      if (i !== keepIndex) {
        const courseDetails = AppState.courseDetails || [];
        const updatedDetails = courseDetails.filter(
          d => d.id !== duplicate.faculties[i].courseDetailId
        );
        AppState.courseDetails = updatedDetails;
        saveToStorage(STORAGE_KEYS.COURSE_DETAILS, updatedDetails);
        resolvedCount.removed++;
      } else {
        resolvedCount.kept++;
      }
    }
  }
  
  return resolvedCount;
}