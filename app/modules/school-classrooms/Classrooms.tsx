'use client';

import React, { useState, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Searchbar from '@/app/components/common/Searchbar';
import Pagintaion from '@/app/components/common/Pagintaion';
import ClassroomsTable from './ClassroomsTable';
// import AddTeacherModal from './AddTeacherModal';

interface APIClassroomsInterface {
    id: string;
    name: string;
    teacher: string;
    status: string;
}

interface APIPaginationInterface {
    totalRecords: number;
    currentPage: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

function Classrooms({
    classrooms,
    pagination,
}: {
    classrooms: APIClassroomsInterface[];
    pagination: APIPaginationInterface;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const urlSearchParams = useSearchParams();
    const page = urlSearchParams.get('page') || 1;
    // const [isAddClassroomModalVisible, setAddClassroomModalVisible] =
    //     useState(false);

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(urlSearchParams.toString());
            params.set(name, value);
            return params.toString();
        },
        [urlSearchParams]
    );

    const handlePageChange = (page: number) => {
        router.push(`${pathname}?${createQueryString('page', `${page}`)}`);
    };

    // const handleAddTeacherClick = () => {
    //     setAddClassroomModalVisible(true);
    // };

    // const handleCloseModal = () => {
    //     setAddClassroomModalVisible(false);
    // };
    return (
        <section className="px-2 lg:px-4">
            <Searchbar
                headerText="Classrooms"
                tagline="Classrooms in your School"
            />
            <div className="border rounded-lg p-4 px-6   ">
                <div className="flex mobile:flex-col justify-between px-1 mb-6 mobile:items-start items-center">
                    <h1 className="text-xl font-semibold">Classrooms</h1>
                    <div
                        className="cursor-pointer border rounded-lg px-3 py-2 text-white bg-primary-color font-medium mobile:mt-2"
                        // onClick={handleAddTeacherClick}
                    >
                        Add Classroom
                    </div>
                </div>
                <div className="mt-4">
                    <ClassroomsTable classrooms={classrooms} fontSize="12" />
                </div>
            </div>
            {classrooms?.length > 10 && (
                <div className="flex items-center w-full justify-center mt-5">
                    <Pagintaion
                        currentPage={Number(page) > 0 ? Number(page) : 1}
                        totalPages={
                            pagination?.totalPages > 0
                                ? pagination.totalPages
                                : 1
                        }
                        onPageChange={handlePageChange}
                    />
                </div>
            )}

            {/* {isAddTeacherModalVisible && (
                <div className="fixed right-0 top-0 z-50 w-full md:w-[60%] lg:w-[30%]">
                    <AddTeacherModal onClose={handleCloseModal} />
                </div>
            )} */}
        </section>
    );
}

export default Classrooms;
