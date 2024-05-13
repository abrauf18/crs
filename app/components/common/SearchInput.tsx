'use client';

import { SearchIcon } from 'lucide-react';
import React, { useState } from 'react';

function SearchInput({
    handleClick,
}: {
    handleClick?: (search: string) => void;
}) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <div className="flex border rounded-lg px-2 mobile:pr-6 w-full justify-between items-center bg-transparent ">
            <input
                type="text"
                className="p-2 border-none outline-none bg-transparent w-full mobile:w-[80%]"
                placeholder="Search..."
                value={inputValue}
                onChange={handleInputChange}
            />
            <div className="cursor-pointer">
                <SearchIcon
                    width={18}
                    height={18}
                    onClick={() => handleClick && handleClick(inputValue)}
                />
            </div>
        </div>
    );
}

export default SearchInput;
