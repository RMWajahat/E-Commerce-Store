import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    products: [],
    error: "",
}

export const getProducts = createAsyncThunk("product/getProducts", async () => {
    const response = await axios.get("/api/ecommercev1/products");
    return response.data.products;
});

export const ProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            console.log("getting data from state", state.products);
            state.loading = false;
        });
        builder.addCase(getProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default ProductSlice.reducer;