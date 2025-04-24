'use client'
import { Card, CardContent } from "@/components/ui/Card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";

import { useState } from "react";

export default function Dashboard() {
    const [period, setPeriod] = useState("month");

    return (
        <div className="p-6 space-y-6">

            <h1 className="text-2xl font-bold pl-4">📊 Analytics Dashboard</h1>

            <div className="flex flex-wrap gap-4">
                <Select value={period}
                    onChange={setPeriod}
                    options={["7 days", "30 days"]}
                    placeholder="Select period">
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
        </div>
    );
}
