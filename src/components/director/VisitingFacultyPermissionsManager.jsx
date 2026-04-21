// src/components/director/VisitingFacultyPermissionsManager.jsx
import { useState, useEffect } from "react";
import { Card, Title, Button, Badge, Input } from "../common";
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "../../utils/storage";
import { DEFAULT_VISITING_FACULTY_PERMISSIONS } from "../../data/mockData";
import { C } from "../../styles/theme";

export function VisitingFacultyPermissionsManager({ onRefresh }) {
  const [permissions, setPermissions] = useState(DEFAULT_VISITING_FACULTY_PERMISSIONS);
  const [visitingFaculty, setVisitingFaculty] = useState(null);
  const [saveStatus, setSaveStatus] = useState("");
  const [saveMessageType, setSaveMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPermissions();
    loadVisitingFaculty();
    
    const handleStorageChange = () => {
      loadPermissions();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadPermissions = () => {
    try {
      const saved = loadFromStorage(STORAGE_KEYS.VISITING_FACULTY_PERMISSIONS, DEFAULT_VISITING_FACULTY_PERMISSIONS);
      console.log("Loaded Visiting Faculty permissions:", saved);
      setPermissions(saved);
    } catch (error) {
      console.error("Error loading permissions:", error);
      setPermissions(DEFAULT_VISITING_FACULTY_PERMISSIONS);
    }
  };

  const loadVisitingFaculty = () => {
    const visiting = { id: 14, email: "visiting@university.edu", name: "Dr. James Wilson", avatar: "JW" };
    setVisitingFaculty(visiting);
  };

  const updatePermission = (key, value) => {
    const updatedPermissions = {
      ...permissions,
      [key]: value
    };
    
    setPermissions(updatedPermissions);
    saveToStorage(STORAGE_KEYS.VISITING_FACULTY_PERMISSIONS, updatedPermissions);
    
    setSaveMessageType("success");
    setSaveStatus(`${key.replace(/([A-Z])/g, ' $1').trim()} ${value ? "enabled" : "disabled"}!`);
    setTimeout(() => {
      setSaveStatus("");
      setSaveMessageType("");
    }, 2000);
    
    window.dispatchEvent(new Event('storage'));
    if (onRefresh) onRefresh();
  };

  const saveAllPermissions = () => {
    setLoading(true);
    setSaveMessageType("info");
    setSaveStatus("Saving permissions...");
    
    setTimeout(() => {
      try {
        saveToStorage(STORAGE_KEYS.VISITING_FACULTY_PERMISSIONS, permissions);
        console.log("Saved all visiting faculty permissions:", permissions);
        setSaveMessageType("success");
        setSaveStatus("✅ All permissions saved successfully!");
        window.dispatchEvent(new Event('storage'));
        
        setTimeout(() => {
          setSaveStatus("");
          setSaveMessageType("");
        }, 3000);
      } catch (error) {
        console.error("Error saving permissions:", error);
        setSaveMessageType("error");
        setSaveStatus("❌ Failed to save permissions!");
        setTimeout(() => {
          setSaveStatus("");
          setSaveMessageType("");
        }, 3000);
      }
      setLoading(false);
      if (onRefresh) onRefresh();
    }, 500);
  };

  const resetToDefault = () => {
    if (confirm("Reset all visiting faculty permissions to default?")) {
      setLoading(true);
      setSaveMessageType("info");
      setSaveStatus("Resetting permissions...");
      
      setTimeout(() => {
        try {
          saveToStorage(STORAGE_KEYS.VISITING_FACULTY_PERMISSIONS, DEFAULT_VISITING_FACULTY_PERMISSIONS);
          setPermissions(DEFAULT_VISITING_FACULTY_PERMISSIONS);
          setSaveMessageType("success");
          setSaveStatus("✅ Permissions reset to default!");
          window.dispatchEvent(new Event('storage'));
          
          setTimeout(() => {
            setSaveStatus("");
            setSaveMessageType("");
          }, 3000);
        } catch (error) {
          setSaveMessageType("error");
          setSaveStatus("❌ Failed to reset permissions!");
          setTimeout(() => {
            setSaveStatus("");
            setSaveMessageType("");
          }, 3000);
        }
        setLoading(false);
        if (onRefresh) onRefresh();
      }, 500);
    }
  };

  const getStatusColor = () => {
    switch(saveMessageType) {
      case "success": return C.accent.greenBg;
      case "error": return C.accent.redBg;
      case "info": return C.accent.blueBg;
      default: return C.accent.greenBg;
    }
  };

  const getStatusTextColor = () => {
    switch(saveMessageType) {
      case "success": return C.accent.green;
      case "error": return C.accent.red;
      case "info": return C.accent.blue;
      default: return C.accent.green;
    }
  };

  const PermissionToggle = ({ label, keyName, description, icon }) => (
    <div style={{ 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      padding: "16px 0",
      borderBottom: `1px solid ${C.border}`
    }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 20 }}>{icon}</span>
          <strong>{label}</strong>
        </div>
        <p style={{ fontSize: 12, color: C.text.tertiary, margin: "4px 0 0 28px" }}>{description}</p>
      </div>
      <label style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ color: permissions[keyName] ? C.accent.green : C.accent.red, fontSize: 13, fontWeight: 500 }}>
          {permissions[keyName] ? "Enabled" : "Disabled"}
        </span>
        <button
          onClick={() => updatePermission(keyName, !permissions[keyName])}
          style={{
            width: 50,
            height: 26,
            borderRadius: 13,
            background: permissions[keyName] ? C.accent.green : "#e2e8f0",
            border: "none",
            cursor: "pointer",
            position: "relative",
            transition: "all 0.2s"
          }}
        >
          <div style={{
            width: 22,
            height: 22,
            borderRadius: 11,
            background: "white",
            position: "absolute",
            top: 2,
            left: permissions[keyName] ? 26 : 2,
            transition: "all 0.2s"
          }} />
        </button>
      </label>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Title>Visiting Faculty Permissions</Title>
      
      {saveStatus && (
        <div style={{
          padding: 12,
          background: getStatusColor(),
          borderRadius: 8,
          color: getStatusTextColor(),
          textAlign: "center",
          fontWeight: 500,
          border: `1px solid ${getStatusTextColor()}`
        }}>
          {saveStatus}
        </div>
      )}
      
      <Card>
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: C.accent.greenBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: C.accent.green,
              fontSize: 20,
              fontWeight: 700,
            }}>
              VF
            </div>
            <div>
              <h4 style={{ color: C.text.primary }}>Dr. James Wilson (Visiting Faculty)</h4>
              <p style={{ color: C.text.tertiary, fontSize: 13 }}>visiting@university.edu</p>
            </div>
          </div>
          <p style={{ color: C.text.secondary, fontSize: 13 }}>
            Configure which features the Visiting Faculty can access. The Visiting Faculty dashboard will only show enabled features.
          </p>
          <p style={{ color: C.accent.blue, fontSize: 12, marginTop: 8 }}>
            💡 Visiting Faculty have limited access compared to regular faculty. Use these settings to control their permissions.
          </p>
        </div>
        
        <PermissionToggle 
          label="View Timetable" 
          keyName="canViewTimetable"
          icon="📅"
          description="Allow visiting faculty to view their timetable"
        />
        
        <PermissionToggle 
          label="View Syllabus" 
          keyName="canViewSyllabus"
          icon="📚"
          description="Allow visiting faculty to view syllabus"
        />
        
        <PermissionToggle 
          label="Update Syllabus Progress" 
          keyName="canUpdateSyllabus"
          icon="✏️"
          description="Allow visiting faculty to update syllabus progress"
        />
        
        <PermissionToggle 
          label="View Profile" 
          keyName="canViewProfile"
          icon="👤"
          description="Allow visiting faculty to view their profile"
        />
        
        <PermissionToggle 
          label="Request Leave" 
          keyName="canRequestLeave"
          icon="🏖️"
          description="Allow visiting faculty to request leave"
        />
        
        <PermissionToggle 
          label="View Students" 
          keyName="canViewStudents"
          icon="👨‍🎓"
          description="Allow visiting faculty to view student list"
        />
        
        <PermissionToggle 
          label="Submit Grades" 
          keyName="canSubmitGrades"
          icon="📊"
          description="Allow visiting faculty to submit grades"
        />
        
        <PermissionToggle 
          label="Access Preferences Form" 
          keyName="canAccessPreferences"
          icon="📝"
          description="Allow visiting faculty to access preference forms"
        />
        
        <PermissionToggle 
          label="Access Course Details" 
          keyName="canAccessCourseDetails"
          icon="📖"
          description="Allow visiting faculty to access course details"
        />
        
        <PermissionToggle 
          label="Raise Issues" 
          keyName="canRaiseIssues"
          icon="⚠️"
          description="Allow visiting faculty to raise issues"
        />
        
        <div style={{ marginTop: 16 }}>
          <Input
            label="Maximum Hours Per Week"
            type="number"
            min="0"
            max="20"
            value={permissions.maxHoursPerWeek}
            onChange={e => updatePermission("maxHoursPerWeek", parseInt(e.target.value))}
          />
        </div>
        
        <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
          <Button onClick={saveAllPermissions} variant="success" fullWidth disabled={loading}>
            {loading ? "Saving..." : "💾 Save All Permissions"}
          </Button>
          <Button onClick={resetToDefault} variant="secondary" fullWidth disabled={loading}>
            🔄 Reset to Default
          </Button>
        </div>
      </Card>
      
      <Card>
        <Title level={4}>Current Permission Summary</Title>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
          <div>
            <p style={{ color: permissions.canViewTimetable ? C.accent.green : C.accent.red }}>
              📅 View Timetable: {permissions.canViewTimetable ? "✓" : "✗"}
            </p>
            <p style={{ color: permissions.canViewSyllabus ? C.accent.green : C.accent.red }}>
              📚 View Syllabus: {permissions.canViewSyllabus ? "✓" : "✗"}
            </p>
            <p style={{ color: permissions.canUpdateSyllabus ? C.accent.green : C.accent.red }}>
              ✏️ Update Syllabus: {permissions.canUpdateSyllabus ? "✓" : "✗"}
            </p>
            <p style={{ color: permissions.canViewProfile ? C.accent.green : C.accent.red }}>
              👤 View Profile: {permissions.canViewProfile ? "✓" : "✗"}
            </p>
            <p style={{ color: permissions.canRequestLeave ? C.accent.green : C.accent.red }}>
              🏖️ Request Leave: {permissions.canRequestLeave ? "✓" : "✗"}
            </p>
          </div>
          <div>
            <p style={{ color: permissions.canViewStudents ? C.accent.green : C.accent.red }}>
              👨‍🎓 View Students: {permissions.canViewStudents ? "✓" : "✗"}
            </p>
            <p style={{ color: permissions.canSubmitGrades ? C.accent.green : C.accent.red }}>
              📊 Submit Grades: {permissions.canSubmitGrades ? "✓" : "✗"}
            </p>
            <p style={{ color: permissions.canAccessPreferences ? C.accent.green : C.accent.red }}>
              📝 Access Preferences: {permissions.canAccessPreferences ? "✓" : "✗"}
            </p>
            <p style={{ color: permissions.canAccessCourseDetails ? C.accent.green : C.accent.red }}>
              📖 Access Course Details: {permissions.canAccessCourseDetails ? "✓" : "✗"}
            </p>
            <p style={{ color: permissions.canRaiseIssues ? C.accent.green : C.accent.red }}>
              ⚠️ Raise Issues: {permissions.canRaiseIssues ? "✓" : "✗"}
            </p>
          </div>
        </div>
        <div style={{ marginTop: 12, padding: 12, background: C.cardHover, borderRadius: 8 }}>
          <p style={{ textAlign: "center" }}>
            <strong>Maximum Hours Per Week:</strong> {permissions.maxHoursPerWeek} hours
          </p>
        </div>
      </Card>
    </div>
  );
}