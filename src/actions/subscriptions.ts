"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { prisma } from "@/lib/db";
import { z } from "zod";

const subscriptionSchema = z.object({
    name: z.string().min(1, "Name is required"),
    cost: z.number().min(0, "Cost must be positive"),
    date: z.date(),
    status: z.enum(["ACTIVE", "INACTIVE"]),
    billing: z.enum(["MONTHLY", "YEARLY"]),
});

export type SubscriptionInput = z.infer<typeof subscriptionSchema>;

async function getCurrentUserId() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) throw new Error("Unauthorized");
    return session.user.id;
}

export async function getSubscriptions() {
    const userId = await getCurrentUserId();
    const subscriptions = await prisma.subscription.findMany({
        where: { userId },
        orderBy: { date: "asc" },
    });

    // Serialize Decimals
    return subscriptions.map(sub => ({
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
