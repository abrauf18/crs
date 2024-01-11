import CommonTable from '@/app/components/common/CommonTable';
import Filters from '@/app/components/common/Filters';
import Pagintaion from '@/app/components/common/Pagintaion';
import { convertDashesToSpaces } from '@/lib/utils';
import React from 'react';

function ResourceDetails({ params }: any) {
    const ModifiedTopicName = convertDashesToSpaces(params.typeName); // adding space after Topic

    const resources: any = [
        { id: 1, title: 'Design Thinking', topic: ModifiedTopicName },
        { id: 2, title: 'User Research', topic: ModifiedTopicName },
        { id: 3, title: 'Figma Design', topic: ModifiedTopicName },
        { id: 5, title: 'Design Thinking', topic: ModifiedTopicName },
        { id: 6, title: 'User Research', topic: ModifiedTopicName },
        { id: 7, title: 'Figma Design', topic: ModifiedTopicName },
        { id: 8, title: 'Design Thinking', topic: ModifiedTopicName },
        { id: 9, title: 'User Research', topic: ModifiedTopicName },
        { id: 10, title: 'Figma Design', topic: ModifiedTopicName },
    ];
    return (
        <div>
            <Filters text={ModifiedTopicName} />
            <CommonTable resources={resources} />
            <div className="flex items-center w-full justify-center mt-5">
                <Pagintaion />
            </div>
        </div>
    );
}
export default ResourceDetails;
