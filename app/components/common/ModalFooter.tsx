import React from 'react';

function ModalFooter({ text }: { text: string }) {
    return (
        <div className="absolute bottom-0 left-0 w-full p-3 border bg-white">
            <div className="cursor-pointer p-2 rounded-lg bg-primary-color text-white text-center">
                <button type="button">{text}</button>
            </div>
        </div>
    );
}

export default ModalFooter;
