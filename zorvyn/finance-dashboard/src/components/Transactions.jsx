import React, { useState } from "react";
import { Search, Plus, Download, ArrowUpDown, Pencil, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { useApp } from "../context/AppContext";
import { filterAndSort, fmtDate, fmt, exportCSV } from "../utils/helpers";
import { CATEGORIES, CATEGORY_COLORS } from "../data/mockData";
import TransactionModal from "./TransactionModal";

const inputStyle = {
  background: "var(--bg-elevated)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  padding: "8px 12px",
  color: "var(--text-primary)",
  fontSize: 13,
  fontFamily: "var(--font-display)",
};

export default function Transactions() {
  const { state, dispatch } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const { filters, sortConfig, role } = state;
  const isAdmin = role === "admin";

  const setFilter = (k, v) => dispatch({ type: "SET_FILTER", payload: { [k]: v } });
  const setSort = (key) => {
    const dir = sortConfig.key === key && sortConfig.dir === "asc" ? "desc" : "asc";
    dispatch({ type: "SET_SORT", payload: { key, dir } });
  };

  const filtered = filterAndSort(state.transactions, filters, sortConfig);

  const SortIcon = ({ col }) => {
    if (sortConfig.key !== col) return <ArrowUpDown size={12} style={{ opacity: 0.3 }} />;
    return sortConfig.dir === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />;
  };

  const thStyle = (col) => ({
    padding: "10px 14px",
    textAlign: "left",
    fontSize: 11,
    fontWeight: 600,
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
  });

  const tdStyle = {
    padding: "12px 14px",
    fontSize: 13,
    color: "var(--text-primary)",
    borderBottom: "1px solid var(--border)",
    whiteSpace: "nowrap",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700 }}>Transactions</h2>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 2 }}>
            {filtered.length} of {state.transactions.length} transactions
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => exportCSV(filtered)} style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "9px 14px", borderRadius: 9,
            background: "var(--bg-elevated)", border: "1px solid var(--border)",
            color: "var(--text-secondary)", fontSize: 13, cursor: "pointer",
          }}>
            <Download size={14} /> Export CSV
          </button>
          {isAdmin && (
            <button onClick={() => { setEditing(null); setModalOpen(true); }} style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "9px 14px", borderRadius: 9,
              background: "var(--accent)", border: "none",
              color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}>
              <Plus size={14} /> Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "var(--radius)", padding: "16px 20px",
        display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center",
      }}>
        <div style={{ position: "relative", flex: "1", minWidth: 180 }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input
            style={{ ...inputStyle, width: "100%", paddingLeft: 30 }}
            placeholder="Search transactions..."
            value={filters.search}
            onChange={(e) => setFilter("search", e.target.value)}
          />
        </div>

        <select style={inputStyle} value={filters.type} onChange={(e) => setFilter("type", e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select style={inputStyle} value={filters.category} onChange={(e) => setFilter("category", e.target.value)}>
          <option value="all">All Categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <input style={inputStyle} type="date" value={filters.dateFrom} onChange={(e) => setFilter("dateFrom", e.target.value)} title="From Date" />
        <input style={inputStyle} type="date" value={filters.dateTo} onChange={(e) => setFilter("dateTo", e.target.value)} title="To Date" />

        {(filters.search || filters.type !== "all" || filters.category !== "all" || filters.dateFrom || filters.dateTo) && (
          <button onClick={() => dispatch({ type: "RESET_FILTERS" })} style={{
            padding: "8px 12px", borderRadius: 8,
            background: "var(--red-soft)", border: "1px solid rgba(248,113,113,0.2)",
            color: "var(--red)", fontSize: 12, fontWeight: 500, cursor: "pointer",
          }}>Clear Filters</button>
        )}
      </div>

      {/* Table */}
      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "var(--radius)", overflow: "hidden", boxShadow: "var(--shadow)",
      }}>
        {filtered.length === 0 ? (
          <div style={{ padding: "60px 20px", textAlign: "center", color: "var(--text-muted)" }}>
            <p style={{ fontSize: 40, marginBottom: 12 }}>🔍</p>
            <p style={{ fontSize: 16, fontWeight: 600 }}>No transactions found</p>
            <p style={{ fontSize: 13, marginTop: 4 }}>Try adjusting your filters</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {[["date", "Date"], ["description", "Description"], ["category", "Category"], ["type", "Type"], ["amount", "Amount"]].map(([col, label]) => (
                    <th key={col} style={thStyle(col)} onClick={() => setSort(col)}>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        {label} <SortIcon col={col} />
                      </span>
                    </th>
                  ))}
                  {isAdmin && <th style={thStyle(null)}>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filtered.map((t, i) => (
                  <tr key={t.id} style={{
                    background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                    transition: "background 0.15s",
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-hover)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)"}
                  >
                    <td style={{ ...tdStyle, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-secondary)" }}>{fmtDate(t.date)}</td>
                    <td style={{ ...tdStyle, fontWeight: 500, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis" }}>{t.description}</td>
                    <td style={tdStyle}>
                      <span style={{
                        padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 500,
                        background: `${CATEGORY_COLORS[t.category]}22`,
                        color: CATEGORY_COLORS[t.category],
                      }}>{t.category}</span>
                    </td>
                    <td style={tdStyle}>
                      <span style={{
                        padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                        background: t.type === "income" ? "var(--green-soft)" : "var(--red-soft)",
                        color: t.type === "income" ? "var(--green)" : "var(--red)",
                      }}>{t.type}</span>
                    </td>
                    <td style={{ ...tdStyle, fontFamily: "var(--font-mono)", fontWeight: 600, color: t.type === "income" ? "var(--green)" : "var(--red)" }}>
                      {t.type === "income" ? "+" : "-"}{fmt(t.amount)}
                    </td>
                    {isAdmin && (
                      <td style={tdStyle}>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button onClick={() => { setEditing(t); setModalOpen(true); }} style={{
                            width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
                            background: "var(--accent-soft)", border: "none", color: "var(--accent)", cursor: "pointer",
                          }}><Pencil size={12} /></button>
                          <button onClick={() => dispatch({ type: "DELETE_TRANSACTION", payload: t.id })} style={{
                            width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
                            background: "var(--red-soft)", border: "none", color: "var(--red)", cursor: "pointer",
                          }}><Trash2 size={12} /></button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <TransactionModal
          transaction={editing}
          onClose={() => { setModalOpen(false); setEditing(null); }}
        />
      )}
    </div>
  );
}