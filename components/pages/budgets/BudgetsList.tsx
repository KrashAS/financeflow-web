"use client";




interface Budget {
    id: string;
    name: string;
    amount: number;
    createdAt: string;
    currencySymbol: string;
}

interface BudgetsListProps {
    budgets: Budget[];
}

export default function BudgetsList({ budgets }: BudgetsListProps) {
    if (budgets.length === 0) {
        return <p className="text-gray-500 dark:text-[var(--color-dark-text-muted)]">No budgets yet.</p>;
    }

    const total = budgets.reduce((sum, b) => sum + b.amount, 0).toFixed(2);
    const currencySymbol = budgets[0]?.currencySymbol || "";
    console.log(budgets[0]?.currencySymbol);

    return (
        <div className="overflow-x-auto ">
            {budgets && (
                <p className="mb-4 text-sm text-gray-600 dark:text-[var(--color-dark-text-muted)]">
                    Total: {total} {currencySymbol}
                </p>
            )}
            <table className="min-w-full divide-y divide-[var(--color-border-default)] dark:divide-[var(--color-dark-border-default)] bg-[var(--color-bg)] dark:bg-[var(--color-dark-bg)] overflow-hidden rounded-xl">
                <thead className="bg-gray-100 dark:bg-[var(--color-dark-bg)]">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-gray)] dark:text-[var(--color-dark-text-gray)] uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-[var(--color-text-gray)] dark:text-[var(--color-dark-text-gray)] uppercase tracking-wider">
                            Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-gray)] dark:text-[var(--color-dark-text-gray)] uppercase tracking-wider">
                            Created At
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border-default)] dark:divide-[var(--color-dark-border-default)]">
                    {budgets.map((budget) => (
                        <tr
                            key={budget.id}
                            className="hover:bg-gray-50 dark:hover:bg-[var(--color-dark-border-default)] transition-colors"
                        >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--color-foreground)] dark:text-[var(--color-dark-foreground)]">
                                {budget.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-text-muted)] dark:text-[var(--color-dark-text-muted)] text-right">
                                {budget.amount.toFixed(2)} {currencySymbol}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-text-muted-light)] dark:text-[var(--color-dark-text-muted)]">
                                {budget.createdAt}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

