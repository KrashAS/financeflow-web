import WrapperForPage from "@/components/layout/WrapperForPage";
import UnauthorizedMessage from "@/components/pages/auth/UnauthorizedMessage";
import BudgetsTable from "@/components/pages/budgets/BudgetsTable";
import SummaryCards from "@/components/ui/cards/SummaryCards";
import { CURRENCIES, DEFAULT_CURRENCY } from "@/constants/currencies";
import { formatDate } from "@/lib/formatDate";
import { prisma } from "@/lib/prisma";
import { FormattedBudget } from "@/types/budget";
import { Budget, Expense } from "@prisma/client";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";



export default async function BudgetsPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) return <UnauthorizedMessage />;

    const userId = session.user.uid;

    const setting = await prisma.userSetting.findUnique({ where: { userId } });
    const currencyCode = setting?.currency || DEFAULT_CURRENCY;
    const currencyInfo = CURRENCIES.find(element => element.code === currencyCode) || CURRENCIES[0];
    const symbol = CURRENCIES.find(element => element.code === currencyCode)?.symbol || "";

    const budgets: Budget[] = await prisma.budget.findMany({
        where: { userId, currency: currencyCode },
        orderBy: { createdAt: "desc" },
    });

    const expenses: Expense[] = await prisma.expense.findMany({
        where: {
            userId,
            currency: currencyCode,
        },
        include: { category: true },
        orderBy: { createdAt: "desc" },
    });

    const formattedBudgets: FormattedBudget[] = budgets.map(({ id, title, amount, createdAt }) => ({
        id,
        name: title,
        amount,
        currencySymbol: currencyInfo.symbol,
        createdAt: formatDate(createdAt),
    }));

    const totalBudget = budgets.reduce((sum: number, element: Budget) => sum + element.amount, 0);
    const totalExpenses = expenses.reduce((sum: number, element: Expense) => sum + element.amount, 0);
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
                <BudgetsTable budgets={formattedBudgets} />
            </div>
        </WrapperForPage>
    );
}