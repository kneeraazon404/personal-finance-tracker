import { Metadata } from "next";
import { getTransactions } from "@/actions/transactions";
import { getAccounts } from "@/actions/accounts";
import { getGoalsWithProgress } from "@/actions/goals";
import { formatCurrency } from "@/utils/format";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { TransactionCreateDialog } from "@/components/features/transactions/transaction-create-dialog";
import { TransactionRowActions } from "@/components/features/transactions/transaction-row-actions";

export const metadata: Metadata = {
    title: "Transactions",
};

export default async function TransactionsPage() {
    const [transactions, accounts, goals] = await Promise.all([
        getTransactions(),
        getAccounts(),
        getGoalsWithProgress(),
    ]);

    const accountOptions = accounts.map((account) => ({
        id: account.id,
        name: account.name,
    }));

    const goalOptions = goals.map((goal) => ({
        id: goal.id,
        name: goal.name,
    }));

    return (
        <div className="flex-1 space-y-4 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
                <TransactionCreateDialog accounts={accountOptions} goals={goalOptions} />
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Transfers</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>From</TableHead>
                                <TableHead>To</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center">No transactions found</TableCell>
                                </TableRow>
                            ) : (
                                transactions.map((t) => (
                                    <TableRow key={t.id}>
                                        <TableCell>{format(new Date(t.date), "MMM d, yyyy")}</TableCell>
                                        <TableCell className="font-medium">{t.name}</TableCell>
                                        <TableCell>{t.fromAccount.name}</TableCell>
                                        <TableCell>{t.toAccount.name}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(Number(t.amount))}</TableCell>
                                        <TableCell className="text-right">
                                            <TransactionRowActions
                                                transaction={t}
                                                accounts={accountOptions}
                                                goals={goalOptions}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
