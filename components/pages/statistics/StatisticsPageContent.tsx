"use client";

import { Button } from "@/components/ui/buttons/Button";
import SummaryCards from "@/components/ui/cards/SummaryCards";
import { CURRENCIES } from "@/constants/currencies";
import { DATE_FILTERS } from "@/constants/filters";
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
    expensesByMonth: { month: string; value: number }[];
}

export default function StatisticsPageContent({
    categories,
    budgets,
    expenses,
    currency,
    expensesByMonth,
}: IProps) {
    const [filter, setFilter] = useState("6m");

    const symbol = CURRENCIES.find(element => element.code === currency)?.symbol || "";

    const totalBudget = useMemo(
        () => budgets.reduce((sum, element) => sum + element.amount, 0),
        [budgets]
    );

    const totalExpenses = useMemo(
        () => expenses.reduce((sum, element) => sum + element.amount, 0),
        [expenses]
    );

    const balance = totalBudget - totalExpenses;

    const pieChartData = useMemo(() => {
        const grouped = new Map<string, { name: string; value: number; color: string }>();
        for (const element of expenses) {
            const cat = categories.find(value => value.id === element.categoryId);
            if (!cat) continue;

            if (!grouped.has(cat.name)) {
                grouped.set(cat.name, { name: cat.name, value: 0, color: cat.color });
            }

            grouped.get(cat.name)!.value += element.amount;
        }
        return Array.from(grouped.values());
    }, [expenses, categories]);

    const lineChartData = useMemo(() => {
        return expenses
            .slice(-10)
            .map(element => ({
                date: new Date(element.createdAt).toLocaleDateString(),
                amount: element.amount,
            }));
    }, [expenses]);

    return (
        <div className="space-y-10">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Select a time range to display your spending statistics:
            </p>
            <div className="flex gap-2 flex-wrap">
                {DATE_FILTERS.map(({ value, label }) => (
                    <Button
                        key={value}
                        className={`btn rounded px-4 py-2 ${filter === value ? "btn-primary" : "btn-secondary"}`}
                        onClickButton={() => setFilter(value)}
                        title={label}
                    />
                ))}
            </div>

            <SummaryCards symbol={symbol}
                totalBudget={totalBudget}
                totalExpenses={totalExpenses}
                balance={balance} />

            <div className="grid grid-cols-1 gap-6">
                <div>
                    <h2 className="text-lg font-semibold mb-2">💡 Expenses by Category</h2>
                    <CustomPieChart data={pieChartData} />
                </div>
                <div>
                    <h2 className="text-lg font-semibold mb-2">📊 Monthly Expenses</h2>
                    <CustomBarChart
                        data={expensesByMonth}
                        symbol={symbol}
                    />
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
