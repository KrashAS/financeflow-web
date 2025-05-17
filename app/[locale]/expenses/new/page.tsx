import WrapperForPage from "@/components/layout/WrapperForPage";
import UnauthorizedMessage from "@/components/pages/auth/UnauthorizedMessage";
import ExpenseMultiForm from "@/components/pages/expenses/ExpenseMultiForm";
import SummaryCards from "@/components/ui/cards/SummaryCards";
import { CURRENCIES, DEFAULT_CURRENCY } from "@/constants/currencies";
import { authOptions } from "@/lib/auth/authOptions";
import { formatDate } from "@/lib/formatDate";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function NewExpensePage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) return <UnauthorizedMessage />;

    const userId = session.user.uid;
    const setting = await prisma.userSetting.findUnique({ where: { userId } });
    const currencyCode = setting?.currency ?? DEFAULT_CURRENCY;
    const symbol = CURRENCIES.find(element => element.code === currencyCode)?.symbol || "";

    const [budgets, expense, categories, user] = await Promise.all([

        prisma.budget.findMany({ where: { userId, currency: currencyCode } }),
        prisma.expense.findMany({ where: { userId, currency: currencyCode } }),
        prisma.expenseCategory.findMany({
            where: { userId: session.user.uid },
            orderBy: { createdAt: "asc" },
        }),
        prisma.userSetting.findUnique({
            where: { userId: session.user.uid },
            select: { currency: true },
        }),
    ]);

    const formattedCategories = categories.map(({ createdAt, ...rest }) => ({
        ...rest,
        createdAt: formatDate(createdAt),
    }));

    const totalBudget = budgets.reduce((sum, element) => sum + element.amount, 0);
    const totalExpenses = expense.reduce((sum, element) => sum + element.amount, 0);
    const balance = totalBudget - totalExpenses;

    if (!user?.currency) {
        throw new Error("User currency not found");
    }

    return (
        <WrapperForPage>
            <div className="p-6 max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">➕ Add Multiple Expenses</h1>
                {totalBudget <= 0 ? (
                    <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg text-center">
                        <p className="mb-4 text-yellow-800 dark:text-yellow-200">
                            You have no budget or your budget is exhausted.
                        </p>
                        <Link
                            href="/budgets/new"
                            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            + Add Budget
                        </Link>
                    </div>
                ) : (
                    <>
                        <SummaryCards symbol={symbol}
                            totalBudget={totalBudget}
                            totalExpenses={totalExpenses}
                            balance={balance} />
                        <ExpenseMultiForm categories={formattedCategories}
                            currency={user.currency} />
                    </>
                )}
            </div>
        </WrapperForPage>
    );
}