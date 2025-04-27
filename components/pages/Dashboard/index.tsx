"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis, YAxis
} from "recharts";

export const salesData = [
    { name: 'Jan', sales: 4000, profit: 2400 },
    { name: 'Feb', sales: 3000, profit: 1398 },
    { name: 'Mar', sales: 2000, profit: 9800 },
    { name: 'Apr', sales: 2780, profit: 3908 },
    { name: 'May', sales: 1890, profit: 4800 },
    { name: 'Jun', sales: 2390, profit: 3800 },
    { name: 'Jul', sales: 3490, profit: 4300 },
];

export const trafficData = [
    { name: 'Direct', value: 400 },
    { name: 'Referral', value: 300 },
    { name: 'Social', value: 300 },
    { name: 'Organic', value: 200 },
];

export const revenueData = [
    { name: 'Product A', revenue: 2400 },
    { name: 'Product B', revenue: 1398 },
    { name: 'Product C', revenue: 9800 },
    { name: 'Product D', revenue: 3908 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Dashboard() {
    const [period, setPeriod] = useState("month");

    return (
        <div className="p-6 space-y-6">

            <h1 className="text-2xl font-bold">📊 Analytics Dashboard</h1>

            <div className="flex flex-wrap gap-4">
                <Select value={period}
                    onChange={setPeriod}
                    options={["7 days", "month"]}>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <p className="text-sm text-gray-500">Users</p>
                        <p className="text-2xl font-semibold">1,245</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-sm text-gray-500">Revenue</p>
                        <p className="text-2xl font-semibold">$4,900</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-sm text-gray-500">New Signups</p>
                        <p className="text-2xl font-semibold">312</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-sm text-gray-500">Sessions</p>
                        <p className="text-2xl font-semibold">8,413</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* LineChart */}
                <Card>
                    <CardContent className="h-80 mb-10">
                        <h2 className="text-lg font-semibold mb-4">📈 Sales Over Time</h2>
                        <ResponsiveContainer width="100%"
                            height="100%">
                            <LineChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone"
                                    dataKey="sales"
                                    stroke="#8884d8" />
                                <Line type="monotone"
                                    dataKey="profit"
                                    stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* PieChart */}
                <Card>
                    <CardContent className="h-80 mb-10">
                        <h2 className="text-lg font-semibold mb-4">🌐 Traffic Sources</h2>
                        <ResponsiveContainer width="100%"
                            height="100%">
                            <PieChart>
                                <Pie
                                    data={trafficData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label
                                >
                                    {trafficData.map((_, index) => (
                                        <Cell key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* BarChart */}
                <Card>
                    <CardContent className="h-80 mb-10">
                        <h2 className="text-lg font-semibold mb-4">💰 Revenue per Product</h2>
                        <ResponsiveContainer width="100%"
                            height="100%">
                            <BarChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="revenue"
                                    fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
