import { Metadata } from 'next';
import React from 'react';
import Searchbar from '@/app/components/common/Searchbar';

export const metadata: Metadata = {
    title: 'Learning',
    description: 'Here’s Your All Learning Assigned to You',
};

function layout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <Searchbar
                headerText="My Learnings"
                tagline="Here’s Your All Learning Assigned to You"
            />
            <div className="md:basis-full ">{children}</div>
        </section>
    );
}

export default layout;
