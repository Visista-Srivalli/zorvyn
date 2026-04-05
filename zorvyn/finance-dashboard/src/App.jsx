import React, { useState, useEffect } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Overview from "./components/Overview";
import Transactions from "./components/Transactions";
import Insights from "./components/Insights";
import "./index.css";

function Dashboard() {
  const { state } = useApp();
  const [active, setActive] = useState("overview");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", state.theme);
  }, [state.theme]);

  const pages = { overview: <Overview />, transactions: <Transactions />, insights: <Insights /> };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar active={active} setActive={setActive} />
        <main style={{ flex: 1, padding: "28px 32px", minWidth: 0, overflowX: "hidden" }}>
          {pages[active]}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Dashboard />
    </AppProvider>
  );
}