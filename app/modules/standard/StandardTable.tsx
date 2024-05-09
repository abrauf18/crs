'use client';

import React, { useState } from 'react';
import { Poppins } from 'next/font/google';
import { Eye, LucideFileQuestion, Trash } from 'lucide-react';
import {
    DEFAULT_RESOURCE,
    Resource,
    ResourceToPath,
    ResourceType,
    convertSpacesToDashes,
    // resourceTypeToIcon,
    // resourceTypeToJsxIcon,
} from '@/lib/utils';
import {
    TableRow,
    TableBody,
    TableCell,
    Table,
} from '@/app/components/ui/table';
import XlsIcon from '@/app/assets/icons/XlsIcon';
import PptIcon from '@/app/assets/icons/PptIcon';
import EditIcon from '@/app/assets/icons/EditIcon';
import TicketIcon from '@/app/assets/icons/TicketIcon';
import RecorderIcon from '@/app/assets/icons/RecorderIcon';
import QuestionMarkIcon from '@/app/assets/icons/QuestionMarkIcon';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import EditQuestionsModal from '../video/EditQuestionsModal';
import EditTopicsModal from '../video/EditTopicsModal';
import UpdateResourceModal from '../resources/UpdateResourceModal';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '400', '700'],
});
// interface Data {
//     id: number;
//     name: string;
//     duration: string;
//     question: string;
// }

// export interface StandardProps {
//     data: Data[];
// }

interface Topic {
    name: string;
    resourceId: string;
    type: ResourceType;
    topic: string;
    videoId?: string;
}

function StandardTable({ topicList }: { topicList: Topic[] }) {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [editResourceId, setEditResourceId] = useState('');
    const [isShowEditVideoModal, setIsShowEditVideoModal] = useState(false);
    const [showUpdateResourceModal, setShowUpdateResourceModal] =
        useState(false);
    const [selectedResource, setSelectedResource] =
        useState<Resource>(DEFAULT_RESOURCE);

    const handleOpenEditVideoModal = (id: string) => {
        setEditResourceId(id);
        setIsShowEditVideoModal(true);
    };

    const handleCloseEditVideoModal = () => {
        setEditResourceId('');
        setIsShowEditVideoModal(false);
        setStep(0);
    };

    const handleOpenEditResourceModal = (
        id: string,
        name: string,
        type: ResourceType,
        topic: string
    ) => {
        setShowUpdateResourceModal(true);
        setSelectedResource({ id, name, type, topic });
    };

    const handleCloseEditResourceModal = () => {
        setShowUpdateResourceModal(false);
        setSelectedResource(DEFAULT_RESOURCE);
    };

    const viewResource = (
        type: ResourceType,
        resourceId: string,
        topic: string
    ) => {
        if (type === ResourceType.VIDEO) {
            return router.push(`/admin/video/${resourceId}`);
        }
        return router.push(
            `/admin/resources/${convertSpacesToDashes(topic)}/${
                ResourceToPath[type]
            }/${resourceId}`
        );
    };

    return (
        <>
            <Table className={`text-sm mobile:text-xs ${poppins.className}`}>
                <TableBody>
                    {topicList.map((topic, index) => (
                        <TableRow key={topic.resourceId}>
                            <TableCell className="font-medium">
                                <span className="bg-light-gray px-[7px] py-[4px] rounded-md">
                                    {index}
                                </span>
                            </TableCell>
                            <TableCell className="flex items-start gap-2 ">
                                {topic.type?.toLowerCase() === 'slideshow' && (
                                    <PptIcon fill="#1ebeff" />
                                )}
                                {topic.type?.toLowerCase() === 'video' && (
                                    <RecorderIcon />
                                )}
                                {topic.type?.toLowerCase() === 'worksheet' && (
                                    <XlsIcon color="#54C3F4" />
                                )}
                                {topic.type?.toLowerCase() ===
                                    'exit-ticket-test' && (
                                    <TicketIcon color="#54C3F4" />
                                )}
                                {topic.type?.toLowerCase() === 'quiz' && (
                                    <QuestionMarkIcon />
                                )}
                                {topic.name}
                            </TableCell>
                            <TableCell className="text-dark-gray">
                                {topic.type}
                            </TableCell>
                            <TableCell className="flex justify-start items-center p-0 mt-3 ml-3">
                                <div className="mr-2 bg-light-orange rounded-md p-1">
                                    <Eye
                                        color="#F59A3B"
                                        width={18}
                                        height={18}
                                        onClick={() =>
                                            topic.topic === ResourceType.VIDEO
                                                ? viewResource(
                                                      topic.type,
                                                      topic.resourceId,
                                                      topic.topic
                                                  )
                                                : viewResource(
                                                      topic.type,
                                                      topic.videoId ?? '',
                                                      topic.name
                                                  )
                                        }
                                    />
                                </div>
                                <div className="mr-2 rounded-md">
                                    <EditIcon
                                        width={28}
                                        height={28}
                                        onClick={() => {
                                            if (topic.type === 'video') {
                                                handleOpenEditVideoModal(
                                                    topic.videoId ?? ''
                                                );
                                            } else {
                                                handleOpenEditResourceModal(
                                                    topic.resourceId,
                                                    topic.name,
                                                    topic.type,
                                                    topic.topic
                                                );
                                            }
                                        }}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {isShowEditVideoModal && step === 0 && (
                <div className="fixed right-0 top-0 z-50 w-full md:w-[60%] lg:w-[30%]">
                    <EditQuestionsModal
                        videoId={editResourceId}
                        onClose={handleCloseEditVideoModal}
                        onButtonClick={() => setStep((prev) => prev + 1)}
                    />
                </div>
            )}

            {isShowEditVideoModal && step === 1 && (
                <div className="fixed right-0 top-0 z-50 w-full md:w-[60%] lg:w-[30%]">
                    <EditTopicsModal
                        videoId={editResourceId}
                        onClose={handleCloseEditVideoModal}
                        onButtonClick={() => setStep((prev) => prev + 1)}
                    />
                </div>
            )}

            {showUpdateResourceModal && (
                <div className="fixed right-0 top-0 z-50 w-[100%] md:w-[60%] lg:w-[30%]">
                    <UpdateResourceModal
                        onClose={handleCloseEditResourceModal}
                        resource={selectedResource}
                    />
                </div>
            )}
        </>
    );
}

export default StandardTable;
