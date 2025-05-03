import WrapperForPage from "@/components/layout/WrapperForPage";
import BudgetsList from "@/components/pages/budgets/BudgetsList";
import { CURRENCIES, DEFAULT_CURRENCY } from "@/constants/currencies";
import { formatDate } from "@/lib/formatDate";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";


export default async function BudgetsPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.uid) {
        redirect("/auth/login");
    }
    const userId = session.user.uid;

    const setting = await prisma.userSetting.findUnique({ where: { userId } });
    const currencyCode = setting?.currency || DEFAULT_CURRENCY;
    const currencyInfo = CURRENCIES.find(c => c.code === currencyCode) || CURRENCIES[0];

    const budgets = await prisma.budget.findMany({
        where: { userId, currency: currencyCode },
        orderBy: { createdAt: "desc" },
    });

    const formattedBudgets = budgets.map((b) => ({
        id: b.id.toString(),
        name: b.title,
        amount: b.amount,
        currencySymbol: currencyInfo.symbol,
        createdAt: formatDate(b.createdAt),
    }));

    return (
        <WrapperForPage>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">📊 Budgets</h1>
                    <Link
                        href="/budgets/new"
                        className="btn btn-primary px-4 py-2 rounded-md flex items-center"
                    >
                        <span className="xs:hidden text-lg">＋</span>
                        <span className="hidden xs:inline">+ Add Budget</span>
                    </Link>
                </div>
                <BudgetsList budgets={formattedBudgets} />
            </div>
        </WrapperForPage>
    );
}