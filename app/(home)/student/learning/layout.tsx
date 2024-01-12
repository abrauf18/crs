import Searchbar from '@/app/components/common/Searchbar';
import React from 'react';

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
