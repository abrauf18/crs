'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { HelpCircle, TicketIcon } from 'lucide-react';
import Filters from '@/app/components/common/Filters';
import Card from '@/app/components/common/Card';
import SlideShowIcon from '@/app/assets/icons/SlideShowIcon';
import VideoIcon from '@/app/assets/icons/VideoIcon';
import WorksheetIcon from '@/app/assets/icons/WorksheetIcon';
import UploadResourceModal from '../UploadResourceModal';

function TopicPage() {
    const path = usePathname();

    return (
        <section>
            <Filters
                text="500 Resources In Total"
                secondButtonText="Upload Video"
            />
            <div className="grid mobile:grid-col-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 mobile:place-items-center">
                <Card Icon={VideoIcon} cardText="Total Video's" count="20K" />
                <Card Icon={SlideShowIcon} cardText="Slideshow" count={200} />
                <Card Icon={WorksheetIcon} cardText="Worksheets" count="20" />
            </div>
            <div className="grid mobile:grid-col-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mt-4 mobile:place-items-center">
                <Card
                    Icon={TicketIcon}
                    cardText="Exit Ticket Test"
                    count="150"
                />
                <Card Icon={HelpCircle} cardText="Quizzes" count={150} />
            </div>
            {/* <div className="absolute right-0 top-0 z-50 ">
                <UploadResourceModal />
            </div> */}
        </section>
    );
}

export default TopicPage;
