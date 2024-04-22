import React from 'react';
import ButtonLoader from './ButtonLoader';

function ModalFooter({ text, loading }: { text: string; loading?: boolean }) {
    return (
        <div className="absolute bottom-0 left-0 w-full p-3 md:py-5 lg:py-3 border bg-white">
            <button
                className="cursor-pointer p-2 w-full rounded-lg bg-primary-color text-white text-center"
                type="submit"
            >
                {loading ? <ButtonLoader /> : text}
            </button>
        </div>
    );
}

export default ModalFooter;
