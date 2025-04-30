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

    if (!firebaseApiKey) {
        return NextResponse.json(
            { error: "Firebase API key is missing" },
            { status: 500 }
        );
    }

    const loginRes = await fetch(
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

    const loginData = await loginRes.json();

    if (!loginRes.ok) {
        console.error("Firebase login error:", loginData.error?.message);
        return NextResponse.json(
            { error: loginData.error?.message || "Login failed" },
            { status: 400 }
        );
    }

    const { idToken, localId: uid } = loginData;

    const accountInfoRes = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseApiKey}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken }),
        }
    );

    const accountInfoData = await accountInfoRes.json();

    const userInfo = accountInfoData?.users?.[0];

    return NextResponse.json({
        uid,
        email: loginData.email,
        name: userInfo?.displayName || null,
        idToken,
    });
}
