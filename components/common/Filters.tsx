import React from "react";
import Image from "next/image";
import filterIcon from "@/public/assets/filterIcon.svg";
import dropdownIcon from "@/public/assets/dropdownIcon.svg";
interface FiltersProps {
    text: string;
}

const Filters: React.FC<FiltersProps> = ({ text }) => {
    return (
        <div className="flex mobile:flex-col justify-between items-center my-3">
            <h3 className="text-[20px] font-semibold mobile:mb-2">{text}</h3>
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
                <div className="px-4 py-2 border-[1px] text-sm text-dark-gray rounded-lg flex items-center justify-between">
                    <button className="mr-2">
                        This year
                    </button>
                    <Image
                        src={dropdownIcon as string}
                        alt="icon"
                        width={15}
                        height={15}
                    >
                    </Image>
                </div>
            </div>
        </div>
    );
};

export default Filters;