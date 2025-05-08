export const POPUP_NAMES = {
    LOGOUT: "popup-logout",
    EDIT_BUDGET: "edit-budget-popup",
    DELETE_BUDGET: "delete-budget-popup",
    EDIT_CATEGORY: "edit-category-popup",
    DELETE_CATEGORY: "delete_category_popup",
} as const;

export type PopupName = (typeof POPUP_NAMES)[keyof typeof POPUP_NAMES];
