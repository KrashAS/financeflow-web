"use client";

import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type TrendData =
    | { month: string; expense: number; budget: number; balance: number }
    | { date: string; amount: number };

interface Props {
    data: TrendData[];
    symbol: string;
}

export default function CustomLineChart({ data, symbol }: Props) {
    const isSimple = data.length > 0 && "amount" in data[0];

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-lg font-semibold mb-2">📈 Spending & Balance Trend</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Overview of your budget, expenses, and remaining balance over time.
            </p>

            <ResponsiveContainer width="100%"
                height={300}>
                <LineChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3"
                        stroke="#e2e8f0" />
                    <XAxis
                        dataKey={isSimple ? "date" : "month"}
                        axisLine={{ stroke: "var(--color-text-muted)" }}
                    /* tick={{ fill: "var(--color-text-muted)" }} */
                    />
                    <YAxis
                        tickFormatter={(val) => `${symbol}${val.toFixed(0)}`}
                    /* tick={{ fill: "var(--color-text-muted)" }} */
                    />
                    <Tooltip
                        formatter={(value: number) => `${symbol}${value.toFixed(2)}`}
                        contentStyle={{
                            backgroundColor: "var(--color-bg)",
                            border: "none",
                            color: "var(--color-foreground)",
                        }}
                        itemStyle={{ color: "var(--color-foreground)" }}
                    />
                    <Legend />

                    {isSimple && (
                        <Line
                            type="monotone"
                            dataKey="amount"
                            stroke="#f87171"
                            strokeWidth={2}
                            name="Expenses"
                        />
                    )}

                    {!isSimple && (
                        <Line
                            type="monotone"
                            dataKey="budget"
                            stroke="#0ea5e9"
                            strokeWidth={2}
                            name="Budget"
                        />
                    )}
                    {!isSimple && (
                        <Line
                            type="monotone"
                            dataKey="expense"
                            stroke="#f87171"
                            strokeWidth={2}
                            name="Expenses"
                        />
                    )}
                    {!isSimple && (
                        <Line
                            type="monotone"
                            dataKey="balance"
                            stroke="#10b981"
                            strokeWidth={2}
                            name="Balance"
                        />
                    )}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
