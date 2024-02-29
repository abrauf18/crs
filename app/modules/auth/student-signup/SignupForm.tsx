'use client';

import React from 'react';
import Image from 'next/image';
import crscLogo from '@/app/assets/images/crsclogo.svg';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import GoogleIcon from '@/app/assets/icons/GoogleIcon';
import AppInput from '@/app/components/common/AppInput';
import { useAppDispatch } from '@/lib/hooks';
import { signup } from '@/lib/features/auth/authAction';
// import Loader from '@/app/components/common/Loader';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import PasswordErrors from '@/app/components/common/auth/PasswordErrors';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';
import Input from '@/app/components/common/Input';
import { CheckBox } from '../Checkbox';

function SignupForm({ token }: { token: string }) {
    // const [isPageLoading, setIsPageLoading] = useState(false);
    const dispatch = useAppDispatch();
    const { push } = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onChange', reValidateMode: 'onChange' });

    const onFormSubmit = async (data: any) => {
        const { name, email, password } = data;
        const response = await dispatch(
            signup({ name, email, password, token })
        );
        if (response.type === 'user/signup/rejected') {
            return toast.error(response.payload);
        }
        toast.success('signup Successful');
        return push('/signin');
    };

    // useEffect(() => {
    //     setIsPageLoading(true);
    // }, []);
    // if (!isPageLoading) {
    //     return <Loader />;
    // }

    return (
        <div className=" px-8 py-2 md:px-10 md:py-2 w-[100%] lg:w-[75%] flex flex-col ">
            <div className="flex lg:items-start flex-col">
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
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <div className="mt-2">
                    <Label htmlFor="name">User Name</Label>
                    <Input
                        name="name"
                        placeholder="Enter Name"
                        type="text"
                        errors={errors}
                        register={register('name', {
                            required: {
                                value: true,
                                message: 'This is required',
                            },
                        })}
                    />
                </div>
                <div className="mt-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        name="email"
                        placeholder="Enter Email"
                        type="email"
                        errors={errors}
                        register={register('email', {
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Please enter a valid Email',
                            },
                            required: {
                                value: true,
                                message: 'This is required',
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
                                message: 'This is required',
                            },
                            pattern: {
                                value:
                                    // eslint-disable-next-line no-useless-escape
                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()_\-\+=:;"'?\/>.<,{}\[\]])[a-zA-Z\d~`!@#$%^&*()_\-\+=:;"'?\/>.<,{}\[\]]{8,}$/,
                                message:
                                    'Password must be 8 characters and must contain atleast 1 small alphabet, 1 capital alphabet, 1 numeric value and 1 special character',
                            },
                            minLength: {
                                value: 8,
                                message:
                                    'Password should contain minimum 8 characters long',
                            },
                            maxLength: {
                                value: 20,
                                message:
                                    'Password should contain maximum 20 characters long',
                            },
                        })}
                    />
                </div>

                <div className="flex mb-12 mt-5">
                    <CheckBox label="Remember Me" />
                </div>
                <div className="text-center">
                    <Button
                        type="submit"
                        className="w-full bg-primary-color lg:hover:bg-orange-400 mb-3"
                    >
                        Sign Up
                    </Button>
                    <span className="text-black text-[12px]">Or</span>
                    <Button className="w-full bg-slate-200 text-black mt-3 lg:hover:bg-slate-300">
                        <GoogleIcon width={20} height={20} className="mr-2" />
                        Sign Up With Google
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default SignupForm;
