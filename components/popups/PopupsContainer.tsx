'use client';

import { POPUP_NAMES } from "@/constants/popupNames";
import { useAppSelector } from "@/lib/hooks/useRedux";
import { useEffect } from "react";
import { LogoutPopup } from "./LogoutPopup";

const PopupsContainer = () => {
    const currentPopup = useAppSelector((state) => state.popup.activePopup);

    useEffect(() => {
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        /* const headerMid = document.querySelector('header') as HTMLElement | null; */

        if (currentPopup) {
            document.body.style.paddingRight = `${scrollBarWidth}px`;
            /* headerMid && (headerMid.classList.add('no-trans'));             
            headerMid && (headerMid.style.paddingRight = `${scrollBarWidth}px`); */
            document.body.style.overflowY = 'hidden';
        } else {
            /* 
            headerMid && (headerMid.style.paddingRight = ''); */
            document.body.style.paddingRight = '';
            document.body.style.overflowY = 'auto';
            /* setTimeout(() => {
                headerMid && (headerMid.classList.remove('no-trans'));
            }, 100); */
        }
    }, [currentPopup]);

    return (
        <>
            {currentPopup === POPUP_NAMES.LOGOUT && <LogoutPopup />}
        </>
    );
};

export default PopupsContainer;
