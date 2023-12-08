/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-base-to-string */
import React from "react";
import Image from "next/image";
import searchIcon from "@/public/assets/search.svg";
import notificationIcon from "@/public/assets/notification.svg";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface HeaderProp {
    headerText: string,
    tagline: string,
    iconSrc: string | StaticImport;
}

const Header: React.FC<HeaderProp> = ({ headerText, tagline, iconSrc }) => {
    return (
        <>
            <div className="flex justify-between items-center mobile:flex-col">
                <div className="flex flex-col justify-start items-start">
                    <div className='flex justify-center items-center font-semibold text-2xl mb-2'>
                        <h1>{headerText}</h1>
                        <Image
                            width={25}
                            height={25}
                            src={iconSrc}
                            alt={`${String(iconSrc)} Icon`}
                        />
                    </div>
                    <p className='text-[#85878D] text-sm mobile:mb-3'>{tagline}</p>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex border-[1px] rounded-lg tablet:px-2 mobile:pr-6 w-full justify-between items-center">
                        <input type="text" className="p-2 border-none outline-none" placeholder="search..." />
                        <Image
                            width={18}
                            height={18}
                            src={searchIcon}
                            alt='search Icon'
                            className="cursor-pointer"
                        />
                    </div>
                    <Image
                        width={45}
                        height={45}
                        src={notificationIcon}
                        alt='notification Icon'
                        className="cursor-pointer p-3 rounded-lg ml-3 border-[1px] bg-[#FFFFFF]"
                    />
                </div>
            </div>
        </>
    );
};

export default Header;