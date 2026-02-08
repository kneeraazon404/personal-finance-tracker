"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AccountForm } from "@/components/features/accounts/account-form";
import { ConfirmDeleteButton } from "@/components/shared/confirm-delete-button";
import { deleteAccount } from "@/actions/accounts";

interface AccountActionsProps {
    account: {
        id: string;
        name: string;
        initialAmount: number;
    };
}

export function AccountActions({ account }: AccountActionsProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex items-center gap-2">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm">Edit</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Account</DialogTitle>
                    </DialogHeader>
                    <AccountForm
                        account={{
                            id: account.id,
                            name: account.name,
                            initialAmount: String(account.initialAmount),
                        }}
                        onSuccess={() => setOpen(false)}
                    />
                </DialogContent>
            </Dialog>
            <ConfirmDeleteButton
                onDelete={() => deleteAccount(account.id)}
                confirmText="Delete this account? This will remove related records."
                successMessage="Account deleted."
                errorMessage="Unable to delete account."
            />
        </div>
    );
}
