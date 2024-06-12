import React from 'react';
import { CalendarDays, File, PlayIcon } from 'lucide-react';
import CardContent from '@/app/components/common/CardContent';

export const learnings = [
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
];

type StandardData = {
    standardId: string;
    standardName: string;
    videoResourcesCount: number;
    nonVideoResourcesCount: number;
};

async function Learning({ standards }: { standards: StandardData[] }) {
    const Icons = {
        FirstIcon: PlayIcon,
        SecondIcon: File,
        ThirdIcon: CalendarDays,
    };
    return (
        <section className="grid lg:grid-cols-3 sm:grid-cols-2  gap-4">
            {standards.map((standard, index) => (
                <div
                    key={standard.standardId || index}
                    className="rounded-lg border p-4"
                >
                    <CardContent
                        id={standard.standardId}
                        route="/student/learning"
                        heading={standard.standardName}
                        first={`Videos (${standard.videoResourcesCount})`}
                        second={`Exercises (${standard.nonVideoResourcesCount})`}
                        Icons={Icons}
                        isHideEditIcon
                        isShownFromStudent
                    />
                </div>
            ))}
        </section>
    );
}

export default Learning;
