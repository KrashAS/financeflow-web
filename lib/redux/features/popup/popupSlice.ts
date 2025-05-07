import { PopupName } from "@/constants/popupNames";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPayload {
    id: string;
    name: string;
    amount?: number;
    createdAt?: string;
    color?: string;
    currencySymbol?: string;
}

interface PopupState {
    activePopup: PopupName | null;
    title: string;
    description: string;
    payload?: IPayload | null;
}

const initialState: PopupState = {
    activePopup: null,
    title: "",
    description: "",
    payload: null,
};

const popupSlice = createSlice({
    name: "popup",
    initialState,
    reducers: {
        openPopup: (state, action: PayloadAction<PopupState>) => {
            state.activePopup = action.payload.activePopup;
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.payload = action.payload.payload;
        },
        closePopup: (state) => {
            state.activePopup = null;
            state.title = "";
            state.description = "";
            state.payload = null;
        },
    },
});

export const { openPopup, closePopup } = popupSlice.actions;
export default popupSlice.reducer;
