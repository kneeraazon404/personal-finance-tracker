"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { prisma } from "@/lib/db";
import { transactionSchema, TransactionInput } from "@/lib/validations";
import type { TransactionSummary } from "@/types/finance";
import { Prisma } from "@prisma/client";

type Decimalish = Prisma.Decimal | number | string;

type TransactionRow = {
  id: string;
  name: string;
  amount: Decimalish;
  date: Date;
  fromAccountId: string;
  toAccountId: string;
  goalId: string | null;
  createdAt: Date;
  updatedAt: Date;
  fromAccount: { id: string; name: string };
  toAccount: { id: string; name: string };
  goal: { id: string; name: string } | null;
  [key: string]: unknown;
};

async function getCurrentUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");
  return session.user.id;
}

export async function createTransaction(data: TransactionInput) {
  const userId = await getCurrentUserId();
  const validated = transactionSchema.parse(data);

  // Verify both accounts belong to user
  const accounts = await prisma.financialAccount.findMany({
    where: {
      id: { in: [validated.fromAccountId, validated.toAccountId] },
      userId,
    },
  });

  if (accounts.length !== 2) {
    throw new Error("Invalid accounts");
  }

  // Verify goal belongs to user (if provided)
  if (validated.goalId) {
    const goal = await prisma.goal.findFirst({
      where: { id: validated.goalId, userId },
    });
    if (!goal) throw new Error("Invalid goal");
  }

  const transaction = await prisma.transaction.create({
    data: {
      name: validated.name,
      amount: validated.amount,
      date: validated.date,
      fromAccountId: validated.fromAccountId,
      toAccountId: validated.toAccountId,
      goalId: validated.goalId,
    },
    include: {
      fromAccount: true,
      toAccount: true,
      goal: true,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/transactions");
  revalidatePath("/accounts");
  revalidatePath("/goals");
  return {
    success: true,
    data: {
      ...transaction,
      amount: Number(transaction.amount),
    },
  };
}

export async function getTransactions(options?: {
  accountId?: string;
  goalId?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
}): Promise<TransactionSummary[]> {
  const userId = await getCurrentUserId();

  const transactions: TransactionRow[] = await prisma.transaction.findMany({
    where: {
      OR: [{ fromAccount: { userId } }, { toAccount: { userId } }],
      ...(options?.accountId && {
        OR: [
          { fromAccountId: options.accountId },
          { toAccountId: options.accountId },
        ],
      }),
      ...(options?.goalId && { goalId: options.goalId }),
      ...(options?.startDate && { date: { gte: options.startDate } }),
      ...(options?.endDate && { date: { lte: options.endDate } }),
    },
    include: {
      fromAccount: { select: { id: true, name: true } },
      toAccount: { select: { id: true, name: true } },
      goal: { select: { id: true, name: true } },
    },
    orderBy: { date: "desc" },
    take: options?.limit || 50,
  });

  return transactions.map((transaction: TransactionRow) => ({
    ...transaction,
    amount: Number(transaction.amount),
  }));
}

export async function updateTransaction(
  id: string,
  data: Partial<TransactionInput>,
) {
  const userId = await getCurrentUserId();
  const validated = transactionSchema.partial().parse(data);

  // Verify transaction belongs to user
  const existing = await prisma.transaction.findFirst({
    where: {
      id,
      OR: [{ fromAccount: { userId } }, { toAccount: { userId } }],
    },
  });

  if (!existing) throw new Error("Transaction not found");

  const transaction = await prisma.transaction.update({
    where: { id },
    data: validated,
  });

  revalidatePath("/dashboard");
  revalidatePath("/transactions");
  revalidatePath("/accounts");
  return {
    success: true,
    data: {
      ...transaction,
      amount: Number(transaction.amount),
    },
  };
}

export async function deleteTransaction(id: string) {
  const userId = await getCurrentUserId();

  const existing = await prisma.transaction.findFirst({
    where: {
      id,
      OR: [{ fromAccount: { userId } }, { toAccount: { userId } }],
    },
  });

  if (!existing) throw new Error("Transaction not found");

  await prisma.transaction.delete({ where: { id } });

  revalidatePath("/dashboard");
  revalidatePath("/transactions");
  revalidatePath("/accounts");
  return { success: true };
}
