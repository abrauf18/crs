'use client';

import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { OptionsInterface } from '@/app/components/common/AppDropDown';
import { Label } from '@/app/components/ui/label';
import Select from '@/app/components/common/DropDown';
import PageLoader from '@/app/components/common/PageLoader';
import ModalFooter from '@/app/components/common/ModalFooter';
import { ModalHeader } from '@/app/components/common/ModalHeader';
import {
    assignStandardToClassroomsAPI,
    getAllClassroomsOfTeacherAPI,
} from '@/app/api/classroom';
import { getSummarizedStandardAPI } from '@/app/api/standard';
import CourseCard from './CourseCard';

interface selectedClass {
    label: string;
    value: string;
}
interface FormValues {
    selectedClasses: selectedClass[];
}

function AssignCourseModal({
    onClose,
    standardId,
}: {
    onClose: () => void;
    standardId: string;
}) {
    const { data } = useSession();
    const [buttonLoading, setButtonLoading] = useState(false);
    const [modalLoading, setModalLoading] = useState<boolean>(false);
    const [standardSummary, setStandardSummary] = useState<{
        name: string;
        courseLength: string;
        totalVideoUploads: string;
        totalNonVideoUploads: string;
    }>({
        name: '',
        courseLength: '',
        totalVideoUploads: '',
        totalNonVideoUploads: '',
    });
    const [gradeOptions, setGradeOptions] = useState<OptionsInterface[]>([]);
    const methods = useForm<FormValues>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            selectedClasses: [gradeOptions[0]],
        },
    });
    const {
        formState: { errors },
        watch,
        reset,
        setValue,
    } = methods;

    const onSubmit = async (formData: FormValues) => {
        const payload = {
            accessToken: data?.user?.accessToken || '',
            standardId,
            classroomIds: formData.selectedClasses.map(
                (classItem: any) => classItem.label
            ),
        };
        try {
            setButtonLoading(true);
            const response = await assignStandardToClassroomsAPI({
                accessToken: data?.user?.accessToken || '',
                standardId,
                classroomIds: formData.selectedClasses.map(
                    (classItem: any) => classItem.label
                ),
            });
            if (response.status !== 200) {
                toast.error(
                    response?.data?.message ||
                        'An error occurred while assigning standard to class'
                );
            }
            toast.success('Standard assigned successfully');
        } catch (error: any) {
            toast.error(
                error.message ||
                    'An error occurred while assigning standard to class'
            );
        } finally {
            setButtonLoading(false);
            onClose();
        }
    };

    useEffect(() => {
        if (!data) {
            return;
        }
        const getData = async () => {
            try {
                setModalLoading(true);
                const standardAPIdata = await getSummarizedStandardAPI({
                    accessToken: data.user.accessToken,
                    standardId,
                });
                if (!standardAPIdata.ok) {
                    const errorData = await standardAPIdata.json();
                    throw new Error(
                        errorData?.message ??
                            'An error occurred while fetching video data'
                    );
                }
                const standardResponseData = await standardAPIdata.json();
                setStandardSummary({
                    name: standardResponseData?.data?.name,
                    courseLength: standardResponseData?.data?.courseLength,
                    totalVideoUploads:
                        standardResponseData?.data?.totalVideoUploads,
                    totalNonVideoUploads:
                        standardResponseData?.data?.totalNonVideoUploads,
                });

                const teacherAPIdata = await getAllClassroomsOfTeacherAPI({
                    accessToken: data.user.accessToken,
                });
                if (!teacherAPIdata.ok) {
                    const errorData = await teacherAPIdata.json();
                    throw new Error(
                        errorData?.message ??
                            'An error occurred while fetching video data'
                    );
                }
                const teacherResponseData = await teacherAPIdata.json();
                setGradeOptions(teacherResponseData?.data);
                reset({
                    selectedClasses: [teacherResponseData?.data[0]],
                });
            } catch (error: any) {
                toast.error(
                    error.message ??
                        'An error occurred while fetching teachers classes'
                );
            } finally {
                setModalLoading(false);
            }
        };

        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <section className="w-full bg-white h-screen py-4 shadow-lg">
            {modalLoading ? (
                <div>
                    <PageLoader />
                </div>
            ) : (
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <div className="h-[95%] overflow-y-auto px-6">
                            <ModalHeader
                                headerText={{
                                    heading: 'Assign Course',
                                    tagline: 'Assign Course to your Class!',
                                }}
                                onClose={onClose}
                            />

                            <div className="flex flex-col w-full">
                                <CourseCard
                                    name={standardSummary.name}
                                    courseLength={standardSummary.courseLength}
                                    videoCount={
                                        standardSummary.totalVideoUploads
                                    }
                                    otherResourcesCount={
                                        standardSummary.totalNonVideoUploads
                                    }
                                />
                                <div className="my-3 w-full">
                                    <Label htmlFor="password ">
                                        Select Class To Assign
                                    </Label>
                                    {watch('selectedClasses').map(
                                        (
                                            classItem: selectedClass,
                                            index: number
                                        ) => (
                                            <div
                                                className="mt-4"
                                                // eslint-disable-next-line react/no-array-index-key
                                                key={`selectedClasses.${index}`}
                                            >
                                                <Select
                                                    additionalClasses="!w-full"
                                                    name={`selectedClasses.${index}.label`}
                                                    options={gradeOptions}
                                                    // eslint-disable-next-line prettier/prettier
                                                    selectedOption={gradeOptions[0]?.value}
                                                    handleClick={(
                                                        label,
                                                        value
                                                    ) => {
                                                        setValue(
                                                            `selectedClasses.${index}.value`,
                                                            value
                                                        );
                                                    }}
                                                />
                                            </div>
                                        )
                                    )}
                                </div>
                                <div className="flex justify-end">
                                    <p
                                        className="text-dark-gray text-base cursor-pointer"
                                        onClick={() => {
                                            const currentClasses =
                                                watch('selectedClasses');
                                            const updatedClasses = [
                                                ...currentClasses,
                                                gradeOptions[0],
                                            ];
                                            setValue(
                                                'selectedClasses',
                                                updatedClasses
                                            );
                                        }}
                                    >
                                        Add More
                                    </p>
                                </div>
                            </div>
                        </div>
                        <ModalFooter text="Assign" loading={buttonLoading} />
                    </form>
                </FormProvider>
            )}
        </section>
    );
}

export default AssignCourseModal;
