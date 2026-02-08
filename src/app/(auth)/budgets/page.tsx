import { Metadata } from "next";
import { getBudgets } from "@/actions/budgets";
import { getCategories } from "@/actions/categories";
import { BudgetCreateDialog } from "@/components/features/budgets/budget-create-dialog";
import { BudgetCardActions } from "@/components/features/budgets/budget-card-actions";

export const metadata: Metadata = {
    title: "Spending Budgets",
};

export default async function BudgetsPage() {
    const [budgets, categories] = await Promise.all([
        getBudgets(),
        getCategories(),
    ]);

    return (
        <div className="flex-1 space-y-4 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-semibold tracking-tight">Monthly Budgets</h2>
                <BudgetCreateDialog categories={categories} />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {budgets.length === 0 ? (
                    <div className="col-span-full text-center py-10 text-muted-foreground">
                        No budgets set. Create one to start tracking your spending!
                    </div>
                ) : (
                    budgets.map((budget) => (
                        <BudgetCardActions
                            key={budget.id}
                            budget={budget}
                            categories={categories}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
