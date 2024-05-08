'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Label } from '@/app/components/ui/label';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ErrorMessage } from '@hookform/error-message';
import Input from '@/app/components/common/Input';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { validationError } from '@/lib/utils';
import { toast } from 'react-toastify';
import CreateTopic from '../CreateTopic';
import StandardCard, { Data } from '../StandardCard';

export const data: Data[] = [
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
interface Resource {
    id: string;
    name: string;
    url: string;
}
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
    id: string;
    date: string;
    topics: Topic[];
}
interface Standard {
    id: string;
    name: string;
    description: string;
    dailyUploads: DailyUpload[];
}
interface FormValues {
    standard: Standard;
}

function CreateStandard() {
    const dailyUploadAddedRef = useRef(false);
    const [allSelectedResources, setAllSelectedResources] = useState<
        {
            resourceId: string;
            resourceType: ResourceType;
        }[][]
    >([[{ resourceId: '', resourceType: ResourceType.VIDEO }]]);
    const methods = useForm<FormValues>({
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

        console.log('formdata: ', formdata);
    };

    useEffect(() => {
        if (!data) {
            return;
        }
        if (dailyUploadFields.length === 0 && !dailyUploadAddedRef.current) {
            appendDailyUpload({
                id: '',
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
                                    id: '',
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
                    <StandardCard data={data} />
                </form>
            </FormProvider>
        </section>
    );
}

export default CreateStandard;
