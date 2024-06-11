import React from 'react';
import FileCard, { FileInterface } from '@/app/components/common/FileCard';
import Resource1 from '@/app/assets/images/resourceImages/Resource1.svg';
import Resource2 from '@/app/assets/images/resourceImages/Resource2.svg';
import Resource3 from '@/app/assets/images/resourceImages/Resource3.svg';
import { ModalHeader } from '../../components/common/ModalHeader';

type Resource = {
    id: string;
    name: string;
    type: string;
    topic: string;
    url: string;
    released: boolean;
};

type Standard = {
    id: string;
    name: string;
    resourceCount: number;
    resources: Resource[];
};

function ResourceDownloadModal({
    onClose,
    standard,
}: {
    onClose: () => void;
    standard: Standard;
}) {
    const resources: FileInterface[] = [
        {
            id: '1',
            imageUrl: Resource1,
            resourceType: 'ppt',
            name: 'Artificial Intelligence',
            btnText: 'Download',
        },
        {
            id: '2',
            imageUrl: Resource2,
            resourceType: 'ppt',
            name: 'Artificial Intelligence',
            btnText: 'Download',
        },
        {
            id: '1',
            imageUrl: Resource3,
            resourceType: 'xls',
            name: 'Artificial Intelligence',
            btnText: 'Download',
        },
    ];

    const handleDownload = async ({
        url,
        name,
    }: {
        url: string;
        name: string;
    }) => {
        const response = await fetch(url as string);
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = name;
        link.click();
        window.URL.revokeObjectURL(link.href);
    };

    const handleDownloadAll = () => {
        standard.resources.forEach((resource) => {
            if (!resource.released) {
                return null;
            }
            return handleDownload({ url: resource.url, name: resource.name });
        });
    };

    return (
        <section className="w-full bg-white h-screen py-4 shadow-lg">
            <div className="h-[100%] overflow-y-auto px-6">
                <ModalHeader
                    headerText={{
                        heading: 'Future of Work',
                        tagline: 'Assigned Resources to Topic',
                    }}
                    onClose={onClose}
                />
                <div
                    className="flex justify-end px-4"
                    onClick={handleDownloadAll}
                >
                    <p className="px-5 py-3 bg-primary-color rounded-2xl text-white w-fit cursor-pointer">
                        Download All
                    </p>
                </div>
                <div className="flex flex-col space-y-7 mt-7">
                    {standard.resources.map((resource) => (
                        <FileCard
                            key={resource.id}
                            handleDownload={handleDownload}
                            released={resource.released}
                            card={{
                                id: resource.id,
                                imageUrl: resource.url,
                                resourceType: resource.type,
                                name: resource.name,
                                btnText: 'Download',
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ResourceDownloadModal;
