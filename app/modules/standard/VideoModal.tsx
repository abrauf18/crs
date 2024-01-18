import ModalFooter from '@/app/components/common/ModalFooter';
import { ModalHeader } from '@/app/components/common/ModalHeader';
import SearchInput from '@/app/components/common/SearchInput';
import { FileVideoIcon } from 'lucide-react';
import React from 'react';
import videoImage1 from '@/app/assets/images/videoImages/videoImage1.svg';
import VideoCard, { Card } from '../video/VideoCard';

const cards: Card[] = [
    {
        id: '1',
        imageUrl: videoImage1 as string,
        Text: 'Master Digital Product Design..',
        Questions: 5,
        Checkpoints: 3,
        Resources: 8,
    },
    {
        id: '2',
        imageUrl: videoImage1 as string,
        Text: 'Master Digital Product Design..',
        Questions: 5,
        Checkpoints: 3,
        Resources: 8,
    },
];

function VideoModal({ onClose }: any) {
    return (
        <section className="w-full bg-white h-screen py-4 px-6 shadow-md">
            <ModalHeader
                headerText={{
                    heading: 'Select Video',
                    tagline: 'let’s Upload Video For Your User',
                }}
                Icon={FileVideoIcon}
                onClose={onClose}
            />
            <div className="mb-5">
                <SearchInput />
            </div>
            <div className="md:h-96 h-72  overflow-y-auto">
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
