import { loginAPI,forgotPasswordAPI, verifyOTPAPI, resetPasswordAPI } from '@/app/api/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface LoginPayload {
    email: string;
    password: string;
}

export const login = createAsyncThunk(
    'user/login',
    async ({ email, password }: LoginPayload, { rejectWithValue }) => {
        try {
            const response = await loginAPI(email, password);
            const emailResponse = response.data;
            return emailResponse.data;
        } catch (error: Error | any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

interface ForgotPasswordPayload {
    email: string;
}

export const forgotPassword = createAsyncThunk(
    'user/forgotPassword',
    async ({ email }: ForgotPasswordPayload, { rejectWithValue }) => {
        try {
            const response = await forgotPasswordAPI(email);
            const emailResponse = response.data;
            return emailResponse.data;
        } catch (error: Error | any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

interface VerifyOTPPayload {
    id: string;
    OTP: string;
}

export const verifyOTP = createAsyncThunk(
    'user/verifyOTP',
    async ({ id, OTP }: VerifyOTPPayload, { rejectWithValue }) => {
        try {
            const response = await verifyOTPAPI(id, OTP);
            const emailResponse = response.data;
            return emailResponse.data;
        } catch (error: Error | any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

interface resetPassword {
    id: string;
    newPassword: string;
}

export const resetPassword = createAsyncThunk(
    'user/resetPassword',
    async ({ id, newPassword }: resetPassword, { rejectWithValue }) => {
        try {
            const response = await resetPasswordAPI(id, newPassword);
            const emailResponse = response.data;
            return emailResponse.data;
        } catch (error: Error | any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);