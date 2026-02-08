"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GoalCard } from "@/components/features/goals/goal-card";
import { GoalForm } from "@/components/features/goals/goal-form";
import { deleteGoal } from "@/actions/goals";
import type { AccountBalance, GoalProgress } from "@/types/finance";

interface GoalCardActionsProps {
    goal: GoalProgress;
    accounts: AccountBalance[];
}

export function GoalCardActions({ goal, accounts }: GoalCardActionsProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <GoalCard
                goal={goal}
                onEdit={() => setOpen(true)}
                onDelete={() => deleteGoal(goal.id)}
            />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Goal</DialogTitle>
                    </DialogHeader>
                    <GoalForm
                        accounts={accounts}
                        goal={{
                            id: goal.id,
                            name: goal.name,
                            initialAmount: goal.initialAmount,
                            targetAmount: goal.targetAmount,
                            date: goal.date,
                            type: goal.type,
                            accountId: goal.accountId,
                        }}
                        onSuccess={() => setOpen(false)}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}
