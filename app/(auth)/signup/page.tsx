import React from 'react';
import { Metadata } from 'next';
import Signup from '@/components/modules/auth/Signup';

export const metadata: Metadata = {
    title: 'Sign Up',
    description: 'Create your CRS teacher account.',
};

function SignupPage() {
    return <Signup />;
}

export default SignupPage;
