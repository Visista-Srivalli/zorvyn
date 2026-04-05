# FinFlow - Finance Dashboard

A personal finance dashboard built with React that helps users track income, expenses, and understand their spending patterns. Built as part of a frontend development assessment.

## About the Project

I built this project to create a clean and intuitive interface for managing personal finances. The dashboard gives users a bird's eye view of their financial activity, lets them dig into individual transactions, and surfaces useful insights about their spending habits.

The design supports both dark and light mode, works across screen sizes, and includes a role-based UI to simulate different levels of access.

---

## Features

### Dashboard Overview
- Summary cards showing Total Balance, Total Income, and Total Expenses
- Area chart showing income vs expenses trend over months
- Donut chart showing spending breakdown by category
- Recent transactions list

### Transactions
- Full table with Date, Description, Category, Type, and Amount
- Search by description or category
- Filter by type (income/expense), category, and date range
- Sort by any column
- Export to CSV

### Role Based UI
- **Admin** — can add, edit, and delete transactions
- **Viewer** — read only, no add/edit/delete controls
- Switch roles using the dropdown in the navbar

### Insights
- Highest spending category
- Savings rate
- Month over month expense change
- Average monthly expense
- Monthly income vs expenses bar chart
- Category wise spending breakdown with progress bars

### Other Features
- Dark and light mode toggle
- Data saved to localStorage (persists on refresh)
- Fully responsive layout
- Empty state handling

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Charts | Recharts |
| Icons | Lucide React |
| State Management | React Context + useReducer |
| Styling | CSS Variables + Inline Styles |
| Persistence | localStorage |
| Fonts | Syne + DM Mono (Google Fonts) |

---

## Project Structure

src/
├── components/
│   ├── Navbar.jsx            # Top navigation with role switcher and theme toggle
│   ├── Sidebar.jsx           # Left side navigation menu
│   ├── Overview.jsx          # Main dashboard page
│   ├── SummaryCards.jsx      # Balance, Income, Expense cards
│   ├── Charts.jsx            # Area chart and Donut chart
│   ├── Transactions.jsx      # Transactions table with filters
│   ├── TransactionModal.jsx  # Add and Edit transaction modal
│   └── Insights.jsx          # Insights and analytics page
├── context/
│   └── AppContext.jsx        # Global state using Context and useReducer
├── data/
│   └── mockData.js           # 6 months of mock transaction data
├── utils/
│   └── helpers.js            # Formatting, filtering, sorting utilities
├── App.jsx                   # Root component
├── index.js                  # Entry point
└── index.css                 # CSS variables and global styles


---

## How to Run Locally

### Prerequisites
- Node.js installed — download from [https://nodejs.org](https://nodejs.org)

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/visista-srivalli/zorvyn.git
cd finance-dashboard
```

**2. Install dependencies**
```bash
npm install
```

**3. Start the development server**
```bash
npm start
```

**4. Open in browser**

Go to [http://localhost:3000](http://localhost:3000)

---

## Mock Data

The app comes with 6 months of realistic mock data (January to June 2025) across 10 categories — Food & Dining, Transport, Shopping, Entertainment, Health, Utilities, Salary, Freelance, Investments, and Rent.

---

## Design Decisions

- Used **CSS variables** for theming so dark and light mode switch instantly without any extra libraries
- Used **useReducer** instead of multiple useStates to keep all state changes predictable and in one place
- **localStorage** syncs automatically on every state change so data is never lost on refresh
- Role switching is purely frontend — simulated via a dropdown for demonstration purposes
- No external UI component library was used — all components are hand built for full control over design
