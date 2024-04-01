'use client';

import React, { useEffect, useState } from 'react';
import { Eye, Trash, X } from 'lucide-react';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import EditIcon from '@/app/assets/icons/EditIcon';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/app/components/ui/table';
import { DEFAULT_IMAGE } from '@/lib/utils';
import ProfileModal from './ProfileModal';

export interface User {
    id: string;
    image: string;
    name: string;
    email: string;
    role: string;
}

interface UsersProp {
    users: User[];
    fontSize?: string;
    isDashboard?: boolean;
    setIsUserUpdated?: (arg0: boolean) => void;
}

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '400', '700'],
});

const DEFAULT_USER = {
    id: '',
    image: DEFAULT_IMAGE,
    name: '',
    email: '',
    role: 'student',
};

function UsersTable({
    users,
    fontSize,
    isDashboard,
    setIsUserUpdated,
}: UsersProp): JSX.Element {
    const [isShowProfileModal, setIsShowProfileModal] = useState(false);

    // remove this after delete functionality is implemented
    const [usersList, setUsersList] = useState<User[]>(users);
    useEffect(() => {
        setUsersList(users);
    }, [users]);

    const [selectedUser, setSelectedUser] = useState<User>(DEFAULT_USER);

    const handleOpenProfileModal = (user: User) => {
        setSelectedUser(user);
        setIsShowProfileModal(true);
    };

    const handleCloseProfileModal = () => {
        setIsShowProfileModal(false);
        setSelectedUser(DEFAULT_USER);
    };

    const handleDeleteStudents = (indexToRemove: number) => {
        const updatedUsersList = [...usersList];
        updatedUsersList.splice(indexToRemove, 1);
        setUsersList(updatedUsersList);
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
                        <TableHead className=" text-dark-gray font-bold">
                            Name
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
                    {/* replace userList with users after delete functionality is implemented */}
                    {Array.from(usersList).map((user, index) => (
                        <TableRow className="border-none" key={user.id}>
                            <TableCell className="font-medium">
                                <span className="bg-light-gray px-[7px] py-[4px] rounded-md">
                                    {index + 1}
                                </span>
                            </TableCell>
                            <TableCell className="">
                                <span className="rounded-full flex gap-x-2 items-center">
                                    <Image
                                        src={user?.image || DEFAULT_IMAGE}
                                        alt="crs logo"
                                        width={26}
                                        height={26}
                                        style={{
                                            width: '26px',
                                            height: '26px',
                                            objectFit: 'fill',
                                            borderRadius: '50%',
                                        }}
                                    />
                                    <span>{user.name}</span>
                                </span>
                            </TableCell>
                            <TableCell className="text-dark-gray">
                                <span className="truncate">{user.email}</span>
                            </TableCell>
                            <TableCell className="text-dark-gray">
                                {user.role}
                            </TableCell>
                            <TableCell className="flex  items-center p-0 ml-2 mt-4 ">
                                {isDashboard ? (
                                    <div
                                        className="mr-2 rounded-md flex justify-center w-full h-fulls cursor-pointer"
                                        onClick={() =>
                                            handleOpenProfileModal(user)
                                        }
                                    >
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
                                            onClick={() =>
                                                handleOpenProfileModal(user)
                                            }
                                        >
                                            <EditIcon width={28} height={28} />
                                        </div>
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
                                    </>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {isShowProfileModal && (
                <div className="fixed right-0 top-0 z-50 md:w-[60%] lg:w-[30%] w-full">
                    <ProfileModal
                        userId={selectedUser.id}
                        image={selectedUser.image}
                        name={selectedUser.name}
                        email={selectedUser.email}
                        role={selectedUser.role}
                        isViewOnly={isDashboard}
                        onClose={handleCloseProfileModal}
                        setIsUserUpdated={setIsUserUpdated}
                    />
                </div>
            )}
        </section>
    );
}

export default UsersTable;
