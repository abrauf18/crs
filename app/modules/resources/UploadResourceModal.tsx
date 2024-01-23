import React from 'react';
import { ModalHeader } from '@/app/components/common/ModalHeader';
import ModalFooter from '@/app/components/common/ModalFooter';
import ResourceIcon from '@/app/assets/icons/ResourceIcon';
import FileUploading from '@/app/components/common/FileUploading';
import UploadItem from '@/app/components/common/UploadItem';

function UploadResourceModal({ onClose }: any) {
    return (
        <section className="w-full bg-white h-screen py-4  shadow-lg">
            <div className="h-[90%] overflow-y-auto w-full px-6">
                <ModalHeader
                    headerText={{
                        heading: 'Upload Resource',
                        tagline: 'Upload Resource For Your User',
                    }}
                    Icon={ResourceIcon}
                    onClose={onClose}
                />
                <div className="flex flex-col space-y-2 mt-5">
                    <label className="font-semibold" htmlFor="invite">
                        Resource Type
                    </label>
                    <select name="invite" className="p-3 border rounded-lg">
                        <option value="Slideshow">SlideShow</option>
                        <option value="video">Video</option>
                        <option value="quiz">Quiz</option>
                    </select>
                </div>
                <div className="flex flex-col space-y-2 mt-5">
                    <label className="font-semibold" htmlFor="invite">
                        Assign Topic
                    </label>
                    <select name="invite" className="p-3 border rounded-lg">
                        <option value="topicName">Topic Name</option>
                    </select>
                </div>
                <div className="mt-4">
                    <UploadItem itemName="Resource" />
                    <FileUploading />
                    <div className="p-2 rounded-lg border w-32 text-center mt-3">
                        <button
                            type="button"
                            className="text-dark-gray text-sm"
                        >
                            Cancel Upload
                        </button>
                    </div>
                </div>
            </div>
            <ModalFooter text="Upload" />
        </section>
    );
}

export default UploadResourceModal;
