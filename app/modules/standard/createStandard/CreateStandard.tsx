import React from 'react';
import { Label } from '@/app/components/ui/label';
import { CalendarDays } from 'lucide-react';
import CreateTopic from '../CreateTopic';
import StandardCard, { Data } from '../StandardCard';
import VideoModal from '../VideoModal';
import QuizModal from '../QuizModal';

export const data: Data[] = [
    {
        id: 1,
        name: '3D Printing',
        duration: '5:00',
        question: '5 questions',
    },
    {
        id: 2,
        name: 'Design & Human',
        duration: '5:00',
        question: '5 questions',
    },
    {
        id: 3,
        name: 'Vertual Reality - VR',
        duration: '5:00',
        question: '5 questions',
    },
];
function CreateStandard() {
    return (
        <section>
            <div className="mt-5 pb-3 border-b">
                <h3 className="text-xl font-semibold">Plan Details</h3>
                <div className="sm:flex justify-between items-center gap-5 w-full mt-5">
                    <div className="basis-1/2">
                        <Label htmlFor="name">Plan Name</Label>
                        <input
                            className="mb-5 mt-2 block w-full px-3 py-2 bg-slate-100 border rounded-lg text-sm placeholder-slate-400
                             focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                            type="name"
                            id="name"
                            placeholder="Write Plan Name"
                        />
                    </div>
                    <div className="basis-1/2">
                        <Label htmlFor="description">Description</Label>
                        <input
                            className="mb-5 mt-2 block w-full px-3 py-2 bg-slate-100 border rounded-lg text-sm placeholder-slate-400
                             focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                            type="description"
                            id="description"
                            placeholder="Description Here"
                        />
                    </div>
                </div>
            </div>
            <div>
                <div className="flex justify-between items-center my-5">
                    <h3 className="text-xl font-semibold">Topic:</h3>
                    <div className=" cursor-pointer px-4 py-2 border text-sm text-dark-gray rounded-lg flex items-center justify-between">
                        <button type="button">Add More</button>
                    </div>
                </div>
                <CreateTopic />
                <CreateTopic />
            </div>

            <div className="sm:flex justify-between items-center my-5 gap-5">
                <div className="basis-1/2 relative">
                    <Label htmlFor="data">Data</Label>
                    <input
                        className="mb-5 mt-2 block w-full px-3 py-2 bg-slate-100 border rounded-lg text-sm placeholder-slate-400
                             focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        id="data"
                        placeholder="23 November, 2023"
                    />
                    <div className="absolute top-10 right-2">
                        <CalendarDays size={20} color="#85878D" />
                    </div>
                </div>
                <div className="basis-1/2 my-5">
                    <button
                        type="button"
                        className="bg-primary-color text-white font-medium p-2 mt-3 rounded-lg sm:float-right"
                    >
                        Add TimeLine
                    </button>
                </div>
            </div>
            <StandardCard data={data} />
            <div className="absolute right-0 top-0 z-50">
                {/* <VideoModal /> */}
                {/* <QuizModal /> */}
            </div>
        </section>
    );
}

export default CreateStandard;
