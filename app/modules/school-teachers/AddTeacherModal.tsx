import React from 'react';
import { X } from 'lucide-react';
import ModalFooter from '@/app/components/common/ModalFooter';
import SchoolClassroomIcon from '@/app/assets/icons/SchoolClassroomIcon';
import ClassroomIcon from '@/app/assets/icons/ClassroomIcon';

function AddTeacherModal({ onClose }: any) {
    return (
        <section className="w-full bg-white h-screen py-4 px-6 shadow-lg">
            <div>
                <div className="flex justify-between items-center">
                    <div className="flex  my-7">
                        <div className="bg-green-100 px-3 h-fit py-3 rounded-lg">
                            <ClassroomIcon width={30} height={30} />
                        </div>
                        <div className="flex flex-col ml-2">
                            <h3 className="text-xl font-semibold  mr-1">
                                Add Teacher
                            </h3>
                            <p className="text-sm text-dark-gray mb-2">
                                Invite Via Email
                            </p>
                        </div>
                    </div>
                    <div className="rounded-full bg-white border p-1">
                        <X size={20} onClick={onClose} />
                    </div>
                </div>

                <div className="flex flex-col space-y-2 mt-2">
                    <label className="font-semibold" htmlFor="invite">
                        Teacher Name
                    </label>
                    <input
                        placeholder="Enter name"
                        className="bg-gray-50 rounded-xl border py-3 px-4"
                    />
                </div>
                <div className="flex flex-col space-y-2 mt-4">
                    <label className="font-semibold" htmlFor="invite">
                        Teacher Email Address
                    </label>
                    <input
                        type="email"
                        placeholder="Enter email"
                        className="bg-gray-50 rounded-xl border py-3 px-4"
                    />
                </div>
            </div>
            <ModalFooter text="Invite" />
        </section>
    );
}

export default AddTeacherModal;
