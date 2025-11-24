import { BookOpen, Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Course } from '@/lib/types/course';
import { Progress } from '@/components/ui/progress';

type EnrolledCourseCardProps = {
    course: Course;
};

export default function EnrolledCourseCard({
    course,
}: EnrolledCourseCardProps) {
    const courseLength = Number(course.courseLength);

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

    // Hardcoded progress for testing - replace with actual progress later
    // const progress = 65;

    return (
        <Link href={`/teacher/courses/${course.id}`}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-primary-color bg-white shadow-sm transition-all duration-300 hover:shadow-lg cursor-pointer">
                <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        <CheckCircle2 className="h-3 w-3" />
                        Enrolled
                    </div>
                </div>

                <div className="flex-1 p-6 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <BookOpen className="h-5 w-5 text-primary-color" />
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                    Course
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 pr-20">
                                {course.name}
                            </h3>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2">
                        {course.description || 'No description provided yet.'}
                    </p>

                    {/* <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 font-medium">Course Progress</span>
                            <span className="text-primary-color font-semibold">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                    </div> */}

                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span>{formattedCourseLength}</span>
                        </div>
                        <div className="text-xs text-gray-400">
                            Added {createdAt}
                        </div>
                    </div>
                </div>

                <div className="p-6 pt-0">
                    <div className="block w-full rounded-lg bg-primary-color px-4 py-3 text-center text-sm font-semibold text-white transition-all duration-200 group-hover:opacity-90 group-hover:shadow-md">
                        Continue Learning
                    </div>
                </div>
            </article>
        </Link>
    );
}
