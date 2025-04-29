import { configureStore } from "@reduxjs/toolkit";
import popupReducer from "./features/popup/popupSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            popup: popupReducer,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
