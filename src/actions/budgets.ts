"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { prisma } from "@/lib/db";
import { z } from "zod";

import { Prisma } from "@prisma/client";

const budgetSchema = z.object({
  amount: z.number().min(0, "Amount must be positive"),
  categoryId: z.string().min(1, "Category is required"),
});

export type BudgetInput = z.infer<typeof budgetSchema>;

async function getCurrentUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");
  return session.user.id;
}

type Decimalish = Prisma.Decimal | number | string;

type BudgetWithCategory = {
  id: string;
  amount: Decimalish;
  categoryId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  category: {
    id: string;
    name: string;
    color: string;
    icon: string | null;
  };
  [key: string]: unknown;
};

export async function getBudgets() {
  const userId = await getCurrentUserId();

  // Get all budgets with their categories
  const budgets = await prisma.budget.findMany({
    where: { userId },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          color: true,
          icon: true,
        },
      },
    },
    orderBy: { category: { name: "asc" } },
  });

  // Calculate spent amount for the current month for each budget category
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const budgetsWithProgress = await Promise.all(
    budgets.map(async (budget: BudgetWithCategory) => {
      // Aggregate expenses for this category in the current month
      const expenseAggregation = await prisma.expense.aggregate({
        where: {
          // Filter by category and user's accounts
          categoryId: budget.categoryId,
          account: { userId: userId },
          date: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
        _sum: {
          amount: true,
        },
      });

      const spent = Number(expenseAggregation._sum.amount || 0);
      const amount = Number(budget.amount);
      const percentage = amount > 0 ? (spent / amount) * 100 : 0;

      return {
        ...budget,
        // Serialize Decimal
        amount: amount,
        spent,
        percentage,
      };
    }),
  );

  return budgetsWithProgress;
}

export async function createBudget(data: BudgetInput) {
  const userId = await getCurrentUserId();
  const validated = budgetSchema.parse(data);

  // Check if budget already exists for this category
  const existing = await prisma.budget.findUnique({
    where: {
      userId_categoryId: {
        userId,
        categoryId: validated.categoryId,
      },
    },
  });

  if (existing) {
    return updateBudget(existing.id, validated);
  }

  const budget = await prisma.budget.create({
    data: {
      amount: validated.amount,
      categoryId: validated.categoryId,
      userId,
    },
  });

  revalidatePath("/budgets");
  revalidatePath("/dashboard");
  return { success: true, data: budget };
}

export async function updateBudget(id: string, data: Partial<BudgetInput>) {
  const userId = await getCurrentUserId();
  const validated = budgetSchema.partial().parse(data);

  await prisma.budget.update({
    where: { id, userId }, // Ensure user owns budget
    data: validated,
  });

  revalidatePath("/budgets");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteBudget(id: string) {
  const userId = await getCurrentUserId();

  await prisma.budget.delete({
    where: { id, userId },
  });

  revalidatePath("/budgets");
  revalidatePath("/dashboard");
  return { success: true };
}
