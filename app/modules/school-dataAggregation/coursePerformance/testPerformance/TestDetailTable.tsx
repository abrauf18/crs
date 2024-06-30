'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/app/components/ui/table';
import QuestionDetailModal from './QuestionDetailModal';

export interface QuestionDetailInterface {
    id: string;
    statement: string;
    totalMarks: number;
    popUpTime: string;
}

interface TestDetailProp {
    data: DataItem[];
    fontSize?: string;
}

interface DataItem {
    id: string;
    name: string;
    video: {
        id: string;
        resourceId: string;
        thumbnailURL: string;
        duration: string;
        questions: QuestionDetailInterface[];
    };
    averageObtainedMarks: number;
}

function TestDetailTable({ data, fontSize }: TestDetailProp) {
    const [isShowDetailModal, setIsShowDetailModal] = useState(false);
    const [selectData, setSelectData] = useState<any>(null);
    const [averageObtainedMarks, setAverageObtainedMarks] = useState<
        number | null
    >(null);

    const handleDisplayModal = (marks: number, questionData: any) => {
        setAverageObtainedMarks(marks);
        setSelectData(questionData);
        setIsShowDetailModal(true);
    };

    const handleCloseModal = () => {
        setIsShowDetailModal(false);
        setAverageObtainedMarks(null);
        setSelectData(null);
    };

    return (
        <section>
            <Table
                className={`text-[${
                    fontSize || '18'
                }px] mobile:text-sm whitespace-nowrap`}
            >
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-dark-gray font-semibold">
                            Q NO.
                        </TableHead>
                        <TableHead className="w-[500px] text-dark-gray font-semibold">
                            Question
                        </TableHead>
                        <TableHead className="text-dark-gray font-semibold">
                            Total Marks
                        </TableHead>
                        <TableHead className="text-dark-gray font-semibold">
                            Average Obtained Marks
                        </TableHead>
                        <TableHead className="text-dark-gray font-semibold">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((testItem: any, index) => (
                        <React.Fragment key={testItem.id}>
                            {testItem.video === null ? (
                                testItem?.AssessmentResourcesDetail
                                    ?.assessmentAnswers.length === 0 ? (
                                    <TableRow className="border-b">
                                        <TableCell className="font-normal">
                                            <span className="bg-light-gray px-[7px] py-[4px] rounded-md">
                                                {index + 1}
                                            </span>
                                        </TableCell>
                                        <TableCell className="w-[500px] text-dark-gray font-normal">
                                            <span>{testItem.name}</span>
                                        </TableCell>
                                        <TableCell className="text-dark-gray font-normal">
                                            <span>
                                                {
                                                    testItem
                                                        .AssessmentResourcesDetail
                                                        .totalMarks
                                                }
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-dark-gray font-normal">
                                            <span>0 </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="mr-2 w-fit bg-light-orange rounded-md p-1">
                                                <EyeOff
                                                    color="#F59A3B"
                                                    width={18}
                                                    height={18}
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    testItem.AssessmentResourcesDetail.assessmentAnswers.map(
                                        (answer: any, aIndex: any) => (
                                            <TableRow
                                                className="border-b"
                                                key={answer.id}
                                            >
                                                <TableCell className="font-normal">
                                                    <span className="bg-light-gray px-[7px] py-[4px] rounded-md">
                                                        {aIndex + 1}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="w-[500px] text-dark-gray font-normal">
                                                    <span>{testItem.name}</span>
                                                </TableCell>
                                                <TableCell className="text-dark-gray font-normal">
                                                    <span>
                                                        {
                                                            testItem
                                                                .AssessmentResourcesDetail
                                                                .totalMarks
                                                        }
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-dark-gray font-normal">
                                                    <span>
                                                        {answer.obtainedMarks}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <div
                                                        className="mr-2 w-fit bg-light-orange rounded-md p-1 cursor-pointer"
                                                        onClick={() =>
                                                            handleDisplayModal(
                                                                answer.obtainedMarks,
                                                                testItem
                                                            )
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
                                        )
                                    )
                                )
                            ) : (
                                testItem.video.questions.map(
                                    (question: any, qIndex: any) => (
                                        <TableRow
                                            className="border-b"
                                            key={question.id}
                                        >
                                            <TableCell className="font-normal">
                                                <span className="bg-light-gray px-[7px] py-[4px] rounded-md">
                                                    {qIndex + 1}
                                                </span>
                                            </TableCell>
                                            <TableCell className="w-[500px] text-dark-gray font-normal">
                                                <span>
                                                    {question.statement}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-dark-gray font-normal">
                                                <span>
                                                    {question.totalMarks}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-dark-gray font-normal">
                                                <span>
                                                    {
                                                        testItem.averageObtainedMarks
                                                    }
                                                </span>
                                            </TableCell>
                                            {question?.answers.length > 0 ? (
                                                <TableCell>
                                                    <div
                                                        className="mr-2 w-fit bg-light-orange rounded-md p-1 cursor-pointer"
                                                        onClick={() =>
                                                            handleDisplayModal(
                                                                testItem.averageObtainedMarks,
                                                                question
                                                            )
                                                        }
                                                    >
                                                        <Eye
                                                            color="#F59A3B"
                                                            width={18}
                                                            height={18}
                                                        />
                                                    </div>
                                                </TableCell>
                                            ) : (
                                                <TableCell>
                                                    <div className="mr-2 w-fit bg-light-orange rounded-md p-1">
                                                        <EyeOff
                                                            color="#F59A3B"
                                                            width={18}
                                                            height={18}
                                                        />
                                                    </div>
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    )
                                )
                            )}
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
            {isShowDetailModal && (
                <div className="fixed right-0 top-0 z-50 w-full md:w-[60%] lg:w-[30%]">
                    <QuestionDetailModal
                        resourceData={selectData}
                        averageObtainedMarks={averageObtainedMarks || 0}
                        onClose={handleCloseModal}
                    />
                </div>
            )}
        </section>
    );
}

export default TestDetailTable;
