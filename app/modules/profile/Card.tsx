import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface CardProps {
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;
    header: string;
    description: number | string;
    iconColor?: string;
    iconBg?: string;
    border?: string;
}

function Card({
    Icon,
    header,
    description,
    iconColor,
    iconBg,
    border,
}: CardProps) {
    return (
        <div
            className={`col-span-1 mobile:col-span-2 p-4 flex flex-col justify-evenly h-[163px] w-full rounded-lg border ${border}  `}
        >
            {/* <Icon width={25} height={25} /> */}
            <div
                className={`bg-green-100 px-3 h-fit py-3 rounded-full w-fit ${
                    iconBg ?? ''
                }`}
            >
                <Icon stroke={iconColor} width="30" height="30" />
            </div>
            <p className="text-[16px]">{header}</p>
            <h1 className="font-semibold text-3xl">{description}</h1>
        </div>
    );
}

export default Card;
