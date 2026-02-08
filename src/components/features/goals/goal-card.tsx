"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/format";
import { Target, TrendingUp, PiggyBank, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteButton } from "@/components/shared/confirm-delete-button";
import type { GoalProgress } from "@/types/finance";

interface GoalCardProps {
  goal: GoalProgress;
  onEdit?: () => void;
  onDelete?: () => Promise<unknown>;
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

export function GoalCard({ goal, onEdit, onDelete }: GoalCardProps) {
  const Icon = typeIcons[goal.type];

  // Safely handle Decimal vs number conversion if needed, but UI usually receives serialized data
  const target = Number(goal.targetAmount);
  const current = Number(goal.currentAmount);

  return (
    <Card className={goal.completed ? "opacity-75" : ""}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-2">
          <CardTitle className="text-sm font-medium">{goal.name}</CardTitle>
          <Badge className={typeColors[goal.type]}>
            <Icon className="mr-1 h-3 w-3" />
            {goal.type.replace("_", " ")}
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
                confirmText="Delete this goal?"
                successMessage="Goal deleted."
              >
                <Trash2 className="h-4 w-4" />
              </ConfirmDeleteButton>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {formatCurrency(current)}
            </span>
            <span className="font-medium">{formatCurrency(target)}</span>
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
