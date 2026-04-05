export const fmt = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export const fmtShort = (n) => {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
  return `₹${n}`;
};

export const fmtDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function getMonthlyData(transactions) {
  const map = {};
  transactions.forEach(({ date, amount, type }) => {
    const d = new Date(date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    if (!map[key]) map[key] = { month: MONTHS[d.getMonth()], income: 0, expenses: 0, balance: 0, key };
    if (type === "income") map[key].income += amount;
    else map[key].expenses += amount;
  });
  return Object.values(map)
    .sort((a, b) => a.key.localeCompare(b.key))
    .map((m) => ({ ...m, balance: m.income - m.expenses }));
}

export function getCategoryBreakdown(transactions) {
  const map = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach(({ category, amount }) => {
      map[category] = (map[category] || 0) + amount;
    });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

export function getSummary(transactions) {
  let income = 0, expenses = 0;
  transactions.forEach(({ amount, type }) => {
    if (type === "income") income += amount;
    else expenses += amount;
  });
  return { income, expenses, balance: income - expenses };
}

export function filterAndSort(transactions, filters, sortConfig) {
  let list = [...transactions];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(
      (t) =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }
  if (filters.type !== "all") list = list.filter((t) => t.type === filters.type);
  if (filters.category !== "all") list = list.filter((t) => t.category === filters.category);
  if (filters.dateFrom) list = list.filter((t) => t.date >= filters.dateFrom);
  if (filters.dateTo) list = list.filter((t) => t.date <= filters.dateTo);

  list.sort((a, b) => {
    let av = a[sortConfig.key], bv = b[sortConfig.key];
    if (sortConfig.key === "amount") { av = +av; bv = +bv; }
    if (av < bv) return sortConfig.dir === "asc" ? -1 : 1;
    if (av > bv) return sortConfig.dir === "asc" ? 1 : -1;
    return 0;
  });

  return list;
}

export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export function exportCSV(transactions) {
  const headers = ["Date", "Description", "Category", "Type", "Amount"];
  const rows = transactions.map((t) => [t.date, t.description, t.category, t.type, t.amount]);
  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "transactions.csv"; a.click();
  URL.revokeObjectURL(url);
}