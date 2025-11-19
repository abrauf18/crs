import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, forgotPasswordAPI, resetPasswordAPI, registerTeacherAPI } from '@/app/api/auth';

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
            }
            return rejectWithValue(error.message);
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
            // Return the email so it can be stored in Redux state
            // The backend doesn't return user data, just a success message
            return { email };
        } catch (error: Error | any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue(error.message);
        }
    }
);

interface resetPasswordPayload {
    email: string;
    verificationCode: string;
    newPassword: string;
}

export const resetPassword = createAsyncThunk(
    'user/resetPassword',
    async (
        { email, verificationCode, newPassword }: resetPasswordPayload,
        { rejectWithValue }
    ) => {
        try {
            const response = await resetPasswordAPI(
                email,
                verificationCode,
                newPassword
            );
            const emailResponse = response.data;
            return emailResponse.data;
        } catch (error: Error | any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue(error.message);
        }
    }
);

interface RegisterTeacherPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const registerTeacher = createAsyncThunk(
    'user/registerTeacher',
    async (
        { firstName, lastName, email, password }: RegisterTeacherPayload,
        { rejectWithValue }
    ) => {
        try {
            const response = await registerTeacherAPI(
                firstName,
                lastName,
                email,
                password
            );
            const registerResponse = response.data;
            return registerResponse.data;
        } catch (error: Error | any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue(error.message);
        }
    }
);
