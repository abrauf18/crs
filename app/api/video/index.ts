import axios from 'axios';

export const getVideosAPI = async ({
    accessToken,
    topic = '',
    type = '',
    page = 1,
    limit = 10,
    orderBy = '',
    sortBy = '',
}: {
    accessToken: string;
    topic: string;
    type: string;
    page: number;
    limit: number;
    orderBy: string;
    sortBy: string;
}) => {
    const result = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/video/getAllVideos`,
        {
            headers: {
                accesstoken: accessToken,
            },
            next: {
                tags: ['getVideos'],
            },
        }
    );

    return result;
};

export const createVideoQuestionsAPI = async ({
    videoId,
    statement,
    options,
    correctOption,
    correctOptionExplanation,
    totalMarks = 0,
    popupTime,
    accessToken,
}: {
    videoId: string;
    statement: string;
    options: { [key: string]: string }[];
    correctOption: string;
    correctOptionExplanation: string;
    totalMarks: number;
    popupTime: string;
    accessToken: string;
}) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/question/createVideoQuestions`,
        {
            videoId,
            statement,
            options,
            correctOption,
            correctOptionExplanation,
            totalMarks,
            popupTime,
            accessToken,
        }
    );

    return response;
};
