// src/components/common/Input.jsx
import { C } from "../../styles/theme";

export function Input({ 
  label, 
  type = "text", 
  name,
  value, 
  onChange, 
  placeholder, 
  required, 
  error,
  min,
  max,
  step
}) {
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
      <input
        id={name}
        name={name}
        type={type}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        step={step}
        style={{
          width: "100%",
          background: C.surface,
          border: `1px solid ${error ? C.accent.red : C.border}`,
          borderRadius: 10,
          padding: "10px 14px",
          color: C.text.primary,
          fontSize: 14,
          outline: "none",
          transition: "all 0.2s ease",
          boxSizing: "border-box",
        }}
        onFocus={(e) => e.currentTarget.style.borderColor = C.accent.blue}
        onBlur={(e) => e.currentTarget.style.borderColor = error ? C.accent.red : C.border}
      />
      {error && <p style={{ color: C.accent.red, fontSize: 12, marginTop: 4 }}>{error}</p>}
    </div>
  );
}