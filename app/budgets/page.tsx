import WrapperForPage from "@/components/layout/WrapperForPage";
import UnauthorizedMessage from "@/components/pages/auth/UnauthorizedMessage";
import BudgetsList from "@/components/pages/budgets/BudgetsListTable";
import SummaryCards from "@/components/ui/cards/SummaryCards";
import { CURRENCIES, DEFAULT_CURRENCY } from "@/constants/currencies";
import { formatDate } from "@/lib/formatDate";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";


export default async function BudgetsPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) return <UnauthorizedMessage />;

    const userId = session.user.uid;

    const setting = await prisma.userSetting.findUnique({ where: { userId } });
    const currencyCode = setting?.currency || DEFAULT_CURRENCY;
    const currencyInfo = CURRENCIES.find(c => c.code === currencyCode) || CURRENCIES[0];
    const symbol = CURRENCIES.find(c => c.code === currencyCode)?.symbol || "";

    const budgets = await prisma.budget.findMany({
        where: { userId, currency: currencyCode },
        orderBy: { createdAt: "desc" },
    });

    const expenses = await prisma.expense.findMany({
        where: {
            userId,
            currency: currencyCode,
        },
        include: { category: true },
        orderBy: { createdAt: "desc" },
    });

    const formattedBudgets = budgets.map((b) => ({
        id: b.id.toString(),
        name: b.title,
        amount: b.amount,
        currencySymbol: currencyInfo.symbol,
        createdAt: formatDate(b.createdAt),
    }));

    const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const balance = totalBudget - totalExpenses;

    return (
        <WrapperForPage>
            <div className="p-6 max-w-3xl mx-auto">
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
                <SummaryCards symbol={symbol}
                    totalBudget={totalBudget}
                    totalExpenses={totalExpenses}
                    balance={balance} />
                <BudgetsList budgets={formattedBudgets} />
            </div>
        </WrapperForPage>
    );
}