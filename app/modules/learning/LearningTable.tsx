'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { Check, Eye, Trash } from 'lucide-react';
import { Poppins } from 'next/font/google';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/app/components/ui/table';
import PlayIcon from '@/app/assets/icons/PlayIcon';
import MovieIcon from '@/app/assets/icons/MovieIcon';

export interface LearningInterface {
    name: string;
    id: number;
    duration: string;
    status: string;
    questions: string;
    resourceType: string;
    isDone: boolean;
    isDisabled: boolean;
}

interface LearningTableProps {
    learnings: LearningInterface[];
    fontSize?: string;
    isSubmitAssignment?: boolean;
}

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '400', '700'],
});
function LearningTable({
    learnings,
    fontSize,
    isSubmitAssignment,
}: LearningTableProps) {
    const { push } = useRouter();

    const handleClick = (id: number) => {
        console.log(id);
        // push(`/students/${id}`);
    };
    const onSubmitAssignment = () =>
        push('/student/learning/submit-assignment');

    return (
        <Table
            className={`text-[${fontSize || '18'}px] mobile:text-[14px] ${
                poppins.className
            }`}
        >
            <TableBody>
                {learnings.map((learning, index) => (
                    <TableRow className="border-none" key={learning.id}>
                        <TableCell className="font-medium">
                            <span className="bg-light-gray px-[7px] py-[4px] rounded-md">
                                {index + 1}
                            </span>
                        </TableCell>
                        <TableCell>
                            <span className="rounded flex gap-x-2 items-center">
                                {learning.isDone && (
                                    <Check color="green" className="mr-4" />
                                )}
                                <MovieIcon />
                                <span>{learning.name}</span>
                            </span>
                        </TableCell>

                        <TableCell className="text-dark-gray">
                            {learning.duration}
                        </TableCell>
                        <TableCell className="text-dark-gray  text-right">
                            {learning.questions} Questions
                        </TableCell>
                        <TableCell className="text-white  flex space-x-2  justify-end">
                            <div
                                className={`flex space-x-2 items-center border w-fit py-2 px-4 rounded-xl  ${
                                    learning.isDisabled
                                        ? 'bg-gray-300'
                                        : 'bg-primary-color'
                                }`}
                            >
                                <PlayIcon stroke="white" />
                                <p> {learning.status}</p>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
                {isSubmitAssignment && (
                    <TableRow className="border-none">
                        <TableCell className="font-medium">
                            <span className="bg-light-gray px-[7px] py-[4px] rounded-xl">
                                {learnings.length + 1}
                            </span>
                        </TableCell>
                        <TableCell>Assignment - XYZ</TableCell>

                        <TableCell className="text-dark-gray" />
                        <TableCell className="text-dark-gray  text-right" />
                        <TableCell className="text-white  flex space-x-2  justify-end">
                            <div
                                className="flex space-x-2 items-center border w-fit py-2 px-4 rounded-xl  bg-primary-color cursor-pointer"
                                onClick={onSubmitAssignment}
                            >
                                <span>
                                    Submit
                                    <span className="hidden lg:inline">
                                        &nbsp;Assignment
                                    </span>
                                </span>
                            </div>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
export default LearningTable;
