import { Metadata } from "next";
import { getGoalsWithProgress } from "@/actions/goals";
import { GoalCard } from "@/components/features/goals/goal-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const metadata: Metadata = {
    title: "Goals",
};

export default async function GoalsPage() {
    const goals = await getGoalsWithProgress();

    return (
        <div className="space-y-4 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Goals</h2>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Goal
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {goals.map((goal: any) => (
                    <GoalCard key={goal.id} goal={goal} />
                ))}
            </div>
        </div>
    );
}
