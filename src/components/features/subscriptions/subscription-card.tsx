"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteButton } from "@/components/shared/confirm-delete-button";
import { formatCurrency } from "@/utils/format";
import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import type { SubscriptionSummary } from "@/types/finance";

interface SubscriptionCardProps {
    subscription: SubscriptionSummary;
    onEdit?: () => void;
    onDelete?: () => Promise<unknown>;
}

export function SubscriptionCard({ subscription, onEdit, onDelete }: SubscriptionCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="space-y-2">
                    <CardTitle className="font-medium">{subscription.name}</CardTitle>
                    <Badge variant={subscription.status === "ACTIVE" ? "default" : "secondary"}>
                        {subscription.status}
                    </Badge>
                </div>
                {(onEdit || onDelete) && (
                    <div className="flex items-center gap-2">
                        {onEdit && (
                            <Button variant="outline" size="icon" onClick={onEdit}>
                                <Pencil className="h-4 w-4" />
                            </Button>
                        )}
                        {onDelete && (
                            <ConfirmDeleteButton
                                onDelete={onDelete}
                                variant="destructive"
                                size="icon"
                                confirmText="Delete this subscription?"
                                successMessage="Subscription deleted."
                                errorMessage="Unable to delete subscription."
                            >
                                <Trash2 className="h-4 w-4" />
                            </ConfirmDeleteButton>
                        )}
                    </div>
                )}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    {formatCurrency(subscription.cost)}
                    <span className="text-sm font-normal text-muted-foreground">
                        /{subscription.billing.toLowerCase()}
                    </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                    Next billing: {format(new Date(subscription.date), "MMM d, yyyy")}
                </p>
            </CardContent>
        </Card>
    );
}
