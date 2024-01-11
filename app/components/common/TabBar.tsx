'use client';

import React, { useState } from 'react';

interface TabBarProps {
    options: string[];
    onSelectFilter: (tab: string) => void;
    initialSelectedTab: string;
}

function TabBar({ options, onSelectFilter, initialSelectedTab }: TabBarProps) {
    const [activeTab, setActiveTabLocal] = useState(initialSelectedTab);

    const handleTabClick = (tab: string) => {
        setActiveTabLocal(tab);
        onSelectFilter(tab);
    };

    return (
        <div className="flex flex-wrap lg:justify-between my-6 w-full border py-2 px-4 rounded-lg pt-4">
            {options.map((option) => (
                <button
                    key={option}
                    type="button"
                    className={`py-2 px-4 rounded-lg text-center mb-2 mr-2 ${
                        activeTab === option.toLowerCase()
                            ? 'bg-primary-color text-white'
                            : 'bg-gray-200 text-gray-700'
                    } sm:px-6 md:px-8 lg:px-10 xl:px-12`}
                    onClick={() => handleTabClick(option.toLowerCase())}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}

export default TabBar;
