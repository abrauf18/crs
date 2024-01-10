import ClassroomIcon from '@/app/assets/icons/ClassroomIcon';
import StatsIcon from '@/app/assets/icons/StatsIcon';
import WavingHandIcon from '@/app/assets/icons/WavingHand';
import Searchbar from '@/app/components/common/Searchbar';
import Card from '@/app/modules/student-dashboard/Card';
import Learning from '@/app/modules/student-dashboard/Learning';
import { File, LibraryBig, ShieldAlert } from 'lucide-react';
import React from 'react';
import videoImage1 from '@/app/assets/images/videoImages/videoImage1.svg';
import videoImage2 from '@/app/assets/images/videoImages/videoImage2.svg';
import videoImage3 from '@/app/assets/images/videoImages/videoImage3.svg';
import videoImage4 from '@/app/assets/images/videoImages/videoImage4.svg';
import videoImage5 from '@/app/assets/images/videoImages/videoImage5.svg';
import videoImage6 from '@/app/assets/images/videoImages/videoImage6.svg';
import VideoCard, {
    Card as Video,
} from '@/app/modules/student-dashboard/VideoCard';
import Standard from '@/app/modules/standard/Standard';
import LearningCard from '@/app/modules/learning/LearningCard';

const cards: Video[] = [
    {
        id: '1',
        imageUrl: videoImage1 as string,
        Text: 'Master Digital Product Design..',
        Questions: 5,
        Checkpoints: 3,
        Resources: 8,
    },
    {
        id: '2',
        imageUrl: videoImage2 as string,
        Text: 'User Experience Design Fund...',
        Questions: 5,
        Checkpoints: 3,
        Resources: 8,
    },
    {
        id: '3',
        imageUrl: videoImage3 as string,
        Text: 'Learn Figma: Basic Fundemen..',
        Questions: 5,
        Checkpoints: 3,
        Resources: 8,
    },
    {
        id: '4',
        imageUrl: videoImage4 as string,
        Text: 'learn Figma: User Interface..',
        Questions: 5,
        Checkpoints: 3,
        Resources: 8,
    },
    {
        id: '5',
        imageUrl: videoImage5 as string,
        Text: 'Essentials Principal for UI UX...',
        Questions: 5,
        Checkpoints: 3,
        Resources: 8,
    },
    {
        id: '6',
        imageUrl: videoImage6 as string,
        Text: 'Master Digital Product Design..',
        Questions: 5,
        Checkpoints: 3,
        Resources: 8,
    },
];
function page() {
    return (
        <div>
            <Searchbar
                headerText="Hello Dany"
                tagline="Here’s a Quick Overview"
                Icon={WavingHandIcon}
            />

            <div className="flex justify-between mt-8">
                <p className="font-semibold text-2xl ">
                    Your Assigned Learnings
                </p>
                <p className="border lg:py-2 px-2 w-[40%] lg:px-4 rounded-lg lg:w-fit font-semibold text-dark-gray ">
                    Show All
                </p>
            </div>

            <div className="my-8">
                <LearningCard />
            </div>

            <div className="flex justify-between mt-8 items-center ">
                <div>
                    <div className="flex items-center space-x-2">
                        <File color="green" />
                        <p className="font-semibold text-2xl ">
                            Artificial Intelligence - AI
                        </p>
                    </div>
                    <p className="text-dark-gray font-medium w-[85%] mt-1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore
                    </p>
                </div>
                <p className="border py-2 px-4 text-center rounded-lg h-fit lg:w-fit font-semibold text-dark-gray ">
                    Show All
                </p>
            </div>

            <div className="mt-8">
                <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-col-1 gap-4 md:gap-6 place-content-center">
                    {cards.map((card) => (
                        <VideoCard card={card} key={card.Questions} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default page;
