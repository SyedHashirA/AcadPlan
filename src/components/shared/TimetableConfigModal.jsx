// // src/components/shared/TimetableConfigModal.jsx
// import { useState } from "react";
// import { Card, Title, Button, Input } from "../common";
// import { AppState } from "../../AppState";
// import { generateTimeSlots } from "../../utils/timetableUtils";
// import { C } from "../../styles/theme";

// export function TimetableConfigModal({ isOpen, onClose, onGenerate }) {
//   const [config, setConfig] = useState({ ...AppState.timetableConfig });
  
//   const updateConfig = (field, value) => {
//     setConfig({ ...config, [field]: value });
//   };
  
//   const updateLunchBreak = (field, value) => {
//     setConfig({ ...config, lunchBreak: { ...config.lunchBreak, [field]: value } });
//   };
  
//   const handleGenerate = () => {
//     console.log("Config before update:", config);
//     AppState.updateTimetableConfig(config);
//     console.log("Calling onGenerate with config:", config);
//     onGenerate(config);
//   };
  
//   if (!isOpen) return null;
  
//   return (
//     <div style={{
//       position: "fixed",
//       inset: 0,
//       background: "rgba(0,0,0,0.5)",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       zIndex: 1000,
//     }}>
//       <Card padding="32px" hover={false} style={{ maxWidth: 500, width: "90%", maxHeight: "90vh", overflow: "auto" }}>
//         <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
//           <Title level={3}>Timetable Configuration</Title>
//           <button onClick={onClose} style={{ background: "none", border: "none", color: C.text.tertiary, fontSize: 24, cursor: "pointer" }}>×</button>
//         </div>
        
//         <div style={{ marginBottom: 20 }}>
//           <Title level={4}>Daily Schedule</Title>
          
//           <Input
//             label="Start Time"
//             type="time"
//             value={config.startTime}
//             onChange={e => updateConfig('startTime', e.target.value)}
//           />
          
//           <Input
//             label="End Time"
//             type="time"
//             value={config.endTime}
//             onChange={e => updateConfig('endTime', e.target.value)}
//           />
          
//           <Input
//             label="Class Duration (minutes)"
//             type="number"
//             min="30"
//             max="120"
//             step="5"
//             value={config.classDuration}
//             onChange={e => updateConfig('classDuration', parseInt(e.target.value))}
//           />
          
//           <Input
//             label="Break Between Classes (minutes)"
//             type="number"
//             min="0"
//             max="30"
//             value={config.breakDuration}
//             onChange={e => updateConfig('breakDuration', parseInt(e.target.value))}
//           />
//         </div>
        
//         <div style={{ marginBottom: 20 }}>
//           <Title level={4}>Lunch Break</Title>
          
//           <Input
//             label="Lunch Break Start"
//             type="time"
//             value={config.lunchBreak.start}
//             onChange={e => updateLunchBreak('start', e.target.value)}
//           />
          
//           <Input
//             label="Lunch Break Duration (minutes)"
//             type="number"
//             min="30"
//             max="90"
//             step="5"
//             value={config.lunchBreak.duration}
//             onChange={e => updateLunchBreak('duration', parseInt(e.target.value))}
//           />
//         </div>
        
//         <div style={{ marginBottom: 20, padding: 16, background: C.cardHover, borderRadius: 12 }}>
//           <Title level={4}>Preview</Title>
//           <div style={{ maxHeight: 200, overflow: "auto" }}>
//             {generateTimeSlots(config).map((slot, i) => (
//               <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", borderBottom: i < generateTimeSlots(config).length - 1 ? `1px solid ${C.border}` : "none" }}>
//                 <span style={{ 
//                   color: slot.isLunch ? C.accent.gold : C.text.primary, 
//                   fontSize: 13,
//                   fontWeight: slot.isLunch ? 600 : 400
//                 }}>
//                   {slot.isLunch ? "🍽️ LUNCH" : `📚 ${slot.period}: ${slot.time} - ${slot.endTime}`}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
        
//         <div style={{ display: "flex", gap: 12 }}>
//           <Button onClick={handleGenerate} variant="success" fullWidth>
//             Generate Timetable
//           </Button>
//           <Button onClick={onClose} variant="secondary" fullWidth>
//             Cancel
//           </Button>
//         </div>
//       </Card>
//     </div>
//   );
// }

