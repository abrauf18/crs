'use client';

import { toast } from 'react-toastify';
import { CalendarDays } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
import { set, useFieldArray, useFormContext } from 'react-hook-form';
import { validationError } from '@/lib/utils';
import { Label } from '@/app/components/ui/label';
import Input from '@/app/components/common/Input';
import Select from '@/app/components/common/DropDown';
import VideoModal from './VideoModal';

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
export const resourceDropDownOptions = [
    { label: ResourceType.QUIZ, value: 'Quiz' },
    { label: ResourceType.VIDEO, value: 'Video' },
    { label: ResourceType.SLIDESHOW, value: 'Slideshow' },
    { label: ResourceType.WORKSHEET, value: 'Worksheet' },
    { label: ResourceType.EXIT_TICKET_TEST, value: 'Exit-Ticket-Test' },
];
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

function CreateTopic({
    index,
    allSelectedResources,
    setAllSelectedResources,
}: {
    index: number;
    allSelectedResources: { resourceId: string; resourceType: ResourceType }[];
    setAllSelectedResources: (
        resources: { resourceId: string; resourceType: ResourceType }[]
    ) => void;
}) {
    const { data } = useSession();
    const topicAddedRef = useRef(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isDisplayModal, setIsDisplayModal] = useState(false);
    const { control, watch } = useFormContext<FormValues>();

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
            });
            topicAddedRef.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    console.log('all selected resources: ', allSelectedResources);
    return (
        <div>
            <div className=" cursor-pointer px-4 py-2 border text-sm text-dark-gray rounded-lg flex items-center justify-between">
                <button
                    type="button"
                    onClick={() => {
                        if (
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
                        });
                        setAllSelectedResources([
                            ...allSelectedResources,
                            {
                                resourceId: '',
                                resourceType: ResourceType.VIDEO,
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
                        <div className="basis-1/2 relative">
                            <Label
                                htmlFor={`standard.dailyUploads.${index}.topics.${topicIndex}.type`}
                                className="font-semibold"
                            >
                                Type
                            </Label>
                            <div className="flex justify-between items-start gap-1">
                                <Select
                                    additionalClasses="!w-2/5"
                                    name={`standard.dailyUploads.${index}.topics.${topicIndex}.type`}
                                    options={resourceDropDownOptions}
                                    selectedOption={ResourceType.VIDEO}
                                />
                                <div className="cursor-pointer border text-sm text-dark-gray rounded-lg text-center w-24 px-1 py-2 mt-2">
                                    <button
                                        className="text-sm text-center"
                                        type="button"
                                        onClick={() =>
                                            handleOpenModal(topicIndex)
                                        }
                                    >
                                        Select
                                    </button>
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
                            />
                        )}
                    </div>
                </div>
            ))}
            <div className="sm:flex justify-between items-center my-5 gap-5">
                <div className="basis-1/2 relative">
                    <Label htmlFor={`standard.dailyUploads.${index}.date`}>
                        Date
                    </Label>
                    <Input
                        type="text"
                        placeholder="Write Date"
                        name={`standard.dailyUploads.${index}.date`}
                        rules={{
                            required: {
                                value: true,
                                message: validationError.REQUIRED_FIELD,
                            },
                        }}
                    />
                    <div className="absolute top-10 right-2">
                        <CalendarDays size={20} color="#85878D" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateTopic;
