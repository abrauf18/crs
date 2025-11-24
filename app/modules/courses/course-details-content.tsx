'use client';

import React, { useState, useMemo } from 'react';
import {
    BookOpen,
    Clock,
    Calendar,
    ArrowLeft,
    Video,
    FileText,
    Activity,
    Image as ImageIcon,
    Loader2,
    CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { CourseDetail } from '@/lib/types/course';
import { buyCourse, enrollFreeCourse } from '@/lib/actions/stripe';
import { Progress } from '@/components/ui/progress';

type CourseDetailsContentProps = {
    course: CourseDetail;
    isEnrolled?: boolean;
};

const resourceTypeIcons = {
    VIDEO: Video,
    ACTIVITY: Activity,
    PDF: FileText,
    IMAGE: ImageIcon,
    DOCUMENT: FileText,
};

const resourceTypeColors = {
    VIDEO: 'bg-blue-100 text-blue-600',
    ACTIVITY: 'bg-green-100 text-green-600',
    PDF: 'bg-red-100 text-red-600',
    IMAGE: 'bg-purple-100 text-purple-600',
    DOCUMENT: 'bg-yellow-100 text-yellow-600',
};

export default function CourseDetailsContent({
    course,
    isEnrolled = false,
}: CourseDetailsContentProps) {
    const [isEnrolling, setIsEnrolling] = useState(false);

    const courseLength = Number(course.courseLength);
    const price = Number(course.price);

    const formattedCourseLength = Number.isNaN(courseLength)
        ? 'Duration not specified'
        : `${courseLength} minutes`;

    const createdAt = course.createdAt
        ? new Date(course.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : 'Date not available';

    const isFree = Number.isNaN(price) || price === 0;

    // Hardcoded progress for testing - replace with actual progress later
    const progress: number = 65;

    const handleEnrollment = async () => {
        setIsEnrolling(true);
        try {
            if (isFree) {
                const result = await enrollFreeCourse({ courseId: course.id });
                if (result.success) {
                    toast.success(
                        result.message || 'Successfully enrolled in course!'
                    );
                    setTimeout(() => {
                        window.location.href = '/teacher/courses';
                    }, 1500);
                } else {
                    toast.error(result.message || 'Failed to enroll in course');
                }
            } else {
                const result = await buyCourse({ courseId: course.id });
                if (result.success && result.data?.url) {
                    window.location.href = result.data.url;
                } else {
                    toast.error(
                        result.message || 'Failed to create checkout session'
                    );
                }
            }
        } catch (error) {
            toast.error('An unexpected error occurred');
        } finally {
            setIsEnrolling(false);
        }
    };

    const visibleResources = course.resources.filter(
        (resource) => resource.status === 'SHOW'
    );

    // Group resources by topic
    const resourcesByTopic = visibleResources.reduce(
        (acc, resource) => {
            const topic = resource.topic || 'Uncategorized';
            if (!acc[topic]) {
                acc[topic] = [];
            }
            acc[topic].push(resource);
            return acc;
        },
        {} as Record<string, typeof visibleResources>
    );

    return (
        <div className="min-h-screen bg-lighter-gray">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <Link
                        href="/teacher/courses"
                        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary-color transition-colors mb-4"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Courses
                    </Link>

                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3">
                                <BookOpen className="h-6 w-6 text-primary-color" />
                                <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                    Course Details
                                </span>
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                {course.name}
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {course.description ||
                                    'No description provided yet.'}
                            </p>

                            <div className="flex flex-wrap items-center gap-6 mt-6">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Clock className="h-5 w-5 text-primary-color" />
                                    <span className="text-sm font-medium">
                                        {formattedCourseLength}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Calendar className="h-5 w-5 text-primary-color" />
                                    <span className="text-sm font-medium">
                                        Added {createdAt}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 rounded-full bg-light-orange text-primary-color text-sm font-semibold">
                                        {visibleResources.length}{' '}
                                        {visibleResources.length === 1
                                            ? 'Resource'
                                            : 'Resources'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-80">
                            <div className="bg-light-gray rounded-2xl p-6 border border-gray-200">
                                {isEnrolled ? (
                                    <div className="text-center">
                                        <div className="mb-4">
                                            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                                                <CheckCircle2 className="h-8 w-8 text-green-600" />
                                            </div>
                                            <p className="text-xl font-bold text-gray-900">
                                                You&apos;re Enrolled!
                                            </p>
                                            <p className="text-sm text-gray-500 mt-2">
                                                Access all course materials
                                                below
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="text-center mb-4">
                                            {isFree ? (
                                                <div>
                                                    <p className="text-3xl font-bold text-primary-color">
                                                        Free
                                                    </p>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        No cost to enroll
                                                    </p>
                                                </div>
                                            ) : (
                                                <div>
                                                    <p className="text-3xl font-bold text-gray-900">
                                                        ${price.toFixed(2)}
                                                    </p>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        One-time payment
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleEnrollment}
                                            disabled={isEnrolling}
                                            className="w-full bg-primary-color text-white font-semibold py-4 rounded-lg hover:opacity-90 transition-all duration-200 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {isEnrolling ? (
                                                <>
                                                    <Loader2 className="h-5 w-5 animate-spin" />
                                                    <span>Processing...</span>
                                                </>
                                            ) : (
                                                <span>
                                                    {isFree
                                                        ? 'Enroll for Free'
                                                        : 'Buy Course'}
                                                </span>
                                            )}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Bar - Only shown when enrolled */}
            {isEnrolled && (
                <div className="bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-6 py-6">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Your Progress
                                </h2>
                                <span className="text-2xl font-bold text-primary-color">
                                    {progress}%
                                </span>
                            </div>
                            <Progress value={progress} className="h-3" />
                            <p className="text-sm text-gray-600">
                                {progress === 100
                                    ? 'Congratulations! You have completed this course.'
                                    : `Keep going! You're ${
                                          100 - progress
                                      }% away from completing this course.`}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Course Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="bg-white rounded-2xl border border-gray-200 p-6 lg:p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Course Content
                    </h2>

                    {visibleResources.length === 0 ? (
                        <div className="text-center py-12">
                            <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">
                                No resources available yet for this course.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {Object.entries(resourcesByTopic).map(
                                ([topic, resources]) => (
                                    <div key={topic}>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                            <div className="h-1 w-8 bg-primary-color rounded" />
                                            {topic}
                                        </h3>
                                        <div className="space-y-3">
                                            {resources.map((resource) => {
                                                const IconComponent =
                                                    resourceTypeIcons[
                                                        resource.type as keyof typeof resourceTypeIcons
                                                    ] || FileText;
                                                const colorClass =
                                                    resourceTypeColors[
                                                        resource.type as keyof typeof resourceTypeColors
                                                    ] ||
                                                    'bg-gray-100 text-gray-600';

                                                return (
                                                    <div
                                                        key={resource.id}
                                                        className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-primary-color hover:shadow-sm transition-all duration-200 group"
                                                    >
                                                        <div
                                                            className={`p-3 rounded-lg ${colorClass}`}
                                                        >
                                                            <IconComponent className="h-5 w-5" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="font-semibold text-gray-900 truncate group-hover:text-primary-color transition-colors">
                                                                {resource.name}
                                                            </h4>
                                                            <p className="text-sm text-gray-500">
                                                                {resource.type}
                                                            </p>
                                                        </div>
                                                        <a
                                                            href={resource.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="px-4 py-2 text-sm font-medium text-primary-color hover:bg-light-orange rounded-lg transition-colors"
                                                        >
                                                            View
                                                        </a>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
