import React from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface CardProps {
    icon: string | StaticImport;
    cardText: string;
    count: number | string;
    isActive?: boolean;
}

const Card: React.FC<CardProps> = ({ icon, cardText, count, isActive }) => {
    return (
        <div className={`col-span-1 mobile:col-span-2 p-4 flex flex-col justify-evenly h-[163px] w-[256px] rounded-lg border-[1px] ${isActive ? "bg-[#F59A3B1A]" : "bg-white"}`}>
            <Image
                src={icon}
                alt="icon"
                width={30}
                height={30}
            />
            <p className="text-[16px]">{cardText}</p>
            <h1 className="font-semibold text-3xl">{count}</h1>
        </div>
    );
};

export default Card;