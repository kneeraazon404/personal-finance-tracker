"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { GoalForm } from "@/components/features/goals/goal-form";
import type { AccountBalance } from "@/types/finance";

interface GoalCreateDialogProps {
    accounts: AccountBalance[];
}

export function GoalCreateDialog({ accounts }: GoalCreateDialogProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Goal
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Goal</DialogTitle>
                </DialogHeader>
                <GoalForm accounts={accounts} onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
