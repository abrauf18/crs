"use server";

export const loginAPI = async (email: string, password: string) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                userinfo: email,
                password,
            }),
        }
    );

    const data = await response.json();
    return { data, status: response.status, statusText: response.statusText };
};

export const forgotPasswordAPI = async (email: string) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/forgot-password`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                email,
            }),
        }
    );

    const data = await response.json();
    return { data, status: response.status, statusText: response.statusText };
};

export const resetPasswordAPI = async (
    email: string,
    verificationCode: string,
    newPassword: string
) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                email,
                verificationCode,
                newPassword,
            }),
        }
    );

    const data = await response.json();
    return { data, status: response.status, statusText: response.statusText };
};

export const signupInviteAPI = async (
    name: string,
    email: string,
    role: string,
    accessToken: string,
    schoolId?: string
) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/emailBasedInvite`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                name,
                email,
                role,
                accessToken,
                schoolId,
            }),
        }
    );

    const data = await response.json();
    return { data, status: response.status, statusText: response.statusText };
};

export const registerTeacherAPI = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
            }),
        }
    );

    const data = await response.json();
    return { data, status: response.status, statusText: response.statusText };
};

export const verifyEmailAPI = async (
    email: string,
    verificationCode: string
) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                email,
                verificationCode,
            }),
        }
    );

    const data = await response.json();
    return { data, status: response.status, statusText: response.statusText };
};

export const resendOtpAPI = async (email: string, type: string) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/resend-otp`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                email,
                type,
            }),
        }
    );

    const data = await response.json();
    return { data, status: response.status, statusText: response.statusText };
};
