'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import AppInput from '@/app/components/common/AppInput';
import { Label } from '@/app/components/ui/label';
import Avatar from '@/app/assets/images/UserImage.svg';

import AppDropDown, {
    OptionsInterface,
} from '@/app/components/common/AppDropDown';
import { ModalHeader } from '@/app/components/common/ModalHeader';

function ProfileModal({ onClose }: any) {
    const [selectedOption, setSelectedOption] = useState('9th Grade - B');

    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedOption(event.target.value);
    };

    const gradeOptions: OptionsInterface[] = [
        { label: 'Admin', value: 'Admin' },
        { label: 'Student', value: 'Student' },
        { label: 'Teacher', value: 'Teacher' },
    ];
    return (
        <section className="w-full bg-white h-screen py-4 px-6 shadow-lg">
            <div className="h-[80%] lg:h-[95%] overflow-y-auto px-2">
                <ModalHeader
                    headerText={{
                        heading: 'Kathryn Murphy',
                        tagline: 'nathan.roberts@gmail.com',
                    }}
                    onClose={onClose}
                />

                <div className="flex flex-col  mobile:items-center w-full">
                    <div className="flex flex-col justify-between items-center space-y-2">
                        <div className="flex justify-center">
                            <div className="border-2 border-light-gray rounded-full h-44 w-44 flex justify-center items-center">
                                <div className="border-2 border-light-gray rounded-full h-40 w-40 flex justify-center items-center">
                                    <div className="border-2 border-light-gray rounded-full h-36 p-2 w-36 flex justify-center items-center">
                                        <Image
                                            src={Avatar}
                                            alt="profile Image"
                                            className="w-64 h-64"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row space-x-2 justify-center items-center  mobile:w-full mb-5">
                            <button
                                type="button"
                                className="text-white bg-primary-color font-semibold mobile:w-full px-5 py-3 border rounded-lg mt-2"
                            >
                                Change Photo
                            </button>
                            <button
                                type="button"
                                className="text-dark-gray  font-semibold mobile:w-full px-5 py-3 border rounded-lg mt-2"
                            >
                                Remove Photo
                            </button>
                        </div>
                    </div>
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
                        <Label htmlFor="password ">Password</Label>

                        <AppDropDown
                            name="invite"
                            options={gradeOptions}
                            value={selectedOption}
                            onChange={handleSelectChange}
                        />
                    </div>
                </div>
            </div>
            <div className="flex lg:flex-row flex-col lg:space-x-2 lg:space-y-0 space-y-2 lg:justify-between lg:items-center  w-full py-2 gap-1 absolute bottom-0 left-0  p-3 border bg-white">
                <button
                    type="button"
                    className="text-dark-gray font-semibold  w-full px-5 py-2 border rounded-xl"
                >
                    Discard
                </button>
                <button
                    type="button"
                    className="text-white bg-primary-color font-semibold w-full px-5 py-2  border rounded-xl"
                >
                    Save
                </button>
            </div>
        </section>
    );
}

export default ProfileModal;
