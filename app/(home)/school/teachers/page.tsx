import { Metadata } from 'next';
import React from 'react';
import Teachers from '@/app/modules/school-teachers/Teachers';

export const metadata: Metadata = {
    title: 'Teachers',
    description: 'All Teacher in your School',
};

function TeachersPage() {
    return <Teachers />;
}

export default TeachersPage;
