'use client';

/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import action from '@/app/action';
import { VideoSummary } from '@/lib/utils';
import VideoIcon from '@/app/assets/icons/VideoIcon';
import Filters from '@/app/components/common/Filters';
import UploadResourceModal from '@/app/components/common/UploadResourceModal';
import ReactPlayer from 'react-player';
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
    const [duration, setDuration] = useState(0);
    const [videoUrl, setVideoUrl] = useState('');
    const [isShowUploadVideoModal, setIsShowUploadVideoModal] = useState(false);

    const handleOpenUploadModal = () => {
        setIsShowUploadVideoModal(true);
    };

    const handleCloseUploadModal = () => {
        setIsShowUploadVideoModal(false);
        setStep(0);
        action('getVideos');
    };

    const cards: Card[] = APIdata.videos.map((video) => ({
        id: video.id,
        imageUrl: video.thumbnailURL,
        Text: video.name,
        Questions: video.questionCountNumber,
        Checkpoints: video.topicsCount,
    }));

    function convertYouTubeDuration(duration: string) {
        const match = duration.match(/PT((\d+)H)?((\d+)M)?((\d+)S)?/);

        const hours = (match && parseInt(match[2], 10)) || 0;
        const minutes = (match && parseInt(match[4], 10)) || 0;
        const seconds = (match && parseInt(match[6], 10)) || 0;

        return hours * 3600 + minutes * 60 + seconds;
    }

    useEffect(() => {
        async function handleVideoUpload(videoUrl: string) {
            let duration = 0;

            if (videoUrl.includes('youtube')) {
                const videoId = new URL(videoUrl).searchParams.get('v');
                const response = await fetch(
                    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=AIzaSyCrhW8yFSb14hpLBPJgo2VnqI8NcxeW-M4`
                );
                const data = await response.json();
                duration = convertYouTubeDuration(
                    data.items[0].contentDetails.duration
                );
            } else {
                // For S3 videos, use ReactPlayer to get the duration
                const player = new ReactPlayer({
                    videoUrl,
                    width: 0,
                    height: 0,
                });
                duration = player.getDuration();
            }

            setDuration(duration);
        }
        handleVideoUpload(videoUrl);
    }, [videoUrl]);

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
                        onButtonClick={() => setStep((prev) => prev + 1)}
                        setUploadedVideoId={setVideoId}
                        setUploadedVideoUrl={setVideoUrl}
                    />
                </div>
            )}

            {isShowUploadVideoModal && step === 1 && (
                <div className="fixed right-0 top-0 z-50 w-full md:w-[60%] lg:w-[30%]">
                    <AddQuestions
                        videoId={videoId}
                        videoUrl={videoUrl}
                        onButtonClick={() => setStep((prev) => prev + 1)}
                        onClose={handleCloseUploadModal}
                        videoDuration={duration}
                        setVideoDuration={setDuration}
                    />
                </div>
            )}

            {isShowUploadVideoModal && step === 2 && (
                <div className="fixed right-0 top-0 z-50 w-full md:w-[60%] lg:w-[30%]">
                    <CheckPointsModal
                        videoId={videoId}
                        videoDuration={duration}
                        onClose={handleCloseUploadModal}
                    />
                </div>
            )}
        </>
    );
}

export default Video;
