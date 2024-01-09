import MyAnswersModal from '@/app/modules/STUDENT/profile/MyAnswersModal';
import { StudentRecord } from '@/app/modules/students/StudentsRecordTable';
import Tabs from '@/app/modules/students/test-performance/Tabs';
import TestPerformanceTable, {
    TestRecord,
} from '@/app/modules/students/test-performance/TestPerformanceTable';
import React from 'react';

export const Studentrecord: TestRecord[] = [
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
// export function onSetActiveTab(tab: string) {
//     console.log(tab);
// }
function page() {
    return (
        <div>
            <div className="border rounded-lg p-5 mt-10">
                <div className="flex flex-col mb-4 lg:flex-row justify-between items-center">
                    <h1 className="text-2xl lg:text-3xl font-semibold mb-4 lg:mb-0">
                        Test Performance - HealthTech
                    </h1>

                    <div className="bg-green-50 py-2 px-4 rounded-lg border border-green-600 text-gray-500 font-medium">
                        <p>
                            <span className="text-green-600 font-bold text-2xl">
                                80%{' '}
                            </span>
                            Overall Performance
                        </p>
                    </div>
                </div>
                <Tabs />
                <TestPerformanceTable test={Studentrecord} />
            </div>
            {/* <div className="absolute right-0 top-0 z-50  text-sm  lg:w-[25%]">
                <MyAnswersModal />
            </div> */}
        </div>
    );
}

export default page;
