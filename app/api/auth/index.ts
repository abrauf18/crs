import axios from 'axios';

axios.defaults.withCredentials = true;

export const loginAPI = async (email: string, password: string) => {
    const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
        {
            userinfo: email,
            password,
        }
    );

    return result;
};

export const forgotPasswordAPI = async (email: string) => {
    const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/forgot-password`,
        {
            email,
        }
    );

    return result;
};

export const resetPasswordAPI = async (
    email: string,
    verificationCode: string,
    newPassword: string
) => {
    const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password`,
        {
            email,
            verificationCode,
            newPassword,
        }
    );

    return result;
};

export const signupInviteAPI = async (
    name: string,
    email: string,
    role: string,
    accessToken: string,
    schoolId?: string
) => {
    const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/emailBasedInvite`,
        {
            name,
            email,
            role,
            accessToken,
            schoolId,
        }
    );

    return result;
};

export const registerTeacherAPI = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
) => {
    const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
        {
            firstName,
            lastName,
            email,
            password,
        }
    );

    return result;
};

export const verifyEmailAPI = async (
    email: string,
    verificationCode: string
) => {
    const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email`,
        {
            email,
            verificationCode,
        }
    );

    return result;
};

export const resendOtpAPI = async (email: string, type: string) => {
    const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/resend-otp`,
        {
            email,
            type,
        }
    );

    return result;
};
