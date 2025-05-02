import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.uid) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.uid;

    const { title, amount } = await req.json();
    if (!title || typeof amount !== "number" || amount <= 0) {
        return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    try {
        const newBudget = await prisma.budget.create({
            data: { title, amount, userId },
        });
        return NextResponse.json(newBudget, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
