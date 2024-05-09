'use client';

import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { validationError } from '@/lib/utils';
import Input from '@/app/components/common/Input';
import { Label } from '@/app/components/ui/label';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ErrorMessage } from '@hookform/error-message';
import { createStandardAPI, updateStandardAPI } from '@/app/api/standard';
import CreateTopic from '../CreateTopic';
import StandardCard, { Data } from '../StandardCard';

export const standardData: Data[] = [
    {
        id: 1,
        name: '3D Printing',
        duration: '5:00',
        question: '5 questions',
    },
    {
        id: 2,
        name: 'Design & Human',
        duration: '5:00',
        question: '5 questions',
    },
    {
        id: 3,
        name: 'Vertual Reality - VR',
        duration: '5:00',
        question: '5 questions',
    },
];

export enum ResourceType {
    VIDEO = 'video',
    SLIDESHOW = 'slideshow',
    WORKSHEET = 'worksheet',
    EXIT_TICKET_TEST = 'exit-ticket-test',
    QUIZ = 'quiz',
}
interface Topic {
    resourceId: string;
    type: ResourceType;
}
interface DailyUpload {
    date: string;
    topics: Topic[];
}
interface Standard {
    name: string;
    description: string;
    dailyUploads: DailyUpload[];
}
interface FormValues {
    standard: Standard;
}
const DEFAULT_STANDARD = {
    name: '',
    description: '',
    dailyUploads: [
        {
            date: '',
            topics: [
                {
                    resourceId: '',
                    type: ResourceType.VIDEO,
                },
            ],
        },
    ],
};
const DEFAULT_FORM_VALUES = {
    standard: DEFAULT_STANDARD,
};

