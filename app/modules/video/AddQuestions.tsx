/* eslint-disable react/no-array-index-key */
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { FileVideoIcon } from 'lucide-react';
import { Label } from '@/app/components/ui/label';
import { createVideoQuestionsAPI } from '@/app/api/video';
import ModalFooter from '@/app/components/common/ModalFooter';
import AppInput from '@/app/components/common/AppInput';
import FileUploading from '../../components/common/FileUploading';
import { ModalHeader } from '../../components/common/ModalHeader';

interface Question {
    options: { [key: string]: string };
    statement: string;
    correctOption: string;
    correctOptionExplanation: string;
    popupTime: string;
    type: 'Open' | 'Mcq'; // Add the type field
}

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
    const initialQuestions: Question[] = [
        {
            statement: '',
            options: {},
            correctOption: '',
            correctOptionExplanation: '',
            popupTime: '',
            type: 'Open',
        },
    ];

    const [questions, setQuestions] = useState(initialQuestions);

    const addQuestion = () => {
        const newQuestion: Question = {
            statement: '',
            options: {},
            correctOption: '',
            correctOptionExplanation: '',
            popupTime: '',
            type: 'Open',
        };
        setQuestions([...questions, newQuestion]);
    };

    const handleQuestionChange = (
        index: number,
        field: keyof Question,
        value: string
    ) => {
        const newQuestions: Question[] = [...questions];
        if (field.startsWith('option')) {
            const optionIndex = parseInt(field.slice(-1), 10);
            if (newQuestions[index].type === 'Mcq') {
                newQuestions[index].options = {
                    ...newQuestions[index].options,
                    [`option${optionIndex}`]: value,
                };
            }
        } else if (field === 'type') {
            newQuestions[index][field] = value as 'Open' | 'Mcq';
            if (value === 'Mcq') {
                // Initialize options with four empty strings if the type is 'Mcq'
                newQuestions[index].options = {
                    option1: '',
                    option2: '',
                    option3: '',
                    option4: '',
                };
                newQuestions[index].correctOption = 'option1';
            } else {
                // Reset options to an empty object if the type is 'Open'
                newQuestions[index].options = {};
                newQuestions[index].correctOption = '';
            }
        } else {
            newQuestions[index][field] = value;
        }
        setQuestions(newQuestions);
    };

    const onFormSubmit = async () => {
        try {
            // Transform each question in the questions array
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

            return toast.success('Question added successfully');
        } catch (error: any) {
            return toast.error(error?.message || 'Failed to add question');
        }
    };

    return (
        <section className="w-full bg-white h-screen py-4 shadow-lg">
            <div className="h-[90%] overflow-y-auto w-full px-6">
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
                        type="button"
                        className="text-white text-sm w-32 text-center bg-primary-color p-2 rounded-lg"
                        onClick={addQuestion}
                    >
                        Add Question
                    </button>
                </div>
                {questions.map((question, index) => (
                    <div key={index}>
                        <div>
                            <Label
                                htmlFor={`question-${index}`}
                                className="font-semibold"
                            >
                                Question {index + 1}
                            </Label>
                            <div className="flex justify-between">
                                <AppInput
                                    id={`question-${index}`}
                                    placeholder="Write Question"
                                    additionalClasses="w-full"
                                    onChange={(e) =>
                                        handleQuestionChange(
                                            index,
                                            'statement',
                                            e.target.value
                                        )
                                    }
                                />

                                <select
                                    id={`type-${index}`}
                                    className="border rounded-lg p-3 ml-2"
                                    value={question.type}
                                    onChange={(e) =>
                                        handleQuestionChange(
                                            index,
                                            'type',
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="Open">Open</option>
                                    <option value="Mcq">Mcq</option>
                                </select>
                            </div>
                            <Label
                                htmlFor={`timeline-${index}`}
                                className="font-semibold"
                            >
                                Timeline
                            </Label>
                            <AppInput
                                id={`timeline-${index}`}
                                placeholder="Add Timeline"
                                additionalClasses="w-full"
                                onChange={(e) =>
                                    handleQuestionChange(
                                        index,
                                        'popupTime',
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        {question.type === 'Mcq' && (
                            <div className="flex flex-col mt-5">
                                <Label
                                    htmlFor={`options-${index}`}
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
                                        <AppInput
                                            id={`option-${index}-${optionIndex}`}
                                            placeholder={`Option ${
                                                optionIndex + 1
                                            }`}
                                            additionalClasses="w-full"
                                            onChange={(e) =>
                                                handleQuestionChange(
                                                    index,
                                                    optionField as keyof Question,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                ))}
                                <Label
                                    htmlFor={`correctOption-${index}`}
                                    className="font-semibold mt-3"
                                >
                                    Correct Option
                                </Label>
                                {/* <AppInput
                                    id={`correctOption-${index}`}
                                    placeholder="1,2,3,4"
                                    additionalClasses="mt-2"
                                    onChange={(e) =>
                                        handleQuestionChange(
                                            index,
                                            'correctOption',
                                            e.target.value
                                        )
                                    }
                                /> */}
                                <select
                                    id={`type-${index}`}
                                    className="border rounded-lg p-3 mt-2 w-full"
                                    value={question.correctOption}
                                    onChange={(e) =>
                                        handleQuestionChange(
                                            index,
                                            'correctOption',
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="option1">Option1</option>
                                    <option value="option2">Option2</option>
                                    <option value="option3">Option3</option>
                                    <option value="option4">Option4</option>
                                </select>
                                <Label
                                    htmlFor={`correctOptionExplanation-${index}`}
                                    className="font-semibold mt-4"
                                >
                                    Correct Answer Explanation
                                </Label>
                                <textarea
                                    id={`correctOptionExplanation-${index}`}
                                    placeholder="Write Answer Explanation Here"
                                    className="mt-1 block w-full px-3 py-3 bg-slate-100 border rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                    onChange={(e) =>
                                        handleQuestionChange(
                                            index,
                                            'correctOptionExplanation',
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        )}

                        <hr className="my-5" />
                    </div>
                ))}
            </div>
            <div onClick={onFormSubmit}>
                <ModalFooter text="Next" />
            </div>
        </section>
    );
}

export default AddQuestions;
