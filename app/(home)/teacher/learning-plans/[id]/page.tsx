import React from 'react';
import { Session, getServerSession } from 'next-auth';
import Topics from '@/app/modules/standard/Topic';
import { getStandardTopicsAPI } from '@/app/api/standard';
import { options } from '@/app/api/auth/[...nextauth]/options';
import UnhandledError from '@/app/modules/error/UnhandledError';

interface TopicResourceCount {
    topicName: string;
    videoCount: number;
    nonVideoCount: number;
}

interface APIData {
    name: string;
    totalTopics: number;
    topicResourceCounts: TopicResourceCount[];
}

const DEFAULT_STANDARD = {
    name: '',
    totalTopics: 0,
    topicResourceCounts: [],
};
async function DetailsPage({ params }: { params: { id: string } }) {
    const data: Session | null = await getServerSession(options);

    let APIdata: APIData = DEFAULT_STANDARD;

    if (data) {
        try {
            const response = await getStandardTopicsAPI({
                accessToken: data?.user?.accessToken,
                standardId: params.id,
            });

            const APIResponse = await response.json();

            if (APIResponse.status !== 'error') {
                APIdata = APIResponse?.data;
                const { name, totalTopics, topicResourceCounts } = APIdata;
                return (
                    <Topics
                        isShownFromTeacher
                        topicsCount={totalTopics}
                        allTopics={topicResourceCounts}
                        standardName={name}
                        standardId={params.id}
                    />
                );
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

export default DetailsPage;
