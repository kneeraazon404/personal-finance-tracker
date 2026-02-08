"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BudgetCard } from "@/components/features/budgets/budget-card";
import { BudgetForm } from "@/components/features/budgets/budget-form";
import { deleteBudget } from "@/actions/budgets";
import type { BudgetWithProgress, CategorySummary } from "@/types/finance";

interface BudgetCardActionsProps {
    budget: BudgetWithProgress;
    categories: CategorySummary[];
}

export function BudgetCardActions({ budget, categories }: BudgetCardActionsProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <BudgetCard
                budget={budget}
                onEdit={() => setOpen(true)}
                onDelete={() => deleteBudget(budget.id)}
            />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Budget</DialogTitle>
                    </DialogHeader>
                    <BudgetForm
                        categories={categories}
                        budget={{
                            id: budget.id,
                            amount: budget.amount,
                            categoryId: budget.categoryId,
                        }}
                        onSuccess={() => setOpen(false)}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}
