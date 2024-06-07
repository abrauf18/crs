import React from 'react';
import { Metadata } from 'next';
import { Session, getServerSession } from 'next-auth';
import { getSavedVideosAPI } from '@/app/api/student';
import { options } from '@/app/api/auth/[...nextauth]/options';
import UnhandledError from '@/app/modules/error/UnhandledError';
import SavedVideos from '@/app/modules/saved-videos/SavedVideos';

export const metadata: Metadata = {
    title: 'Saved Videos',
    description: 'Your All Saved Videos',
};

type Video = {
    videoId: string;
    name: string;
    lastSeenTime: string;
    thumbnailURL: string;
    duration: string;
    questionCount: number;
    topicCount: number;
    accessDate: string;
    completed: boolean;
    standardId: string;
};

type VideoData = {
    date: string;
    videos: Video[];
};

async function SavedVideosPage() {
    const data: Session | null = await getServerSession(options);

    if (data) {
        try {
            const response = await getSavedVideosAPI({
                accessToken: data?.user?.accessToken,
                studentId: data?.user?.id,
            });

            const APIResponse = await response.json();

            if (APIResponse.status !== 'error') {
                const APIdata: VideoData[] = APIResponse?.data;
                return <SavedVideos SavedVideosByDays={APIdata} />;
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

export default SavedVideosPage;
