import axios from 'axios';

export const getAssessmentAnswerToCreateOrEditAPI = async ({
    accessToken,
    userId,
    resourceId,
}: {
    accessToken: string;
    userId: string;
    resourceId: string;
}) => {
    const result = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/assessmentAnswer/getAssessmentAnswerToCreateOrEdit`,
        {
            headers: {
                accesstoken: accessToken,
                userid: userId,
                resourceid: resourceId,
            },
            next: {
                tags: ['getAssessmentAnswerToCreateOrEdit'],
            },
        }
    );

    return result;
};

export const createAssessmentAnswerAPI = async ({
    accessToken,
    userId,
    resourceId,
    answerURL,
}: {
    accessToken: string;
    userId: string;
    resourceId: string;
    answerURL: string;
}) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/assessmentAnswer/createAssessmentAnswer`,
        {
            accessToken,
            userId,
            resourceId,
            answerURL,
        }
    );

    return response;
};
