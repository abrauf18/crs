'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { options } from '@/app/api/auth/[...nextauth]/options';

export const buyCourse = async ({
    courseId,
    discount,
}: {
    courseId: string;
    discount?: number;
}) => {
    try {
        const userSession = await getServerSession(options);
        if (!userSession) {
            return {
                success: false,
                message: 'Unauthorized',
            };
        }
        const accessToken = userSession.user?.token;

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/purchase-courses`,
            {
                method: 'POST',
                body: JSON.stringify({ courseId, discount }),
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

export const enrollFreeCourse = async ({ courseId }: { courseId: string }) => {
    try {
        const userSession = await getServerSession(options);
        if (!userSession) {
            return {
                success: false,
                message: 'Unauthorized',
            };
        }
        const accessToken = userSession.user?.token;
        const userId = userSession.user?.id;

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/purchase-courses/enroll-free`,
            {
                method: 'POST',
                body: JSON.stringify({ courseId, userId }),
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
        revalidatePath('/teacher/courses');
        return { ...result, success: true };
    } catch (error) {
        return { success: false, message: 'Internal server error' };
    }
};

export const checkCoursePurchase = async (courseId: string) => {
    try {
        const userSession = await getServerSession(options);
        if (!userSession) {
            return {
                success: false,
                message: 'Unauthorized',
            };
        }
        const accessToken = userSession.user?.token;

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/purchase-courses/check-purchase/${courseId}`,
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

export const getUserPurchasedCourses = async (userId?: string) => {
    try {
        const userSession = await getServerSession(options);
        if (!userSession) {
            return {
                success: false,
                message: 'Unauthorized',
            };
        }
        const accessToken = userSession.user?.token;

        const queryParam = userId ? `?userId=${userId}` : '';
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/purchase-courses${queryParam}`,
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
