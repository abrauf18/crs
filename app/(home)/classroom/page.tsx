import StudentIcon from '@/app/assets/icons/StudentIcon';
import Pagintaion from '@/app/components/common/Pagintaion';
import Card from '@/app/modules/classroom/Card';
import StudentsInfoTable, {
    StudentInfo,
} from '@/app/modules/classroom/ClassroomTable';
import { VideoIcon } from 'lucide-react';
import React from 'react';

export const Studentinfo: StudentInfo[] = [
    {
        id: 1,
        name: 'Ali',
        email: 'abcdef@gmail.com',

        performance: '43%',
        image: '/app/assets/images/Avtar.jpg',
    },
    {
        id: 1,
        name: 'Ali',
        email: 'abcdef@gmail.com',
        performance: '43%',
        image: '/app/assets/images/Avtar.jpg',
    },
    {
        id: 1,
        name: 'Ali',
        email: 'abcdef@gmail.com',
        performance: '43%',
        image: '/app/assets/images/Avtar.jpg',
    },
    {
        id: 1,
        name: 'Ali',
        email: 'abcdef@gmail.com',
        performance: '43%',
        image: '/app/assets/images/Avtar.jpg',
    },
    {
        id: 1,
        name: 'Ali',
        email: 'abcdef@gmail.com',
        performance: '43%',
        image: '/app/assets/images/Avtar.jpg',
    },
    {
        id: 1,
        name: 'Ali',
        email: 'abcdef@gmail.com',
        performance: '43%',
        image: '/app/assets/images/Avtar.jpg',
    },
    {
        id: 1,
        name: 'Ali',
        email: 'abcdef@gmail.com',

        performance: '43%',
        image: '/app/assets/images/Avtar.jpg',
    },
    {
        id: 1,
        name: 'Ali',
        email: 'abcdef@gmail.com',

        performance: '43%',
        image: '/app/assets/images/Avtar.jpg',
    },
    {
        id: 1,
        name: 'Ali',
        email: 'abcdef@gmail.com',
        performance: '43%',
        image: '/app/assets/images/Avtar.jpg',
    },
];
function page() {
    return (
        <div>
            <div className="grid  lg:grid-cols-3 gap-4 mt-4 ">
                <Card
                    Icon={StudentIcon}
                    periods="10th Period"
                    students="40 Students"
                    iconColor="#54C3F4"
                    iconBg="bg-sky-100"
                />

                <Card
                    Icon={StudentIcon}
                    periods="10th Period"
                    students="40 Students"
                    iconColor="#7AA43E"
                    iconBg="bg-green-100"
                />
                <Card
                    Icon={StudentIcon}
                    periods="10th Period"
                    students="40 Students"
                    iconColor="#A03ADB"
                    iconBg="bg-purple-100"
                />
            </div>
            <div className="grid  lg:grid-cols-4 gap-4 mt-4">
                <Card
                    Icon={StudentIcon}
                    periods="10th Period"
                    students="40 Students"
                    iconColor="#A03ADB"
                    iconBg="bg-purple-100"
                />
                <Card
                    Icon={StudentIcon}
                    periods="10th Period"
                    students="40 Students"
                    iconColor="#F59A3B"
                    iconBg="bg-yellow-200"
                />
                <Card
                    Icon={StudentIcon}
                    periods="10th Period"
                    students="40 Students"
                    iconColor="#E6500D"
                    iconBg="bg-pink-100"
                />
                <Card
                    Icon={StudentIcon}
                    periods="10th Period"
                    students="40 Students"
                    iconColor="#54C3F4"
                    iconBg="bg-sky-100"
                />
            </div>

            <div className="border rounded-lg p-5 mt-5">
                <h1 className="text-[20px] font-semibold">6th Class</h1>
                <StudentsInfoTable students={Studentinfo} />
            </div>
            <div className="flex items-center w-full justify-center mt-5">
                <Pagintaion />
            </div>
        </div>
    );
}

export default page;
