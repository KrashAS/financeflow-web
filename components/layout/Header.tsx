'use client';

import { useTheme } from '@/lib/hooks/useTheme';
import Link from 'next/link';
import { ThemeToggle } from '../ui/ThemeToggle';

export default function Header() {
    const { isDark } = useTheme();

    return (
        <header className={`h-16 w-full border-b ${isDark ? 'border-gray-700 bg-transparent' : 'border-gray-200 bg-white'}  px-4 flex items-center justify-between shadow-sm`}>
            <div className={`text-xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>FinanceFlow</div>

            <nav className="space-x-4 flex items-center">
                <Link href="/dashboard" className={`text-gray-600 ${isDark ? 'dark:text-gray-300' : 'text-gray-600'} hover:text-blue-600 ${isDark ? 'dark:hover:text-blue-400' : ''}`}>
                    Dashboard
                </Link>
                <Link href="/auth/login" className={`text-gray-600 ${isDark ? 'dark:text-gray-300' : 'text-gray-600'} hover:text-blue-600 ${isDark ? 'dark:hover:text-blue-400' : ''}`}>
                    Login
                </Link>

                <ThemeToggle />
            </nav>
        </header>
    );
}


