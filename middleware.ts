import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_PATHS = ["/", "/auth/login", "/auth/register"];

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const isAuth = !!token;
    const { pathname } = req.nextUrl;

    const isPublic = PUBLIC_PATHS.some(
        (path) => pathname === path || pathname.startsWith(path)
    );

    if (!isPublic && !isAuth) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (pathname === "/" && isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}
