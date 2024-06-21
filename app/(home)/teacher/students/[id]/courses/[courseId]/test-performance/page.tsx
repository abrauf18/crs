import React from 'react';
import TestPerformance from '@/app/components/common/test-performance/TestPerformance';

interface CourseData {
    id: string;
    name: string;
    description: string;
    courseLength: string;
    dailyUploads: DailyUpload[];
    currentTotalWeightage: number;
    currentAcheivedWeightage: number;
}

interface DailyUpload {
    id: string;
    accessDate: string;
    weightage: number;
    resource: Resource;
    accessible: boolean;
    performance: number;
    yetToMarkWeightage: number;
    unAnsweredWeightage: number;
}

interface Resource {
    id: string;
    name: string;
    type: string;
    video: Video | null;
    AssessmentResourcesDetail: AssessmentDetail | null;
}

interface Video {
    id: string;
    questions: Question[];
}

interface Question {
    id: string;
    statement: string;
    totalMarks: number;
    answers: Answer[];
    options?: { [key: string]: string };
    correctOption?: string;
    correctOptionExplanation?: string;
}

interface Answer {
    obtainedMarks: number;
    answer?: string;
}

interface AssessmentDetail {
    id: string;
    totalMarks: number;
    deadline: number;
    assessmentAnswers: AssessmentAnswer[];
}

interface AssessmentAnswer {
    obtainedMarks: number;
    answerURL: string;
}

const defaultCourseData: CourseData = {
    id: 'defaultCourseId',
    name: 'Default Course',
    description: 'A basic course description.',
    courseLength: '5 hours',
    dailyUploads: [
        {
            id: 'defaultUploadId',
            accessDate: '2023-01-01',
            weightage: 10,
            resource: {
                id: 'defaultResourceId',
                name: 'Default Resource',
                type: 'Video',
                video: null,
                AssessmentResourcesDetail: null,
            },
            accessible: true,
            performance: 0,
            yetToMarkWeightage: 0,
            unAnsweredWeightage: 0,
        },
    ],
    currentTotalWeightage: 10,
    currentAcheivedWeightage: 0,
};

function TestPerformacePage() {
    return <TestPerformance isShownFromTeacher APIdata={defaultCourseData} />;
}

export default TestPerformacePage;
