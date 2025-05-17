import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const res = await fetch("http://localhost:3000/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    }),
                });

                const user = await res.json();

                if (!res.ok || !user) {
                    throw new Error(user.error || "Login failed");
                }

                return user;
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.uid = user.uid;
                token.email = user.email ?? "";
                token.name = user.name ?? "";
            }
            return token;
        },
        async session({ session, token }) {
            if (token.uid) {
                session.user.uid = token.uid;
            }
            session.user.email = token.email ?? "";
            session.user.name = token.name ?? "";
            return session;
        },
    },
};
