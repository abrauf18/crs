import React from 'react';
import { Session, getServerSession } from 'next-auth';
import { ResourceType } from '@/lib/utils';
import { getStandardAPI } from '@/app/api/standard';
import { options } from '@/app/api/auth/[...nextauth]/options';
import UnhandledError from '@/app/modules/error/UnhandledError';
import CreateStandard from '@/app/modules/standard/createStandard/CreateStandard';

interface Topic {
    resourceId: string;
    type: ResourceType;
    name: string;
    weightage: number;
}
interface DailyUpload {
    date: string;
    topics: Topic[];
}
interface APIData {
    name: string;
    description: string;
    dailyUploads: DailyUpload[];
}

const DEFAULT_STANDARD = {
    name: '',
    description: '',
    dailyUploads: [
        {
            date: '',
            topics: [
                {
                    resourceId: '',
                    type: ResourceType.VIDEO,
                    name: '',
                    weightage: 0,
                },
            ],
        },
    ],
};

async function VideoDetailsPage({ params }: { params: { id: string } }) {
    const data: Session | null = await getServerSession(options);

    let APIdata: APIData = DEFAULT_STANDARD;

    if (data) {
        try {
            const response = await getStandardAPI({
                accessToken: data?.user?.accessToken,
                standardId: params.id,
            });

            const APIResponse = await response.json();

            if (APIResponse.status !== 'error') {
                APIdata = APIResponse?.data;
                const { name, description, dailyUploads } = APIdata;
                return (
                    <CreateStandard
                        standardId={params.id}
                        name={name}
                        description={description}
                        dailyUploads={dailyUploads}
                        update
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

export default VideoDetailsPage;
