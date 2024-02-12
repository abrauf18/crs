import React from 'react';
import { Filter, ChevronDown, Upload } from 'lucide-react';

interface FiltersInterface {
    isHideFirstBtn?: boolean;
    text: string;
    secondButtonText?: string;
    handleClick?: () => void;
    btnFontSize?: string;
    textColor?: string; 
}

function Filters({
    text,
    secondButtonText,
    handleClick,
    isHideFirstBtn,
    btnFontSize = 'text-sm',
    textColor = 'text-dark-gray',
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
        <h3 className={`text-xl font-semibold ${textColor} mobile:mb-2`}>
            {makeFirstNumberBold(text)}
        </h3>
    );

    return (
        <div
            className={`flex mobile:flex-col justify-between items-center  my-3 ${
                secondButtonText?.startsWith('Upload') ||
                secondButtonText?.startsWith('Create New')
                    ? 'mobile:items-center'
                    : 'mobile:items-start'
            }`}
        >
            {renderHeaderText()}
            <div className="flex">
                {!isHideFirstBtn && (
                    <div
                        className={`cursor-pointer mr-2 px-4 py-2 border text-dark-gray rounded-lg flex items-center justify-between ${btnFontSize}`}
                    >
                        <Filter
                            width={btnFontSize === 'text-xs' ? 12 : 15}
                            height={btnFontSize === 'text-xs' ? 12 : 15}
                        />
                        <button className="ml-2 " type="button">
                            Filters
                        </button>
                    </div>
                )}
                <div
                    onClick={handleClick}
                    className={`px-4 py-3 cursor-pointer border rounded-lg flex items-center justify-between ${btnFontSize} ${
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
