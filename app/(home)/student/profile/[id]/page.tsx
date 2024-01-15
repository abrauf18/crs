import TestPerformance from '@/app/components/common/test-performance/TestPerformance';
import MyAnswersModal from '@/app/modules/profile/MyAnswersModal';
import React from 'react';

function page({ params }: any) {
    return (
        <section>
            <TestPerformance />
            <div className="absolute right-0 top-0 z-50  text-sm  lg:w-[30%]">
                <MyAnswersModal />
            </div>
        </section>
    );
}

export default page;
