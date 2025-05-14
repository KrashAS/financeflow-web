import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const expenses = await prisma.expense.findMany({
        where: {
            userId: session.user.uid,
        },
        include: {
            category: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return NextResponse.json(expenses);
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
        const expense = await prisma.expense.findUnique({
            where: { id: numericId },
        });

        if (!expense || expense.userId !== userId) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        const updatedExpense = await prisma.expense.update({
            where: { id: numericId },
            data: { title, amount },
        });

        await prisma.transaction.updateMany({
            where: {
                userId,
                title: expense.title,
                amount: expense.amount,
                type: "EXPENSE",
                createdAt: expense.createdAt,
            },
            data: {
                title,
                amount,
            },
        });

        return NextResponse.json(updatedExpense);
    } catch (err) {
        console.error("Update Expense Error:", err);
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
        const expense = await prisma.expense.findUnique({
            where: { id: numericId },
        });

        if (!expense || expense.userId !== userId) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        await prisma.expense.delete({ where: { id: numericId } });

        await prisma.transaction.deleteMany({
            where: {
                userId,
                title: expense.title,
                amount: expense.amount,
                type: "EXPENSE",
                createdAt: expense.createdAt,
            },
        });

        return NextResponse.json({ message: "Deleted successfully" });
    } catch (err) {
        console.error("Delete Expense Error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
