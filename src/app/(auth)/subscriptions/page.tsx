import { Metadata } from "next";
import { getSubscriptions } from "@/actions/subscriptions";
import { formatCurrency } from "@/utils/format";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export const metadata: Metadata = {
    title: "Subscriptions",
};

export default async function SubscriptionsPage() {
    const subscriptions = await getSubscriptions();

    return (
        <div className="flex-1 space-y-4 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Subscriptions</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {subscriptions.map((sub) => (
                    <Card key={sub.id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="font-medium">{sub.name}</CardTitle>
                            <Badge variant={sub.status === "ACTIVE" ? "default" : "secondary"}>
                                {sub.status}
                            </Badge>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatCurrency(Number(sub.cost))}
                                <span className="text-sm font-normal text-muted-foreground">/{sub.billing.toLowerCase()}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                Next billing: {format(new Date(sub.date), "MMM d, yyyy")}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
