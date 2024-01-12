import React from 'react';
import Header from '@/app/components/common/Header';
import videoImage1 from '@/app/assets/images/videoImages/videoImage1.svg';
import videoImage2 from '@/app/assets/images/videoImages/videoImage2.svg';
import videoImage3 from '@/app/assets/images/videoImages/videoImage3.svg';
import videoImage4 from '@/app/assets/images/videoImages/videoImage4.svg';
import videoImage5 from '@/app/assets/images/videoImages/videoImage5.svg';
import videoImage6 from '@/app/assets/images/videoImages/videoImage6.svg';
import UploadResourceModal from '@/app/components/common/UploadResourceModal';
import VideoCard, { Card } from './VideoCard';
import UploadModal from './UploadModal';
import AddQuestions from './AddQuestions';
import CheckPointsModal from './CheckPointsModal';

function Video() {
    const cards: Card[] = [
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

    return (
        <>
            <Header text="200 Videos In Total" buttonText="Upload Video" />
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-col-1 gap-4 md:gap-6 place-content-center">
                {cards.map((card) => (
                    <VideoCard card={card} key={card.Questions} />
                ))}
            </div>
            {/* Modals for uploading steps */}

            {/* <div className="absolute right-0 top-0 z-50 lg:w-[25%]">
                <UploadResourceModal
                    isDisplayHeaderIcon
                    buttonText="Continue"
                    headerText="Upload Video"
                    description="let’s Upload Video For Your User"
                />
            </div> */}

            {/* <div className="absolute right-0 top-0 z-50 lg:w-[25%]">
                <AddQuestions />
            </div> */}

            {/* <div className="absolute right-0 top-0 z-50 lg:w-[25%]">
                <CheckPointsModal />
            </div> */}
        </>
    );
}

export default Video;
