import Image from 'next/image';
import React from 'react';
import Avatar from '@/app/assets/images/UserImage.svg';
import { ArrowRightCircle } from 'lucide-react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export interface StudentCardInterface {
    id: string;
    name: string;
    image: string | StaticImport;
}

interface StudentCardProp {
    student: StudentCardInterface;
}
function StudentCard({ student }: StudentCardProp) {
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
                <Image src={Avatar} alt="User" width={30} height={30} />
                <p className="font-medium text-base">John Doe</p>
            </div>
            <div className="cursor-pointer">
                <ArrowRightCircle color="#292D32" size={20} />
            </div>
        </div>
    );
}

export default StudentCard;
