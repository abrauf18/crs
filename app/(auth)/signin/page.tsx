import React from 'react';
import { Metadata } from 'next';
import Signin from '@/app/modules/auth/Signin';

export const metadata: Metadata = {
    title: 'Sign In',
    description: 'Log in securely to your CRS account.',
};

function SigninPage() {
    return <Signin />;
}

export default SigninPage;
