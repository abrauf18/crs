import type { Metadata } from 'next';
import React from 'react';


export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Here’s a Quick Overview',
};
async function DashboardPage() {
 return <div>Dashboard Page</div>
}

export default DashboardPage;
