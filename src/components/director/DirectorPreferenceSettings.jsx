// // src/components/director/DirectorPreferenceSettings.jsx
// import { useState, useEffect } from "react";
// import { Card, Title, Button, Input, Select, Badge } from "../common";
// import { saveToStorage, loadFromStorage, STORAGE_KEYS } from "../../utils/storage";
// import { C } from "../../styles/theme";

// export function DirectorPreferenceSettings({ onRefresh }) {
//   const [settings, setSettings] = useState({
//     requireOneCoreOneMajorOneMinor: true,
//     requireDifferentSemesters: true,
//     maxPreferencesPerFaculty: 3,
//     minPreferencesRequired: 3,
//     allowSameSemester: false,
//     allowSameType: false
//   });

//   useEffect(() => {
//     loadSettings();
//   }, []);

//   const loadSettings = () => {
//     const savedSettings = loadFromStorage(STORAGE_KEYS.PREFERENCE_SETTINGS, {
//       requireOneCoreOneMajorOneMinor: true,
//       requireDifferentSemesters: true,
//       maxPreferencesPerFaculty: 3,
//       minPreferencesRequired: 3,
//       allowSameSemester: false,
//       allowSameType: false
//     });
//     setSettings(savedSettings);
//   };

//   const handleSave = () => {
//     saveToStorage(STORAGE_KEYS.PREFERENCE_SETTINGS, settings);
//     window.dispatchEvent(new Event('storage'));
//     alert("Preference settings saved successfully!");
//     if (onRefresh) onRefresh();
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <Title>Preference Form Settings</Title>
      
//       <Card>
//         <Title level={4}>Preference Rules & Conditions</Title>
        
//         <div style={{ marginBottom: 20 }}>
//           <label style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, cursor: "pointer" }}>
//             <input
//               type="checkbox"
//               checked={settings.requireOneCoreOneMajorOneMinor}
//               onChange={e => setSettings({ ...settings, requireOneCoreOneMajorOneMinor: e.target.checked })}
//               style={{ width: 18, height: 18, cursor: "pointer" }}
//             />
//             <span style={{ color: C.text.primary }}>Require one Core, one Major, and one Minor subject selection</span>
//           </label>
          
//           <label style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, cursor: "pointer" }}>
//             <input
//               type="checkbox"
//               checked={settings.requireDifferentSemesters}
//               onChange={e => setSettings({ ...settings, requireDifferentSemesters: e.target.checked })}
//               style={{ width: 18, height: 18, cursor: "pointer" }}
//             />
//             <span style={{ color: C.text.primary }}>Require preferences from different semesters</span>
//           </label>
          
//           <label style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, cursor: "pointer" }}>
//             <input
//               type="checkbox"
//               checked={settings.allowSameSemester}
//               onChange={e => setSettings({ ...settings, allowSameSemester: e.target.checked })}
//               style={{ width: 18, height: 18, cursor: "pointer" }}
//             />
//             <span style={{ color: C.text.primary }}>Allow multiple preferences from same semester</span>
//           </label>
          
//           <label style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, cursor: "pointer" }}>
//             <input
//               type="checkbox"
//               checked={settings.allowSameType}
//               onChange={e => setSettings({ ...settings, allowSameType: e.target.checked })}
//               style={{ width: 18, height: 18, cursor: "pointer" }}
//             />
//             <span style={{ color: C.text.primary }}>Allow multiple preferences of same subject type</span>
//           </label>
//         </div>
        
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
//           <Input
//             label="Maximum Preferences per Faculty"
//             type="number"
//             min="1"
//             max="5"
//             value={settings.maxPreferencesPerFaculty}
//             onChange={e => setSettings({ ...settings, maxPreferencesPerFaculty: parseInt(e.target.value) })}
//           />
//           <Input
//             label="Minimum Preferences Required"
//             type="number"
//             min="1"
//             max="5"
//             value={settings.minPreferencesRequired}
//             onChange={e => setSettings({ ...settings, minPreferencesRequired: parseInt(e.target.value) })}
//           />
//         </div>
        
//         <div style={{ marginTop: 20, padding: 16, background: C.accent.blueBg, borderRadius: 8 }}>
//           <p style={{ color: C.accent.blue, fontWeight: 600, marginBottom: 8 }}>Current Rules Summary:</p>
//           <ul style={{ color: C.text.secondary, fontSize: 13, margin: 0, paddingLeft: 20 }}>
//             <li>Each faculty must select {settings.minPreferencesRequired} subject preferences</li>
//             {settings.requireOneCoreOneMajorOneMinor && <li>Must select one Core, one Major, and one Minor subject</li>}
//             {settings.requireDifferentSemesters && !settings.allowSameSemester && <li>Preferences must be from different semesters</li>}
//             {settings.allowSameSemester && <li>Multiple preferences from same semester are allowed</li>}
//             {settings.allowSameType && <li>Multiple preferences of same subject type are allowed</li>}
//           </ul>
//         </div>
        
//         <Button onClick={handleSave} variant="success" fullWidth style={{ marginTop: 20 }}>
//           Save Settings
//         </Button>
//       </Card>
//     </div>
//   );
// }

