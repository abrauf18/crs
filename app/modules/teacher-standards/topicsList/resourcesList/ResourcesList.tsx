'use client';

import React, { useState } from 'react';
import Searchbar from '@/app/components/common/Searchbar';
import TabBar from '@/app/components/common/TabBar';
import Bars from '@/app/assets/icons/Bars';
import videoImage1 from '@/app/assets/images/videoImages/videoImage1.svg';
import videoImage2 from '@/app/assets/images/videoImages/videoImage2.svg';
import videoImage3 from '@/app/assets/images/videoImages/videoImage3.svg';
import videoImage4 from '@/app/assets/images/videoImages/videoImage4.svg';
import videoImage5 from '@/app/assets/images/videoImages/videoImage5.svg';
import videoImage6 from '@/app/assets/images/videoImages/videoImage6.svg';
import ResourceCard, { ResourceCardInterface } from './ResourceCard';
import AddResourceModal from './AddResourceModal';

function ResourcesList() {
    const tabOptions = [
        'All',
        'Videos',
        'SlideShow',
        'WorkSheet',
        'Quizzes',
        'Assisments',
    ];

    const cards: ResourceCardInterface[] = [
        {
            id: '1',
            imageUrl: videoImage1 as string,
            Text: 'Master Digital Product Design..',
            Questions: 5,
            Checkpoints: 3,
            Resources: 8,
            resourceType: 'slideshow',
            isSelected: false,
        },
        {
            id: '2',
            imageUrl: videoImage2 as string,
            Text: 'User Experience Design Fund...',
            Questions: 5,
            Checkpoints: 3,
            Resources: 8,
            resourceType: 'video',
            isSelected: true,
        },
        {
            id: '3',
            imageUrl: videoImage3 as string,
            Text: 'Learn Figma: Basic Fundemen..',
            Questions: 5,
            Checkpoints: 3,
            Resources: 8,
            resourceType: 'worksheet',
            isSelected: false,
        },
        {
            id: '4',
            imageUrl: videoImage4 as string,
            Text: 'learn Figma: User Interface..',
            Questions: 5,
            Checkpoints: 3,
            Resources: 8,
            resourceType: 'video',
            isSelected: false,
        },
        {
            id: '5',
            imageUrl: videoImage5 as string,
            Text: 'Essentials Principal for UI UX...',
            Questions: 5,
            Checkpoints: 3,
            Resources: 8,
            resourceType: 'quiz',
            isSelected: true,
        },
        {
            id: '6',
            imageUrl: videoImage6 as string,
            Text: 'Master Digital Product Design..',
            Questions: 5,
            Checkpoints: 3,
            Resources: 8,
            resourceType: 'assisment',
            isSelected: false,
        },
    ];

    const [selectedTab, setSelectedTab] = useState('all');
    const onSelectFilter = (tab: string) => {
        setSelectedTab(tab);
    };

    // Function to convert tabOptions to lowercase and handle special cases
    const normalizeTab = (tab: string): string => {
        if (tab.toLowerCase() === 'videos') {
            return 'video';
        }
        if (tab.toLowerCase() === 'quizzes') {
            return 'quiz';
        }
        if (tab.toLowerCase() === 'assisments') {
            return 'assisment';
        }
        return tab.toLowerCase();
    };

    // Filter the resources based on the selected tab
    const filteredResources = cards.filter((card) => {
        if (selectedTab === 'all') {
            return true; // Show all resources
        }
        return normalizeTab(selectedTab) === card.resourceType.toLowerCase();
    });

    return (
        <section>
            <Searchbar
                headerText="All Resources"
                tagline="Here’s all Resources"
            />
            <TabBar
                options={tabOptions}
                initialSelectedTab="all"
                onSelectFilter={onSelectFilter}
            />

            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-lg">
                    SB1 Cell Structure - Function
                </h1>
                <div className=" cursor-pointer mr-2 px-4 py-2 border text-sm text-dark-gray rounded-lg flex items-center justify-between">
                    {/* <Filter width={15} height={15} /> */}
                    <Bars />
                    <button className="ml-2" type="button">
                        Filters
                    </button>
                </div>
            </div>

            <div className="mt-8 ">
                <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-col-1 gap-4 md:gap-6 place-content-center">
                    {filteredResources.map((card) => (
                        <ResourceCard card={card} key={card.Questions} />
                    ))}
                </div>
            </div>
            <div className="absolute right-0 top-0 z-50 lg:w-[25%]">
                <AddResourceModal />
            </div>
        </section>
    );
}

export default ResourcesList;
