'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Header from '@/app/components/common/Header';
import Standard from '@/app/modules/standard/Standard';

function StandardPage() {
    const { push } = useRouter();
    function handleClick(): void {
        push('/standard/create');
    }

    return (
        <>
            <Header
                text="40 Standards In Total"
                buttonText="Create New"
                handleClick={() => handleClick()}
            />
            <Standard />
        </>
    );
}

export default StandardPage;
