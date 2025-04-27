import TransactionItem from "./TransactionItem";

interface Transaction {
    id: number;
    userId: string;
    type: "income" | "expense";
    amount: number;
    createdAt: string;
}

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