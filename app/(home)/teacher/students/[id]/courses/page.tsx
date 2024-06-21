import React from 'react';
import { Session, getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import UnhandledError from '@/app/modules/error/UnhandledError';
import { getStudentProfileSummarizedStandardsAPI } from '@/app/api/student';
import MyAnswersTable from '@/app/modules/profile/MyAnswersTable';

interface APIResponse {
    status: string;
    data?: {
        summarizedStandardResults: SummarizedStandardResult[];
        averageTotalWeightage: number;
        averageObtainedWeightage: number;
        classroomName: string;
        bestPerformingStandard: BestPerformingStandard;
    };
    message?: string;
}

interface SummarizedStandardResult {
    standardId: string;
    standardName: string;
    totalWeightage: number;
    obtainedWeightage: number;
}

interface BestPerformingStandard {
    standardId: string;
    standardName: string;
    obtainedWeightage: number;
}

async function Coursespage({ params }: { params: { id: string } }) {
    const data: Session | null = await getServerSession(options);

    if (data) {
        try {
            const response = await getStudentProfileSummarizedStandardsAPI({
                accessToken: data?.user?.accessToken,
                studentId: params.id,
            });

            const APIResponse: APIResponse = await response.json();

            if (APIResponse.status !== 'error') {
                return (
                    <>
                        <span className="text-black font-semibold text-xl my-3">
                            {`${
                                APIResponse?.data?.averageObtainedWeightage ?? 0
                            }
                                    of ${
                                        APIResponse?.data
                                            ?.averageTotalWeightage ?? 0
                                    }`}
                            % - Overall Performance
                        </span>
                        <div className="border rounded-lg p-4 px-6 flex flex-col items-end">
                            <MyAnswersTable
                                myRecord={
                                    APIResponse?.data
                                        ?.summarizedStandardResults || []
                                }
                            />
                        </div>
                    </>
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

export default Coursespage;
