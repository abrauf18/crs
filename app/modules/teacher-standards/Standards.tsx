import Searchbar from '@/app/components/common/Searchbar';
import React from 'react';
import FilterBar from './FilterBar';
import StandardCard from './StandardCard';

function Standards() {
    return (
        <section>
            <Searchbar
                headerText="Learning Standard"
                tagline="Here’s All Your Learning Standards"
            />
            <FilterBar boldText="40" grayedText="Learning Plans In Total" />
            <StandardCard />
        </section>
    );
}

export default Standards;
