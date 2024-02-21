import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import login from './authAction';

type User = {
    id: string;
    name: string;
    email: string;
};

type initialState = {
    loading: boolean;
    data: User;
    error: string;
};

const initialState = {
    loading: false,
    data: {},
    error: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            login.fulfilled,
            (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.data = action.payload;
                state.error = '';
            }
        );
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.data = {};
            state.error = action.error.message || 'Something went wrong';
        });
    },
});

export default userSlice.reducer;
