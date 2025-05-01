'use client'
import useOnClickOutside from '@/lib/hooks/useOnClickOutside';
import { useAppDispatch } from '@/lib/hooks/useRedux';
import { closePopup } from '@/lib/redux/features/popup/popupSlice';
import { storage } from '@/utils/storage';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';


export const LogoutPopup = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const modalRef = useRef<HTMLDivElement>(null);

    const handleClose = () => {
        dispatch(closePopup());
    };

    const handleLogout = async () => {
        await signOut({ redirect: false })
        storage.removeItem("user");
        handleClose();
        router.push('/auth/login');
    };

    useOnClickOutside(modalRef, () => { dispatch(closePopup()) });

    return (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/10 flex items-center justify-center">
            <div ref={modalRef}
                className="bg-white dark:bg-dark rounded-2xl p-6 shadow-xl w-full max-w-sm">
                <h2 className="text-xl font-semibold text-center mb-4 text-gray-900">
                    Do you really want to leave?
                </h2>
                <div className="flex gap-4 justify-around mt-6">
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 rounded-xl btn btn-warning"
                    >
                        Yes
                    </button>
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 rounded-xl btn btn-secondary"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};