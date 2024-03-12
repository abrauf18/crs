'use client';

import React, { useState } from 'react';
import { Label } from '@/app/components/ui/label';
import AppDropDown, {
    OptionsInterface,
} from '@/app/components/common/AppDropDown';
import { ModalHeader } from '@/app/components/common/ModalHeader';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/lib/react-redux/hooks';
import { signupInvite } from '@/lib/react-redux/features/auth/authAction';
import { Button } from '@/app/components/ui/button';
import Input from '@/app/components/common/Input';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { validationError } from '@/lib/utils';
import Loader from '@/app/components/common/Loader';

function ProfileModal({ onClose }: any) {
    const [role, setRole] = useState('student');
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state.user);
    const { data, status } = useSession();
    const allRoles: OptionsInterface[] = [
        { label: 'student', value: 'Student' },
        { label: 'teacher', value: 'Teacher' },
        { label: 'school', value: 'School' },
        { label: 'admin', value: 'Admin' },
    ];
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onChange', reValidateMode: 'onChange' });

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRole(event.target.value);
    };

    const onFormSubmit = async (formData: any) => {
        const { username, email } = formData;
        const response = await dispatch(
            signupInvite({
                email,
                username,
                role,
                accessToken: data?.user.accessToken || '',
            })
        );
        if (response.type === 'user/signupInvite/rejected') {
            return toast.error(response.payload);
        }
        return toast.success('Invitation sent successfully');
    };

    return (
        <section className="w-full bg-white h-screen py-4 shadow-lg">
            <div className="h-[80%] lg:h-[95%] overflow-y-auto px-6">
                <ModalHeader
                    headerText={{
                        heading: 'Add New User',
                        tagline: 'Invite user to CRS',
                    }}
                    onClose={onClose}
                />

                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="mt-2">
                        <Label htmlFor="username">User Name</Label>
                        <Input
                            name="username"
                            placeholder="Enter Name"
                            type="text"
                            errors={errors}
                            register={register('username', {
                                required: {
                                    value: true,
                                    message: validationError.REQUIRED_FIELD,
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
                    <div className="flex flex-col space-y-2 mt-3">
                        <Label htmlFor="password ">Role</Label>
                        <AppDropDown
                            name="role"
                            options={allRoles}
                            value={role}
                            onChange={handleRoleChange}
                        />
                    </div>
                    <div className="text-center mt-8">
                        <Button
                            type="submit"
                            className="w-full bg-primary-color lg:hover:bg-orange-400 mb-3"
                        >
                            {state.loading ? (
                                <Loader color="white" size="4" />
                            ) : (
                                'Invite'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default ProfileModal;