// // src/components/shared/TimetableConfigModal.jsx
// import { useState } from "react";
// import { Card, Title, Button, Input } from "../common";
// import { AppState } from "../../AppState";
// import { generateTimeSlots } from "../../utils/timetableUtils";
// import { C } from "../../styles/theme";

// export function TimetableConfigModal({ isOpen, onClose, onGenerate }) {
//   const [config, setConfig] = useState({ ...AppState.timetableConfig });
  
//   const updateConfig = (field, value) => {
//     setConfig({ ...config, [field]: value });
//   };
  
//   const updateLunchBreak = (field, value) => {
//     setConfig({ ...config, lunchBreak: { ...config.lunchBreak, [field]: value } });
//   };
  
//   const handleGenerate = () => {
//     console.log("Config before update:", config);
//     AppState.updateTimetableConfig(config);
//     console.log("Calling onGenerate with config:", config);
//     onGenerate(config);
//   };
  
//   // Calculate class periods based on configuration
//   const calculateClassPeriods = () => {
//     const startTime = config.startTime;
//     const endTime = config.endTime;
//     const classDuration = config.classDuration;
//     const breakDuration = config.breakDuration;
//     const lunchStart = config.lunchBreak.start;
//     const lunchDuration = config.lunchBreak.duration;
    
//     const periods = [];
//     let currentTime = new Date(`1970-01-01T${startTime}:00`);
//     const end = new Date(`1970-01-01T${endTime}:00`);
//     const lunchStartTime = new Date(`1970-01-01T${lunchStart}:00`);
//     const lunchEndTime = new Date(lunchStartTime.getTime() + lunchDuration * 60000);
//     let periodCount = 1;
//     let classesBeforeBreak = 0;
    
//     while (currentTime < end) {
//       // Check for lunch break
//       if (currentTime >= lunchStartTime && currentTime < lunchEndTime) {
//         periods.push({
//           type: "lunch",
//           start: currentTime.toTimeString().substring(0, 5),
//           end: lunchEndTime.toTimeString().substring(0, 5),
//           period: "LUNCH"
//         });
//         currentTime = new Date(lunchEndTime);
//         classesBeforeBreak = 0;
//         continue;
//       }
      
//       // Add class period
//       const classEnd = new Date(currentTime.getTime() + classDuration * 60000);
//       periods.push({
//         type: "class",
//         start: currentTime.toTimeString().substring(0, 5),
//         end: classEnd.toTimeString().substring(0, 5),
//         period: `P${periodCount}`
//       });
//       periodCount++;
//       classesBeforeBreak++;
      
//       // Move to next time slot
//       currentTime = new Date(classEnd);
      
//       // Add break after every 2 classes (if not at lunch and not at end)
//       if (classesBeforeBreak === 2 && currentTime < end && currentTime < lunchStartTime) {
//         const breakEnd = new Date(currentTime.getTime() + breakDuration * 60000);
//         periods.push({
//           type: "break",
//           start: currentTime.toTimeString().substring(0, 5),
//           end: breakEnd.toTimeString().substring(0, 5),
//           period: "BREAK"
//         });
//         currentTime = breakEnd;
//         classesBeforeBreak = 0;
//       }
//     }
    
//     return periods;
//   };
  
//   if (!isOpen) return null;
  
//   const periods = calculateClassPeriods();
  
//   return (
//     <div style={{
//       position: "fixed",
//       inset: 0,
//       background: "rgba(0,0,0,0.5)",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       zIndex: 1000,
//     }}>
//       <Card padding="32px" hover={false} style={{ maxWidth: 550, width: "90%", maxHeight: "90vh", overflow: "auto" }}>
//         <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
//           <Title level={3}>Timetable Configuration</Title>
//           <button onClick={onClose} style={{ background: "none", border: "none", color: C.text.tertiary, fontSize: 24, cursor: "pointer" }}>×</button>
//         </div>
        
//         <div style={{ marginBottom: 20 }}>
//           <Title level={4}>Daily Schedule</Title>
          
//           <Input
//             label="Start Time"
//             type="time"
//             value={config.startTime}
//             onChange={e => updateConfig('startTime', e.target.value)}
//           />
          
