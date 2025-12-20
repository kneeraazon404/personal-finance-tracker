"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/format";
import { Target, TrendingUp, PiggyBank } from "lucide-react";

interface GoalCardProps {
    goal: {
        id: string;
        name: string;
        type: "INVESTMENT" | "REVENUE_TARGET" | "SAVINGS";
        targetAmount: any; // Decimal or number
        currentAmount: any;
        progressPercent: number;
        completed: boolean;
        date: Date;
    };
}

const typeIcons = {
    INVESTMENT: TrendingUp,
    REVENUE_TARGET: Target,
    SAVINGS: PiggyBank,
};

const typeColors = {
    INVESTMENT: "bg-blue-100 text-blue-800",
    REVENUE_TARGET: "bg-green-100 text-green-800",
    SAVINGS: "bg-purple-100 text-purple-800",
};

export function GoalCard({ goal }: GoalCardProps) {
    const Icon = typeIcons[goal.type];

    // Safely handle Decimal vs number conversion if needed, but UI usually receives serialized data
    const target = Number(goal.targetAmount);
    const current = Number(goal.currentAmount);

    return (
        <Card className={goal.completed ? "opacity-75" : ""}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{goal.name}</CardTitle>
                <Badge className={typeColors[goal.type]}>
                    <Icon className="mr-1 h-3 w-3" />
                    {goal.type.replace("_", " ")}
                </Badge>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                            {formatCurrency(current)}
                        </span>
                        <span className="font-medium">
                            {formatCurrency(target)}
                        </span>
                    </div>
                    <Progress value={Math.min(goal.progressPercent, 100)} />
                    <p className="text-xs text-muted-foreground text-right">
                        {goal.progressPercent.toFixed(1)}% complete
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
