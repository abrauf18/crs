import React from 'react';
import StudentProfile from './StudentProfile';
import StudentOverallReport from './StudentOverallReport';

interface Data {
    student: Student;
    summarizedStandardResults: SummarizedStandardResult[];
    DailyProgress: DailyProgress[];
}

interface Student {
    name: string;
    email: string;
    image: string;
    classroomName: string;
    averageTotalWeightage: number;
    averageObtainedWeightage: number;
}

interface SummarizedStandardResult {
    standardId: string;
    standardName: string;
    totalWeightage: number;
    obtainedWeightage: number;
}

interface DailyProgress {
    id: string;
    classroomStudentId: string;
    obtainedWeightage: number;
    totalWeightage: number;
    date: string;
}

function StudentDetails({ APIdata }: { APIdata: Data }) {
    return (
        <section>
            <StudentProfile student={APIdata.student} />
            <StudentOverallReport
                studentRecord={APIdata.summarizedStandardResults}
            />
        </section>
    );
}

export default StudentDetails;
