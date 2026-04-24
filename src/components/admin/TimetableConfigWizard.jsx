// // src/components/admin/TimetableConfigWizard.jsx
// import { useState } from "react";
// import { Card, Title, Badge, Button, Input, Select } from "../common";
// import { AppState } from "../../AppState";
// import { saveToStorage, STORAGE_KEYS } from "../../utils/storage";
// import { C } from "../../styles/theme";

// export function TimetableConfigWizard({ department, onComplete, onCancel }) {
//   const [step, setStep] = useState(1);
//   const [config, setConfig] = useState({
//     // Day settings
//     startTime: "09:00",
//     endTime: "17:00",
    
//     // Break settings
//     needBreak: true,
//     breakDuration: 10,
//     breakAfterEvery: 2, // hours
    
//     // Lunch settings
//     lunchStart: "13:00",
//     lunchDuration: 60,
    
//     // Class duration
//     classDuration: 50,
    
//     // Days
//     days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
//   });
  
//   const [selectedDays, setSelectedDays] = useState({
//     Monday: true,
//     Tuesday: true,
//     Wednesday: true,
//     Thursday: true,
//     Friday: true
//   });
  
//   const [calculatedSlots, setCalculatedSlots] = useState(null);
//   const [error, setError] = useState("");

//   const calculateSlots = () => {
//     // Parse times
//     const start = new Date(`1970-01-01T${config.startTime}:00`);
//     let end = new Date(`1970-01-01T${config.endTime}:00`);
//     const lunchStart = new Date(`1970-01-01T${config.lunchStart}:00`);
//     const lunchEnd = new Date(lunchStart.getTime() + config.lunchDuration * 60000);
    
//     let current = new Date(start);
//     let slots = [];
//     let periodNumber = 1;
//     let classesBeforeBreak = 0;
//     let lunchAdded = false;
    
//     while (current < end) {
//       const timeStr = current.toTimeString().substring(0, 5);
//       const classEnd = new Date(current.getTime() + config.classDuration * 60000);
//       const endTimeStr = classEnd.toTimeString().substring(0, 5);
      
//       // Check for lunch
//       if (!lunchAdded && current >= lunchStart && current < lunchEnd) {
//         slots.push({
//           time: timeStr,
//           endTime: lunchEnd.toTimeString().substring(0, 5),
//           period: "LUNCH",
//           isLunch: true
//         });
//         current = new Date(lunchEnd);
//         lunchAdded = true;
//         classesBeforeBreak = 0;
//         continue;
//       }
      
//       if (classEnd > end) break;
      
//       slots.push({
//         time: timeStr,
//         endTime: endTimeStr,
//         period: `P${periodNumber}`,
//         isLunch: false,
//         isBreak: false
//       });
//       periodNumber++;
//       classesBeforeBreak++;
//       current = new Date(classEnd);
      
//       // Add break after every X classes
//       if (config.needBreak && classesBeforeBreak === config.breakAfterEvery && config.breakDuration > 0) {
//         const breakStart = new Date(current);
//         const breakEnd = new Date(current.getTime() + config.breakDuration * 60000);
        
//         if ((!lunchAdded && breakEnd <= lunchStart) || (lunchAdded && breakEnd <= end)) {
//           slots.push({
//             time: breakStart.toTimeString().substring(0, 5),
//             endTime: breakEnd.toTimeString().substring(0, 5),
//             period: "BREAK",
//             isBreak: true
//           });
//           current = breakEnd;
//           classesBeforeBreak = 0;
//         } else {
//           classesBeforeBreak = 0;
//         }
//       }
//     }
    
//     // Calculate teaching slots only
//     const teachingSlots = slots.filter(s => !s.isLunch && !s.isBreak);
//     const activeDays = Object.keys(selectedDays).filter(day => selectedDays[day]).length;
//     const totalSlots = teachingSlots.length * activeDays;
//     const slotsPerSection = totalSlots;
//     const totalSlotsAll = slotsPerSection * 3 * 2; // 3 sections × 2 semesters
    
//     setCalculatedSlots({
//       teachingSlotsPerDay: teachingSlots.length,
//       activeDays: activeDays,
//       totalSlotsPerSection: totalSlots,
//       totalSlotsAll: totalSlotsAll,
//       periods: teachingSlots.map(s => s.period),
//       timeRanges: teachingSlots.map(s => `${s.time} - ${s.endTime}`),
//       hasBreaks: config.needBreak,
//       breakDuration: config.breakDuration,
//       breakAfterEvery: config.breakAfterEvery
//     });
    
