import { Metadata } from 'next';
import React from 'react';
import Students from '@/app/modules/students/students';

export const metadata: Metadata = {
    title: 'Students',
    description: 'Here’s all Students',
};

function StudentPage() {
    return <Students />;
}

export default StudentPage;
