import { Eye, Pencil } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Course } from '@/lib/types/course';
import AddResourceModal from './add-resource-modal';
import CreateCourseModal from './create-course-modal';
import { DeleteCourseDialog } from './delete-course-dialog';

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
        <article className="group flex h-full flex-col gap-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300 hover:-translate-y-1">
            {/* Header Section */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-primary-color transition-colors">
                        {course.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {course.description || 'No description provided yet.'}
                    </p>
                </div>

                {/* Action Icons */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    <Link
                        href={`/admin/courses/${course.id}`}
                        className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-primary-color hover:border-primary-color hover:text-white transition-all duration-200 group/view"
                    >
                        <Eye
                            className="h-4 w-4 text-gray-600 group-hover/view:text-white transition-colors"
                            aria-label={`View ${course.name}`}
                        />
                    </Link>

                    <CreateCourseModal
                        trigger={
                            <button className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-primary-color hover:border-primary-color hover:text-white transition-all duration-200 group/edit">
                                <Pencil
                                    className="h-4 w-4 text-gray-600 group-hover/edit:text-white transition-colors cursor-pointer"
                                    aria-label={`Edit ${course.name}`}
                                />
                            </button>
                        }
                        defaultData={course}
                    />
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100"></div>

            {/* Info Grid */}
            <dl className="grid gap-4 text-sm sm:grid-cols-3">
                <div className="space-y-1">
                    <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">
                        Length
                    </dt>
                    <dd className="text-base font-semibold text-gray-900">
                        {formattedCourseLength}
                    </dd>
                </div>
                <div className="space-y-1">
                    <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">
                        Price
                    </dt>
                    <dd className="text-base font-semibold text-gray-900">
                        {formattedPrice}
                    </dd>
                </div>
                <div className="space-y-1">
                    <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">
                        Created
                    </dt>
                    <dd className="text-base font-semibold text-gray-900">{createdAt}</dd>
                </div>
            </dl>

            {/* Action Buttons */}
            <div className="mt-auto flex gap-3 pt-2">
                <div className="flex-1">
                    <AddResourceModal courseId={course.id} />
                </div>
                <DeleteCourseDialog id={course.id} type="course" />
            </div>
        </article>
    );
}
