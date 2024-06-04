import axios from 'axios';

export const getAssessmentAnswerAPI = async ({
    accessToken,
    assessmentAnswerId,
}: {
    accessToken: string;
    assessmentAnswerId: string;
}) => {
    const result = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/assessmentAnswer/getAssessmentAnswer`,
        {
            headers: {
                accesstoken: accessToken,
                assessmentanswerid: assessmentAnswerId,
            },
            next: {
                tags: ['getAssessmentAnswer'],
            },
        }
    );

    return result;
};

export const createAssessmentAnswerAPI = async ({
    accessToken,
    userId,
    assessmentResourcesDetailId,
    answerURL,
}: {
    accessToken: string;
    userId: string;
    assessmentResourcesDetailId: string;
    answerURL: string;
}) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/assessmentAnswer/createAssessmentAnswer`,
        {
            accessToken,
            userId,
            assessmentResourcesDetailId,
            answerURL,
        }
    );

    return response;
};
