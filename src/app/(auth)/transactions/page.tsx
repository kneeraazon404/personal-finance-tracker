import { Metadata } from "next";
import { getTransactions } from "@/actions/transactions";
import { formatCurrency } from "@/utils/format";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export const metadata: Metadata = {
    title: "Transactions",
};

export default async function TransactionsPage() {
    const transactions = await getTransactions();

    return (
        <div className="flex-1 space-y-4 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
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
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">No transactions found</TableCell>
                                </TableRow>
                            ) : (
                                transactions.map((t) => (
                                    <TableRow key={t.id}>
                                        <TableCell>{format(new Date(t.date), "MMM d, yyyy")}</TableCell>
                                        <TableCell className="font-medium">{t.name}</TableCell>
                                        <TableCell>{t.fromAccount.name}</TableCell>
                                        <TableCell>{t.toAccount.name}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(Number(t.amount))}</TableCell>
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
