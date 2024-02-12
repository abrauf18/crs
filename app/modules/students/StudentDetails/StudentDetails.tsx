'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Searchbar from '@/app/components/common/Searchbar';
import { StudentRecordInterface } from '../StudentsRecordTable';
import StudentProfile from './StudentProfile';
import StudentOverallReport from './StudentOverallReport';

export const studentRecord: StudentRecordInterface[] = [
    {
        id: 1,
        testName: 'Computer',
        result: '10',
        score: '10',
    },
    {
        id: 1,
        testName: 'Computer',
        result: '10',
        score: '10',
    },
    {
        id: 1,
        testName: 'Computer',
        result: '10',
        score: '10',
    },
    {
        id: 1,
        testName: 'Computer',
        result: '10',
        score: '10',
    },
    {
        id: 1,
        testName: 'Computer',
        result: '10',
        score: '10',
    },
    {
        id: 1,
        testName: 'Computer',
        result: '10',
        score: '10',
    },
];
function StudentDetails() {
    return (
        <section>
            <StudentProfile />
            <StudentOverallReport studentRecord={studentRecord} />
        </section>
    );
}

export default StudentDetails;
