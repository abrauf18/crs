import React from 'react';
import { Session, getServerSession } from 'next-auth';
import { convertDashesToSpaces } from '@/lib/utils';
import { getResourcesCountAPI } from '@/app/api/resource';
import { options } from '@/app/api/auth/[...nextauth]/options';
import UnhandledError from '@/app/modules/error/UnhandledError';
import TopicType from '@/app/modules/resources/topicType/TopicType';

async function TopicPage({ params }: { params: { topic: string } }) {
    const data: Session | null = await getServerSession(options);

    let APIdata: {
        slideshowCount: number;
        videoCount: number;
        worksheetCount: number;
        exitTicketTestCount: number;
        quizCount: number;
        assignmentCount: number;
        totalCount: number;
    } = {
        slideshowCount: 0,
        videoCount: 0,
        worksheetCount: 0,
        exitTicketTestCount: 0,
        quizCount: 0,
        assignmentCount: 0,
        totalCount: 0,
    };

    if (data) {
        try {
            const response = await getResourcesCountAPI({
                accessToken: data?.user?.accessToken,
                topic: convertDashesToSpaces(params.topic).toLowerCase(),
            });

            const APIResponse = await response.json();

            if (APIResponse.status !== 'error') {
                APIdata = APIResponse?.data;
                return <TopicType APIdata={APIdata} />;
            }

            if (!response.ok) {
                throw new Error(APIResponse?.message);
            }
        } catch (error: any) {
            return (
                <UnhandledError
                    error={{
                        message: error?.message,
                        name: error?.name,
                    }}
                />
            );
        }
    }
}

export default TopicPage;
