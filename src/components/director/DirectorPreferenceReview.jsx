// src/components/director/DirectorPreferenceReview.jsx
import { useState, useEffect } from "react";
import { Card, Title, Badge } from "../common";
import { AppState } from "../../AppState";
import { C } from "../../styles/theme";

export function DirectorPreferenceReview() {
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const handleStorageChange = () => setRefresh(r => r + 1);
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const allPreferences = AppState.subjectPreferences;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Title>Faculty Subject Preferences (Director View)</Title>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
        <Card padding="20px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Total Faculty</p>
          <p style={{ color: C.accent.blue, fontSize: 32, fontWeight: 700 }}>{allPreferences.length}</p>
        </Card>
        <Card padding="20px">
          <p style={{ color: C.text.tertiary, fontSize: 12 }}>Submitted Preferences</p>
          <p style={{ color: C.accent.gold, fontSize: 32, fontWeight: 700 }}>
            {allPreferences.filter(p => p.submitted).length}
          </p>
        </Card>
      </div>

      {allPreferences.map(pref => {
        const faculty = AppState.faculty.find(f => f.id === pref.facultyId);
        if (!faculty) return null;

        return (
          <Card key={pref.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: `${faculty.color}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: faculty.color,
                  fontWeight: 700,
                }}>
                  {pref.avatar}
                </div>
                <div>
                  <p style={{ color: C.text.primary, fontWeight: 600, fontSize: 16 }}>{pref.facultyName}</p>
                  <p style={{ color: C.text.secondary, fontSize: 13 }}>{faculty.designation} · {faculty.course}</p>
                </div>
              </div>
              <Badge variant={pref.status === "approved" ? "success" : pref.status === "pending" ? "warning" : "danger"}>
                {pref.status}
              </Badge>
            </div>

            {pref.submitted && (
              <>
                <div style={{ marginBottom: 16 }}>
                  <p style={{ color: C.text.tertiary, fontSize: 12, marginBottom: 8 }}>Preferences:</p>
                  {pref.preferences.map(p => {
                    const subject = AppState.subjects.find(s => s.id === p.subjectId);
                    return (
                      <div key={p.level} style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 12px",
                        marginBottom: 4,
                        background: C.cardHover,
                        borderRadius: 8,
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            background: p.level === 1 ? C.accent.goldBg : p.level === 2 ? C.accent.blueBg : C.accent.greenBg,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: p.level === 1 ? C.accent.gold : p.level === 2 ? C.accent.blue : C.accent.green,
                            fontSize: 12,
                            fontWeight: 700,
                          }}>
                            {p.level}
                          </span>
                          <span style={{ color: C.text.primary }}>{subject?.name || "Unknown subject"}</span>
                        </div>
                        <span style={{ color: C.accent.blue, fontSize: 12 }}>{subject?.totalWeeklyClasses || 0}h</span>
                      </div>
                    );
                  })}
                </div>

                {pref.allocatedSubjects && pref.allocatedSubjects.length > 0 && (
                  <div style={{ padding: 12, background: C.cardHover, borderRadius: 8 }}>
                    <p style={{ color: C.accent.green, fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                      Allocated Subjects:
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {pref.allocatedSubjects.map(subjId => {
                        const subj = AppState.subjects.find(s => s.id === subjId);
                        return (
                          <Badge key={subjId} variant="success">{subj?.name}</Badge>
                        );
                      })}
                    </div>
                  </div>
                )}

                {pref.feedback && (
                  <div style={{ marginTop: 12, padding: 8, background: C.accent.goldBg, borderRadius: 8 }}>
                    <p style={{ color: C.accent.gold, fontSize: 12 }}>Feedback: {pref.feedback}</p>
                  </div>
                )}
              </>
            )}
          </Card>
        );
      })}
    </div>
  );
}