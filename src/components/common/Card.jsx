import { C } from "../../styles/theme";

export function Card({ children, onClick, hover = true, padding = "24px" }) {
  return (
    <div 
      onClick={onClick}
      style={{ 
        background: C.card,
        borderRadius: 16,
        padding,
        border: `1px solid ${C.border}`,
        boxShadow: C.shadow.md,
        transition: "all 0.2s ease",
        cursor: onClick ? "pointer" : "default",
        ...(hover && onClick ? {
          ':hover': {
            transform: "translateY(-2px)",
            boxShadow: C.shadow.lg,
            borderColor: C.borderHover,
          }
        } : {})
      }}
    >
      {children}
    </div>
  );
}