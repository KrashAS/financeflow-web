'use client'
import { useAppDispatch } from '@/lib/hooks/useRedux';
import { closePopup } from '@/lib/redux/features/popup/popupSlice';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';


export const LogoutPopup = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleClose = () => {
        dispatch(closePopup());
    };

    const handleLogout = async () => {
        await signOut({ redirect: false })
        handleClose();
        router.push('/auth/login');
    };

    return (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/10 flex items-center justify-center">
            <div className="bg-white dark:bg-dark rounded-2xl p-6 shadow-xl w-full max-w-sm">
                <h2 className="text-xl font-semibold text-center mb-4 text-gray-900 dark:text-white">
                    Do you really want to leave?
                </h2>
                <div className="flex gap-4 justify-center mt-6">
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                    >
                        Yes
                    </button>
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};