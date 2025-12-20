"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { prisma } from "@/lib/db";
import { goalSchema, GoalInput } from "@/lib/validations";

async function getCurrentUserId() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) throw new Error("Unauthorized");
    return session.user.id;
}

export async function createGoal(data: GoalInput) {
    const userId = await getCurrentUserId();
    const validated = goalSchema.parse(data);

    const goal = await prisma.goal.create({
        data: {
            name: validated.name,
            initialAmount: validated.initialAmount,
            targetAmount: validated.targetAmount,
            date: validated.date,
            type: validated.type,
            userId,
            accountId: validated.accountId,
        },
    });

    revalidatePath("/dashboard");
    revalidatePath("/goals");
    return { success: true, data: goal };
}

export async function getGoalsWithProgress() {
    const userId = await getCurrentUserId();

    // Use view for computed progress
    const goals = await prisma.$queryRaw<any[]>`
    SELECT * FROM goal_progress 
    WHERE "userId" = ${userId}
    ORDER BY completed ASC, date ASC
  `;

    return goals.map((goal) => ({
        ...goal,
        initialAmount: Number(goal.initialAmount),
        targetAmount: Number(goal.targetAmount),
        currentAmount: Number(goal.currentAmount),
        progressPercent: Number(goal.progressPercent),
    }));
}

export async function updateGoal(id: string, data: Partial<GoalInput>) {
    const userId = await getCurrentUserId();
    const validated = goalSchema.partial().parse(data);

    await prisma.goal.updateMany({
        where: { id, userId },
        data: validated,
    });

    revalidatePath("/dashboard");
    revalidatePath("/goals");
    return { success: true };
}

export async function markGoalComplete(id: string, completed: boolean) {
    const userId = await getCurrentUserId();

    await prisma.goal.updateMany({
        where: { id, userId },
        data: { completed },
    });

    revalidatePath("/dashboard");
    revalidatePath("/goals");
    return { success: true };
}

export async function deleteGoal(id: string) {
    const userId = await getCurrentUserId();

    await prisma.goal.deleteMany({
        where: { id, userId },
    });

    revalidatePath("/dashboard");
    revalidatePath("/goals");
    return { success: true };
}
