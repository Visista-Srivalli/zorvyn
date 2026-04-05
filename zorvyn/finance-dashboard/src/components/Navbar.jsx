import React from "react";
import { useApp } from "../context/AppContext";
import { Sun, Moon, TrendingUp } from "lucide-react";

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 32px",
    height: "64px",
    borderBottom: "1px solid var(--border)",
    background: "var(--bg-card)",
    position: "sticky",
    top: 0,
    zIndex: 100,
    backdropFilter: "blur(12px)",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: 700,
    fontSize: "18px",
    letterSpacing: "-0.5px",
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    background: "var(--accent)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  right: { display: "flex", alignItems: "center", gap: "16px" },
  roleSelect: {
    background: "var(--bg-elevated)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
    padding: "6px 12px",
    borderRadius: "8px",
    fontSize: "13px",
    fontFamily: "var(--font-display)",
    cursor: "pointer",
  },
  roleBadge: (role) => ({
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    background: role === "admin" ? "var(--accent-soft)" : "var(--green-soft)",
    color: role === "admin" ? "var(--accent)" : "var(--green)",
    border: `1px solid ${role === "admin" ? "var(--accent-glow)" : "rgba(52,211,153,0.2)"}`,
  }),
  themeBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    background: "var(--bg-elevated)",
    border: "1px solid var(--border)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--text-secondary)",
    cursor: "pointer",
    transition: "all 0.2s",
  },
};

export default function Navbar() {
  const { state, dispatch } = useApp();

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <div style={styles.logoIcon}>
          <TrendingUp size={16} />
        </div>
        FinFlow
      </div>

      <div style={styles.right}>
        <span style={styles.roleBadge(state.role)}>
          {state.role}
        </span>

        <select
          style={styles.roleSelect}
          value={state.role}
          onChange={(e) => dispatch({ type: "SET_ROLE", payload: e.target.value })}
          title="Switch Role"
        >
          <option value="admin">Admin View</option>
          <option value="viewer">Viewer View</option>
        </select>

        <button
          style={styles.themeBtn}
          onClick={() => dispatch({ type: "TOGGLE_THEME" })}
          title="Toggle theme"
        >
          {state.theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
    </nav>
  );
}