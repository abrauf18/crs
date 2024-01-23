'use client';

import React, { useState } from 'react';
import { File } from 'lucide-react';
import StandardCard, { Data } from '@/app/modules/standard/StandardCard';
import { standards } from '../Standard';
import AssignCourseModal from './AssignCourseModal';

type StandardDetailsProps = {
    params: {
        id: string;
    };
    isShownFromTeacher?: boolean;
};

export const data: Data[] = [
    {
        id: 1,
        name: '3D Printing',
        duration: '5:00',
        question: '5 questions',
    },
    {
        id: 2,
        name: 'Design & Human',
        duration: '5:00',
        question: '5 questions',
    },
    {
        id: 3,
        name: 'Vertual Reality - VR',
        duration: '5:00',
        question: '5 questions',
    },
];

function StandardDetails({
    params: { id },
    isShownFromTeacher,
}: StandardDetailsProps) {
    const [isShowModal, setIsShowModal] = useState(false);
    const selectedStandard = standards.find((standard) => standard.id === id);

    if (!selectedStandard) {
        // Handle the case when no matching standard is found for the given id
        return <p>Standard not found</p>;
    }
    const handleOpenModal = () => {
        setIsShowModal(true);
    };

    const handleCloseModal = () => {
        setIsShowModal(false);
    };

    return (
        <>
            <div key={selectedStandard.id} className="mt-5">
                <div className="flex justify-between items-center mobile:items-start mb-1 mobile:flex-col">
                    <div className="flex  gap-2  items-center mobile:items-start">
                        <File color="#7AA43E" size={30} />
                        <h1 className="text-3xl font-semibold">
                            {selectedStandard.heading}
                        </h1>
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
                <p className="text-sm text-dark-gray">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </div>
            <StandardCard data={data} />
            <StandardCard data={data} />
            <StandardCard data={data} />

            {isShowModal && (
                <div className="fixed right-0 top-0 z-50  md:w-[60%] lg:w-[30%] w-full">
                    <AssignCourseModal onClose={handleCloseModal} />
                </div>
            )}
        </>
    );
}

export default StandardDetails;
