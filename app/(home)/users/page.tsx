import React from 'react';
import userImage from '@/app/assets/images/UserImage.svg';
import UsersTable, { User } from '@/app/modules/users/UsersTable';
import Filters from '@/app/components/common/Filters';
import Header from '@/app/components/common/Header';
import UserIcon from '@/app/assets/icons/UserIcon';
import Pagintaion from '@/app/components/common/Pagintaion';

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
        email: 'jane.doe@example.com',
        role: 'User',
    },
    {
        id: 3,
        imageUrl: userImage as string,
        name: 'Bob',
        email: 'bob.smith@example.com',
        role: 'Moderator',
    },
    {
        id: 4,
        imageUrl: userImage as string,
        name: 'Alice',
        email: 'alice.johnson@example.com',
        role: 'User',
    },
    {
        id: 5,
        imageUrl: userImage as string,
        name: 'Charlie',
        email: 'charlie.brown@example.com',
        role: 'Admin',
    },
    {
        id: 6,
        imageUrl: userImage as string,
        name: 'Eva',
        email: 'eva.williams@example.com',
        role: 'Moderator',
    },
    {
        id: 7,
        imageUrl: userImage as string,
        name: 'Eva',
        email: 'eva.williams@example.com',
        role: 'Moderator',
    },
];
function UsersPage() {
    return (
        <>
            <Header
                headerText="All User’s"
                Icon={UserIcon}
                tagline="Manage Your All User’s"
            />
            <div className="rounded-lg border mt-5 py-3 md:px-6 mobile:px-3">
                <Filters text="User’s" />
                <UsersTable users={usersData} />
            </div>
            <div className="flex items-center w-full justify-center mt-5">
                <Pagintaion />
            </div>
        </>
    );
}

export default UsersPage;
