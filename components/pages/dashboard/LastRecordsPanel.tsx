import Link from "next/link";

type Props = {
    lastExpense: {
        id: number;
        title: string;
        amount: number;
        createdAt: string;
        category: {
            name: string;
            color: string;
        };
    } | null;
    lastBudget: {
        title: string;
        amount: number;
        createdAt: string;
    } | null;
    symbol: string;
};

export default function LastRecordsPanel({ lastExpense, lastBudget, symbol }: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lastExpense && (
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div className="flex justify-between">
                        <p className="text-lg font-medium mb-1">Last Expense</p>
                        <Link href="/expenses"
                            className="nav-btn text-sm">
                            → View all expenses
                        </Link>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{lastExpense.title}</p>
                    <p className="text-sm">
                        <span
                            className="font-semibold"
                            style={{ color: lastExpense.category.color }}
                        >
                            {lastExpense.category.name}
                        </span>{" "}
                        — {symbol}
                        {lastExpense.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(lastExpense.createdAt).toLocaleDateString()}
                    </p>
                </div>
            )}

            {lastBudget && (
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div className="flex justify-between">
                        <p className="text-lg font-medium mb-1">Last Budget</p>
                        <Link href="/budgets"
                            className="nav-btn text-sm">
                            → View all budgets
                        </Link>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{lastBudget.title}</p>
                    <p className="text-sm">
                        {symbol}
                        {lastBudget.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(lastBudget.createdAt).toLocaleDateString()}
                    </p>
                </div>
            )}
        </div>
    );
}
