'use client';

import { POPUP_NAMES } from '@/constants/popupNames';
import { useAppDispatch } from '@/lib/hooks/useRedux';
import { openPopup } from '@/lib/redux/features/popup/popupSlice';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/buttons/Button';
import DropdownCurrency from '../ui/dropdowns/DropdownCurrency';
import { ThemeToggle } from '../ui/ThemeToggle';
import Sidebar from './Sidebar';

export default function Header() {
    const { data: session } = useSession();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const name = session?.user?.name;

    const closeSidebar = () => {
        setIsSidebarCollapsed(true)
    }

    const logoutClick = () => {
        dispatch(openPopup(POPUP_NAMES.LOGOUT));
    };

    useEffect(() => {
        closeSidebar()
    }, [pathname]);

    return (
        <header className="sticky top-0 z-50 w-full">
            <div className="w-full px-4 h-16 flex items-center justify-between backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-(--color-border-default) dark:border-(--color-dark-border-default) rounded-b-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.05)]">
                <div className="text-xl font-bold text-[color:var(--color-brand)] dark:text-[color:var(--color-dark-brand)]">
                    <Link href="/">FinanceFlow</Link>
                </div>
                <div className='flex space-x-4 items-center relative'>
                    <nav className="space-x-4 flex items-center">

                        {session ? (
                            <>
                                <Button
                                    ref={menuButtonRef}
                                    onClickButton={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                                    className="btn nav-btn hidden xs:block"
                                    title='Menu' />

                                <Link
                                    href="/dashboard"
                                    className="nav-link hidden sm:block"
                                >
                                    Dashboard
                                </Link>
                                <Button
                                    onClickButton={logoutClick}
                                    className="btn nav-btn hidden xs:block"
                                    title='Logout'
                                />
                            </>
                        ) : (
                            <Link
                                href="/auth/login"
                                className="nav-link"
                            >
                                Login
                            </Link>
                        )}

                    </nav>
                    {name && (
                        <div className="absolute -z-1 top-[64px] -right-4 px-4 py-1 rounded-full bg-gradient-to-r from-sky-200 via-teal-100 to-lime-200 text-gray-800 font-medium text-sm shadow-md">
                            Hi, {name}!
                        </div>
                    )}
                    {session && <DropdownCurrency />}
                    <ThemeToggle />

                </div>
            </div>

            {session &&
                <Sidebar isSidebarCollapsed={isSidebarCollapsed}
                    setIsSidebarCollapsed={setIsSidebarCollapsed}
                    insideRef={menuButtonRef}
                />
            }
        </header>
    );
}
