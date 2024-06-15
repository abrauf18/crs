'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { LucideMoveUpRight } from 'lucide-react';
import Searchbar from '@/app/components/common/Searchbar';
import Tabs from './Tabs';
import TestPerformanceTable, {
    TestRecordInterface,
} from './TestPerformanceTable';
import PageLoader from '../PageLoader';

interface CourseData {
    id: string;
    name: string;
    description: string;
    courseLength: string;
    dailyUploads: DailyUpload[];
}

interface DailyUpload {
    id: string;
    accessDate: string;
    weightage: number;
    resource: Resource;
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
    totalMarks: number;
    answers: Answer[];
}

interface Answer {
    obtainedMarks: number;
    answer?: string;
    answerURL?: string;
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

export const TestRecord: TestRecordInterface[] = [
    {
        id: 1,
        question:
            'What did say as a kid when asked: What do you want to be when you grow up?',
        answer: 'Right',
    },
    {
        id: 1,
        question:
            'What did say as a kid when asked: What do you want to be when you grow up?',
        answer: 'Wrong',
    },
    {
        id: 1,
        question:
            'What did say as a kid when asked: What do you want to be when you grow up?',
        answer: 'Right',
    },
    {
        id: 1,
        question:
            'What did say as a kid when asked: What do you want to be when you grow up?',
        answer: 'Wrong',
    },
    {
        id: 1,
        question:
            'What did say as a kid when asked: What do you want to be when you grow up?',
        answer: 'Right',
    },
    {
        id: 1,
        question:
            'What did say as a kid when asked: What do you want to be when you grow up?',
        answer: 'Right',
    },
    {
        id: 1,
        question:
            'What did say as a kid when asked: What do you want to be when you grow up?',
        answer: 'Wrong',
    },
    {
        id: 1,
        question:
            'What did say as a kid when asked: What do you want to be when you grow up?',
        answer: 'Right',
    },
];

function TestPerformance({
    isShownFromStudent,
    isShownFromTeacher,
    APIdata,
}: {
    isShownFromStudent?: boolean;
    isShownFromTeacher?: boolean;
    APIdata: CourseData;
}) {
    const { back } = useRouter();
    const { data, status } = useSession();
    return (
        <div>
            {status === 'loading' ? (
                <PageLoader />
            ) : (
                <div>
                    <Searchbar
                        headerText={data?.user?.name || ''}
                        tagline={data?.user?.email || ''}
                        isShowBackArrow
                        onBackClick={back}
                    />
                    <div className="border rounded-lg p-5 mt-10">
                        <div className="flex flex-col mb-4 lg:flex-row justify-between items-center">
                            <h1 className="text-2xl lg:text-3xl font-semibold mb-4 lg:mb-0">
                                {APIdata.name}
                            </h1>

                            <div className="flex items-baseline space-x-2 bg-green-50 py-2 px-4 rounded-lg border border-green-600 text-gray-500 font-medium">
                                <div className="px-[3px] border-2 w-5 h-5 border-green-200 rounded-md flex items-center justify-center">
                                    <LucideMoveUpRight
                                        color="green"
                                        size={10}
                                    />
                                </div>
                                <span className="text-green-600 font-bold text-2xl">
                                    80%
                                </span>
                                <span className="ml-1">
                                    Overall Performance
                                </span>
                            </div>
                        </div>
                        <Tabs />
                        <TestPerformanceTable
                            test={TestRecord}
                            isShownFromStudent={isShownFromStudent}
                            isShownFromTeacher={isShownFromTeacher}
                        />
                    </div>
                    {/* Uncomment and update MyAnswersModal if needed */}
                    {/* <div className="absolute right-0 top-0 z-50 text-sm lg:w-[25%]">
                  <MyAnswersModal />
                </div> */}
                </div>
            )}
        </div>
    );
}

export default TestPerformance;
