import React from "react";
import Image from "next/image";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import editIcon from "@/public/assets/editIcon.svg";
import questionIcon from "@/public/assets/coloredIcons/questionsIcon.svg";
import resourcesIcon from "@/public/assets/coloredIcons/resourcesIcon.svg";
import checkpointIcon from "@/public/assets/coloredIcons/checkpointIcon.svg";
import { PlayIcon } from "lucide-react";

export interface Card {
    imageUrl: string | StaticImport;
    Text: string;
    Questions: number;
    Checkpoints: number;
    Resources: number
}

interface VideoCardProps {
    card: Card;
}

const VideoCard: React.FC<VideoCardProps> = ({ card }) => {
    return (

        <div className="max-w-[21rem] bg-white border-[1px] rounded-lg shadow flex flex-col justify-center md:p-4 mobile:p-2">
            <Link href="#" className="relative">
                <Image src={card.imageUrl} alt="video" className="w-full" />
                <div className="absolute left-1/2 bottom-[29%] transform -translate-x-1/2 -translate-y-1/2">
                    <PlayIcon fill="white" color="white" size={35} />
                </div>
            </Link>
            <div className="mt-2">
                <h5 className="mb-2 text-lg font-semibold tracking-tight text-gray-900">{card.Text}</h5>
                <div>
                    <div className="flex gap-2 mb-2">
                        <div className="flex gap-1 items-center">
                            <Image
                                src={questionIcon as string}
                                alt="Question icon"
                                height={20}
                                width={20}
                            />
                            <p>Questions ({card.Questions})</p>
                        </div>
                        <div className="flex gap-1 items-center">
                            <Image
                                src={checkpointIcon as string}
                                alt="Checkpoints icon"
                                height={20}
                                width={20}
                            />
                            <p>Checkpoints ({card.Checkpoints})</p>
                        </div>
                    </div>
                    <div className="flex gap-1 items-center mb-5">
                        <Image
                            src={resourcesIcon as string}
                            alt="Resource icon"
                            height={20}
                            width={20}
                        />
                        <p>Assigned Resource ({card.Resources})</p>
                    </div>
                </div>
                <div className="flex items-end justify-end">
                    <Link
                        href="#"
                        className="border-[1px] rounded-lg text-dark-gray px-3 py-2 text-sm font-medium text-center mr-2"
                    >
                        Learn more
                    </Link>
                    <Image
                        src={editIcon as string}
                        alt="edit icon"
                        height={37}
                        width={37}
                    />
                </div>
            </div>
        </div>
    );
};

export default VideoCard;