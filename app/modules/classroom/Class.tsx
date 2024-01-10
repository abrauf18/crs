import StudentIcon from '@/app/assets/icons/StudentIcon';
import Pagintaion from '@/app/components/common/Pagintaion';
import Card from '@/app/modules/classroom/Card';
import ClassroomModal from '@/app/modules/classroom/ClassroomModal';
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
function Class() {
    return (
        <div>
            <div className="grid  lg:grid-cols-3 gap-4 mt-4 ">
                <Card
                    Icon={StudentIcon}
                    periods="10th Period"
                    students="40 Students"
                    iconColor="#54C3F4"
                    iconBg="bg-sky-100"
                    hoverColor="bg-sky-50"
                />

                <Card
                    Icon={StudentIcon}
                    periods="9th Period"
                    students="40 Students"
                    iconColor="#7AA43E"
                    iconBg="bg-green-100"
                    hoverColor="bg-green-50"
                />
                <Card
                    Icon={StudentIcon}
                    periods="8th Period"
                    students="40 Students"
                    iconColor="#A03ADB"
                    iconBg="bg-purple-100"
                    hoverColor="bg-purple-50"
                />
            </div>
            <div className="grid  lg:grid-cols-4 gap-4 mt-4">
                <Card
                    Icon={StudentIcon}
                    periods="7th Period"
                    students="40 Students"
                    iconColor="#A03ADB"
                    iconBg="bg-purple-100"
                    hoverColor="bg-purple-50"
                />
                <Card
                    Icon={StudentIcon}
                    periods="6th Period"
                    students="40 Students"
                    iconColor="#F59A3B"
                    iconBg="bg-yellow-200"
                    hoverColor="bg-yellow-50"
                />
                <Card
                    Icon={StudentIcon}
                    periods="5th Period"
                    students="40 Students"
                    iconColor="#E6500D"
                    iconBg="bg-pink-100"
                    hoverColor="bg-pink-50"
                />
                <Card
                    Icon={StudentIcon}
                    periods="4th Period"
                    students="40 Students"
                    iconColor="#54C3F4"
                    iconBg="bg-sky-100"
                    hoverColor="bg-sky-50"
                />
            </div>

            <div className="border rounded-lg p-5 mt-5">
                <h1 className="text-[20px] font-semibold">6th Class</h1>
                <StudentsInfoTable students={Studentinfo} />
            </div>
            <div className="flex items-center w-full justify-center mt-5">
                <Pagintaion />
            </div>

            {/* <div className="absolute right-0 top-0 z-50 w-[95%] lg:w-[25%] ">
                <ClassroomModal />
            </div> */}
        </div>
    );
}

export default Class;
