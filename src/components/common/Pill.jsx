import { C } from "../../styles/theme";

export function Pill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 16px",
        borderRadius: 30,
        border: `1px solid ${active ? C.accent.blue : C.border}`,
        background: active ? C.accent.blueBg : "transparent",
        color: active ? C.accent.blue : C.text.secondary,
        fontSize: 13,
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
    >
      {children}
    </button>
  );
}