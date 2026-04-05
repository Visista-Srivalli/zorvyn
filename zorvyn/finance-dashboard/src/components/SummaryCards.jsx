import React from "react";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { fmtShort, getSummary } from "../utils/helpers";
import { useApp } from "../context/AppContext";

function Card({ label, value, icon: Icon, colorVar, bgVar, delay = 0 }) {
  return (
    <div
      className="fade-up"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        boxShadow: "var(--shadow)",
        animationDelay: `${delay}ms`,
        flex: 1,
        minWidth: 0,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          {label}
        </span>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: bgVar, display: "flex", alignItems: "center", justifyContent: "center",
          color: colorVar,
        }}>
          <Icon size={16} />
        </div>
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 28, fontWeight: 500, letterSpacing: "-1px", color: colorVar || "var(--text-primary)" }}>
        {value}
      </div>
    </div>
  );
}

export default function SummaryCards() {
  const { state } = useApp();
  const { income, expenses, balance } = getSummary(state.transactions);

  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <Card label="Total Balance" value={fmtShort(balance)} icon={Wallet}
        colorVar={balance >= 0 ? "var(--green)" : "var(--red)"}
        bgVar={balance >= 0 ? "var(--green-soft)" : "var(--red-soft)"}
        delay={0} />
      <Card label="Total Income" value={fmtShort(income)} icon={TrendingUp}
        colorVar="var(--green)" bgVar="var(--green-soft)" delay={80} />
      <Card label="Total Expenses" value={fmtShort(expenses)} icon={TrendingDown}
        colorVar="var(--red)" bgVar="var(--red-soft)" delay={160} />
    </div>
  );
}