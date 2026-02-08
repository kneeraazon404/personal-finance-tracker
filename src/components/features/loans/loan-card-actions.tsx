"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LoanCard } from "@/components/features/loans/loan-card";
import { LoanForm } from "@/components/features/loans/loan-form";
import { deleteLoan } from "@/actions/loans";
import type { LoanSummary } from "@/types/finance";

interface LoanCardActionsProps {
    loan: LoanSummary;
}

export function LoanCardActions({ loan }: LoanCardActionsProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <LoanCard
                loan={loan}
                onEdit={() => setOpen(true)}
                onDelete={() => deleteLoan(loan.id)}
            />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Loan</DialogTitle>
                    </DialogHeader>
                    <LoanForm
                        loan={loan}
                        onSuccess={() => setOpen(false)}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}
