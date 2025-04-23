import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="grid grid-rows-[20px_1fr_80px] items-center justify-items-center min-h-[calc(100vh-4rem)] p-8 pb-8 gap-16 sm:p-8 font-[family-name:var(--font-geist-sans)] bg-white text-gray-900 dark:bg-gray-900 dark:text-white">

            {/* MAIN SECTION */}
            <main className="flex flex-col gap-8 sm:gap-10 row-start-2 items-center sm:items-start max-w-3xl text-center sm:text-left">
                <h1 className="text-4xl font-bold">
                    Welcome to <span className="text-[var(--color-brand)] dark:text-[var(--color-dark-brand)]">FinanceFlow</span> 👋
                </h1>

                <p className="text-lg text-[var(--color-text-gray)] dark:text-[var(--color-dark-text-gray)]">
                    Your personal finance assistant to track, manage, and plan your expenses effortlessly.
                </p>

                <Link
                    href="/dashboard"
                    className="px-6 py-3 bg-[var(--color-btn-primary)] text-white text-lg rounded-lg hover:bg-[var(--color-btn-primary-hover)] transition dark:bg-[var(--color-dark-btn-primary)] dark:hover:bg-[var(--color-dark-btn-primary-hover)]"
                >
                    Get Started
                </Link>

                <div className="w-full">
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

            {/* FOOTER */}
            <footer className="row-start-3 text-sm text-gray-400 dark:text-gray-500 text-center">
                © {new Date().getFullYear()} FinanceFlow. All rights reserved.
            </footer>
        </div>
    );
}
