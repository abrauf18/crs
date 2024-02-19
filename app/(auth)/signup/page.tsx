'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import PageNotFound from '@/app/modules/error/PageNotFound';
import Signup from '@/app/modules/auth/student-signup/Signup';

function SignupPage() {
    const searchParams = useSearchParams();
    const hasToken = searchParams.has('token');
    return hasToken ? <Signup /> : <PageNotFound />;
}

export default SignupPage;
