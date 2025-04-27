import WrapperForPage from "@/components/layout/WrapperForPage";
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
        <WrapperForPage>
            <div className="p-6 space-y-6">
                <h1 className="text-2xl font-bold mb-4">Transactions</h1>
                <TransactionsList transactions={transactions} />
            </div >
        </WrapperForPage>
    );
}
