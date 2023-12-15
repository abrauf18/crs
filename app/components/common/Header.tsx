import React from 'react';
import { Filter, Upload } from 'lucide-react';

interface HeaderProps {
    text: string;
    buttonText: string;
}
function Header({ text, buttonText }: HeaderProps): JSX.Element {
    const firstWord = text.split(' ')[0];
    const restText = text.substring(firstWord.length + 1);
    return (
        <div className="flex mobile:flex-col justify-between items-center my-7">
            <h3 className="text-[20px] font-semibold mobile:mb-2">
                {firstWord}{' '}
                <span className="font-normal text-dark-gray">{restText}</span>
            </h3>
            <div className="flex">
                <div className="mr-2 px-4 py-2 border text-sm text-dark-gray rounded-lg flex items-center justify-between">
                    <Filter width={15} height={15} />
                    <button type="button" className="ml-2">
                        Filters
                    </button>
                </div>
                <div className="px-2 py-3 border text-sm text-white bg-primary-color rounded-lg flex items-center justify-between cursor-pointer ">
                    <Upload width={20} height={20} />
                    <button type="button" className="ml-1">
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;
