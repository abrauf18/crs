'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export interface CourseCardInterface {
    name: string;
    id: string;
}
function CourseCard({ name, id }: CourseCardInterface) {
    const { push } = useRouter();
    return (
        <div className="rounded-xl p-5 border">
            <h1 className="font-semibold text-lg">{name}</h1>
            <div className="flex justify-end  mt-4">
                <p
                    className="border px-4 py-3 rounded-lg cursor-pointer hover:bg-primary-color hover:text-white"
                    onClick={() => push(`/school/data-aggregation/${id}`)}
                >
                    Details
                </p>
            </div>
        </div>
    );
}

export default CourseCard;
