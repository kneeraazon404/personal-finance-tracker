"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteButton } from "@/components/shared/confirm-delete-button";
import { TransactionForm } from "@/components/features/transactions/transaction-form";
import { deleteTransaction } from "@/actions/transactions";
import { Pencil, Trash2 } from "lucide-react";
import type { TransactionSummary } from "@/types/finance";

interface TransactionRowActionsProps {
    transaction: TransactionSummary;
    accounts: { id: string; name: string }[];
    goals: { id: string; name: string }[];
}

export function TransactionRowActions({
    transaction,
    accounts,
    goals,
}: TransactionRowActionsProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="flex items-center justify-end gap-2">
                <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
                    <Pencil className="h-4 w-4" />
                </Button>
                <ConfirmDeleteButton
                    onDelete={() => deleteTransaction(transaction.id)}
                    variant="destructive"
                    size="icon"
                    confirmText="Delete this transaction?"
                    successMessage="Transaction deleted."
                    errorMessage="Unable to delete transaction."
                >
                    <Trash2 className="h-4 w-4" />
                </ConfirmDeleteButton>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Transaction</DialogTitle>
                    </DialogHeader>
                    <TransactionForm
                        accounts={accounts}
                        goals={goals}
                        transaction={{
                            id: transaction.id,
                            name: transaction.name,
                            amount: transaction.amount,
                            date: transaction.date,
                            fromAccountId: transaction.fromAccountId,
                            toAccountId: transaction.toAccountId,
                            goalId: transaction.goalId,
                        }}
                        onSuccess={() => setOpen(false)}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}
