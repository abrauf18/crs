import React from 'react';
import { notFound } from 'next/navigation';
import { getCourseById } from '@/lib/actions/courses';
import { checkCoursePurchase } from '@/lib/actions/stripe';
import CourseDetailsContent from '@/app/modules/courses/course-details-content';

type CourseDetailsPageProps = {
    params: {
        id: string;
    };
};

export default async function CourseDetailsPage({
    params,
}: CourseDetailsPageProps) {
    try {
        const [course, purchaseStatus] = await Promise.all([
            getCourseById(params.id),
            checkCoursePurchase(params.id),
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
