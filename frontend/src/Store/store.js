import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Product Reducers/productSlice";

export const GNES_STORE = configureStore({
    reducer: {
        product: productReducer
    }
});