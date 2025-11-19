'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useForm, FormProvider } from 'react-hook-form';
import { Eye, EyeOff, Mail, ArrowLeft } from 'lucide-react';
import crscLogo from '@/app/assets/images/crsclogo.svg';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import Input from '@/app/components/common/Input';
import Loader from '@/app/components/common/ButtonLoader';
import { validationError } from '@/lib/utils';
import {
    registerTeacherAPI,
    verifyEmailAPI,
    resendOtpAPI,
} from '@/app/api/auth';

function SignupForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showVerification, setShowVerification] = useState(false);
    const [registeredEmail, setRegisteredEmail] = useState('');
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

    const defaultValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const methods = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues,
    });

    const { handleSubmit, watch } = methods;

    const password = watch('password');

    const onFormSubmit = async (data: any) => {
        try {
            setLoading(true);
            const { firstName, lastName, email, password } = data;

            const response = await registerTeacherAPI(
                firstName,
                lastName,
                email,
                password
            );

            if (response.data.status === 'success') {
                toast.success(
                    'Registration successful! Please check your email for verification code.'
                );
                setRegisteredEmail(email);
                setShowVerification(true);
            }
        } catch (error: any) {
            console.error('Registration error:', error);
            if (error.response) {
                // Server responded with error
                const message =
                    error.response.data?.message ||
                    error.response.data?.error ||
                    'Registration failed';
                toast.error(message);
            } else if (error.request) {
                // Request was made but no response received
                toast.error(
                    'Unable to connect to server. Please check your connection.'
                );
            } else {
                toast.error('Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword((prev) => !prev);
    };

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
            const response = await verifyEmailAPI(registeredEmail, code);

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
            const response = await resendOtpAPI(registeredEmail, 'email');

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

    const handleBackToSignup = () => {
        setShowVerification(false);
        setVerificationCode(['', '', '', '', '', '']);
        setRegisteredEmail('');
    };

    if (showVerification) {
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
                        {registeredEmail}
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
                            Didn&#39;t receive the code?
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

                    <button
                        type="button"
                        onClick={handleBackToSignup}
                        className="flex items-center gap-1 text-sm text-dark-gray mt-4 lg:hover:text-primary-color"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Sign Up
                    </button>
                </div>
            </div>
        );
    }

    return (
        <FormProvider {...methods}>
            <div className="p-8 md:p-10 w-[100%] lg:w-[75%] flex flex-col">
                <div className="flex lg:items-start flex-col">
                    <Image
                        height={100}
                        width={100}
                        src={crscLogo}
                        alt="CRSC Logo"
                    />
                    <h1 className="text-2xl font-semibold mt-6">Sign Up</h1>
                    <p className="text-sm font-medium text-dark-gray mb-6">
                        Create your teacher account
                    </p>
                </div>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="mt-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                name="firstName"
                                placeholder="Enter First Name"
                                type="text"
                                rules={{
                                    required: {
                                        value: true,
                                        message: validationError.REQUIRED_FIELD,
                                    },
                                }}
                            />
                        </div>
                        <div className="mt-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                name="lastName"
                                placeholder="Enter Last Name"
                                type="text"
                                rules={{
                                    required: {
                                        value: true,
                                        message: validationError.REQUIRED_FIELD,
                                    },
                                }}
                            />
                        </div>
                    </div>
                    <div className="mt-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            name="email"
                            placeholder="Enter Email"
                            type="email"
                            rules={{
                                required: {
                                    value: true,
                                    message: validationError.REQUIRED_FIELD,
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: validationError.VALID_EMAIL,
                                },
                            }}
                        />
                    </div>
                    <div className="mt-2 relative">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            name="password"
                            placeholder="Enter Password"
                            type={showPassword ? 'text' : 'password'}
                            rules={{
                                required: {
                                    value: true,
                                    message: validationError.REQUIRED_FIELD,
                                },
                                minLength: {
                                    value: 8,
                                    message:
                                        'Password must be at least 8 characters',
                                },
                            }}
                        />
                        <button
                            type="button"
                            onClick={toggleShowPassword}
                            className="absolute right-3 top-10 mt-1"
                        >
                            {showPassword ? (
                                <Eye className="w-5 h-5" />
                            ) : (
                                <EyeOff className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                    <div className="mt-2 relative">
                        <Label htmlFor="confirmPassword">
                            Confirm Password
                        </Label>
                        <Input
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            rules={{
                                required: {
                                    value: true,
                                    message: validationError.REQUIRED_FIELD,
                                },
                                validate: (value: string) =>
                                    value === password ||
                                    'Passwords do not match',
                            }}
                        />
                        <button
                            type="button"
                            onClick={toggleShowConfirmPassword}
                            className="absolute right-3 top-10 mt-1"
                        >
                            {showConfirmPassword ? (
                                <Eye className="w-5 h-5" />
                            ) : (
                                <EyeOff className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                    <div className="text-center mt-8">
                        <Button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-primary-color lg:hover:bg-orange-400 mb-3"
                        >
                            {loading ? <Loader /> : 'Sign Up'}
                        </Button>
                    </div>
                    <div className="text-center mt-4">
                        <span className="text-sm text-dark-gray">
                            Already have an account?{' '}
                            <Link
                                href="/signin"
                                className="text-primary-color lg:hover:text-orange-400 font-medium"
                            >
                                Sign In
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </FormProvider>
    );
}

export default SignupForm;
