import { Metadata } from 'next';
import React from 'react';
import Resources from '@/app/modules/student-resources/Resources';

export const metadata: Metadata = {
    title: 'Resources',
    description: 'Your All Resources Allocated to Topics',
};

function ResourcesPage() {
    return <Resources />;
}

export default ResourcesPage;
