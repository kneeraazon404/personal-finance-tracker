import { z } from "zod";
import Decimal from "decimal.js";

// Custom decimal transformer for money
const moneySchema = z
    .string()
    .or(z.number())
    .transform((val) => new Decimal(val).toFixed(2))
    .refine((val) => parseFloat(val) >= 0, "Amount must be positive");

export const accountSchema = z.object({
    name: z.string().min(1, "Account name is required").max(100),
    initialAmount: moneySchema,
    date: z.coerce.date().optional(),
});

export const incomeSchema = z.object({
    name: z.string().min(1, "Income name is required").max(100),
    amount: moneySchema,
    date: z.coerce.date(),
    notes: z.string().max(1000).optional(),
    accountId: z.string().cuid(),
});

export const expenseSchema = z.object({
    name: z.string().min(1, "Expense name is required").max(100),
    amount: moneySchema,
    date: z.coerce.date(),
    notes: z.string().max(1000).optional(),
    accountId: z.string().cuid(),
    categoryId: z.string().cuid().optional(),
});

export const transactionSchema = z.object({
    name: z.string().min(1, "Transaction name is required").max(100),
    amount: moneySchema,
    date: z.coerce.date(),
    fromAccountId: z.string().cuid(),
    toAccountId: z.string().cuid(),
    goalId: z.string().cuid().optional(),
}).refine(
    (data) => data.fromAccountId !== data.toAccountId,
    { message: "Cannot transfer to the same account", path: ["toAccountId"] }
);

export const subscriptionSchema = z.object({
    name: z.string().min(1, "Subscription name is required").max(100),
    cost: moneySchema,
    date: z.coerce.date(),
    status: z.enum(["ACTIVE", "INACTIVE"]),
    billing: z.enum(["MONTHLY", "YEARLY"]),
});

export const goalSchema = z.object({
    name: z.string().min(1, "Goal name is required").max(100),
    initialAmount: moneySchema,
    targetAmount: moneySchema,
    date: z.coerce.date(),
    type: z.enum(["INVESTMENT", "REVENUE_TARGET", "SAVINGS"]),
    accountId: z.string().cuid().optional(),
});

export const categorySchema = z.object({
    name: z.string().min(1, "Category name is required").max(50),
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid hex color"),
    icon: z.string().max(50).optional(),
});

// Type exports
export type AccountInput = z.infer<typeof accountSchema>;
export type IncomeInput = z.infer<typeof incomeSchema>;
export type ExpenseInput = z.infer<typeof expenseSchema>;
export type TransactionInput = z.infer<typeof transactionSchema>;
export type SubscriptionInput = z.infer<typeof subscriptionSchema>;
export type GoalInput = z.infer<typeof goalSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
