import React from 'react';
import { FileVideoIcon } from 'lucide-react';
import ModalFooter from '@/app/components/common/ModalFooter';
import AppInput from '@/app/components/common/AppInput';
import { Label } from '@/app/components/ui/label';
import FileUploading from '../../components/common/FileUploading';
import { ModalHeader } from '../../components/common/ModalHeader';

function CheckPointsModal() {
    return (
        <section className="w-full bg-white h-screen py-4 shadow-md">
            <div className="h-[90%] overflow-y-auto w-full px-6">
                <ModalHeader
                    headerText={{
                        heading: 'Set Checkpoints',
                        tagline: 'Set Check points For better Understanding',
                    }}
                    Icon={FileVideoIcon}
                />

                <FileUploading isCompleted />
                <div className=" mt-3 flex justify-end w-full">
                    <button
                        type="button"
                        className="text-white text-sm w-fit text-center  bg-primary-color p-3 rounded-lg"
                    >
                        Add Check Point
                    </button>
                </div>

                <div>
                    <div className="flex flex-col">
                        <Label htmlFor="topicName" className="font-semibold">
                            Topic Name
                        </Label>

                        {/* <input
                            className="bg-gray-100 rounded-lg p-2 border"
                            placeholder="Write Topic Name"
                        /> */}
                        <AppInput
                            id="topicName"
                            placeholder="Write Topic Name"
                        />
                    </div>
                    <div className="flex flex-col mt-4">
                        <Label htmlFor="timeline" className="font-semibold">
                            Timeline
                        </Label>
                        <AppInput id="timeline" placeholder="Add Timeline" />
                    </div>
                </div>
                <hr className="my-4" />
                <div>
                    <div className="flex flex-col">
                        <Label htmlFor="topicName" className="font-semibold">
                            Topic Name
                        </Label>

                        <AppInput
                            id="topicName"
                            placeholder="Write Topic Name"
                        />
                    </div>
                    <div className="flex flex-col mt-4">
                        <Label htmlFor="timeline" className="font-semibold">
                            Timeline
                        </Label>
                        <AppInput id="timeline" placeholder="Add Timeline" />
                    </div>
                </div>
                <hr className="my-4" />
                <div>
                    <div className="flex flex-col">
                        <Label htmlFor="topicName" className="font-semibold">
                            Topic Name
                        </Label>

                        <AppInput
                            id="topicName"
                            placeholder="Write Topic Name"
                        />
                    </div>
                    <div className="flex flex-col mt-4">
                        <Label htmlFor="timeline" className="font-semibold">
                            Timeline
                        </Label>
                        <AppInput id="timeline" placeholder="Add Timeline" />
                    </div>
                </div>
            </div>
            <ModalFooter text="Upload Video" />
        </section>
    );
}

export default CheckPointsModal;
