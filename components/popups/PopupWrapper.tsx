"use client"

import useOnClickOutside from "@/lib/hooks/useOnClickOutside";
import { useAppDispatch } from "@/lib/hooks/useRedux";
import { closePopup } from "@/lib/redux/features/popup/popupSlice";
import { useRef } from "react";

const PopupWrapper = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();
    const modalRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(modalRef, () => dispatch(closePopup()));
    return (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/10 flex items-center justify-center p-3">
            <div ref={modalRef}
                className="bg-white dark:bg-dark rounded-2xl p-6 shadow-xl w-full max-w-sm">
                {children}
            </div>
        </div>
    )
}

export default PopupWrapper