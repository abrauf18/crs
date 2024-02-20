'use client';

import React, { useState } from 'react';
import AppInput from '@/app/components/common/AppInput';
import { Label } from '@/app/components/ui/label';

import AppDropDown, {
    OptionsInterface,
} from '@/app/components/common/AppDropDown';
import { ModalHeader } from '@/app/components/common/ModalHeader';

function ProfileModal({ onClose }: any) {
    const [selectedOption, setSelectedOption] = useState('--');

    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedOption(event.target.value);
    };

    const roles: OptionsInterface[] = [
        { label: 'Student', value: 'Student' },
        { label: 'Teacher', value: 'Teacher' },
        { label: 'School', value: 'School' },
        { label: 'Admin', value: 'Admin' },
    ];
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

                <div className="flex flex-col  mobile:items-center w-full">
                    <div className="mb-2 w-full mt-4">
                        <Label htmlFor="email">Username</Label>

                        <AppInput
                            type="email"
                            id="email"
                            placeholder="User Name"
                        />
                    </div>
                    <div className="mb-2 w-full">
                        <Label htmlFor="email">Email Address</Label>

                        <AppInput type="email" id="email" placeholder="Email" />
                    </div>
                    <div className="mb-2 w-full">
                        <Label htmlFor="password ">Role</Label>

                        <AppDropDown
                            name="role"
                            options={roles}
                            value={selectedOption}
                            onChange={handleSelectChange}
                        />
                    </div>
                </div>
            </div>
            <div className="flex lg:flex-row flex-col lg:space-x-2 lg:space-y-0 space-y-2 lg:justify-between lg:items-center  w-full py-2 gap-1 absolute bottom-0 left-0  p-3 border bg-white">
                <button
                    type="button"
                    className="text-white bg-primary-color font-semibold w-full px-5 py-2  border rounded-xl"
                >
                    Invite
                </button>
            </div>
        </section>
    );
}

export default ProfileModal;
