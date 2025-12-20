"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/format";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Progress } from "@/components/ui/progress";
import { ArrowDownLeft, ArrowUpRight, Calendar, Percent } from "lucide-react";

interface LoanCardProps {
    loan: {
        id: string;
        name: string;
        totalAmount: number;
        remainingAmount: number;
        interestRate: number | null;
        dueDate: Date | null;
        type: "PAYABLE" | "RECEIVABLE";
        status: "ACTIVE" | "PAID" | "CLOSED";
    };
}

export function LoanCard({ loan }: LoanCardProps) {
    const isPayable = loan.type === "PAYABLE";
    const percentPaid = ((loan.totalAmount - loan.remainingAmount) / loan.totalAmount) * 100;

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                        {isPayable ? (
                            <ArrowUpRight className="h-4 w-4 text-red-500" />
                        ) : (
                            <ArrowDownLeft className="h-4 w-4 text-green-500" />
                        )}
                        {loan.name}
                    </CardTitle>
                    <div className="text-xs text-muted-foreground">
                        {isPayable ? "I owe" : "Owes me"}
                    </div>
                </div>
                <Badge variant={loan.status === "ACTIVE" ? "default" : "secondary"}>
                    {loan.status}
                </Badge>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex justify-between items-baseline">
                        <span className="text-2xl font-bold">
                            {formatCurrency(loan.remainingAmount)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            of {formatCurrency(loan.totalAmount)}
                        </span>
                    </div>

                    <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Progress</span>
                            <span>{percentPaid.toFixed(0)}% paid</span>
                        </div>
                        <Progress value={percentPaid} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                        <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {loan.dueDate ? format(new Date(loan.dueDate), "MMM d, yyyy") : "No due date"}
                        </div>
                        {loan.interestRate && (
                            <div className="flex items-center gap-1">
                                <Percent className="h-3 w-3" />
                                {loan.interestRate}% APR
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
