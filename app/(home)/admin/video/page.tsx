import React from 'react';
import { redirect } from 'next/navigation';
import { Session, getServerSession } from 'next-auth';
import { VideoSummary } from '@/lib/utils';
import Video from '@/app/modules/video/Video';
import { getVideosAPI } from '@/app/api/video';
import UnhandledError from '@/app/modules/error/UnhandledError';
import { options } from '@/app/api/auth/[...nextauth]/options';

async function VideoPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) {
    const { page = '1', orderBy = '', sortBy = '' } = searchParams;

    if (
        !(orderBy === 'name' || orderBy === 'createdAt' || orderBy === '') ||
        !(sortBy === 'asc' || sortBy === 'desc' || sortBy === '')
    ) {
        return redirect('video');
    }
    const data: Session | null = await getServerSession(options);

    let APIdata: {
        videos: VideoSummary[];
        totalVideos: number;
    } = {
        videos: [],
        totalVideos: 0,
    };

    if (data) {
        try {
            const response = await getVideosAPI({
                accessToken: data?.user?.accessToken,
                topic: '',
                type: '',
                page: parseInt(page, 10),
                limit: 10,
                orderBy,
                sortBy,
            });

            const APIResponse = await response.json();

            if (APIResponse.status !== 'error') {
                APIdata = APIResponse?.data;
                return <Video APIdata={APIdata} />;
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

export default VideoPage;
