import React from 'react';
import { CalendarDays, File, PlayIcon } from 'lucide-react';
import Filters from '@/app/components/common/Filters';
import CardContent from '@/app/components/common/CardContent';
import { convertDashesToSpacesSimple } from '@/lib/utils';

interface TopicResourceCount {
    topicName: string;
    videoCount: number;
    nonVideoCount: number;
}

function Topics({
    isShownFromTeacher,
    topicsCount,
    allTopics,
    standardName,
    standardId,
}: {
    isShownFromTeacher?: boolean;
    topicsCount: number;
    allTopics?: TopicResourceCount[];
    standardName: string;
    standardId: string;
}) {
    const Icons = {
        FirstIcon: PlayIcon,
        SecondIcon: File,
        ThirdIcon: CalendarDays,
    };

    return (
        <>
            <Filters
                text={`${topicsCount} ${
                    topicsCount > 1 ? `Topics` : `Topic`
                } in Standard "${standardName}"`}
                isHideFirstBtn
                isHideSecondBtn
            />
            <section>
                {topicsCount > 0 ? (
                    <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4">
                        {allTopics?.map((topic, index) => (
                            <div
                                className="rounded-lg border p-4"
                                key={topic.topicName}
                            >
                                <CardContent
                                    id={topic.topicName}
                                    route={
                                        isShownFromTeacher
                                            ? `/teacher/learning-plans/${standardId}`
                                            : `/admin/standard/${standardId}`
                                    }
                                    heading={convertDashesToSpacesSimple(
                                        topic.topicName
                                    )}
                                    first={`Videos (${topic.videoCount})`}
                                    second={`Other Resources (${topic.nonVideoCount})`}
                                    Icons={Icons}
                                    isHideEditIcon
                                    isFromStandard
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-72">
                        <p className="text-lg text-gray-500 text-center">
                            No Topics Found!
                        </p>
                    </div>
                )}
            </section>
        </>
    );
}

export default Topics;
