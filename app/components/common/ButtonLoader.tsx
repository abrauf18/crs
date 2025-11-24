import React from 'react';

function ButtonLoader({ color = 'white' }: { color?: 'white' | 'primary' }) {
    const bgClass = color === 'primary' ? 'bg-primary-color' : 'bg-white';

    return (
        <div className="flex space-x-2 justify-center items-center">
            <div
                className={`h-5 w-5 ${bgClass} rounded-full animate-bounce`}
                style={{ animationDelay: '-0.3s' }}
            />
            <div
                className={`h-5 w-5 ${bgClass} rounded-full animate-bounce`}
                style={{ animationDelay: '-0.15s' }}
            />
            <div
                className={`h-5 w-5 ${bgClass} rounded-full animate-bounce`}
            />
        </div>
    );
}

export default ButtonLoader;
