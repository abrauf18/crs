'use client';

import { useRouter, usePathname } from 'next/navigation';
import { CalendarDays, File, PlayIcon } from 'lucide-react';
import React from 'react';
import CardContent from '@/app/components/common/CardContent';
import Filters from '@/app/components/common/Filters';

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
        heading: 'React.js Mastery',
        first: 'Videos (20)',
        second: 'Exercises (15)',
        third: 'Course Length (3 Weeks)',
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
    {
        id: '7',
        heading: 'Web Development Fundamentals',
        first: 'Videos (16)',
        second: 'Exercises (11)',
        third: 'Course Length (2 Weeks)',
    },
    {
        id: '8',
        heading: 'Responsive Design Techniques',
        first: 'Videos (12)',
        second: 'Exercises (8)',
        third: 'Course Length (1.5 Weeks)',
    },
    {
        id: '9',
        heading: 'Database Management with SQL',
        first: 'Videos (18)',
        second: 'Exercises (12)',
        third: 'Course Length (2.5 Weeks)',
    },
    {
        id: '10',
        heading: 'Full Stack Development',
        first: 'Videos (22)',
        second: 'Exercises (18)',
        third: 'Course Length (4 Weeks)',
    },
    {
        id: '11',
        heading: 'Angular Framework Deep Dive',
        first: 'Videos (15)',
        second: 'Exercises (10)',
        third: 'Course Length (2.5 Weeks)',
    },
    {
        id: '12',
        heading: 'Vue.js Essentials',
        first: 'Videos (14)',
        second: 'Exercises (9)',
        third: 'Course Length (2 Weeks)',
    },
];
type StandardData = {
    id: string;
    name: string;
    courseLength: string;
    totalVideoUploads: string;
    totalNonVideoUploads: string;
};

function Standard({
    isShownFromTeacher,
    standardsCount,
    allStandards,
}: {
    isShownFromTeacher?: boolean;
    standardsCount?: number;
    allStandards?: StandardData[];
}) {
    const Icons = {
        FirstIcon: PlayIcon,
        SecondIcon: File,
        ThirdIcon: CalendarDays,
    };
    const { push } = useRouter();
    const pathname = usePathname();

    function handleClick(): void {
        push(`${pathname}/create`);
    }
    return (
        <>
            <Filters
                text={
                    isShownFromTeacher
                        ? `${standardsCount} Learning Plans In Total`
                        : `${standardsCount} Learning Standards In Total`
                }
                secondButtonText={
                    isShownFromTeacher ? 'Create New Plan' : 'Create New'
                }
                handleClick={() => handleClick()}
                isHideFirstBtn={!isShownFromTeacher}
                isHideSecondBtn={isShownFromTeacher}
            />
            <section className="grid lg:grid-cols-3 sm:grid-cols-2  gap-4">
                {allStandards?.map((standard, index) => (
                    <div
                        key={standard.id || index}
                        className="rounded-lg border p-4"
                    >
                        <CardContent
                            id={standard.id}
                            route={
                                isShownFromTeacher
                                    ? '/teacher/learning-plans'
                                    : '/admin/standard'
                            }
                            heading={standard.name}
                            first={`Videos (${standard.totalVideoUploads})`}
                            second={`Other Resources (${standard.totalNonVideoUploads})`}
                            third={`Course Length (${standard.courseLength})`}
                            Icons={Icons}
                            isHideEditIcon={isShownFromTeacher}
                            isFromStandard
                        />
                    </div>
                ))}
            </section>
        </>
    );
}

export default Standard;
