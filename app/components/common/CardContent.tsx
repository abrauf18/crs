import { EditIcon, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export interface IconProps {
    FirstIcon: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;
    SecondIcon: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;
    ThirdIcon: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;
}

interface CardContentProps {
    id: string | undefined;
    route?: string;
    heading: string;
    first: string;
    second: string;
    third: string;
    Icons: IconProps;
    isModal?: boolean;
}

function CardContent({
    id,
    route,
    heading,
    first,
    second,
    third,
    Icons,
    isModal,
}: CardContentProps) {
    const { FirstIcon, SecondIcon, ThirdIcon } = Icons;
    return (
        <div className="mt-2">
            <h5 className="mb-2 text-lg font-semibold tracking-tight text-gray-900">
                {heading}
            </h5>
            <div>
                <div className="flex gap-2 mb-2">
                    <div className="flex gap-1 items-center text-dark-gray text-sm">
                        <FirstIcon height={17} width={17} color="#F59A3B" />
                        <p>{first}</p>
                    </div>
                    <div className="flex gap-1 items-center text-dark-gray text-sm">
                        <SecondIcon width={17} height={17} color="#7AA43E" />
                        <p>{second}</p>
                    </div>
                </div>
                <div className="flex gap-1 items-center mb-5 text-dark-gray text-sm">
                    <ThirdIcon height={17} width={17} color="#54C3F4" />
                    <p>{third}</p>
                </div>
            </div>
            {isModal ? (
                <Link
                    href={route && id ? `${route}/${id}` : '#'}
                    className="border rounded-lg text-white px-3 py-2 text-sm font-medium text-center mr-2 float-right bg-primary-color"
                >
                    Selected
                </Link>
            ) : (
                <div className="flex items-end justify-end">
                    <Link
                        href={route && id ? `${route}/${id}` : '#'}
                        className="border rounded-lg text-dark-gray px-3 py-2 text-sm font-medium text-center mr-2"
                    >
                        Details
                    </Link>
                    <div className="bg-orange-100 p-2 rounded-md">
                        <EditIcon height={20} width={20} color="#F59A3B" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default CardContent;
