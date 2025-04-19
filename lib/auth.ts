import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

export const getSession = async () => {
    return await getServerSession(authOptions);
};
