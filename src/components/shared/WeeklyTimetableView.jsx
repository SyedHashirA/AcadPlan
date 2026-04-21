// src/components/shared/WeeklyTimetableView.jsx
import { Card, Title } from "../common";
import { AppState } from "../../AppState";
import { generateTimeSlots } from "../../utils/timetableUtils";
import { C } from "../../styles/theme";

export function WeeklyTimetableView({ schedule, title }) {
  const config = AppState.timetableConfig;
  const timeSlots = generateTimeSlots(config);
  // Keep ALL time slots including lunch
  const allTimeSlots = timeSlots;
  
  const getSlotContent = (day, time) => {
    const slots = schedule.filter(s => s.day === day && s.time === time);
    return slots;
  };
  
  // Check if a time slot is lunch break
  const isLunchSlot = (slot) => {
    return slot.isLunch === true;
  };
  
  return (
    <Card>
      <Title level={4}>{title}</Title>
      
      <div style={{ overflowX: "auto", marginTop: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 800 }}>
          <thead>
            <tr>
              <th style={{ padding: "12px", textAlign: "left", color: C.text.primary, borderBottom: `2px solid ${C.border}` }}>Day / Time</th>
              {allTimeSlots.map(slot => (
                <th key={slot.time} style={{ 
                  padding: "12px", 
                  textAlign: "center", 
                  color: C.text.primary, 
                  borderBottom: `2px solid ${C.border}`,
                  backgroundColor: slot.isLunch ? C.accent.goldBg : "transparent"
                }}>
                  {slot.isLunch ? (
                    <>
                      <div style={{ fontWeight: 600, color: C.accent.gold }}>🍽️ LUNCH</div>
                      <div style={{ fontSize: 11, color: C.text.tertiary }}>{slot.time} - {slot.endTime}</div>
                    </>
                  ) : (
                    <>
                      <div style={{ fontWeight: 600 }}>{slot.period}</div>
                      <div style={{ fontSize: 11, color: C.text.tertiary }}>{slot.time} - {slot.endTime}</div>
                    </>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {config.days.map(day => (
              <tr key={day}>
                <td style={{ padding: "12px", color: C.text.primary, fontWeight: 600, borderBottom: `1px solid ${C.border}`, backgroundColor: C.cardHover }}>
                  {day}
                </td>
                {allTimeSlots.map(slot => {
                  if (isLunchSlot(slot)) {
                    // Render lunch break cell
                    return (
                      <td 
                        key={`${day}-${slot.time}`} 
                        style={{ 
                          padding: "12px", 
                          borderBottom: `1px solid ${C.border}`, 
                          verticalAlign: "middle",
                          textAlign: "center",
                          backgroundColor: C.accent.goldBg
                        }}
                      >
                        <div style={{ 
                          color: C.accent.gold, 
                          fontWeight: 600,
                          fontSize: 14,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 8,
                          flexDirection: "column"
                        }}>
                          <span style={{ fontSize: 24 }}>🍽️</span>
                          <span>Lunch Break</span>
                          <span style={{ fontSize: 11, fontWeight: "normal" }}>{slot.time} - {slot.endTime}</span>
                        </div>
                      </td>
                    );
                  }
                  
                  const slots = getSlotContent(day, slot.time);
                  return (
                    <td key={`${day}-${slot.time}`} style={{ padding: "6px", borderBottom: `1px solid ${C.border}`, verticalAlign: "top" }}>
                      {slots.length > 0 ? (
                        slots.map(s => (
                          <div
                            key={s.id}
                            style={{
                              background: `${s.color}10`,
                              border: `1px solid ${s.color}30`,
                              borderRadius: 8,
                              padding: "8px",
                              marginBottom: slots.length > 1 ? 4 : 0,
                            }}
                          >
                            <div style={{ fontWeight: 600, fontSize: 12, color: C.text.primary }}>{s.subject}</div>
                            <div style={{ fontSize: 10, color: C.text.secondary }}>{s.facultyName}</div>
                            <div style={{ fontSize: 10, color: s.type === "lab" ? C.accent.green : C.accent.blue }}>{s.room}</div>
                          </div>
                        ))
                      ) : (
                        <div style={{ 
                          height: "100%", 
                          minHeight: 60, 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center",
                          color: C.text.tertiary,
                          fontSize: 12
                        }}>
                          —
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}