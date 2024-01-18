'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import ModalFooter from '@/app/components/common/ModalFooter';
import SyncIcon from '@/app/assets/icons/SyncIcon';
import AppDropDown, {
    OptionsInterface,
} from '@/app/components/common/AppDropDown';
import { Label } from '@/app/components/ui/label';

function SubmitTicketModal({ onClose }: any) {
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
                            <SyncIcon fill="#7AA43E" width="30" height="30" />
                        </div>
                        <div className="flex flex-col ml-2">
                            <h3 className="text-xl font-semibold  mr-1">
                                Submit Ticket
                            </h3>
                            <p className="text-sm text-dark-gray mb-2">
                                Register New Complaint
                            </p>
                        </div>
                    </div>
                    <div className="rounded-full bg-white border p-1 cursor-pointer">
                        <X size={20} onClick={onClose} />
                    </div>
                </div>

                <div className="flex flex-col space-y-2">
                    <Label className="font-semibold" htmlFor="invite">
                        Complaint type
                    </Label>

                    <AppDropDown
                        name="invite"
                        options={gradeOptions}
                        value={selectedOption}
                        onChange={handleSelectChange}
                    />
                </div>
                <div className="flex flex-col space-y-2 mt-7 ">
                    <Label className="font-semibold" htmlFor="name">
                        Your Message
                    </Label>
                    <textarea
                        className="border h-[120px] rounded-lg p-3 resize-none 
                        bg-slate-100 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 font-medium
                        "
                        placeholder="Type your message"
                    />
                </div>
            </div>
            <ModalFooter text="Invite" />
        </section>
    );
}

export default SubmitTicketModal;