//           <Input
//             label="End Time"
//             type="time"
//             value={config.endTime}
//             onChange={e => updateConfig('endTime', e.target.value)}
//           />
          
//           <Input
//             label="Class Duration (minutes)"
//             type="number"
//             min="30"
//             max="120"
//             step="5"
//             value={config.classDuration}
//             onChange={e => updateConfig('classDuration', parseInt(e.target.value))}
//           />
          
//           <Input
//             label="Break After Every 2 Classes (minutes)"
//             type="number"
//             min="0"
//             max="30"
//             step="5"
//             value={config.breakDuration}
//             onChange={e => updateConfig('breakDuration', parseInt(e.target.value))}
//           />
          
//           <div style={{ marginTop: 8, padding: 8, background: C.accent.blueBg, borderRadius: 6 }}>
//             <p style={{ color: C.accent.blue, fontSize: 12, margin: 0 }}>
//               💡 A {config.breakDuration} minute break will be given after every 2 classes
//             </p>
//           </div>
//         </div>
        
//         <div style={{ marginBottom: 20 }}>
//           <Title level={4}>Lunch Break</Title>
          
//           <Input
//             label="Lunch Break Start"
//             type="time"
//             value={config.lunchBreak.start}
//             onChange={e => updateLunchBreak('start', e.target.value)}
//           />
          
//           <Input
//             label="Lunch Break Duration (minutes)"
//             type="number"
//             min="30"
//             max="90"
//             step="5"
//             value={config.lunchBreak.duration}
//             onChange={e => updateLunchBreak('duration', parseInt(e.target.value))}
//           />
//         </div>
        
//         <div style={{ marginBottom: 20, padding: 16, background: C.cardHover, borderRadius: 12 }}>
//           <Title level={4}>Preview</Title>
//           <div style={{ maxHeight: 300, overflow: "auto" }}>
//             {periods.map((slot, i) => (
//               <div key={i} style={{ 
//                 display: "flex", 
//                 alignItems: "center", 
//                 gap: 12, 
//                 padding: "8px 12px",
//                 marginBottom: 4,
//                 borderRadius: 6,
//                 background: slot.type === "lunch" ? C.accent.goldBg : slot.type === "break" ? C.accent.blueBg : "transparent",
//                 borderBottom: i < periods.length - 1 ? `1px solid ${C.border}` : "none"
//               }}>
//                 <span style={{ 
//                   width: 60,
//                   fontSize: 12,
//                   fontWeight: 600,
//                   color: slot.type === "lunch" ? C.accent.gold : slot.type === "break" ? C.accent.blue : C.text.primary
//                 }}>
//                   {slot.period}
//                 </span>
//                 <span style={{ 
//                   flex: 1,
//                   color: slot.type === "lunch" ? C.accent.gold : slot.type === "break" ? C.accent.blue : C.text.primary, 
//                   fontSize: 13,
//                   fontWeight: slot.type === "lunch" ? 600 : 400
//                 }}>
//                   {slot.type === "lunch" && "🍽️ "}
//                   {slot.type === "break" && "☕ "}
//                   {slot.start} - {slot.end}
//                   {slot.type === "break" && " (Short Break)"}
//                   {slot.type === "lunch" && " (Lunch Break)"}
//                 </span>
//                 {slot.type === "class" && (
//                   <span style={{ fontSize: 11, color: C.text.tertiary }}>
//                     {config.classDuration} min
//                   </span>
//                 )}
//                 {slot.type === "break" && (
//                   <span style={{ fontSize: 11, color: C.accent.blue }}>
//                     {config.breakDuration} min
//                   </span>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
        
//         <div style={{ marginBottom: 16, padding: 12, background: C.accent.greenBg, borderRadius: 8 }}>
//           <p style={{ color: C.accent.green, fontSize: 12, margin: 0, textAlign: "center" }}>
//             📊 Summary: {periods.filter(p => p.type === "class").length} classes | 
//             {periods.filter(p => p.type === "break").length} short breaks | 
//             1 lunch break
//           </p>
//         </div>
        
//         <div style={{ display: "flex", gap: 12 }}>
//           <Button onClick={handleGenerate} variant="success" fullWidth>
//             Generate Timetable
//           </Button>
//           <Button onClick={onClose} variant="secondary" fullWidth>
//             Cancel
//           </Button>
//         </div>
//       </Card>
//     </div>
//   );
// }

