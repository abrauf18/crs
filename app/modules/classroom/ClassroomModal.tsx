import React from 'react';
import { FileLineChart, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import Avatar from '@/app/assets/images/UserImage.svg';

function ClassroomModal() {
    return (
        <section className="w-full bg-white h-screen  py-4 px-6 shadow-lg">
            <div>
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
                    <div className="rounded-full bg-white border p-1">
                        <X size={20} />
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
                        <label className="font-semibold" htmlFor="name">
                            Username
                        </label>
                        <input
                            name="name"
                            placeholder="Enter name"
                            className="p-3 border rounded-lg"
                        />
                    </div>

                    <div className="flex flex-col space-y-2 mt-5">
                        <label className="font-semibold" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            name="email"
                            placeholder="Enter email"
                            className="p-3 border rounded-lg"
                        />
                    </div>

                    <div className="flex flex-col space-y-2 mt-5">
                        <label className="font-semibold" htmlFor="invite">
                            Classroom
                        </label>
                        <select name="invite" className="p-3 border rounded-lg">
                            <option value="9th Grade - B">9th Grade - B</option>
                            <option value="9th Grade - A">9th Grade - A</option>
                        </select>
                    </div>
                </div>
            </div>
            {/* absolute bottom-0 left-0 */}
            <div className="absolute bottom-0 left-0 w-full p-4 border bg-white lg:flex lg:justify-between ">
                <div className="cursor-pointer w-full mx-1 p-3 rounded-lg border-2 text-dark-gray text-center mt-1 font-bold">
                    <button type="button">Discard Changes</button>
                </div>
                <div className="cursor-pointer w-full mx-1 p-3 rounded-lg bg-primary-color border-2 border-primary-color text-white text-center mt-1 font-bold">
                    <button type="button">Save Changes</button>
                </div>
            </div>
        </section>
    );
}

export default ClassroomModal;
