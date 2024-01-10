'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import QuestionIcon from '@/app/assets/icons/QuestionIcon';
import ResourceIcon from '@/app/assets/icons/ResourceIcon';
import CheckPointIcon from '@/app/assets/icons/CheckPointIcon';
import { PlayIcon } from 'lucide-react';
import CardContent, { IconProps } from '@/app/components/common/CardContent';

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
    const Icons: IconProps = {
        FirstIcon: QuestionIcon,
        SecondIcon: CheckPointIcon,
        ThirdIcon: ResourceIcon,
    };
    return (
        <div className=" bg-white border rounded-lg shadow flex flex-col justify-center md:p-4 mobile:p-2">
            <Link href="#" className="relative">
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
            <CardContent
                id={card.Questions.toString()}
                heading={card.Text}
                first={`Questions (${card.Questions})`}
                second={`Checkpoints (${card.Checkpoints})`}
                third={`Resources (${card.Resources})`}
                Icons={Icons}
                isModal={isModal}
            />
        </div>
    );
}

export default VideoCard;
