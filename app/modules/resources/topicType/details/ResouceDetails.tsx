import React from 'react';
import CommonTable from '@/app/components/common/CommonTable';
import Filters from '@/app/components/common/Filters';
import Pagintaion from '@/app/components/common/Pagintaion';
import { convertDashesToSpaces } from '@/lib/utils';

function ResourceDetails({ params }: any) {
    const ModifiedTopicName = convertDashesToSpaces(params.typeName); // adding space after Topic

    console.log(params);
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
            <Filters
                text={`150  ${
                    params.typeName.startsWith('Total-Video')
                        ? ' Videos'
                        : params.typeName.startsWith('Exit-Ticket-Test')
                          ? 'Exit Ticket'
                          : `${params.typeName}`
                }   in total`}
                secondButtonText={
                    params.typeName.startsWith('Total-Video')
                        ? 'Upload Videos'
                        : params.typeName.startsWith('Exit-Ticket-Test')
                          ? 'Upload Exit Ticket'
                          : `Upload ${params.typeName}`
                }
            />

            <div className="py-2 px-4 border rounded-lg mt-4">
                <Filters
                    text={ModifiedTopicName}
                    secondButtonText="Newest First"
                />
                <CommonTable
                    resources={resources}
                    resourcesType={params.typeName}
                />
            </div>

            <div className="flex items-center w-full justify-center mt-5">
                <Pagintaion />
            </div>
        </div>
    );
}
export default ResourceDetails;
