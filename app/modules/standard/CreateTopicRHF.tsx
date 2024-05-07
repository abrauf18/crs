'use client';

import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import React, { useEffect, useRef, useState } from 'react';
import { Label } from '@/app/components/ui/label';
import { getResourcesByTypeAPI } from '@/app/api/resource';
import Select from '@/app/components/common/DropDown';
import { validationError } from '@/lib/utils';
import Input from '@/app/components/common/Input';
import QuizModal from './QuizModal';
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
    id: string;
    type: ResourceType;
    resource: Resource;
}
interface DailyUpload {
    id: string;
    date: string;
    topics: Topic[];
}
interface FormValues {
    dailyUpload: DailyUpload;
}

function CreateTopic() {
    const { data } = useSession();
    const topicAddedRef = useRef(false);
    const [selectedType, setSelectedType] = useState('video');
    const [resources, setResources] = useState([]);
    const [isDisplayModal, setIsDisplayModal] = useState(false);
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
        fields: topicFields,
        append: appendTopic,
        remove: removeTopic,
    } = useFieldArray<FormValues>({
        control,
        name: `dailyUpload.topics`,
    });

    const handleOpenModal = () => {
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
                id: '',
                type: ResourceType.VIDEO,
                resource: { id: '', name: '', url: '' },
            });
            topicAddedRef.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <div>
            {topicFields.map((topic, index) => (
                <div key={topic.id}>
                    <div className="sm:flex justify-between items-center gap-5 w-full mt-3">
                        <div className="basis-1/2 relative">
                            <Label
                                htmlFor={`dailyUpload.topics.${index}.type`}
                                className="font-semibold"
                            >
                                Type
                            </Label>
                            <div className="flex justify-between items-start gap-1">
                                <Select
                                    additionalClasses="!w-2/5"
                                    name={`dailyUpload.topics.${index}.type`}
                                    options={resourceDropDownOptions}
                                    selectedOption={ResourceType.VIDEO}
                                />
                                <div className="cursor-pointer border text-sm text-dark-gray rounded-lg text-center w-24 px-1 py-2 mt-2">
                                    <button
                                        className="text-sm text-center"
                                        type="button"
                                        onClick={handleOpenModal}
                                    >
                                        Select
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="basis-1/2 relative">
                        <Label htmlFor="dailyUpload.date">Date</Label>
                        <Input
                            type="text"
                            placeholder="Write Date"
                            name="dailyUpload.date"
                            rules={{
                                required: {
                                    value: true,
                                    message: validationError.REQUIRED_FIELD,
                                },
                            }}
                        />
                    </div>
                    <div className="fixed right-0 top-0 z-50 w-full md:w-[60%] lg:w-[30%]">
                        {isDisplayModal &&
                            selectedType.toLowerCase() === 'video' && (
                                <VideoModal
                                    onClose={handleCloseModal}
                                    allResources={resources}
                                />
                            )}
                        {isDisplayModal &&
                            selectedType.toLowerCase() === 'quiz' && (
                                <QuizModal onClose={handleCloseModal} />
                            )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CreateTopic;
