import React from 'react';
import Filters from '@/app/components/common/Filters';
import StandardCard from './StandardCard';

function Standards() {
    return (
        <section>
            <Filters text="40 Learning Plans In Total" btnFontSize="text-xs" />
            <StandardCard />
        </section>
    );
}

export default Standards;
