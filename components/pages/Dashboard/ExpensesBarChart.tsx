"use client";
import { format, subMonths } from "date-fns";

import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

interface MonthlyData {
    createdAt: Date;
    amount: number;
}

interface ExpensesBarChartProps {
    monthlyExpensesRaw: MonthlyData[];
    symbol: string;
}

export default function ExpensesBarChart({
    monthlyExpensesRaw,
    symbol,
}: ExpensesBarChartProps) {

    const monthsMap = new Map<string, number>();
    for (let i = 5; i >= 0; i--) {
        const d = subMonths(new Date(), i);
        const key = format(d, "MMM yyyy");
        monthsMap.set(key, 0);
    }

    monthlyExpensesRaw.forEach(({ amount, createdAt }) => {
        const key = format(createdAt, "MMM yyyy");
        if (monthsMap.has(key)) monthsMap.set(key, monthsMap.get(key)! + amount);
    });

    const data = Array.from(monthsMap, ([month, value]) => ({ month, value }));



    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow space-y-4">
            <div>
                <h2 className="text-xl font-semibold mb-2">Monthly Expenses</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    This bar chart shows your total expenses for each of the last 6 months.
                </p>
            </div>

            <ResponsiveContainer width="100%"
                height={300}>
                <BarChart data={data}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3"
                        stroke="#e2e8f0" />
                    <XAxis
                        dataKey="month"
                        /* tick={{ fill: "var(--color-brand)" }} */
                        axisLine={{ stroke: "var(--color-text-muted)" }}
                    />
                    <YAxis
                        tickFormatter={(val) => `${symbol}${val.toFixed(0)}`}
                        /* tick={{ fill: "var(--color-brand)" }} */
                        axisLine={{ stroke: "var(--color-text-muted)" }}
                    />
                    <Tooltip
                        formatter={(value: number) => `${symbol}${value.toFixed(2)}`}
                        contentStyle={{
                            backgroundColor: "var(--color-bg)",
                            border: "none",
                            color: "var(--color-foreground)",
                        }}
                        itemStyle={{
                            color: "var(--color-foreground)",
                        }}
                    />
                    <Bar dataKey="value"
                        fill="#f87171"
                        radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}