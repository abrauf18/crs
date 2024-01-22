import { CalendarDays, File, PlayIcon } from 'lucide-react';
import React from 'react';

function CourseCard() {
    return (
        <div className="rounded-lg border p-4 mb-4">
            <h5 className="mb-2 text-lg font-semibold tracking-tight text-gray-900">
                JavaScript Basics
            </h5>
            <div>
                <div className="flex flex-col lg:flex-row gap-2 mb-4">
                    <div className="flex gap-1  text-dark-gray text-xs">
                        <PlayIcon height={17} width={17} color="#F59A3B" />
                        <p>Videos (15)</p>
                    </div>
                    <div className="flex gap-1  text-dark-gray text-xs">
                        <File width={17} height={17} color="#7AA43E" />
                        <p>Exercises (10)</p>
                    </div>
                    <div className="flex gap-1   text-dark-gray text-xs">
                        <CalendarDays height={17} width={17} color="#54C3F4" />
                        <p>Course Length (2 Weeks)</p>
                    </div>
                </div>
            </div>

            <div className="flex items-end justify-end">
                <div className="border rounded-lg text-dark-gray px-3 py-2 text-sm font-medium text-center mr-2 lg:hover:bg-primary-color lg:hover:text-white">
                    Details
                </div>
            </div>
        </div>
    );
}

export default CourseCard;
