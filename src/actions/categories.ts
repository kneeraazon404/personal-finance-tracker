"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { prisma } from "@/lib/db";
import { categorySchema, CategoryInput } from "@/lib/validations";
import type { CategorySummary } from "@/types/finance";

export type CategoryRow = {
    id: string;
    name: string;
    color: string;
    icon: string | null;
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

export async function getCategories(): Promise<CategorySummary[]> {
    const userId = await getCurrentUserId();
    const categories: CategoryRow[] = await prisma.category.findMany({
        where: { userId },
        orderBy: { name: "asc" },
    });
    return categories;
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
