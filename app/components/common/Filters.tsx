// import React from 'react';
// import { Filter, ChevronDown, LucideIcon } from 'lucide-react';

// interface FiltersProps {
//     text: string;
//     filterIcon?:
//         | React.ComponentType<React.SVGProps<SVGSVGElement>>
//         | LucideIcon;

//     firstBtnText?: string;
//     secondButonText?: string;
// }

// function Filters({
//     text,
//     filterIcon,
//     firstBtnText,
//     secondButonText,
// }: FiltersProps) {
//     return (
//         <div className="flex mobile:flex-col justify-between items-center my-3">
//             <h3 className="text-[20px] font-semibold mobile:mb-2">{text}</h3>
//             <div className="flex">
//                 <div className=" cursor-pointer mr-2 px-4 py-2 border text-sm text-dark-gray rounded-lg flex items-center justify-between">
//                     {filterIcon ? (
//                         <filterIcon width={15} height={15} />
//                     ) : (
//                         <Filter width={15} height={15} />
//                     )}
//                     <button className="ml-2" type="button">
//                         Filters
//                     </button>
//                 </div>
//                 <div className="px-4 py-2 border text-sm text-dark-gray rounded-lg flex items-center justify-between">
//                     <button className="mr-2" type="button">
//                         This year
//                     </button>
//                     <ChevronDown width={15} height={15} />
//                 </div>
//             </div>
//         </div>
//     );
// }
// export default Filters;

import React from 'react';
import { Filter, ChevronDown, LucideIcon } from 'lucide-react';

interface FiltersProps {
    text: string;
    filterIcon?:
        | React.ComponentType<React.SVGProps<SVGSVGElement>>
        | LucideIcon;

    firstBtnText?: string;
    secondButtonText?: string;
}

function Filters({
    text,
    filterIcon: FilterIcon,
    firstBtnText,
    secondButtonText,
}: FiltersProps) {
    return (
        <div className="flex mobile:flex-col justify-between items-center my-3">
            <h3 className="text-[20px] font-semibold mobile:mb-2">{text}</h3>
            <div className="flex">
                <div className="cursor-pointer mr-2 px-4 py-2 border text-sm text-dark-gray rounded-lg flex items-center justify-between">
                    {FilterIcon ? (
                        <FilterIcon width={15} height={15} />
                    ) : (
                        <Filter width={15} height={15} />
                    )}
                    <button className="ml-2" type="button">
                        {firstBtnText || 'Filters'}
                    </button>
                </div>
                <div className="px-4 py-2 border text-sm text-dark-gray rounded-lg flex items-center justify-between">
                    <button className="mr-2" type="button">
                        {secondButtonText || 'This year'}
                    </button>
                    <ChevronDown width={15} height={15} />
                </div>
            </div>
        </div>
    );
}

export default Filters;
