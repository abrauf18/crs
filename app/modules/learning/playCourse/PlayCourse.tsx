'use client';

import Searchbar from '@/app/components/common/Searchbar';
import { ArrowLeft, BookmarkMinus, CalendarDays, MoveLeft } from 'lucide-react';
import React from 'react';
import PlayCourseImage from '@/app/assets/images/playCourseImage.svg';
import Image from 'next/image';
import LearningTable, { LearningInterface } from '../LearningTable';

export const LearningRecord: LearningInterface[] = [
    {
        id: 1,
        name: '3D Printing ',
        duration: '5:00',
        questions: '4',
        status: 'Play',
        isDone: true,
        isDisabled: false,
        resourceType: 'video',
    },
    {
        id: 1,
        name: '3D Printing ',
        duration: '5:00',
        questions: '4',
        status: 'Continue',
        isDone: true,
        isDisabled: false,
        resourceType: 'video',
    },
    {
        id: 1,
        name: '3D Printing ',
        duration: '5:00',
        questions: '4',
        status: 'Play',
        isDone: false,
        isDisabled: false,
        resourceType: 'video',
    },
    {
        id: 1,
        name: '3D Printing ',
        duration: '5:00',
        questions: '4',
        status: 'Continue',
        isDone: false,
        isDisabled: false,
        resourceType: 'quiz',
    },
];

function PlayCourse() {
    return (
        <section>
            <div className="flex flex-col justify-between items-center lg:flex-row space-y-2">
                <div className="flex lg:space-x-2 items-center w-full justify-start ">
                    <ArrowLeft />
                    <h1 className="text-black font-semibold text-lg">
                        Artificial Intelligence - AI
                    </h1>
                </div>
                <div className="bg-primary-color text-white w-full text-center mt-5 lg:mt-0 lg:w-fit px-4 py-3 rounded-xl">
                    Resources
                </div>
            </div>

            {/* <div className="flex items-center mt-5  relative">
                <Image
                    src={PlayCourseImage as string}
                    alt="play"
                    // layout="fill"
                    // objectFit="cover"
                    className="w-full object-cover "
                />
                <div className="absolute top-1 right-1 lg:top-5 lg:right-5 z-10 border flex space-x-2 items-center rounded-xl p-2">
                    <BookmarkMinus size={25} color="white" />
                    <p className="text-white">Save Here</p>
                </div>
            </div> */}

            <div className="flex items-center mt-5 relative">
                <Image
                    src={PlayCourseImage as string}
                    alt="play"
                    className="w-full object-cover h-64 md:h-full" // Set a default height and override it for mobile
                />
                <div className="absolute top-1 right-1 lg:top-5 lg:right-5 z-10 border flex space-x-2 items-center rounded-xl p-2">
                    <BookmarkMinus size={25} color="white" />
                    <p className="text-white">Save Here</p>
                </div>
            </div>

            <div className="border rounded-lg p-5 mt-5">
                <div className="flex space-x-2 items-center mb-2">
                    <CalendarDays color="orange" size={20} />
                    <p className="font-semibold text-lg">Day 1</p>
                </div>
                <LearningTable learnings={LearningRecord} isSubmitAssignment />
            </div>
        </section>
    );
}

export default PlayCourse;
