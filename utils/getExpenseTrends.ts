import { prisma } from "@/lib/prisma";
import { endOfMonth, format, startOfMonth, subMonths } from "date-fns";

export async function getExpenseTrends(userId: string, currency: string) {
    const data: {
        month: string;
        expense: number;
        budget: number;
        balance: number;
    }[] = [];

    for (let i = 5; i >= 0; i--) {
        const monthStart = startOfMonth(subMonths(new Date(), i));
        const monthEnd = endOfMonth(monthStart);
        const monthLabel = format(monthStart, "MMM yyyy");

        const expenses = await prisma.expense.aggregate({
            where: {
                userId,
                currency,
                createdAt: { gte: monthStart, lte: monthEnd },
            },
            _sum: { amount: true },
        });

        const budgets = await prisma.budget.aggregate({
            where: {
                userId,
                currency,
                createdAt: { gte: monthStart, lte: monthEnd },
            },
            _sum: { amount: true },
        });

        const expense = expenses._sum.amount ?? 0;
        const budget = budgets._sum.amount ?? 0;

        data.push({
            month: monthLabel,
            expense,
            budget,
            balance: budget - expense,
        });
    }

    return data;
}
