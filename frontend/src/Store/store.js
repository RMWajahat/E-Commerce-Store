import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./Product Reducers/productSlice";

export const GNES_STORE = configureStore({
    reducer: {
        ProductReducer
    }
});