'use client';

import { useRouter, usePathname } from 'next/navigation';
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
import { convertSpacesToDashes } from '@/lib/utils';

export interface LearningInterface {
    id: number;
    name: string;
    grade: string;
    topic: string;
}

interface LearningPlanProp {
    learnings: LearningInterface[];
    fontSize?: string;
}

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '400', '700'],
});
function LearningPlanTable({ learnings, fontSize }: LearningPlanProp) {
    const { push } = useRouter();
    const path = usePathname();

    const handleClick = (
        event: React.MouseEvent<HTMLTableCellElement, MouseEvent>
    ) => {
        const topicName = event.currentTarget.textContent;

        if (topicName) {
            const formattedTopicName = convertSpacesToDashes(topicName);
            const newPath = `${path}/${formattedTopicName.toLowerCase()}`;
            push(newPath);
        }
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
                        Plan Name
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold">
                        Grade
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold">
                        Assign Topic
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold">
                        Action
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {learnings.map((learning, index) => (
                    <TableRow className="border-none" key={learning.id}>
                        <TableCell className="font-medium">
                            <span className="bg-light-gray px-[7px] py-[4px] rounded-md">
                                {index + 1}
                            </span>
                        </TableCell>
                        <TableCell>
                            <span className="flex gap-x-2 items-center ">
                                <span className="truncate h-[30px]">
                                    {learning.name}
                                </span>
                            </span>
                        </TableCell>
                        <TableCell className="text-dark-gray">
                            {learning.grade}
                        </TableCell>
                        <TableCell
                            className="text-dark-gray cursor-pointer lg:hover:text-gray-700 lg:hover:underline"
                            onClick={(
                                e: React.MouseEvent<
                                    HTMLTableCellElement,
                                    MouseEvent
                                >
                            ) => handleClick(e)}
                        >
                            {learning.topic}
                        </TableCell>
                        <TableCell className="flex justify-start items-center p-0 mt-3 ml-3">
                            <div className="mr-2 bg-light-orange rounded-md p-1">
                                <Eye color="#F59A3B" width={18} height={18} />
                            </div>
                            <div className="bg-red-100 rounded-md p-1">
                                <Trash color="#D34645" width={18} height={18} />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
export default LearningPlanTable;
