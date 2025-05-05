import { Transaction } from "@/types/transaction";

interface TransactionItemProps {
    transaction: Transaction;
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
    return (
        <li className="border p-4 rounded-md shadow-sm">
            <div className="flex justify-between">
                <span className="font-semibold capitalize">{transaction.type}</span>
                <span>${transaction.amount.toFixed(2)}</span>
            </div>
            <div className="text-sm text-gray-500">
                {new Date(transaction.createdAt).toLocaleString()}
            </div>
        </li>
    );
}

