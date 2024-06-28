'use client';

import React, { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import Searchbar from '@/app/components/common/Searchbar';
import { Button } from '@/app/components/ui/button';
import TabBar from '@/app/components/common/TabBar';
import StatsTable, { StatsInterface } from '@/app/components/common/StatsTable';
import { DEFAULT_IMAGE } from '@/lib/utils';
import StudentsInfoTable, { StudentInfoInterface } from './StudentsInfoTable';
import AddStudentModal from './AddStudentModal';

// export const StatsList: StatsInterface[] = [
//     {
//         id: 1,
//         name: 'School',
//         first: 20.4,
//         firstNum: 20,
//         second: 10.2,
//         secondNum: 10,
//         third: 30.26,
//         thirdNum: 40,
//         forth: 20.19,
//         forthNum: 30,
//         fifth: 10.92,
//         fifthNum: 30,
//     },
//     {
//         id: 1,
//         name: 'School',
//         first: 20.4,
//         firstNum: 20,
//         second: 10.2,
//         secondNum: 10,
//         third: 30.26,
//         thirdNum: 40,
//         forth: 20.19,
//         forthNum: 30,
//         fifth: 10.92,
//         fifthNum: 30,
//     },
//     {
//         id: 1,
//         name: 'School',
//         first: 20.4,
//         firstNum: 20,
//         second: 10.2,
//         secondNum: 10,
//         third: 30.26,
//         thirdNum: 40,
//         forth: 20.19,
//         forthNum: 30,
//         fifth: 10.92,
//         fifthNum: 30,
//     },
//     {
//         id: 1,
//         name: 'School',
//         first: 20.4,
//         firstNum: 20,
//         second: 10.2,
//         secondNum: 10,
//         third: 30.26,
//         thirdNum: 40,
//         forth: 20.19,
//         forthNum: 30,
//         fifth: 10.92,
//         fifthNum: 30,
//     },
//     {
//         id: 1,
//         name: 'School',
//         first: 20.4,
//         firstNum: 20,
//         second: 10.2,
//         secondNum: 10,
//         third: 30.26,
//         thirdNum: 40,
//         forth: 20.19,
//         forthNum: 30,
//         fifth: 10.92,
//         fifthNum: 30,
//     },
// ];

// export const Studentinfo: StudentInfoInterface[] = [
//     {
//         id: '1',
//         index: 1,
//         name: 'Ali',
//         email: 'abcdef@gmail.com',
//         grade: '7th',
//         performance: 100,
//         image: DEFAULT_IMAGE,
//         gradeId: '',
//     },
//     {
//         id: '2',
//         index: 2,
//         name: 'Ali',
//         email: 'abcdef@gmail.com',
//         grade: '7th',
//         performance: 100,
//         image: DEFAULT_IMAGE,
//         gradeId: '',
//     },
//     {
//         id: '3',
//         index: 3,
//         name: 'Ali',
//         email: 'abcdef@gmail.com',
//         grade: '7th',
//         performance: 100,
//         image: DEFAULT_IMAGE,
//         gradeId: '',
//     },
//     {
//         id: '4',
//         index: 4,
//         name: 'Ali',
//         email: 'abcdef@gmail.com',
//         grade: '7th',
//         performance: 100,
//         image: DEFAULT_IMAGE,
//         gradeId: '',
//     },
//     {
//         id: '5',
//         index: 5,
//         name: 'Ali',
//         email: 'abcdef@gmail.com',
//         grade: '7th',
//         performance: 100,
//         image: DEFAULT_IMAGE,
//         gradeId: '',
//     },
//     {
//         id: '6',
//         index: 6,
//         name: 'Ali',
//         email: 'abcdef@gmail.com',
//         grade: '7th',
//         performance: 100,
//         image: DEFAULT_IMAGE,
//         gradeId: '',
//     },
//     {
//         id: '7',
//         index: 7,
//         name: 'Ali',
//         email: 'abcdef@gmail.com',
//         grade: '7th',
//         performance: 100,
//         image: DEFAULT_IMAGE,
//         gradeId: '',
//     },
//     {
//         id: '8',
//         index: 8,
//         name: 'Ali',
//         email: 'abcdef@gmail.com',
//         grade: '7th',
//         performance: 100,
//         image: DEFAULT_IMAGE,
//         gradeId: '',
//     },
// ];
function Students({ data }: { data: any }) {
    const gradeOptions = data?.map((grade: any) => grade?.className);
    const [isAddStudentModalOpen, setAddStudentModalOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState(gradeOptions[0]);
    const onSelectFilter = (tab: string) => {
        setSelectedTab(tab);
    };

    const filterClass = data?.filter(
        (grade: any) => grade?.className.includes(selectedTab)
    );

    const filteredStudents = filterClass[0]?.studentsData;

    const studentsData = filteredStudents?.map(
        (student: any, index: number) => ({
            id: student?.userId,
            index: index + 1,
            name: student?.userName,
            email: student?.userEmail,
            grade: student?.className,
            performance: student?.totalObtainedScore,
            image: student?.image,
            gradeId: student?.classId,
        })
    );
    const StatsList = filterClass[0]?.standardList?.map((standard: any) => ({
        id: standard.standardId,
        name: standard?.standardName,
        first: standard?.studentWeightageDistribution['0-25'],
        second: standard?.studentWeightageDistribution['25-50'],
        third: standard?.studentWeightageDistribution['50-75'],
        forth: standard?.studentWeightageDistribution['75-100'],
    }));
    const handleOpenAddStudentModal = () => {
        setAddStudentModalOpen(true);
    };

    const handleCloseAddStudentModal = () => {
        setAddStudentModalOpen(false);
    };
    return (
        <section>
            <Searchbar
                headerText="All Students"
                Icon={User}
                tagline="Here’s all Students"
            />
            {data.length > 0 ? (
                <>
                    <TabBar
                        options={gradeOptions}
                        onSelectFilter={onSelectFilter}
                        initialSelectedTab={selectedTab}
                    />

                    <div className="flex justify-between mt-5">
                        <h1 className="font-bold text-dlg">All Students</h1>

                        <Button
                            className="bg-primary-color mobile:px-3 lg:hover:bg-orange-400"
                            variant="default"
                            size="default"
                            onClick={handleOpenAddStudentModal}
                        >
                            Add Student
                        </Button>
                    </div>
                    <div className="rounded-lg border mt-5 py-3 md:px-6 mobile:px-3 ">
                        <StatsTable statsList={StatsList} />
                    </div>
                    <div className="rounded-lg border mt-5 py-3 md:px-6 mobile:px-3">
                        <StudentsInfoTable students={studentsData} />
                    </div>
                    {isAddStudentModalOpen && (
                        <div className="fixed right-0 top-0 z-50 lg:w-[25%] w-full md:w-[60%]">
                            <AddStudentModal
                                onClose={handleCloseAddStudentModal}
                            />
                        </div>
                    )}
                </>
            ) : (
                <div className="flex justify-center items-center h-96">
                    <h1 className="text-2xl font-semibold">No Data Found!</h1>
                </div>
            )}
        </section>
    );
}

export default Students;
