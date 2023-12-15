import React from 'react';
import GetDate from './GetDate';
import StandardTable from './StandardTable';

export interface Data {
    id: number;
    name: string;
    duration: string;
    question: string;
}

export interface StandardProps {
    data: Data[];
}

function StandardCard({ data }: StandardProps) {
    return (
        <section className="mt-5 w-full rounded-lg border p-3">
            <GetDate date="22nd November, 2023" />
            <div className="mt-5 w-full">
                <StandardTable data={data} />
            </div>
        </section>
    );
}

export default StandardCard;
