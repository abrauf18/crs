'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Searchbar from '@/app/components/common/Searchbar';
import TestPerformance from '@/app/components/common/test-performance/TestPerformance';
import MyAnswersModal from '@/app/modules/profile/MyAnswersModal';

function Page({ params }: any) {
    const { back } = useRouter();

    return (
        <section>
            <Searchbar
                headerText="Kathryn Murphy"
                tagline="nathan.roberts@example.com"
                isShowBackArrow
                onBackClick={() => back()}
            />
            <TestPerformance isShownFromStudent />
            {/* <div className="absolute right-0 top-0 z-50  text-sm  lg:w-[30%]">
                <MyAnswersModal />
            </div> */}
        </section>
    );
}

export default Page;
