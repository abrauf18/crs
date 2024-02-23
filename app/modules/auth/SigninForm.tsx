'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import crscLogo from '@/app/assets/images/crsclogo.svg';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import GoogleIcon from '@/app/assets/icons/GoogleIcon';
import AppInput from '@/app/components/common/AppInput';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { login } from '@/lib/features/auth/authAction';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { CheckBox } from './Checkbox';

function SigninForm() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.user);
    const { push } = useRouter();
    const handlePasswordChange = (event: any) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
    };

    const handleEmailChange = (event: any) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
    };

    // eslint-disable-next-line consistent-return
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const response = await dispatch(login({ email, password }));
        if (response.type === 'user/login/rejected') {
            return toast.error(response.payload);
        }
        toast.success('Login Successful');
        console.log('userToken', response?.payload?.accessToken);
        localStorage.setItem('userToken', response?.payload?.accessToken);
        const route = response?.payload?.role;
        push(`/${route}`);
    };

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
    }, []);
    if (!isLoading) {
        return <div>Loading...</div>;
    }
    
    return (
        <div className=" p-8 md:p-10 w-[100%] lg:w-[75%] flex flex-col ">
            <div className="flex lg:items-start flex-col">
                <Image
                    height={100}
                    width={100}
                    src={crscLogo}
                    alt="CRSC Logo"
                />
                <h1 className="text-2xl font-semibold mt-6">Sign In</h1>
                <p className="text-sm font-medium text-dark-gray mb-6">
                    Enter Your Email & Password
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <Label htmlFor="email">Email Address</Label>
                    <AppInput
                        type="email"
                        id="email"
                        placeholder="Email"
                        onChange={handleEmailChange}
                    />
                </div>

                <div className="mt-2">
                    <Label htmlFor="password ">Password</Label>

                    <input
                        className="mt-1 block w-full px-3 py-3 bg-slate-100 border rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="flex mb-12 mt-5">
                    <CheckBox label="Remember Me" />
                    <Link
                        href="/forgot-password"
                        className="text-xs text-black ml-auto lg:hover:text-sky-400"
                    >
                        Forgot Password?
                    </Link>
                </div>
                <div className="text-center">
                    <Button
                        type="submit"
                        className="w-full bg-primary-color lg:hover:bg-orange-400 mb-3"
                    >
                        {loading ? 'Loading...' : 'Sign In'}
                    </Button>
                    <span className="text-black text-[12px]">Or</span>
                    <Button className="w-full bg-slate-200 text-black mt-3 lg:hover:bg-slate-300">
                        <GoogleIcon width={20} height={20} className="mr-2" />
                        Sign In With Google
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default SigninForm;
