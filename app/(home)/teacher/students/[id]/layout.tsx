'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Searchbar from '@/app/components/common/Searchbar';
import { getStudentNameEmailForTeacherAPI } from '@/app/api/student';
import { toast } from 'react-toastify';

export default function StandardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data } = useSession();
    const { back } = useRouter();
    const pathname = usePathname();
    const [studentInfo, setStudentInfo] = useState({ name: '', email: '' });

    const extractStudentId = (path: string) => {
        const parts = path.split('/');
        const studentId = parts[3];
        return studentId;
    };
    const studentId = extractStudentId(pathname);

    useEffect(() => {
        const fetchData = async () => {
            if (studentId && data && !studentInfo.name) {
                try {
                    const studentdata = await getStudentNameEmailForTeacherAPI({
                        accessToken: data?.user?.accessToken || '',
                        studentId,
                    });
                    if (!studentdata.ok) {
                        const errorData = await studentdata.json();
                        throw new Error(
                            errorData?.message ??
                                'An error occurred while fetching video data'
                        );
                    }
                    const studentResponseData = await studentdata.json();
                    const { name, email } = studentResponseData.data.student;
                    setStudentInfo({ name, email });
                } catch (error: any) {
                    toast.error(
                        error?.message ??
                            'An error occurred while fetching name of student'
                    );
                }
            }
        };

        fetchData();
    }, [studentId, data]);

    return (
        <section>
            <Searchbar
                headerText={studentInfo.name || ''}
                tagline={studentInfo.email || ''}
                isShowBackArrow
                onBackClick={back}
            />
            {children}
        </section>
    );
}
