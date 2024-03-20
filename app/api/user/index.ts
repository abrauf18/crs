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
