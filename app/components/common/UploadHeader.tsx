import { LucideIcon, X } from 'lucide-react';
import React from 'react';

interface Header {
    heading: string;
    tagline: string;
}
interface UploadHeaderProps {
    headerText: Header;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;
}

export function UploadHeader({
    headerText,
    Icon,
}: UploadHeaderProps): JSX.Element {
    return (
        <div className="flex justify-between items-center">
            <div className="flex flex-col my-7">
                <div className="flex">
                    <h3 className="text-xl font-semibold mb-2 mr-1">
                        {headerText.heading}
                    </h3>
                    <Icon />
                </div>
                <p className="text-sm text-dark-gray">{headerText.tagline}</p>
            </div>
            <div className="rounded-full bg-light-gray border p-1">
                <X size={20} />
            </div>
        </div>
    );
}
