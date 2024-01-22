'use client';

import { useRouter, usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { CalendarDays, File, PlayIcon } from 'lucide-react';

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

function LearningCard() {
    const [activeStandard, setActiveStandard] = useState<string | null>('4');

    const Icons = {
        FirstIcon: PlayIcon,
        SecondIcon: File,
        ThirdIcon: CalendarDays,
    };
    const { push } = useRouter();
    const pathname = usePathname();

    function handleClick(standardId: string): void {
        setActiveStandard(standardId);
        // push(`${pathname}/create`);
    }
    return (
        <section className="grid lg:grid-cols-3 sm:grid-cols-2  gap-4">
            {standards.map((standard: any, index: any) => (
                <div
                    key={standard.id || index}
                    className={`rounded-lg border p-4 `}

                    // className={`rounded-lg border p-4 ${
                    //     standard.id === activeStandard &&
                    //     'border border-primary-color'
                    // }`}
                >
                    <div className="mt-2">
                        <h5 className="mb-2 text-lg font-semibold tracking-tight text-gray-900">
                            {standard.heading}
                        </h5>
                        <div>
                            <div className="flex gap-2 mb-2">
                                <div className="flex gap-1 items-center text-dark-gray text-sm">
                                    <PlayIcon
                                        height={17}
                                        width={17}
                                        color="#F59A3B"
                                    />
                                    <p>{standard.first}</p>
                                </div>
                                <div className="flex gap-1 items-center text-dark-gray text-sm">
                                    <File
                                        width={17}
                                        height={17}
                                        color="#7AA43E"
                                    />
                                    <p>{standard.second}</p>
                                </div>
                            </div>
                            <div className="flex gap-1 items-center mb-5 text-dark-gray text-sm">
                                <CalendarDays
                                    height={17}
                                    width={17}
                                    color="#54C3F4"
                                />
                                <p>{standard.third}</p>
                            </div>
                        </div>

                        <div className="flex items-end justify-end">
                            <div
                                onClick={() => handleClick(standard.id)}
                                className={`border rounded-lg text-dark-gray px-4 py-2 text-sm font-medium text-center mr-2 cursor-pointer lg:hover:bg-primary-color lg:hover:text-white
                                ${
                                    // standard.id === activeStandard &&
                                    // 'bg-primary-color text-white'
                                    standard.id === activeStandard && ''
                                }
                                `}
                            >
                                View
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}

export default LearningCard;
