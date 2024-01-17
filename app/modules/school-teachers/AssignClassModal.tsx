'use client';

import React, { useState } from 'react';
import { Trash, Trash2, X } from 'lucide-react';
import ModalFooter from '@/app/components/common/ModalFooter';
import { ModalHeader } from '@/app/components/common/ModalHeader';
import Avatar from '@/app/assets/images/UserImage.svg';
import SchoolClassroomIcon from '@/app/assets/icons/SchoolClassroomIcon';

import Image from 'next/image';
import AppInput from '@/app/components/common/AppInput';
import AppDropDown from '@/app/components/common/AppDropDown';

function AssignClassModal({ onClose }: any) {
    const [selectedOption, setSelectedOption] = useState('9th Grade - B');

    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedOption(event.target.value);
    };

    const gradeOptions = ['9th Grade - B', '9th Grade - A'];
    return (
        <section className="w-full bg-white h-screen py-4 px-6 shadow-lg">
            <div className="h-[90%] overflow-y-auto px-2">
                <ModalHeader
                    headerText={{
                        heading: 'Bessie Cooper',
                        tagline: 'nathan.roberts@example.com',
                    }}
                    onClose={onClose}
                />

                <div className="flex flex-col lg:flex-row lg:justify-between justify-center items-center mobile:w-full mobile:mb-2">
                    <div className="lg:mb-0 mr-2">
                        <div className="border border-orange-200 rounded-full w-fit flex items-center p-2">
                            <div className="border border-orange-200 rounded-full w-fit flex items-center p-2">
                                <div className="border border-primary-color rounded-full w-fit flex items-center p-2">
                                    <Image
                                        src={Avatar}
                                        alt="Avatar"
                                        className="rounded-full"
                                        width={120}
                                        height={120}
                                        objectFit="contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between items-center lg:w-fit w-full lg:mr-8">
                        <button
                            type="button"
                            className="text-dark-gray flex items-center space-x-2 font-medium lg:w-fit w-ful p-2 md:px-6 md:py-3 border rounded-lg mt-2"
                        >
                            <Trash2 color="#E6500D" size={20} />
                            <span>Remove</span>
                        </button>
                    </div>
                </div>

                <div className="flex my-4 items-center justify-between p-3 px-5 border-2 border-lime-500 bg-lime-50 rounded-lg">
                    <div className="flex flex-col justify-center">
                        <SchoolClassroomIcon height={40} width={40} />
                        <p className="font-semibold">Assigned Classrooms</p>
                    </div>
                    <p className="font-semibold text-4xl">03</p>
                </div>
                <div className="flex justify-between items-center mt-3 ">
                    <label className="font-medium" htmlFor="invite">
                        Assign Classes
                    </label>
                    <label
                        className="font-medium text-primary-color"
                        htmlFor="invite"
                    >
                        Add More
                    </label>
                </div>
                <div className="flex flex-col space-y-4 mt-4 ">
                    <AppDropDown
                        name="invite"
                        options={gradeOptions}
                        value={selectedOption}
                        onChange={handleSelectChange}
                    />
                    <AppInput placeholder="Subject" />
                </div>
                <hr className="my-5" />
                <div className="flex flex-col space-y-4 mt-4 ">
                    <AppDropDown
                        name="invite"
                        options={gradeOptions}
                        value={selectedOption}
                        onChange={handleSelectChange}
                    />
                    <AppInput placeholder="Subject" />
                </div>
                <hr className="my-5" />
                <div className="flex flex-col space-y-4 mt-4 ">
                    <AppDropDown
                        name="invite"
                        options={gradeOptions}
                        value={selectedOption}
                        onChange={handleSelectChange}
                    />
                    <AppInput placeholder="Subject" />
                </div>
                <hr className="my-5" />
                <div className="flex flex-col space-y-4 mt-4 pb-4 ">
                    <AppDropDown
                        name="invite"
                        options={gradeOptions}
                        value={selectedOption}
                        onChange={handleSelectChange}
                    />
                    <AppInput placeholder="Subject" />
                </div>
            </div>
            {/* <ModalFooter text="Invite" /> */}
            <div className="lg:flex lg:justify-between lg:items-center  w-full py-2 gap-1">
                <button
                    type="button"
                    className="text-dark-gray font-semibold  w-fit px-5 py-3 border rounded-xl"
                >
                    Discard Changes
                </button>
                <button
                    type="button"
                    className="text-white bg-primary-color font-semibold w-fit px-5 py-3  border rounded-xl"
                >
                    Save Changes
                </button>
            </div>
        </section>
    );
}

export default AssignClassModal;
