/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { Search } from 'lucide-react';
import React, { useEffect, useState, useMemo } from 'react';
import Filters from '@/app/components/common/Filters';
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
    isLoading,
}: {
    users: User[];
    loggedInUserId: string;
    pagination?: PaginationInfo;
    onPageChange?: (page: number) => void;
    onRoleChange?: (role: 'admin' | 'teacher') => void;
    activeRole?: 'admin' | 'teacher';
    onUserDeleted?: () => void;
    isLoading?: boolean;
}) {
    const [activeTab, setActiveTab] = useState(activeRole || 'admin');
    const [sortOrder, setSortOrder] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleFilterUpdate = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSortOrder(event.target.value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
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
        let filtered = users.filter((user) => user.id !== loggedInUserId);

        // Apply search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter((user) => {
                const fullName =
                    `${user.firstName} ${user.lastName}`.toLowerCase();
                const email = user.email.toLowerCase();
                return fullName.includes(query) || email.includes(query);
            });
        }

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
    }, [users, loggedInUserId, sortOrder, searchQuery]);

    // Transform users to match UsersTable interface
    const transformedUsers = useMemo(
        () =>
            filteredUsers.map((user) => ({
                id: user.id,
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                role: user.role,
                profilePicture: user.profilePicture,
            })),
        [filteredUsers]
    );

    return (
        <>
            <div className="rounded-lg border mt-5 py-3 md:px-1 lg:px-6 mobile:px-3">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                    <div className="flex-grow w-full md:w-auto">
                        <Filters
                            text="Users"
                            isHideSecondBtn
                            options={filterOptions}
                            handleFilterUpdate={handleFilterUpdate}
                        />
                    </div>
                    <div className="relative w-full md:w-80">
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
                        />
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <Tabs
                        activeTab={activeTab}
                        setActiveTabLocal={handleTabChange}
                        tabOptions={['admin', 'teacher']}
                    />
                </div>
                <UsersTable
                    users={transformedUsers}
                    onUserDeleted={onUserDeleted}
                    isLoading={isLoading}
                />
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
        </>
    );
}

export default Users;
