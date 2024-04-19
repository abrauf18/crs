/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import React from 'react';
import { Upload } from 'lucide-react';

function UploadItem({
    itemName,
    setSelectedFile,
}: {
    itemName: string;
    setSelectedFile: (file: File | null) => void;
}) {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setSelectedFile(file);
    };

    return (
        <section className="flex justify-between items-center flex-col md:p-12 sm:p-10 p-6 border-4 border-dotted rounded-lg text-center">
            <label
                htmlFor="fileInput"
                className=" rounded-full bg-green-50 p-2 mb-2 cursor-pointer"
            >
                <input
                    type="file"
                    id="fileInput"
                    accept=".pdf, .jpg, .jpeg, .png, .gif, .mp4, .avi, .mov, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                <Upload size={30} color="#7AA43E" />
            </label>
            <div className="upload-video__text">
                <h3 className="text-lg font-semibold mb-2">
                    Upload {itemName}
                </h3>
                <p>
                    <span className="text-primary-color">Upload </span>/ Drag &
                    Drop Here
                </p>
            </div>
        </section>
    );
}

export default UploadItem;
