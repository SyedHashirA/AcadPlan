// // src/components/admin/EAPermissionsManager.jsx
// import { useState, useEffect } from "react";
// import { Card, Title, Button, Badge } from "../common";
// import { saveToStorage, loadFromStorage, STORAGE_KEYS } from "../../utils/storage";
// import { DEFAULT_EA_PERMISSIONS } from "../../data/mockData";
// import { C } from "../../styles/theme";

// export function EAPermissionsManager({ onRefresh }) {
//   const [permissions, setPermissions] = useState(DEFAULT_EA_PERMISSIONS);
//   const [eaUser, setEaUser] = useState(null);
//   const [refresh, setRefresh] = useState(0);

//   useEffect(() => {
//     loadPermissions();
//     loadEAUser();
//   }, [refresh]);

//   const loadPermissions = () => {
//     const savedPermissions = loadFromStorage(STORAGE_KEYS.EA_PERMISSIONS, DEFAULT_EA_PERMISSIONS);
//     setPermissions(savedPermissions);
//   };

//   const loadEAUser = () => {
//     const users = loadFromStorage(STORAGE_KEYS.MOCK_USERS, []);
//     const ea = users.find(u => u.role === "ea");
//     setEaUser(ea);
//   };

//   const updatePermission = (key, value) => {
//     const updatedPermissions = { ...permissions, [key]: value };
//     setPermissions(updatedPermissions);
//     saveToStorage(STORAGE_KEYS.EA_PERMISSIONS, updatedPermissions);
//     window.dispatchEvent(new Event('storage'));
//   };

//   const saveAllPermissions = () => {
//     saveToStorage(STORAGE_KEYS.EA_PERMISSIONS, permissions);
//     window.dispatchEvent(new Event('storage'));
//     alert("EA permissions saved successfully!");
//     if (onRefresh) onRefresh();
//   };

//   const PermissionToggle = ({ label, key, description }) => (
//     <div style={{ 
//       display: "flex", 
//       justifyContent: "space-between", 
//       alignItems: "center", 
//       padding: "12px 0",
//       borderBottom: `1px solid ${C.border}`
//     }}>
//       <div>
//         <strong>{label}</strong>
//         <p style={{ fontSize: 12, color: C.text.tertiary, margin: 0 }}>{description}</p>
//       </div>
//       <label style={{ display: "flex", alignItems: "center", gap: 12 }}>
//         <span style={{ color: permissions[key] ? C.accent.green : C.accent.red }}>
//           {permissions[key] ? "Enabled" : "Disabled"}
//         </span>
//         <button
//           onClick={() => updatePermission(key, !permissions[key])}
//           style={{
//             width: 50,
//             height: 26,
//             borderRadius: 13,
//             background: permissions[key] ? C.accent.green : C.border,
//             border: "none",
//             cursor: "pointer",
//             position: "relative",
//             transition: "all 0.2s"
//           }}
//         >
//           <div style={{
//             width: 22,
//             height: 22,
//             borderRadius: 11,
//             background: "white",
//             position: "absolute",
//             top: 2,
//             left: permissions[key] ? 26 : 2,
//             transition: "all 0.2s"
//           }} />
//         </button>
//       </label>
//     </div>
//   );

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <Title>EA (Executive Assistant) Permissions</Title>
      
//       <Card>
//         <div style={{ marginBottom: 16 }}>
//           <h4 style={{ color: C.text.primary }}>Manage EA Access</h4>
//           {eaUser && (
//             <p style={{ color: C.text.secondary, fontSize: 13 }}>
//               Managing permissions for: <strong>{eaUser.name}</strong> ({eaUser.email})
//             </p>
//           )}
//         </div>
        
//         <PermissionToggle 
//           label="Subject Approval" 
//           key="subjectApproval"
//           description="Allow EA to approve/reject subjects added by Director"
//         />
        
//         <PermissionToggle 
//           label="Preference Approval" 
//           key="preferenceApproval"
//           description="Allow EA to approve/reject faculty preferences"
//         />
        
//         <PermissionToggle 
//           label="Course Approval" 
//           key="courseApproval"
//           description="Allow EA to approve/reject course details"
//         />
        
//         <PermissionToggle 
//           label="Timetable Generation" 
//           key="timetableGeneration"
//           description="Allow EA to generate and modify timetable"
//         />
        
//         <PermissionToggle 
//           label="View Reports" 
//           key="viewReports"
//           description="Allow EA to view reports and analytics"
//         />
        
//         <PermissionToggle 
//           label="Manage Faculty" 
//           key="manageFaculty"
//           description="Allow EA to add/edit/delete faculty"
//         />
        
//         <PermissionToggle 
//           label="View All Data" 
//           key="viewAllData"
//           description="Allow EA to view all system data (read-only)"
//         />
        
