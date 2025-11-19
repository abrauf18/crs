'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useForm, FormProvider } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import crscLogo from '@/app/assets/images/crsclogo.svg';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import Input from '@/app/components/common/Input';
import Loader from '@/app/components/common/ButtonLoader';
import { validationError } from '@/lib/utils';
import { registerTeacherAPI } from '@/app/api/auth';

function SignupForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
                router.push(`/signup/otp?email=${encodeURIComponent(email)}`);
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
