import React from 'react';
import Filters from '@/app/components/common/Filters';
import ResourceIcon from '@/app/assets/icons/ResourceIcon';
import Searchbar from '@/app/components/common/Searchbar';
import Pagintaion from '@/app/components/common/Pagintaion';
import ResourcesTable, { Resource } from './ResourcesTable';

export const ResourcesData: Resource[] = [
    {
        id: 1,
        name: 'XYZ Resources',
        type: 'Video',
        topic: 'Topic xyz',
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
];
function Resoures() {
    return (
        <section>
            <Searchbar
                headerText="All Resources"
                Icon={ResourceIcon}
                tagline="Your All Resources Are Listed Here"
            />
            <div className="rounded-lg border mt-5 py-3 md:px-6 mobile:px-3">
                <Filters text="Resources" btnFontSize="text-xs" />
                <ResourcesTable resources={ResourcesData} />
            </div>
            <div className="flex items-center w-full justify-center mt-5">
                <Pagintaion />
            </div>
        </section>
    );
}

export default Resoures;
