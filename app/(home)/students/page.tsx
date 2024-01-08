'use client';

import React, { useState } from 'react';
import Filters from '@/app/components/common/Filters';
import { User } from 'lucide-react';
import Searchbar from '@/app/components/common/Searchbar';
import { Button } from '@/app/components/ui/button';
import StudentsTable, {
    Student,
} from '@/app/modules/students/studentsStatsTable';
import StudentsInfoTable, {
    StudentInfo,
} from '@/app/modules/students/StudentsInfoTable';
import TabBar from '@/app/modules/students/TabBar';
import AddStudentModal from '@/app/modules/students/AddStudentModal';

export const StudentsData: Student[] = [
    {
        id: 1,
        name: 'School',
        first: 20.4,
        firstNum: 20,
        second: 10.2,
        secondNum: 10,
        third: 30.26,
        thirdNum: 40,
        forth: 20.19,
        forthNum: 30,
        fifth: 10.92,
        fifthNum: 30,
    },
    {
        id: 1,
        name: 'School',
        first: 20.4,
        firstNum: 20,
        second: 10.2,
        secondNum: 10,
        third: 30.26,
        thirdNum: 40,
        forth: 20.19,
        forthNum: 30,
        fifth: 10.92,
        fifthNum: 30,
    },
    {
        id: 1,
        name: 'School',
        first: 20.4,
        firstNum: 20,
        second: 10.2,
        secondNum: 10,
        third: 30.26,
        thirdNum: 40,
        forth: 20.19,
        forthNum: 30,
        fifth: 10.92,
        fifthNum: 30,
    },
    {
        id: 1,
        name: 'School',
        first: 20.4,
        firstNum: 20,
        second: 10.2,
        secondNum: 10,
        third: 30.26,
        thirdNum: 40,
        forth: 20.19,
        forthNum: 30,
        fifth: 10.92,
        fifthNum: 30,
    },
    {
        id: 1,
        name: 'School',
        first: 20.4,
        firstNum: 20,
        second: 10.2,
        secondNum: 10,
        third: 30.26,
        thirdNum: 40,
        forth: 20.19,
        forthNum: 30,
        fifth: 10.92,
        fifthNum: 30,
    },
];

export const Studentinfo: StudentInfo[] = [
    {
        id: 1,
        name: 'Ali',
        email: 'abcdef@gmail.com',
        grade: '7th',
        performance: '43%',
        image: '/app/assets/images/Avtar.jpg',
    },
    {
        id: 1,
        name: 'Ali',
        email: 'abcdef@gmail.com',
        grade: '6th',
        performance: '43%',
        image: '/app/assets/images/Avtar.jpg',
    },
    {
        id: 1,
        name: 'Ali',
        email: 'abcdef@gmail.com',
        grade: '9th',
        performance: '43%',
        image: '/app/assets/images/Avtar.jpg',
    },
    {
        id: 1,
        name: 'Ali',
        email: 'abcdef@gmail.com',
        grade: '9th',
        performance: '43%',
        image: '/app/assets/images/Avtar.jpg',
    },
    {
        id: 1,
        name: 'Ali',
        email: 'abcdef@gmail.com',
        grade: '8th',
        performance: '43%',
        image: '/app/assets/images/Avtar.jpg',
    },
    {
        id: 1,
        name: 'Ali',
        email: 'abcdef@gmail.com',
        grade: '8th',
        performance: '43%',
        image: '/app/assets/images/Avtar.jpg',
    },
    {
        id: 1,
        name: 'Ali',
        email: 'abcdef@gmail.com',
        grade: '10th',
        performance: '43%',
        image: '/app/assets/images/Avtar.jpg',
    },
    {
        id: 1,
        name: 'Ali',
        email: 'abcdef@gmail.com',
        grade: '10th',
        performance: '43%',
        image: '/app/assets/images/Avtar.jpg',
    },
    {
        id: 1,
        name: 'Ali',
        email: 'abcdef@gmail.com',
        grade: '8th',
        performance: '43%',
        image: '/app/assets/images/Avtar.jpg',
    },
];
function StudentPage() {
    const [selectedTab, setSelectedTab] = useState('all');
    const onSelectFilter = (tab: string) => {
        setSelectedTab(tab);
    };

    const filteredStudents = Studentinfo.filter((student) => {
        if (selectedTab === 'all') {
            return true; // Show all students
        }
        // return student.grade.toLowerCase().includes(selectedTab);
        console.log(student.grade);
        console.log(selectedTab.toLowerCase());
        return student.grade.includes(selectedTab?.split(' ')[0]);
    });
    const gradeOptions = [
        'All',
        '10th grade',
        '9th grade',
        '8th grade',
        '7th grade',
        '6th grade',
    ];
    return (
        <section>
            <Searchbar
                headerText="All Students"
                Icon={User}
                tagline="Here’s all Students"
            />

            <div className="my-6 w-full border py-2 px-4 rounded-lg ">
                <TabBar
                    options={gradeOptions}
                    onSelectFilter={onSelectFilter}
                />
            </div>

            <div className="flex justify-between mt-5">
                <h1 className="font-bold text-lg">All Students</h1>

                <Button
                    className="bg-primary-color mobile:px-3 hover:bg-orange-400"
                    variant="default"
                    size="default"
                >
                    Add Student
                </Button>
            </div>
            <div className="rounded-lg border mt-5 py-3 md:px-6 mobile:px-3">
                <StudentsTable students={StudentsData} />
            </div>
            <div className="rounded-lg border mt-5 py-3 md:px-6 mobile:px-3">
                <StudentsInfoTable students={filteredStudents} />
            </div>

            <div className="absolute right-0 top-0 z-50 ">
                <AddStudentModal />
            </div>
        </section>
    );
}

export default StudentPage;
