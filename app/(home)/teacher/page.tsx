import { Metadata } from 'next';
import React from 'react';
import Dashboard from '@/app/modules/dashboard/Dashboard';

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Here’s a Quick Overview',
};

export default function Home() {
    return <Dashboard isTeacher />;
}
