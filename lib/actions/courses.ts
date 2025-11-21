'use server';

import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { Course, CourseDetail, Resource } from '../types/course';

export const createCourse = async ({
    name,
    description,
    courseLength,
}: {
    name: string;
    description: string;
    courseLength: number;
}) => {
    try {
        const userSession = await getServerSession(options);
        if (!userSession) {
            throw new Error('Unauthorized');
        }
        const accessToken = userSession.user?.token;

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/courses`,
            {
                method: 'POST',
                body: JSON.stringify({ name, description, courseLength }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        const result = await response.json();
        if (!response.ok) {
            return {
                success: false,
                message: result.message || 'Something went wrong',
            };
        }
        revalidatePath('/admin/courses');
        return { ...result, success: true };
    } catch (error) {
        return { success: false, message: 'Internal server errro' };
    }
};

export const getCourses = async () => {
    try {
        const userSession = await getServerSession(options);
        if (!userSession) {
            throw new Error('Unauthorized');
        }
        const accessToken = userSession.user?.token;

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/courses`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        const result = await response.json();
        if (!response.ok) {
            return {
                success: false,
                message: result.message || 'Something went wrong',
            };
        }
        return { ...result, success: true };
    } catch (error) {
        return { success: false, message: 'Internal server error' };
    }
};

export async function getCourseById(id: string) {
    const userSession = await getServerSession(options);
    if (!userSession) {
        throw new Error('Unauthorized');
    }
    const accessToken = userSession.user?.token;
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    if (!res.ok) throw new Error('Failed to fetch course');
    const result = await res.json();
    return result.data as CourseDetail;
}

export async function updateCourse(data: {
    id: string;
    name: string;
    description: string;
    courseLength: number;
}) {
    try {
        const userSession = await getServerSession(options);
        if (!userSession) {
            return { success: false, message: 'Unauthorized' };
        }
        const accessToken = userSession.user?.token;

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${data.id}`,
            {
                method: 'PUT',
                body: JSON.stringify({
                    name: data.name,
                    description: data.description,
                    courseLength: data.courseLength,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        const result = await response.json();
        if (!response.ok) {
            return {
                success: false,
                message: result.message || 'Something went wrong',
            };
        }
        revalidatePath('/admin/courses');
        return { ...result, success: true };
    } catch (error) {
        return { success: false, message: 'Internal server errro' };
    }
}
