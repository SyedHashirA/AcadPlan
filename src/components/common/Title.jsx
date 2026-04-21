import { C } from "../../styles/theme";

export function Title({ children, level = 2 }) {
  const styles = {
    1: { fontSize: 28, fontWeight: 700, marginBottom: 24 },
    2: { fontSize: 24, fontWeight: 600, marginBottom: 20 },
    3: { fontSize: 20, fontWeight: 600, marginBottom: 16 },
    4: { fontSize: 18, fontWeight: 600, marginBottom: 12 },
  };
  
  return (
    <h3 style={{ 
      color: C.text.primary,
      ...styles[level],
      letterSpacing: "-0.02em",
    }}>
      {children}
    </h3>
  );
}