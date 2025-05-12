"use client";

import { Button } from "@/components/ui/buttons/Button";
import SummaryCards from "@/components/ui/cards/SummaryCards";
import { CURRENCIES } from "@/constants/currencies";
import { DATE_FILTERS, DATE_FILTER_DEFAULT } from "@/constants/filters";
import { DateFilter } from "@/types/filters";
import { groupByMonth } from "@/utils/groupByMonth";
import { Budget, Expense, ExpenseCategory } from "@prisma/client";
import { useMemo, useState } from "react";
import CustomBarChart from "../../ui/charts/CustomBarChart";
import CustomLineChart from "../../ui/charts/CustomLineChart";
import CustomPieChart from "../../ui/charts/CustomPieChart";

interface IProps {
    currency: string;
    expenses: Expense[];
    budgets: Budget[];
    categories: ExpenseCategory[];
}

export default function StatisticsPageContent({
    categories,
    budgets,
    expenses,
    currency,
}: IProps) {
    const [filter, setFilter] = useState<DateFilter>(DATE_FILTER_DEFAULT);
    const symbol = CURRENCIES.find(e => e.code === currency)?.symbol || "";

    const periodStart = useMemo(() => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth() - filter.months + 1, 1);
    }, [filter.months]);

    const filteredExpenses = useMemo(() =>
        expenses.filter(e => new Date(e.createdAt) >= periodStart), [expenses, periodStart]);

    const filteredBudgets = useMemo(() =>
        budgets.filter(b => new Date(b.createdAt) >= periodStart), [budgets, periodStart]);

    const totalExpenses = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
    const totalBudget = filteredBudgets.reduce((sum, b) => sum + b.amount, 0);
    const balance = totalBudget - totalExpenses;

    const pieChartData = useMemo(() => {
        const grouped = new Map<string, { name: string; value: number; color: string }>();
        for (const expense of filteredExpenses) {
            const category = categories.find(c => c.id === expense.categoryId);
            if (!category) continue;
            if (!grouped.has(category.name)) {
                grouped.set(category.name, { name: category.name, value: 0, color: category.color });
            }
            grouped.get(category.name)!.value += expense.amount;
        }
        return Array.from(grouped.values());
    }, [filteredExpenses, categories]);

    const barChartData = useMemo(() =>
        groupByMonth(filteredExpenses, filter.months), [filteredExpenses, filter]);

    const lineChartData = useMemo(() => {
        const map = new Map<string, number>();

        for (const e of filteredExpenses) {
            const key = new Date(e.createdAt).toLocaleDateString("en-GB");
            map.set(key, (map.get(key) || 0) + e.amount);
        }

        return Array.from(map.entries())
            .map(([date, amount]) => ({ date, amount }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, [filteredExpenses]);

    return (
        <div className="space-y-10">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Select a time range to display your spending statistics:
            </p>

            <div className="flex gap-2 flex-wrap">
                {DATE_FILTERS.map((option) => (
                    <Button
                        key={option.value}
                        className={`btn rounded px-4 py-2 ${filter.value === option.value ? "btn-primary" : "btn-secondary"}`}
                        onClickButton={() => setFilter(option)}
                        title={option.label}
                    />
                ))}
            </div>

            <SummaryCards
                symbol={symbol}
                totalBudget={totalBudget}
                totalExpenses={totalExpenses}
                balance={balance}
            />

            <div className="grid grid-cols-1 gap-6">
                <div>
                    <h2 className="text-lg font-semibold mb-2">💡 Expenses by Category</h2>
                    <CustomPieChart data={pieChartData} />
                </div>
                <div>
                    <h2 className="text-lg font-semibold mb-2">📊 Monthly Expenses</h2>
                    <CustomBarChart data={barChartData}
                        symbol={symbol} />
                </div>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-2">📈 Expense Trends</h2>
                <CustomLineChart data={lineChartData}
                    symbol={symbol} />
            </div>
        </div>
    );
}
