import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { HelpCircle } from 'lucide-react';

export interface Card {
    id: string;
    imageUrl: string | StaticImport;
    Text: string;
}

interface VideoCardProps {
    card: Card;
}

function VideoCard({ card }: VideoCardProps) {
    return (
        <div className=" bg-white border rounded-lg shadow flex flex-col justify-center md:p-4 mobile:p-2">
            <Link href="#" className="relative">
                <Image src={card.imageUrl} alt="video" className="w-72" />
                <div className="absolute left-3 top-3 transform -translate-x-1/2 -translate-y-1/2">
                    <HelpCircle fill="#54C3F4" color="white" size={35} />
                </div>
            </Link>
            <div className="mt-2">
                <h5 className="mb-2 text-md font-semibold tracking-tight text-gray-900">
                    {card.Text}
                </h5>
                <Link
                    href="#"
                    className="border rounded-lg text-white px-3 py-2 text-sm font-medium text-center mr-2 float-right bg-primary-color"
                >
                    Selected
                </Link>
            </div>
        </div>
    );
}

export default VideoCard;
