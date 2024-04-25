'use client';

import { useRouter, usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { Eye, Trash } from 'lucide-react';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/app/components/ui/table';
import Avatar from '@/app/assets/images/UserImage.svg';
import EditIcon from '@/app/assets/icons/EditIcon';
import ClassroomModal from '../classroom/ClassroomModal';

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
    isClassroomTable?: boolean;
    isTeacherDashboardTable?: boolean;
}

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '400', '700'],
});

function StudentsInfoTable({
    students,
    fontSize,
    isClassroomTable,
    isTeacherDashboardTable,
}: StudentsInfoProp) {
    const [isShowStudentModal, setIsShowStudentModal] = useState(false);
    const [studentList, setStudentList] = useState(students);
    const { push } = useRouter();
    const pathname = usePathname();

    const handleClick = (id: number) => {
        push(`/teacher/students/${id}`);
    };
    const handleOpenStudentModal = () => {
        setIsShowStudentModal(true);
    };

    const handleCloseStudentModal = () => {
        setIsShowStudentModal(false);
    };
    const handleDeleteStudents = (indexToRemove: number) => {
        setStudentList(students.splice(indexToRemove, 1));
    };
    return (
        <section>
            <Table
                className={`text-[${fontSize || '18'}px] mobile:text-sm ${
                    poppins.className
                }`}
            >
                <TableHeader>
                    <TableRow>
                        <TableHead className=" text-dark-gray font-bold">
                            SNO.
                        </TableHead>
                        <TableHead className="text-dark-gray font-bold">
                            Name
                        </TableHead>
                        <TableHead className="text-dark-gray font-bold">
                            Email
                        </TableHead>
                        {!isTeacherDashboardTable && (
                            <TableHead className="text-dark-gray font-bold">
                                Grade
                            </TableHead>
                        )}
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
                                    {resource.id}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span className="rounded flex gap-x-2 items-center">
                                    <Image
                                        src={Avatar}
                                        alt="user"
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            objectFit: 'fill',
                                        }}
                                    />
                                    <span>{resource.name}</span>
                                </span>
                            </TableCell>

                            <TableCell className="text-dark-gray">
                                {resource.email}
                            </TableCell>
                            {!isTeacherDashboardTable && (
                                <TableCell className="text-dark-gray">
                                    {resource.grade}
                                </TableCell>
                            )}
                            <TableCell className="text-dark-gray">
                                {resource.performance}
                            </TableCell>
                            <TableCell className="flex justify-start space-x-2 items-center p-0 mt-5 ml-3">
                                {!isClassroomTable && (
                                    <div
                                        className=" bg-light-orange rounded-md p-1 cursor-pointer"
                                        onClick={() =>
                                            !isClassroomTable
                                                ? handleClick(index)
                                                : handleOpenStudentModal()
                                        }
                                    >
                                        <Eye
                                            color="#F59A3B"
                                            width={18}
                                            height={18}
                                        />
                                    </div>
                                )}
                                {!isTeacherDashboardTable && (
                                    <div
                                        className="bg-green-100 rounded-md p-1 cursor-pointer"
                                        onClick={() => handleOpenStudentModal()}
                                    >
                                        <EditIcon width={22} height={22} />
                                    </div>
                                )}
                                {!isTeacherDashboardTable && (
                                    <div
                                        className="bg-red-100 rounded-md p-1 cursor-pointer"
                                        onClick={() =>
                                            handleDeleteStudents(index)
                                        }
                                    >
                                        <Trash
                                            color="#D34645"
                                            width={18}
                                            height={18}
                                        />
                                    </div>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {isShowStudentModal && (
                <div className="fixed right-0 top-0 z-50 w-[100%] lg:w-[40%] md:w-[60%] lg:max-w-[400px] xl:max-w-[400px] 2xl:max-w-[400px]">
                    <ClassroomModal onClose={handleCloseStudentModal} />
                </div>
            )}
        </section>
    );
}
export default StudentsInfoTable;
