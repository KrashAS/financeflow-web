import WrapperForPage from "@/components/layout/WrapperForPage";
import Statistics from "@/components/pages/Statistics";
import Link from "next/link";

export default async function StatisticsPage() {
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