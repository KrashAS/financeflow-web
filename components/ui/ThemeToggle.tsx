'use client';

import { useTheme } from '@/lib/hooks/useTheme';
import IconMoon from '../icons/IconMoon';
import IconSun from '../icons/IconSun';

export const ThemeToggle = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`p-2 rounded-md border cursor-pointer ${isDark ? "border-gray-600 hover:bg-gray-800" : "border-gray-300 hover:bg-gray-100"}`}
            aria-label="Toggle theme"
        >
            {isDark ? <IconSun /> : <IconMoon />}
        </button>

    );
};
