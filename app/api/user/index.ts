import axios from 'axios';
// import { getServerSession } from 'next-auth';
// import { options } from '@/app/api/auth/[...nextauth]/options';

export const getUserProfileAPI = async (accessToken: string) => {
    // const session = await getServerSession(options);
    const result = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/getUserProfile`,
        {
            headers: {
                accesstoken: accessToken, // session?.user.accessToken,
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
    // const session = await getServerSession(options);
    // console.log(accessToken, image, name, email, password);
    const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/updateUserProfile`,
        {
            accessToken, // session?.user.accessToken,
            image,
            name,
            email,
            password,
        }
    );

    return result;
};
