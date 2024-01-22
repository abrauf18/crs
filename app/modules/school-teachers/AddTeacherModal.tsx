import React from 'react';
import { X } from 'lucide-react';
import ModalFooter from '@/app/components/common/ModalFooter';
import ClassroomIcon from '@/app/assets/icons/ClassroomIcon';
import { Label } from '@/app/components/ui/label';
import AppInput from '@/app/components/common/AppInput';

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
                    <div className="rounded-full bg-white border p-1 cursor-pointer">
                        <X size={15} onClick={onClose} />
                    </div>
                </div>

                <div className="flex flex-col space-y-2 mt-2">
                    <Label className="font-semibold" htmlFor="invite">
                        Teacher Name
                    </Label>

                    <AppInput placeholder="Enter name" />
                </div>
                <div className="flex flex-col space-y-2 mt-5">
                    <Label className="font-semibold" htmlFor="invite">
                        Teacher Email Address
                    </Label>

                    <AppInput type="email" placeholder="Enter email" />
                </div>
            </div>
            <ModalFooter text="Invite" />
        </section>
    );
}

export default AddTeacherModal;
