import React from 'react';
import { Metadata } from 'next';
import Dashboard from '@/app/modules/student-dashboard/Dashboard';

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Here’s a Quick Overview',
};

function DashboardPage() {
    return <Dashboard />;
}

export default DashboardPage;
