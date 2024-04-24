'use client';

import React, { useState } from 'react';
import { VideoSummary } from '@/lib/utils';
import VideoIcon from '@/app/assets/icons/VideoIcon';
import Filters from '@/app/components/common/Filters';
import UploadResourceModal from '@/app/components/common/UploadResourceModal';
import UploadModal from './UploadModal';
import AddQuestions from './AddQuestions';
import VideoCard, { Card } from './VideoCard';
import CheckPointsModal from './CheckPointsModal';

function Video({
    APIdata,
}: {
    APIdata: {
        videos: VideoSummary[];
        totalVideos: number;
    };
}) {
    const [step, setStep] = useState(0);
    const [videoId, setVideoId] = useState('');
    const [isShowUploadVideoModal, setIsShowUploadVideoModal] = useState(false);

    const handleOpenUploadModal = () => {
        setIsShowUploadVideoModal(true);
    };

    const handleCloseUploadModal = () => {
        setIsShowUploadVideoModal(false);
    };

    const cards: Card[] = APIdata.videos.map((video) => ({
        id: video.id,
        imageUrl: video.thumbnailURL,
        Text: video.name,
        Questions: video.questionCountNumber,
        Checkpoints: video.topicsCount,
        Resources: 0,
    }));

    return (
        <>
            {/* flex justify-start */}
            <div className="mobile:mb-4">
                <Filters
                    text={`${APIdata.totalVideos} Videos In Total`}
                    secondButtonText="Upload Video"
                    handleClick={handleOpenUploadModal}
                />
            </div>
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-col-1 gap-4 md:gap-6 ">
                {cards.map((card) => (
                    <VideoCard card={card} key={card.Questions} />
                ))}
            </div>
            {/* Modals for uploading steps */}

            {isShowUploadVideoModal && step === 0 && (
                <div className="fixed right-0 top-0 z-50 w-full md:w-[60%] lg:w-[30%]">
                    <UploadResourceModal
                        isDisplayHeaderIcon
                        buttonText="Next"
                        headerText="Upload Video"
                        description="let’s Upload Video For Your User"
                        onClose={handleCloseUploadModal}
                        Icon={VideoIcon}
                        setUploadedVideoId={setVideoId}
                        onButtonClick={() => setStep((prev) => prev + 1)}
                    />
                </div>
            )}

            {isShowUploadVideoModal && step === 1 && (
                <div className="fixed right-0 top-0 z-50 w-full md:w-[60%] lg:w-[30%]">
                    <AddQuestions videoId={videoId} />
                </div>
            )}

            {isShowUploadVideoModal && step === 2 && (
                <div className="fixed right-0 top-0 z-50 w-full md:w-[60%] lg:w-[30%]">
                    <CheckPointsModal />
                </div>
            )}
        </>
    );
}

export default Video;
