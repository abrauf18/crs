'use client';

import React from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import DocxIcon from '@/app/assets/icons/DocxIcon';
import { Edit, Eye, Trash } from 'lucide-react';
import UploadAssignmentModal from './UploadAssignmentModal';

export interface AssignmentInterface {
    id: string;
    fileName: string;
    Icon?: string | StaticImport;
}

interface AssignmentCardProp {
    card: AssignmentInterface;
    isReferenceMaterial?: boolean;
}

function AssignmentCard({ card, isReferenceMaterial }: AssignmentCardProp) {
    return (
        <div className=" bg-gray-50 border my-5 w-full rounded-lg  flex  justify-between items-center md:p-4 mobile:p-3 ">
            <div className="flex space-x-2 items-center">
                <DocxIcon />
                <p className="font-semibold">{card.fileName}</p>
            </div>
            <div className="flex">
                <div className="mr-2 bg-light-orange rounded-md p-2 cursor-pointer">
                    <Eye color="#F59A3B" width={20} height={20} />
                </div>
                {!isReferenceMaterial && (
                    <>
                        <div className="mr-2 bg-green-100 rounded-md p-2 cursor-pointer">
                            <Edit color="#7AA43E" width={20} height={20} />
                        </div>
                        <div className="mr-2 bg-red-100 rounded-md p-2 cursor-pointer">
                            <Trash color="#E6500D" width={18} height={18} />
                        </div>
                    </>
                )}
            </div>
            <div className="absolute right-0 top-0 z-50 lg:w-[25%]">
                <UploadAssignmentModal />
            </div>
        </div>
    );
}

export default AssignmentCard;
