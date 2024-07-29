import React from 'react';
import { ResourceType } from '@/lib/utils';
import GetDate from '@/app/modules/standard/GetDate';
import StandardTable from '@/app/modules/standard/StandardTable';

interface Topic {
    name: string;
    resourceId: string;
    type: ResourceType;
    topic: string;
    videoId?: string;
    watched?: boolean;
    completed?: boolean;
    canWrite?: boolean;
}
interface DailyUpload {
    day: number;
    released?: boolean;
    topics: Topic[];
}

function StandardCard({
    dailyUpload,
    isShownFromAdmin,
    isShownFromTeacher,
    isShownFromStudent,
}: {
    dailyUpload: DailyUpload;
    isShownFromAdmin?: boolean;
    isShownFromTeacher?: boolean;
    isShownFromStudent?: boolean;
}) {
    return (
        <section className="mt-5 w-full rounded-lg border p-3">
            <GetDate day={dailyUpload.day} />
            <div className="mt-5 w-full">
                <StandardTable
                    topicList={dailyUpload.topics}
                    released={dailyUpload.released}
                    isShownFromAdmin={isShownFromAdmin}
                    isShownFromTeacher={isShownFromTeacher}
                    isShownFromStudent={isShownFromStudent}
                />
            </div>
        </section>
    );
}

export default StandardCard;
