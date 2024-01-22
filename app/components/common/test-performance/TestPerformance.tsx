import React from 'react';
import { LucideMoveUpRight } from 'lucide-react';
import Tabs from './Tabs';
import TestPerformanceTable, {
    TestRecordInterface,
} from './TestPerformanceTable';

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
}: {
    isShownFromStudent?: boolean;
    isShownFromTeacher?: boolean;
}) {
    return (
        <div>
            <div className="border rounded-lg p-5 mt-10">
                <div className="flex flex-col mb-4 lg:flex-row justify-between items-center ">
                    <h1 className="text-2xl lg:text-3xl font-semibold mb-4 lg:mb-0">
                        Test Performance - HealthTech
                    </h1>

                    <div className=" flex items-baseline space-x-2 bg-green-50 py-2 px-4 rounded-lg border border-green-600 text-gray-500 font-medium">
                        <div className=" px-[3px] border-2 w-5 h-5 border-green-200 rounded-md flex items-center self-center">
                            <LucideMoveUpRight color="green" size={10} />
                        </div>
                        <span className="text-green-600 font-bold text-2xl ">
                            80%
                        </span>
                        <span className="ml-1">Overall Performance</span>
                    </div>
                </div>
                <Tabs />
                <TestPerformanceTable
                    test={TestRecord}
                    isShownFromStudent={isShownFromStudent}
                    isShownFromTeacher={isShownFromTeacher}
                />
            </div>
            {/* <div className="absolute right-0 top-0 z-50  text-sm  lg:w-[25%]">
                <MyAnswersModal />
            </div> */}
        </div>
    );
}

export default TestPerformance;
