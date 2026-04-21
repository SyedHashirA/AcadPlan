import { Card, Title, Badge } from "../common";
import { AppState } from "../../AppState";
import { WORKLOAD_LIMITS } from "../../data/mockData";
import { C } from "../../styles/theme";

export function FacultyWorkloadInsights() {
  const facultyList = AppState.faculty;
  const getExpectedHours = (designation) => WORKLOAD_LIMITS[designation] || 12;

  return (
    <Card>
      <Title level={4}>Faculty Workload Insights</Title>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: 8 }}>Faculty</th>
              <th style={{ textAlign: "left", padding: 8 }}>Designation</th>
              <th style={{ textAlign: "left", padding: 8 }}>Assigned</th>
              <th style={{ textAlign: "left", padding: 8 }}>Expected Max</th>
              <th style={{ textAlign: "left", padding: 8 }}>Remaining</th>
              <th style={{ textAlign: "left", padding: 8 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {facultyList.map(f => {
              const expected = getExpectedHours(f.designation);
              const assigned = f.assignedHours;
              const remaining = f.remainingHours;
              const isUnder = assigned < expected;
              const isOver = assigned > expected;
              return (
                <tr key={f.id} style={{ borderTop: `1px solid ${C.border}` }}>
                  <td style={{ padding: 8 }}>{f.name}</td>
                  <td style={{ padding: 8 }}>{f.designation}</td>
                  <td style={{ padding: 8 }}>{assigned}h</td>
                  <td style={{ padding: 8 }}>{expected}h</td>
                  <td style={{ padding: 8 }}>{remaining}h</td>
                  <td style={{ padding: 8 }}>
                    {isUnder ? <Badge variant="warning">Underutilized ({expected - assigned}h gap)</Badge> : isOver ? <Badge variant="danger">Overloaded ({assigned - expected}h excess)</Badge> : <Badge variant="success">Optimal</Badge>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}