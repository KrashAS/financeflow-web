"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

interface BarChartData {
    month: string;
    value: number;
}

interface Props {
    data: BarChartData[];
    symbol: string;
}

export default function CustomBarChart({ data, symbol }: Props) {
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
                        axisLine={{ stroke: "var(--color-text-muted)" }}
                    /* tick={{ fill: "var(--color-text-muted)" }} */
                    />
                    <YAxis
                        tickFormatter={(val) => `${symbol}${val.toFixed(0)}`}
                        axisLine={{ stroke: "var(--color-text-muted)" }}
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
                    <Bar dataKey="value"
                        fill="#f87171"
                        radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
