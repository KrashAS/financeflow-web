'use client';

import Link from 'next/link';

interface IProps {
    isSidebarCollapsed: boolean;
    setIsSidebarCollapsed: (value: boolean) => void;
}

export default function Sidebar({ isSidebarCollapsed, setIsSidebarCollapsed }: IProps) {

    return (
        <>
            <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="fixed z-60 top-16 left-0 m-2 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-300 dark:border-gray-600 hover:scale-105 transition-transform duration-200 cursor-pointer"
                aria-label="Toggle sidebar"
            >
                <svg
                    className={`w-5 h-5 text-(--color-brand) dark:text-(--color-dark-brand) transition-transform duration-300 ${isSidebarCollapsed ? 'rotate-180 ' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <aside
                className={`fixed z-55 top-16 left-0 h-[calc(100vh-4rem)] bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-r border-gray-200 dark:border-gray-700 flex flex-col items-start transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-0 border-r-0' : 'w-64'
                    }`}
            >
                <div
                    className={`overflow-hidden transition-opacity duration-300 ease-in-out ${isSidebarCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'
                        }`}
                >
                    <nav className="flex flex-col p-4 pt-16 space-y-4">
                        <Link
                            href="/dashboard"
                            className="text-(--color-text-gray) dark:text-(--color-dark-text-gray) hover:text-(--color-brand) dark:hover:text-(--color-dark-brand)"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/transactions"
                            className="text-(--color-text-gray) dark:text-(--color-dark-text-gray) hover:text-(--color-brand) dark:hover:text-(--color-dark-brand)"
                        >
                            Transactions
                        </Link>
                        <Link
                            href="/budgets"
                            className="text-(--color-text-gray) dark:text-(--color-dark-text-gray) hover:text-(--color-brand) dark:hover:text-(--color-dark-brand)"
                        >
                            Budgets
                        </Link>
                        <Link
                            href="/statistics"
                            className="text-(--color-text-gray) dark:text-(--color-dark-text-gray) hover:text-(--color-brand) dark:hover:text-(--color-dark-brand)"
                        >
                            Statistics
                        </Link>
                    </nav>
                </div>
            </aside>
        </>
    );
}
