"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { goalSchema, type GoalInput } from "@/lib/validations";
import { createGoal, updateGoal } from "@/actions/goals";
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
import type { AccountBalance } from "@/types/finance";

interface GoalFormProps {
    accounts: AccountBalance[];
    goal?: {
        id: string;
        name: string;
        initialAmount: number;
        targetAmount: number;
        date: Date;
        type: "INVESTMENT" | "REVENUE_TARGET" | "SAVINGS";
        accountId: string | null;
    };
    onSuccess?: () => void;
}

const goalTypes = [
    { value: "INVESTMENT", label: "Investment" },
    { value: "REVENUE_TARGET", label: "Revenue Target" },
    { value: "SAVINGS", label: "Savings" },
] as const;

export function GoalForm({ accounts, goal, onSuccess }: GoalFormProps) {
    const [isPending, startTransition] = useTransition();

    const form = useForm<GoalInput>({
        resolver: zodResolver(goalSchema),
        defaultValues: {
            name: goal?.name ?? "",
            initialAmount: goal ? String(goal.initialAmount) : "0",
            targetAmount: goal ? String(goal.targetAmount) : "0",
            date: goal?.date ? new Date(goal.date) : new Date(),
            type: goal?.type ?? "SAVINGS",
            accountId: goal?.accountId ?? undefined,
        },
    });

    const onSubmit = (data: GoalInput) => {
        const payload: GoalInput = {
            ...data,
            accountId: data.accountId ? data.accountId : undefined,
        };

        startTransition(async () => {
            try {
                if (goal) {
                    await updateGoal(goal.id, payload);
                    toast.success("Goal updated.");
                } else {
                    await createGoal(payload);
                    toast.success("Goal created.");
                }
                onSuccess?.();
            } catch (error) {
                toast.error("Unable to save goal.");
            }
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Emergency Fund" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select goal type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {goalTypes.map((goalType) => (
                                        <SelectItem key={goalType.value} value={goalType.value}>
                                            {goalType.label}
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
                    name="targetAmount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Target Amount</FormLabel>
                            <FormControl>
                                <Input type="number" step="0.01" placeholder="0.00" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="initialAmount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Starting Amount</FormLabel>
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
                            <FormLabel>Target Date</FormLabel>
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
                    name="accountId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Linked Account (optional)</FormLabel>
                            <Select
                                onValueChange={(value) =>
                                    field.onChange(value === "none" ? undefined : value)
                                }
                                value={field.value ?? "none"}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select account" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="none">No linked account</SelectItem>
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

                <Button type="submit" disabled={isPending} className="w-full">
                    {isPending ? "Saving..." : goal ? "Update Goal" : "Create Goal"}
                </Button>
            </form>
        </Form>
    );
}
