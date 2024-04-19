import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    user: null,
    loading: false,
    error: null
};
let server_error = "";

export const LogOut = createAsyncThunk("user/logout", async () => {
    let response = null;
    try {
        response = await axios.get('/auth/logout');
        return response.data;
    } catch (error) {
        server_error = error.response.data.message;
        return response.data;
    }
});



export const registerUser = createAsyncThunk("user/registerUser", async ({ name, email, password, avatar }) => {
    let response = null;
    try {
        response = await axios.post('/auth/register', { name, email, password, avatar });
        return response.data;
    } catch (error) {
        server_error = error.response.data.message;
        return response.data;
    }
});

export const loginUser = createAsyncThunk("user/loginUser", async ({ email, password }) => {
    let response = null;
    try {
        response = await axios.post('/auth/login', { email, password });
        let { userlogged } = response.data;
        let storage = userlogged.email;
        localStorage.setItem('user', storage);
        return response.data;
    } catch (error) {
        server_error = error.response.data.message;
    }
    return response.data;

});

const UserSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
    },
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

        // logout cases 
        builder.addCase(LogOut.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(LogOut.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(LogOut.rejected, (state, action) => {
            state.loading = false;
            state.error = server_error;
            server_error = "";
        });

        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = server_error;
            server_error = "";
        });
    }
});

export default UserSlice.reducer;