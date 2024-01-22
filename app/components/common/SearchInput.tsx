import { SearchIcon } from 'lucide-react';
import React from 'react';

function SearchInput() {
    return (
        <div className="flex border   rounded-lg px-2 mobile:pr-6 w-full justify-between items-center bg-transparent ">
            <input
                type="text"
                className="p-2 border-none outline-none bg-transparent mobile:w-[80%]"
                placeholder="Search..."
            />
            <SearchIcon width={18} height={18} />
        </div>
    );
}

export default SearchInput;
