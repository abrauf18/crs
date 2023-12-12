import React from "react";
import Image from "next/image";
import filterIcon from "@/public/assets/filterIcon.svg";
import uploadIcon from "@/public/assets/coloredIcons/uploadIcon.svg";

interface VideoHeaderProps {
    text: string;
}
const VideoHeader: React.FC<VideoHeaderProps> = ({ text }) => {
    const firstWord = text.split(" ")[0];
    const restText = text.substring(firstWord.length + 1);
    return (
        <div className="flex mobile:flex-col justify-between items-center my-7">
            <h3 className="text-[20px] font-semibold mobile:mb-2">{firstWord} <span className="font-normal text-dark-gray">{restText}</span></h3>
            <div className="flex">
                <div className="mr-2 px-4 py-2 border-[1px] text-sm text-dark-gray rounded-lg flex items-center justify-between">
                    <Image
                        src={filterIcon as string}
                        alt="icon"
                        width={15}
                        height={15}
                    >
                    </Image>
                    <button className="ml-2">
                        Filters
                    </button>
                </div>
                <div className="px-2 py-3 border-[1px] text-sm text-white bg-primary-color rounded-lg flex items-center justify-between">
                    <Image
                        src={uploadIcon as string}
                        alt="icon"
                        width={20}
                        height={20}
                    />
                    <button className="ml-2">
                        Upload Video
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoHeader;