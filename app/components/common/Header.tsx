import React from 'react';
import { LucideIcon, SearchIcon, BellIcon } from 'lucide-react';

interface HeaderProp {
    headerText: string;
    tagline: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;
}

function Header({ headerText, tagline, Icon }: HeaderProp) {
    return (
        <div className="flex justify-between items-center mobile:flex-col">
            <div className="flex flex-col justify-start items-start">
                <div className="flex justify-center items-center font-semibold text-2xl mb-2">
                    <h1 className="mr-1">{headerText}</h1>
                    <Icon width={25} height={25} />
                </div>
                <p className="text-dark-gray text-sm mobile:mb-3">{tagline}</p>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex border rounded-lg md:px-2 mobile:pr-6 w-full justify-between items-center">
                    <input
                        type="text"
                        className="p-2 border-none outline-none"
                        placeholder="search..."
                    />
                    <SearchIcon width={18} height={18} />
                </div>
                <BellIcon
                    width={45}
                    height={45}
                    className="cursor-pointer p-3 rounded-lg ml-3 border bg-white"
                />
            </div>
        </div>
    );
}

export default Header;
