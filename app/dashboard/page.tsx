import WrapperForPage from "@/components/layout/WrapperForPage";
import ExpensesBarChart from "@/components/pages/Dashboard/ExpensesBarChart";
import ExpensesLineChart from "@/components/pages/Dashboard/ExpensesLineChart";
import ExpensesPieChart from "@/components/pages/Dashboard/ExpensesPieChart";
import SummaryCards from "@/components/ui/cards/SummaryCards";
import { DEFAULT_CURRENCY } from "@/constants/currencies";
import { prisma } from "@/lib/prisma";
import { getDashboardData } from "@/utils/getDashboardData";
import { getExpenseTrends } from "@/utils/getExpenseTrends";
import { startOfMonth, subMonths } from "date-fns";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) return null;

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

    return (
        <WrapperForPage>
            <div className="p-6 max-w-4xl mx-auto space-y-6">
                <h1 className="text-2xl font-bold">📊 Analytics Dashboard</h1>

                <SummaryCards symbol={symbol}
                    totalBudget={totalBudget}
                    totalExpenses={totalExpenses}
                    balance={balance} />

                {lastExpense && (
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                        <div className="flex justify-between">
                            <p className="text-lg font-medium mb-1">Last Expense</p>
                            <Link href="/expenses"
                                className="nav-btn text-sm">
                                → View all expenses
                            </Link>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{lastExpense.title}</p>
                        <p className="text-sm">
                            <span className="font-semibold"
                                style={{ color: lastExpense.category.color }}>
                                {lastExpense.category.name}
                            </span>{" "}
                            — {symbol}{lastExpense.amount.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(lastExpense.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                )}

                {lastBudget && (
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                        <div className="flex justify-between">
                            <p className="text-lg font-medium mb-1">Last Budget</p>
                            <Link href="/budgets"
                                className="nav-btn text-sm">
                                → View all budgets
                            </Link>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-300">{lastBudget.title}</p>
                        <p className="text-sm">
                            {symbol}{lastBudget.amount.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(lastBudget.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                )}

                <ExpensesPieChart data={chartData} />
                <ExpensesBarChart monthlyExpensesRaw={monthlyExpensesRaw}
                    symbol={symbol} />
                <ExpensesLineChart data={trendData}
                    symbol={symbol} />
            </div>

        </WrapperForPage>
    )
}