import React from 'react';
import CardContent from '@/app/components/common/CardContent';
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

async function Standard() {
    const Icons = {
        FirstIcon: PlayIcon,
        SecondIcon: File,
        ThirdIcon: CalendarDays,
    };
    return (
        <section className="grid lg:grid-cols-3 sm:grid-cols-2  gap-4">
            {standards.map((standard, index) => (
                <div
                    key={standard.id || index}
                    className="rounded-lg border p-4"
                >
                    <CardContent
                        id={standard.id}
                        route="/standard"
                        heading={standard.heading}
                        first={standard.first}
                        second={standard.second}
                        third={standard.third}
                        Icons={Icons}
                    />
                </div>
            ))}
        </section>
    );
}

export default Standard;
