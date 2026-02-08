"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { prisma } from "@/lib/db";
import { subscriptionSchema, SubscriptionInput } from "@/lib/validations";
import type { SubscriptionSummary } from "@/types/finance";
import { Prisma } from "@prisma/client";

type Decimalish = Prisma.Decimal | number | string;

type SubscriptionRow = {
    id: string;
    name: string;
    cost: Decimalish;
    date: Date;
    status: "ACTIVE" | "INACTIVE";
    billing: "MONTHLY" | "YEARLY";
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

export async function getSubscriptions(): Promise<SubscriptionSummary[]> {
    const userId = await getCurrentUserId();
    const subscriptions: SubscriptionRow[] = await prisma.subscription.findMany({
        where: { userId },
        orderBy: { date: "asc" },
    });

    // Serialize Decimals
    return subscriptions.map((sub: SubscriptionRow) => ({
        ...sub,
        cost: Number(sub.cost)
    }));
}

export async function createSubscription(data: SubscriptionInput) {
    const userId = await getCurrentUserId();
    const validated = subscriptionSchema.parse(data);

    const subscription = await prisma.subscription.create({
        data: {
            ...validated,
            userId,
        },
    });

    revalidatePath("/subscriptions");
    revalidatePath("/dashboard");
    return { success: true, data: subscription };
}

export async function updateSubscription(id: string, data: Partial<SubscriptionInput>) {
    const userId = await getCurrentUserId();
    const validated = subscriptionSchema.partial().parse(data);

    await prisma.subscription.updateMany({
        where: { id, userId },
        data: validated,
    });

    revalidatePath("/subscriptions");
    revalidatePath("/dashboard");
    return { success: true };
}

export async function deleteSubscription(id: string) {
    const userId = await getCurrentUserId();

    await prisma.subscription.deleteMany({
        where: { id, userId },
    });

    revalidatePath("/subscriptions");
    revalidatePath("/dashboard");
    return { success: true };
}
