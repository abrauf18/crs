import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface ClassroomCardProps {
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;
    periods: string;
    students: number | string;
    iconColor?: string;
    iconBg?: string;
    hoverColor?: string;
}

function ClassroomCard({
    Icon,
    periods,
    students,
    iconColor,
    iconBg,
    hoverColor,
}: ClassroomCardProps) {
    return (
        <div
            className={`col-span-1 mobile:col-span-2 relative group p-4 flex flex-col justify-evenly h-[163px] w-full rounded-lg border ${
                hoverColor ? `hover:${hoverColor}` : ''
            }`}
        >
            <div
                className={`bg-green-100 px-3 h-fit py-3 rounded-full w-fit ${
                    iconBg ?? ''
                }`}
            >
                <Icon fill={iconColor ?? '#7AA43E'} width="30" height="30" />
            </div>
            <p className="text-[16px]">{periods}</p>
            <h1 className="font-semibold text-3xl">{students}</h1>

            <button
                type="button"
                className="absolute top-6 right-7 bg-primary-color text-white py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
                Details
            </button>
        </div>
    );
}

export default ClassroomCard;
