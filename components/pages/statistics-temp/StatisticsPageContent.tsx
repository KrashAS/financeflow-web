"use client";

import SummaryCards from "@/components/ui/cards/SummaryCards";
import { CURRENCIES } from "@/constants/currencies";
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

    const symbol = CURRENCIES.find(c => c.code === currency)?.symbol || "";

    const totalBudget = useMemo(
        () => budgets.reduce((sum, b) => sum + b.amount, 0),
        [budgets]
    );

    const totalExpenses = useMemo(
        () => expenses.reduce((sum, e) => sum + e.amount, 0),
        [expenses]
    );

    const balance = totalBudget - totalExpenses;

    const pieChartData = useMemo(() => {
        const grouped = new Map<string, { name: string; value: number; color: string }>();
        for (const e of expenses) {
            const cat = categories.find(c => c.id === e.categoryId);
            if (!cat) continue;

            if (!grouped.has(cat.name)) {
                grouped.set(cat.name, { name: cat.name, value: 0, color: cat.color });
            }

            grouped.get(cat.name)!.value += e.amount;
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

    console.log("lineChartData", lineChartData);


    return (
        <div className="space-y-10">
            <div className="flex gap-4 flex-wrap mb-4">
                {["1m", "3m", "6m", "12m"].map((range) => (
                    <button
                        key={range}
                        className={`btn ${filter === range ? "btn-primary" : "btn-secondary"}`}
                        onClick={() => setFilter(range)}
                    >
                        {range.toUpperCase()}
                    </button>
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
