import React from 'react';

interface LoaderProps {
    color?: string;
    size?: string;
}

function Loader({ color = 'primaryColor', size = '8' }: LoaderProps) {
    return (
        <div className="flex space-x-2 justify-center items-center">
            <div
                className={`h-${size} w-${size} bg-${color} rounded-full animate-bounce`}
                style={{ animationDelay: '-0.3s' }}
            />
            <div
                className={`h-${size} w-${size} bg-${color} rounded-full animate-bounce`}
                style={{ animationDelay: '-0.15s' }}
            />
            <div
                className={`h-${size} w-${size} bg-${color} rounded-full animate-bounce`}
            />
        </div>
    );
}

export default Loader;
