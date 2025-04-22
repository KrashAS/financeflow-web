import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const isAuth = !!token;
    const isProtected = req.nextUrl.pathname.startsWith("/dashboard");

    if (isProtected && !isAuth) {
        const loginUrl = new URL("/auth/login", req.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}
