import { Button } from '@/components/ui/buttons/Button';
import { redirect } from 'next/navigation';

async function createStatistic(formData: FormData) {
    "use server";

    const revenue = formData.get("revenue");
    const users = formData.get("users");
    const profit = formData.get("profit");

    await fetch("https://your-backend.com/api/statistics", {
        method: "POST",
        body: JSON.stringify({
            revenue,
            users,
            profit,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    redirect("/statistics");
}

export default function DataEntryPage() {
    return (
        <div className='"p-0 pt-6 sm:p-4 max-w-[1400px] mx-auto"'>
            <div className="p-6 space-y-6">
                <h1 className="text-2xl font-bold mb-6">📥 Fill Statistic Data</h1>

                <form action={createStatistic}
                    className="space-y-4 max-w-md">
                    <div>
                        <label htmlFor="revenue"
                            className="block mb-1 text-sm font-medium">Revenue</label>
                        <input
                            type="number"
                            name="revenue"
                            id="revenue"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-transparent rounded-md bg-[var(--color-bg)] dark:bg-gray-800 transition-colors duration-200 focus:border-[var(--color-brand)] dark:focus:border-[var(--color-dark-brand)] focus:ring-2 focus:ring-[var(--color-brand)] dark:focus:ring-[var(--color-dark-brand)] focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="users"
                            className="block mb-1 text-sm font-medium">Users</label>
                        <input
                            type="number"
                            name="users"
                            id="users"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-transparent rounded-md bg-[var(--color-bg)] dark:bg-gray-800 transition-colors duration-200 focus:border-[var(--color-brand)] dark:focus:border-[var(--color-dark-brand)] focus:ring-2 focus:ring-[var(--color-brand)] dark:focus:ring-[var(--color-dark-brand)] focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="profit"
                            className="block mb-1 text-sm font-medium">Profit</label>
                        <input
                            type="number"
                            name="profit"
                            id="profit"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-transparent rounded-md bg-[var(--color-bg)] dark:bg-gray-800 transition-colors duration-200 focus:border-[var(--color-brand)] dark:focus:border-[var(--color-dark-brand)] focus:ring-2 focus:ring-[var(--color-brand)] dark:focus:ring-[var(--color-dark-brand)] focus:outline-none"
                            required
                        />
                    </div>

                    <Button type="submit"
                        className="btn w-fit bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                        title='Save' />
                </form>
            </div>
        </div>
    );
}