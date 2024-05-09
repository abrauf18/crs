import React from 'react';
import { Session, getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import UnhandledError from '@/app/modules/error/UnhandledError';
import { getStandardAPI } from '@/app/api/standard';
import { ResourceType } from '@/lib/utils';

interface Resource {
    id: string;
    name: string;
    type: string;
}

interface DailyUpload {
    accessDate: string;
    resources: Resource[];
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
            accessDate: '',
            resources: [
                {
                    id: '',
                    name: '',
                    type: ResourceType.VIDEO,
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
                return console.log(name, description, dailyUploads);
            }

            if (!response.ok) {
                throw new Error(APIResponse?.message);
            }
        } catch (error: any) {
            return (
                <UnhandledError
                    error={{
                        message:
                            error?.message !== 'Token expired, please signin'
                                ? 'Can Not Find The Resource'
                                : error?.message,
                        name: error?.name,
                    }}
                />
            );
        }
    }
}

export default VideoDetailsPage;
