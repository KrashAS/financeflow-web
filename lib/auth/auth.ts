import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";

export const getSession = async () => {
    return await getServerSession(authOptions);
};
