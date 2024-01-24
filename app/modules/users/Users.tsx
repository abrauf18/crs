import React from 'react';
import { X } from 'lucide-react';
import userImage from '@/app/assets/images/UserImage.svg';
import Filters from '@/app/components/common/Filters';
import Pagintaion from '@/app/components/common/Pagintaion';
import Profile from '@/app/modules/setting/Profile';
import UsersTable, { User } from './UsersTable';
import ProfileModal from './ProfileModal';

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
    return (
        <>
            <div className="rounded-lg border mt-5 py-3 md:px-1 lg:px-6 mobile:px-3">
                <Filters text="Users" btnFontSize="text-xs" />
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
        </>
    );
}

export default Users;
