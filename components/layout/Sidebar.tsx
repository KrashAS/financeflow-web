'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface IProps {
    isSidebarCollapsed: boolean;
    setIsSidebarCollapsed: (value: boolean) => void;
}

export default function Sidebar({ isSidebarCollapsed, setIsSidebarCollapsed }: IProps) {
    const pathname = usePathname();

    const links = [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/transactions', label: 'Transactions' },
        { href: '/budgets', label: 'Budgets' },
        { href: '/statistics', label: 'Statistics' },
    ];

    return (
        <>
            <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="fixed z-60 top-16 left-0 m-2 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-300 dark:border-gray-600 hover:scale-105 transition-transform duration-200 cursor-pointer"
                aria-label="Toggle sidebar"
            >
                <svg
                    className={`w-5 h-5 text-(--color-brand) dark:text-(--color-dark-brand) transition-transform duration-300 ${isSidebarCollapsed ? 'rotate-180' : ''}`}
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
                        {links.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className={`transition-colors ${pathname === href
                                        ? 'text-[var(--color-brand)] dark:text-[var(--color-dark-brand)] font-semibold'
                                        : 'text-[var(--color-text-gray)] dark:text-[var(--color-dark-text-gray)] hover:text-[var(--color-brand)] dark:hover:text-[var(--color-dark-brand)]'
                                    }`}
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </aside>
        </>
    );
}