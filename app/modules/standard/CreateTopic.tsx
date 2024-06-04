'use client';

import { toast } from 'react-toastify';
import { CalendarDays, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
import { FieldErrors, useFieldArray, useFormContext } from 'react-hook-form';
import {
    validationError,
    ResourceType,
    resourceDropDownOptions,
} from '@/lib/utils';
import { Label } from '@/app/components/ui/label';
import Input from '@/app/components/common/Input';
import Select from '@/app/components/common/DropDown';
import { ErrorMessage } from '@hookform/error-message';
import VideoModal from './VideoModal';

interface Topic {
    resourceId: string;
    type: ResourceType;
    name: string;
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

function CreateTopic({
    index,
    allSelectedResources,
    setAllSelectedResources,
    errors,
}: {
    index: number;
    allSelectedResources: {
        resourceId: string;
        resourceType: ResourceType;
        name: string;
    }[];
    setAllSelectedResources: (
        resources: {
            resourceId: string;
            resourceType: ResourceType;
            name: string;
        }[]
    ) => void;
    errors: FieldErrors<FormValues>;
}) {
    const { data } = useSession();
    const topicAddedRef = useRef(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isDisplayModal, setIsDisplayModal] = useState(false);
    const { control, watch, setValue } = useFormContext<FormValues>();

    const {
        fields: topicFields,
        append: appendTopic,
        remove: removeTopic,
    } = useFieldArray<FormValues>({
        control,
        name: `standard.dailyUploads.${index}.topics`,
    });

    const handleOpenModal = (topicIndex: number) => {
        setSelectedIndex(topicIndex);
        setIsDisplayModal(true);
    };

    const handleCloseModal = () => {
        setIsDisplayModal(false);
    };

    useEffect(() => {
        if (!data) {
            return;
        }
        if (topicFields.length === 0 && !topicAddedRef.current) {
            appendTopic({
                resourceId: '',
                type: ResourceType.VIDEO,
                name: '',
            });
            topicAddedRef.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const handleResourceSelect = (topicIndex: number, resourceId: string) => {
        setValue(
            `standard.dailyUploads.${index}.topics.${topicIndex}.resourceId`,
            resourceId
        );
    };
    return (
        <>
            <div className="cursor-pointer px-4 py-2 border text-sm text-dark-gray rounded-lg absolute right-6 z-10 hover:bg-slate-100">
                <button
                    type="button"
                    onClick={() => {
                        if (
                            allSelectedResources &&
                            allSelectedResources.length > 0 &&
                            allSelectedResources[topicFields.length - 1]
                                .resourceId === ''
                        ) {
                            toast.error(
                                'Please select a resource before adding a new one'
                            );
                            return;
                        }
                        appendTopic({
                            resourceId: '',
                            type: ResourceType.VIDEO,
                            name: '',
                        });
                        setAllSelectedResources([
                            ...(allSelectedResources || []),
                            {
                                resourceId: '',
                                resourceType: ResourceType.VIDEO,
                                name: '',
                            },
                        ]);
                    }}
                >
                    Add More
                </button>
            </div>
            {topicFields.map((topic, topicIndex) => (
                <div key={topic.id}>
                    <div className="sm:flex justify-between items-center gap-5 w-full mt-3">
                        <div className="basis-full relative">
                            <Label
                                htmlFor={`standard.dailyUploads.${index}.topics.${topicIndex}.type`}
                                className="font-semibold mt-4"
                            >
                                Type
                            </Label>
                            <div className="flex items-center gap-5 sm:my-4 mt-12 mb-8">
                                <Select
                                    additionalClasses="!w-2/4"
                                    name={`standard.dailyUploads.${index}.topics.${topicIndex}.type`}
                                    options={resourceDropDownOptions}
                                    selectedOption={ResourceType.VIDEO}
                                />
                                <div
                                    className="cursor-pointer border text-sm text-dark-gray rounded-lg text-center px-4 py-3 hover:bg-slate-100"
                                    onClick={() => handleOpenModal(topicIndex)}
                                >
                                    <button
                                        className="text-sm text-center"
                                        type="button"
                                    >
                                        Select
                                    </button>
                                </div>
                                <div>
                                    {allSelectedResources &&
                                        allSelectedResources.length >
                                            topicIndex &&
                                        allSelectedResources[topicIndex].name}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="fixed right-0 top-0 z-50 w-full md:w-[60%] lg:w-[30%]">
                        {isDisplayModal && (
                            <VideoModal
                                onClose={handleCloseModal}
                                resourceType={watch(
                                    `standard.dailyUploads.${index}.topics.${selectedIndex}.type`
                                )}
                                setAllSelectedResources={
                                    setAllSelectedResources
                                }
                                allSelectedResources={allSelectedResources}
                                selectedIndex={selectedIndex}
                                updateSelectedResource={(resourceId: string) =>
                                    handleResourceSelect(
                                        selectedIndex,
                                        resourceId
                                    )
                                }
                            />
                        )}
                    </div>
                    <div className=" cursor-pointer px-4 py-2 border text-sm rounded-lg w-24 bg-red-500 text-gray-50 hover:bg-red-600 ">
                        <button
                            type="button"
                            onClick={() => {
                                // Remove the topic from allSelectedResources
                                const updatedSelectedResources =
                                    allSelectedResources
                                        ? allSelectedResources.filter(
                                              (_, index) => index !== topicIndex
                                          )
                                        : [];
                                setAllSelectedResources(
                                    updatedSelectedResources
                                );

                                // Remove the topic from the form
                                removeTopic(topicIndex);
                            }}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}
            <div className="sm:flex justify-between items-center my-5 gap-5 border-b">
                <div className="basis-1/2 relative">
                    <Label htmlFor={`standard.dailyUploads.${index}.date`}>
                        Date
                    </Label>
                    <Input
                        type="date"
                        placeholder="Write Date"
                        name={`standard.dailyUploads.${index}.date`}
                        additionalClasses="date-input"
                        rules={{
                            required: {
                                value: true,
                                message: validationError.REQUIRED_FIELD,
                            },
                        }}
                    />
                    <span className="text-red-500 text-xs">
                        <ErrorMessage
                            errors={errors}
                            name={`standard.dailyUploads.${index}.date`}
                            render={({ message }) => (
                                <p className="flex items-center">
                                    <X size={20} color="#E6500D" />
                                    {message}
                                </p>
                            )}
                        />
                    </span>
                    <div className="absolute top-11 right-2">
                        <CalendarDays size={20} color="#85878D" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateTopic;
