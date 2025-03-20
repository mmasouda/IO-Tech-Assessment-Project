import { configureStore } from '@reduxjs/toolkit';
import storeSlice from "./slice";

export const store = configureStore({
    reducer: {
        store: storeSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
