import React from 'react';
import { notFound } from 'next/navigation';
import { getCourseById } from '@/actions/courses';
import { checkCoursePurchase } from '@/actions/stripe';
import CourseDetailsContent from '@/components/modules/courses/course-details-content';

type CourseDetailsPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function CourseDetailsPage({
    params,
}: CourseDetailsPageProps) {
    const id = (await params).id
    try {
        const [course, purchaseStatus] = await Promise.all([
            getCourseById(id),
            checkCoursePurchase(id),
        ]);

        if (!course) {
            notFound();
        }

        const isEnrolled =
            purchaseStatus.success &&
            purchaseStatus.data?.hasPurchased === true;

        // Ensure resources array exists, even if empty
        const normalizedCourse = {
            ...course,
            resources: course.resources || [],
            description: course.description || '',
            courseLength: course.courseLength || '0',
            price: course.price || '0.00',
        };

        return (
            <CourseDetailsContent
                course={normalizedCourse}
                isEnrolled={isEnrolled}
            />
        );
    } catch (error) {
        console.error('Error loading course:', error);
        notFound();
    }
}
