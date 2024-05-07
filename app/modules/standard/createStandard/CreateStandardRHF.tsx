'use client';

import React, { useEffect, useRef } from 'react';
import { CalendarDays } from 'lucide-react';
import { Label } from '@/app/components/ui/label';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ErrorMessage } from '@hookform/error-message';
import Input from '@/app/components/common/Input';
import Select from '@/app/components/common/DropDown';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { validationError } from '@/lib/utils';
import CreateTopic from '../CreateTopicRHF';
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
export enum ResourceType {
    VIDEO = 'video',
    SLIDESHOW = 'slideshow',
    WORKSHEET = 'worksheet',
    EXIT_TICKET_TEST = 'exit-ticket-test',
    QUIZ = 'quiz',
}
interface Standard {
    id: string;
    name: string;
    description: string;
}
interface FormValues {
    standard: Standard;
}

function CreateStandard() {
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

    const onSubmit = async (formdata: FormValues) => {
        if (!data) {
            return;
        }

        console.log('formdata: ', formdata);
    };

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
                                    // additionalClasses="mb-5 mt-2 block w-full px-3 py-2 bg-slate-100 border rounded-lg text-sm placeholder-slate-400
                                    // focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
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
                                    // additionalClasses="mb-5 mt-2 block w-full px-3 py-2 bg-slate-100 border rounded-lg text-sm placeholder-slate-400
                                    // focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
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
                            <div className=" cursor-pointer px-4 py-2 border text-sm text-dark-gray rounded-lg flex items-center justify-between">
                                <button type="submit">Add More</button>
                            </div>
                        </div>
                        <CreateTopic />
                    </div>
                    <StandardCard data={data} />
                </form>
            </FormProvider>
        </section>
    );
}

export default CreateStandard;
