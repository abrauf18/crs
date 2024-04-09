import axios from 'axios';

export const getUserProfileAPI = async (accessToken: string) => {
    const result = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/getUserProfile`,
        {
            headers: {
                accesstoken: accessToken,
            },
        }
    );

    return result;
};

export const updateUserProfileAPI = async (
    accessToken: string,
    image: string,
    name: string,
    email: string,
    password: string
) => {
    const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/updateUserProfile`,
        {
            accessToken,
            image,
            name,
            email,
            password,
        }
    );

    return result;
};

export const getAllUsersProfileAPI = async (accessToken: string) => {
    const result = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/getAllUsersProfile`,
        {
            headers: {
                accesstoken: accessToken,
            },
        }
    );

    return result;
};

export const updateAnotherUserProfileAPI = async (
    accessToken: string,
    image: string,
    name: string,
    email: string,
    userId: string,
    role: string
) => {
    const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/updateAnotherUsersProfile`,
        {
            accessToken,
            image,
            name,
            email,
            userId,
            role,
        }
    );

    return result;
};