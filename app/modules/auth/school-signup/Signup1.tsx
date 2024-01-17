'use client';

import React, { useState } from 'react';
import crscLogo from '@/app/assets/images/crsclogo.svg';
import Image from 'next/image';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import GoogleIcon from '@/app/assets/icons/GoogleIcon';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { CheckBox } from '../Checkbox';
import Steps from './Steps';

function SchoolSignup1() {
    return (
        <div className=" p-10 w-[95%] lg:w-[75%] flex flex-col ">
            <Steps step={1} totalSteps={3} />

            <div className="flex items-center lg:items-start flex-col">
                <h1 className="text-2xl font-semibold mt-6">Create Account</h1>
                <p className="text-sm font-medium text-dark-gray mb-6">
                    Enter Details to Create your Account
                </p>
            </div>
            <form>
                <Label htmlFor="email">Email Address</Label>
                <input
                    className="mb-5 mt-1 block w-full px-3 py-2 bg-slate-200 border rounded-md text-sm shadow-sm placeholder-slate-400
                             focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    type="email"
                    id="email"
                    placeholder="Enter Email"
                />

                <Label htmlFor="name ">User Name</Label>
                <input
                    className="mb-2 mt-1 block w-full px-3 py-2 bg-slate-200 border rounded-md text-sm shadow-sm placeholder-slate-400
                               focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    type="name"
                    id="name"
                    placeholder="Enter Name"
                />

                <Label htmlFor="password ">Password</Label>
                <input
                    className="mb-2 mt-1 block w-full px-3 py-2 bg-slate-200 border rounded-md text-sm shadow-sm placeholder-slate-400
                               focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                />

                <div className="flex mb-12">
                    <CheckBox label="Remember Me" />
                    <Link
                        href="#"
                        className="text-xs text-black ml-auto hover:text-sky-400"
                    >
                        Forgot Password?
                    </Link>
                </div>
                <div className="text-center">
                    <Button
                        type="submit"
                        className="w-full bg-primary-color hover:bg-orange-400 mb-3"
                    >
                        Sign In
                    </Button>
                    <span className="text-black text-[12px]">Or</span>
                    <Button className="w-full bg-slate-200 text-black mt-3 hover:bg-slate-300">
                        <GoogleIcon width={20} height={20} className="mr-2" />
                        Sign In With Google
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default SchoolSignup1;
