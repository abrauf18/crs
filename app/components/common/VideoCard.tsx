import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlayIcon } from 'lucide-react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { timeStringToSeconds } from '@/lib/utils';
import QuestionIcon from '@/app/assets/icons/QuestionIcon';
import CheckPointIcon from '@/app/assets/icons/CheckPointIcon';

export interface Card {
    id: string;
    imageUrl: string | StaticImport;
    Text: string;
    Questions: number;
    Checkpoints: number;
    Resources: number;
    lastSeenTime: string;
    duration: string;
    completed: boolean;
    standardId: string;
}

interface VideoCardProps {
    card: Card;
}

function VideoCard({ card }: VideoCardProps) {
    const progress = Math.ceil(
        (timeStringToSeconds(card.lastSeenTime) /
            timeStringToSeconds(card.duration)) *
            100
    );
    return (
        <div className=" bg-white border rounded-2xl shadow flex flex-col justify-center md:p-4 mobile:p-2">
            <Link href="/student/learning/1/video" className="relative">
                <Image
                    src={card.imageUrl}
                    alt="video"
                    className="w-full"
                    width={200}
                    height={200}
                />
                <div className="absolute left-1/2 bottom-[29%] transform -translate-x-1/2 -translate-y-1/2">
                    <PlayIcon fill="white" color="white" size={35} />
                </div>
            </Link>
            <div className="mt-4">
                <div className="flex gap-1">
                    <p className="text-sm text-dark-gray font-semibold mb-2">
                        {card.completed ? '100' : progress}% Completed
                    </p>
                </div>
                <div className="w-full bg-gray-100 rounded-md">
                    <div
                        className="h-2 bg-primary-color rounded-md"
                        style={{
                            width: `${card.completed ? '100' : progress}%`,
                        }}
                    />
                </div>
            </div>

            <div className="mt-2">
                <h5 className="mb-2 text-lg font-semibold tracking-tight text-gray-900">
                    {card.Text}
                </h5>
                <div>
                    <div className="flex gap-2 mb-2">
                        <div className="flex gap-1 items-center text-dark-gray text-sm">
                            <QuestionIcon
                                height={17}
                                width={17}
                                color="#F59A3B"
                            />
                            <p>{`Questions (${card.Questions})`}</p>
                        </div>
                        <div className="flex gap-1 items-center text-dark-gray text-sm">
                            <CheckPointIcon
                                width={17}
                                height={17}
                                color="#7AA43E"
                            />
                            <p>{`Checkpoints (${card.Checkpoints})`}</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-end justify-end">
                    <Link
                        href={`/student/learning/${card.standardId}/video/${card.id}`}
                        className="relative"
                    >
                        <button
                            type="button"
                            className="border rounded-lg text-dark-gray px-3 py-2 text-sm font-medium text-center mr-2 lg:hover:bg-primary-color lg:hover:text-white"
                        >
                            Continue
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default VideoCard;
