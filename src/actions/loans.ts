"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { prisma } from "@/lib/db";
import { loanSchema, LoanInput } from "@/lib/validations";
import type { LoanSummary } from "@/types/finance";
import { Prisma } from "@prisma/client";

type Decimalish = Prisma.Decimal | number | string;

type LoanRow = {
    id: string;
    name: string;
    totalAmount: Decimalish;
    remainingAmount: Decimalish;
    interestRate: Decimalish | null;
    dueDate: Date | null;
    type: "PAYABLE" | "RECEIVABLE";
    status: "ACTIVE" | "PAID" | "CLOSED";
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    [key: string]: unknown;
};


async function getCurrentUserId() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) throw new Error("Unauthorized");
    return session.user.id;
}

export async function getLoans(): Promise<LoanSummary[]> {
    const userId = await getCurrentUserId();

    const loans: LoanRow[] = await prisma.loan.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" }
    });

    return loans.map((loan: LoanRow) => ({
        ...loan,
        totalAmount: Number(loan.totalAmount),
        remainingAmount: Number(loan.remainingAmount),
        interestRate: loan.interestRate ? Number(loan.interestRate) : null,
    }));
}

export async function createLoan(data: LoanInput) {
    const userId = await getCurrentUserId();
    const validated = loanSchema.parse(data);

    const loan = await prisma.loan.create({
        data: {
            ...validated,
            userId
        }
    });

    revalidatePath("/loans");
    revalidatePath("/dashboard");
    return { success: true, data: loan };
}

export async function updateLoan(id: string, data: Partial<LoanInput>) {
    const userId = await getCurrentUserId();
    const validated = loanSchema.partial().parse(data);

    await prisma.loan.update({
        where: { id, userId },
        data: validated
    });

    revalidatePath("/loans");
    revalidatePath("/dashboard");
    return { success: true };
}

export async function deleteLoan(id: string) {
    const userId = await getCurrentUserId();

    await prisma.loan.delete({
        where: { id, userId }
    });

    revalidatePath("/loans");
    revalidatePath("/dashboard");
    return { success: true };
}
