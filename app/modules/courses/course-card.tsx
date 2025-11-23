import { Eye, Pencil } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Course } from '@/lib/types/course';
import AddResourceModal from './add-resource-modal';
import CreateCourseModal from './create-course-modal';

type CourseCardProps = {
    course: Course;
};

export default function CourseCard({ course }: CourseCardProps) {
    const courseLength = Number(course.courseLength);

    const formattedCourseLength = Number.isNaN(courseLength)
        ? '—'
        : `${courseLength} min`;
    const formattedPrice =
        course.price === undefined || course.price === null
            ? '—'
            : `$${parseFloat(course.price).toFixed(2)}`;
    const createdAt = course.createdAt
        ? new Date(course.createdAt).toLocaleDateString()
        : '—';

    return (
        <article className="flex h-full flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        {course.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {course.description || 'No description provided yet.'}
                    </p>
                </div>
                <div className="flex items-center gap-x-2">
                    <Link href={`/admin/courses/${course.id}`}>
                        <Eye
                            className="h-4 w-4"
                            aria-label={`View ${course.name}`}
                        />
                    </Link>

                    <CreateCourseModal
                        trigger={
                            <Pencil
                                className="h-3 w-3 cursor-pointer"
                                aria-label={`Edit ${course.name}`}
                            />
                        }
                        defaultData={course}
                    />
                </div>
            </div>

            <dl className="grid gap-3 text-sm text-gray-600 sm:grid-cols-3">
                <div>
                    <dt className="text-xs uppercase tracking-wide text-gray-400">
                        Length
                    </dt>
                    <dd className="font-medium text-gray-900">
                        {formattedCourseLength}
                    </dd>
                </div>
                <div>
                    <dt className="text-xs uppercase tracking-wide text-gray-400">
                        Price
                    </dt>
                    <dd className="font-medium text-gray-900">
                        {formattedPrice}
                    </dd>
                </div>
                <div>
                    <dt className="text-xs uppercase tracking-wide text-gray-400">
                        Created
                    </dt>
                    <dd className="font-medium text-gray-900">{createdAt}</dd>
                </div>
            </dl>

            <div className="mt-auto flex justify-end">
                <AddResourceModal courseId={course.id} />
            </div>
        </article>
    );
}
