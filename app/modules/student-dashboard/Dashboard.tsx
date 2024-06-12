import React from 'react';
import { LibraryBig, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import ClassroomIcon from '@/app/assets/icons/ClassroomIcon';
import StatsIcon from '@/app/assets/icons/StatsIcon';
import WavingHandIcon from '@/app/assets/icons/WavingHand';
import Searchbar from '@/app/components/common/Searchbar';
import Card from '@/app/modules/student-dashboard/Card';
import Learning from '@/app/modules/student-dashboard/Learning';
import videoImage1 from '@/app/assets/images/videoImages/videoImage1.svg';
import videoImage2 from '@/app/assets/images/videoImages/videoImage2.svg';
import videoImage3 from '@/app/assets/images/videoImages/videoImage3.svg';
import videoImage4 from '@/app/assets/images/videoImages/videoImage4.svg';
import videoImage5 from '@/app/assets/images/videoImages/videoImage5.svg';
import videoImage6 from '@/app/assets/images/videoImages/videoImage6.svg';
import VideoCard, { Card as Video } from '@/app/components/common/VideoCard';

const cards: Video[] = [
    {
        id: '1',
        imageUrl: videoImage1 as string,
        Text: 'Master Digital Product Design..',
        Questions: 5,
        Checkpoints: 3,
        Resources: 8,
        lastSeenTime: '',
        duration: '',
        completed: false,
        standardId: '',
    },
    {
        id: '2',
        imageUrl: videoImage2 as string,
        Text: 'User Experience Design Fund...',
        Questions: 5,
        Checkpoints: 3,
        Resources: 8,
        lastSeenTime: '',
        duration: '',
        completed: false,
        standardId: '',
    },
    {
        id: '3',
        imageUrl: videoImage3 as string,
        Text: 'Learn Figma: Basic Fundemen..',
        Questions: 5,
        Checkpoints: 3,
        Resources: 8,
        lastSeenTime: '',
        duration: '',
        completed: false,
        standardId: '',
    },
    {
        id: '4',
        imageUrl: videoImage4 as string,
        Text: 'learn Figma: User Interface..',
        Questions: 5,
        Checkpoints: 3,
        Resources: 8,
        lastSeenTime: '',
        duration: '',
        completed: false,
        standardId: '',
    },
    {
        id: '5',
        imageUrl: videoImage5 as string,
        Text: 'Essentials Principal for UI UX...',
        Questions: 5,
        Checkpoints: 3,
        Resources: 8,
        lastSeenTime: '',
        duration: '',
        completed: false,
        standardId: '',
    },
    {
        id: '6',
        imageUrl: videoImage6 as string,
        Text: 'Master Digital Product Design..',
        Questions: 5,
        Checkpoints: 3,
        Resources: 8,
        lastSeenTime: '',
        duration: '',
        completed: false,
        standardId: '',
    },
];

type VideoData = {
    lastSeenTime: string;
    duration: string;
    thumbnailURL: string;
};

type StandardData = {
    standardName: string;
    videoResourcesCount: number;
    nonVideoResourcesCount: number;
};

type DashboardData = {
    studentName: string;
    standardsCount: number;
    classroomName: string;
    standardsData: StandardData[];
    videosData: VideoData[];
};

function Dashboard({ APIdata }: { APIdata: DashboardData }) {
    return (
        <div className="pb-4">
            <Searchbar
                headerText={`Hello ${APIdata.studentName}!`}
                tagline="Here’s a Quick Overview"
                Icon={WavingHandIcon}
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 my-5">
                <Card
                    Icon={LibraryBig}
                    header="Standards"
                    description={APIdata.standardsCount}
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
                    description={APIdata.classroomName}
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

            <div className="flex mobile:flex-col  md:justify-between mt-8 w-full">
                <p className="font-semibold text-2xl w-fit ">
                    Your Assigned Learnings
                </p>
                <div className="mobile:flex mobile:justify-end mobile:mt-2">
                    <p className="border cursor-pointer py-2 px-4 text-center rounded-lg h-fit w-fit font-semibold text-dark-gray ">
                        <Link href="/student/learning">Show All</Link>
                    </p>
                </div>
            </div>

            <div className="my-8">
                <Learning />
            </div>

            <div className="flex mobile:flex-col  md:justify-between mt-8">
                <p className="font-semibold text-2xl ">Saved Videos</p>
                <div className="mobile:flex mobile:justify-end">
                    <p className=" border cursor-pointer py-2  px-4 text-center rounded-lg h-fit w-fit font-semibold text-dark-gray ">
                        <Link href="/student/saved-videos">Show All</Link>
                    </p>
                </div>
            </div>

            <div className="mt-8">
                <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-col-1 gap-4 md:gap-6 ">
                    {cards.map((card) => (
                        <VideoCard card={card} key={card.Questions} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
