import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface CardProps {
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;
    cardText: string;
    count: number | string;
    currentPath?: string;
    isActive?: boolean;
}

function Card({ Icon, cardText, count, currentPath, isActive }: CardProps) {
    return (
        <div
            className={`col-span-1 mobile:col-span-2 p-4 flex flex-col justify-evenly h-[163px] w-full rounded-lg border ${
                isActive
                    ? 'bg-light-orange border-primary-color border-2'
                    : 'bg-white'
            }`}
        >
            <Icon width={25} height={25} />
            <p className="text-[16px]">{cardText}</p>
            <h1 className="font-semibold text-3xl">{count}</h1>
            <div className="flex items-end justify-end">
                <Link
                    href={`${currentPath}/${cardText.toLowerCase()}`}
                    className="border rounded-lg text-dark-gray px-3 py-2 text-sm font-medium text-center mr-2 w-24 hover:bg-primary-color hover:text-white"
                >
                    Details
                </Link>
            </div>
        </div>
    );
}

export default Card;
