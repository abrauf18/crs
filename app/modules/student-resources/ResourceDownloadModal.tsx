import React from 'react';
import FileCard, { FileInterface } from '@/app/components/common/FileCard';
import Resource1 from '@/app/assets/images/resourceImages/Resource1.svg';
import Resource2 from '@/app/assets/images/resourceImages/Resource2.svg';
import Resource3 from '@/app/assets/images/resourceImages/Resource3.svg';
import { ModalHeader } from '../../components/common/ModalHeader';

function ResourceDownloadModal({ onClose }: any) {
    const resources: FileInterface[] = [
        {
            id: '1',
            imageUrl: Resource1,
            resourceType: 'ppt',
            name: 'Artiicial Intelligence',
            btnText: 'Download',
        },
        {
            id: '2',
            imageUrl: Resource2,
            resourceType: 'ppt',
            name: 'Artiicial Intelligence',
            btnText: 'Download',
        },
        {
            id: '1',
            imageUrl: Resource3,
            resourceType: 'xls',
            name: 'Artiicial Intelligence',
            btnText: 'Download',
        },
    ];
    return (
        <section className="w-full bg-white h-screen py-4 px-6 shadow-lg">
            <div className="h-[100%] overflow-y-auto px-2">
                <ModalHeader
                    headerText={{
                        heading: 'Future of Work',
                        tagline: 'Assigned Resources to Topic',
                    }}
                    onClose={onClose}
                />
                <div className="flex justify-end px-4">
                    <p className="px-5 py-3 bg-primary-color rounded-2xl text-white w-fit ">
                        Download All
                    </p>
                </div>
                <div className="flex flex-col space-y-7 mt-7">
                    {resources.map((resource) => (
                        <FileCard key={resource.id} card={resource} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ResourceDownloadModal;
