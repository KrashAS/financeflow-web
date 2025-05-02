import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
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
