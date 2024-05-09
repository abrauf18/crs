import React from 'react';
import { ResourceType } from '@/lib/utils';
import GetDate from '@/app/modules/standard/GetDate';
import StandardTable from '@/app/modules/standard/StandardTable';

// export interface Data {
//     id: number;
//     name: string;
//     duration: string;
//     question: string;
// }
// export interface StandardProps {
//     data: Data[];
// }
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

function StandardCard({ dailyUpload }: { dailyUpload: DailyUpload }) {
    return (
        <section className="mt-5 w-full rounded-lg border p-3">
            <GetDate date={dailyUpload.date} />
            <div className="mt-5 w-full">
                <StandardTable topicList={dailyUpload.topics} />
            </div>
        </section>
    );
}

export default StandardCard;
