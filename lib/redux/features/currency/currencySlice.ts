import { DEFAULT_CURRENCY } from "@/constants/currencies";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrencyState {
    code: string;
}

const initialState: CurrencyState = {
    code: DEFAULT_CURRENCY,
};

const currencySlice = createSlice({
    name: "currency",
    initialState,
    reducers: {
        setCurrency(state, action: PayloadAction<string>) {
            state.code = action.payload;
        },
    },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
