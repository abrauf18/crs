import React from 'react';

interface CardProps {
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    cardText: string;
    count: number | string;
    isActive?: boolean;
}

function Card({ Icon, cardText, count, isActive }: CardProps) {
    return (
        <div
            className={`col-span-1 mobile:col-span-2 p-4 flex flex-col justify-evenly h-[163px] w-full rounded-lg border ${
                isActive ? 'bg-light-orange' : 'bg-white'
            }`}
        >
            <Icon width={30} height={30} />
            <p className="text-[16px]">{cardText}</p>
            <h1 className="font-semibold text-3xl">{count}</h1>
        </div>
    );
}

export default Card;
