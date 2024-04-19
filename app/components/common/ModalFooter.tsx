import React from 'react';

function ModalFooter({
    text,
    buttonType = 'button',
    handleClick,
}: {
    text: string;
    buttonType?: 'button' | 'submit';
    handleClick?: () => void;
}) {
    return (
        <div className="absolute bottom-0 left-0 w-full p-3 md:py-5 lg:py-3 border bg-white">
            <div className="cursor-pointer p-2  rounded-lg bg-primary-color text-white text-center">
                <button
                    type={buttonType === 'submit' ? 'submit' : 'button'}
                    onClick={() => {
                        if (handleClick) {
                            handleClick();
                        }
                    }}
                >
                    {text}
                </button>
            </div>
        </div>
    );
}

export default ModalFooter;
