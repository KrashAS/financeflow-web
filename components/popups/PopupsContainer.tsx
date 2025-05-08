'use client';

import { POPUP_NAMES } from "@/constants/popupNames";
import { useAppSelector } from "@/lib/hooks/useRedux";
import { useEffect } from "react";
import { ActionBudgetPopup } from "./ActionBudgetPopup";
import { ActionCategoryPopup } from "./ActionCategoryPopup";
import { LogoutPopup } from "./LogoutPopup";

const PopupsContainer = () => {
    const currentPopup = useAppSelector((state) => state.popup.activePopup);

    useEffect(() => {
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

        if (currentPopup) {
            document.body.style.paddingRight = `${scrollBarWidth}px`;
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.paddingRight = '';
            document.body.style.overflowY = 'auto';
        }
    }, [currentPopup]);

    return (
        <>
            {currentPopup === POPUP_NAMES.LOGOUT && <LogoutPopup />}
            {(currentPopup === POPUP_NAMES.EDIT_BUDGET || currentPopup === POPUP_NAMES.DELETE_BUDGET) && <ActionBudgetPopup />}
            {(currentPopup === POPUP_NAMES.EDIT_CATEGORY || currentPopup === POPUP_NAMES.DELETE_CATEGORY) && <ActionCategoryPopup />}
        </>
    );
};

export default PopupsContainer;
