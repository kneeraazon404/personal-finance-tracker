"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { prisma } from "@/lib/db";
import { z } from "zod";

const loanSchema = z.object({
    name: z.string().min(1, "Name is required"),
    totalAmount: z.number().min(0, "Total amount must be positive"),
    remainingAmount: z.number().min(0, "Remaining amount must be positive"),
    interestRate: z.number().optional().nullable(),
    dueDate: z.date().optional().nullable(),
    type: z.enum(["PAYABLE", "RECEIVABLE"]),
    status: z.enum(["ACTIVE", "PAID", "CLOSED"]),
});

export type LoanInput = z.infer<typeof loanSchema>;

async function getCurrentUserId() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) throw new Error("Unauthorized");
    return session.user.id;
}

export async function getLoans() {
    const userId = await getCurrentUserId();

    const loans = await prisma.loan.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" }
    });

    return loans.map(loan => ({
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
