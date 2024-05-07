'use client';

import React from 'react';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { FileVideoIcon } from 'lucide-react';
import ModalFooter from '@/app/components/common/ModalFooter';
import { ModalHeader } from '@/app/components/common/ModalHeader';
import SearchInput from '@/app/components/common/SearchInput';
import { getResourcesByNameAPI } from '@/app/api/resource';
import videoImage1 from '@/app/assets/images/videoImages/videoImage1.svg';
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

function VideoModal({ onClose }: any) {
    const { data } = useSession();

    const searchResources = async (searchInput: string) => {
        if (!data) {
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
            const resources = responseData?.data ?? [];
            console.log(resources);
        } catch (error: any) {
            toast.error(
                error.message ?? 'An error occurred while searching resources'
            );
        }
    };

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
                {' '}
                {/* Added container with fixed height and scrolling */}
                {cards.map((card) => (
                    <div className="mt-5" key={card.Questions}>
                        <VideoCard card={card} isModal />
                    </div>
                ))}
            </div>
            <ModalFooter text="Continue" />
        </section>
    );
}

export default VideoModal;
