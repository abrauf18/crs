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

export interface StatsInterface {
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

interface StatsTableProps {
    statsList: StatsInterface[];
    fontSize?: string;
}

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '400', '700'],
});
function StatsTable({ statsList, fontSize }: StatsTableProps) {
    const { push } = useRouter();

    const handleClick = (
        event: React.MouseEvent<HTMLTableCellElement, MouseEvent>
    ) => {
        const topicName = event.currentTarget.textContent;
        push(`/students/${topicName?.split(' ').join('').toLowerCase()}`);
    };

    return (
        <Table
            className={`text-[${fontSize || '18'}px] mobile:text-sm   ${
                poppins.className
            }`}
        >
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px] text-dark-gray font-bold ">
                        Avg
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold ">
                        80%+
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold ">
                        #
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold ">
                        0-67%
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold ">
                        #
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold ">
                        68-79%
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold ">
                        #
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold ">
                        90-92%
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold ">
                        #
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold ">
                        93-100%
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold ">
                        #
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {statsList.map((item, index) => (
                    <TableRow className="border-none " key={item.id}>
                        <TableCell className="text-dark-gray font-bold  ">
                            {item.name}
                        </TableCell>

                        <TableCell className="text-dark-gray  ">
                            {item.first}%
                        </TableCell>
                        <TableCell className="text-dark-gray ">
                            {item.firstNum}
                        </TableCell>
                        <TableCell className="text-dark-gray ">
                            {item.second}%
                        </TableCell>
                        <TableCell className="text-dark-gray ">
                            {item.secondNum}
                        </TableCell>
                        <TableCell className="text-dark-gray ">
                            {item.third}%
                        </TableCell>
                        <TableCell className="text-dark-gray ">
                            {item.thirdNum}
                        </TableCell>
                        <TableCell className="text-dark-gray ">
                            {item.forth}%
                        </TableCell>
                        <TableCell className="text-dark-gray ">
                            {item.forthNum}
                        </TableCell>
                        <TableCell className="text-dark-gray ">
                            {item.fifth}%
                        </TableCell>
                        <TableCell className="text-dark-gray ">
                            {item.fifthNum}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
export default StatsTable;
