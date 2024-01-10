import ClassroomIcon from '@/app/assets/icons/ClassroomIcon';
import StatsIcon from '@/app/assets/icons/StatsIcon';
import Searchbar from '@/app/components/common/Searchbar';
import Card from '@/app/modules/STUDENT/dashboard/Card';
import { LibraryBig, ShieldAlert } from 'lucide-react';
import React from 'react';

function page() {
    return (
        <div>
            <Searchbar
                headerText="My Profile"
                tagline="Track Of Performance & Progress"
            />

            <div className="grid lg:grid-cols-4 gap-5 my-5">
                <Card
                    Icon={LibraryBig}
                    header="Subjects"
                    description="05"
                    iconBg="bg-yellow-50"
                    border="border-2 border-yellow-300"
                    iconColor="#F1E333"
                />
                <Card
                    Icon={StatsIcon}
                    header="Overall Performance"
                    description="75%"
                    iconBg="bg-orange-100"
                    border="border-2 border-orange-400"
                    iconColor="#F59A3B"
                />
                <Card
                    Icon={ClassroomIcon}
                    header="Classroom"
                    description="10th Grade"
                    iconBg="bg-green-100"
                    border="border-2 border-green-600"
                    iconColor="#7AA43E"
                />
                <Card
                    Icon={ShieldAlert}
                    header="Standard 02"
                    description="25%"
                    iconBg="bg-red-100"
                    border="border-2 border-red-400"
                    iconColor="#E6500D"
                    isShowAlert
                />
            </div>

            <div>
                <p>Yo</p>
            </div>
        </div>
    );
}

export default page;
