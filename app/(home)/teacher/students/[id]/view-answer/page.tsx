import { options } from '@/app/api/auth/[...nextauth]/options';
import { getStudentAssessmentAnswerAPI } from '@/app/api/student';
import UnhandledError from '@/app/modules/error/UnhandledError';
import CheckResource from '@/app/modules/students/CheckResource';
import { Session, getServerSession } from 'next-auth';
import React from 'react';

async function CheckResourcePage({
    searchParams,
}: {
    searchParams: { studentId: string; assesmentResourceId: string };
}) {
    const data: Session | null = await getServerSession(options);
    if (data) {
        try {
            const response = await getStudentAssessmentAnswerAPI({
                accessToken: data?.user?.accessToken,
                studentId: searchParams.studentId,
                assesmentResourceId: searchParams.assesmentResourceId,
            });

            const APIResponse: any = await response.json();

            if (APIResponse.status !== 'error') {
                return (
                    <section>
                        <CheckResource
                            APIdata={APIResponse.data}
                            studentId={searchParams.studentId}
                            assesmentResourceId={
                                searchParams.assesmentResourceId
                            }
                        />
                    </section>
                );
            }

            if (!response.ok) {
                throw new Error(APIResponse?.message!);
            }
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

export default CheckResourcePage;
