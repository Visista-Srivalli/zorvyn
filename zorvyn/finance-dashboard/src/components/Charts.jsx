import React from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { useApp } from "../context/AppContext";
import { getMonthlyData, getCategoryBreakdown, fmtShort } from "../utils/helpers";
import { CATEGORY_COLORS } from "../data/mockData";

function ChartCard({ title, children, delay = 0 }) {
  return (
    <div className="fade-up" style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius)",
      padding: "24px",
      boxShadow: "var(--shadow)",
      animationDelay: `${delay}ms`,
    }}>
      <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 24, textTransform: "uppercase", letterSpacing: "0.5px" }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "var(--bg-elevated)", border: "1px solid var(--border)",
      borderRadius: 10, padding: "12px 16px", fontSize: 13, boxShadow: "var(--shadow-lg)",
    }}>
      <p style={{ color: "var(--text-secondary)", marginBottom: 8, fontWeight: 600 }}>{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color, fontFamily: "var(--font-mono)", marginBottom: 4 }}>
          {p.name}: {fmtShort(p.value)}
        </p>
      ))}
    </div>
  );
};

const PieTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "var(--bg-elevated)", border: "1px solid var(--border)",
      borderRadius: 10, padding: "10px 14px", fontSize: 13, boxShadow: "var(--shadow-lg)",
    }}>
      <p style={{ color: "var(--text-primary)", fontWeight: 600 }}>{payload[0].name}</p>
      <p style={{ color: payload[0].payload.fill, fontFamily: "var(--font-mono)" }}>{fmtShort(payload[0].value)}</p>
    </div>
  );
};

export default function Charts() {
  const { state } = useApp();
  const monthly = getMonthlyData(state.transactions);
  const categories = getCategoryBreakdown(state.transactions);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <ChartCard title="Balance Trend" delay={0}>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={monthly}>
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--green)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--green)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--red)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--red)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--text-muted)", fontFamily: "var(--font-display)" }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={fmtShort} tick={{ fontSize: 11, fill: "var(--text-muted)", fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="income" name="Income" stroke="var(--green)" strokeWidth={2} fill="url(#incomeGrad)" />
            <Area type="monotone" dataKey="expenses" name="Expenses" stroke="var(--red)" strokeWidth={2} fill="url(#expGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Spending Breakdown" delay={100}>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={categories.slice(0, 6)}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
            >
              {categories.slice(0, 6).map((entry) => (
                <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || "#888"} />
              ))}
            </Pie>
            <Tooltip content={<PieTooltip />} />
            <Legend
              formatter={(value) => <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>{value}</span>}
              iconSize={8}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}