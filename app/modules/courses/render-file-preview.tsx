import { getFileType } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

export function RenderFilePreview({ previewUrl }: { previewUrl: string }) {
    const fileType = getFileType(previewUrl);

    return (
        <>
            {fileType === 'image' && (
                <Image
                    src={previewUrl}
                    alt={previewUrl}
                    className="rounded-lg max-h-[70vh] object-contain mx-auto"
                    width={500}
                    height={500}
                />
            )}
            {fileType === 'video' && (
                <video controls className="w-full rounded-lg max-h-[70vh]">
                    <source src={previewUrl} />
                    <track kind="captions" />
                </video>
            )}
            {fileType === 'pdf' && (
                <iframe
                    title="PDF Preview"
                    src={previewUrl}
                    className="w-full h-[70vh] rounded"
                />
            )}

            {(fileType === 'doc' || fileType === 'ppt') && (
                <div className="py-10 text-center">
                    <p className="text-gray-600 mb-4">
                        This file type cannot be previewed. You can download it
                        instead.
                    </p>
                    <a
                        href={previewUrl}
                        download
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Download File
                    </a>
                </div>
            )}

            {fileType === 'other' && (
                <a
                    href={previewUrl}
                    download
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 block text-center"
                >
                    Download Resource
                </a>
            )}
        </>
    );
}
