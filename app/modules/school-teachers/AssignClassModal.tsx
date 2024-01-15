import React from 'react';
import { Trash, Trash2, X } from 'lucide-react';
import ModalFooter from '@/app/components/common/ModalFooter';
import { ModalHeader } from '@/app/components/common/ModalHeader';
import Avatar from '@/app/assets/images/UserImage.svg';
import SchoolClassroomIcon from '@/app/assets/icons/SchoolClassroomIcon';

import Image from 'next/image';

function AssignClassModal({ onClose }: any) {
    return (
        <section className="w-full bg-white h-screen py-4 px-6 shadow-lg">
            <div className="h-[90%] overflow-y-auto px-2">
                <ModalHeader
                    headerText={{
                        heading: 'Bessie Cooper',
                        tagline: 'nathan.roberts@example.com',
                    }}
                    onClose={onClose}
                />

                <div className="md:flex justify-between items-center mobile:w-full mobile:mb-2">
                    <div>
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
                    <div className="flex flex-col justify-between items-center mobile:w-full">
                        <button
                            type="button"
                            className="text-dark-gray flex items-center space-x-2 font-medium mobile:w-full p-2 md:px-6 md:py-3 border rounded-lg mt-2"
                        >
                            <Trash2 color="#E6500D" size={20} />{' '}
                            <span>Remove</span>
                        </button>
                    </div>
                </div>

                <div className="flex my-4 items-center justify-between p-3 px-5 border-2 border-lime-500 bg-lime-50 rounded-lg">
                    <div className="flex flex-col justify-center">
                        <SchoolClassroomIcon height={40} width={40} />
                        <p className="font-semibold">Assigned Classrooms</p>
                    </div>
                    <p className="font-semibold text-4xl">03</p>
                </div>
                <div className="flex justify-between items-center mt-3 ">
                    <label className="font-medium" htmlFor="invite">
                        Assign Classes
                    </label>
                    <label
                        className="font-medium text-primary-color"
                        htmlFor="invite"
                    >
                        Add More
                    </label>

                    {/* <select name="invite" className="p-3 border rounded-xl">
                        <option value="9th Grade - B">9th Grade - B</option>
                        <option value="9th Grade - A">9th Grade - A</option>
                    </select> */}
                </div>
                <div className="flex flex-col space-y-4 mt-4 ">
                    <select
                        name="invite"
                        className="p-3 border rounded-xl bg-gray-50 font-medium"
                    >
                        <option value="9th Grade - B">9th Grade - B</option>
                        <option value="9th Grade - A">9th Grade - A</option>
                    </select>
                    <input
                        placeholder="Subject"
                        className="bg-gray-50 rounded-xl border py-3 px-4"
                    />
                </div>
                <hr className="my-5" />
                <div className="flex flex-col space-y-4 mt-4 ">
                    <select
                        name="invite"
                        className="p-3 border rounded-xl bg-gray-50 font-medium"
                    >
                        <option value="9th Grade - B">9th Grade - B</option>
                        <option value="9th Grade - A">9th Grade - A</option>
                    </select>
                    <input
                        placeholder="Subject"
                        className="bg-gray-50 rounded-xl border py-3 px-4"
                    />
                </div>
                <hr className="my-5" />
                <div className="flex flex-col space-y-4 mt-4 ">
                    <select
                        name="invite"
                        className="p-3 border rounded-xl bg-gray-50 font-medium"
                    >
                        <option value="9th Grade - B">9th Grade - B</option>
                        <option value="9th Grade - A">9th Grade - A</option>
                    </select>
                    <input
                        placeholder="Subject"
                        className="bg-gray-50 rounded-xl border py-3 px-4"
                    />
                </div>
                <hr className="my-5" />
                <div className="flex flex-col space-y-4 mt-4 pb-4 ">
                    <select
                        name="invite"
                        className="p-3 border rounded-xl bg-gray-50 font-medium"
                    >
                        <option value="9th Grade - B">9th Grade - B</option>
                        <option value="9th Grade - A">9th Grade - A</option>
                    </select>
                    <input
                        placeholder="Subject"
                        className="bg-gray-50 rounded-xl border py-3 px-4"
                    />
                </div>
            </div>
            {/* <ModalFooter text="Invite" /> */}
            <div className="lg:flex lg:justify-between lg:items-center  w-full py-2 gap-1">
                <button
                    type="button"
                    className="text-dark-gray font-semibold  w-fit px-5 py-3 border rounded-xl"
                >
                    Discard Changes
                </button>
                <button
                    type="button"
                    className="text-white bg-primary-color font-semibold w-fit px-5 py-3  border rounded-xl"
                >
                    Save Changes
                </button>
            </div>
        </section>
    );
}

export default AssignClassModal;
