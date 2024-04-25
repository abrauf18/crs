/* eslint-disable react/no-array-index-key */
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { FileVideoIcon } from 'lucide-react';
import {
    useForm,
    SubmitHandler,
    FieldValues,
    FormProvider,
} from 'react-hook-form';
import { Label } from '@/app/components/ui/label';
import { createVideoQuestionsAPI } from '@/app/api/video';
import ModalFooter from '@/app/components/common/ModalFooter';
import Input from '@/app/components/common/Input';
import { validationError } from '@/lib/utils';
import Select from '@/app/components/common/DropDown';
import { ModalHeader } from '../../components/common/ModalHeader';

interface Question {
    options: { [key: string]: string };
    statement: string;
    correctOption: string;
    correctOptionExplanation: string;
    popupTime: string;
}

type ResourceFormData = {
    statement: string;
    questionType: 'open' | 'mcq';
    popupTime: string;
    options: { [key: string]: string };
    correctOption: string;
    correctOptionExplanation: string;
};

const questionsTypes = [
    { label: 'open', value: 'Open' },
    { label: 'mcq', value: 'Mcq' },
];

const answerOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
    { label: 'Option 4', value: 'option4' },
];

function AddQuestions({
    videoId,
    onClose,
    onButtonClick,
}: {
    videoId: string;
    onClose?: () => void;
    onButtonClick: () => void;
}) {
    const { data } = useSession();
    const initialQuestions: Question[] = [];
    const [questions, setQuestions] = useState(initialQuestions);
    const methods = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
    });
    const questionType = methods.watch('questionType');

    const addQuestion = (formData: ResourceFormData) => {
        let newQuestion: Question;

        if (formData.questionType === 'open') {
            newQuestion = {
                statement: formData.statement,
                popupTime: formData.popupTime,
                options: {},
                correctOption: '',
                correctOptionExplanation: '',
            };
        } else {
            newQuestion = {
                statement: formData.statement,
                popupTime: formData.popupTime,
                options: { ...formData.options },
                correctOption: formData.correctOption,
                correctOptionExplanation: formData.correctOptionExplanation,
            };
        }

        setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
        toast.success(`${questions.length + 1} Question added successfully`);
        methods.reset();
    };

    const onFormSubmit = async () => {
        try {
            // // Transform each question in the questions array
            const transformedQuestions = questions.map((question) => ({
                statement: question.statement,
                options: question.options,
                correctOption: question.correctOption,
                correctOptionExplanation: question.correctOptionExplanation,
                totalMarks: 0, // Assuming totalMarks is always 0 for now
                popupTime: question.popupTime,
            }));

            const response: any = await createVideoQuestionsAPI({
                videoId,
                questions: transformedQuestions,
                accessToken: data?.user?.accessToken || '',
            });
            if (response.status !== 200) {
                return toast.error(
                    response?.message || 'Failed to add question'
                );
            }

            if (onButtonClick) {
                onButtonClick();
            }

            return toast.success('All Questions added successfully');
        } catch (error: any) {
            return toast.error(error?.message || 'Failed to add question');
        }
    };

    return (
        <section className="w-full bg-white h-screen py-4 shadow-lg">
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(
                        addQuestion as SubmitHandler<FieldValues>
                    )}
                    className="h-[90%] overflow-y-scroll w-full px-6"
                >
                    <div className="">
                        <ModalHeader
                            headerText={{
                                heading: 'Upload Video',
                                tagline: 'let’s Upload Video For Your User',
                            }}
                            Icon={FileVideoIcon}
                            onClose={onClose}
                        />
                        {/* <FileUploading isCompleted progress={0} /> */}
                        <div className="mt-3 flex justify-end w-full">
                            <button
                                type="submit"
                                className="text-white text-sm w-32 text-center bg-primary-color p-2 rounded-lg"
                                // onClick={addQuestion}
                            >
                                Add Question
                            </button>
                        </div>
                        <div>
                            <Label htmlFor="question" className="font-semibold">
                                {`Question ${questions.length + 1}`}
                            </Label>
                            <div className="flex  items-center gap-5">
                                <Input
                                    additionalClasses="w-full"
                                    name="statement"
                                    placeholder="Write Question"
                                    type="text"
                                    rules={{
                                        required: {
                                            value: true,
                                            message:
                                                validationError.REQUIRED_FIELD,
                                        },
                                    }}
                                />
                                <Select
                                    additionalClasses="w-2/5"
                                    name="questionType"
                                    options={questionsTypes}
                                />
                            </div>
                            <div className="flex flex-col space-y-1 mt-2">
                                <Label
                                    htmlFor="popupTime"
                                    className="font-semibold text-md"
                                >
                                    Timeline
                                </Label>
                                <Input
                                    name="popupTime"
                                    placeholder="Enter Question Statement"
                                    type="text"
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
                        {questionType === 'mcq' && (
                            <div className="flex flex-col mt-5">
                                <Label
                                    htmlFor="option1"
                                    className="font-semibold mt-2"
                                >
                                    Options
                                </Label>
                                {[
                                    'option1',
                                    'option2',
                                    'option3',
                                    'option4',
                                ].map((optionField, optionIndex) => (
                                    <div key={optionField} className="mt-2">
                                        <Input
                                            name={`options.${optionField}`}
                                            placeholder="Enter Option Statement"
                                            type="text"
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message:
                                                        validationError.REQUIRED_FIELD,
                                                },
                                            }}
                                        />
                                    </div>
                                ))}
                                <Label
                                    htmlFor="correctOption"
                                    className="font-semibold mt-3"
                                >
                                    Correct Option
                                </Label>
                                <Select
                                    name="correctOption"
                                    options={answerOptions}
                                    rules={{
                                        required: {
                                            value: true,
                                            message:
                                                validationError.REQUIRED_FIELD,
                                        },
                                    }}
                                />
                                <Label
                                    htmlFor="correctOptionExplanation"
                                    className="font-semibold mt-4"
                                >
                                    Correct Answer Explanation
                                </Label>
                                <Input
                                    name="correctOptionExplanation"
                                    placeholder="Enter Correct Option Explanation"
                                    type="text"
                                    rules={{
                                        required: {
                                            value: true,
                                            message:
                                                validationError.REQUIRED_FIELD,
                                        },
                                    }}
                                />
                            </div>
                        )}

                        <hr className="my-5" />
                    </div>

                    <div onClick={onFormSubmit}>
                        <ModalFooter text="Next" buttonType="button" />
                    </div>
                </form>
            </FormProvider>
        </section>
    );
}

export default AddQuestions;
