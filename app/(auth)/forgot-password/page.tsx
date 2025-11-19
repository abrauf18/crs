import React from 'react';
import { Metadata } from 'next';
import Steps from '@/app/modules/auth/forgot-password-steps/Steps';

export const metadata: Metadata = {
    title: 'Reset Password!',
    description: 'Forgot Your Password Don’t worry lets Recover It',
};

export default function ForgotPasswordPage() {
    return <Steps />;
}
