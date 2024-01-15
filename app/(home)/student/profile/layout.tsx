import Searchbar from '@/app/components/common/Searchbar';
import React from 'react';

function layout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <Searchbar
                headerText="My Profile"
                tagline="Track Of Performance & Progress"
            />
            <div className="lg:basis-full ">{children}</div>
        </section>
    );
}

export default layout;
