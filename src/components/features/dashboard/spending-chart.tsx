"use client";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/format";

interface SpendingData {
    month: string;
    income: number;
    expenses: number;
}

interface SpendingChartProps {
    data: SpendingData[];
}

export function SpendingChart({ data }: SpendingChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Income vs Expenses</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis
                                dataKey="month"
                                tick={{ fontSize: 12 }}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                tick={{ fontSize: 12 }}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => formatCurrency(value, { compact: true })}
                            />
                            <Tooltip
                                formatter={(value: number) => formatCurrency(value)}
                                contentStyle={{
                                    backgroundColor: "hsl(var(--background))",
                                    border: "1px solid hsl(var(--border))",
                                    borderRadius: "8px",
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="income"
                                stackId="1"
                                stroke="hsl(var(--chart-1))"
                                fill="hsl(var(--chart-1))"
                                fillOpacity={0.6}
                                name="Income"
                            />
                            <Area
                                type="monotone"
                                dataKey="expenses"
                                stackId="2"
                                stroke="hsl(var(--chart-2))"
                                fill="hsl(var(--chart-2))"
                                fillOpacity={0.6}
                                name="Expenses"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
