import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

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
                userId: session.user.uid,
            }));

        if (!data.length) {
            return NextResponse.json(
                { error: "No valid expenses" },
                { status: 400 }
            );
        }

        const created = await prisma.expense.createMany({ data });

        return NextResponse.json({ count: created.count }, { status: 201 });
    } catch (err) {
        console.error("Bulk expense creation error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
