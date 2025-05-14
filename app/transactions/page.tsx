import WrapperForPage from "@/components/layout/WrapperForPage";
import UnauthorizedMessage from "@/components/pages/auth/UnauthorizedMessage";
import TransactionsPageContent from "@/components/pages/transactions/TransactionsPageContent";
import { DEFAULT_CURRENCY } from "@/constants/currencies";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function TransactionsPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) return <UnauthorizedMessage />;
    const userId = session.user.uid;

    const setting = await prisma.userSetting.findUnique({
        where: { userId },
    });

    const currency = setting?.currency || DEFAULT_CURRENCY;

    const transactions = await prisma.transaction.findMany({
        where: {
            userId,
            currency,
        },
        orderBy: { createdAt: "desc" },
        include: { category: true },
    });

    return (
        <WrapperForPage>
            <div className="p-6 max-w-6xl mx-auto space-y-6">
                <h1 className="text-2xl font-bold mb-4">📄 Transactions</h1>
                <p className="text-gray-600 dark:text-gray-300">
                    Below is a list of all your financial transactions sorted by date.
                </p>
                <TransactionsPageContent transactions={transactions} />
            </div>
        </WrapperForPage>
    );
}