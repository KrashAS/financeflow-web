export const POPUP_NAMES = {
    LOGOUT: "popup-logout",
} as const;

export type PopupName = (typeof POPUP_NAMES)[keyof typeof POPUP_NAMES];
