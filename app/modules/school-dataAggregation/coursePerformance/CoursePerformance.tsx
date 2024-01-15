import Bars from '@/app/assets/icons/Bars';
import Filters from '@/app/components/common/Filters';
import Tabs from '@/app/components/common/test-performance/Tabs';
import React from 'react';
import PerformanceCard, { PerformanceCardInterface } from './PerformanceCard';

function CoursePerformance() {
    const performance: PerformanceCardInterface[] = [
        {
            id: '1',
            name: 'Corona Virus',
            percentage: '100',
        },
        {
            id: '2',
            name: 'Corona Virus',
            percentage: '100',
        },
        {
            id: '3',
            name: 'Corona Virus',
            percentage: '100',
        },
        {
            id: '4',
            name: 'Corona Virus',
            percentage: '100',
        },
        {
            id: '5',
            name: 'Corona Virus',
            percentage: '100',
        },
        {
            id: '6',
            name: 'Corona Virus',
            percentage: '100',
        },
        {
            id: '7',
            name: 'Corona Virus',
            percentage: '100',
        },
        {
            id: '8',
            name: 'Corona Virus',
            percentage: '100',
        },
        {
            id: '9',
            name: 'Corona Virus',
            percentage: '100',
        },
        {
            id: '10',
            name: 'Corona Virus',
            percentage: '100',
        },
    ];
    return (
        <section className="mt-5">
            <Filters
                text="Course Performance - Coronavirus"
                filterIcon={Bars}
                firstBtnText="Filter By"
                secondButtonText="Student"
            />
            <Tabs />
            <p className="text-dark-gray font-medium text-lg mt-5">
                <span className="font-semibold text-black">27</span> Test
                Results
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                {performance.map((course) => (
                    <div key={course.id}>
                        <PerformanceCard
                            name={course.name}
                            id={course.id}
                            percentage={course.percentage}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default CoursePerformance;
