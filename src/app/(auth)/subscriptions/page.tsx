import { Metadata } from "next";
import { getSubscriptions } from "@/actions/subscriptions";
import { SubscriptionCreateDialog } from "@/components/features/subscriptions/subscription-create-dialog";
import { SubscriptionCardActions } from "@/components/features/subscriptions/subscription-card-actions";

export const metadata: Metadata = {
    title: "Subscriptions",
};

export default async function SubscriptionsPage() {
    const subscriptions = await getSubscriptions();

    return (
        <div className="flex-1 space-y-4 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Subscriptions</h2>
                <SubscriptionCreateDialog />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {subscriptions.map((sub) => (
                    <SubscriptionCardActions key={sub.id} subscription={sub} />
                ))}
            </div>
        </div>
    );
}
