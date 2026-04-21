import { C } from "../../styles/theme";

export function Button({ children, onClick, variant = "primary", disabled, fullWidth = false, size = "md" }) {
  const sizes = {
    sm: { padding: "8px 16px", fontSize: 13 },
    md: { padding: "12px 24px", fontSize: 14 },
    lg: { padding: "14px 32px", fontSize: 16 },
  };
  
  const variants = {
    primary: { background: C.gradient.blue, color: "#ffffff", border: "none" },
    secondary: { background: C.surface, color: C.text.primary, border: `1px solid ${C.border}` },
    danger: { background: C.gradient.red, color: "#ffffff", border: "none" },
    success: { background: C.gradient.green, color: "#ffffff", border: "none" },
    warning: { background: C.gradient.gold, color: "#ffffff", border: "none" },
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...variants[variant],
        borderRadius: 12,
        ...sizes[size],
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        boxShadow: C.shadow.md,
        transition: "all 0.2s ease",
        opacity: disabled ? 0.5 : 1,
        width: fullWidth ? "100%" : "auto",
      }}
      onMouseEnter={(e) => !disabled && (e.currentTarget.style.transform = "translateY(-1px)")}
      onMouseLeave={(e) => !disabled && (e.currentTarget.style.transform = "translateY(0)")}
    >
      {children}
    </button>
  );
}