'use client';

import React, { useState } from 'react';

interface TabBarProps {
    options: string[];
}

function TabBar({ options }: TabBarProps) {
    const [activeTab, setActiveTabLocal] = useState('all');

    const handleTabClick = (tab: string) => {
        setActiveTabLocal(tab);
    };

    return (
        <div className="flex flex-wrap md:justify-between">
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
