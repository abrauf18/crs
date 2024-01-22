'use client';

import { ArrowLeftCircleIcon, ArrowRightCircle, Dot } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import WavingHandIcon from '@/app/assets/icons/WavingHand';

interface MetaText {
    title: string;
    description: string;
}

interface LeftSideProp {
    images: any[];
    metaText: MetaText;
}
function LeftSide({ images, metaText }: LeftSideProp) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // const prevSlide = () => {
    //     const isFirstSlide = currentIndex === 0;
    //     const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    //     setCurrentIndex(newIndex);
    // };

    const nextSlide = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex: any) => {
        setCurrentIndex(slideIndex);
    };

    // Automatically move to the next slide every 3 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            nextSlide();
        }, 5000);

        // Clear the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, [currentIndex]);

    return (
        <div className="bg-gray-100  lg:p-10 flex flex-col justify-center items-center h-full">
            <div className="max-w-[1400px] h-[480px] lg:h-[480px] w-full  relative group">
                <div
                    style={{
                        backgroundImage: `url(${images[currentIndex].src})`,
                    }}
                    className="w-full h-full rounded-2xl bg-center bg-contain lg:bg-auto bg-no-repeat duration-500"
                />
                {/* <div className="hidden group-lg:hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                    <ArrowLeftCircleIcon onClick={prevSlide} size={30} />
                </div>
                <div className="hidden group-lg:hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                    <ArrowRightCircle onClick={nextSlide} size={30} />
                </div> */}
            </div>
            <div className="flex justify-center items-center flex-col ">
                <h1 className="flex space-x-3 ">
                    <span className="font-semibold text-xl">
                        {metaText.title}
                    </span>
                    <WavingHandIcon />
                </h1>
                <p className="font-medium text-dark-gray w-[60%] text-center">
                    {metaText.description}
                </p>
            </div>
            <div className="flex top-4 justify-center py-2 mt-5 ">
                {images.map((image, slideIndex) => (
                    <div
                        key={image}
                        onClick={() => goToSlide(slideIndex)}
                        className={` cursor-pointer  ${
                            currentIndex === slideIndex ? 'text-orange-500' : ''
                        }`}
                    >
                        <Dot size={30} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LeftSide;
