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

export const updateSchoolAndUserProfile = async (
    accessToken: string,
    image: string,
    username: string,
    email: string,
    password: string,
    schoolName: string,
    numOfClasses: number,
    classesStart: number,
    classesEnd: number
) => {
    const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/school/updateSchoolAndUserProfile`,
        {
            accessToken,
            image,
            username,
            email,
            password,
            schoolName,
            numOfClasses,
            classesStart,
            classesEnd,
        }
    );

    return result;
};
