'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { Poppins } from 'next/font/google';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/app/components/ui/table';

export interface Student {
    id: number;
    name: string;
    first: number;
    firstNum: number;
    second: number;
    secondNum: number;
    third: number;
    thirdNum: number;
    forth: number;
    forthNum: number;
    fifth: number;
    fifthNum: number;
}

interface StudentsProp {
    students: Student[];
    fontSize?: string;
}

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '400', '700'],
});
function StudentsTable({ students, fontSize }: StudentsProp) {
    const { push } = useRouter();

    const handleClick = (
        event: React.MouseEvent<HTMLTableCellElement, MouseEvent>
    ) => {
        const topicName = event.currentTarget.textContent;
        push(`/students/${topicName?.split(' ').join('').toLowerCase()}`);
    };

    return (
        <Table
            className={`text-[${fontSize || '18'}px] mobile:text-[14px] ${
                poppins.className
            }`}
        >
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px] text-dark-gray font-bold text-center">
                        Avg
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold text-center">
                        80%+
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold text-center">
                        #
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold text-center">
                        0-67%
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold text-center">
                        #
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold text-center">
                        68-79%
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold text-center">
                        #
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold text-center">
                        90-92%
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold text-center">
                        #
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold text-center">
                        93-100%
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold text-center">
                        #
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {students.map((student, index) => (
                    <TableRow className="border-none" key={student.id}>
                        <TableCell className="text-dark-gray font-bold text-center">
                            {student.name}
                        </TableCell>
                        <TableCell className="text-dark-gray text-center">
                            {student.first}%
                        </TableCell>
                        <TableCell className="text-dark-gray text-center">
                            {student.firstNum}
                        </TableCell>
                        <TableCell className="text-dark-gray text-center">
                            {student.second}%
                        </TableCell>
                        <TableCell className="text-dark-gray text-center">
                            {student.secondNum}
                        </TableCell>
                        <TableCell className="text-dark-gray text-center">
                            {student.third}%
                        </TableCell>
                        <TableCell className="text-dark-gray text-center">
                            {student.thirdNum}
                        </TableCell>
                        <TableCell className="text-dark-gray text-center">
                            {student.forth}%
                        </TableCell>
                        <TableCell className="text-dark-gray text-center">
                            {student.forthNum}
                        </TableCell>
                        <TableCell className="text-dark-gray text-center">
                            {student.fifth}%
                        </TableCell>
                        <TableCell className="text-dark-gray text-center">
                            {student.fifthNum}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
export default StudentsTable;
