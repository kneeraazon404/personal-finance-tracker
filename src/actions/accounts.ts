"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { prisma } from "@/lib/db";
import { accountSchema, AccountInput } from "@/lib/validations";

async function getCurrentUserId() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }
    return session.user.id;
}

export async function createAccount(data: AccountInput) {
    const userId = await getCurrentUserId();
    const validated = accountSchema.parse(data);

    const account = await prisma.financialAccount.create({
        data: {
            name: validated.name,
            initialAmount: validated.initialAmount,
            date: validated.date || new Date(),
            userId,
        },
    });

    revalidatePath("/dashboard");
    revalidatePath("/accounts");
    return { success: true, data: account };
}

export async function getAccounts() {
    const userId = await getCurrentUserId();

    // Use raw query to get computed balances from view
    const accounts = await prisma.$queryRaw<any[]>`
    SELECT * FROM account_balances 
    WHERE "userId" = ${userId}
    ORDER BY name ASC
  `;

    return accounts.map((account) => ({
        ...account,
        initialAmount: Number(account.initialAmount),
        currentBalance: Number(account.currentBalance),
    }));
}

export async function getAccountById(id: string) {
    const userId = await getCurrentUserId();

    const account = await prisma.financialAccount.findFirst({
        where: { id, userId },
        include: {
            incomes: { orderBy: { date: "desc" }, take: 10 },
            expenses: { orderBy: { date: "desc" }, take: 10 },
            transfersFrom: { orderBy: { date: "desc" }, take: 5 },
            transfersTo: { orderBy: { date: "desc" }, take: 5 },
        },
    });

    if (!account) {
        throw new Error("Account not found");
    }

    // Get computed balance
    const [balance] = await prisma.$queryRaw<[{ currentBalance: number }]>`
    SELECT "currentBalance" FROM account_balances WHERE id = ${id}
  `;

    return { ...account, currentBalance: balance?.currentBalance };
}

export async function updateAccount(id: string, data: Partial<AccountInput>) {
    const userId = await getCurrentUserId();
    const validated = accountSchema.partial().parse(data);

    const account = await prisma.financialAccount.updateMany({
        where: { id, userId },
        data: validated,
    });

    if (account.count === 0) {
        throw new Error("Account not found or unauthorized");
    }

    revalidatePath("/dashboard");
    revalidatePath("/accounts");
    revalidatePath(`/accounts/${id}`);
    return { success: true };
}

export async function deleteAccount(id: string) {
    const userId = await getCurrentUserId();

    const result = await prisma.financialAccount.deleteMany({
        where: { id, userId },
    });

    if (result.count === 0) {
        throw new Error("Account not found or unauthorized");
    }

    revalidatePath("/dashboard");
    revalidatePath("/accounts");
    return { success: true };
}
