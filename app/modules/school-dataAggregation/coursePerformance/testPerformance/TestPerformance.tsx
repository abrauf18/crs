import StatsTable, { StatsInterface } from '@/app/components/common/StatsTable';
import Tabs from '@/app/components/common/test-performance/Tabs';

import { LucideMoveUpRight } from 'lucide-react';
import React from 'react';
import TestDetailTable, { TestDetailInterface } from './TestDetailTable';

function TestPerformance() {
    const StatsList: StatsInterface[] = [
        {
            id: 1,
            name: 'School',
            first: 20.4,
            firstNum: 20,
            second: 10.2,
            secondNum: 10,
            third: 30.26,
            thirdNum: 40,
            forth: 20.19,
            forthNum: 30,
            fifth: 10.92,
            fifthNum: 30,
        },
        {
            id: 1,
            name: 'School',
            first: 20.4,
            firstNum: 20,
            second: 10.2,
            secondNum: 10,
            third: 30.26,
            thirdNum: 40,
            forth: 20.19,
            forthNum: 30,
            fifth: 10.92,
            fifthNum: 30,
        },
        {
            id: 1,
            name: 'School',
            first: 20.4,
            firstNum: 20,
            second: 10.2,
            secondNum: 10,
            third: 30.26,
            thirdNum: 40,
            forth: 20.19,
            forthNum: 30,
            fifth: 10.92,
            fifthNum: 30,
        },
        {
            id: 1,
            name: 'School',
            first: 20.4,
            firstNum: 20,
            second: 10.2,
            secondNum: 10,
            third: 30.26,
            thirdNum: 40,
            forth: 20.19,
            forthNum: 30,
            fifth: 10.92,
            fifthNum: 30,
        },
        {
            id: 1,
            name: 'School',
            first: 20.4,
            firstNum: 20,
            second: 10.2,
            secondNum: 10,
            third: 30.26,
            thirdNum: 40,
            forth: 20.19,
            forthNum: 30,
            fifth: 10.92,
            fifthNum: 30,
        },
    ];

    const TestRecord: TestDetailInterface[] = [
        {
            id: 1,
            question:
                'What did say as a kid when asked: What do you want to be when you grow up?',
            rightAnswers: '20',
            wrongAnswers: '25',
        },
        {
            id: 2,
            question:
                'What did say as a kid when asked: What do you want to be when you grow up?',
            rightAnswers: '20',
            wrongAnswers: '25',
        },
        {
            id: 3,
            question:
                'What did say as a kid when asked: What do you want to be when you grow up?',
            rightAnswers: '20',
            wrongAnswers: '25',
        },
        {
            id: 4,
            question:
                'What did say as a kid when asked: What do you want to be when you grow up?',
            rightAnswers: '20',
            wrongAnswers: '25',
        },
        {
            id: 5,
            question:
                'What did say as a kid when asked: What do you want to be when you grow up?',
            rightAnswers: '20',
            wrongAnswers: '25',
        },
        {
            id: 6,
            question:
                'What did say as a kid when asked: What do you want to be when you grow up?',
            rightAnswers: '20',
            wrongAnswers: '25',
        },
        {
            id: 7,
            question:
                'What did say as a kid when asked: What do you want to be when you grow up?',
            rightAnswers: '20',
            wrongAnswers: '25',
        },
    ];
    return (
        <section>
            <div className="border px-2 py-5 lg:py-5 lg:px-5 rounded-lg mt-10">
                <div className="flex flex-col mb-4 lg:flex-row justify-between items-center">
                    <h1 className="text-lg font-semibold mb-4 lg:mb-0">
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
                <div className="rounded-xl border mt-5 py-3 md:px-6 mobile:px-3">
                    <StatsTable statsList={StatsList} />
                </div>

                <div className="rounded-lg  mt-5 py-3 md:px-6 mobile:px-3">
                    <TestDetailTable test={TestRecord} />
                </div>
            </div>
        </section>
    );
}

export default TestPerformance;
