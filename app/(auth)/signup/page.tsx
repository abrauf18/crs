import React from 'react';
import PageNotFound from '@/app/modules/error/PageNotFound';
import Signup from '@/app/modules/auth/student-signup/Signup';

function SignupPage({ searchParams }: { searchParams: { token: string } }) {
    if (!searchParams.token) {
        return <PageNotFound />;
    }
    return <Signup token={searchParams.token} />;
}

export default SignupPage;
