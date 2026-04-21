import { C } from "../../styles/theme";

export function Badge({ variant = "primary", children }) {
  const variants = {
    primary: { bg: C.accent.blueBg, color: C.accent.blue },
    success: { bg: C.accent.greenBg, color: C.accent.green },
    warning: { bg: C.accent.goldBg, color: C.accent.gold },
    danger: { bg: C.accent.redBg, color: C.accent.red },
    purple: { bg: C.accent.purpleBg, color: C.accent.purple },
  };
  
  return (
    <span style={{
      background: variants[variant].bg,
      color: variants[variant].color,
      padding: "4px 12px",
      borderRadius: 30,
      fontSize: 12,
      fontWeight: 600,
      display: "inline-block",
      border: `1px solid ${variants[variant].bg}`,
    }}>
      {children}
    </span>
  );
}