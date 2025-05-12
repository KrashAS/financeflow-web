import WrapperForPage from "@/components/layout/WrapperForPage";
import UnauthorizedMessage from "@/components/pages/auth/UnauthorizedMessage";
import StatisticsPageContent from "@/components/pages/statistics/StatisticsPageContent";
import { DEFAULT_CURRENCY } from "@/constants/currencies";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function StatisticsPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) return <UnauthorizedMessage />;

    const userId = session.user.uid;

    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth() - 11, 1);

    const [setting, expenses, budgets, categories] = await Promise.all([
        prisma.userSetting.findUnique({ where: { userId } }),
        prisma.expense.findMany({
            where: {
                userId,
                createdAt: { gte: startDate },
            },
            include: { category: true },
        }),
        prisma.budget.findMany({
            where: {
                userId,
                createdAt: { gte: startDate },
            },
        }),
        prisma.expenseCategory.findMany({ where: { userId } }),
    ]);

    const currency = setting?.currency || DEFAULT_CURRENCY;

    const filteredExpenses = expenses.filter(e => e.currency === currency);
    const filteredBudgets = budgets.filter(b => b.currency === currency);

    return (
        <WrapperForPage>
            <div className="p-6 max-w-7xl mx-auto space-y-6">
                <div className="flex justify-between mb-4 items-center">
                    <h1 className="text-2xl font-bold mb-4">📈 Statistics</h1>
                </div>

                <StatisticsPageContent
                    currency={currency}
                    expenses={filteredExpenses}
                    budgets={filteredBudgets}
                    categories={categories}
                />
            </div>
        </WrapperForPage>
    );
}
