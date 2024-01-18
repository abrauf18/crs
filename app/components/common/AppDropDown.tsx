// // Select.jsx

// import React from 'react';

// export interface OptionsInterface {
//     label: string;
//     value: string;
// }
// interface SelectProps {
//     name: string;
//     options: OptionsInterface[];
//     value: string;
//     onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
//     className?: string;
// }

// function AppDropDown({
//     name,
//     options,
//     value,
//     onChange,
//     className,
// }: SelectProps) {
//     const selectClassName = `p-3 border rounded-xl bg-slate-100 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 font-medium ${
//         className || ''
//     }`;

//     return (
//         <select
//             name={name}
//             value={value}
//             onChange={onChange}
//             className={selectClassName}
//         >
//             {options.map((option, index) => (
//                 <option key={option.label} value={option.label}>
//                     {option.value}
//                 </option>
//             ))}
//         </select>
//     );
// }

// export default AppDropDown;

import React from 'react';

export interface OptionsInterface {
    label: string;
    value: string;
}

interface SelectProps {
    name: string;
    options: OptionsInterface[];
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
}

function AppDropDown({
    name,
    options,
    value,
    onChange,
    className,
}: SelectProps) {
    const selectClassName = ` pl-4 p-3 py-3 pr-8 border rounded-lg bg-slate-100 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 font-medium ${
        className || ''
    }`;

    return (
        <div className="relative w-full">
            <select
                name={name}
                value={value}
                onChange={onChange}
                className={`${selectClassName} appearance-none w-full`}
            >
                {options.map((option, index) => (
                    <option key={option.label} value={option.label}>
                        {option.value}
                    </option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg
                    className="h-4 w-4 text-slate-400"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    );
}

export default AppDropDown;
