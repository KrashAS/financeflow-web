import Footer from '@/components/layout/Footer';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { authOptions } from './api/auth/[...nextauth]/authOptions';

export default async function Home() {
    const session = await getServerSession(authOptions);
    const userName = session?.user?.name;

    return (
        <div className="grid grid-rows-[20px_1fr_80px] items-center justify-items-center min-h-[calc(100vh-4rem)] p-8 pb-8 gap-16 sm:p-8 font-[family-name:var(--font-geist-sans)] bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
            <main className="flex flex-col gap-8 sm:gap-10 row-start-2 items-center sm:items-start max-w-4xl text-center sm:text-left">
                <h1 className="text-4xl font-bold">
                    Welcome{userName ? `, ${userName}` : ""} to <span className="text-[var(--color-brand)] dark:text-[var(--color-dark-brand)]">FinanceFlow</span> 👋
                </h1>

                <p className="text-lg text-[var(--color-text-gray)] dark:text-[var(--color-dark-text-gray)]">
                    Your personal finance assistant to track, manage, and plan your expenses effortlessly.
                </p>

                <section className="flex flex-col gap-6">
                    <div>
                        <h2 className="text-2xl font-semibold mb-2">🚀 Key Features</h2>
                        <ul className="list-disc list-inside space-y-2 text-[var(--color-text-gray)] dark:text-[var(--color-dark-text-gray)]">
                            <li><strong>Track Expenses:</strong> Easily log daily expenses and categorize them.</li>
                            <li><strong>Manage Budgets:</strong> Set monthly budgets and monitor your spending habits.</li>
                            <li><strong>Visualize Finances:</strong> Analyze spending trends with clear graphs and charts.</li>
                            <li><strong>Secure and Private:</strong> Your financial data is encrypted and safe with us.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-2">💡 Tips for Financial Success</h2>
                        <ul className="list-disc list-inside space-y-2 text-[var(--color-text-gray)] dark:text-[var(--color-dark-text-gray)]">
                            <li>Set clear financial goals every month.</li>
                            <li>Track every expense — even the small ones.</li>
                            <li>Review your budgets regularly and adjust if needed.</li>
                            <li>Save at least 20% of your income if possible.</li>
                        </ul>
                    </div>
                </section>

                {session ? <Link
                    href="/dashboard"
                    className="px-6 py-3 rounded-lg btn btn-primary"
                >
                    Get Started
                </Link> : <Link
                    href="/auth/login"
                    className="px-6 py-3 rounded-lg btn btn-primary"
                >
                    Get Started
                </Link>}

                <div className="w-full mt-8">
                    <Image
                        src="/images/finance.png"
                        alt="FinanceFlow App Preview"
                        width={1200}
                        height={600}
                        className="w-full h-auto rounded-xl shadow-lg"
                        priority
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}
