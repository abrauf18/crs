import React from 'react';
import Filters from '@/app/components/common/Filters';
import { User, ArrowLeft, ChevronDown } from 'lucide-react';
import Searchbar from '@/app/components/common/Searchbar';
import { Button } from '@/app/components/ui/button';
import Image from 'next/image';
import graphImage from '@/app/assets/images/Graph.png';
import StudentsRecordTable, {
    StudentRecordInterface,
} from '@/app/modules/students/StudentsRecordTable';

function StudentOverallReport({
    studentRecord,
}: {
    studentRecord: StudentRecordInterface[];
}) {
    return (
        // student overall performance and student report
        <div className="mt-8 font-semibold text-xl flex flex-col lg:flex-row">
            <div className="w-full lg:w-[50%] lg:mr-8 ">
                <Filters text="Overall Performance" />
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
            {/* Student Report */}
            <div className="w-full lg:w-[50%]">
                <div className=" flex flex-col md:flex-row justify-between mt-10 md:mt-3 items-center md:items-start">
                    <h1>Student Report</h1>
                    <div className="px-4 py-2 mt-2 md:mt-0 border text-sm text-dark-gray rounded-lg flex items-center justify-between h-fit w-fit">
                        <button className="mr-2" type="button">
                            Last Month
                        </button>
                        <ChevronDown width={15} height={15} />
                    </div>
                </div>
                <div className="rounded-lg border mt-5 py-3 md:px-6 mobile:px-3">
                    <StudentsRecordTable students={studentRecord} />
                </div>
            </div>
        </div>
    );
}

export default StudentOverallReport;
