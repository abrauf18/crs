'use client';

import React, { useState } from 'react';
import { HelpCircle, TicketIcon } from 'lucide-react';
import Filters from '@/app/components/common/Filters';
import Card from '@/app/components/common/Card';
import SlideShowIcon from '@/app/assets/icons/SlideShowIcon';
import VideoIcon from '@/app/assets/icons/VideoIcon';
import WorksheetIcon from '@/app/assets/icons/WorksheetIcon';
import AssignmentIcon from '@/app/assets/icons/AssignmentIcon';
import UploadResourceModal from '../UploadResourceModal';

function TopicPage({
    APIdata,
}: {
    APIdata: {
        slideshowCount: number;
        videoCount: number;
        worksheetCount: number;
        quizCount: number;
        assignmentCount: number;
        labCount: number;
        stationCount: number;
        activityCount: number;
        guidedNoteCount: number;
        formativeAssessmentCount: number;
        summarizeAssessmentCount: number;
        dataTrackerCount: number;
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
                    cardText="Total Videos"
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
            <div className="grid mobile:grid-col-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 mobile:place-items-center">
                <Card
                    Icon={HelpCircle}
                    cardText="Quizzes"
                    count={APIdata.quizCount}
                />
                <Card
                    Icon={AssignmentIcon}
                    cardText="Assignments"
                    count={APIdata.assignmentCount}
                />
                <Card
                    Icon={AssignmentIcon}
                    cardText="Labs"
                    count={APIdata.labCount}
                />
            </div>
            <div className="grid mobile:grid-col-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 mobile:place-items-center">
                <Card
                    Icon={HelpCircle}
                    cardText="Stations"
                    count={APIdata.stationCount}
                />
                <Card
                    Icon={AssignmentIcon}
                    cardText="Activities"
                    count={APIdata.activityCount}
                />
                <Card
                    Icon={AssignmentIcon}
                    cardText="Guided Notes"
                    count={APIdata.guidedNoteCount}
                />
            </div>
            <div className="grid mobile:grid-col-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 mobile:place-items-center">
                <Card
                    Icon={HelpCircle}
                    cardText="Formative Assessments"
                    count={APIdata.formativeAssessmentCount}
                />
                <Card
                    Icon={AssignmentIcon}
                    cardText="Summarize Assessments"
                    count={APIdata.summarizeAssessmentCount}
                />
                <Card
                    Icon={AssignmentIcon}
                    cardText="Data Trackers"
                    count={APIdata.dataTrackerCount}
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
