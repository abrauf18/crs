import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';

interface FiltersProps {
    boldText: string;
    grayedText: string;
}

function FilterBar({ boldText, grayedText }: FiltersProps) {
    return (
        <div className="flex mobile:flex-col justify-between items-center my-3">
            <h3 className="text-[20px] font-medium mobile:mb-2 text-dark-gray">
                <span className="font-semibold text-black">{boldText} </span>{' '}
                <span>{grayedText} </span>
            </h3>
            <div className="flex">
                <div className=" cursor-pointer mr-2 px-4 py-2 border text-sm text-dark-gray rounded-lg flex items-center justify-between">
                    <Filter width={15} height={15} />
                    <button className="ml-2" type="button">
                        Filters
                    </button>
                </div>
                <div className="px-4 py-2 border text-sm text-dark-gray rounded-lg flex items-center justify-between">
                    <button className="mr-2" type="button">
                        Newest First
                    </button>
                    <ChevronDown width={15} height={15} />
                </div>
            </div>
        </div>
    );
}
export default FilterBar;
