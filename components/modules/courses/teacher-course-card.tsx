import { BookOpen, Clock } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Course } from '@/lib/types/course';

type TeacherCourseCardProps = {
    course: Course;
};

export default function TeacherCourseCard({ course }: TeacherCourseCardProps) {
    const courseLength = Number(course.courseLength);
    const price = Number(course.price);

    const formattedCourseLength = Number.isNaN(courseLength)
        ? 'Duration not specified'
        : `${courseLength} minutes`;

    const createdAt = course.createdAt
        ? new Date(course.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
          })
        : 'Date not available';

    const isFree = Number.isNaN(price) || price === 0;
    const buttonText = isFree
        ? 'Enroll for Free'
        : `Buy Course - $${price.toFixed(2)}`;

    return (
        <Link href={`/teacher/courses/${course.id}`}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300 hover:-translate-y-1 cursor-pointer">
                <div className="flex-1 p-6 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-3">
                                <BookOpen className="h-5 w-5 text-primary-color transition-transform group-hover:scale-110" />
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Course
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-primary-color transition-colors">
                                {course.name}
                            </h3>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                        {course.description || 'No description provided yet.'}
                    </p>

                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">{formattedCourseLength}</span>
                        </div>
                        <div className="text-xs text-gray-400">
                            Added {createdAt}
                        </div>
                    </div>
                </div>

                <div className="p-6 pt-0">
                    <div className="block w-full rounded-lg bg-primary-color px-4 py-3 text-center text-sm font-semibold text-white transition-all duration-200 group-hover:bg-primary-color/90 group-hover:shadow-lg group-hover:scale-[1.02]">
                        {buttonText}
                    </div>
                </div>
            </article>
        </Link>
    );
}
