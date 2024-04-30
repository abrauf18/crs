'use client';

import React, { useState, useEffect } from 'react';
import {
    useForm,
    SubmitHandler,
    FieldValues,
    FormProvider,
} from 'react-hook-form';
import { validationError } from '@/lib/utils';
import Input from './Input';

function VideoQuestion({
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
    };
    setCurrentQuestion: (question: null) => void;
    setPlaying: (isPlaying: boolean) => void;
    handlePlayAfterQuestion: () => void;
}) {
    // const { register } = useFormContext();
    const [questionType, setQuestionType] = useState('');

    // Determine question type when question prop changes
    useEffect(() => {
        if (question && question.options) {
            // console.log(Object.keys(question.options).length);
            if (Object.keys(question.options).length > 0) {
                setQuestionType('mcq');
            } else {
                setQuestionType('open');
            }
        }
    }, [question]);

    const methods = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
    });

    function handleUpload(formData: any) {
        const { selectedOption } = methods.getValues();
        // console.log(formData, selectedOption);
        setCurrentQuestion(null);
        setPlaying(true);
        handlePlayAfterQuestion();
    }

    return (
        <div className="text-lg flex justify-center">
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(
                        handleUpload as SubmitHandler<FieldValues>
                    )}
                >
                    <div>{question?.statement}</div>
                    {questionType === 'open' && (
                        <Input
                            additionalClasses="w-full"
                            name="statement"
                            placeholder="Write Question"
                            type="text"
                            rules={{
                                required: {
                                    value: true,
                                    message: validationError.REQUIRED_FIELD,
                                },
                            }}
                        />
                    )}
                    {questionType === 'mcq' && (
                        <>
                            {Object.entries(question?.options).map(
                                ([optionKey, optionValue], optionIndex) => (
                                    <div key={optionKey} className="mt-2">
                                        <input
                                            type="radio"
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
                    <button type="submit">Submit</button>
                </form>
            </FormProvider>
        </div>
    );
}

export default VideoQuestion;
