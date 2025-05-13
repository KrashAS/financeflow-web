"use client";

import { ExpenseCategory, Transaction } from "@prisma/client";

type Props = {
    transactions: (Transaction & { category: ExpenseCategory | null })[];
};

export default function TransactionsPageContent({ transactions }: Props) {
    return (
        <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
                Below is a list of all your financial transactions sorted by date.
            </p>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                    <thead>
                        <tr>
                            <th className="p-2">Date</th>
                            <th className="p-2">Title</th>
                            <th className="p-2">Type</th>
                            <th className="p-2">Category</th>
                            <th className="p-2 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(tx => (
                            <tr key={tx.id}
                                className="border-t">
                                <td className="p-2">{new Date(tx.createdAt).toLocaleDateString()}</td>
                                <td className="p-2">{tx.title}</td>
                                <td className="p-2">{tx.type}</td>
                                <td className="p-2">{tx.category?.name || "-"}</td>
                                <td className="p-2 text-right">{tx.amount.toFixed(2)} {tx.currency}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
