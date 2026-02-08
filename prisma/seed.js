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
    console.log("Starting comprehensive seed...\n");

    // 1. Get the authenticated user (must exist from login)
    const authUser = await prisma.user.findFirst();
    if (!authUser) {
      console.error("No user found. Please login via the app first.");
      process.exit(1);
    }

    // 2. Create a second user for testing
    console.log("Creating second user...");
    const user2 = await prisma.user.upsert({
      where: { email: "demo@example.com" },
      update: {},
      create: {
        email: "demo@example.com",
        name: "Demo User",
      },
    });

    const users = [authUser, user2];
    console.log(`✓ Users ready: ${users.length}\n`);

    // 3. Create categories for both users
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
    for (const user of users) {
      categories[user.id] = {};
      for (const cat of categoryData) {
        const created = await prisma.category.upsert({
          where: {
            name_userId: { name: cat.name, userId: user.id },
          },
          update: {},
          create: { ...cat, userId: user.id },
        });
        categories[user.id][cat.name] = created.id;
      }
    }
    console.log(`✓ Categories created: ${categoryData.length} per user\n`);

    // 4. Create 4 financial accounts (2 per user)
    console.log("Creating financial accounts...");
    const accounts = [];

    for (const user of users) {
      const acc1 = await prisma.financialAccount.create({
        data: {
          name: user.id === authUser.id ? "Main Checking" : "Savings Account",
          initialAmount: Math.floor(Math.random() * 5000) + 1000,
          userId: user.id,
          date: new Date(
            Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000,
          ),
        },
      });

      const acc2 = await prisma.financialAccount.create({
        data: {
          name: user.id === authUser.id ? "Business Account" : "Emergency Fund",
          initialAmount: Math.floor(Math.random() * 10000) + 2000,
          userId: user.id,
          date: new Date(
            Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000,
          ),
        },
      });

      accounts.push(acc1, acc2);
    }
    console.log(`✓ Accounts created: ${accounts.length}\n`);

    // 5. Create incomes (15-20 total)
    console.log("Creating incomes...");
    const incomeCount = 18;
    const incomeNames = [
      "Monthly Salary",
      "Freelance Project",
      "Stock Dividends",
      "Bonus Payment",
      "Side Gig",
      "Tax Refund",
      "Rental Income",
      "Sold Items Online",
      "Consulting Fee",
      "Gift Money",
      "Interest Payment",
      "Commission",
    ];

    for (let i = 0; i < incomeCount; i++) {
      const account = accounts[Math.floor(Math.random() * accounts.length)];
      await prisma.income.create({
        data: {
          name: incomeNames[i % incomeNames.length] + (i > 11 ? ` #${i}` : ""),
          amount: Math.floor(Math.random() * 3000) + 500,
          date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
          accountId: account.id,
        },
      });
    }
    console.log(`✓ Incomes created: ${incomeCount}\n`);

    // 6. Create expenses (25-30 total)
    console.log("Creating expenses...");
    const expenseCount = 28;
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
    ];

    for (let i = 0; i < expenseCount; i++) {
      const account = accounts[Math.floor(Math.random() * accounts.length)];
      const categoryNames = Object.keys(categoryData);
      const randomCat =
        categoryNames[Math.floor(Math.random() * categoryNames.length)];
      const userId = account.userId;

      await prisma.expense.create({
        data: {
          name:
            expenseNames[i % expenseNames.length] + (i >= 20 ? ` #${i}` : ""),
          amount: Math.floor(Math.random() * 500) + 20,
          date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
          accountId: account.id,
          categoryId:
            categories[userId][
              categoryData.find((c) => c.name === randomCat)?.name ||
                "Groceries"
            ],
        },
      });
    }
    console.log(`✓ Expenses created: ${expenseCount}\n`);

    // 7. Create 20 transactions (transfers between accounts)
    console.log("Creating transactions...");
    const transactionCount = 20;
    const transactionNames = [
      "Transfer to Savings",
      "Emergency Fund Transfer",
      "Business Expense Coverage",
      "Loan Repayment",
      "Investment Transfer",
      "Bill Payment Transfer",
    ];

    for (let i = 0; i < transactionCount; i++) {
      let fromAcc = accounts[Math.floor(Math.random() * accounts.length)];
      let toAcc = accounts[Math.floor(Math.random() * accounts.length)];

      // Ensure from and to are different
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
    console.log(`✓ Transactions created: ${transactionCount}\n`);

    // 8. Create subscriptions (8-10 per user)
    console.log("Creating subscriptions...");
    const subscriptionData = [
      { name: "Netflix", cost: 15.99 },
      { name: "Spotify", cost: 9.99 },
      { name: "Amazon Prime", cost: 14.99 },
      { name: "Cloud Storage", cost: 9.99 },
      { name: "Gym Membership", cost: 45.0 },
      { name: "VPN Service", cost: 5.99 },
      { name: "Streaming Plus", cost: 12.99 },
      { name: "News Subscription", cost: 8.99 },
      { name: "Gaming Pass", cost: 9.99 },
    ];

    let subCount = 0;
    for (const user of users) {
      for (let i = 0; i < 5; i++) {
        const sub = subscriptionData[i];
        await prisma.subscription.create({
          data: {
            name: sub.name,
            cost: sub.cost,
            date: new Date(
              Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000,
            ),
            userId: user.id,
            billing: Math.random() > 0.3 ? "MONTHLY" : "YEARLY",
            status: Math.random() > 0.2 ? "ACTIVE" : "INACTIVE",
          },
        });
        subCount++;
      }
    }
    console.log(`✓ Subscriptions created: ${subCount}\n`);

    // 9. Create goals (6-8 per user)
    console.log("Creating goals...");
    const goalData = [
      { name: "Emergency Fund", target: 10000, type: "SAVINGS" },
      { name: "New Car", target: 25000, type: "SAVINGS" },
      { name: "Vacation", target: 5000, type: "SAVINGS" },
      { name: "Home Down Payment", target: 50000, type: "INVESTMENT" },
      { name: "Retirement Fund", target: 100000, type: "INVESTMENT" },
      {
        name: "Business Revenue Target",
        target: 500000,
        type: "REVENUE_TARGET",
      },
      { name: "Wedding Savings", target: 15000, type: "SAVINGS" },
    ];

    let goalCount = 0;
    for (const user of users) {
      for (let i = 0; i < 4; i++) {
        const goal = goalData[i];
        await prisma.goal.create({
          data: {
            name: goal.name,
            targetAmount: goal.target,
            initialAmount: Math.floor(Math.random() * goal.target * 0.3),
            date: new Date(
              Date.now() + Math.random() * 730 * 24 * 60 * 60 * 1000,
            ),
            userId: user.id,
            type: goal.type,
            completed: Math.random() > 0.8,
          },
        });
        goalCount++;
      }
    }
    console.log(`✓ Goals created: ${goalCount}\n`);

    // 10. Create loans (5-8 total)
    console.log("Creating loans...");
    const loanData = [
      { name: "Car Loan", total: 20000, type: "PAYABLE" },
      { name: "Student Loan", total: 45000, type: "PAYABLE" },
      { name: "Personal Loan to Friend", total: 2000, type: "RECEIVABLE" },
      { name: "Credit Card Debt", total: 5000, type: "PAYABLE" },
      { name: "Home Mortgage", total: 250000, type: "PAYABLE" },
      { name: "Business Loan", total: 50000, type: "PAYABLE" },
    ];

    let loanCount = 0;
    for (const user of users) {
      for (let i = 0; i < 3; i++) {
        const loan = loanData[loanCount % loanData.length];
        await prisma.loan.create({
          data: {
            name: loan.name,
            totalAmount: loan.total,
            remainingAmount: Math.floor(
              loan.total * (0.3 + Math.random() * 0.6),
            ),
            userId: user.id,
            type: loan.type,
            status: Math.random() > 0.15 ? "ACTIVE" : "PAID",
            dueDate:
              loan.type === "PAYABLE"
                ? new Date(
                    Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000,
                  )
                : null,
          },
        });
        loanCount++;
      }
    }
    console.log(`✓ Loans created: ${loanCount}\n`);

    // 11. Create budgets (6-8 per user)
    console.log("Creating budgets...");
    let budgetCount = 0;
    for (const user of users) {
      const userCategories = Object.values(categories[user.id]);
      for (let i = 0; i < 6; i++) {
        await prisma.budget.create({
          data: {
            amount: Math.floor(Math.random() * 2000) + 500,
            userId: user.id,
            categoryId: userCategories[i % userCategories.length],
          },
        });
        budgetCount++;
      }
    }
    console.log(`✓ Budgets created: ${budgetCount}\n`);

    console.log("═══════════════════════════════════");
    console.log("✓ Database seeded successfully!");
    console.log("═══════════════════════════════════");
    console.log(`Users: ${users.length}`);
    console.log(`Accounts: ${accounts.length}`);
    console.log(`Categories: ${categoryData.length * users.length}`);
    console.log(`Incomes: ${incomeCount}`);
    console.log(`Expenses: ${expenseCount}`);
    console.log(`Transactions: ${transactionCount}`);
    console.log(`Subscriptions: ${subCount}`);
    console.log(`Goals: ${goalCount}`);
    console.log(`Loans: ${loanCount}`);
    console.log(`Budgets: ${budgetCount}`);
    console.log("═══════════════════════════════════\n");
  } catch (e) {
    console.error("Error seeding database:", e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
