"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SubscriptionForm } from "@/components/features/subscriptions/subscription-form";

export function SubscriptionCreateDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Subscription
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Subscription</DialogTitle>
                </DialogHeader>
                <SubscriptionForm onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
