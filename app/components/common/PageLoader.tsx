import React from 'react';

function PageLoader({ additionalClasses }: { additionalClasses?: string }) {
    return (
        <div
            className={`flex justify-center items-center h-screen gap-4 ${additionalClasses}`}
        >
            <div
                className="h-12 w-12 bg-primary-color rounded-full animate-bounce"
                style={{ animationDelay: '-0.3s' }}
            />
            <div
                className="h-12 w-12 bg-primary-color rounded-full animate-bounce"
                style={{ animationDelay: '-0.15s' }}
            />
            <div className="h-12 w-12 bg-primary-color rounded-full animate-bounce" />
        </div>
    );
}

export default PageLoader;
