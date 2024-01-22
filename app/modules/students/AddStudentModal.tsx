'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import ModalFooter from '@/app/components/common/ModalFooter';
import StudentIcon from '@/app/assets/icons/StudentIcon';
import AppInput from '@/app/components/common/AppInput';
import { Label } from '@/app/components/ui/label';
import AppDropDown, {
    OptionsInterface,
} from '@/app/components/common/AppDropDown';

function AddStudentModal({ onClose }: any) {
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
        <section className="w-full bg-white h-screen py-4 px-6 shadow-lg">
            <div>
                <div className="flex justify-between items-center">
                    <div className="flex  my-7">
                        <div className="bg-green-100 px-3 h-fit py-3 rounded-lg">
                            <StudentIcon
                                fill="#7AA43E"
                                width="30"
                                height="30"
                            />
                        </div>
                        <div className="flex flex-col ml-2">
                            <h3 className="text-xl font-semibold  mr-1">
                                Add Student
                            </h3>
                            <p className="text-sm text-dark-gray mb-2">
                                Invite via Email
                            </p>
                        </div>
                    </div>
                    <div className="rounded-full bg-white border p-1 cursor-pointer">
                        <X size={15} onClick={onClose} />
                    </div>
                </div>

                <div className="flex flex-col space-y-1">
                    <Label className="font-semibold" htmlFor="name">
                        Student Name
                    </Label>

                    <AppInput name="name" id="name" placeholder="Enter name" />
                </div>

                <div className="flex flex-col space-y-1 mt-5">
                    <Label className="font-semibold" htmlFor="email">
                        Student Email Address
                    </Label>
                    <AppInput name="email" placeholder="Enter email" />
                </div>

                <div className="flex flex-col space-y-1 mt-5">
                    <Label className="font-semibold" htmlFor="invite">
                        Invite to classroom?
                    </Label>

                    <AppDropDown
                        name="invite"
                        options={gradeOptions}
                        value={selectedOption}
                        onChange={handleSelectChange}
                    />
                </div>
            </div>
            <ModalFooter text="Invite" />
        </section>
    );
}

export default AddStudentModal;
