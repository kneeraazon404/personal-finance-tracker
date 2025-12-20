"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/utils/format";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
// import { EditBudgetDialog } from "./edit-budget-dialog"; // Todo

interface BudgetCardProps {
    budget: {
        id: string;
        amount: number;
        spent: number;
        percentage: number;
        category: {
            id: string;
            name: string;
            color: string;
            icon?: string | null;
        };
    };
    onEdit?: (budget: any) => void;
    onDelete?: (id: string) => void;
}

export function BudgetCard({ budget, onEdit, onDelete }: BudgetCardProps) {
    const isOverBudget = budget.percentage > 100;
    const isNearLimit = budget.percentage > 85 && !isOverBudget;

    // Determine progress bar color
    // shadcn progress uses 'bg-primary' by default. We can override class or use indicator styles if exposed.
    // For simplicity, we'll assume default style or add custom class logic if needed.
    // Actually, shadcn ui Progress component usually doesn't take color prop easily without customization.
    // We'll wrap it or just rely on the badge for status.

    return (
        <Card className={isOverBudget ? "border-red-200 dark:border-red-900" : ""}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-2">
                    <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: budget.category.color }}
                    />
                    <CardTitle className="text-base font-semibold">
                        {budget.category.name}
                    </CardTitle>
                </div>
                {isOverBudget && (
                    <Badge variant="destructive" className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" /> Over
                    </Badge>
                )}
                {isNearLimit && (
                    <Badge variant="secondary" className="text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30">
                        Near Limit
                    </Badge>
                )}
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="space-y-1">
                        <div className="flex items-end justify-between text-sm">
                            <span className="text-muted-foreground">Spent</span>
                            <span className="font-medium">
                                {formatCurrency(budget.spent)}
                                <span className="text-muted-foreground ml-1">
                                    of {formatCurrency(budget.amount)}
                                </span>
                            </span>
                        </div>
                        <Progress
                            value={Math.min(budget.percentage, 100)}
                            className={`h-2 ${isOverBudget ? "[&>div]:bg-red-500" : isNearLimit ? "[&>div]:bg-yellow-500" : ""}`}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground pt-1">
                            <span>{budget.percentage.toFixed(0)}%</span>
                            <span>{formatCurrency(Math.max(budget.amount - budget.spent, 0))} left</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
