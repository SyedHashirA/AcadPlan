// src/components/shared/AcademicCalendar.jsx
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { Card, Title, Button, Input, Select, Badge } from "../common";
import { loadFromStorage, saveToStorage } from "../../utils/storage";
import { DEFAULT_CALENDAR_EVENTS } from "../../data/mockData";
import { C } from "../../styles/theme";

export function AcademicCalendar() {
  const { user } = useAuth();
  const [events, setEvents] = useState(() => loadFromStorage('acadplan_calendar_events', DEFAULT_CALENDAR_EVENTS));
  const [newEvent, setNewEvent] = useState({ title: "", date: "", type: "academic" });
  const [isAdding, setIsAdding] = useState(false);

  const addEvent = () => {
    if (newEvent.title && newEvent.date) {
      const newEvents = [...events, { ...newEvent, id: Date.now() }];
      setEvents(newEvents);
      saveToStorage('acadplan_calendar_events', newEvents);
      setNewEvent({ title: "", date: "", type: "academic" });
      setIsAdding(false);
    }
  };

  const deleteEvent = (id) => {
    if (confirm("Delete event?")) {
      const newEvents = events.filter(e => e.id !== id);
      setEvents(newEvents);
      saveToStorage('acadplan_calendar_events', newEvents);
    }
  };

  const getEventColor = (type) => {
    switch(type) {
      case "exam": return C.accent.red;
      case "admin": return C.accent.gold;
      default: return C.accent.blue;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Title>Academic Calendar</Title>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ color: C.text.primary }}>Upcoming Events</h3>
          {user.role === "director" && (
            <Button onClick={() => setIsAdding(!isAdding)} variant="primary" size="sm">
              {isAdding ? "Cancel" : "+ Add Event"}
            </Button>
          )}
        </div>

        {isAdding && (
          <div style={{ marginBottom: 20, padding: 16, background: C.cardHover, borderRadius: 12 }}>
            <Input label="Event Title" value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} />
            <Input label="Date" type="date" value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} />
            <Select label="Type" value={newEvent.type} onChange={e => setNewEvent({ ...newEvent, type: e.target.value })} options={[{ value: "academic", label: "Academic" }, { value: "exam", label: "Exam" }, { value: "admin", label: "Administrative" }]} />
            <Button onClick={addEvent} variant="success" style={{ marginTop: 12 }}>Add Event</Button>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {events.sort((a,b) => new Date(a.date) - new Date(b.date)).map(event => (
            <div key={event.id} style={{ padding: 12, borderLeft: `4px solid ${getEventColor(event.type)}`, background: C.cardHover, borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 600, color: C.text.primary }}>{event.title}</div>
                <div style={{ fontSize: 12, color: C.text.tertiary }}>{new Date(event.date).toLocaleDateString()}</div>
                <Badge variant={event.type === "exam" ? "danger" : event.type === "admin" ? "warning" : "primary"}>{event.type}</Badge>
              </div>
              {user.role === "director" && (
                <button onClick={() => deleteEvent(event.id)} style={{ background: "none", border: "none", color: C.accent.red, cursor: "pointer" }}>🗑️</button>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}