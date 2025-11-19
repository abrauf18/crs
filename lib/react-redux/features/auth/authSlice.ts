import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    login,
    forgotPassword,
    resetPassword,
} from './authAction';

type User = {
    id: string;
    name: string;
    email: string;
    role: string;
};

type state = {
    loading: boolean;
    data: User;
    otp: string;
    error: string;
};

const initialState: state = {
    loading: false,
    data: {
        id: '',
        name: '',
        email: '',
        role: '',
    },
    otp: '',
    error: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setOtp: (state, action: PayloadAction<string>) => {
            state.otp = action.payload;
        },
        clearOtp: (state) => {
            state.otp = '';
        },
    },
    extraReducers: (builder) => {
        // login action
        builder.addCase(login.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            login.fulfilled,
            (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.data.id = action.payload.id;
                state.data.name = action.payload.name;
                state.data.email = action.payload.email;
                state.data.role = action.payload.role;
                state.error = '';
            }
        );
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.data = initialState.data;
            state.error = action.error.message || 'Something went wrong';
        });
        // forgot password action
        builder.addCase(forgotPassword.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            forgotPassword.fulfilled,
            (state, action: PayloadAction<{ email: string }>) => {
                state.loading = false;
                state.data.email = action.payload.email;
                state.error = '';
            }
        );
        builder.addCase(forgotPassword.rejected, (state, action) => {
            state.loading = false;
            state.data = initialState.data;
            state.error = action.error.message || 'Something went wrong';
        });
        // Reset Password action
        builder.addCase(resetPassword.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            resetPassword.fulfilled,
            (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.error = '';
            }
        );
        builder.addCase(resetPassword.rejected, (state, action) => {
            state.loading = false;
            state.data = initialState.data;
            state.error = action.error.message || 'Something went wrong';
        });
    },
});

export const { setOtp, clearOtp } = userSlice.actions;
export default userSlice.reducer;
