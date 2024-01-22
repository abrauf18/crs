import React from 'react';
import Searchbar from '@/app/components/common/Searchbar';
import Filters from '@/app/components/common/Filters';
import Pagintaion from '@/app/components/common/Pagintaion';
import ResourcesTable, { ResourcesInterface } from './ResourcesTable';
import ResourceDownloadModal from './ResourceDownloadModal';

export const resourcesList: ResourcesInterface[] = [
    {
        id: 1,
        topic: 'ABC',
        assignedResources: '5',
    },
    {
        id: 1,
        topic: 'ABC',
        assignedResources: '5',
    },
    {
        id: 1,
        topic: 'ABC',
        assignedResources: '5',
    },
    {
        id: 1,
        topic: 'ABC',
        assignedResources: '5',
    },
    {
        id: 1,
        topic: 'ABC',
        assignedResources: '5',
    },
    {
        id: 1,
        topic: 'ABC',
        assignedResources: '5',
    },
    {
        id: 1,
        topic: 'ABC',
        assignedResources: '5',
    },
];
function Resources() {
    return (
        <section>
            <Searchbar
                headerText="All Resources"
                tagline="Your All Resources Allocated to Topics"
            />
            <div className="border rounded-lg p-5 mt-5">
                <Filters text="All topic's" />
                <ResourcesTable resources={resourcesList} />
            </div>
            <div className="flex justify-center items-center mt-5">
                <Pagintaion />
            </div>
        </section>
    );
}

export default Resources;
