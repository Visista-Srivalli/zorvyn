import React, { createContext, useContext, useReducer, useEffect } from "react";
import { INITIAL_TRANSACTIONS } from "../data/mockData";

const AppContext = createContext();

const STORAGE_KEY = "finance_dashboard_state";

const initialState = {
  transactions: INITIAL_TRANSACTIONS,
  role: "admin", // 'admin' | 'viewer'
  theme: "dark",  // 'dark' | 'light'
  filters: {
    search: "",
    type: "all",
    category: "all",
    dateFrom: "",
    dateTo: "",
  },
  sortConfig: { key: "date", dir: "desc" },
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_ROLE":
      return { ...state, role: action.payload };
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "dark" ? "light" : "dark" };
    case "SET_FILTER":
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case "RESET_FILTERS":
      return { ...state, filters: initialState.filters };
    case "SET_SORT":
      return { ...state, sortConfig: action.payload };
    case "ADD_TRANSACTION":
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case "EDIT_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    case "LOAD_STATE":
      return action.payload;
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...init, ...parsed };
      }
    } catch {}
    return init;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}