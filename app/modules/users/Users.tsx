'use client';

import { Plus } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import userImage from '@/app/assets/images/UserImage.svg';
import Filters from '@/app/components/common/Filters';
import Pagintaion from '@/app/components/common/Pagintaion';
import AddUserModal from '@/app/modules/users/AddUserModal';
import UsersTable, { User } from './UsersTable';

// remove after all users are fetched from the API in every dummy Users component in the app
export const usersData: User[] = [
    {
        id: '1',
        image: userImage as string,
        name: 'John',
        email: 'john.doe@example.com',
        role: 'Admin',
    },
    {
        id: '2',
        image: userImage as string,
        name: 'Jane',
        email: 'jane@example.com',
        role: 'User',
    },
    {
        id: '3',
        image: userImage as string,
        name: 'Bob',
        email: 'bob@example.com',
        role: 'Moderator',
    },
    {
        id: '4',
        image: userImage as string,
        name: 'Alice',
        email: 'alice@example.com',
        role: 'User',
    },
    {
        id: '5',
        image: userImage as string,
        name: 'Charlie',
        email: 'charlie@example.com',
        role: 'Admin',
    },
];
function Users({
    APIdata,
}: {
    APIdata: { users: User[]; totalUsers: number; totalPages: number };
}) {
    const router = useRouter();
    const pathname = usePathname();
    const urlSearchParams = useSearchParams();
    const page = urlSearchParams.get('page') || 1;
    const [showAddUserModal, setShowProfileModal] = useState(false);

    const handleOpenAddUserModal = () => {
        setShowProfileModal(true);
    };

    const handleCloseAddUserModal = () => {
        setShowProfileModal(false);
    };

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(urlSearchParams.toString());
            params.set(name, value);
            return params.toString();
        },
        [urlSearchParams]
    );

    const handlePageChange = (page: number) => {
        router.push(`${pathname}?${createQueryString('page', `${page}`)}`);
    };

    const handleFilterUpdate = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        switch (event.target.value) {
            case 'Newest-First':
                // Handle the "Newest First" option
                router.push(`?page=${page}&orderBy=createdAt&sortBy=desc`);
                break;
            case 'Oldest-First':
                // Handle the "Oldest First" option
                router.push(`?page=${page}&orderBy=createdAt&sortBy=asc`);
                break;
            case 'Name-Alphabetical':
                // Handle the "Name: A to Z" option
                router.push(`?page=${page}&orderBy=name&sortBy=asc`);
                break;
            case 'Name-Reverse-Alphabetical':
                // Handle the "Name: Z to A" option
                router.push(`?page=${page}&orderBy=name&sortBy=desc`);
                break;
            default:
                // Handle the default case
                router.push(`?page=${page}`);
                break;
        }
    };

    return (
        <>
            <div className="rounded-lg border mt-5 py-3 md:px-1 lg:px-6 mobile:px-3">
                <div className="flex justify-between items-center">
                    <div className="flex-grow">
                        <Filters
                            text="Users"
                            isHideSecondBtn
                            options={[
                                { value: '', label: 'Filters' },
                                {
                                    value: 'Newest-First',
                                    label: 'Newest First',
                                },
                                {
                                    value: 'Oldest-First',
                                    label: 'Oldest First',
                                },
                                {
                                    value: 'Name-Alphabetical',
                                    label: 'Name: A to Z',
                                },
                                {
                                    value: 'Name-Reverse-Alphabetical',
                                    label: 'Name: Z to A',
                                },
                            ]}
                            handleFilterUpdate={handleFilterUpdate}
                        />
                    </div>
                    <div
                        className="cursor-pointer text-white bg-primary-color font-semibold px-3 py-2 border rounded-lg flex justify-between items-center mobile:mt-9"
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
                <UsersTable
                    users={APIdata?.users}
                    currentPage={Number(page) - 1}
                    limit={2}
                    handlePageChange={handlePageChange}
                />
            </div>
            <div className="flex items-center w-full justify-center mt-5">
                <Pagintaion
                    currentPage={Number(page) > 0 ? Number(page) : 1}
                    totalPages={
                        APIdata?.totalPages > 0 ? APIdata.totalPages : 1
                    }
                    onPageChange={handlePageChange}
                />
            </div>
            {showAddUserModal && (
                <div className="fixed right-0 top-0 z-50 md:w-[60%] lg:w-[30%] w-full">
                    <AddUserModal onClose={handleCloseAddUserModal} />
                </div>
            )}
        </>
    );
}

export default Users;
