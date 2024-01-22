'use client';

import React, { useState } from 'react';
import Searchbar from '@/app/components/common/Searchbar';

import Pagintaion from '@/app/components/common/Pagintaion';
import userImage from '@/app/assets/images/UserImage.svg';
import TeachersTable, { TeacherInterface } from './TeachersTable';
import AddTeacherModal from './AddTeacherModal';

export const teachersData: TeacherInterface[] = [
    {
        id: 1,
        imageUrl: userImage as string,
        name: 'John',
        email: 'john.doe@example.com',
        assignedClasses: '3',
    },
    {
        id: 2,
        imageUrl: userImage as string,
        name: 'John',
        email: 'john.doe@example.com',
        assignedClasses: '3',
    },
    {
        id: 3,
        imageUrl: userImage as string,
        name: 'John',
        email: 'john.doe@example.com',
        assignedClasses: '3',
    },
    {
        id: 4,
        imageUrl: userImage as string,
        name: 'John',
        email: 'john.doe@example.com',
        assignedClasses: '3',
    },
    {
        id: 5,
        imageUrl: userImage as string,
        name: 'John',
        email: 'john.doe@example.com',
        assignedClasses: '3',
    },
    {
        id: 6,
        imageUrl: userImage as string,
        name: 'John',
        email: 'john.doe@example.com',
        assignedClasses: '3',
    },
    {
        id: 7,
        imageUrl: userImage as string,
        name: 'John',
        email: 'john.doe@example.com',
        assignedClasses: '3',
    },
    {
        id: 8,
        imageUrl: userImage as string,
        name: 'John',
        email: 'john.doe@example.com',
        assignedClasses: '3',
    },
];

function Teachers() {
    const [isAddTeacherModalVisible, setAddTeacherModalVisible] =
        useState(false);
    const handleAddTeacherClick = () => {
        setAddTeacherModalVisible(true);
    };

    const handleCloseModal = () => {
        setAddTeacherModalVisible(false);
    };
    return (
        <section className="px-2 lg:px-4">
            <Searchbar
                headerText="All Teachers"
                tagline="All Teacher in your School"
            />
            <div className="border rounded-lg p-5  lg:px-4 ">
                <div className="flex mobile:flex-col justify-between px-1 mb-6 mobile:items-start items-center">
                    <h1 className="text-[20px] font-semibold">All Teachers</h1>
                    <div
                        className="cursor-pointer border rounded-lg px-3 py-1 text-white bg-primary-color font-medium mobile:mt-2"
                        onClick={handleAddTeacherClick}
                    >
                        Add Teacher
                    </div>
                </div>
                <div className="mt-4">
                    <TeachersTable teachers={teachersData} fontSize="12" />
                </div>
            </div>
            <div className="flex items-center w-full justify-center mt-5">
                <Pagintaion />
            </div>
            {/* <div className="absolute right-0 top-0 z-50 w-full lg:w-[25%]">
                <AssignClassModal />
            </div> */}
            {isAddTeacherModalVisible && (
                <div className="fixed right-0 top-0 z-50 w-full lg:w-[25%]">
                    <AddTeacherModal onClose={handleCloseModal} />
                </div>
            )}
        </section>
    );
}

export default Teachers;
