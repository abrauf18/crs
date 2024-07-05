'use client';

import React, { useState } from 'react';
import Filters from '@/app/components/common/Filters';
import { ResourceType } from '@/lib/utils';
import Tabs from '@/app/components/common/test-performance/Tabs';
import PerformanceCard, { PerformanceCardInterface } from './PerformanceCard';

interface AssessmentResourcesDetail {
    id: string;
    resourceId: string;
    totalMarks: number;
    numberOfQuestio: number;
    deadline: number;
    createdAt: string;
    updatedAt: string;
}

interface Video {
    id: string;
    resourceId: string;
    thumbnailURL: string;
    topics: Record<string, string>;
    duration: string;
    createdAt: string;
    updatedAt: string;
}

interface Resource {
    id: string;
    name: string;
    url: string;
    type: string;
    topic: string;
    status: string;
    video: Video | null;
    AssessmentResourcesDetail: AssessmentResourcesDetail | null;
}

interface DailyUpload {
    id: string;
    resource: Resource;
}

function CoursePerformance({ dailyUploads }: { dailyUploads: DailyUpload[] }) {
    const [activeTab, setActiveTabLocal] = useState<string>(ResourceType.VIDEO);

    const filteredVideoUploads = dailyUploads?.filter(
        (upload) => upload.resource.video !== null
    );

    const filteredAssessmentUploads = dailyUploads?.filter(
        (upload) => upload.resource.AssessmentResourcesDetail !== null
    );
    const quizUploads = filteredAssessmentUploads?.filter(
        (upload) => upload.resource.type === ResourceType.QUIZ
    );
    const assignmentUploads = filteredAssessmentUploads?.filter(
        (upload) => upload.resource.type === ResourceType.ASSIGNMENT
    );
    const worksheetUploads = filteredAssessmentUploads?.filter(
        (upload) => upload.resource.type === ResourceType.WORKSHEET
    );
    const testUploads = filteredAssessmentUploads?.filter(
        (upload) => upload.resource.type === ResourceType.EXIT_TICKET_TEST
    );

    let filteredUploads: DailyUpload[] = [];
    switch (activeTab) {
        case ResourceType.VIDEO:
            filteredUploads = filteredVideoUploads;
            break;
        case ResourceType.ASSIGNMENT:
            filteredUploads = assignmentUploads;
            break;
        case ResourceType.WORKSHEET:
            filteredUploads = worksheetUploads;
            break;
        case 'Test':
            filteredUploads = testUploads;
            break;
        case ResourceType.QUIZ:
            filteredUploads = quizUploads;
            break;
        default:
            filteredUploads = [];
    }

    return (
        <section className="mt-5">
            <Filters
                text="Course Performance"
                secondButtonText="Student"
                isHideFirstBtn
                isHideSecondBtn
            />
            <Tabs
                activeTab={activeTab}
                setActiveTabLocal={setActiveTabLocal}
                tabOptions={[
                    ResourceType.VIDEO,
                    ResourceType.ASSIGNMENT,
                    ResourceType.WORKSHEET,
                    'Test',
                    ResourceType.QUIZ,
                ]}
            />
            <p className="text-dark-gray font-medium text-lg mt-5">
                <span className="font-semibold text-black">
                    {filteredUploads.length}
                </span>{' '}
                Results
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                {filteredUploads?.map((upload) => (
                    <div key={upload.id}>
                        <PerformanceCard
                            name={upload.resource.name}
                            id={upload.resource.id}
                            // percentage={'100'}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default CoursePerformance;
