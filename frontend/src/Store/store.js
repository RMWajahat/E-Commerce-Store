import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Product Reducers/productSlice";
import UserSlice from "./User Reducers/UserSlice";
import contactSlice from "./Contact Reducers/contactSlice";

export const GNES_STORE = configureStore({
    reducer: {
        product: productReducer,
        user: UserSlice,
        contact: contactSlice
    }
});