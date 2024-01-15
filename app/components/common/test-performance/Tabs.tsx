'use client';

import React, { useState } from 'react';

function Tabs() {
    const [activeTab, setActiveTabLocal] = useState('test');

    const handleTabClick = (tab: string) => {
        setActiveTabLocal(tab);
    };

    return (
        <div className="flex space-x-1">
            <button
                type="button"
                className={`py-2 px-4 border-2 rounded-lg ${
                    activeTab === 'test'
                        ? ' border-primary-color  bg-orange-50'
                        : ''
                }`}
                onClick={() => handleTabClick('test')}
            >
                Test
            </button>
            <button
                type="button"
                className={`py-2 px-4 border-2 rounded-lg ${
                    activeTab === 'quiz'
                        ? ' border-primary-color  bg-orange-50'
                        : ''
                }`}
                onClick={() => handleTabClick('quiz')}
            >
                Quizzes
            </button>
        </div>
    );
}

export default Tabs;
