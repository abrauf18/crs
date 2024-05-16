import axios from 'axios';

export const getAllClassroomsOfTeacherAPI = async ({
    accessToken,
    teacherId,
}: {
    accessToken: string;
    teacherId: string;
}) => {
    const result = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/classroom/getAllClassroomsOfTeacher`,
        {
            headers: {
                accesstoken: accessToken,
                teacherid: teacherId,
            },
            next: {
                tags: ['getAllClassroomsOfTeacher'],
            },
        }
    );

    return result;
};

export const assignStandardToClassroomsAPI = async ({
    accessToken,
    standardId,
    classroomIds,
}: {
    accessToken: string;
    standardId: string;
    classroomIds: string[];
}) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/classroom/assignStandardToClassrooms`,
        {
            accessToken,
            standardId,
            classroomIds,
        }
    );

    return response;
};
