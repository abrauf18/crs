import React from 'react';
import { getCourses } from '@/lib/actions/courses';
import { getUserPurchasedCourses } from '@/lib/actions/stripe';
import { Course } from '@/lib/types/course';
import TeacherCourseCard from '@/app/modules/courses/teacher-course-card';
import EnrolledCourseCard from '@/app/modules/courses/enrolled-course-card';

export default async function TeacherCoursesPage() {
    const [coursesResult, purchasedResult] = await Promise.all([
        getCourses(),
        getUserPurchasedCourses(),
    ]);

    if (!coursesResult.success) {
        return (
            <div className="p-6">
                <div className="rounded-2xl border border-red-300 bg-red-50 p-8 text-center">
                    <p className="text-sm font-medium text-red-600">
                        {coursesResult.message || 'Failed to load courses'}
                    </p>
                </div>
            </div>
        );
    }

    const allCourses = (coursesResult.data as Course[]) || [];
    const purchasedCourses = purchasedResult.success
        ? (purchasedResult.data as any[]) || []
        : [];

    const enrolledCourseIds = new Set(
        purchasedCourses.map((p) => p.course?.id).filter(Boolean)
    );

    const enrolledCourses = allCourses.filter((course) =>
        enrolledCourseIds.has(course.id)
    );
    const availableCourses = allCourses.filter(
        (course) => !enrolledCourseIds.has(course.id)
    );

    return (
        <div className="p-6 space-y-8">
            <header>
                <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Browse and explore available courses
                </p>
            </header>

            {enrolledCourses.length > 0 && (
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">
                            My Enrolled Courses ({enrolledCourses.length})
                        </h2>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {enrolledCourses.map((course) => (
                            <EnrolledCourseCard
                                key={course.id}
                                course={course}
                            />
                        ))}
                    </div>
                </section>
            )}

            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Available Courses ({availableCourses.length})
                    </h2>
                </div>

                {availableCourses.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {availableCourses.map((course) => (
                            <TeacherCourseCard key={course.id} course={course} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
                        <p className="text-sm font-medium text-gray-600">
                            No more courses available. You are enrolled in all
                            courses!
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}
