export const getTeacherDashboardSummariesAPI = async ({
    accessToken,
    teacherId,
}: {
    accessToken: string;
    teacherId: string;
}) => {
    const result = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/getTeacherDashboardSummaries`,
        {
            headers: {
                accesstoken: accessToken,
                teacherid: teacherId,
            },
            next: {
                tags: ['getTeacherDashboardSummaries'],
            },
        }
    );

    return result;
};
