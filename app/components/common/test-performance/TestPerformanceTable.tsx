'use client';

import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { Poppins } from 'next/font/google';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/app/components/ui/table';
import MyAnswersModal from '@/app/modules/profile/MyAnswersModal';
import TestReportModal from '@/app/modules/students/courses/TestReportModal';

export interface TestRecordInterface {
    id: number;
    question: string;
    answer: string;
}

interface TestPerformanceProp {
    test: TestRecordInterface[];
    fontSize?: string;
    isShownFromStudent?: boolean;
    isShownFromTeacher?: boolean;
}

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '400', '700'],
});
function TestPerformanceTable({
    test,
    fontSize,
    isShownFromStudent,
    isShownFromTeacher,
}: TestPerformanceProp) {
    const [isShowModal, setIsShowModal] = useState(false);
    const [isDisplayCourseModalOpen, setIsDisplayCourseModalOpen] =
        useState(false);
    return (
        <section>
            <Table
                className={`text-[${fontSize || '18'}px] mobile:text-[14px] ${
                    poppins.className
                }`}
            >
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px] text-dark-gray font-semibold">
                            Q NO.
                        </TableHead>
                        <TableHead className="w-[900px] text-dark-gray font-semibold">
                            Question
                        </TableHead>
                        <TableHead className="text-dark-gray font-semibold">
                            Answer
                        </TableHead>

                        <TableHead className="text-dark-gray font-semibold">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {test.map((test, index) => (
                        <TableRow className="border-none" key={test.id}>
                            <TableCell className="font-normal">
                                <span className="bg-light-gray px-[7px] py-[4px] rounded-md">
                                    {index + 1}
                                </span>
                            </TableCell>
                            <TableCell className="text-dark-gray font-normal">
                                <span>{test.question}</span>
                            </TableCell>

                            <TableCell
                                className={`text-dark-gray font-normal ${
                                    test.answer.toLowerCase() === 'wrong'
                                        ? 'text-red-500'
                                        : 'text-green-600'
                                }`}
                            >
                                {test.answer}
                            </TableCell>

                            <TableCell className="flex justify-center items-center">
                                <div
                                    className="mr-2 bg-light-orange rounded-md p-1 cursor-pointer"
                                    onClick={() =>
                                        isShownFromStudent
                                            ? setIsShowModal(true)
                                            : isShownFromTeacher
                                              ? setIsDisplayCourseModalOpen(
                                                    true
                                                )
                                              : null
                                    }
                                >
                                    <Eye
                                        color="#F59A3B"
                                        width={18}
                                        height={18}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {isShowModal && (
                <div className="fixed right-0 top-0 z-50  text-sm  lg:w-[30%]">
                    <MyAnswersModal onClose={() => setIsShowModal(false)} />
                </div>
            )}

            {isDisplayCourseModalOpen && (
                <div className="fixed right-0 top-0 z-50  text-sm lg:w-[25%]">
                    <TestReportModal
                        onClose={() => setIsDisplayCourseModalOpen(false)}
                    />
                </div>
            )}
        </section>
    );
}
export default TestPerformanceTable;
