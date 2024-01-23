'use client';

import React, { useState } from 'react';
import AppInput from '@/app/components/common/AppInput';
import { Label } from '@/app/components/ui/label';

import AppDropDown, {
    OptionsInterface,
} from '@/app/components/common/AppDropDown';
import { ModalHeader } from '@/app/components/common/ModalHeader';
import ModalFooter from '@/app/components/common/ModalFooter';
import CourseCard from './CourseCard';

function AssignCourseModal({ onClose }: any) {
    const [selectedOption, setSelectedOption] = useState('9th Grade - B');

    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedOption(event.target.value);
    };

    const gradeOptions: OptionsInterface[] = [
        { label: '10th Grade (A)', value: '10th Grade (A)' },
        { label: '10th Grade (B)', value: '10th Grade (B)' },
    ];
    return (
        <section className="w-full bg-white h-screen py-4 shadow-lg">
            <div className="h-[95%] overflow-y-auto px-6">
                <ModalHeader
                    headerText={{
                        heading: 'Assign Course',
                        tagline: 'Assign Course to your Class!',
                    }}
                    onClose={onClose}
                />

                <div className="flex flex-col   w-full">
                    <CourseCard />
                    <div className="mb-2 w-full ">
                        <Label htmlFor="message">Write a message</Label>
                        <AppInput
                            type="message"
                            id="message"
                            placeholder="Message"
                        />
                    </div>

                    <div className="my-3 w-full">
                        <Label htmlFor="password ">
                            Select Class To Assign
                        </Label>

                        <AppDropDown
                            name="invite"
                            options={gradeOptions}
                            value={selectedOption}
                            onChange={handleSelectChange}
                        />
                        <div className="mt-4">
                            <AppDropDown
                                name="invite"
                                options={gradeOptions}
                                value={selectedOption}
                                onChange={handleSelectChange}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <p className="text-dark-gray text-base cursor-pointer ">
                            Add More
                        </p>
                    </div>
                </div>
            </div>
            <ModalFooter text="Assign" />
        </section>
    );
}

export default AssignCourseModal;
