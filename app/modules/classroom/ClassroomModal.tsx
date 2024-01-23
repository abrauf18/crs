'use client';

import React, { useState } from 'react';
import { FileLineChart, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import Avatar from '@/app/assets/images/UserImage.svg';
import { Label } from '@/app/components/ui/label';
import AppInput from '@/app/components/common/AppInput';
import AppDropDown, {
    OptionsInterface,
} from '@/app/components/common/AppDropDown';

function ClassroomModal({ onClose }: any) {
    const [selectedOption, setSelectedOption] = useState('9th Grade - B');

    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedOption(event.target.value);
    };

    const gradeOptions: OptionsInterface[] = [
        { label: '9th Grade - B', value: '9th Grade - B' },
        { label: '9th Grade - A', value: '9th Grade - A' },
    ];
    return (
        <section className="w-full bg-white h-screen  py-4  shadow-lg">
            <div className="h-[80%] lg:h-[90%] overflow-y-auto px-6 w-full">
                <div className="flex justify-between items-center">
                    <div className="flex  my-7">
                        <div className="flex flex-col ml-2">
                            <h3 className="text-xl font-semibold  mr-1">
                                Kathryn Murphy
                            </h3>
                            <p className="text-sm text-dark-gray mb-2">
                                nathan.roberts@gmail.com
                            </p>
                        </div>
                    </div>
                    <div className="rounded-full bg-white border p-1 cursor-pointer">
                        <X size={20} onClick={onClose} />
                    </div>
                </div>

                <div className="flex flex-col items-center w-full">
                    <div className="ml-0 lg:ml-8 mb-6 lg:mb-0">
                        <div className="border border-orange-200 rounded-full w-fit flex items-center p-3">
                            <div className="border border-orange-200 rounded-full w-fit flex items-center p-3">
                                <div className="border-2 border-primary-color rounded-full w-fit flex items-center p-2">
                                    <Image
                                        src={Avatar}
                                        alt="Avatar"
                                        className="rounded-full"
                                        width={150}
                                        height={150}
                                        objectFit="contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="text-dark-gray  justify-center font-semibold mobile:w-full p-2 md:px-6 md:py-3 border rounded-lg mt-3 ml-0 lg:ml-8 mb-6 lg:mb-0 flex items-center space-x-2"
                    >
                        <Trash2 color="#E6500D" />
                        <span>Remove Photo</span>
                    </button>
                </div>

                <div className="flex items-center mt-3 py-3 px-2 lg:px-5 rounded-lg  border-2 border-primary-color justify-between">
                    <div>
                        <FileLineChart color="#F59A3B" />
                        <p className="font-medium mt-2">Overall Performance</p>
                    </div>
                    <p className="font-bold text-lg">75%</p>
                </div>

                <div className="my-3 h-fit">
                    <div className="flex flex-col space-y-2">
                        <Label className="font-semibold" htmlFor="name">
                            Username
                        </Label>
                        <AppInput
                            name="name"
                            id="name"
                            placeholder="Enter name"
                        />
                    </div>

                    <div className="flex flex-col space-y-2 mt-5">
                        <Label className="font-semibold" htmlFor="email">
                            Email Address
                        </Label>

                        <AppInput
                            name="email"
                            id="email"
                            placeholder="Enter email"
                        />
                    </div>

                    <div className="flex flex-col space-y-2 mt-5">
                        <Label className="font-semibold" htmlFor="invite">
                            Classroom
                        </Label>

                        <AppDropDown
                            name="invite"
                            options={gradeOptions}
                            value={selectedOption}
                            onChange={handleSelectChange}
                        />
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-4 border bg-white lg:flex lg:justify-between ">
                <div className="cursor-pointer w-full mx-1 p-3 py-2 rounded-lg border-2 text-dark-gray text-center mt-1 font-bold">
                    <button type="button">Discard</button>
                </div>
                <div className="cursor-pointer w-full mx-1 p-3 py-2 rounded-lg bg-primary-color border-2 border-primary-color text-white text-center mt-1 font-bold">
                    <button type="button">Save</button>
                </div>
            </div>
        </section>
    );
}

export default ClassroomModal;
