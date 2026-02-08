"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BudgetForm } from "@/components/features/budgets/budget-form";
import type { CategorySummary } from "@/types/finance";

interface BudgetCreateDialogProps {
    categories: CategorySummary[];
}

export function BudgetCreateDialog({ categories }: BudgetCreateDialogProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Set Budget
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Set Budget</DialogTitle>
                </DialogHeader>
                <BudgetForm categories={categories} onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
