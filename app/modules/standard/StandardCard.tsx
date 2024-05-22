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
}
interface DailyUpload {
    date: string;
    topics: Topic[];
}

function StandardCard({
    dailyUpload,
    isShownFromTeacher,
}: {
    dailyUpload: DailyUpload;
    isShownFromTeacher?: boolean;
}) {
    return (
        <section className="mt-5 w-full rounded-lg border p-3">
            <GetDate date={dailyUpload.date} />
            <div className="mt-5 w-full">
                <StandardTable
                    topicList={dailyUpload.topics}
                    isShownFromTeacher={isShownFromTeacher}
                />
            </div>
        </section>
    );
}

export default StandardCard;
