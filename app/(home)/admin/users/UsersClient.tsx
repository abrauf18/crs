'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import Users from '@/app/modules/users/Users';
import { getAllUsersAction } from '@/lib/actions/users';
import UnhandledError from '@/app/modules/error/UnhandledError';
import PageLoader from '@/app/components/common/PageLoader';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    profilePicture: string;
    isEmailVerified: boolean;
    createdAt: string;
    updatedAt: string;
}

interface SessionUser {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    profilePicture: string | null;
    token: string;
}

interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalUsers: number;
    limit: number;
}

export default function UsersClient() {
    const { data, status } = useSession();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState<{
        message: string;
        name: string;
    } | null>(null);
    const [pagination, setPagination] = useState<PaginationInfo>({
        currentPage: 1,
        totalPages: 1,
        totalUsers: 0,
        limit: 10,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [activeRole, setActiveRole] = useState<'admin' | 'teacher'>('admin');
    const [isFetching, setIsFetching] = useState(false);
    const skipEffectRef = useRef(false);

    const fetchUsers = async (
        page: number = 1,
        role: 'admin' | 'teacher' = 'admin'
    ) => {
        if (!data?.user || isFetching) return;

        setIsFetching(true);
        setLoading(true);
        try {
            const sessionUser = data.user as unknown as SessionUser;
            const accessToken = sessionUser.token;

            if (!accessToken) {
                throw new Error('No access token found in session');
            }

            const response = await getAllUsersAction(accessToken, {
                page,
                limit: 10,
                role,
            });

            if (!response.success) {
                throw new Error(response.error || 'Failed to fetch users');
            }

            if (response.data.status === 'success') {
                setUsers(response.data.data.users || []);
                setPagination(response.data.data.pagination);
            }
        } catch (err: unknown) {
            let message = 'An unknown error occurred';
            let name = 'Error';

            if (err instanceof Error) {
                message = err.message;
                name = err.name;
            } else if (typeof err === 'string') {
                message = err;
            }

            setError({ message, name });
        } finally {
            setLoading(false);
            setInitialLoading(false);
            setIsFetching(false);
        }
    };

    useEffect(() => {
        if (status === 'authenticated' && data) {
            fetchUsers(currentPage, activeRole);
        }
    }, [currentPage, status, activeRole]);

    // Reset to page 1 when role changes
    const handleRoleChange = (role: 'admin' | 'teacher') => {
        setLoading(true); // Show skeleton immediately
        setActiveRole(role);
        setCurrentPage(1);
        // Immediately fetch with new role and page 1
        if (data?.user) {
            fetchUsers(1, role);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleUserDeleted = () => {
        // Refetch users after deletion
        fetchUsers(currentPage, activeRole);
    };

    // Show loading while session is being fetched OR initial data load
    if (status === 'loading' || initialLoading) {
        return <PageLoader />;
    }

    if (status === 'unauthenticated' || !data) {
        return (
            <UnhandledError
                error={{
                    message: 'Unauthorized - No session found',
                    name: 'AuthError',
                }}
            />
        );
    }

    if (error) {
        return <UnhandledError error={error} />;
    }

    const sessionUser = data.user as unknown as SessionUser;
    const loggedInUserId = sessionUser.id || '';

    return (
        <Users
            users={users}
            loggedInUserId={loggedInUserId}
            pagination={pagination}
            onPageChange={handlePageChange}
            onRoleChange={handleRoleChange}
            activeRole={activeRole}
            onUserDeleted={handleUserDeleted}
            isLoading={loading}
        />
    );
}
