'use client';

import React, { useState } from 'react';
import EditIcon from '@/app/assets/icons/EditIcon';
import { Eye, Trash, X } from 'lucide-react';
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
import Profile from '../setting/Profile';
import ProfileModal from './ProfileModal';

export interface User {
    id: number;
    imageUrl?: string | StaticImport;
    name: string;
    email: string;
    role: string;
}

interface UsersProp {
    users: User[];
    fontSize?: string;
    isDashboard?: boolean;
}

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '400', '700'],
});

function UsersTable({ users, fontSize, isDashboard }: UsersProp): JSX.Element {
    const [isShowProfileModal, setIsShowProfileModal] = useState(false);
    const handleOpenProfileModal = () => {
        setIsShowProfileModal(true);
    };

    const handleCloseProfileModal = () => {
        setIsShowProfileModal(false);
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
                        <TableHead className="w-[100px] text-dark-gray font-bold">
                            SNO.
                        </TableHead>
                        <TableHead className="w-[300px] text-dark-gray font-bold">
                            NAME
                        </TableHead>
                        <TableHead className="text-dark-gray font-bold">
                            Email
                        </TableHead>
                        <TableHead className="text-dark-gray font-bold">
                            Role
                        </TableHead>
                        <TableHead className=" text-dark-gray font-bold">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user, index) => (
                        <TableRow className="border-none" key={user.id}>
                            <TableCell className="font-medium">
                                <span className="bg-light-gray px-[7px] py-[4px] rounded-md">
                                    {index + 1}
                                </span>
                            </TableCell>
                            <TableCell className="">
                                <span className="rounded flex gap-x-2 items-center">
                                    <Image
                                        src={Avatar}
                                        alt="crs logo"
                                        style={{
                                            width: '25px',
                                            height: '25px',
                                            objectFit: 'fill',
                                        }}
                                    />
                                    <span>{user.name}</span>
                                </span>
                            </TableCell>
                            <TableCell className="text-dark-gray">
                                {user.email}
                            </TableCell>
                            <TableCell className="text-dark-gray">
                                {user.role}
                            </TableCell>
                            <TableCell className="flex  items-center p-0 ml-2 mt-3 ">
                                {isDashboard ? (
                                    <div className="mr-2 rounded-md flex justify-center w-full h-fulls">
                                        <Eye
                                            color="#F59A3B"
                                            width={18}
                                            height={18}
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <div
                                            className="mr-2 rounded-md cursor-pointer"
                                            onClick={handleOpenProfileModal}
                                        >
                                            <EditIcon width={28} height={28} />
                                        </div>
                                        <div className="bg-red-100 rounded-md p-1">
                                            <Trash
                                                color="#D34645"
                                                width={18}
                                                height={18}
                                            />
                                        </div>
                                    </>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {isShowProfileModal && (
                <div className="absolute right-0 top-0 z-50 lg:w-[30%] w-full">
                    <ProfileModal onClose={handleCloseProfileModal} />
                </div>
            )}
        </section>
    );
}

export default UsersTable;
