import React from 'react';
import Avatar from '@/app/assets/images/UserImage.svg';
import Image from 'next/image';

function StudentProfile() {
    return (
        <>
            {/* student profile */}
            <section className="flex flex-col mt-8 lg:flex-row lg:items-center justify-between">
                <h1 className="font-semibold text-xl mb-4 lg:mb-0 lg:mr-4">
                    Kathryn Murphy Overview
                </h1>

                <div className="border rounded-xl px-5 py-3">
                    <p className="text-dark-gray font-bold">Drop Out</p>
                </div>
            </section>
            <div className="flex flex-col lg:flex-row items-center shadow-md rounded-lg py-5 mt-8">
                {/* Image */}
                <div className="ml-0 lg:ml-8 mb-6 lg:mb-0">
                    <div className="border border-orange-200 rounded-full w-fit flex items-center p-3">
                        <div className="border border-orange-200 rounded-full w-fit flex items-center p-3">
                            <div className="border border-primary-color rounded-full w-fit flex items-center p-2">
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

                {/* Information */}
                <div className="lg:ml-8 w-full lg:w-[45%] lg:justify-between lg:flex">
                    <div className="flex-col mb-4 lg:mb-0">
                        <div>
                            <h1 className="text-dark-gray font-medium">Name</h1>
                            <h1 className="font-medium text-lg">
                                Kathryn Murphy
                            </h1>
                        </div>
                        <div className="mt-4">
                            <h1 className="text-dark-gray font-medium">
                                Email
                            </h1>
                            <h1 className="font-medium text-lg">
                                nathan.roberts@example.com
                            </h1>
                        </div>
                    </div>
                    <div className="flex-col">
                        <div>
                            <h1 className="text-dark-gray font-medium">
                                Grade
                            </h1>
                            <h1 className="font-semibold text-lg">
                                10th Grade
                            </h1>
                        </div>
                        <div className="mt-4">
                            <h1 className="text-dark-gray font-semibold">
                                Overall Performance
                            </h1>
                            <h1 className="font-semibold text-lg">75%</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StudentProfile;
