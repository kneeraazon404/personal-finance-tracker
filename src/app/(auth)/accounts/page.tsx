import { Metadata } from "next";
import { getAccounts } from "@/actions/accounts";
import { AccountCreateDialog } from "@/components/features/accounts/account-create-dialog";
import { AccountActions } from "@/components/features/accounts/account-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/format";

export const metadata: Metadata = {
    title: "Accounts",
};

export default async function AccountsPage() {
    const accounts = await getAccounts();

    return (
        <div className="space-y-4 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-semibold tracking-tight">Accounts</h2>
                <AccountCreateDialog />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {accounts.map((account) => (
                    <Card key={account.id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {account.name}
                            </CardTitle>
                            <AccountActions account={account} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-semibold">
                                {formatCurrency(account.currentBalance)}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
