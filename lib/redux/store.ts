import { configureStore } from "@reduxjs/toolkit";
import currencyReduсer from "./features/currency/currencySlice";
import popupReducer from "./features/popup/popupSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            popup: popupReducer,
            currency: currencyReduсer,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
