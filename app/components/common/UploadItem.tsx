import React from 'react';
import { Upload } from 'lucide-react';

function UploadItem({ itemName }: { itemName: string }) {
    return (
        <section className="flex justify-between items-center flex-col md:p-12 sm:p-10 p-6 border-4 border-dotted rounded-lg text-center">
            <div className=" rounded-full bg-green-50 p-2 mb-2">
                <Upload size={30} color="#7AA43E" />
            </div>
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
