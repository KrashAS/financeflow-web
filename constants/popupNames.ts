export const POPUP_NAMES = {
    LOGOUT: "popup-logout",
    EDIT_BUDGET: "edit-budget-popup",
    DELETE_BUDGET: "delete-budget-popup",
    EDIT_CATEGORY: "edit-category-popup",
    DELETE_CATEGORY: "delete-category-popup",
    EDIT_EXPENSE: "edit-expense-popup",
    DELETE_EXPENSE: "delete-expense-popup",
} as const;

export type PopupName = (typeof POPUP_NAMES)[keyof typeof POPUP_NAMES];
