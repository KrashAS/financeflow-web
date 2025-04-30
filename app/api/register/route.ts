import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
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
    let body: { email?: string; password?: string; name?: string };
    try {
        body = await req.json();
    } catch (error) {
        console.error("POST❌ error:", error);
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const { email, password, name } = body;

    if (!email || !password || !name || name.length > 12) {
        return NextResponse.json(
            { error: "Missing email, password or name too long" },
            { status: 400 }
        );
    }

    try {
        const user = await getAuth().createUser({
            email,
            password,
            displayName: name,
        });
        const db = getFirestore();
        await db.collection("users").doc(user.uid).set({
            email,
            name,
            createdAt: new Date().toISOString(),
        });

        return NextResponse.json({
            uid: user.uid,
            email: user.email,
            name: user.displayName,
        });
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error occurred";
        console.error("❌ error:", error);
        return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
}
