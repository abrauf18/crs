import Image from 'next/image';
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Label } from '@/app/components/ui/label';
import Avatar from '@/app/assets/images/UserImage.svg';
import PictureIcon from '@/app/assets/icons/PictureIcon';
import AppInput from '@/app/components/common/AppInput';

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
                className={`flex flex-col  mobile:items-center mobile:w-full mobile:px-2 ${
                    !isSchoolProfile ? 'm-auto mobile:h-screen' : 'w-full'
                }`}
            >
                <h1 className="text-2xl  font-semibold mb-2 mobile:mb-4">
                    My profile
                </h1>
                <div className="md:flex justify-between lg:space-x-4 items-center  mobile:w-full mobile:mb-2">
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
                            className="text-white  flex space-x-2 items-center bg-primary-color font-semibold mobile:w-full mobile:p-2 md:px-6 md:py-2 border rounded-lg mt-2"
                        >
                            <PictureIcon width={18} height={18} />
                            <span>Change Photo</span>
                        </button>
                        <button
                            type="button"
                            className="text-dark-gray flex space-x-2 items-center font-semibold mobile:w-full p-2 md:px-6 md:py-2 border rounded-lg mt-2"
                        >
                            <Trash2 size={18} color="#E6500D" />
                            <span>Remove Photo</span>
                        </button>
                    </div>
                </div>
                <div className="mb-5 w-full">
                    <Label htmlFor="email">Username</Label>

                    <AppInput type="email" id="email" placeholder="User Name" />
                </div>
                <div className="mb-5 w-full">
                    <Label htmlFor="email">Email Address</Label>

                    <AppInput type="email" id="email" placeholder="Email" />
                </div>
                <div className="mb-2 w-full">
                    <Label htmlFor="password ">Password</Label>

                    <AppInput
                        type="password"
                        id="password"
                        placeholder="Password"
                    />
                </div>
                {!isSchoolProfile && (
                    <div className="md:flex md:justify-between w-full mt-5 gap-2">
                        <button
                            type="button"
                            className="text-dark-gray font-semibold mobile:mb-2 w-full p-2 md:px-6 md:py-2 border rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="text-white bg-primary-color font-semibold w-full p-2 md:px-6 md:py-2 border rounded-lg"
                        >
                            Save
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Profile;
