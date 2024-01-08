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
        <div className="flex justify-between ">
            {options.map((option) => (
                <button
                    key={option}
                    type="button"
                    className={`py-2 px-10  rounded-lg text-center ${
                        activeTab === option.toLowerCase()
                            ? ' bg-primary-color text-white'
                            : ''
                    }`}
                    onClick={() => handleTabClick(option.toLowerCase())}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}

export default TabBar;
