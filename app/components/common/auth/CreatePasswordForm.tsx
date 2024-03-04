import React from 'react';
import Image from 'next/image';
import { Button } from '@/app/components/ui/button';
import crscLogo from '@/app/assets/images/crsclogo.svg';
import { Label } from '@/app/components/ui/label';
import { resetPassword } from '@/lib/features/auth/authAction';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Input from '../Input';

function CreatePasswordForm({ description }: { description: string }) {
    const { push } = useRouter();
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state.user);

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({ mode: 'onChange', reValidateMode: 'onChange' });

    const onFormSubmit = async (data: any) => {
        const { newPassword } = data;
        const { id } = state.data;
        const response = await dispatch(resetPassword({ id, newPassword }));
        if (response.type === 'user/verifyOTP/rejected') {
            toast.error(response.payload);
            return push('/forgot-password');
        }
        toast.success('Successfully Updated Password');
        return push('/signin');
    };
    return (
        <div className=" p-8 md:p-10 w-[100%] lg:w-[75%] flex flex-col ">
            <div className="flex  lg:items-start flex-col">
                <Image
                    height={100}
                    width={100}
                    src={crscLogo}
                    alt="CRSC Logo"
                />
                <h1 className="text-2xl font-semibold mt-6">Create Password</h1>
                <p className="text-sm font-medium text-dark-gray mb-6">
                    {description}
                </p>
            </div>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <div className="mt-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input
                        name="newPassword"
                        placeholder="Enter Password"
                        type="password"
                        errors={errors}
                        register={register('newPassword', {
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

                <div className="mt-2">
                    <Label htmlFor="password">Confirm Password</Label>
                    <Input
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        type="password"
                        errors={errors}
                        register={register('confirmPassword', {
                            required: {
                                value: true,
                                message: 'This is required',
                            },
                            validate: (value) =>
                                value === getValues('newPassword') ||
                                'Passwords must match',
                        })}
                    />
                </div>

                <div className="text-center mt-8">
                    <Button
                        type="submit"
                        className="w-full bg-primary-color lg:hover:bg-orange-400 mb-3"
                    >
                        Create Password
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default CreatePasswordForm;
