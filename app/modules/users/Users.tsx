/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { Plus } from 'lucide-react';
import React, { useEffect, useState, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import Filters from '@/app/components/common/Filters';
import AddUserModal from '@/app/modules/users/AddUserModal';
import { getAllSchoolsAPI } from '@/app/api/school';
import UsersTable from './UsersTable';
import Tabs from '@/app/components/common/test-performance/Tabs';
import Pagintaion from '@/app/components/common/Pagintaion';
import { User } from '@/app/(home)/admin/users/page';

const filterOptions = [
    { value: 'All', label: 'All' },
    { value: 'Newest', label: 'Newest' },
    { value: 'Oldest', label: 'Oldest' },
    { value: 'A-Z', label: 'A-Z' },
    { value: 'Z-A', label: 'Z-A' },
];

interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalUsers: number;
    limit: number;
}

function Users({
    users,
    loggedInUserId,
    pagination,
    onPageChange,
    onRoleChange,
    activeRole,
    onUserDeleted,
}: {
    users: User[];
    loggedInUserId: string;
    pagination?: PaginationInfo;
    onPageChange?: (page: number) => void;
    onRoleChange?: (role: 'admin' | 'teacher') => void;
    activeRole?: 'admin' | 'teacher';
    onUserDeleted?: () => void;
}) {
    const [showAddUserModal, setShowProfileModal] = useState(false);
    const [school, setSchool] = useState('');
    const [schoolList, setSchoolList] = useState<
        { id: string; label: string; value: string }[]
    >([]);
    const { data } = useSession();
    const [activeTab, setActiveTab] = useState(activeRole || 'admin');
    const [sortOrder, setSortOrder] = useState('');

    const handleOpenAddUserModal = () => {
        setShowProfileModal(true);
    };

    const handleCloseAddUserModal = () => {
        setShowProfileModal(false);
    };

    const handleFilterUpdate = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSortOrder(event.target.value);
    };

    const handleTabChange = (tab: string) => {
        if (tab === 'admin' || tab === 'teacher') {
            setActiveTab(tab);
            if (onRoleChange) {
                onRoleChange(tab);
            }
        }
    };

    // Sync activeTab with activeRole prop
    useEffect(() => {
        if (activeRole) {
            setActiveTab(activeRole);
        }
    }, [activeRole]);

    // Filter users by role and exclude logged in admin
    // Note: We DON'T filter by role here because backend already does it
    const filteredUsers = useMemo(() => {
        // Only exclude logged in user if needed
        const filtered = users.filter((user) => user.id !== loggedInUserId);

        // Sort users based on sortOrder
        if (sortOrder === 'Newest') {
            filtered.sort(
                (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
            );
        } else if (sortOrder === 'Oldest') {
            filtered.sort(
                (a, b) =>
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
            );
        } else if (sortOrder === 'A-Z') {
            filtered.sort((a, b) =>
                `${a.firstName} ${a.lastName}`.localeCompare(
                    `${b.firstName} ${b.lastName}`
                )
            );
        } else if (sortOrder === 'Z-A') {
            filtered.sort((a, b) =>
                `${b.firstName} ${b.lastName}`.localeCompare(
                    `${a.firstName} ${a.lastName}`
                )
            );
        }

        return filtered;
    }, [users, loggedInUserId, sortOrder]);

    // Transform users to match UsersTable interface
    const transformedUsers = useMemo(
        () =>
            filteredUsers.map((user) => ({
                id: user.id,
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                role: user.role,
            })),
        [filteredUsers]
    );

    useEffect(() => {
        const accessToken = data?.user.accessToken || '';
        getAllSchoolsAPI(accessToken).then((response) => {
            if (response.data.status === 'success') {
                const newSchoolList = response?.data?.data?.map(
                    (school: { name: string; id: string }) => ({
                        id: school.id,
                        label: school.name,
                        value: school.name,
                    })
                );
                setSchoolList(newSchoolList);
                if (newSchoolList.length > 0) {
                    setSchool(newSchoolList[0].value);
                }
            }
        });
    }, [data?.user?.accessToken]);
    return (
        <>
            <div className="rounded-lg border mt-5 py-3 md:px-1 lg:px-6 mobile:px-3">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex-grow">
                        <Filters
                            text="Users"
                            isHideSecondBtn
                            options={filterOptions}
                            handleFilterUpdate={handleFilterUpdate}
                        />
                    </div>
                    <div
                        className="cursor-pointer text-white bg-primary-color font-semibold p-3 border rounded-lg flex justify-between items-center mobile:mt-9 hover:bg-orange-400"
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
                <div className="mb-4">
                    <Tabs
                        activeTab={activeTab}
                        setActiveTabLocal={handleTabChange}
                        tabOptions={['admin', 'teacher']}
                    />
                </div>
                <UsersTable users={transformedUsers} onUserDeleted={onUserDeleted} />
            </div>
            {pagination && onPageChange && pagination.totalPages > 1 && (
                <div className="flex items-center w-full justify-center mt-5">
                    <Pagintaion
                        currentPage={pagination.currentPage}
                        totalPages={pagination.totalPages}
                        onPageChange={onPageChange}
                    />
                </div>
            )}
            {showAddUserModal && (
                <div className="fixed right-0 top-0 z-50 md:w-[60%] lg:w-[30%] w-full">
                    <AddUserModal
                        onClose={handleCloseAddUserModal}
                        school={school}
                        setSchool={setSchool}
                        schoolList={schoolList}
                    />
                </div>
            )}
        </>
    );
}

export default Users;
