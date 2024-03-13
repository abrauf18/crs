import axios from 'axios';

export const getSchoolProfileAPI = async (accessToken: string) => {
    const result = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/school/getSchoolProfile`,
        {
            headers: {
                accesstoken: accessToken,
            },
        }
    );

    return result;
};

export const updateSchoolProfileAPI = async (
    accessToken: string,
    name: string,
    numOfClasses: number,
    classesStart: number,
    classesEnd: number
) => {
    const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/school/updateSchoolProfile`,
        {
            accessToken,
            name,
            numOfClasses,
            classesStart,
            classesEnd,
        }
    );

    return result;
};
