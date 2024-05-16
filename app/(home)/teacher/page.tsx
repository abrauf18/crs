import { Metadata } from 'next';
import React from 'react';
import { Session, getServerSession } from 'next-auth';
import Dashboard from '@/app/modules/dashboard/Dashboard';
import { getClassesAndCoursesAPI } from '@/app/api/classroom';
import { options } from '@/app/api/auth/[...nextauth]/options';
import UnhandledError from '@/app/modules/error/UnhandledError';
import { getTeacherDashboardSummariesAPI } from '@/app/api/dashboard';

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Here’s a Quick Overview',
};

export default async function Home() {
    const data: Session | null = await getServerSession(options);

    if (data) {
        try {
            const classOverviewResponse = await getTeacherDashboardSummariesAPI(
                {
                    accessToken: data.user.accessToken,
                    teacherId: data.user.id,
                }
            );

            const standardOverviewResponse = await getClassesAndCoursesAPI({
                accessToken: data.user.accessToken,
                teacherId: data.user.id,
            });

            const classOverviewData = await classOverviewResponse.json();
            const standardOverviewData = await standardOverviewResponse.json();

            if (!classOverviewResponse.ok) {
                throw new Error(classOverviewData?.message);
            }
            if (!standardOverviewResponse.ok) {
                throw new Error(standardOverviewData?.message);
            }

            return (
                <Dashboard
                    isTeacher
                    TeacherSummaries={{
                        totalStudents: classOverviewData?.data?.totalStudents,
                        totalClassrooms:
                            classOverviewData?.data?.totalClassrooms,
                        OverallPerformance: 100,
                    }}
                    StandardOverview={standardOverviewData?.data}
                />
            );
        } catch (error: any) {
            return (
                <UnhandledError
                    error={{
                        message: error?.message,
                        name: error?.name,
                    }}
                />
            );
        }
    }
}
