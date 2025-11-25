import React from 'react';
import CoursesClient from './CoursesClient';
import { getCourses } from '@/actions/courses';
import { Course } from '@/lib/types/course';

export default async function CoursesPage() {
    const result = await getCourses();

    if (!result.success) {
        throw new Error(result.message);
    }

    const courses = (result.data as Course[]) || [];

    return <CoursesClient initialCourses={courses} />;
}
