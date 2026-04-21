import { useAuth } from "../auth/AuthContext";
import { useRouter } from "../../context/RouterContext";
import { Button } from "./Button";
import { C } from "../../styles/theme";

export function Sidebar({ navItems, active, setActive, collapsed, setCollapsed, user, badges = {}, accentColor = C.accent.blue }) {
  const { logout } = useAuth();
  const { navigate } = useRouter();
  
  return (
    <aside style={{
      width: collapsed ? 80 : 260,
      background: C.nav,
      borderRight: `1px solid ${C.navBorder}`,
      display: "flex",
      flexDirection: "column",
      transition: "width 0.3s ease",
      flexShrink: 0,
      height: "100vh",
      position: "sticky",
      top: 0,
      boxShadow: C.shadow.md,
    }}>
      <div style={{
        padding: collapsed ? "20px 0" : "24px",
        borderBottom: `1px solid ${C.navBorder}`,
        display: "flex",
        alignItems: "center",
        gap: 12,
        justifyContent: collapsed ? "center" : "flex-start",
      }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: accentColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          fontWeight: 700,
          color: "#ffffff",
          flexShrink: 0,
        }}>AP</div>
        {!collapsed && (
          <div>
            <p style={{ color: C.text.primary, fontSize: 16, fontWeight: 700 }}>AcadPlan</p>
            <p style={{ color: C.text.tertiary, fontSize: 12 }}>SoCSE Portal</p>
          </div>
        )}
      </div>

      <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
        {navItems.map(item => {
          const isActive = active === item.id;
          const badge = badges[item.id] || 0;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              title={collapsed ? item.label : ""}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: collapsed ? "14px 0" : "12px 16px",
                justifyContent: collapsed ? "center" : "flex-start",
                borderRadius: 10,
                border: "none",
                background: isActive ? `${accentColor}10` : "transparent",
                cursor: "pointer",
                width: "100%",
                position: "relative",
                transition: "all 0.2s",
                color: isActive ? accentColor : C.text.secondary,
                fontWeight: isActive ? 600 : 400,
              }}
              onMouseEnter={e => !isActive && (e.currentTarget.style.background = C.cardHover)}
              onMouseLeave={e => !isActive && (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              {!collapsed && <span style={{ fontSize: 14, flex: 1, textAlign: "left" }}>{item.label}</span>}
              {badge > 0 && (
                <div style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  background: C.accent.red,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  color: "#ffffff",
                  fontWeight: 700,
                }}>
                  {badge}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {!collapsed && user && (
        <div style={{ padding: "16px", borderTop: `1px solid ${C.navBorder}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: `${accentColor}20`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: accentColor,
              fontWeight: 700,
              fontSize: 14,
            }}>
              {user.avatar}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: C.text.primary, fontSize: 14, fontWeight: 600 }}>{user.name}</p>
              <p style={{ color: C.text.tertiary, fontSize: 12, textTransform: "capitalize" }}>{user.role}</p>
            </div>
          </div>
          <Button
            onClick={() => { logout(); navigate("login"); }}
            variant="secondary"
            size="sm"
            fullWidth
          >
            Sign Out
          </Button>
        </div>
      )}

      <button
        onClick={() => setCollapsed(p => !p)}
        style={{
          margin: "12px",
          padding: "8px",
          borderRadius: 8,
          border: `1px solid ${C.border}`,
          background: "transparent",
          color: C.text.tertiary,
          cursor: "pointer",
          fontSize: 14,
        }}
      >
        {collapsed ? "→" : "←"}
      </button>
    </aside>
  );
}