import React from 'react';
import TestDetailTable from './TestDetailTable';

function TestPerformance({ data }: { data: any }) {
    return (
        <section>
            <div className="border px-2 py-5 lg:py-5 lg:px-5 rounded-lg mt-10">
                <div className="flex flex-col mb-4 lg:flex-row lg:justify-between lg:items-center ">
                    <h1 className="text-lg font-semibold mb-4 lg:mb-0 ml-2">
                        {data[0].name}
                    </h1>

                    {/* <div className=" flex items-baseline space-x-2 w-fit bg-green-50 py-2 px-4 rounded-lg border border-green-600 text-gray-500 font-medium">
                        <div className=" px-[3px] border-2 w-5 h-5 border-green-200 rounded-md flex items-center self-center">
                            <LucideMoveUpRight color="green" size={10} />
                        </div>
                        <span className="text-green-600 font-bold text-2xl ">
                            80%
                        </span>
                        <span className="ml-1">Overall Performance</span>
                    </div> */}
                </div>

                <div className="rounded-lg  mt-5 py-3 md:px-6 mobile:px-3">
                    <TestDetailTable data={data} />
                </div>
            </div>
        </section>
    );
}

export default TestPerformance;
