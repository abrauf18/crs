import React from 'react';
import CardContent from '@/app/components/common/CardContent';
import { CalendarDays, File, PlayIcon } from 'lucide-react';

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

async function Learning() {
    const Icons = {
        FirstIcon: PlayIcon,
        SecondIcon: File,
        ThirdIcon: CalendarDays,
    };
    return (
        <section className="grid lg:grid-cols-3 sm:grid-cols-2  gap-4">
            {learnings.map((learning, index) => (
                <div
                    key={learning.id || index}
                    className="rounded-lg border p-4"
                >
                    <CardContent
                        id={learning.id}
                        // route="/learning"
                        heading={learning.heading}
                        first={learning.first}
                        second={learning.second}
                        third={learning.third}
                        Icons={Icons}
                    />
                </div>
            ))}
        </section>
    );
}

export default Learning;
