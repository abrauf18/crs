import React from 'react';
import { FileVideoIcon } from 'lucide-react';
import UploadItem from './common/UploadItem';
import FileUploading from './common/FileUploading';
import { UploadHeader } from './common/UploadHeader';

function UploadVideo() {
    return (
        <section className="w-full bg-light-gray h-screen py-4 px-6 shadow-md">
            <div>
                <UploadHeader
                    headerText={{
                        heading: 'Upload Video',
                        tagline: 'let’s Upload Video For Your User',
                    }}
                    Icon={FileVideoIcon}
                />
                <UploadItem itemName="Video" />
                <FileUploading />
                <div className="p-2 rounded-lg border w-32 text-center mt-3">
                    <button type="button" className="text-dark-gray text-sm">
                        Cancel Upload
                    </button>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-3 border bg-white">
                <div className="cursor-pointer p-2 rounded-lg bg-primary-color text-white text-center">
                    <button type="button">Next</button>
                </div>
            </div>
        </section>
    );
}

export default UploadVideo;