//         <div style={{ marginTop: 20 }}>
//           <Button onClick={saveAllPermissions} variant="success" fullWidth>
//             Save Permissions
//           </Button>
//         </div>
//       </Card>
      
//       <Card>
//         <Title level={4}>Current Permission Summary</Title>
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
//           <div>
//             <p style={{ color: permissions.subjectApproval ? C.accent.green : C.accent.red }}>
//               📚 Subject Approval: {permissions.subjectApproval ? "✓ Enabled" : "✗ Disabled"}
//             </p>
//             <p style={{ color: permissions.preferenceApproval ? C.accent.green : C.accent.red }}>
//               ⭐ Preference Approval: {permissions.preferenceApproval ? "✓ Enabled" : "✗ Disabled"}
//             </p>
//             <p style={{ color: permissions.courseApproval ? C.accent.green : C.accent.red }}>
//               ✅ Course Approval: {permissions.courseApproval ? "✓ Enabled" : "✗ Disabled"}
//             </p>
//           </div>
//           <div>
//             <p style={{ color: permissions.timetableGeneration ? C.accent.green : C.accent.red }}>
//               📅 Timetable Generation: {permissions.timetableGeneration ? "✓ Enabled" : "✗ Disabled"}
//             </p>
//             <p style={{ color: permissions.viewReports ? C.accent.green : C.accent.red }}>
//               📊 View Reports: {permissions.viewReports ? "✓ Enabled" : "✗ Disabled"}
//             </p>
//             <p style={{ color: permissions.manageFaculty ? C.accent.green : C.accent.red }}>
//               👨‍🏫 Manage Faculty: {permissions.manageFaculty ? "✓ Enabled" : "✗ Disabled"}
//             </p>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// }

// src/components/admin/EAPermissionsManager.jsx
import { useState, useEffect } from "react";
import { Card, Title, Button, Badge } from "../common";
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "../../utils/storage";
import { C } from "../../styles/theme";

// Default all permissions to FALSE
const DEFAULT_PERMISSIONS = {
  subjectApproval: false,
  preferenceApproval: false,
  courseApproval: false,
  timetableGeneration: false,
  viewReports: false,
  manageFaculty: false,
  viewAllData: false
};

