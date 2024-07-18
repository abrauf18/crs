import axios from 'axios';

export const createStandardAPI = async ({
    name,
    description,
    dailyUploads,
    accessToken,
}: {
    name: string;
    description: string;
    dailyUploads: {
        resourceId: string;
        accessDate: string;
        weightage: number;
    }[];
    accessToken: string;
}) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/standard/createStandard`,
        {
            name,
            description,
            dailyUploads,
            accessToken,
        }
    );

    return response;
};

export const getStandardAPI = async ({
    accessToken,
    standardId,
}: {
    accessToken: string;
    standardId: string;
}) => {
    const result = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/standard/getStandard`,
        {
            headers: {
                accesstoken: accessToken,
                standardid: standardId,
            },
            next: {
                tags: ['getStandard'],
            },
        }
    );

    return result;
};

export const updateStandardAPI = async ({
    standardId,
    name,
    description,
    dailyUploads,
    accessToken,
}: {
    standardId: string;
    name: string;
    description: string;
    dailyUploads: {
        resourceId: string;
        accessDate: string;
        weightage: number;
    }[];
    accessToken: string;
}) => {
    const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/standard/updateStandard`,
        {
            standardId,
            name,
            description,
            dailyUploads,
            accessToken,
        }
    );

    return response;
};

export const getAllSummarizedStandardsAPI = async ({
    accessToken,
}: {
    accessToken: string;
}) => {
    const result = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/standard/getAllSummarizedStandards`,
        {
            headers: {
                accesstoken: accessToken,
            },
            next: {
                tags: ['getAllSummarizedStandards'],
            },
        }
    );

    return result;
};

export const getSummarizedStandardAPI = async ({
    accessToken,
    standardId,
}: {
    accessToken: string;
    standardId: string;
}) => {
    const result = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/standard/getSummarizedStandard`,
        {
            headers: {
                accesstoken: accessToken,
                standardid: standardId,
            },
            next: {
                tags: ['getSummarizedStandard'],
            },
        }
    );

    return result;
};

export const getStandardTopicsAPI = async ({
    accessToken,
    standardId,
}: {
    accessToken: string;
    standardId: string;
}) => {
    const result = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/standard/getStandardTopics`,
        {
            headers: {
                accesstoken: accessToken,
                standardid: standardId,
            },
            next: {
                tags: ['getStandardTopics'],
            },
        }
    );

    return result;
};
