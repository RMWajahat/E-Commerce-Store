import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./Product Reducers/productSlice";

// to craete a store we need to use configureStore function from redux toolkit
export const store = configureStore({
    reducer: {
        products: ProductReducer   // hmm jitna mrzi chahe reducers add kr skte hain     -
        // ye kind of mini stores kaam karein ga but Origional store aik hi raha ga 
    }
});