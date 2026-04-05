import React from "react";
import SummaryCards from "./SummaryCards";
import Charts from "./Charts";
import { useApp } from "../context/AppContext";
import { fmt, fmtDate } from "../utils/helpers";
import { CATEGORY_COLORS } from "../data/mockData";

export default function Overview() {
  const { state } = useApp();
  const recent = [...state.transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>Overview</h2>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 2 }}>Your financial snapshot</p>
      </div>

      <SummaryCards />
      <Charts />

      {/* Recent Transactions */}
      <div className="fade-up" style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "var(--radius)", padding: "24px", boxShadow: "var(--shadow)",
        animationDelay: "200ms",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 20, textTransform: "uppercase", letterSpacing: "0.5px" }}>
          Recent Transactions
        </h3>
        {recent.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: 14, textAlign: "center", padding: "24px" }}>No transactions yet</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {recent.map((t) => (
              <div key={t.id} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 12px", borderRadius: 10, transition: "background 0.15s",
              }}
                onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-hover)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: CATEGORY_COLORS[t.category] || "#888", flexShrink: 0,
                  }} />
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 500 }}>{t.description}</p>
                    <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 1 }}>{fmtDate(t.date)} · {t.category}</p>
                  </div>
                </div>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600,
                  color: t.type === "income" ? "var(--green)" : "var(--red)",
                }}>
                  {t.type === "income" ? "+" : "-"}{fmt(t.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}