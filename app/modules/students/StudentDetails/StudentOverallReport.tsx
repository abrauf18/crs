import React from 'react';
import Image from 'next/image';
import Filters from '@/app/components/common/Filters';
import graphImage from '@/app/assets/images/graph.png';
import StudentsRecordTable from '../StudentsRecordTable';

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

function StudentOverallReport({
    studentRecord,
}: {
    studentRecord: SummarizedStandardResult[];
}) {
    return (
        // student overall performance and student report
        <div className="mt-8 font-semibold text-xl flex flex-col lg:flex-row">
            <div className="w-full lg:w-[50%] lg:mr-8 ">
                <Filters
                    text="Overall Performance"
                    textColor="text-black"
                    isHideFirstBtn
                    isHideSecondBtn
                />
                <div className="mt-5">
                    <Image
                        src={graphImage}
                        alt="Graph"
                        width={521}
                        height={200}
                        className="w-full"
                    />
                </div>
            </div>
            <div className="w-full lg:w-[50%]">
                <div className=" flex flex-col md:flex-row justify-between mt-10 md:mt-3 items-center md:items-start">
                    <h1>Student Report</h1>
                </div>
                <div className="rounded-lg border mt-5 py-3 md:px-6 mobile:px-3">
                    <StudentsRecordTable students={studentRecord} />
                </div>
            </div>
        </div>
    );
}

export default StudentOverallReport;
