import WrapperForPage from "@/components/layout/WrapperForPage";
import UnauthorizedMessage from "@/components/pages/auth/UnauthorizedMessage";
import TransactionsPageContent from "@/components/pages/transactions/TransactionsPageContent";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function TransactionsPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) return <UnauthorizedMessage />;
    const userId = session.user.uid;

    const transactions = await prisma.transaction.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        include: { category: true },
    });

    return (
        <WrapperForPage>
            <div className="p-6 max-w-6xl mx-auto space-y-6">
                <h1 className="text-2xl font-bold">📄 Transactions</h1>
                <TransactionsPageContent transactions={transactions} />
            </div>
        </WrapperForPage>
    );
}