import { Metadata } from "next";
import { getAccounts } from "@/actions/accounts";
import { getTransactions } from "@/actions/transactions";
import { getBudgets } from "@/actions/budgets";
import { getLoans } from "@/actions/loans";
import { getSubscriptions } from "@/actions/subscriptions";
import { formatCurrency, formatDate } from "@/utils/format";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BudgetCard } from "@/components/features/budgets/budget-card";
import { Wallet, CreditCard, Banknote, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Dashboard",
};

export default async function DashboardPage() {
    // 1. Fetch all data in parallel
    const [accounts, transactions, budgets, loans, subscriptions] = await Promise.all([
        getAccounts(),
        getTransactions({ limit: 5 }),
        getBudgets(),
        getLoans(),
        getSubscriptions(),
    ]);

    // 2. Calculate Summaries
    const totalBalance = accounts.reduce((acc, curr) => acc + Number(curr.currentBalance), 0);
    const totalDebt = loans
        .filter(l => l.type === "PAYABLE" && l.status === "ACTIVE")
        .reduce((sum, l) => sum + l.remainingAmount, 0);
    const monthlySubscriptions = subscriptions
        .filter(s => s.status === "ACTIVE")
        .reduce((sum, s) => sum + Number(s.cost), 0); // billing cycle logic simplified to monthly sum for now

    return (
        <div className="flex-1 space-y-6 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-semibold tracking-tight">Dashboard</h2>
            </div>

            {/* Top Summary Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{formatCurrency(totalBalance)}</div>
                        <p className="text-xs text-muted-foreground">Across {accounts.length} accounts</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Debt</CardTitle>
                        <Banknote className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold text-red-600 dark:text-red-400">
                            {formatCurrency(totalDebt)}
                        </div>
                        <p className="text-xs text-muted-foreground">Total payable loans</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Monthly Subscriptions</CardTitle>
                        <CreditCard className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                            {formatCurrency(monthlySubscriptions)}
                        </div>
                        <p className="text-xs text-muted-foreground">{subscriptions.length} active services</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Net Monthly</CardTitle>
                        <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        {/* Placeholder for elaborate income/expense calc */}
                        <div className="text-2xl font-semibold">--</div>
                        <p className="text-xs text-muted-foreground">Cash flow tracking coming soon</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Budgets Section - 4 Cols */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Spending Budgets</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {budgets.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No budgets set.</p>
                            ) : (
                                budgets.slice(0, 4).map(budget => (
                                    <BudgetCard key={budget.id} budget={budget} />
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Transactions - 3 Cols */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-y-auto h-[300px] w-full pr-4">
                            <div className="space-y-4">
                                {transactions.length === 0 ? (
                                    <p className="text-sm text-muted-foreground">No recent transactions.</p>
                                ) : (
                                    transactions.map((tx) => (
                                        <div key={tx.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium leading-none">{tx.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {formatDate(tx.date)} • {tx.fromAccount.name}
                                                </p>
                                            </div>
                                            <div className="font-medium">
                                                {formatCurrency(Number(tx.amount))}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Accounts Summary */}
            <h3 className="text-lg font-medium mt-6">My Accounts</h3>
            <div className="grid gap-4 md:grid-cols-3">
                {accounts.map(acc => (
                    <Card key={acc.id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-normal text-muted-foreground">{acc.name}</CardTitle>
                            <Wallet className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-xl font-semibold">{formatCurrency(acc.currentBalance)}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
