import React from 'react';
import { StudentRecordInterface } from '../StudentsRecordTable';
import StudentProfile from './StudentProfile';
import StudentOverallReport from './StudentOverallReport';

export const studentRecord: StudentRecordInterface[] = [
    {
        id: 1,
        testName: 'Computer',
        result: '10',
        score: '10th',
    },
    {
        id: 1,
        testName: 'Computer',
        result: '10',
        score: '10th',
    },
    {
        id: 1,
        testName: 'Computer',
        result: '10',
        score: '10th',
    },
    {
        id: 1,
        testName: 'Computer',
        result: '10',
        score: '10th',
    },
    {
        id: 1,
        testName: 'Computer',
        result: '10',
        score: '10th',
    },
    {
        id: 1,
        testName: 'Computer',
        result: '10',
        score: '10th',
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
