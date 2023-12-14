import React from 'react';
import Filters from '@/app/components/common/Filters';
import Header from '@/app/components/common/Header';
import ResourcesTable, {
    Resource,
} from '@/app/modules/resources/ResourcesTable';
import ResourceIcon from '@/app/assets/icons/ResourceIcon';
import Pagintaion from '@/app/components/common/Pagintaion';

export const ResourcesData: Resource[] = [
    {
        id: 1,
        name: 'XYZ Resources',
        type: 'Video',
        topic: 'Topic 1',
    },
    {
        id: 2,
        name: 'XYZ Resources',
        type: 'Video',
        topic: 'Topic 2',
    },
    {
        id: 3,
        name: 'XYZ Resources',
        type: 'Quiz',
        topic: 'Topic 2',
    },
    {
        id: 4,
        name: 'XYZ Resources',
        type: 'Quiz',
        topic: 'Topic 2',
    },
    {
        id: 5,
        name: 'XYZ Resources',
        type: 'WorkSheet',
        topic: 'Topic 3',
    },
    {
        id: 6,
        name: 'XYZ Resources',
        type: 'SlideShow',
        topic: 'Topic 3',
    },
    {
        id: 7,
        name: 'XYZ Resources',
        type: 'SlideShow',
        topic: 'Topic 3',
    },
];
function ResouresPage() {
    return (
        <>
            <Header
                headerText="All Resources"
                Icon={ResourceIcon}
                tagline="Your All Resources Here"
            />
            <div className="rounded-lg border mt-5 py-3 md:px-6 mobile:px-3">
                <Filters text="Resources" />
                <ResourcesTable resources={ResourcesData} />
            </div>
            <div className="flex items-center w-full justify-center mt-5">
                <Pagintaion />
            </div>
        </>
    );
}

export default ResouresPage;
