export type AccountBalance = {
    id: string;
    name: string;
    initialAmount: number;
    currentBalance: number;
    date: Date;
    userId: string;
};

export type BudgetWithProgress = {
    id: string;
    amount: number;
    spent: number;
    percentage: number;
    categoryId: string;
    category: {
        id: string;
        name: string;
        color: string;
        icon?: string | null;
    };
};

export type CategorySummary = {
    id: string;
    name: string;
    color: string;
    icon: string | null;
};

export type GoalProgress = {
    id: string;
    name: string;
    type: "INVESTMENT" | "REVENUE_TARGET" | "SAVINGS";
    initialAmount: number;
    targetAmount: number;
    currentAmount: number;
    progressPercent: number;
    completed: boolean;
    date: Date;
    userId: string;
    accountId: string | null;
};

export type LoanSummary = {
    id: string;
    name: string;
    totalAmount: number;
    remainingAmount: number;
    interestRate: number | null;
    dueDate: Date | null;
    type: "PAYABLE" | "RECEIVABLE";
    status: "ACTIVE" | "PAID" | "CLOSED";
};

export type SubscriptionSummary = {
    id: string;
    name: string;
    cost: number;
    date: Date;
    status: "ACTIVE" | "INACTIVE";
    billing: "MONTHLY" | "YEARLY";
};

export type TransactionSummary = {
    id: string;
    name: string;
    amount: number;
    date: Date;
    fromAccountId: string;
    toAccountId: string;
    goalId?: string | null;
    fromAccount: {
        id: string;
        name: string;
    };
    toAccount: {
        id: string;
        name: string;
    };
    goal?: {
        id: string;
        name: string;
    } | null;
};
