import { loginAPI } from '@/app/api/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface LoginPayload {
    email: string;
    password: string;
}

const login = createAsyncThunk(
    'user/login',
    async ({ email, password }: LoginPayload, { rejectWithValue }) => {
        try {
            const response = await loginAPI(email, password);
            return response.data;
        } catch (error: Error | any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export default login;
