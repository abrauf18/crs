import { Label } from '@/app/components/ui/label';
import Image from 'next/image';
import React from 'react';
import Avatar from '@/app/assets/images/UserImage.svg';

interface MyProfileProps {
    isSchoolProfile?: boolean;
}
function Profile({ isSchoolProfile }: MyProfileProps) {
    return (
        <section
            className={`bg-white  flex h-full w-full mt-8 lg:mt-0 ${
                !isSchoolProfile && 'basis-1/2'
            }`}
        >
            <div
                className={`flex flex-col  mobile:items-center  ${
                    !isSchoolProfile ? 'm-auto mobile:h-screen' : 'w-full'
                }`}
            >
                <h1 className="text-2xl font-semibold mb-2 mobile:mb-4">
                    My profile
                </h1>
                <div className="md:flex justify-between items-center mobile:w-full mobile:mb-2">
                    <div className="flex justify-center">
                        <div className="border-2 border-light-gray rounded-full h-40 w-40 flex justify-center items-center">
                            <div className="border-2 border-light-gray rounded-full h-36 w-36 flex justify-center items-center">
                                <div className="border-2 border-light-gray rounded-full h-32 p-2 w-32 flex justify-center items-center">
                                    <Image
                                        src={Avatar}
                                        alt="profile Image"
                                        className="w-44 h-44"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between items-center mobile:w-full mb-4 lg:mb-0">
                        <button
                            type="button"
                            className="text-white bg-primary-color font-semibold mobile:w-full mobile:p-2 md:px-6 md:py-3 border rounded-lg mt-2"
                        >
                            Change Photo
                        </button>
                        <button
                            type="button"
                            className="text-dark-gray  font-semibold mobile:w-full p-2 md:px-6 md:py-3 border rounded-lg mt-2"
                        >
                            Remove Photo
                        </button>
                    </div>
                </div>
                <div className="mb-2 w-full">
                    <Label htmlFor="email">Username</Label>
                    <input
                        className="mb-5 mt-1 block w-full px-3 py-2 bg-slate-200 border rounded-md text-sm shadow-sm placeholder-slate-400
                             focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        type="email"
                        id="email"
                        placeholder="username"
                    />
                </div>
                <div className="mb-2 w-full">
                    <Label htmlFor="email">Email Address</Label>
                    <input
                        className="mb-5 mt-1 block w-full px-3 py-2 bg-slate-200 border rounded-md text-sm shadow-sm placeholder-slate-400
                             focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        type="email"
                        id="email"
                        placeholder="Email"
                    />
                </div>
                <div className="mb-2 w-full">
                    <Label htmlFor="password ">Password</Label>
                    <input
                        className="mb-2 mt-1 block w-full px-3 py-2 bg-slate-200 border rounded-md text-sm shadow-sm placeholder-slate-400
                               focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        type="password"
                        id="password"
                        placeholder="Password"
                    />
                </div>
                {!isSchoolProfile && (
                    <div className="md:flex md:justify-between w-full mt-2 gap-1">
                        <button
                            type="button"
                            className="text-dark-gray font-semibold mobile:mb-2 mobile:w-full p-2 md:px-6 md:py-3 border rounded-lg"
                        >
                            Discard Changes
                        </button>
                        <button
                            type="button"
                            className="text-white bg-primary-color font-semibold mobile:w-full p-2 md:px-6 md:py-3 border rounded-lg"
                        >
                            Save Changes
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Profile;
