import { prisma } from "@/lib/prisma";
import { TransactionType } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../../lib/auth/authOptions";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { expenses } = await req.json();

        if (!Array.isArray(expenses) || !expenses.length) {
            return NextResponse.json(
                { error: "No valid expenses submitted" },
                { status: 400 }
            );
        }

        const data = expenses
            .filter(
                (e) =>
                    e.title &&
                    typeof e.amount === "number" &&
                    e.amount > 0 &&
                    e.categoryId
            )
            .map((e) => ({
                title: e.title,
                amount: e.amount,
                categoryId: e.categoryId,
                currency: e.currency,
                userId: session.user.uid,
                createdAt: e.createdAt ? new Date(e.createdAt) : new Date(),
            }));

        if (!data.length) {
            return NextResponse.json(
                { error: "No valid expenses" },
                { status: 400 }
            );
        }

        const transactionsData = data.map((e) => ({
            title: e.title,
            amount: e.amount,
            categoryId: e.categoryId,
            currency: e.currency,
            userId: e.userId,
            type: TransactionType.EXPENSE,
            createdAt: e.createdAt,
        }));

        await prisma.transaction.createMany({ data: transactionsData });

        const created = await prisma.expense.createMany({ data });

        return NextResponse.json({ count: created.count }, { status: 201 });
    } catch (err) {
        console.error("Bulk expense creation error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
