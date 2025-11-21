import React from 'react';
import UsersClient from './UsersClient';

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

export default function UsersPage() {
    return <UsersClient />;
}
