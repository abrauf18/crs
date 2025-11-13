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
    classCourses,
}: {
    accessToken: string;
    standardId: string;
    classCourses: {
        classroomId: string;
        startDate: string;
    }[];
}) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/classroom/assignStandardToClassrooms`,
        {
            accessToken,
            standardId,
            classCourses,
        }
    );

    return response;
};

export const getClassesAndCoursesAPI = async ({
    accessToken,
    teacherId,
}: {
    accessToken: string;
    teacherId: string;
}) => {
    const result = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/classroom/getClassesAndCourses`,
        {
            headers: {
                accesstoken: accessToken,
                teacherid: teacherId,
            },
            next: {
                tags: ['getClassesAndCourses'],
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/classroom/deleteClassCourse`,
        {
            headers: {
                accesstoken: accessToken,
                classroomcourseid: classroomCourseId,
            },
        }
    );

    return response;
};

export const getSummarizedClassroomsOfTeacherAPI = async ({
    accessToken,
    teacherId,
}: {
    accessToken: string;
    teacherId: string;
}) => {
    const result = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/classroom/getSummarizedClassroomsOfTeacher`,
        {
            headers: {
                accesstoken: accessToken,
                teacherid: teacherId,
            },
            next: {
                tags: ['getSummarizedClassroomsOfTeacher'],
            },
        }
    );

    return result;
};


export const createClassroomAPI = async ({
    accessToken,
    name,
    teacherId,
    schoolId,
}: {
    accessToken: string;
    name: string;
    teacherId: string;
    schoolId: string;
}) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/classroom/createClassroom`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                accessToken,
                name,
                teacherId,
                schoolId,
            }),
        }
    );

    const result = await response.json();
    return result;
};

export const updateTeacherClassroomsAPI = async ({
    accessToken,
    schoolId,
    teacherId,
    classroomIds,
}: {
    accessToken: string;
    schoolId: string;
    teacherId: string;
    classroomIds: string[];
}) => {
    const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/classroom/updateTeacherClassrooms`,
        {
            accessToken,
            schoolId,
            teacherId,
            classroomIds,
        }
    );

    return response;
};

export const changeClassStatusAPI = async ({
    accessToken,
    status,
    classroomId,
    schoolId,
}: {
    accessToken: string;
    status: string;
    classroomId: string;
    schoolId: string;
}) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/classroom/changeClassStatus`,
        {
            accessToken,
            status,
            classroomId,
            schoolId,
        }
    );

    return response;
};

export const getSchoolClassroomsAPI = async ({
    accessToken,
    schoolId,
    page,
    limit,
    search,
}: {
    accessToken: string;
    schoolId: string;
    page: number;
    limit: number;
    search: string;
}) => {
    const result = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/classroom/getSchoolClassrooms`,
        {
            headers: {
                accesstoken: accessToken,
                schoolid: schoolId,
                page: page.toString(),
                limit: limit.toString(),
                search,
            },
            next: {
                tags: ['getSchoolClassrooms'],
            },
        }
    );

    return result;
};
