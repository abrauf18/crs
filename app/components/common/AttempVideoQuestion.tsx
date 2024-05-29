import Image from 'next/image';
import {
    useForm,
    SubmitHandler,
    FieldValues,
    FormProvider,
} from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { validationError } from '@/lib/utils';
import CharacterImage from '@/app/assets/images/character.svg';
import QuestionMarkIcon from '@/app/assets/icons/QuestionMarkIcon';
import FormError from './FormError';

export default function AttempVideoQuestion({
    question,
    setCurrentQuestion,
    setPlaying,
    handlePlayAfterQuestion,
}: {
    question: {
        statement: string;
        options: { [key: string]: string };
        correctOption: string;
        correctOptionExplanation: string;
        totalMarks: number;
        attempt?: {
            id: string;
            answer: string;
            obtainedMarks: number;
        };
    };
    setCurrentQuestion: (question: null) => void;
    setPlaying: (isPlaying: boolean) => void;
    handlePlayAfterQuestion: () => void;
}) {
    const methods = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
    });

    const [questionType, setQuestionType] = useState('');

    // Determine question type when question prop changes
    useEffect(() => {
        if (question && question.options) {
            if (Object.keys(question.options).length > 0) {
                setQuestionType('mcq');
            } else {
                setQuestionType('open');
            }
        }
    }, [question]);

    function handleUpload(formData: any) {
        const { selectedOption } = methods.getValues();
        setCurrentQuestion(null);
        setPlaying(true);
        handlePlayAfterQuestion();
    }

    return (
        <div className="flex h-[480px] bg-light-gray rounded-lg items-center justify-center gap-24">
            <div className="text-center mobile:hidden">
                <Image
                    src={CharacterImage}
                    width={150}
                    height={150}
                    alt="quiz"
                />
            </div>
            <div className="sm:basis-2/5">
                <div className="text-lg">
                    <FormProvider {...methods}>
                        <form
                            className="p-2"
                            onSubmit={methods.handleSubmit(
                                handleUpload as SubmitHandler<FieldValues>
                            )}
                        >
                            <div className="flex items-center justify-center flex-col mb-8">
                                <span className="flex items-center font-semibold">
                                    Question
                                    <QuestionMarkIcon fill="#7AA43E" />
                                </span>
                                <span className="text-dark-gray text-sm font-medium">
                                    Answer Below Question to Move Forward!
                                </span>
                            </div>
                            <div className="flex flex-col items-baseline mb-3">
                                <span className="mt-12 text-sm font-semibold">
                                    {question?.statement}
                                </span>
                                <span className="mt-1 text-sm font-medium">
                                    Answer:
                                </span>
                            </div>
                            {questionType === 'open' && (
                                <>
                                    <textarea
                                        placeholder="Write Your Answer"
                                        className=" mt-1 block w-full h-[120px] px-3 py-3 bg-white border rounded-md text-sm shadow-sm placeholder-slate-400
                                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 font-medium"
                                        {...methods.register('statement', {
                                            required: {
                                                value: true,
                                                message:
                                                    validationError.REQUIRED_FIELD,
                                            },
                                        })}
                                    />
                                    <FormError name="statement" />
                                </>
                            )}
                            {questionType === 'mcq' && (
                                <>
                                    {Object.entries(question?.options).map(
                                        (
                                            [optionKey, optionValue],
                                            optionIndex
                                        ) => (
                                            <div
                                                key={optionKey}
                                                className="mt-2"
                                            >
                                                <input
                                                    type="radio"
                                                    className="mr-2"
                                                    id={optionKey}
                                                    value={optionKey}
                                                    {...methods.register(
                                                        'selectedOption'
                                                    )}
                                                />
                                                <label htmlFor={optionKey}>
                                                    {optionValue}
                                                </label>
                                            </div>
                                        )
                                    )}
                                </>
                            )}
                            <button
                                className="bg-primary-color text-sm text-white px-6 py-2 rounded-lg hover:bg-orange-400 float-right mt-2"
                                type="submit"
                            >
                                Submit
                            </button>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>
    );
}
