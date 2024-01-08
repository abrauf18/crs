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

export interface TestRecord {
    id: number;
    question: string;
    answer: string;
}

interface TestPerformanceProp {
    test: TestRecord[];
    fontSize?: string;
}

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '400', '700'],
});
function TestPerformanceTable({ test, fontSize }: TestPerformanceProp) {
    const { push } = useRouter();

    const handleClick = (id: number) => {
        console.log(id);
        // push(`/test/${id}/test-performance`);
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
                        Q NO.
                    </TableHead>
                    <TableHead className="w-[900px] text-dark-gray font-bold">
                        Question
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold">
                        Answer
                    </TableHead>

                    <TableHead className="text-dark-gray font-bold">
                        Action
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {test.map((test, index) => (
                    <TableRow className="border-none" key={test.id}>
                        <TableCell className="font-medium">
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
export default TestPerformanceTable;
