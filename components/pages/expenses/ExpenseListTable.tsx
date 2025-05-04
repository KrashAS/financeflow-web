"use client";

import { CURRENCIES } from "@/constants/currencies";

interface Category {
    id: number;
    name: string;
    color: string;
}

interface Expense {
    id: number;
    title: string;
    amount: number;
    currency: string;
    createdAt: string;
    category: Category;
}

interface Props {
    expenses: Expense[];
}

export default function ExpenseListTable({ expenses }: Props) {
    if (!expenses.length) {
        return <p className="text-gray-500">No expenses found.</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--color-border-default)] dark:divide-[var(--color-dark-border-default)] bg-[var(--color-bg)] dark:bg-[var(--color-dark-bg)] rounded-md overflow-hidden">
                <thead className="bg-gray-100 dark:bg-[var(--color-dark-bg)]">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-gray)] dark:text-[var(--color-dark-text-gray)] uppercase tracking-wider">
                            Title
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-[var(--color-text-gray)] dark:text-[var(--color-dark-text-gray)] uppercase tracking-wider">
                            Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-gray)] dark:text-[var(--color-dark-text-gray)] uppercase tracking-wider">
                            Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-gray)] dark:text-[var(--color-dark-text-gray)] uppercase tracking-wider">
                            Date
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-[var(--color-dark-bg)] divide-y divide-[var(--color-border-default)] dark:divide-[var(--color-dark-border-default)]">
                    {expenses.map((expense) => {
                        const symbol = CURRENCIES.find(c => c.code === expense.currency)?.symbol || '';
                        return (
                            <tr key={expense.id}
                                className="hover:bg-gray-50 dark:hover:bg-[var(--color-dark-border-default)]">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--color-foreground)] dark:text-[var(--color-dark-foreground)]">
                                    {expense.title}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-[var(--color-text-muted)] dark:text-[var(--color-dark-text-muted)]">
                                    {`${expense.amount.toFixed(2)} (${expense.currency}, ${symbol})`}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-text-muted)] dark:text-[var(--color-dark-text-muted)] flex items-center gap-2">
                                    <span
                                        className="inline-block w-3 h-3 rounded-full"
                                        style={{ backgroundColor: expense.category.color }}
                                    ></span>
                                    {expense.category.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-text-muted-light)] dark:text-[var(--color-dark-text-muted)]">
                                    {expense.createdAt}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
