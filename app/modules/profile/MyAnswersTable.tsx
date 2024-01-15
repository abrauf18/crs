'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { Eye, Trash } from 'lucide-react';
import { Poppins } from 'next/font/google';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/app/components/ui/table';

export interface MyAnswers {
    question: string;
    id: number;
    topicName: string;
    correctAnswer: string;
    score: string;
}

interface MyAnswersProp {
    myRecord: MyAnswers[];
    fontSize?: string;
}

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '400', '700'],
});
function MyAnswersTable({ myRecord, fontSize }: MyAnswersProp) {
    const { push } = useRouter();

    const handleClick = (id: number) => {
        console.log(id);
        push(`/student/profile/${id}`);
    };

    return (
        <Table
            className={`text-[${fontSize || '18'}px] mobile:text-[14px] ${
                poppins.className
            }`}
        >
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px] text-dark-gray font-bold">
                        SNO.
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold">
                        Topic Name
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold text-center">
                        Questions
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold text-center">
                        Correct Answers
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold text-center">
                        Score
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold text-center">
                        Action
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {myRecord.map((record, index) => (
                    <TableRow className="border-none" key={record.id}>
                        <TableCell className="font-medium">
                            <span className="bg-light-gray px-[7px] py-[4px] rounded-md">
                                {index + 1}
                            </span>
                        </TableCell>
                        <TableCell className="font-medium">
                            {record.topicName}
                        </TableCell>

                        <TableCell className="text-dark-gray text-center">
                            {record.question}
                        </TableCell>
                        <TableCell className="text-dark-gray text-center">
                            {record.correctAnswer}
                        </TableCell>
                        <TableCell className="text-dark-gray text-center">
                            {record.score}
                        </TableCell>
                        <TableCell className="flex justify-center items-center p-0 mt-5 ml-3 text-center">
                            <div
                                className="mr-2 bg-light-orange rounded-md p-1 cursor-pointer"
                                onClick={() => handleClick(index)}
                            >
                                <Eye color="#F59A3B" width={18} height={18} />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
export default MyAnswersTable;
