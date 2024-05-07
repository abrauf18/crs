'use client';

import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { Label } from '@/app/components/ui/label';
import { getResourcesByTypeAPI } from '@/app/api/resource';
import QuizModal from './QuizModal';
import VideoModal from './VideoModal';

function CreateTopic() {
    const { data } = useSession();
    const [selectedType, setSelectedType] = useState('video');
    const [isDisplayModal, setIsDisplayModal] = useState(false);

    const handleOpenModal = () => {
        setIsDisplayModal(true);
    };

    const handleCloseModal = () => {
        setIsDisplayModal(false);
    };

    useEffect(() => {
        if (!data) {
            return;
        }

        const getResourcesByType = async () => {
            try {
                const APIData = await getResourcesByTypeAPI({
                    accessToken: data?.user?.accessToken,
                    resourceType: selectedType,
                });

                if (!APIData.ok) {
                    const errorData = await APIData.json();
                    throw new Error(
                        errorData?.message ??
                            'An error occurred while fetching video data'
                    );
                }

                const responseData = await APIData.json();
                const resources = responseData?.data ?? [];
                console.log(resources);
            } catch (error: any) {
                toast.error(
                    error.message ??
                        'An error occurred while fetching resources'
                );
            }
        };

        if (isDisplayModal) {
            getResourcesByType();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedType]);
    return (
        <div>
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
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            <option value="video">Video</option>
                            <option value="quiz">Quiz</option>
                        </select>
                        <div className="cursor-pointer border text-sm text-dark-gray rounded-lg text-center w-24 px-1 py-2 mt-2">
                            <button
                                className="text-sm text-center"
                                type="button"
                                onClick={handleOpenModal}
                            >
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
            <div className="fixed right-0 top-0 z-50 w-full md:w-[60%] lg:w-[30%]">
                {isDisplayModal && selectedType.toLowerCase() === 'video' && (
                    <VideoModal onClose={handleCloseModal} />
                )}
                {isDisplayModal && selectedType.toLowerCase() === 'quiz' && (
                    <QuizModal onClose={handleCloseModal} />
                )}
            </div>
        </div>
    );
}

export default CreateTopic;
