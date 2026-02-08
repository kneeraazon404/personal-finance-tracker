import { Metadata } from "next";
import { getCategories } from "@/actions/categories";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryCreateDialog } from "@/components/features/categories/category-create-dialog";
import { CategoryCardActions } from "@/components/features/categories/category-card-actions";

export const metadata: Metadata = {
    title: "Categories",
};

export default async function CategoriesPage() {
    const categories = await getCategories();

    return (
        <div className="flex-1 space-y-4 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-semibold tracking-tight">Categories</h2>
                <CategoryCreateDialog />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {categories.map((category) => (
                    <Card key={category.id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="space-y-2">
                                <CardTitle className="text-sm font-medium">{category.name}</CardTitle>
                                <div
                                    className="h-4 w-4 rounded-full"
                                    style={{ backgroundColor: category.color }}
                                />
                            </div>
                            <CategoryCardActions category={category} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-muted-foreground">
                                Icon: {category.icon || "Default"}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
