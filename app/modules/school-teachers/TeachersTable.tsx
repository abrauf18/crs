'use client';

import React, { useState } from 'react';
import EditIcon from '@/app/assets/icons/EditIcon';
import { Eye, Trash } from 'lucide-react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
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
import AssignClassModal from './AssignClassModal';

export interface TeacherInterface {
    id: number;
    imageUrl?: string | StaticImport;
    name: string;
    email: string;
    assignedClasses: string;
}

interface TeacherTableProp {
    teachers: TeacherInterface[];
    fontSize?: string;
}

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '400', '700'],
});

function TeachersTable({ teachers, fontSize }: TeacherTableProp): JSX.Element {
    const [isEditTeacherModalVisible, setIsEditTeacherModalVisible] =
        useState(false);
    const handleEditTeacherClick = () => {
        setIsEditTeacherModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsEditTeacherModalVisible(false);
    };
    return (
        <section>
            <Table
                className={`text-[${fontSize || '18'}px] mobile:text-[14px] ${
                    poppins.className
                }`}
            >
                <TableHeader>
                    <TableRow>
                        <TableHead className=" text-dark-gray font-bold">
                            SNO.
                        </TableHead>
                        <TableHead className="w-[200px] flex space-x-1 text-dark-gray items-center font-bold">
                            <span className="hidden lg:block"> Teacher</span>
                            <span>Name</span>
                        </TableHead>
                        <TableHead className="text-dark-gray font-bold">
                            Email
                        </TableHead>
                        <TableHead className="text-dark-gray font-bold">
                            Assigned Classes
                        </TableHead>
                        <TableHead className=" text-dark-gray font-bold">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {teachers.map((teacher, index) => (
                        <TableRow className="border-none" key={teacher.id}>
                            <TableCell className="font-medium">
                                <span className="bg-light-gray px-[7px] py-[4px] rounded-md">
                                    {index + 1}
                                </span>
                            </TableCell>
                            <TableCell className="">
                                <span className="rounded flex gap-x-2 items-center mr-6">
                                    <Image
                                        src={Avatar}
                                        alt="crs logo"
                                        style={{
                                            width: '25px',
                                            height: '25px',
                                            objectFit: 'fill',
                                        }}
                                    />
                                    <span>{teacher.name}</span>
                                </span>
                            </TableCell>
                            <TableCell className="text-dark-gray ">
                                {teacher.email}
                            </TableCell>
                            <TableCell className="text-dark-gray pl-10 ">
                                {teacher.assignedClasses}
                            </TableCell>
                            <TableCell className="flex justify-start items-center p-0 mt-6 ml-3 ">
                                <div className="mr-2 rounded-md cursor-pointer">
                                    <EditIcon
                                        width={28}
                                        height={28}
                                        onClick={handleEditTeacherClick}
                                    />
                                </div>
                                <div className="bg-red-100 rounded-md p-1">
                                    <Trash
                                        color="#D34645"
                                        width={18}
                                        height={18}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {isEditTeacherModalVisible && (
                <div className="absolute right-0 top-0 z-50 w-full lg:w-[30%]">
                    <AssignClassModal onClose={handleCloseModal} />
                </div>
            )}
        </section>
    );
}

export default TeachersTable;