// src/components/shared/TimetableConfigModal.jsx
import { useState } from "react";
import { Card, Title, Button, Input } from "../common";
import { AppState } from "../../AppState";
import { generateTimeSlots } from "../../utils/timetableUtils";
import { C } from "../../styles/theme";

export function TimetableConfigModal({ isOpen, onClose, onGenerate }) {
  const [config, setConfig] = useState({ ...AppState.timetableConfig });
  
  const updateConfig = (field, value) => {
    setConfig({ ...config, [field]: value });
  };
  
  const updateLunchBreak = (field, value) => {
    setConfig({ ...config, lunchBreak: { ...config.lunchBreak, [field]: value } });
  };
  
  const handleGenerate = () => {
    console.log("Config before update:", config);
    AppState.updateTimetableConfig(config);
    console.log("Calling onGenerate with config:", config);
    onGenerate(config);
  };
  
  // Calculate class periods based on configuration with pattern: Class → Class → Break → Class → Class → Lunch → Class → Class → Break → Class → Class
  const calculateClassPeriods = () => {
    const startTime = config.startTime;
    const endTime = config.endTime;
    const classDuration = config.classDuration;
    const breakDuration = config.breakDuration;
    const lunchStart = config.lunchBreak.start;
    const lunchDuration = config.lunchBreak.duration;
    
    const periods = [];
    let currentTime = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    const lunchStartTime = new Date(`1970-01-01T${lunchStart}:00`);
    const lunchEndTime = new Date(lunchStartTime.getTime() + lunchDuration * 60000);
    let periodCount = 1;
    let classesBeforeBreak = 0;
    let lunchAdded = false;
    
    while (currentTime < end) {
      // Check if it's time for lunch (after 2 classes before lunch)
      if (!lunchAdded && currentTime >= lunchStartTime && currentTime < lunchEndTime) {
        periods.push({
          type: "lunch",
          start: currentTime.toTimeString().substring(0, 5),
          end: lunchEndTime.toTimeString().substring(0, 5),
          period: "LUNCH"
        });
        currentTime = new Date(lunchEndTime);
        lunchAdded = true;
        classesBeforeBreak = 0;
        continue;
      }
      
      // Add class period
      const classEnd = new Date(currentTime.getTime() + classDuration * 60000);
      
      // Check if class would exceed end time
      if (classEnd > end) {
        break;
      }
      
      periods.push({
        type: "class",
        start: currentTime.toTimeString().substring(0, 5),
        end: classEnd.toTimeString().substring(0, 5),
        period: `P${periodCount}`
      });
      periodCount++;
      classesBeforeBreak++;
      
      // Move to next time slot
      currentTime = new Date(classEnd);
      
      // Add break after every 2 classes
      if (classesBeforeBreak === 2 && breakDuration > 0) {
        const breakStart = new Date(currentTime);
        const breakEnd = new Date(currentTime.getTime() + breakDuration * 60000);
        
        // Check conditions for adding break
        let shouldAddBreak = false;
        
        if (!lunchAdded) {
          // Before lunch: only add break if it doesn't go into lunch time
          if (breakEnd <= lunchStartTime) {
            shouldAddBreak = true;
          }
        } else {
          // After lunch: add break if it doesn't exceed end time
          if (breakEnd <= end) {
            shouldAddBreak = true;
          }
        }
        
        if (shouldAddBreak) {
          periods.push({
            type: "break",
            start: breakStart.toTimeString().substring(0, 5),
            end: breakEnd.toTimeString().substring(0, 5),
            period: "BREAK"
          });
          currentTime = breakEnd;
          classesBeforeBreak = 0;
        } else {
          // Reset counter if break cannot be added
          classesBeforeBreak = 0;
        }
      }
    }
    
    return periods;
  };
  
  if (!isOpen) return null;
  
  const periods = calculateClassPeriods();
  
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    }}>
      <Card padding="32px" hover={false} style={{ maxWidth: 550, width: "90%", maxHeight: "90vh", overflow: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <Title level={3}>Timetable Configuration</Title>
          <button onClick={onClose} style={{ background: "none", border: "none", color: C.text.tertiary, fontSize: 24, cursor: "pointer" }}>×</button>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <Title level={4}>Daily Schedule</Title>
          
          <Input
            label="Start Time"
            type="time"
            value={config.startTime}
            onChange={e => updateConfig('startTime', e.target.value)}
          />
          
          <Input
            label="End Time"
            type="time"
            value={config.endTime}
            onChange={e => updateConfig('endTime', e.target.value)}
          />
          
          <Input
            label="Class Duration (minutes)"
            type="number"
            min="30"
            max="120"
            step="5"
            value={config.classDuration}
            onChange={e => updateConfig('classDuration', parseInt(e.target.value))}
          />
          
          <Input
            label="Break After Every 2 Classes (minutes)"
            type="number"
            min="0"
            max="30"
            step="5"
            value={config.breakDuration}
            onChange={e => updateConfig('breakDuration', parseInt(e.target.value))}
          />
          
          <div style={{ marginTop: 8, padding: 8, background: C.accent.blueBg, borderRadius: 6 }}>
            <p style={{ color: C.accent.blue, fontSize: 12, margin: 0 }}>
              📋 Schedule Pattern: <strong>Class → Class → Break → Class → Class → Lunch → Class → Class → Break → Class → Class</strong>
            </p>
            <p style={{ color: C.accent.blue, fontSize: 11, margin: "4px 0 0 0" }}>
              ⏱️ A {config.breakDuration} minute break will be given after every 2 classes
            </p>
          </div>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <Title level={4}>Lunch Break</Title>
          
          <Input
            label="Lunch Break Start"
            type="time"
            value={config.lunchBreak.start}
            onChange={e => updateLunchBreak('start', e.target.value)}
          />
          
          <Input
            label="Lunch Break Duration (minutes)"
            type="number"
            min="30"
            max="90"
            step="5"
            value={config.lunchBreak.duration}
            onChange={e => updateLunchBreak('duration', parseInt(e.target.value))}
          />
        </div>
        
        <div style={{ marginBottom: 20, padding: 16, background: C.cardHover, borderRadius: 12 }}>
          <Title level={4}>Preview</Title>
          <div style={{ maxHeight: 300, overflow: "auto" }}>
            {periods.map((slot, i) => (
              <div key={i} style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 12, 
                padding: "8px 12px",
                marginBottom: 4,
                borderRadius: 6,
                background: slot.type === "lunch" ? C.accent.goldBg : slot.type === "break" ? C.accent.blueBg : "transparent",
                borderBottom: i < periods.length - 1 ? `1px solid ${C.border}` : "none"
              }}>
                <span style={{ 
                  width: 60,
                  fontSize: 12,
                  fontWeight: 600,
                  color: slot.type === "lunch" ? C.accent.gold : slot.type === "break" ? C.accent.blue : C.text.primary
                }}>
                  {slot.period}
                </span>
                <span style={{ 
                  flex: 1,
                  color: slot.type === "lunch" ? C.accent.gold : slot.type === "break" ? C.accent.blue : C.text.primary, 
                  fontSize: 13,
                  fontWeight: slot.type === "lunch" ? 600 : 400
                }}>
                  {slot.type === "lunch" && "🍽️ "}
                  {slot.type === "break" && "☕ "}
                  {slot.start} - {slot.end}
                  {slot.type === "break" && " (Short Break)"}
                  {slot.type === "lunch" && " (Lunch Break)"}
                </span>
                {slot.type === "class" && (
                  <span style={{ fontSize: 11, color: C.text.tertiary }}>
                    {config.classDuration} min
                  </span>
                )}
                {slot.type === "break" && (
                  <span style={{ fontSize: 11, color: C.accent.blue }}>
                    {config.breakDuration} min
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div style={{ marginBottom: 16, padding: 12, background: C.accent.greenBg, borderRadius: 8 }}>
          <p style={{ color: C.accent.green, fontSize: 12, margin: 0, textAlign: "center" }}>
            📊 Summary: {periods.filter(p => p.type === "class").length} classes | 
            {periods.filter(p => p.type === "break").length} short breaks | 
            1 lunch break
          </p>
        </div>
        
        <div style={{ display: "flex", gap: 12 }}>
          <Button onClick={handleGenerate} variant="success" fullWidth>
            Generate Timetable
          </Button>
          <Button onClick={onClose} variant="secondary" fullWidth>
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
}