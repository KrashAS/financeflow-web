import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            uid: string;
            email: string;
            name?: string;
        } & DefaultSession["user"];
    }

    interface User {
        uid: string;
        email: string;
        name?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        uid: string;
        email: string;
        name?: string;
    }
}
