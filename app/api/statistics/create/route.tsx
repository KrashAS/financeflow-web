import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId, type, amount } = await req.json();
        if (!userId || !type || typeof amount !== "number") {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const stat = await prisma.statistic.create({
            data: { userId, type, amount },
        });

        return NextResponse.json(stat);
    } catch (e) {
        console.error("API Error >", e);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}
