'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import loginimage2 from '@/app/assets/images/leftside2.svg';
import loginimage3 from '@/app/assets/images/leftside3.svg';
import loginimage4 from '@/app/assets/images/leftside4.svg';
import signupImage from '@/app/assets/images/signup1.svg';
import { Button } from '@/app/components/ui/button';
import crscLogo from '@/app/assets/images/crsclogo.svg';
import { Label } from '@/app/components/ui/label';
import { useAppDispatch, useAppSelector } from '@/lib/react-redux/hooks';
import { setOtp } from '@/lib/react-redux/features/auth/authSlice';
import { forgotPassword } from '@/lib/react-redux/features/auth/authAction';
import Loader from '@/app/components/common/ButtonLoader';
import LeftSide from '../../../common/LeftSide';
import { OTPInput } from './OTPInput';

function VerifyOTP({
    handleNextStep,
    handlePreviousStep,
}: {
    handleNextStep: () => void;
    handlePreviousStep: () => void;
}) {
    const images = [signupImage, loginimage2, loginimage3, loginimage4];
    const [otpArray, setOtpArray] = useState(['', '', '', '', '', '']);
    const [resending, setResending] = useState(false);
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state.user);
    const metaText = {
        title: 'Reset Password!',
        description: "Forgot Your Password Don't worry lets Recover It",
    };

    const handleOtpChange = (index: number, value: string) => {
        const updatedOtpArray = [...otpArray];
        updatedOtpArray[index] = value;
        setOtpArray(updatedOtpArray);
    };

    const handleBackspace = (currentIndex: number) => {
        const updatedOtpArray = [...otpArray];
        updatedOtpArray[currentIndex] = '';
        setOtpArray(updatedOtpArray);
        if (currentIndex >= 0) {
            const prevInput = document.getElementById(
                `otpInput_${currentIndex - 1}`
            );
            if (prevInput) {
                prevInput.focus();
            }
        }
    };

    const handleFocusNext = (currentIndex: number) => {
        if (currentIndex < 5) {
            const nextInput = document.getElementById(
                `otpInput_${currentIndex + 1}`
            );
            if (nextInput) {
                nextInput.focus();
            }
        }
    };

    const handlePaste = (pastedOTP: string) => {
        if (pastedOTP) {
            const sanitizedArray = pastedOTP.replace(/\D/g, '').slice(0, 6);
            const otpSepratedArray = sanitizedArray.split('');
            // Pad with empty strings if less than 6 digits
            while (otpSepratedArray.length < 6) {
                otpSepratedArray.push('');
            }
            setOtpArray(otpSepratedArray);
            const lastInput = document.getElementById('otpInput_5');
            if (lastInput) {
                lastInput.focus();
            }
        }
    };

    const handleSubmit = async () => {
        const OTP = otpArray.join('');
        if (OTP.length !== 6) {
            toast.error('Please enter a valid 6-digit OTP');
            return;
        }
        // Store OTP in redux and proceed to password reset step
        dispatch(setOtp(OTP));
        toast.success('OTP verified. Please enter your new password.');
        handleNextStep();
    };

    const handleResendOTP = async () => {
        setResending(true);
        const response = await dispatch(
            forgotPassword({ email: state.data.email })
        );
        setResending(false);
        if (response.type === 'user/forgotPassword/rejected') {
            toast.error(response.payload as string);
            return;
        }
        // Clear the OTP inputs
        setOtpArray(['', '', '', '', '', '']);
        toast.success('OTP resent successfully');
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
                            Please enter the code sent to your email for
                            verification.
                        </p>
                        <div className="text-sm font-medium text-dark-gray my-6">
                            <p>We Have Send Verification Code On</p>
                            <p className="text-primary-color">
                                {state.data.email}
                            </p>
                        </div>
                    </div>
                    <form>
                        <div className="mt-2">
                            <Label htmlFor="email">Verification Code</Label>

                            <div className="grid grid-cols-6 gap-2">
                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                    <OTPInput
                                        index={index}
                                        key={index}
                                        value={otpArray[index]}
                                        onChange={(value) =>
                                            handleOtpChange(index, value)
                                        }
                                        onBackspace={() =>
                                            handleBackspace(index)
                                        }
                                        onFocusNext={() =>
                                            handleFocusNext(index)
                                        }
                                        onPaste={handlePaste}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="text-center mt-10">
                            <Button
                                type="button"
                                className="w-full bg-primary-color lg:hover:bg-orange-400 mb-3"
                                onClick={handleSubmit}
                            >
                                Verify Now
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                disabled={resending}
                                className="w-full"
                                onClick={handleResendOTP}
                            >
                                {resending ? (
                                    <Loader color="primary" />
                                ) : (
                                    'Resend Code'
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default VerifyOTP;
