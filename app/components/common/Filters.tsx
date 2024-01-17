import React from 'react';
import { Filter, ChevronDown, LucideIcon, Upload } from 'lucide-react';

interface FiltersInterface {
    text: string;
    secondButtonText?: string;
    handleClick?: () => void;
}

function Filters({
    text,
    secondButtonText,
    handleClick,
}: FiltersInterface): JSX.Element {
    const makeFirstNumberBold = (inputText: string) => {
        const match = inputText.match(/^\d+/);
        if (match) {
            const number = match[0];
            return (
                <span>
                    <strong className="text-xl font-bold text-black">
                        {number}
                    </strong>
                    {inputText.substring(number.length)}
                </span>
            );
        }
        return inputText;
    };

    const renderHeaderText = () => (
        <h3 className="text-xl font-semibold text-dark-gray mobile:mb-2">
            {makeFirstNumberBold(text)}
        </h3>
    );

    return (
        <div className="flex mobile:flex-col justify-between items-center my-3">
            {renderHeaderText()}
            <div className="flex">
                <div className="cursor-pointer mr-2 px-4 py-2 border text-sm text-dark-gray rounded-lg flex items-center justify-between">
                    <Filter width={15} height={15} />
                    <button className="ml-2" type="button">
                        Filters
                    </button>
                </div>
                <div
                    onClick={handleClick}
                    className={`px-4 py-3 cursor-pointer border text-sm rounded-lg flex items-center justify-between ${
                        secondButtonText?.startsWith('Create New') ||
                        secondButtonText?.startsWith('Upload')
                            ? 'bg-primary-color text-white' // Add your styles for the bg-yellow condition
                            : 'text-dark-gray'
                    }`}
                >
                    <button className="mr-1" type="button">
                        {secondButtonText || 'This year'}
                    </button>
                    {secondButtonText?.startsWith('Upload') ||
                    secondButtonText?.startsWith('Create New') ? (
                        <Upload width={15} height={15} />
                    ) : (
                        <ChevronDown width={15} height={15} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Filters;
