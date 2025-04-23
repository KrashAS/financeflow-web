'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { ThemeToggle } from '../ui/ThemeToggle';

export default function Header() {
    const { data: session, status } = useSession();

    const handleLogout = () => {
        signOut({ callbackUrl: '/auth/login' });
    };

    return (
        <header className="sticky top-0 z-50 w-full px-4 h-16 flex items-center justify-between backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-(--color-border-default) dark:border-(--color-dark-border-default) rounded-b-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.05)]">
            <div className="text-xl font-bold text-[color:var(--color-brand)] dark:text-[color:var(--color-dark-brand)]">
                <Link href="/">FinanceFlow</Link>
            </div>

            <nav className="space-x-4 flex items-center">
                <Link
                    href="/dashboard"
                    className="text-[color:var(--color-text-gray)] dark:text-[color:var(--color-dark-text-gray)] hover:text-[color:var(--color-brand)] dark:hover:text-[color:var(--color-dark-brand)]"
                >
                    Dashboard
                </Link>

                {status === 'loading' ? null : session ? (
                    <button
                        onClick={handleLogout}
                        className="text-[color:var(--color-text-gray)] dark:text-[color:var(--color-dark-text-gray)] hover:text-[color:var(--color-brand)] dark:hover:text-[color:var(--color-dark-brand)] cursor-pointer"
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        href="/auth/login"
                        className="text-[color:var(--color-text-gray)] dark:text-[color:var(--color-dark-text-gray)] hover:text-[color:var(--color-brand)] dark:hover:text-[color:var(--color-dark-brand)]"
                    >
                        Login
                    </Link>
                )}

                <ThemeToggle />
            </nav>
        </header>
    );
}
