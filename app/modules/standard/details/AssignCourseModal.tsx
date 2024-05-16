'use client';

import { Session } from 'next-auth';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FileVideoIcon, X } from 'lucide-react';
import action from '@/app/action';
import { OptionsInterface } from '@/app/components/common/AppDropDown';
import { ErrorMessage } from '@hookform/error-message';
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
    data,
    onClose,
    standardId,
}: {
    data: Session | null;
    onClose: () => void;
    standardId: string;
}) {
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
        formState: { errors, isValid },
        trigger,
        watch,
        reset,
        setValue,
        setError,
        clearErrors,
    } = methods;
    const watchedSelectedClasses = watch('selectedClasses');
    const selectedGradeOptions = watchedSelectedClasses?.map(
        (classItem: selectedClass) => classItem?.label
    );
    const filteredGradeOptions = gradeOptions?.filter(
        (classItem: selectedClass) =>
            !selectedGradeOptions.includes(classItem?.label)
    );

    const checkIfSelectedOptionPreExists = (
        index: number,
        currentLabel: string
    ) => {
        const selectedLabels = watch('selectedClasses').map(
            (item: selectedClass) => item.label
        );
        const previousLabels = selectedLabels.slice(0, index);

        if (!previousLabels.includes(currentLabel)) {
            clearErrors(`selectedClasses.${index}.label`);
        } else {
            setError(`selectedClasses.${index}.label`, {
                type: 'alreadySelected',
                message: 'This value has been selected before',
            });
        }
        return (
            !previousLabels.includes(currentLabel) ||
            'This value has been selected before'
        );
    };
    const onSubmit = async (formData: FormValues) => {
        try {
            trigger('selectedClasses');
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
            action('getClassesAndCourses');
            toast.success('Standard assigned successfully');
            onClose();
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ||
                    'An error occurred while assigning standard to class'
            );
        } finally {
            setButtonLoading(false);
        }
    };

    useEffect(() => {
        if (!data || standardSummary.name.length) {
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
                    teacherId: data.user.id,
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

    if (!data) {
        return null;
    }

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
                                <div className="h-96 overflow-y-scroll">
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
                                                    // eslint-disable-next-line react/no-array-index-key
                                                    key={`selectedClasses.${index}`}
                                                >
                                                    <div className="flex gap-1">
                                                        <div className="mt-4 grow">
                                                            <Select
                                                                additionalClasses="!w-full"
                                                                name={`selectedClasses.${index}.label`}
                                                                options={
                                                                    gradeOptions
                                                                }
                                                                // eslint-disable-next-line prettier/prettier
                                                                selectedOption={
                                                                    classItem?.value
                                                                }
                                                                handleClick={(
                                                                    label,
                                                                    value
                                                                ) => {
                                                                    checkIfSelectedOptionPreExists(
                                                                        index,
                                                                        label
                                                                    );
                                                                    setValue(
                                                                        `selectedClasses.${index}.value`,
                                                                        value
                                                                    );
                                                                }}
                                                                rules={{
                                                                    validate: (
                                                                        currentLabel: string
                                                                    ) => {
                                                                        const selectedLabels =
                                                                            watch(
                                                                                'selectedClasses'
                                                                            ).map(
                                                                                (
                                                                                    item: selectedClass
                                                                                ) =>
                                                                                    item.label
                                                                            );
                                                                        // Remove the current label from the array of selected labels
                                                                        const previousLabels =
                                                                            selectedLabels.slice(
                                                                                0,
                                                                                index
                                                                            );
                                                                        // Check if the current label was selected before
                                                                        return (
                                                                            !previousLabels.includes(
                                                                                currentLabel
                                                                            ) ||
                                                                            'This value has been selected before'
                                                                        );
                                                                    },
                                                                }}
                                                            />
                                                        </div>
                                                        <button
                                                            className="flex-none cursor-pointer mt-4 p-2 rounded-lg bg-red-500 text-white"
                                                            type="button"
                                                            onClick={() => {
                                                                const currentClasses =
                                                                    watch(
                                                                        'selectedClasses'
                                                                    );
                                                                const updatedClasses =
                                                                    currentClasses.filter(
                                                                        (
                                                                            currentClass: selectedClass,
                                                                            idx: number
                                                                        ) =>
                                                                            idx !==
                                                                            index
                                                                    );
                                                                setValue(
                                                                    'selectedClasses',
                                                                    updatedClasses
                                                                );
                                                                trigger(
                                                                    'selectedClasses'
                                                                );
                                                            }}
                                                        >
                                                            remove
                                                        </button>
                                                    </div>
                                                    <div className="mt-2">
                                                        <span className="text-red-500 text-xs mt-2">
                                                            <ErrorMessage
                                                                errors={errors}
                                                                name={`selectedClasses.${index}.label`}
                                                                render={({
                                                                    message,
                                                                }) => (
                                                                    <p className="flex items-center">
                                                                        <X
                                                                            size={
                                                                                20
                                                                            }
                                                                            color="#E6500D"
                                                                        />
                                                                        {
                                                                            message
                                                                        }
                                                                    </p>
                                                                )}
                                                            />
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                    {filteredGradeOptions.length > 0 && (
                                        <div className="flex justify-end">
                                            <p
                                                className="text-dark-gray text-base cursor-pointer"
                                                onClick={() => {
                                                    const currentClasses =
                                                        watch(
                                                            'selectedClasses'
                                                        );
                                                    const updatedClasses = [
                                                        ...currentClasses,
                                                        filteredGradeOptions[0],
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
                                    )}
                                </div>
                            </div>
                        </div>
                        <ModalFooter
                            text="Assign"
                            loading={buttonLoading}
                            disabled={!isValid}
                        />
                    </form>
                </FormProvider>
            )}
        </section>
    );
}

export default AssignCourseModal;
