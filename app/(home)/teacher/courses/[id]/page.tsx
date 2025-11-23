import React from 'react';
import { notFound } from 'next/navigation';
import { getCourseById } from '@/lib/actions/courses';
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
        const course = await getCourseById(params.id);

        if (!course) {
            notFound();
        }

        return <CourseDetailsContent course={course} />;
    } catch (error) {
        notFound();
    }
}
