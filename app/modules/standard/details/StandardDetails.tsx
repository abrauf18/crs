'use client';

import React, { useState } from 'react';
import { File } from 'lucide-react';
import { ResourceType } from '@/lib/utils';
import StandardCard from '@/app/modules/standard/StandardCard';
import { standards } from '../Standard';
import AssignCourseModal from './AssignCourseModal';

interface Topic {
    name: string;
    resourceId: string;
    type: ResourceType;
    topic: string;
    videoId?: string;
}
interface DailyUpload {
    date: string;
    topics: Topic[];
}
type StandardDetailsProps = {
    params: {
        id: string;
    };
    isShownFromTeacher?: boolean;
    name?: string;
    description?: string;
    dailyUploads?: DailyUpload[];
};

function StandardDetails({
    params,
    isShownFromTeacher,
    name,
    description,
    dailyUploads,
}: StandardDetailsProps) {
    const [isShowModal, setIsShowModal] = useState(false);

    const handleOpenModal = () => {
        setIsShowModal(true);
    };

    const handleCloseModal = () => {
        setIsShowModal(false);
    };

    return (
        <>
            <div className="mt-5">
                <div className="flex justify-between items-center mobile:items-start mb-1 mobile:flex-col">
                    <div className="flex  gap-2  items-center mobile:items-start">
                        <File color="#7AA43E" size={30} />
                        <h1 className="text-3xl font-semibold">{name}</h1>
                    </div>
                    {isShownFromTeacher && (
                        <div className="mobile:flex mobile:justify-end mobile:w-full mobile:mb-4">
                            <div
                                onClick={handleOpenModal}
                                className="cursor-pointer w-fit mx-1 px-3 py-2 rounded-lg bg-primary-color border-2 border-primary-color text-white text-center mt-1 font-medium"
                            >
                                <button type="button">Assign Course</button>
                            </div>
                        </div>
                    )}
                </div>
                <p className="text-sm text-dark-gray">{description}</p>
            </div>
            {dailyUploads?.map((dailyUpload, index) => (
                <StandardCard
                    key={dailyUpload.date}
                    dailyUpload={dailyUpload}
                    isShownFromTeacher
                />
            ))}

            {isShowModal && (
                <div className="fixed right-0 top-0 z-50  md:w-[60%] lg:w-[30%] w-full">
                    <AssignCourseModal
                        onClose={handleCloseModal}
                        standardId={params.id}
                    />
                </div>
            )}
        </>
    );
}

export default StandardDetails;
