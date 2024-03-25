// now we made a store but we need reducers to make changes to the store
// for that we need to import the reducers from the todoSlice.js file
// In toolkit reducers are called slices
// So we will create slice 

import { createSlice, nanoid } from "@reduxjs/toolkit";

// createSlice function takes an object as an argument

const initialState = {
    products: [{
    },]
}

// sllice ka lia 3 cheezian zrori hain  aik name aik initial state aur aik reducers,    reducers kuch nahin hain object of functions hai 
export const ProductSlice = createSlice({
    name: "Products",
    initialState: initialState,
    reducers: {

    }
});
export const { } = ProductSlice.actions;
// ye iss lia export kia hain q k sirf yahi reducers use kr ka hmm store ma changing la skte hain
// baki reducers ko use nhi kr skte      jo register nah hoon 
// jo reducers ma likhoo ga wo kind of register hoo jata hain store ma
export default ProductSlice.reducer;
// ye default export hain q k sirf ek hi reducer hai