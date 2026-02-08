import { Metadata } from "next";
import { getGoalsWithProgress } from "@/actions/goals";
import { getAccounts } from "@/actions/accounts";
import { GoalCreateDialog } from "@/components/features/goals/goal-create-dialog";
import { GoalCardActions } from "@/components/features/goals/goal-card-actions";

export const metadata: Metadata = {
    title: "Goals",
};

export default async function GoalsPage() {
    const [goals, accounts] = await Promise.all([
        getGoalsWithProgress(),
        getAccounts(),
    ]);

    return (
        <div className="space-y-4 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-semibold tracking-tight">Goals</h2>
                <GoalCreateDialog accounts={accounts} />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {goals.map((goal) => (
                    <GoalCardActions
                        key={goal.id}
                        goal={goal}
                        accounts={accounts}
                    />
                ))}
            </div>
        </div>
    );
}
