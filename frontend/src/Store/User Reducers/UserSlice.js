import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    user: null,
    loading: false,
    error: null
};
let server_error = "";

export const loginUser = createAsyncThunk("user/loginUser", async ({ email, password }) => {
    let response = null;
    try {
        response = await axios.post('/auth/login', { email, password });
        let { userlogged } = response.data;
        let storage = userlogged.email;
        console.log(storage);
        localStorage.setItem('user', storage);


    } catch (error) {
        server_error = error.response.data.message;
    }
    return response.data;

});

const UserSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = server_error;
            server_error = "";
        });
    }
});

export default UserSlice.reducer;