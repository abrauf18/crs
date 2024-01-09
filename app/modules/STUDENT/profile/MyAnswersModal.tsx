import React from 'react';
import { Check, FileLineChart, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import Avatar from '@/app/assets/images/UserImage.svg';

function MyAnswersModal() {
    return (
        <section className="w-full bg-white h-screen  py-4 px-6 shadow-lg">
            <div className="h-[100%] overflow-y-auto w-full px-2">
                <div className="flex justify-between items-center">
                    <div className="flex  my-7">
                        <div className="flex flex-col ml-2">
                            <h3 className="text-xl font-semibold  mr-1">
                                Artificial Intelligence - AI
                            </h3>
                            <p className="text-sm text-dark-gray mb-2">
                                My Answer&apos;s Report
                            </p>
                        </div>
                    </div>
                    <div className="rounded-full bg-white border p-1">
                        <X size={20} />
                    </div>
                </div>

                <div className="flex  items-center w-full">
                    <div className="p-4 border-2 border-green-600 bg-green-100 rounded-lg w-full">
                        <h1 className="font-medium">Right Answer&apos;s</h1>
                        <h1 className="mt-2 text-gray-600 font-semibold">
                            <span className="font-bold text-lg text-black">
                                15
                            </span>{' '}
                            Answer&apos;s
                        </h1>
                    </div>
                    <div className="p-4 border-2 rounded-lg w-full ml-4">
                        <h1 className="font-medium">Wrong Answer&apos;s</h1>
                        <h1 className="mt-2 text-gray-600 font-semibold ">
                            <span className="font-bold text-lg text-black">
                                15
                            </span>{' '}
                            Answer&apos;s
                        </h1>
                    </div>
                </div>

                <hr className="my-5" />

                <div>
                    <p className="font-bold">
                        If you had $40,000 to build your own business, what
                        would you do?
                    </p>
                    <p className="p-4 mt-2 border rounded-lg bg-gray-50">
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id es”
                    </p>
                    <p className="mt-2 text-dark-gray font-semibold text-lg border p-4 rounded-lg">
                        Marked: <span className=" text-primary-color">25</span>
                    </p>
                </div>

                <hr className="my-5" />
                <div>
                    <h1 className="font-bold">
                        What super power do you wish you had?
                    </h1>
                    <p className="p-3 my-2 border rounded-lg font-medium text-gray-500">
                        Option 1
                    </p>
                    <p className="p-3 my-2 border rounded-lg font-medium flex justify-between border-green-600 text-green-600 items-center">
                        Option 2
                        <Check color="green" />
                    </p>
                    <p className="p-3 my-2 border rounded-lg font-medium text-gray-500 ">
                        Option 3
                    </p>
                    <p className="p-3 my-2 border rounded-lg font-medium text-gray-500">
                        Option 4
                    </p>
                </div>
                <hr className="my-5" />
                <div>
                    <p className="font-bold">
                        If you had $40,000 to build your own business, what
                        would you do?
                    </p>
                    <p className="p-4 mt-2 border rounded-lg bg-gray-50">
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id es”
                    </p>
                    <p className="mt-2 text-dark-gray font-semibold text-lg border p-4 rounded-lg">
                        Marked: <span className=" text-primary-color">25</span>
                    </p>
                </div>

                <hr className="my-5" />
                <div>
                    <h1 className="font-bold">
                        What super power do you wish you had?
                    </h1>
                    <p className="p-3 my-2 border rounded-lg font-medium text-gray-500">
                        Option 1
                    </p>
                    <p className="p-3 my-2 border rounded-lg font-medium flex justify-between border-green-600 text-green-600 items-center">
                        Option 2
                        <Check color="green" />
                    </p>
                    <p className="p-3 my-2 border rounded-lg font-medium text-gray-500 ">
                        Option 3
                    </p>
                    <p className="p-3 my-2 border rounded-lg font-medium text-gray-500">
                        Option 4
                    </p>
                </div>
            </div>
        </section>
    );
}

export default MyAnswersModal;
