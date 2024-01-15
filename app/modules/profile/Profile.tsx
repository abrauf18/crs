import Searchbar from '@/app/components/common/Searchbar';
import Card from '@/app/modules/profile/ProfileCard';
import React from 'react';
import ClassroomIcon from '@/app/assets/icons/ClassroomIcon';
import StatsIcon from '@/app/assets/icons/StatsIcon';
import MyAnswersTable, {
    MyAnswers,
} from '@/app/modules/profile/MyAnswersTable';
import Filters from '@/app/components/common/Filters';
import Resource1 from '@/app/assets/images/resourceImages/Resource1.svg';
import Resource2 from '@/app/assets/images/resourceImages/Resource2.svg';
import Resource3 from '@/app/assets/images/resourceImages/Resource3.svg';
import FileCard, { FileInterface } from '@/app/components/common/FileCard';

export const MyAnswersRecord: MyAnswers[] = [
    {
        question: '14',
        id: 1,
        topicName: 'Artiicial Intelligence',
        correctAnswer: '10',
        score: '20',
    },
    {
        question: '14',
        id: 1,
        topicName: 'Artiicial Intelligence',
        correctAnswer: '10',
        score: '20',
    },
    {
        question: '14',
        id: 1,
        topicName: 'Artiicial Intelligence',
        correctAnswer: '10',
        score: '20',
    },
    {
        question: '14',
        id: 1,
        topicName: 'Artiicial Intelligence',
        correctAnswer: '10',
        score: '20',
    },
    {
        question: '14',
        id: 1,
        topicName: 'Artiicial Intelligence',
        correctAnswer: '10',
        score: '20',
    },
];

const resources: FileInterface[] = [
    {
        id: '1',
        imageUrl: Resource1,
        resourceType: 'ppt',
        name: 'Artiicial Intelligence',
        btnText: 'View',
    },
    {
        id: '2',
        imageUrl: Resource2,
        resourceType: 'ppt',
        name: 'Artiicial Intelligence',
        btnText: 'View',
    },
    {
        id: '1',
        imageUrl: Resource3,
        resourceType: 'xls',
        name: 'Artiicial Intelligence',
        btnText: 'View',
    },
];
function Profile() {
    return (
        <div>
            <div className="grid lg:grid-cols-3 gap-5 my-5">
                <Card
                    Icon={ClassroomIcon}
                    description="10th Grade"
                    header="Classroom"
                    iconBg="bg-green-100"
                    border="border-1 border-green-600"
                    iconColor="#7AA43E"
                />
                <Card
                    Icon={StatsIcon}
                    header="Overall Performance"
                    description="75%"
                    iconBg="bg-orange-100"
                    border="border-1 border-orange-600"
                    iconColor="#F59A3B"
                />
                <Card
                    Icon={StatsIcon}
                    header="Last Test Result"
                    description="85%"
                    iconBg="bg-slate-200"
                    border="border-1 border-slate-600"
                    iconColor="#85878D"
                />
            </div>

            <div>
                <h1 className="font-semibold text-2xl mb-4 mt-8">My Answers</h1>

                <div className="border rounded-lg p-5 flex flex-col items-end">
                    <Filters text="" />
                    <MyAnswersTable myRecord={MyAnswersRecord} />
                </div>
            </div>

            <div>
                <h1 className="font-semibold text-2xl mb-4 mt-8">
                    My Resources
                </h1>
                <div className="grid lg:grid-cols-3 gap-5">
                    {resources.map((resource) => (
                        <FileCard key={resource.id} card={resource} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Profile;
