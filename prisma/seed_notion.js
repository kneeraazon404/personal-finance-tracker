/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    console.log("Starting targeted seed based on Notion data...");

    // 1. Get User
    const user = await prisma.user.findFirst();
    if (!user) {
      console.error("No user found. Please login first.");
      process.exit(1);
    }
    const userId = user.id;

    // 2. Clear Existing Data (Optional/Aggressive: decided to wipe to match Notion exactly)
    // 3. Clear Existing Data
    console.log("Cleaning up old data...");
    // Ensure client is up to date: budgets, subscriptions etc must exist on prisma client
    await prisma.transaction.deleteMany({ where: { fromAccount: { userId } } });
    await prisma.expense.deleteMany({ where: { account: { userId } } });
    await prisma.income.deleteMany({ where: { account: { userId } } });
    if (prisma.budget) await prisma.budget.deleteMany({ where: { userId } });
    if (prisma.loan) await prisma.loan.deleteMany({ where: { userId } });
    await prisma.goal.deleteMany({ where: { userId } });
    await prisma.subscription.deleteMany({ where: { userId } });
    await prisma.financialAccount.deleteMany({ where: { userId } });
    await prisma.category.deleteMany({ where: { userId } });

    // 3. Create Categories (matching Notion types)
    console.log("Creating categories...");
    const categoriesData = [
      { name: "Rent", color: "#f87171", icon: "Home" }, // red-400
      { name: "Trading", color: "#60a5fa", icon: "TrendingUp" }, // blue-400
      { name: "Digital Products", color: "#a78bfa", icon: "Package" }, // violet-400
      { name: "E-commerce", color: "#f472b6", icon: "ShoppingCart" }, // pink-400
      { name: "Subscriptions", color: "#fbbf24", icon: "CreditCard" }, // amber-400
      { name: "Groceries", color: "#34d399", icon: "Apple" }, // emerald-400
      { name: "Bills", color: "#9ca3af", icon: "FileText" }, // gray-400
      { name: "Consulting", color: "#818cf8", icon: "Briefcase" }, // indigo-400
      { name: "Advertisement", color: "#fb923c", icon: "Megaphone" }, // orange-400
      { name: "Food", color: "#a3e635", icon: "Utensils" }, // lime-400
      { name: "Utilities", color: "#22d3ee", icon: "Zap" }, // cyan-400
    ];

    const createdCategories = {};
    for (const cat of categoriesData) {
      const c = await prisma.category.create({
        data: { ...cat, userId },
      });
      createdCategories[cat.name] = c.id;
    }

    // 4. Create Accounts
    console.log("Creating accounts...");
    const savings = await prisma.financialAccount.create({
      data: { name: "Savings (Nabil)", initialAmount: 2160.0, userId },
    });
    const checking = await prisma.financialAccount.create({
      data: { name: "Cheking (NIC Asia)", initialAmount: 8650.0, userId },
    });

    // 5. Create Incomes
    console.log("Creating incomes...");
    const incomes = [
      { name: "Trading Profit", amount: 1000, category: "Trading" },
      { name: "Rent Income", amount: 500, category: "Rent" },
      {
        name: "Digital Products Sale",
        amount: 1500,
        category: "Digital Products",
      },
      { name: "E-commerce Revenue", amount: 960, category: "E-commerce" },
      { name: "Freelance Project Alpha", amount: 1200, category: "Consulting" },
      { name: "Freelance Project Beta", amount: 800, category: "Consulting" },
      { name: "Stock Dividernds", amount: 150, category: "Trading" },
      { name: "Sold Old Camera", amount: 450, category: "E-commerce" },
      { name: "Yearly Bonus", amount: 2000, category: "Consulting" },
      { name: "Birthday Gift", amount: 100, category: "Rent" }, // Using existing category proxy
      { name: "Bank Interest", amount: 25, category: "Trading" },
      { name: "Tax Refund", amount: 300, category: "Bills" },
    ];

    for (const inc of incomes) {
      await prisma.income.create({
        data: {
          name: inc.name,
          amount: inc.amount,
          date: new Date(
            new Date().setDate(
              new Date().getDate() - Math.floor(Math.random() * 30),
            ),
          ),
          accountId: checking.id,
        },
      });
    }

    // 6. Create Expenses
    console.log("Creating expenses...");
    const expenses = [
      { name: "Rent Payment", amount: 2000, category: "Rent" },
      { name: "Monthly Groceries", amount: 300, category: "Groceries" },
      { name: "Electricity Bill", amount: 60, category: "Utilities" },
      { name: "Internet Bill", amount: 40, category: "Utilities" },
      { name: "Mobile Recharge", amount: 15, category: "Utilities" },
      { name: "Dining Out - Pizza", amount: 35, category: "Food" },
      { name: "Coffee Shop Runs", amount: 50, category: "Food" },
      { name: "Cinema Tickets", amount: 30, category: "Advertisement" }, // Proxy
      { name: "Business Ads FB", amount: 150, category: "Advertisement" },
      { name: "Business Ads Google", amount: 200, category: "Advertisement" },
      { name: "Consulting Tools", amount: 80, category: "Consulting" },
      { name: "New Shirt", amount: 45, category: "E-commerce" },
      { name: "Running Shoes", amount: 120, category: "E-commerce" },
      { name: "Taxi Rides", amount: 55, category: "Bills" },
      { name: "Gym Supplements", amount: 60, category: "Groceries" },
    ];

    for (const exp of expenses) {
      await prisma.expense.create({
        data: {
          name: exp.name,
          amount: exp.amount,
          date: new Date(
            new Date().setDate(
              new Date().getDate() - Math.floor(Math.random() * 30),
            ),
          ),
          accountId: checking.id,
          categoryId: createdCategories[exp.category],
        },
      });
    }

    // 7. Create Subscriptions
    console.log("Creating subscriptions...");
    const subs = [
      { name: "Spotify Individual", cost: 5.79 },
      { name: "Claude Pro", cost: 20.0 },
      { name: "Cursor AI", cost: 20.0 },
      { name: "Upwork Plus", cost: 20.0 },
      { name: "Google Drive Storage", cost: 2.0 },
      { name: "Netflix Standard", cost: 15.49 },
      { name: "Amazon Prime", cost: 14.99 },
      { name: "Vercel Pro", cost: 20.0 },
      { name: "Adobe Creative Cloud", cost: 54.99 },
      { name: "Midjourney", cost: 10.0 },
      { name: "ChatGPT Plus", cost: 20.0 },
      { name: "Gym Membership", cost: 45.0 },
    ];

    for (const sub of subs) {
      await prisma.subscription.create({
        data: {
          name: sub.name,
          cost: sub.cost,
          date: new Date(
            new Date().setDate(
              new Date().getDate() + Math.floor(Math.random() * 30),
            ),
          ),
          userId,
          billing: "MONTHLY",
          status: "ACTIVE",
        },
      });
    }

    // 8. Create Goals
    console.log("Creating goals...");
    const goals = [
      { name: "Emergency Funds", target: 5000, current: 600, type: "SAVINGS" },
      {
        name: "Equipment Upgrade",
        target: 2000,
        current: 200,
        type: "INVESTMENT",
      },
      {
        name: "New Office Space",
        target: 10000,
        current: 10000,
        type: "REVENUE_TARGET",
        completed: true,
      },
      { name: "Vacation to Bali", target: 3000, current: 500, type: "SAVINGS" },
      { name: "New Macbook Pro", target: 2500, current: 0, type: "INVESTMENT" },
      {
        name: "Retirement Fund 2025",
        target: 50000,
        current: 15000,
        type: "SAVINGS",
      },
      { name: "Charity Donation", target: 1000, current: 100, type: "SAVINGS" },
      { name: "Car Downpayment", target: 8000, current: 2000, type: "SAVINGS" },
      {
        name: "Wedding Gift for Bro",
        target: 500,
        current: 500,
        type: "SAVINGS",
        completed: true,
      },
      {
        name: "Home Renovation",
        target: 15000,
        current: 3000,
        type: "INVESTMENT",
      },
    ];

    for (const g of goals) {
      await prisma.goal.create({
        data: {
          name: g.name,
          targetAmount: g.target,
          initialAmount: g.current,
          userId,
          type: g.type,
          date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
          completed: g.completed || false,
        },
      });
    }

    // 9. Create Budgets
    console.log("Creating spending budgets...");
    const budgets = [
      { category: "Consulting", amount: 200 },
      { category: "Trading", amount: 5000 },
      { category: "Rent", amount: 2000 },
      { category: "Food", amount: 1500 },
      { category: "Utilities", amount: 1000 },
      { category: "E-commerce", amount: 500 },
      { category: "Groceries", amount: 800 },
      { category: "Advertisement", amount: 1000 },
    ];

    for (const b of budgets) {
      if (createdCategories[b.category]) {
        await prisma.budget.create({
          data: {
            amount: b.amount,
            categoryId: createdCategories[b.category],
            userId,
          },
        });
      }
    }

    // 10. Create Loans/Debts
    console.log("Creating loans/debts...");
    const loans = [
      {
        name: "Car Loan",
        total: 15000,
        remaining: 12000,
        type: "PAYABLE",
        status: "ACTIVE",
      },
      {
        name: "Personal Loan to Friend",
        total: 500,
        remaining: 200,
        type: "RECEIVABLE",
        status: "ACTIVE",
      },
      {
        name: "Credit Card Debt - Visa",
        total: 2000,
        remaining: 2000,
        type: "PAYABLE",
        status: "ACTIVE",
        dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      },
      {
        name: "Home Mortgage",
        total: 250000,
        remaining: 240000,
        type: "PAYABLE",
        status: "ACTIVE",
      },
      {
        name: "Study Loan",
        total: 10000,
        remaining: 5000,
        type: "PAYABLE",
        status: "ACTIVE",
      },
      {
        name: "Lent to Cousin",
        total: 1000,
        remaining: 1000,
        type: "RECEIVABLE",
        status: "ACTIVE",
      },
      {
        name: "Project Advance",
        total: 3000,
        remaining: 0,
        type: "PAYABLE",
        status: "PAID",
      },
      {
        name: "iPhone EMI",
        total: 1200,
        remaining: 600,
        type: "PAYABLE",
        status: "ACTIVE",
      },
      {
        name: "Security Deposit",
        total: 2000,
        remaining: 2000,
        type: "RECEIVABLE",
        status: "ACTIVE",
      },
      {
        name: "Old Gym Fee",
        total: 100,
        remaining: 0,
        type: "PAYABLE",
        status: "CLOSED",
      },
    ];

    for (const l of loans) {
      await prisma.loan.create({
        data: {
          name: l.name,
          totalAmount: l.total,
          remainingAmount: l.remaining,
          type: l.type,
          status: l.status,
          userId,
          dueDate: l.dueDate || null,
        },
      });
    }

    // 11. Create Transactions (Transfers)
    console.log("Creating transfers...");
    for (let i = 0; i < 15; i++) {
      await prisma.transaction.create({
        data: {
          name: i % 2 === 0 ? "Savings Transfer" : "Cover Expenses",
          amount: 100 + i * 50,
          date: new Date(new Date().setDate(new Date().getDate() - i * 2)),
          fromAccountId: i % 2 === 0 ? checking.id : savings.id,
          toAccountId: i % 2 === 0 ? savings.id : checking.id,
        },
      });
    }

    console.log("Notion data seeded successfully!");
  } catch (e) {
    console.error("Error seeding Notion data:", e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
