import axios from 'axios';

export const getStudentCurrentStandardsAPI = async ({
    accessToken,
    studentId,
}: {
    accessToken: string;
    studentId: string;
}) => {
    const result = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/student/getStudentCurrentStandards`,
        {
            headers: {
                accesstoken: accessToken,
                studentid: studentId,
            },
            next: {
                tags: ['getStudentCurrentStandards'],
            },
        }
    );

    return result;
};

export const getStudentStandardAPI = async ({
    accessToken,
    standardId,
    studentId,
}: {
    accessToken: string;
    standardId: string;
    studentId: string;
}) => {
    const result = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/student/getStudentStandard`,
        {
            headers: {
                accesstoken: accessToken,
                standardid: standardId,
                studentid: studentId,
            },
            next: {
                tags: ['getStudentStandard'],
            },
        }
    );

    return result;
};

export const getStudentVideoAPI = async ({
    accessToken,
    videoId,
    studentId,
}: {
    accessToken: string;
    videoId: string;
    studentId: string;
}) => {
    const result = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/student/getStudentVideo`,
        {
            headers: {
                accesstoken: accessToken,
                videoid: videoId,
                studentid: studentId,
            },
            next: {
                tags: ['getStudentVideo'],
            },
        }
    );

    return result;
};

export const UpdateStudentVideoCompletedAPI = async ({
    accessToken,
    studentId,
    videoId,
    lastSeenTime,
    watchedCompletely,
}: {
    accessToken: string;
    studentId: string;
    videoId: string;
    lastSeenTime: string;
    watchedCompletely: boolean;
}) => {
    const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/student/UpdateStudentVideoCompleted`,
        {
            accessToken,
            studentId,
            videoId,
            last_seen_time: lastSeenTime,
            watchedCompletely,
        }
    );

    return result;
};

export const UpdateStudentVideoLastSeenTime = async ({
    accessToken,
    studentId,
    videoId,
    lastSeenTime,
}: {
    accessToken: string;
    studentId: string;
    videoId: string;
    lastSeenTime: string;
}) => {
    const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/student/UpdateStudentVideoLastSeenTime`,
        {
            accessToken,
            studentId,
            videoId,
            last_seen_time: lastSeenTime,
        }
    );

    return result;
};

export const createVideoQuestionAnswerAPI = async ({
    accessToken,
    userId,
    questionId,
    answer,
}: {
    accessToken: string;
    userId: string;
    questionId: string;
    answer: string;
}) => {
    const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/videoQuestionAnswer/createVideoQuestionAnswer`,
        {
            accessToken,
            userId,
            questionId,
            answer,
        }
    );

    return result;
};

export const getSavedVideosAPI = async ({
    accessToken,
    studentId,
}: {
    accessToken: string;
    studentId: string;
}) => {
    const result = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/student/getSavedVideos`,
        {
            headers: {
                accesstoken: accessToken,
                studentid: studentId,
            },
            next: {
                tags: ['getSavedVideos'],
            },
        }
    );

    return result;
};

export const SaveOrRemoveVideoAPI = async ({
    accessToken,
    studentId,
    videoId,
    save,
}: {
    accessToken: string;
    studentId: string;
    videoId: string;
    save: boolean;
}) => {
    const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/student/SaveOrRemoveVideo`,
        {
            accessToken,
            studentId,
            videoId,
            save,
        }
    );

    return result;
};