export function EAPermissionsManager({ onRefresh }) {
  const [permissions, setPermissions] = useState(DEFAULT_PERMISSIONS);
  const [saveStatus, setSaveStatus] = useState("");
  const [saveMessageType, setSaveMessageType] = useState(""); // "success" or "error"
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPermissions();
    
    const handleStorageChange = () => {
      loadPermissions();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadPermissions = () => {
    try {
      const saved = loadFromStorage(STORAGE_KEYS.EA_PERMISSIONS, DEFAULT_PERMISSIONS);
      console.log("Loaded permissions:", saved);
      setPermissions(saved);
    } catch (error) {
      console.error("Error loading permissions:", error);
      setPermissions(DEFAULT_PERMISSIONS);
    }
  };

  // Update a single permission
  const updatePermission = (key, value) => {
    const updatedPermissions = {
      ...permissions,
      [key]: value
    };
    
    console.log(`Updating ${key} to ${value}:`, updatedPermissions);
    setPermissions(updatedPermissions);
    
    // Save immediately to localStorage
    saveToStorage(STORAGE_KEYS.EA_PERMISSIONS, updatedPermissions);
    
    // Show status message
    setSaveMessageType("success");
    setSaveStatus(`${key} ${value ? "enabled" : "disabled"}!`);
    setTimeout(() => {
      setSaveStatus("");
      setSaveMessageType("");
    }, 2000);
    
    // Dispatch event for other components
    window.dispatchEvent(new Event('storage'));
    
    if (onRefresh) onRefresh();
  };

  const saveAllPermissions = () => {
    setLoading(true);
    setSaveMessageType("info");
    setSaveStatus("Saving permissions...");
    
    try {
      // Simulate a small delay to show loading state
      setTimeout(() => {
        saveToStorage(STORAGE_KEYS.EA_PERMISSIONS, permissions);
        console.log("Saved all permissions:", permissions);
        setSaveMessageType("success");
        setSaveStatus("✅ All permissions saved successfully!");
        window.dispatchEvent(new Event('storage'));
        
        setTimeout(() => {
          setSaveStatus("");
          setSaveMessageType("");
        }, 3000);
        
        setLoading(false);
        if (onRefresh) onRefresh();
      }, 500);
    } catch (error) {
      console.error("Error saving permissions:", error);
      setSaveMessageType("error");
      setSaveStatus("❌ Failed to save permissions!");
      setTimeout(() => {
        setSaveStatus("");
        setSaveMessageType("");
      }, 3000);
      setLoading(false);
    }
  };

  const resetToDefault = () => {
    if (confirm("Reset all EA permissions to default (all disabled)?")) {
      setLoading(true);
      setSaveMessageType("info");
      setSaveStatus("Resetting permissions...");
      
      setTimeout(() => {
        try {
          saveToStorage(STORAGE_KEYS.EA_PERMISSIONS, DEFAULT_PERMISSIONS);
          setPermissions(DEFAULT_PERMISSIONS);
          setSaveMessageType("success");
          setSaveStatus("✅ Permissions reset to default (all disabled)!");
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
      <Title>EA (Executive Assistant) Permissions</Title>
      
      {saveStatus && (
        <div style={{
          padding: 12,
          background: getStatusColor(),
          borderRadius: 8,
          color: getStatusTextColor(),
          textAlign: "center",
          fontWeight: 500,
          border: `1px solid ${getStatusTextColor()}`,
          transition: "all 0.3s ease"
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
              background: C.accent.purpleBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: C.accent.purple,
              fontSize: 20,
              fontWeight: 700,
            }}>
              EA
            </div>
            <div>
              <h4 style={{ color: C.text.primary }}>Sarah Johnson (Executive Assistant)</h4>
              <p style={{ color: C.text.tertiary, fontSize: 13 }}>ea@university.edu</p>
            </div>
          </div>
          <p style={{ color: C.text.secondary, fontSize: 13 }}>
            Configure which features the Executive Assistant can access. The EA dashboard will only show enabled features.
          </p>
          <p style={{ color: C.accent.blue, fontSize: 12, marginTop: 8 }}>
            💡 Changes are saved automatically when you toggle each option. Use "Save All Permissions" to ensure all changes are saved.
          </p>
        </div>
        
        <PermissionToggle 
          label="Subject Approval" 
          keyName="subjectApproval"
          icon="📚"
          description="Allow EA to approve/reject subjects added by Director"
        />
        
        <PermissionToggle 
          label="Preference Approval" 
          keyName="preferenceApproval"
          icon="⭐"
          description="Allow EA to approve/reject faculty preferences"
        />
        
        <PermissionToggle 
          label="Course Approval" 
          keyName="courseApproval"
          icon="✅"
          description="Allow EA to approve/reject course details"
        />
        
        <PermissionToggle 
          label="Timetable Generation" 
          keyName="timetableGeneration"
          icon="📅"
          description="Allow EA to generate and modify timetable"
        />
        
        <PermissionToggle 
          label="View Reports" 
          keyName="viewReports"
          icon="📊"
          description="Allow EA to view reports and analytics"
        />
        
        <PermissionToggle 
          label="Manage Faculty" 
          keyName="manageFaculty"
          icon="👨‍🏫"
          description="Allow EA to add/edit/delete faculty"
        />
        
        <PermissionToggle 
          label="View All Data" 
          keyName="viewAllData"
          icon="👁️"
          description="Allow EA to view all system data (read-only)"
        />
        
        <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
          <Button 
            onClick={saveAllPermissions} 
            variant="success" 
            fullWidth 
            disabled={loading}
          >
            {loading ? "Saving..." : "💾 Save All Permissions"}
          </Button>
          <Button 
            onClick={resetToDefault} 
            variant="secondary" 
            fullWidth
            disabled={loading}
          >
            🔄 Reset to Default (All Disabled)
          </Button>
        </div>
      </Card>
      
      <Card>
        <Title level={4}>Current Permission Summary</Title>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
          <div>
            <p style={{ color: permissions.subjectApproval ? C.accent.green : C.accent.red }}>
              📚 Subject Approval: {permissions.subjectApproval ? "✓ Enabled" : "✗ Disabled"}
            </p>
            <p style={{ color: permissions.preferenceApproval ? C.accent.green : C.accent.red }}>
              ⭐ Preference Approval: {permissions.preferenceApproval ? "✓ Enabled" : "✗ Disabled"}
            </p>
            <p style={{ color: permissions.courseApproval ? C.accent.green : C.accent.red }}>
              ✅ Course Approval: {permissions.courseApproval ? "✓ Enabled" : "✗ Disabled"}
            </p>
            <p style={{ color: permissions.timetableGeneration ? C.accent.green : C.accent.red }}>
              📅 Timetable Generation: {permissions.timetableGeneration ? "✓ Enabled" : "✗ Disabled"}
            </p>
          </div>
          <div>
            <p style={{ color: permissions.viewReports ? C.accent.green : C.accent.red }}>
              📊 View Reports: {permissions.viewReports ? "✓ Enabled" : "✗ Disabled"}
            </p>
            <p style={{ color: permissions.manageFaculty ? C.accent.green : C.accent.red }}>
              👨‍🏫 Manage Faculty: {permissions.manageFaculty ? "✓ Enabled" : "✗ Disabled"}
            </p>
            <p style={{ color: permissions.viewAllData ? C.accent.green : C.accent.red }}>
              👁️ View All Data: {permissions.viewAllData ? "✓ Enabled" : "✗ Disabled"}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}