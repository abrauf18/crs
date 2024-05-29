import React from 'react';
import { Session, getServerSession } from 'next-auth';
import { getResourceAPI } from '@/app/api/resource';
import { options } from '@/app/api/auth/[...nextauth]/options';
import UnhandledError from '@/app/modules/error/UnhandledError';
import { Resource, ResourceType, Video } from '@/lib/utils';
import FileViewing from '@/app/components/common/FileViewing';
import VideoViewing from '@/app/components/common/VideoViewing';
import { getStudentVideoAPI } from '@/app/api/student';
import StudentVideo from '@/app/components/common/StudentVideo';

async function ResourceDetailsPage({
    params,
}: {
    params: { resourceType: string; contentId: string };
}) {
    const data: Session | null = await getServerSession(options);

    if (data) {
        try {
            let response = null;

            if (params.resourceType === ResourceType.VIDEO) {
                response = await getStudentVideoAPI({
                    accessToken: data?.user?.accessToken,
                    studentId: data?.user?.id,
                    videoId: params.contentId,
                });
            } else {
                response = await getResourceAPI({
                    accessToken: data?.user?.accessToken,
                    resourceId: params.contentId,
                });
            }
            const APIResponse = await response.json();
            if (!response.ok || APIResponse.status === 'error') {
                throw new Error(APIResponse?.message);
            }

            if (params.resourceType === ResourceType.VIDEO) {
                const APIdata: { video: Video } = APIResponse?.data;
                const {
                    name,
                    videoUrl,
                    thumbnailURL,
                    topics,
                    questions,
                    lastSeenTime,
                } = APIdata.video;
                return (
                    <StudentVideo
                        headerText={name}
                        videoURL={videoUrl}
                        thumbnailURL={thumbnailURL}
                        topics={topics}
                        questions={questions}
                        lastSeenTime={lastSeenTime ?? '00:00:00'}
                    />
                );
            }
            const APIdata: Resource = APIResponse?.data;
            return (
                <FileViewing
                    resourceURL={APIdata.url ?? ''}
                    type={APIdata.type}
                />
            );
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

export default ResourceDetailsPage;
