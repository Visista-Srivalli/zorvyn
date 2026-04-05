import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { CATEGORIES } from "../data/mockData";
import { generateId } from "../utils/helpers";
import { useApp } from "../context/AppContext";

const inputStyle = {
  width: "100%",
  background: "var(--bg-elevated)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  padding: "10px 12px",
  color: "var(--text-primary)",
  fontSize: 14,
  fontFamily: "var(--font-display)",
  transition: "border 0.2s",
};

const labelStyle = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  color: "var(--text-secondary)",
  marginBottom: 6,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

export default function TransactionModal({ transaction, onClose }) {
  const { dispatch } = useApp();
  const isEdit = !!transaction;

  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: CATEGORIES[0],
    type: "expense",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (transaction) setForm({ ...transaction, amount: String(transaction.amount) });
  }, [transaction]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = () => {
    if (!form.description || !form.amount || !form.date) return;
    const t = { ...form, amount: parseFloat(form.amount), id: form.id || generateId() };
    dispatch({ type: isEdit ? "EDIT_TRANSACTION" : "ADD_TRANSACTION", payload: t });
    onClose();
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="fade-up" style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: 20, padding: 28, width: "100%", maxWidth: 440,
        boxShadow: "var(--shadow-lg)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>{isEdit ? "Edit Transaction" : "Add Transaction"}</h2>
          <button onClick={onClose} style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", cursor: "pointer" }}>
            <X size={14} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={labelStyle}>Description</label>
            <input style={inputStyle} value={form.description} onChange={set("description")} placeholder="e.g. Grocery Store" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={labelStyle}>Amount (₹)</label>
              <input style={inputStyle} type="number" value={form.amount} onChange={set("amount")} placeholder="0" min="0" />
            </div>
            <div>
              <label style={labelStyle}>Date</label>
              <input style={inputStyle} type="date" value={form.date} onChange={set("date")} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={labelStyle}>Type</label>
              <select style={inputStyle} value={form.type} onChange={set("type")}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select style={inputStyle} value={form.category} onChange={set("category")}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "11px", borderRadius: 10,
            background: "var(--bg-elevated)", border: "1px solid var(--border)",
            color: "var(--text-secondary)", fontSize: 14, fontWeight: 500, cursor: "pointer",
          }}>Cancel</button>
          <button onClick={handleSubmit} style={{
            flex: 1, padding: "11px", borderRadius: 10,
            background: "var(--accent)", border: "none",
            color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer",
          }}>{isEdit ? "Save Changes" : "Add Transaction"}</button>
        </div>
      </div>
    </div>
  );
}