import React from "react";
import { LayoutDashboard, List, Lightbulb } from "lucide-react";

const LINKS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "transactions", label: "Transactions", icon: List },
  { id: "insights", label: "Insights", icon: Lightbulb },
];

export default function Sidebar({ active, setActive }) {
  return (
    <aside style={{
      width: 220,
      minHeight: "calc(100vh - 64px)",
      background: "var(--bg-card)",
      borderRight: "1px solid var(--border)",
      padding: "24px 12px",
      display: "flex",
      flexDirection: "column",
      gap: 4,
      flexShrink: 0,
    }}>
      <p style={{
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        color: "var(--text-muted)",
        padding: "0 12px",
        marginBottom: 8,
      }}>Navigation</p>

      {LINKS.map(({ id, label, icon: Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => setActive(id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 10,
              background: isActive ? "var(--accent-soft)" : "transparent",
              color: isActive ? "var(--accent)" : "var(--text-secondary)",
              fontWeight: isActive ? 600 : 400,
              fontSize: 14,
              transition: "all 0.2s",
              border: "none",
              width: "100%",
              textAlign: "left",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              if (!isActive) e.currentTarget.style.background = "var(--bg-hover)";
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.background = "transparent";
            }}
          >
            <Icon size={16} />
            {label}
          </button>
        );
      })}
    </aside>
  );
}