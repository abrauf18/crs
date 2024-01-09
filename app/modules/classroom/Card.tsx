import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface CardProps {
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;
    periods: string;
    students: number | string;
    iconColor?: string;
    iconBg?: string;
    hoverColor?: string;
}

function Card({
    Icon,
    periods,
    students,
    iconColor,
    iconBg,
    hoverColor,
}: CardProps) {
    return (
        <div
            className={`col-span-1 mobile:col-span-2 p-4 flex flex-col justify-evenly h-[163px] w-full rounded-lg border  ${
                hoverColor ? `hover:${hoverColor}` : ''
            } `}
        >
            {/* <Icon width={25} height={25} /> */}
            <div
                className={`bg-green-100 px-3 h-fit py-3 rounded-full w-fit ${
                    iconBg ?? ''
                }`}
            >
                <Icon fill={iconColor ?? '#7AA43E'} width="30" height="30" />
            </div>
            <p className="text-[16px]">{periods}</p>
            <h1 className="font-semibold text-3xl">{students}</h1>
        </div>
    );
}

export default Card;
