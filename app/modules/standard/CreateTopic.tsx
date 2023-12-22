import React from 'react';
import { Label } from '@/app/components/ui/label';

function CreateTopic() {
    return (
        <div className="sm:flex justify-between items-center gap-5 w-full mt-3">
            <div className="basis-1/2">
                <Label htmlFor="topicName">Topic Name</Label>
                <input
                    className="mb-5 mt-2 block w-full px-3 py-2 bg-slate-100 border rounded-lg text-sm placeholder-slate-400
                             focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    placeholder="Topic Name"
                />
            </div>
            <div className="basis-1/2 relative">
                <Label htmlFor="description">Type</Label>
                <div className="flex justify-between items-start gap-1">
                    <select
                        className="mb-5 mt-2 block w-full px-3 py-2 bg-slate-100 border rounded-lg text-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 appearance-none"
                    >
                        <option defaultValue="Choose a Type">
                            Choose a Type
                        </option>
                        <option value="Video">Video</option>
                        <option value="Xyz">Quiz</option>
                    </select>
                    <div className="cursor-pointer border text-sm text-dark-gray rounded-lg text-center w-24 px-1 py-2 mt-2">
                        <button className="text-sm text-center" type="button">
                            Select
                        </button>
                    </div>
                    <div className="absolute right-24 top-10 border rounded-full flex items-center pointer-events-none">
                        <svg
                            className="h-4 w-4 text-slate-400"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateTopic;
