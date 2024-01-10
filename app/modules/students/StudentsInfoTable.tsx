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
import Image from 'next/image';
import Avatar from '@/app/assets/images/UserImage.svg';

export interface StudentInfoInterface {
    image: string;
    id: number;
    name: string;
    email: string;
    grade: string;
    performance: string;
}

export interface StudentsInfoProp {
    students: StudentInfoInterface[];
    fontSize?: string;
}

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '400', '700'],
});
function StudentsInfoTable({ students, fontSize }: StudentsInfoProp) {
    const { push } = useRouter();
    const pathname = usePathname();

    const handleClick = (id: number) => {
        console.log(id);
        push(`/teacher/students/${id}`);
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
                        Name
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold">
                        Email
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold">
                        Grade
                    </TableHead>
                    <TableHead className="text-dark-gray font-bold">
                        Performance
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
                        <TableCell>
                            <span className="rounded flex gap-x-2 items-center">
                                <Image
                                    src={Avatar}
                                    alt="crs logo"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        objectFit: 'fill',
                                    }}
                                />
                                <span>{resource.name}</span>
                            </span>
                        </TableCell>

                        <TableCell className="text-dark-gray">
                            {resource.email}
                        </TableCell>
                        <TableCell className="text-dark-gray">
                            {resource.grade}
                        </TableCell>
                        <TableCell className="text-dark-gray">
                            {resource.performance}
                        </TableCell>
                        <TableCell className="flex justify-start items-center p-0 mt-5 ml-3">
                            <div
                                className="mr-2 bg-light-orange rounded-md p-1 cursor-pointer"
                                onClick={() => handleClick(index)}
                            >
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
export default StudentsInfoTable;
