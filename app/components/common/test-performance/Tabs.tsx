'use client';

import React from 'react';
import { StudentProfileResourceType } from '@/lib/utils';

function Tabs({
    activeTab,
    setActiveTabLocal,
}: {
    activeTab: StudentProfileResourceType;
    setActiveTabLocal: (tab: StudentProfileResourceType) => void;
}) {
    const handleTabClick = (tab: StudentProfileResourceType) => {
        setActiveTabLocal(tab);
    };

    return (
        <div className="flex space-x-3">
            <button
                type="button"
                className={`py-2 px-4 border-2 rounded-xl ${
                    activeTab === StudentProfileResourceType.VIDEO
                        ? ' border-primary-color  bg-orange-50'
                        : ''
                }`}
                onClick={() => handleTabClick(StudentProfileResourceType.VIDEO)}
            >
                {StudentProfileResourceType.VIDEO}
            </button>
            <button
                type="button"
                className={`py-2 px-4 border-2 rounded-xl ${
                    activeTab === StudentProfileResourceType.ASSESSMENT
                        ? ' border-primary-color  bg-orange-50'
                        : ''
                }`}
                onClick={() =>
                    handleTabClick(StudentProfileResourceType.ASSESSMENT)
                }
            >
                {StudentProfileResourceType.ASSESSMENT}
            </button>
        </div>
    );
}

export default Tabs;
