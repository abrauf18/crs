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
import Image from 'next/image';
import Avatar from '@/app/assets/images/UserImage.svg';

export interface StudentRecord {
    id: number;
    testName: string;
    result: string;
    score: string;
}

interface StudentsRecordProp {
    students: StudentRecord[];
    fontSize?: string;
}

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '400', '700'],
});
function StudentsRecordTable({ students, fontSize }: StudentsRecordProp) {
    const { push } = useRouter();

    const handleClick = (id: number) => {
        console.log(id);
        push(`/students/${id}/overall-performance`);
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
                    <TableHead className=" text-dark-gray font-bold">
                        Test Name
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold">
                        Result
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold">
                        Score
                    </TableHead>

                    <TableHead className="text-dark-gray font-bold">
                        Action
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {students.map((resource, index) => (
                    <TableRow className="border-none" key={resource.id}>
                        <TableCell className="font-medium">
                            <span className="bg-light-gray px-[7px] py-[4px] rounded-md">
                                {index + 1}
                            </span>
                        </TableCell>
                        <TableCell className="text-dark-gray font-normal">
                            <span>{resource.testName}</span>
                        </TableCell>

                        <TableCell className="text-dark-gray font-normal">
                            {resource.result}
                        </TableCell>
                        <TableCell className="text-dark-gray font-normal">
                            {resource.score}
                        </TableCell>

                        <TableCell className="flex justify-start items-center p-0 mt-5 ml-3">
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
export default StudentsRecordTable;
