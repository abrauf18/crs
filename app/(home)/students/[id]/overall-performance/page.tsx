import Pagintaion from '@/app/components/common/Pagintaion';
import StudentPerformanceTable, {
    StudentRecord,
} from '@/app/modules/students/overall-performance/PerformanceTable';
import TestReportModal from '@/app/modules/students/overall-performance/TestReportModal';
import React from 'react';

export const Studentrecord: StudentRecord[] = [
    {
        id: 1,
        testName: 'Computer',
        result: '10',
        score: '20',
    },
    {
        id: 1,
        testName: 'Computer',
        result: '10',
        score: '20',
    },
    {
        id: 1,
        testName: 'Computer',
        result: '10',
        score: '20',
    },
    {
        id: 1,
        testName: 'Computer',
        result: '10',
        score: '20',
    },
    {
        id: 1,
        testName: 'Computer',
        result: '10',
        score: '20',
    },
    {
        id: 1,
        testName: 'Computer',
        result: '10',
        score: '20',
    },
];
function page() {
    return (
        <div>
            <h1 className="font-bold text-xl my-6">75% Overall Performance</h1>
            <div className="border rounded-lg p-5">
                <h1 className="text-[20px] font-semibold">
                    Kathryn Murphy - Report
                </h1>
                <StudentPerformanceTable students={Studentrecord} />
            </div>
            <div className="flex items-center w-full justify-center mt-5">
                <Pagintaion />
            </div>
            {/* <div className="absolute right-0 top-0 z-50  text-sm lg:w-[25%]">
                <TestReportModal />
            </div> */}
        </div>
    );
}

export default page;
