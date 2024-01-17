// Select.jsx

import React from 'react';

interface SelectProps {
    name: string;
    options: string[];
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
    const selectClassName = `p-3 border rounded-xl bg-slate-100 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 font-medium ${
        className || ''
    }`;

    return (
        <select
            name={name}
            value={value}
            onChange={onChange}
            className={selectClassName}
        >
            {options.map((option, index) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

export default AppDropDown;
