'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import Image from 'next/image';
import crscLogo from '@/app/assets/images/crsclogo.svg';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import GoogleIcon from '@/app/assets/icons/GoogleIcon';
import AppInput from '@/app/components/common/AppInput';
import { CheckBox } from './Checkbox';

function SigninForm() {
    const [password, setPassword] = useState('');
    const [isUpperCase, setIsUpperCase] = useState(false);
    const [isLowerCase, setIsLowerCase] = useState(false);
    const [hasSpecialChar, setHasSpecialChar] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handlePasswordChange = (event: any) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    };

    const validatePassword = (newPassword: any) => {
        setIsUpperCase(/[A-Z]/.test(newPassword));
        setIsLowerCase(/[a-z]/.test(newPassword));
        setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(newPassword));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setFormSubmitted(true);
    };
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
                    <AppInput type="email" id="email" placeholder="Email" />
                </div>

                <div className="mt-2">
                    <Label htmlFor="password ">Password</Label>

                    <input
                        className={`mt-1 block w-full px-3 py-3 bg-slate-100 border rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ${
                        password && isUpperCase && isLowerCase && hasSpecialChar
                            ? 'border-green-500'
                            : 'border-red-400'
                    }`}
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>

                {/* If error occour */}

                <div className="flex space-y-2 lg:space-y-0 lg:flex-row flex-col lg:space-x-3 mb-4 mt-2">
                    <div
                        className={`flex space-x-1 items-center ${
                            isUpperCase ? 'text-green-500' : 'text-red-500'
                        }`}
                    >
                        <Check
                            size={20}
                            color={isUpperCase ? '#7AA43E' : '#E6500D'}
                        />
                        <p className="text-xs">At Least 1 Uppercase</p>
                    </div>
                    <div
                        className={`flex space-x-1 items-center ${
                            isLowerCase ? 'text-green-500' : 'text-red-500'
                        }`}
                    >
                        <Check
                            size={20}
                            color={isLowerCase ? '#7AA43E' : '#E6500D'}
                        />
                        <p className="text-xs">At Least 1 Lowercase</p>
                    </div>
                    <div
                        className={`flex space-x-1 items-center ${
                            hasSpecialChar ? 'text-green-500' : 'text-red-500'
                        }`}
                    >
                        <Check
                            size={20}
                            color={hasSpecialChar ? '#7AA43E' : '#E6500D'}
                        />
                        <p className="text-xs">At Least 1 Special Character</p>
                    </div>
                </div>

                <div className="flex mb-12">
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
                        Sign In
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
