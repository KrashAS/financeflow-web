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
        const setting = await prisma.userSetting.findUnique({
            where: { userId },
        });

        const currency = setting?.currency ?? "USD";

        const newBudget = await prisma.budget.create({
            data: { title, amount, userId, currency },
        });

        return NextResponse.json(newBudget, { status: 201 });
    } catch (err) {
        console.error("Create Budget Error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.uid) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.uid;
    const { id, title, amount } = await req.json();

    const numericId = Number(id);

    if (!numericId || !title || typeof amount !== "number" || amount <= 0) {
        return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    try {
        const budget = await prisma.budget.findUnique({
            where: { id: numericId },
        });

        if (!budget || budget.userId !== userId) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        const updatedBudget = await prisma.budget.update({
            where: { id: numericId },
            data: { title, amount },
        });

        return NextResponse.json(updatedBudget);
    } catch (err) {
        console.error("Update Budget Error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.uid) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.uid;
    const { id } = await req.json();
    const numericId = Number(id);

    if (!numericId) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    try {
        const budget = await prisma.budget.findUnique({
            where: { id: numericId },
        });

        if (!budget || budget.userId !== userId) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        await prisma.budget.delete({ where: { id: numericId } });

        return NextResponse.json({ message: "Deleted successfully" });
    } catch (err) {
        console.error("Delete Budget Error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
