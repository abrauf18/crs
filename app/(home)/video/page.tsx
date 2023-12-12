import React from "react";
import Header from "@/components/common/Header";
import videoIcon from "@/public/assets/coloredIcons/videoIcon.svg";
import VideoHeader from "@/components/video/VideoHeader";
import VideoCard, { Card } from "@/components/video/VideoCard";
import videoImage1 from "@/public/assets/videoImages/videoImage1.svg";
import videoImage2 from "@/public/assets/videoImages/videoImage2.svg";
import videoImage3 from "@/public/assets/videoImages/videoImage3.svg";
import videoImage4 from "@/public/assets/videoImages/videoImage4.svg";
import videoImage5 from "@/public/assets/videoImages/videoImage5.svg";
import videoImage6 from "@/public/assets/videoImages/videoImage6.svg";

const VideoPage = () => {
    const cards: Card[] = [
        {
            imageUrl: videoImage1 as string,
            Text: "Master Digital Product Design..",
            Questions: 5,
            Checkpoints: 3,
            Resources: 8,
        },
        {
            imageUrl: videoImage2 as string,
            Text: "User Experience Design Fund...",
            Questions: 5,
            Checkpoints: 3,
            Resources: 8,
        },
        {
            imageUrl: videoImage3 as string,
            Text: "Learn Figma: Basic Fundemen..",
            Questions: 5,
            Checkpoints: 3,
            Resources: 8,
        },
        {
            imageUrl: videoImage4 as string,
            Text: "learn Figma: User Interface..",
            Questions: 5,
            Checkpoints: 3,
            Resources: 8,
        },
        {
            imageUrl: videoImage5 as string,
            Text: "Essentials Principal for UI UX...",
            Questions: 5,
            Checkpoints: 3,
            Resources: 8,
        },
        {
            imageUrl: videoImage6 as string,
            Text: "Master Digital Product Design..",
            Questions: 5,
            Checkpoints: 3,
            Resources: 8,
        },
    ];

    return (
        <>
            <Header headerText="All Video's" iconSrc={videoIcon as string} tagline="Your All Video’s Here" />
            <VideoHeader text="200 Video’s In Total" />
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-col-1 gap-4 place-content-center">
                {
                    cards.map((card, index) => (
                        <VideoCard card={card} key={index} />
                    ))
                }
            </div>
        </>
    );
};

export default VideoPage;