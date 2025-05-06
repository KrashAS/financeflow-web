import WrapperForPage from "@/components/layout/WrapperForPage";
import UnauthorizedMessage from "@/components/pages/auth/UnauthorizedMessage";
import EmptyDashboardInfo from "@/components/pages/dashboard_temp/EmptyDashboardInfo";
import ExpensesBarChart from "@/components/pages/dashboard_temp/ExpensesBarChart";
import ExpensesLineChart from "@/components/pages/dashboard_temp/ExpensesLineChart";
import ExpensesPieChart from "@/components/pages/dashboard_temp/ExpensesPieChart";
import LastRecordsPanel from "@/components/pages/dashboard_temp/LastRecordsPanel";
import SummaryCards from "@/components/ui/cards/SummaryCards";
import { DEFAULT_CURRENCY } from "@/constants/currencies";
import { prisma } from "@/lib/prisma";
import { getDashboardData } from "@/utils/getDashboardData";
import { getExpenseTrends } from "@/utils/getExpenseTrends";
import { startOfMonth, subMonths } from "date-fns";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) return <UnauthorizedMessage />;

    const data = await getDashboardData();
    if (!data) return null;


    const { symbol, totalBudget, totalExpenses, balance, lastExpense, lastBudget } = data;
    const userId = session.user.uid;

    const userSetting = await prisma.userSetting.findUnique({
        where: { userId },
    });
    const userCurrency = userSetting?.currency ?? DEFAULT_CURRENCY;

    const expensesByCategory = await prisma.expense.groupBy({
        by: ["categoryId"],
        where: { userId, currency: userCurrency },
        _sum: { amount: true },
    });

    const categories = await prisma.expenseCategory.findMany({
        where: { userId },
        select: { id: true, name: true, color: true },
    });

    const chartData = expensesByCategory.map(item => {
        const category = categories.find(c => c.id === item.categoryId);
        return {
            name: category?.name || "Unknown",
            value: item._sum.amount || 0,
            color: category?.color || "#ccc",
        };
    });

    const start = startOfMonth(subMonths(new Date(), 5));
    const monthlyExpensesRaw = await prisma.expense.findMany({
        where: { userId, currency: userCurrency, createdAt: { gte: start } },
        select: { amount: true, createdAt: true },
    });

    const trendData = await getExpenseTrends(userId, userSetting?.currency ?? '');

    if (!totalBudget) return <EmptyDashboardInfo />

    return (
        <WrapperForPage>
            <div className="p-6 max-w-4xl mx-auto space-y-6">
                <h1 className="text-2xl font-bold">📊 Analytics Dashboard</h1>

                <SummaryCards symbol={symbol}
                    totalBudget={totalBudget}
                    totalExpenses={totalExpenses}
                    balance={balance} />

                <LastRecordsPanel
                    lastExpense={lastExpense}
                    lastBudget={lastBudget}
                    symbol={symbol}
                />

                <ExpensesPieChart data={chartData} />
                <ExpensesBarChart monthlyExpensesRaw={monthlyExpensesRaw}
                    symbol={symbol} />
                <ExpensesLineChart data={trendData}
                    symbol={symbol} />
            </div>

        </WrapperForPage>
    )
}