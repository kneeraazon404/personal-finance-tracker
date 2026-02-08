"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SubscriptionCard } from "@/components/features/subscriptions/subscription-card";
import { SubscriptionForm } from "@/components/features/subscriptions/subscription-form";
import { deleteSubscription } from "@/actions/subscriptions";
import type { SubscriptionSummary } from "@/types/finance";

interface SubscriptionCardActionsProps {
    subscription: SubscriptionSummary;
}

export function SubscriptionCardActions({ subscription }: SubscriptionCardActionsProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <SubscriptionCard
                subscription={subscription}
                onEdit={() => setOpen(true)}
                onDelete={() => deleteSubscription(subscription.id)}
            />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Subscription</DialogTitle>
                    </DialogHeader>
                    <SubscriptionForm
                        subscription={subscription}
                        onSuccess={() => setOpen(false)}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}
