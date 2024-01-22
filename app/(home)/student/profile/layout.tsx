import { Metadata } from 'next';
import React from 'react';
import Searchbar from '@/app/components/common/Searchbar';

export const metadata: Metadata = {
    title: 'Profile',
    description: 'Track Of Performance & Progress',
};

function layout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            {/* <Searchbar
                headerText="My Profile"
                tagline="Track Of Performance & Progress"
            /> */}
            <div className="lg:basis-full ">{children}</div>
        </section>
    );
}

export default layout;
