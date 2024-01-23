'use client';

import React, { useState } from 'react';
import videoImage1 from '@/app/assets/images/videoImages/videoImage1.svg';
import videoImage2 from '@/app/assets/images/videoImages/videoImage2.svg';
import videoImage3 from '@/app/assets/images/videoImages/videoImage3.svg';
import videoImage4 from '@/app/assets/images/videoImages/videoImage4.svg';
import videoImage5 from '@/app/assets/images/videoImages/videoImage5.svg';
import videoImage6 from '@/app/assets/images/videoImages/videoImage6.svg';
import Filters from '@/app/components/common/Filters';
import UploadResourceModal from '@/app/components/common/UploadResourceModal';
import VideoCard, { Card } from './VideoCard';
import UploadModal from './UploadModal';
import AddQuestions from './AddQuestions';
import CheckPointsModal from './CheckPointsModal';

function Video() {
    const [isShowUploadVideoModal, setIsShowUploadVideoModal] = useState(false);

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

    const handleOpenUploadModal = () => {
        setIsShowUploadVideoModal(true);
    };

    const handleCloseUploadModal = () => {
        setIsShowUploadVideoModal(false);
    };

    return (
        <>
            <Filters
                text="200 Videos In Total"
                secondButtonText="Upload Video"
                handleClick={handleOpenUploadModal}
            />
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-col-1 gap-4 md:gap-6 ">
                {cards.map((card) => (
                    <VideoCard card={card} key={card.Questions} />
                ))}
            </div>
            {/* Modals for uploading steps */}

            {isShowUploadVideoModal && (
                <div className="fixed right-0 top-0 z-50 w-full md:w-[60%] lg:w-[30%]">
                    <UploadResourceModal
                        isDisplayHeaderIcon
                        buttonText="Continue"
                        headerText="Upload Video"
                        description="let’s Upload Video For Your User"
                        onClose={handleCloseUploadModal}
                    />
                </div>
            )}

            {/* <div className="fixed right-0 top-0 z-50 w-full md:w-[60%] lg:w-[30%]">
                <AddQuestions />
            </div> */}

            {/* <div className="fixed right-0 top-0 z-50 w-full md:w-[60%] lg:w-[30%]">
                <CheckPointsModal />
            </div> */}
        </>
    );
}

export default Video;
