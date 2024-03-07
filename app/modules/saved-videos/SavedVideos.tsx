import React from 'react';
import { CalendarDays } from 'lucide-react';
import Searchbar from '@/app/components/common/Searchbar';
import VideoCard, { Card as Video } from '@/app/components/common/VideoCard';
import videoImage1 from '@/app/assets/images/videoImages/videoImage1.svg';
import videoImage2 from '@/app/assets/images/videoImages/videoImage2.svg';
import videoImage3 from '@/app/assets/images/videoImages/videoImage3.svg';
import videoImage4 from '@/app/assets/images/videoImages/videoImage4.svg';
import videoImage5 from '@/app/assets/images/videoImages/videoImage5.svg';
import videoImage6 from '@/app/assets/images/videoImages/videoImage6.svg';

function SavedVideos() {
    const day1Videos: Video[] = [
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
            imageUrl: videoImage2 as string,
            Text: 'User Experience Design Fund...',
            Questions: 5,
            Checkpoints: 3,
            Resources: 8,
        },
    ];
    const day2Videos: Video[] = [
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
            imageUrl: videoImage2 as string,
            Text: 'User Experience Design Fund...',
            Questions: 5,
            Checkpoints: 3,
            Resources: 8,
        },
        {
            id: '3',
            imageUrl: videoImage3 as string,
            Text: 'Learn Figma: Basic Fundemen..',
            Questions: 5,
            Checkpoints: 3,
            Resources: 8,
        },
        {
            id: '4',
            imageUrl: videoImage4 as string,
            Text: 'learn Figma: User Interface..',
            Questions: 5,
            Checkpoints: 3,
            Resources: 8,
        },
    ];
    return (
        <section>
            <Searchbar
                headerText="My Saved Videos"
                tagline="Your All Saved Videos"
            />
            <div className="mt-8">
                <div className="flex space-x-2 items-center mb-4 ">
                    <CalendarDays color="orange" size={20} />
                    <p className="font-semibold text-lg">Day 01</p>
                </div>
                <div className="">
                    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-col-1 gap-4 md:gap-6">
                        {day1Videos.map((card) => (
                            <VideoCard card={card} key={card.Questions} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-10 lg:mt-8">
                <div className="flex space-x-2 items-center mb-4 ">
                    <CalendarDays color="orange" size={20} />
                    <p className="font-semibold text-lg">Day 02</p>
                </div>
                <div className="">
                    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-col-1 gap-4 md:gap-6 place-content-center">
                        {day2Videos.map((card) => (
                            <VideoCard card={card} key={card.Questions} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SavedVideos;
