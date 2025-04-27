import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId, revenue, users, profit } = await req.json();

        if (!userId || !revenue || !users || !profit) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const [stat1, stat2, stat3] = await Promise.all([
            prisma.statistic.create({
                data: { userId, type: "revenue", amount: parseFloat(revenue) },
            }),
            prisma.statistic.create({
                data: { userId, type: "users", amount: parseFloat(users) },
            }),
            prisma.statistic.create({
                data: { userId, type: "profit", amount: parseFloat(profit) },
            }),
        ]);

        return NextResponse.json({ revenue: stat1, users: stat2, profit: stat3 });
    } catch (error) {
        console.error("API Error >", error);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}
