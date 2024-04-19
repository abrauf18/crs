'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Eye, Trash } from 'lucide-react';
import { Poppins } from 'next/font/google';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/app/components/ui/table';
import action from '@/app/action';
import { deleteResourceAPI } from '@/app/api/resource';
import DialogBox from '@/app/components/common/DialogBox';
import {
    Resource,
    DEFAULT_RESOURCE,
    convertSpacesToDashes,
    ResourceToPath,
} from '@/lib/utils';

interface ResourcesProp {
    resources: Resource[];
    fontSize?: string;
    currentPage?: number;
    limit?: number;
    handlePageChange?: (page: number) => void;
}

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '400', '700'],
});
function ResourcesTable({
    resources,
    fontSize,
    currentPage = 0,
    limit = 0,
    handlePageChange,
}: ResourcesProp) {
    const path = usePathname();
    const { push } = useRouter();
    const { data } = useSession();
    const [isShowDialogBox, setIsShowDialogBox] = useState(false);
    const [selectedResource, setSelectedResource] =
        useState<Resource>(DEFAULT_RESOURCE);

    const handleClick = (
        event: React.MouseEvent<HTMLTableCellElement, MouseEvent>
    ) => {
        const topicName = event.currentTarget.textContent;

        if (topicName) {
            const formattedTopicName = convertSpacesToDashes(topicName);
            const newPath = `${path}/${formattedTopicName.toLowerCase()}`;
            push(newPath);
        }
    };

    const handleDeleteResources = async (idToRemove: string) => {
        if (data?.user?.accessToken) {
            try {
                await deleteResourceAPI({
                    accessToken: data?.user?.accessToken,
                    resourceId: idToRemove,
                });
                if (resources?.length === 1 && currentPage >= 1) {
                    handlePageChange && handlePageChange(currentPage);
                } else {
                    action('getResources');
                }
            } catch (error: any) {
                toast.error(
                    error?.response?.data?.message || 'An Error Occured'
                );
            }
        }
    };

    const handleConfirmDelete = () => {
        setIsShowDialogBox(false);
        handleDeleteResources(selectedResource?.id);
    };

    const handleCancelDelete = () => {
        setIsShowDialogBox(false);
    };

    return (
        <>
            <Table
                className={`text-[${fontSize || '18'}px] mobile:text-sm ${
                    poppins.className
                }`}
            >
                <TableHeader>
                    <TableRow>
                        <TableHead className=" text-dark-gray font-bold">
                            SNO.
                        </TableHead>
                        <TableHead className="text-dark-gray font-bold">
                            Resource Name
                        </TableHead>
                        <TableHead className="text-dark-gray font-bold">
                            Resource Type
                        </TableHead>
                        <TableHead className="text-dark-gray font-bold">
                            Assign Topic{' '}
                        </TableHead>
                        <TableHead className="text-dark-gray font-bold">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {resources.map((resource, index) => (
                        <TableRow className="border-none" key={resource.id}>
                            <TableCell className="font-medium ">
                                <span className="bg-light-gray px-[7px] py-[4px] rounded-md">
                                    {currentPage * limit + index + 1}
                                </span>
                            </TableCell>
                            <TableCell className="">
                                <span className="flex gap-x-2 items-center ">
                                    <span className="truncate h-[26px]">
                                        {resource.name}
                                    </span>
                                </span>
                            </TableCell>
                            {/* <TableCell>{resource.name}</TableCell> */}
                            <TableCell className="text-dark-gray">
                                {resource.type}
                            </TableCell>
                            <TableCell
                                className="text-dark-gray cursor-pointer lg:hover:text-gray-700 lg:hover:underline"
                                onClick={(
                                    e: React.MouseEvent<
                                        HTMLTableCellElement,
                                        MouseEvent
                                    >
                                ) => handleClick(e)}
                            >
                                {resource.topic}
                            </TableCell>
                            <TableCell className="flex justify-start items-center p-0 mt-3 ml-3">
                                <div className="mr-2 bg-light-orange rounded-md p-1 cursor-pointer">
                                    <Eye
                                        color="#F59A3B"
                                        width={18}
                                        height={18}
                                        onClick={() => {
                                            push(
                                                `${path}/${convertSpacesToDashes(
                                                    resource.topic
                                                )}/${
                                                    ResourceToPath[
                                                        resource.type
                                                    ]
                                                }/${resource.id}`
                                            );
                                        }}
                                    />
                                </div>
                                <div
                                    className="bg-red-100 rounded-md p-1 cursor-pointer"
                                    onClick={() => {
                                        setSelectedResource(resource);
                                        setIsShowDialogBox(true);
                                    }}
                                >
                                    <Trash
                                        color="#D34645"
                                        width={18}
                                        height={18}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {isShowDialogBox && (
                <DialogBox
                    isOpen={isShowDialogBox}
                    message={`Are you sure you want to delete ${
                        selectedResource?.name || 'this resource'
                    }?`}
                    onYes={handleConfirmDelete}
                    onNo={handleCancelDelete}
                />
            )}
        </>
    );
}
export default ResourcesTable;
