'use client';

import React, { useState } from 'react';
import Header from '@/app/components/common/Header';
import Card from '@/app/components/common/Card';
import SlideShowIcon from '@/app/assets/icons/SlideShowIcon';
import { HelpCircle, TicketIcon } from 'lucide-react';
import VideoIcon from '@/app/assets/icons/VideoIcon';
import WorksheetIcon from '@/app/assets/icons/WorksheetIcon';
import { usePathname } from 'next/navigation';
import UploadResourceModal from '../UploadResourceModal';

function TopicPage() {
    const path = usePathname();

    return (
        <section>
            <Header text="500 Resources In Total" buttonText="Upload Video" />
            <div className="grid mobile:grid-col-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 mobile:place-items-center">
                <Card
                    Icon={VideoIcon}
                    cardText="Total Video's"
                    count="20K"
                    currentPath={path}
                />
                <Card
                    Icon={SlideShowIcon}
                    cardText="Slideshow"
                    currentPath={path}
                    count={200}
                />
                <Card
                    Icon={WorksheetIcon}
                    cardText="Worksheets"
                    count="20"
                    currentPath={path}
                />
            </div>
            <div className="grid mobile:grid-col-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mt-4 mobile:place-items-center">
                <Card
                    Icon={TicketIcon}
                    cardText="Exit Ticket Test"
                    count="150"
                    currentPath={path}
                />
                <Card
                    Icon={HelpCircle}
                    cardText="Quizzes"
                    count={150}
                    currentPath={path}
                />
            </div>
            {/* <div className="absolute right-0 top-0 z-50 ">
                <UploadResourceModal />
            </div> */}
        </section>
    );
}

export default TopicPage;
