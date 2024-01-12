import React from 'react';
import { FileVideoIcon } from 'lucide-react';
import ModalFooter from '@/app/components/common/ModalFooter';
import UploadItem from '@/app//components/common/UploadItem';
import FileUploading from '@/app/components/common/FileUploading';
import { ModalHeader } from '@/app/components/common/ModalHeader';

function UploadAssignmentModal() {
    return (
        <section className="w-full bg-white h-screen py-4 px-6 shadow-md">
            <div>
                <ModalHeader
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
            <ModalFooter text="Continue" />
        </section>
    );
}

export default UploadAssignmentModal;
