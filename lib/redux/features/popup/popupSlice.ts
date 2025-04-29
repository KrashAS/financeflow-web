import { PopupName } from "@/constants/popupNames";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PopupState {
    activePopup: PopupName | null;
}

const initialState: PopupState = {
    activePopup: null,
};

const popupSlice = createSlice({
    name: "popup",
    initialState,
    reducers: {
        openPopup: (state, action: PayloadAction<PopupName>) => {
            state.activePopup = action.payload;
        },
        closePopup: (state) => {
            state.activePopup = null;
        },
    },
});

export const { openPopup, closePopup } = popupSlice.actions;
export default popupSlice.reducer;
