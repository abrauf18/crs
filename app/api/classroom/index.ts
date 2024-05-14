import axios from 'axios';

export const getAllClassroomsOfTeacherAPI = async ({
    accessToken,
}: {
    accessToken: string;
}) => {
    const result = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/classroom/getAllClassroomsOfTeacher`,
        {
            headers: {
                accesstoken: accessToken,
            },
            next: {
                tags: ['getAllClassroomsOfTeacher'],
            },
        }
    );

    return result;
};
