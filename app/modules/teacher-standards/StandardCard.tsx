'use client';

import { useRouter, usePathname } from 'next/navigation';
import React from 'react';
import { CalendarDays, File, PlayIcon } from 'lucide-react';

export const standards = [
    {
        id: '1',
        heading: 'JavaScript Basics',
        first: 'Videos (15)',
        second: 'Exercises (10)',
        third: 'Course Length (2.5 Weeks)',
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
        third: 'Course Length (03 Weeks)',
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
        third: 'Course Length (02 Weeks)',
    },
];

function StandardCard() {
    const Icons = {
        FirstIcon: PlayIcon,
        SecondIcon: File,
        ThirdIcon: CalendarDays,
    };
    const { push } = useRouter();
    const pathname = usePathname();

    function handleClick(id: any): void {
        push(`${pathname}/${id}`);
    }
    return (
        <section>
            {standards.map((standard, index) => (
                <div
                    key={standard.id || index}
                    className="rounded-lg border lg:flex  lg:justify-between items-center p-4 mt-6"
                >
                    <div className="mt-2 ">
                        <h5 className="mb-2 text-lg font-semibold tracking-tight text-gray-900">
                            {standard.heading}
                        </h5>
                        <div>
                            <div className="flex flex-col lg:flex-row gap-2 mb-2">
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
                                <div className="flex gap-1 items-center  text-dark-gray text-sm">
                                    <CalendarDays
                                        height={17}
                                        width={17}
                                        color="#54C3F4"
                                    />
                                    <p>{standard.third}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        // href={route && id ? `${route}/${id}` : '#'}
                        onClick={() => handleClick(standard.id)}
                        className={`border rounded-lg text-dark-gray px-4 py-2 text-sm font-medium text-center mt-5 lg:mt-0 lg:mr-2 cursor-pointer hover:bg-primary-color hover:text-white `}
                    >
                        Details
                    </div>
                </div>
            ))}
        </section>
    );
}

export default StandardCard;

// 'use client';

// import { useRouter, usePathname } from 'next/navigation';
// import React from 'react';
// import { CalendarDays, File, PlayIcon } from 'lucide-react';

// export const standards = [
//     {
//         id: '1',
//         heading: 'JavaScript Basics',
//         first: 'Videos (15)',
//         second: 'Exercises (10)',
//         third: 'Course Length (2.5 Weeks)',
//     },
//     {
//         id: '2',
//         heading: 'HTML Fundamentals',
//         first: 'Videos (12)',
//         second: 'Exercises (8)',
//         third: 'Course Length (1.5 Weeks)',
//     },
//     {
//         key: '3',
//         heading: 'CSS Essentials',
//         first: 'Videos (18)',
//         second: 'Exercises (12)',
//         third: 'Course Length (2.5 Weeks)',
//     },
//     {
//         id: '4',
//         heading: 'Artificial Intelligence - AI',
//         first: 'Videos (20)',
//         second: 'Exercises (15)',
//         third: 'Course Length (03 Weeks)',
//         isActive: true,
//     },
//     {
//         id: '5',
//         heading: 'Node.js Basics',
//         first: 'Videos (10)',
//         second: 'Exercises (7)',
//         third: 'Course Length (1.5 Weeks)',
//     },
//     {
//         id: '6',
//         heading: 'Python for Beginners',
//         first: 'Videos (14)',
//         second: 'Exercises (9)',
//         third: 'Course Length (02 Weeks)',
//     },
// ];

// function StandardCard() {
//     const Icons = {
//         FirstIcon: PlayIcon,
//         SecondIcon: File,
//         ThirdIcon: CalendarDays,
//     };
//     const { push } = useRouter();
//     const pathname = usePathname();

//     function handleClick(id: any): void {
//         push(`${pathname}/${id}`);
//     }

//     return (
//         <section>
//             {standards.map((standard, index) => (
//                 <div
//                     key={standard.id || index}
//                     className="rounded-lg border lg:flex lg:justify-between items-center p-4 mt-6 sm:flex-col"
//                 >
//                     <div className="mt-2 sm:mt-0 sm:text-center">
//                         <h5 className="mb-2 text-lg font-semibold tracking-tight text-gray-900">
//                             {standard.heading}
//                         </h5>
//                         <div>
//                             <div className="flex flex-col sm:flex-row gap-2 mb-2">
//                                 <div className="flex gap-1 items-center text-dark-gray text-sm">
//                                     <PlayIcon
//                                         height={17}
//                                         width={17}
//                                         color="#F59A3B"
//                                     />
//                                     <p>{standard.first}</p>
//                                 </div>
//                                 <div className="flex gap-1 items-center text-dark-gray text-sm">
//                                     <File
//                                         width={17}
//                                         height={17}
//                                         color="#7AA43E"
//                                     />
//                                     <p>{standard.second}</p>
//                                 </div>
//                                 <div className="flex gap-1 items-center text-dark-gray text-sm">
//                                     <CalendarDays
//                                         height={17}
//                                         width={17}
//                                         color="#54C3F4"
//                                     />
//                                     <p>{standard.third}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div
//                         onClick={() => handleClick(standard.id)}
//                         className={`border rounded-lg text-dark-gray px-4 py-2 text-sm font-medium text-center mt-5 sm:mt-2 lg:mt-0 lg:mr-2 cursor-pointer hover:bg-primary-color hover:text-white `}
//                     >
//                         Details
//                     </div>
//                 </div>
//             ))}
//         </section>
//     );
// }

// export default StandardCard;