function CreateStandard({
    standardId,
    name,
    description,
    dailyUploads,
    update,
}: {
    standardId?: string;
    name?: string;
    description?: string;
    dailyUploads?: DailyUpload[];
    update: boolean;
}) {
    const { data } = useSession();
    const dailyUploadAddedRef = useRef(false);
    const transformedData = {
        standard: {
            name: name ?? '',
            description: description ?? '',
            dailyUploads:
                dailyUploads?.map((upload) => ({
                    date: upload.date,
                    topics: upload.topics.map((resource) => ({
                        resourceId: resource.resourceId,
                        type: resource.type,
                    })),
                })) ?? [],
        },
    };
    const defaultSelectedResources =
        dailyUploads &&
        dailyUploads.map((upload) =>
            upload.topics.map((resource) => ({
                resourceId: resource.resourceId,
                resourceType: resource.type,
            }))
        );
    const [allSelectedResources, setAllSelectedResources] = useState<
        {
            resourceId: string;
            resourceType: ResourceType;
        }[][]
    >(
        defaultSelectedResources ?? [
            [{ resourceId: '', resourceType: ResourceType.VIDEO }],
        ]
    );
    const methods = useForm<FormValues>({
        defaultValues: update ? transformedData : DEFAULT_FORM_VALUES,
        mode: 'onChange',
        reValidateMode: 'onChange',
    });
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = methods;
    const {
        fields: dailyUploadFields,
        append: appendDailyUpload,
        remove: removeDailyUpload,
    } = useFieldArray<FormValues>({
        control,
        name: 'standard.dailyUploads',
    });

    const onSubmit = async (formdata: FormValues) => {
        if (!data) {
            return;
        }

        const transformedDailyUploads = formdata.standard.dailyUploads
            .map((dailyUpload, index) =>
                dailyUpload.topics.map((topic, topicIndex) => ({
                    resourceId:
                        allSelectedResources[index][topicIndex].resourceId,
                    accessDate: dailyUpload.date,
                }))
            )
            .flat();

        try {
            console.log(
                'form info: ',
                formdata,
                allSelectedResources,
                transformedDailyUploads
            );
            let response: any = null;
            if (update) {
                response = await updateStandardAPI({
                    standardId: standardId || '',
                    name: formdata.standard.name,
                    description: formdata.standard.description,
                    courseLength: '1: week',
                    dailyUploads: transformedDailyUploads,
                    accessToken: data?.user?.accessToken || '',
                });
            } else {
                response = await createStandardAPI({
                    name: formdata.standard.name,
                    description: formdata.standard.description,
                    courseLength: '1: week',
                    dailyUploads: transformedDailyUploads,
                    accessToken: data?.user?.accessToken || '',
                });
            }
            if (response.status !== 200) {
                toast.error(
                    response?.message ||
                        `Failed to ${update ? `update ` : `create`} a standard`
                );
                return;
            }
            toast.success('Standard added successfully');
        } catch (error: any) {
            console.log(error);
            toast.error(
                error?.response?.data?.message ||
                    `Failed to ${update ? `update ` : `create`} a standard`
            );
        }
    };

    useEffect(() => {
        if (!data) {
            return;
        }
        if (dailyUploadFields.length === 0 && !dailyUploadAddedRef.current) {
            appendDailyUpload({
                date: '',
                topics: [
                    {
                        resourceId: '',
                        type: ResourceType.VIDEO,
                    },
                ],
            });
            dailyUploadAddedRef.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);
    console.log('all selected resources in Parents: ', allSelectedResources);
    return (
        <section>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-5 pb-3 border-b">
                        <h3 className="text-xl font-semibold">Plan Details</h3>
                        <div className="sm:flex justify-between items-center gap-5 w-full mt-5">
                            <div className="basis-1/2">
                                <Label htmlFor="standard.name">Plan Name</Label>
                                <Input
                                    type="text"
                                    placeholder="Write Plan Name"
                                    name="standard.name"
                                    rules={{
                                        required: {
                                            value: true,
                                            message:
                                                validationError.REQUIRED_FIELD,
                                        },
                                    }}
                                />
                            </div>
                            <div className="basis-1/2">
                                <Label htmlFor="standard.description">
                                    Description
                                </Label>
                                <Input
                                    type="text"
                                    placeholder="Write Description Here"
                                    name="standard.description"
                                    rules={{
                                        required: {
                                            value: true,
                                            message:
                                                validationError.REQUIRED_FIELD,
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center my-5">
                            <h3 className="text-xl font-semibold">Topic:</h3>
                        </div>
                        {dailyUploadFields.map((dailyUpload, index) => (
                            <div key={dailyUpload.id}>
                                <CreateTopic
                                    index={index}
                                    allSelectedResources={
                                        allSelectedResources[index]
                                    }
                                    setAllSelectedResources={(
                                        resources: {
                                            resourceId: string;
                                            resourceType: ResourceType;
                                        }[]
                                    ) => {
                                        const updatedResources = [
                                            ...allSelectedResources,
                                        ];
                                        updatedResources[index] = resources;
                                        setAllSelectedResources(
                                            updatedResources
                                        );
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="basis-1/2 my-5">
                        <button
                            type="button"
                            className="bg-primary-color text-white font-medium p-2 mt-3 rounded-lg sm:float-right"
                            onClick={() => {
                                if (
                                    allSelectedResources[
                                        allSelectedResources.length - 1
                                    ].some(
                                        (resource) => resource.resourceId === ''
                                    )
                                ) {
                                    toast.error(
                                        'Please select all resources in last day before adding a new one'
                                    );
                                    return;
                                }
                                appendDailyUpload({
                                    date: '',
                                    topics: [
                                        {
                                            resourceId: '',
                                            type: ResourceType.VIDEO,
                                        },
                                    ],
                                });
                                setAllSelectedResources([
                                    ...allSelectedResources,
                                    [
                                        {
                                            resourceId: '',
                                            resourceType: ResourceType.VIDEO,
                                        },
                                    ],
                                ]);
                            }}
                        >
                            Add TimeLine
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="bg-primary-color text-white font-medium p-2 mt-3 rounded-lg sm:float-right"
                    >
                        submit
                    </button>
                    <StandardCard data={standardData} />
                </form>
            </FormProvider>
        </section>
    );
}

export default CreateStandard;
