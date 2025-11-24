import React from 'react';
import { getCourseById } from '@/actions/courses';
import ResourceViewer from '@/components/modules/courses/ResourceViewer';

export default async function CourseDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const courseId = (await params).id;
    const course = await getCourseById(courseId);

    return (
        <div className="container mx-auto py-10">
            <div className="bg-white rounded-xl p-6 shadow">
                <h1 className="text-3xl font-semibold">{course.name}</h1>
                <p className="text-gray-600 mt-2">{course.description}</p>

                <div className="flex gap-6 mt-4 text-gray-700">
                    <p>
                        <strong>Length:</strong> {course.courseLength} mins
                    </p>
                    <p>
                        <strong>Price:</strong> ${course.price}
                    </p>
                </div>
            </div>

            {/* Resources Section */}
            <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">
                    Course Resources
                </h2>

                {course.resources.length === 0 ? (
                    <p className="text-gray-500">No resources uploaded yet.</p>
                ) : (
                    <div className="space-y-8">
                        {Object.values(course.groupedResources).map(
                            (resources, i) => (
                                <div
                                    key={resources[0].unit}
                                    className="space-y-2"
                                >
                                    <h4 className="font-semibold text-xl flex items-center gap-2">
                                        <div className="h-1 w-8 bg-primary-color rounded" />
                                        Unit {resources[0].unit}:{' '}
                                        {resources[0].name}
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {resources
                                            .filter((r) => r.status === 'SHOW')
                                            .map((resource) => (
                                                <ResourceViewer
                                                    key={resource.id}
                                                    resource={resource}
                                                />
                                            ))}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
