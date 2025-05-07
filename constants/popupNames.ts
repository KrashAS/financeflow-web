export const POPUP_NAMES = {
    LOGOUT: "popup-logout",
    EDIT_BUDGET: "edit-budget-popup",
    DELETE_BUDGET: "delete-budget-popup",
} as const;

export type PopupName = (typeof POPUP_NAMES)[keyof typeof POPUP_NAMES];
