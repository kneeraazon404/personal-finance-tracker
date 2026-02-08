"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { transactionSchema, type TransactionInput } from "@/lib/validations";
import { createTransaction, updateTransaction } from "@/actions/transactions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { toDateInputValue } from "@/utils/date";

interface TransactionFormProps {
    accounts: { id: string; name: string }[];
    goals: { id: string; name: string }[];
    transaction?: {
        id: string;
        name: string;
        amount: number;
        date: Date;
        fromAccountId: string;
        toAccountId: string;
        goalId?: string | null;
    };
    onSuccess?: () => void;
}

export function TransactionForm({
    accounts,
    goals,
    transaction,
    onSuccess,
}: TransactionFormProps) {
    const [isPending, startTransition] = useTransition();

    const hasAccountOptions = accounts.length >= 2;

    const form = useForm<TransactionInput>({
        resolver: zodResolver(transactionSchema),
        defaultValues: {
            name: transaction?.name ?? "",
            amount: transaction ? String(transaction.amount) : "0",
            date: transaction?.date ? new Date(transaction.date) : new Date(),
            fromAccountId: transaction?.fromAccountId ?? accounts[0]?.id ?? "",
            toAccountId: transaction?.toAccountId ?? accounts[1]?.id ?? "",
            goalId: transaction?.goalId ?? undefined,
        },
    });

    const onSubmit = (data: TransactionInput) => {
        const payload: TransactionInput = {
            ...data,
            goalId: data.goalId ? data.goalId : undefined,
        };

        startTransition(async () => {
            try {
                if (transaction) {
                    await updateTransaction(transaction.id, payload);
                    toast.success("Transaction updated.");
                } else {
                    await createTransaction(payload);
                    toast.success("Transaction created.");
                }
                onSuccess?.();
            } catch (error) {
                toast.error("Unable to save transaction.");
            }
        });
    };

    if (!hasAccountOptions) {
        return (
            <p className="text-sm text-muted-foreground">
                Create at least two accounts to add a transfer.
            </p>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Transfer to Savings" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <Input type="number" step="0.01" placeholder="0.00" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                                <Input
                                    type="date"
                                    value={toDateInputValue(field.value)}
                                    onChange={(event) => field.onChange(event.target.value)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="fromAccountId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>From Account</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select account" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {accounts.map((account) => (
                                        <SelectItem key={account.id} value={account.id}>
                                            {account.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="toAccountId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>To Account</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select account" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {accounts.map((account) => (
                                        <SelectItem key={account.id} value={account.id}>
                                            {account.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="goalId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Goal (optional)</FormLabel>
                            <Select
                                onValueChange={(value) =>
                                    field.onChange(value === "none" ? undefined : value)
                                }
                                value={field.value ?? "none"}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select goal" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="none">No linked goal</SelectItem>
                                    {goals.map((goal) => (
                                        <SelectItem key={goal.id} value={goal.id}>
                                            {goal.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isPending} className="w-full">
                    {isPending
                        ? "Saving..."
                        : transaction
                            ? "Update Transaction"
                            : "Create Transaction"}
                </Button>
            </form>
        </Form>
    );
}
