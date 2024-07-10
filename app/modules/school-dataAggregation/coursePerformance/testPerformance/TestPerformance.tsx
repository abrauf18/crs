'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { usePathname, useRouter } from 'next/navigation';
import { getAllTeacherAPI } from '@/app/api/user';
import Loader from '@/app/components/common/PageLoader';
import AppDropDown from '@/app/components/common/AppDropDown';
import TestDetailTable from './TestDetailTable';

function TestPerformance({ APIdata }: { APIdata: any }) {
    const router = useRouter();
    const { data } = useSession();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const [buttonLoader, setButtonLoader] = useState(false);
    const [currentTeacher, setCurrentTeacher] = useState('');
    const [teacherList, setTeacherList] = useState<any[]>([]);
    const methods = useForm({ mode: 'onChange', reValidateMode: 'onChange' });

    // eslint-disable-next-line consistent-return
    const handleTeacherChange = (e: any) => {
        const selectedTeacher = e.target.value;
        setCurrentTeacher(selectedTeacher);
        const selectedTeacherId = teacherList.find(
            (teacher) => teacher.value === selectedTeacher
        )?.id;
        if (selectedTeacherId) {
            return router.push(`?teacherId=${selectedTeacherId}`);
        }
    };

    useEffect(() => {
        const accessToken = data?.user.accessToken || '';
        getAllTeacherAPI(accessToken).then((response) => {
            if (response?.status === 'success') {
                const newTeacherList = response?.data?.map(
                    (teacher: { name: string; id: string }) => ({
                        id: teacher.id,
                        label: teacher.name,
                        value:
                            teacher.name.charAt(0).toUpperCase() +
                            teacher.name.slice(1),
                    })
                );
                setTeacherList(newTeacherList);
                setCurrentTeacher(newTeacherList[0]?.value || '');
            }
            setLoading(false);
        });
    }, [data?.user?.accessToken]);

    return (
        <section>
            <div className="border px-2 py-5 lg:py-5 lg:px-5 rounded-lg mt-10">
                <div className="flex flex-col md:mb-4 lg:flex-row lg:justify-between lg:items-center ">
                    <h1 className="text-lg font-semibold md:mb-4 lg:mb-0 md:ml-2 ml-4">
                        {APIdata[0].name}
                    </h1>
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <Loader /> {/* Show a loading spinner or message */}
                        </div>
                    ) : (
                        <FormProvider {...methods}>
                            <AppDropDown
                                name="teacher"
                                options={teacherList || []}
                                value={currentTeacher || 'No Teacher To select'}
                                onChange={(e: any) => handleTeacherChange(e)}
                            />
                        </FormProvider>
                    )}
                    {/* <div className=" flex items-baseline space-x-2 w-fit bg-green-50 py-2 px-4 rounded-lg border border-green-600 text-gray-500 font-medium">
                        <div className=" px-[3px] border-2 w-5 h-5 border-green-200 rounded-md flex items-center self-center">
                            <LucideMoveUpRight color="green" size={10} />
                        </div>
                        <span className="text-green-600 font-bold text-2xl ">
                            80%
                        </span>
                        <span className="ml-1">Overall Performance</span>
                    </div> */}
                </div>

                <div className="rounded-lg  md:mt-5 py-3 md:px-6 mobile:px-3">
                    <TestDetailTable data={APIdata} />
                </div>
            </div>
        </section>
    );
}

export default TestPerformance;
