import { CURRENCIES, DEFAULT_CURRENCY } from "@/constants/currencies";
import { authOptions } from "@/lib/auth/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function getDashboardData() {
    const session = await getServerSession(authOptions);
    if (!session?.user) return null;

    const userId = session.user.uid;

    const setting = await prisma.userSetting.findUnique({ where: { userId } });
    const currency = setting?.currency ?? DEFAULT_CURRENCY;
    const symbol = CURRENCIES.find((c) => c.code === currency)?.symbol || "";

    const [budgets, expenses] = await Promise.all([
        prisma.budget.findMany({ where: { userId, currency } }),
        prisma.expense.findMany({
            where: { userId, currency },
            orderBy: { createdAt: "desc" },
            include: { category: true },
        }),
    ]);

    const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const balance = totalBudget - totalExpenses;

    const lastExpense =
        expenses.length > 0
            ? {
                  id: expenses[0].id,
                  title: expenses[0].title,
                  amount: expenses[0].amount,
                  createdAt: expenses[0].createdAt.toISOString(),
                  category: {
                      id: expenses[0].category.id,
                      name: expenses[0].category.name,
                      color: expenses[0].category.color,
                  },
              }
            : null;

    const lastBudget =
        budgets.length > 0
            ? budgets
                  .slice()
                  .sort(
                      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
                  )[0]
            : null;

    return {
        currency,
        symbol,
        totalBudget,
        totalExpenses,
        balance,
        lastExpense,
        lastBudget: lastBudget
            ? {
                  id: lastBudget.id,
                  title: lastBudget.title,
                  amount: lastBudget.amount,
                  createdAt: lastBudget.createdAt.toISOString(),
              }
            : null,
    };
}
