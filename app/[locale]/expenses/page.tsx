import WrapperForPage from "@/components/layout/WrapperForPage";
import UnauthorizedMessage from "@/components/pages/auth/UnauthorizedMessage";
import ExpensesTable from "@/components/pages/expenses/ExpensesTable";
import SummaryCards from "@/components/ui/cards/SummaryCards";
import { CURRENCIES, DEFAULT_CURRENCY } from "@/constants/currencies";
import { authOptions } from "@/lib/auth/authOptions";
import { formatDate } from "@/lib/formatDate";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function ExpensesPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) return <UnauthorizedMessage />;

    const userId = session.user.uid;

    const setting = await prisma.userSetting.findUnique({ where: { userId } });

    const currencyCode = setting?.currency ?? DEFAULT_CURRENCY;
    const symbol = CURRENCIES.find(c => c.code === currencyCode)?.symbol || "";

    const expenses = await prisma.expense.findMany({
        where: {
            userId,
            currency: currencyCode,
        },
        include: { category: true },
        orderBy: { createdAt: "desc" },
    });

    const formattedExpenses = expenses.map(
        ({ id, title, amount, currency, createdAt, category }) => ({
            id,
            title,
            amount,
            currency,
            createdAt: new Date(createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
            }),
            category: {
                ...category,
                createdAt: formatDate(createdAt),
            },
        })
    );

    const budgets = await prisma.budget.findMany({
        where: { userId, currency: currencyCode },
        orderBy: { createdAt: "desc" },
    });
    const totalBudget = budgets.reduce((sum, element) => sum + element.amount, 0);
    const totalExpenses = expenses.reduce((sum, element) => sum + element.amount, 0);
    const balance = totalBudget - totalExpenses;

    return (
        <WrapperForPage>
            <div className="p-6 max-w-3xl mx-auto">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold mb-4">💸 Expenses</h1>
                    {balance <= 0 ? <Link
                        href="/budgets/new"
                        className="btn btn-primary px-4 py-2 rounded-md"
                    >
                        <span className="xs:hidden text-lg">＋</span>
                        <span className="hidden xs:inline">+ Add Budget</span>
                    </Link> : <Link
                        href="/expenses/new"
                        className="btn btn-primary px-4 py-2 rounded-md"
                    >
                        <span className="xs:hidden text-lg">＋</span>
                        <span className="hidden xs:inline">+ Add Expenses</span>
                    </Link>}

                </div>
                {balance <= 0 && <div className="flex items-center justify-between p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg my-6">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        Your budget is insufficient to add more expenses. Please top up your balance.
                    </p>
                </div>}
                <SummaryCards symbol={symbol}
                    totalBudget={totalBudget}
                    totalExpenses={totalExpenses}
                    balance={balance} />
                <ExpensesTable expenses={formattedExpenses}
                    symbol={symbol}
                />
            </div>
        </WrapperForPage >
    );
}