'use client';

import React from 'react';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import PptIcon from '@/app/assets/icons/PptIcon';
import XlsIcon from '@/app/assets/icons/XlsIcon';

export interface FileInterface {
    id: string;
    imageUrl: string | StaticImport;
    resourceType: string;
    name: string;
    btnText: string;
}

interface FileCardProp {
    card: FileInterface;
}

function FileCard({ card }: FileCardProp) {
    return (
        <div className=" bg-white border rounded-lg shadow flex flex-col justify-center md:p-4 mobile:p-2 ">
            <div className="relative">
                <Image src={card.imageUrl} alt="resource" className="w-full " />
                <div className="bg-sky-400 w-fit p-2 absolute left-0 top-0 z-10 rounded-lg">
                    {card.resourceType === 'ppt' && <PptIcon />}
                    {card.resourceType === 'xls' && <XlsIcon />}
                </div>
            </div>
            <h5 className="mb-2 text-lg font-semibold tracking-tight text-gray-900 mt-5">
                {card.name}
            </h5>
            <div className="flex justify-end px-4">
                <p className="px-5 py-3 bg-primary-color rounded-2xl text-white w-fit ">
                    {card.btnText}
                </p>
            </div>
        </div>
    );
}

export default FileCard;