//     return teachingSlots.length;
//   };

//   const handleNext = () => {
//     if (step === 1) {
//       const slotsCount = calculateSlots();
//       if (slotsCount === 0) {
//         setError("No teaching slots generated! Please check your timings.");
//         return;
//       }
//       setError("");
//     }
//     setStep(step + 1);
//   };

//   const handlePrevious = () => {
//     setStep(step - 1);
//   };

//   const handleSaveAndGenerate = () => {
//     // Save config to AppState
//     const finalConfig = {
//       startTime: config.startTime,
//       endTime: config.endTime,
//       classDuration: config.classDuration,
//       breakDuration: config.breakDuration,
//       breakAfterEvery: config.breakAfterEvery,
//       needBreak: config.needBreak,
//       lunchBreak: { start: config.lunchStart, duration: config.lunchDuration },
//       days: Object.keys(selectedDays).filter(day => selectedDays[day])
//     };
    
//     AppState.timetableConfig = finalConfig;
//     saveToStorage(STORAGE_KEYS.TIMETABLE_CONFIG, finalConfig);
    
//     onComplete(finalConfig, calculatedSlots);
//   };

//   const Step1Settings = () => (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <h3 style={{ color: C.gold.main }}>📅 Day & Time Settings</h3>
      
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
//         <div>
//           <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>Start Time</label>
//           <Input 
//             type="time" 
//             value={config.startTime}
//             onChange={(e) => setConfig({ ...config, startTime: e.target.value })}
//           />
//         </div>
//         <div>
//           <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>End Time</label>
//           <Input 
//             type="time" 
//             value={config.endTime}
//             onChange={(e) => setConfig({ ...config, endTime: e.target.value })}
//           />
//         </div>
//       </div>
      
//       <div>
//         <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>Class Duration (minutes)</label>
//         <Select
//           value={config.classDuration}
//           onChange={(e) => setConfig({ ...config, classDuration: parseInt(e.target.value) })}
//           options={[
//             { value: 30, label: "30 minutes" },
//             { value: 45, label: "45 minutes" },
//             { value: 50, label: "50 minutes" },
//             { value: 60, label: "60 minutes" },
//             { value: 90, label: "90 minutes" }
//           ]}
//         />
//       </div>
      
//       <div>
//         <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>Active Days</label>
//         <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
//           {Object.keys(selectedDays).map(day => (
//             <label key={day} style={{ display: "flex", alignItems: "center", gap: 6 }}>
//               <input
//                 type="checkbox"
//                 checked={selectedDays[day]}
//                 onChange={(e) => setSelectedDays({ ...selectedDays, [day]: e.target.checked })}
//               />
//               {day}
//             </label>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   const Step2BreakSettings = () => (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <h3 style={{ color: C.gold.main }}>☕ Break Settings</h3>
      
//       <div>
//         <label style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
//           <input
//             type="checkbox"
//             checked={config.needBreak}
//             onChange={(e) => setConfig({ ...config, needBreak: e.target.checked })}
//           />
//           <span>Add short breaks between classes</span>
//         </label>
//       </div>
      
//       {config.needBreak && (
//         <>
//           <div>
//             <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>Break After Every (classes)</label>
//             <Select
//               value={config.breakAfterEvery}
//               onChange={(e) => setConfig({ ...config, breakAfterEvery: parseInt(e.target.value) })}
//               options={[
//                 { value: 1, label: "After every 1 class" },
//                 { value: 2, label: "After every 2 classes" },
//                 { value: 3, label: "After every 3 classes" }
//               ]}
//             />
//           </div>
          
//           <div>
//             <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>Break Duration (minutes)</label>
//             <Select
//               value={config.breakDuration}
//               onChange={(e) => setConfig({ ...config, breakDuration: parseInt(e.target.value) })}
//               options={[
//                 { value: 5, label: "5 minutes" },
//                 { value: 10, label: "10 minutes" },
//                 { value: 15, label: "15 minutes" },
//                 { value: 20, label: "20 minutes" }
//               ]}
//             />
//           </div>
//         </>
//       )}
//     </div>
//   );

