import Searchbar from '@/app/components/common/Searchbar';
import StandardIcon from '@/app/assets/icons/StandardIcon';
import React from 'react';
import Header from '@/app/components/common/Header';

function StandardPage() {
    return (
        <>
            <Searchbar
                headerText="Standards"
                tagline="All Standards here"
                Icon={StandardIcon}
            />
            <Header text="40 Learning Standards In Total" />
            {/* <Standard /> */}
        </>
    );
}

export default StandardPage;
