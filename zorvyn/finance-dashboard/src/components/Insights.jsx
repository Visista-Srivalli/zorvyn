import React from "react";
import { useApp } from "../context/AppContext";
import { getMonthlyData, getCategoryBreakdown, getSummary, fmt, fmtShort } from "../utils/helpers";
import { CATEGORY_COLORS } from "../data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Award, AlertCircle, Target } from "lucide-react";

function InsightCard({ icon: Icon, color, bg, title, value, sub, delay = 0 }) {
  return (
    <div className="fade-up" style={{
      background: "var(--bg-card)", border: "1px solid var(--border)",
      borderRadius: "var(--radius)", padding: "20px 22px",
      display: "flex", gap: 16, alignItems: "flex-start",
      boxShadow: "var(--shadow)", animationDelay: `${delay}ms`,
    }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center", color, flexShrink: 0 }}>
        <Icon size={18} />
      </div>
      <div>
        <p style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>{title}</p>
        <p style={{ fontSize: 20, fontWeight: 700, fontFamily: "var(--font-mono)", marginTop: 4, color }}>{value}</p>
        {sub && <p style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>{sub}</p>}
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 16px", fontSize: 13 }}>
      <p style={{ color: "var(--text-secondary)", marginBottom: 8, fontWeight: 600 }}>{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.fill, fontFamily: "var(--font-mono)" }}>
          {p.name}: {fmtShort(p.value)}
        </p>
      ))}
    </div>
  );
};

export default function Insights() {
  const { state } = useApp();
  const monthly = getMonthlyData(state.transactions);
  const categories = getCategoryBreakdown(state.transactions);
  const { income, expenses } = getSummary(state.transactions);

  const topCategory = categories[0];
  const savingsRate = income > 0 ? Math.round(((income - expenses) / income) * 100) : 0;

  const lastMonth = monthly[monthly.length - 1];
  const prevMonth = monthly[monthly.length - 2];
  const monthDiff = lastMonth && prevMonth
    ? ((lastMonth.expenses - prevMonth.expenses) / prevMonth.expenses * 100).toFixed(1)
    : null;

  const avgMonthlyExpense = monthly.length
    ? Math.round(monthly.reduce((s, m) => s + m.expenses, 0) / monthly.length)
    : 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>Insights</h2>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 2 }}>Smart observations from your financial data</p>
      </div>

      {/* Key Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
        <InsightCard icon={Award} color="var(--accent)" bg="var(--accent-soft)"
          title="Top Spending Category" value={topCategory?.name || "—"}
          sub={topCategory ? `${fmt(topCategory.value)} total` : "No data"}
          delay={0} />
        <InsightCard icon={Target} color="var(--green)" bg="var(--green-soft)"
          title="Savings Rate" value={`${savingsRate}%`}
          sub={savingsRate > 20 ? "Great job saving!" : "Try to save more"}
          delay={80} />
        <InsightCard icon={monthDiff && +monthDiff > 0 ? TrendingUp : TrendingDown}
          color={monthDiff && +monthDiff > 0 ? "var(--red)" : "var(--green)"}
          bg={monthDiff && +monthDiff > 0 ? "var(--red-soft)" : "var(--green-soft)"}
          title="vs Last Month" value={monthDiff ? `${monthDiff > 0 ? "+" : ""}${monthDiff}%` : "—"}
          sub="Change in expenses" delay={160} />
        <InsightCard icon={AlertCircle} color="var(--yellow)" bg="rgba(251,191,36,0.1)"
          title="Avg Monthly Expense" value={fmtShort(avgMonthlyExpense)}
          sub="Based on all months" delay={240} />
      </div>

      {/* Monthly Comparison Bar Chart */}
      <div className="fade-up" style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "var(--radius)", padding: "24px", boxShadow: "var(--shadow)",
        animationDelay: "200ms",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 24, textTransform: "uppercase", letterSpacing: "0.5px" }}>
          Monthly Income vs Expenses
        </h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={monthly} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--text-muted)", fontFamily: "var(--font-display)" }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={fmtShort} tick={{ fontSize: 11, fill: "var(--text-muted)", fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="income" name="Income" fill="var(--green)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expenses" name="Expenses" fill="var(--red)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category Table */}
      <div className="fade-up" style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "var(--radius)", padding: "24px", boxShadow: "var(--shadow)",
        animationDelay: "300ms",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 20, textTransform: "uppercase", letterSpacing: "0.5px" }}>
          Spending by Category
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {categories.map((c) => {
            const pct = expenses > 0 ? (c.value / expenses) * 100 : 0;
            return (
              <div key={c.name}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{c.name}</span>
                  <span style={{ fontSize: 13, fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
                    {fmt(c.value)} <span style={{ color: "var(--text-muted)", fontSize: 11 }}>({pct.toFixed(1)}%)</span>
                  </span>
                </div>
                <div style={{ height: 6, background: "var(--bg-elevated)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", borderRadius: 3,
                    width: `${pct}%`,
                    background: CATEGORY_COLORS[c.name] || "var(--accent)",
                    transition: "width 0.6s ease",
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}