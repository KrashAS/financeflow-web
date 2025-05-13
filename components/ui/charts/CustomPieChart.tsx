"use client";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type CategoryData = {
    name: string;
    value: number;
    color: string;
};

export default function CustomPieChart({ data }: { data: CategoryData[] }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                This pie chart breaks down your expenses by category (e.g., groceries, transport, entertainment).
                The size of each slice reflects how much you spent in that category relative to your total spending.
                Use it to see where your money goes and identify areas where you might want to cut back.
            </p>
            {data.map((element, index) => (
                <div key={index + 1}
                    className="flex items-center space-x-2">
                    <span
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: element.color }}
                    ></span>
                    <span className="text-sm text-gray-700 dark:text-gray-200">{element.name}</span>
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