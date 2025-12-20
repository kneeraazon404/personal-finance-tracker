"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { prisma } from "@/lib/db";
import { z } from "zod";

const categorySchema = z.object({
    name: z.string().min(1, "Name is required"),
    color: z.string().min(1, "Color is required"),
    icon: z.string().optional(),
});

export type CategoryInput = z.infer<typeof categorySchema>;

async function getCurrentUserId() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) throw new Error("Unauthorized");
    return session.user.id;
}

export async function getCategories() {
    const userId = await getCurrentUserId();
    return prisma.category.findMany({
        where: { userId },
        orderBy: { name: "asc" },
    });
}

export async function createCategory(data: CategoryInput) {
    const userId = await getCurrentUserId();
    const validated = categorySchema.parse(data);

    const category = await prisma.category.create({
        data: {
            ...validated,
            userId,
        },
    });

    revalidatePath("/categories");
    return { success: true, data: category };
}

export async function updateCategory(id: string, data: Partial<CategoryInput>) {
    const userId = await getCurrentUserId();
    const validated = categorySchema.partial().parse(data);

    await prisma.category.updateMany({
        where: { id, userId },
        data: validated,
    });

    revalidatePath("/categories");
    return { success: true };
}

export async function deleteCategory(id: string) {
    const userId = await getCurrentUserId();

    await prisma.category.deleteMany({
        where: { id, userId },
    });

    revalidatePath("/categories");
    return { success: true };
}
