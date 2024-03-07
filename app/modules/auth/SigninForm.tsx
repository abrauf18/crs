'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import crscLogo from '@/app/assets/images/crsclogo.svg';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import GoogleIcon from '@/app/assets/icons/GoogleIcon';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getSession, signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Input from '@/app/components/common/Input';
import Loader from '@/app/components/common/Loader';
import { validationError } from '@/lib/utils';
import { CheckBox } from './Checkbox';

function SigninForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onChange', reValidateMode: 'onChange' });

    // eslint-disable-next-line consistent-return
    const onFormSubmit = async (data: any) => {
        try {
            setLoading(true);
            const { email, password } = data;
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            const session = await getSession();
            if (session) {
                const role = session?.user?.role;
                if (role) {
                    toast.success('Login Successful');
                    return router.push(`/${role}`);
                }
                return toast.error(session?.user?.message);
            }
        } catch (error) {
            return error;
        } finally {
            setLoading(false);
        }
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
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <div className="mt-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        name="email"
                        placeholder="Enter Email"
                        type="email"
                        errors={errors}
                        register={register('email', {
                            required: {
                                value: true,
                                message: validationError.REQUIRED_FIELD,
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: validationError.VALID_EMAIL,
                            },
                        })}
                    />
                </div>

                <div className="mt-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        name="password"
                        placeholder="Enter Password"
                        type="password"
                        errors={errors}
                        register={register('password', {
                            required: {
                                value: true,
                                message: validationError.REQUIRED_FIELD,
                            },
                        })}
                    />
                </div>
                <div className="flex mb-12 mt-5">
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
                        {loading ? (
                            <Loader color="white" size="4" />
                        ) : (
                            'Sign In'
                        )}
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
