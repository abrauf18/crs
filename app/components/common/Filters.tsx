import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';

interface FiltersProps {
    text: string;
}

function Filters({ text }: FiltersProps) {
    return (
        <div className="flex mobile:flex-col justify-between items-center my-3">
            <h3 className="text-[20px] font-semibold mobile:mb-2">{text}</h3>
            <div className="flex">
                <div className=" cursor-pointer mr-2 px-4 py-2 border text-sm text-dark-gray rounded-lg flex items-center justify-between">
                    <Filter width={15} height={15} />
                    <button className="ml-2" type="button">
                        Filters
                    </button>
                </div>
                <div className="px-4 py-2 border text-sm text-dark-gray rounded-lg flex items-center justify-between">
                    <button className="mr-2" type="button">
                        This year
                    </button>
                    <ChevronDown width={15} height={15} />
                </div>
            </div>
        </div>
    );
}
export default Filters;
