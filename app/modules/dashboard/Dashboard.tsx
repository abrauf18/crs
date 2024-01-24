'use client';

import React from 'react';
import Image from 'next/image';
import SlideShowIcon from '@/app/assets/icons/SlideShowIcon';
import DataIcon from '@/app/assets/icons/DataIcon';
import UserIcon from '@/app/assets/icons/UserIcon';
import ResourceIcon from '@/app/assets/icons/ResourceIcon';
import WavingHandIcon from '@/app/assets/icons/WavingHand';
import graph from '@/app/assets/images/graph.svg';
import { usersData } from '@/app/modules/users/Users';
import { ResourcesData } from '@/app/modules/resources/Resources';
import UsersTable from '../users/UsersTable';
import ResourcesTable from '../resources/ResourcesTable';
import Filters from '../../components/common/Filters';
import Card from '../../components/common/Card';
import Searchbar from '../../components/common/Searchbar';
import StudentsInfoTable from '../students/StudentsInfoTable';
import { Studentinfo } from '../students/students';

import LearningPlanTable, { LearningInterface } from './LearningPlanTable';

export const learningPlans: LearningInterface[] = [
    {
        id: 1,
        name: 'XYZ Resources',
        grade: '5th grade',
        topic: 'Topic xyz',
    },
    {
        id: 2,
        name: 'XYZ Resources',
        grade: '5th grade',
        topic: 'Topic 2',
    },
    {
        id: 3,
        name: 'XYZ Resources',
        grade: '6th Grade',
        topic: 'Topic 2',
    },
    {
        id: 4,
        name: 'XYZ Resources',
        grade: '6th Grade',
        topic: 'Topic 2',
    },
    {
        id: 5,
        name: 'XYZ Resources',
        grade: '10th Grade',
        topic: 'Topic 3',
    },
    {
        id: 6,
        name: 'XYZ Resources',
        grade: '2nd Grade',
        topic: 'Topic 3',
    },
    {
        id: 7,
        name: 'XYZ Resources',
        grade: '2nd Grade',
        topic: 'Topic 3',
    },
    {
        id: 8,
        name: 'XYZ Resources',
        grade: '2nd Grade',
        topic: 'Topic 3',
    },
];

function Dashboard({ isTeacher }: { isTeacher?: boolean }) {
    return (
        <section className="flex flex-col w-full scroll-smooth mobile:mt-2">
            <Searchbar
                headerText="Hello John Doe!"
                tagline="Here’s a Quick Overview"
                Icon={WavingHandIcon}
            />
            <div
                className={`grid grid-col-1 sm:grid-cols-2  gap-4 mt-4 mobile:place-items-center mb-4 ${
                    isTeacher ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
                }`}
            >
                {!isTeacher ? (
                    <>
                        <Card
                            Icon={UserIcon}
                            cardText="Total User’s"
                            count="20K"
                            currentPath="/admin/users"
                        />
                        <Card
                            Icon={SlideShowIcon}
                            cardText="Video Uploads"
                            count={200}
                            currentPath="/admin/video"
                        />
                        <Card
                            Icon={ResourceIcon}
                            cardText="Total Resources"
                            count={150}
                            currentPath="/admin/resources"
                        />
                        <Card
                            Icon={DataIcon}
                            cardText="Data Insights"
                            count="70%"
                            currentPath="#"
                        />
                    </>
                ) : (
                    <>
                        <Card
                            Icon={UserIcon}
                            cardText="Total Students"
                            count="20K"
                            currentPath="/teacher/students"
                        />
                        <Card
                            Icon={SlideShowIcon}
                            cardText="Your Assigned Classroom"
                            count={200}
                            currentPath="/teacher/classroom"
                        />

                        <Card
                            Icon={DataIcon}
                            cardText="Overall Performance"
                            count="70%"
                            currentPath="#"
                        />
                    </>
                )}
            </div>
            <Filters text="Overall Performance" btnFontSize="text-xs" />
            <div className="w-auto ">
                <Image src={graph as string} alt="icon" className="w-full" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-4 mobile:gap-8 mt-5">
                {!isTeacher ? (
                    <div className="border rounded-lg p-4 px-6">
                        <h1 className="text-[20px] font-semibold mb-2">
                            User’s
                        </h1>
                        <UsersTable
                            users={usersData}
                            fontSize="12"
                            isDashboard
                        />
                    </div>
                ) : (
                    <div className="border rounded-lg p-4 px-6">
                        <h1 className="text-[20px] font-semibold mb-2">
                            All Student’s
                        </h1>
                        <StudentsInfoTable
                            students={Studentinfo}
                            isTeacherDashboardTable
                            fontSize="12"
                        />
                    </div>
                )}

                {!isTeacher ? (
                    <div className="border rounded-lg p-4 px-6">
                        <h1 className="text-[20px] font-semibold mb-2">
                            Resources
                        </h1>
                        <ResourcesTable
                            resources={ResourcesData}
                            fontSize="12"
                        />
                    </div>
                ) : (
                    <div className="border rounded-lg p-4 px-6">
                        <h1 className="text-[20px] font-semibold mb-2">
                            Learning Plan
                        </h1>
                        <LearningPlanTable
                            learnings={learningPlans}
                            fontSize="12"
                        />
                    </div>
                )}
            </div>
        </section>
    );
}

export default Dashboard;
