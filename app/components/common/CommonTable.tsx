import { Eye, Trash } from 'lucide-react';
import React from 'react';
import { Poppins } from 'next/font/google';
import EditIcon from '@/app/assets/icons/EditIcon';
import PptIcon from '@/app/assets/icons/PptIcon';
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '../ui/table';
import Pagintaion from './Pagintaion';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '400', '700'],
});
interface resources {
    id: number;
    title: string;
    topic: string;
}

function CommonTable({ resources }: { resources: any[] }) {
    return (
        <Table className={`text-md mobile:text-sm ${poppins.className}`}>
            <TableHeader>
                <TableRow>
                    <TableHead className=" text-dark-gray font-bold w-1/5">
                        SNO.
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold w-1/3">
                        Title
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold w-1/3">
                        Assign Topic
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold w-1/5">
                        Action
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {resources.map((resource, index) => (
                    <TableRow className="border-none" key={resource.id}>
                        <TableCell className="font-medium">
                            <span className="bg-light-gray px-[7px] py-[4px] rounded-md">
                                {index + 1}
                            </span>
                        </TableCell>
                        <TableCell className="flex space-x-2 items-center">
                            <PptIcon fill="#1ebeff" />
                            <span>{resource.title}</span>
                        </TableCell>
                        <TableCell className="text-dark-gray">
                            {resource.topic}
                        </TableCell>
                        <TableCell className="flex justify-start items-center p-0 mt-3 ml-3">
                            <div className="bg-light-orange mr-2 p-1 rounded-md">
                                <Eye color="#F59A3B" width={18} height={18} />
                            </div>
                            <EditIcon width={28} height={28} />
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

export default CommonTable;
