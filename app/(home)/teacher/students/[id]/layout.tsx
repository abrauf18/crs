import React from 'react';
import { Session, getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import Searchbar from '@/app/components/common/Searchbar';
import { getStudentNameEmailForTeacherAPI } from '@/app/api/student';
import UnhandledError from '@/app/modules/error/UnhandledError';

export default async function StandardLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { id: string };
}) {
    const data: Session | null = await getServerSession(options);
    let studentName = '';
    let studentEmail = '';
    const studentId = params.id;

    if (data) {
        try {
            const studentdata = await getStudentNameEmailForTeacherAPI({
                accessToken: data?.user?.accessToken || '',
                studentId,
            });
            if (!studentdata.ok) {
                const errorData = await studentdata.json();
                throw new Error(
                    errorData?.message ??
                        'An error occurred while fetching name of student'
                );
            }
            const studentResponseData = await studentdata.json();
            const { name, email } = studentResponseData.data.student;
            studentName = name;
            studentEmail = email;
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
    return (
        <section>
            <Searchbar
                headerText={studentName || ''}
                tagline={studentEmail || ''}
                isShowBackArrow={false}
            />
            {children}
        </section>
    );
}
