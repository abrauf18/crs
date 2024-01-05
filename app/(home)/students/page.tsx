import React from 'react';
import Filters from '@/app/components/common/Filters';
import { User } from 'lucide-react';
import Searchbar from '@/app/components/common/Searchbar';
import Pagintaion from '@/app/components/common/Pagintaion';
import { Button } from '@/app/components/ui/button';
import StudentsTable, {
    Student,
} from '@/app/modules/students/studentsStatsTable';
import StudentsInfoTable, {
    StudentInfo,
} from '@/app/modules/students/StudentsInfoTable';

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
];
function StudentPage() {
    return (
        <section>
            <Searchbar
                headerText="All Students"
                Icon={User}
                tagline="Here’s all Students"
            />

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
                <StudentsInfoTable students={Studentinfo} />
            </div>
        </section>
    );
}

export default StudentPage;
