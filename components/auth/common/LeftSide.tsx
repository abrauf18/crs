/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import wavinghand from "@/public/assets/wavinghand.svg";

interface MetaText {
    title: string,
    description: string
}

interface LeftSideProp {
    images: any[],
    metaText: MetaText
}

const LeftSide: React.FC<LeftSideProp> = ({ images, metaText }) => {
    const [activeSlide, setActiveSlide] = useState(0);

    const handleSlideChange = (slideIndex: any) => {
        setActiveSlide(slideIndex);
    };

    const getImageSource = (index: number) => {
        return images[index % images.length];
    };

    useEffect(() => {
        // Automatically move to the next slide every 3 seconds
        const interval = setInterval(() => {
            setActiveSlide((prevSlide) => (prevSlide + 1) % 4);
        }, 3000);

        return () => {
            // Clear the interval to avoid memory leaks
            clearInterval(interval);
        };
    }, [activeSlide]);

    return (
        <div className="flex flex-col text-center">
            <div id="default-carousel" className="relative w-full" data-carousel="slide">
                {/* Carousel wrapper */}
                <div className="relative h-56 overflow-hidden rounded-lg mb-7">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className={`duration-700 ease-in-out flex justify-center items-center ${index === activeSlide ? "block" : "hidden"
                                }`}
                            data-carousel-item=""
                        >
                            <Image
                                src={getImageSource(index)}
                                width={380}
                                height={250}
                                alt={`Slide ${index + 1}`}
                                style={{
                                    objectFit: "cover",
                                }}
                            />
                        </div>
                    ))}
                </div>
                <div className='p-5'>
                    <div className='flex justify-center items-center font-semibold text-3xl mb-2'>
                        <h1>{metaText.title}</h1>
                        <Image
                            width={25}
                            height={25}
                            src={wavinghand}
                            alt='waving hand'
                        />
                    </div>
                    <p className='text-dark-gray'>{metaText.description}</p>
                </div>
                {/* Slider indicators */}
                <div className="absolute z-30 flex -translate-x-1/2 mt-7 left-1/2 space-x-3 rtl:space-x-reverse">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`w-3 h-3 rounded-full ${index === activeSlide ? "bg-primary-color" : "bg-gray-300"
                                }`}
                            aria-current={index === activeSlide}
                            aria-label={`Slide ${index + 1}`}
                            onClick={() => handleSlideChange(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LeftSide;
