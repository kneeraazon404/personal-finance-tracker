import { Metadata } from "next";
import { getAccounts } from "@/actions/accounts";
import { AccountForm } from "@/components/features/accounts/account-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/format";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const metadata: Metadata = {
    title: "Accounts",
};

export default async function AccountsPage() {
    const accounts = await getAccounts();

    return (
        <div className="space-y-4 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Accounts</h2>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Account
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Account</DialogTitle>
                        </DialogHeader>
                        <AccountForm />
                    </DialogContent>
                </Dialog>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {accounts.map((account: any) => (
                    <Card key={account.id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {account.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatCurrency(account.currentBalance)}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
