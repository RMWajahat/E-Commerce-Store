import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    products: [],
    productDetails: {},
    Categories: [],
    error: "",
}

export const getProducts = createAsyncThunk("product/getProducts", async () => {
    const response = await axios.get("/api/ecommercev1/products");
    return response.data.products;
});
export const getSingleProduct = createAsyncThunk("product/getSingleProduct", async (id) => {
    const response = await axios.get(`/api/ecommercev1/products/${id}`);
    return response.data.product;
});
export const gettodayCategories = createAsyncThunk("product/gettodayCategories", async (category) => {
    const response = await axios.get(`/api/ecommercev1/products?category=${category}`);
    return response.data.products;
});

export const ProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.loading = false;
        });
        builder.addCase(getProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // cases for single product
        builder.addCase(getSingleProduct.fulfilled, (state, action) => {
            state.productDetails = action.payload;
            state.loading = false;
        });
        builder.addCase(getSingleProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getSingleProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });


        // cases for categories specific product
        builder.addCase(gettodayCategories.fulfilled, (state, action) => {
            state.Categories = action.payload;
            state.loading = false;
        });
        builder.addCase(gettodayCategories.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(gettodayCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default ProductSlice.reducer;