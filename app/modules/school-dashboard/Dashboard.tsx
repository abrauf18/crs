'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DataIcon from '@/app/assets/icons/DataIcon';
import UserIcon from '@/app/assets/icons/UserIcon';
import WavingHandIcon from '@/app/assets/icons/WavingHand';
import schoolGraph from '@/app/assets/images/schoolGraph.svg';
import { usersData } from '@/app/modules/users/Users';
import SchoolClassroomIcon from '@/app/assets/icons/SchoolClassroomIcon';
import UsersTable from '../users/UsersTable';
import Filters from '../../components/common/Filters';
import Card from '../../components/common/Card';
import Searchbar from '../../components/common/Searchbar';
import TicketsTable, { TicketsInterface } from './RecentTicketsTable';
import SubmitTicketModal from './SubmitTicketModal';

export const tickets: TicketsInterface[] = [
    {
        id: 1,
        name: 'John',
        date: 'December 10,2023',
        status: 'Active',
    },
    {
        id: 2,
        name: 'John',
        date: 'December 10,2023',
        status: 'Inprogress',
    },
    {
        id: 3,
        name: 'John',
        date: 'December 10,2023',
        status: 'Closed',
    },
    {
        id: 4,
        name: 'John',
        date: 'December 10,2023',
        status: 'Active',
    },
    {
        id: 5,
        name: 'John',
        date: 'December 10,2023',
        status: 'Closed',
    },
];
function SchoolDashboard() {
    const [isDisplayTicketModal, setIsDisplayTicketModal] = useState(false);
    const handleDisplayTicketModal = () => {
        setIsDisplayTicketModal(true);
    };

    const handleCloseModal = () => {
        setIsDisplayTicketModal(false);
    };
    return (
        <section className="flex flex-col w-full scroll-smooth  lg:px-4 ">
            <Searchbar
                headerText="Hello John Doe!"
                tagline="Here’s a Quick Overview"
                Icon={WavingHandIcon}
            />
            <div className="grid mobile:grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 mobile:place-items-center mb-4">
                <Card
                    Icon={UserIcon}
                    cardText="Total Students"
                    count="20K"
                    isSchool
                />
                <Card
                    Icon={SchoolClassroomIcon}
                    cardText="No of Classroom"
                    count={200}
                    isSchool
                />

                <Card
                    Icon={DataIcon}
                    cardText="Overall Performance"
                    count="70%"
                    isSchool
                />
            </div>
            <Filters
                text="Overall Performance"
                secondButtonText="Average Time Spent"
                btnFontSize="text-xs"
            />
            <div className="w-auto">
                <Image
                    src={schoolGraph as string}
                    alt="icon"
                    className="w-full lg:h-full lg:object-contain h-56 object-cover"
                />
            </div>
            <div className=" grid grid-cols-1 lg:grid-cols-2 items-start gap-4 mt-5 ">
                <div className="border rounded-lg p-5 px-2 lg:px-5">
                    <div className="flex  justify-between px-1 mb-2   items-center">
                        <h1 className="text-xl font-semibold">
                            Teacher&apos;s
                        </h1>
                        <Link href="/school/teachers">
                            <div className="cursor-pointer border rounded-lg px-3 py-1 text-dark-gray font-medium mobile:mt-2">
                                Show All
                            </div>
                        </Link>
                    </div>
                    <UsersTable users={usersData} fontSize="12" isDashboard />
                </div>
                <div className="border rounded-lg p-5 px-2 lg:px-5 mt-2 lg:mt-0">
                    <div className="flex  justify-between px-1 mb-2   items-center">
                        <h1 className="text-xl font-semibold">
                            Recent Tickets
                        </h1>
                        <div
                            className="cursor-pointer border rounded-lg px-3 py-1 mobile:mt-2 text-dark-gray font-medium"
                            onClick={handleDisplayTicketModal}
                        >
                            New Ticket
                        </div>
                    </div>
                    <TicketsTable tickets={tickets} fontSize="12" />
                </div>
            </div>

            {isDisplayTicketModal && (
                <div className="fixed top-0 right-0 z-50 w-full lg:w-[25%]">
                    <SubmitTicketModal onClose={handleCloseModal} />
                </div>
            )}
        </section>
    );
}

export default SchoolDashboard;
