'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlayIcon } from 'lucide-react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import QuestionIcon from '@/app/assets/icons/QuestionIcon';
import ResourceIcon from '@/app/assets/icons/ResourceIcon';
import CheckPointIcon from '@/app/assets/icons/CheckPointIcon';

export interface Card {
    id: string;
    imageUrl: string | StaticImport;
    Text: string;
    Questions: number;
    Checkpoints: number;
    Resources: number;
}

interface VideoCardProps {
    card: Card;
    isModal?: boolean;
}

function VideoCard({ card, isModal }: VideoCardProps) {
    return (
        <div className=" bg-white border rounded-2xl shadow flex flex-col justify-center md:p-4 mobile:p-2">
            <Link href="/student/learning/1/video" className="relative">
                <Image src={card.imageUrl} alt="video" className="w-full" />
                <div className="absolute left-1/2 bottom-[29%] transform -translate-x-1/2 -translate-y-1/2">
                    <PlayIcon fill="white" color="white" size={35} />
                </div>
            </Link>
            <div className="mt-4">
                <div className="flex gap-1">
                    <p className="text-sm text-dark-gray font-semibold mb-2">
                        35% Completed
                    </p>
                </div>
                <div className="w-full bg-gray-100 rounded-md">
                    <div
                        className="h-2 bg-primary-color rounded-md"
                        style={{ width: '35%' }}
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
                    <div className="flex gap-1 items-center mb-5 text-dark-gray text-sm">
                        <ResourceIcon height={17} width={17} color="#54C3F4" />
                        <p>{`Resources (${card.Resources})`}</p>
                    </div>
                </div>

                <div className="flex items-end justify-end">
                    <button
                        type="button"
                        // href={route && id ? `${route}/${id}` : '#'}
                        className="border rounded-lg text-dark-gray px-3 py-2 text-sm font-medium text-center mr-2 lg:hover:bg-primary-color lg:hover:text-white"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VideoCard;
