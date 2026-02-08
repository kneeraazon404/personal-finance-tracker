"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { loanSchema, type LoanInput } from "@/lib/validations";
import { createLoan, updateLoan } from "@/actions/loans";
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

interface LoanFormProps {
    loan?: {
        id: string;
        name: string;
        totalAmount: number;
        remainingAmount: number;
        interestRate: number | null;
        dueDate: Date | null;
        type: "PAYABLE" | "RECEIVABLE";
        status: "ACTIVE" | "PAID" | "CLOSED";
    };
    onSuccess?: () => void;
}

const loanTypes = [
    { value: "PAYABLE", label: "Payable (I owe)" },
    { value: "RECEIVABLE", label: "Receivable (Owed to me)" },
] as const;

const loanStatuses = [
    { value: "ACTIVE", label: "Active" },
    { value: "PAID", label: "Paid" },
    { value: "CLOSED", label: "Closed" },
] as const;

export function LoanForm({ loan, onSuccess }: LoanFormProps) {
    const [isPending, startTransition] = useTransition();

    const form = useForm<LoanInput>({
        resolver: zodResolver(loanSchema),
        defaultValues: {
            name: loan?.name ?? "",
            totalAmount: loan ? String(loan.totalAmount) : "0",
            remainingAmount: loan ? String(loan.remainingAmount) : "0",
            interestRate: loan?.interestRate ?? null,
            dueDate: loan?.dueDate ?? null,
            type: loan?.type ?? "PAYABLE",
            status: loan?.status ?? "ACTIVE",
        },
    });

    const onSubmit = (data: LoanInput) => {
        startTransition(async () => {
            try {
                if (loan) {
                    await updateLoan(loan.id, data);
                    toast.success("Loan updated.");
                } else {
                    await createLoan(data);
                    toast.success("Loan created.");
                }
                onSuccess?.();
            } catch (error) {
                toast.error("Unable to save loan.");
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
                                <Input placeholder="e.g., Car Loan" {...field} />
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
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {loanTypes.map((loanType) => (
                                        <SelectItem key={loanType.value} value={loanType.value}>
                                            {loanType.label}
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
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {loanStatuses.map((status) => (
                                        <SelectItem key={status.value} value={status.value}>
                                            {status.label}
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
                    name="totalAmount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Total Amount</FormLabel>
                            <FormControl>
                                <Input type="number" step="0.01" placeholder="0.00" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="remainingAmount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Remaining Amount</FormLabel>
                            <FormControl>
                                <Input type="number" step="0.01" placeholder="0.00" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="interestRate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Interest Rate (optional)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    value={field.value ? String(field.value) : ""}
                                    onChange={(event) => field.onChange(event.target.value)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Due Date (optional)</FormLabel>
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

                <Button type="submit" disabled={isPending} className="w-full">
                    {isPending ? "Saving..." : loan ? "Update Loan" : "Create Loan"}
                </Button>
            </form>
        </Form>
    );
}
