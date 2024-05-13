'use client';

/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import action from '@/app/action';
import { VideoSummary } from '@/lib/utils';
import VideoIcon from '@/app/assets/icons/VideoIcon';
import Filters from '@/app/components/common/Filters';
import UploadResourceModal from '@/app/components/common/UploadResourceModal';
import AddQuestions from './AddQuestions';
import VideoCard, { Card } from './VideoCard';
import CheckPointsModal from './CheckPointsModal';
import EditQuestionsModal from './EditQuestionsModal';
import EditTopicsModal from './EditTopicsModal';

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
    const [duration, setDuration] = useState('');
    const [isShowUploadVideoModal, setIsShowUploadVideoModal] = useState(false);
    const [editVideoId, setEditVideoId] = useState('');
    const [isShowEditVideoModal, setIsShowEditVideoModal] = useState(false);

    const handleOpenUploadModal = () => {
        setIsShowUploadVideoModal(true);
    };

    const handleCloseUploadModal = () => {
        setVideoId('');
        setIsShowUploadVideoModal(false);
        setStep(0);
    };

    const handleOpenEditModal = (id: string) => {
        setEditVideoId(id);
        setIsShowEditVideoModal(true);
    };

    const handleCloseEditModal = () => {
        setEditVideoId('');
        setIsShowEditVideoModal(false);
        setStep(0);
    };

    return (
        <>
            <div className="mobile:mb-4">
                <Filters
                    text={`${APIdata.totalVideos} Videos In Total`}
                    secondButtonText="Upload Video"
                    isHideFirstBtn
                    handleClick={handleOpenUploadModal}
                />
            </div>
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-col-1 gap-4 md:gap-6 ">
                {APIdata?.videos?.map((card) => (
                    <VideoCard
                        card={{
                            id: card.id,
                            imageUrl: card.thumbnailURL,
                            Text: card.name,
                            Questions: card.questionCountNumber,
                            Checkpoints: card.topicsCount,
                        }}
                        key={card.id}
                        onClickEditBtn={handleOpenEditModal}
                    />
                ))}
            </div>

            {isShowUploadVideoModal && step === 0 && (
                <div className="fixed right-0 top-0 z-50 w-full md:w-[60%] lg:w-[30%]">
                    <UploadResourceModal
                        isDisplayHeaderIcon
                        buttonText="Next"
                        headerText="Upload Video"
                        description="let’s Upload Video For Your User"
                        onClose={handleCloseUploadModal}
                        Icon={VideoIcon}
                        onButtonClick={() => setStep((prev) => prev + 1)}
                        setUploadedVideoId={setVideoId}
                        setVideoDuration={setDuration}
                    />
                </div>
            )}

            {isShowUploadVideoModal && step === 1 && (
                <div className="fixed right-0 top-0 z-50 w-full md:w-[60%] lg:w-[30%]">
                    <EditQuestionsModal
                        newVideo
                        newVideoDuration={duration}
                        videoId={videoId}
                        onClose={handleCloseUploadModal}
                        onButtonClick={() => setStep((prev) => prev + 1)}
                    />
                </div>
            )}

            {isShowUploadVideoModal && step === 2 && (
                <div className="fixed right-0 top-0 z-50 w-full md:w-[60%] lg:w-[30%]">
                    <EditTopicsModal
                        newVideo
                        newVideoDuration={duration}
                        videoId={videoId}
                        onClose={handleCloseUploadModal}
                        onButtonClick={() => setStep((prev) => prev + 1)}
                    />
                </div>
            )}

            {isShowEditVideoModal && step === 0 && (
                <div className="fixed right-0 top-0 z-50 w-full md:w-[60%] lg:w-[30%]">
                    <EditQuestionsModal
                        videoId={editVideoId}
                        onClose={handleCloseEditModal}
                        onButtonClick={() => setStep((prev) => prev + 1)}
                    />
                </div>
            )}

            {isShowEditVideoModal && step === 1 && (
                <div className="fixed right-0 top-0 z-50 w-full md:w-[60%] lg:w-[30%]">
                    <EditTopicsModal
                        videoId={editVideoId}
                        onClose={handleCloseEditModal}
                        onButtonClick={() => setStep((prev) => prev + 1)}
                    />
                </div>
            )}
        </>
    );
}

export default Video;
