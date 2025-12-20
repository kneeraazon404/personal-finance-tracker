"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { accountSchema, AccountInput } from "@/lib/validations";
import { createAccount, updateAccount } from "@/actions/accounts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

interface AccountFormProps {
    account?: {
        id: string;
        name: string;
        initialAmount: string; // Decimal often passed as string to client
    };
    onSuccess?: () => void;
}

export function AccountForm({ account, onSuccess }: AccountFormProps) {
    const [isPending, startTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(accountSchema),
        defaultValues: {
            name: account?.name || "",
            initialAmount: account?.initialAmount || "0",
        },
    });

    async function onSubmit(data: AccountInput) {
        startTransition(async () => {
            try {
                if (account) {
                    await updateAccount(account.id, data);
                    toast.success("Account updated successfully");
                } else {
                    await createAccount(data);
                    toast.success("Account created successfully");
                }
                onSuccess?.();
            } catch (error) {
                toast.error("Something went wrong");
            }
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Account Name</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Main Checking" {...field} />
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
                            <FormLabel>Initial Balance</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isPending} className="w-full">
                    {isPending ? "Saving..." : account ? "Update Account" : "Create Account"}
                </Button>
            </form>
        </Form>
    );
}
