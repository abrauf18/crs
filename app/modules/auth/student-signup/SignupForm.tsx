'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import Image from 'next/image';
import crscLogo from '@/app/assets/images/crsclogo.svg';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import GoogleIcon from '@/app/assets/icons/GoogleIcon';
import AppInput from '@/app/components/common/AppInput';
import { useAppDispatch } from '@/lib/hooks';
import { signup } from '@/lib/features/auth/authAction';
import Loader from '@/app/components/common/Loader';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { CheckBox } from '../Checkbox';

function SignupForm({ token }: { token: string }) {
    const [email, setEmail] = useState('');
    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    };

    const [username, setUsername] = useState('');
    const handleUsernameChange = (event: any) => {
        setUsername(event.target.value);
    };

    const [password, setPassword] = useState('');
    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    };

    const dispatch = useAppDispatch();
    const { push } = useRouter();
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const response = await dispatch(
            signup({ email, username, password, token })
        );
        if (response.type === 'user/signup/rejected') {
            return toast.error(response.payload);
        }
        toast.success('signup Successful');
        return push('/signin');
    };

    const [isPageLoading, setIsPageLoading] = useState(false);
    useEffect(() => {
        setIsPageLoading(true);
    }, []);
    if (!isPageLoading) {
        return <Loader />;
    }

    return (
        <div className=" px-8 py-2 md:px-10 md:py-2 w-[100%] lg:w-[75%] flex flex-col ">
            <div className="flex  lg:items-start flex-col">
                <Image
                    height={100}
                    width={100}
                    src={crscLogo}
                    alt="CRSC Logo"
                />
                <h1 className="text-2xl font-semibold mt-6">
                    Join School <span className="text-primary-color">XYZ</span>
                </h1>
                <p className="text-sm font-medium text-dark-gray mb-6">
                    Enter Details to Create your Account
                </p>
            </div>
            <form>
                <div className="mt-2">
                    <Label htmlFor="email">Email Address</Label>

                    <AppInput
                        type="email"
                        id="email"
                        placeholder="Enter Email"
                        onChange={handleEmailChange}
                    />
                </div>

                <div className="mt-2">
                    <Label htmlFor="name ">User Name</Label>
                    <AppInput
                        id="name"
                        placeholder="Enter Name"
                        onChange={handleUsernameChange}
                    />
                </div>

                <div className="mt-2">
                    <Label htmlFor="password">Password</Label>

                    <AppInput
                        type="password"
                        id="password"
                        placeholder="Enter Password"
                        onChange={handlePasswordChange}
                    />
                </div>

                <div className="flex mb-12 mt-5">
                    <CheckBox label="Remember Me" />
                </div>
                <div className="text-center">
                    <Button
                        type="submit"
                        className="w-full bg-primary-color lg:hover:bg-orange-400 mb-3"
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </Button>
                    <span className="text-black text-[12px]">Or</span>
                    <Button className="w-full bg-slate-200 text-black mt-3 lg:hover:bg-slate-300">
                        <GoogleIcon width={20} height={20} className="mr-2" />
                        Sign Up With Google
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default SignupForm;
