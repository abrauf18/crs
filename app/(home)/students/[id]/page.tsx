import React from 'react';
import Filters from '@/app/components/common/Filters';
import { User, ArrowLeft, ChevronDown } from 'lucide-react';
import Searchbar from '@/app/components/common/Searchbar';
import { Button } from '@/app/components/ui/button';
import Image from 'next/image';
import Avatar from '@/app/assets/images/Avtar.jpg';
import Graph from './image/graph.png';

function StudentDetail() {
    return (
        <section className="px-6 lg:px-10 md:px-16  xl:px-24">
            <Searchbar
                headerText="Ali"
                Icon={User}
                tagline="abcdef@gmail.com"
                ArrowLeft={ArrowLeft}
            />

            <div className="flex flex-col mt-8 lg:flex-row lg:items-center justify-between">
                <h1 className="font-semibold text-xl mb-4 lg:mb-0 lg:mr-4">
                    Kathryn Murphy Overview
                </h1>

                <div className="border border-[#E7EAE9] rounded-xl px-5 py-3">
                    <p className="text-dark-gray font-bold">Drop Out</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center shadow-md rounded-lg py-5 mt-8">
                {/* Image */}
                <div className="ml-0 lg:ml-8 mb-6 lg:mb-0">
                    <div className="border border-[#F59A3B] rounded-full w-fit flex items-center p-3">
                        <div className="border border-[#F59A3B] rounded-full w-fit flex items-center p-3">
                            <div className="border border-[#F59A3B] rounded-full w-fit flex items-center p-2">
                                <Image
                                    src={Avatar}
                                    alt="crs logo"
                                    className="rounded-full"
                                    width={150}
                                    height={150}
                                    objectFit="contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Information */}
                <div className="lg:ml-8 w-full lg:w-[45%] lg:justify-between lg:flex">
                    <div className="flex-col mb-4 lg:mb-0">
                        <div>
                            <h1 className="text-dark-gray font-semibold">
                                Name
                            </h1>
                            <h1 className="font-semibold text-lg">
                                Kathryn Murphy
                            </h1>
                        </div>
                        <div className="mt-4">
                            <h1 className="text-dark-gray font-semibold">
                                Email
                            </h1>
                            <h1 className="font-semibold text-lg">
                                nathan.roberts@example.com
                            </h1>
                        </div>
                    </div>
                    <div className="flex-col">
                        <div>
                            <h1 className="text-dark-gray font-semibold">
                                Grade
                            </h1>
                            <h1 className="font-semibold text-lg">
                                10th Grade
                            </h1>
                        </div>
                        <div className="mt-4">
                            <h1 className="text-dark-gray font-semibold">
                                Overall Performance
                            </h1>
                            <h1 className="font-semibold text-lg">75%</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 font-semibold text-xl flex flex-col-reverse lg:flex-row">
                <div className="w-full lg:w-[50%] lg:mr-8">
                    <Filters text="Overall Performance" />
                    <div className="mt-5">
                        <Image
                            src={Graph}
                            alt="Graph"
                            width={521}
                            height={355}
                            className="w-full"
                        />
                    </div>
                </div>
                <div className="w-full lg:w-[50%] flex justify-between mt-3">
                    <h1>Student Report</h1>
                    <div className="px-4 py-2 border text-sm text-dark-gray rounded-lg flex items-center justify-between h-fit">
                        <button className="mr-2" type="button">
                            Last Month
                        </button>
                        <ChevronDown width={15} height={15} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default StudentDetail;
