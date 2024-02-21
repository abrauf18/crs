import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

type User = {
    id: string,
    name: string,
    email: string
}

type initialState = {
    loading: boolean,
    data: User,
    error: string,
}

const initialState = {
    loading: false,
    data: {},
    error: "",
}

export const login = createAsyncThunk('user/login', (email, password) => {
    return axios
        .post('http://localhost:8000/auth/login', {
            email: email,
            password: password
        })
        .then((response) => response.data)
})

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true
        })
        builder.addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
            state.loading = false
            state.data = action.payload
            state.error = '';
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false
            state.data = {}
            state.error = action.error.message || 'Something went wrong';
        });
    }
});

export default userSlice.reducer;