// src/components/director/DirectorPreferenceSettings.jsx
import { useState, useEffect } from "react";
import { Card, Title, Button, Input, Badge } from "../common";
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from "../../utils/storage";
import { C } from "../../styles/theme";

export function DirectorPreferenceSettings({ onRefresh }) {
  const [settings, setSettings] = useState({
    requireOneCoreOneMajorOneMinor: true,
    requireDifferentSemesters: false, // Changed to false by default since only 2 semesters
    maxPreferencesPerFaculty: 3,
    minPreferencesRequired: 3,
    allowSameSemester: true, // Changed to true by default
    allowSameType: false,
    requireDifferentSubjects: true
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    const savedSettings = loadFromStorage(STORAGE_KEYS.PREFERENCE_SETTINGS, {
      requireOneCoreOneMajorOneMinor: true,
      requireDifferentSemesters: false,
      maxPreferencesPerFaculty: 3,
      minPreferencesRequired: 3,
      allowSameSemester: true,
      allowSameType: false,
      requireDifferentSubjects: true
    });
    setSettings(savedSettings);
  };

  const handleSave = () => {
    saveToStorage(STORAGE_KEYS.PREFERENCE_SETTINGS, settings);
    window.dispatchEvent(new Event('storage'));
    alert("Preference settings saved successfully!");
    if (onRefresh) onRefresh();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Title>Preference Form Settings</Title>
      
      <Card>
        <Title level={4}>Preference Rules & Conditions</Title>
        
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={settings.requireOneCoreOneMajorOneMinor}
              onChange={e => setSettings({ ...settings, requireOneCoreOneMajorOneMinor: e.target.checked })}
              style={{ width: 18, height: 18, cursor: "pointer" }}
            />
            <span style={{ color: C.text.primary }}>Require one Core, one Major, and one Minor subject selection</span>
          </label>
          
          <label style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={settings.requireDifferentSemesters}
              onChange={e => setSettings({ ...settings, requireDifferentSemesters: e.target.checked })}
              style={{ width: 18, height: 18, cursor: "pointer" }}
            />
            <span style={{ color: C.text.primary }}>Require preferences from different semesters</span>
          </label>
          
          <label style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={settings.allowSameSemester}
              onChange={e => setSettings({ ...settings, allowSameSemester: e.target.checked })}
              style={{ width: 18, height: 18, cursor: "pointer" }}
            />
            <span style={{ color: C.text.primary }}>Allow multiple preferences from same semester</span>
          </label>
          
          <label style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={settings.allowSameType}
              onChange={e => setSettings({ ...settings, allowSameType: e.target.checked })}
              style={{ width: 18, height: 18, cursor: "pointer" }}
            />
            <span style={{ color: C.text.primary }}>Allow multiple preferences of same subject type</span>
          </label>
          
          <label style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={settings.requireDifferentSubjects}
              onChange={e => setSettings({ ...settings, requireDifferentSubjects: e.target.checked })}
              style={{ width: 18, height: 18, cursor: "pointer" }}
            />
            <span style={{ color: C.text.primary }}>Require different subjects for each preference (no duplicates)</span>
          </label>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
          <Input
            label="Maximum Preferences per Faculty"
            type="number"
            min="1"
            max="5"
            value={settings.maxPreferencesPerFaculty}
            onChange={e => setSettings({ ...settings, maxPreferencesPerFaculty: parseInt(e.target.value) })}
          />
          <Input
            label="Minimum Preferences Required"
            type="number"
            min="1"
            max="5"
            value={settings.minPreferencesRequired}
            onChange={e => setSettings({ ...settings, minPreferencesRequired: parseInt(e.target.value) })}
          />
        </div>
        
        <div style={{ marginTop: 20, padding: 16, background: C.accent.blueBg, borderRadius: 8 }}>
          <p style={{ color: C.accent.blue, fontWeight: 600, marginBottom: 8 }}>Current Rules Summary:</p>
          <ul style={{ color: C.text.secondary, fontSize: 13, margin: 0, paddingLeft: 20 }}>
            <li>Each faculty must select {settings.minPreferencesRequired} subject preferences</li>
            <li>Maximum {settings.maxPreferencesPerFaculty} preferences allowed per faculty</li>
            {settings.requireOneCoreOneMajorOneMinor && <li>Must select one Core, one Major, and one Minor subject</li>}
            {settings.requireDifferentSemesters && <li>Preferences must be from different semesters</li>}
            {settings.allowSameSemester && <li>Multiple preferences from same semester are allowed</li>}
            {settings.allowSameType && <li>Multiple preferences of same subject type are allowed</li>}
            {!settings.allowSameType && settings.requireOneCoreOneMajorOneMinor && <li>Cannot select multiple subjects of the same type</li>}
            {settings.requireDifferentSubjects && <li>Each preference must be for a different subject (no duplicates)</li>}
          </ul>
        </div>
        
        <Button onClick={handleSave} variant="success" fullWidth style={{ marginTop: 20 }}>
          Save Settings
        </Button>
      </Card>
    </div>
  );
}