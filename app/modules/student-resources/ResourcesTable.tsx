'use client';

import { useRouter, usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { Eye, Trash } from 'lucide-react';
import { Poppins } from 'next/font/google';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/app/components/ui/table';
import EditIcon from '@/app/assets/icons/EditIcon';
import ResourceDownloadModal from './ResourceDownloadModal';

export interface ResourcesInterface {
    topic: string;
    id: number;
    assignedResources: string;
}

export interface ResourcesProp {
    resources: ResourcesInterface[];
    fontSize?: string;
}

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '400', '700'],
});
function ResourcesTable({ resources, fontSize }: ResourcesProp) {
    const { push } = useRouter();
    const pathname = usePathname();
    const [isShowDownloadModal, setIsShowDownloadModal] = useState(false);

    const handleOpenDownloadModal = () => {
        setIsShowDownloadModal(true);
    };

    const handleCloseDownloadModal = () => {
        setIsShowDownloadModal(false);
    };

    return (
        <section>
            <Table
                className={`text-[${fontSize || '18'}px] mobile:text-sm ${
                    poppins.className
                }`}
            >
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px] text-dark-gray font-bold">
                            SNO.
                        </TableHead>
                        <TableHead className="text-dark-gray font-bold">
                            Topic
                        </TableHead>
                        <TableHead className="text-dark-gray font-bold text-center">
                            Assigned Resource
                        </TableHead>
                        <TableHead className="text-dark-gray font-bold lg:flex lg:justify-end lg:pr-24 items-center">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {resources.map((resource, index) => (
                        <TableRow className="border-none" key={resource.id}>
                            <TableCell className="font-medium">
                                <span className="bg-light-gray px-[7px] py-[4px] rounded-md">
                                    {index + 1}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span>{resource.topic}</span>
                            </TableCell>

                            <TableCell className="text-dark-gray text-center">
                                {resource.assignedResources}
                            </TableCell>

                            <TableCell className="flex lg:justify-end items-center p-0  lg:pr-10 space-x-2 font-medium mt-6 md:mt-5 lg:mt-2 ">
                                <div className="mr-2 bg-light-orange rounded-md p-1 cursor-pointer ">
                                    <Eye
                                        color="#F59A3B"
                                        width={18}
                                        height={18}
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="border rounded-lg px-4 py-2 text-dark-gray "
                                    onClick={handleOpenDownloadModal}
                                >
                                    Download
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {isShowDownloadModal && (
                <div className="fixed right-0 top-0 z-50 lg:w-[30%] w-full md:w-[60%]">
                    <ResourceDownloadModal onClose={handleCloseDownloadModal} />
                </div>
            )}
        </section>
    );
}
export default ResourcesTable;
