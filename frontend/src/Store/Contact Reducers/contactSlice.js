import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    contacted: false,
    message: '',
    error: null
}
let server_error = "";


export const contactUs = createAsyncThunk('contactUs/contact', async (data) => {
    let response = null;
    try {
        response = await axios.post('/api/ecommerce/v1/contact', data);
        return response.data;
    } catch (error) {

        server_error = error.response.data.message;
        console.log(server_error);
        return response.data;
    }
})

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(contactUs.fulfilled, (state, action) => {
            state.contacted = action.payload?.success;
            state.message = action.payload?.message;
            state.error = null;
            server_error = "";
        })
        builder.addCase(contactUs.rejected, (state, action) => {
            state.contacted = action.payload?.success;
            state.message = action.payload?.message;
            state.error = server_error;
        })
    }
})


export default contactSlice.reducer;