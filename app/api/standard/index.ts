import axios from 'axios';

export const createStandardAPI = async ({
    name,
    description,
    courseLength,
    dailyUploads,
    accessToken,
}: {
    name: string;
    description: string;
    courseLength: string;
    dailyUploads: { resourceId: string; accessDate: string }[];
    accessToken: string;
}) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/standard/createStandard`,
        {
            name,
            description,
            courseLength,
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
    courseLength,
    dailyUploads,
    accessToken,
}: {
    standardId: string;
    name: string;
    description: string;
    courseLength: string;
    dailyUploads: { resourceId: string; accessDate: string }[];
    accessToken: string;
}) => {
    const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/standard/updateStandard`,
        {
            standardId,
            name,
            description,
            courseLength,
            dailyUploads,
            accessToken,
        }
    );

    return response;
};
