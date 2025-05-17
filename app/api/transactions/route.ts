import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../lib/auth/authOptions";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.uid) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const userId = session.user.uid;

        const transactions = await prisma.transaction.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            include: {
                category: true,
            },
        });

        return NextResponse.json(transactions, { status: 200 });
    } catch (err) {
        console.error("Fetch transactions error", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
