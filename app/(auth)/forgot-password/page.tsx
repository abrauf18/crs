import React from 'react';
import { Metadata } from 'next';
import ForgotPassword from '@/components/modules/auth/forgetPassword/ForgotPassword';

export const metadata: Metadata = {
    title: 'Reset Password!',
    description: 'Forgot Your Password Dont worry lets Recover It'
};

export default function ForgotPasswordPage() {
    return <ForgotPassword />;
}
