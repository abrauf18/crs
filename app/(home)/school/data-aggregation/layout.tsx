import Searchbar from '@/app/components/common/Searchbar';
import React from 'react';

function layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="px-2 lg:px-4">
            <Searchbar
                headerText="Data Aggregation"
                tagline="Class Performance on the Basis of Standards"
            />
            <div className="md:basis-full ">{children}</div>
        </section>
    );
}

export default layout;