//   const Step3LunchSettings = () => (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <h3 style={{ color: C.gold.main }}>🍽️ Lunch Break Settings</h3>
      
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
//         <div>
//           <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>Lunch Start Time</label>
//           <Input 
//             type="time" 
//             value={config.lunchStart}
//             onChange={(e) => setConfig({ ...config, lunchStart: e.target.value })}
//           />
//         </div>
//         <div>
//           <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>Lunch Duration (minutes)</label>
//           <Select
//             value={config.lunchDuration}
//             onChange={(e) => setConfig({ ...config, lunchDuration: parseInt(e.target.value) })}
//             options={[
//               { value: 30, label: "30 minutes" },
//               { value: 45, label: "45 minutes" },
//               { value: 60, label: "60 minutes" },
//               { value: 90, label: "90 minutes" }
//             ]}
//           />
//         </div>
//       </div>
//     </div>
//   );

//   const Step4Summary = () => (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <h3 style={{ color: C.gold.main }}>📊 Timetable Configuration Summary</h3>
      
//       {calculatedSlots && (
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
//           <Card>
//             <p style={{ fontSize: 12, color: C.text.secondary }}>Teaching Periods/Day</p>
//             <p style={{ fontSize: 28, fontWeight: 700, color: C.gold.main }}>{calculatedSlots.teachingSlotsPerDay}</p>
//             <p style={{ fontSize: 11, color: C.text.tertiary }}>
//               {calculatedSlots.periods.map((p, i) => `${p} (${calculatedSlots.timeRanges[i]})`).join(", ")}
//             </p>
//           </Card>
          
//           <Card>
//             <p style={{ fontSize: 12, color: C.text.secondary }}>Active Days/Week</p>
//             <p style={{ fontSize: 28, fontWeight: 700, color: C.accent.blue }}>{calculatedSlots.activeDays}</p>
//           </Card>
          
//           <Card>
//             <p style={{ fontSize: 12, color: C.text.secondary }}>Slots Per Section</p>
//             <p style={{ fontSize: 28, fontWeight: 700, color: C.accent.green }}>{calculatedSlots.totalSlotsPerSection}</p>
//             <p style={{ fontSize: 11, color: C.text.tertiary }}>{calculatedSlots.teachingSlotsPerDay} periods × {calculatedSlots.activeDays} days</p>
//           </Card>
          
//           <Card>
//             <p style={{ fontSize: 12, color: C.text.secondary }}>Total Slots (3 Sections × 2 Semesters)</p>
//             <p style={{ fontSize: 28, fontWeight: 700, color: C.accent.purple }}>{calculatedSlots.totalSlotsAll}</p>
//           </Card>
//         </div>
//       )}
      
//       <Card style={{ background: C.accent.blueBg }}>
//         <h4 style={{ marginBottom: 12 }}>📋 Configuration Details:</h4>
//         <ul style={{ margin: 0, paddingLeft: 20 }}>
//           <li>School starts at: <strong>{config.startTime}</strong></li>
//           <li>School ends at: <strong>{config.endTime}</strong></li>
//           <li>Class duration: <strong>{config.classDuration} minutes</strong></li>
//           {config.needBreak && (
//             <li>Short break: <strong>{config.breakDuration} minutes</strong> after every <strong>{config.breakAfterEvery}</strong> classes</li>
//           )}
//           <li>Lunch break: <strong>{config.lunchDuration} minutes</strong> at <strong>{config.lunchStart}</strong></li>
//           <li>Active days: <strong>{Object.keys(selectedDays).filter(d => selectedDays[d]).join(", ")}</strong></li>
//         </ul>
//       </Card>
//     </div>
//   );

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//       <Card style={{ background: C.gold.gradient, textAlign: "center", padding: 32 }}>
//         <span style={{ fontSize: 48 }}>⚙️</span>
//         <Title style={{ color: C.text.inverse, marginTop: 8 }}>Timetable Configuration Wizard</Title>
//         <p style={{ color: C.text.inverse }}>
//           Configure your timetable settings before generation
//         </p>
//         <div style={{ marginTop: 16 }}>
//           <Badge variant="light" style={{ background: "rgba(255,255,255,0.2)", color: C.text.inverse }}>
//             Step {step} of 4
//           </Badge>
//         </div>
//       </Card>

//       <Card>
//         <div style={{ padding: 20 }}>
//           {step === 1 && <Step1Settings />}
//           {step === 2 && <Step2BreakSettings />}
//           {step === 3 && <Step3LunchSettings />}
//           {step === 4 && <Step4Summary />}
          
//           {error && (
//             <div style={{ marginTop: 16, padding: 12, background: C.accent.redBg, borderRadius: 8, color: C.accent.red }}>
//               ⚠️ {error}
//             </div>
//           )}
          
