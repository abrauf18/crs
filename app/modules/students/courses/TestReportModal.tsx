import React from 'react';
import { BookOpenCheck, Check } from 'lucide-react';
import { ModalHeader } from '@/app/components/common/ModalHeader';
import StarsIcon from '@/app/assets/icons/StarsIcon';

function TestReportModal({ onClose }: any) {
    return (
        <section className="w-full bg-white h-screen py-4 px-8 shadow-lg">
            <div>
                <ModalHeader
                    headerText={{
                        heading: 'Cloud Computing',
                        tagline: 'Student Answer’s Report',
                    }}
                    onClose={onClose}
                    Icon={BookOpenCheck}
                />

                <div className="border-2 border-primary-color rounded-lg flex space-x-4 p-3 items-center">
                    <StarsIcon width={20} height={20} className="mr-2" />
                    <div>
                        <p className="text-sm font-medium">Total Score</p>
                        <p className="font-bold text-lg mt-1">
                            Score: 50 - Grade: D
                        </p>
                    </div>
                </div>

                <hr className="my-6" />

                <div>
                    <h1 className="font-bold">What makes you happiest?</h1>
                    <p className="mt-2 px-2 py-3 bg-gray-50 border-2 rounded-lg border-sky-400">
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia
                    </p>
                    <div className="mt-4 flex space-x-1 w-[100%] ">
                        <input
                            placeholder="Mark out  of 10"
                            className="p-2 rounded-lg border-2 bg-gray-50 w-[80%]"
                        />
                        <button
                            type="button"
                            className="bg-primary-color py-2 px-3 ml-2  rounded-lg text-white"
                        >
                            Submit
                        </button>
                    </div>
                    <hr className="my-6" />

                    <div>
                        <h1 className="font-bold">
                            If you could visit one planet, which would it be?
                        </h1>
                        <p className="p-3 my-2 border rounded-lg font-medium text-gray-500">
                            Option 1
                        </p>
                        <p className="p-3 my-2 border rounded-lg font-medium  border-orange-600 text-orange-600">
                            Option 2
                        </p>
                        <p className="p-3 my-2 border rounded-lg font-medium text-gray-500">
                            Option 3
                        </p>
                        <p className="p-3 my-2 border rounded-lg font-medium text-gray-500 flex justify-between">
                            Option 4
                            <Check color="green" />
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TestReportModal;
