// src/components/common/Badge.jsx
import { C } from "../../styles/theme";

export function Badge({ variant = "primary", children }) {
  // Define color mappings directly to avoid C.accent issues
  const variants = {
    primary: { bg: "#eff6ff", color: "#2563eb" },
    success: { bg: "#ecfdf5", color: "#059669" },
    warning: { bg: "#fffbeb", color: "#b45309" },
    danger: { bg: "#fef2f2", color: "#b91c1c" },
    purple: { bg: "#f5f3ff", color: "#7c3aed" },
    secondary: { bg: "#f1f5f9", color: "#64748b" },
    gold: { bg: "#fffbeb", color: "#b45309" },
    blue: { bg: "#eff6ff", color: "#2563eb" },
    green: { bg: "#ecfdf5", color: "#059669" }
  };
  
  const selectedVariant = variants[variant] || variants.primary;
  
  return (
    <span style={{
      background: selectedVariant.bg,
      color: selectedVariant.color,
      padding: "4px 12px",
      borderRadius: 30,
      fontSize: 12,
      fontWeight: 600,
      display: "inline-block",
      border: `1px solid ${selectedVariant.bg}`,
    }}>
      {children}
    </span>
  );
}