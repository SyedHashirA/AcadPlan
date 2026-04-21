// src/components/director/DirectorTimetableAndSuggestions.jsx
import { useState, useEffect } from "react";
import { Card, Title, Button } from "../common";
import { CoordinatorTimetableView } from "../coordinator/CoordinatorTimetableView";
import { AppState } from "../../AppState";
import { saveToStorage, STORAGE_KEYS } from "../../utils/storage";
import { C } from "../../styles/theme";

export function DirectorTimetableAndSuggestions() {
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const handleStorageChange = () => setRefresh(r => r + 1);
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const suggestions = AppState.flaggedIssues.filter(
    issue => issue.type === "timetable_suggestion" && issue.status === "pending"
  );

  const resolveSuggestion = (issueId) => {
    const issue = AppState.flaggedIssues.find(i => i.id === issueId);
    if (issue) {
      issue.status = "resolved";
      saveToStorage(STORAGE_KEYS.FLAGGED_ISSUES, AppState.flaggedIssues);
      setRefresh(r => r + 1);
      alert("Suggestion marked as resolved.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <CoordinatorTimetableView />

      <Card>
        <Title level={4}>Pending Timetable Suggestions from Faculty</Title>
        {suggestions.length === 0 ? (
          <p style={{ color: C.text.tertiary, textAlign: "center", padding: "20px 0" }}>
            No pending suggestions.
          </p>
        ) : (
          suggestions.map(suggestion => (
            <div
              key={suggestion.id}
              style={{
                marginBottom: 16,
                padding: 16,
                background: C.cardHover,
                borderRadius: 12,
                borderLeft: `4px solid ${C.accent.gold}`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontWeight: 600, color: C.text.primary }}>
                    {suggestion.facultyName}
                  </div>
                  <div style={{ fontSize: 12, color: C.text.tertiary, marginTop: 4 }}>
                    {new Date(suggestion.timestamp).toLocaleString()}
                  </div>
                  <div style={{ marginTop: 8, color: C.text.secondary }}>
                    {suggestion.reason}
                  </div>
                </div>
                <Button
                  onClick={() => resolveSuggestion(suggestion.id)}
                  variant="success"
                  size="sm"
                >
                  Mark Resolved
                </Button>
              </div>
            </div>
          ))
        )}
      </Card>
    </div>
  );
}