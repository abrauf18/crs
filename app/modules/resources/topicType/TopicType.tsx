'use client';

import React, { useState } from 'react';
import { HelpCircle, TicketIcon } from 'lucide-react';
import Filters from '@/app/components/common/Filters';
import Card from '@/app/components/common/Card';
import SlideShowIcon from '@/app/assets/icons/SlideShowIcon';
import VideoIcon from '@/app/assets/icons/VideoIcon';
import WorksheetIcon from '@/app/assets/icons/WorksheetIcon';
import UploadResourceModal from '../UploadResourceModal';

function TopicPage({
    APIdata,
}: {
    APIdata: {
        slideshowCount: number;
        videoCount: number;
        worksheetCount: number;
        exitTicketTestCount: number;
        quizCount: number;
        assignmentCount: number;
        totalCount: number;
    };
}) {
    const [isShowUploadModal, setIsShowUploadModal] = useState(false);

    const handleOpenUploadModal = () => {
        setIsShowUploadModal(true);
    };

    const handleCloseUploadModal = () => {
        setIsShowUploadModal(false);
    };

    return (
        <section>
            <Filters
                text={`${APIdata.totalCount} Resources In Total`}
                secondButtonText="Upload Resources"
                handleClick={handleOpenUploadModal}
                isHideFirstBtn
            />
            <div className="grid mobile:grid-col-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 mobile:place-items-center">
                <Card
                    Icon={VideoIcon}
                    cardText="Total Video's"
                    count={APIdata.videoCount}
                />
                <Card
                    Icon={SlideShowIcon}
                    cardText="Slideshows"
                    count={APIdata.slideshowCount}
                />
                <Card
                    Icon={WorksheetIcon}
                    cardText="Worksheets"
                    count={APIdata.worksheetCount}
                />
            </div>
            <div className="grid mobile:grid-col-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mt-4 mobile:place-items-center">
                <Card
                    Icon={TicketIcon}
                    cardText="Exit Ticket Test"
                    count={APIdata.exitTicketTestCount}
                />
                <Card
                    Icon={HelpCircle}
                    cardText="Quizzes"
                    count={APIdata.quizCount}
                />
            </div>
            {isShowUploadModal && (
                <div className="fixed right-0 top-0 z-50 w-[100%] md:w-[60%] lg:w-[30%]">
                    <UploadResourceModal onClose={handleCloseUploadModal} />
                </div>
            )}
        </section>
    );
}

export default TopicPage;
