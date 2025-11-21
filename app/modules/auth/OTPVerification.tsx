'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Mail, ArrowLeft } from 'lucide-react';
import crscLogo from '@/app/assets/images/crsclogo.svg';
import { Button } from '@/app/components/ui/button';
import Loader from '@/app/components/common/ButtonLoader';
import { verifyEmailAPI, resendOtpAPI } from '@/app/api/auth';

interface OTPVerificationProps {
    email: string;
}

function OTPVerification({ email }: OTPVerificationProps) {
    const router = useRouter();
    const [verificationCode, setVerificationCode] = useState([
        '',
        '',
        '',
        '',
        '',
        '',
    ]);
    const [verifying, setVerifying] = useState(false);
    const [resending, setResending] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const inputIds = useRef<string[]>(
        Array.from(
            { length: 6 },
            () => `otp-${Math.random().toString(36).slice(2, 9)}`
        )
    );

    const handleCodeChange = (index: number, value: string) => {
        if (value.length > 1) {
            value = value.slice(-1);
        }

        if (!/^\d*$/.test(value)) return;

        const newCode = [...verificationCode];
        newCode[index] = value;
        setVerificationCode(newCode);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return;

        const newCode = [...verificationCode];
        for (let i = 0; i < pastedData.length; i++) {
            newCode[i] = pastedData[i];
        }
        setVerificationCode(newCode);

        const nextIndex = Math.min(pastedData.length, 5);
        inputRefs.current[nextIndex]?.focus();
    };

    const handleVerifyEmail = async () => {
        const code = verificationCode.join('');
        if (code.length !== 6) {
            toast.error('Please enter the complete 6-digit verification code');
            return;
        }

        try {
            setVerifying(true);
            const response = await verifyEmailAPI(email, code);

            if (response.data.status === 'success') {
                toast.success(
                    'Email verified successfully! You can now sign in.'
                );
                router.push('/signin');
            }
        } catch (error: any) {
            console.error('Verification error:', error);
            if (error.response) {
                const message =
                    error.response.data?.message ||
                    error.response.data?.error ||
                    'Verification failed';
                toast.error(message);
            } else if (error.request) {
                toast.error(
                    'Unable to connect to server. Please check your connection.'
                );
            } else {
                toast.error('Verification failed. Please try again.');
            }
        } finally {
            setVerifying(false);
        }
    };

    const handleResendCode = async () => {
        try {
            setResending(true);
            const response = await resendOtpAPI(email, 'email');

            if (response.data.status === 'success') {
                toast.success('Verification code resent to your email');
                setVerificationCode(['', '', '', '', '', '']);
                inputRefs.current[0]?.focus();
            }
        } catch (error: any) {
            console.error('Resend error:', error);
            if (error.response) {
                const message =
                    error.response.data?.message ||
                    error.response.data?.error ||
                    'Failed to resend code';
                toast.error(message);
            } else {
                toast.error('Failed to resend code. Please try again.');
            }
        } finally {
            setResending(false);
        }
    };

    return (
        <div className="p-8 md:p-10 w-[100%] lg:w-[75%] flex flex-col">
            <div className="flex lg:items-start flex-col">
                <Image
                    height={100}
                    width={100}
                    src={crscLogo}
                    alt="CRSC Logo"
                />
                <h1 className="text-2xl font-semibold mt-6">
                    Verify Your Email
                </h1>
                <p className="text-sm font-medium text-dark-gray mb-2">
                    We&#39;ve sent a verification code to
                </p>
                <p className="text-sm font-semibold text-primary-color mb-6">
                    {email}
                </p>
            </div>

            <div className="flex flex-col items-center">
                <div className="flex items-center justify-center mb-6">
                    <Mail className="w-16 h-16 text-primary-color" />
                </div>

                <p className="text-sm text-dark-gray mb-4 text-center">
                    Enter the 6-digit verification code
                </p>

                <div className="flex gap-2 mb-6" onPaste={handlePaste}>
                    {verificationCode.map((digit, index) => (
                        <input
                            key={inputIds.current[index]}
                            ref={(el) => {
                                inputRefs.current[index] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) =>
                                handleCodeChange(index, e.target.value)
                            }
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-primary-color focus:outline-none transition-colors"
                        />
                    ))}
                </div>

                <Button
                    onClick={handleVerifyEmail}
                    disabled={
                        verifying || verificationCode.join('').length !== 6
                    }
                    className="w-full bg-primary-color lg:hover:bg-orange-400 mb-3"
                >
                    {verifying ? <Loader /> : 'Verify Email'}
                </Button>

                <div className="text-center mt-4">
                    <span className="text-sm text-dark-gray">
                        Didn&#39;t receive the code?{' '}
                        <button
                            type="button"
                            onClick={handleResendCode}
                            disabled={resending}
                            className="text-primary-color lg:hover:text-orange-400 font-medium disabled:opacity-50"
                        >
                            {resending ? 'Sending...' : 'Resend'}
                        </button>
                    </span>
                </div>

                <Link
                    href="/signup"
                    className="flex items-center gap-1 text-sm text-dark-gray mt-4 lg:hover:text-primary-color"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Sign Up
                </Link>
            </div>
        </div>
    );
}

export default OTPVerification;