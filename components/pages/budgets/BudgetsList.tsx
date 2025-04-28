"use client";

import { formatDate } from "@/lib/formatDate";

interface Budget {
    id: string;
    name: string;
    amount: number;
    createdAt: string;
}

interface BudgetsListProps {
    budgets: Budget[];
}

export default function BudgetsList({ budgets }: BudgetsListProps) {
    if (budgets.length === 0) {
        return <p className="text-gray-500">No budgets yet.</p>;
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {budgets.map((budget) => (
                <div key={budget.id}
                    className="rounded-xl border p-4 shadow-sm bg-white hover:shadow-md transition">
                    <h2 className="text-lg font-semibold">{budget.name}</h2>
                    <p className="text-2xl font-bold mt-2">${budget.amount.toFixed(2)}</p>
                    <p className="text-xs text-gray-400 mt-2">
                        Created {formatDate(new Date(budget.createdAt), "dd MMM yyyy")}
                    </p>
                </div>
            ))}
        </div>
    );
}
