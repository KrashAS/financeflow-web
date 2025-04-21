import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        uid: string;
    }

    interface Session {
        user: {
            uid: string;
            email: string;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        uid: string;
        email: string;
    }
}
