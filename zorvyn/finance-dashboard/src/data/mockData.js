export const CATEGORIES = [
  "Food & Dining",
  "Transport",
  "Shopping",
  "Entertainment",
  "Health",
  "Utilities",
  "Salary",
  "Freelance",
  "Investments",
  "Rent",
];

export const CATEGORY_COLORS = {
  "Food & Dining": "#f97316",
  Transport: "#3b82f6",
  Shopping: "#a855f7",
  Entertainment: "#ec4899",
  Health: "#10b981",
  Utilities: "#f59e0b",
  Salary: "#22c55e",
  Freelance: "#06b6d4",
  Investments: "#6366f1",
  Rent: "#ef4444",
};

const generateId = () => Math.random().toString(36).substr(2, 9);

export const INITIAL_TRANSACTIONS = [
  // January
  { id: generateId(), date: "2025-01-03", description: "Monthly Salary", amount: 85000, category: "Salary", type: "income" },
  { id: generateId(), date: "2025-01-05", description: "Swiggy Order", amount: 450, category: "Food & Dining", type: "expense" },
  { id: generateId(), date: "2025-01-07", description: "Uber Ride", amount: 220, category: "Transport", type: "expense" },
  { id: generateId(), date: "2025-01-10", description: "Amazon Shopping", amount: 3200, category: "Shopping", type: "expense" },
  { id: generateId(), date: "2025-01-12", description: "Netflix Subscription", amount: 649, category: "Entertainment", type: "expense" },
  { id: generateId(), date: "2025-01-15", description: "Freelance Project", amount: 22000, category: "Freelance", type: "income" },
  { id: generateId(), date: "2025-01-18", description: "Electricity Bill", amount: 1800, category: "Utilities", type: "expense" },
  { id: generateId(), date: "2025-01-20", description: "Pharmacy", amount: 560, category: "Health", type: "expense" },
  { id: generateId(), date: "2025-01-22", description: "House Rent", amount: 18000, category: "Rent", type: "expense" },
  { id: generateId(), date: "2025-01-25", description: "Zomato Order", amount: 380, category: "Food & Dining", type: "expense" },
  { id: generateId(), date: "2025-01-28", description: "SIP Investment", amount: 5000, category: "Investments", type: "expense" },

  // February
  { id: generateId(), date: "2025-02-03", description: "Monthly Salary", amount: 85000, category: "Salary", type: "income" },
  { id: generateId(), date: "2025-02-05", description: "Grocery Store", amount: 2800, category: "Food & Dining", type: "expense" },
  { id: generateId(), date: "2025-02-08", description: "Metro Card Recharge", amount: 500, category: "Transport", type: "expense" },
  { id: generateId(), date: "2025-02-10", description: "Myntra Purchase", amount: 2100, category: "Shopping", type: "expense" },
  { id: generateId(), date: "2025-02-12", description: "Movie Tickets", amount: 800, category: "Entertainment", type: "expense" },
  { id: generateId(), date: "2025-02-14", description: "Freelance Design", amount: 15000, category: "Freelance", type: "income" },
  { id: generateId(), date: "2025-02-18", description: "Internet Bill", amount: 999, category: "Utilities", type: "expense" },
  { id: generateId(), date: "2025-02-20", description: "Gym Membership", amount: 1500, category: "Health", type: "expense" },
  { id: generateId(), date: "2025-02-22", description: "House Rent", amount: 18000, category: "Rent", type: "expense" },
  { id: generateId(), date: "2025-02-25", description: "Restaurant Dinner", amount: 1200, category: "Food & Dining", type: "expense" },
  { id: generateId(), date: "2025-02-28", description: "SIP Investment", amount: 5000, category: "Investments", type: "expense" },

  // March
  { id: generateId(), date: "2025-03-03", description: "Monthly Salary", amount: 85000, category: "Salary", type: "income" },
  { id: generateId(), date: "2025-03-06", description: "Swiggy Order", amount: 620, category: "Food & Dining", type: "expense" },
  { id: generateId(), date: "2025-03-08", description: "Petrol Fill", amount: 1800, category: "Transport", type: "expense" },
  { id: generateId(), date: "2025-03-11", description: "Flipkart Sale", amount: 5600, category: "Shopping", type: "expense" },
  { id: generateId(), date: "2025-03-13", description: "Spotify Premium", amount: 119, category: "Entertainment", type: "expense" },
  { id: generateId(), date: "2025-03-15", description: "Freelance Consulting", amount: 30000, category: "Freelance", type: "income" },
  { id: generateId(), date: "2025-03-18", description: "Water Bill", amount: 350, category: "Utilities", type: "expense" },
  { id: generateId(), date: "2025-03-20", description: "Doctor Consultation", amount: 800, category: "Health", type: "expense" },
  { id: generateId(), date: "2025-03-22", description: "House Rent", amount: 18000, category: "Rent", type: "expense" },
  { id: generateId(), date: "2025-03-26", description: "Cafe Coffee Day", amount: 480, category: "Food & Dining", type: "expense" },
  { id: generateId(), date: "2025-03-28", description: "SIP Investment", amount: 5000, category: "Investments", type: "expense" },

  // April
  { id: generateId(), date: "2025-04-03", description: "Monthly Salary", amount: 85000, category: "Salary", type: "income" },
  { id: generateId(), date: "2025-04-06", description: "Zomato Order", amount: 520, category: "Food & Dining", type: "expense" },
  { id: generateId(), date: "2025-04-09", description: "Ola Cab", amount: 340, category: "Transport", type: "expense" },
  { id: generateId(), date: "2025-04-12", description: "New Shoes", amount: 4200, category: "Shopping", type: "expense" },
  { id: generateId(), date: "2025-04-15", description: "Freelance App Dev", amount: 40000, category: "Freelance", type: "income" },
  { id: generateId(), date: "2025-04-18", description: "Mobile Bill", amount: 499, category: "Utilities", type: "expense" },
  { id: generateId(), date: "2025-04-20", description: "Medicines", amount: 720, category: "Health", type: "expense" },
  { id: generateId(), date: "2025-04-22", description: "House Rent", amount: 18000, category: "Rent", type: "expense" },
  { id: generateId(), date: "2025-04-25", description: "Weekend Outing", amount: 2200, category: "Entertainment", type: "expense" },
  { id: generateId(), date: "2025-04-28", description: "SIP Investment", amount: 5000, category: "Investments", type: "expense" },

  // May
  { id: generateId(), date: "2025-05-03", description: "Monthly Salary", amount: 85000, category: "Salary", type: "income" },
  { id: generateId(), date: "2025-05-05", description: "Grocery Store", amount: 3100, category: "Food & Dining", type: "expense" },
  { id: generateId(), date: "2025-05-08", description: "Bus Pass", amount: 400, category: "Transport", type: "expense" },
  { id: generateId(), date: "2025-05-12", description: "Amazon Electronics", amount: 8900, category: "Shopping", type: "expense" },
  { id: generateId(), date: "2025-05-15", description: "Freelance Branding", amount: 18000, category: "Freelance", type: "income" },
  { id: generateId(), date: "2025-05-18", description: "Electricity Bill", amount: 2200, category: "Utilities", type: "expense" },
  { id: generateId(), date: "2025-05-20", description: "Yoga Classes", amount: 2000, category: "Health", type: "expense" },
  { id: generateId(), date: "2025-05-22", description: "House Rent", amount: 18000, category: "Rent", type: "expense" },
  { id: generateId(), date: "2025-05-24", description: "Concert Tickets", amount: 3000, category: "Entertainment", type: "expense" },
  { id: generateId(), date: "2025-05-28", description: "SIP Investment", amount: 5000, category: "Investments", type: "expense" },

  // June
  { id: generateId(), date: "2025-06-03", description: "Monthly Salary", amount: 85000, category: "Salary", type: "income" },
  { id: generateId(), date: "2025-06-05", description: "Swiggy Order", amount: 890, category: "Food & Dining", type: "expense" },
  { id: generateId(), date: "2025-06-08", description: "Petrol Fill", amount: 2000, category: "Transport", type: "expense" },
  { id: generateId(), date: "2025-06-10", description: "Wardrobe Upgrade", amount: 6500, category: "Shopping", type: "expense" },
  { id: generateId(), date: "2025-06-15", description: "Freelance Consulting", amount: 25000, category: "Freelance", type: "income" },
  { id: generateId(), date: "2025-06-18", description: "Internet + Cable", amount: 1299, category: "Utilities", type: "expense" },
  { id: generateId(), date: "2025-06-20", description: "Health Checkup", amount: 1200, category: "Health", type: "expense" },
  { id: generateId(), date: "2025-06-22", description: "House Rent", amount: 18000, category: "Rent", type: "expense" },
  { id: generateId(), date: "2025-06-26", description: "OTT Bundle", amount: 999, category: "Entertainment", type: "expense" },
  { id: generateId(), date: "2025-06-28", description: "SIP Investment", amount: 5000, category: "Investments", type: "expense" },
];