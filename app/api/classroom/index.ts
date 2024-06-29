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

export const getClassroomStudentsAPI = async ({
    accessToken,
    classroomId,
    page,
    limit,
}: {
    accessToken: string;
    classroomId: string;
    page: number;
    limit: number;
}) => {
    const result = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/classroom/getClassroomStudents`,
        {
            headers: {
                accesstoken: accessToken,
                classroomid: classroomId,
                page: page.toString(),
                limit: limit.toString(),
            },
            next: {
                tags: ['getClassroomStudents'],
            },
        }
    );

    return result;
};

export const removeStudentFromClassroomAPI = async ({
    accessToken,
    classroomStudentId,
}: {
    accessToken: string;
    classroomStudentId: string;
}) => {
    const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/classroom/removeStudentFromClassroom`,
        {
            headers: {
                accesstoken: accessToken,
                classroomstudentid: classroomStudentId,
            },
        }
    );

    return response;
};

export const updateClassroomStudentAPI = async ({
    accessToken,
    name,
    email,
    image,
    classroomId,
    studentId,
}: {
    accessToken: string;
    name: string;
    email: string;
    image: string;
    classroomId: string;
    studentId: string;
}) => {
    const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/classroom/updateClassroomStudent`,
        {
            accessToken,
            name,
            email,
            image,
            classroomId,
            studentId,
        }
    );

    return response;
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

export const addStudentToClassroomAPI = async ({
    accessToken,
    email,
    classroomId,
}: {
    accessToken: string;
    email: string;
    classroomId: string;
}) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/classroom/addStudentToClassroom`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                accessToken,
                email,
                classroomId,
            }),
        }
    );

    const result = await response.json();
    return result;
};
