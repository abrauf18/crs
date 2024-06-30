'use client';

import React, { useState } from 'react';
import Filters from '@/app/components/common/Filters';
import { StudentProfileResourceType } from '@/lib/utils';
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
    const [activeTab, setActiveTabLocal] = useState<string>(
        StudentProfileResourceType.VIDEO
    );

    const filteredVideoUploads = dailyUploads?.filter(
        (upload) => upload.resource.video !== null
    );
    const filteredAssessmentUploads = dailyUploads?.filter(
        (upload) => upload.resource.AssessmentResourcesDetail !== null
    );

    const videoUploadsLength = filteredVideoUploads?.length ?? 0;
    const assessmentUploadsLength = filteredAssessmentUploads?.length ?? 0;

    const filteredUploads =
        activeTab === StudentProfileResourceType.VIDEO
            ? filteredVideoUploads
            : filteredAssessmentUploads;

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
                    StudentProfileResourceType.VIDEO,
                    StudentProfileResourceType.ASSESSMENT,
                ]}
            />
            <p className="text-dark-gray font-medium text-lg mt-5">
                <span className="font-semibold text-black">
                    {activeTab === StudentProfileResourceType.VIDEO
                        ? videoUploadsLength
                        : assessmentUploadsLength}
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
