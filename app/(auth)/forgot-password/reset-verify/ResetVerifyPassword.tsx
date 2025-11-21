'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useForm, FormProvider } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import crscLogo from '@/app/assets/images/crsclogo.svg';
import { Label } from '@/app/components/ui/label';
import { useAppDispatch } from '@/lib/react-redux/hooks';
import { forgotPassword } from '@/lib/react-redux/features/auth/authAction';
import Loader from '@/app/components/common/ButtonLoader';
import { OTPInput } from '@/app/modules/auth/forgot-password-steps/forgetPassword/verify-otp/OTPInput';
import Input from '@/app/components/common/Input';
import { validationError } from '@/lib/utils';

interface ResetVerifyPasswordProps {
    email: string;
}

interface FormData {
    password: string;
    confirmPassword: string;
}

function ResetVerifyPassword({ email }: ResetVerifyPasswordProps) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    
    // OTP state
    const [otpArray, setOtpArray] = useState(['', '', '', '', '', '']);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [verifyingOtp, setVerifyingOtp] = useState(false);
    const [resending, setResending] = useState(false);
    
    // Password state
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const methods = useForm<FormData>({
        mode: 'onChange',
        reValidateMode: 'onChange',
    });

    const { handleSubmit, watch } = methods;
    const password = watch('password');

    // OTP Functions
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

    const handleVerifyOtp = async () => {
        const OTP = otpArray.join('');
        if (OTP.length !== 6) {
            toast.error('Please enter a valid 6-digit OTP');
            return;
        }

        try {
            setVerifyingOtp(true);
            
            // Here you would call your OTP verification API
            // const response = await verifyOtpAPI(email, OTP);
            
            // For now, simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setIsOtpVerified(true);
            toast.success('OTP verified! Please enter your new password.');
        } catch (error: any) {
            console.error('OTP verification error:', error);
            toast.error('Invalid OTP. Please try again.');
        } finally {
            setVerifyingOtp(false);
        }
    };

    const handleResendOTP = async () => {
        setResending(true);
        const response = await dispatch(
            forgotPassword({ email })
        );
        setResending(false);
        if (response.type === 'user/forgotPassword/rejected') {
            toast.error(response.payload as string);
            return;
        }
        setOtpArray(['', '', '', '', '', '']);
        toast.success('OTP resent successfully');
    };

    // Password Reset Function
    const onSubmit = async (data: FormData) => {
        if (!isOtpVerified) {
            toast.error('Please verify OTP first');
            return;
        }

        try {
            setLoading(true);
            
            // Here you would call your reset password API
            // const response = await resetPasswordAPI(email, otpArray.join(''), data.password);
            
            // For now, simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            toast.success('Password reset successfully! You can now sign in with your new password.');
            router.push('/signin');
        } catch (error: any) {
            console.error('Reset password error:', error);
            toast.error('Failed to reset password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormProvider {...methods}>
            <div className="p-8 md:p-10 w-[100%] lg:w-[65%] flex flex-col">
                <div className="flex lg:items-start flex-col">
                    <Image
                        height={100}
                        width={100}
                        src={crscLogo}
                        alt="CRSC Logo"
                    />
                    <h1 className="text-2xl font-semibold mt-6">
                        Reset Password
                    </h1>
                    <p className="text-sm font-medium text-dark-gray">
                        {!isOtpVerified 
                            ? 'Please enter the code sent to your email for verification.'
                            : 'Create your new password.'
                        }
                    </p>
                    <div className="text-sm font-medium text-dark-gray my-6">
                        <p>We Have Send Verification Code On</p>
                        <p className="text-primary-color">
                            {email}
                        </p>
                    </div>
                </div>

                {/* OTP Verification Section */}
                {!isOtpVerified && (
                    <div className="mb-8">
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

                        <div className="text-center mt-6">
                            <Button
                                type="button"
                                className="w-full bg-primary-color lg:hover:bg-orange-400 mb-3"
                                onClick={handleVerifyOtp}
                                disabled={verifyingOtp}
                            >
                                {verifyingOtp ? <Loader /> : 'Verify OTP'}
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
                    </div>
                )}

                {/* Password Reset Section */}
                {isOtpVerified && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mt-2 relative">
                            <Label htmlFor="password">New Password</Label>
                            <Input
                                name="password"
                                placeholder="Enter New Password"
                                type={showPassword ? 'text' : 'password'}
                                rules={{
                                    required: {
                                        value: true,
                                        message: validationError.REQUIRED_FIELD,
                                    },
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters',
                                    },
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
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
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input
                                name="confirmPassword"
                                placeholder="Confirm New Password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                rules={{
                                    required: {
                                        value: true,
                                        message: validationError.REQUIRED_FIELD,
                                    },
                                    validate: (value: string) =>
                                        value === password || 'Passwords do not match',
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary-color lg:hover:bg-orange-400 mb-3"
                            >
                                {loading ? <Loader /> : 'Reset Password'}
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </FormProvider>
    );
}

export default ResetVerifyPassword;