import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { name, color } = await req.json();

        if (!name || !color) {
            return NextResponse.json(
                { error: "Invalid data" },
                { status: 400 }
            );
        }

        const newCategory = await prisma.expenseCategory.create({
            data: {
                name,
                color,
                userId: session.user.uid,
            },
        });

        return NextResponse.json(newCategory, { status: 201 });
    } catch (err) {
        console.error("Create Expense Category Error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const categories = await prisma.expenseCategory.findMany({
            where: { userId: session.user.uid },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(categories);
    } catch (err) {
        console.error("Fetch Expense Categories Error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