//           <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
//             {step > 1 && (
//               <Button onClick={handlePrevious} variant="secondary">
//                 ← Previous
//               </Button>
//             )}
//             <div style={{ flex: 1 }} />
//             {step < 4 ? (
//               <Button onClick={handleNext} variant="primary">
//                 Next →
//               </Button>
//             ) : (
//               <Button onClick={handleSaveAndGenerate} variant="success">
//                 🚀 Save & Generate Timetable
//               </Button>
//             )}
//             <Button onClick={onCancel} variant="secondary" style={{ marginLeft: 12 }}>
//               Cancel
//             </Button>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// }

// src/components/admin/TimetableConfigWizard.jsx
import { useState } from "react";
import { Card, Title, Badge, Button, Input, Select } from "../common";
import { AppState } from "../../AppState";
import { saveToStorage, STORAGE_KEYS } from "../../utils/storage";
import { C } from "../../styles/theme";

export function TimetableConfigWizard({ department, onComplete, onCancel }) {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState({
    // Day settings
    startTime: "09:00",
    endTime: "17:00",
    
    // Break settings
    needBreak: false,
    breakDuration: 10,
    breakAfterEvery: 2,
    
    // Lunch settings
    lunchStart: "13:00",
    lunchDuration: 60,
    
    // Class duration
    classDuration: 50,
    
    // Days
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  });
  
  const [selectedDays, setSelectedDays] = useState({
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true
  });
  
  const [calculatedSlots, setCalculatedSlots] = useState(null);
  const [error, setError] = useState("");

  const calculateSlots = () => {
    // Parse times
    const start = new Date(`1970-01-01T${config.startTime}:00`);
    let end = new Date(`1970-01-01T${config.endTime}:00`);
    const lunchStart = new Date(`1970-01-01T${config.lunchStart}:00`);
    const lunchEnd = new Date(lunchStart.getTime() + config.lunchDuration * 60000);
    
    let current = new Date(start);
    let slots = [];
    let periodNumber = 1;
    let classesBeforeBreak = 0;
    let lunchAdded = false;
    
    while (current < end) {
      const timeStr = current.toTimeString().substring(0, 5);
      const classEnd = new Date(current.getTime() + config.classDuration * 60000);
      const endTimeStr = classEnd.toTimeString().substring(0, 5);
      
      // Check for lunch
      if (!lunchAdded && current >= lunchStart && current < lunchEnd) {
        slots.push({
          time: timeStr,
          endTime: lunchEnd.toTimeString().substring(0, 5),
          period: "LUNCH",
          isLunch: true
        });
        current = new Date(lunchEnd);
        lunchAdded = true;
        classesBeforeBreak = 0;
        continue;
      }
      
      if (classEnd > end) break;
      
      slots.push({
        time: timeStr,
        endTime: endTimeStr,
        period: `P${periodNumber}`,
        isLunch: false,
        isBreak: false
      });
      periodNumber++;
      classesBeforeBreak++;
      current = new Date(classEnd);
      
      // Add break after every X classes ONLY if breaks are enabled
      if (config.needBreak && config.breakDuration > 0 && classesBeforeBreak === config.breakAfterEvery) {
        const breakStart = new Date(current);
        const breakEnd = new Date(current.getTime() + config.breakDuration * 60000);
        
        if ((!lunchAdded && breakEnd <= lunchStart) || (lunchAdded && breakEnd <= end)) {
          slots.push({
            time: breakStart.toTimeString().substring(0, 5),
            endTime: breakEnd.toTimeString().substring(0, 5),
            period: "BREAK",
            isBreak: true
          });
          current = breakEnd;
          classesBeforeBreak = 0;
        } else {
          classesBeforeBreak = 0;
        }
      }
    }
    
    // Calculate teaching slots only
    const teachingSlots = slots.filter(s => !s.isLunch && !s.isBreak);
    const activeDays = Object.keys(selectedDays).filter(day => selectedDays[day]).length;
    const totalSlots = teachingSlots.length * activeDays;
    const slotsPerSection = totalSlots;
    const totalSlotsAll = slotsPerSection * 3 * 2; // 3 sections × 2 semesters
    
    setCalculatedSlots({
      teachingSlotsPerDay: teachingSlots.length,
      activeDays: activeDays,
      totalSlotsPerSection: totalSlots,
      totalSlotsAll: totalSlotsAll,
      periods: teachingSlots.map(s => s.period),
      timeRanges: teachingSlots.map(s => `${s.time} - ${s.endTime}`),
      hasBreaks: config.needBreak,
      breakDuration: config.breakDuration,
      breakAfterEvery: config.breakAfterEvery
    });
    
    return teachingSlots.length;
  };

  const handleNext = () => {
    if (step === 1) {
      const slotsCount = calculateSlots();
      if (slotsCount === 0) {
        setError("No teaching slots generated! Please check your timings.");
        return;
      }
      setError("");
    }
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSaveAndGenerate = () => {
    // Save config to AppState - ensure break settings are correct
    const finalConfig = {
      startTime: config.startTime,
      endTime: config.endTime,
      classDuration: config.classDuration,
      breakDuration: config.needBreak ? config.breakDuration : 0,
      breakAfterEvery: config.breakAfterEvery,
      needBreak: config.needBreak,
      lunchBreak: { start: config.lunchStart, duration: config.lunchDuration },
      days: Object.keys(selectedDays).filter(day => selectedDays[day])
    };
    
    AppState.timetableConfig = finalConfig;
    saveToStorage(STORAGE_KEYS.TIMETABLE_CONFIG, finalConfig);
    
    onComplete(finalConfig, calculatedSlots);
  };

  const Step1Settings = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <h3 style={{ color: C.gold.main }}>📅 Day & Time Settings</h3>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        <div>
          <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>Start Time</label>
          <Input 
            type="time" 
            value={config.startTime}
            onChange={(e) => setConfig({ ...config, startTime: e.target.value })}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>End Time</label>
          <Input 
            type="time" 
            value={config.endTime}
            onChange={(e) => setConfig({ ...config, endTime: e.target.value })}
          />
        </div>
      </div>
      
      <div>
        <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>Class Duration (minutes)</label>
        <Select
          value={config.classDuration}
          onChange={(e) => setConfig({ ...config, classDuration: parseInt(e.target.value) })}
          options={[
            { value: 30, label: "30 minutes" },
            { value: 45, label: "45 minutes" },
            { value: 50, label: "50 minutes" },
            { value: 60, label: "60 minutes" },
            { value: 90, label: "90 minutes" }
          ]}
        />
      </div>
      
      <div>
        <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>Active Days</label>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {Object.keys(selectedDays).map(day => (
            <label key={day} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <input
                type="checkbox"
                checked={selectedDays[day]}
                onChange={(e) => setSelectedDays({ ...selectedDays, [day]: e.target.checked })}
              />
              {day}
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const Step2BreakSettings = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <h3 style={{ color: C.gold.main }}>☕ Break Settings</h3>
      
      <div>
        <label style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <input
            type="checkbox"
            checked={config.needBreak}
            onChange={(e) => setConfig({ ...config, needBreak: e.target.checked })}
          />
          <span>Add short breaks between classes</span>
        </label>
      </div>
      
      {config.needBreak && (
        <>
          <div>
            <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>Break After Every (classes)</label>
            <Select
              value={config.breakAfterEvery}
              onChange={(e) => setConfig({ ...config, breakAfterEvery: parseInt(e.target.value) })}
              options={[
                { value: 1, label: "After every 1 class" },
                { value: 2, label: "After every 2 classes" },
                { value: 3, label: "After every 3 classes" }
              ]}
            />
          </div>
          
          <div>
            <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>Break Duration (minutes)</label>
            <Select
              value={config.breakDuration}
              onChange={(e) => setConfig({ ...config, breakDuration: parseInt(e.target.value) })}
              options={[
                { value: 5, label: "5 minutes" },
                { value: 10, label: "10 minutes" },
                { value: 15, label: "15 minutes" },
                { value: 20, label: "20 minutes" }
              ]}
            />
          </div>
        </>
      )}
      
      {!config.needBreak && (
        <div style={{ padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
          <p style={{ margin: 0, color: C.text.secondary }}>ℹ️ No short breaks will be added between classes.</p>
        </div>
      )}
    </div>
  );

  const Step3LunchSettings = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <h3 style={{ color: C.gold.main }}>🍽️ Lunch Break Settings</h3>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        <div>
          <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>Lunch Start Time</label>
          <Input 
            type="time" 
            value={config.lunchStart}
            onChange={(e) => setConfig({ ...config, lunchStart: e.target.value })}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>Lunch Duration (minutes)</label>
          <Select
            value={config.lunchDuration}
            onChange={(e) => setConfig({ ...config, lunchDuration: parseInt(e.target.value) })}
            options={[
              { value: 30, label: "30 minutes" },
              { value: 45, label: "45 minutes" },
              { value: 60, label: "60 minutes" },
              { value: 90, label: "90 minutes" }
            ]}
          />
        </div>
      </div>
    </div>
  );

  const Step4Summary = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <h3 style={{ color: C.gold.main }}>📊 Timetable Configuration Summary</h3>
      
      {calculatedSlots && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          <Card>
            <p style={{ fontSize: 12, color: C.text.secondary }}>Teaching Periods/Day</p>
            <p style={{ fontSize: 28, fontWeight: 700, color: C.gold.main }}>{calculatedSlots.teachingSlotsPerDay}</p>
            <p style={{ fontSize: 11, color: C.text.tertiary }}>
              {calculatedSlots.periods.map((p, i) => `${p} (${calculatedSlots.timeRanges[i]})`).join(", ")}
            </p>
          </Card>
          
          <Card>
            <p style={{ fontSize: 12, color: C.text.secondary }}>Active Days/Week</p>
            <p style={{ fontSize: 28, fontWeight: 700, color: C.accent.blue }}>{calculatedSlots.activeDays}</p>
          </Card>
          
          <Card>
            <p style={{ fontSize: 12, color: C.text.secondary }}>Slots Per Section</p>
            <p style={{ fontSize: 28, fontWeight: 700, color: C.accent.green }}>{calculatedSlots.totalSlotsPerSection}</p>
            <p style={{ fontSize: 11, color: C.text.tertiary }}>{calculatedSlots.teachingSlotsPerDay} periods × {calculatedSlots.activeDays} days</p>
          </Card>
          
          <Card>
            <p style={{ fontSize: 12, color: C.text.secondary }}>Total Slots (3 Sections × 2 Semesters)</p>
            <p style={{ fontSize: 28, fontWeight: 700, color: C.accent.purple }}>{calculatedSlots.totalSlotsAll}</p>
          </Card>
        </div>
      )}
      
      <Card style={{ background: C.accent.blueBg }}>
        <h4 style={{ marginBottom: 12 }}>📋 Configuration Details:</h4>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>School starts at: <strong>{config.startTime}</strong></li>
          <li>School ends at: <strong>{config.endTime}</strong></li>
          <li>Class duration: <strong>{config.classDuration} minutes</strong></li>
          {config.needBreak ? (
            <li>Short break: <strong>{config.breakDuration} minutes</strong> after every <strong>{config.breakAfterEvery}</strong> classes</li>
          ) : (
            <li>Short breaks: <strong>Disabled</strong> (no breaks between classes)</li>
          )}
          <li>Lunch break: <strong>{config.lunchDuration} minutes</strong> at <strong>{config.lunchStart}</strong></li>
          <li>Active days: <strong>{Object.keys(selectedDays).filter(d => selectedDays[d]).join(", ")}</strong></li>
        </ul>
      </Card>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Card style={{ background: C.gold.gradient, textAlign: "center", padding: 32 }}>
        <span style={{ fontSize: 48 }}>⚙️</span>
        <Title style={{ color: C.text.inverse, marginTop: 8 }}>Timetable Configuration Wizard</Title>
        <p style={{ color: C.text.inverse }}>
          Configure your timetable settings before generation
        </p>
        <div style={{ marginTop: 16 }}>
          <Badge variant="light" style={{ background: "rgba(255,255,255,0.2)", color: C.text.inverse }}>
            Step {step} of 4
          </Badge>
        </div>
      </Card>

      <Card>
        <div style={{ padding: 20 }}>
          {step === 1 && <Step1Settings />}
          {step === 2 && <Step2BreakSettings />}
          {step === 3 && <Step3LunchSettings />}
          {step === 4 && <Step4Summary />}
          
          {error && (
            <div style={{ marginTop: 16, padding: 12, background: C.accent.redBg, borderRadius: 8, color: C.accent.red }}>
              ⚠️ {error}
            </div>
          )}
          
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
            {step > 1 && (
              <Button onClick={handlePrevious} variant="secondary">
                ← Previous
              </Button>
            )}
            <div style={{ flex: 1 }} />
            {step < 4 ? (
              <Button onClick={handleNext} variant="primary">
                Next →
              </Button>
            ) : (
              <Button onClick={handleSaveAndGenerate} variant="success">
                🚀 Save & Generate Timetable
              </Button>
            )}
            <Button onClick={onCancel} variant="secondary" style={{ marginLeft: 12 }}>
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}