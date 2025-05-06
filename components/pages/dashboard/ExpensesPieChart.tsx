"use client";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type CategoryData = {
    name: string;
    value: number;
    color: string;
};

export default function ExpensesPieChart({ data }: { data: CategoryData[] }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-2">Expenses by Category</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                This pie chart shows how your expenses are distributed across different categories.
            </p>
            {data.map((cat, i) => (
                <div key={i + 1}
                    className="flex items-center space-x-2">
                    <span
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: cat.color }}
                    ></span>
                    <span className="text-sm text-gray-700 dark:text-gray-200">{cat.name}</span>
                </div>
            ))}
            <ResponsiveContainer width="100%"
                height={300}>
                <PieChart>
                    <Pie
                        dataKey="value"
                        isAnimationActive
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={index}
                                fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div >
    );
}