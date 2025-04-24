import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { NextResponse } from "next/server";

if (
    !process.env.FIREBASE_PROJECT_ID ||
    !process.env.FIREBASE_CLIENT_EMAIL ||
    !process.env.FIREBASE_PRIVATE_KEY
) {
    throw new Error("Missing Firebase environment variables");
}

if (!getApps().length) {
    initializeApp({
        credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID!,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
            privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
        }),
    });
}

export async function POST(req: Request) {
    let body: { email?: string; password?: string };
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const { email, password } = body;

    if (!email || !password) {
        return NextResponse.json(
            { error: "Missing email or password" },
            { status: 400 }
        );
    }

    try {
        const user = await getAuth().createUser({ email, password });
        return NextResponse.json({ uid: user.uid, email: user.email });
    } catch (err) {
        const errorMessage =
            err instanceof Error ? err.message : "Unknown error occurred";
        return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
}

/* import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { NextResponse } from "next/server";

if (!getApps().length) {
    initializeApp({
        credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID!,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
            privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
        }),
    });
}

export async function POST(req: Request) {
    let body: { email?: string; password?: string };
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const { email, password } = body;
    if (!email || !password) {
        return NextResponse.json(
            { error: "Missing email or password" },
            { status: 400 }
        );
    }

    try {
        const user = await getAuth().createUser({ email, password });
        return NextResponse.json({ uid: user.uid, email: user.email });
    } catch (err) {
        return NextResponse.json(
            { error: (err as Error).message },
            { status: 400 }
        );
    }
}
 */
