import React from 'react';
import ButtonLoader from './ButtonLoader';

function ModalFooter({
    text,
    loading,
    buttonType,
}: {
    text: string;
    loading?: boolean;
    buttonType?: 'submit' | 'button';
}) {
    return (
        <div className="absolute bottom-0 left-0 w-full p-3 md:py-5 lg:py-3 border bg-white">
            <button
                className="cursor-pointer p-2 w-full rounded-lg bg-primary-color text-white text-center"
                type={buttonType === 'button' ? 'button' : 'submit'}
            >
                {loading ? <ButtonLoader /> : text}
            </button>
        </div>
    );
}

export default ModalFooter;
