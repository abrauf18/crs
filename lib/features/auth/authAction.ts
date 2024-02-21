import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface LoginPayload {
    email: string;
    password: string;
}

const login = createAsyncThunk('user/login', async ({email, password}: LoginPayload) => {
    const response = await axios
        .post('http://localhost:8000/auth/login', {
            email,
            password,
        })
        
    console.log(response.data);

    return response.data;
})

export default login;

