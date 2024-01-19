import React from 'react';
import { Metadata } from 'next';
import SchoolDashboard from '@/app/modules/school-dashboard/Dashboard';

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Here’s a Quick Overview',
};

function DashboardPage() {
    return <SchoolDashboard />;
}

export default DashboardPage;
