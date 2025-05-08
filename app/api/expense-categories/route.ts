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

export async function PATCH(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.uid) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, name, color } = await req.json();

    const numericId = Number(id);

    if (!numericId || !name || !color) {
        return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    try {
        const category = await prisma.expenseCategory.findUnique({
            where: { id: numericId },
        });

        if (!category) {
            return NextResponse.json(
                { error: "Not found category" },
                { status: 404 }
            );
        }

        const updatedCategory = await prisma.expenseCategory.update({
            where: { id: numericId },
            data: { name, color },
        });

        return NextResponse.json(updatedCategory);
    } catch (err) {
        console.error("Update Category Error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.uid) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();
    const numericId = Number(id);

    if (!numericId) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    try {
        const category = await prisma.expenseCategory.findUnique({
            where: { id: numericId },
        });

        if (!category) {
            return NextResponse.json(
                { error: "Not found category" },
                { status: 404 }
            );
        }

        await prisma.expenseCategory.delete({ where: { id: numericId } });

        return NextResponse.json({ message: "Deleted successfully" });
    } catch (err) {
        console.error("Delete Category Error:", err);
        return NextResponse.json(
            {
                error: "You can't delete this category because it is linked to payments. Create a new category or rename this one.",
            },
            { status: 500 }
        );
    }
}
