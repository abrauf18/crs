import React from 'react';
import VideoIcon from '@/app/assets/icons/VideoIcon';
import DataIcon from '@/app/assets/icons/DataIcon';
import UserIcon from '@/app/assets/icons/UserIcon';
import ResourceIcon from '@/app/assets/icons/ResourceIcon';
import WavingHandIcon from '@/app/assets/icons/WavingHand';
import Image from 'next/image';
import graph from '@/app/assets/images/graph.svg';
import { usersData } from '@/app/(home)/users/page';
import { ResourcesData } from '@/app/(home)/resources/page';
import UsersTable from '../users/UsersTable';
import ResourcesTable from '../resources/ResourcesTable';
import Filters from '../../components/common/Filters';
import Card from '../../components/common/Card';
import Searchbar from '../../components/common/Searchbar';

function Dashboard() {
    return (
        <section className="flex flex-col w-full scroll-smooth mobile:mt-12">
            <Searchbar
                headerText="Hello John Doe!"
                tagline="Here’s a Quick Overview"
                Icon={WavingHandIcon}
            />
            <div className="grid mobile:grid-col-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4 mobile:place-items-center">
                <Card Icon={UserIcon} cardText="Total User’s" count="20K" />
                <Card
                    Icon={VideoIcon}
                    cardText="Video Uploads"
                    count={200}
                    isActive
                />
                <Card
                    Icon={ResourceIcon}
                    cardText="Total Resources"
                    count={150}
                />
                <Card Icon={DataIcon} cardText="Data Insights" count="70%" />
            </div>
            <Filters text="Overall Performance" />
            <div className="w-auto ">
                <Image src={graph as string} alt="icon" className="w-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-4 mt-5">
                <div className="border rounded-lg p-5">
                    <h1 className="text-[20px] font-semibold">User’s</h1>
                    <UsersTable users={usersData} fontSize="12" />
                </div>
                <div className="border rounded-lg p-5">
                    <h1 className="text-[20px] font-semibold">Resources</h1>
                    <ResourcesTable resources={ResourcesData} fontSize="12" />
                </div>
            </div>
        </section>
    );
}

export default Dashboard;
