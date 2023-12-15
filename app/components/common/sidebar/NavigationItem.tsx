'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LucideIcon } from 'lucide-react';

interface NavigationItemProps {
    to: string;
    ItemIcon: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;
    itemText: string;
}

function NavigationItem({ to, ItemIcon, itemText }: NavigationItemProps) {
    const pathname = usePathname();
    const isActive = pathname === to || pathname.startsWith(`${to}/`);

    return (
        <Link
            href={to}
            className={`flex justify-start items-center w-48 p-3 mb-2 rounded-lg font-semibold text-sm ${
                isActive ? 'text-white bg-primary-color' : 'text-black'
            }`}
        >
            <div className="mx-4">
                {isActive ? (
                    <ItemIcon color="white" />
                ) : (
                    <ItemIcon color="black" />
                )}
            </div>
            <li>{itemText}</li>
        </Link>
    );
}

export default NavigationItem;
