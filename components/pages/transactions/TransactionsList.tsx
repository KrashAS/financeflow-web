import { Transaction } from "@/types/transaction";
import TransactionItem from "./TransactionItem";

interface TransactionsListProps {
    transactions: Transaction[];
}

export default function TransactionsList({ transactions }: TransactionsListProps) {
    if (transactions.length === 0) {
        return <p>No transactions found.</p>;
    }

    return (
        <ul className="space-y-2">
            {transactions.map((transaction) => (
                <TransactionItem key={transaction.id}
                    transaction={transaction} />
            ))}
        </ul>
    );
}