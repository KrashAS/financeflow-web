import WrapperForPage from "@/components/layout/WrapperForPage";
import UnauthorizedMessage from "@/components/pages/auth/UnauthorizedMessage";
import Statistics from "@/components/pages/Statistics";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function StatisticsPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) return <UnauthorizedMessage />;
    return (
        <WrapperForPage>
            <div className="p-6">
                <div className="flex justify-between mb-4 items-center">
                    <h1 className="text-2xl font-bold mb-2">Statistics</h1>
                    <Link
                        href="/statistics/data-entry"
                        className="btn-primary inline-block px-4 py-2 rounded "
                    >
                        Add New Entry
                    </Link>
                </div>

                <Statistics />
            </div>
        </WrapperForPage>
    );
}