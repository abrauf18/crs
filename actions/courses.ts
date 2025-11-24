'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { Course, CourseDetail } from "@/lib/types/course"

export const createCourse = async ({
    name,
    description,
    courseLength,
    price = 0,
}: {
    name: string;
    description: string;
    courseLength: number;
    price?: number;
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
                body: JSON.stringify({
                    name,
                    description,
                    courseLength,
                    price,
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
    try {
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

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(
                errorData.message || `Failed to fetch course: ${res.status}`
            );
        }
        const result = await res.json();
        return result.data as CourseDetail;
    } catch (error) {
        console.error(`Error fetching course ${id}:`, error);
        throw error;
    }
}

export async function updateCourse(data: {
    id: string;
    name: string;
    description: string;
    courseLength: number;
    price?: number;
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
                    price: data.price || 0,
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

export async function deleteCourse(id: string) {
    try {
        const userSession = await getServerSession(options);
        if (!userSession) {
            return { success: false, message: 'Unauthorized' };
        }
        const accessToken = userSession.user?.token;

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${id}`,
            {
                method: 'DELETE',

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
        return {
            success: true,
            message: 'Course deleted successfully',
            ...result,
        };
    } catch (error) {
        return { success: false, message: 'Internal server errro' };
    }
}

export async function deleteResource({
    courseId,
    resourceId,
}: {
    courseId: string;
    resourceId: string;
}) {
    try {
        const userSession = await getServerSession(options);
        if (!userSession) {
            return { success: false, message: 'Unauthorized' };
        }
        const accessToken = userSession.user?.token;

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${courseId}/resource/${resourceId}`,
            {
                method: 'DELETE',

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
        revalidatePath(`/admin/courses/${courseId}`);
        return {
            success: true,
            message: 'Course deleted successfully',
            ...result,
        };
    } catch (error) {
        return { success: false, message: 'Internal server errro' };
    }
}
