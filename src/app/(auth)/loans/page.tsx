import { Metadata } from "next";
import { getLoans } from "@/actions/loans";
import { LoanCreateDialog } from "@/components/features/loans/loan-create-dialog";
import { LoanCardActions } from "@/components/features/loans/loan-card-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/format";

export const metadata: Metadata = {
    title: "Loans & Debts",
};

export default async function LoansPage() {
    const loans = await getLoans();

    // Calculate totals
    const totalPayable = loans
        .filter(l => l.type === "PAYABLE" && l.status === "ACTIVE")
        .reduce((sum, l) => sum + l.remainingAmount, 0);

    const totalReceivable = loans
        .filter(l => l.type === "RECEIVABLE" && l.status === "ACTIVE")
        .reduce((sum, l) => sum + l.remainingAmount, 0);

    return (
        <div className="flex-1 space-y-4 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Loans & Debts</h2>
                <LoanCreateDialog />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card className="bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-red-600 dark:text-red-400">
                            Total Payable (Debt)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-700 dark:text-red-300">
                            {formatCurrency(totalPayable)}
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-900/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-green-600 dark:text-green-400">
                            Total Receivable (Assets)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                            {formatCurrency(totalReceivable)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-medium">Active Records</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {loans.length === 0 ? (
                        <div className="col-span-full text-center py-10 text-muted-foreground">
                            No active loans or debts recorded.
                        </div>
                    ) : (
                        loans.map((loan) => (
                            <LoanCardActions key={loan.id} loan={loan} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
