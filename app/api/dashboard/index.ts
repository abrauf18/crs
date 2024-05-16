
import axios from 'axios';

export const getTeacherDashboardClassroomsOverviewAPI = async ({
    accessToken,
    teacherId,
}: {
    accessToken: string;
    teacherId: string;
}) => {
    const result = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/getTeacherDashboardClassroomsOverview`,
        {
            headers: {
                accesstoken: accessToken,
                teacherid: teacherId,
            },
            next: {
                tags: ['getTeacherDashboardClassroomsOverview'],
            },
        }
    );

    return result;
};

export const getTeacherDashboardStandardsOverviewAPI = async ({
    accessToken,
    teacherId,
}: {
    accessToken: string;
    teacherId: string;
}) => {
    const result = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/getTeacherDashboardStandardsOverview`,
        {
            headers: {
                accesstoken: accessToken,
                teacherid: teacherId,
            },
            next: {
                tags: ['getTeacherDashboardStandardsOverview'],
            },
        }
    );

    return result;
};

export const deleteClassCourseAPI = async ({
    accessToken,
    classroomCourseId,
}: {
    accessToken: string;
    classroomCourseId: string;
}) => {
    const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/deleteClassCourse`,
        {
            headers: {
                accesstoken: accessToken,
                classroomcourseid: classroomCourseId,
            },
        }
    );

    return response;
};
