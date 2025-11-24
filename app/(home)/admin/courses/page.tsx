import React from 'react';

import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import CreateCourseModal from '@/app/modules/courses/create-course-modal';
import CourseCard from '@/app/modules/courses/course-card';
import { getCourses } from '@/lib/actions/courses';
import { Course } from '@/lib/types/course';

export default async function CoursesPage() {
    const result = await getCourses();

    if (!result.success) {
        throw new Error(result.message);
    }

    const courses = (result.data as Course[]) || [];

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex-1 min-w-[240px]">
                    <Label htmlFor="course-search" className="sr-only">
                        Search courses
                    </Label>
                    <Input id="course-search" placeholder="Search courses..." />
                </div>

                <CreateCourseModal />
            </div>

            <section className="space-y-4">
                <header className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Courses ({courses.length})
                    </h2>
                </header>

                {courses.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {courses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
                        <p className="text-sm font-medium text-gray-600">
                            No courses found. Create your first course to get
                            started.
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}
