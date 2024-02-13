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
import { CheckBox } from '../Checkbox';

function SignupForm() {
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
                    />
                </div>

                <div className="mt-2">
                    <Label htmlFor="name ">User Name</Label>
                    <AppInput id="name" placeholder="Enter Name" />
                </div>

                <div className="mt-2">
                    <Label htmlFor="password ">Password</Label>

                    <AppInput
                        type="password"
                        id="password"
                        placeholder="Enter Password"
                    />
                </div>

                <div className="flex mb-12 mt-5">
                    <CheckBox label="Remember Me" />
                    {/* <Link
                        href="#"
                        className="text-xs text-black ml-auto lg:hover:text-sky-400"
                    >
                        Forgot Password?
                    </Link> */}
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

export default SignupForm;
