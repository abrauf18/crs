'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { FileVideoIcon } from 'lucide-react';
import ModalFooter from '@/app/components/common/ModalFooter';
import { ModalHeader } from '@/app/components/common/ModalHeader';
import SearchInput from '@/app/components/common/SearchInput';
import {
    getResourcesByNameAPI,
    getResourcesByTypeAPI,
} from '@/app/api/resource';
import videoImage1 from '@/app/assets/images/videoImages/videoImage1.svg';
import QuizCard from '@/app/components/common/QuizCard';
import { DEFAULT_IMAGE } from '@/lib/utils';
import VideoCard, { Card } from '../video/VideoCard';

const cards: Card[] = [
    {
        id: '1',
        imageUrl: videoImage1 as string,
        Text: 'Master Digital Product Design..',
        Questions: 5,
        Checkpoints: 3,
    },
    {
        id: '2',
        imageUrl: videoImage1 as string,
        Text: 'Master Digital Product Design..',
        Questions: 5,
        Checkpoints: 3,
    },
];
export enum ResourceType {
    VIDEO = 'video',
    SLIDESHOW = 'slideshow',
    WORKSHEET = 'worksheet',
    EXIT_TICKET_TEST = 'exit-ticket-test',
    QUIZ = 'quiz',
}

function VideoModal({
    onClose,
    resourceType,
}: {
    onClose: () => void;
    resourceType: ResourceType;
}) {
    const { data } = useSession();
    const [allResources, setAllResources] = useState<
        { id: string; name: string; url: string }[]
    >([]);
    const [resourceCards, setResourceCards] = useState<
        { id: string; Text: string; imageUrl: string }[]
    >([]);

    const convertResourceToCard = (
        rawResources: { id: string; name: string; url: string }[]
    ) => {
        const transformedData = rawResources.map((resource) => ({
            id: resource.id,
            imageUrl: DEFAULT_IMAGE,
            Text: resource.name,
        }));

        setResourceCards(transformedData);
    };

    const searchResources = async (searchInput: string) => {
        if (!data) {
            return;
        }
        if (searchInput === '') {
            convertResourceToCard(allResources);
            return;
        }

        try {
            const APIData = await getResourcesByNameAPI({
                accessToken: data?.user?.accessToken,
                resourceName: searchInput,
            });

            if (!APIData.ok) {
                const errorData = await APIData.json();
                throw new Error(
                    errorData?.message ??
                        'An error occurred while fetching video data'
                );
            }

            const responseData = await APIData.json();
            const searchedResources = responseData?.data;
            convertResourceToCard(searchedResources);
        } catch (error: any) {
            toast.error(
                error.message ?? 'An error occurred while searching resources'
            );
        }
    };
    console.log('resourceCards:', resourceCards);
    useEffect(() => {
        if (!data) {
            return;
        }

        const getResourcesByType = async () => {
            try {
                const APIData = await getResourcesByTypeAPI({
                    accessToken: data?.user?.accessToken,
                    resourceType,
                });

                if (!APIData.ok) {
                    const errorData = await APIData.json();
                    throw new Error(
                        errorData?.message ??
                            'An error occurred while fetching video data'
                    );
                }

                const responseData = await APIData.json();
                const allFetchedResources = responseData?.data;
                setAllResources(allFetchedResources);
                convertResourceToCard(allFetchedResources);
                console.log(responseData?.data);
            } catch (error: any) {
                toast.error(
                    error.message ??
                        'An error occurred while fetching video data'
                );
            }
        };

        getResourcesByType();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, resourceType]);
    return (
        <section className="w-full bg-white h-screen p-4 shadow-md">
            <ModalHeader
                headerText={{
                    heading: 'Select Video',
                    tagline: 'Select Video For your plan',
                }}
                Icon={FileVideoIcon}
                onClose={onClose}
            />
            <div className="mb-5">
                <SearchInput handleClick={searchResources} />
            </div>
            <div className="md:h-96 h-72  overflow-y-auto px-6">
                {resourceCards.map((card) => (
                    <div className="mt-5" key={card.id}>
                        <QuizCard card={card} />
                        {/* <VideoCard card={card} isModal /> */}
                    </div>
                ))}
            </div>
            <ModalFooter text="Continue" />
        </section>
    );
}

export default VideoModal;
