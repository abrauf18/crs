import { Upload, FileVideo } from 'lucide-react';
import React from 'react';

interface FileUploadingProp {
    isCompleted?: boolean;
}
function FileUploading({ isCompleted }: FileUploadingProp) {
    return (
        <div className="p-3 border-2 rounded-lg flex justify-between mt-3">
            <div className="h-full">
                <FileVideo size={60} fill="#54C3F4" color="#1976D2" />
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="md:text-md text-sm font-semibold">
                    Master Digital Product Design..
                </h3>
                <div className="flex gap-1">
                    <Upload size={18} color="#7AA43E" />
                    <p className="text-sm">
                        {!isCompleted
                            ? 'Uploading 35%'
                            : 'Uploaded Successfully'}
                    </p>
                </div>
                <div className="w-full bg-white rounded-md">
                    <div
                        className="h-2 bg-primary-color rounded-md"
                        style={{ width: !isCompleted ? '35%' : '100%' }}
                    />
                </div>
            </div>
        </div>
    );
}

export default FileUploading;
