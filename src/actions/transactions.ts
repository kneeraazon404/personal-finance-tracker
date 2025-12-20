"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { prisma } from "@/lib/db";
import { transactionSchema, TransactionInput } from "@/lib/validations";

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
    return { success: true, data: transaction };
}

export async function getTransactions(options?: {
    accountId?: string;
    goalId?: string;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
}) {
    const userId = await getCurrentUserId();

    const transactions = await prisma.transaction.findMany({
        where: {
            OR: [
                { fromAccount: { userId } },
                { toAccount: { userId } },
            ],
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

    return transactions.map((transaction) => ({
        ...transaction,
        amount: Number(transaction.amount),
    }));
}

export async function updateTransaction(id: string, data: Partial<TransactionInput>) {
    const userId = await getCurrentUserId();
    const validated = transactionSchema.partial().parse(data);

    // Verify transaction belongs to user
    const existing = await prisma.transaction.findFirst({
        where: {
            id,
            OR: [
                { fromAccount: { userId } },
                { toAccount: { userId } },
            ],
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
    return { success: true, data: transaction };
}

export async function deleteTransaction(id: string) {
    const userId = await getCurrentUserId();

    const existing = await prisma.transaction.findFirst({
        where: {
            id,
            OR: [
                { fromAccount: { userId } },
                { toAccount: { userId } },
            ],
        },
    });

    if (!existing) throw new Error("Transaction not found");

    await prisma.transaction.delete({ where: { id } });

    revalidatePath("/dashboard");
    revalidatePath("/transactions");
    revalidatePath("/accounts");
    return { success: true };
}
