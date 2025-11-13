'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm, FormProvider } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { Label } from '@/app/components/ui/label';
import AppDropDown, {
    OptionsInterface,
} from '@/app/components/common/AppDropDown';
import { ModalHeader } from '@/app/components/common/ModalHeader';
import { Button } from '@/app/components/ui/button';
import Input from '@/app/components/common/Input';
import { validationError } from '@/lib/utils';
import Loader from '@/app/components/common/ButtonLoader';
import { signupInviteAPI } from '@/app/api/auth';

function ProfileModal({ onClose, school, setSchool, schoolList }: any) {
    const [role, setRole] = useState('teacher');
    const [loading, setLoading] = useState(false);
    const { data } = useSession();
    const allRoles: OptionsInterface[] = [
        { label: 'teacher', value: 'Teacher' },
        { label: 'school', value: 'School' },
        { label: 'admin', value: 'Admin' },
    ];
    const methods = useForm({ mode: 'onChange', reValidateMode: 'onChange' });

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRole(event.target.value);
    };
    const handleSchoolChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSchool(event.target.value);
    };

    const onFormSubmit = async (formData: any) => {
        try {
            setLoading(true);
            const { username, email } = formData;
            const getSchoolId = schoolList.find(
                (value: { value: string; id: string }) => value?.value === school
            );
            const accessToken = data?.user.accessToken || '';

            let schoolId = '';
            if (role === 'teacher') {
                schoolId = getSchoolId?.id || '';
            }

            const response = await signupInviteAPI(
                username,
                email,
                role,
                accessToken,
                schoolId
            );

            if (response.status === 200) {
                toast.success('Invitation sent successfully');
                onClose();
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormProvider {...methods}>
            <section className="w-full bg-white h-screen py-4 shadow-lg">
                <div className="h-[80%] lg:h-[95%] overflow-y-auto px-6">
                    <ModalHeader
                        headerText={{
                            heading: 'Add New User',
                            tagline: 'Invite user to CRS',
                        }}
                        onClose={onClose}
                    />

                    <form onSubmit={methods.handleSubmit(onFormSubmit)}>
                        <div className="mt-2">
                            <Label htmlFor="username">User Name</Label>
                            <Input
                                name="username"
                                placeholder="Enter Name"
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
                        <div className="flex flex-col space-y-2 mt-3">
                            <Label htmlFor="role ">Role</Label>
                            <AppDropDown
                                name="role"
                                options={allRoles}
                                value={role}
                                onChange={handleRoleChange}
                            />
                        </div>
                        {role === 'teacher' && (
                            <div className="flex flex-col space-y-2 mt-3">
                                <Label htmlFor="school">School</Label>
                                <AppDropDown
                                    name="school"
                                    options={schoolList}
                                    value={school}
                                    onChange={handleSchoolChange}
                                />
                            </div>
                        )}

                        <div className="text-center mt-8">
                            <Button
                                type="submit"
                                className="w-full bg-primary-color lg:hover:bg-orange-400 mb-3"
                                disabled={loading}
                            >
                                {loading ? <Loader /> : 'Invite'}
                            </Button>
                        </div>
                    </form>
                </div>
            </section>
        </FormProvider>
    );
}

export default ProfileModal;
