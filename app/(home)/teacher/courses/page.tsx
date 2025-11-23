import React from 'react';
import { getCourses } from '@/lib/actions/courses';
import { Course } from '@/lib/types/course';
import TeacherCourseCard from '@/app/modules/courses/teacher-course-card';

export default async function TeacherCoursesPage() {
    const result = await getCourses();

    if (!result.success) {
        return (
            <div className="p-6">
                <div className="rounded-2xl border border-red-300 bg-red-50 p-8 text-center">
                    <p className="text-sm font-medium text-red-600">
                        {result.message || 'Failed to load courses'}
                    </p>
                </div>
            </div>
        );
    }

    const courses = (result.data as Course[]) || [];

    return (
        <div className="p-6 space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Browse and explore available courses
                </p>
            </header>

            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Available Courses ({courses.length})
                    </h2>
                </div>

                {courses.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {courses.map((course) => (
                            <TeacherCourseCard key={course.id} course={course} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
                        <p className="text-sm font-medium text-gray-600">
                            No courses available at the moment.
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}
