import React from 'react';
import { File } from 'lucide-react';
import { standards } from '@/app/modules/standard/Standard';
import StandardCard, { Data } from '@/app/modules/standard/StandardCard';

type DetailPageProps = {
    params: {
        id: string;
    };
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

function DetailPage({ params: { id } }: DetailPageProps) {
    const selectedStandard = standards.find((standard) => standard.id === id);

    if (!selectedStandard) {
        // Handle the case when no matching standard is found for the given id
        return <p>Standard not found</p>;
    }

    return (
        <>
            <div key={selectedStandard.id} className="mt-5">
                <div className="flex gap-2 items-center mb-1">
                    <File color="#7AA43E" size={30} />
                    <h1 className="text-3xl font-semibold">
                        {selectedStandard.heading}
                    </h1>
                </div>
                <p className="text-sm text-dark-gray">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </div>
            <StandardCard data={data} />
            <StandardCard data={data} />
            <StandardCard data={data} />
        </>
    );
}

export default DetailPage;
