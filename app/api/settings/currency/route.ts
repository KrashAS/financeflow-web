import { prisma } from "@/lib/prisma";
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

        const { currency } = await req.json();

        const validCurrencies = ["USD", "EUR", "UAH"];
        if (!currency || !validCurrencies.includes(currency)) {
            return NextResponse.json(
                { error: "Invalid or missing currency" },
                { status: 400 }
            );
        }

        const userSetting = await prisma.userSetting.upsert({
            where: { userId: session.user.uid },
            update: { currency },
            create: {
                userId: session.user.uid,
                currency,
            },
        });

        return NextResponse.json(userSetting, { status: 200 });
    } catch (err) {
        console.error("Error updating currency:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.uid) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const setting = await prisma.userSetting.findUnique({
            where: { userId: session.user.uid },
        });

        return NextResponse.json(
            { currency: setting?.currency || null },
            { status: 200 }
        );
    } catch (error) {
        console.error("Currency GET error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
