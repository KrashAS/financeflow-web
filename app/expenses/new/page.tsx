import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import WrapperForPage from "@/components/layout/WrapperForPage";
import ExpenseMultiForm from "@/components/pages/expenses/ExpenseMultiForm";
import SummaryCards from "@/components/ui/cards/SummaryCards";
import { CURRENCIES, DEFAULT_CURRENCY } from "@/constants/currencies";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function NewExpensePage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) return null;

    const userId = session.user.uid;
    const setting = await prisma.userSetting.findUnique({ where: { userId } });
    const currencyCode = setting?.currency ?? DEFAULT_CURRENCY;
    const symbol = CURRENCIES.find(c => c.code === currencyCode)?.symbol || "";

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

    const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
    const totalExpenses = expense.reduce((sum, e) => sum + e.amount, 0);
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
                        <ExpenseMultiForm categories={categories}
                            currency={user.currency} />
                    </>
                )}
            </div>
        </WrapperForPage>
    );
}