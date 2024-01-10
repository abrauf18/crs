'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import PptIcon from '@/app/assets/icons/PptIcon';
import XlsIcon from '@/app/assets/icons/XlsIcon';

export interface Resource {
    id: string;
    imageUrl: string | StaticImport;
    resourceType: string;
}

interface ResourceCardProp {
    card: Resource;
}

function ResourceCard({ card }: ResourceCardProp) {
    return (
        <div className=" bg-white border rounded-lg shadow flex flex-col justify-center md:p-4 mobile:p-2 ">
            <div className="relative">
                <Image src={card.imageUrl} alt="resource" className="w-full " />
                <div className="bg-sky-400 w-fit p-2 absolute left-0 top-0 z-10 rounded-lg">
                    {card.resourceType === 'ppt' && <PptIcon />}
                    {card.resourceType === 'xls' && <XlsIcon />}
                </div>
            </div>
        </div>
    );
}

export default ResourceCard;
