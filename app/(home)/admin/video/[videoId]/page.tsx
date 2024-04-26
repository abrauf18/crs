import React from 'react';
import { Session, getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import UnhandledError from '@/app/modules/error/UnhandledError';
import { DEFAULT_VIDEO, Video } from '@/lib/utils';
import { getVideoAPI } from '@/app/api/video';

async function VideoDetailsPage({ params }: { params: { videoId: string } }) {
    const data: Session | null = await getServerSession(options);

    let APIdata: { video: Video } = {
        video: {
            ...DEFAULT_VIDEO,
        },
    };

    if (data) {
        try {
            const response = await getVideoAPI({
                accessToken: data?.user?.accessToken,
                videoId: params.videoId,
            });

            const APIResponse = await response.json();

            if (APIResponse.status !== 'error') {
                APIdata = APIResponse?.data;
                // console.log(APIResponse);
                return null;
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
