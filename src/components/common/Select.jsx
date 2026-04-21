// src/components/common/Select.jsx
import { C } from "../../styles/theme";

export function Select({ label, name, value, onChange, options, required, disabled }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label 
          htmlFor={name}
          style={{ 
            color: C.text.secondary, 
            fontSize: 13, 
            display: "block", 
            marginBottom: 6,
            fontWeight: 500,
          }}
        >
          {label} {required && <span style={{ color: C.accent.red }}>*</span>}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value || ""}
        onChange={onChange}
        required={required}
        disabled={disabled}
        style={{
          width: "100%",
          background: disabled ? C.cardHover : C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 10,
          padding: "10px 14px",
          color: C.text.primary,
          fontSize: 14,
          outline: "none",
          transition: "all 0.2s ease",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
        onFocus={(e) => !disabled && (e.currentTarget.style.borderColor = C.accent.blue)}
        onBlur={(e) => !disabled && (e.currentTarget.style.borderColor = C.border)}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}