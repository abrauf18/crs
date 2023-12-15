import Searchbar from '@/app/components/common/Searchbar';
import StandardIcon from '@/app/assets/icons/StandardIcon';
import React from 'react';
import Header from '@/app/components/common/Header';
import Standard from '@/app/modules/standard/Standard';

function StandardPage() {
    return (
        <>
            <Header text="40 Standards In Total" buttonText="Create New" />
            <Standard />
        </>
    );
}

export default StandardPage;
