'use client'
import useOnClickOutside from '@/lib/hooks/useOnClickOutside';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useRedux';
import { closePopup } from '@/lib/redux/features/popup/popupSlice';
import { storage } from '@/utils/storage';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { Button } from '../ui/buttons/Button';
import PopupWrapper from './PopupWrapper';


export const LogoutPopup = () => {
    const dispatch = useAppDispatch();
    const { title } = useAppSelector((state) => state.popup);
    const router = useRouter();
    const modalRef = useRef<HTMLDivElement>(null);

    const handleClose = () => {
        dispatch(closePopup());
    };

    const handleLogout = async () => {
        await signOut({ redirect: false })
        storage.removeItem("user");
        storage.removeItem("selectedCurrency");
        handleClose();
        router.push('/auth/login');
    };

    useOnClickOutside(modalRef, () => { dispatch(closePopup()) });

    return (
        <PopupWrapper>
            <h2 className="text-xl font-semibold text-center mb-4 text-gray-900">
                {title}
            </h2>
            <div className="flex gap-4 justify-around mt-6">
                <Button
                    onClickButton={handleLogout}
                    className="px-4 py-2 rounded-xl btn btn-warning"
                    title="Yes"
                />
                <Button
                    onClickButton={handleClose}
                    className="px-4 py-2 rounded-xl btn btn-secondary"
                    title="Cancel"
                />
            </div>
        </PopupWrapper>
    );
};