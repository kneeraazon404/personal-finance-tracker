export function formatCurrency(
    amount: number | string,
    options: { compact?: boolean } = {}
) {
    const value = typeof amount === "string" ? parseFloat(amount) : amount;

    const formatted = new Intl.NumberFormat("en-IN", {
        notation: options.compact ? "compact" : "standard",
        maximumFractionDigits: options.compact ? 1 : 2,
        minimumFractionDigits: options.compact ? 0 : 2,
    }).format(value);

    return `Rs. ${formatted}`;
}

export function formatDate(date: Date | string) {
    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}
