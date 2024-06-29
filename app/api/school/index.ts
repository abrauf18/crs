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

export const getAllSchoolsAPI = async (accessToken: string) => {
    const reuslt = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/school/getAllSchools`,
        {
            headers: {
                accesstoken: accessToken,
            },
        }
    );
    return reuslt;
};

export const createSchoolAPI = async (
    token: string,
    name: string,
    email: string,
    schoolName: string,
    password: string
) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/school/create-school/${token}`,
            {
                method: 'POST', // Specify the HTTP method
                headers: {
                    'Content-Type': 'application/json', // Ensure the data is sent as JSON
                },
                body: JSON.stringify({
                    name,
                    email,
                    schoolName,
                    password,
                }),
            }
        );

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error creating school:', error);
        throw new Error('Failed to create school');
    }
};
