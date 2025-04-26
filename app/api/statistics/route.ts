import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { revenue, users, profit } = body;

        if (revenue == null || users == null || profit == null) {
            return NextResponse.json(
                { error: "Missing fields" },
                { status: 400 }
            );
        }

        console.log("Received statistic:", { revenue, users, profit });

        return NextResponse.json(
            { message: "Statistic created successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
