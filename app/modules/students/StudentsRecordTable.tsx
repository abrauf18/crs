'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
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

interface SummarizedStandardResult {
    standardId: string;
    standardName: string;
    totalWeightage: number;
    obtainedWeightage: number;
}

interface StudentsRecordProp {
    students: SummarizedStandardResult[];
    fontSize?: string;
}

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '400', '700'],
});
function StudentsRecordTable({ students, fontSize }: StudentsRecordProp) {
    const { push } = useRouter();

    const handleClick = (id: string) => {
        push(`/teacher/students/${id}/courses`);
    };

    return (
        <Table
            className={`text-[${fontSize || '18'}px] mobile:text-sm ${
                poppins.className
            }`}
        >
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[80px] text-dark-gray font-semibold text-sm text-center">
                        SNO.
                    </TableHead>
                    <TableHead className=" text-dark-gray font-semibold text-sm text-center">
                        Standard Name
                    </TableHead>
                    <TableHead className="text-dark-gray font-semibold text-sm text-center">
                        Total Weightage
                    </TableHead>
                    <TableHead className="text-dark-gray font-semibold text-sm text-center">
                        Obtained Weightage
                    </TableHead>
                    <TableHead className="text-dark-gray font-semibold text-sm text-center">
                        Action
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {students.map((resource, index) => (
                    <TableRow className="border-none" key={resource.standardId}>
                        <TableCell className="font-normal text-sm text-center">
                            <span className="bg-light-gray px-[7px] py-[4px] rounded-md">
                                {index + 1}
                            </span>
                        </TableCell>
                        <TableCell className="text-dark-gray font-normal text-sm text-center">
                            <span>{resource.standardName}</span>
                        </TableCell>

                        <TableCell className="text-dark-gray font-normal text-sm text-center">
                            {resource.totalWeightage}%
                        </TableCell>
                        <TableCell className="text-dark-gray font-normal text-sm text-center">
                            {resource.obtainedWeightage}%
                        </TableCell>
                        <TableCell className="flex justify-center items-center text-center">
                            <div
                                className="mr-2 bg-light-orange rounded-md p-1 cursor-pointer ml-5"
                                onClick={() => handleClick(resource.standardId)}
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
export default StudentsRecordTable;
