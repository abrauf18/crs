'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import loginimage1 from '@/app/assets/images/leftside1.svg';
import loginimage2 from '@/app/assets/images/leftside2.svg';
import loginimage3 from '@/app/assets/images/leftside3.svg';
import loginimage4 from '@/app/assets/images/leftside4.svg';
import signupImage from '@/app/assets/images/signup1.svg';
import { Button } from '@/app/components/ui/button';
import AppInput from '@/app/components/common/AppInput';
import crscLogo from '@/app/assets/images/crsclogo.svg';
import { Label } from '@/app/components/ui/label';
import LeftSide from '../../common/LeftSide';
import { OTPInput } from './OTPInput';

function VerifyOTP() {
    const { push } = useRouter();

    const images = [signupImage, loginimage2, loginimage3, loginimage4];
    const metaText = {
        title: 'Reset Password!',
        description: 'Forgot Your Password Don’t worry lets Recover It',
    };
    return (
        <section className="flex lg:flex-row flex-col justify-between  h-screen">
            <div className="w-full hidden lg:block">
                <LeftSide images={images} metaText={metaText} />
            </div>
            <div className="w-full  flex flex-col justify-center items-center ">
                <div className=" p-8 md:p-10 w-[100%] lg:w-[65%] flex flex-col ">
                    <div className="flex  lg:items-start flex-col">
                        <Image
                            height={100}
                            width={100}
                            src={crscLogo}
                            alt="CRSC Logo"
                        />
                        <h1 className="text-2xl font-semibold mt-6">
                            Forgot Password
                        </h1>
                        <p className="text-sm font-medium text-dark-gray">
                            Enter the code we sent to your email below, so that
                            we can verify that you are who you say you are.
                        </p>
                        <div className="text-sm font-medium text-dark-gray my-6">
                            <p>We Have Send Verification Code On</p>
                            <p className="text-primary-color">abc@zyx.com</p>
                        </div>
                    </div>
                    <form>
                        <div className="mt-2">
                            <Label htmlFor="email">Verification Code</Label>

                            <div className="grid grid-cols-4 gap-4">
                                <OTPInput />
                                <OTPInput />
                                <OTPInput />
                                <OTPInput />
                            </div>
                        </div>

                        <div className="text-center mt-10">
                            <Button
                                type="button"
                                className="w-full bg-primary-color lg:hover:bg-orange-400 mb-3"
                                onClick={() =>
                                    push(
                                        '/forgot-password/verify-otp/new-password'
                                    )
                                }
                            >
                                Verify Now
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default VerifyOTP;
