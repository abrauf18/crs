import React from 'react';
import Image from 'next/image';
import CharacterImage from '@/app/assets/images/character.svg';
import QuestionMarkIcon from '@/app/assets/icons/QuestionMarkIcon';

export default function AnsweredOpenVideoQuestion({
    answer,
    answerWasCorrect,
    continueVideo,
}: {
    answer: string;
    answerWasCorrect: boolean;
    continueVideo: () => void;
}) {
    return (
        <div className="flex h-[480px] bg-light-gray rounded-lg items-center justify-center gap-24">
            <div className="sm:basis-2/5">
                <div className="text-lg">
                    <div className="flex items-center justify-center flex-col mb-8">
                        <span className="flex items-center font-semibold">
                            Submitted Answer
                            <QuestionMarkIcon fill="#7AA43E" />
                        </span>
                        <span className="text-dark-gray text-sm font-medium text-center flex items-center justify-center">
                            Your Answer has been submitted Continue Watching
                        </span>
                    </div>
                    <div className="flex justify-center">
                        <Image
                            src={CharacterImage}
                            width={100}
                            height={100}
                            alt="quiz"
                        />
                    </div>
                    <div className="flex flex-col items-baseline mb-3 justify-center">
                        <span className="mt-12 text-sm font-semibold text-center">
                            &quot;{answer}&quot;
                        </span>
                    </div>
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
