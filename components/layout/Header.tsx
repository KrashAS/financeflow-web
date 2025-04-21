'use client';

import Link from 'next/link';
import { ThemeToggle } from '../ui/ThemeToggle';

export default function Header() {

    return (
        <header className="h-16 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-transparent px-4 flex items-center justify-between shadow-sm">
            <div className="text-xl font-bold text-(--color-brand) dark:text-(--color-dark-brand)"><Link href="/">FinanceFlow</Link></div>

            <nav className="space-x-4 flex items-center">
                <Link href="/dashboard" className="text-(--color-text-gray) dark:text-(--color-dark-text-gray) hover:text-(--color-brand) dark:hover:text-(--color-dark-brand)">
                    Dashboard
                </Link>
                <Link href="/auth/login" className="text-(--color-text-gray) dark:text-(--color-dark-text-gray) hover:text-(--color-brand) dark:hover:text-(--color-dark-brand)">
                    Login
                </Link>

                <ThemeToggle />
            </nav>
        </header>
    );
}


