import { CalendarDays, File } from 'lucide-react';
import React from 'react';

import LearningCard from './LearningCard';
import LearningTable, { LearningInterface } from './LearningTable';

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
        resourceType: 'openEndedQuiz',
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

export const LearningRecord2: LearningInterface[] = [
    {
        id: 1,
        name: '3D Printing ',
        duration: '5:00',
        questions: '4',
        status: 'Play',
        isDone: false,
        isDisabled: true,
        resourceType: 'quiz',
    },
    {
        id: 1,
        name: '3D Printing ',
        duration: '5:00',
        questions: '4',
        status: 'Continue',
        isDone: false,
        isDisabled: true,
        resourceType: 'quiz',
    },
    {
        id: 1,
        name: '3D Printing ',
        duration: '5:00',
        questions: '4',
        status: 'Play',
        isDone: false,
        isDisabled: true,
        resourceType: 'video',
    },
    {
        id: 1,
        name: '3D Printing ',
        duration: '5:00',
        questions: '4',
        status: 'Continue',
        isDone: false,
        isDisabled: true,
        resourceType: 'video',
    },
];

export const standards = [
    {
        id: '1',
        heading: 'JavaScript Basics',
        first: 'Videos (15)',
        second: 'Exercises (10)',
        third: 'Course Length (2 Weeks)',
    },
    {
        id: '2',
        heading: 'HTML Fundamentals',
        first: 'Videos (12)',
        second: 'Exercises (8)',
        third: 'Course Length (1.5 Weeks)',
    },
    {
        key: '3',
        heading: 'CSS Essentials',
        first: 'Videos (18)',
        second: 'Exercises (12)',
        third: 'Course Length (2.5 Weeks)',
    },
    {
        id: '4',
        heading: 'Artificial Intelligence - AI',
        first: 'Videos (20)',
        second: 'Exercises (15)',
        third: 'Course Length (3 Weeks)',
        isActive: true,
    },
    {
        id: '5',
        heading: 'Node.js Basics',
        first: 'Videos (10)',
        second: 'Exercises (7)',
        third: 'Course Length (1.5 Weeks)',
    },
    {
        id: '6',
        heading: 'Python for Beginners',
        first: 'Videos (14)',
        second: 'Exercises (9)',
        third: 'Course Length (2 Weeks)',
    },
];

function Learning() {
    return (
        <div>
            <div className="flex justify-between items-center mt-8">
                <p className="font-semibold text-2xl ">
                    Your Assigned Learnings
                </p>
            </div>

            <div className="my-8">
                <LearningCard />
            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-8  items-end lg:items-center  ">
                <div>
                    <div className="flex items-center space-x-2">
                        <File color="green" />
                        <p className="font-semibold text-2xl ">
                            Artificial Intelligence - AI
                        </p>
                    </div>
                    <p className="text-dark-gray font-medium  mt-1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore
                    </p>
                </div>
                {/* <p className="border py-3 px-4 mt-2 lg:mt-0 text-center rounded-lg h-fit lg:w-fit font-semibold bg-sky-400 lg:hover:bg-sky-500 text-white ">
                    Continue Learning
                </p> */}
            </div>

            <div className="border rounded-lg p-5 mt-5">
                <div className="flex space-x-2 items-center mb-2">
                    <CalendarDays color="orange" size={20} />
                    <p className="font-semibold text-lg">Day 1</p>
                </div>
                <LearningTable learnings={LearningRecord} isSubmitAssignment />
            </div>

            <div className="border rounded-lg p-5 mt-5">
                <div className="flex space-x-2 items-center mb-2">
                    <CalendarDays color="orange" size={20} />
                    <p className="font-semibold text-lg">Day 2</p>
                </div>
                <LearningTable learnings={LearningRecord2} />
            </div>
        </div>
    );
}

export default Learning;
