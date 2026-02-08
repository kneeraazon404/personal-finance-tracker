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
    console.log("Starting user-specific seed with cleanup...\n");

    // Get the authenticated user
    const user = await prisma.user.findFirst({
      orderBy: { createdAt: "desc" },
    });

    if (!user) {
      console.error("No user found. Please login first.");
      process.exit(1);
    }

    console.log(`✓ Target user: ${user.name || user.email}`);
    console.log("⚠ Clearing existing data for this user...\n");

    // Clear existing user data in correct order
    await prisma.transaction.deleteMany({
      where: { fromAccount: { userId: user.id } },
    });
    await prisma.expense.deleteMany({
      where: { account: { userId: user.id } },
    });
    await prisma.income.deleteMany({
      where: { account: { userId: user.id } },
    });
    await prisma.budget.deleteMany({ where: { userId: user.id } });
    await prisma.loan.deleteMany({ where: { userId: user.id } });
    await prisma.goal.deleteMany({ where: { userId: user.id } });
    await prisma.subscription.deleteMany({ where: { userId: user.id } });
    await prisma.financialAccount.deleteMany({ where: { userId: user.id } });
    await prisma.category.deleteMany({ where: { userId: user.id } });

    console.log("✓ Cleanup complete. Starting fresh seed...\n");

    // Create categories
    console.log("Creating categories...");
    const categoryData = [
      { name: "Salary", color: "#10b981", icon: "Briefcase" },
      { name: "Groceries", color: "#f59e0b", icon: "ShoppingCart" },
      { name: "Rent", color: "#ef4444", icon: "Home" },
      { name: "Utilities", color: "#3b82f6", icon: "Zap" },
      { name: "Entertainment", color: "#8b5cf6", icon: "Music" },
      { name: "Transportation", color: "#ec4899", icon: "Car" },
      { name: "Healthcare", color: "#14b8a6", icon: "Heart" },
      { name: "Dining", color: "#f97316", icon: "Utensils" },
      { name: "Shopping", color: "#06b6d4", icon: "Package" },
      { name: "Subscriptions", color: "#6366f1", icon: "CreditCard" },
    ];

    const categories = {};
    for (const cat of categoryData) {
      const created = await prisma.category.create({
        data: { ...cat, userId: user.id },
      });
      categories[cat.name] = created.id;
    }
    console.log(`✓ Categories: 10\n`);

    // Create 4 financial accounts
    console.log("Creating accounts...");
    const accounts = [];

    const accountsToCreate = [
      { name: "Main Checking", initialAmount: 3500 },
      { name: "Savings Account", initialAmount: 8200 },
      { name: "Business Account", initialAmount: 5800 },
      { name: "Emergency Fund", initialAmount: 12000 },
    ];

    for (const accData of accountsToCreate) {
      const acc = await prisma.financialAccount.create({
        data: {
          name: accData.name,
          initialAmount: accData.initialAmount,
          userId: user.id,
          date: new Date(
            Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000,
          ),
        },
      });
      accounts.push(acc);
    }
    console.log(`✓ Accounts: 4\n`);

    // Create incomes
    console.log("Creating incomes...");
    const incomeNames = [
      "Monthly Salary",
      "Freelance Project",
      "Stock Dividends",
      "Bonus Payment",
      "Side Gig Income",
      "Tax Refund",
      "Rental Income",
      "Sold Items Online",
      "Consulting Fee",
      "Gift Money",
      "Interest Payment",
      "Commission Earned",
      "Affiliate Revenue",
      "Contract Work",
      "Part-time Job",
      "Investment Return",
      "Cashback Reward",
      "Referral Bonus",
    ];

    for (let i = 0; i < 18; i++) {
      const account = accounts[Math.floor(Math.random() * accounts.length)];
      await prisma.income.create({
        data: {
          name: incomeNames[i],
          amount: Math.floor(Math.random() * 3000) + 500,
          date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
          accountId: account.id,
        },
      });
    }
    console.log(`✓ Incomes: 18\n`);

    // Create expenses
    console.log("Creating expenses...");
    const expenseNames = [
      "Rent Payment",
      "Grocery Shopping",
      "Electric Bill",
      "Water Bill",
      "Internet Service",
      "Phone Bill",
      "Restaurant Dinner",
      "Coffee Shop",
      "Gas Station",
      "Uber Ride",
      "Movie Tickets",
      "Gym Membership",
      "Doctor Visit",
      "Pharmacy",
      "Clothes Shopping",
      "Amazon Order",
      "Car Maintenance",
      "Insurance Premium",
      "Haircut",
      "Pet Supplies",
      "Streaming Service",
      "Gaming Purchase",
      "Book Purchase",
      "Office Supplies",
      "Parking Fee",
      "Car Wash",
      "Laundry",
      "Fast Food",
    ];

    for (let i = 0; i < 28; i++) {
      const account = accounts[Math.floor(Math.random() * accounts.length)];
      const categoryNames = Object.keys(categories);
      const randomCat =
        categoryNames[Math.floor(Math.random() * categoryNames.length)];

      await prisma.expense.create({
        data: {
          name: expenseNames[i],
          amount: Math.floor(Math.random() * 500) + 20,
          date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
          accountId: account.id,
          categoryId: categories[randomCat],
        },
      });
    }
    console.log(`✓ Expenses: 28\n`);

    // Create transactions
    console.log("Creating transactions...");
    const transactionNames = [
      "Transfer to Savings",
      "Emergency Fund Transfer",
      "Business Expense Coverage",
      "Loan Repayment",
      "Investment Transfer",
      "Bill Payment Transfer",
    ];

    for (let i = 0; i < 20; i++) {
      let fromAcc = accounts[Math.floor(Math.random() * accounts.length)];
      let toAcc = accounts[Math.floor(Math.random() * accounts.length)];

      while (fromAcc.id === toAcc.id) {
        toAcc = accounts[Math.floor(Math.random() * accounts.length)];
      }

      await prisma.transaction.create({
        data: {
          name: transactionNames[i % transactionNames.length],
          amount: Math.floor(Math.random() * 1000) + 100,
          date: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000),
          fromAccountId: fromAcc.id,
          toAccountId: toAcc.id,
        },
      });
    }
    console.log(`✓ Transactions: 20\n`);

    // Create subscriptions
    console.log("Creating subscriptions...");
    const subscriptionData = [
      { name: "Netflix Premium", cost: 19.99 },
      { name: "Spotify Premium", cost: 9.99 },
      { name: "Amazon Prime", cost: 14.99 },
      { name: "iCloud Storage", cost: 9.99 },
      { name: "Gym Membership", cost: 45.0 },
      { name: "VPN Service", cost: 5.99 },
      { name: "Disney Plus", cost: 12.99 },
      { name: "YouTube Premium", cost: 11.99 },
      { name: "Xbox Game Pass", cost: 14.99 },
      { name: "Adobe Creative Cloud", cost: 54.99 },
    ];

    for (const sub of subscriptionData) {
      await prisma.subscription.create({
        data: {
          name: sub.name,
          cost: sub.cost,
          date: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000),
          userId: user.id,
          billing: Math.random() > 0.3 ? "MONTHLY" : "YEARLY",
          status: Math.random() > 0.2 ? "ACTIVE" : "INACTIVE",
        },
      });
    }
    console.log(`✓ Subscriptions: 10\n`);

    // Create goals
    console.log("Creating goals...");
    const goalData = [
      { name: "Emergency Fund Goal", target: 10000, type: "SAVINGS" },
      { name: "New Car Purchase", target: 25000, type: "SAVINGS" },
      { name: "Dream Vacation", target: 5000, type: "SAVINGS" },
      { name: "Home Down Payment", target: 50000, type: "INVESTMENT" },
      { name: "Retirement Savings", target: 100000, type: "INVESTMENT" },
      { name: "Annual Revenue Target", target: 500000, type: "REVENUE_TARGET" },
      { name: "Wedding Fund", target: 15000, type: "SAVINGS" },
      { name: "Education Fund", target: 20000, type: "INVESTMENT" },
    ];

    for (const goal of goalData) {
      await prisma.goal.create({
        data: {
          name: goal.name,
          targetAmount: goal.target,
          initialAmount: Math.floor(Math.random() * goal.target * 0.4),
          date: new Date(
            Date.now() + Math.random() * 730 * 24 * 60 * 60 * 1000,
          ),
          userId: user.id,
          type: goal.type,
          completed: Math.random() > 0.85,
        },
      });
    }
    console.log(`✓ Goals: 8\n`);

    // Create loans
    console.log("Creating loans...");
    const loanData = [
      { name: "Car Loan", total: 20000, type: "PAYABLE" },
      { name: "Student Loan", total: 45000, type: "PAYABLE" },
      { name: "Personal Loan to Friend", total: 2000, type: "RECEIVABLE" },
      { name: "Credit Card Balance", total: 5000, type: "PAYABLE" },
      { name: "Home Mortgage", total: 250000, type: "PAYABLE" },
      { name: "Business Loan", total: 50000, type: "PAYABLE" },
    ];

    for (const loan of loanData) {
      await prisma.loan.create({
        data: {
          name: loan.name,
          totalAmount: loan.total,
          remainingAmount: Math.floor(loan.total * (0.3 + Math.random() * 0.6)),
          userId: user.id,
          type: loan.type,
          status: Math.random() > 0.15 ? "ACTIVE" : "PAID",
          dueDate:
            loan.type === "PAYABLE"
              ? new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000)
              : null,
        },
      });
    }
    console.log(`✓ Loans: 6\n`);

    // Create budgets
    console.log("Creating budgets...");
    const budgetAmounts = [
      1500, 800, 2000, 600, 400, 300, 500, 1000, 700, 350, 450, 900,
    ];
    const categoryKeys = Object.keys(categories);

    for (let i = 0; i < Math.min(12, categoryKeys.length); i++) {
      await prisma.budget.create({
        data: {
          amount: budgetAmounts[i],
          userId: user.id,
          categoryId: categories[categoryKeys[i]],
        },
      });
    }
    console.log(`✓ Budgets: 10\n`);

    console.log("═══════════════════════════════════");
    console.log(`✓ Data seeded for ${user.name || user.email}!`);
    console.log("═══════════════════════════════════");
  } catch (e) {
    console.error("Error seeding database:", e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
