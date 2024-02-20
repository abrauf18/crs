'use client';

import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import userImage from '@/app/assets/images/UserImage.svg';
import Filters from '@/app/components/common/Filters';
import Pagintaion from '@/app/components/common/Pagintaion';
import AddUserModal from '@/app/modules/users/AddUserModal';
import UsersTable, { User } from './UsersTable';

export const usersData: User[] = [
    {
        id: 1,
        imageUrl: userImage as string,
        name: 'John',
        email: 'john.doe@example.com',
        role: 'Admin',
    },
    {
        id: 2,
        imageUrl: userImage as string,
        name: 'Jane',
        email: 'jane@example.com',
        role: 'User',
    },
    {
        id: 3,
        imageUrl: userImage as string,
        name: 'Bob',
        email: 'bob@example.com',
        role: 'Moderator',
    },
    {
        id: 4,
        imageUrl: userImage as string,
        name: 'Alice',
        email: 'alice@example.com',
        role: 'User',
    },
    {
        id: 5,
        imageUrl: userImage as string,
        name: 'Charlie',
        email: 'charlie@example.com',
        role: 'Admin',
    },
];
function Users() {
    const [showAddUserModal, setShowProfileModal] = useState(false);
    const handleOpenAddUserModal = () => {
        setShowProfileModal(true);
    };

    const handleCloseAddUserModal = () => {
        setShowProfileModal(false);
    };
    return (
        <>
            <div className="rounded-lg border mt-5 py-3 md:px-1 lg:px-6 mobile:px-3">
                <div className="flex justify-between items-center">
                    <div className="flex-grow">
                        <Filters text="Users" isHideSecondBtn />
                    </div>
                    <div
                        className="cursor-pointer text-white bg-primary-color font-semibold px-3 py-2 border rounded-lg flex justify-between items-center"
                        onClick={handleOpenAddUserModal}
                    >
                        <Plus size={20} />
                        <button
                            type="button"
                            className="ml-2 text-sm font-medium"
                        >
                            Add User
                        </button>
                    </div>
                </div>
                <UsersTable users={usersData} />
            </div>
            <div className="flex items-center w-full justify-center mt-5">
                <Pagintaion />
            </div>
            {/* <div className="fixed right-0 top-0 z-50 bg-white shadow-md p-4 md:p-10 md:h-screen h-auto">
                <div className="fixed right-5 top-8 p-2 border rounded-full">
                    <X size={15} />
                </div>
                <Profile />
            </div> */}
            {showAddUserModal && (
                <div className="fixed right-0 top-0 z-50 md:w-[60%] lg:w-[30%] w-full">
                    <AddUserModal onClose={handleCloseAddUserModal} />
                </div>
            )}
        </>
    );
}

export default Users;
