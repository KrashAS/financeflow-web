import Statistics from "@/components/pages/Statistics";
import Link from "next/link";

export default function StatisticsPage() {
    return (
        <main className="p-0 pt-8 sm:p-4 sm:pt-6 max-w-[1400px] mx-auto">
            <div className="p-6">
                <div className="flex justify-between mb-4 items-center">
                    <h1 className="text-2xl font-bold mb-2">Statistics</h1>
                    <Link
                        href="/statistics/data-entry"
                        className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Add New Entry
                    </Link>
                </div>

                <Statistics />
            </div>
        </main>
    );
}