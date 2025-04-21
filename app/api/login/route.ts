import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    if (!email || !password) {
        return NextResponse.json(
            { error: "Email and password are required" },
            { status: 400 }
        );
    }

    const firebaseApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    console.log(`firebaseApiKey: ${firebaseApiKey}`);
    if (!firebaseApiKey) {
        return NextResponse.json(
            { error: "Firebase API key is missing" },
            { status: 500 }
        );
    }

    const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseApiKey}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
            }),
        }
    );

    const data = await res.json();

    if (!res.ok) {
        console.error("Firebase error:", data.error?.message);
        return NextResponse.json(
            { error: data.error?.message || "Login failed" },
            { status: 400 }
        );
    }

    return NextResponse.json({
        uid: data.localId,
        email: data.email,
        idToken: data.idToken,
    });
}
