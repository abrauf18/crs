import axios from 'axios';

export const loginAPI = async (email: string, password: string) => {
    const result = await axios.post('http://localhost:8000/auth/login', {
        email,
        password,
    });

    return result;
};

export const forgotPasswordAPI = async (email: string) => {
    const result = await axios.post(
        'http://localhost:8000/auth/forgot-password',
        {
            email,
        }
    );

    return result;
};

export const verifyOTPAPI = async (userId: string, OTP: string) => {
    const result = await axios.post('http://localhost:8000/auth/verify-otp', {
        userId,
        OTP,
    });

    return result;
};
