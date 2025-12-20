import { Metadata } from "next";
import { getBudgets } from "@/actions/budgets";
import { BudgetCard } from "@/components/features/budgets/budget-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const metadata: Metadata = {
    title: "Spending Budgets",
};

export default async function BudgetsPage() {
    const budgets = await getBudgets();

    return (
        <div className="flex-1 space-y-4 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Monthly Budgets</h2>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Set Budget
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {budgets.length === 0 ? (
                    <div className="col-span-full text-center py-10 text-muted-foreground">
                        No budgets set. Create one to start tracking your spending!
                    </div>
                ) : (
                    budgets.map((budget) => (
                        <BudgetCard key={budget.id} budget={budget} />
                    ))
                )}
            </div>
        </div>
    );
}
