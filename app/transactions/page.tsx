import TransactionsList from "@/components/pages/transactions/TransactionsList";


async function getTransactions() {
    const res = await fetch("http://localhost:3000/api/statistics?userId=42", {
        next: { revalidate: 0 },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch transactions");
    }

    return res.json();
}

export default async function TransactionsPage() {
    const transactions = await getTransactions();

    return (
        <main className="p-0 pt-8 sm:p-4 sm:pt-6 max-w-[1400px] mx-auto">
            <div className="p-6 space-y-6">
                <h1 className="text-2xl font-bold mb-4">Transactions</h1>
                <TransactionsList transactions={transactions} />
            </div >
        </main >
    );
}
