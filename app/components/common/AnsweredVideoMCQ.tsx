import Image from 'next/image';
import React from 'react';
import CharacterImage from '@/app/assets/images/character.svg';
import QuestionMarkIcon from '@/app/assets/icons/QuestionMarkIcon';
import AngryCharacter from '@/app/assets/images/angryCharacter.svg';

export default function AnsweredVideoMCQ({
    question,
    continueVideo,
}: {
    question: {
        id: string;
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
    continueVideo: () => void;
}) {
    return (
        <div className="flex h-[480px] bg-light-gray rounded-lg items-center justify-center gap-24">
            <div className="text-center mobile:hidden">
                {question.attempt?.obtainedMarks === question.totalMarks ? (
                    <Image
                        src={CharacterImage}
                        width={150}
                        height={150}
                        alt="quiz"
                    />
                ) : (
                    <Image
                        src={AngryCharacter}
                        width={150}
                        height={150}
                        alt="quiz"
                    />
                )}
            </div>
            <div className="sm:basis-2/5">
                <div className="text-lg">
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
                    {Object.entries(question?.options).map(
                        ([optionKey, optionValue], optionIndex) => (
                            <div key={optionKey} className="mt-2">
                                <input
                                    type="radio"
                                    className="mr-2"
                                    id={optionKey}
                                    value={optionKey}
                                    checked={
                                        question?.attempt?.answer === optionKey
                                    }
                                    readOnly
                                />
                                <label htmlFor={optionKey}>{optionValue}</label>
                            </div>
                        )
                    )}
                    <button
                        className="bg-primary-color text-sm text-white px-6 py-2 rounded-lg hover:bg-orange-400 float-right mt-2"
                        type="button"
                        onClick={continueVideo}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}
