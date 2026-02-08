"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { budgetSchema, type BudgetInput } from "@/lib/validations";
import { createBudget, updateBudget } from "@/actions/budgets";
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
import type { CategorySummary } from "@/types/finance";

interface BudgetFormProps {
    categories: CategorySummary[];
    budget?: {
        id: string;
        amount: number;
        categoryId: string;
    };
    onSuccess?: () => void;
}

export function BudgetForm({ categories, budget, onSuccess }: BudgetFormProps) {
    const [isPending, startTransition] = useTransition();

    const form = useForm<BudgetInput>({
        resolver: zodResolver(budgetSchema),
        defaultValues: {
            amount: budget ? String(budget.amount) : "0",
            categoryId: budget?.categoryId ?? categories[0]?.id ?? "",
        },
    });

    const onSubmit = (data: BudgetInput) => {
        startTransition(async () => {
            try {
                if (budget) {
                    await updateBudget(budget.id, data);
                    toast.success("Budget updated.");
                } else {
                    await createBudget(data);
                    toast.success("Budget created.");
                }
                onSuccess?.();
            } catch (error) {
                toast.error("Unable to save budget.");
            }
        });
    };

    if (categories.length === 0) {
        return (
            <p className="text-sm text-muted-foreground">
                Create a category first to set a budget.
            </p>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.id}>
                                            {category.name}
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
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Monthly Limit</FormLabel>
                            <FormControl>
                                <Input type="number" step="0.01" placeholder="0.00" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isPending} className="w-full">
                    {isPending
                        ? "Saving..."
                        : budget
                            ? "Update Budget"
                            : "Create Budget"}
                </Button>
            </form>
        </Form>
    );
}
