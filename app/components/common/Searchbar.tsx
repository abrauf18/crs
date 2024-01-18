import React from 'react';
import { LucideIcon, BellIcon } from 'lucide-react';
import SearchInput from './SearchInput';

interface SearchbarProp {
    headerText: string;
    tagline: string;
    Icon?:
        | React.ComponentType<React.SVGProps<SVGSVGElement>>
        | LucideIcon
        | null;
}

function Searchbar({ headerText, tagline, Icon }: SearchbarProp) {
    return (
        <div className="flex lg:justify-between lg:items-center flex-col lg:flex-row mb-4  ">
            <div className="flex flex-col justify-start items-start ">
                <div className="flex justify-center items-center font-semibold text-2xl mb-1">
                    <h1 className="mr-1">{headerText}</h1>
                    {Icon && <Icon width={25} height={25} color="black" />}
                </div>
                <p className="text-dark-gray text-sm mb-3 lg:mb-0">{tagline}</p>
            </div>
            <div className="flex justify-between items-center">
                <SearchInput />
                <BellIcon
                    width={45}
                    height={45}
                    className="cursor-pointer p-3 rounded-lg ml-3 border bg-white"
                />
            </div>
        </div>
    );
}

export default Searchbar;
